"use client";

import { useState } from "react";
import type { z } from "zod";
import { toFieldErrors, type FieldErrors, type InquiryResponse } from "@/lib/inquiry";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; ref: string; delivered: boolean }
  | { state: "error"; message: string };

/**
 * Form state for inquiry forms: validates a field when it loses focus,
 * everything on submit, moves focus to the first problem, and posts to the
 * API route.
 */
export function useInquiry<T extends Record<string, string>>(
  schema: z.ZodType,
  initial: T,
  kind: "booking" | "contact",
  refs: {
    form: React.RefObject<HTMLFormElement | null>;
    summary: React.RefObject<HTMLDivElement | null>;
  },
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  function validate(next: T) {
    const result = schema.safeParse({ ...next, kind });
    return result.success ? {} : toFieldErrors(result.error);
  }

  function set(name: keyof T, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has been visited, keep its message in step with typing.
    if (touched[name as string]) {
      const all = validate(next);
      setErrors((e) => ({ ...e, [name]: all[name as string] }));
    }
  }

  /** Change several fields at once (e.g. a date that limits trip length). */
  function setMany(patch: Partial<T>) {
    const next = { ...values, ...patch };
    setValues(next);
    const touchedKeys = Object.keys(patch).filter((k) => touched[k]);
    if (touchedKeys.length) {
      const all = validate(next);
      setErrors((e) => ({ ...e, ...Object.fromEntries(touchedKeys.map((k) => [k, all[k]])) }));
    }
  }

  function blur(name: keyof T) {
    setTouched((t) => ({ ...t, [name]: true }));
    const all = validate(values);
    setErrors((e) => ({ ...e, [name]: all[name as string] }));
  }

  function focusFirstError(errs: FieldErrors) {
    const first = Object.keys(errs)[0];
    if (!first) return;
    const el = refs.form.current?.querySelector<HTMLElement>(`[name="${first}"], [data-field="${first}"]`);
    if (el) el.focus();
    else refs.summary.current?.focus();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status.state === "submitting") return;
    const errs = validate(values);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ state: "idle" });
      requestAnimationFrame(() => focusFirstError(errs));
      return;
    }
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind }),
      });
      const data = (await res.json()) as InquiryResponse;
      if (data.ok) {
        // The form unmounts on success, so find its section first.
        const section = refs.form.current?.closest("section");
        setStatus({ state: "success", ref: data.ref, delivered: data.delivered });
        requestAnimationFrame(() => section?.scrollIntoView({ block: "start" }));
        return;
      }
      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        requestAnimationFrame(() => focusFirstError(data.fieldErrors!));
      }
      setStatus({ state: "error", message: data.error });
    } catch {
      setStatus({
        state: "error",
        message: "We could not reach the server. Check your connection and try again.",
      });
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return { values, set, setMany, blur, errors, status, submit, errorCount };
}
