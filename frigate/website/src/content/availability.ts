/**
 * When trips can be requested. Edit this when your schedule changes.
 *
 * Days are numbered 0 = Sunday ... 6 = Saturday. A day that isn't listed is
 * closed.
 * - `slots`: the half-day trips offered that day ("am" morning, "pm"
 *   afternoon). Two half days can be booked on the same date.
 * - `fullDay`: whether longer trips (three-quarter and full day) run that
 *   day. They need the whole day free.
 *
 * Booked times come from your bookings calendar (see README): an event in
 * the morning blocks the morning, one in the afternoon blocks the
 * afternoon, and an all-day or long event blocks both.
 */
export const weeklySchedule: Record<number, { slots: ("am" | "pm")[]; fullDay: boolean }> = {
  1: { slots: ["am"], fullDay: false }, // Monday: mornings only
  2: { slots: ["am", "pm"], fullDay: true }, // Tuesday
  3: { slots: ["am", "pm"], fullDay: true }, // Wednesday
  4: { slots: ["am", "pm"], fullDay: true }, // Thursday
  5: { slots: ["am", "pm"], fullDay: true }, // Friday
};

/** How far ahead people can request a date, in days. */
export const bookingWindowDays = 365;

/** Plain-language summary shown on the booking page. */
export const scheduleSummary = "Monday mornings, and Tuesday through Friday";
