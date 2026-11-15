const spots = [
  { x: 8, y: 22, s: 14, d: 0 },
  { x: 22, y: 64, s: 9, d: 1.1 },
  { x: 44, y: 14, s: 11, d: 2.2 },
  { x: 58, y: 78, s: 8, d: 0.6 },
  { x: 71, y: 30, s: 16, d: 1.7 },
  { x: 84, y: 62, s: 10, d: 2.8 },
  { x: 92, y: 16, s: 8, d: 0.3 },
  { x: 36, y: 44, s: 7, d: 3.1 },
];

/** Soft four-point glints that twinkle over a dark water backdrop. */
export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {spots.map((p, i) => (
        <svg
          key={i}
          viewBox="-6 -6 12 12"
          className="sparkle absolute opacity-0"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s`, filter: "drop-shadow(0 0 6px rgb(190 240 255 / 0.9))" }}
        >
          <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z" fill="#fff" />
        </svg>
      ))}
    </div>
  );
}
