"use client";

import Link from "next/link";
import { useRef } from "react";
import { site, showPlaceholders } from "@/content/site";
import { contactSchema } from "@/lib/inquiry";
import { ErrorSummary, Field } from "./field";
import { useInquiry } from "./use-inquiry";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const f = useInquiry(
    contactSchema,
    { name: "", email: "", phone: "", message: "", website: "" },
    "contact",
    { form: formRef, summary: summaryRef },
  );
  const v = f.values;

  if (f.status.state === "success") {
    return (
      <div className="bg-white p-6 sm:p-10" role="status">
        <h2 className="display-md">Message sent</h2>
        <p className="mt-4 text-slate">
          Thanks, {v.name.split(" ")[0]}. We will reply to {v.email}
          {site.replyTime ? ` ${site.replyTime}` : " as soon as we can"}. Your
          reference is <strong className="text-ink">{f.status.ref}</strong>.
        </p>
        {!f.status.delivered && showPlaceholders && (
          <p className="mt-6 rounded-sm border border-dashed border-alert/60 bg-alert/5 px-3 py-2 text-sm text-alert">
            <strong>Preview only:</strong> no delivery destination is set, so this
            message was not sent anywhere. Set INQUIRY_WEBHOOK_URL to receive
            messages.
          </p>
        )}
        <Link href="/book" className="btn btn-primary mt-8">
          Book your trip
        </Link>
      </div>
    );
  }

  const submitting = f.status.state === "submitting";

  return (
    <form ref={formRef} onSubmit={f.submit} noValidate className="space-y-6">
      <ErrorSummary
        count={f.errorCount}
        message={f.status.state === "error" ? f.status.message : undefined}
        summaryRef={summaryRef}
      />
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
        <Field label="Phone" optional error={f.errors.phone}>
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
      <Field label="Your message" error={f.errors.message}>
        <textarea
          name="message"
          className="field"
          rows={6}
          value={v.message}
          onChange={(e) => f.set("message", e.target.value)}
          onBlur={() => f.blur("message")}
        />
      </Field>
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
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending message…" : "Send message"}
      </button>
      <p className="text-sm text-slate">
        We use your details only to reply to you. See our{" "}
        <Link href="/privacy" className="underline">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
