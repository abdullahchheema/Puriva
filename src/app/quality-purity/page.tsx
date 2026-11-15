import type { Metadata } from "next";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Sparkles } from "@/components/fx/Sparkles";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { BottleStage } from "@/components/bottle/BottleStage";
import { Droplets, FileText, FlaskConical, PackageCheck, Waves } from "lucide-react";
import { ProgressLine } from "@/components/home/ProgressLine";
import { waLink } from "@/data/products";

export const metadata: Metadata = {
  title: "Quality & Purity",
  description: "Where Puriva water comes from, how it is purified, what is on the label, and a laboratory test report you can read in full.",
};

/** Statements below are taken from the Puriva print label. */
const stages = [
  {
    icon: Waves,
    title: "Deep underground origin",
    text: "Our water comes from deep underground, with an essential amount of minerals.",
  },
  {
    icon: Droplets,
    title: "Reverse Osmosis filtration",
    text: "The water is filtered using high safety standards and modern technology (Reverse Osmosis).",
  },
  {
    icon: PackageCheck,
    title: "Hygienic packing",
    text: "Bottles are packed under hygienic conditions, with a safety seal that you can check before opening.",
  },
  {
    icon: FlaskConical,
    title: "Laboratory tested",
    text: "A sample of Puriva drinking water was tested by the National Water Quality Laboratory of PCRWR. The full report is below.",
  },
];

/** Mineral contents in mg/L, exactly as printed on the 1.5L label. */
const composition = [
  ["Magnesium", "4 – 15"],
  ["Sodium", "7 – 30"],
  ["Sulphate", "12 – 70"],
  ["Calcium", "30 – 80"],
  ["Potassium", "0.2 – 0.5"],
  ["Chloride", "50 – 150"],
  ["Fluoride", "0.2 – 0.5"],
  ["Total minerals", "152 – 250"],
  ["pH", "6.5 – 8.5"],
];

const report = [
  ["Issued by", "National Water Quality Laboratory, Pakistan Council of Research in Water Resources (PCRWR), Islamabad"],
  ["Report number", "AR-09108"],
  ["Sample type", "Drinking Water (RO)"],
  ["Sampled", "5 May 2026"],
  ["Reported", "20 May 2026"],
  ["Chemical parameters", "Statement of conformity: Safe"],
  ["Microbiological parameters", "Statement of conformity: Safe"],
];

export default function QualityPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_70%_at_20%_30%,#14509f_0%,#07265c_45%,#03112b_80%)]" />
        <div aria-hidden="true" className="absolute top-[10%] right-[10%] -z-10 size-[34rem] rounded-full bg-aqua/20 blur-[110px]" style={{ animation: "caustic 8s ease-in-out infinite" }} />
        <Bubbles count={18} className="-z-10" />
        <Sparkles className="-z-10" />
        <div className="shell grid items-center gap-8 pb-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 pb-10 lg:col-span-7 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Quality & Purity" }]} />
            <Eyebrow tone="light">Quality &amp; purity</Eyebrow>
            <LineReveal gate as="h1" className="display text-[clamp(3rem,8.4vw,7.4rem)]" lines={["Clear water,", <span key="c" className="text-shine">clear proof.</span>]} />
            <Reveal gate delay={0.5} className="max-w-lg text-lg text-white/70">
              What is on our label, how the water is purified, and a laboratory test report you can open and read in full.
            </Reveal>
          </div>
          <Reveal gate delay={0.3} y={50} className="flex justify-center lg:col-span-5">
            <BottleStage size="1-5l" className="h-[min(54svh,29rem)]" strength={9} />
          </Reveal>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.3)" />
      </section>

      {/* journey */}
      <section className="bg-icy py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <Eyebrow>From the label</Eyebrow>
            <LineReveal lines={["From source", "to sealed cap."]} className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ocean-900" />
            <p className="max-w-xs text-mist">The first three stages are the statements printed on the Puriva bottle label.</p>
          </div>
          <div className="relative lg:col-span-8">
            <ProgressLine />
            <ol className="flex flex-col gap-6 pl-10 sm:pl-14">
              {stages.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 0.05} className="glass-light gloss relative rounded-[2rem] p-7 sm:p-9">
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

      {/* composition + storage */}
      <section className="relative overflow-hidden bg-ocean-950 py-20 text-white lg:py-28">
        <Bubbles count={10} className="opacity-70" />
        <Sparkles />
        <div className="shell relative grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Eyebrow tone="light">Composition</Eyebrow>
            <h2 className="display max-w-[12ch] text-[clamp(2.4rem,5.4vw,4.8rem)]">What is in the bottle.</h2>
            <p className="max-w-md text-white/65">Mineral contents in mg/L, exactly as printed on the Puriva 1.5L label.</p>
            <ul className="mt-2 flex flex-col gap-2 text-sm text-white/75">
              <li>Before opening, ensure the safety seal is intact.</li>
              <li>Store in a cool and odourless place.</li>
              <li>Keep away from direct sunlight.</li>
              <li>Crush the bottle after use.</li>
            </ul>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="glass gloss overflow-hidden rounded-[2rem]">
              <table className="w-full text-left">
                <caption className="sr-only">Mineral contents in mg/L as printed on the Puriva 1.5L label</caption>
                <thead>
                  <tr className="border-b border-white/15 text-xs tracking-[0.2em] text-aqua uppercase">
                    <th scope="col" className="px-6 py-4 font-semibold sm:px-8">
                      Mineral contents
                    </th>
                    <th scope="col" className="px-6 py-4 text-right font-semibold sm:px-8">
                      mg/L
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {composition.map(([k, v]) => (
                    <tr key={k} className="border-b border-white/10 last:border-0">
                      <th scope="row" className="px-6 py-3.5 font-medium text-white/90 sm:px-8">
                        {k}
                      </th>
                      <td className="px-6 py-3.5 text-right tabular-nums text-white sm:px-8">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* laboratory report */}
      <section className="bg-icy py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Eyebrow>Laboratory report</Eyebrow>
            <LineReveal lines={["Read the", "full report."]} className="display text-[clamp(2.4rem,5vw,4.6rem)] text-ocean-900" />
            <p className="max-w-sm text-mist">
              The test results relate only to the sample submitted and tested, and the laboratory asks that the report is shared in full. Open the original below.
            </p>
            <div className="pt-2">
              <PillButton href="/docs/puriva-water-test-report.pdf" variant="primary">
                Open the full report (PDF)
              </PillButton>
            </div>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="glass-light gloss rounded-[2rem] p-7 sm:p-10">
              <span className="grid size-12 place-items-center rounded-2xl bg-royal/10 text-royal">
                <FileText className="size-6" aria-hidden="true" />
              </span>
              <h3 className="display mt-5 text-3xl text-ocean-900">Test report AR-09108</h3>
              <dl className="mt-6 divide-y divide-ocean-900/10">
                {report.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="text-sm font-semibold text-ocean-900">{k}</dt>
                    <dd className="text-mist">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="shell flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal lines={["Questions about", "what is in the bottle?"]} className="display text-[clamp(2.4rem,5.4vw,4.8rem)] text-ocean-900" />
          <PillButton href={waLink("Hello Puriva, I would like to know more about your water quality and test reports.")} variant="whatsapp">
            Ask on WhatsApp
          </PillButton>
        </div>
      </section>
    </>
  );
}
