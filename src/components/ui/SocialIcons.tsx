import type { ReactNode } from "react";
import { business, waLink } from "@/data/products";

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export function TikTokIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 12.5a4 4 0 1 0 4 4V3.5a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

const items: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Puriva on WhatsApp", href: waLink("Hello Puriva, I would like some information about your water."), icon: <WhatsAppIcon /> },
  { label: "Puriva on Instagram", href: business.instagram.url, icon: <InstagramIcon /> },
  { label: "Puriva on TikTok", href: business.tiktok.url, icon: <TikTokIcon /> },
];

/** Round glass buttons linking to Puriva's WhatsApp, Instagram and TikTok. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={i.label}
            className="glass gloss grid size-11 place-items-center rounded-full text-white transition-[transform,background-color,color] duration-300 hover:-translate-y-1 hover:bg-white hover:text-ocean-900"
          >
            {i.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
