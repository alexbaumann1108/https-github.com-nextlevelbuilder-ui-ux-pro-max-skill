/**
 * Business details. Everything here is shown publicly, so only enter
 * verified information. Fields left as `null` are hidden on the live site
 * and flagged in preview mode.
 */
export const site = {
  name: "Frigate Fly & Light Tackle Charters",
  shortName: "Frigate",

  /** Town or region you operate from, e.g. "Clearwater Beach, Florida". */
  serviceArea: "Sanibel Island, FL" as string | null,
  /** Street address for the marina / departure point, if public. */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  },
  phone: "(704) 999-0571" as string | null,
  email: "frigateflycharters@gmail.com" as string | null,
  /** Typical reply time for booking requests, e.g. "within 24 hours". */
  replyTime: null as string | null,

  social: {
    instagram: "https://www.instagram.com/frigate_fly/" as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
    youtube: null as string | null,
  },

  /** Google Business Profile review link (opens the reviews panel). */
  googleReviewsUrl: null as string | null,
  /** Google Maps embed URL (Share → Embed a map → copy the src). */
  mapEmbedUrl: null as string | null,

  /**
   * Set to true once name, address and phone are real. Structured data
   * (LocalBusiness) is only published when this is true.
   */
  verified: true,
};

/**
 * Preview mode shows dashed notes wherever content still needs real
 * details. Turn it off for launch with NEXT_PUBLIC_SHOW_PLACEHOLDERS=false.
 */
export const showPlaceholders =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Adds the service area to a phrase when it is known. */
export function inArea(phrase: string) {
  return site.serviceArea ? `${phrase} in ${site.serviceArea}` : phrase;
}

/** Instagram handle shown as text, e.g. "@frigate_fly". */
export const instagramHandle = "@frigate_fly";

export const nav = [
  { href: "/charters", label: "Trips" },
  { href: "/fleet", label: "The boat" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
