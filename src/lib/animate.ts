import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/**
 * Animation helpers for components that need no animation library: spring
 * easings for CSS transitions and the Web Animations API, plus the two browser
 * checks those components share. Installed alongside any component that uses it.
 */

export type SpringOptions = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

/** A spring as a CSS timing: `duration` in milliseconds, `easing` as `linear(…)`. */
export type Timing = { duration: number; easing: string };

/** How many points of the spring's curve the easing samples. */
const SAMPLES = 48;

/** The time constant multiple at which a spring is within 0.1% of its target. */
const SETTLED = Math.log(1000);

/**
 * Browsers without `linear()` get a plain ease instead: the Web Animations API
 * throws on an easing it can't parse, rather than ignoring it as CSS would.
 */
const supportsLinearEasing = () =>
  typeof CSS === "undefined" || CSS.supports("transition-timing-function", "linear(0, 1)");

/** The response of a spring released from rest, as a CSS easing. */
export function springTiming({ stiffness = 100, damping = 10, mass = 1 }: SpringOptions = {}): Timing {
  const natural = Math.sqrt(stiffness / mass);
  const ratio = Math.min(damping / (2 * Math.sqrt(stiffness * mass)), 1);
  const decay = ratio * natural;
  const seconds = SETTLED / decay;
  if (!supportsLinearEasing()) return { duration: Math.round(seconds * 1000), easing: "ease-out" };

  const damped = natural * Math.sqrt(1 - ratio * ratio);
  const position = (t: number) =>
    ratio < 1
      ? 1 - Math.exp(-decay * t) * (Math.cos(damped * t) + (decay / damped) * Math.sin(damped * t))
      : 1 - Math.exp(-natural * t) * (1 + natural * t);

  const points = Array.from({ length: SAMPLES + 1 }, (_, i) =>
    i === SAMPLES ? "1" : position((i / SAMPLES) * seconds).toFixed(4),
  );
  return { duration: Math.round(seconds * 1000), easing: `linear(${points.join(",")})` };
}

/** A spring described by how long it takes and how much it bounces (0 to 1). */
export function bounceTiming(seconds: number, bounce: number): Timing {
  const ratio = 1 - bounce;
  const natural = SETTLED / (ratio * seconds);
  return springTiming({ stiffness: natural * natural, damping: 2 * ratio * natural });
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Whether the visitor asked for less motion. False during server rendering. */
export const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

/** The same check, for code running outside render. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;

/**
 * Whether an element is on screen. `amount` is the share of it that must show.
 * With `once` it stays true after the first time.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { amount = 0, once = false }: { amount?: number; once?: boolean } = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold: amount },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, amount, once]);

  return inView;
}
