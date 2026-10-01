"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { cubicBezier } from "./motion-curves";

// ==========================================
// FLAVOUR CAROUSEL
// A product hero for anything that comes in flavours — a matcha latte here,
// but ice cream, juice, a candle: the product stands in a mountain of matcha
// powder against a moss-green backdrop and the flavours flank it on four
// tilted cream tiles. Every five seconds, or when a tile is clicked, the ring
// turns: the chosen tile slides into the cup and shrinks away, and the cup —
// which never moves — cross-fades to the picture with that flavour inside. A
// soft glow behind the cup takes the flavour's colour; a price pill and an
// add-to-cart button hang under the cup and the headline sits low over the
// powder. The powder is a transparent cutout laid in front of the cup, so
// the glass stands in it. When the section first appears only the cup is
// there; the ring rises from behind the powder spinning fast, slows over a
// couple of seconds into its resting places, and then the ordinary turns
// begin. Without pictures the scene is drawn: moss with a
// heap of powder. The scene is the same in both themes; in dark mode only the
// tiles change, from cream to a translucent black that sits into the ground.
// Positions are fractions of the stage, measured from the design at 733 × 426.
// ==========================================

export interface Flavour {
  name: string;
  /** Shown beside the name on the tag, e.g. "$6.50". */
  price?: string;
  /** The flavour's colour: the glow behind the product. */
  tint?: string;
  /** The product with this flavour inside. Every product image must share the same crop so only the contents appear to change. */
  product: string;
  /** The ingredient on the tile. */
  tile: string;
  /** Alt text for the product image; defaults to the name. */
  alt?: string;
}

export interface FlavourCarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  flavours: Flavour[];
  /** The headline over the mound. */
  heading?: React.ReactNode;
  /** Index of the flavour in the cup at the start. */
  initial?: number;
  /** Milliseconds between turns; `0` turns autoplay off. */
  interval?: number;
  onChange?: (index: number, flavour: Flavour) => void;
  /** The add-to-cart button; leave `onAdd` out to hide it. */
  onAdd?: (flavour: Flavour, index: number) => void;
  addLabel?: string;
  /** The backdrop, covering the section. Without one the ground is drawn from `background`. */
  backgroundImage?: string;
  /** object-position for the backdrop. */
  backgroundPosition?: string;
  /**
   * The powder: a transparent cutout, anchored to the foot of the stage and
   * laid in front of the cup so the glass stands in it. Its peak should be at
   * the picture's horizontal centre.
   */
  foregroundImage?: string;
  /** The powder's height as a share of the stage; wider than the stage is clipped. */
  foregroundHeight?: number;
  /**
   * The entrance: the ring rises from behind the powder, spinning, and settles.
   * `in-view` plays it the first time the section is on screen, `immediate`
   * at once, `none` renders the ring in place. Reduced motion skips it.
   */
  reveal?: "in-view" | "immediate" | "none";
  /** The ground when there is no backdrop. */
  background?: string;
  /** The drawn powder mound, as [light, dark]. */
  mound?: [string, string];
  /** The cream of the tiles (light mode), the pill and the cart. */
  paper?: string;
}

// ------------------------------------------
// The ring. Each tile's resting place is a function of its distance from the
// chosen one: the chosen tile is inside the cup (small, invisible, up at the
// rim); its neighbours flank the cup; the next pair sit lower, smaller and
// more tilted; anything further waits out of sight past the edge. `x` is a
// fraction of the stage width and `y` of its height, so the composition holds
// at any size.
// ------------------------------------------
interface Slot {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  z: number;
}

const SLOTS: Record<number, Slot> = {
  0: { x: 0, y: -0.18, scale: 0.28, rotate: 0, opacity: 0, z: 1 },
  1: { x: 0.233, y: 0, scale: 1, rotate: 8, opacity: 1, z: 4 },
  2: { x: 0.42, y: 0.135, scale: 0.9, rotate: 12, opacity: 1, z: 3 },
  3: { x: 0.6, y: 0.28, scale: 0.7, rotate: 20, opacity: 0, z: 2 },
};

// On phones only the nearest pair is on screen; the rest queue past the edge.
const SLOTS_COMPACT: Record<number, Slot> = {
  0: SLOTS[0],
  1: { x: 0.35, y: 0.02, scale: 1, rotate: 9, opacity: 1, z: 4 },
  2: { x: 0.62, y: 0.12, scale: 0.6, rotate: 20, opacity: 0, z: 3 },
  3: { x: 0.8, y: 0.2, scale: 0.5, rotate: 26, opacity: 0, z: 2 },
};

