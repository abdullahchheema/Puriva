import { EMBLEM, WORDMARK, type Traced } from "./brand-paths";

function Traced({ t, className }: { t: Traced; className?: string }) {
  return (
    <svg viewBox={`${t.x} ${t.y} ${t.w} ${t.h}`} className={className} fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d={t.d} />
    </svg>
  );
}

/** The Puriva leaf-and-water emblem, traced from the print label. */
export function BrandMark({ className = "h-6 w-6" }: { className?: string }) {
  return <Traced t={EMBLEM} className={className} />;
}

/** The PURIVA wordmark, traced from the print label. Height-driven: set `h-*` on it. */
export function WordmarkGlyph({ className = "h-4 w-auto" }: { className?: string }) {
  return <Traced t={WORDMARK} className={className} />;
}

/** Emblem and wordmark side by side; scales with the surrounding font size. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] ${className}`} role="img" aria-label="Puriva">
      <BrandMark className="h-[1.7em] w-auto" />
      <WordmarkGlyph className="h-[0.92em] w-auto" />
    </span>
  );
}
