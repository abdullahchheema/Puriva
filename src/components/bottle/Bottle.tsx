import { useId } from "react";
import type { BottleSize } from "@/data/products";

/**
 * Parametric Puriva bottle. One generator keeps all four sizes in the same
 * design language: translucent pale-blue PET, bright blue cap, royal-blue
 * label with a vertical white PURIVA wordmark and the leaf/swirl emblem.
 */

type Spec = {
  w: number;
  h: number;
  body: string;
  cap: { x: number; y: number; w: number; h: number };
  ring: { x: number; y: number; w: number; h: number };
  waterTop: number;
  label: { x: number; y: number; w: number; h: number };
  chip: { x: number; y: number };
  /** wide jug label is horizontal, bottle labels are vertical */
  horizontal?: boolean;
  wordmark: { size: number; len: number; x: number; y: number };
  subline: { size: number; len: number; x: number; y: number };
  emblem: { x: number; y: number; s: number };
  ribs: number[];
  grooves: number[];
  bounds: { x0: number; x1: number; y0: number; y1: number };
  handle?: string;
  groundY: number;
};

const SPECS: Record<BottleSize, Spec> = {
  "1-5l": {
    w: 200,
    h: 580,
    body: "M78 52 L78 68 C78 94 26 104 26 178 L26 490 C26 516 42 544 64 554 Q100 562 136 554 C158 544 174 516 174 490 L174 178 C174 104 122 94 122 68 L122 52 Z",
    cap: { x: 74, y: 6, w: 52, h: 40 },
    ring: { x: 76, y: 46, w: 48, h: 8 },
    waterTop: 96,
    label: { x: 50, y: 196, w: 100, h: 236 },
    chip: { x: 74, y: 444 },
    wordmark: { size: 40, len: 168, x: 50, y: 186 },
    subline: { size: 9.2, len: 168, x: 72, y: 186 },
    emblem: { x: 50, y: 214, s: 1 },
    ribs: [468, 479, 490],
    grooves: [170, 180],
    bounds: { x0: 32, x1: 168, y0: 96, y1: 530 },
    groundY: 566,
  },
  "1l": {
    w: 180,
    h: 530,
    body: "M70 52 L70 68 C70 92 28 100 28 168 L28 458 C28 484 42 510 62 518 Q90 525 118 518 C138 510 152 484 152 458 L152 168 C152 100 110 92 110 68 L110 52 Z",
    cap: { x: 66, y: 6, w: 48, h: 40 },
    ring: { x: 68, y: 46, w: 44, h: 8 },
    waterTop: 92,
    label: { x: 44, y: 184, w: 92, h: 214 },
    chip: { x: 66, y: 408 },
    wordmark: { size: 36, len: 150, x: 46, y: 168 },
    subline: { size: 8.4, len: 150, x: 66, y: 168 },
    emblem: { x: 46, y: 194, s: 0.92 },
    ribs: [430, 440, 450],
    grooves: [160, 170],
    bounds: { x0: 30, x1: 150, y0: 92, y1: 500 },
    groundY: 524,
  },
  "500ml": {
    w: 150,
    h: 420,
    body: "M58 44 L58 58 C58 80 26 88 26 140 L26 352 C26 374 36 398 54 406 Q75 412 96 406 C114 398 124 374 124 352 L124 140 C124 88 92 80 92 58 L92 44 Z",
    cap: { x: 52, y: 6, w: 46, h: 34 },
    ring: { x: 55, y: 40, w: 40, h: 7 },
    waterTop: 84,
    label: { x: 38, y: 150, w: 74, h: 162 },
    chip: { x: 53, y: 322 },
    wordmark: { size: 30, len: 112, x: 36, y: 140 },
    subline: { size: 6.8, len: 112, x: 52, y: 140 },
    emblem: { x: 37, y: 150, s: 0.7 },
    ribs: [346, 355, 364],
    grooves: [128, 136, 250, 258],
    bounds: { x0: 28, x1: 122, y0: 84, y1: 390 },
    groundY: 414,
  },
  "10l": {
    w: 360,
    h: 450,
    body: "M150 56 L150 76 C150 104 62 102 52 156 L46 382 C46 406 62 422 90 426 L270 426 C298 422 314 406 314 382 L308 156 C298 102 210 104 210 76 L210 56 Z",
    cap: { x: 144, y: 10, w: 72, h: 50 },
    ring: { x: 148, y: 58, w: 64, h: 9 },
    waterTop: 112,
    label: { x: 84, y: 204, w: 192, h: 118 },
    chip: { x: 150, y: 336 },
    horizontal: true,
    wordmark: { size: 50, len: 128, x: 16, y: 62 },
    subline: { size: 8.4, len: 128, x: 16, y: 82 },
    emblem: { x: 162, y: 56, s: 1.15 },
    ribs: [356, 368, 380],
    grooves: [164, 174],
    bounds: { x0: 54, x1: 306, y0: 120, y1: 410 },
    handle: "M226 88 C262 34 322 52 304 136",
    groundY: 436,
  },
};

