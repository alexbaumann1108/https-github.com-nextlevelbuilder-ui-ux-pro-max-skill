"use client";

import Link from "next/link";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { site, showPlaceholders } from "@/content/site";
import { rates, formatPrice } from "@/content/rates";
import { bookingSchema, experienceOptions } from "@/lib/inquiry";
import { dayStatus } from "@/lib/availability";
import { scheduleSummary } from "@/content/availability";
import { DateCalendar } from "./date-calendar";
import { ErrorSummary, Field } from "./field";
import { useInquiry } from "./use-inquiry";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingForm() {
  const params = useSearchParams();
  const qTrip = params.get("trip") ?? "";
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const f = useInquiry(
    bookingSchema,
    {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "2",
      experience: experienceOptions.some((o) => o.value === qTrip) ? qTrip : "",
      tripLength: "",
      message: "",
      website: "",
    },
    "booking",
    { form: formRef, summary: summaryRef },
  );
  const v = f.values;

  if (f.status.state === "success") {
    const exp = experienceOptions.find((o) => o.value === v.experience);
    const rate = rates.find((r) => String(r.hours) === v.tripLength);
    return (
      <div role="status">
        <p className="label text-orange-ink">Inquiry received</p>
        <h2 className="display-md mt-3">Thanks, {v.name.split(" ")[0]}. We&apos;ll be in touch.</h2>
        <p className="mt-4 text-ink-soft">
          Your trip isn&apos;t booked yet. We&apos;ll check the tides and the
          calendar for your date and reply to {v.email} or call you to plan the
          day and confirm.
        </p>
        {!f.status.delivered && showPlaceholders && (
          <p className="mt-6 rounded-sm border border-dashed border-alert/60 bg-alert/5 px-3 py-2 text-sm text-alert">
            <strong>Preview only:</strong> no delivery destination is set, so this
            inquiry was not sent anywhere. See the README to connect your email or
            booking system.
          </p>
        )}
        <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-tan/50 pt-6 text-sm sm:grid-cols-2">
          {[
            ["Reference", f.status.ref],
            ["Fishing", exp?.label ?? ""],
            ["Trip", rate ? `${rate.name}, ${rate.hours} hours (${formatPrice(rate.price)})` : ""],
            ["Preferred date", formatDate(v.date)],
            ["Anglers", v.guests],
            ["Phone", v.phone],
          ].map(([k, val]) => (
            <div key={k}>
              <dt className="label text-ink-soft">{k}</dt>
              <dd className="mt-0.5 font-semibold">{val}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/fishery" className="btn btn-ink">
            Read about the fishery
          </Link>
          <a href={site.instagram.url} target="_blank" rel="noopener" className="btn btn-ink">
            See {site.instagram.handle}
          </a>
        </div>
      </div>
    );
  }

  const submitting = f.status.state === "submitting";
  const chosen = v.date ? dayStatus(v.date) : null;
  const allowedHours = chosen && chosen.open && chosen.hours.length < rates.length ? chosen.hours : null;
  const mondayNote = !!allowedHours;
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    f.set(k, e.target.value);
  const blur = (k: keyof typeof v) => () => f.blur(k);

  return (
    <form ref={formRef} onSubmit={f.submit} noValidate className="space-y-10">
      <ErrorSummary
        count={f.errorCount}
        message={f.status.state === "error" ? f.status.message : undefined}
        summaryRef={summaryRef}
      />

      <fieldset className="space-y-6">
        <legend className="mb-6 font-display text-[1.6rem]">About you</legend>
        <Field label="Your name" error={f.errors.name}>
          <input name="name" className="field" autoComplete="name" value={v.name} onChange={set("name")} onBlur={blur("name")} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Email" error={f.errors.email}>
            <input type="email" name="email" className="field" autoComplete="email" inputMode="email" value={v.email} onChange={set("email")} onBlur={blur("email")} />
          </Field>
          <Field label="Phone number" error={f.errors.phone}>
            <input type="tel" name="phone" className="field" autoComplete="tel" inputMode="tel" value={v.phone} onChange={set("phone")} onBlur={blur("phone")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 font-display text-[1.6rem]">Your trip</legend>
        <Field label="Type of fishing" error={f.errors.experience}>
          <select name="experience" className="field" value={v.experience} onChange={set("experience")} onBlur={blur("experience")}>
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
        <Field label="Trip length" error={f.errors.tripLength}>
          <select name="tripLength" className="field" value={v.tripLength} onChange={set("tripLength")} onBlur={blur("tripLength")}>
            <option value="" disabled>
              Choose a trip length
            </option>
            {rates.map((r) => (
              <option key={r.hours} value={String(r.hours)} disabled={!!allowedHours && !allowedHours.includes(r.hours)}>
                {r.name}, {r.hours} hours ({formatPrice(r.price)})
                {allowedHours && !allowedHours.includes(r.hours) ? " (not on Mondays)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <div>
          <p id="date-label" className="field-label">
            Preferred fishing date
          </p>
          <p id="date-hint" className="-mt-0.5 mb-3 text-sm text-ink-soft">
            Trips run {scheduleSummary}. Greyed-out dates aren&apos;t available.
          </p>
          <DateCalendar
            id="date-field"
            value={v.date}
            invalid={!!f.errors.date}
            describedBy={`date-label date-hint${f.errors.date ? " date-error" : ""}`}
            onChange={(d) => {
              const s = dayStatus(d);
              const fits = s.open && s.hours.map(String).includes(v.tripLength);
              f.setMany(fits || !s.open || !v.tripLength ? { date: d } : { date: d, tripLength: String(s.open ? s.hours[0] : "") });
            }}
          />
          {mondayNote && (
            <p className="mt-2 text-sm text-orange-ink">Monday trips are morning half days (4 hours).</p>
          )}
          {f.errors.date && (
            <p id="date-error" className="field-error">
              {f.errors.date}
            </p>
          )}
        </div>
        <Field label="Number of anglers" error={f.errors.guests}>
          <AnglerStepper value={v.guests} onChange={(n) => f.set("guests", n)} onBlur={blur("guests")} />
        </Field>
        <Field
          label="Questions or comments"
          optional
          hint="Fly or spin, experience level, the fish you'd love to catch, anything else."
          error={f.errors.message}
        >
          <textarea name="message" className="field" rows={5} value={v.message} onChange={set("message")} onBlur={blur("message")} />
        </Field>
        {/* Honeypot: hidden from people, filled by bots. */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
          </label>
        </div>
      </fieldset>

      <div className="space-y-4">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending inquiry…" : "Send booking inquiry"}
        </button>
        <p className="text-sm text-ink-soft">
          This is an inquiry, not a confirmed booking. We use your details only to
          plan your trip. See our{" "}
          <Link href="/privacy" className="link">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function AnglerStepper({
  value,
  onChange,
  onBlur,
  ...aria
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const n = Number(value) || 0;
  const step = (d: number) => onChange(String(Math.min(10, Math.max(1, n + d))));
  return (
    <div className="flex items-stretch">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={n <= 1}
        className="w-14 shrink-0 rounded-l-[3px] border-[1.5px] border-r-0 border-[#cbbd9f] bg-paper text-xl disabled:opacity-40"
        aria-label="Fewer anglers"
      >
        −
      </button>
      <input
        {...aria}
        name="guests"
        inputMode="numeric"
        pattern="[0-9]*"
        className="field !rounded-none text-center"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={() => step(1)}
        disabled={n >= 10}
        className="w-14 shrink-0 rounded-r-[3px] border-[1.5px] border-l-0 border-[#cbbd9f] bg-paper text-xl disabled:opacity-40"
        aria-label="More anglers"
      >
        +
      </button>
    </div>
  );
}
