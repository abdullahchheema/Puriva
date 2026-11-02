import { nav, products, business } from "@/data/products";
import { TLink } from "@/components/ui/TLink";
import { PillButton } from "@/components/ui/PillButton";
import { BrandMark } from "@/components/ui/BrandMark";
import { LineReveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ocean-950 text-white">
      <div className="bg-icy">
        <WaveDivider fill="#03112b" back="rgb(19 71 201 / 0.35)" />
      </div>
      <Bubbles count={10} className="opacity-60" />
      <div className="shell relative z-10 pt-16 pb-10 lg:pt-24">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            as="h2"
            className="display max-w-[14ch] text-5xl sm:text-6xl lg:text-7xl"
            lines={["Stay fresh.", "Every day."]}
          />
          <div className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-sm text-white/60">Questions about sizes, availability or working with Puriva? Get in touch.</p>
            <PillButton href="/contact" variant="light" arrow="up-right">
              Enquire now
            </PillButton>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2.5">
              <BrandMark className="size-7 text-aqua" />
              <span className="display text-xl">PURIVA</span>
            </span>
            <p className="max-w-xs text-sm text-white/55">Purified drinking water for everyday hydration, in four sizes.</p>
          </div>
          <FooterCol title="Explore">
            {nav.map((n) => (
              <TLink key={n.href} href={n.href} className="w-fit text-sm text-white/75 transition-colors hover:text-aqua">
                {n.label}
              </TLink>
            ))}
          </FooterCol>
          <FooterCol title="Products">
            {products.map((p) => (
              <TLink key={p.slug} href={`/products/${p.slug}`} className="w-fit text-sm text-white/75 transition-colors hover:text-aqua">
                {p.name}
              </TLink>
            ))}
          </FooterCol>
          <FooterCol title="Contact">
            <span className="text-sm text-white/75">{business.email}</span>
            <span className="text-sm text-white/75">{business.phone}</span>
            <span className="text-sm text-white/45">{business.address.join(", ")}</span>
          </FooterCol>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Puriva. All rights reserved.</span>
          <span>Frontend demo — contact details are placeholders.</span>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="display pointer-events-none -mb-[0.12em] text-center leading-none text-white/[0.04] select-none"
        style={{ fontSize: "clamp(6rem, 27vw, 30rem)" }}
      >
        PURIVA
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-1 text-xs font-semibold tracking-[0.2em] text-aqua uppercase">{title}</h3>
      {children}
    </div>
  );
}
