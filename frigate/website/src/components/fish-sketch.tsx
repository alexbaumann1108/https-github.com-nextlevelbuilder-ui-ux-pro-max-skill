import { useId } from "react";

export type Species = "snook" | "tarpon" | "redfish" | "baitfish";

type Drawing = {
  viewBox: string;
  body: string;
  /** Outline strokes: tail, fins, gill cover, mouth. */
  lines: string[];
  /** Heavier marks drawn on top (lateral line, spot). */
  marks?: { d: string; width: number; fill?: boolean }[];
  eye: [number, number, number];
  /** Back-shading hatch band: [x0, x1, step]. */
  hatch: [number, number, number];
  scale: number;
  /** Tail rays fan from the base to points along the tail edge. */
  tail: { base: [number, number]; edge: [number, number][]; rays: number };
  /** Lateral line as a straight approximation, for scale rows: x0,y0,x1,y1. */
  ll: [number, number, number, number];
};

/*
  Field-guide line drawings. Each fish faces right. Paths are kept simple and
  drawn with a slightly wobbly pencil filter so they read as hand-sketched.
*/
const drawings: Record<Species, Drawing> = {
  snook: {
    viewBox: "40 20 560 170",
    body: "M126 98 C205 78 300 60 400 62 C462 64 512 80 548 98 L572 110 L578 117 L563 121 C538 133 498 143 438 147 C338 152 220 138 126 122 Z",
    lines: [
      // forked tail
      "M126 98 C108 90 88 72 64 50 C76 80 80 99 74 110 C80 122 76 141 64 172 C88 150 108 132 126 122",
      // spiny dorsal
      "M352 63 L362 36 M352 63 C360 46 372 34 384 33 C396 32 404 44 410 64 M374 62 L380 35 M394 63 L394 38",
      // soft dorsal
      "M236 74 C250 56 270 50 296 52 C306 54 312 60 316 66",
      // anal fin
      "M210 136 C214 152 226 160 246 160 C252 152 252 146 250 140",
      // pelvic fin
      "M402 146 C404 160 412 168 424 170 C428 162 428 154 426 147",
      // pectoral fin
      "M470 112 C450 116 432 126 420 136 C440 134 458 126 472 120",
      // gill cover
      "M500 76 C484 96 484 124 504 142",
      // mouth
      "M576 116 L540 118",
    ],
    marks: [{ d: "M498 94 C420 86 300 98 160 108 C130 110 100 110 74 110", width: 3.2 }],
    eye: [535, 94, 5.5],
    hatch: [150, 520, 7],
    scale: 9,
    tail: { base: [128, 110], edge: [[64, 50], [76, 106], [64, 172]], rays: 14 },
    ll: [150, 108, 520, 92],
  },
  tarpon: {
    viewBox: "30 0 580 210",
    body: "M140 104 C200 64 320 40 420 44 C482 48 524 66 552 88 L582 74 L572 98 C566 120 542 140 500 152 C420 174 282 168 140 126 Z",
    lines: [
      "M140 104 C118 92 92 64 58 26 C80 70 86 100 80 115 C86 130 82 156 58 198 C92 166 120 140 140 126",
      // single dorsal with long last ray
      "M330 47 C338 32 346 20 356 14 C364 10 370 14 372 22 L382 44 M372 22 C352 4 312 0 276 10",
      // anal fin
      "M226 150 C230 170 246 182 268 182 C276 172 276 164 272 156",
      // pelvic
      "M392 168 C394 182 402 190 414 192 C418 184 418 176 416 168",
      // pectoral
      "M486 124 C466 130 446 142 434 154 C456 152 474 142 490 132",
      // gill cover and upturned jaw
      "M512 70 C494 92 494 124 518 146",
      "M582 74 L528 120",
    ],
    eye: [548, 88, 7],
    hatch: [170, 520, 8],
    scale: 16,
    tail: { base: [142, 114], edge: [[58, 26], [82, 114], [58, 198]], rays: 16 },
    ll: [160, 120, 520, 92],
  },
  redfish: {
    viewBox: "40 30 560 150",
    body: "M140 96 C210 70 320 56 410 58 C480 60 530 80 560 104 C566 112 562 122 552 128 C520 146 470 156 400 156 C300 156 210 140 140 124 Z",
    lines: [
      // square tail
      "M140 96 C120 90 100 80 70 70 C74 95 74 125 70 152 C100 142 120 132 140 124",
      // spiny dorsal
      "M380 59 L392 36 C402 32 416 32 428 36 L440 60 M404 58 L408 34 M420 58 L420 34",
      // soft dorsal
      "M252 70 C270 56 300 52 340 54 C356 56 366 58 372 60",
      // anal
      "M214 140 C218 156 230 164 248 164 C254 156 254 150 252 144",
      // pelvic
      "M420 154 C422 166 430 174 442 176 C446 168 446 160 444 154",
      // pectoral
      "M488 118 C470 122 452 132 442 142 C462 140 478 132 492 124",
      // gill cover and mouth
      "M508 80 C492 98 494 124 514 140",
      "M556 122 C548 128 540 130 530 127",
    ],
    marks: [{ d: "M168 104 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0", width: 1.5, fill: true }],
    eye: [532, 96, 5.5],
    hatch: [160, 520, 7],
    scale: 10,
    tail: { base: [142, 110], edge: [[70, 70], [76, 110], [70, 152]], rays: 12 },
    ll: [160, 108, 515, 92],
  },
  baitfish: {
    viewBox: "30 20 290 70",
    body: "M70 56 C120 40 200 36 262 48 L282 55 L264 62 C204 74 120 72 70 62 Z",
    lines: [
      "M70 56 C60 52 50 44 38 34 C44 46 46 54 44 59 C46 64 44 72 38 84 C50 74 60 66 70 62",
      "M150 44 C156 36 166 34 176 38",
      "M244 46 C238 52 238 60 246 66",
    ],
    marks: [{ d: "M240 54 C200 54 140 56 80 58", width: 1.3 }],
    eye: [262, 53, 3],
    hatch: [90, 240, 6],
    scale: 6,
    tail: { base: [72, 59], edge: [[38, 34], [46, 59], [38, 84]], rays: 7 },
    ll: [80, 58, 250, 53],
  },
};

