import { site } from "@/content/site";
import { rates, formatPrice } from "@/content/rates";
import { slotTimes } from "@/content/availability";
import { cancellationPolicy } from "@/content/policies";
import { experienceOptions } from "@/lib/inquiry";
import { slotLabel, type Slot } from "@/lib/availability";

/**
 * Links shared by the booking email (website requests) and the Add a booking
 * page (trips booked directly with the captain). Safe to use in the browser.
 */

export type TripInfo = {
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  guests: number;
  experience: string;
  tripLength: string; // "4" | "6" | "8"
  slot: Slot | "";
  message: string;
  /** Website request reference; missing for direct bookings. */
  ref?: string;
};

export function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const clock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

/** Suggested start and end for the calendar event (editable before saving). */
export function tripTimes(b: Pick<TripInfo, "tripLength" | "slot">) {
  const key = b.tripLength === "4" ? b.slot || "am" : `${b.tripLength}h`;
  return slotTimes[key] ?? slotTimes.am;
}

export const experienceLabel = (slug: string) =>
  experienceOptions.find((o) => o.value === slug)?.label ?? slug;

/** "Morning half day", "Full day"... */
export function whenLabel(b: Pick<TripInfo, "tripLength" | "slot">) {
  const rate = rates.find((r) => String(r.hours) === b.tripLength);
  return b.tripLength === "4" ? `${slotLabel[b.slot || "am"]} half day` : rate?.name ?? "Trip";
}

/** The bookings calendar's ID, read from its iCal address. */
export function calendarIdFromIcs(url: string | undefined) {
  const m = url?.match(/\/ical\/([^/]+)\//);
  return m ? decodeURIComponent(m[1]) : null;
}

/** Google Calendar link that opens a new event with the trip filled in. */
export function calendarLink(b: TripInfo, calendarId: string | null) {
  const exp = experienceLabel(b.experience);
  const { start, end } = tripTimes(b);
  const stamp = (t: string) => `${b.date.replace(/-/g, "")}T${t.replace(":", "")}00`;
  const details = [
    `${b.name}, ${b.guests} angler${b.guests === 1 ? "" : "s"}`,
    b.phone ? `Phone: ${b.phone}` : "",
    b.email ? `Email: ${b.email}` : "",
    `Fishing: ${exp}`,
    b.message ? `Notes: ${b.message}` : "",
    b.ref ? `Website request ${b.ref}` : "Booked directly",
  ]
    .filter(Boolean)
    .join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Frigate trip: ${b.name} (${exp})`,
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: "America/New_York",
    details,
    location: site.location,
  });
  if (calendarId) params.set("src", calendarId);
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** The "you're booked" message, with the cancellation policy. */
export function confirmationMessage(b: TripInfo) {
  const exp = experienceLabel(b.experience);
  const rate = rates.find((r) => String(r.hours) === b.tripLength);
  const first = b.name.split(" ")[0];
  const when = whenLabel(b).toLowerCase();
  const subject = `Your Frigate trip on ${longDate(b.date)} is confirmed`;
  const body = `Hi ${first},\n\nYou're booked! ${exp}, ${when}, on ${longDate(b.date)}, for ${b.guests} angler${b.guests === 1 ? "" : "s"}${rate ? ` (${rate.name}, ${formatPrice(rate.price)})` : ""}.\n\nI'll be in touch the day before with the meeting spot and time.\n\n${cancellationPolicy.title}: ${cancellationPolicy.intro}\n${cancellationPolicy.items.map((i) => `- ${i}`).join("\n")}\n\nTight lines,\n${site.name}\n${site.phone}`;
  return { subject, body };
}

const query = (params: Record<string, string>) =>
  new URLSearchParams(params).toString().replace(/\+/g, "%20");

export function confirmationMailto(b: TripInfo) {
  const { subject, body } = confirmationMessage(b);
  return `mailto:${b.email}?${query({ subject, body })}`;
}

/** Opens Messages with the confirmation ready to send. */
export function confirmationSms(b: TripInfo) {
  const { body } = confirmationMessage(b);
  return `sms:${b.phone.replace(/[^\d+]/g, "")}?&${query({ body })}`;
}
