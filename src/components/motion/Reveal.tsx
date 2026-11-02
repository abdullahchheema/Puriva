"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap";
import { useIntroReady } from "./useIntroReady";

type Common = {
  className?: string;
  delay?: number;
  /** wait for the intro loader to finish (use for above-the-fold content) */
  gate?: boolean;
  as?: ElementType;
};

/** Fade + rise on scroll (or on intro ready when `gate`). */
export function Reveal({
  children,
  className,
  delay = 0,
  gate = false,
  as: Tag = "div",
  y = 36,
  scale,
  style,
}: Common & { children: ReactNode; y?: number; scale?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.opacity = "1";
        return;
      }
      if (gate && !ready) return;
      const { gsap } = registerGsap();
      gsap.fromTo(
        el,
        { opacity: 0, y, scale: scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay,
          ease: "expo.out",
          scrollTrigger: gate ? undefined : { trigger: el, start: "top 88%", once: true },
        },
      );
    },
    { dependencies: [ready], scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </Tag>
  );
}

/** Headline revealed line by line, each line sliding up from a clip mask. */
export function LineReveal({
  lines,
  className,
  delay = 0,
  gate = false,
  as: Tag = "h2",
  stagger = 0.11,
}: Common & { lines: ReactNode[]; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelectorAll<HTMLElement>("[data-line]");
      if (prefersReducedMotion()) {
        inner.forEach((n) => (n.style.transform = "none"));
        return;
      }
      const { gsap } = registerGsap();
      gsap.set(inner, { yPercent: 115 });
      if (gate && !ready) return;
      gsap.fromTo(
        inner,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          delay,
          stagger,
          ease: "expo.out",
          scrollTrigger: gate ? undefined : { trigger: el, start: "top 88%", once: true },
        },
      );
    },
    { dependencies: [ready], scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Statement revealed word by word, with an optional muted continuation. */
export function WordReveal({
  text,
  muted,
  className,
  delay = 0,
  as: Tag = "p",
}: Common & { text: string; muted?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const words = el.querySelectorAll<HTMLElement>("[data-word]");
      if (prefersReducedMotion()) {
        words.forEach((w) => (w.style.opacity = "1"));
        return;
      }
      const { gsap } = registerGsap();
      gsap.fromTo(
        words,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          stagger: 0.035,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  const split = (s: string, tone?: string) =>
    s.split(" ").map((w, i) => (
      <span key={`${tone}-${i}`} data-word className="inline-block" style={{ opacity: 0 }}>
        {w}&nbsp;
      </span>
    ));

  return (
    <Tag ref={ref} className={className} aria-label={muted ? `${text} ${muted}` : text}>
      <span aria-hidden="true">
        {split(text)}
        {muted && <span className="opacity-55">{split(muted, "m")}</span>}
      </span>
    </Tag>
  );
}

/** Subtle scroll-linked vertical drift. */
export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const { gsap } = registerGsap();
      gsap.fromTo(
        ref.current,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
