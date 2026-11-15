import { nav, products, business, waLink } from "@/data/products";
import { TLink } from "@/components/ui/TLink";
import { PillButton } from "@/components/ui/PillButton";
import { Wordmark } from "@/components/ui/BrandMark";
import { LineReveal } from "@/components/motion/Reveal";
import { Bubbles, WaveDivider } from "@/components/fx/Water";
import { Sparkles } from "@/components/fx/Sparkles";

const link = "w-fit text-sm text-white/75 transition-colors hover:text-aqua";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ocean-950 text-white">
      <div className="bg-icy">
        <WaveDivider fill="#03112b" back="rgb(19 71 201 / 0.35)" />
      </div>
      <Bubbles count={10} className="opacity-60" />
      <Sparkles />
      <div className="shell relative z-10 pt-16 pb-10 lg:pt-24">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            as="h2"
            className="display max-w-[14ch] text-5xl sm:text-6xl lg:text-7xl"
            lines={["Stay fresh.", "Every day."]}
          />
          <div className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-sm text-white/60 lg:text-right">Orders, prices and custom label bottles are all handled on WhatsApp.</p>
            <PillButton href={waLink("Hello Puriva, I would like to place an order.")} variant="whatsapp" arrow="up-right">
              Order on WhatsApp
            </PillButton>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <span className="text-2xl">
              <Wordmark />
            </span>
            <p className="max-w-xs text-sm text-white/55">Purified drinking water from {business.location}, in 500ml, 1.5L and 19L bottles.</p>
          </div>
          <FooterCol title="Explore">
            {nav.map((n) => (
              <TLink key={n.href} href={n.href} className={link}>
                {n.label}
              </TLink>
            ))}
          </FooterCol>
          <FooterCol title="Products">
            {products.map((p) => (
              <TLink key={p.slug} href={`/products/${p.slug}`} className={link}>
                {p.name}
              </TLink>
            ))}
            <TLink href="/custom-labels" className={link}>
              Custom label bottles
            </TLink>
          </FooterCol>
          <FooterCol title="Contact">
            <a href={waLink("Hello Puriva, I would like some information about your water.")} target="_blank" rel="noopener noreferrer" className={link}>
              WhatsApp {business.whatsappDisplay}
            </a>
            <a href={`tel:+${business.whatsapp}`} className={link}>
              Call {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className={`${link} break-all`}>
              {business.email}
            </a>
            <span className="text-sm text-white/55">{business.location}</span>
          </FooterCol>
          <FooterCol title="Follow">
            <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className={link}>
              Instagram
            </a>
            <a href={business.tiktok.url} target="_blank" rel="noopener noreferrer" className={link}>
              TikTok
            </a>
          </FooterCol>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Puriva. All rights reserved.</span>
          <span>Purified drinking water · {business.location}</span>
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
