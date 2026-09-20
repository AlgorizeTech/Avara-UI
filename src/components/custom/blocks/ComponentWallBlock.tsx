"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";
import { HalfStars } from "./HalfStarsBlock";

// ==========================================
// COMPONENT WALL
// A landing hero for a component library: the copy on the left, and on the
// right a wall of screenshots that never ends. A camera hangs over the wall,
// zoomed in on one card; every few seconds it pulls back, glides to another
// card picked at random, and settles on it. The wall is one tile of cards in
// masonry columns, repeated around itself so the camera never finds an edge.
// ==========================================

export interface WallItem {
  /** Small mono caption at the top of the card. */
  title: string;
  /** The screenshot, cropped from the top into a 493:332 frame. */
  image: string;
}

export interface ComponentWallProps extends Omit<React.HTMLAttributes<HTMLElement>, "onFocus"> {
  /** The pill above the headline: a label, a short note after the divider, and where it goes. */
  badge?: { label: string; text?: string; href?: string; icon?: React.ReactNode };
  heading: React.ReactNode;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  /** The trust line under the actions: the sentence, the faces and the stars. */
  trust?: { text: string; avatars?: StackAvatar[]; rating?: number };
  /** The cards on the wall, in reading order down the columns. */
  items: WallItem[];
  /** Masonry columns in one tile. */
  columns?: number;
  /** Milliseconds the camera rests on a card before moving on. `0` holds still. */
  interval?: number;
  /**
   * How the camera walks the wall: `serial` goes card by card in order;
   * `shuffle` visits every card once per round in a random order. Either
   * way no card comes round again before all the others have had a turn.
   */
  order?: "serial" | "shuffle";
  /** Camera scale while resting on a card. */
  zoom?: number;
  /** Called with the index of the card the camera has settled on. */
  onFocus?: (index: number) => void;
  /** Pass `next/link` to keep client-side navigation. */
  linkComponent?: React.ElementType;
}

// ------------------------------------------
// The wall's geometry, in wall units: 400 per column, 384-wide cards, 16
// between rows; every other column starts 72 lower so the rows stagger.
// ------------------------------------------
const COL_W = 400;
const CARD_W = 384;
const GAP = 16;
const STAGGER = 72;
const FLIGHT_ZOOM = 0.86;
// Inside the card: a 1px border, 6 of padding each side, a 16-tall caption, 6 below it.
const CARD_BORDER = 1;
const CARD_PAD = 6;
const CAPTION_H = 16;
const FRAME_W = CARD_W - (CARD_BORDER + CARD_PAD) * 2;
/** Every screenshot sits in the same 493:332 frame. */
const FRAME_RATIO = 493 / 332;
const FRAME_H = Math.round(FRAME_W / FRAME_RATIO);
const CARD_H = CARD_BORDER + CARD_PAD + CAPTION_H + CARD_PAD + FRAME_H + CARD_PAD + CARD_BORDER;

interface Placed extends WallItem {
  left: number;
  top: number;
}

