"use client";

import { useEffect, useMemo, useState } from "react";
import { rates, formatPrice } from "@/content/rates";
import { weeklySchedule } from "@/content/availability";
import { experienceOptions } from "@/lib/inquiry";
import { weekday, slotLabel, todayInFlorida, type Booked, type Slot } from "@/lib/availability";
import {
  calendarLink,
  clock,
  confirmationMailto,
  confirmationSms,
  longDate,
  tripTimes,
  type TripInfo,
} from "@/lib/booking-links";
import { Field } from "./field";

type Values = {
  name: string;
  phone: string;
  email: string;
  date: string;
  experience: string;
  tripLength: string;
  slot: Slot | "";
  guests: string;
  message: string;
};

const blank: Values = {
  name: "",
  phone: "",
  email: "",
  date: "",
  experience: "",
  tripLength: "4",
  slot: "am",
  guests: "2",
  message: "",
};

export function AddBookingForm({ calendarId }: { calendarId: string | null }) {
  const [v, setV] = useState<Values>(blank);
  const [booked, setBooked] = useState<Booked>({});
  const set =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setV((x) => ({ ...x, [k]: e.target.value }));

  // What's already on the calendar, to warn about clashes.
  useEffect(() => {
    fetch("/api/availability", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { booked?: Booked }) => setBooked(d.booked ?? {}))
      .catch(() => {});
  }, []);

  const isHalf = v.tripLength === "4";
  const trip: TripInfo = {
    name: v.name.trim(),
    phone: v.phone.trim(),
    email: v.email.trim(),
    date: v.date,
    guests: Math.max(1, Number(v.guests) || 1),
    experience: v.experience || "undecided",
    tripLength: v.tripLength,
    slot: isHalf ? v.slot || "am" : "",
    message: v.message.trim(),
  };
  const ready = !!(trip.name && trip.date && v.experience);

  const warnings = useMemo(() => {
    if (!v.date) return [];
    const out: string[] = [];
    const taken = booked[v.date] ?? [];
    const needs: Slot[] = isHalf ? [v.slot || "am"] : ["am", "pm"];
    const clash = needs.filter((s) => taken.includes(s));
    if (clash.length)
      out.push(
        `Heads up: the ${clash.map((s) => slotLabel[s].toLowerCase()).join(" and ")} on this date already has a trip on your calendar.`,
      );
    if (!weeklySchedule[weekday(v.date)])
      out.push("You don't usually run trips on this day. That's fine for a direct booking; the website will block it once it's on your calendar.");
    if (v.date < todayInFlorida()) out.push("This date is in the past.");
    return out;
  }, [v.date, v.slot, isHalf, booked]);

  const { start, end } = tripTimes(trip);
  const rate = rates.find((r) => String(r.hours) === v.tripLength);

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="space-y-5">
        <legend className="mb-4 font-display text-[1.6rem]">The trip</legend>
        <Field label="Date">
          <input type="date" className="field" value={v.date} onChange={set("date")} />
        </Field>
        <Field label="Trip length">
          <select className="field" value={v.tripLength} onChange={set("tripLength")}>
            {rates.map((r) => (
              <option key={r.hours} value={String(r.hours)}>
                {r.name}, {r.hours} hours ({formatPrice(r.price)})
              </option>
            ))}
          </select>
        </Field>
        {isHalf && (
          <fieldset>
            <legend className="field-label">Morning or afternoon</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {(["am", "pm"] as Slot[]).map((s) => (
                <label
                  key={s}
                  className={`flex cursor-pointer items-center justify-center rounded-[3px] border-[1.5px] px-4 py-3 font-semibold ${
                    v.slot === s ? "border-seafoam-deep bg-seafoam-deep text-paper" : "border-[#cbbd9f] bg-paper"
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={s}
                    checked={v.slot === s}
                    onChange={() => setV((x) => ({ ...x, slot: s }))}
                    className="sr-only"
                  />
                  {slotLabel[s]}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <Field label="Type of fishing">
          <select className="field" value={v.experience} onChange={set("experience")}>
            <option value="" disabled>
              Choose a fishery
            </option>
            {experienceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Anglers">
          <input type="number" min={1} max={10} inputMode="numeric" className="field" value={v.guests} onChange={set("guests")} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-4 font-display text-[1.6rem]">The customer</legend>
        <Field label="Name">
          <input className="field" autoComplete="off" value={v.name} onChange={set("name")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" optional>
            <input type="tel" inputMode="tel" className="field" autoComplete="off" value={v.phone} onChange={set("phone")} />
          </Field>
          <Field label="Email" optional>
            <input type="email" inputMode="email" className="field" autoComplete="off" value={v.email} onChange={set("email")} />
          </Field>
        </div>
        <Field label="Notes" optional>
          <textarea className="field" rows={3} value={v.message} onChange={set("message")} />
        </Field>
      </fieldset>

      {warnings.length > 0 && (
        <div className="space-y-1 rounded-[3px] border-[1.5px] border-orange/60 bg-orange/10 px-4 py-3 text-sm text-ink">
          {warnings.map((w) => (
            <p key={w}>{w}</p>
          ))}
        </div>
      )}

      <div className="rounded-[3px] border-[1.5px] border-tan bg-paper/70 p-5 sm:p-6">
        <p className="label text-ink-soft">Summary</p>
        <p className="mt-2 font-semibold">
          {ready ? (
            <>
              {trip.name}, {longDate(trip.date)}
              <br />
              {isHalf ? `${slotLabel[trip.slot || "am"]} half day` : rate?.name}, {clock(start)} to {clock(end)}
              {rate ? `, ${formatPrice(rate.price)}` : ""}
            </>
          ) : (
            "Fill in the date, type of fishing and the customer's name."
          )}
        </p>

        <ol className="mt-5 space-y-4">
          <li>
            <a
              href={ready ? calendarLink(trip, calendarId) : undefined}
              target="_blank"
              rel="noopener"
              aria-disabled={!ready}
              className={`btn btn-primary w-full sm:w-auto ${ready ? "" : "pointer-events-none opacity-40"}`}
            >
              1. Add to my calendar
            </a>
            <p className="mt-2 text-sm text-ink-soft">
              Opens Google Calendar with the trip filled in. Check it says <b>Frigate Fly Bookings</b>, then save.
              The website blocks that time within about 5 minutes.
            </p>
          </li>
          <li className="flex flex-col gap-3 sm:flex-row">
            <a
              href={ready && trip.phone ? confirmationSms(trip) : undefined}
              aria-disabled={!(ready && trip.phone)}
              className={`btn btn-ink w-full sm:w-auto ${ready && trip.phone ? "" : "pointer-events-none opacity-40"}`}
            >
              2. Text the confirmation
            </a>
            <a
              href={ready && trip.email ? confirmationMailto(trip) : undefined}
              aria-disabled={!(ready && trip.email)}
              className={`btn btn-ink w-full sm:w-auto ${ready && trip.email ? "" : "pointer-events-none opacity-40"}`}
            >
              Email the confirmation
            </a>
          </li>
        </ol>
        <p className="mt-3 text-sm text-ink-soft">
          The confirmation includes the trip details and your cancellation policy.
        </p>
      </div>

      <button type="button" className="link text-sm font-bold" onClick={() => setV(blank)}>
        Clear and add another
      </button>
    </form>
  );
}
