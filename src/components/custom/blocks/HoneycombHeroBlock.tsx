"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// HONEYCOMB HERO
// A travel hero on a dark, shifting ground: a light line over a huge white
// word on the left, and on the right a honeycomb of hexagonal photographs
// with a primary hexagonal call to action set among them. The
// large hexagon is the slide on screen — its photograph is also the
// background, tinted with that photograph's own tone, so the colour behind
// everything changes with the slide — and the smaller ones are the queue.
// Every few seconds, or on the arrows at the foot, every hexagon moves one
// step along the honeycomb: the next photo grows into the feature spot while
// the feature slides to the back of the queue. The loop never ends. Where
// the huge word crosses the photographs, its letters turn the primary. Every
// accent reads the theme's tokens where the section sits, so a theme change
// repaints it.
// ==========================================

export interface HoneycombImage {
  src: string;
  alt: string;
  /**
   * The colour behind everything while this photograph is featured — keep
   * it deep, the copy is white. Defaults to `background`.
   */
  tone?: string;
}

export interface HoneycombHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** The light line above the accent word. */
  title?: string;
  /** The huge, tracked, upper-case word, in white. */
  titleAccent?: string;
  /** The letters of the huge word that cross the photographs; the primary by default. */
  titleOverlapColor?: string;
  subtitle?: string;
  /** The words in the call-to-action hexagon; a `\n` breaks the line. */
  primaryActionLabel?: string;
  primaryActionHref?: string;
  /**
   * The photographs, in queue order — the first is featured at the start.
   * Nine cells are visible; fewer photographs are repeated around the ring.
   */
  images?: HoneycombImage[];
  /** Links along the foot; an empty array hides them. */
  socialLinks?: { label: string; href: string }[];
  /** Milliseconds between steps; `0` turns autoplay off. */
  interval?: number;
  onChange?: (index: number) => void;
  /**
   * Sets `--primary` for the section — the word, the rule, the arrows and the
   * call to action. The theme's primary by default.
   */
  accent?: string;
  /** The tone for photographs without their own; a deep shade of the primary by default. */
  background?: string;
  /** Pass `next/link` to keep client-side navigation. */
  linkComponent?: React.ElementType;
}

// ------------------------------------------
// The honeycomb, measured from the design. The stage is 553 × 583 units,
// anchored to the right edge of the section; hexagons are pointy-top, 160
// units wide (the feature is 320), on a lattice with a 160 horizontal and
// 139 vertical step. Positions are percentages of the stage, so the
// composition holds at any size — and whatever falls past the right edge is
// clipped, as in the design.
// ------------------------------------------
const STAGE_W = 553;
const STAGE_H = 583;
const SMALL = 160;
const HEX_H = 2 / Math.sqrt(3); // height ÷ width of a pointy-top hexagon

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

interface Slot {
  left: string;
  top: string;
  width: string;
}

const slot = (cx: number, cy: number, w = SMALL): Slot => ({
  left: pct(cx - w / 2, STAGE_W),
  top: pct(cy - (w * HEX_H) / 2, STAGE_H),
  width: pct(w, STAGE_W),
});

/**
 * The queue, in the order a photograph travels: it enters at the last slot
 * and moves along the ring — bottom, bottom-right, red-house, beach, far
 * coast, corner, top-right, top — until it reaches the feature at slot 0.
 * Every hop is between neighbouring cells, so the motion reads as one wave.
 */
const SLOTS: Slot[] = [
  slot(160, 340, 320), // 0 · feature
  slot(333, 150), // 1 · top
  slot(493, 150), // 2 · top-right, clipped by the edge
  slot(573, 11), // 3 · corner, mostly clipped
  slot(583, 300), // 4 · far right, a sliver
  slot(423, 300), // 5 · right
  slot(503, 439), // 6 · lower right, clipped
  slot(423, 578), // 7 · bottom right, clipped by the foot
  slot(255, 578), // 8 · bottom, clipped by the foot
];
const CTA_SLOT = slot(343, 439);
const CELLS = SLOTS.length;

