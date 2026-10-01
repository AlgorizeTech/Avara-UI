"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Calendar, MapPin, RotateCcw, Sparkles } from "lucide-react";
import React, { useLayoutEffect, useReducer, useRef, useState } from "react";
import { bezierEase, gsapTicker } from "./gsap-motion";
import {
  createSpringFollower,
  MOTION_EASE,
  springEase,
  type SpringFollower,
} from "./motion-curves";

export interface MemoryItem {
  id: string;
  title: string;
  location?: string;
  date?: string;
  image: string;
  description?: string;
  tag?: string;
}

export interface MemoriesCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: MemoryItem[];
  onCardChange?: (index: number) => void;
}

// ------------------------------------------
// Motion — the same numbers as the motion/ build
// ------------------------------------------

/** Every card's pose, written to the DOM as one transform in Motion's order. */
type Pose = {
  x: number;
  y: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  opacity: number;
};
type PoseKey = keyof Pose;

/** Where a card starts when it joins the deck. */
const MOUNT_POSE: Pose = { x: 0, y: 50, scale: 0.8, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 0 };
const MOUNT_STYLE = { opacity: 0, transform: "translateY(50px) scale(0.8)" };

/** Fan slots and the mount entrance. */
const SLOT_SPRING = { stiffness: 260, damping: 25 };
/** Hover tilt on the front card. */
const TILT_SPRING = { stiffness: 300, damping: 25 };
/** The spring that pulls a released card back inside its 0/0 drag constraints. */
const BOUNCE_SPRING = { stiffness: 200, damping: 40 };
const DRAG_ELASTIC = 0.6;
/** Leaving the deck: a 0.3s tween on Motion's default `easeOut`. */
const EXIT_EASE = bezierEase(MOTION_EASE.easeOut);

/** Drag styles Motion puts on an element while `drag="x"` is on. */
const DRAG_STYLE: React.CSSProperties = {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  touchAction: "pan-y",
} as React.CSSProperties;

interface SpringRun {
  tween: gsap.core.Tween;
  from: number;
  to: number;
  duration: number;
  ease: (progress: number) => number;
}

interface CardMotion {
  el: HTMLDivElement | null;
  pose: Pose;
  /** The last slot values asked for — only a changed value animates. */
  targets: Partial<Pose>;
  runs: Partial<Record<PoseKey, SpringRun>>;
  exit: gsap.core.Tween | null;
  /** Wears the hover tilt (the front card, including one that is leaving). */
  tilted: boolean;
}

function frameTransform(p: Pose) {
  let t = "";
  if (p.x) t += `translateX(${p.x}px) `;
  if (p.y) t += `translateY(${p.y}px) `;
  if (p.scale !== 1) t += `scale(${p.scale}) `;
  if (p.rotateX) t += `rotateX(${p.rotateX}deg) `;
  if (p.rotateY) t += `rotateY(${p.rotateY}deg) `;
  if (p.rotateZ) t += `rotateZ(${p.rotateZ}deg) `;
  return t ? t.trim() : "none";
}

function renderPose(card: CardMotion) {
  if (!card.el) return;
  card.el.style.transform = frameTransform(card.pose);
  card.el.style.opacity = String(card.pose.opacity);
}

/** Speed of a running spring right now, so a new target keeps its momentum. */
function velocityOf(run: SpringRun | undefined) {
  if (!run) return 0;
  const p = run.tween.progress();
  if (p >= 1) return 0;
  const a = Math.max(0, p - 0.001);
  const b = Math.min(1, p + 0.001);
  return (((run.ease(b) - run.ease(a)) / (b - a)) * (run.to - run.from)) / run.duration;
}

function stop(card: CardMotion, key: PoseKey) {
  card.runs[key]?.tween.kill();
  delete card.runs[key];
}

function springTo(
  card: CardMotion,
  key: PoseKey,
  to: number,
  spring: { stiffness: number; damping: number },
) {
  const velocity = velocityOf(card.runs[key]);
  stop(card, key);
  const from = card.pose[key];
  if (from === to) return;
  const { duration, ease } = springEase({ ...spring, velocity: velocity / (to - from) });
  const tween = gsap.to(card.pose, {
    [key]: to,
    duration,
    ease,
    onUpdate: () => renderPose(card),
  });
  card.runs[key] = { tween, from, to, duration, ease };
}

// Calculate fanned background spread offsets
function slotFor(index: number): Partial<Pose> {
  const isFront = index === 0;
  const fanRotate = index === 1 ? 6 : index === 2 ? -6 : index * 4;
  const fanX = index === 1 ? 24 : index === 2 ? -24 : 0;
  const fanY = index * 12;
  return {
    scale: 1 - index * 0.05,
    rotateZ: isFront ? 0 : fanRotate,
    x: isFront ? 0 : fanX,
    y: isFront ? 0 : fanY,
    opacity: 1 - index * 0.2,
  };
}

