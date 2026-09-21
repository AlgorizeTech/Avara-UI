"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

// ==========================================
// IMAGE WALL
// A wall of screenshots that never ends, and a camera hanging over it. The
// camera rests zoomed in on one card; every few seconds it pulls back, glides
// to the next card and settles on it, brightening that card while the rest
// stay dimmed. The wall is one tile of cards in staggered columns, repeated
// around itself eight times, so however far the camera travels it never
// finds an edge. The wall fills whatever box it is given.
// ==========================================

export interface WallItem {
  /** Small mono caption at the top of the card. */
  title: string;
  /** The screenshot, cropped from the top into a 493:332 frame. */
  image: string;
}

export interface ImageWallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onFocus"> {
  /** The cards on the wall, in reading order down the columns. */
  items: WallItem[];
  /** Staggered columns in one tile. */
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
}

// ------------------------------------------
// The wall's geometry, in wall units: 400 per column, 384-wide cards, 16
// between rows; every other column starts 72 lower so the rows stagger.
// ------------------------------------------
const COL_W = 400;
const CARD_W = 384;
const GAP = 16;
const STAGGER = 72;
/** How far the camera pulls back mid-flight, as a share of its resting scale. */
const FLIGHT_PULL = 0.64;
/** Resting scale in a short window (a band under some copy) and in a narrow one (a phone). */
const BAND_ZOOM = 0.72;
const PHONE_ZOOM = 0.5;
// Inside the card: a 1px border, 6 of padding each side, a 16-tall caption, 6 below it.
const CARD_BORDER = 1;
const CARD_PAD = 6;
const CAPTION_H = 16;
const FRAME_W = CARD_W - (CARD_BORDER + CARD_PAD) * 2;
/** Every screenshot sits in the same 493:332 frame. */
export const FRAME_RATIO = 493 / 332;
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
export const ImageWall = forwardRef<HTMLDivElement, ImageWallProps>(
  ({ items, columns = 4, interval = 4500, order = "serial", zoom = 1.35, onFocus, className, ...props }, ref) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
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
        // A short window (a band under some copy) pulls the camera back so a
        // few cards show at once instead of one card spilling out of the band;
        // a narrow one (a phone) pulls back further still, so the flight from
        // card to card is a visible journey rather than a swap.
        const s = W < 640 ? Math.min(zoom, PHONE_ZOOM) : H < 420 ? Math.min(zoom, BAND_ZOOM) : zoom;
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
              // Land where the card is *now*: the box may have resized mid-flight.
              cameraRef.current = restFor(i);
              paint();
              setFlying(false);
              setFocus(i);
            },
          })
          .to(cam, { s: target.s * FLIGHT_PULL, duration: 1, ease: "power2.inOut" }, 0)
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
      const el = wrapRef.current;
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
      <div
        role="img"
        aria-label={placed[focus] ? placed[focus].title : "Image wall"}
        {...props}
        ref={(node) => {
          wrapRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onMouseEnter={(e) => {
          setHover(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHover(false);
          props.onMouseLeave?.(e);
        }}
        className={cn("relative h-96 w-full overflow-hidden", className)}
      >
        <div ref={canvasRef} className="absolute left-0 top-0 will-change-transform" style={{ width, height, transformOrigin: "0 0" }}>
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
    );
  },
);
ImageWall.displayName = "ImageWall";

export default ImageWall;
