"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  /** Camera scale on phones and small viewports (under 640px). Defaults to 0.32. */
  mobileZoom?: number;
  /**
   * Milliseconds the camera drifts across the wall, pulled back with no card
   * in focus, before its first landing — time for whatever sits beside the
   * wall to arrive. `0` starts on the first card.
   */
  intro?: number;
  /**
   * Where in the window the resting card sits, as shares of its width and
   * height — `{ x: 0.5, y: 0.5 }`, the middle, by default. Two walls side by
   * side read better with one card resting high and the other low.
   */
  anchor?: { x?: number; y?: number };
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

// ------------------------------------------
// Camera flights, on the Web Animations API. The canvas's `translate` and
// `scale` run as two animations; a frame loop only reads the camera back out
// (same curves, in JS) so the copies of the tile can be culled.
// ------------------------------------------
interface Camera {
  x: number;
  y: number;
  s: number;
}

type Ease = "linear" | "in1" | "out1" | "in2" | "out2";
// power1 / power2 in and out, exact as cubic-beziers and as functions.
const EASE_CSS: Record<Ease, string> = {
  linear: "linear",
  in1: "cubic-bezier(0.33333, 0, 0.66667, 0.33333)",
  out1: "cubic-bezier(0.33333, 0.66667, 0.66667, 1)",
  in2: "cubic-bezier(0.33333, 0, 0.66667, 0)",
  out2: "cubic-bezier(0.33333, 1, 0.66667, 1)",
};
const EASE_FN: Record<Ease, (p: number) => number> = {
  linear: (p) => p,
  in1: (p) => p * p,
  out1: (p) => 1 - (1 - p) * (1 - p),
  in2: (p) => p * p * p,
  out2: (p) => 1 - (1 - p) * (1 - p) * (1 - p),
};

/** A value's path through a flight: stops (in seconds), each easing to the next. */
interface Stop {
  at: number;
  value: number;
  ease: Ease;
}

/**
 * An `inOut` ease from `from` to `to` over [t0, t1], as an ease-in half and an
 * ease-out half meeting at the midpoint — which is exactly how GSAP's
 * power1.inOut / power2.inOut are defined.
 */
function inOut(from: number, to: number, t0: number, t1: number, power: 1 | 2): Stop[] {
  return [
    { at: t0, value: from, ease: power === 1 ? "in1" : "in2" },
    { at: (t0 + t1) / 2, value: (from + to) / 2, ease: power === 1 ? "out1" : "out2" },
    { at: t1, value: to, ease: "linear" },
  ];
}

function valueAt(stops: Stop[], t: number) {
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (t < a.at) return a.value;
    if (t < b.at) return a.value + (b.value - a.value) * EASE_FN[a.ease]((t - a.at) / (b.at - a.at));
  }
  return stops[stops.length - 1].value;
}

interface FlightPath {
  x: Stop[];
  /** Same stops as `x` (times and eases), other values. */
  y: Stop[];
  s: Stop[];
  /** Seconds. */
  duration: number;
}

interface Flight {
  /** Playing: not paused and not over. */
  isActive: () => boolean;
  paused: () => boolean;
  pause: () => void;
  resume: () => void;
  /** Stop where it is, leaving the camera there. */
  kill: () => void;
}