export const bottleAspect = (size: BottleSize) => SPECS[size].w / SPECS[size].h;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Emblem({ x, y, s, className }: { x: number; y: number; s: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={className} fill="#fff">
      <path d="M-14 3 A14.5 14.5 0 1 1 9 13" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-1 -12 C9 -8 11 3 3 10 C-6 5 -8 -4 -1 -12Z" />
      <path d="M-11 9 C-5 15 5 17 13 9 C8 21 -7 21 -11 9Z" />
    </g>
  );
}

export function Bottle({
  size,
  droplets = true,
  className,
  label,
}: {
  size: BottleSize;
  droplets?: boolean;
  className?: string;
  label?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const s = SPECS[size];
  const chipText = size === "1-5l" ? "1500ml" : size === "1l" ? "1000ml" : size === "500ml" ? "500ml" : "10L";
  const lab = s.label;
  const L = s.horizontal;

  // Droplets on the glass, kept clear of the label.
  const rand = mulberry32(size.length * 977 + s.w);
  const drops: { x: number; y: number; r: number }[] = [];
  if (droplets) {
    const { x0, x1, y0, y1 } = s.bounds;
    const count = size === "10l" ? 16 : 14;
    let tries = 0;
    while (drops.length < count && tries < 200) {
      tries++;
      const x = x0 + rand() * (x1 - x0);
      const y = y0 + rand() * (y1 - y0) * (rand() > 0.3 ? 0.55 : 1);
      const clearOfLabel = x < lab.x - 3 || x > lab.x + lab.w + 3 || y < lab.y - 3 || y > lab.y + lab.h + 3;
      if (!clearOfLabel) continue;
      drops.push({ x, y, r: 1.6 + rand() * 3.2 });
    }
  }

  const id = (n: string) => `${n}-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${s.w} ${s.h}`}
      className={className}
      role="img"
      aria-label={label ?? `Puriva purified drinking water, ${chipText}`}
      overflow="visible"
    >
      <defs>
        <clipPath id={id("body")}>
          <path d={s.body} />
        </clipPath>
        <linearGradient id={id("glass")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#bfe6ff" stopOpacity="0.8" />
          <stop offset="0.14" stopColor="#8fcbf5" stopOpacity="0.38" />
          <stop offset="0.5" stopColor="#7cc0f2" stopOpacity="0.2" />
          <stop offset="0.86" stopColor="#8fcbf5" stopOpacity="0.36" />
          <stop offset="1" stopColor="#bfe6ff" stopOpacity="0.74" />
        </linearGradient>
        <linearGradient id={id("water")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6fd0ff" stopOpacity="0.1" />
          <stop offset="0.55" stopColor="#3aa3ec" stopOpacity="0.28" />
          <stop offset="1" stopColor="#1b6fd6" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={id("spec")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("cap")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1456c8" />
          <stop offset="0.32" stopColor="#3b95ff" />
          <stop offset="0.7" stopColor="#1d78e8" />
          <stop offset="1" stopColor="#0c3fa8" />
        </linearGradient>
        <linearGradient id={id("label")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1a55d8" />
          <stop offset="1" stopColor="#0f3aa6" />
        </linearGradient>
        <linearGradient id={id("gloss")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("drop")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#bfe6ff" stopOpacity="0.1" />
        </radialGradient>
        <filter id={id("soft")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id={id("shadow")} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* contact shadow */}
      <ellipse cx={s.w / 2} cy={s.groundY} rx={s.w * 0.36} ry={s.w * 0.045} fill="#021436" opacity="0.55" filter={`url(#${id("shadow")})`} />

      {/* handle (10L) sits behind the shoulder */}
      {s.handle && (
        <g fill="none" strokeLinecap="round">
          <path d={s.handle} stroke="#7cc0f2" strokeOpacity="0.55" strokeWidth="16" />
          <path d={s.handle} stroke="#cfeaff" strokeOpacity="0.55" strokeWidth="3" transform="translate(-3 -3)" />
          <path d={s.handle} stroke="#1456c8" strokeOpacity="0.35" strokeWidth="2" transform="translate(5 5)" />
        </g>
      )}

      {/* glass body */}
      <path d={s.body} fill={`url(#${id("glass")})`} />
      <g clipPath={`url(#${id("body")})`}>
        {/* water */}
        <rect x="0" y={s.waterTop} width={s.w} height={s.h} fill={`url(#${id("water")})`} />
        <path
          d={`M0 ${s.waterTop} Q${s.w * 0.25} ${s.waterTop - 5} ${s.w * 0.5} ${s.waterTop} T${s.w} ${s.waterTop}`}
          fill="none"
          stroke="#e8f8ff"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />

        {/* structural grooves */}
        {s.grooves.map((y) => (
          <g key={`g${y}`} fill="none">
            <path d={`M0 ${y} Q${s.w / 2} ${y + 7} ${s.w} ${y}`} stroke="#fff" strokeOpacity="0.55" strokeWidth="1.1" />
            <path d={`M0 ${y + 2} Q${s.w / 2} ${y + 9} ${s.w} ${y + 2}`} stroke="#0b3b8f" strokeOpacity="0.22" strokeWidth="1.1" />
          </g>
        ))}
        {/* ribbed base */}
        {s.ribs.map((y, i) => (
          <g key={`r${y}`} fill="none">
            <path d={`M0 ${y} Q${s.w / 2} ${y + 6} ${s.w} ${y}`} stroke="#fff" strokeOpacity={0.5 - i * 0.08} strokeWidth="1.3" />
            <path d={`M0 ${y + 2.4} Q${s.w / 2} ${y + 8.4} ${s.w} ${y + 2.4}`} stroke="#0b3b8f" strokeOpacity="0.2" strokeWidth="1.3" />
          </g>
        ))}
        {/* base darkening */}
        <rect x="0" y={s.groundY - 56} width={s.w} height="60" fill="#0b3b8f" opacity="0.16" />

        {/* back-panel measurement ticks (clear side) */}
        {!L && (
          <g stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={s.bounds.x0 + 3} x2={s.bounds.x0 + 3 + (i % 2 ? 6 : 10)} y1={lab.y + 16 + i * 14} y2={lab.y + 16 + i * 14} />
            ))}
          </g>
        )}
      </g>

      {/* label */}
      <g>
        <rect x={lab.x} y={lab.y} width={lab.w} height={lab.h} rx="3" fill={`url(#${id("label")})`} />
        <g transform={`translate(${lab.x} ${lab.y})`}>
          {L ? (
            <>
              <text
                x={s.wordmark.x}
                y={s.wordmark.y}
                fontSize={s.wordmark.size}
                fontWeight="800"
                fill="#fff"
                textLength={s.wordmark.len}
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: "var(--font-display), 'Arial Black', sans-serif" }}
              >
                PURIVA
              </text>
              <text
                x={s.subline.x}
                y={s.subline.y}
                fontSize={s.subline.size}
                fontWeight="600"
                fill="#fff"
                textLength={s.subline.len}
                style={{ fontFamily: "var(--font-sans), Arial, sans-serif" }}
              >
                PURIFIED DRINKING WATER
              </text>
              <Emblem x={s.emblem.x} y={s.emblem.y} s={s.emblem.s} />
            </>
          ) : (
            <>
              <text
                transform={`translate(${s.wordmark.x} ${s.wordmark.y}) rotate(-90)`}
                fontSize={s.wordmark.size}
                fontWeight="800"
                fill="#fff"
                textLength={s.wordmark.len}
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: "var(--font-display), 'Arial Black', sans-serif" }}
              >
                PURIVA
              </text>
              <text
                transform={`translate(${s.subline.x} ${s.subline.y}) rotate(-90)`}
                fontSize={s.subline.size}
                fontWeight="600"
                fill="#fff"
                textLength={s.subline.len}
                style={{ fontFamily: "var(--font-sans), Arial, sans-serif" }}
              >
                PURIFIED DRINKING WATER
              </text>
              <Emblem x={lab.w / 2} y={s.emblem.y - 0} s={s.emblem.s} />
            </>
          )}
        </g>
        <rect x={lab.x} y={lab.y} width={lab.w} height={lab.h} rx="3" fill={`url(#${id("gloss")})`} />
      </g>

      {/* volume chip */}
      <g transform={`translate(${s.chip.x} ${s.chip.y})`}>
        <rect width={size === "10l" ? 40 : 52} height="14" rx="2" fill="#1347c9" />
        <text
          x={size === "10l" ? 20 : 26}
          y="10.4"
          textAnchor="middle"
          fontSize="8.4"
          fontWeight="700"
          fill="#fff"
          style={{ fontFamily: "var(--font-sans), Arial, sans-serif" }}
        >
          {chipText}
        </text>
      </g>

      {/* specular highlights */}
      <g clipPath={`url(#${id("body")})`}>
        <rect x={s.bounds.x0 + 4} y={s.bounds.y0 + 6} width="5" height={(s.bounds.y1 - s.bounds.y0) * 0.78} rx="2.5" fill={`url(#${id("spec")})`} opacity="0.85" filter={`url(#${id("soft")})`} />
        <rect x={s.bounds.x1 - 11} y={s.bounds.y0 + 30} width="3" height={(s.bounds.y1 - s.bounds.y0) * 0.55} rx="1.5" fill={`url(#${id("spec")})`} opacity="0.7" filter={`url(#${id("soft")})`} />
        <path
          d={`M${s.bounds.x0 + 10} ${s.bounds.y0 - 6} Q${s.w / 2} ${s.bounds.y0 - 30} ${s.bounds.x1 - 10} ${s.bounds.y0 - 6}`}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#${id("soft")})`}
        />
      </g>
      <path d={s.body} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />

      {/* droplets */}
      {drops.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y + 0.8} r={d.r} fill="#0b3b8f" opacity="0.14" />
          <circle cx={d.x} cy={d.y} r={d.r} fill={`url(#${id("drop")})`} stroke="#fff" strokeOpacity="0.55" strokeWidth="0.5" />
          <circle cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.35} r={Math.max(0.4, d.r * 0.22)} fill="#fff" />
        </g>
      ))}

      {/* cap */}
      <g>
        <rect x={s.cap.x} y={s.cap.y} width={s.cap.w} height={s.cap.h} rx="7" fill={`url(#${id("cap")})`} />
        <g stroke="#0a2f86" strokeOpacity="0.45" strokeWidth="1.2">
          {Array.from({ length: Math.floor(s.cap.w / 5) }).map((_, i) => (
            <line key={i} x1={s.cap.x + 4 + i * 5} x2={s.cap.x + 4 + i * 5} y1={s.cap.y + 9} y2={s.cap.y + s.cap.h - 3} />
          ))}
        </g>
        <rect x={s.cap.x + 5} y={s.cap.y + 3} width={s.cap.w * 0.18} height={s.cap.h - 8} rx="3" fill="#fff" opacity="0.38" />
        <rect x={s.cap.x} y={s.cap.y} width={s.cap.w} height="7" rx="4" fill="#fff" opacity="0.18" />
        <rect x={s.ring.x} y={s.ring.y} width={s.ring.w} height={s.ring.h} rx="3" fill="#1456c8" />
        <rect x={s.ring.x} y={s.ring.y} width={s.ring.w} height="2.4" rx="1.2" fill="#fff" opacity="0.35" />
      </g>
    </svg>
  );
}
