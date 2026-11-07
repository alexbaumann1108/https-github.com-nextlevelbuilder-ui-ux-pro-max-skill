import type { Species } from "@/components/fish-sketch";

export type Photo = { src: string; alt: string; position?: string };

export type Experience = {
  slug: string;
  name: string;
  sketch: Species;
  /** Card text on the homepage. */
  summary: string;
  /** Longer text on The Fishery page. */
  body: string[];
  /** Where and how, shown as short notes. */
  notes: { label: string; value: string }[];
  /** Leave undefined until there's a real photo; the sketch stands in. */
  photo?: Photo;
  /** For seasonal fisheries: usual first and last month (1 = January). */
  /**
   * Season info. `from`/`to` (1 = January) are optional: when set, the booking
   * form flags dates outside them.
   */
  season?: { from?: number; to?: number; label: string; note: string };
};

/** The three fisheries, in the owner's words. */
export const experiences: Experience[] = [
  {
    slug: "beach-snook",
    name: "Beach Snook",
    sketch: "snook",
    summary:
      "Sight fishing for snook along the beaches of Sanibel and Captiva. Visual fishing for cruising fish in shallow water.",
    body: [
      "Snook cruise the beaches of Sanibel and Captiva in clear, shallow water, close enough to the sand to see every fish before you cast.",
      "It's visual fishing at its best: spot the fish, lead it with the fly or lure, and watch it eat. On foot along the beach or from the boat, depending on the day.",
      "Beach snook is a seasonal fishery. The fish move onto the beaches as the water warms, typically from April through August, but the exact start and end depend on water temperature each year. Ask when you book and we'll tell you how the beaches are fishing.",
    ],
    notes: [
      { label: "Where", value: "Sanibel and Captiva beaches" },
      { label: "How", value: "Fly or light tackle, wading or from the boat" },
      { label: "Style", value: "Sight fishing to cruising fish" },
      { label: "Season", value: "Typically April to August, depending on water temperature" },
    ],
    season: {
      from: 4,
      to: 8,
      label: "Seasonal: April to August",
      note: "Beach snook is seasonal, typically April through August. The exact window depends on water temperature.",
    },
    photo: {
      src: "/photos/snook-wading-turquoise-water.jpg",
      alt: "An angler wading in turquoise water holding a large snook",
      position: "50% 40%",
    },
  },
  {
    slug: "tarpon",
    name: "Tarpon",
    sketch: "tarpon",
    summary:
      "One of Florida's most exciting fisheries. Big migrating tarpon from late spring through summer, and juvenile tarpon year-round.",
    body: [
      "Tarpon are the fish people travel to Florida for: big, acrobatic and unforgettable on a fly rod or heavier tackle.",
      "The big tarpon are seasonal. They arrive along the beaches in late April or early May and stay through August, and that's when we chase them on fly or heavier tackle. They're too big to fight on light tackle.",
      "Juvenile tarpon are here year-round, and they're a blast on fly or light tackle, so there's a tarpon to cast to in every season.",
    ],
    notes: [
      { label: "Where", value: "The beaches and Pine Island Sound" },
      { label: "How", value: "Big tarpon: fly or heavier tackle. Juveniles: fly or light tackle" },
      { label: "Fish", value: "Big migrating tarpon and juvenile tarpon" },
      { label: "Season", value: "Big tarpon late April or early May to August; juveniles year-round" },
    ],
    season: {
      label: "Big tarpon: late April to August. Juveniles: year-round",
      note: "Big tarpon are seasonal, from late April or early May through August. Juvenile tarpon are here year-round.",
    },
  },
  {
    slug: "backcountry",
    name: "Backcountry & Redfish",
    sketch: "redfish",
    summary:
      "The mangroves, grass flats and backcountry creeks, in search of redfish, snook and other inshore species.",
    body: [
      "Behind the islands, the backcountry opens into mangrove shorelines, grass flats and quiet creeks.",
      "Redfish push along the mangrove edges and cruise the flats, with snook, trout and other inshore species mixed in. It's sight fishing in skinny water.",
      "And if we're lucky, we'll find tailing reds: fish feeding head-down in inches of water with their tails waving above the surface. Sneaking up on a tailing redfish and laying a fly or bait in front of it is one of the best shots in the backcountry.",
    ],
    notes: [
      { label: "Where", value: "Mangroves, grass flats and backcountry creeks" },
      { label: "How", value: "Fly or light tackle" },
      { label: "Fish", value: "Redfish, snook, trout and more" },
    ],
    photo: {
      src: "/photos/redfish-on-the-fly-backcountry.jpg",
      alt: "An angler holding a big redfish caught on a fly rod, calm water behind",
      position: "25% 55%",
    },
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
