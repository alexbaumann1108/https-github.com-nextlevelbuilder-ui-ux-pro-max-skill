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

/**
 * Suggested times for the calendar event created when you confirm a trip.
 * You can change them in Google Calendar before saving. A morning event
 * blocks the morning, an afternoon event the afternoon, and anything that
 * runs past noon from the morning blocks the whole day.
 */
export const slotTimes: Record<string, { start: string; end: string }> = {
  am: { start: "07:00", end: "11:00" }, // half day, morning
  pm: { start: "13:00", end: "17:00" }, // half day, afternoon
  "6h": { start: "07:00", end: "13:00" }, // three-quarter day
  "8h": { start: "07:00", end: "15:00" }, // full day
};
