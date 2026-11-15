"use client";

import { useState } from "react";
import { Bottle } from "@/components/bottle/Bottle";
import { PillButton } from "@/components/ui/PillButton";
import { waLink } from "@/data/products";

const swatches = [
  { name: "Royal blue", color: "#1347c9", ink: "#ffffff" },
  { name: "White", color: "#ffffff", ink: "#0a2a7a" },
  { name: "Black", color: "#0b0f1a", ink: "#ffffff" },
  { name: "Green", color: "#0f7a4f", ink: "#ffffff" },
  { name: "Red", color: "#c0243a", ink: "#ffffff" },
  { name: "Gold", color: "#f2b705", ink: "#1a1a1a" },
  { name: "Aqua", color: "#22c7e6", ink: "#03112b" },
];

const sizes = ["300ml", "500ml", "1.5L"];

const field =
  "w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-white/40 focus:border-aqua focus:shadow-[0_0_0_4px_rgb(34_199_230/0.2)]";

/** Live preview of a custom label bottle, with a ready-written WhatsApp message. */
export function CustomLabelStudio() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("500ml");
  const [qty, setQty] = useState("");
  const [swatch, setSwatch] = useState(0);
  const sw = swatches[swatch];

  const message = [
    "Hello Puriva, I am interested in custom label bottles.",
    `Name on the label: ${name.trim() || "[your name or brand]"}`,
    `Bottle size: ${size.trim() || "[size]"}`,
    `Quantity: ${qty.trim() || "[quantity]"}`,
    `Label colour: ${sw.name}`,
    "I will send my logo and design details here.",
  ].join("\n");

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="flex flex-col gap-6 lg:col-span-6">
        <div>
          <label htmlFor="cl-name" className="mb-2 block text-sm font-semibold text-white">
            Name or brand on the label
          </label>
          <input id="cl-name" value={name} maxLength={18} onChange={(e) => setName(e.target.value)} className={field} placeholder="Your restaurant or brand" />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-white">Label colour</legend>
          <div className="flex flex-wrap gap-3">
            {swatches.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setSwatch(i)}
                aria-label={s.name}
                aria-pressed={i === swatch}
                className={`size-11 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${i === swatch ? "scale-110 border-aqua shadow-[0_0_0_3px_rgb(34_199_230/0.35)]" : "border-white/30"}`}
                style={{ background: s.color }}
              />
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cl-size" className="mb-2 block text-sm font-semibold text-white">
              Bottle size you need
            </label>
            <input id="cl-size" value={size} onChange={(e) => setSize(e.target.value)} className={field} placeholder="For example, 300ml" />
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-h-9 rounded-full border px-3.5 text-xs font-semibold transition-colors ${size === s ? "border-aqua bg-aqua text-ocean-950" : "border-white/25 text-white/80 hover:border-aqua"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="cl-qty" className="mb-2 block text-sm font-semibold text-white">
              Quantity
            </label>
            <input id="cl-qty" value={qty} onChange={(e) => setQty(e.target.value)} className={field} placeholder="How many bottles" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-aqua uppercase">Message preview</span>
          <p className="mt-2 text-sm whitespace-pre-line text-white/85" aria-live="polite">
            {message}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <PillButton href={waLink(message)} variant="whatsapp">
            Send on WhatsApp
          </PillButton>
          <span className="max-w-[16rem] text-xs text-white/55">WhatsApp opens with this message ready. You press send there.</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-4 lg:col-span-6">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/20 blur-[90px]" />
        <Bottle
          size="500ml"
          custom={{ name, color: sw.color, ink: sw.ink, chip: size.trim().slice(0, 8) || "500ml" }}
          className="relative h-[min(52svh,30rem)] w-auto drop-shadow-[0_30px_40px_rgba(2,20,54,0.5)]"
        />
        <p className="relative max-w-xs text-center text-xs text-white/55">Illustrative preview. Your real bottle and label are confirmed with Puriva on WhatsApp.</p>
      </div>
    </div>
  );
}
