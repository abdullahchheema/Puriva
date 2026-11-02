"use client";

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap";

type ScrollApi = {
  stop: () => void;
  start: () => void;
  toTop: () => void;
  scrollTo: (target: string | number | HTMLElement) => void;
};

const noop: ScrollApi = { stop() {}, start() {}, toTop() {}, scrollTo() {} };
const Ctx = createContext<ScrollApi>(noop);
export const useScroll = () => useContext(Ctx);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockRef = useRef(0);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const { gsap, ScrollTrigger } = registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (lockRef.current > 0) lenis.stop();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<ScrollApi>(
    () => ({
      stop() {
        lockRef.current++;
        lenisRef.current?.stop();
        document.documentElement.style.overflow = "hidden";
      },
      start() {
        lockRef.current = Math.max(0, lockRef.current - 1);
        if (lockRef.current === 0) {
          lenisRef.current?.start();
          document.documentElement.style.removeProperty("overflow");
        }
      },
      toTop() {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      },
      scrollTo(target) {
        if (lenisRef.current) lenisRef.current.scrollTo(target as never, { duration: 1.4 });
        else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
        else if (typeof target !== "string") target.scrollIntoView({ behavior: "smooth" });
      },
    }),
    [],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
