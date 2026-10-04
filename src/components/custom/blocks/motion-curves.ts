/**
 * Motion curves with no animation library behind them.
 *
 * The components here ship as CSS, GSAP or Motion builds that must move
 * identically, so the curves are computed once, from the same numbers, and
 * handed to whichever engine runs them:
 *
 *   - `cubicBezier(x1, y1, x2, y2)` → an easing function (GSAP accepts any
 *     `(progress) => value` as `ease`), exact for Motion's `ease: [..]` arrays
 *     and for CSS `cubic-bezier()`.
 *   - `spring({ stiffness, damping, mass })` → the analytic solution Motion
 *     Motion uses, as an easing function plus the time it takes to settle, or
 *     as a CSS `linear()` string for a fixed start and end.
 *   - `createSpringFollower` → a value that chases a moving target through the
 *     same spring every frame, like Motion's `useSpring`, for pointer-driven
 *     motion that no fixed curve can describe.
 */

// ---------------------------------------------------------------------------
// Cubic bezier
// ---------------------------------------------------------------------------

/**
 * The CSS / Motion cubic-bezier as a function of progress. Newton-Raphson
 * with a bisection fallback, the same solver browsers use.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  if (x1 === y1 && x2 === y2) return (t: number) => t;

  const a = (p1: number, p2: number) => 1 - 3 * p2 + 3 * p1;
  const b = (p1: number, p2: number) => 3 * p2 - 6 * p1;
  const c = (p1: number) => 3 * p1;
  const at = (t: number, p1: number, p2: number) =>
    ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t;
  const slope = (t: number, p1: number, p2: number) =>
    3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1);

  const solveX = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const s = slope(t, x1, x2);
      if (Math.abs(s) < 1e-6) break;
      const err = at(t, x1, x2) - x;
      if (Math.abs(err) < 1e-7) return t;
      t -= err / s;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 30 && hi - lo > 1e-7; i++) {
      const value = at(t, x1, x2);
      if (value < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return t;
  };

  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : at(solveX(x), y1, y2));
}

/** Motion's named eases, as the cubic-beziers they are. */
export const MOTION_EASE = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  circIn: [0.55, 0, 1, 0.45],
  circOut: [0.55, 0, 0.45, 1],
  circInOut: [0.85, 0, 0.15, 1],
  backIn: [0.31, 0.01, 0.66, -0.59],
  backOut: [0.33, 1.53, 0.69, 0.99],
  anticipate: [0.66, -0.56, 0.34, 1.35],
} as const;

/**
 * Motion's default layout transition (`layout` / `layoutId`):
 * `{ duration: 0.45, ease: [0.4, 0, 0.1, 1] }`.
 */
export const LAYOUT_TRANSITION = { duration: 0.45, ease: [0.4, 0, 0.1, 1] as const };

// ---------------------------------------------------------------------------
// Spring
// ---------------------------------------------------------------------------

export interface SpringOptions {
  /** Motion default 100. */
  stiffness?: number;
  /** Motion default 10. */
  damping?: number;
  /** Motion default 1. */
  mass?: number;
  /** Starting velocity, in units of the whole distance per second. */
  velocity?: number;
  /** How close to the end counts as settled, as a fraction of the distance. */
  restDelta?: number;
}

/**
 * Normalised position (0 → 1) of a spring released from 0 towards 1, at time
 * `t` seconds. The closed-form solution Motion's `spring()` generator
 * uses for the under-, critically and over-damped cases.
 */
export function springAt(options: SpringOptions = {}) {
  const { stiffness = 100, damping = 10, mass = 1, velocity = 0 } = options;
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const omega0 = Math.sqrt(stiffness / mass);
  // Motion's convention: distance still to cover, velocity toward it negated.
  const delta = 1;
  const v0 = -velocity;

  if (zeta < 1) {
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    return (t: number) => {
      const envelope = Math.exp(-zeta * omega0 * t);
      return (
        1 -
        envelope *
          (((v0 + zeta * omega0 * delta) / omegaD) * Math.sin(omegaD * t) +
            delta * Math.cos(omegaD * t))
      );
    };
  }
  if (zeta === 1) {
    return (t: number) => 1 - Math.exp(-omega0 * t) * (delta + (v0 + omega0 * delta) * t);
  }
  const omegaD = omega0 * Math.sqrt(zeta * zeta - 1);
  return (t: number) => {
    const envelope = Math.exp(-zeta * omega0 * t);
    const freq = Math.min(omegaD * t, 300);
    return (
      1 -
      (envelope *
        ((v0 + zeta * omega0 * delta) * Math.sinh(freq) + omegaD * delta * Math.cosh(freq))) /
        omegaD
    );
  };
}