function slotFor(rel: number, compact: boolean): Slot {
  const table = compact ? SLOTS_COMPACT : SLOTS;
  const d = Math.min(Math.abs(rel), 3);
  const s = table[d];
  const sign = Math.sign(rel);
  return { ...s, x: s.x * sign, rotate: s.rotate * sign };
}

/** Signed distance from `active` to `i` around a ring of `n`, in [-n/2, n/2). */
function ringDistance(i: number, active: number, n: number) {
  let d = (i - active) % n;
  if (d < 0) d += n;
  if (d >= n / 2) d -= n;
  return d;
}

interface Spring {
  stiffness: number;
  damping: number;
  mass: number;
}

const SPRING: Spring = { stiffness: 150, damping: 24, mass: 1 };
// Walking to a tile two steps away: one step at a time, at about twice the pace.
const QUICK_SPRING: Spring = { stiffness: 340, damping: 32, mass: 1 };
const STEP_BEAT = 230;
// The entrance spin: one lap plus two, as one continuous turn that starts
// fast and eases to a stop in a little over two seconds.
const INTRO_EXTRA_STEPS = 2;
const INTRO_DURATION = 2400;
const INTRO_DELAY = 150;
const INTRO_EASE = cubicBezier(0.2, 0.85, 0.2, 1);

/** Signed, fractional distance from `phase` to `i` around the ring — the ring mid-turn. */
function ringDistanceAt(i: number, phase: number, n: number) {
  let d = (i - phase) % n;
  if (d < 0) d += n;
  if (d >= n / 2) d -= n;
  return d;
}

/** The slot for a fractional distance: a blend of the two slots either side of it. */
function slotAt(rel: number, compact: boolean): Slot {
  const table = compact ? SLOTS_COMPACT : SLOTS;
  const a = Math.min(Math.abs(rel), 3);
  const lo = Math.floor(a);
  const hi = Math.min(lo + 1, 3);
  const t = a - lo;
  const A = table[lo];
  const B = table[hi];
  const mix = (p: number, q: number) => p + (q - p) * t;
  const sign = Math.sign(rel) || 1;
  return {
    x: mix(A.x, B.x) * sign,
    y: mix(A.y, B.y),
    scale: mix(A.scale, B.scale),
    rotate: mix(A.rotate, B.rotate) * sign,
    opacity: mix(A.opacity, B.opacity),
    z: t < 0.5 ? A.z : B.z,
  };
}
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
// A plain `{ duration }` eases out.
const EASE_OUT_DEFAULT = "cubic-bezier(0, 0, 0.58, 1)";

const keyframes = `
@keyframes flavour-carousel-price-in { from { translate: 0 12px; opacity: 0; filter: blur(3px); } }
`;

// ------------------------------------------
// Motion without a library.
// ------------------------------------------
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** A number that can be watched: the ring's phase during the entrance. */
interface Phase {
  get: () => number;
  set: (value: number) => void;
  on: (listener: (value: number) => void) => () => void;
}

