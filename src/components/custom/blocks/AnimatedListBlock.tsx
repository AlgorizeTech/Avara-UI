"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useRef } from "react";

export type AnimationVariant =
  | "flip"
  | "slide-right"
  | "slide-left"
  | "slide-up"
  | "pop";

export interface AnimatedListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  animationDelay?: number;
  ease?: string;
  duration?: number;
  variant?: AnimationVariant;
}

// ==========================================
// EASING (GSAP ease names, built from GSAP's own formulas)
// ==========================================
type EaseFn = (progress: number) => number;

const invert =
  (ease: EaseFn): EaseFn =>
  (p) =>
    1 - ease(1 - p);
const inOutFromIn =
  (easeIn: EaseFn): EaseFn =>
  (p) =>
    p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
const inOutFromOut =
  (easeOut: EaseFn): EaseFn =>
  (p) =>
    p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;

/** A CSS cubic-bezier as a function of progress (Newton, then bisection). */
const cubicBezier = (x1: number, y1: number, x2: number, y2: number): EaseFn => {
  const at = (t: number, a: number, b: number) =>
    3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  const slope = (t: number, a: number, b: number) =>
    3 * (1 - t) * (1 - t) * a + 6 * (1 - t) * t * (b - a) + 3 * t * t * (1 - b);
  return (x) => {
    if (x <= 0 || x >= 1) return x <= 0 ? 0 : 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const s = slope(t, x1, x2);
      if (Math.abs(s) < 1e-6) break;
      const err = at(t, x1, x2) - x;
      if (Math.abs(err) < 1e-7) return at(t, y1, y2);
      t -= err / s;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 30 && hi - lo > 1e-7; i++) {
      if (at(t, x1, x2) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return at(t, y1, y2);
  };
};

const CSS_EASES: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};

const POWER_EXPONENTS: Record<string, number> = {
  power1: 2,
  quad: 2,
  power2: 3,
  cubic: 3,
  power3: 4,
  quart: 4,
  power4: 5,
  quint: 5,
  strong: 5,
};

const bounceOut: EaseFn = (p) => {
  const n = 7.5625;
  const c = 2.75;
  if (p < 1 / c) return n * p * p;
  if (p < 2 / c) return n * (p - 1.5 / c) ** 2 + 0.75;
  if (p < 2.5 / c) return n * (p - 2.25 / c) ** 2 + 0.9375;
  return n * (p - 2.625 / c) ** 2 + 0.984375;
};

/**
 * The ease a GSAP ease string names — "power2.out", "back.out(1.7)",
 * "elastic.out(1, 0.3)", "Power3.easeInOut", "steps(5)", "none" — from the
 * same formulas GSAP uses. CSS keywords and `cubic-bezier(…)` work too;
 * anything else falls back to power1.out, as it does in GSAP.
 */
