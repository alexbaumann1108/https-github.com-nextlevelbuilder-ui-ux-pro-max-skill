/**
 * Business details. Everything here appears on the public site.
 */
export const site = {
  name: "Frigate Fly & Light Tackle Charters",
  shortName: "Frigate",
  tagline: "Fly & light tackle charters on Sanibel Island",
  location: "Sanibel Island, Florida",
  serviceArea: ["Sanibel", "Captiva", "Pine Island Sound", "Fort Myers"],
  serviceAreaSummary:
    "Sanibel, Captiva, Pine Island Sound, Fort Myers and the surrounding Southwest Florida waters",
  phone: "(704) 999-0571",
  phoneHref: "tel:+17049990571",
  email: "CaptainAlex@frigatefly.com",
  instagram: { handle: "@frigate_fly", url: "https://www.instagram.com/frigate_fly/" },

  /** Sanibel Lighthouse, used for the map and structured data. */
  geo: { lat: 26.4528, lng: -82.0146, label: "26°27′N 82°01′W" },
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sanibel+Island,+FL&z=11&output=embed",
  mapLinkUrl: "https://www.google.com/maps/place/Sanibel,+FL",

  /**
   * Optional: a link to an online booking platform (FareHarbor, Peek,
   * Checkfront, a Calendly page...). When set, the booking page shows a
   * "Book online" button beside the inquiry form.
   */
  bookingPlatformUrl: null as string | null,
};

/**
 * Preview mode shows dashed notes wherever content still needs real
 * details. Turn it off for launch with NEXT_PUBLIC_SHOW_PLACEHOLDERS=false.
 */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? "https://www.frigatefly.com" : "http://localhost:3000")).replace(/\/$/, "");

export const nav = [
  { href: "/fishery", label: "The Fishery" },
  { href: "/captain", label: "Captain" },
  { href: "/boat", label: "The Boat" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reports", label: "Fishing Reports" },
  { href: "/conditions", label: "Conditions" },
] as const;
