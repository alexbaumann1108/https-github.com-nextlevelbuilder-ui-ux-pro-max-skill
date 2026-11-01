import type { Vessel } from "./types";

/**
 * The boat. Model and equipment are taken from the photos and business
 * card. Capacity, length and rates are left blank until confirmed.
 */
export const fleet: Vessel[] = [
  {
    slug: "action-craft-fly-fisher",
    name: "The Action Craft",
    model: "Action Craft Fly Fisher",
    tagline: "A flats skiff built to float skinny water quietly.",
    description:
      "Low, stable and shallow-drafting, the Fly Fisher gets onto the flats and up to the mangroves where snook and redfish feed, then holds still while you make the cast.",
    amenities: [
      "Mercury outboard",
      "Minn Kota bow-mount trolling motor",
      "Power-Pole shallow-water anchor",
      "Casting deck at the bow",
    ],
    experiences: ["fly-fishing", "light-tackle", "wade-fishing"],
    photo: {
      src: "/photos/boat-action-craft-under-clouds.jpg",
      alt: "The light-blue Action Craft Fly Fisher anchored on the flats under towering clouds",
      scene: "turquoise",
      shot: "The boat under clouds",
    },
    gallery: [
      {
        src: "/photos/boat-on-the-clear-flats.jpg",
        alt: "The skiff sitting on clear, shallow grass flats",
        scene: "shallows",
        shot: "The boat on the flats",
      },
    ],
    isPlaceholder: false,
  },
];

export function getVessel(slug: string) {
  return fleet.find((v) => v.slug === slug);
}
