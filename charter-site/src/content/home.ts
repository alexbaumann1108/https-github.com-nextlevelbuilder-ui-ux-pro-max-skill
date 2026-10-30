import type { Photo } from "./types";

export const heroPhoto: Photo = {
  alt: "A private yacht on turquoise water under a clear sky",
  scene: "turquoise",
  shot: "Your best boat on turquoise water, wide landscape, room for text on the left",
};

/** Draft copy. Replace with what genuinely sets your company apart. */
export const reasons = [
  {
    title: "Planned around your party",
    body: "Tell us the occasion, the pace and who is coming. The day is shaped around that, not a fixed script.",
  },
  {
    title: "Safety without fuss",
    body: "A clear briefing before departure and a boat that is ready when you arrive, so you can relax once you are aboard.",
  },
  {
    title: "Local water knowledge",
    body: "Where the water is clearest today, which sandbar is showing and where to be for the sunset.",
  },
  {
    title: "Straightforward booking",
    body: "Send a request in a couple of minutes. You hear back from a person, not an automated queue.",
  },
];

/** Placeholder destinations. Rename to the real places you visit. */
export const destinations: { name: string; note: string; photo: Photo }[] = [
  {
    name: "The sandbar",
    note: "Knee-deep water and soft sand at low tide.",
    photo: {
      alt: "A pale sandbar surrounded by clear shallow water",
      scene: "shallows",
      shot: "The sandbar you visit most, at low tide",
    },
  },
  {
    name: "The outer islands",
    note: "Quiet beaches you can only reach by boat.",
    photo: {
      alt: "Low islands on a calm horizon",
      scene: "glass",
      shot: "The islands on your island-hopping route",
    },
  },
  {
    name: "The sunset point",
    note: "Open western horizon for the last of the light.",
    photo: {
      alt: "Sunset over open water",
      scene: "sunset",
      shot: "Your usual sunset anchorage",
    },
  },
  {
    name: "Open water",
    note: "Where dolphins are most often seen.",
    photo: {
      alt: "Deep blue open water under a light sky",
      scene: "open",
      shot: "Open water off the coast, ideally with dolphins",
    },
  },
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
    q: "How do I book a charter?",
    a: "Send a booking request with your preferred experience, date and group size. We check availability and reply to confirm the details. Your charter is booked once we have confirmed it with you directly.",
  },
  {
    q: "What should we bring?",
    a: "Sunscreen, sunglasses, a hat, a towel and swimwear cover most trips. Soft-soled shoes are kindest to the deck. If anything else is needed for your experience, we will tell you when we confirm.",
  },
  {
    q: "Can we bring food and drinks?",
    a: "Add your food and drink policy here, including any rules on glass or alcohol.",
    needsDetails: true,
  },
  {
    q: "What happens if the weather is bad?",
    a: "Add your weather policy here: who decides, how much notice you give and whether guests can reschedule or get a refund.",
    needsDetails: true,
  },
  {
    q: "What is your cancellation policy?",
    a: "Add your cancellation and deposit terms here.",
    needsDetails: true,
  },
  {
    q: "Are children welcome?",
    a: "Add your policy on children and life jackets in children's sizes here.",
    needsDetails: true,
  },
];
