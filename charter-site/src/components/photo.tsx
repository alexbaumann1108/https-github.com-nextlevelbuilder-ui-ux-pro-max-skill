import Image from "next/image";
import type { Photo as PhotoType } from "@/content/types";
import { showPlaceholders } from "@/content/site";
import { Seascape } from "./seascape";

/**
 * Fills its (positioned, sized) parent with either the real photo or an
 * art-directed seascape placeholder.
 */
export function Photo({
  photo,
  sizes,
  priority,
  horizon,
  hideLabel,
  className = "",
}: {
  photo: PhotoType;
  sizes: string;
  priority?: boolean;
  horizon?: number;
  hideLabel?: boolean;
  className?: string;
}) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <>
      <Seascape
        scene={photo.scene}
        seed={photo.shot}
        horizon={horizon}
        label={photo.alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
      {showPlaceholders && !hideLabel && (
        <span className="pointer-events-none absolute left-3 top-3 z-[1] max-w-[calc(100%-1.5rem)] rounded-sm border border-dashed border-white/70 bg-abyss/55 px-2 py-1 text-[0.6875rem] leading-snug text-white backdrop-blur-sm">
          Placeholder photo: {photo.shot}
        </span>
      )}
    </>
  );
}