/** Tilt range: pointer offset ±150px maps onto ±14deg, clamped. */
const tiltFrom = (offset: number) =>
  Math.max(-14, Math.min(14, (offset / 150) * 14));

/** A card on screen: in the deck, or still flying out of it. */
interface StackEntry {
  item: MemoryItem;
  index: number;
  zIndex: number;
  present: boolean;
}

export const MemoriesCard = React.forwardRef<HTMLDivElement, MemoriesCardProps>(
  ({ items, onCardChange, className, ...props }, ref) => {
    const [cards, setCards] = useState<MemoryItem[]>(items);
    // The swiped card leaves toward the side it was thrown.
    const [exitDirection, setExitDirection] = useState(1);
    const [, forceRender] = useReducer((n: number) => n + 1, 0);

    const elements = useRef(new Map<string, HTMLDivElement>());
    const motions = useRef(new Map<string, CardMotion>());
    const rendered = useRef<StackEntry[]>([]);
    const exited = useRef(new Set<string>());
    const tilt = useRef<{ x: SpringFollower; y: SpringFollower } | null>(null);
    const endDrag = useRef<(() => void) | null>(null);

    // 3D Tilt springs for the front card, fed by the pointer offset from its centre
    useLayoutEffect(() => {
      const apply = () =>
        motions.current.forEach((card) => {
          if (!card.tilted || !tilt.current) return;
          card.pose.rotateX = tilt.current.x.get();
          card.pose.rotateY = tilt.current.y.get();
          renderPose(card);
        });
      tilt.current = {
        x: createSpringFollower(0, apply, { ...TILT_SPRING, ticker: gsapTicker }),
        y: createSpringFollower(0, apply, { ...TILT_SPRING, ticker: gsapTicker }),
      };
      const cardMotions = motions.current;
      return () => {
        tilt.current?.x.destroy();
        tilt.current?.y.destroy();
        tilt.current = null;
        endDrag.current?.();
        // Forget what was asked for, so a remount (Strict Mode) picks every
        // animation up again from where it stopped.
        cardMotions.forEach((card) => {
          Object.values(card.runs).forEach((run) => run?.tween.kill());
          card.runs = {};
          card.targets = {};
          card.exit?.kill();
          card.exit = null;
        });
      };
    }, []);

    const setTilt = (offsetX: number, offsetY: number) => {
      tilt.current?.x.set(-tiltFrom(offsetY));
      tilt.current?.y.set(tiltFrom(offsetX));
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setTilt(e.clientX - centerX, e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      setTilt(0, 0);
    };

    const handleDragEnd = (offsetX: number) => {
      const threshold = 80;
      if (Math.abs(offsetX) > threshold) {
        setExitDirection(offsetX < 0 ? -1 : 1);
        // Remove front card and push to the back of the stack
        setCards((prev) => {
          const newStack = [...prev];
          const removed = newStack.shift();
          if (removed) newStack.push(removed);

          // Fixed: Pass the correct original index of the NEW front card to the parent
          if (onCardChange && newStack[0]) {
            const nextActiveIndex = items.findIndex(
              (orig) => orig.id === newStack[0].id,
            );
            onCardChange(nextActiveIndex);
          }

          return newStack;
        });
        setTilt(0, 0);
      }
    };
    const dragEnd = useRef(handleDragEnd);
    dragEnd.current = handleDragEnd;

    // Horizontal drag of the front card: 0/0 constraints with 0.6 elastic, so
    // the card trails the pointer at 0.6x and springs home on release.
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
      if (e.pointerType === "mouse" ? e.button > 0 : e.isPrimary === false) return;
      const card = motions.current.get(id);
      if (!card) return;
      endDrag.current?.();
      // Grabbing the card stops whatever its x and y were doing.
      stop(card, "x");
      stop(card, "y");

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
          originX = card.pose.x;
        }
        card.pose.x = (originX + offsetX) * DRAG_ELASTIC;
        renderPose(card);
      };
      const up = (ev: PointerEvent) => {
        remove();
        if (!dragging) return;
        const offsetX = (ev.type === "pointercancel" ? lastX : ev.pageX) - startX;
        springTo(card, "x", 0, BOUNCE_SPRING);
        requestAnimationFrame(() => dragEnd.current(offsetX));
      };
      const remove = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        endDrag.current = null;
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
      endDrag.current = remove;
    };

    const handleReset = () => {
      setExitDirection(1);
      setCards(items);
      if (onCardChange) onCardChange(0);
    };

    // Cards in the deck (the first four), plus any still flying out, kept
    // where they sat in the previous render.
    const present: StackEntry[] = [];
    cards.forEach((item, index) => {
      // Hide cards deep in the stack for performance
      if (index > 3) return;
      present.push({ item, index, zIndex: cards.length - index, present: true });
    });
    const presentIds = new Set(present.map((entry) => entry.item.id));
    const entries = [...present];
    rendered.current.forEach((entry, i) => {
      if (presentIds.has(entry.item.id) || exited.current.has(entry.item.id)) return;
      entries.splice(i, 0, { ...entry, present: false });
    });

    useLayoutEffect(() => {
      const seen = new Set<string>();
      entries.forEach((entry) => {
        const id = entry.item.id;
        seen.add(id);
        let card = motions.current.get(id);
        if (!card) {
          card = { el: null, pose: { ...MOUNT_POSE }, targets: {}, runs: {}, exit: null, tilted: false };
          motions.current.set(id, card);
        }
        card.el = elements.current.get(id) ?? null;

        const tilted = entry.index === 0;
        if (tilted !== card.tilted) {
          card.tilted = tilted;
          card.pose.rotateX = tilted && tilt.current ? tilt.current.x.get() : 0;
          card.pose.rotateY = tilted && tilt.current ? tilt.current.y.get() : 0;
          renderPose(card);
        }

        if (entry.present) {
          exited.current.delete(id);
          if (card.exit) {
            card.exit.kill();
            card.exit = null;
            card.targets = {};
          }
          const slot = slotFor(entry.index);
          (Object.keys(slot) as PoseKey[]).forEach((key) => {
            const value = slot[key] as number;
            if (card.targets[key] === value) return;
            card.targets[key] = value;
            springTo(card, key, value, SLOT_SPRING);
          });
        } else if (!card.exit) {
          const leaving = card;
          (["x", "rotateZ", "opacity"] as const).forEach((key) => stop(leaving, key));
          leaving.exit = gsap.to(leaving.pose, {
            x: exitDirection * 350,
            opacity: 0,
            rotateZ: exitDirection * 20,
            duration: 0.3,
            ease: EXIT_EASE,
            onUpdate: () => renderPose(leaving),
            onComplete: () => {
              exited.current.add(id);
              forceRender();
            },
          });
        }
      });

      motions.current.forEach((card, id) => {
        if (seen.has(id)) return;
        Object.values(card.runs).forEach((run) => run?.tween.kill());
        card.exit?.kill();
        motions.current.delete(id);
        exited.current.delete(id);
      });
      rendered.current = entries;
    });

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full min-h-[520px] flex flex-col items-center justify-center py-8 select-none perspective-[1200px]",
          className,
        )}
        {...props}
      >
        {/* Card Stack Container */}
        <div className="relative w-[300px] sm:w-[340px] md:w-[380px] h-[440px] sm:h-[480px] flex items-center justify-center">
          {entries.map(({ item, index, zIndex, present: isPresent }) => {
            const isFront = index === 0;
            const canDrag = isFront && isPresent;

            // Fixed: Lookup card's original sequence index in the immutable items prop
            const originalIndex = items.findIndex(
              (orig) => orig.id === item.id,
            );

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) elements.current.set(item.id, el);
                  else elements.current.delete(item.id);
                }}
                style={
                  isFront
                    ? { ...MOUNT_STYLE, zIndex, ...DRAG_STYLE }
                    : { ...MOUNT_STYLE, zIndex }
                }
                draggable={isFront ? false : undefined}
                onMouseMove={isFront ? handleMouseMove : undefined}
                onMouseLeave={isFront ? handleMouseLeave : undefined}
                onPointerDown={canDrag ? (e) => handlePointerDown(e, item.id) : undefined}
                className={cn(
                  "absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300",
                  "bg-card border border-border/80",
                  isFront
                    ? "cursor-grab active:cursor-grabbing shadow-primary/20 dark:shadow-primary/20 ring-2 ring-primary/30"
                    : "pointer-events-none hover:border-primary/50 shadow-md shadow-zinc-300/40 dark:shadow-black/50",
                )}
              >
                {/* Card Background Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-5 inset-x-5 flex items-center justify-between pointer-events-none text-white">
                    {item.tag ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        {item.tag}
                      </span>
                    ) : (
                      <div />
                    )}

                    {/* Fixed: Displays actual sequence (1/4, 2/4, etc.) based on original index */}
                    <span className="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {originalIndex + 1} / {items.length}
                    </span>
                  </div>

                  {/* Bottom Metadata Payload */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-300 dark:text-zinc-400 mb-2">
                      {item.date && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {item.date}
                        </span>
                      )}
                      {item.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2 leading-snug text-white">
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
            );
          })}
        </div>

        {/* Action Controls & Instructions */}
        <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[380px] mt-6 px-2 z-40">
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            ← Swipe card left or right to cycle →
          </span>

          <button
            onClick={handleReset}
            title="Reset stack order"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-background border border-border px-3 py-1.5 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary/30 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>
    );
  },
);

MemoriesCard.displayName = "MemoriesCard";
