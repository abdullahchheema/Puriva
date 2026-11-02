import { ChevronRight } from "lucide-react";
import { TLink } from "@/components/ui/TLink";

export function Breadcrumbs({ items, tone = "light" }: { items: { label: string; href?: string }[]; tone?: "light" | "dark" }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-medium tracking-wide ${tone === "light" ? "text-white/65" : "text-mist"}`}>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.href ? (
              <TLink href={it.href} className="transition-colors hover:text-aqua">
                {it.label}
              </TLink>
            ) : (
              <span aria-current="page" className={tone === "light" ? "text-white" : "text-ocean-900"}>
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
