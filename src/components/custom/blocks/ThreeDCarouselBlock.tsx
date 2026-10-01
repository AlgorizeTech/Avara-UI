"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { bezierEase, gsapTicker } from "./gsap-motion";
import { createSpringFollower, FRAMER_EASE, springEase } from "./motion-curves";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface ThreeDCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// ------------------------------------------
// Motion — the same numbers as the framer/ build
// ------------------------------------------

/** Fan slot of the outer card, written as one transform in Framer's order. */
type Slot = { x: number; z: number; scale: number; rotateY: number; zIndex: number; opacity: number };
type SlotKey = keyof Slot;

/** Fanning between slots. */
const SLOT_SPRING = { stiffness: 280, damping: 28 };
/** Hover tilt of the inner face. */
const TILT_SPRING = { stiffness: 300, damping: 25 };
/** The spring that pulls a released card back inside its 0/0 drag constraints. */
const BOUNCE_SPRING = { stiffness: 200, damping: 40 };
/** Framer's default spring for a scale returning to 1 once hover ends. */
const HOVER_OUT_SPRING = { stiffness: 550, damping: 30 };
/** Hover in: a 0.2s tween on Framer's default `easeOut`. */
const HOVER_EASE = bezierEase(FRAMER_EASE.easeOut);
const DRAG_ELASTIC = 0.2;

/** Drag styles Framer puts on an element while `drag="x"` is on. */
const DRAG_STYLE = {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  touchAction: "pan-y",
} as React.CSSProperties;

/** While a card is being dragged, hover starts and ends are ignored (as in Framer). */
let dragActive = false;

interface Run {
  tween: gsap.core.Tween;
  from: number;
  to: number;
  duration: number;
  ease: (progress: number) => number;
}

/** Speed of a running animation right now, so a new target keeps its momentum. */
function velocityOf(run: Run | undefined) {
  if (!run) return 0;
  const p = run.tween.progress();
  if (p >= 1) return 0;
  const a = Math.max(0, p - 0.001);
  const b = Math.min(1, p + 0.001);
  return (((run.ease(b) - run.ease(a)) / (b - a)) * (run.to - run.from)) / run.duration;
}

/** Spring (or tween) one numeric property of `state`, carrying over the velocity of the last run. */
function animateKey<T extends Record<string, number>>(
  state: T,
  runs: Partial<Record<keyof T, Run>>,
  key: keyof T,
  to: number,
  render: () => void,
  tween?: { duration: number; ease: (progress: number) => number },
  spring: { stiffness: number; damping: number } = SLOT_SPRING,
) {
  const velocity = velocityOf(runs[key]);
  runs[key]?.tween.kill();
  delete runs[key];
  const from = state[key];
  if (from === to) return;
  const { duration, ease } =
    tween ?? springEase({ ...spring, velocity: velocity / (to - from) });
  const run = gsap.to(state, { [key]: to, duration, ease, onUpdate: render });
  runs[key] = { tween: run, from, to, duration, ease };
}

function outerTransform(s: Slot) {
  let t = "";
  if (s.x) t += `translateX(${s.x}px) `;
  if (s.z) t += `translateZ(${s.z}px) `;
  if (s.scale !== 1) t += `scale(${s.scale}) `;
  if (s.rotateY) t += `rotateY(${s.rotateY}deg) `;
  return t ? t.trim() : "none";
}

function innerTransform(scale: number, rotateX: number, rotateY: number) {
  let t = "";
  if (scale !== 1) t += `scale(${scale}) `;
  if (rotateX) t += `rotateX(${rotateX}deg) `;
  if (rotateY) t += `rotateY(${rotateY}deg) `;
  return t ? t.trim() : "none";
}

function slotFor(offset: number, spacing: number): Slot {
  const isCenter = offset === 0;
  return {
    x: offset * spacing,
    scale: isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15),
    rotateY: offset * -22,
    z: -Math.abs(offset) * 140,
    zIndex: 30 - Math.abs(offset) * 10,
    opacity: isCenter ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.35),
  };
}

/** Card spacing: tighter under 640px. Read on the client only. */
const spacingNow = () => (window.innerWidth < 640 ? 120 : 220);

/** Tilt range: pointer offset ±150px maps onto ±14deg, clamped. */
const tiltFrom = (offset: number) =>
  Math.max(-14, Math.min(14, (offset / 150) * 14));

// Sub-component for individual cards to cleanly manage 3D tilt without loop issues
interface CarouselCardProps {
  item: CarouselItem;
  index: number;
  activeIndex: number;
  total: number;
  onClick: () => void;
  onDragEnd: (offsetX: number) => void;
}

