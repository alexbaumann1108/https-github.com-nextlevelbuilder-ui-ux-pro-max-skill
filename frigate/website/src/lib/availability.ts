import { bookingWindowDays, weeklySchedule } from "@/content/availability";

/** Shared by the booking calendar, the form validation and the API. */

export type DayStatus =
  | { open: true; hours: number[]; note?: string }
  | { open: false; reason: "past" | "closed" | "booked" | "too-far" };

/** Day of week for a YYYY-MM-DD date, independent of time zone. */
export function weekday(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Today in Southwest Florida as YYYY-MM-DD. */
export function todayInFlorida(offsetDays = 0) {
  const now = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function dayStatus(iso: string, booked: ReadonlySet<string> = new Set()): DayStatus {
  if (iso < todayInFlorida()) return { open: false, reason: "past" };
  if (iso > todayInFlorida(bookingWindowDays)) return { open: false, reason: "too-far" };
  const rule = weeklySchedule[weekday(iso)];
  if (!rule) return { open: false, reason: "closed" };
  if (booked.has(iso)) return { open: false, reason: "booked" };
  return { open: true, hours: rule.hours, note: rule.note };
}

/** Error message for a date and trip length, or null if it works. */
export function availabilityProblem(
  iso: string,
  hours: number | null,
  booked: ReadonlySet<string> = new Set(),
): { field: "date" | "tripLength"; message: string } | null {
  const s = dayStatus(iso, booked);
  if (!s.open) {
    const message = {
      past: "Choose a date from today onwards.",
      "too-far": "Choose a date within the next year.",
      closed: "Trips run Monday mornings and Tuesday through Friday. Choose another date.",
      booked: "That date is already booked. Choose another date.",
    }[s.reason];
    return { field: "date", message };
  }
  if (hours !== null && !s.hours.includes(hours)) {
    return {
      field: "tripLength",
      message: "Monday trips are morning half days (4 hours). Choose the half day or another date.",
    };
  }
  return null;
}
