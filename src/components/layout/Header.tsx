"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { gsap } from "gsap";
import { nav, waLink } from "@/data/products";
import { TLink } from "@/components/ui/TLink";
import { Wordmark } from "@/components/ui/BrandMark";
import { useScroll } from "@/components/motion/SmoothScroll";
import { useIntroReady } from "@/components/motion/useIntroReady";
import { usePageNavigate } from "@/components/motion/PageTransition";
import { prefersReducedMotion } from "@/lib/gsap";

export function Header() {
  const pathname = usePathname();
  // the menu closes by itself whenever the route changes
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const ready = useIntroReady();
  const scroll = useScroll();
  const navigate = usePageNavigate();
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!ready || !bar.current) return;
    if (prefersReducedMotion()) {
      bar.current.style.opacity = "1";
      return;
    }
    gsap.fromTo(bar.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.15 });
  }, [ready]);

  // overlay open/close
  useEffect(() => {
    const el = overlay.current;
    const opener = openBtn.current;
    if (!el) return;
    if (open) {
      scroll.stop();
      closeBtn.current?.focus();
      const items = el.querySelectorAll("[data-item]");
      gsap.fromTo(el, { clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }, { clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, delay: 0.25, ease: "expo.out" });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "Tab") {
          const f = el.querySelectorAll<HTMLElement>("a, button");
          const first = f[0];
          const last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        scroll.start();
        opener?.focus({ preventScroll: true });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => navigate(href), 60);
  };

  return (
    <>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6 sm:pt-5"
        style={{ opacity: 0 }}
      >
        <div
          className={`mx-auto flex max-w-[88rem] items-center justify-between rounded-full py-2 pr-2 pl-5 text-white transition-all duration-500 ${
            scrolled ? "bg-ocean-950/80 shadow-[0_18px_50px_-18px_rgba(2,20,54,0.7)] backdrop-blur-xl" : "bg-ocean-950/35 backdrop-blur-md"
          } border border-white/15`}
        >
          <TLink href="/" className="flex items-center text-xl" aria-label="Puriva home">
            <Wordmark />
          </TLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm font-medium">
              {nav.map((n) => (
                <li key={n.href}>
                  <TLink
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`group relative block rounded-full px-4 py-2.5 transition-colors ${
                      isActive(n.href) ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {n.label}
                    <span
                      className={`absolute inset-x-4 bottom-1 h-px origin-left bg-aqua transition-transform duration-500 ease-out ${
                        isActive(n.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink("Hello Puriva, I would like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine relative hidden min-h-11 items-center gap-2 overflow-hidden rounded-full bg-white px-5 text-sm font-semibold text-ocean-900 transition-colors hover:bg-aqua sm:inline-flex"
            >
              <MessageCircle className="size-4 text-[#128c4a]" aria-hidden="true" />
              Order on WhatsApp
            </a>
            <button
              ref={openBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu */}
      <div
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-0 z-[150] flex flex-col bg-ocean-950 text-white"
        style={{ visibility: open ? "visible" : "hidden", clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="text-xl">
            <Wordmark />
          </span>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
          {nav.map((n, i) => (
            <li key={n.href} data-item>
              <button
                type="button"
                onClick={() => go(n.href)}
                className={`display flex w-full items-baseline gap-4 py-2 text-left text-[2.6rem] transition-colors ${
                  isActive(n.href) ? "text-aqua" : "text-white/80 hover:text-white"
                }`}
              >
                <span className="text-sm font-medium tracking-widest text-white/35">0{i + 1}</span>
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <div data-item className="flex flex-col gap-4 border-t border-white/10 px-6 py-6">
          <a
            href={waLink("Hello Puriva, I would like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine relative inline-flex min-h-12 w-fit items-center gap-2 overflow-hidden rounded-full bg-[#128c4a] px-6 text-sm font-semibold text-white"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Order on WhatsApp
          </a>
          <span className="text-xs tracking-widest text-white/50 uppercase">Purified drinking water</span>
        </div>
      </div>
    </>
  );
}
