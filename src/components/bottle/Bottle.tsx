import { useId, type ReactNode } from "react";
import type { BottleSize } from "@/data/products";
import { EMBLEM, TAGLINE, WORDMARK, type Traced } from "@/components/ui/brand-paths";

/**
 * Parametric Puriva bottle. One generator keeps every size in the same design
 * language as the real packaging: clear pale-blue PET, blue neck and base,
 * bright blue cap and a royal-blue label carrying the traced PURIVA logo.
 */

type Spec = {
  w: number;
  h: number;
  body: string;
  cap: { x: number; y: number; w: number; h: number };
  ring: { x: number; y: number; w: number; h: number };
  waterTop: number;
  label: { x: number; y: number; w: number; h: number };
  /** wide jug label is horizontal, bottle labels are vertical */
  horizontal?: boolean;
  ribs: number[];
  grooves: number[];
  bounds: { x0: number; x1: number; y0: number; y1: number };
  groundY: number;
  chipText: string;
};

const SPECS: Record<BottleSize, Spec> = {
  "1-5l": {
    w: 200,
    h: 580,
    body: "M78 52 L78 68 C78 94 26 104 26 178 L26 490 C26 516 42 544 64 554 Q100 562 136 554 C158 544 174 516 174 490 L174 178 C174 104 122 94 122 68 L122 52 Z",
    cap: { x: 74, y: 6, w: 52, h: 40 },
    ring: { x: 76, y: 46, w: 48, h: 8 },
    waterTop: 96,
    label: { x: 65, y: 206, w: 70, h: 226 },
    ribs: [468, 479, 490],
    grooves: [170, 180],
    bounds: { x0: 32, x1: 168, y0: 96, y1: 530 },
    groundY: 566,
    chipText: "1500ml",
  },
  "500ml": {
    w: 150,
    h: 420,
    body: "M58 44 L58 58 C58 80 26 88 26 140 L26 352 C26 374 36 398 54 406 Q75 412 96 406 C114 398 124 374 124 352 L124 140 C124 88 92 80 92 58 L92 44 Z",
    cap: { x: 52, y: 6, w: 46, h: 34 },
    ring: { x: 55, y: 40, w: 40, h: 7 },
    waterTop: 84,
    label: { x: 52, y: 156, w: 46, h: 150 },
    ribs: [346, 355, 364],
    grooves: [128, 136, 250, 258],
    bounds: { x0: 28, x1: 122, y0: 84, y1: 390 },
    groundY: 414,
    chipText: "500ml",
  },
  "19l": {
    w: 300,
    h: 500,
    body: "M122 48 L122 82 C122 106 40 112 40 200 L40 432 C40 454 56 468 80 470 L220 470 C244 468 260 454 260 432 L260 200 C260 112 178 106 178 82 L178 48 Z",
    cap: { x: 114, y: 6, w: 72, h: 44 },
    ring: { x: 116, y: 48, w: 68, h: 9 },
    waterTop: 120,
    label: { x: 78, y: 268, w: 144, h: 62 },
    horizontal: true,
    ribs: [436, 447, 458],
    grooves: [204, 215, 226],
    bounds: { x0: 46, x1: 254, y0: 126, y1: 452 },
    groundY: 480,
    chipText: "19L",
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

/** Draws a traced path scaled by k. Upright: (x,y) is its top-left. Turned to read upwards: (x,y) is its bottom-left. */
function T({ t, k, x, y, up = false }: { t: Traced; k: number; x: number; y: number; up?: boolean }) {
  const place = up ? `translate(${x} ${y}) rotate(-90)` : `translate(${x} ${y})`;
  return (
    <path
      d={t.d}
      transform={`${place} scale(${k}) translate(${-t.x} ${-t.y})`}
      fill="#fff"
      fillRule="evenodd"
    />
  );
}

export type CustomLabel = { name: string; color: string; ink: string; chip: string };

export function Bottle({
  size,
  droplets = true,
  className,
  label,
  custom,
}: {
  size: BottleSize;
  droplets?: boolean;
  className?: string;
  label?: string;
  /** Replaces the Puriva logo with a customer's own brand text (used by the custom-label preview). */
  custom?: CustomLabel;
}) {
  const uid = useId().replace(/:/g, "");
  const s = SPECS[size];
  const chipText = custom?.chip || s.chipText;
  const lab = s.label;
  const L = s.horizontal;
  const cx = lab.x + lab.w / 2;
  const chip = { x: cx - 26, y: lab.y + lab.h + 8 };

  // Droplets on the glass, kept clear of the label and chip.
  const rand = mulberry32(size.length * 977 + s.w);
  const drops: { x: number; y: number; r: number }[] = [];
  if (droplets) {
    const { x0, x1, y0, y1 } = s.bounds;
    const count = size === "19l" ? 18 : 14;
    let tries = 0;
    while (drops.length < count && tries < 240) {
      tries++;
      const x = x0 + rand() * (x1 - x0);
      const y = y0 + rand() * (y1 - y0) * (rand() > 0.3 ? 0.55 : 1);
      const clearOfLabel = x < lab.x - 4 || x > lab.x + lab.w + 4 || y < lab.y - 4 || y > chip.y + 18;
      if (!clearOfLabel) continue;
      drops.push({ x, y, r: 1.6 + rand() * 3.2 });
    }
  }

  const id = (n: string) => `${n}-${uid}`;

  // Label layout, derived from the label box so every size keeps the real proportions.
  const lw = lab.w;
  const lh = lab.h;
  let logo: ReactNode = null;
  if (!custom) {
    if (!L) {
      const cap = lw * 0.42;
      const k = cap / WORDMARK.h;
      const emK = (lw * 0.8) / EMBLEM.h;
      const emH = EMBLEM.w * emK;
      const pad = lh * 0.04;
      const start = lh - pad - emH - lh * 0.025;
      const len = Math.min(WORDMARK.w * k, start - pad);
      const kk = len / WORDMARK.w;
      const kt = len / TAGLINE.w;
      const gap = lw * 0.06;
      const total = WORDMARK.h * kk + gap + TAGLINE.h * kt;
      const left = (lw - total) / 2;
      logo = (
        <>
          <T t={WORDMARK} k={kk} x={left} y={start} up />
          <T t={TAGLINE} k={kt} x={left + WORDMARK.h * kk + gap} y={start} up />
          <path
            d={EMBLEM.d}
            transform={`translate(${(lw - EMBLEM.h * emK) / 2} ${lh - pad + 0}) rotate(-90) scale(${emK}) translate(${-EMBLEM.x} ${-EMBLEM.y})`}
            fill="#fff"
            fillRule="evenodd"
          />
        </>
      );
    } else {
      const wl = lw * 0.62;
      const kk = wl / WORDMARK.w;
      const kt = wl / TAGLINE.w;
      const gap = lh * 0.07;
      const total = WORDMARK.h * kk + gap + TAGLINE.h * kt;
      const top = (lh - total) / 2;
      const left = lw * 0.07;
      const emK = (lh * 0.74) / EMBLEM.h;
      logo = (
        <>
          <T t={WORDMARK} k={kk} x={left} y={top} />
          <T t={TAGLINE} k={kt} x={left} y={top + WORDMARK.h * kk + gap} />
          <path
            d={EMBLEM.d}
            transform={`translate(${lw - lw * 0.07 - EMBLEM.w * emK} ${(lh - EMBLEM.h * emK) / 2}) scale(${emK}) translate(${-EMBLEM.x} ${-EMBLEM.y})`}
            fill="#fff"
            fillRule="evenodd"
          />
        </>
      );
    }
  } else {
    const name = (custom.name.trim() || "YOUR BRAND").toUpperCase().slice(0, 18);
    const fs = lw * 0.4;
    const room = lh * 0.82;
    const natural = name.length * fs * 0.62;
    logo = (
      <text
        transform={`translate(${lw / 2 + fs * 0.36} ${lh * 0.92}) rotate(-90)`}
        fontSize={fs}
        fontWeight="800"
        fill={custom.ink}
        textLength={natural > room ? room : undefined}
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: "var(--font-display), 'Arial Black', sans-serif" }}
      >
        {name}
      </text>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${s.w} ${s.h}`}
      className={className}
      role="img"
      aria-label={label ?? (custom ? `Custom label bottle preview, ${chipText}` : `Puriva purified drinking water, ${chipText}`)}
      overflow="visible"
    >
      <defs>
        <clipPath id={id("body")}>
          <path d={s.body} />
        </clipPath>
        <linearGradient id={id("glass")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d2eeff" stopOpacity="0.85" />
          <stop offset="0.14" stopColor="#9bd2f8" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#86c6f4" stopOpacity="0.2" />
          <stop offset="0.86" stopColor="#9bd2f8" stopOpacity="0.38" />
          <stop offset="1" stopColor="#d2eeff" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={id("water")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7fd6ff" stopOpacity="0.1" />
          <stop offset="0.55" stopColor="#3aa3ec" stopOpacity="0.28" />
          <stop offset="1" stopColor="#1b6fd6" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={id("spec")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("cap")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1456c8" />
          <stop offset="0.3" stopColor="#4aa0ff" />
          <stop offset="0.52" stopColor="#7cbcff" />
          <stop offset="0.72" stopColor="#1d78e8" />
          <stop offset="1" stopColor="#0c3fa8" />
        </linearGradient>
        <linearGradient id={id("label")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2160e6" />
          <stop offset="1" stopColor="#0f3aa6" />
        </linearGradient>
        <linearGradient id={id("labelshade")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#001a55" stopOpacity="0.38" />
        </linearGradient>
        <linearGradient id={id("gloss")} x1="0" x2="1" y1="0" y2="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.46" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.82" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("base")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1b6fe0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1b6fe0" stopOpacity="0.38" />
          <stop offset="1" stopColor="#0b4fc4" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={id("sheen")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
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
        {/* blue neck, like the real PET preform */}
        <rect x={s.ring.x + 2} y={s.ring.y} width={s.ring.w - 4} height={s.waterTop - s.ring.y - 6} fill="#1b6fe0" opacity="0.5" />

        {/* structural grooves */}
        {s.grooves.map((y) => (
          <g key={`g${y}`} fill="none">
            <path d={`M0 ${y} Q${s.w / 2} ${y + 7} ${s.w} ${y}`} stroke="#fff" strokeOpacity="0.6" strokeWidth="1.1" />
            <path d={`M0 ${y + 2} Q${s.w / 2} ${y + 9} ${s.w} ${y + 2}`} stroke="#0b3b8f" strokeOpacity="0.22" strokeWidth="1.1" />
          </g>
        ))}
        {/* ribbed base */}
        {s.ribs.map((y, i) => (
          <g key={`r${y}`} fill="none">
            <path d={`M0 ${y} Q${s.w / 2} ${y + 6} ${s.w} ${y}`} stroke="#fff" strokeOpacity={0.55 - i * 0.08} strokeWidth="1.3" />
            <path d={`M0 ${y + 2.4} Q${s.w / 2} ${y + 8.4} ${s.w} ${y + 2.4}`} stroke="#0b3b8f" strokeOpacity="0.2" strokeWidth="1.3" />
          </g>
        ))}
        {/* blue petaloid base */}
        <rect x="0" y={s.groundY - 62} width={s.w} height="70" fill={`url(#${id("base")})`} />

        {/* back-panel ticks (clear side) */}
        {!L && !custom && (
          <g stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={s.bounds.x0 + 3} x2={s.bounds.x0 + 3 + (i % 2 ? 6 : 10)} y1={lab.y + 16 + i * 14} y2={lab.y + 16 + i * 14} />
            ))}
          </g>
        )}

        {/* travelling sheen across the glass */}
        <rect
          className="bottle-sheen"
          x={s.bounds.x0}
          y={s.bounds.y0 - 10}
          width={(s.bounds.x1 - s.bounds.x0) * 0.22}
          height={s.bounds.y1 - s.bounds.y0 + 30}
          fill={`url(#${id("sheen")})`}
          opacity="0.55"
        />
      </g>

      {/* label */}
      <g>
        <rect x={lab.x} y={lab.y} width={lab.w} height={lab.h} rx="3" fill={custom ? custom.color : `url(#${id("label")})`} />
        {custom && <rect x={lab.x} y={lab.y} width={lab.w} height={lab.h} rx="3" fill={`url(#${id("labelshade")})`} />}
        <g transform={`translate(${lab.x} ${lab.y})`}>{logo}</g>
        <rect x={lab.x} y={lab.y} width={lab.w} height={lab.h} rx="3" fill={`url(#${id("gloss")})`} />
        <rect x={lab.x + 0.5} y={lab.y + 0.5} width={lab.w - 1} height={lab.h - 1} rx="2.6" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.8" />
      </g>

      {/* volume chip */}
      <g transform={`translate(${chip.x} ${chip.y})`}>
        <rect width="52" height="14" rx="2" fill={custom ? custom.color : "#1347c9"} />
        <rect width="52" height="14" rx="2" fill={`url(#${id("gloss")})`} />
        <text x="26" y="10.4" textAnchor="middle" fontSize="8.4" fontWeight="700" fill={custom ? custom.ink : "#fff"} style={{ fontFamily: "var(--font-sans), Arial, sans-serif" }}>
          {chipText}
        </text>
      </g>

      {/* specular highlights */}
      <g clipPath={`url(#${id("body")})`}>
        <rect x={s.bounds.x0 + 4} y={s.bounds.y0 + 6} width="5" height={(s.bounds.y1 - s.bounds.y0) * 0.78} rx="2.5" fill={`url(#${id("spec")})`} opacity="0.9" filter={`url(#${id("soft")})`} />
        <rect x={s.bounds.x1 - 11} y={s.bounds.y0 + 30} width="3" height={(s.bounds.y1 - s.bounds.y0) * 0.55} rx="1.5" fill={`url(#${id("spec")})`} opacity="0.75" filter={`url(#${id("soft")})`} />
        <path
          d={`M${s.bounds.x0 + 10} ${s.bounds.y0 - 6} Q${s.w / 2} ${s.bounds.y0 - 30} ${s.bounds.x1 - 10} ${s.bounds.y0 - 6}`}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#${id("soft")})`}
        />
      </g>
      <path d={s.body} fill="none" stroke="#fff" strokeOpacity="0.65" strokeWidth="1.2" />

      {/* droplets */}
      {drops.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y + 0.8} r={d.r} fill="#0b3b8f" opacity="0.14" />
          <circle cx={d.x} cy={d.y} r={d.r} fill={`url(#${id("drop")})`} stroke="#fff" strokeOpacity="0.6" strokeWidth="0.5" />
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
        <rect x={s.cap.x + 5} y={s.cap.y + 3} width={s.cap.w * 0.16} height={s.cap.h - 8} rx="3" fill="#fff" opacity="0.5" />
        <rect x={s.cap.x} y={s.cap.y} width={s.cap.w} height="7" rx="4" fill="#fff" opacity="0.3" />
        <rect x={s.ring.x} y={s.ring.y} width={s.ring.w} height={s.ring.h} rx="3" fill="#1456c8" />
        <rect x={s.ring.x} y={s.ring.y} width={s.ring.w} height="2.4" rx="1.2" fill="#fff" opacity="0.45" />
      </g>

      {/* glints */}
      {[
        { x: s.bounds.x0 + 8, y: s.bounds.y0 + 52, r: 7, d: "0s" },
        { x: s.bounds.x1 - 6, y: s.bounds.y0 + 120, r: 5.5, d: "1.3s" },
        { x: s.cap.x + s.cap.w * 0.28, y: s.cap.y + 9, r: 4.5, d: "2.1s" },
      ].map((g, i) => (
        <path
          key={i}
          className="glint"
          style={{ animationDelay: g.d }}
          transform={`translate(${g.x} ${g.y}) scale(${g.r / 6})`}
          d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z"
          fill="#fff"
        />
      ))}
    </svg>
  );
}
