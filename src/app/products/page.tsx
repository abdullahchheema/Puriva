import type { Metadata } from "next";
import { products } from "@/data/products";
import { Bottle } from "@/components/bottle/Bottle";
import { BottleStage } from "@/components/bottle/BottleStage";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { TLink } from "@/components/ui/TLink";

export const metadata: Metadata = {
  title: "Our Products",
  description: "The Puriva range: 1.5L, 1L, 500ml and 10L purified drinking water bottles.",
};

const scale: Record<string, string> = {
  "1-5l": "h-[21rem]",
  "1l": "h-[18.5rem]",
  "500ml": "h-[12.5rem]",
  "10l": "h-[13.5rem]",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950 pt-32 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_70%_at_50%_100%,#1b62d6_0%,#0a3375_40%,#03112b_80%)]" />
        <Bubbles count={12} className="-z-10" />
        <div className="shell flex flex-col gap-6 pb-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <Eyebrow tone="light">Our products</Eyebrow>
          <LineReveal
            gate
            as="h1"
            lines={["One standard.", <span key="s" className="text-aqua">Four sizes.</span>]}
            className="display text-[clamp(3rem,9vw,8rem)]"
          />
          <Reveal gate delay={0.4} className="max-w-xl text-lg text-white/70">
            Every Puriva bottle carries the same label, the same cap blue and the same purified drinking water. Choose the size that fits the moment.
          </Reveal>
        </div>

        {/* size comparison */}
        <div className="shell relative">
          <Reveal delay={0.1} className="flex items-end justify-center gap-6 sm:gap-12 lg:gap-20">
            {products.map((p) => (
              <TLink key={p.slug} href={`/products/${p.slug}`} className="group flex flex-col items-center gap-3" aria-label={p.name}>
                <Bottle
                  size={p.slug}
                  droplets={false}
                  className={`${scale[p.slug]} w-auto transition-transform duration-500 group-hover:-translate-y-3 drop-shadow-[0_20px_26px_rgba(2,20,54,0.5)]`}
                />
                <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold tracking-widest text-white/80 uppercase transition-colors group-hover:border-aqua group-hover:text-aqua">
                  {p.chip}
                </span>
              </TLink>
            ))}
          </Reveal>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(34 199 230 / 0.35)" className="mt-0" />
      </section>

      <section className="bg-icy py-16 lg:py-28">
        <div className="shell flex flex-col gap-10 lg:gap-16">
          {products.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.slug}>
                <article
                  className="relative overflow-hidden rounded-[2.5rem] text-white"
                  style={{ background: `radial-gradient(ellipse 70% 80% at ${flip ? "30%" : "70%"} 55%, ${p.tint.glow}66, transparent 70%), linear-gradient(160deg, ${p.tint.from}, ${p.tint.to})` }}
                >
                  <span
                    aria-hidden="true"
                    className="display pointer-events-none absolute top-1/2 -translate-y-1/2 leading-none text-transparent select-none"
                    style={{
                      fontSize: "clamp(10rem, 26vw, 28rem)",
                      WebkitTextStroke: "2px rgb(255 255 255 / 0.14)",
                      [flip ? "left" : "right"]: "2%",
                    }}
                  >
                    {p.amount}
                  </span>
                  <div className={`relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:p-16 ${flip ? "" : ""}`}>
                    <div className={`flex flex-col gap-5 lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                      <span className="text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">0{i + 1} · {p.moment}</span>
                      <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)]">{p.name}</h2>
                      <p className="text-lg text-white/80">{p.tagline} {p.summary}</p>
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/20 pt-5 text-sm">
                        <div>
                          <dt className="text-white/55">Volume</dt>
                          <dd className="font-semibold">{p.amount}{p.unit === "ml" ? "ml" : " litres"}</dd>
                        </div>
                        <div>
                          <dt className="text-white/55">Shape</dt>
                          <dd className="font-semibold">{p.silhouette}</dd>
                        </div>
                      </dl>
                      <ul className="flex flex-wrap gap-2">
                        {p.useCases.map((u) => (
                          <li key={u.title} className="rounded-full border border-white/25 px-3.5 py-1 text-xs">
                            {u.title}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2">
                        <PillButton href={`/products/${p.slug}`} variant="light">
                          View details
                        </PillButton>
                      </div>
                    </div>
                    <div className={`flex justify-center lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                      <BottleStage size={p.slug} className={p.slug === "500ml" || p.slug === "10l" ? "h-[20rem] sm:h-[24rem]" : "h-[26rem] sm:h-[32rem]"} strength={7} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
