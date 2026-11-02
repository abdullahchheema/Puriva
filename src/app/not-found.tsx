import { PillButton } from "@/components/ui/PillButton";
import { Bubbles } from "@/components/fx/Water";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-ocean-950 px-6 text-center text-white">
      <Bubbles count={14} />
      <div className="flex flex-col items-center gap-6">
        <span className="display text-[clamp(7rem,24vw,18rem)] text-transparent" style={{ WebkitTextStroke: "2px rgb(34 199 230 / 0.6)" }}>
          404
        </span>
        <h1 className="display text-4xl">This page has run dry.</h1>
        <p className="max-w-sm text-white/65">The page you are looking for does not exist. Let’s get you back to clear water.</p>
        <PillButton href="/" variant="light">
          Back to home
        </PillButton>
      </div>
    </section>
  );
}
