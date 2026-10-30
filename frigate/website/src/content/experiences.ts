import type { Experience } from "./types";

/**
 * Charter experiences. Descriptions are draft copy describing the type of
 * trip; durations, prices and guest numbers are left blank until confirmed.
 */
export const experiences: Experience[] = [
  {
    slug: "private-charter",
    name: "Private boat charter",
    summary: "The boat, the route and the pace are yours for the day.",
    description:
      "Bring your own party and plan the day together with us: a long swim stop, a lunch anchorage, a quiet run along the coast. Nothing is shared and nothing is rushed.",
    photo: {
      alt: "A private yacht at anchor in clear turquoise water",
      scene: "turquoise",
      shot: "Your flagship boat at anchor, guests swimming off the stern, midday light",
    },
    featured: true,
  },
  {
    slug: "sunset-cruise",
    name: "Sunset cruise",
    summary: "Golden hour on the water, timed to the light.",
    description:
      "Head out as the day cools and be in position as the sun meets the horizon. An easy, unhurried evening with the best light of the day.",
    photo: {
      alt: "The sun setting over calm water from the deck of a boat",
      scene: "sunset",
      shot: "Sun on the horizon from the bow, guests silhouetted with drinks",
    },
  },
  {
    slug: "sandbar-adventure",
    name: "Sandbar adventure",
    summary: "Shallow, clear water and a beach that only appears at low tide.",
    description:
      "Anchor off a sandbar, wade in knee-deep water and spend the afternoon somewhere you can only reach by boat.",
    photo: {
      alt: "A boat anchored beside a pale sandbar in shallow turquoise water",
      scene: "shallows",
      shot: "Aerial or bow view of the boat beside a sandbar, people wading",
    },
  },
  {
    slug: "island-hopping",
    name: "Island hopping",
    summary: "Several stops, one day, and a different view at each.",
    description:
      "Link up nearby islands and beaches in a single trip, stopping wherever the water looks best on the day.",
    photo: {
      alt: "Low green islands on the horizon across open water",
      scene: "glass",
      shot: "Islands on the horizon from the deck, boat wake in the foreground",
    },
  },
  {
    slug: "dolphin-watching",
    name: "Dolphin watching",
    summary: "Slow passages through the waters dolphins call home.",
    description:
      "A quiet, respectful trip through local waters where dolphins are often seen, with time to stop and watch when they appear.",
    photo: {
      alt: "Calm open water where dolphins surface near the boat",
      scene: "open",
      shot: "Dolphin surfacing alongside the boat, guests watching from the rail",
    },
  },
  {
    slug: "fishing-charter",
    name: "Fishing charter",
    summary: "Rods ready, an early start and local water knowledge.",
    description:
      "Head out for inshore or nearshore fishing. Tell us your experience level and what you hope to catch, and we will plan around it.",
    photo: {
      alt: "Fishing rods on a boat at first light on calm water",
      scene: "dusk",
      shot: "Rods in holders at dawn, line in the water, soft blue light",
    },
  },
  {
    slug: "custom-experience",
    name: "Custom private experience",
    summary: "Proposals, celebrations, corporate days. Tell us the idea.",
    description:
      "If the occasion needs something specific, describe it and we will tell you honestly what we can arrange.",
    photo: {
      alt: "A table set on deck for a private celebration at dusk",
      scene: "sunset",
      shot: "Deck styled for a celebration: flowers, glasses, soft evening light",
    },
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
