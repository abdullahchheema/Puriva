"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { products } from "@/data/products";
import { BottleStage } from "@/components/bottle/BottleStage";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap";

const heights: Record<string, string> = {
  "1-5l": "h-[min(48svh,30rem)] lg:h-[min(62svh,34rem)]",
  "1l": "h-[min(44svh,27rem)] lg:h-[min(56svh,31rem)]",
  "500ml": "h-[min(34svh,20rem)] lg:h-[min(42svh,24rem)]",
  "10l": "h-[min(34svh,20rem)] lg:h-[min(44svh,26rem)]",
};

export function SizesShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const { gsap } = registerGsap();
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const t = track.current;
        if (!t) return;
        const dist = () => t.scrollWidth - window.innerWidth;
        gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${dist()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // numerals drift against the track for depth
        gsap.utils.toArray<HTMLElement>("[data-numeral]").forEach((n) => {
          gsap.fromTo(
            n,
            { xPercent: 12 },
            {
              xPercent: -12,
              ease: "none",
              scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${dist()}`, scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-ocean-950 text-white" aria-labelledby="sizes-title">
      <div ref={track} className="flex flex-col lg:h-svh lg:w-max lg:flex-row">
        {/* intro panel */}
        <div className="flex min-h-[70svh] shrink-0 flex-col justify-center gap-6 bg-ocean-950 px-[var(--page-pad)] py-24 lg:w-[70vw] lg:py-0 lg:pl-[max(var(--page-pad),8vw)]">
          <Eyebrow tone="light">The range</Eyebrow>
          <h2 id="sizes-title" className="display max-w-[11ch] text-[clamp(3rem,7vw,6.5rem)]">
            Four sizes. One clear standard.
          </h2>
          <p className="max-w-md text-lg text-white/65">
            The same label, the same cap blue and the same purified drinking water, shaped for four different moments of the day.
          </p>
          <p className="hidden items-center gap-3 text-xs tracking-[0.25em] text-aqua uppercase lg:flex">
            Keep scrolling <span className="h-px w-16 bg-aqua" />
          </p>
        </div>

        {products.map((p, i) => (
          <article
            key={p.slug}
            className="relative flex min-h-svh shrink-0 items-center overflow-hidden px-[var(--page-pad)] py-20 lg:w-[100vw] lg:py-0"
            style={{ background: `radial-gradient(ellipse 80% 70% at 70% 50%, ${p.tint.glow}55, transparent 70%), linear-gradient(160deg, ${p.tint.from}, ${p.tint.to})` }}
          >
            <span
              data-numeral
              aria-hidden="true"
              className="display pointer-events-none absolute top-1/2 right-[2%] -translate-y-1/2 leading-none text-transparent select-none"
              style={{ fontSize: "clamp(12rem, 34vw, 40rem)", WebkitTextStroke: "2px rgb(255 255 255 / 0.16)" }}
            >
              {p.amount}
              <span className="text-[0.4em]">{p.unit}</span>
            </span>
            <div className="shell relative grid w-full items-center gap-8 lg:grid-cols-12">
              <div className="flex flex-col gap-5 lg:col-span-5">
                <span className="text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">
                  0{i + 1} / 04 · {p.moment}
                </span>
                <h3 className="display text-[clamp(2.6rem,5.5vw,5rem)]">{p.tagline}</h3>
                <p className="max-w-md text-white/75">{p.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {p.useCases.map((u) => (
                    <li key={u.title} className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/90">
                      {u.title}
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <PillButton href={`/products/${p.slug}`} variant="light">
                    {p.name}
                  </PillButton>
                </div>
              </div>
              <div className="flex justify-center lg:col-span-7 lg:justify-center">
                <BottleStage size={p.slug} className={heights[p.slug]} strength={8} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1 bg-white/10 lg:block">
        <div ref={bar} className="h-full origin-left bg-aqua" style={{ transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}
