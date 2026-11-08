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

export interface ImageWallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onFocus" | "draggable"> {
  /** The cards on the wall, in reading order down the columns. */
  items: WallItem[];
  /** Staggered columns in one tile. */
  columns?: number;
  /** Gap between cards in pixels in all directions (horizontal and vertical). Defaults to 16. */
  gap?: number;
  /** Vertical stagger offset between alternate columns. Set to 0 for a uniform grid with equal 16px gap on all sides. Defaults to 72. */
  stagger?: number;
  /** Milliseconds the camera rests on a card before moving on, or a boolean (`true` = `intervalTime` / 5500ms, `false` = 0/off). Defaults to 5500. */
  interval?: number | boolean;
  /** Custom interval duration in milliseconds when `interval={true}`. Defaults to 5500. */
  intervalTime?: number;
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
  /** Whether the user can drag and pan the wall infinitely in all 4 directions. Defaults to true. */
  draggable?: boolean;
  /** Ambient continuous slow drift when not dragging. Set to true, or pass custom velocity `{ x, y }`. */
  drift?: boolean | { x?: number; y?: number };
  /** Resting dim of cards when not in focus. Defaults to 0.55. */
  cardDim?: number;
  /** Whether to highlight the center/focused card and dim others. Defaults to true. */
  highlightFocus?: boolean;
  /** Alias for `highlightFocus` — set true to focus center card and dim others, or false to keep all cards clear. */
  focus?: boolean;
  /** Whether cards render with elevated drop shadows. Defaults to false. */
  cardShadow?: boolean;
}

// ------------------------------------------
// The wall's geometry, in wall units: 384-wide cards, 16px gap between cards
// in all directions (horizontal and vertical).
// ------------------------------------------
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

