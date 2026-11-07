"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bookingWindowDays } from "@/content/availability";
import { dayStatus, todayInFlorida, type Booked } from "@/lib/availability";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function longDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Month calendar for picking a trip date. Days outside the weekly schedule
 * and days already on the bookings calendar can't be chosen.
 */
export function DateCalendar({
  value,
  onChange,
  invalid,
  describedBy,
  id,
  onBooked,
}: {
  value: string;
  onChange: (iso: string) => void;
  invalid?: boolean;
  describedBy?: string;
  id?: string;
  /** Called with the booked half days once they load. */
  onBooked?: (b: Booked) => void;
}) {
  const today = todayInFlorida();
  const [ty, tm] = today.split("-").map(Number);
  const start = value ? value.split("-").map(Number) : [ty, tm];
  const [view, setView] = useState({ y: start[0], m: start[1] - 1 });
  const [booked, setBooked] = useState<Booked>({});
  const [state, setState] = useState<"loading" | "ready" | "offline">("loading");

  const onBookedRef = useRef(onBooked);
  useEffect(() => {
    onBookedRef.current = onBooked;
  });

  useEffect(() => {
    let alive = true;
    fetch("/api/availability", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { ok: boolean; booked: Booked }) => {
        if (!alive) return;
        setBooked(d.booked ?? {});
        onBookedRef.current?.(d.booked ?? {});
        setState(d.ok ? "ready" : "offline");
      })
      .catch(() => alive && setState("offline"));
    return () => {
      alive = false;
    };
  }, []);

  const last = todayInFlorida(bookingWindowDays).split("-").map(Number);
  const canPrev = view.y > ty || (view.y === ty && view.m > tm - 1);
  const canNext = view.y < last[0] || (view.y === last[0] && view.m < last[1] - 1);
  const move = (n: number) =>
    setView((v) => {
      const d = new Date(Date.UTC(v.y, v.m + n, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });

  const cells = useMemo(() => {
    const first = new Date(Date.UTC(view.y, view.m, 1)).getUTCDay();
    const days = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
    return [
      ...Array.from({ length: first }, () => null),
      ...Array.from({ length: days }, (_, i) => iso(view.y, view.m, i + 1)),
    ];
  }, [view]);

  const monthLabel = new Date(Date.UTC(view.y, view.m, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div
      id={id}
      data-field="date"
      tabIndex={-1}
      role="group"
      aria-describedby={describedBy}
      data-calendar=""
      className={`scroll-mt-32 rounded-[3px] border-[1.5px] bg-paper p-4 outline-none sm:p-5 ${
        invalid ? "border-alert" : "border-[#cbbd9f]"
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={!canPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl hover:bg-parchment-deep disabled:opacity-30"
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="font-display text-[1.25rem]" aria-live="polite" data-month>
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={!canNext}
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl hover:bg-parchment-deep disabled:opacity-30"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center" data-grid>
        {WEEKDAYS.map((w) => (
          <span key={w} className="label pb-1 text-ink-soft" aria-hidden="true">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} aria-hidden="true" />;
          const s = dayStatus(d, booked);
          const selected = d === value;
          // Only one half day left (or a Monday): show which one.
          const only = s.open && s.freeSlots.length === 1 ? s.freeSlots[0] : null;
          const label = `${longDate(d)}, ${
            s.open
              ? only
                ? `${only === "am" ? "morning" : "afternoon"} available`
                : "morning and afternoon available"
              : "not available"
          }`;
          return (
            <button
              key={d}
              type="button"
              data-date={d}
              disabled={!s.open}
              onClick={() => onChange(d)}
              aria-label={label}
              aria-pressed={selected}
              className={`relative flex h-11 flex-col items-center justify-center rounded-[3px] text-[0.95rem] transition-colors ${
                selected
                  ? "bg-seafoam-deep font-bold text-paper"
                  : s.open
                    ? "font-semibold text-ink hover:bg-seafoam-pale"
                    : "text-ink/30"
              } ${s.open ? "" : "line-through decoration-orange-ink/70"}`}
            >
              {Number(d.slice(8))}
              {only && (
                <span className={`label -mt-0.5 text-[0.6rem] leading-none ${selected ? "text-paper/85" : "text-orange-ink"}`}>
                  {only === "am" ? "AM" : "PM"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-tan/40 pt-3 text-xs text-ink-soft">
        <span>
          <span className="font-bold text-ink">12</span> available
        </span>
        <span>
          <span className="label text-orange-ink">AM</span>/<span className="label text-orange-ink">PM</span> only that half day open
        </span>
        <span>
          <span className="line-through decoration-orange-ink/70">12</span> not available
        </span>
        {state === "loading" && <span>Checking the calendar…</span>}
        {state === "offline" && <span>Couldn&apos;t check the latest bookings; we&apos;ll confirm your date.</span>}
      </div>
      {value && (
        <p className="mt-3 text-sm font-semibold" data-selected>
          Selected: {longDate(value)}
        </p>
      )}
    </div>
  );
}
