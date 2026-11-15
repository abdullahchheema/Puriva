"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "./SmoothScroll";
import { markIntroReady } from "./useIntroReady";
import { Wordmark } from "@/components/ui/BrandMark";

const KEY = "puriva-intro-seen";

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const scroll = useScroll();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || prefersReducedMotion()) {
      if (root.current) root.current.style.display = "none";
      markIntroReady();
      return;
    }
    const { gsap } = registerGsap();
    scroll.stop();
    const state = { p: 0 };
    const tl = gsap.timeline();
    tl.to(state, {
      p: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(state.p));
        if (fill.current) fill.current.style.transform = `scaleX(${state.p / 100})`;
      },
    })
      .to(content.current, { opacity: 0, y: -14, duration: 0.35, ease: "power2.out" }, "+=0.1")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<0.05")
      .add(() => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        scroll.start();
        markIntroReady();
        setGone(true);
      }, "-=0.25");
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center gap-10 bg-ocean-950 text-white"
      style={{ borderRadius: "0 0 2.5rem 2.5rem" }}
      role="status"
      aria-label="Loading Puriva"
    >
      <div ref={content} className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-4xl">
            <Wordmark />
          </span>
          <span className="text-sm tracking-[0.25em] text-white/60 uppercase">Purified drinking water</span>
        </div>
        <div className="w-[min(22rem,72vw)]">
          <div className="h-px w-full bg-white/15">
            <div ref={fill} className="h-full origin-left bg-aqua" style={{ transform: "scaleX(0)" }} />
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium tracking-widest text-white/50 uppercase">
            <span>Loading</span>
            <span className="tabular-nums text-white/85">{String(count).padStart(3, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