function fly(
  canvas: HTMLElement,
  path: FlightPath,
  on: {
    /** Every frame (and on pause): the camera, which the animations paint. */
    update: (camera: Camera) => void;
    /** On kill: the camera, to be painted before the animations let go. */
    freeze: (camera: Camera) => void;
    complete: () => void;
  },
): Flight {
  const ms = path.duration * 1000;
  const cameraAt = (time: number) => ({
    x: valueAt(path.x, time / 1000),
    y: valueAt(path.y, time / 1000),
    s: valueAt(path.s, time / 1000),
  });
  const frames = (stops: Stop[], value: (stop: Stop, i: number) => Keyframe) =>
    stops.map((stop, i) => ({
      offset: stop.at / path.duration,
      easing: EASE_CSS[stop.ease],
      ...value(stop, i),
    }));
  // Held at the end until `complete` has painted the landing.
  const options: KeyframeAnimationOptions = { duration: ms, fill: "forwards" };
  const animations =
    typeof canvas.animate === "function"
      ? [
          canvas.animate(
            frames(path.x, (stop, i) => ({ translate: `${stop.value}px ${path.y[i]?.value ?? 0}px` })),
            options,
          ),
          canvas.animate(
            frames(path.s, (stop) => ({ scale: String(stop.value) })),
            options,
          ),
        ]
      : [];

  let state: "running" | "paused" | "over" = "running";
  let frame = 0;
  const time = () => Math.min((animations[0]?.currentTime as number | null) ?? ms, ms);
  const tick = () => {
    if (state !== "running") return;
    on.update(cameraAt(time()));
    frame = requestAnimationFrame(tick);
  };
  const release = () => {
    state = "over";
    cancelAnimationFrame(frame);
    for (const animation of animations) animation.cancel();
  };

  if (animations.length === 0) {
    state = "over";
    on.update(cameraAt(ms));
    on.complete();
  } else {
    frame = requestAnimationFrame(tick);
    Promise.all(animations.map((animation) => animation.finished)).then(
      () => {
        if (state === "over") return;
        on.complete();
        release();
      },
      // Cancelled: killed, or torn down.
      () => {},
    );
  }

  return {
    isActive: () => state === "running",
    paused: () => state === "paused",
    pause: () => {
      if (state !== "running") return;
      state = "paused";
      cancelAnimationFrame(frame);
      for (const animation of animations) animation.pause();
      on.update(cameraAt(time()));
    },
    resume: () => {
      if (state !== "paused") return;
      state = "running";
      for (const animation of animations) animation.play();
      frame = requestAnimationFrame(tick);
    },
    kill: () => {
      if (state === "over") return;
      on.freeze(cameraAt(time()));
      release();
    },
  };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------
// Root
// ------------------------------------------
// One card on the wall. Memoised: the wall draws its tile nine times over, so
// a camera landing must re-render only the card that lost the focus and the
// one that gained it — never all of them.
const WallCard = React.memo(function WallCard({
  card,
  left,
  top,
  copy,
  isFocus,
}: {
  card: Placed;
  left: number;
  top: number;
  copy: boolean;
  isFocus: boolean;
}) {
  return (
    <figure
      aria-hidden={copy || undefined}
      className="absolute flex flex-col gap-1.5 overflow-hidden rounded-xl border border-foreground/10 bg-muted p-1.5 shadow-sm transition-[opacity,transform] duration-500 ease-out"
      style={{
        left,
        top,
        width: CARD_W,
        height: CARD_H,
        opacity: isFocus ? 1 : REST_DIM,
        transform: isFocus ? "scale(1.012)" : "none",
      }}
    >
      <figcaption className="flex h-4 shrink-0 items-center px-1 font-mono text-[9px] leading-none text-muted-foreground">
        {card.title}
      </figcaption>
      <div
        className="relative min-h-0 overflow-hidden rounded-lg border border-foreground/10 bg-card"
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

/** Cards at rest; the focused one is full strength. */
const REST_DIM = 0.55;
/**
 * In flight every card sits at 0.45. Rather than transition hundreds of cards,
 * one layer over all of them fades to 0.45 / 0.55 of what they show at rest.
 */
const FLIGHT_DIM = 0.45 / REST_DIM;

/** Before the first camera paint only the tile itself is drawn. */
const CENTER_TILE = "0,0";

/** How long the page must be still before a paused flight resumes. */
const SCROLL_SETTLE = 150;

const ImageWallInner = forwardRef<HTMLDivElement, ImageWallProps>(
  (
    {
      items,
      columns = 4,
      interval = 4500,
      order = "serial",
      zoom = 1.35,
      mobileZoom,
      intro = 0,
      anchor,
      onFocus,
      className,
      ...props
    },
    ref,
  ) => {
    const ax = anchor?.x ?? 0.5;
    const ay = anchor?.y ?? 0.5;
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef({ x: 0, y: 0, s: zoom });
    const flightRef = useRef<Flight | null>(null);

    const { placed, width, height } = useMemo(() => layout(items, columns), [items, columns]);
    const n = placed.length;

    const [focus, setFocus] = useState(0);
    const focusRef = useRef(0);
    focusRef.current = focus;
    const [flying, setFlying] = useState(false);
    const [hover, setHover] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [onScreen, setOnScreen] = useState(true);

    // ---- Which copies of the tile are drawn. The wall is its tile and eight
    // neighbours so the camera never sees an edge, but the window only ever
    // overlaps a few of them: render those (plus a card's width of margin),
    // and re-render only when the set changes, not on every camera frame.
    const tileRef = useRef({ width, height });
    tileRef.current = { width, height };
    const [tiles, setTiles] = useState(CENTER_TILE);
    const tilesRef = useRef(CENTER_TILE);
    // The window's size, cached: `cull` runs on every camera frame, and reading
    // clientWidth there would force a style and layout flush each time.
    const sizeRef = useRef({ w: 0, h: 0 });
    useLayoutEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      sizeRef.current = { w: wrap.clientWidth, h: wrap.clientHeight };
      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(([entry]) => {
        sizeRef.current = { w: entry.contentRect.width, h: entry.contentRect.height };
      });
      ro.observe(wrap);
      return () => ro.disconnect();
    }, []);
    const cull = useCallback(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { x, y, s } = cameraRef.current;
      const { width: tw, height: th } = tileRef.current;
      let { w, h } = sizeRef.current;
      if (!w || !h) {
        w = wrap.clientWidth;
        h = wrap.clientHeight;
      }
      // The window in canvas coordinates, where the centre tile spans 0..tw.
      // A copy joins once it is within a card of the window but only leaves
      // once it is two cards clear, so a camera resting near a tile's edge
      // never mounts and unmounts the same copy back and forth.
      const near = (dx: number, dy: number, m: number) =>
        dx * tw < (w - x) / s + m &&
        (dx + 1) * tw > -x / s - m &&
        dy * th < (h - y) / s + m &&
        (dy + 1) * th > -y / s - m;
      const current = new Set(tilesRef.current.split("|"));
      const keep: string[] = [];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const id = `${dx},${dy}`;
          if (near(dx, dy, CARD_W) || (current.has(id) && near(dx, dy, CARD_W * 2))) keep.push(id);
        }
      }
      const key = keep.join("|") || CENTER_TILE;
      if (key !== tilesRef.current) {
        tilesRef.current = key;
        setTiles(key);
      }
    }, []);

    const paint = useCallback(() => {
      const el = canvasRef.current;
      if (!el) return;
      const { x, y, s } = cameraRef.current;
      // `translate` then `scale`, about the top-left corner — the transform
      // translate3d(x, y, 0) scale(s), split into the two properties the
      // flights animate.
      el.style.translate = `${x}px ${y}px`;
      el.style.scale = String(s);
      // The server renders the canvas invisible: it has no camera until now.
      el.style.opacity = "1";
      cull();
    }, [cull]);

    // A flight's callbacks: follow the camera for culling (the animations
    // paint it), or paint it where a killed flight stops.
    const flightHooks = useCallback(
      (complete: () => void) => ({
        update: (camera: Camera) => {
          cameraRef.current = camera;
          cull();
        },
        freeze: (camera: Camera) => {
          cameraRef.current = camera;
          paint();
        },
        complete,
      }),
      [cull, paint],
    );

    // Where the camera rests to hold card `i` at the anchor — the middle of the window by default.
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
        const s =
          mobileZoom !== undefined
            ? mobileZoom
            : W <= 640
              ? Math.min(zoom, PHONE_ZOOM)
              : H < 420
                ? Math.min(zoom, BAND_ZOOM)
                : zoom;
        const cx = card.left + CARD_W / 2;
        const cy = card.top + CARD_H / 2;
        return { x: W * ax - s * cx, y: H * ay - s * cy, s };
      },
      [placed, zoom, mobileZoom, ax, ay],
    );

    // ---- First frame, and every resize: snap to the focused card. On the very
    // first frame, with an `intro`, the camera instead starts pulled back and
    // off to one side and drifts towards the first card, landing on it only
    // when the intro is over.
    const introDone = useRef(false);
    useLayoutEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const snap = () => {
        flightRef.current?.kill();
        cameraRef.current = restFor(focusRef.current);
        paint();
        setFlying(false);
      };
      let introLive = false;
      if (!introDone.current && intro > 0 && n > 0 && !prefersReducedMotion()) {
        introDone.current = true;
        introLive = true;
        const target = restFor(focusRef.current);
        const cam = cameraRef.current;
        cam.s = target.s * FLIGHT_PULL;
        cam.x = target.x - wrap.clientWidth * 0.35;
        cam.y = target.y - wrap.clientHeight * 0.2;
        paint();
        setFlying(true);
        // x and y drift over the whole intro plus a second (power1.inOut);
        // the scale holds, then settles in over that last second (power2.inOut).
        const drift = intro / 1000;
        const duration = drift + 1;
        flightRef.current = canvasRef.current
          ? fly(
              canvasRef.current,
              {
                x: inOut(cam.x, target.x, 0, duration, 1),
                y: inOut(cam.y, target.y, 0, duration, 1),
                s: [{ at: 0, value: cam.s, ease: "linear" }, ...inOut(cam.s, target.s, drift, duration, 2)],
                duration,
              },
              flightHooks(() => {
                introLive = false;
                cameraRef.current = restFor(focusRef.current);
                paint();
                setFlying(false);
              }),
            )
          : null;
      } else {
        introDone.current = true;
        snap();
      }
      const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(snap);
      ro?.observe(wrap);
      return () => {
        ro?.disconnect();
        // Torn down mid-intro — React's rehearsal unmount in development, or the
        // geometry changing under it — stop it and let the next run start it
        // afresh. Left alone, a killed intro never clears `flying`, and the
        // camera never moves again.
        if (introLive) {
          flightRef.current?.kill();
          introDone.current = false;
          setFlying(false);
        }
      };
    }, [restFor, paint, flightHooks, intro, n]);

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
        const canvas = canvasRef.current;
        if (!canvas) return;
        setFlying(true);
        const cam = cameraRef.current;
        const pull = target.s * FLIGHT_PULL;
        // Two seconds, power2.inOut throughout: x and y glide the whole way,
        // the scale pulls back over the first second and settles over the second.
        flightRef.current = fly(
          canvas,
          {
            x: inOut(cam.x, target.x, 0, 2, 2),
            y: inOut(cam.y, target.y, 0, 2, 2),
            s: [...inOut(cam.s, pull, 0, 1, 2).slice(0, -1), ...inOut(pull, target.s, 1, 2, 2)],
            duration: 2,
          },
          flightHooks(() => {
            // Land where the card is *now*: the box may have resized mid-flight.
            cameraRef.current = restFor(i);
            paint();
            setFlying(false);
            setFocus(i);
          }),
        );
      },
      [restFor, paint, flightHooks],
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

    // ---- While the page scrolls the camera holds still: a flight freezes
    // mid-air and picks up where it left off once the scroll settles, and no
    // new one starts. Scrolling and a flight both need every frame; this way
    // the scroll gets them. The flag flips only when scrolling starts or stops,
    // never per scroll event, so the wall does not re-render as the page moves.
    const [scrolling, setScrolling] = useState(false);
    useEffect(() => {
      let settle = 0;
      let active = false;
      const onScroll = () => {
        if (!active) {
          active = true;
          setScrolling(true);
        }
        window.clearTimeout(settle);
        settle = window.setTimeout(() => {
          active = false;
          setScrolling(false);
        }, SCROLL_SETTLE);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(settle);
      };
    }, []);
    // A hidden tab holds a flight as well; it carries on from where it
    // stopped once the tab is back.
    const holdFlight = scrolling || hidden;
    useEffect(() => {
      const flight = flightRef.current;
      if (!flight) return;
      if (holdFlight) flight.pause();
      else if (flight.paused()) flight.resume();
    }, [holdFlight]);

    const paused = hover || hidden || !onScreen || scrolling;
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

    // The copies of the tile the camera can currently see (see `cull`).
    const offsets = useMemo(
      () =>
        tiles.split("|").map((t) => {
          const [dx, dy] = t.split(",").map(Number);
          return { dx, dy };
        }),
      [tiles],
    );

    // The focused card, or none mid-flight. Hover, visibility and on-screen
    // changes leave the cards alone entirely; a landing touches two of them.
    const lit = flying ? -1 : focus;
    const cards = useMemo(
      () =>
        offsets.map(({ dx, dy }) => {
          const copy = dx !== 0 || dy !== 0;
          return placed.map((card, i) => (
            <WallCard
              key={`${dx},${dy},${i}`}
              card={card}
              left={card.left + dx * width}
              top={card.top + dy * height}
              copy={copy}
              isFocus={!copy && i === lit}
            />
          ));
        }),
      [offsets, placed, width, height, lit],
    );

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
        <div
          ref={canvasRef}
          className="absolute left-0 top-0 opacity-0 transition-opacity duration-700 will-change-transform"
          style={{ width, height, transformOrigin: "0 0" }}
        >
          {/* The flight dim: one layer fading, not every card. */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: flying ? FLIGHT_DIM : 1 }}
          >
            {cards}
          </div>
        </div>
      </div>
    );
  },
);
ImageWallInner.displayName = "ImageWall";

/**
 * Memoised: a host that re-renders on its own timers — a headline word taking
 * turns, a tools strip — must not re-render every card on the wall with it.
 * Pass stable `items`, `anchor` and `onFocus` to benefit.
 */
export const ImageWall = React.memo(ImageWallInner);

export default ImageWall;
