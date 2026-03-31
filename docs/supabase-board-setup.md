# Supabase Setup For Board Directory

The board directory now uses a dynamic `board_members` table. Admins can create positions, rename them, change their display order, and delete them from `/admin`.

## New installs

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.board_members (
  id uuid primary key default gen_random_uuid(),
  role text not null unique,
  display_order integer not null,
  name text,
  email text,
  image_url text,
  is_acting boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint board_members_display_order_check check (display_order >= 1)
);

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_board_members_updated_at on public.board_members;

create trigger set_board_members_updated_at
before update on public.board_members
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.board_members enable row level security;
```

## Existing installs: migrate the old fixed-role table

If you already created the old version of `board_members`, run this migration instead:

```sql
alter table public.board_members
  add column if not exists display_order integer;

update public.board_members
set display_order = case role
  when 'President' then 1
  when 'Vice President' then 2
  when 'Secretary' then 3
  when 'Treasurer' then 4
  when 'Planning Director' then 5
  when 'Operations Director' then 6
  when 'Assets Manager' then 7
  when 'Fundraising Director' then 8
  else 999
end
where display_order is null;

alter table public.board_members
  alter column display_order set not null;

alter table public.board_members
  drop constraint if exists board_members_role_check;

alter table public.board_members
  add constraint board_members_display_order_check check (display_order >= 1);
```

## Table policies

This matches the current admin implementation: anyone signed in through Supabase Auth can manage records, and anyone can read them publicly.

```sql
create policy "Board members are publicly readable"
on public.board_members
for select
to anon, authenticated
using (true);

create policy "Authenticated users can insert board members"
on public.board_members
for insert
to authenticated
with check (true);

create policy "Authenticated users can update board members"
on public.board_members
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete board members"
on public.board_members
for delete
to authenticated
using (true);
```

If you already created some of these policies, drop or rename the old ones before re-running them.

## Optional starter data

Seeding is optional now. Admins can create positions directly in the `/admin` interface. If you still want starter rows:

```sql
insert into public.board_members (role, display_order)
values
  ('President', 1),
  ('Vice President', 2),
  ('Secretary', 3),
  ('Treasurer', 4),
  ('Planning Director', 5),
  ('Operations Director', 6),
  ('Assets Manager', 7),
  ('Fundraising Director', 8)
on conflict (role) do nothing;
```

## Storage bucket

Create a public bucket named `board-member-images`.

```sql
insert into storage.buckets (id, name, public)
values ('board-member-images', 'board-member-images', true)
on conflict (id) do nothing;
```

## Storage policies

```sql
create policy "Board images are publicly readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'board-member-images');

create policy "Authenticated users can upload board images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'board-member-images');

create policy "Authenticated users can update board images"
on storage.objects
for update
to authenticated
using (bucket_id = 'board-member-images')
with check (bucket_id = 'board-member-images');

create policy "Authenticated users can delete board images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'board-member-images');
```

## Admin users

In Supabase Dashboard:

1. Go to Authentication.
2. Create the admin user accounts you want to use.
3. Sign in at `/admin` with those credentials.

The current code treats any authenticated user as an admin for both listings and board management.
