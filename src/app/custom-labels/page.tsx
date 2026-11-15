import type { Metadata } from "next";
import { Coffee, PenLine, Ruler, UtensilsCrossed, UserRound } from "lucide-react";
import { waLink } from "@/data/products";
import { Bottle } from "@/components/bottle/Bottle";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Sparkles } from "@/components/fx/Sparkles";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, PillButton } from "@/components/ui/PillButton";
import { CustomLabelStudio } from "@/components/home/CustomLabelStudio";

export const metadata: Metadata = {
  title: "Custom Label Bottles",
  description: "Puriva water with your own label for restaurants and anyone who wants it. Choose your bottle size and order on WhatsApp.",
};

const audiences = [
  { icon: UtensilsCrossed, t: "Restaurants", d: "Serve water in a bottle that carries your restaurant’s name." },
  { icon: Coffee, t: "Cafés and businesses", d: "Put your own name on the bottle your customers and guests hold." },
  { icon: UserRound, t: "Anyone who wants one", d: "A custom label is not only for businesses. Ask for the label you have in mind." },
];

const steps = [
  { icon: Ruler, t: "Choose your size", d: "The bottle size is yours to pick, for example 300ml or 500ml, or whichever size you need." },
  { icon: PenLine, t: "Share your label", d: "Send the name, logo and colours you want printed on the bottle." },
  { icon: UtensilsCrossed, t: "Confirm on WhatsApp", d: "Puriva confirms the details with you on WhatsApp before anything else happens." },
];

export default function CustomLabelsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_70%_at_70%_55%,#1b62d6_0%,#0a3375_40%,#03112b_80%)]" />
        <Bubbles count={14} className="-z-10" />
        <Sparkles className="-z-10" />
        <div className="shell grid items-center gap-8 pb-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 pb-10 lg:col-span-6 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Custom Labels" }]} />
            <Eyebrow tone="light">Custom label bottles</Eyebrow>
            <LineReveal gate as="h1" className="display text-[clamp(3rem,8vw,7rem)]" lines={["Your label.", <span key="o" className="text-shine">Our water.</span>]} />
            <Reveal gate delay={0.5} className="max-w-lg text-lg text-white/70">
              Puriva supplies water with custom labelling for restaurants and for anyone who wants to order it. You tell us the bottle size you need.
            </Reveal>
            <Reveal gate delay={0.65} className="flex flex-wrap gap-3">
              <PillButton href={waLink("Hello Puriva, I am interested in custom label bottles. Bottle size: [ ]. Quantity: [ ].")} variant="whatsapp">
                Ask on WhatsApp
              </PillButton>
              <PillButton href="#studio" variant="glass" arrow={false}>
                Try a label
              </PillButton>
            </Reveal>
          </div>
          <Reveal gate delay={0.3} y={50} className="flex items-end justify-center gap-3 lg:col-span-6 lg:gap-5">
            <Bottle size="500ml" droplets={false} custom={{ name: "Your brand", color: "#ffffff", ink: "#0a2a7a", chip: "300ml" }} className="h-[min(30svh,16rem)] w-auto drop-shadow-[0_24px_30px_rgba(2,20,54,0.55)] sm:h-[min(40svh,22rem)]" />
            <Bottle size="500ml" custom={{ name: "Your name", color: "#0f7a4f", ink: "#ffffff", chip: "500ml" }} className="h-[min(40svh,22rem)] w-auto drop-shadow-[0_24px_30px_rgba(2,20,54,0.55)] sm:h-[min(52svh,28rem)]" />
            <Bottle size="500ml" droplets={false} custom={{ name: "Restaurant", color: "#c0243a", ink: "#ffffff", chip: "500ml" }} className="h-[min(34svh,18rem)] w-auto drop-shadow-[0_24px_30px_rgba(2,20,54,0.55)] sm:h-[min(44svh,24rem)]" />
          </Reveal>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.3)" />
      </section>

      <section className="bg-icy py-16 lg:py-28">
        <div className="shell">
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow>Who it is for</Eyebrow>
            <LineReveal lines={["Made for restaurants,", "and for anyone."]} className="display text-[clamp(2.4rem,5.4vw,4.8rem)] text-ocean-900" />
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {audiences.map((a, i) => (
              <li key={a.t}>
                <Reveal delay={i * 0.08} className="glass-light gloss h-full rounded-[2rem] p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-royal/10 text-royal">
                    <a.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="display mt-6 text-3xl text-ocean-900">{a.t}</h3>
                  <p className="mt-3 text-mist">{a.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <Eyebrow>How it works</Eyebrow>
            <LineReveal lines={["Three simple", "steps."]} className="display text-[clamp(2.4rem,5vw,4.5rem)] text-ocean-900" />
            <p className="max-w-xs text-mist">Quantities, timing and any other details are confirmed with Puriva directly on WhatsApp.</p>
          </div>
          <ol className="flex flex-col lg:col-span-8">
            {steps.map((s, n) => (
              <li key={s.t}>
                <Reveal delay={n * 0.05} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-ocean-900/12 py-8 sm:grid-cols-[4rem_1fr_1.2fr]">
                  <span className="text-sm font-semibold tracking-widest text-royal">0{n + 1}</span>
                  <h3 className="display text-3xl text-ocean-900 transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{s.t}</h3>
                  <p className="col-start-2 text-mist sm:col-start-3">{s.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="studio" className="relative isolate scroll-mt-24 overflow-hidden bg-ocean-950 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_75%_50%,#14509f_0%,transparent_70%)]" />
        <Sparkles className="-z-10" />
        <div className="shell">
          <div className="mb-12 flex flex-col gap-4">
            <Eyebrow tone="light">Try a label</Eyebrow>
            <h2 className="display max-w-[14ch] text-[clamp(2.4rem,5.4vw,4.8rem)]">See your name on the bottle.</h2>
          </div>
          <CustomLabelStudio />
        </div>
      </section>
    </>
  );
}
