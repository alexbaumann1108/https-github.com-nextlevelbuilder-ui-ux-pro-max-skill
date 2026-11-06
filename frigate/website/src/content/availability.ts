/**
 * When trips can be requested. Edit this when your schedule changes.
 *
 * Days are numbered 0 = Sunday ... 6 = Saturday. A day that isn't listed is
 * closed. `hours` lists the trip lengths offered that day (see rates.ts).
 *
 * Booked dates come from your bookings calendar (see README): any event on
 * that calendar blocks the whole day.
 */
export const weeklySchedule: Record<number, { hours: number[]; note?: string }> = {
  1: { hours: [4], note: "Mornings only (half day)" }, // Monday
  2: { hours: [4, 6, 8] }, // Tuesday
  3: { hours: [4, 6, 8] }, // Wednesday
  4: { hours: [4, 6, 8] }, // Thursday
  5: { hours: [4, 6, 8] }, // Friday
};

/** How far ahead people can request a date, in days. */
export const bookingWindowDays = 365;

/** Plain-language summary shown on the booking page. */
export const scheduleSummary = "Monday mornings, and Tuesday through Friday";
