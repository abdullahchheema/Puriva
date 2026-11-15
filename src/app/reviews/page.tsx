import type { Metadata } from "next";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Sparkles } from "@/components/fx/Sparkles";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, PillButton } from "@/components/ui/PillButton";
import { Customers } from "@/components/home/Customers";
import { waLink } from "@/data/products";

export const metadata: Metadata = {
  title: "Reviews & Customers",
  description: "Who Puriva supplies across Pakistan, and what customers say about Puriva purified drinking water.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,#1b62d6_0%,#0a3375_40%,#03112b_80%)]" />
        <Bubbles count={12} className="-z-10" />
        <Sparkles className="-z-10" />
        <div className="shell flex flex-col gap-6 pb-14 lg:pb-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
          <Eyebrow tone="light">Reviews &amp; customers</Eyebrow>
          <LineReveal gate as="h1" className="display text-[clamp(3rem,9vw,8rem)]" lines={["Trusted by", <span key="t" className="text-shine">the people we serve.</span>]} />
          <Reveal gate delay={0.45} className="flex max-w-xl flex-col gap-6 text-lg text-white/70">
            <p>See who Puriva supplies today and read what customers say. Reviews are shown only with the customer’s permission.</p>
            <div>
              <PillButton href={waLink("Hello Puriva, I would like to share my review.\nName: [ ]\nBusiness (optional): [ ]\nMy review: [ ]")} variant="whatsapp">
                Share your review
              </PillButton>
            </div>
          </Reveal>
        </div>
        <WaveDivider fill="#03112b" back="rgb(34 199 230 / 0.3)" />
      </section>
      <Customers heading={false} />
    </>
  );
}
