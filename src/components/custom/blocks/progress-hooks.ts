"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** One easing for the fill and the readout, so they can never drift apart. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener?.("change", onChange);
  return () => mq.removeEventListener?.("change", onChange);
};
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.(REDUCED_MOTION).matches === true;
/** The visitor's reduced-motion setting; false while server-rendering. */
const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);

export interface CountUpOptions {
  /** Length of the first run, from zero, in ms. Default 1200. */
  duration?: number;
  /** `false` returns `target` untouched. */
  enabled?: boolean;
  /**
   * The scale later changes are measured against (the bar's `max`). A change
   * across the whole range takes `duration`; a 1% tick takes a sliver of it.
   */
  range?: number;
}

/**
 * Tweens a number towards `target`. It starts at 0 on mount — so the bar
 * fills and the readout counts up when it first appears — then follows every
 * later change from wherever it currently is, so a stream of small updates
 * never jumps. The mount run always takes the full `duration`; later runs
 * take a slice proportional to how far they travel, floored so a tiny nudge
 * still visibly moves. Under `prefers-reduced-motion` it returns `target`.
 */
export function useCountUp(
  target: number,
  { duration = 1200, enabled = true, range }: CountUpOptions = {},
): number {
  const reduced = usePrefersReducedMotion();
  const snap = !enabled || reduced;
  const [current, setCurrent] = useState(enabled ? 0 : target);
  // While snapping, the value sits on `target`, so a later run starts from it.
  if (snap && current !== target) setCurrent(target);
  const currentRef = useRef(current);
  // Flipped by the first frame that actually moves, not by the effect — a
  // run that is cancelled before it paints (strict mode) is not a mount run.
  const movedRef = useRef(false);

  useEffect(() => {
    if (snap) {
      currentRef.current = target;
      return;
    }
    const from = currentRef.current;
    const delta = target - from;
    if (delta === 0) return;

    const scale = Math.max(Math.abs(range ?? target), Math.abs(from), 1);
    const ms = movedRef.current
      ? Math.max(160, duration * Math.min(1, Math.abs(delta) / scale))
      : duration;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const next = t >= 1 ? target : from + delta * easeOutCubic(t);
      currentRef.current = next;
      movedRef.current = true;
      setCurrent(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, snap, range]);

  return snap ? target : current;
}
