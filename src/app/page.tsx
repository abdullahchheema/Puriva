import { Hero } from "@/components/home/Hero";
import { SizesShowcase } from "@/components/home/SizesShowcase";
import { RippleReveal } from "@/components/home/RippleReveal";
import { Moments } from "@/components/home/Moments";
import { WordReveal, Reveal } from "@/components/motion/Reveal";
import { WaveDivider } from "@/components/fx/Water";
import { Eyebrow, PillButton } from "@/components/ui/PillButton";
import { BrandMark } from "@/components/ui/BrandMark";
import { Bottle } from "@/components/bottle/Bottle";
import { Customers } from "@/components/home/Customers";
import { Sparkles } from "@/components/fx/Sparkles";
import { waLink } from "@/data/products";

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
              <span className="text-sm text-mist">Three sizes · 500ml · 1.5L · 19L</span>
            </Reveal>
          </div>
        </div>
      </section>

      <SizesShowcase />

      <section className="relative isolate overflow-hidden bg-royal py-20 text-white lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,#2f7bff_0%,transparent_70%)]" />
        <Sparkles className="-z-10" />
        <div className="shell grid items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <Eyebrow tone="light">Custom label bottles</Eyebrow>
            <h2 className="display text-[clamp(2.6rem,6vw,5.4rem)]">
              Your name <span className="text-shine">on our water.</span>
            </h2>
            <p className="max-w-md text-white/80">
              Restaurants and anyone who wants their own label can order Puriva water with custom labelling. You choose the bottle size.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillButton href="/custom-labels" variant="light">
                See custom labels
              </PillButton>
              <PillButton href={waLink("Hello Puriva, I am interested in custom label bottles. Bottle size: [ ]. Quantity: [ ].")} variant="whatsapp" arrow={false}>
                Ask on WhatsApp
              </PillButton>
            </div>
          </div>
          <Reveal className="flex items-end justify-center gap-3 lg:col-span-6 lg:gap-5">
            <Bottle size="500ml" droplets={false} custom={{ name: "Your brand", color: "#ffffff", ink: "#0a2a7a", chip: "300ml" }} className="h-52 w-auto drop-shadow-[0_24px_28px_rgba(2,20,54,0.5)] sm:h-72" />
            <Bottle size="500ml" custom={{ name: "Your name", color: "#0b0f1a", ink: "#ffffff", chip: "500ml" }} className="h-64 w-auto drop-shadow-[0_24px_28px_rgba(2,20,54,0.5)] sm:h-96" />
            <Bottle size="500ml" droplets={false} custom={{ name: "Restaurant", color: "#f2b705", ink: "#1a1a1a", chip: "500ml" }} className="h-56 w-auto drop-shadow-[0_24px_28px_rgba(2,20,54,0.5)] sm:h-80" />
          </Reveal>
        </div>
      </section>

      <RippleReveal />
      <Moments />
      <Customers />
    </>
  );
}