/** Seconds until the spring stays within `restDelta` of its end. */
export function springDuration(options: SpringOptions = {}) {
  const at = springAt(options);
  const restDelta = options.restDelta ?? 0.001;
  const step = 1 / 240;
  let lastOutside = 0;
  for (let t = 0; t <= 10; t += step) {
    if (Math.abs(1 - at(t)) > restDelta) lastOutside = t;
    else if (t - lastOutside > 0.1) break;
  }
  return Math.max(lastOutside + step, step);
}

/**
 * A spring as a duration and an easing function over it — what GSAP takes:
 *
 *   const { duration, ease } = springEase({ stiffness: 300, damping: 20 });
 *   gsap.to(el, { y: 0, duration, ease });
 *
 * Exact for a fixed start and end; a spring that has to react mid-flight to a
 * new target needs `createSpringFollower` instead.
 */
export function springEase(options: SpringOptions = {}) {
  const duration = springDuration(options);
  const at = springAt(options);
  return {
    duration,
    ease: (progress: number) => (progress >= 1 ? 1 : at(progress * duration)),
  };
}

/**
 * A spring as a CSS `linear()` easing and its duration in ms, for
 * `transition` / `animation` with a fixed start and end.
 *
 *   const { easing, duration } = springLinear({ stiffness: 400, damping: 30 });
 *   el.style.transition = `transform ${duration}ms ${easing}`;
 */
export function springLinear(options: SpringOptions = {}, pointsPerSecond = 60) {
  const duration = springDuration(options);
  const at = springAt(options);
  const count = Math.max(Math.ceil(duration * pointsPerSecond), 8);
  const points: string[] = [];
  for (let i = 0; i <= count; i++) {
    const t = (i / count) * duration;
    points.push(String(Math.round((i === count ? 1 : at(t)) * 10000) / 10000));
  }
  return { easing: `linear(${points.join(", ")})`, duration: Math.round(duration * 1000) };
}

// ---------------------------------------------------------------------------
// Spring follower (useSpring equivalent)
// ---------------------------------------------------------------------------

/** Something that calls back once per frame with the time since the last, in ms. */
export interface FrameTicker {
  add: (callback: (deltaMs: number) => void) => () => void;
}

/** requestAnimationFrame as a ticker — the library-free default. */
export const rafTicker: FrameTicker = {
  add(callback) {
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      callback(now - last);
      last = now;
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  },
};

export interface SpringFollower {
  /** Chase a new target from wherever the value is now, keeping its velocity. */
  set: (target: number) => void;
  /** Move to a value instantly, with no motion. */
  jump: (value: number) => void;
  get: () => number;
  destroy: () => void;
}

/**
 * A value that follows its target through a spring, integrating the same
 * equation of motion Motion's `useSpring` solves — so a pointer-driven spring
 * reads the same in every build. Runs only while moving; `onUpdate` receives
 * each new value.
 */
export function createSpringFollower(
  initial: number,
  onUpdate: (value: number) => void,
  options: SpringOptions & { restSpeed?: number; ticker?: FrameTicker } = {},
): SpringFollower {
  const { stiffness = 100, damping = 10, mass = 1, ticker = rafTicker } = options;
  const restDelta = options.restDelta ?? 0.01;
  const restSpeed = options.restSpeed ?? 0.01;
  let value = initial;
  let target = initial;
  let velocity = 0;
  let stop: (() => void) | null = null;

  const step = (deltaMs: number) => {
    // Fixed 1ms sub-steps keep the integration stable for stiff springs and
    // independent of the frame rate.
    const steps = Math.min(Math.max(Math.round(deltaMs), 1), 250);
    for (let i = 0; i < steps; i++) {
      const force = -stiffness * (value - target) - damping * velocity;
      velocity += (force / mass) * 0.001;
      value += velocity * 0.001;
    }
    if (Math.abs(target - value) < restDelta && Math.abs(velocity) < restSpeed) {
      value = target;
      velocity = 0;
      stop?.();
      stop = null;
    }
    onUpdate(value);
  };

  return {
    set(next) {
      target = next;
      if (!stop && value !== target) stop = ticker.add(step);
    },
    jump(next) {
      stop?.();
      stop = null;
      value = target = next;
      velocity = 0;
      onUpdate(value);
    },
    get: () => value,
    destroy() {
      stop?.();
      stop = null;
    },
  };
}
