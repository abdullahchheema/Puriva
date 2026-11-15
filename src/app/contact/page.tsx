import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { AtSign, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, waLink } from "@/data/products";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Sparkles } from "@/components/fx/Sparkles";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Eyebrow, PillButton } from "@/components/ui/PillButton";
import { ContactForm } from "@/components/home/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Order Puriva purified drinking water or ask about custom label bottles. Message Puriva on WhatsApp, call or email.",
};

const info = [
  { icon: MessageCircle, label: "WhatsApp", value: business.whatsappDisplay, href: waLink("Hello Puriva, I would like some information about your water.") },
  { icon: Phone, label: "Phone", value: business.phone, href: `tel:+${business.whatsapp}` },
  { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
  { icon: MapPin, label: "Location", value: business.location },
  { icon: AtSign, label: "Instagram", value: business.instagram.handle, href: business.instagram.url },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,#1b62d6_0%,#0a3375_40%,#03112b_80%)]" />
        <Bubbles count={12} className="-z-10" />
        <Sparkles className="-z-10" />
        <div className="shell flex flex-col gap-6 pb-14 lg:pb-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <Eyebrow tone="light">Contact us</Eyebrow>
          <LineReveal gate as="h1" className="display text-[clamp(3rem,9vw,8rem)]" lines={["Let’s talk", <span key="w" className="text-shine">water.</span>]} />
          <Reveal gate delay={0.45} className="flex max-w-xl flex-col gap-6 text-lg text-white/70">
            <p>Orders, prices and custom label bottles are handled on WhatsApp. Write your message below and we will open the chat with it ready to send.</p>
            <div>
              <PillButton href={waLink("Hello Puriva, I would like to place an order.")} variant="whatsapp">
                Chat on WhatsApp
              </PillButton>
            </div>
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
            <Reveal delay={0.1} className="gloss rounded-[2rem] bg-ocean-950 p-8 text-white">
              <h2 className="display text-3xl">Reach Puriva</h2>
              <ul className="mt-6 flex flex-col divide-y divide-white/10">
                {info.map((i) => (
                  <li key={i.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-aqua">
                      <i.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold tracking-[0.2em] text-white/45 uppercase">{i.label}</span>
                      {i.href ? (
                        <a href={i.href} {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block break-words text-white/90 transition-colors hover:text-aqua">
                          {i.value}
                        </a>
                      ) : (
                        <span className="block text-white/90">{i.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <a href={business.tiktok.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block border-b border-aqua pb-1 text-sm font-semibold text-white">
                Follow Puriva on TikTok
              </a>
            </Reveal>
            <Reveal delay={0.2} className="gloss grid grid-cols-[7rem_1fr] items-center gap-5 overflow-hidden rounded-[2rem] bg-royal p-6 text-white">
              <Image src="/brand/instagram-qr.jpeg" alt="Instagram QR code for @puriva_drinkingwater" width={720} height={1030} className="h-auto w-full rounded-2xl" />
              <div>
                <h3 className="display text-2xl">Scan for Instagram</h3>
                <p className="mt-2 text-sm text-white/80">{business.instagram.handle}</p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
