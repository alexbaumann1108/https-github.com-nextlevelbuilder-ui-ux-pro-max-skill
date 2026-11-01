import type { Photo } from "./types";

/**
 * Gallery photos, in display order. Add a photo by putting the file in
 * /public/photos and adding an entry. `wide` spans two columns on larger
 * screens; use it for landscape photos.
 */
const p = (file: string, alt: string, wide = false): Photo & { wide?: boolean } => ({
  src: `/photos/${file}`,
  alt,
  scene: "turquoise",
  shot: alt,
  wide,
});

export const gallery: (Photo & { wide?: boolean })[] = [
  p("wading-the-mangroves-golden-light.jpg", "Wading the mangroves at golden hour", true),
  p("snook-wading-big-fish-2.jpg", "A big snook landed while wading"),
  p("redfish-on-the-boat-fly-rod.jpg", "Redfish on the fly from the boat"),
  p("boat-action-craft-under-clouds.jpg", "The Action Craft under summer clouds"),
  p("redfish-release-from-above.jpg", "Releasing a redfish in clear shallow water"),
  p("wading-the-mangroves-casting.jpg", "Casting along the mangrove shoreline", true),
  p("snook-wading-turquoise-water.jpg", "A snook from the turquoise surf"),
  p("redfish-in-the-mangroves.jpg", "A golden redfish from the mangroves"),
  p("wading-under-the-dock-guiding.jpg", "Guiding under the dock"),
  p("snook-on-the-beach.jpg", "A snook caught from the beach"),
  p("boat-on-the-clear-flats.jpg", "The skiff on the clear flats"),
  p("redfish-wading-big-fish.jpg", "A big redfish on the flats"),
  p("snook-against-blue-sky.jpg", "A snook held up against the sky"),
  p("beach-wade-fishing-plane-overhead.jpg", "Fishing the beach as a plane passes overhead"),
  p("redfish-blue-sky-on-the-boat.jpg", "A redfish on the boat under blue sky"),
  p("snook-wading-big-fish-1.jpg", "Another big snook from the shallows"),
];
