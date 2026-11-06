
/**
 * Reads the owner's bookings calendar (an iCal / .ics feed from Google
 * Calendar or Apple iCloud) and returns every date that has an event.
 *
 * Set BOOKING_CALENDAR_ICS_URL to the calendar's secret iCal address. The
 * address stays on the server and is never sent to visitors.
 */

const TZ = "America/New_York";
const TTL_MS = 5 * 60 * 1000;
const MAX_DAYS_PER_EVENT = 60;

let cache: { at: number; dates: string[] } | null = null;

export type BookedDates = { configured: boolean; ok: boolean; dates: string[] };

export async function getBookedDates(): Promise<BookedDates> {
  const url = process.env.BOOKING_CALENDAR_ICS_URL?.trim().replace(/^webcal:\/\//i, "https://");
  if (!url) return { configured: false, ok: true, dates: [] };
  if (cache && Date.now() - cache.at < TTL_MS) return { configured: true, ok: true, dates: cache.dates };
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Calendar responded ${res.status}`);
    const dates = parseIcsDates(await res.text());
    cache = { at: Date.now(), dates };
    return { configured: true, ok: true, dates };
  } catch (err) {
    console.error("[availability] could not read the bookings calendar:", err instanceof Error ? err.message : err);
    // Fall back to the last good copy rather than showing everything open.
    return { configured: true, ok: false, dates: cache?.dates ?? [] };
  }
}

/** Calendar date (YYYY-MM-DD) of a moment, in Florida time. */
function floridaDate(d: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

type Stamp = { date: string; time: string | null };

/** Parse a DTSTART/DTEND property into a local date (and time, if any). */
function parseStamp(line: string | undefined): Stamp | null {
  if (!line) return null;
  const value = line.slice(line.lastIndexOf(":") + 1).trim();
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, hh, mm, ss, z] = m;
  if (!hh) return { date: `${y}-${mo}-${d}`, time: null }; // all-day
  if (z) {
    // UTC time: convert to the Florida calendar day.
    const utc = new Date(Date.UTC(+y, +mo - 1, +d, +hh, +mm, +ss));
    return { date: floridaDate(utc), time: `${hh}${mm}${ss}` };
  }
  // TZID or floating time: the date part is already local.
  return { date: `${y}-${mo}-${d}`, time: `${hh}${mm}${ss}` };
}

function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export function parseIcsDates(ics: string): string[] {
  // Unfold continuation lines (RFC 5545: a line starting with space or tab).
  const lines = ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
  const dates = new Set<string>();
  let ev: Record<string, string> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") ev = {};
    else if (line === "END:VEVENT" && ev) {
      const val = (line?: string) => (line ? line.slice(line.lastIndexOf(":") + 1).trim() : "");
      const cancelled = /^CANCELLED$/i.test(val(ev.STATUS));
      const free = /^TRANSPARENT$/i.test(val(ev.TRANSP));
      const start = parseStamp(ev.DTSTART);
      if (start && !cancelled && !free) {
        const end = parseStamp(ev.DTEND);
        // Last day the event touches. All-day ends and midnight ends are exclusive.
        let last = start.date;
        if (end) {
          last = !end.time || end.time === "000000" ? addDays(end.date, -1) : end.date;
          if (last < start.date) last = start.date;
        }
        for (let day = start.date, i = 0; day <= last && i < MAX_DAYS_PER_EVENT; day = addDays(day, 1), i++) {
          dates.add(day);
        }
      }
      ev = null;
    } else if (ev) {
      const key = line.split(/[;:]/, 1)[0];
      if (["DTSTART", "DTEND", "STATUS", "TRANSP"].includes(key)) ev[key] = line;
    }
  }

  const from = floridaDate(new Date(Date.now() - 86_400_000));
  return [...dates].filter((d) => d >= from).sort();
}
