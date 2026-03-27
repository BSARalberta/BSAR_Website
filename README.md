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
│   │   ├── DonationInquiryForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ImagePlaceholder.jsx
│   │   ├── Layout.jsx
│   │   ├── PageHero.jsx
│   │   └── SectionHeading.jsx
│   ├── content/
│   │   └── siteContent.js
│   ├── pages/
│   │   ├── DonatePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── JoinPage.jsx
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
- `join-placeholder.svg`
- `transparency-placeholder.svg`

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
- Donate, Join, and Transparency text
- Footer placeholder contact details
- Public document list entries

If you want to change page structure instead of copy, edit the page components in:

- [`src/pages/HomePage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/HomePage.jsx)
- [`src/pages/DonatePage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/DonatePage.jsx)
- [`src/pages/JoinPage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/JoinPage.jsx)
- [`src/pages/TransparencyPage.jsx`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/pages/TransparencyPage.jsx)

## How to Add Documents to the Transparency Page

The Transparency page is powered by structured arrays in [`siteContent.js`](/home/loganj/Documents/BSAR%20Website/BSAR_Website/src/content/siteContent.js).

To add or update a document:

1. Open the `transparencySections` array.
2. Find the section you want to edit, such as `Important documents` or `Reports and public information`.
3. Add a new item object with a title, description, metadata label, and link text.
4. If you upload a real PDF later, replace the placeholder `href` with the file path or external URL.

Example:

```js
{
  title: 'Annual report 2026',
  description: 'Summary of activities, readiness priorities, and volunteer development.',
  meta: 'PDF placeholder',
  href: '/documents/annual-report-2026.pdf',
  linkLabel: 'Download PDF'
}
```

If you plan to host local PDFs, place them in `public/documents/` and link to them using `/documents/your-file.pdf`.

## Notes

- Placeholder contact details and social links are intentionally labeled as placeholders.
- Comments are included in the code where future donation links, join forms, and organization-specific information will likely be added.
- The design is responsive and keyboard-friendly, with semantic HTML and accessible contrast.
