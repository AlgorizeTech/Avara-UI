import gsap from "gsap";
import { cubicBezier, type FrameTicker } from "./motion-curves";

/**
 * GSAP-side glue for the GSAP builds of components that also ship a Motion
 * Motion twin. Kept apart from motion-curves.ts so the library-free curves
 * never pull GSAP into a CSS or Motion build.
 */

/** `gsap.ticker` as a FrameTicker, so spring followers run on GSAP's loop. */
export const gsapTicker: FrameTicker = {
  add(callback) {
    const tick = (_time: number, deltaTime: number) => callback(deltaTime);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  },
};

/** A Motion / CSS cubic-bezier array as a GSAP ease. */
export const bezierEase = (curve: readonly [number, number, number, number] | readonly number[]) =>
  cubicBezier(curve[0], curve[1], curve[2], curve[3]);

/** `(prefers-reduced-motion: reduce)` right now. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
