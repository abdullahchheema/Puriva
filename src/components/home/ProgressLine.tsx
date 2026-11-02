"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap";

/** Vertical line that draws itself as its parent scrolls through the viewport. */
export function ProgressLine() {
  const fill = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const el = fill.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = "scaleY(1)";
      return;
    }
    const { gsap } = registerGsap();
    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true },
      },
    );
  });
  return (
    <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.05rem] w-px bg-royal/15 sm:left-[1.05rem]">
      <div ref={fill} className="h-full w-full origin-top bg-royal" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
