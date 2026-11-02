"use client";

import { useEffect, useRef } from "react";
import { Bottle } from "./Bottle";
import type { BottleSize } from "@/data/products";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap";

/**
 * Bottle with pointer-driven tilt, idle float and a soft glass reflection.
 * Size it with `className` (height is what matters, e.g. `h-[32rem]`).
 */
export function BottleStage({
  size,
  className = "",
  tilt = true,
  float = true,
  reflect = true,
  strength = 9,
  droplets = true,
}: {
  size: BottleSize;
  className?: string;
  tilt?: boolean;
  float?: boolean;
  reflect?: boolean;
  strength?: number;
  droplets?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tilt || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const { gsap } = registerGsap();
    const el = inner.current;
    const box = wrap.current;
    if (!el || !box) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });
    const rz = gsap.quickTo(el, "rotationZ", { duration: 1.2, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      ry(nx * strength * 2);
      rx(-ny * strength);
      rz(nx * strength * 0.6);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [tilt, strength]);

  return (
    <div ref={wrap} className={`relative inline-block ${className}`} style={{ perspective: "1200px" }}>
      <div ref={inner} className={`h-full ${float ? "float-y" : ""}`} style={{ transformStyle: "preserve-3d" }}>
        <div
          className="h-full"
          style={reflect ? { WebkitBoxReflect: "below 2px linear-gradient(transparent 72%, rgb(255 255 255 / 0.22))" } : undefined}
        >
          <Bottle size={size} droplets={droplets} className="h-full w-auto drop-shadow-[0_30px_40px_rgba(2,20,54,0.35)]" />
        </div>
      </div>
    </div>
  );
}
