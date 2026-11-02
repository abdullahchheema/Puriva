"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "./SmoothScroll";
import { BrandMark } from "@/components/ui/BrandMark";

type Nav = { navigate: (href: string) => void };
const Ctx = createContext<Nav>({ navigate: () => {} });
export const usePageNavigate = () => useContext(Ctx).navigate;

const WAVE = 110;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const scroll = useScroll();
  const overlay = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const target = useRef<string | null>(null);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    const { gsap } = registerGsap();
    const el = overlay.current;
    if (!el) return;
    scroll.toTop();
    gsap.to(logo.current, { opacity: 0, scale: 0.9, duration: 0.25 });
    gsap.to(el, {
      y: -(window.innerHeight + WAVE * 2),
      duration: 0.85,
      ease: "expo.inOut",
      delay: 0.12,
      onComplete: () => {
        gsap.set(el, { y: window.innerHeight + WAVE * 2, visibility: "hidden" });
        el.style.pointerEvents = "none";
        busy.current = false;
        target.current = null;
        scroll.start();
      },
    });
  }, [scroll]);

  // park the panel below the viewport until first use
  useEffect(() => {
    const { gsap } = registerGsap();
    if (overlay.current) gsap.set(overlay.current, { y: window.innerHeight + WAVE * 2, visibility: "hidden" });
  }, []);

  // route finished changing -> lift the panel away
  useEffect(() => {
    if (busy.current && target.current && pathname === target.current.split(/[?#]/)[0]) {
      if (failsafe.current) clearTimeout(failsafe.current);
      reveal();
    } else if (!busy.current) {
      scroll.toTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const path = href.split(/[?#]/)[0] || "/";
      if (busy.current) return;
      if (prefersReducedMotion() || !overlay.current) {
        router.push(href);
        return;
      }
      if (path === pathname) {
        if (href.includes("?")) router.push(href);
        else scroll.scrollTo(0);
        return;
      }
      const { gsap } = registerGsap();
      busy.current = true;
      target.current = href;
      scroll.stop();
      const el = overlay.current;
      el.style.pointerEvents = "auto";
      gsap.set(el, { visibility: "visible", y: window.innerHeight + WAVE * 2 });
      gsap.set(logo.current, { opacity: 0, scale: 0.9 });
      gsap.to(el, {
        y: 0,
        duration: 0.75,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.to(logo.current, { opacity: 1, scale: 1, duration: 0.3 });
          router.push(href);
          failsafe.current = setTimeout(reveal, 3500);
        },
      });
    },
    [pathname, router, scroll, reveal],
  );

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-dvh"
        style={{ visibility: "hidden", willChange: "transform" }}
      >
        <svg className="absolute left-0 w-full" style={{ top: -WAVE + 1, height: WAVE }} viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path d="M0 110 L0 60 C240 0 480 120 720 60 C960 0 1200 120 1440 60 L1440 110 Z" fill="#03112b" />
        </svg>
        <div className="h-full w-full bg-ocean-950">
          <div ref={logo} className="flex h-full flex-col items-center justify-center gap-4 text-white">
            <BrandMark className="h-14 w-14 text-aqua" />
            <span className="display text-3xl">PURIVA</span>
          </div>
        </div>
        <svg className="absolute left-0 w-full" style={{ bottom: -WAVE + 1, height: WAVE }} viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path d="M0 0 L0 50 C240 110 480 -10 720 50 C960 110 1200 -10 1440 50 L1440 0 Z" fill="#03112b" />
        </svg>
      </div>
    </Ctx.Provider>
  );
}
