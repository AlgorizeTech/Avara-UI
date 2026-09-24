"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  /** Beside the faces, e.g. "50+ people joined". */
  avatarsLabel?: string;
  cta?: { label: string; href: string };
  /** Milliseconds between slides. `0` turns autoplay off. */
  interval?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** Sets `--primary` for the section (focus rings and the eyebrow pip). */
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
// Root
// ------------------------------------------
function HeroCarouselRoot({
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
  const barRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<gsap.core.Tween | null>(null);
  const driftRef = useRef<gsap.core.Timeline | null>(null);
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
  // appears at its new place instead of flying across the others.
  useLayoutEffect(() => {
    if (!metrics) return;
    const reduced = prefersReducedMotion();
    const first = queueRef.current.length !== n;
    slides.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const k = (i - active + n) % n;
      const target =
        k === 0
          ? { x: 0, width: metrics.bigW, height: metrics.bigH }
          : { x: metrics.bigW + metrics.gap + (k - 1) * (metrics.smallW + metrics.gap), width: metrics.smallW, height: metrics.smallH };
      el.style.zIndex = String(n - k);
      const prevK = queueRef.current[i];
      if (first || reduced || prevK === k) {
        gsap.set(el, target);
      } else if (k > prevK) {
        gsap.set(el, { ...target, opacity: 0 });
        gsap.to(el, { opacity: 1, duration: 0.6, delay: 0.35, ease: "power2.out", overwrite: "auto" });
      } else {
        gsap.to(el, { ...target, duration: 0.95, ease: "power3.inOut", overwrite: "auto" });
      }
      queueRef.current[i] = k;
    });
    // The metrics object is derived from railWidth; that is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, railWidth, n]);

  // ---- The photograph behind everything: crossfade, settle, then drift.
  useEffect(() => {
    const incoming = bgRefs.current[active];
    if (!incoming) return;
    const img = incoming.querySelector("img");
    const reduced = prefersReducedMotion();
    driftRef.current?.kill();
    bgRefs.current.forEach((el, i) => {
      if (!el || i === active) return;
      gsap.to(el, { opacity: 0, duration: reduced ? 0 : 1.2, ease: "power2.inOut", overwrite: "auto" });
    });
    gsap.to(incoming, { opacity: 1, duration: reduced ? 0 : 1.2, ease: "power2.inOut", overwrite: "auto" });
    if (img && !reduced) {
      driftRef.current = gsap
        .timeline()
        .fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power2.out" })
        .to(img, { scale: 1.05, duration: Math.max(interval / 1000, 4) + 3, ease: "none" });
    } else if (img) {
      gsap.set(img, { scale: 1 });
    }
  }, [active, interval]);

  // ---- The headline that just left keeps its "leaving" state until its
  // transition has run, then goes back to idle.
  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), 700);
    return () => window.clearTimeout(t);
  }, [leaving, active]);

  // ---- Autoplay is the progress line: when it fills, the queue moves. Pausing
  // the line pauses the clock, so a hover never loses the time already spent.
  const paused = hover || hidden || !onScreen || !inView;
  useEffect(() => {
    progressRef.current?.kill();
    const bar = barRef.current;
    if (!bar || interval <= 0 || n < 2) return;
    progressRef.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: interval / 1000, ease: "none", paused, onComplete: () => go(active + 1) },
    );
    return () => {
      progressRef.current?.kill();
    };
    // `paused` is applied by the effect below rather than restarting the tween.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, interval, n, go]);

  useEffect(() => {
    const tween = progressRef.current;
    if (!tween) return;
    if (paused) tween.pause();
    else tween.resume();
  }, [paused]);

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
  useEffect(() => {
    if (!inView || !measured || revealed.current) return;
    revealed.current = true;
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const lead = root.querySelectorAll("[data-hc-lead]");
    const panel = root.querySelectorAll("[data-hc-panel]");
    const cards = root.querySelectorAll("[data-hc-card]");
    const caption = root.querySelectorAll("[data-hc-captions]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(lead, { opacity: 0, y: 22, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12 }, 0)
      .fromTo(cards, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35)
      .fromTo(caption, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
      .fromTo(panel, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.55);
    return () => {
      // Reached on unmount, a StrictMode remount, or the rail measuring 0 while
      // hidden. An entrance cut short replays next time rather than staying frozen.
      if (tl.progress() < 1) revealed.current = false;
      tl.kill();
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
      className={cn("relative isolate w-full overflow-hidden bg-[#0f1013] text-white", className)}
      style={{ ...vars, ...style }}
      {...props}
    >
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
            {slides.map((s, i) => {
              const state = i === active ? "active" : i === leaving ? "leaving" : "idle";
              return (
                <h1
                  key={s.image + i}
                  data-state={state}
                  aria-hidden={i !== active}
                  className={cn(
                    "col-start-1 row-start-1 text-balance font-sans text-[2.35rem] font-light leading-[1.04] tracking-[-0.025em] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-[3.3rem] lg:text-[4.2rem] xl:text-[4.6rem]",
                    "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    state === "active" && "opacity-100 blur-0 delay-150",
                    state === "leaving" && "-translate-y-3 opacity-0 blur-[6px]",
                    state === "idle" && "translate-y-4 opacity-0 blur-[8px] transition-none",
                  )}
                >
                  {s.heading ?? heading}
                </h1>
              );
            })}
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
                <span className="grid size-8 place-items-center rounded-full bg-white text-[#111] transition-transform duration-300 group-hover/cta:rotate-45">
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
                      <span ref={barRef} className="block h-full w-full origin-left rounded-full bg-white" style={{ transform: "scaleX(0)" }} />
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

export const HeroCarousel = Object.assign(HeroCarouselRoot, { metrics: railMetrics });

export default HeroCarousel;
