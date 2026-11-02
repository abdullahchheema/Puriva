"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/** Pointer-driven ripple canvas. Cheap: rings only, paused when offscreen or idle. */
export function WaterCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    type Ring = { x: number; y: number; r: number; max: number; a: number };
    const rings: Ring[] = [];
    let raf = 0;
    let visible = true;
    let last = { x: -999, y: -999, t: 0 };
    let ambient = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (x: number, y: number, big = false) => {
      if (rings.length > 28) rings.shift();
      rings.push({ x, y, r: 2, max: big ? 150 : 70 + Math.random() * 50, a: big ? 0.5 : 0.36 });
      start();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      const now = performance.now();
      const d = Math.hypot(x - last.x, y - last.y);
      if (d > 46 && now - last.t > 70) {
        spawn(x, y);
        last = { x, y, t: now };
      }
    };
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top, true);
    };

    const frame = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      for (let i = rings.length - 1; i >= 0; i--) {
        const g = rings[i];
        g.r += (g.max - g.r) * 0.035 + 0.6;
        g.a *= 0.965;
        if (g.a < 0.012) {
          rings.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(120, 222, 255, ${g.a})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r * 0.72, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(190, 240, 255, ${g.a * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (rings.length && visible) raf = requestAnimationFrame(frame);
    };
    function start() {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    // gentle ambient drops so the surface is never completely still
    const timer = window.setInterval(() => {
      if (!visible || document.hidden) return;
      ambient++;
      spawn(w * (0.15 + Math.random() * 0.7), h * (0.2 + Math.random() * 0.6), ambient % 3 === 0);
    }, 2600);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

/** CSS-only rising bubbles. */
export function Bubbles({ count = 14, className = "" }: { count?: number; className?: string }) {
  const items = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    return {
      left: `${(i / count) * 100 + r * 6}%`,
      size: 5 + ((i * 7) % 13),
      dur: 11 + ((i * 5) % 11),
      delay: -((i * 3.1) % 14),
      dx: `${((i % 2 ? 1 : -1) * (10 + ((i * 11) % 40)))}px`,
    };
  });
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((b, i) => (
        <span
          key={i}
          className="bubble absolute -bottom-6 rounded-full border border-white/40"
          style={
            {
              left: b.left,
              width: b.size,
              height: b.size,
              background: "radial-gradient(circle at 30% 30%, rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.08) 60%)",
              animation: `bubble-rise ${b.dur}s linear ${b.delay}s infinite`,
              "--dx": b.dx,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Layered drifting waves used as section dividers. `fill` is the colour of the section BELOW. */
export function WaveDivider({
  fill = "#e8f6ff",
  back = "rgb(34 199 230 / 0.35)",
  flip = false,
  className = "",
}: {
  fill?: string;
  back?: string;
  flip?: boolean;
  className?: string;
}) {
  // 8 full periods of 300 units, so a -50% drift loops seamlessly
  let path = "M0 60";
  for (let x = 0; x < 2400; x += 300) path += ` C${x + 75} 20 ${x + 225} 100 ${x + 300} 60`;
  path += " L2400 130 L0 130 Z";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-16 w-full overflow-hidden sm:h-24 ${flip ? "rotate-180" : ""} ${className}`}
      style={{ marginBottom: -1 }}
    >
      <svg className="wave-drift-slow absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2400 130" preserveAspectRatio="none" style={{ transform: "translateY(-6px)" }}>
        <path d={path} fill={back} />
      </svg>
      <svg className="wave-drift absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2400 130" preserveAspectRatio="none">
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
