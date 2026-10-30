"use client";

import { cloneElement, isValidElement, useId } from "react";

/**
 * Wraps one input with its label, optional hint and error message, and
 * wires up the matching aria attributes on the child control.
 */
export function Field({
  label,
  hint,
  error,
  optional,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactElement<Record<string, unknown>>;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal text-slate">(optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="-mt-0.5 mb-2 text-sm text-slate">
          {hint}
        </p>
      )}
      {control}
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ErrorSummary({
  count,
  message,
  summaryRef,
}: {
  count: number;
  message?: string;
  summaryRef: React.RefObject<HTMLDivElement | null>;
}) {
  const text =
    message ??
    (count > 0
      ? `${count === 1 ? "One detail needs" : `${count} details need`} attention before you can send.`
      : "");
  return (
    <div ref={summaryRef} tabIndex={-1} role="alert" aria-live="assertive" className="outline-none">
      {text && (
        <p className="border-l-2 border-alert bg-alert/5 px-4 py-3 text-sm text-alert">{text}</p>
      )}
    </div>
  );
}
