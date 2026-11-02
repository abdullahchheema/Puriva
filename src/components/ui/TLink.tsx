"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageNavigate } from "@/components/motion/PageTransition";

/** next/link that plays the water-wipe page transition on internal navigation. */
export function TLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const navigate = usePageNavigate();
  const h = typeof href === "string" ? href : (href.pathname ?? "/");
  return (
    <Link
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (!h.startsWith("/") || (rest.target && rest.target !== "_self")) return;
        e.preventDefault();
        navigate(h);
      }}
      {...rest}
    />
  );
}
