"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedTypographyBlock } from "./AnimatedTypographyBlock";
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";

// ==========================================
// HERO CAROUSEL
// A full-bleed photo hero for a place worth travelling to: an eyebrow pill, a
// large light headline, a glass panel with the people who came before you and
// a call to action, and — the thing that moves — a queue of cards. The front
// card is the slide on screen; the ones behind it are what comes next. Every
// five seconds, or on a click, the queue slides forward, the photograph behind
// everything crossfades and the caption follows.
// ==========================================

export interface HeroSlide {
  /** The photograph: shown full-bleed behind the section and inside its card. */
  image: string;
  alt: string;
  /** Short name of the experience, under the front card. */
  title: string;
  /** One or two lines under the title. */
  description?: string;
  /** Replaces the section `heading` while this slide is in front. */
  heading?: React.ReactNode;
  /** CSS object-position for the crop. */
  position?: string;
}

export interface HeroCarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  slides: HeroSlide[];
  /** The small pill above the headline. */
  eyebrow?: string;
  /** The headline, used whenever the front slide has none of its own. */
  heading?: React.ReactNode;
  /** The paragraph in the glass panel. */
  intro?: string;
  avatars?: StackAvatar[];
  /** Beside the faces, e.g. "50+ travellers this season". */
  avatarsLabel?: string;
  cta?: { label: string; href: string };
  /** Milliseconds between slides. `0` turns autoplay off. */
  interval?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** Sets `--primary` for the section: the eyebrow pip, the arrow on the call to action, the progress line, the focus rings and a tint in the ground. */
  accent?: string;
  reveal?: "in-view" | "immediate";
  /** Pass `next/link` to keep client-side navigation on the CTA. */
  linkComponent?: React.ElementType;
}

// ------------------------------------------
// Rail geometry: the queue is laid out by hand so the cards can tween between
// positions. Sizes come from the rail's measured width, not the viewport, so
// the same numbers work whether the rail shares its row with the panel or not.
// ------------------------------------------
interface RailMetrics {
  bigW: number;
  bigH: number;
  smallW: number;
  smallH: number;
  gap: number;
  /** Height of the whole rail: the front card plus its caption. */
  railH: number;
}

/** Room under the front card for its title and two lines. */
const CAPTION_SPACE = 92;

