import type { Metadata } from "next";
import { Bottle } from "@/components/bottle/Bottle";
import { BottleStage } from "@/components/bottle/BottleStage";
import { LineReveal, Reveal, WordReveal, Parallax } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { BrandMark } from "@/components/ui/BrandMark";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Puriva is purified drinking water made for everyday hydration. Our philosophy, our identity and the experience we want to deliver.",
};

const chapters = [
  {
    n: "01",
    title: "Philosophy",
    lead: "Water should be the simplest part of your day.",
    text: "Puriva starts from a plain idea: purified drinking water, delivered with care and without fuss. We would rather do one thing clearly than many things loudly.",
  },
  {
    n: "02",
    title: "Everyday hydration",
    lead: "Built for ordinary days.",
    text: "Hydration is not an event. It is the glass at breakfast, the bottle in the bag, the jug in the kitchen. Our four sizes exist so Puriva fits into those moments without asking for attention.",
  },
  {
    n: "03",
    title: "Identity",
    lead: "Blue, white and clear.",
    text: "The Puriva look comes straight from the bottle: a pale, translucent body, a bright blue cap and a royal-blue label carrying a bold white wordmark and a leaf-and-water emblem.",
  },
  {
    n: "04",
    title: "The experience",
    lead: "Fresh from first glance to last sip.",
    text: "We want opening a Puriva to feel clean, calm and confident. Clear packaging, clear information and a brand that is easy to trust.",
  },
];

const swatches = [
  { name: "Label blue", hex: "#1347C9", fg: "text-white" },
  { name: "Cap blue", hex: "#1B7BE8", fg: "text-white" },
  { name: "Aqua", hex: "#22C7E6", fg: "text-ocean-950" },
  { name: "Icy white", hex: "#E8F6FF", fg: "text-ocean-900" },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_85%_40%,#1b62d6_0%,#0a3375_40%,#03112b_80%)]" />
        <Bubbles count={12} className="-z-10" />
        <div className="shell grid items-center gap-8 pb-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 pb-10 lg:col-span-7 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
            <Eyebrow tone="light">Our story</Eyebrow>
            <LineReveal
              gate
              as="h1"
              className="display text-[clamp(3rem,8.4vw,7.6rem)]"
              lines={["Water,", "made", <span key="s" className="text-aqua">simple.</span>]}
            />
            <Reveal gate delay={0.5} className="max-w-lg text-lg text-white/70">
              Puriva is purified drinking water for everyday hydration. This is what we believe, how we look and the experience we want you to have.
            </Reveal>
          </div>
          <Reveal gate delay={0.3} y={50} className="flex justify-center lg:col-span-5">
            <BottleStage size="1-5l" className="h-[min(56svh,30rem)]" strength={10} />
          </Reveal>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.3)" />
      </section>

      {/* manifesto */}
      <section className="bg-icy py-20 lg:py-32">
        <div className="shell">
          <WordReveal
            as="p"
            className="display max-w-5xl text-[clamp(2rem,5vw,4.4rem)] !leading-[1.08] !tracking-[-0.03em] text-ocean-900"
            text="We believe good water does not need a big story."
            muted="It needs to be clean, easy to find and pleasant to drink, every single day."
          />
        </div>
      </section>

      {/* chapters */}
      <section className="bg-white py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4.6rem)] text-ocean-900">Four ideas, one bottle.</h2>
            <div className="relative mt-10 hidden h-[24rem] place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-ice to-icy lg:grid">
              <Parallax speed={0.05}>
                <Bottle size="1l" className="h-[22rem] w-auto drop-shadow-[0_24px_26px_rgba(10,51,117,0.3)]" />
              </Parallax>
            </div>
          </div>
          <ol className="flex flex-col lg:col-span-7">
            {chapters.map((c) => (
              <li key={c.n} className="border-t border-ocean-900/12 py-10 first:border-t-0 first:pt-0 lg:py-14">
                <Reveal className="flex flex-col gap-4">
                  <span className="text-sm font-semibold tracking-[0.25em] text-royal">{c.n} — {c.title}</span>
                  <h3 className="display text-[clamp(1.9rem,3.6vw,3.2rem)] text-ocean-900">{c.lead}</h3>
                  <p className="max-w-xl text-lg text-mist">{c.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* identity */}
      <section className="relative overflow-hidden bg-royal py-20 text-white lg:py-32">
        <BrandMark className="pointer-events-none absolute -right-24 -bottom-24 size-[36rem] text-white/[0.07]" />
        <div className="shell relative grid items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow tone="light">Brand identity</Eyebrow>
            <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">The label is the logo is the bottle.</h2>
            <p className="max-w-md text-white/80">A vertical white PURIVA wordmark in bold, geometric capitals. A leaf-and-water emblem. A single, confident blue.</p>
            <ul className="grid grid-cols-2 gap-3 pt-2">
              {swatches.map((s) => (
                <li key={s.name} className={`rounded-2xl p-4 ${s.fg}`} style={{ background: s.hex }}>
                  <span className="block text-sm font-semibold">{s.name}</span>
                  <span className="text-xs opacity-75">{s.hex}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="flex items-end justify-center gap-4 lg:col-span-7">
            <Bottle size="500ml" droplets={false} className="h-56 w-auto drop-shadow-[0_24px_28px_rgba(2,20,54,0.5)] sm:h-72" />
            <Bottle size="1-5l" className="h-[22rem] w-auto drop-shadow-[0_24px_28px_rgba(2,20,54,0.5)] sm:h-[30rem]" />
            <Bottle size="1l" droplets={false} className="h-64 w-auto drop-shadow-[0_24px_28px_rgba(2,20,54,0.5)] sm:h-[24rem]" />
          </Reveal>
        </div>
      </section>

      {/* closing */}
      <section className="bg-icy py-20 lg:py-32">
        <div className="shell flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal lines={["Pure water.", "Plain and simple."]} className="display text-[clamp(2.6rem,6vw,5.4rem)] text-ocean-900" />
          <div className="flex flex-wrap gap-3">
            <PillButton href="/products">See the range</PillButton>
            <PillButton href="/quality-purity" variant="outline" arrow={false}>
              Quality &amp; purity
            </PillButton>
          </div>
        </div>
      </section>
    </>
  );
}
