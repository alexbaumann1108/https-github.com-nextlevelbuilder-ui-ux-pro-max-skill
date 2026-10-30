import { site } from "@/content/site";

/** Wordmark: the sun resting on the horizon line. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="30"
        height="20"
        viewBox="0 0 30 20"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M7 14a8 8 0 0 1 16 0" stroke="var(--color-champagne)" strokeWidth="1.5" />
        <path d="M0 14.75h30" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 18.25h12" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
      <span className="font-display text-[1.375rem] leading-none tracking-[0.04em]">
        {site.shortName}
      </span>
    </span>
  );
}
