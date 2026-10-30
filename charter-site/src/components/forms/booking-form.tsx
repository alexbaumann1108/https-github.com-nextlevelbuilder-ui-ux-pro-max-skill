"use client";

import Link from "next/link";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { experiences, getExperience } from "@/content/experiences";
import { fleet, getVessel } from "@/content/fleet";
import { site, showPlaceholders } from "@/content/site";
import { bookingSchema, timeOptions, todayISO } from "@/lib/inquiry";
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
  const qExperience = params.get("experience") ?? "";
  const qVessel = params.get("vessel") ?? "";

  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const f = useInquiry(
    bookingSchema,
    {
      experience: getExperience(qExperience) ? qExperience : "",
      vessel: getVessel(qVessel) ? qVessel : "any",
      date: "",
      time: "",
      guests: "2",
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
    "booking",
    { form: formRef, summary: summaryRef },
  );
  const v = f.values;
  const vessel = getVessel(v.vessel);
  const maxGuests = vessel?.capacity ?? 150;

  if (f.status.state === "success") {
    const exp = getExperience(v.experience);
    return (
      <div className="bg-white p-6 shadow-[0_1px_0_rgb(16_36_53/0.06)] sm:p-10" role="status">
        <svg width="44" height="30" viewBox="0 0 30 20" fill="none" aria-hidden="true">
          <path d="M7 14a8 8 0 0 1 16 0" stroke="var(--color-champagne)" strokeWidth="1.5" />
          <path d="M0 14.75h30" stroke="var(--color-abyss)" strokeWidth="1.5" />
        </svg>
        <h2 className="display-md mt-6">Request sent</h2>
        <p className="lede mt-4 text-slate">
          Thank you, {v.name.split(" ")[0]}. Your charter is not booked yet: we
          will check availability for your date and reply
          {site.replyTime ? ` ${site.replyTime}` : ""} to confirm the details.
        </p>
        {!f.status.delivered && showPlaceholders && (
          <p className="mt-6 rounded-sm border border-dashed border-alert/60 bg-alert/5 px-3 py-2 text-sm text-alert">
            <strong>Preview only:</strong> no delivery destination is set, so this
            request was not sent anywhere. Set INQUIRY_WEBHOOK_URL to receive
            requests.
          </p>
        )}
        <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-ink/10 pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate">Reference</dt>
            <dd className="mt-0.5 font-semibold tracking-wide">{f.status.ref}</dd>
          </div>
          <div>
            <dt className="text-slate">Charter</dt>
            <dd className="mt-0.5">{exp?.name ?? "Not sure yet"}</dd>
          </div>
          <div>
            <dt className="text-slate">Boat</dt>
            <dd className="mt-0.5">{vessel?.name ?? "No preference"}</dd>
          </div>
          <div>
            <dt className="text-slate">Preferred date</dt>
            <dd className="mt-0.5">
              {formatDate(v.date)}, {timeOptions.find((t) => t.value === v.time)?.label.toLowerCase()}
            </dd>
          </div>
          <div>
            <dt className="text-slate">Guests</dt>
            <dd className="mt-0.5">{v.guests}</dd>
          </div>
          <div>
            <dt className="text-slate">We will reply to</dt>
            <dd className="mt-0.5 break-all">{v.email}</dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/charters" className="btn btn-dark">
            Back to charters
          </Link>
          <Link href="/" className="btn btn-dark">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const submitting = f.status.state === "submitting";

  return (
    <form ref={formRef} onSubmit={f.submit} noValidate className="space-y-10">
      <ErrorSummary
        count={f.errorCount}
        message={f.status.state === "error" ? f.status.message : undefined}
        summaryRef={summaryRef}
      />

      <fieldset className="space-y-6">
        <legend className="mb-6 font-display text-[1.75rem]">Your charter</legend>
        <Field label="Experience" error={f.errors.experience}>
          <select
            name="experience"
            className="field"
            value={v.experience}
            onChange={(e) => f.set("experience", e.target.value)}
            onBlur={() => f.blur("experience")}
          >
            <option value="" disabled>
              Choose a charter
            </option>
            {experiences.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
            <option value="undecided">Not sure yet, help me choose</option>
          </select>
        </Field>

        <Field label="Boat" error={f.errors.vessel}>
          <select
            name="vessel"
            className="field"
            value={v.vessel}
            onChange={(e) => f.set("vessel", e.target.value)}
            onBlur={() => f.blur("vessel")}
          >
            <option value="any">No preference</option>
            {fleet.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
                {b.capacity ? ` (up to ${b.capacity} guests)` : ""}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Preferred date" error={f.errors.date}>
            <input
              type="date"
              name="date"
              className="field"
              min={todayISO()}
              max={todayISO(730)}
              value={v.date}
              onChange={(e) => f.set("date", e.target.value)}
              onBlur={() => f.blur("date")}
            />
          </Field>
          <Field label="Preferred time" error={f.errors.time}>
            <select
              name="time"
              className="field"
              value={v.time}
              onChange={(e) => f.set("time", e.target.value)}
              onBlur={() => f.blur("time")}
            >
              <option value="" disabled>
                Choose a time
              </option>
              {timeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Number of guests"
          hint={vessel?.capacity ? `${vessel.name} takes up to ${vessel.capacity}.` : undefined}
          error={f.errors.guests}
        >
          <GuestStepper
            value={v.guests}
            max={maxGuests}
            onChange={(n) => f.set("guests", n)}
            onBlur={() => f.blur("guests")}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-6 font-display text-[1.75rem]">Your details</legend>
        <Field label="Full name" error={f.errors.name}>
          <input
            name="name"
            className="field"
            autoComplete="name"
            value={v.name}
            onChange={(e) => f.set("name", e.target.value)}
            onBlur={() => f.blur("name")}
          />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Email" error={f.errors.email}>
            <input
              type="email"
              name="email"
              className="field"
              autoComplete="email"
              inputMode="email"
              value={v.email}
              onChange={(e) => f.set("email", e.target.value)}
              onBlur={() => f.blur("email")}
            />
          </Field>
          <Field label="Phone" error={f.errors.phone}>
            <input
              type="tel"
              name="phone"
              className="field"
              autoComplete="tel"
              inputMode="tel"
              value={v.phone}
              onChange={(e) => f.set("phone", e.target.value)}
              onBlur={() => f.blur("phone")}
            />
          </Field>
        </div>
        <Field
          label="Anything we should know?"
          optional
          hint="The occasion, ages of children, accessibility needs, special requests."
          error={f.errors.message}
        >
          <textarea
            name="message"
            className="field"
            rows={5}
            value={v.message}
            onChange={(e) => f.set("message", e.target.value)}
            onBlur={() => f.blur("message")}
          />
        </Field>
        {/* Honeypot: hidden from people, filled by bots. */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={v.website}
              onChange={(e) => f.set("website", e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <div className="space-y-4">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting} aria-disabled={submitting}>
          {submitting ? "Sending request…" : "Send booking request"}
        </button>
        <p className="text-sm text-slate">
          Sending a request does not commit you to anything. We use your details
          only to reply about this charter. See our{" "}
          <Link href="/privacy" className="underline">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function GuestStepper({
  value,
  max,
  onChange,
  onBlur,
  ...aria
}: {
  value: string;
  max: number;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const n = Number(value) || 0;
  const step = (d: number) => onChange(String(Math.min(max, Math.max(1, n + d))));
  return (
    <div className="flex items-stretch">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={n <= 1}
        className="w-14 shrink-0 border border-r-0 border-[#b9c6d1] bg-white text-xl disabled:opacity-40"
        aria-label="Fewer guests"
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
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 3))}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={() => step(1)}
        disabled={n >= max}
        className="w-14 shrink-0 border border-l-0 border-[#b9c6d1] bg-white text-xl disabled:opacity-40"
        aria-label="More guests"
      >
        +
      </button>
    </div>
  );
}
