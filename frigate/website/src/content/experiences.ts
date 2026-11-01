import type { Experience } from "./types";

/**
 * Trips. Descriptions come from the business card and brand board (inshore
 * fly fishing and light tackle, tailored trips, wading and boat fishing as
 * seen in the photos). Durations, prices and guest limits are left blank
 * until confirmed.
 */
export const experiences: Experience[] = [
  {
    slug: "fly-fishing",
    name: "Inshore fly fishing",
    summary: "Sight-fishing the flats around Sanibel with a fly rod.",
    description:
      "Work the shallows for snook, redfish and tarpon, with the cast, the eat and the fight all in plain sight. The day is set up around your casting and what you want to chase.",
    photo: {
      src: "/photos/redfish-on-the-boat-fly-rod.jpg",
      alt: "An angler holding a redfish caught on a fly rod, open water behind",
      scene: "turquoise",
      shot: "Redfish on the fly",
    },
    featured: true,
  },
  {
    slug: "light-tackle",
    name: "Light tackle",
    summary: "Spinning gear, artificial lures and local water.",
    description:
      "An easy way into inshore fishing, or a fun change of pace. Light spinning tackle around the mangroves, flats and passes, targeting whatever is feeding that tide.",
    photo: {
      src: "/photos/snook-against-blue-sky.jpg",
      alt: "An angler holding a large snook against a clear blue sky",
      scene: "open",
      shot: "Snook on light tackle",
    },
  },
  {
    slug: "wade-fishing",
    name: "Wade fishing",
    summary: "On foot along the beaches and mangrove edges.",
    description:
      "Step off the boat and walk the shallows for snook cruising the beach and redfish tucked along the mangroves. Quiet, close and as hands-on as fishing gets.",
    photo: {
      src: "/photos/wading-the-mangroves-casting.jpg",
      alt: "An angler wading waist-deep along a mangrove shoreline, casting a fly line",
      scene: "glass",
      shot: "Wading the mangroves",
    },
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
