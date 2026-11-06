# Frigate Fly & Light Tackle Charters: website

Next.js 16, React 19, TypeScript and Tailwind CSS 4.

## Pages

| Address | Page |
| --- | --- |
| `/` | Home: hero, introduction, the three fisheries, captain, boat, rates, gallery, reports, map |
| `/fishery` | Beach Snook, Tarpon, Backcountry & Redfish, rates and FWC regulations |
| `/captain` | Meet your captain |
| `/boat` | The 1720 Action Craft Fly Fisher SE, specifications and equipment |
| `/gallery` | Photo gallery with categories (`/gallery#snook` opens one category) |
| `/reports` | Fishing reports, and a page for each report |
| `/conditions` | Windfinder wind, tide and live forecasts for Sanibel, plus regulations |
| `/book` | Booking inquiry form, phone, email, Instagram and map |
| `/privacy` | Privacy notice |

Old addresses (`/charters`, `/about`, `/contact`, `/fleet`) redirect to the new pages.

## Run it

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build && npm start  # production build
npm run lint
```

## Project structure

```
content/reports/      Fishing reports (Markdown, one file per report)
public/photos/        Your photos
public/illustrations/ Hand-drawn art from the brand board and business card
public/brand/         Logos
src/content/          All editable business content (see below)
src/app/              One folder per page; api/inquiry handles the forms
src/components/       Header, footer, gallery, forms, fish sketches, shared UI
src/lib/              Form validation and report loading
```

## Editing content

Everything you'd change day to day lives in `src/content/`. You don't need
to touch the page code.

| What | File |
| --- | --- |
| Phone, email, Instagram, service area, map | `src/content/site.ts` |
| Beach Snook, Tarpon, Backcountry text and photos | `src/content/fishery.ts` |
| Captain name, photo, bio, specialties | `src/content/captain.ts` |
| Boat description, photos, specifications | `src/content/boat.ts` |
| Rates | `src/content/rates.ts` |
| Gallery photos and categories | `src/content/gallery.ts` |
| FWC and Windfinder links | `src/content/links.ts` |

### Captain

Change `photo.src` in `src/content/captain.ts` to any file in
`public/photos`. Set `name` to show it as the heading. Write your story in
`bio`, one string per paragraph.

### Add a gallery photo

1. Put the photo in `public/photos/`, for example `tarpon-jump.jpg`.
2. Add a line to `src/content/gallery.ts`:
   ```ts
   p("tarpon-jump.jpg", "tarpon", "A tarpon jumping off the beach", 2016, 1512),
   ```
   The numbers are the photo's width and height in pixels. Categories:
   `snook`, `tarpon`, `redfish`, `boat`, `days`.

The Tarpon category is empty until you add tarpon photos. To give the Tarpon
fishery its own photo, add `photo: { src, alt }` to it in `src/content/fishery.ts`.

## Posting a fishing report (no rebuild needed on your side)

1. Copy `content/reports/_template.md`, name it like `2026-12-december-report.md`.
2. Fill in the title, date, category and summary, and write the report below
   the dashes. Plain text works; `## Heading`, `**bold**`, lists, links and
   `![caption](/photos/file.jpg)` photos all work too.
3. Commit the file. GitHub's website and phone app can both do this: open
   `content/reports`, choose **Add file**, paste, commit.

When the site is hosted on Vercel or Netlify, every commit rebuilds and
publishes automatically, usually within a minute or two. Set `draft: true` to
keep a report hidden until it's ready.

## Booking inquiries

The booking form posts to `/api/inquiry`, which checks every field again on
the server, filters spam bots and limits repeated sends.

**To receive inquiries**, set `INQUIRY_WEBHOOK_URL` to any service that
accepts a JSON POST. Easy options:

- **Zapier or Make:** "Catch Hook" trigger, then "Send email" to
  frigateflycharters@gmail.com (or add a row to a Google Sheet).
- **Formspree:** create a form and use its endpoint URL.
- **A booking platform or CRM** that accepts webhooks.

Each inquiry arrives as:

```json
{
  "ref": "REQ-7KQ2MX",
  "receivedAt": "2026-11-01T14:05:37.068Z",
  "kind": "booking",
  "name": "…", "email": "…", "phone": "…",
  "date": "2026-12-20",
  "guests": 3,
  "experience": "beach-snook",
  "tripLength": "4",
  "slot": "am",
  "message": "…"
}
```

Without `INQUIRY_WEBHOOK_URL`, the live site tells visitors that online
inquiries aren't switched on and asks them to call or email. It never
pretends an inquiry was sent.

