import type { Photo } from "./types";

/** Desktop hero photo. Phones get the boat-at-sunset video instead. */
export const heroPhoto: Photo = {
  src: "/photos/wading-the-mangroves-golden-light.jpg",
  alt: "An angler wading along a mangrove shoreline in golden evening light",
  scene: "glass",
  shot: "Wading the mangroves at golden hour",
};

export const heroVideo = {
  src: "/media/boat-running-at-sunset.mp4",
  poster: "/media/boat-running-at-sunset-poster.jpg",
};

export const introPhoto: Photo = {
  src: "/photos/wading-under-the-dock-guiding.jpg",
  alt: "A guide helping an angler while wading under a dock",
  scene: "glass",
  shot: "Guiding under the dock",
};

export const ctaPhoto: Photo = {
  src: "/photos/beach-wade-fishing-plane-overhead.jpg",
  alt: "An angler fishing from a white-sand beach into turquoise water",
  scene: "turquoise",
  shot: "Beach fishing",
};

/** From the brand board: what Frigate is built around. */
export const reasons = [
  {
    title: "Fly fishing expertise",
    body: "Help with the cast, the read on the water and the fly that's working, whether it's your first day with a fly rod or your hundredth.",
  },
  {
    title: "Light tackle adventures",
    body: "Spinning rods and lures for anyone who wants the action without the fly rod.",
  },
  {
    title: "Local knowledge",
    body: "Sanibel's tides, flats and mangrove shorelines, and where the fish are likely to be on the day you're out.",
  },
  {
    title: "Tailored experiences",
    body: "Boat or wading, fly or spin, an early start or the evening tide. Each trip is planned around you.",
  },
];

/** Species from the brand board. Photos only where there is a real catch photo. */
export const species: { name: string; note: string; photo?: Photo }[] = [
  {
    name: "Snook",
    note: "Along the beaches, docks and mangrove edges.",
    photo: {
      src: "/photos/snook-wading-big-fish-1.jpg",
      alt: "A wading angler holding a large snook in clear green water",
      scene: "turquoise",
      shot: "Snook",
    },
  },
  {
    name: "Redfish",
    note: "Tailing on the flats and tucked in the mangroves.",
    photo: {
      src: "/photos/redfish-wading-big-fish.jpg",
      alt: "A wading angler holding a large redfish over shallow water",
      scene: "shallows",
      shot: "Redfish",
    },
  },
  { name: "Tarpon", note: "The big one, in season." },
  { name: "Trout", note: "Spotted seatrout over the grass flats." },
  { name: "Jacks and more", note: "Whatever's feeding on the tide." },
];

/**
 * Verified reviews only. Copy them word for word from Google or another
 * public source and keep the reviewer's name as they published it.
 */
export const reviews: {
  quote: string;
  name: string;
  source: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}[] = [];

/**
 * FAQ. Answers marked `needsDetails` describe policy you must confirm.
 */
export const faqs: { q: string; a: string; needsDetails?: boolean }[] = [
  {
    q: "How do I book a trip?",
    a: "Send a booking request with the kind of trip you want, your preferred date and how many are fishing. We check the tides and availability and reply to confirm. Your trip is booked once we've confirmed it with you directly.",
  },
  {
    q: "What should I bring?",
    a: "Polarized sunglasses, a hat, sunscreen, light long sleeves and water. If you're wading, bring shoes you don't mind getting wet. Check the tide, pack the sunscreen, let's go fishing.",
  },
  {
    q: "Do I need fly fishing experience?",
    a: "Add your answer here: whether beginners are welcome on fly trips and whether you offer casting help.",
    needsDetails: true,
  },
  {
    q: "Do I need a fishing license?",
    a: "No. Your fishing license is provided through the captain, so you don't need to buy your own.",
  },
  {
    q: "Is tackle provided?",
    a: "Add your answer here: which rods, reels, flies and lures are included, and whether guests can bring their own.",
    needsDetails: true,
  },
  {
    q: "What if the weather is bad?",
    a: "Add your weather and cancellation policy here: who decides, how much notice you give and whether guests can reschedule.",
    needsDetails: true,
  },
];
