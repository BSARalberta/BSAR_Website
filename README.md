# Badlands Search and Rescue Website

A complete starter website for **Badlands Search and Rescue**, built with React and Vite. The project includes four public-facing pages:

- Home
- Donate
- Join
- Transparency

The site is structured to be easy to maintain, with reusable components, centralized content, and placeholder image handling so you can swap in real files later without redesigning the layout.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Donation Form Email Setup

The Donate page includes a donation inquiry form that posts to [`api/donation.js`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/api/donation.js) and sends two emails through Resend:

- A notification to the BSAR team
- A confirmation email back to the person who submitted the form

Create a local env file from [`.env.example`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/.env.example) and set:

- `RESEND_API_KEY`
- `DONATION_NOTIFY_EMAIL`
- `DONATION_FROM_EMAIL`

`DONATION_FROM_EMAIL` must be a verified sender/domain in Resend.

If you want to test the Vercel function locally, use `vercel dev`. `npm run dev` only starts the Vite frontend.

## Supabase Events And AGM Setup

The Public Events & Info page and the admin listings page use Supabase for:

- public event and AGM listings
- admin authentication
- listing image uploads

### Required env vars

Add these Vite env vars to your local `.env` file and Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The browser code only uses the anon key. Do not place a `service_role` key in frontend code.

### Table setup

Create the `public.listings` table in Supabase using the schema below:

```sql
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('event', 'agm')),
  title text not null,
  slug text not null unique,
  image_url text,
  starts_at timestamptz not null,
  location text not null,
  map_link text,
  description text,
  more_info text,
  price_text text,
  cta_text text,
  cta_link text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Recommended follow-up:

- enable Row Level Security on `public.listings`
- add a public `select` policy for published listings
- add authenticated `insert`, `update`, and `delete` policies for admin users

### Storage bucket setup

Create a public Supabase Storage bucket named `event-images`.

The admin form uploads images to this bucket and stores the resulting public URL in `public.listings.image_url`.

### First admin user

Create your first admin user in Supabase Auth:

1. Open Supabase Dashboard.
2. Go to Authentication > Users.
3. Create or invite the admin user.
4. Sign in at `/admin/listings` with that email and password.

This implementation assumes your RLS policies allow authenticated admin users to manage listings.

## Project Structure

```text
.
├── api/
│   └── donation.js
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── ContentCard.jsx
│   │   ├── AdminListingForm.jsx
│   │   ├── DonationInquiryForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ImagePlaceholder.jsx
│   │   ├── Layout.jsx
│   │   ├── ListingCard.jsx
│   │   ├── ListingDetailContent.jsx
│   │   ├── PageHero.jsx
│   │   ├── PublicDocumentsSection.jsx
│   │   ├── PublicListingsSection.jsx
│   │   └── SectionHeading.jsx
│   ├── content/
│   │   ├── publicDocuments/
│   │   └── siteContent.js
│   ├── lib/
│   │   ├── listings.js
│   │   ├── listingUtils.js
│   │   └── supabaseClient.js
│   ├── pages/
│   │   ├── AdminListingsPage.jsx
│   │   ├── DonatePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── JoinPage.jsx
│   │   ├── ListingDetailPage.jsx
│   │   └── TransparencyPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## Replacing Placeholder Images

Placeholder images live in [`public/images/`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/public/images).

Current stand-in files:

- `logo-placeholder.svg`
- `biker_injury.jpg`
- `happy_members.jpg`
- `shake_hands.jpg`
- `BSAR_logo.jpg`

You can replace these with real assets in one of two ways:

1. Keep the same filename and overwrite the placeholder file.
2. Add a new image file and update the matching `src` entry in [`siteContent.js`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/content/siteContent.js).

The site uses a fallback placeholder block if an image file is missing, so layouts still render cleanly while content is being updated.

## Where to Edit Page Content

Most copy and repeatable content is centralized in:

- [`src/content/siteContent.js`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/content/siteContent.js)

That file controls:

- Hero copy
- Feature sections
- CTA cards
- Donate, Join, and Public Events & Info text
- Footer placeholder contact details
- Public Events & Info hero copy

If you want to change page structure instead of copy, edit the page components in:

- [`src/pages/HomePage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/HomePage.jsx)
- [`src/pages/DonatePage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/DonatePage.jsx)
- [`src/pages/JoinPage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/JoinPage.jsx)
- [`src/pages/TransparencyPage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/TransparencyPage.jsx)

## How To Add Public Documents

Public documents are read from:

- [`src/content/publicDocuments/files/`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/content/publicDocuments/files/)

Optional metadata lives in:

- [`src/content/publicDocuments/metadata.js`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/content/publicDocuments/metadata.js)

To add a document:

1. Place the file in `src/content/publicDocuments/files/`.
2. Add optional metadata keyed by the exact filename if you want a custom title, description, or category.
3. Rebuild the site.

If a file has no metadata, the page falls back to a title generated from the filename.

## Notes

- Placeholder contact details and social links are intentionally labeled as placeholders.
- Comments are included in the code where future donation links, join forms, and organization-specific information will likely be added.
- The design is responsive and keyboard-friendly, with semantic HTML and accessible contrast.
