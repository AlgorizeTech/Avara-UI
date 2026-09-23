"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// HONEYCOMB HERO
// A travel hero on a dark, shifting ground: a light line over a huge word in
// the theme's primary on the left, and on the right a honeycomb of hexagonal
// photographs with a primary hexagonal call to action set among them. The
// large hexagon is the slide on screen — its photograph is also the
// background, tinted with that photograph's own tone, so the colour behind
// everything changes with the slide — and the smaller ones are the queue.
// Every few seconds, or on the arrows at the foot, every hexagon moves one
// step along the honeycomb: the next photo grows into the feature spot while
// the feature slides to the back of the queue. The loop never ends. Where
// the huge word crosses the photographs, its letters take a light tint of
// the slide's tone. The section is always a dark surface, so it reads the
// theme's dark tokens.
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
  /** The huge, tracked, upper-case word in the accent colour. */
  titleAccent?: string;
  /**
   * The letters of the accent word that cross the photographs. A light tint
   * of the featured photograph's tone by default, easing with the slide.
   */
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
   * call to action. The theme's primary (its dark-mode value) by default.
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

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------
// Defaults — Lofoten and the fjords, from Unsplash, each with a deep tone
// drawn from the photograph, so the ground shifts colour as the queue turns.
// ------------------------------------------
const unsplash = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const DEFAULT_IMAGES: HoneycombImage[] = [
  { src: unsplash("1628344253777-f73a64d8f983"), alt: "A waterfall pouring through a green gorge", tone: "#0f2e22" },
  { src: unsplash("1663428520845-056989f8a664"), alt: "Red cabins at Hamnøy under a mountain", tone: "#1f2140" },
  { src: unsplash("1710762634126-4c0e8fba44d8"), alt: "A snowy village below white peaks", tone: "#18233a" },
  { src: unsplash("1593378026483-2a1fd46a35bd"), alt: "Green aurora above snowy mountains", tone: "#0b2a2d" },
  { src: unsplash("1695496896465-9e59091a8ed1"), alt: "Turquoise water between mountain ridges", tone: "#082f3d" },
  { src: unsplash("1721335916916-37c319adce3a"), alt: "A sandy beach beneath a rocky headland", tone: "#1d2b36" },
  { src: unsplash("1527004013197-933c4bb611b3"), alt: "A red cabin on a rocky shore", tone: "#2a1f3d" },
  { src: unsplash("1682952986992-de7082fb213d"), alt: "Waterfalls running down the wall of a fjord", tone: "#132a3b" },
  { src: unsplash("1607888566357-ec0b61abee46"), alt: "A waterfall beside a wooden viewpoint", tone: "#1c2b17" },
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
      titleOverlapColor = "color-mix(in oklab, var(--hc-bg) 30%, white)",
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
        const target = SLOTS[k];
        el.style.zIndex = String(k === 0 ? 30 : k === CELLS - 1 ? 5 : 20 - k);
        if (!animate) {
          gsap.set(el, target);
        } else {
          // A step taken mid-tween must not let the old tween run on through
          // the new one's stagger delay, so the old one is dropped first.
          gsap.killTweensOf(el);
          gsap.to(el, { ...target, duration: 1.15, ease: "power3.inOut", delay: k * 0.045 });
        }
      });
      placedRef.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, n]);

    // ---- The background follows the feature.
    useEffect(() => {
      const reduced = prefersReducedMotion();
      bgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, { opacity: i === featureIndex ? 1 : 0, duration: reduced ? 0 : 1.4, ease: "power2.inOut", overwrite: "auto" });
      });
    }, [featureIndex]);

    // ---- The accent word changes colour where it crosses the photographs:
    // a tinted copy is clipped at the stage's left edge.
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
          // Always a dark surface: `dark` makes the theme's tokens resolve to
          // their dark values, so the primary reads against the photographs.
          "dark relative isolate w-full overflow-hidden bg-[var(--hc-bg)] text-white transition-[background-color] duration-[1400ms] ease-in-out [container-type:inline-size]",
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
                className="relative inline-block whitespace-nowrap font-sans text-[clamp(2.75rem,9.4cqw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-[0.02em] text-primary"
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

            {/* The call to action: a primary hexagon set among the photographs. */}
            <div className="absolute z-40" style={{ ...CTA_SLOT, aspectRatio: `1 / ${HEX_H}` }}>
              <Link
                href={primaryActionHref}
                className="group absolute inset-[3.5%] flex flex-col items-end justify-end bg-primary pb-[22%] pr-[14%] text-right text-primary-foreground outline-none transition-[transform,filter] duration-300 hover:brightness-105 focus-visible:brightness-110 active:scale-[0.98]"
                style={{ clipPath: HEX_CLIP }}
              >
                <span className="mb-[6%] block text-[clamp(0.5rem,1.3cqw,0.9rem)] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                  ▶
                </span>
                <span className="block whitespace-pre-line font-sans text-[clamp(0.55rem,1.35cqw,0.95rem)] font-extrabold uppercase leading-[1.25] tracking-[0.12em]">
                  {primaryActionLabel}
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
