import type { Vessel } from "./types";

/**
 * The fleet. Both entries are placeholders: replace names, models and
 * specifications with your real boats, and only list amenities they have.
 */
export const fleet: Vessel[] = [
  {
    slug: "flagship",
    name: "The flagship",
    tagline: "Your largest boat, for full-day charters and bigger parties.",
    description:
      "Describe this boat the way you would on the dock: how she feels underway, where guests like to sit, and what kind of day she is best for.",
    amenities: [],
    experiences: [
      "private-charter",
      "sunset-cruise",
      "island-hopping",
      "custom-experience",
    ],
    photo: {
      alt: "Profile of a white motor yacht on turquoise water",
      scene: "turquoise",
      shot: "Full side profile of the boat underway, clean background, midday",
    },
    gallery: [
      {
        alt: "Deck seating looking out over the water",
        scene: "glass",
        shot: "Aft deck seating with the view behind",
      },
      {
        alt: "The bow sunpad at golden hour",
        scene: "sunset",
        shot: "Bow sunpad at golden hour",
      },
    ],
    isPlaceholder: true,
  },
  {
    slug: "day-boat",
    name: "The day boat",
    tagline: "Quick, nimble and right for sandbars and smaller groups.",
    description:
      "Describe this boat: who it suits, how it handles shallow water and what makes a day aboard easy.",
    amenities: [],
    experiences: [
      "private-charter",
      "sandbar-adventure",
      "dolphin-watching",
      "fishing-charter",
    ],
    photo: {
      alt: "A centre-console day boat beside a sandbar",
      scene: "shallows",
      shot: "Three-quarter bow view of the boat in shallow clear water",
    },
    gallery: [
      {
        alt: "Guests at the helm on open water",
        scene: "open",
        shot: "Helm and console detail with open water ahead",
      },
    ],
    isPlaceholder: true,
  },
];

export function getVessel(slug: string) {
  return fleet.find((v) => v.slug === slug);
}
