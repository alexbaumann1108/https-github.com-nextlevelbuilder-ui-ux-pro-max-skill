import type { Booked, Slot } from "@/lib/availability";

/**
 * Reads the owner's bookings calendar (an iCal / .ics feed from Google
 * Calendar or Apple iCloud) and returns which half days are taken.
 *
 * An event touching the morning (before noon) blocks the morning; one
 * touching the afternoon (noon or later) blocks the afternoon. All-day and
 * long events block both.
 *
 * Set BOOKING_CALENDAR_ICS_URL to the calendar's secret iCal address. The
 * address stays on the server and is never sent to visitors.
 */

const TZ = "America/New_York";
const TTL_MS = 5 * 60 * 1000;
const MAX_DAYS_PER_EVENT = 60;
const NOON = 12 * 60;

let cache: { at: number; booked: Booked } | null = null;

export type BookedResult = { configured: boolean; ok: boolean; booked: Booked };

export async function getBooked(): Promise<BookedResult> {
  const url = process.env.BOOKING_CALENDAR_ICS_URL?.trim().replace(/^webcal:\/\//i, "https://");
  if (!url) return { configured: false, ok: true, booked: {} };
  if (cache && Date.now() - cache.at < TTL_MS) return { configured: true, ok: true, booked: cache.booked };
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Calendar responded ${res.status}`);
    const booked = parseIcs(await res.text());
    cache = { at: Date.now(), booked };
    return { configured: true, ok: true, booked };
  } catch (err) {
    console.error("[availability] could not read the bookings calendar:", err instanceof Error ? err.message : err);
    // Fall back to the last good copy rather than showing everything open.
    return { configured: true, ok: false, booked: cache?.booked ?? {} };
  }
}

/** A calendar moment as a Florida date plus minutes after midnight (null = all day). */
type Stamp = { date: string; minutes: number | null };

const floridaParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function toFlorida(d: Date): Stamp {
  const p = Object.fromEntries(floridaParts.formatToParts(d).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

function parseStamp(line: string | undefined): Stamp | null {
  if (!line) return null;
  const value = line.slice(line.lastIndexOf(":") + 1).trim();
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, hh, mm, ss, z] = m;
  if (!hh) return { date: `${y}-${mo}-${d}`, minutes: null }; // all-day
  if (z) return toFlorida(new Date(Date.UTC(+y, +mo - 1, +d, +hh, +mm, +ss)));
  // TZID or floating time: already local.
  return { date: `${y}-${mo}-${d}`, minutes: +hh * 60 + +mm };
}

function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export function parseIcs(ics: string): Booked {
  // Unfold continuation lines (RFC 5545: a line starting with space or tab).
  const lines = ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
  const out = new Map<string, Set<Slot>>();
  const mark = (date: string, slot: Slot) => {
    if (!out.has(date)) out.set(date, new Set());
    out.get(date)!.add(slot);
  };
  const val = (line?: string) => (line ? line.slice(line.lastIndexOf(":") + 1).trim() : "");
  let ev: Record<string, string> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") ev = {};
    else if (line === "END:VEVENT" && ev) {
      const start = parseStamp(ev.DTSTART);
      const skip = /^CANCELLED$/i.test(val(ev.STATUS)) || /^TRANSPARENT$/i.test(val(ev.TRANSP));
      if (start && !skip) {
        const end = parseStamp(ev.DTEND);
        if (start.minutes === null) {
          // All-day: DTEND is the day after the last day.
          let last = end ? addDays(end.date, -1) : start.date;
          if (last < start.date) last = start.date;
          for (let day = start.date, i = 0; day <= last && i < MAX_DAYS_PER_EVENT; day = addDays(day, 1), i++) {
            mark(day, "am");
            mark(day, "pm");
          }
        } else {
          const stop = end && end.minutes !== null ? end : { date: start.date, minutes: start.minutes + 60 };
          for (let day = start.date, i = 0; day <= stop.date && i < MAX_DAYS_PER_EVENT; day = addDays(day, 1), i++) {
            const from = day === start.date ? start.minutes : 0;
            const to = day === stop.date ? (stop.minutes as number) : 24 * 60;
            if (to <= from) continue; // e.g. an event ending exactly at midnight
            if (from < NOON) mark(day, "am");
            if (to > NOON) mark(day, "pm");
          }
        }
      }
      ev = null;
    } else if (ev) {
      const key = line.split(/[;:]/, 1)[0];
      if (["DTSTART", "DTEND", "STATUS", "TRANSP"].includes(key)) ev[key] = line;
    }
  }

  const from = toFlorida(new Date(Date.now() - 86_400_000)).date;
  const booked: Booked = {};
  for (const [date, slots] of [...out.entries()].sort()) {
    if (date >= from) booked[date] = (["am", "pm"] as Slot[]).filter((s) => slots.has(s));
  }
  return booked;
}
