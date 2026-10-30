import type { Scene } from "@/content/types";

type Palette = {
  sky: [string, string];
  sea: [string, string];
  horizon: number; // 0..1 from top
  sun?: { x: number; color: string; r: number; onHorizon?: boolean };
  islands?: string;
  sand?: string;
  line: string; // swell line colour
};

const palettes: Record<Scene, Palette> = {
  turquoise: {
    sky: ["#8fc0dc", "#e4f1f4"],
    sea: ["#1b7896", "#3fb9b3"],
    horizon: 0.46,
    sun: { x: 0.78, color: "#ffffff", r: 260 },
    islands: "#4d7f86",
    line: "#ffffff",
  },
  sunset: {
    sky: ["#6b4a3a", "#f0be7e"],
    sea: ["#6a4c3c", "#2e2118"],
    horizon: 0.56,
    sun: { x: 0.62, color: "#ffd99a", r: 54, onHorizon: true },
    line: "#f4c98a",
  },
  dusk: {
    sky: ["#3e2e21", "#b48f6c"],
    sea: ["#5a4330", "#241a12"],
    horizon: 0.52,
    sun: { x: 0.3, color: "#e9c7b6", r: 180 },
    line: "#d9c2a3",
  },
  shallows: {
    sky: ["#b6dbea", "#f1f8f9"],
    sea: ["#2a8fa4", "#62d1c6"],
    horizon: 0.34,
    sand: "#e9ddc2",
    line: "#ffffff",
  },
  open: {
    sky: ["#9fcde0", "#eef6f6"],
    sea: ["#1d7f8f", "#125866"],
    horizon: 0.5,
    sun: { x: 0.2, color: "#ffffff", r: 220 },
    line: "#cfe3f1",
  },
  glass: {
    sky: ["#cfe2ea", "#f5f9fa"],
    sea: ["#6aa8b8", "#2a7b92"],
    horizon: 0.5,
    islands: "#5d8a8c",
    line: "#ffffff",
  },
};

/** Small deterministic PRNG so each plate is stable between renders. */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1600;
const H = 1000;

export function Seascape({
  scene,
  seed,
  horizon,
  className,
  label,
}: {
  scene: Scene;
  seed: string;
  /** Override horizon height (0..1). */
  horizon?: number;
  className?: string;
  label?: string;
}) {
  const p = palettes[scene];
  const rand = rng(seed + scene);
  const hy = Math.round((horizon ?? p.horizon) * H);
  const id = `s${Math.floor(rand() * 1e9).toString(36)}`;

  // Swell lines: spaced in perspective, longer and stronger toward the viewer.
  const lines: { d: string; o: number; w: number }[] = [];
  const count = 26;
  for (let i = 1; i <= count; i++) {
    const t = Math.pow(i / count, 1.9);
    const y = hy + (H - hy) * t + 2;
    const segs = 3 + Math.floor(rand() * 4);
    for (let s = 0; s < segs; s++) {
      const len = (80 + rand() * 420) * (0.4 + t);
      const x = rand() * (W + 200) - 100;
      const amp = 1 + t * 6;
      lines.push({
        d: `M${x.toFixed(0)} ${y.toFixed(1)} q${(len / 2).toFixed(0)} ${(-amp).toFixed(1)} ${len.toFixed(0)} 0`,
        o: 0.05 + rand() * 0.14 * (0.4 + t),
        w: 0.8 + t * 2.4,
      });
    }
  }

  // Light on the water under the sun.
  const glints: { x: number; y: number; w: number; o: number }[] = [];
  if (p.sun) {
    const sx = p.sun.x * W;
    for (let i = 0; i < 70; i++) {
      const t = Math.pow(rand(), 1.4);
      const y = hy + 4 + (H - hy) * t;
      const spread = 30 + t * 260;
      glints.push({
        x: sx + (rand() - 0.5) * spread * 2,
        y,
        w: 10 + rand() * 50 * (0.3 + t),
        o: (p.sun.onHorizon ? 0.55 : 0.28) * (1 - t * 0.6) * rand(),
      });
    }
  }

  // Low island silhouettes sitting on the horizon.
  let islandPath = "";
  if (p.islands) {
    const startX = 80 + rand() * 600;
    const parts: string[] = [];
    let x = startX;
    for (let k = 0; k < 3; k++) {
      const w = 140 + rand() * 360;
      const h = 8 + rand() * 26;
      parts.push(
        `M${x.toFixed(0)} ${hy} C${(x + w * 0.25).toFixed(0)} ${hy - h} ${(x + w * 0.7).toFixed(0)} ${hy - h * 1.1} ${(x + w).toFixed(0)} ${hy} Z`,
      );
      x += w + 40 + rand() * 500;
      if (x > W - 100) break;
    }
    islandPath = parts.join(" ");
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="1" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`${id}sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sea[0]} />
          <stop offset="1" stopColor={p.sea[1]} />
        </linearGradient>
        {p.sun && (
          <radialGradient id={`${id}sun`}>
            <stop offset="0" stopColor={p.sun.color} stopOpacity={p.sun.onHorizon ? 1 : 0.75} />
            <stop offset={p.sun.onHorizon ? 0.35 : 0.2} stopColor={p.sun.color} stopOpacity={p.sun.onHorizon ? 0.9 : 0.35} />
            <stop offset="1" stopColor={p.sun.color} stopOpacity="0" />
          </radialGradient>
        )}
        {p.sand && (
          <linearGradient id={`${id}sand`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sand} stopOpacity="0" />
            <stop offset="0.55" stopColor={p.sand} stopOpacity="0.85" />
            <stop offset="1" stopColor={p.sand} />
          </linearGradient>
        )}
      </defs>
      <rect width={W} height={hy} fill={`url(#${id}sky)`} />
      {p.sun && (
        <circle
          cx={p.sun.x * W}
          cy={p.sun.onHorizon ? hy - 10 : hy * 0.35}
          r={p.sun.onHorizon ? p.sun.r * 4 : p.sun.r * 2}
          fill={`url(#${id}sun)`}
        />
      )}
      {islandPath && <path d={islandPath} fill={p.islands} opacity="0.75" />}
      <rect y={hy} width={W} height={H - hy} fill={`url(#${id}sea)`} />
      {p.sand && (
        <path
          d={`M0 ${H} L0 ${H * 0.78} C${W * 0.25} ${H * 0.7} ${W * 0.55} ${H * 0.86} ${W} ${H * 0.74} L${W} ${H} Z`}
          fill={`url(#${id}sand)`}
        />
      )}
      <g fill="none" stroke={p.line} strokeLinecap="round">
        {lines.map((l, i) => (
          <path key={i} d={l.d} strokeOpacity={l.o} strokeWidth={l.w} />
        ))}
      </g>
      <g fill={p.sun?.color ?? "#fff"}>
        {glints.map((g, i) => (
          <rect key={i} x={g.x} y={g.y} width={g.w} height={1.6} rx={0.8} opacity={g.o} />
        ))}
      </g>
      <rect y={hy - 0.5} width={W} height="1" fill="#fff" opacity="0.35" />
    </svg>
  );
}
