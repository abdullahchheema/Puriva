"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion, registerGsap } from "@/lib/gsap";
import { TLink } from "@/components/ui/TLink";
import { Eyebrow } from "@/components/ui/PillButton";
import { Bubbles } from "@/components/fx/Water";

const principles = [
  { n: "01", t: "Deep underground origin", d: "Our water comes from deep underground, with an essential amount of minerals." },
  { n: "02", t: "Reverse Osmosis", d: "Filtered using high safety standards and modern technology, then packed under hygienic conditions." },
  { n: "03", t: "A report you can read", d: "A sample of Puriva water was tested by the PCRWR National Water Quality Laboratory. The full report is on the quality page." },
];

/** A circle of water opens from the centre and reveals the quality teaser. */
export function RippleReveal() {
  const root = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        if (clip.current) clip.current.style.clipPath = "none";
        if (hint.current) hint.current.style.display = "none";
        return;
      }
      const { gsap } = registerGsap();
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
      });
      tl.fromTo(clip.current, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(78% at 50% 50%)", ease: "power2.inOut", duration: 1 })
        .to(hint.current, { opacity: 0, scale: 0.9, duration: 0.35 }, 0)
        .fromTo("[data-p]", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, 0.55);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[240svh] bg-icy" aria-labelledby="quality-teaser">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={hint} className="absolute inset-0 grid place-items-center px-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow>Look closer</Eyebrow>
            <p className="display max-w-[14ch] text-[clamp(2.4rem,6vw,5rem)] text-ocean-900">Clear water speaks for itself.</p>
          </div>
        </div>

        <div ref={clip} className="absolute inset-0 bg-ocean-950 text-white" style={{ clipPath: "circle(0% at 50% 50%)" }}>
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,#14509f_0%,transparent_70%)]" />
          <div aria-hidden="true" className="absolute top-1/4 left-1/4 size-[32rem] rounded-full bg-aqua/20 blur-[100px]" style={{ animation: "caustic 8s ease-in-out infinite" }} />
          <Bubbles count={12} />
          <div className="shell relative flex h-full flex-col justify-center gap-10">
            <div data-p className="flex flex-col gap-5">
              <Eyebrow tone="light">Quality &amp; purity</Eyebrow>
              <h2 id="quality-teaser" className="display max-w-[12ch] text-[clamp(2.8rem,7vw,6rem)]">
                Purity you can see.
              </h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {principles.map((p) => (
                <li key={p.n} data-p className="glass rounded-3xl p-6">
                  <span className="text-xs font-semibold tracking-[0.25em] text-aqua">{p.n}</span>
                  <h3 className="display mt-4 text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm text-white/70">{p.d}</p>
                </li>
              ))}
            </ul>
            <div data-p>
              <TLink
                href="/quality-purity"
                className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-white"
              >
                <span className="border-b border-aqua pb-1">Read about quality &amp; purity</span>
                <span className="grid size-9 place-items-center rounded-full bg-white text-ocean-900 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </TLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
