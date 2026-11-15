import { products } from "@/data/products";
import { Bottle } from "@/components/bottle/Bottle";
import { Reveal, LineReveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/PillButton";
import { TLink } from "@/components/ui/TLink";
import { ArrowUpRight } from "lucide-react";

const order = ["500ml", "1-5l", "19l"] as const;
const copy: Record<string, { label: string; line: string; span: string; offset: string }> = {
  "500ml": { label: "On the go", line: "Small enough for a pocket, simple enough to forget you have it.", span: "lg:col-span-3", offset: "lg:mt-24" },
  "1-5l": { label: "At home", line: "On the table, in the fridge door, within reach all day.", span: "lg:col-span-5", offset: "" },
  "19l": { label: "For everyone", line: "The big bottle for households, offices and shared spaces.", span: "lg:col-span-4", offset: "lg:mt-10" },
};

export function Moments() {
  const phrase = "PURIFIED DRINKING WATER  ✦  THREE SIZES  ✦  CUSTOM LABELS  ✦  ORDER ON WHATSAPP  ✦  ";
  return (
    <section className="relative overflow-hidden bg-icy pb-24 lg:pb-36">
      <div aria-hidden="true" className="overflow-hidden border-y border-royal/15 bg-royal py-4 text-white">
        <div className="marquee flex w-max whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="display text-2xl tracking-[0.04em] sm:text-3xl">
              {phrase.repeat(3)}
            </span>
          ))}
        </div>
      </div>

      <div className="shell pt-20 lg:pt-32">
        <div className="mb-14 flex flex-col gap-5 lg:mb-20">
          <Eyebrow>Every moment</Eyebrow>
          <LineReveal
            lines={["Wherever the day goes,", "there is a Puriva for it."]}
            className="display max-w-[16ch] text-[clamp(2.4rem,6vw,5.5rem)] text-ocean-900"
          />
        </div>

        <ul className="grid items-start gap-6 lg:grid-cols-12">
          {order.map((slug, i) => {
            const p = products.find((x) => x.slug === slug)!;
            const c = copy[slug];
            return (
              <li key={slug} className={`${c.span} ${c.offset}`}>
                <Reveal delay={i * 0.1}>
                  <TLink
                    href={`/products/${slug}`}
                    className="gloss group relative block overflow-hidden rounded-[2rem] p-7 pb-0 text-white transition-transform duration-700 ease-out hover:-translate-y-2"
                    style={{ background: `linear-gradient(165deg, ${p.tint.from}, ${p.tint.to})` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">{c.label}</span>
                        <p className="mt-3 max-w-[18rem] text-sm text-white/80">{c.line}</p>
                      </div>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-ocean-900">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="relative mt-6 flex h-[22rem] items-end justify-center sm:h-[26rem]">
                      <span
                        aria-hidden="true"
                        className="display absolute inset-x-0 top-0 text-center leading-none text-transparent select-none"
                        style={{ fontSize: "9rem", WebkitTextStroke: "1.5px rgb(255 255 255 / 0.2)" }}
                      >
                        {p.amount}
                        {p.unit}
                      </span>
                      <Bottle
                        size={slug}
                        className="relative mb-[-1.2rem] h-[88%] w-auto transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-rotate-2 drop-shadow-[0_24px_30px_rgba(2,20,54,0.4)]"
                      />
                    </div>
                  </TLink>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
