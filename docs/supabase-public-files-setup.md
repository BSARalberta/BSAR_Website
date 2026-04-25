# Supabase Setup For Public Files

The Public Documents section and the new `/admin` file manager use Supabase Storage plus a `public_files` table.

## Required env vars

Use the same frontend env vars already required by the rest of the site:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

No additional frontend env vars are required for this feature.

## Storage bucket

Create a public bucket named `public-files`.

```sql
insert into storage.buckets (id, name, public)
values ('public-files', 'public-files', true)
on conflict (id) do nothing;
```

The bucket is public because these files are intentionally visible and downloadable by site visitors.

## Database table

Run this SQL in the Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.public_files (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_name text not null,
  file_path text not null unique,
  file_type text,
  file_size bigint,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_public_files_updated_at on public.public_files;

create trigger set_public_files_updated_at
before update on public.public_files
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.public_files enable row level security;
```

## Table policies

This matches the current site’s admin model: anyone authenticated through Supabase Auth can manage files, and anyone can read them publicly.

```sql
drop policy if exists "Public files are publicly readable" on public.public_files;
drop policy if exists "Authenticated users can insert public files" on public.public_files;
drop policy if exists "Authenticated users can update public files" on public.public_files;
drop policy if exists "Authenticated users can delete public files" on public.public_files;

create policy "Public files are publicly readable"
on public.public_files
for select
to anon, authenticated
using (true);

create policy "Authenticated users can insert public files"
on public.public_files
for insert
to authenticated
with check (true);

create policy "Authenticated users can update public files"
on public.public_files
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete public files"
on public.public_files
for delete
to authenticated
using (true);
```

## Storage policies

```sql
drop policy if exists "Public file objects are publicly readable" on storage.objects;
drop policy if exists "Authenticated users can upload public file objects" on storage.objects;
drop policy if exists "Authenticated users can delete public file objects" on storage.objects;

create policy "Public file objects are publicly readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'public-files');

create policy "Authenticated users can upload public file objects"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'public-files');

create policy "Authenticated users can delete public file objects"
on storage.objects
for delete
to authenticated
using (bucket_id = 'public-files');
```

## Admin users

Create the admin users in Supabase Auth, then sign in at `/admin`.

The current frontend treats any authenticated Supabase user as an admin. If you later want stricter role checks, that would need a separate authorization layer and updated RLS.