function createPhase(initial: number): Phase {
  let value = initial;
  const listeners = new Set<(value: number) => void>();
  return {
    get: () => value,
    set(next) {
      value = next;
      listeners.forEach((listener) => listener(next));
    },
    on(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

/**
 * Where a spring released at `from` with `velocity` (units per second)
 * towards `to` is after `t` seconds — the closed form Framer Motion's spring
 * uses, so a spring picked up mid-flight keeps its speed.
 */
function springPosition(spring: Spring, from: number, to: number, velocity: number, t: number) {
  const { stiffness, damping, mass } = spring;
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const omega0 = Math.sqrt(stiffness / mass);
  const delta = to - from;
  const envelope = Math.exp(-zeta * omega0 * t);
  if (zeta < 1) {
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    return (
      to -
      envelope *
        (((-velocity + zeta * omega0 * delta) / omegaD) * Math.sin(omegaD * t) + delta * Math.cos(omegaD * t))
    );
  }
  if (zeta === 1) return to - Math.exp(-omega0 * t) * (delta + (-velocity + omega0 * delta) * t);
  const omegaD = omega0 * Math.sqrt(zeta * zeta - 1);
  const f = Math.min(omegaD * t, 300);
  return to - (envelope * ((-velocity + zeta * omega0 * delta) * Math.sinh(f) + omegaD * delta * Math.cosh(f))) / omegaD;
}

const TILE_KEYS = ["x", "y", "scale", "rotate", "opacity"] as const;
type TileValues = Record<(typeof TILE_KEYS)[number], number>;

interface Channel {
  value: number;
  from: number;
  to: number;
  velocity: number;
  start: number;
  spring: Spring | null;
}

/**
 * A tile's five values, each animated by its own spring. Retargeting a value
 * mid-flight starts the new spring from where it is at the speed it has,
 * and a `null` spring jumps. `render` receives every frame, with the element
 * handed to `attach` (frames before there is one are skipped).
 */
function createTileMotion<E extends HTMLElement>(
  initial: TileValues,
  render: (el: E, values: TileValues) => void,
) {
  const channels = {} as Record<keyof TileValues, Channel>;
  let element: E | null = null;
  const draw = () => {
    if (element) render(element, values());
  };
  for (const key of TILE_KEYS) {
    const value = initial[key];
    channels[key] = { value, from: value, to: value, velocity: 0, start: 0, spring: null };
  }
  let frame = 0;

  const values = () => {
    const out = {} as TileValues;
    for (const key of TILE_KEYS) out[key] = channels[key].value;
    return out;
  };
  const at = (c: Channel, t: number) => springPosition(c.spring!, c.from, c.to, c.velocity, Math.max(t, 0));
  const speedAt = (c: Channel, t: number) => (at(c, t + 0.0005) - at(c, t - 0.0005)) / 0.001;

  const tick = (now: number) => {
    frame = 0;
    let moving = false;
    for (const key of TILE_KEYS) {
      const c = channels[key];
      if (!c.spring) continue;
      const t = (now - c.start) / 1000;
      const value = at(c, t);
      // Settled once close and slow enough, by the same thresholds as Framer.
      const granular = Math.abs(c.to - c.from) < 5;
      const restDelta = granular ? 0.005 : 0.5;
      const restSpeed = granular ? 0.01 : 2;
      const underdamped = c.spring.damping < 2 * Math.sqrt(c.spring.stiffness * c.spring.mass);
      if (Math.abs(c.to - value) <= restDelta && (!underdamped || Math.abs(speedAt(c, t)) <= restSpeed)) {
        c.value = c.to;
        c.spring = null;
      } else {
        c.value = value;
        moving = true;
      }
    }
    draw();
    if (moving) frame = requestAnimationFrame(tick);
  };

  return {
    values,
    /** The element the frames are written to: a callback ref. */
    attach(el: E | null) {
      element = el;
    },
    to(target: TileValues, spring: Spring | null) {
      const now = performance.now();
      let jumped = false;
      let started = false;
      for (const key of TILE_KEYS) {
        const c = channels[key];
        if (c.to === target[key]) continue;
        if (!spring) {
          c.value = c.from = c.to = target[key];
          c.velocity = 0;
          c.spring = null;
          jumped = true;
          continue;
        }
        let velocity = 0;
        if (c.spring) {
          const t = (now - c.start) / 1000;
          c.value = at(c, t);
          velocity = speedAt(c, t);
        }
        c.from = c.value;
        c.to = target[key];
        c.velocity = velocity;
        c.start = now;
        c.spring = spring;
        started = true;
      }
      if (jumped) draw();
      if (started && !frame) frame = requestAnimationFrame(tick);
    },
    jump(target: TileValues) {
      for (const key of TILE_KEYS) {
        const c = channels[key];
        c.value = c.from = c.to = target[key];
        c.velocity = 0;
        c.spring = null;
      }
      draw();
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

function tileTransform({ x, y, scale, rotate }: TileValues) {
  return `translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
}

// ------------------------------------------
// The mound: two soft heaps of powder, the lighter one behind, the darker in
// front, given a fine grain by a turbulence filter so it reads as powder and
// not as plastic.
// ------------------------------------------
function Mound({ light, dark, id }: { light: string; dark: string; id: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] w-full"
    >
      <defs>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" result="grain" />
          {/* Keep the grain inside the heaps, or it prints as a grey box over the scene. */}
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="grainIn" />
          <feBlend in="SourceGraphic" in2="grainIn" mode="multiply" />
        </filter>
        <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} stopOpacity="0.95" />
          <stop offset="0.55" stopColor={dark} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      <g filter={`url(#${id}-grain)`}>
        <path
          fill={`url(#${id}-back)`}
          d="M-40 320 C 90 296, 190 262, 300 214 C 380 180, 430 172, 480 132 C 530 92, 570 66, 604 60 C 640 66, 690 108, 740 134 C 800 164, 840 160, 900 192 C 980 232, 1090 284, 1240 320 Z"
        />
        <path
          fill={`url(#${id}-front)`}
          d="M-40 320 C 110 312, 220 286, 320 246 C 400 214, 460 176, 540 156 C 600 142, 650 170, 720 196 C 790 222, 850 208, 930 232 C 1010 256, 1120 300, 1240 320 Z"
        />
      </g>
    </svg>
  );
}

// ------------------------------------------
// A tile. Its position lives outside React: during the entrance it follows
// the ring's phase every frame (no re-render), and once the ring has landed
// the ordinary springs animate the very same values, so the handover is
// seamless.
// ------------------------------------------
function Tile({
  flavour,
  index,
  n,
  rel,
  slot,
  from,
  size,
  width,
  height,
  compact,
  phase,
  spinning,
  transition,
  reduce,
  onChoose,
}: {
  flavour: Flavour;
  index: number;
  n: number;
  rel: number;
  slot: Slot;
  /** Where a remounted tile starts: the hidden slot on its new side. */
  from: Slot | null;
  size: number;
  width: number;
  height: number;
  compact: boolean;
  phase: Phase;
  spinning: boolean;
  /** The spring for the next move; `null` jumps. */
  transition: Spring | null;
  reduce: boolean;
  onChoose: (index: number) => void;
}) {
  const [{ motion, attach, initialStyle }] = useState(() => {
    const start = from ?? slot;
    const tileMotion = createTileMotion<HTMLButtonElement>(
      { x: start.x * width, y: start.y * height, scale: start.scale, rotate: start.rotate, opacity: start.opacity },
      (el, v) => {
        el.style.transform = tileTransform(v);
        el.style.opacity = String(v.opacity);
      },
    );
    // Where the tile is drawn before any frame has run; after that the values
    // are written straight to the element (the button, via `attach`).
    const v = tileMotion.values();
    return {
      motion: tileMotion,
      attach: tileMotion.attach,
      initialStyle: { transform: tileTransform(v), opacity: v.opacity },
    };
  });
  useEffect(() => () => motion.stop(), [motion]);

  // Hover lifts and straightens the tile, a press sinks it — both on the
  // tile's own spring, and not while the ring is spinning or motion is reduced.
  const gestures = !(reduce || spinning);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const hoverOn = gestures && hovered;
  const pressOn = gestures && pressed;

  useEffect(() => {
    if (!pressed) return;
    const release = () => setPressed(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [pressed]);

  useLayoutEffect(() => {
    if (!spinning) return;
    const apply = (p: number) => {
      const s = slotAt(ringDistanceAt(index, p, n), compact);
      motion.jump({ x: s.x * width, y: s.y * height, scale: s.scale, rotate: s.rotate, opacity: s.opacity });
    };
    apply(phase.get());
    return phase.on(apply);
  }, [spinning, phase, index, n, compact, width, height, motion]);

  const targetX = slot.x * width;
  const targetY = slot.y * height;
  const targetScale = slot.scale * (pressOn ? 0.96 : hoverOn ? 1.06 : 1);
  const targetRotate = slot.rotate * (hoverOn ? 0.6 : 1);
  const targetOpacity = slot.opacity;
  useLayoutEffect(() => {
    if (spinning) return;
    motion.to(
      { x: targetX, y: targetY, scale: targetScale, rotate: targetRotate, opacity: targetOpacity },
      transition,
    );
  }, [spinning, targetX, targetY, targetScale, targetRotate, targetOpacity, transition, motion]);

  return (
    <button
      ref={attach}
      type="button"
      aria-label={rel === 0 ? `${flavour.name}, in the cup` : `Choose ${flavour.name}`}
      aria-pressed={rel === 0}
      tabIndex={rel === 0 ? -1 : 0}
      onClick={() => onChoose(index)}
      onPointerEnter={(e) => {
        if (gestures && e.pointerType !== "touch") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={(e) => {
        if (gestures && e.isPrimary && (e.pointerType !== "mouse" || e.button === 0)) setPressed(true);
      }}
      onKeyDown={(e) => {
        if (gestures && e.key === "Enter" && !e.repeat) setPressed(true);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") setPressed(false);
      }}
      onBlur={() => setPressed(false)}
      style={{
        ...initialStyle,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        zIndex: slot.z,
        pointerEvents: slot.opacity === 0 || spinning ? "none" : "auto",
      }}
      className={cn(
        // Its own compositing layer: rotated tiles otherwise show raster seams in Chrome.
        "group absolute left-1/2 top-[42%] cursor-pointer rounded-[14%] will-change-transform [backface-visibility:hidden]",
        // Cream tiles; in dark mode a translucent black that sits into the ground.
        "bg-[var(--fc-paper)] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]",
        "dark:bg-black/40 dark:shadow-[0_30px_50px_-24px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.08)] dark:backdrop-blur-sm",
        "outline-none focus-visible:ring-4 focus-visible:ring-white/70",
      )}
    >
      <img
        src={flavour.tile}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-[11%] h-[78%] w-[78%] select-none object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.25)]"
      />
    </button>
  );
}

// ------------------------------------------
// The price ticker
// ------------------------------------------
interface PillLayer {
  key: number;
  /** Rises in when it mounts (not the first one). */
  enter: boolean;
  /** Set while leaving: where it stood, so it can leave the flow in place. */
  rect: { top: number; left: number; width: number; height: number } | null;
}

const PRICE_EXIT = { translate: "0px -12px", opacity: "0", filter: "blur(3px)" };
const PRICE_REST = { translate: "0px 0px", opacity: "1", filter: "blur(0px)" };

/** From the element's current computed values to `to`, as WAAPI keyframes. */
function fromCurrent(el: Element, to: Record<string, string>) {
  const style = getComputedStyle(el);
  const frames: Record<string, string[]> = {};
  for (const key of Object.keys(to)) frames[key] = [style.getPropertyValue(key), to[key]];
  return frames;
}

// ------------------------------------------
// Root
// ------------------------------------------
export function FlavourCarousel({
  flavours,
  heading,
  initial = 0,
  interval = 5000,
  onChange,
  onAdd,
  addLabel = "Add to cart",
  backgroundImage,
  backgroundPosition = "50% 50%",
  foregroundImage,
  foregroundHeight = 0.41,
  reveal = "in-view",
  background = "#3b4726",
  mound = ["#7a9550", "#465b2b"],
  paper = "#f4f1e7",
  className,
  style,
  ...props
}: FlavourCarouselProps) {
  const n = flavours.length;
  const id = useId().replace(/:/g, "");
  const reduce = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const initialIndex = Math.min(Math.max(initial, 0), Math.max(n - 1, 0));
  // The entrance: the ring starts a lap behind and spins forward to `initial`.
  const introSteps = n + INTRO_EXTRA_STEPS;
  const [intro, setIntro] = useState(reveal !== "none" && n > 1);
  const [inView, setInView] = useState(reveal === "immediate");
  const [active, setActive] = useState(initialIndex);
  // The ring's fractional position during the entrance: a lap behind, easing forward to `initial`.
  const [phase] = useState(() => createPhase(initialIndex - introSteps));
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [held, setHeld] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(true);
  // Product layers stack by recency: the newest on top fades in over the one
  // before it, so the cup itself never dips in opacity mid-change.
  const shown = active;
  const [order, setOrder] = useState<number[]>(() => [shown]);
  const cupRef = useRef<HTMLDivElement>(null);
  const fades = useRef(new Map<number, Animation>());
  const first = useRef(true);
  // Which side of the cup each tile lives on. A tile only ever leaves on its
  // own side; when the ring brings it round to the other side it is remounted
  // at that side's hidden slot (`gen` bumps its key) and springs in from
  // there, so nothing is ever seen crossing the stage. Settled for each turn
  // while rendering, against the turn they were last settled for.
  const [ring, setRing] = useState(() => ({
    active,
    side: flavours.map((_, i) => Math.sign(ringDistance(i, active, n)) || 1),
    gen: flavours.map(() => 0),
  }));
  if (ring.active !== active) {
    const prev = ring.active;
    const side = [...ring.side];
    const remount: number[] = [];
    flavours.forEach((_, i) => {
      const before = ringDistance(i, prev, n);
      const after = ringDistance(i, active, n);
      if (after === 0) return;
      const sign = Math.sign(after);
      // Emerging from the cup, or already on this side: nothing to do.
      if (before === 0 || side[i] === sign) {
        side[i] = sign;
        return;
      }
      // Bound for the other side. Out of sight there: stay hidden on this side.
      if (Math.abs(after) >= 3) return;
      // Coming into view there: switch sides off screen and spring in.
      side[i] = sign;
      remount.push(i);
    });
    setRing({
      active,
      side,
      gen: remount.length ? ring.gen.map((v, i) => (remount.includes(i) ? v + 1 : v)) : ring.gen,
    });
  }

  const compact = width > 0 && width < 560;
  // Tile size as a share of the stage: generous on phones, calmer as the ring gets room.
  const tile = width * (compact ? 0.26 : width < 1024 ? 0.19 : 0.177);
  // The small pieces scale with the stage, not the viewport, so they hold in a docs frame.
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const headingSize = clamp(width * 0.06, 24, 64);
  const pillHeight = clamp(width * 0.033, 22, 34);
  const pillFont = clamp(width * 0.015, 10.5, 15);
  const cartSize = clamp(width * 0.057, 36, 60);
  const current = flavours[shown];

  // Measure the stage so tile offsets can be fractions of its width.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setWidth(r.width);
    setHeight(r.height);
    return () => ro.disconnect();
  }, []);

  // Off screen the ring stands still.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A tile further than one step away is walked to, step by step, like a
  // carousel — the near one goes into the cup first, then the next arrives.
  const targetRef = useRef<number | null>(null);
  const [walking, setWalking] = useState(false);

  const choose = useCallback(
    (index: number) => {
      const next = ((index % n) + n) % n;
      if (next === active) return;
      const d = ringDistance(next, active, n);
      if (Math.abs(d) <= 1) {
        targetRef.current = null;
        setWalking(false);
        setActive(next);
        return;
      }
      targetRef.current = next;
      setWalking(true);
      setActive((a) => (((a + Math.sign(d)) % n) + n) % n);
    },
    [n, active],
  );

  useEffect(() => {
    const target = targetRef.current;
    if (target === null) return;
    if (active === target) {
      targetRef.current = null;
      // Let the last step finish at the quick pace before the springs relax.
      const t = window.setTimeout(() => setWalking(false), STEP_BEAT);
      return () => window.clearTimeout(t);
    }
    const dir = Math.sign(ringDistance(target, active, n));
    const t = window.setTimeout(() => setActive((a) => (((a + dir) % n) + n) % n), STEP_BEAT);
    return () => window.clearTimeout(t);
  }, [active, n]);

  // Once seen, in view for good.
  if (visible && !inView) setInView(true);

  // The entrance spin: one continuous turn of the phase, fast then easing to
  // a stop on `initial`; when it lands the springs take over from exactly
  // where it left the tiles.
  // Reduced motion skips it: the ring is simply in place.
  if (intro && inView && reduce) setIntro(false);
  useEffect(() => {
    if (!intro || !inView || reduce) return;
    const from = phase.get();
    let frame = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime - INTRO_DELAY;
      if (elapsed >= 0) {
        const t = Math.min(elapsed / INTRO_DURATION, 1);
        phase.set(from + (initialIndex - from) * INTRO_EASE(t));
        if (t === 1) {
          setIntro(false);
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [intro, inView, reduce, phase, initialIndex]);

  // When the cup's flavour changes, bring its picture to the top (while
  // rendering, against the flavour last stacked)...
  const [stacked, setStacked] = useState(shown);
  if (stacked !== shown) {
    setStacked(shown);
    setOrder((prev) => [...prev.filter((i) => i !== shown), shown]);
  }
  // ...and, before that frame is painted, fade it in over the previous one.
  const fadedRef = useRef(shown);
  useLayoutEffect(() => {
    if (fadedRef.current === shown) return;
    fadedRef.current = shown;
    const layer = cupRef.current?.querySelector<HTMLElement>(`[data-fc-product="${shown}"]`);
    if (!layer || reduce) return;
    // A fade still running under the new top layer finishes on its own, so
    // the pictures beneath always end up whole.
    fades.current.get(shown)?.cancel();
    const fade = layer.animate({ opacity: [0, 1] }, { duration: 900, easing: EASE_OUT });
    fades.current.set(shown, fade);
    fade.onfinish = () => {
      if (fades.current.get(shown) === fade) fades.current.delete(shown);
    };
  }, [shown, reduce]);

  // Report each change (not the first flavour) to the latest `onChange`.
  const onChangeRef = useRef(onChange);
  const flavoursRef = useRef(flavours);
  useEffect(() => {
    onChangeRef.current = onChange;
    flavoursRef.current = flavours;
  });
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onChangeRef.current?.(shown, flavoursRef.current[shown]);
  }, [shown]);

  useEffect(() => {
    const running = fades.current;
    return () => running.forEach((fade) => fade.cancel());
  }, []);

  // The price swaps like a ticker: the old one lifts out, taken out of the
  // flow where it stood, while the new one rises in and sets the pill's width.
  const [pill, setPill] = useState<PillLayer[]>(() => [{ key: shown, enter: false, rect: null }]);
  const pillRefs = useRef(new Map<number, HTMLDivElement>());
  const pillExits = useRef(new Map<number, Animation>());
  const pillShownRef = useRef(shown);
  // Under reduced motion the price just swaps: done while rendering, against
  // the flavour the pill last showed.
  const [pillFor, setPillFor] = useState(shown);
  if (pillFor !== shown) {
    setPillFor(shown);
    if (reduce) setPill([{ key: shown, enter: false, rect: null }]);
  }
  useLayoutEffect(() => {
    const prev = pillShownRef.current;
    pillShownRef.current = shown;
    if (prev === shown) return;
    const exits = pillExits.current;
    if (reduce) {
      exits.forEach((exit) => exit.cancel());
      exits.clear();
      return;
    }
    // Leaving: freeze where it stands and lift it out from wherever it is.
    const leaving = pillRefs.current.get(prev);
    const rect = leaving
      ? { top: leaving.offsetTop, left: leaving.offsetLeft, width: leaving.offsetWidth, height: leaving.offsetHeight }
      : null;
    if (leaving) {
      exits.get(prev)?.cancel();
      const exit = leaving.animate(fromCurrent(leaving, PRICE_EXIT), {
        duration: 400,
        easing: EASE_OUT,
        fill: "forwards",
      });
      exits.set(prev, exit);
      exit.onfinish = () => {
        exits.delete(prev);
        setPill((layers) => layers.filter((l) => l.key !== prev || !l.rect));
      };
    }
    // Coming back before it had gone: settle back from where it got to.
    const returning = exits.get(shown);
    const returningEl = pillRefs.current.get(shown);
    if (returning && returningEl) {
      returningEl.animate(fromCurrent(returningEl, PRICE_REST), { duration: 400, easing: EASE_OUT });
      returning.cancel();
      exits.delete(shown);
    }
    setPill((layers) => {
      const gone = layers.find((l) => l.key === prev);
      const back = layers.find((l) => l.key === shown);
      return [
        ...layers.filter((l) => l.key !== prev && l.key !== shown),
        ...(leaving && gone ? [{ ...gone, rect }] : []),
        back ? { ...back, rect: null } : { key: shown, enter: true, rect: null },
      ];
    });
  }, [shown, reduce]);

  useEffect(() => {
    const exits = pillExits.current;
    return () => exits.forEach((exit) => exit.cancel());
  }, []);

  // The entrance of the ring, the price and the headline. They start hidden
  // (unless `reveal` is "none" or motion is reduced) and transition in once
  // the section is in view, so the first frame has to be drawn hidden first.
  const [armed, setArmed] = useState(false);
  // The stage's ref: once it is in the document, force a layout so the
  // hidden first frame is what the transitions start from, then arm.
  const attachStage = useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node;
    if (!node) return;
    node.getBoundingClientRect();
    setArmed(true);
  }, []);
  const [startHidden] = useState(() => !(reveal === "none" || reduce));
  const revealed = reveal === "none" || (inView && (armed || !startHidden));

  // Autoplay: one turn after each rest, held while the pointer or focus is on
  // the ring, while the tab is hidden, or while the section is off screen.
  useEffect(() => {
    if (intro || walking || interval <= 0 || held || hidden || !visible || n < 2) return;
    const t = window.setTimeout(() => choose(active + 1), interval);
    return () => window.clearTimeout(t);
  }, [active, intro, walking, interval, held, hidden, visible, n, choose]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (intro) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      choose(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      choose(active - 1);
    }
  };

  const tiles = useMemo(
    () =>
      flavours.map((f, i) => {
        const rel = ringDistance(i, active, n);
        // Hidden tiles keep to their own side, whatever the ring says.
        const side = ring.side[i] ?? Math.sign(rel) ?? 1;
        const slot = slotFor(Math.abs(rel) >= 3 ? 3 * side : rel, compact);
        const from = slotFor(3 * side, compact);
        return { f, i, rel, slot, from, gen: ring.gen[i] ?? 0 };
      }),
    [flavours, active, n, compact, ring],
  );

  const transition = reduce ? null : walking ? QUICK_SPRING : SPRING;

  return (
    <section
      className={cn("relative w-full overflow-hidden text-[#f4f1e7]", className)}
      style={{ background, "--fc-paper": paper, ...style } as React.CSSProperties}
      {...props}
    >
      <style>{keyframes}</style>
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            style={{ objectPosition: backgroundPosition }}
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.28) 100%)",
            }}
          />
          <Mound light={mound[0]} dark={mound[1]} id={id} />
        </>
      )}

      <div
        ref={attachStage}
        role="group"
        aria-roledescription="carousel"
        aria-label="Flavours"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
        }}
        className="relative mx-auto aspect-[4/5] w-full max-w-7xl outline-none sm:aspect-[16/11] lg:aspect-[733/426] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-current/50"
      >
        {/* The glow: the flavour's colour, soft, behind the cup. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[20%] top-[6%] aspect-square rounded-full opacity-40 sm:inset-x-[28%] sm:top-[2%]"
          style={{
            filter: "blur(70px)",
            backgroundColor: current?.tint ?? mound[0],
            transition: reduce ? "none" : `background-color 1.2s ${EASE_OUT_DEFAULT}`,
          }}
        />

        {/* ---- The ring of tiles: one band across the middle ---- */}
        <div
          className={cn("absolute inset-0 z-10", intro && "pointer-events-none")}
          style={{
            translate: revealed ? "0 0" : "0 70%",
            opacity: revealed ? 1 : 0,
            transition: reduce
              ? "none"
              : `translate 1.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ${EASE_OUT_DEFAULT}`,
          }}
        >
          {tiles.map(({ f, i, rel, slot, from, gen: g }) => (
            <Tile
              key={`${f.name}${i}:${g}`}
              flavour={f}
              index={i}
              n={n}
              rel={rel}
              slot={slot}
              from={g > 0 ? from : null}
              size={tile}
              width={width}
              height={height}
              compact={compact}
              phase={phase}
              spinning={intro}
              transition={transition}
              reduce={!!reduce}
              onChoose={choose}
            />
          ))}
        </div>

        {/* ---- The cup, standing on the peak: every picture stacked, the newest on top ---- */}
        <div
          ref={cupRef}
          className="pointer-events-none absolute bottom-[33%] left-1/2 z-20 w-[46%] -translate-x-1/2 drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)] sm:w-[30%] lg:w-[24.6%]"
          style={{ aspectRatio: "357 / 462" }}
        >
          {flavours.map((f, i) => {
            const rank = order.indexOf(i);
            return (
              <img
                key={f.product + i}
                data-fc-product={i}
                src={f.product}
                alt={i === shown ? (f.alt ?? f.name) : ""}
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-contain"
                style={{ zIndex: rank < 0 ? 0 : rank + 1, opacity: rank < 0 ? 0 : 1 }}
              />
            );
          })}
        </div>

        {/* ---- The powder, in front of the cup, so the glass stands in it ---- */}
        {foregroundImage && (
          <>
            <img
              src={foregroundImage}
              alt=""
              aria-hidden
              draggable={false}
              className="pointer-events-none absolute bottom-0 left-1/2 z-[25] w-auto max-w-none -translate-x-1/2 select-none"
              style={{ height: `${foregroundHeight * 100}%` }}
            />
          </>
        )}

        {/* ---- Under the cup: the price, then the cart ---- */}
        <div
          className="absolute inset-x-0 top-[61.5%] z-30 flex flex-col items-center"
          style={{
            gap: pillHeight * 0.25,
            translate: revealed ? "0 0" : "0 16px",
            opacity: revealed ? 1 : 0,
            transition: reduce ? "none" : `translate 0.7s ${EASE_OUT} 1.5s, opacity 0.7s ${EASE_OUT} 1.5s`,
          }}
        >
          <div
            className="relative min-w-[3.5em] overflow-hidden rounded-full text-[#1b2012] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.6)]"
            style={{ background: paper, height: pillHeight, paddingInline: pillHeight * 0.45, fontSize: pillFont }}
            aria-live="polite"
          >
            {pill.map((layer) => {
              const f = flavours[layer.key];
              return (
                <div
                  key={layer.key}
                  ref={(el) => {
                    if (el) pillRefs.current.set(layer.key, el);
                    else pillRefs.current.delete(layer.key);
                  }}
                  className="flex h-full items-center justify-center whitespace-nowrap font-semibold tracking-[0.01em]"
                  style={{
                    animation: layer.enter ? `flavour-carousel-price-in 0.4s ${EASE_OUT} backwards` : undefined,
                    ...(layer.rect && { position: "absolute", ...layer.rect }),
                  }}
                >
                  <span className="sr-only">{f?.name}: </span>
                  {f?.price ?? f?.name}
                </div>
              );
            })}
          </div>
          {onAdd && (
            <Button
              variant="default"
              size="sm"
              aria-label={`${addLabel}: ${current?.name}`}
              onClick={() => onAdd(current, shown)}
              iconLeft={<ShoppingCart size={cartSize * 0.4} />}
              style={{ width: cartSize, height: cartSize }}
              className="rounded-full border-0 bg-[var(--fc-paper)] text-[#1b2012] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-white"
            />
          )}
        </div>

        {/* ---- The headline, low over the powder ---- */}
        {heading && (
          <h2
            className="absolute inset-x-4 top-[92%] z-30 text-center sm:top-[89%] font-serif font-normal leading-[1.05] tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            style={{
              fontSize: headingSize,
              transform: "translateY(-50%)",
              opacity: revealed ? 1 : 0,
              transition: reduce ? "none" : `opacity 0.8s ${EASE_OUT} 1.7s`,
            }}
          >
            {heading}
          </h2>
        )}
      </div>
    </section>
  );
}

export default FlavourCarousel;
