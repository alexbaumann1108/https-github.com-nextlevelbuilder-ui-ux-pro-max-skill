/**
 * Photo gallery. To add a photo: put the file in /public/photos and add a
 * line below with its category. Photos appear in the order listed.
 */
export const categories = [
  { id: "snook", label: "Snook" },
  { id: "tarpon", label: "Tarpon" },
  { id: "redfish", label: "Redfish" },
  { id: "boat", label: "The Boat" },
  { id: "days", label: "Days on the Water" },
] as const;

export type Category = (typeof categories)[number]["id"];

export type GalleryPhoto = {
  src: string;
  alt: string;
  category: Category;
  /** Pixel size, so the layout doesn't jump while photos load. */
  width: number;
  height: number;
};

const p = (file: string, category: Category, alt: string, width: number, height: number): GalleryPhoto => ({
  src: `/photos/${file}`,
  category,
  alt,
  width,
  height,
});

export const gallery: GalleryPhoto[] = [
  p("redfish-on-the-fly-backcountry.jpg", "redfish", "A big redfish on the fly", 2400, 2025),
  p("snook-wading-big-fish-2.jpg", "snook", "A big snook landed while wading the beach", 1932, 2576),
  p("wading-the-mangroves-golden-light.jpg", "days", "Wading the mangrove shoreline at golden hour", 2576, 1717),
  p("redfish-on-the-boat-fly-rod.jpg", "redfish", "A redfish on the fly from the boat", 2576, 2174),
  p("boat-action-craft-under-clouds.jpg", "boat", "The Action Craft under summer clouds", 1512, 2016),
  p("snook-wading-turquoise-water.jpg", "snook", "A snook from the turquoise water off the beach", 1930, 2576),
  p("redfish-release-from-above.jpg", "redfish", "Releasing a redfish in clear shallow water", 1992, 2576),
  p("wading-the-mangroves-casting.jpg", "days", "Casting along the mangroves", 2576, 1717),
  p("snook-wading-big-fish-1.jpg", "snook", "Another big snook from the shallows", 1512, 2016),
  p("redfish-in-the-mangroves.jpg", "redfish", "A golden redfish from the mangroves", 1100, 1252),
  p("boat-on-the-clear-flats.jpg", "boat", "The skiff on the clear grass flats", 1512, 2016),
  p("wading-under-the-dock-guiding.jpg", "days", "Guiding under the dock", 1717, 2576),
  p("snook-on-the-beach.jpg", "snook", "A snook caught from the beach", 1512, 2016),
  p("redfish-wading-big-fish.jpg", "redfish", "A big redfish on the flats", 1888, 2576),
  p("beach-wade-fishing-plane-overhead.jpg", "days", "Fishing the beach as a plane passes overhead", 1512, 2016),
  p("snook-against-blue-sky.jpg", "snook", "A snook held up against the blue sky", 1932, 2576),
  p("redfish-blue-sky-on-the-boat.jpg", "redfish", "A redfish on the boat under a blue sky", 1932, 2576),
];