/** Scientific names, for field-guide captions. */
export const scientificName: Record<Species, string> = {
  snook: "Centropomus undecimalis, the common snook",
  tarpon: "Megalops atlanticus, the silver king",
  redfish: "Sciaenops ocellatus, the red drum",
  baitfish: "Baitfish",
};

const labels: Record<Species, string> = {
  snook: "Sketch of a snook",
  tarpon: "Sketch of a tarpon",
  redfish: "Sketch of a redfish",
  baitfish: "Sketch of a baitfish",
};

export function FishSketch({
  species,
  className = "",
  stroke = "currentColor",
  draw = false,
  decorative = true,
}: {
  species: Species;
  className?: string;
  stroke?: string;
  /** Animate the strokes drawing in once (hero use). */
  draw?: boolean;
  decorative?: boolean;
}) {
  const d = drawings[species];
  const raw = useId().replace(/:/g, "");
  const id = `f${raw}`;
  const [, vy, , vh] = d.viewBox.split(" ").map(Number);

  // Deterministic jitter so drawings are stable between renders.
  let seed = species.length * 97;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Back shading: dense, slightly irregular strokes under the top of the body.
  const hatch: string[] = [];
  for (let x = d.hatch[0]; x <= d.hatch[1]; x += d.hatch[2] * 0.75) {
    const len = vh * (0.14 + rand() * 0.14);
    hatch.push(`M${x + rand() * 3} ${vy} l${-14 - rand() * 6} ${len}`);
  }

  // Scale rows that follow the lateral line, staggered like an engraving.
  const [lx0, ly0, lx1, ly1] = d.ll;
  const slope = (ly1 - ly0) / (lx1 - lx0);
  const s = d.scale;
  const scales: string[] = [];
  // Each scale is a small crescent whose free edge faces the tail.
  const h = s * 0.42;
  for (let row = -7; row <= 7; row++) {
    const off = row * h * 1.7;
    for (let x = lx0 + (row % 2 ? s * 0.38 : 0); x < lx1; x += s * 0.76) {
      const y = ly0 + (x - lx0) * slope + off;
      scales.push(
        `M${x.toFixed(1)} ${(y - h).toFixed(1)} Q${(x - s * 0.5).toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${(y + h).toFixed(1)}`,
      );
    }
  }

  // Tail rays fanning from the base to the edge of the tail.
  const rays: string[] = [];
  const pts = d.tail.edge;
  const segs = pts.length - 1;
  for (let i = 0; i < d.tail.rays; i++) {
    const t = (i + 0.5) / d.tail.rays;
    const seg = Math.min(segs - 1, Math.floor(t * segs));
    const local = t * segs - seg;
    const [ax, ay] = pts[seg];
    const [bx, by] = pts[seg + 1];
    const ex = ax + (bx - ax) * local;
    const ey = ay + (by - ay) * local;
    const [sx, sy] = d.tail.base;
    rays.push(`M${sx - 4} ${sy + (ey - sy) * 0.08} Q${(sx + ex) / 2} ${(sy + ey) / 2 + (rand() - 0.5) * 3} ${ex + 3} ${ey}`);
  }

  return (
    <svg
      viewBox={d.viewBox}
      className={`${draw ? "sketch-draw " : ""}${className}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : labels[species]}
      aria-hidden={decorative ? true : undefined}
      fill="none"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <filter id={`${id}p`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="1.6" />
        </filter>
        <clipPath id={`${id}c`}>
          <path d={d.body} />
        </clipPath>
      </defs>
      <g filter={`url(#${id}p)`}>
        <g clipPath={`url(#${id}c)`}>
          <g opacity="0.32">
            {scales.map((sc, i) => (
              <path key={i} d={sc} strokeWidth="0.7" pathLength={1} />
            ))}
          </g>
          <g opacity="0.42">
            {hatch.map((hd, i) => (
              <path key={i} d={hd} strokeWidth="0.75" pathLength={1} />
            ))}
          </g>
        </g>
        <g opacity="0.6">
          {rays.map((r, i) => (
            <path key={i} d={r} strokeWidth="0.7" pathLength={1} />
          ))}
        </g>
        <path d={d.body} strokeWidth="2.2" pathLength={1} />
        {d.lines.map((l, i) => (
          <path key={i} d={l} strokeWidth="1.6" pathLength={1} />
        ))}
        {d.marks?.map((m, i) => (
          <path key={i} d={m.d} strokeWidth={m.width} fill={m.fill ? stroke : "none"} pathLength={1} />
        ))}
        <circle cx={d.eye[0]} cy={d.eye[1]} r={d.eye[2]} strokeWidth="1.5" />
        <circle cx={d.eye[0] + 0.6} cy={d.eye[1]} r={d.eye[2] * 0.45} fill={stroke} stroke="none" />
      </g>
    </svg>
  );
}
