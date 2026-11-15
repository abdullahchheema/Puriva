"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { products, waLink } from "@/data/products";

/** Floating WhatsApp shortcut. The message adapts to the page the visitor is on. */
export function WhatsAppFab() {
  const pathname = usePathname();
  const product = products.find((p) => pathname === `/products/${p.slug}`);
  const text = product
    ? `Hello Puriva, I would like to order the ${product.spoken}. Quantity: [ ]. Delivery address: [ ].`
    : pathname.startsWith("/custom-labels")
      ? "Hello Puriva, I am interested in custom label bottles. Bottle size: [ ]. Quantity: [ ]."
      : "Hello Puriva, I would like some information about your water.";
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Puriva on WhatsApp"
      className="btn-shine fixed right-4 bottom-4 z-[90] inline-flex min-h-14 items-center gap-2.5 overflow-hidden rounded-full bg-[#128c4a] pr-5 pl-4 text-sm font-semibold text-white shadow-[0_18px_40px_-10px_rgba(18,140,74,0.7)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
