import type { Booked } from "@/lib/availability";
import { getBooked } from "@/lib/booked-dates";
import { getHeld } from "@/lib/holds";

/** Everything that's taken: trips on the bookings calendar plus held requests. */
export async function getTaken() {
  const [cal, held] = await Promise.all([getBooked(), getHeld()]);
  const booked: Booked = { ...cal.booked };
  for (const [date, slots] of Object.entries(held)) {
    booked[date] = Array.from(new Set([...(booked[date] ?? []), ...slots]));
  }
  return { configured: cal.configured, ok: cal.ok, booked };
}
