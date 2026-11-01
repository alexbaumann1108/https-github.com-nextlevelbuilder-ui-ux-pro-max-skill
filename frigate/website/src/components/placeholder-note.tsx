import { showPlaceholders } from "@/content/site";

/**
 * A dashed note marking content that still needs the owner's details.
 * Hidden entirely on the live site.
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
      ? "border-orange/70 text-parchment bg-white/5"
      : "border-orange-ink/60 text-orange-ink bg-orange/5";
  return (
    <p className={`rounded-sm border border-dashed px-3 py-2 text-sm leading-snug ${colors} ${className}`}>
      <strong className="font-bold">To fill in:</strong> {children}
    </p>
  );
}
