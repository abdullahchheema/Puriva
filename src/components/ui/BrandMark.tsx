export function BrandMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="-20 -20 40 40" className={className} aria-hidden="true">
      <path d="M-14 3 A14.5 14.5 0 1 1 9 13" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-1 -12 C9 -8 11 3 3 10 C-6 5 -8 -4 -1 -12Z" fill="currentColor" />
      <path d="M-11 9 C-5 15 5 17 13 9 C8 21 -7 21 -11 9Z" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`display inline-flex items-center gap-2 text-xl tracking-[-0.02em] ${className}`}>
      <BrandMark className="h-6 w-6" />
      PURIVA
    </span>
  );
}
