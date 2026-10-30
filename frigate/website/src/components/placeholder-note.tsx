import { showPlaceholders } from "@/content/site";

/**
 * A dashed note that marks content still needing real business details.
 * Hidden entirely when preview mode is off.
 */
export function PlaceholderNote({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!showPlaceholders) return null;
  const colors =
    tone === "dark"
      ? "border-champagne/60 text-champagne-light bg-white/5"
      : "border-ocean/45 text-ocean bg-ocean/5";
  return (
    <p
      className={`rounded-sm border border-dashed px-3 py-2 text-sm leading-snug ${colors} ${className}`}
    >
      <strong className="font-semibold">Placeholder:</strong> {children}
    </p>
  );
}