function layout(items: WallItem[], columns: number, gap: number = GAP, stagger: number = STAGGER) {
  const colW = CARD_W + gap;
  // Pad items so that every column has the exact same number of cards, avoiding empty trailing gaps
  const remainder = items.length % columns;
  const fullItems =
    remainder === 0 || items.length === 0
      ? items
      : items.concat(items.slice(0, columns - remainder));

  const rowsPerCol = Math.ceil(fullItems.length / columns);
  // Masonry column offsets: creates an organic staggered wall without identical row heights
  const pattern = [0, 1, 0.42, 1.25, 0.65, 1.1, 0.25, 0.85];
  const colOffsets = Array.from({ length: columns }, (_, c) =>
    stagger > 0 ? Math.round((pattern[c % pattern.length] ?? 0) * stagger) : 0,
  );

  const bottoms = [...colOffsets];
  const placed: Placed[] = fullItems.map((item, i) => {
    const c = i % columns;
    const card = { ...item, left: c * colW, top: bottoms[c] };
    bottoms[c] += CARD_H + gap;
    return card;
  });

  // Vertical repeat period MUST be exactly rowsPerCol * (CARD_H + gap).
  // Because card.top = colOffsets[c] + r * (CARD_H + gap),
  // (card.top + height) - (card_last.top + CARD_H) = gap (exactly 16px) across infinite tile repeats for EVERY column!
  const height = rowsPerCol * (CARD_H + gap);
  const width = columns * colW;

  return { placed, width, height };
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
  dim = REST_DIM,
  isFocus,
  isCenter,
  highlightFocus = true,
  cardShadow = false,
}: {
  card: Placed;
  left: number;
  top: number;
  copy: boolean;
  dim?: number;
  isFocus: boolean;
  isCenter?: boolean;
  highlightFocus?: boolean;
  cardShadow?: boolean;
}) {
  const activeFocus = highlightFocus && (cardShadow ? isFocus : Boolean(isCenter));
  const activeCenter = highlightFocus && isCenter;
  const opacity = highlightFocus ? (activeFocus ? 1 : dim) : 1;
  const filter = cardShadow && highlightFocus ? (activeFocus ? "none" : "grayscale(40%)") : "none";
  const transform = cardShadow && highlightFocus ? (activeFocus ? (activeCenter ? "scale(1.03)" : "scale(1.018)") : "none") : "none";
  const zIndex = highlightFocus ? (activeCenter ? 14 : activeFocus ? 10 : 1) : 1;
  const boxShadow = cardShadow && highlightFocus && activeFocus ? "0 10px 30px -10px rgba(0,0,0,0.3)" : undefined;

  return (
    <figure
      aria-hidden={copy || undefined}
      data-card
      data-card-x={left}
      data-card-y={top}
      className={cn(
        "absolute flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-foreground/12 p-2 transition-[opacity,transform,filter,box-shadow] duration-500 ease-out select-none pointer-events-none will-change-transform",
        cardShadow ? "bg-card shadow-xl shadow-black/20 dark:shadow-black/55" : "bg-muted",
      )}
      style={{
        left,
        top,
        width: CARD_W,
        height: CARD_H,
        opacity,
        filter,
        transform,
        zIndex,
        boxShadow,
      }}
    >
      <figcaption
        className={cn(
          "flex h-4 shrink-0 items-center px-1 font-mono text-[9px] leading-none select-none transition-colors duration-500",
          cardShadow && activeFocus ? "font-semibold text-foreground" : "text-muted-foreground",
        )}
      >
        {card.title}
      </figcaption>
      <div
        className="relative min-h-0 overflow-hidden rounded-lg border border-foreground/10 bg-card select-none"
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
          className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
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
      gap = 16,
      stagger = 72,
      interval: intervalProp = 5500,
      intervalTime = 5500,
      order = "serial",
      zoom = 1.35,
      mobileZoom,
      intro = 0,
      anchor,
      onFocus,
      draggable = true,
      drift = false,
      cardDim = REST_DIM,
      highlightFocus: highlightFocusProp = true,
      focus: focusProp,
      cardShadow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const interval = typeof intervalProp === "boolean" ? (intervalProp ? intervalTime : 0) : intervalProp;
    const highlightFocus = focusProp ?? highlightFocusProp;
    const ax = anchor?.x ?? 0.5;
    const ay = anchor?.y ?? 0.5;
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef({ x: 0, y: 0, s: zoom });
    const flightRef = useRef<Flight | null>(null);

    const { placed, width, height } = useMemo(
      () => layout(items, columns, gap, stagger),
      [items, columns, gap, stagger],
    );
    const n = placed.length;

    const [focus, setFocus] = useState(0);
    const focusRef = useRef(0);
    focusRef.current = focus;
    const [centerKey, setCenterKey] = useState<string>("");
    const centerKeyRef = useRef<string>("");
    const [focusKeys, setFocusKeys] = useState<Set<string>>(() => new Set());
    const focusKeysRef = useRef<string>("");
    const hasInteractedRef = useRef(false);
    const onFocusRef = useRef(onFocus);
    onFocusRef.current = onFocus;
    const placedRef = useRef(placed);
    placedRef.current = placed;
    const [flying, setFlying] = useState(false);
    const [hover, setHover] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [onScreen, setOnScreen] = useState(true);

    // ---- Which copies of the tile are drawn. The wall is its tile and infinite
    // neighbours so dragging in any of the 4 directions never finds an edge.
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
      if (!tw || !th) return;

      let { w, h } = sizeRef.current;
      if (!w || !h) {
        w = wrap.clientWidth;
        h = wrap.clientHeight;
      }
      if (!w || !h) return;

      // In canvas coordinates, visible viewport range with 1 card width margin for infinite 4-way panning:
      const margin = CARD_W;
      const minX = -x / s - margin;
      const maxX = (w - x) / s + margin;
      const minY = -y / s - margin;
      const maxY = (h - y) / s + margin;

      const minDx = Math.floor(minX / tw);
      const maxDx = Math.floor(maxX / tw);
      const minDy = Math.floor(minY / th);
      const maxDy = Math.floor(maxY / th);

      const keep: string[] = [];
      for (let dy = minDy; dy <= maxDy; dy++) {
        for (let dx = minDx; dx <= maxDx; dx++) {
          keep.push(`${dx},${dy}`);
        }
      }

      const key = keep.join("|") || CENTER_TILE;
      if (key !== tilesRef.current) {
        tilesRef.current = key;
        setTiles(key);
      }

      if (!highlightFocus) {
        return;
      }

      // Find the card closest to the viewport center focus point (ax, ay)
      const centerCanvasX = (w * ax - x) / s;
      const centerCanvasY = (h * ay - y) / s;

      const baseDx = Math.floor(centerCanvasX / tw);
      const baseDy = Math.floor(centerCanvasY / th);

      const placedList = placedRef.current;
      const halfW = CARD_W / 2;
      const halfH = CARD_H / 2;

      // 1. Center card
      let centerDist = Infinity;
      let centerKey = "";
      let centerIndex = 0;
      let centerCx = 0;
      let centerCy = 0;

      for (let cdy = baseDy - 1; cdy <= baseDy + 1; cdy++) {
        for (let cdx = baseDx - 1; cdx <= baseDx + 1; cdx++) {
          const offsetX = cdx * tw;
          const offsetY = cdy * th;
          for (let i = 0; i < placedList.length; i++) {
            const card = placedList[i];
            const cx = card.left + offsetX + halfW;
            const cy = card.top + offsetY + halfH;
            const dist = (cx - centerCanvasX) ** 2 + (cy - centerCanvasY) ** 2;
            if (dist < centerDist) {
              centerDist = dist;
              centerKey = `${cdx},${cdy},${i}`;
              centerIndex = i;
              centerCx = cx;
              centerCy = cy;
            }
          }
        }
      }

      // 2. Find Top, Bottom, Left, Right cards around the Center card
      const targetTop = { x: centerCx, y: centerCy - (CARD_H + gap) };
      const targetBottom = { x: centerCx, y: centerCy + (CARD_H + gap) };
      const targetLeft = { x: centerCx - (CARD_W + gap), y: centerCy };
      const targetRight = { x: centerCx + (CARD_W + gap), y: centerCy };

      let topDist = Infinity, topKey = "";
      let bottomDist = Infinity, bottomKey = "";
      let leftDist = Infinity, leftKey = "";
      let rightDist = Infinity, rightKey = "";

      for (let cdy = baseDy - 2; cdy <= baseDy + 2; cdy++) {
        for (let cdx = baseDx - 2; cdx <= baseDx + 2; cdx++) {
          const offsetX = cdx * tw;
          const offsetY = cdy * th;
          for (let i = 0; i < placedList.length; i++) {
            const key = `${cdx},${cdy},${i}`;
            if (key === centerKey) continue;
            const card = placedList[i];
            const cx = card.left + offsetX + halfW;
            const cy = card.top + offsetY + halfH;

            const dTop = (cx - targetTop.x) ** 2 + (cy - targetTop.y) ** 2;
            if (dTop < topDist) {
              topDist = dTop;
              topKey = key;
            }

            const dBottom = (cx - targetBottom.x) ** 2 + (cy - targetBottom.y) ** 2;
            if (dBottom < bottomDist) {
              bottomDist = dBottom;
              bottomKey = key;
            }

            const dLeft = (cx - targetLeft.x) ** 2 + (cy - targetLeft.y) ** 2;
            if (dLeft < leftDist) {
              leftDist = dLeft;
              leftKey = key;
            }

            const dRight = (cx - targetRight.x) ** 2 + (cy - targetRight.y) ** 2;
            if (dRight < rightDist) {
              rightDist = dRight;
              rightKey = key;
            }
          }
        }
      }

      const focusList = [centerKey, topKey, bottomKey, leftKey, rightKey].filter(Boolean);
      const focusKeysStr = focusList.slice().sort().join("|");

      if (focusKeysStr && (focusKeysStr !== focusKeysRef.current || centerKey !== centerKeyRef.current)) {
        focusKeysRef.current = focusKeysStr;
        centerKeyRef.current = centerKey;
        setCenterKey(centerKey);
        setFocusKeys(new Set(focusList));
        onFocusRef.current?.(items.length > 0 ? centerIndex % items.length : centerIndex);
      }
    }, [ax, ay, items.length, gap, highlightFocus]);

    const paint = useCallback(() => {
      const el = canvasRef.current;
      if (!el) return;
      const { x, y, s } = cameraRef.current;
      el.style.translate = `${x}px ${y}px`;
      el.style.scale = String(s);
      el.style.opacity = "1";
      cull();
    }, [cull]);

    // ---- Interactive Drag / Pan & Ambient Drift in all 4 directions ----
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef({
      active: false,
      startX: 0,
      startY: 0,
      camStartX: 0,
      camStartY: 0,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      vx: 0,
      vy: 0,
      moved: false,
    });
    const momentumAnimRef = useRef<number | null>(null);
    const driftAnimRef = useRef<number | null>(null);

    const startAmbientDrift = useCallback(() => {
      if (!drift || prefersReducedMotion()) return;
      if (momentumAnimRef.current) return;
      if (driftAnimRef.current) cancelAnimationFrame(driftAnimRef.current);

      const dx = typeof drift === "object" ? (drift.x ?? -0.35) : -0.35;
      const dy = typeof drift === "object" ? (drift.y ?? -0.15) : -0.15;

      const tickDrift = () => {
        if (dragRef.current.active) {
          driftAnimRef.current = null;
          return;
        }
        cameraRef.current.x += dx;
        cameraRef.current.y += dy;
        const el = canvasRef.current;
        if (el) {
          el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
        }
        cull();
        driftAnimRef.current = requestAnimationFrame(tickDrift);
      };
      driftAnimRef.current = requestAnimationFrame(tickDrift);
    }, [drift, cull]);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggable || e.button !== 0) return;
        hasInteractedRef.current = true;
        flightRef.current?.kill();
        if (momentumAnimRef.current) {
          cancelAnimationFrame(momentumAnimRef.current);
          momentumAnimRef.current = null;
        }
        if (driftAnimRef.current) {
          cancelAnimationFrame(driftAnimRef.current);
          driftAnimRef.current = null;
        }

        const d = dragRef.current;
        d.active = true;
        d.startX = e.clientX;
        d.startY = e.clientY;
        d.lastX = e.clientX;
        d.lastY = e.clientY;
        d.camStartX = cameraRef.current.x;
        d.camStartY = cameraRef.current.y;
        d.lastTime = performance.now();
        d.vx = 0;
        d.vy = 0;
        d.moved = false;

        setIsDragging(true);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {}
      },
      [draggable],
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current;
        if (!d.active) return;

        const deltaX = e.clientX - d.startX;
        const deltaY = e.clientY - d.startY;
        if (!d.moved && Math.hypot(deltaX, deltaY) > 4) {
          d.moved = true;
        }

        const now = performance.now();
        const dt = Math.max(1, now - d.lastTime);
        const stepX = e.clientX - d.lastX;
        const stepY = e.clientY - d.lastY;

        d.vx = (stepX / dt) * 16.67;
        d.vy = (stepY / dt) * 16.67;
        d.lastX = e.clientX;
        d.lastY = e.clientY;
        d.lastTime = now;

        cameraRef.current.x = d.camStartX + deltaX;
        cameraRef.current.y = d.camStartY + deltaY;

        const el = canvasRef.current;
        if (el) {
          el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
        }
        cull();
      },
      [cull],
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current;
        if (!d.active) return;
        d.active = false;
        setIsDragging(false);
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}

        const maxV = 28;
        let vx = Math.max(-maxV, Math.min(maxV, d.vx || 0));
        let vy = Math.max(-maxV, Math.min(maxV, d.vy || 0));

        const tickMomentum = () => {
          if (Math.abs(vx) < 0.15 && Math.abs(vy) < 0.15) {
            momentumAnimRef.current = null;
            startAmbientDrift();
            return;
          }

          cameraRef.current.x += vx;
          cameraRef.current.y += vy;
          vx *= 0.93;
          vy *= 0.93;

          const el = canvasRef.current;
          if (el) {
            el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
          }
          cull();
          momentumAnimRef.current = requestAnimationFrame(tickMomentum);
        };

        if (Math.hypot(vx, vy) > 0.5) {
          momentumAnimRef.current = requestAnimationFrame(tickMomentum);
        } else {
          startAmbientDrift();
        }
      },
      [cull, startAmbientDrift],
    );

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
        const driftDur = intro / 1000;
        const duration = driftDur + 1;
        flightRef.current = canvasRef.current
          ? fly(
              canvasRef.current,
              {
                x: inOut(cam.x, target.x, 0, duration, 1),
                y: inOut(cam.y, target.y, 0, duration, 1),
                s: [{ at: 0, value: cam.s, ease: "linear" }, ...inOut(cam.s, target.s, driftDur, duration, 2)],
                duration,
              },
              flightHooks(() => {
                introLive = false;
                cameraRef.current = restFor(focusRef.current);
                paint();
                setFlying(false);
                startAmbientDrift();
              }),
            )
          : null;
      } else if (!introDone.current) {
        introDone.current = true;
        snap();
        startAmbientDrift();
      } else {
        if (drift && !driftAnimRef.current && !momentumAnimRef.current && !dragRef.current.active) {
          startAmbientDrift();
        }
      }
      const handleResize = () => {
        if (hasInteractedRef.current || drift) {
          cull();
          return;
        }
        snap();
      };
      const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(handleResize);
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
    }, [restFor, paint, flightHooks, intro, n, startAmbientDrift]);

    // ---- The flight: pull back while gliding, then settle in.
    const flyTo = useCallback(
      (i: number) => {
        const { width: tw, height: th } = tileRef.current;
        if (tw > 0 && th > 0) {
          const wrap = wrapRef.current;
          const W = wrap?.clientWidth ?? 0;
          const H = wrap?.clientHeight ?? 0;
          const s = cameraRef.current.s || 1;
          const centerCanvasX = (W * ax - cameraRef.current.x) / s;
          const centerCanvasY = (H * ay - cameraRef.current.y) / s;
          const tileDx = Math.floor(centerCanvasX / tw);
          const tileDy = Math.floor(centerCanvasY / th);
          if (tileDx !== 0 || tileDy !== 0) {
            cameraRef.current.x += tileDx * tw * s;
            cameraRef.current.y += tileDy * th * s;
          }
        }
        hasInteractedRef.current = false;
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
        const flightDuration = interval > 0 ? Math.max(0.9, Math.min(4, (interval / 5500) * 2)) : 2;
        const halfDur = flightDuration / 2;
        // power2.inOut throughout: x and y glide the whole way,
        // the scale pulls back over the first half and settles over the second.
        flightRef.current = fly(
          canvas,
          {
            x: inOut(cam.x, target.x, 0, flightDuration, 2),
            y: inOut(cam.y, target.y, 0, flightDuration, 2),
            s: [...inOut(cam.s, pull, 0, halfDur, 2).slice(0, -1), ...inOut(pull, target.s, halfDur, flightDuration, 2)],
            duration: flightDuration,
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
      [restFor, paint, flightHooks, ax, ay, interval],
    );

    useEffect(() => {
      onFocus?.(items.length > 0 ? focus % items.length : focus);
    }, [focus, onFocus, items.length]);

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
      if (interval <= 0 || n < 2 || paused || flying || isDragging || drift) return;
      const t = window.setTimeout(() => flyTo(nextCard()), interval);
      return () => window.clearTimeout(t);
    }, [focus, interval, n, paused, flying, isDragging, flyTo, nextCard, drift]);

    useEffect(
      () => () => {
        flightRef.current?.kill();
        if (momentumAnimRef.current) cancelAnimationFrame(momentumAnimRef.current);
        if (driftAnimRef.current) cancelAnimationFrame(driftAnimRef.current);
      },
      [],
    );

    useEffect(() => {
      const onVisibility = () => {
        const isHidden = document.hidden;
        setHidden(isHidden);
        if (isHidden) {
          if (driftAnimRef.current) cancelAnimationFrame(driftAnimRef.current);
        } else {
          startAmbientDrift();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }, [startAmbientDrift]);

    useEffect(() => {
      const el = wrapRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          setOnScreen(visible);
          if (visible) {
            startAmbientDrift();
          } else if (driftAnimRef.current) {
            cancelAnimationFrame(driftAnimRef.current);
          }
        },
        { threshold: 0.15 },
      );
      io.observe(el);
      return () => io.disconnect();
    }, [startAmbientDrift]);

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
          return placed.map((card, i) => {
            const key = `${dx},${dy},${i}`;
            const isFocus = highlightFocus ? (focusKeys.size > 0 ? focusKeys.has(key) : (!copy && i === lit)) : false;
            const isCenter = highlightFocus
              ? cardShadow
                ? key === centerKey
                : hasInteractedRef.current || Boolean(drift)
                  ? key === centerKey
                  : !copy && i === lit
              : false;
            return (
              <WallCard
                key={key}
                card={card}
                left={card.left + dx * width}
                top={card.top + dy * height}
                copy={copy}
                dim={cardDim}
                isFocus={isFocus}
                isCenter={isCenter}
                highlightFocus={highlightFocus}
                cardShadow={cardShadow}
              />
            );
          });
        }),
      [offsets, placed, width, height, lit, cardDim, centerKey, focusKeys, highlightFocus, cardShadow, drift],
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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={(e) => {
          setHover(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHover(false);
          props.onMouseLeave?.(e);
        }}
        className={cn(
          "relative h-96 w-full overflow-hidden select-none touch-none",
          draggable && (isDragging ? "cursor-grabbing" : "cursor-grab"),
          className,
        )}
      >
        <div
          ref={canvasRef}
          className="absolute left-0 top-0 opacity-0 transition-opacity duration-700 will-change-transform"
          style={{ width, height, transformOrigin: "0 0" }}
        >
          {/* The flight dim: one layer fading, not every card. */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{ opacity: highlightFocus && flying ? FLIGHT_DIM : 1 }}
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
