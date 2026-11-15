import { Quote } from "lucide-react";
import { customerTypes, reviews, supplied } from "@/data/reviews";
import { waLink } from "@/data/products";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Eyebrow, PillButton } from "@/components/ui/PillButton";
import { Sparkles } from "@/components/fx/Sparkles";

const reviewMessage = "Hello Puriva, I would like to share my review.\nName: [ ]\nBusiness (optional): [ ]\nMy review: [ ]";

/** Who Puriva supplies, plus customer reviews once real ones are added to src/data/reviews.ts. */
export function Customers({ heading = true }: { heading?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-ocean-950 py-20 text-white lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_20%_40%,#14509f_0%,transparent_70%)]" />
      <Sparkles className="-z-10" />
      <div className="shell flex flex-col gap-14">
        {heading && (
          <div className="flex flex-col gap-5">
            <Eyebrow tone="light">Trusted across Pakistan</Eyebrow>
            <LineReveal lines={["Supplied to universities,", "shops and restaurants."]} className="display max-w-[18ch] text-[clamp(2.4rem,5.6vw,5rem)]" />
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="glass gloss rounded-[2rem] p-8 lg:col-span-7">
            <span className="text-xs font-semibold tracking-[0.22em] text-aqua uppercase">Currently supplying</span>
            <ul className="mt-5 flex flex-wrap gap-3">
              {supplied.map((s) => (
                <li key={s} className="display rounded-full bg-white px-6 py-3 text-2xl text-ocean-900 sm:text-3xl">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-lg text-white/70">And many shops, restaurants and cash &amp; carries across Pakistan.</p>
          </Reveal>
          <Reveal delay={0.08} className="glass gloss rounded-[2rem] p-8 lg:col-span-5">
            <span className="text-xs font-semibold tracking-[0.22em] text-aqua uppercase">Who we serve</span>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {customerTypes.map((t) => (
                <li key={t} className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-medium text-white/90">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {reviews.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <li key={`${r.name}-${i}`}>
                <Reveal delay={i * 0.06} className="glass-light gloss h-full rounded-[2rem] p-8 text-ocean-900">
                  <Quote className="size-8 text-royal" aria-hidden="true" />
                  <blockquote className="mt-4 text-lg">{r.quote}</blockquote>
                  <p className="mt-6 font-semibold">{r.name}</p>
                  {(r.role || r.business) && <p className="text-sm text-mist">{[r.role, r.business].filter(Boolean).join(", ")}</p>}
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="flex flex-col items-start gap-5 rounded-[2rem] border border-dashed border-white/25 bg-white/[0.04] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="display text-3xl">Drink Puriva? Tell us about it.</h3>
              <p className="mt-2 max-w-lg text-white/65">Send your review on WhatsApp. With your permission, it will be shown here.</p>
            </div>
            <PillButton href={waLink(reviewMessage)} variant="whatsapp">
              Share your review
            </PillButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}
