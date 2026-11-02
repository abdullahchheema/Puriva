import { LineReveal, Reveal, Parallax } from "@/components/motion/Reveal";
import { BottleStage } from "@/components/bottle/BottleStage";
import { Bubbles, WaterCanvas } from "@/components/fx/Water";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ocean-950 text-white">
      {/* depth + light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_72%_46%,#1b62d6_0%,#0a3375_38%,#03112b_78%)]"
      />
      <div aria-hidden="true" className="absolute -top-1/4 right-[8%] -z-10 h-[140%] w-[28%] rotate-[18deg] bg-gradient-to-b from-white/20 via-aqua/10 to-transparent blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-[-10%] left-[-10%] -z-10 size-[40rem] rounded-full bg-aqua/15 blur-[110px]" style={{ animation: "caustic 9s ease-in-out infinite" }} />
      <WaterCanvas className="-z-10" />
      <Bubbles count={16} className="-z-10" />

      {/* watermark */}
      <Reveal gate y={40} className="pointer-events-none absolute inset-x-0 bottom-[6%] -z-10 text-center">
        <span
          aria-hidden="true"
          className="display block leading-none text-white/[0.06] select-none"
          style={{ fontSize: "clamp(7rem, 30vw, 34rem)" }}
        >
          PURIVA
        </span>
      </Reveal>

      <div className="shell grid flex-1 items-center gap-6 pt-28 pb-24 lg:grid-cols-12 lg:gap-8 lg:pt-32">
        <div className="relative z-10 flex flex-col gap-7 lg:col-span-6">
          <Reveal gate delay={0.2}>
            <Eyebrow tone="light">Purified drinking water</Eyebrow>
          </Reveal>
          <LineReveal
            gate
            as="h1"
            delay={0.25}
            stagger={0.13}
            className="display text-[clamp(3.2rem,9vw,7.5rem)]"
            lines={["Pure water,", <span key="e" className="text-aqua">every day.</span>]}
          />
          <Reveal gate delay={0.55} className="max-w-md text-lg text-white/70">
            Puriva is made for everyday hydration. One clear standard, four bottle sizes, from the table at home to the bag on your shoulder.
          </Reveal>
          <Reveal gate delay={0.7} className="flex flex-wrap gap-3">
            <PillButton href="/products" variant="light">
              Explore the range
            </PillButton>
            <PillButton href="/our-story" variant="glass" arrow={false}>
              Our story
            </PillButton>
          </Reveal>
        </div>

        <div className="relative flex items-end justify-center lg:col-span-6">
          <Reveal gate delay={0.35} y={60} scale={0.94} className="relative">
            <Parallax speed={0.06}>
              <BottleStage size="1-5l" className="h-[min(68svh,40rem)]" strength={11} />
            </Parallax>
            <div className="glass absolute top-[18%] -left-10 hidden rounded-2xl px-4 py-3 text-xs font-medium sm:block lg:-left-28">
              <span className="block text-[0.65rem] tracking-[0.2em] text-aqua uppercase">Shown</span>
              1.5L signature bottle
            </div>
            <div className="glass absolute right-[-1.5rem] bottom-[26%] hidden rounded-2xl px-4 py-3 text-xs font-medium sm:block lg:-right-32">
              <span className="block text-[0.65rem] tracking-[0.2em] text-aqua uppercase">Range</span>
              1.5L · 1L · 500ml · 10L
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal gate delay={0.95} className="absolute inset-x-0 bottom-0">
        <div className="shell flex items-center justify-between border-t border-white/10 py-5 text-xs font-medium tracking-[0.2em] text-white/55 uppercase">
          <span>Everyday hydration</span>
          <span className="hidden sm:block">Four sizes</span>
          <span className="inline-flex items-center gap-2">
            Scroll
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
          </span>
        </div>
      </Reveal>
    </section>
  );
}
