/**
 * The boat. Equipment comes from the boat photos. Fill in the specs left
 * as null once confirmed; empty rows are hidden on the live site.
 */
export const boat = {
  name: "1720 Action Craft Fly Fisher SE",
  description: [
    "A shallow-water skiff built for the flats. She draws little water, runs quietly up to the mangroves and beaches, and sits still while you make the cast.",
    "The same boat takes you from the beaches of Sanibel and Captiva to the backcountry of Pine Island Sound.",
  ],
  photo: {
    src: "/photos/boat-action-craft-under-clouds.jpg",
    alt: "The light-blue 1720 Action Craft Fly Fisher SE on the flats under towering summer clouds",
  },
  photo2: {
    src: "/photos/boat-on-the-clear-flats.jpg",
    alt: "The skiff sitting on clear, shallow grass flats",
  },
  specs: [
    { label: "Make and model", value: "1720 Action Craft Fly Fisher SE" as string | null },
    { label: "Outboard", value: "115 Mercury" as string | null },
    { label: "Trolling motor", value: "Minn Kota Terrova" as string | null },
    { label: "Shallow-water anchor", value: "Power-Pole" as string | null },
    { label: "Length", value: null as string | null },
    { label: "Anglers", value: null as string | null },
  ],
};