**Online booking later:** set `bookingPlatformUrl` in `src/content/site.ts`
(FareHarbor, Peek, Checkfront, Calendly...) and a "Book online" link appears
beside the form.

## Booking emails

Each booking request is emailed to you through **Resend** (resend.com, free
for this volume) with every detail and two buttons:

- **Confirm & add to my calendar** opens Google Calendar with the trip
  filled in (suggested times in `src/content/availability.ts`). Check the
  calendar is set to **Frigate Fly Bookings** and save: that blocks the time
  on the website within about 5 minutes.
- **Reply to confirm** opens a ready-written confirmation email to the
  customer.

Setup: create a Resend account **with frigateflycharters@gmail.com**, make an
API key (API Keys → Create), and set `RESEND_API_KEY` in your host. Until you
verify your own domain with Resend, emails come from
`onboarding@resend.dev` and can only go to your Resend account email, which
is where these go.

## Booking calendar (blocks booked dates)

The booking form shows a calendar. Customers can only pick days you run
trips (set in `src/content/availability.ts`: currently Monday mornings,
half day only, and Tuesday to Friday).

Each day has two half-day slots, **morning** and **afternoon**, so two
half-day trips can be booked on the same date. Three-quarter and full-day
trips need the whole day free.

**Your routine:** when you confirm a trip, add it to the bookings calendar
on your phone with its real start and end times. Within about 5 minutes
the website blocks:

- the **morning** for an event that starts before noon (e.g. 7–11am),
- the **afternoon** for an event that runs past noon (e.g. 1–5pm),
- **both** for an all-day event or one that spans noon (e.g. a 6 or 8 hour
  trip, a day off, a vacation).

Days with one half left show "AM" or "PM" on the calendar; fully booked
days are crossed out. Events marked "Free" or "Cancelled" don't block
anything.

### Connect it once (Google Calendar)

1. On a computer, open calendar.google.com, choose **Other calendars → +
   → Create new calendar**, and name it "Frigate Bookings".
2. Open that calendar's **Settings**, scroll to **Integrate calendar**, and
   copy the **Secret address in iCal format**.
3. In your website host (Vercel: Project → Settings → Environment
   Variables), add `BOOKING_CALENDAR_ICS_URL` with that address, and
   redeploy.

The address is secret: anyone with it can see your bookings calendar. It
stays on the server and is never shown to visitors.

### Or Apple Calendar (iCloud)

In Calendar on iPhone, tap **Calendars → (i)** next to the bookings
calendar, turn on **Public Calendar** and copy the link. Use it as
`BOOKING_CALENDAR_ICS_URL` (a `webcal://` link works as is). Note that a
public iCloud calendar can be viewed by anyone who has the link.

### Changing your schedule

Edit `weeklySchedule` in `src/content/availability.ts`. Each weekday lists
its half-day slots (`"am"`, `"pm"`) and whether longer trips run
(`fullDay`); leave a day out to close it.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your domain, `https://www.frigatefly.com` (the default for production builds) (canonical links, sitemap, social cards) |
| `INQUIRY_WEBHOOK_URL` | Where booking inquiries are delivered |
| `RESEND_API_KEY` | Sends each booking request to your email |
| `OWNER_EMAIL` | Optional: where requests go (defaults to the site email) |
| `BOOKING_CALENDAR_ICS_URL` | Secret iCal address of your bookings calendar; its events block dates |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `false` at launch hides the dashed "To fill in" notes |

## Deploy (Vercel, free tier works)

1. Sign in at vercel.com with GitHub and choose **Add New → Project**.
2. Import this repository and set **Root Directory** to `frigate/website`.
3. Add the three environment variables above.
4. Deploy. Add your domain under **Settings → Domains**.

Netlify works the same way (base directory `frigate/website`).

## SEO

- Page titles and descriptions target Sanibel Island fishing charters,
  Southwest Florida fly fishing, snook, tarpon and inshore fishing.
- Open Graph and Twitter cards on every page; reports use their cover photo.
- `sitemap.xml` (including every report) and `robots.txt`.
- LocalBusiness structured data with rates, service area and Instagram;
  BlogPosting data on each report.

## Design notes

- An old Florida field journal: parchment, seafoam, weathered tan and a little
  faded orange.
- Libre Caslon Text for headings, Nunito Sans for text, Special Elite for
  small typewriter labels.
- Hand-drawn art from the Frigate brand board, plus field-guide fish sketches
  (`src/components/fish-sketch.tsx`). The hero snook draws itself in once;
  that's the only automatic animation.