function parseEase(name: string): EaseFn {
  const trimmed = name.trim();
  const open = trimmed.indexOf("(");
  const head = (open < 0 ? trimmed : trimmed.slice(0, open)).toLowerCase();
  const args =
    open < 0
      ? []
      : trimmed
          .slice(open + 1, trimmed.lastIndexOf(")"))
          .split(",")
          .map((value) => (value.trim() === "" ? undefined : Number(value)));

  if (
    head === "cubic-bezier" &&
    args.length === 4 &&
    args.every((value) => value !== undefined && !isNaN(value))
  ) {
    const [x1, y1, x2, y2] = args as number[];
    return cubicBezier(x1, y1, x2, y2);
  }
  if (CSS_EASES[head]) return cubicBezier(...CSS_EASES[head]);

  const [family, rawType = "out"] = head.split(".");
  const type = rawType.replace(/^ease/, "");
  const pick = (easeIn: EaseFn, easeOut: EaseFn, easeInOut: EaseFn) =>
    type === "in" ? easeIn : type === "inout" ? easeInOut : easeOut;

  if (family === "none" || family === "linear" || family === "power0") {
    return (p) => p;
  }
  if (POWER_EXPONENTS[family]) {
    const power = POWER_EXPONENTS[family];
    const easeIn: EaseFn = (p) => p ** power;
    return pick(easeIn, (p) => 1 - (1 - p) ** power, inOutFromIn(easeIn));
  }
  if (family === "sine") {
    const easeIn: EaseFn = (p) => (p === 1 ? 1 : 1 - Math.cos((p * Math.PI) / 2));
    return pick(easeIn, invert(easeIn), inOutFromIn(easeIn));
  }
  if (family === "expo") {
    const easeIn: EaseFn = (p) => 2 ** (10 * (p - 1)) * p + p ** 6 * (1 - p);
    return pick(easeIn, invert(easeIn), inOutFromIn(easeIn));
  }
  if (family === "circ") {
    const easeIn: EaseFn = (p) => -(Math.sqrt(1 - p * p) - 1);
    return pick(easeIn, invert(easeIn), inOutFromIn(easeIn));
  }
  if (family === "bounce") {
    const easeIn = invert(bounceOut);
    return pick(easeIn, bounceOut, inOutFromIn(easeIn));
  }
  if (family === "back") {
    const overshoot = args[0] ?? 1.70158;
    const easeOut: EaseFn = (p) =>
      p ? (p - 1) * (p - 1) * ((overshoot + 1) * (p - 1) + overshoot) + 1 : 0;
    return pick(invert(easeOut), easeOut, inOutFromOut(easeOut));
  }
  if (family === "elastic") {
    const amplitude = args[0] ?? 1;
    const p1 = amplitude >= 1 ? amplitude : 1;
    const period =
      (args[1] || (type === "inout" ? 0.45 : 0.3)) / (amplitude < 1 ? amplitude : 1);
    const p3 = (period / (2 * Math.PI)) * (Math.asin(1 / p1) || 0);
    const easeOut: EaseFn = (p) =>
      p === 1
        ? 1
        : p1 * 2 ** (-10 * p) * Math.sin(((p - p3) * 2 * Math.PI) / period) + 1;
    return pick(invert(easeOut), easeOut, inOutFromOut(easeOut));
  }
  if (family === "steps") {
    const steps = args[0] ?? 1;
    const immediateStart = Boolean(args[1]);
    const count = steps + (immediateStart ? 0 : 1);
    const offset = immediateStart ? 1 : 0;
    return (p) =>
      (Math.trunc(count * Math.min(Math.max(p, 0), 1 - 1e-8)) + offset) / steps;
  }

  // power1.out — GSAP's default ease
  return (p) => 1 - (1 - p) * (1 - p);
}

// ==========================================
// ENTRANCE
// ==========================================
/** Where each variant starts; every item tweens from here to rest. */
type StartState = {
  x: number;
  y: number;
  scale: number;
  rotationX: number;
  transformOrigin?: string;
};

const START_STATES: Record<AnimationVariant, StartState> = {
  "slide-right": { x: 60, y: 0, scale: 1, rotationX: 0 },
  "slide-left": { x: -60, y: 0, scale: 1, rotationX: 0 },
  "slide-up": { x: 0, y: 40, scale: 1, rotationX: 0 },
  pop: { x: 0, y: 0, scale: 0.6, rotationX: 0 },
  flip: {
    x: 0,
    y: 40,
    scale: 0.9,
    rotationX: -45,
    transformOrigin: "top center",
  },
};

/**
 * Write one frame of an item's entrance: `progress` is the eased position
 * between the start state (0) and rest (1). Written to the inline style every
 * frame, the way GSAP renders (a GPU-forced translate3d first), so a CSS
 * transition on the item reacts to the motion exactly as it did with GSAP.
 */
