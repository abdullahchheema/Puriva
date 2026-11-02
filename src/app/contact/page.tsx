import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { business } from "@/data/products";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow } from "@/components/ui/PillButton";
import { ContactForm } from "@/components/home/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Puriva about sizes, availability and working together.",
};

const info = [
  { icon: Mail, label: "Email", value: [business.email] },
  { icon: Phone, label: "Phone", value: [business.phone] },
  { icon: MapPin, label: "Address", value: business.address },
  { icon: Clock, label: "Hours", value: [business.hours] },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,#1b62d6_0%,#0a3375_40%,#03112b_80%)]" />
        <Bubbles count={12} className="-z-10" />
        <div className="shell flex flex-col gap-6 pb-14 lg:pb-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <Eyebrow tone="light">Contact us</Eyebrow>
          <LineReveal gate as="h1" className="display text-[clamp(3rem,9vw,8rem)]" lines={["Let’s talk", <span key="w" className="text-aqua">water.</span>]} />
          <Reveal gate delay={0.45} className="max-w-xl text-lg text-white/70">
            Questions about sizes, availability or working with Puriva? Send a message and we will point you in the right direction.
          </Reveal>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.3)" />
      </section>

      <section className="bg-icy pb-20 lg:pb-32">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Suspense fallback={<div className="glass-light h-[32rem] rounded-[2rem]" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <aside className="flex flex-col gap-4 lg:col-span-5" aria-label="Business details">
            <Reveal delay={0.1} className="rounded-[2rem] bg-ocean-950 p-8 text-white">
              <h2 className="display text-3xl">Business details</h2>
              <p className="mt-2 text-sm text-white/55">Placeholders. Replace with Puriva’s real details.</p>
              <ul className="mt-6 flex flex-col divide-y divide-white/10">
                {info.map((i) => (
                  <li key={i.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-aqua">
                      <i.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold tracking-[0.2em] text-white/45 uppercase">{i.label}</span>
                      {i.value.map((v) => (
                        <span key={v} className="block text-white/90">
                          {v}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="relative overflow-hidden rounded-[2rem] bg-royal p-8 text-white">
              <Bubbles count={6} />
              <h3 className="display relative text-2xl">Looking for a specific size?</h3>
              <p className="relative mt-2 text-sm text-white/80">Choose it in the form and we will know exactly what you are asking about.</p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
