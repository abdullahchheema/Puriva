"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { products, waLink } from "@/data/products";

type Errors = Partial<Record<"name" | "message", string>>;

const field =
  "w-full rounded-2xl border border-ocean-900/15 bg-white/80 px-4 py-3.5 text-base text-ocean-900 outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-mist/60 focus:border-royal focus:bg-white focus:shadow-[0_0_0_4px_rgb(19_71_201/0.12)] aria-[invalid=true]:border-red-600";

function Err({ id, text }: { id: string; text?: string }) {
  return text ? (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
      {text}
    </p>
  ) : null;
}

/** Builds the ready-to-send WhatsApp message from the form values. */
function compose(v: { name: string; product: string; quantity: string; address: string; message: string }) {
  const lines: string[] = [`Hello Puriva, my name is ${v.name.trim() || "[your name]"}.`];
  const p = products.find((x) => x.slug === v.product);
  if (p) lines.push(`I would like to order the ${p.spoken}.`);
  else if (v.product === "custom") lines.push("I am interested in custom label bottles.");
  if (v.quantity.trim()) lines.push(`Quantity: ${v.quantity.trim()}`);
  if (v.address.trim()) lines.push(`Delivery address: ${v.address.trim()}`);
  if (v.message.trim()) lines.push(v.message.trim());
  return lines.join("\n");
}

export function ContactForm() {
  const params = useSearchParams();
  const initial = params.get("product");
  const [values, setValues] = useState({
    name: "",
    product: products.some((p) => p.slug === initial) || initial === "custom" ? (initial as string) : "",
    quantity: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const text = compose(values);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!values.product && values.message.trim().length < 5) next.message = "Choose what you are interested in, or write a short message.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const link = waLink(text);
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (sentLink) {
    return (
      <div role="status" className="glass-light flex flex-col items-start gap-4 rounded-[2rem] p-8 sm:p-10">
        <CheckCircle2 className="size-10 text-[#128c4a]" aria-hidden="true" />
        <h2 className="display text-4xl text-ocean-900">Your message is ready in WhatsApp.</h2>
        <p className="max-w-md text-mist">
          WhatsApp should have opened with your message filled in. Press send there to deliver it. Nothing reaches Puriva until you do.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={sentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full bg-[#128c4a] px-6 text-sm font-semibold text-white"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Open WhatsApp again
          </a>
          <button
            type="button"
            onClick={() => setSentLink(null)}
            className="min-h-11 rounded-full border border-ocean-900/25 px-6 text-sm font-semibold text-ocean-900 transition-colors hover:bg-ocean-900 hover:text-white"
          >
            Edit message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass-light flex flex-col gap-5 rounded-[2rem] p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ocean-900">
            Your name
          </label>
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={set("name")} className={field} placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          <Err id="err-name" text={errors.name} />
        </div>
        <div>
          <label htmlFor="product" className="mb-2 block text-sm font-semibold text-ocean-900">
            I am interested in
          </label>
          <select id="product" name="product" value={values.product} onChange={set("product")} className={field}>
            <option value="">General enquiry</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
            <option value="custom">Custom label bottles</option>
          </select>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quantity" className="mb-2 block text-sm font-semibold text-ocean-900">
            Quantity <span className="font-normal text-mist">(optional)</span>
          </label>
          <input id="quantity" name="quantity" value={values.quantity} onChange={set("quantity")} className={field} placeholder="For example, 2 cartons" />
        </div>
        <div>
          <label htmlFor="address" className="mb-2 block text-sm font-semibold text-ocean-900">
            Delivery area <span className="font-normal text-mist">(optional)</span>
          </label>
          <input id="address" name="address" autoComplete="street-address" value={values.address} onChange={set("address")} className={field} placeholder="Area or address" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ocean-900">
          Message
        </label>
        <textarea id="message" name="message" rows={4} value={values.message} onChange={set("message")} className={`${field} resize-none`} placeholder="Tell us what you need." aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
        <Err id="err-message" text={errors.message} />
      </div>

      <div className="rounded-2xl border border-[#128c4a]/25 bg-[#128c4a]/[0.07] p-4">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#0f7a3f] uppercase">Message preview</span>
        <p className="mt-2 text-sm whitespace-pre-line text-ocean-900" aria-live="polite">
          {text}
        </p>
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
        <p className="max-w-xs text-xs text-mist">This opens WhatsApp with your message ready. You press send there.</p>
        <button
          type="submit"
          className="btn-shine group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full bg-[#128c4a] py-1.5 pr-1.5 pl-7 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:bg-[#0f7a3f] active:scale-[0.97]"
        >
          Continue on WhatsApp
          <span className="grid size-9 place-items-center rounded-full bg-white text-[#128c4a]">
            <MessageCircle className="size-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </form>
  );
}
