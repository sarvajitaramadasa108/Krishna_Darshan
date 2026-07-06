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

## Monthly publishing flow

1. Update `lib/newsletter-data.ts` with the new issue title, text, and links.
2. Replace the gallery illustrations with real temple photos if needed.
3. Paste in the new Drive PDF URL for each older issue.
4. Deploy the updated site to Vercel from the connected Git repository.

## Current note

The site is fully built and validated locally. The last step is to connect this
folder to your Git/Vercel workflow and publish it.