const renderEntrance = (el: HTMLElement, from: StartState, progress: number) => {
  const rest = 1 - progress;
  const rotationX = from.rotationX * rest;
  const scale = from.scale + (1 - from.scale) * progress;
  el.style.opacity = String(progress);
  el.style.filter = `blur(${8 * rest}px)`;
  el.style.transform =
    `translate3d(${from.x * rest}px, ${from.y * rest}px, 0px)` +
    (rotationX ? ` rotateX(${rotationX}deg)` : "") +
    (scale !== 1 ? ` scale(${scale}, ${scale})` : "");
};

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  (
    {
      children,
      staggerDelay = 0.12,
      animationDelay = 0,
      ease = "back.out(1.5)",
      duration = 0.6,
      variant = "slide-right",
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    useEffect(() => {
      if (!containerRef.current) return;

      const items = Array.from(containerRef.current.children) as HTMLElement[];

      // Define dynamic starting states based on the selected variant
      const from = START_STATES[variant] ?? START_STATES.flip;
      const easing = parseEase(ease);

      // Reset items to start state. The item's own translate/scale/rotate
      // are folded out, so only this entrance moves it.
      items.forEach((item) => {
        item.style.translate = item.style.scale = item.style.rotate = "none";
        if (from.transformOrigin) item.style.transformOrigin = from.transformOrigin;
        renderEntrance(item, from, 0);
      });

      // Orchestrate the animated entrance, one frame at a time
      const start = performance.now();
      const done = new Set<HTMLElement>();
      let frame = requestAnimationFrame(function tick(now) {
        const elapsed = (now - start) / 1000;
        items.forEach((item, index) => {
          if (done.has(item)) return;
          const local = elapsed - animationDelay - index * staggerDelay;
          if (local <= 0) return;
          const progress = duration > 0 ? Math.min(local / duration, 1) : 1;
          renderEntrance(item, from, progress < 1 ? easing(progress) : 1);
          if (progress >= 1) done.add(item);
        });
        if (done.size < items.length) frame = requestAnimationFrame(tick);
      });

      return () => {
        cancelAnimationFrame(frame);
      };
    }, [staggerDelay, animationDelay, ease, duration, variant]);

    return (
      <div
        ref={containerRef}
        // perspective enables the 3D rotationX effect on children if 'flip' is chosen
        className={cn(
          "flex flex-col gap-3 lg:gap-4 perspective-[1000px]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AnimatedList.displayName = "AnimatedList";

export type AnimatedListItemProps = React.HTMLAttributes<HTMLDivElement>;

/** GSAP's default ease, power1.out — exact. */
const EASE_POWER1_OUT = "cubic-bezier(0.3333, 0.6667, 0.6667, 1)";

export const AnimatedListItem = forwardRef<
  HTMLDivElement,
  AnimatedListItemProps
>(({ children, className, ...props }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

  // Mouse-tracking Spotlight Effect — the gradient's centre and alpha are
  // registered custom properties, so they transition like any other value.
  const moveSpotlight = (
    x: string,
    y: string,
    alpha: number,
    seconds: number,
  ) => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.transitionDuration = [
      // the glow's own `transition-opacity duration-300`
      "var(--tw-duration, var(--default-transition-duration))",
      `${seconds}s`,
      `${seconds}s`,
      `${seconds}s`,
    ].join(", ");
    glow.style.setProperty("--animated-list-spot-x", x);
    glow.style.setProperty("--animated-list-spot-y", y);
    glow.style.setProperty("--animated-list-spot-alpha", String(alpha));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    moveSpotlight(`${x}px`, `${y}px`, 0.06, 0.1);
  };

  const handleMouseLeave = () => {
    moveSpotlight("50%", "50%", 0, 0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full rounded-2xl bg-card border border-border/80 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] opacity-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden",
        className,
      )}
      {...props}
    >
      <style>{`
        @property --animated-list-spot-x {
          syntax: "<length-percentage>";
          inherits: false;
          initial-value: 50%;
        }
        @property --animated-list-spot-y {
          syntax: "<length-percentage>";
          inherits: false;
          initial-value: 50%;
        }
        @property --animated-list-spot-alpha {
          syntax: "<number>";
          inherits: false;
          initial-value: 0;
        }
      `}</style>

      {/* Spotlight Overlay Layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--animated-list-spot-x) var(--animated-list-spot-y), rgba(255,255,255,var(--animated-list-spot-alpha)), transparent 40%)",
          transitionProperty:
            "opacity, --animated-list-spot-x, --animated-list-spot-y, --animated-list-spot-alpha",
          transitionTimingFunction: `var(--tw-ease, var(--default-transition-timing-function)), ${EASE_POWER1_OUT}, ${EASE_POWER1_OUT}, ${EASE_POWER1_OUT}`,
        }}
      />

      {/* Inner Border Shine */}
      <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none z-10" />

      {/* Content Layer */}
      <div className="relative z-20">{children}</div>
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";
