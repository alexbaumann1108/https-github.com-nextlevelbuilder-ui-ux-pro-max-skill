/**
 * Hand-drawn illustrations from the Frigate brand artwork. Each PNG is used
 * as a stencil, so the drawing takes whatever ink color the page needs.
 */
const art = {
  emblem: { w: 1079, h: 654, alt: "A frigatebird flying past a palm island" },
  fly: { w: 492, h: 231, alt: "A saltwater fly" },
  "fly-small": { w: 217, h: 118, alt: "A small saltwater fly" },
  "fly-caster": { w: 652, h: 666, alt: "A fly angler casting from the shallows" },
  "palm-sunset": { w: 1041, h: 224, alt: "A palm island on the horizon" },
  "boat-sketch": { w: 1200, h: 655, alt: "A sketch of a flats skiff on the water" },
  bird: { w: 1090, h: 360, alt: "A frigatebird in flight" },
  "icon-fly": { w: 190, h: 193, alt: "A fly" },
  "icon-lure": { w: 247, h: 120, alt: "A lure" },
  "icon-florida": { w: 198, h: 194, alt: "Outline of Florida" },
  "icon-hook": { w: 113, h: 197, alt: "A fish hook" },
} as const;

export type ArtName = keyof typeof art;

export function Illustration({
  name,
  className = "",
  color = "currentColor",
  decorative = true,
  style,
}: {
  name: ArtName;
  className?: string;
  color?: string;
  decorative?: boolean;
  style?: React.CSSProperties;
}) {
  const a = art[name];
  const url = `url(/illustrations/${name}.png)`;
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : a.alt}
      aria-hidden={decorative ? true : undefined}
      className={`block ${className}`}
      style={{
        aspectRatio: `${a.w} / ${a.h}`,
        backgroundColor: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}
