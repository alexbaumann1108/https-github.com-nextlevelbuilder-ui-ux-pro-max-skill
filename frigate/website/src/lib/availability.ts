import { bookingWindowDays, weeklySchedule } from "@/content/availability";

/** Shared by the booking calendar, the form validation and the API. */

export type Slot = "am" | "pm";
/** Booked half-day slots by date, e.g. { "2026-11-10": ["am"] }. */
export type Booked = Record<string, Slot[]>;

export const HALF_DAY_HOURS = 4;
export const slotLabel: Record<Slot, string> = { am: "Morning", pm: "Afternoon" };

export type DayStatus =
  | {
      open: true;
      /** Half-day slots still free. */
      freeSlots: Slot[];
      /** Whether a three-quarter or full day still fits. */
      fullDay: boolean;
      /** Trip lengths (hours) that can still be booked. */
      hours: number[];
    }
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

export function dayStatus(iso: string, booked: Booked = {}, longHours: number[] = [6, 8]): DayStatus {
  if (iso < todayInFlorida()) return { open: false, reason: "past" };
  if (iso > todayInFlorida(bookingWindowDays)) return { open: false, reason: "too-far" };
  const rule = weeklySchedule[weekday(iso)];
  if (!rule) return { open: false, reason: "closed" };
  const taken = booked[iso] ?? [];
  const freeSlots = rule.slots.filter((s) => !taken.includes(s));
  if (!freeSlots.length) return { open: false, reason: "booked" };
  const fullDay = rule.fullDay && taken.length === 0;
  return { open: true, freeSlots, fullDay, hours: [HALF_DAY_HOURS, ...(fullDay ? longHours : [])] };
}

/** Error for a date, trip length and half-day slot, or null if it works. */
export function availabilityProblem(
  iso: string,
  hours: number | null,
  slot: Slot | "" | null,
  booked: Booked = {},
): { field: "date" | "tripLength" | "slot"; message: string } | null {
  const s = dayStatus(iso, booked);
  if (!s.open) {
    const message = {
      past: "Choose a date from today onwards.",
      "too-far": "Choose a date within the next year.",
      closed: "Trips run Monday mornings and Tuesday through Friday. Choose another date.",
      booked: "That date is fully booked. Choose another date.",
    }[s.reason];
    return { field: "date", message };
  }
  if (hours === null) return null;
  if (hours === HALF_DAY_HOURS) {
    if (!slot) return { field: "slot", message: "Choose a morning or afternoon trip." };
    if (!s.freeSlots.includes(slot)) {
      const rule = weeklySchedule[weekday(iso)];
      const message = rule?.slots.includes(slot)
        ? `The ${slotLabel[slot].toLowerCase()} is already booked that day. Choose the ${slotLabel[slot === "am" ? "pm" : "am"].toLowerCase()} or another date.`
        : "Monday trips run in the morning only.";
      return { field: "slot", message };
    }
    return null;
  }
  if (!s.fullDay) {
    const rule = weeklySchedule[weekday(iso)];
    return {
      field: "tripLength",
      message: rule?.fullDay
        ? "Only a half day is still open on this date. Choose the half day or another date."
        : "Monday trips are morning half days (4 hours). Choose the half day or another date.",
    };
  }
  return null;
}
