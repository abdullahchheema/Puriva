import { Hero } from "@/components/home/Hero";
import { SizesShowcase } from "@/components/home/SizesShowcase";
import { RippleReveal } from "@/components/home/RippleReveal";
import { Moments } from "@/components/home/Moments";
import { WordReveal, Reveal } from "@/components/motion/Reveal";
import { WaveDivider } from "@/components/fx/Water";
import { Eyebrow, PillButton } from "@/components/ui/PillButton";
import { BrandMark } from "@/components/ui/BrandMark";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-ocean-950">
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.3)" />
      </div>

      <section className="relative overflow-hidden bg-icy py-20 lg:py-32">
        <BrandMark className="pointer-events-none absolute top-1/2 -left-24 size-[34rem] -translate-y-1/2 text-royal/[0.06]" />
        <div className="shell relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow>About Puriva</Eyebrow>
          </div>
          <div className="flex flex-col gap-10 lg:col-span-9">
            <WordReveal
              as="h2"
              className="display text-[clamp(2rem,4.6vw,4rem)] !leading-[1.08] !tracking-[-0.03em] text-ocean-900"
              text="Puriva is purified drinking water, made for everyday hydration."
              muted="Simple, clean and always within reach, from the table at home to the bag on your shoulder."
            />
            <Reveal delay={0.1} className="flex flex-wrap items-center gap-6">
              <PillButton href="/our-story" variant="primary">
                Read our story
              </PillButton>
              <span className="text-sm text-mist">Four sizes · 1.5L · 1L · 500ml · 10L</span>
            </Reveal>
          </div>
        </div>
      </section>

      <SizesShowcase />
      <RippleReveal />
      <Moments />
    </>
  );
}
