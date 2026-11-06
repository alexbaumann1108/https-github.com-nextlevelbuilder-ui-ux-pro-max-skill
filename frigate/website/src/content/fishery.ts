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
    ],
    notes: [
      { label: "Where", value: "Sanibel and Captiva beaches" },
      { label: "How", value: "Fly or light tackle, wading or from the boat" },
      { label: "Style", value: "Sight fishing to cruising fish" },
    ],
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
      "One of Florida's most exciting fisheries. Migrating tarpon along the beaches and resident fish throughout Pine Island Sound.",
    body: [
      "Tarpon are the fish people travel to Florida for: big, acrobatic and unforgettable on a fly rod or light tackle.",
      "We target migrating tarpon along the beaches and resident fish throughout Pine Island Sound and the surrounding waters.",
    ],
    notes: [
      { label: "Where", value: "The beaches and Pine Island Sound" },
      { label: "How", value: "Fly or light tackle" },
      { label: "Fish", value: "Migrating and resident tarpon" },
    ],
  },
  {
    slug: "backcountry",
    name: "Backcountry & Redfish",
    sketch: "redfish",
    summary:
      "The mangroves, grass flats and backcountry creeks, in search of redfish, snook and other inshore species.",
    body: [
      "Behind the islands, the backcountry opens into mangrove shorelines, grass flats and quiet creeks.",
      "Redfish push along the edges and tail on the flats, with snook, trout and other inshore species mixed in. It's sight fishing in skinny water.",
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