// A pointy-top regular hexagon.
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
// The same hexagon as SVG points, in a 100-wide box.
const HEX_POINTS = [
  [50, 0],
  [100, 25],
  [100, 75],
  [50, 100],
  [0, 75],
  [0, 25],
]
  .map(([x, y]) => `${x},${((y / 100) * 100 * HEX_H).toFixed(2)}`)
  .join(" ");

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------
// Motion. GSAP's power3.inOut for the cells; power2.inOut for the background,
// run as its two exact halves (power2.in, then power2.out).
// ------------------------------------------
const EASE_TRAVEL =
  "linear(0, 0, .0002, .0012, .0039, .0094, .0195, .0361, .0617, .0988, .1505, .2204, .3121, .4299, .5701, .6879, .7796, .8495, .9012, .9383, .9639, .9805, .9906, .9961, .9988, .9998, 1, 1)";
const EASE_IN_HALF = "cubic-bezier(0.3333, 0, 0.6667, 0)";
const EASE_OUT_HALF = "cubic-bezier(0.3333, 1, 0.6667, 1)";

type StyleTarget = Record<string, string>;

/**
 * Take `el` from wherever it is on screen to `to`. A move already running is
 * dropped where it stands and the new one starts from there and runs its full
 * length — what GSAP's `killTweensOf` / `overwrite: "auto"` do. (A CSS
 * transition would shorten a move that reverses back to where it started.)
 * During `delay` the element holds its current place. Without `options` the
 * values are simply set.
 */
function moveTo(
  el: HTMLElement,
  running: WeakMap<HTMLElement, Animation>,
  to: StyleTarget,
  options?: KeyframeAnimationOptions & { keyframes?: (from: StyleTarget) => Keyframe[] },
) {
  const current = running.get(el);
  running.delete(el);
  if (!options || typeof el.animate !== "function") {
    current?.cancel();
    Object.assign(el.style, to);
    return;
  }
  // Read the on-screen values before the running move is dropped.
  const cs = getComputedStyle(el);
  const from: StyleTarget = {};
  for (const key of Object.keys(to)) from[key] = cs.getPropertyValue(key);
  current?.cancel();
  Object.assign(el.style, to);
  if (!current && Object.keys(to).every((key) => from[key] === to[key])) return;
  const { keyframes, ...timing } = options;
  try {
    running.set(el, el.animate(keyframes ? keyframes(from) : [from, to], { fill: "backwards", ...timing }));
  } catch {
    // An engine without `linear()` easing: the element just takes its place.
  }
}

// ------------------------------------------
// Defaults — Lofoten and the fjords, from Unsplash, each with a deep tone
// drawn from the photograph, so the ground shifts colour as the queue turns.
// ------------------------------------------

const DEFAULT_IMAGES: HoneycombImage[] = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158809/photo-1628344253777-f73a64d8f983-1790158812202.jpg", alt: "A waterfall pouring through a green gorge", tone: "#0f2e22" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1663428520845-056989f8a664-1790158812204.jpg", alt: "Red cabins at Hamnøy under a mountain", tone: "#1f2140" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1710762634126-4c0e8fba44d8-1790158812206.jpg", alt: "A snowy village below white peaks", tone: "#18233a" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158815/photo-1593378026483-2a1fd46a35bd-1790158812215.jpg", alt: "Green aurora above snowy mountains", tone: "#0b2a2d" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1695496896465-9e59091a8ed1-1790158812205.jpg", alt: "Turquoise water between mountain ridges", tone: "#082f3d" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1721335916916-37c319adce3a-1790158812206.jpg", alt: "A sandy beach beneath a rocky headland", tone: "#1d2b36" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790166049/photo-1527004013197-933c4bb611b3-1790166052225.jpg", alt: "A red cabin on a rocky shore", tone: "#2a1f3d" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1682952986992-de7082fb213d-1790158812205.jpg", alt: "Waterfalls running down the wall of a fjord", tone: "#132a3b" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158809/photo-1607888566357-ec0b61abee46-1790158812198.jpg", alt: "A waterfall beside a wooden viewpoint", tone: "#1c2b17" },
];

const DEFAULT_SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Pinterest", href: "#" },
];

/** A deep shade of the primary, for photographs without a tone of their own. */
const DEFAULT_BACKGROUND = "color-mix(in oklab, var(--primary) 16%, #05080a)";

