# Frigate Fly & Light Tackle Charters

Everything for the Frigate brand and website lives in this folder.

```
frigate/
├── brand/
│   ├── logos/                  Logo PNGs (transparent and on colour)
│   ├── fonts/                  Nunito Sans, the closest free match to the card's lettering
│   ├── frigate-brand-colors.png
│   ├── frigate-brand-board.png   Brand concept sheet
│   └── business-card-original.png
├── business-details.md       Confirmed contact details
├── media/
│   ├── photos/                 Trip photos (16)
│   └── videos/
│       ├── originals/          iPhone clips as recorded (.mov)
│       └── web/                Website-ready copies (.mp4, muted) and poster frames
└── website/                    The Next.js website (see website/README.md)
```

## Logos

| File | Use |
| --- | --- |
| `frigate-logo-black.png` | Full logo, transparent, for light backgrounds |
| `frigate-logo-white.png` | Full logo, transparent, for dark backgrounds and photos |
| `frigate-logo-on-cream.png`, `frigate-logo-on-tan.png` | Logo on a solid brand colour |
| `frigate-bird-black.png`, `frigate-bird-white.png` | Bird mark alone, for small spaces and icons |
| `frigate-avatar-1024.png` | Square profile picture (Instagram, Google) |
| `frigate-boat-*.png` | Boat illustration |

The PNGs were extracted from a JPEG of the business card, so they suit web
and social use. For large print (banners, wraps), use the designer's
original artwork files.

## Fonts

- **Frigate wordmark:** custom brush lettering, not a font. Use the logo PNG.
- **Tagline and contact text:** set in an Avenir-style sans. Nunito Sans
  (free, SIL Open Font License, see `fonts/OFL.txt`) is the closest free match.

## Colours

| Name | Hex | Use |
| --- | --- | --- |
| Black | `#000000` | Logo |
| Driftwood | `#3E2E21` | Dark sections, footer |
| Island Tan | `#C9A47A` | Buttons, accents |
| Sand | `#F1E8DC` | Light sections |
| Paper Cream | `#DCD3C7` | Card paper |

## Photos and videos

Photos are named by what they show (`snook-wading-turquoise-water.jpg`,
`boat-on-the-clear-flats.jpg`), so they are easy to pick for each page.

The videos were recorded in Apple's HEVC format, which Chrome and Firefox
can't play. The `web/` copies are H.264 MP4s that play in every browser,
muted so they can autoplay as background video, with a poster image for
the first frame.

| Video | Length | Good for |
| --- | --- | --- |
| `boat-running-at-sunset` | 6.6 s | Homepage hero background |
| `beach-sunset-angler` | 3.9 s | Closing "book your trip" section |