function CarouselCard({
  item,
  index,
  activeIndex,
  total,
  onClick,
  onDragEnd,
}: CarouselCardProps) {
  // Calculate circular distance offset for fanned 3D layout
  let diff = (index - activeIndex) % total;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;

  const offset = diff;
  const isCenter = offset === 0;
  const hidden = Math.abs(offset) > 2;

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // The server has no window, so markup always starts from the desktop
  // spacing; the real spacing is applied before the first paint.
  const [serverStyle] = useState(() => {
    const slot = slotFor(offset, 220);
    return { transform: outerTransform(slot), zIndex: slot.zIndex, opacity: slot.opacity };
  });

  const outer = useRef({
    el: null as HTMLDivElement | null,
    slot: slotFor(offset, 220),
    targets: slotFor(offset, 220),
    runs: {} as Partial<Record<SlotKey, Run>>,
  });
  const inner = useRef({
    el: null as HTMLDivElement | null,
    pose: { scale: 1, rotateX: 0, rotateY: 0 },
    runs: {} as Partial<Record<"scale", Run>>,
    hovered: false,
    hoverScale: 1,
  });
  const tilt = useRef<{ set: (x: number, y: number) => void } | null>(null);
  const endDrag = useRef<(() => void) | null>(null);
  const dragEnd = useRef(onDragEnd);
  // Latest callback for the drag release; synced after commit, never in render.
  useLayoutEffect(() => {
    dragEnd.current = onDragEnd;
  });

  const renderOuter = () => {
    const { el, slot } = outer.current;
    if (!el) return;
    el.style.transform = outerTransform(slot);
    el.style.zIndex = String(Math.round(slot.zIndex));
    el.style.opacity = String(slot.opacity);
  };
  const renderInner = () => {
    const { el, pose } = inner.current;
    if (el) el.style.transform = innerTransform(pose.scale, pose.rotateX, pose.rotateY);
  };

  // 3D Tilt springs for interactive hover; they outlive the card's DOM while
  // it is out of the fan, exactly like the hooks they replace.
  useLayoutEffect(() => {
    const rotateX = createSpringFollower(
      0,
      (v) => {
        inner.current.pose.rotateX = v;
        renderInner();
      },
      { ...TILT_SPRING, ticker: gsapTicker },
    );
    const rotateY = createSpringFollower(
      0,
      (v) => {
        inner.current.pose.rotateY = v;
        renderInner();
      },
      { ...TILT_SPRING, ticker: gsapTicker },
    );
    tilt.current = {
      set: (x, y) => {
        rotateX.set(-tiltFrom(y));
        rotateY.set(tiltFrom(x));
      },
    };
    const outerMotion = outer.current;
    const innerMotion = inner.current;
    return () => {
      rotateX.destroy();
      rotateY.destroy();
      tilt.current = null;
      endDrag.current?.();
      Object.values(outerMotion.runs).forEach((run) => run?.tween.kill());
      outerMotion.runs = {};
      outerMotion.el = null;
      innerMotion.runs.scale?.tween.kill();
      innerMotion.runs = {};
      innerMotion.el = null;
    };
  }, []);

  // Fan into the slot for this offset on every render (initial={false}: a
  // card entering the fan appears in place).
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    const el = outerRef.current;
    if (!el) {
      if (o.el) {
        Object.values(o.runs).forEach((run) => run?.tween.kill());
        o.runs = {};
        o.el = null;
        i.runs.scale?.tween.kill();
        i.runs = {};
        i.el = null;
      }
      return;
    }
    const target = slotFor(offset, spacingNow());
    if (o.el !== el) {
      o.el = el;
      o.slot = { ...target };
      o.targets = { ...target };
      renderOuter();
      // A fresh face: no hover yet, but the tilt springs carry on.
      i.el = innerRef.current;
      i.pose.scale = 1;
      i.hovered = false;
      renderInner();
      return;
    }
    (Object.keys(target) as SlotKey[]).forEach((key) => {
      if (o.targets[key] === target[key]) return;
      o.targets[key] = target[key];
      animateKey(o.slot, o.runs, key, target[key], renderOuter);
    });
    // Hovered while the card changes role: move to the new hover scale.
    const hoverScale = isCenter ? 1.02 : 1.05;
    if (i.hovered && i.hoverScale !== hoverScale) {
      i.hoverScale = hoverScale;
      animateKey(i.pose, i.runs, "scale", hoverScale, renderInner, { duration: 0.2, ease: HOVER_EASE });
    }
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    tilt.current?.set(e.clientX - centerX, e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    tilt.current?.set(0, 0);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || dragActive) return;
    const i = inner.current;
    i.hovered = true;
    i.hoverScale = isCenter ? 1.02 : 1.05;
    animateKey(i.pose, i.runs, "scale", i.hoverScale, renderInner, { duration: 0.2, ease: HOVER_EASE });
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const i = inner.current;
    if (e.pointerType === "touch" || dragActive || !i.hovered) return;
    i.hovered = false;
    animateKey(i.pose, i.runs, "scale", 1, renderInner, undefined, HOVER_OUT_SPRING);
  };

  // Horizontal drag of the centre card: 0/0 constraints with 0.2 elastic, so
  // it trails the pointer at 0.2x and springs home on release.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" ? e.button > 0 : e.isPrimary === false) return;
    const o = outer.current;
    endDrag.current?.();
    // Grabbing the card stops whatever its x was doing.
    o.runs.x?.tween.kill();
    delete o.runs.x;

    const startX = e.pageX;
    const startY = e.pageY;
    let lastX = startX;
    let originX = 0;
    let dragging = false;

    const move = (ev: PointerEvent) => {
      lastX = ev.pageX;
      const offsetX = ev.pageX - startX;
      if (!dragging) {
        if (Math.hypot(offsetX, ev.pageY - startY) < 3) return;
        dragging = true;
        dragActive = true;
        originX = o.slot.x;
      }
      o.slot.x = (originX + offsetX) * DRAG_ELASTIC;
      renderOuter();
    };
    const up = (ev: PointerEvent) => {
      remove();
      if (!dragging) return;
      const offsetX = (ev.type === "pointercancel" ? lastX : ev.pageX) - startX;
      animateKey(o.slot, o.runs, "x", 0, renderOuter, undefined, BOUNCE_SPRING);
      requestAnimationFrame(() => dragEnd.current(offsetX));
    };
    const remove = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (dragging) dragActive = false;
      endDrag.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    endDrag.current = remove;
  };

  // Do not render cards that are too far out of the fan view
  if (hidden) return null;

  return (
    <div
      ref={outerRef}
      onClick={onClick}
      onPointerDown={isCenter ? handlePointerDown : undefined}
      draggable={isCenter ? false : undefined}
      style={isCenter ? { ...serverStyle, ...DRAG_STYLE } : serverStyle}
      className={cn(
        "absolute w-[280px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[400px] md:h-[420px] rounded-3xl",
        isCenter
          ? "cursor-grab active:cursor-grabbing z-30"
          : "cursor-pointer z-10",
      )}
    >
      {/* Inner wrapper separates hover tilt transforms from outer fanned layout transforms */}
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={cn(
          "w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300",
          "bg-card border border-border",
          isCenter
            ? "shadow-primary/20 dark:shadow-primary/20 ring-2 ring-primary/30"
            : "hover:border-primary/50 shadow-md",
        )}
      >
        {/* Image Background */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
          />

          {/* Theme Adaptive Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />

          {/* Content Payload */}
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md w-fit mb-2 text-primary-foreground shadow-sm">
              {item.category}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-1 leading-snug">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ThreeDCarousel = React.forwardRef<
  HTMLDivElement,
  ThreeDCarouselProps
>(
  (
    { items, autoPlay = true, autoPlayInterval = 4000, className, ...props },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const total = items.length;

    const handleNext = useCallback(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const handlePrev = useCallback(() => {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Keyboard Navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

    // Auto-Play Timer
    useEffect(() => {
      if (isPlaying && !isHovered) {
        timerRef.current = setInterval(handleNext, autoPlayInterval);
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [isPlaying, isHovered, handleNext, autoPlayInterval]);

    // Drag / Swipe Interaction
    const handleDragEnd = (offsetX: number) => {
      const threshold = 50;
      if (offsetX < -threshold) {
        handleNext();
      } else if (offsetX > threshold) {
        handlePrev();
      }
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full h-[500px] md:h-[580px] flex flex-col items-center justify-center overflow-hidden select-none py-6",
          className,
        )}
        {...props}
      >
        {/* 3D Fanned Cards Container */}
        <div className="relative w-full max-w-4xl h-[360px] md:h-[420px] flex items-center justify-center perspective-[1200px]">
          {items.map((item, index) => (
            <CarouselCard
              key={item.id}
              item={item}
              index={index}
              activeIndex={activeIndex}
              total={total}
              onClick={() => index !== activeIndex && setActiveIndex(index)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>

        {/* Navigation Controls Bar */}
        <div className="flex items-center gap-4 mt-6 z-10">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="p-3 rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary/30 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Auto-play Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
            className="p-3 rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary/30 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="p-3 rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary/30 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mt-4 z-10">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === activeIndex
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-muted hover:bg-primary/50",
              )}
            />
          ))}
        </div>
      </div>
    );
  },
);

ThreeDCarousel.displayName = "ThreeDCarousel";
