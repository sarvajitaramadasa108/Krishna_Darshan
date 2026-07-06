# Krishna Darshan

Krishna Darshan is a mobile-responsive monthly magazine site for Hare Krishna
Vaikuntham Temple. The current build focuses on a June 2026 web edition, while
May and earlier issues stay available as PDF archive links.

## What is included

- A responsive homepage with a magazine-style hero
- Scroll-friendly story sections for editor notes and highlights
- A gallery area for monthly photos or illustrated placeholders
- Embedded YouTube video cards for festival and temple media
- An archive route for previous PDF issues

## Free setup

This first version is intentionally free to run:

- Frontend: Next.js on Vercel Hobby
- Media: local SVG artwork now, real temple photos later
- Videos: embedded from YouTube
- Older issues: Google Drive PDF links

## Where the content lives

- `lib/newsletter-data.ts` stores the issue content, archive items, gallery
  cards, and YouTube IDs
- `public/` stores the lightweight cover and gallery illustrations
- `app/page.tsx` renders the current issue
- `app/archive/page.tsx` renders the PDF archive
- `supabase/schema.sql` is the first copy-paste schema for Supabase
- `.env.example` shows the environment variables Vercel will need later

## Monthly publishing flow

1. Update `lib/newsletter-data.ts` with the new issue title, text, and links.
2. Replace the gallery illustrations with real temple photos if needed.
3. Paste in the new Drive PDF URL for each older issue.
4. Deploy the updated site to Vercel from the connected Git repository.

## Supabase setup

Use Supabase when you are ready to move from placeholders to stored content:

1. Create a bucket named `krishna-darshan` inside Supabase Storage.
2. Keep the bucket public so the magazine page can load images directly.
3. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.
4. Run `supabase/seed-june.sql` to create the first June issue and sample
   event rows.
5. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to Vercel environment
   variables.
6. Later, move issue text and image URLs from `lib/newsletter-data.ts` into
   the database tables.

## Current note

The site is fully built and validated locally. The last step is to connect this
folder to your Git/Vercel workflow and publish it.
