# Charter website

A luxury charter website built with Next.js 16, TypeScript and Tailwind CSS 4.

Pages: home, charters, fleet (with a page per boat), booking, gallery, about,
contact, privacy, and a custom 404.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Before launch: replace the placeholders

Preview mode shows dashed **Placeholder** notes wherever real business details
are still needed. Nothing about the business has been invented: prices,
durations, guest limits, boats, reviews and credentials are all left blank.

| What | Where |
| --- | --- |
| Company name, phone, email, area, address, socials, Google reviews link, map | `src/content/site.ts` |
| Charter experiences (duration, price, guests) | `src/content/experiences.ts` |
| Boats (name, model, capacity, length, amenities, rates) | `src/content/fleet.ts` |
| Hero photo, reasons, destinations, reviews, FAQ answers | `src/content/home.ts` |
| Gallery photos | `src/content/gallery.ts` |
| Our story | `src/app/about/page.tsx` |
| Privacy notice (have it reviewed) | `src/app/privacy/page.tsx` |

### Photos

Every photo slot shows an art-directed seascape, labelled with the shot to
take, until you add a real photo:

1. Put the file in `public/photos/` (for example `public/photos/hero.jpg`).
2. Set `src: "/photos/hero.jpg"` on that photo entry and check its `alt` text.

Images are resized and served as AVIF/WebP automatically. Landscape photos at
least 2400px wide work best for the hero.

### Reviews

Only add reviews that guests actually wrote, copied word for word, with the
name as published. The section shows a neutral "reviews will appear here"
message until then. Add your Google Business Profile link to
`googleReviewsUrl` to show a "Read our Google reviews" button.

## Booking requests

The booking and contact forms send to `/api/inquiry`, which validates every
field again on the server, filters spam bots and rate-limits repeat sends.

To receive requests, set **`INQUIRY_WEBHOOK_URL`** to any endpoint that
accepts a JSON POST: Zapier, Make, n8n, Formspree, a CRM or your booking
system. Each request arrives as:

```json
{
  "ref": "REQ-7KQ2MX",
  "receivedAt": "2026-10-30T15:13:15.090Z",
  "kind": "booking",
  "experience": "sunset-cruise",
  "vessel": "flagship",
  "date": "2026-12-12",
  "time": "sunset",
  "guests": 4,
  "name": "…",
  "email": "…",
  "phone": "…",
  "message": "…"
}
```

Customers always see that this is a **request, not a confirmed booking**.

- In development without the webhook, requests are accepted and a preview
  note says they were not delivered.
- In production without the webhook, the form tells the visitor online
  requests are not switched on and asks them to call or email. It never
  pretends a request was sent.

## Environment variables

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live domain, for canonical URLs, sitemap and social cards |
| `INQUIRY_WEBHOOK_URL` | Where booking requests and messages are delivered |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | Set to `false` at launch to hide placeholder notes |

## SEO

- Unique titles and descriptions on every page, which include your service
  area once `serviceArea` is set
- `sitemap.xml`, `robots.txt`, canonical URLs and a generated Open Graph image
- LocalBusiness structured data, published only after you set
  `verified: true` in `src/content/site.ts`

## Design

- Type: Bodoni Moda (display) and Instrument Sans (text)
- Palette: driftwood `#3e2e21`, island tan `#c9a47a`, sand `#f1e8dc`,
  warm white `#fbf8f3`, ink `#1e1913`
- Motif: the tan "horizon line", drawn in on page load and reused as the
  divider throughout
- Brand assets (logos, fonts, colours) live in `../brand/`