function layout(items: WallItem[], columns: number) {
  const bottoms = Array.from({ length: columns }, (_, c) => (c % 2 ? STAGGER : 0));
  const placed: Placed[] = items.map((item, i) => {
    const c = i % columns;
    const card = { ...item, left: c * COL_W, top: bottoms[c] };
    bottoms[c] += CARD_H + GAP;
    return card;
  });
  return { placed, width: columns * COL_W, height: Math.max(...bottoms) };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------
// Root
// ------------------------------------------
export const ComponentWall = forwardRef<HTMLElement, ComponentWallProps>(
  (
    {
      badge,
      heading,
      description,
      primaryAction,
      secondaryAction,
      trust,
      items,
      columns = 4,
      interval = 4500,
      order = "serial",
      zoom = 1.35,
      onFocus,
      linkComponent: Link = "a",
      className,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef({ x: 0, y: 0, s: zoom });
    const flightRef = useRef<gsap.core.Timeline | null>(null);

    const { placed, width, height } = useMemo(() => layout(items, columns), [items, columns]);
    const n = placed.length;

    const [focus, setFocus] = useState(0);
    const focusRef = useRef(0);
    focusRef.current = focus;
    const [flying, setFlying] = useState(false);
    const [hover, setHover] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [onScreen, setOnScreen] = useState(true);

    const paint = useCallback(() => {
      const el = canvasRef.current;
      if (!el) return;
      const { x, y, s } = cameraRef.current;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    }, []);

    // Where the camera rests to hold card `i` in the middle of the window.
    const restFor = useCallback(
      (i: number) => {
        const wrap = wrapRef.current;
        const card = placed[i];
        if (!wrap || !card) return { x: 0, y: 0, s: zoom };
        const W = wrap.clientWidth;
        const H = wrap.clientHeight;
        // A short window (the stacked layouts) pulls the camera back so a few
        // cards show at once instead of one card spilling out of the band.
        const s = H < 420 ? Math.min(zoom, 0.72) : zoom;
        const cx = card.left + CARD_W / 2;
        const cy = card.top + CARD_H / 2;
        return { x: W / 2 - s * cx, y: H / 2 - s * cy, s };
      },
      [placed, zoom],
    );

    // ---- First frame, and every resize: snap to the focused card.
    useLayoutEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const snap = () => {
        if (flightRef.current?.isActive()) return;
        cameraRef.current = restFor(focusRef.current);
        paint();
      };
      snap();
      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(snap);
      ro.observe(wrap);
      return () => ro.disconnect();
    }, [restFor, paint]);

    // ---- The flight: pull back while gliding, then settle in.
    const flyTo = useCallback(
      (i: number) => {
        const target = restFor(i);
        flightRef.current?.kill();
        if (prefersReducedMotion()) {
          cameraRef.current = target;
          paint();
          setFocus(i);
          return;
        }
        setFlying(true);
        const cam = cameraRef.current;
        flightRef.current = gsap
          .timeline({
            onUpdate: paint,
            onComplete: () => {
              setFlying(false);
              setFocus(i);
            },
          })
          .to(cam, { s: FLIGHT_ZOOM, duration: 1, ease: "power2.inOut" }, 0)
          .to(cam, { x: target.x, y: target.y, duration: 2, ease: "power2.inOut" }, 0)
          .to(cam, { s: target.s, duration: 1, ease: "power2.inOut" }, 1);
      },
      [restFor, paint],
    );

    useEffect(() => {
      onFocus?.(focus);
    }, [focus, onFocus]);

    // ---- Rest, then move on. In `serial` the next card is simply the next
    // one; in `shuffle` a round is a random permutation and every card gets
    // its turn before a new round starts (which never opens on the card that
    // just closed the last one).
    const roundRef = useRef<number[]>([]);
    const nextCard = useCallback(() => {
      const current = focusRef.current;
      if (order === "serial") return (current + 1) % n;
      if (roundRef.current.length === 0) {
        const round = Array.from({ length: n }, (_, i) => i);
        for (let i = round.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [round[i], round[j]] = [round[j], round[i]];
        }
        if (round[0] === current && n > 1) [round[0], round[n - 1]] = [round[n - 1], round[0]];
        roundRef.current = round;
      }
      return roundRef.current.shift() ?? (current + 1) % n;
    }, [order, n]);

    const paused = hover || hidden || !onScreen;
    useEffect(() => {
      if (interval <= 0 || n < 2 || paused || flying) return;
      const t = window.setTimeout(() => flyTo(nextCard()), interval);
      return () => window.clearTimeout(t);
    }, [focus, interval, n, paused, flying, flyTo, nextCard]);

    useEffect(
      () => () => {
        flightRef.current?.kill();
      },
      [],
    );

    useEffect(() => {
      const onVisibility = () => setHidden(document.hidden);
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    useEffect(() => {
      const el = rootRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver((entries) => setOnScreen(entries.some((e) => e.isIntersecting)), { threshold: 0.15 });
      io.observe(el);
      return () => io.disconnect();
    }, []);

    // The tile and its eight neighbours, so the camera never sees an edge.
    const offsets = useMemo(() => {
      const out: { dx: number; dy: number }[] = [];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) out.push({ dx, dy });
      return out;
    }, []);

    return (
      <section
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("relative w-full overflow-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50", className)}
        {...props}
      >
        <div className="relative flex w-full flex-col items-center lg:min-h-[44rem] lg:flex-row">
          {/* ---- Copy ---- */}
          <div className="relative z-30 mx-auto flex w-full max-w-[84rem] items-center px-4">
            <div className="flex w-full flex-col items-start px-2 py-10 md:px-8 lg:w-[44%] lg:py-16 xl:w-[42%] xl:px-0">
              {badge && (
                <Link
                  href={badge.href ?? "#"}
                  className="group relative mb-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 py-1 pl-2 pr-4 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-800/60"
                >
                  <span className="grid size-5 place-items-center text-amber-500" aria-hidden>
                    {badge.icon ?? <Sparkles size={14} />}
                  </span>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">{badge.label}</span>
                  {badge.text && (
                    <>
                      <span className="inline-block h-4 w-px bg-neutral-200 dark:bg-neutral-700" aria-hidden />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">{badge.text}</span>
                    </>
                  )}
                  <ArrowRight size={12} className="text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}

              <h1 className="relative mt-4 max-w-3xl text-balance text-left font-sans text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl xl:text-5xl xl:leading-[1.02] dark:text-neutral-50">
                {heading}
              </h1>

              {description && (
                <p className="relative mt-5 max-w-xl text-pretty text-left text-sm tracking-wide text-neutral-600 antialiased sm:text-base dark:text-neutral-400">
                  {description}
                </p>
              )}

              {(primaryAction || secondaryAction) && (
                <div className="relative mt-8 flex w-full flex-col justify-center gap-y-2 sm:flex-row sm:justify-start sm:gap-x-4">
                  {primaryAction && (
                    <Link
                      href={primaryAction.href}
                      className="flex h-14 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-neutral-900 px-6 text-base font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring-1 ring-inset ring-white/20 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 active:scale-[0.98] sm:w-auto dark:bg-white dark:text-neutral-900 dark:ring-black/10"
                    >
                      {primaryAction.label}
                    </Link>
                  )}
                  {secondaryAction && (
                    <Link
                      href={secondaryAction.href}
                      className="flex h-14 w-full items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-white px-6 text-base font-medium text-black shadow-sm shadow-black/10 ring-1 ring-black/10 transition duration-150 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-[0.98] sm:w-auto dark:bg-neutral-900 dark:text-white dark:ring-white/15 dark:hover:bg-neutral-800"
                    >
                      {secondaryAction.label}
                    </Link>
                  )}
                </div>
              )}

              {trust && (
                <div className="mt-8 flex flex-col items-start">
                  <p className="mb-4 text-left text-sm text-neutral-500 md:text-xs lg:text-base dark:text-neutral-400">{trust.text}</p>
                  <div className="flex flex-row flex-wrap items-center gap-3">
                    {trust.avatars && trust.avatars.length > 0 && (
                      <AvatarStack avatars={trust.avatars} size="lg" max={7} ringClassName="ring-white dark:ring-neutral-950" />
                    )}
                    {typeof trust.rating === "number" && <HalfStars rating={trust.rating} size={16} activeColor="#f59e0b" showText={false} />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ---- The wall ---- */}
          <div
            ref={wrapRef}
            role="img"
            aria-label={placed[focus] ? `Component preview: ${placed[focus].title}` : "Component previews"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative h-80 w-full overflow-hidden [mask-image:linear-gradient(to_left,black_85%,transparent_100%)] sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%] lg:[mask-image:linear-gradient(to_left,black_75%,transparent_100%)] xl:w-[60%]"
          >
            <div
              ref={canvasRef}
              className="absolute left-0 top-0 will-change-transform"
              style={{ width, height, transformOrigin: "0 0" }}
            >
              {offsets.map(({ dx, dy }) => {
                const copy = dx !== 0 || dy !== 0;
                return placed.map((card, i) => {
                  const isFocus = !copy && i === focus && !flying;
                  return (
                    <figure
                      key={`${dx},${dy},${i}`}
                      aria-hidden={copy || undefined}
                      className="absolute flex flex-col gap-1.5 overflow-hidden rounded-xl border border-black/10 bg-gray-50 p-1.5 shadow-sm transition-[opacity,transform] duration-500 ease-out dark:border-white/10 dark:bg-neutral-900"
                      style={{
                        left: card.left + dx * width,
                        top: card.top + dy * height,
                        width: CARD_W,
                        height: CARD_H,
                        opacity: flying ? 0.45 : isFocus ? 1 : 0.55,
                        transform: isFocus ? "scale(1.012)" : "none",
                      }}
                    >
                      <figcaption className="flex h-4 shrink-0 items-center px-1 font-mono text-[9px] leading-none text-neutral-600 dark:text-neutral-400">
                        {card.title}
                      </figcaption>
                      <div
                        className="relative min-h-0 overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-950"
                        style={{ height: FRAME_H }}
                      >
                        <img
                          src={card.image}
                          alt=""
                          width={FRAME_W}
                          height={FRAME_H}
                          // Not lazy: the browser never counts the copies as in view
                          // inside the transformed canvas, and they share the originals'
                          // URLs anyway.
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                      </div>
                    </figure>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </section>
    );
  },
);
ComponentWall.displayName = "ComponentWall";

export default ComponentWall;
