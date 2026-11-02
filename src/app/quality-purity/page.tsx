import type { Metadata } from "next";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { BottleStage } from "@/components/bottle/BottleStage";
import { FileText, FlaskConical, Droplets, PackageCheck, Waves, ShieldCheck } from "lucide-react";
import { ProgressLine } from "@/components/home/ProgressLine";

export const metadata: Metadata = {
  title: "Quality & Purity",
  description: "How Puriva approaches quality and purity for its purified drinking water.",
};

const stages = [
  {
    icon: Waves,
    title: "Source",
    text: "Every bottle starts with water, so every bottle starts with care about where that water comes from.",
  },
  {
    icon: Droplets,
    title: "Purification",
    text: "Purified drinking water is the promise on the label. The purification approach is the heart of the product.",
  },
  {
    icon: PackageCheck,
    title: "Bottling & sealing",
    text: "Clean handling, secure caps and tamper bands keep each bottle sealed until you open it.",
  },
  {
    icon: ShieldCheck,
    title: "Quality control",
    text: "Checks are part of the routine rather than an afterthought, from the line to the finished bottle.",
  },
];

const pending = [
  { icon: FileText, t: "Certifications & approvals", d: "Any certifications will be listed here once supplied by Puriva." },
  { icon: FlaskConical, t: "Laboratory information", d: "Test reports and water-quality data will be added when available." },
  { icon: Droplets, t: "Source & process details", d: "A fuller description of sourcing and purification will follow." },
];

export default function QualityPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_70%_at_20%_30%,#14509f_0%,#07265c_45%,#03112b_80%)]" />
        <div aria-hidden="true" className="absolute top-[10%] right-[10%] -z-10 size-[34rem] rounded-full bg-aqua/20 blur-[110px]" style={{ animation: "caustic 8s ease-in-out infinite" }} />
        <Bubbles count={18} className="-z-10" />
        <div className="shell grid items-center gap-8 pb-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 pb-10 lg:col-span-7 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Quality & Purity" }]} />
            <Eyebrow tone="light">Quality &amp; purity</Eyebrow>
            <LineReveal gate as="h1" className="display text-[clamp(3rem,8.4vw,7.4rem)]" lines={["Clear water,", <span key="c" className="text-aqua">clear promise.</span>]} />
            <Reveal gate delay={0.5} className="max-w-lg text-lg text-white/70">
              Purified drinking water is all Puriva sets out to be. Here is how we think about quality, and where more detail will appear.
            </Reveal>
          </div>
          <Reveal gate delay={0.3} y={50} className="flex justify-center lg:col-span-5">
            <BottleStage size="1l" className="h-[min(54svh,29rem)]" strength={9} />
          </Reveal>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.3)" />
      </section>

      {/* journey */}
      <section className="bg-icy py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <Eyebrow>Our approach</Eyebrow>
            <LineReveal lines={["From source", "to sealed cap."]} className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ocean-900" />
            <p className="max-w-xs text-mist">Four stages of care that every bottle goes through. This is a general outline of our commitment, not a technical specification.</p>
          </div>
          <div className="relative lg:col-span-8">
            <ProgressLine />
            <ol className="flex flex-col gap-6 pl-10 sm:pl-14">
              {stages.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 0.05} className="glass-light relative rounded-[2rem] p-7 sm:p-9">
                    <span className="absolute top-8 -left-[2.575rem] grid size-9 place-items-center rounded-full bg-royal text-xs font-bold text-white ring-4 ring-icy sm:-left-[3.575rem]">{i + 1}</span>
                    <div className="flex items-start gap-5">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-royal/10 text-royal">
                        <s.icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="display text-3xl text-ocean-900">{s.title}</h3>
                        <p className="mt-3 max-w-xl text-mist">{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* honesty / placeholders */}
      <section className="relative overflow-hidden bg-ocean-950 py-20 text-white lg:py-28">
        <Bubbles count={10} className="opacity-70" />
        <div className="shell relative">
          <div className="mb-12 flex flex-col gap-5">
            <Eyebrow tone="light">To be provided</Eyebrow>
            <h2 className="display max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.8rem)]">Specifics belong here, and they will be real.</h2>
            <p className="max-w-xl text-white/65">We would rather leave a space than fill it with claims that have not been verified. These sections are reserved for information supplied directly by Puriva.</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {pending.map((p, i) => (
              <li key={p.t}>
                <Reveal delay={i * 0.08} className="h-full rounded-[2rem] border border-dashed border-white/25 bg-white/[0.04] p-7">
                  <p.icon className="size-7 text-aqua" aria-hidden="true" />
                  <h3 className="display mt-6 text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm text-white/65">{p.d}</p>
                  <span className="mt-6 inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.2em] text-aqua uppercase">Coming soon</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-icy py-20 lg:py-28">
        <div className="shell flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal lines={["Questions about", "what is in the bottle?"]} className="display text-[clamp(2.4rem,5.4vw,4.8rem)] text-ocean-900" />
          <PillButton href="/contact">Ask Puriva</PillButton>
        </div>
      </section>
    </>
  );
}
