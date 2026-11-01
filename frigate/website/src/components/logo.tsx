import Image from "next/image";
import { site } from "@/content/site";

/**
 * Frigate brand artwork. `wordmark` is the bird and "Frigate" lettering
 * for the header; `full` adds the "Fly & Light Tackle Charters" line.
 */
export function Logo({
  tone = "light",
  variant = "wordmark",
  className = "",
  priority,
}: {
  tone?: "light" | "dark";
  variant?: "wordmark" | "full";
  className?: string;
  priority?: boolean;
}) {
  const color = tone === "light" ? "white" : "black";
  const src =
    variant === "wordmark"
      ? `/brand/frigate-wordmark-${color}.png`
      : `/brand/frigate-logo-${color}.png`;
  const [w, h] = variant === "wordmark" ? [733, 326] : [765, 400];
  return (
    <Image
      src={src}
      alt={site.name}
      width={w}
      height={h}
      priority={priority}
      sizes="240px"
      className={`h-auto ${className}`}
    />
  );
}
