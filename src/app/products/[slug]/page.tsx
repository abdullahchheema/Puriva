import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, products, waLink, type BottleSize } from "@/data/products";
import { Bottle } from "@/components/bottle/Bottle";
import { BottleStage } from "@/components/bottle/BottleStage";
import { LineReveal, Reveal, Parallax } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PillButton, Eyebrow } from "@/components/ui/PillButton";
import { TLink } from "@/components/ui/TLink";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: `${p.name}: ${p.tagline} ${p.summary}` } : {};
}

const heroH: Record<BottleSize, string> = {
  "1-5l": "h-[min(60svh,34rem)]",
  "500ml": "h-[min(46svh,26rem)]",
  "19l": "h-[min(58svh,32rem)]",
};

/** Callout positions (percent of the bottle box) for the anatomy diagram. */
const callouts: Record<BottleSize, { t: string; top: number; side: "l" | "r"; d: string }[]> = {
  "1-5l": [
    { t: "Bright blue cap", top: 5, side: "r", d: "Tamper band and ridged grip." },
    { t: "Clear, ribbed body", top: 24, side: "l", d: "Pale-blue translucent bottle." },
    { t: "Royal-blue label", top: 52, side: "r", d: "Vertical PURIVA wordmark and emblem." },
    { t: "Petaloid base", top: 90, side: "l", d: "Ribbed base for a steady stand." },
  ],
  "500ml": [
    { t: "Bright blue cap", top: 5, side: "r", d: "Same cap blue across the range." },
    { t: "Compact body", top: 28, side: "l", d: "Made for pockets and bags." },
    { t: "Royal-blue label", top: 52, side: "r", d: "The same wordmark, scaled down." },
    { t: "Blue ribbed base", top: 90, side: "l", d: "Keeps its footing." },
  ],
  "19l": [
    { t: "Blue cap", top: 4, side: "r", d: "Fits the narrow neck." },
    { t: "Narrow neck", top: 12, side: "l", d: "Rounded shoulders below it." },
    { t: "Royal-blue label", top: 56, side: "r", d: "Horizontal PURIVA wordmark and emblem." },
    { t: "Ribbed body", top: 90, side: "l", d: "Rings at the shoulder and the base." },
  ],
};

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const i = products.findIndex((x) => x.slug === p.slug);
  const prev = products[(i + products.length - 1) % products.length];
  const next = products[(i + 1) % products.length];
  const size = p.slug;

  return (
    <>
      {/* hero */}
      <section
        className="relative isolate overflow-hidden pt-32 text-white"
        style={{ background: `radial-gradient(ellipse 70% 70% at 68% 55%, ${p.tint.glow}88, transparent 72%), linear-gradient(165deg, ${p.tint.from}, ${p.tint.to} 70%, #03112b)` }}
      >
        <Bubbles count={12} className="-z-10" />
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute right-[-2%] bottom-[8%] -z-10 leading-none text-transparent select-none"
          style={{ fontSize: "clamp(14rem, 40vw, 46rem)", WebkitTextStroke: "2px rgb(255 255 255 / 0.13)" }}
        >
          {p.amount}
        </span>
        <div className="shell grid items-center gap-10 pb-20 lg:grid-cols-12 lg:pb-28">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: p.name }]} />
            <Eyebrow tone="light">{p.moment}</Eyebrow>
            <LineReveal gate as="h1" lines={[p.name, <span key="t" className="text-aqua">{p.tagline}</span>]} className="display text-[clamp(2.8rem,7vw,6rem)]" />
            <Reveal gate delay={0.4} className="max-w-md text-lg text-white/75">
              {p.summary}
            </Reveal>
            <Reveal gate delay={0.5}>
              <dl className="grid max-w-md grid-cols-3 gap-4 border-y border-white/20 py-5 text-sm">
                <div>
                  <dt className="text-white/55">Volume</dt>
                  <dd className="display mt-1 text-2xl">
                    {p.amount}
                    <span className="text-base">{p.unit}</span>
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-white/55">Shape</dt>
                  <dd className="mt-1 font-semibold">{p.silhouette}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal gate delay={0.6} className="flex flex-wrap gap-3">
              <PillButton href={waLink(`Hello Puriva, I would like to order the ${p.spoken}. Quantity: [ ]. Delivery address: [ ].`)} variant="whatsapp">
                Order on WhatsApp
              </PillButton>
              <PillButton href="/products" variant="glass" arrow={false}>
                All products
              </PillButton>
            </Reveal>
          </div>
          <div className="flex justify-center lg:col-span-6">
            <Reveal gate delay={0.3} y={60} scale={0.94}>
              <BottleStage size={size} className={heroH[size]} strength={11} />
            </Reveal>
          </div>
        </div>
        <WaveDivider fill="#e8f6ff" back="rgb(255 255 255 / 0.25)" />
      </section>

      {/* anatomy */}
      <section className="bg-icy py-16 lg:py-28">
        <div className="shell">
          <div className="mb-12 flex flex-col gap-4 lg:mb-16">
            <Eyebrow>Up close</Eyebrow>
            <LineReveal lines={["Look at the", "details."]} className="display text-[clamp(2.4rem,5.5vw,5rem)] text-ocean-900" />
          </div>
          <Reveal className="relative mx-auto grid max-w-4xl place-items-center py-6">
            <div className="relative">
              <Bottle size={size} className={`${heroH[size]} w-auto drop-shadow-[0_26px_30px_rgba(10,51,117,0.3)]`} />
              {callouts[size].map((c) => (
                <div
                  key={c.t}
                  className={`absolute hidden w-52 items-center gap-3 sm:flex ${c.side === "r" ? "left-[92%] flex-row" : "right-[92%] flex-row-reverse text-right"}`}
                  style={{ top: `${c.top}%` }}
                >
                  <span className="h-px w-10 shrink-0 bg-royal/50" />
                  <span>
                    <span className="block text-sm font-semibold text-ocean-900">{c.t}</span>
                    <span className="block text-xs text-mist">{c.d}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:hidden">
            {callouts[size].map((c) => (
              <li key={c.t} className="rounded-2xl bg-white p-4">
                <span className="block text-sm font-semibold text-ocean-900">{c.t}</span>
                <span className="text-xs text-mist">{c.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* use cases */}
      <section className="bg-white py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <Eyebrow>Made for</Eyebrow>
            <LineReveal lines={["Where it", "fits in."]} className="display text-[clamp(2.4rem,5vw,4.5rem)] text-ocean-900" />
            <p className="max-w-xs text-mist">Suggested everyday uses for the {p.name} bottle.</p>
          </div>
          <ol className="flex flex-col lg:col-span-8">
            {p.useCases.map((u, n) => (
              <li key={u.title}>
                <Reveal delay={n * 0.05} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-ocean-900/12 py-8 sm:grid-cols-[4rem_1fr_1.2fr]">
                  <span className="text-sm font-semibold tracking-widest text-royal">0{n + 1}</span>
                  <h3 className="display text-3xl text-ocean-900 transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{u.title}</h3>
                  <p className="col-start-2 text-mist sm:col-start-3">{u.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-icy py-16 lg:py-28">
        <div className="shell">
          <div className="mb-10 flex flex-col gap-4">
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)] text-ocean-900">{p.name}, from every angle.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-12">
            {/* close crop on the label */}
            <Reveal className="lg:col-span-5">
              <div className="gloss relative h-[26rem] overflow-hidden rounded-[2rem] lg:h-[34rem]" style={{ background: `linear-gradient(160deg, ${p.tint.from}, ${p.tint.to})` }}>
                <div className="absolute inset-0 grid place-items-center">
                  <Parallax speed={0.05}>
                    <Bottle size={size} className="h-[80rem] w-auto max-w-none" droplets />
                  </Parallax>
                </div>
                <span className="absolute bottom-5 left-5 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur">Label detail</span>
              </div>
            </Reveal>
            {/* in the water */}
            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="relative flex h-[26rem] items-end justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-ocean-900 to-ocean-950 lg:h-[34rem]">
                <div aria-hidden="true" className="absolute top-[-20%] left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-aqua/25 blur-[90px]" style={{ animation: "caustic 8s ease-in-out infinite" }} />
                <Bubbles count={14} />
                <Bottle size={size} className="relative mb-24 h-[70%] w-auto drop-shadow-[0_26px_30px_rgba(2,20,54,0.6)]" />
                <div className="absolute inset-x-0 bottom-0 h-28">
                  <svg className="wave-drift absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2400 130" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d={`M0 60${Array.from({ length: 8 }, (_, k) => ` C${k * 300 + 75} 25 ${k * 300 + 225} 95 ${k * 300 + 300} 60`).join("")} L2400 130 L0 130 Z`}
                      fill="rgb(34 199 230 / 0.35)"
                    />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-royal/60 to-transparent" />
                </div>
                <span className="absolute bottom-5 left-5 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur">In the water</span>
              </div>
            </Reveal>
            {/* real photograph of the packaging */}
            {size !== "19l" && (
              <Reveal delay={0.04} className="lg:col-span-5">
                <div className="relative h-[26rem] overflow-hidden rounded-[2rem] bg-ocean-950 lg:h-[26rem]">
                  <Image
                    src="/media/bottles-pair-close.jpeg"
                    alt="The Puriva 1.5L and 500ml bottles photographed side by side"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[50%_60%]"
                  />
                  <span className="absolute bottom-5 left-5 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">The real bottles</span>
                </div>
              </Reveal>
            )}
            {/* droplets on light */}
            <Reveal delay={0.04} className={size !== "19l" ? "lg:col-span-7" : "lg:col-span-12"}>
              <div className="relative grid h-[26rem] place-items-center overflow-hidden rounded-[2rem] bg-white lg:h-[26rem]">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,#cfe9fb,transparent)]" />
                <div className="relative flex items-end gap-6">
                  {products.map((o) => (
                    <TLink key={o.slug} href={`/products/${o.slug}`} aria-label={o.name} className={`group transition-all duration-500 ${o.slug === p.slug ? "" : "opacity-45 hover:opacity-100"}`}>
                      <Bottle
                        size={o.slug}
                        droplets={false}
                        className={`${o.slug === "1-5l" ? "h-56" : o.slug === "19l" ? "h-72" : "h-36"} w-auto transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-[0_18px_20px_rgba(10,51,117,0.25)]`}
                      />
                    </TLink>
                  ))}
                </div>
                <span className="absolute bottom-5 left-5 rounded-full bg-ocean-900/80 px-3 py-1 text-xs font-medium text-white">The whole range</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* prev / next */}
      <section className="bg-ocean-950 text-white">
        <div className="grid md:grid-cols-2">
          {[
            { to: prev, dir: "Previous", Icon: ArrowLeft, align: "items-start" },
            { to: next, dir: "Next", Icon: ArrowRight, align: "items-end text-right" },
          ].map(({ to, dir, Icon, align }) => (
            <TLink
              key={dir}
              href={`/products/${to.slug}`}
              className={`group relative flex flex-col gap-4 overflow-hidden p-10 transition-colors duration-500 hover:bg-royal lg:p-16 ${align} ${dir === "Next" ? "border-t border-white/10 md:border-t-0 md:border-l" : ""}`}
            >
              <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-aqua uppercase">
                {dir === "Previous" && <Icon className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />}
                {dir}
                {dir === "Next" && <Icon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </span>
              <span className="display text-4xl sm:text-5xl">{to.name}</span>
              <span className="text-white/60">{to.tagline}</span>
            </TLink>
          ))}
        </div>
      </section>
    </>
  );
}
