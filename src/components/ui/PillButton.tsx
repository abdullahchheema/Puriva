import type { ReactNode, ButtonHTMLAttributes } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TLink } from "./TLink";

type Variant = "primary" | "light" | "glass" | "dark" | "outline" | "whatsapp";

const styles: Record<Variant, { pill: string; badge: string }> = {
  primary: { pill: "bg-royal text-white hover:bg-cap", badge: "bg-white text-royal" },
  light: { pill: "bg-white text-ocean-900 hover:bg-icy", badge: "bg-ocean-900 text-white" },
  glass: { pill: "glass text-white hover:bg-white/20", badge: "bg-white text-ocean-900" },
  dark: { pill: "bg-ocean-950 text-white hover:bg-ocean-800", badge: "bg-aqua text-ocean-950" },
  outline: { pill: "border border-ocean-900/25 text-ocean-900 hover:bg-ocean-900 hover:text-white", badge: "bg-ocean-900 text-white" },
  whatsapp: { pill: "bg-[#128c4a] text-white hover:bg-[#0f7a3f]", badge: "bg-white text-[#128c4a]" },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  arrow?: "right" | "up-right" | false;
  className?: string;
} & ({ href: string } & { type?: never } | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>));

export function PillButton({ children, variant = "primary", arrow = "right", className = "", ...rest }: Props) {
  const s = styles[variant];
  const Icon = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  const cls = `btn-shine group/btn relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full py-1.5 text-sm font-semibold tracking-wide transition-[background-color,color,transform] duration-300 ease-out active:scale-[0.97] ${
    arrow ? "pr-1.5 pl-6" : "px-7"
  } ${s.pill} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={`grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5 ${s.badge}`}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
      )}
    </>
  );
  if ("href" in rest && rest.href) {
    if (/^https?:/.test(rest.href)) {
      return (
        <a href={rest.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <TLink href={rest.href} className={cls}>
        {inner}
      </TLink>
    );
  }
  const { href: _h, ...btn } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
  void _h;
  return (
    <button {...btn} className={cls}>
      {inner}
    </button>
  );
}

export function Eyebrow({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase ${
        tone === "light" ? "text-aqua" : "text-royal"
      } ${className}`}
    >
      <span className={`size-1.5 rounded-full ${tone === "light" ? "bg-aqua" : "bg-royal"}`} />
      {children}
    </span>
  );
}