function railMetrics(width: number): RailMetrics {
  if (width < 520) {
    // Phones: the queued cards match the front card's height, so they stay
    // portrait rather than becoming slivers; the caption has the row to itself.
    const bigW = Math.round(width * 0.6);
    const bigH = Math.round(bigW * 0.8);
    return { bigW, bigH, smallW: Math.round(width * 0.3), smallH: bigH, gap: 10, railH: bigH + CAPTION_SPACE - 14 };
  }
  if (width < 780) {
    return { bigW: 240, bigH: 188, smallW: 130, smallH: 188 + CAPTION_SPACE, gap: 12, railH: 188 + CAPTION_SPACE };
  }
  return { bigW: 288, bigH: 224, smallW: 158, smallH: 224 + CAPTION_SPACE, gap: 14, railH: 224 + CAPTION_SPACE };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------
// Motion, with no library: GSAP's power3.out, power3.inOut and power2.out as
// CSS easings, run through the Web Animations API so a move can be dropped
// where it stands and the next one start from there.
// ------------------------------------------
const EASE_OUT =
  "linear(0, .1945, .3591, .4971, .6115, .7052, .7808, .8409, .8877, .9233, .9497, .9686, .9816, .9901, .9952, .998, .9994, .9999, 1, 1)";
const EASE_TRAVEL =
  "linear(0, 0, .0002, .0012, .0039, .0094, .0195, .0361, .0617, .0988, .1505, .2204, .3121, .4299, .5701, .6879, .7796, .8495, .9012, .9383, .9639, .9805, .9906, .9961, .9988, .9998, 1, 1)";
const EASE_SETTLE = "cubic-bezier(0.3333, 1, 0.6667, 1)";

/** `el.animate`, or nothing where the engine cannot run these easings. */
function play(el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
  if (typeof el.animate !== "function") return null;
  try {
    return el.animate(keyframes, options);
  } catch {
    return null;
  }
}

// The progress line fills once per slide; its end moves the queue.
const PROGRESS_CSS = "@keyframes hc-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }";

// ------------------------------------------
// Root
// ------------------------------------------
export function HeroCarousel({
  slides,
  eyebrow,
  heading,
  intro,
  avatars,
  avatarsLabel,
  cta,
  interval = 5000,
  defaultIndex = 0,
  onChange,
  accent,
  reveal = "in-view",
  linkComponent: Link = "a",
  className,
  style,
  ...props
}: HeroCarouselProps) {
  const n = slides.length;
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const movesRef = useRef(new WeakMap<Element, Animation>());
  const fadesRef = useRef(new WeakMap<Element, Animation>());
  const driftsRef = useRef(new WeakMap<Element, Animation>());
  const driftRef = useRef<Animation | null>(null);
  const queueRef = useRef<number[]>([]);
  const swipe = useRef<{ x: number; moved: boolean } | null>(null);

  const [active, setActive] = useState(() => Math.min(Math.max(defaultIndex, 0), Math.max(n - 1, 0)));
  const [leaving, setLeaving] = useState<number | null>(null);
  const [railWidth, setRailWidth] = useState(0);
  const [inView, setInView] = useState(reveal === "immediate");
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  const metrics = railWidth > 0 ? railMetrics(railWidth) : null;

  const activeRef = useRef(active);
  activeRef.current = active;
  const go = useCallback(
    (index: number) => {
      if (n === 0) return;
      const next = ((index % n) + n) % n;
      const current = activeRef.current;
      if (current === next) return;
      setLeaving(current);
      setActive(next);
    },
    [n],
  );

  useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  // ---- Measure the rail. Cards are positioned from these numbers.
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => setRailWidth(rail.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  // ---- Lay the queue out. The front card is `active`; the rest follow in order.
  // A card that moves backwards in the queue slides there; one sent to the back
  // appears at its new place instead of flying across the others. The queue
  // position is the card's `translate`, so it never meets the reveal's
  // `transform`.
  useLayoutEffect(() => {
    if (!metrics) return;
    const reduced = prefersReducedMotion();
    const first = queueRef.current.length !== n;
    slides.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const k = (i - active + n) % n;
      const x = k === 0 ? 0 : metrics.bigW + metrics.gap + (k - 1) * (metrics.smallW + metrics.gap);
      const target = {
        translate: `${x}px 0px`,
        width: `${k === 0 ? metrics.bigW : metrics.smallW}px`,
        height: `${k === 0 ? metrics.bigH : metrics.smallH}px`,
      };
      el.style.zIndex = String(n - k);
      const prevK = queueRef.current[i];
      // Placing a card always drops a slide still running on it; left to run,
      // the old slide would carry the card back to where it was heading (a
      // card could stay stuck at the front after quick clicks).
      const running = movesRef.current.get(el);
      movesRef.current.delete(el);
      if (first || reduced || prevK === k) {
        running?.cancel();
        Object.assign(el.style, target);
      } else if (k > prevK) {
        running?.cancel();
        Object.assign(el.style, target);
        fadesRef.current.get(el)?.cancel();
        const fade = play(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: 350, easing: EASE_SETTLE, fill: "backwards" });
        if (fade) fadesRef.current.set(el, fade);
      } else {
        // From wherever the card is on screen, the full length again.
        const cs = getComputedStyle(el);
        const from = { translate: cs.translate, width: cs.width, height: cs.height };
        running?.cancel();
        Object.assign(el.style, target);
        const move = play(el, [from, target], { duration: 950, easing: EASE_TRAVEL });
        if (move) movesRef.current.set(el, move);
      }
      queueRef.current[i] = k;
    });
    // The metrics object is derived from railWidth; that is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, railWidth, n]);

  // ---- The photograph behind everything: swap, settle, then drift. The
  // layers' opacity comes straight from render, so the swap is a cut.
  useEffect(() => {
    const incoming = bgRefs.current[active];
    if (!incoming) return;
    const img = incoming.querySelector("img");
    const reduced = prefersReducedMotion();
    // The drift that was running stops where it is: its photograph keeps
    // that scale.
    const previous = driftRef.current;
    driftRef.current = null;
    if (previous) {
      try {
        previous.commitStyles();
        previous.cancel();
      } catch {
        previous.pause();
      }
    }
    if (!img) return;
    driftsRef.current.get(img)?.cancel();
    driftsRef.current.delete(img);
    if (reduced) {
      img.style.transform = "scale(1)";
      return;
    }
    // Settle from 1.08 to 1 over 1.6s, then creep to 1.05 until well past the next slide.
    const drift = Math.max(interval / 1000, 4) + 3;
    const total = 1.6 + drift;
    const anim = play(
      img,
      [
        { transform: "scale(1.08)", easing: EASE_SETTLE },
        { transform: "scale(1)", offset: 1.6 / total, easing: "linear" },
        { transform: "scale(1.05)" },
      ],
      { duration: total * 1000, fill: "forwards" },
    );
    if (anim) {
      driftRef.current = anim;
      driftsRef.current.set(img, anim);
    }
  }, [active, interval]);

  // ---- The slide that just left keeps its "leaving" state until its
  // transition has run, then goes back to idle.
  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), 700);
    return () => window.clearTimeout(t);
  }, [leaving, active]);

  // ---- Autoplay is the progress line: when it fills, the queue moves. Pausing
  // the line pauses the clock, so a hover never loses the time already spent.
  // (The line is a CSS animation on the front card; see `onProgressEnd`.)
  const paused = hover || hidden || !onScreen || !inView;
  const onProgressEnd = (e: React.AnimationEvent<HTMLSpanElement>) => {
    if (e.target === e.currentTarget && e.animationName === "hc-progress") go(active + 1);
  };

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        setOnScreen(hit);
        if (hit) setInView(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- The reveal: eyebrow and headline out of a blur, the panel up, the
  // cards one after another. Plays once, the first time the section is seen.
  // Keyed on booleans, not on `metrics` (a fresh object every render): any
  // re-render — a resize, a hover, props arriving — would otherwise run the
  // cleanup and kill the timeline mid-play, leaving everything blurred out.
  const measured = metrics !== null;
  const revealed = useRef(false);
  const revealAnims = useRef<Animation[]>([]);
  useEffect(() => {
    if (!inView || !measured || revealed.current) return;
    revealed.current = true;
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    // A reveal cut short earlier is still frozen where it stopped.
    revealAnims.current.forEach((a) => a.cancel());
    const anims: Animation[] = [];
    // Each element starts `start + i * each` seconds in, held at its start pose until then.
    const rise = (selector: string, from: Keyframe, to: Keyframe, duration: number, start: number, each = 0) =>
      root.querySelectorAll(selector).forEach((el, i) => {
        const a = play(el, [from, to], {
          duration: duration * 1000,
          delay: (start + i * each) * 1000,
          easing: EASE_OUT,
          fill: "backwards",
        });
        if (a) anims.push(a);
      });
    const shown = { opacity: 1, transform: "translateY(0px)" };
    rise("[data-hc-lead]", { opacity: 0, transform: "translateY(22px)", filter: "blur(10px)" }, { ...shown, filter: "blur(0px)" }, 0.9, 0, 0.12);
    rise("[data-hc-card]", { opacity: 0, transform: "translateY(28px)" }, shown, 0.9, 0.35, 0.08);
    rise("[data-hc-captions]", { opacity: 0, transform: "translateY(10px)" }, shown, 0.6, 0.8);
    rise("[data-hc-panel]", { opacity: 0, transform: "translateY(18px)" }, shown, 0.8, 0.55);
    revealAnims.current = anims;
    return () => {
      // Reached on unmount, a StrictMode remount, or the rail measuring 0 while
      // hidden. An entrance cut short replays next time rather than staying frozen.
      if (anims.some((a) => a.playState !== "finished")) {
        revealed.current = false;
        anims.forEach((a) => a.pause());
      }
    };
  }, [inView, measured]);

  // ---- Keyboard and touch: arrows walk the queue, a swipe on the rail too.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!swipe.current) return;
    if (Math.abs(e.clientX - swipe.current.x) > 12) swipe.current.moved = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? active + 1 : active - 1);
  };

  const vars = { ...(accent ? { "--primary": accent } : {}) } as React.CSSProperties;
  const front = slides[active];
  const railHeight = metrics ? metrics.railH : 320;

  return (
    <section
      ref={rootRef}
      className={cn("relative isolate w-full overflow-hidden bg-[color-mix(in_oklab,var(--primary)_12%,#0b0c0f)] text-white", className)}
      style={{ ...vars, ...style }}
      {...props}
    >
      <style>{PROGRESS_CSS}</style>
      {/* ---- The photographs, one on top of the other; the front slide's is opaque. */}
      <div className="absolute inset-0" aria-hidden>
        {slides.map((s, i) => (
          <div
            key={s.image + i}
            ref={(el) => {
              bgRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-[opacity]"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt=""
              draggable={false}
              style={s.position ? { objectPosition: s.position } : undefined}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />
          </div>
        ))}
        {/* The scrim: dark along the top for the headline, darker along the foot for the panel and the rail. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.06)_38%,rgba(0,0,0,0.14)_62%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* No viewport units here: the section takes the height it needs and a
          consumer who wants it screen-tall passes `className="lg:h-svh"`. */}
      <div className="relative mx-auto flex h-full min-h-[38rem] max-w-7xl flex-col px-5 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-16 lg:min-h-[44rem] lg:pt-20">
        {/* ---- Eyebrow and headline ---- */}
        <div className="text-center">
          {eyebrow && (
            <span
              data-hc-lead=""
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {eyebrow}
            </span>
          )}
          <div data-hc-lead="" className="mx-auto mt-5 grid max-w-[46rem] sm:mt-6">
            {/* The headline follows the front slide, blurring across. */}
            <AnimatedTypographyBlock
              as="h1"
              bare
              variant="blur-swap"
              index={active}
              words={slides.map((s) => s.heading ?? heading)}
              className="text-balance font-sans text-[2.35rem] font-light leading-[1.04] tracking-[-0.025em] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-[3.3rem] lg:text-[4.2rem] xl:text-[4.6rem]"
            />
          </div>
        </div>

        {/* ---- Panel and rail ---- */}
        <div className="mt-10 grid items-end gap-6 sm:mt-12 lg:mt-auto lg:grid-cols-[minmax(17rem,21rem)_minmax(0,1fr)] lg:gap-10">
          <div
            data-hc-panel=""
            className="order-2 w-full max-w-[28rem] rounded-[26px] border border-white/15 bg-white/10 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6 lg:order-1 lg:max-w-none"
          >
            {(avatars?.length || avatarsLabel) && (
              <div className="flex items-center gap-3">
                {avatars && avatars.length > 0 && (
                  <AvatarStack avatars={avatars} size="md" max={4} ringClassName="ring-white/30" spreadOnHover />
                )}
                {avatarsLabel && <span className="text-[13px] font-medium text-white/90">{avatarsLabel}</span>}
              </div>
            )}
            {intro && <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.6] text-white/80">{intro}</p>}
            {cta && (
              <Link
                href={cta.href}
                className="group/cta mt-5 inline-flex h-11 items-center gap-3 rounded-full border border-white/25 bg-white/10 py-1 pl-5 pr-1.5 text-[14px] font-semibold text-white outline-none backdrop-blur-md transition-[background-color,transform] duration-300 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-primary/70 active:scale-[0.98]"
              >
                {cta.label}
                <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/cta:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            )}
          </div>

          <div
            ref={railRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Experiences"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={(e) => {
              // Only a keyboard focus holds the clock; a mouse click focuses too but the pointer is already pausing it.
              if ((e.target as HTMLElement).matches?.(":focus-visible")) setHover(true);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHover(false);
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipe.current = null;
            }}
            className="relative order-1 w-full touch-pan-y select-none outline-none [mask-image:linear-gradient(to_right,black_82%,transparent)] lg:order-2"
            style={{ height: railHeight, visibility: metrics ? "visible" : "hidden" }}
          >
            {slides.map((s, i) => {
              const isFront = i === active;
              return (
                <button
                  key={s.image + i}
                  type="button"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-hc-card=""
                  aria-label={isFront ? `${s.title} (showing)` : `Show ${s.title}`}
                  aria-current={isFront ? "true" : undefined}
                  onClick={(e) => {
                    if (swipe.current?.moved) {
                      e.preventDefault();
                      return;
                    }
                    go(isFront ? active + 1 : i);
                  }}
                  className={cn(
                    "group absolute left-0 top-0 overflow-hidden rounded-[18px] outline-none ring-white/80 ring-offset-2 ring-offset-transparent will-change-[transform,width,height] focus-visible:ring-2 sm:rounded-[22px]",
                    !isFront && "cursor-pointer",
                  )}
                >
                  <img
                    src={s.image}
                    alt={s.alt}
                    draggable={false}
                    style={s.position ? { objectPosition: s.position } : undefined}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
                      !isFront && "group-hover:scale-[1.06]",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 transition-opacity duration-500",
                      isFront ? "opacity-60" : "opacity-100 group-hover:opacity-70",
                    )}
                  />
                  <span aria-hidden className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
                  {isFront && interval > 0 && n > 1 && (
                    <span aria-hidden className="absolute inset-x-4 bottom-3 h-[3px] overflow-hidden rounded-full bg-white/30">
                      <span
                        // A new interval or queue length starts the line again.
                        key={`${interval}:${n}`}
                        onAnimationEnd={onProgressEnd}
                        className="block h-full w-full origin-left rounded-full bg-primary"
                        // Held until the rail is measured, which only happens once the page is live.
                        style={{
                          transform: "scaleX(0)",
                          animationName: "hc-progress",
                          animationDuration: `${interval}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                          animationPlayState: paused || !metrics ? "paused" : "running",
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}

            {/* The caption sits under the front card and swaps with it. */}
            {metrics && (
              <div
                data-hc-captions=""
                className="absolute left-0 grid"
                style={{ top: metrics.bigH + 14, width: metrics.bigW }}
              >
                {slides.map((s, i) => {
                  const state = i === active ? "active" : i === leaving ? "leaving" : "idle";
                  return (
                    <div
                      key={s.image + i}
                      aria-hidden={i !== active}
                      className={cn(
                        "col-start-1 row-start-1 transition-[opacity,transform,filter] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                        state === "active" && "opacity-100 delay-200",
                        state === "leaving" && "-translate-y-2 opacity-0 blur-[4px]",
                        state === "idle" && "translate-y-3 opacity-0 blur-[4px] transition-none",
                      )}
                    >
                      <p className="text-[15px] font-semibold leading-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">{s.title}</p>
                      {s.description && (
                        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white/75 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">{s.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <span className="sr-only" aria-live="polite">
              {front ? `Slide ${active + 1} of ${n}: ${front.title}` : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroCarousel.metrics = railMetrics;

export default HeroCarousel;