// ------------------------------------------
// Root
// ------------------------------------------
export const HoneycombHero = forwardRef<HTMLElement, HoneycombHeroProps>(
  (
    {
      title = "Wander the",
      titleAccent = "Fjords",
      titleOverlapColor = "var(--primary)",
      subtitle = "Waterfalls that drop straight into the sea, red cabins at the water's edge and skies that glow green after dark — small-group journeys through the far north.",
      primaryActionLabel = "Plan\nyour trip",
      primaryActionHref = "#",
      images = DEFAULT_IMAGES,
      socialLinks = DEFAULT_SOCIAL,
      interval = 4000,
      onChange,
      accent,
      background = DEFAULT_BACKGROUND,
      linkComponent: Link = "a",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const placedRef = useRef(false);
    const movesRef = useRef(new WeakMap<HTMLElement, Animation>());

    // Nine cells; each carries one photograph for good. Fewer photographs
    // than cells are repeated around the ring.
    const n = Math.max(images.length, 1);
    const cells = Array.from({ length: CELLS }, (_, i) => images[i % n]);

    // `offset` is how many steps the queue has moved; cell i sits in slot
    // (i - offset) mod 9, so the cell in slot 0 is the feature.
    const [offset, setOffset] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [onScreen, setOnScreen] = useState(true);
    const [cut, setCut] = useState<number | null>(null);

    const slotOf = useCallback((i: number, off: number) => (((i - off) % CELLS) + CELLS) % CELLS, []);
    const featureCell = slotOf(0, -offset); // the cell in slot 0
    const featureIndex = featureCell % n;
    const toneOf = (img: HoneycombImage | undefined) => img?.tone ?? background;
    const tone = toneOf(images[featureIndex]);

    const go = useCallback((dir: 1 | -1) => setOffset((o) => o + dir), []);

    useEffect(() => {
      onChange?.(featureIndex);
    }, [featureIndex, onChange]);

    // ---- Place the cells, then move them a step at a time. The cell heading
    // for the feature rises above the rest; the one leaving it drops behind.
    useLayoutEffect(() => {
      const reduced = prefersReducedMotion();
      const animate = placedRef.current && !reduced;
      cells.forEach((_, i) => {
        const el = cellRefs.current[i];
        if (!el) return;
        const k = slotOf(i, offset);
        const target = { ...SLOTS[k] };
        el.style.zIndex = String(k === 0 ? 30 : k === CELLS - 1 ? 5 : 20 - k);
        // A step taken mid-move drops the old move where it stands, so it
        // never runs on through the new one's stagger delay.
        moveTo(
          el,
          movesRef.current,
          target,
          animate ? { duration: 1150, easing: EASE_TRAVEL, delay: k * 45 } : undefined,
        );
      });
      placedRef.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, n]);

    // ---- The background follows the feature.
    useEffect(() => {
      const reduced = prefersReducedMotion();
      bgRefs.current.forEach((el, i) => {
        if (!el) return;
        const to = i === featureIndex ? 1 : 0;
        moveTo(
          el,
          movesRef.current,
          { opacity: String(to) },
          reduced
            ? undefined
            : {
                duration: 1400,
                keyframes: (from) => {
                  const start = parseFloat(from.opacity);
                  return [
                    { opacity: start, easing: EASE_IN_HALF },
                    { opacity: (start + to) / 2, offset: 0.5, easing: EASE_OUT_HALF },
                    { opacity: to },
                  ];
                },
              },
        );
      });
    }, [featureIndex]);

    // ---- The accent word turns the primary where it crosses the photographs:
    // a coloured copy is clipped at the stage's left edge.
    useLayoutEffect(() => {
      const root = rootRef.current;
      const stage = stageRef.current;
      const h1 = headingRef.current;
      if (!root || !stage || !h1) return;
      const measure = () => {
        const s = stage.getBoundingClientRect();
        const h = h1.getBoundingClientRect();
        // Only when the stage sits beside the text, not below it.
        const beside = s.top < h.bottom && s.bottom > h.top;
        setCut(beside ? Math.max(0, s.left - h.left) : null);
      };
      measure();
      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(measure);
      ro.observe(root);
      return () => ro.disconnect();
    }, []);

    // ---- Autoplay: held while the tab is hidden or the section is off screen.
    const paused = hidden || !onScreen;
    useEffect(() => {
      if (interval <= 0 || paused) return;
      const t = window.setTimeout(() => go(1), interval);
      return () => window.clearTimeout(t);
    }, [offset, interval, paused, go]);

    useEffect(() => {
      const onVisibility = () => setHidden(document.hidden);
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    useEffect(() => {
      const el = rootRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver((entries) => setOnScreen(entries.some((e) => e.isIntersecting)), { threshold: 0.2 });
      io.observe(el);
      return () => io.disconnect();
    }, []);

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };

    const arrow =
      "grid size-7 place-items-center rounded-sm text-primary outline-none transition-transform duration-300 hover:scale-125 focus-visible:ring-2 focus-visible:ring-primary";

    return (
      <section
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        onKeyDown={onKeyDown}
        // `--hc-bg` is the featured photograph's tone; everything painted with it
        // eases to the next one as the queue turns.
        style={{ ...(accent ? { "--primary": accent } : {}), "--hc-bg": tone, ...style } as React.CSSProperties}
        className={cn(
          // No `dark` class here: it would redeclare `--primary` from the
          // stylesheet and cut the section off from a theme set on <html>.
          "relative isolate w-full overflow-hidden bg-[var(--hc-bg)] text-white transition-[background-color] duration-[1400ms] ease-in-out [container-type:inline-size]",
          "lg:aspect-[948/583] lg:max-h-[54rem] lg:min-h-[36rem]",
          className,
        )}
        {...props}
      >
        {/* ---- The background: the feature photograph, tinted with its own
            tone. Each layer carries its tint, so crossfading the layers
            crossfades the colour too. ---- */}
        <div className="absolute inset-0" aria-hidden>
          {images.map((img, i) => (
            <div
              key={img.src + i}
              ref={(el) => {
                bgRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0, "--hc-tone": toneOf(img) } as React.CSSProperties}
            >
              <img src={img.src} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.55)_brightness(0.7)]" />
              <div className="absolute inset-0 bg-[var(--hc-tone)] opacity-80 mix-blend-color" />
              <div className="absolute inset-0 bg-[var(--hc-tone)] opacity-55" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--hc-tone)_0%,transparent_45%),linear-gradient(180deg,transparent_60%,var(--hc-tone)_100%)] opacity-90" />
            </div>
          ))}
        </div>

        <div className="relative flex flex-col lg:absolute lg:inset-0 lg:block">
          {/* ---- Copy ---- */}
          <div className="relative z-20 px-[8cqw] pb-4 pt-14 lg:absolute lg:left-0 lg:top-1/2 lg:w-[46%] lg:-translate-y-[46%] lg:px-0 lg:pb-0 lg:pl-[14.8cqw] lg:pt-0">
            <p className="font-sans text-[clamp(1.25rem,3.6cqw,2.4rem)] font-light tracking-[0.04em] text-white/90">{title}</p>

            <div className="relative mt-[0.1em]">
              {/* The rule runs in from the section's left edge. */}
              <span
                aria-hidden
                className="absolute top-1/2 hidden h-[3px] -translate-y-1/2 bg-primary lg:block"
                style={{ left: "-14.8cqw", width: "8.4cqw" }}
              />
              <h1
                ref={headingRef}
                className="relative inline-block whitespace-nowrap font-sans text-[clamp(2.75rem,9.4cqw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-white"
              >
                {titleAccent}
                {cut !== null && (
                  <span
                    aria-hidden
                    className="absolute inset-0 transition-colors duration-[1400ms] ease-in-out [text-shadow:0_2px_24px_rgb(0_0_0/0.35)]"
                    style={{ color: titleOverlapColor, clipPath: `inset(-0.2em -0.1em -0.2em ${cut}px)` }}
                  >
                    {titleAccent}
                  </span>
                )}
              </h1>
            </div>

            {subtitle && (
              <p className="mt-[1.2em] max-w-[min(26rem,60cqw)] font-sans text-[clamp(0.85rem,1.5cqw,1.05rem)] font-light leading-[1.75] text-white/85 lg:max-w-[24cqw]">
                {subtitle}
              </p>
            )}
          </div>

          {/* ---- The honeycomb stage ---- */}
          <div
            ref={stageRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Photographs"
            className={cn(
              "relative z-10 mx-auto w-full max-w-[34rem] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-full lg:w-auto lg:max-w-none lg:overflow-visible",
              // Below the desktop layout the stage is cut by its own box, so the
              // cells dissolve into the teal at the top, right and foot instead
              // of ending on a hard line.
              "[mask-image:linear-gradient(to_right,black_84%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_7%,black_92%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:[mask-image:none]",
            )}
            style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
          >
            {cells.map((img, i) => {
              const k = slotOf(i, offset);
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  className="absolute will-change-[left,top,width]"
                  style={{ aspectRatio: `1 / ${HEX_H}` }}
                  aria-hidden={k !== 0}
                >
                  {/* A hair of inset keeps a gap between neighbours. */}
                  <div
                    className="absolute inset-[3.5%] overflow-hidden bg-[var(--hc-bg)] transition-[background-color] duration-[1400ms]"
                    style={{ clipPath: HEX_CLIP }}
                  >
                    <img src={img.src} alt={k === 0 ? img.alt : ""} draggable={false} className="h-full w-full object-cover" />
                    <div
                      className="absolute inset-0 bg-[var(--hc-bg)] transition-[opacity,background-color] duration-1000"
                      style={{ opacity: k === 0 ? 0 : 0.18 }}
                    />
                  </div>
                </div>
              );
            })}

            {/* The call to action: a primary cell in the honeycomb. A hairline
                hexagon inside it echoes the photographs around it; on hover the
                compass turns and the inner cell swells, on focus it goes solid. */}
            <div className="absolute z-40" style={{ ...CTA_SLOT, aspectRatio: `1 / ${HEX_H}` }}>
              <Link
                href={primaryActionHref}
                className="group absolute inset-[3.5%] grid place-items-center bg-primary text-primary-foreground outline-none transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.97]"
                style={{ clipPath: HEX_CLIP }}
              >
                <svg
                  aria-hidden
                  viewBox={`0 0 100 ${(100 * HEX_H).toFixed(2)}`}
                  preserveAspectRatio="none"
                  className="absolute inset-[11%] h-[78%] w-[78%] overflow-visible opacity-35 transition-[opacity,transform] duration-500 ease-out group-hover:opacity-70 group-focus-visible:opacity-100 motion-safe:group-hover:scale-105"
                >
                  <polygon
                    points={HEX_POINTS}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    className="group-focus-visible:[stroke-width:2]"
                  />
                </svg>
                <span className="relative flex flex-col items-center gap-[0.55em] text-center text-[clamp(0.65rem,1.65cqw,1.2rem)]">
                  <Compass
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-[1.85em] transition-transform duration-500 ease-out motion-safe:group-hover:rotate-45"
                  />
                  <span className="block whitespace-pre-line font-sans font-semibold leading-[1.15] tracking-[-0.01em]">
                    {primaryActionLabel}
                  </span>
                </span>
              </Link>
            </div>

            <span className="sr-only" aria-live="polite">
              {images[featureIndex]?.alt}
            </span>
          </div>

          {/* ---- Foot: arrows and links ---- */}
          <div className="relative z-20 flex flex-wrap items-center gap-x-[4cqw] gap-y-3 px-[8cqw] pb-8 pt-6 lg:absolute lg:bottom-[3.8%] lg:left-[2.6cqw] lg:p-0">
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => go(-1)} aria-label="Previous photograph" className={arrow}>
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photograph" className={arrow}>
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
            {socialLinks.length > 0 && (
              <nav aria-label="Social" className="flex flex-wrap items-center gap-x-[4cqw] gap-y-2 text-[clamp(0.65rem,1.1cqw,0.8rem)] tracking-[0.08em] text-white/70">
                {socialLinks.map((s) => (
                  <Link key={s.label} href={s.href} className="transition-colors hover:text-white">
                    {s.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>
    );
  },
);
HoneycombHero.displayName = "HoneycombHero";

export default HoneycombHero;
