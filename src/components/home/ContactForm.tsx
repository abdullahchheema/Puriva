"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { products } from "@/data/products";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-2xl border border-ocean-900/15 bg-white/80 px-4 py-3.5 text-base text-ocean-900 outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-mist/60 focus:border-royal focus:bg-white focus:shadow-[0_0_0_4px_rgb(19_71_201/0.12)] aria-[invalid=true]:border-red-600";

function Err({ id, text }: { id: string; text?: string }) {
  return text ? (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
      {text}
    </p>
  ) : null;
}

export function ContactForm() {
  const params = useSearchParams();
  const initial = params.get("product");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [summary, setSummary] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid email address, like name@example.com.";
    if (message.length < 10) next.message = "A few more words, please (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setSummary(name.split(" ")[0]);
    setState("sending");
    // Frontend only: nothing is sent anywhere.
    window.setTimeout(() => setState("done"), 900);
  };

  if (state === "done") {
    return (
      <div role="status" className="glass-light flex flex-col items-start gap-4 rounded-[2rem] p-8 sm:p-10">
        <CheckCircle2 className="size-10 text-royal" aria-hidden="true" />
        <h2 className="display text-4xl text-ocean-900">Thanks, {summary}.</h2>
        <p className="max-w-md text-mist">
          This is a frontend demo, so your message was not sent anywhere. Once Puriva connects a real inbox, enquiries will arrive here.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setErrors({});
          }}
          className="mt-2 min-h-11 rounded-full border border-ocean-900/25 px-6 text-sm font-semibold text-ocean-900 transition-colors hover:bg-ocean-900 hover:text-white"
        >
          Send another message
        </button>
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
          <input id="name" name="name" autoComplete="name" className={field} placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          <Err id="err-name" text={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ocean-900">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="name@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
          <Err id="err-email" text={errors.email} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ocean-900">
            Phone <span className="font-normal text-mist">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="+00 000 000 0000" />
        </div>
        <div>
          <label htmlFor="product" className="mb-2 block text-sm font-semibold text-ocean-900">
            I am interested in
          </label>
          <select id="product" name="product" defaultValue={products.some((p) => p.slug === initial) ? initial! : ""} className={field}>
            <option value="">General enquiry</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ocean-900">
          Message
        </label>
        <textarea id="message" name="message" rows={5} className={`${field} resize-none`} placeholder="Tell us what you need." aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
        <Err id="err-message" text={errors.message} />
      </div>
      <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
        <p className="max-w-xs text-xs text-mist">Frontend demo: messages are not delivered anywhere yet.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-royal py-1.5 pr-1.5 pl-7 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:bg-cap active:scale-[0.97] disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <span className="grid size-9 place-items-center rounded-full bg-white text-royal">
            <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
