import type { Photo } from "./types";

/**
 * Gallery photos. Replace each placeholder with a real photo by adding the
 * file to /public/photos and setting `src`. Keep `alt` descriptive.
 * `wide` makes a photo span two columns on larger screens.
 */
export const gallery: (Photo & { wide?: boolean })[] = [
  { alt: "Yacht at anchor in turquoise water", scene: "turquoise", shot: "Boat at anchor from the water", wide: true },
  { alt: "Sunset from the bow", scene: "sunset", shot: "Sunset from the bow" },
  { alt: "Guests wading at the sandbar", scene: "shallows", shot: "Guests at the sandbar" },
  { alt: "Calm water at first light", scene: "dusk", shot: "Early morning departure" },
  { alt: "Islands on the horizon", scene: "glass", shot: "Island stop", wide: true },
  { alt: "Deep blue open water", scene: "open", shot: "Dolphins alongside" },
  { alt: "Evening light on the water", scene: "sunset", shot: "Celebration on deck" },
  { alt: "Clear shallows from above", scene: "shallows", shot: "Aerial of the boat in shallows" },
  { alt: "Glassy water near the islands", scene: "glass", shot: "Swim stop" },
  { alt: "Boat underway on open water", scene: "open", shot: "Boat underway, wake visible", wide: true },
  { alt: "Turquoise water off the stern", scene: "turquoise", shot: "Stern swim platform" },
];
