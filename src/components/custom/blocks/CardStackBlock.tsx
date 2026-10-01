"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { bezierEase, prefersReducedMotion } from "./gsap-motion";
import { springEase } from "./motion-curves";

export interface CardStackItem {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  meta?: string;
  icon?: React.ReactNode | string;
  href?: string;
  [key: string]: unknown;
}

export interface CardStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardStackItem[];
  title?: string;
  /** Maximum number of cards visually stacked (front card + cards behind). Defaults to 3. */
  visibleCards?: number;
  /** Direction the card slides off on next: "right" | "left". Defaults to "right". */
  slideDirection?: "right" | "left";
  /** Whether the stack loops infinitely or stops at ends. Defaults to false. */
  loop?: boolean;
  /** Initial active card index. Defaults to 0. */
  defaultIndex?: number;
  /** Callback fired when the active card index changes. */
  onCardChange?: (index: number) => void;
  /** Callback fired when a card is dismissed/swiped. */
  onDismiss?: (item: CardStackItem, direction: "left" | "right") => void;
  /** Custom render function for card content. */
  renderCard?: (item: CardStackItem, index: number, isTop: boolean) => React.ReactNode;
  /** Custom class for individual cards. */
  cardClassName?: string;
  /** Enable dragging and swiping the top card to discard (left or right). Defaults to false. */
  swipeToDismiss?: boolean;
  /** Whether to show header navigation buttons (arrows). Defaults to true. Set to false for pure swipe-to-discard mode. */
  showNavigation?: boolean;
  /** Whether to render the header bar (title, counter, and navigation). Defaults to true. */
  showHeader?: boolean;
  /** Whether the last card can be dismissed in swipe mode. Defaults to false. */
  canDismissLastCard?: boolean;
}

// ============================================================================
// MOTION
// ============================================================================

/** Cards settle into their slot through this spring (position, tilt, fade). */
const SETTLE = springEase({ stiffness: 280, damping: 26, mass: 0.8 });
/** A card leaving the deck flies out over a fixed, fast-out curve. */
const EXIT = { duration: 0.26, ease: bezierEase([0.25, 1, 0.5, 1]) };

/** The card follows the pointer at 80% (an elastic pull against its slot). */
const DRAG_ELASTIC = 0.8;
/** Pointer travel before a press becomes a drag. */
const DRAG_START_PX = 3;
/** Release past this distance, or faster than this speed (px/s), to discard. */
const SWIPE_OFFSET = 80;
const SWIPE_VELOCITY = 280;
/** A drag released short of discarding springs back to the slot. */
const RETURN_SPRING = { stiffness: 200, damping: 40 };

/** Drag tilt: ±18° across ±260px of travel, clamped beyond. */
const dragTilt = (x: number) => Math.min(Math.max((x / 260) * 18, -18), 18);

interface CardPose {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  scale: number;
  zIndex: number;
}

/** Where a card rests at depth `offset` (0 is the front card). */
const restPose = (offset: number, count: number): CardPose => ({
  x: offset * 8,
  y: -offset * 4,
  rotation: offset * 1.6,
  opacity: 1,
  scale: 1,
  zIndex: count - offset,
});

/**
 * Where a card joining the deck starts: going back, the new front card swings
 * in from the slide side; any other newcomer fades in at its slot.
 */
const enterPose = (
  offset: number,
  count: number,
  direction: number,
  slideMultiplier: number,
): CardPose =>
  offset === 0 && direction < 0
    ? {
        x: 220 * slideMultiplier,
        y: -10,
        rotation: 8 * slideMultiplier,
        opacity: 0,
        scale: 0.98,
        zIndex: count + 2,
      }
    : { ...restPose(offset, count), opacity: 0 };

/** The first-paint style for a pose, so server HTML already shows the fan. */
const poseStyle = (pose: CardPose): React.CSSProperties => ({
  transform: `translate(${pose.x}px, ${pose.y}px) rotate(${pose.rotation}deg) scale(${pose.scale})`,
  opacity: pose.opacity,
  zIndex: pose.zIndex,
});

/** Pointer speed (px/s) over the last 100ms of samples. */
function releaseVelocity(history: { x: number; t: number }[]) {
  if (history.length < 2) return 0;
  const last = history[history.length - 1];
  let sample = history[0];
  for (let i = history.length - 1; i >= 0; i--) {
    sample = history[i];
    if (last.t - sample.t > 100) break;
  }
  const seconds = (last.t - sample.t) / 1000;
  return seconds === 0 ? 0 : (last.x - sample.x) / seconds;
}

// ============================================================================
// CARD
// ============================================================================

interface StackCardItemProps {
  item: CardStackItem;
  offset: number;
  isTop: boolean;
  count: number;
  /** The pose this card mounts in; read once, on mount. */
  start: CardPose;
  /** Set once the card has left the deck: it flies out, then unmounts. */
  exit: { x: number; rotation: number } | null;
  isDraggable: boolean;
  onSwipe: (dir: "left" | "right") => void;
  onExited: (id: CardStackItem["id"]) => void;
  renderCard?: (item: CardStackItem, index: number, isTop: boolean) => React.ReactNode;
  cardClassName?: string;
}

function StackCardItem({
  item,
  offset,
  isTop,
  count,
  start,
  exit,
  isDraggable,
  onSwipe,
  onExited,
  renderCard,
  cardClassName,
}: StackCardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [startPose] = useState(start);
  const [startStyle] = useState(() => poseStyle(start));
  /** Horizontal drag offset, for telling a drag from a click on the link. */
  const dragX = useRef(0);
  const endDrag = useRef<(() => void) | null>(null);
  const latestSwipe = useRef(onSwipe);

  useLayoutEffect(() => {
    latestSwipe.current = onSwipe;
  });

  const rest = restPose(offset, count);
  const { x, y, rotation, zIndex } = rest;
  const exiting = exit !== null;
  const exitX = exit?.x ?? 0;
  const exitRotation = exit?.rotation ?? 0;
  const id = item.id;

  // Mount: place the card in its starting pose before the first paint.
  useLayoutEffect(() => {
    if (ref.current) gsap.set(ref.current, startPose);
  }, [startPose]);

  // Settle into the slot, or fly out once the card has left the deck.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();

    if (exiting) {
      endDrag.current?.();
      const target = { x: exitX, y: -10, rotation: exitRotation, opacity: 0, scale: 0.96, zIndex: count + 2 };
      if (reduce) {
        gsap.set(el, target);
        onExited(id);
        return;
      }
      const tween = gsap.to(el, {
        ...target,
        duration: EXIT.duration,
        ease: EXIT.ease,
        overwrite: "auto",
        onComplete: () => onExited(id),
      });
      return () => {
        tween.kill();
      };
    }

    const target = { x, y, rotation, opacity: 1, scale: 1, zIndex };
    if (reduce) {
      gsap.set(el, target);
      return;
    }
    const tween = gsap.to(el, {
      ...target,
      duration: SETTLE.duration,
      ease: SETTLE.ease,
      overwrite: "auto",
    });
    return () => {
      tween.kill();
    };
  }, [x, y, rotation, zIndex, exiting, exitX, exitRotation, count, id, onExited]);

  // Unmount: drop any drag in progress and the drag's return spring.
  useEffect(() => {
    const el = ref.current;
    return () => {
      endDrag.current?.();
      if (el) gsap.killTweensOf(el);
    };
  }, []);

  const paintDrag = (el: HTMLElement, value: number) => {
    dragX.current = value;
    gsap.set(el, { x: value, rotation: dragTilt(value) });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !isDraggable || exiting) return;
    if (e.pointerType === "mouse" ? e.button !== 0 : e.isPrimary === false) return;
    endDrag.current?.();

    const pointerId = e.pointerId;
    const startX = e.pageX;
    const startY = e.pageY;
    const origin = Number(gsap.getProperty(el, "x")) || 0;
    const history = [{ x: e.pageX, t: performance.now() }];
    let lastX = e.pageX;
    let dragging = false;

    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      lastX = ev.pageX;
      history.push({ x: ev.pageX, t: performance.now() });
      const dx = ev.pageX - startX;
      if (!dragging) {
        if (Math.hypot(dx, ev.pageY - startY) < DRAG_START_PX) return;
        dragging = true;
        gsap.killTweensOf(el, "x,rotation");
      }
      paintDrag(el, (origin + dx) * DRAG_ELASTIC);
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      endDrag.current = null;
    };

    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;
      stop();
      if (!dragging) return;
      const offsetX = (ev.type === "pointercancel" ? lastX : ev.pageX) - startX;
      const velocity = releaseVelocity(history);
      if (offsetX > SWIPE_OFFSET || velocity > SWIPE_VELOCITY) {
        latestSwipe.current("right");
      } else if (offsetX < -SWIPE_OFFSET || velocity < -SWIPE_VELOCITY) {
        latestSwipe.current("left");
      } else {
        const from = dragX.current;
        if (from === 0) return;
        if (prefersReducedMotion()) {
          paintDrag(el, 0);
          return;
        }
        const { duration, ease } = springEase({
          ...RETURN_SPRING,
          restDelta: Math.min(1, 1 / Math.abs(from)),
        });
        gsap.to(el, {
          x: 0,
          duration,
          ease,
          overwrite: "auto",
          onUpdate: () => paintDrag(el, Number(gsap.getProperty(el, "x")) || 0),
        });
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    endDrag.current = stop;
  };

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      style={{ transformOrigin: "bottom center", ...startStyle }}
      className={cn(
        "absolute inset-x-0 bottom-0 top-0 rounded-[26px] border border-foreground/10 dark:border-foreground/15 bg-card p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6),0_2px_6px_-2px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden",
        isDraggable
          ? "cursor-grab active:cursor-grabbing touch-none select-none"
          : isTop
          ? "cursor-default select-none"
          : "pointer-events-none select-none",
        cardClassName,
      )}
    >
      {renderCard ? (
        renderCard(item, offset, isTop)
      ) : (
        <>
          {/* Card Header: Icon, Title, and Action Link */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              {item.icon && (
                <div className="size-12 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center pointer-events-none">
                  {typeof item.icon === "string" ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    item.icon
                  )}
                </div>
              )}
              <h3 className="font-bold text-xl text-foreground tracking-tight truncate pointer-events-none">
                {item.title}
              </h3>
            </div>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${item.title}`}
                onClick={(e) => {
                  // Prevent navigation if user was dragging
                  if (Math.abs(dragX.current) > 5) {
                    e.preventDefault();
                  }
                }}
                className="text-foreground hover:text-primary transition-colors p-0.5 shrink-0 z-20"
              >
                <ArrowUpRight className="size-6 stroke-[2.2]" />
              </a>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="mt-3 text-[15px] text-muted-foreground line-clamp-2 leading-relaxed font-normal pointer-events-none">
              {item.description}
            </p>
          )}

          {/* Footer Meta */}
          {(item.category || item.date || item.meta) && (
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground/80 pointer-events-none">
              {item.category && <span>{item.category}</span>}
              {item.category && (item.date || item.meta) && (
                <span>·</span>
              )}
              {item.date && <span>{item.date}</span>}
              {!item.date && item.meta && <span>{item.meta}</span>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================================
// DECK (keeps leaving cards mounted until they have flown out)
// ============================================================================

interface DeckEntry {
  item: CardStackItem;
  offset: number;
}

interface ExitingCard extends DeckEntry {
  exit: { x: number; rotation: number };
}

const sameDeck = (a: DeckEntry[], b: DeckEntry[]) =>
  a.length === b.length &&
  a.every((entry, i) => entry.item.id === b[i].item.id && entry.offset === b[i].offset);

interface CardDeckProps {
  visible: DeckEntry[];
  count: number;
  direction: 1 | -1;
  slideMultiplier: number;
  swipeToDismiss: boolean;
  canDismiss: boolean;
  onSwipe: (dir: "left" | "right") => void;
  renderCard?: (item: CardStackItem, index: number, isTop: boolean) => React.ReactNode;
  cardClassName?: string;
}

function CardDeck({
  visible,
  count,
  direction,
  slideMultiplier,
  swipeToDismiss,
  canDismiss,
  onSwipe,
  renderCard,
  cardClassName,
}: CardDeckProps) {
  const [shown, setShown] = useState(visible);
  const [exiting, setExiting] = useState<ExitingCard[]>([]);
  // The cards on screen when the deck mounts appear in place; any card that
  // joins later animates in.
  const [animateEntries, setAnimateEntries] = useState(false);

  if (!sameDeck(shown, visible)) {
    const ids = new Set(visible.map((entry) => entry.item.id));
    const left = shown.filter((entry) => !ids.has(entry.item.id));
    const flyX = 320 * (swipeToDismiss ? 1 : slideMultiplier);
    const flyRotation = 14 * (swipeToDismiss ? 1 : slideMultiplier);
    setExiting((prev) => [
      // A card that comes back mid-flight rejoins the deck from where it is.
      ...prev.filter((entry) => !ids.has(entry.item.id)),
      ...left.map((entry) => ({
        ...entry,
        exit: {
          x: direction > 0 ? flyX : -flyX,
          rotation: direction > 0 ? flyRotation : -flyRotation,
        },
      })),
    ]);
    setShown(visible);
    setAnimateEntries(true);
  }

  const handleExited = useCallback((id: CardStackItem["id"]) => {
    setExiting((prev) => prev.filter((entry) => entry.item.id !== id));
  }, []);

  const entries = [
    ...exiting.filter((entry) => !visible.some((v) => v.item.id === entry.item.id)),
    ...visible
      .slice()
      .reverse()
      .map((entry) => ({ ...entry, exit: null })),
  ];

  return (
    <>
      {entries.map(({ item, offset, exit }) => {
        const isTop = offset === 0;
        return (
          <StackCardItem
            key={item.id}
            item={item}
            offset={offset}
            isTop={isTop}
            count={count}
            start={
              animateEntries
                ? enterPose(offset, count, direction, slideMultiplier)
                : restPose(offset, count)
            }
            exit={exit}
            isDraggable={isTop && swipeToDismiss && canDismiss}
            onSwipe={onSwipe}
            onExited={handleExited}
            renderCard={renderCard}
            cardClassName={cardClassName}
          />
        );
      })}
    </>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const CardStack = React.forwardRef<HTMLDivElement, CardStackProps>(
  (
    {
      items,
      title,
      visibleCards = 3,
      slideDirection = "right",
      loop = false,
      defaultIndex = 0,
      onCardChange,
      onDismiss,
      renderCard,
      className,
      cardClassName,
      swipeToDismiss = false,
      showNavigation = true,
      showHeader = true,
      canDismissLastCard = false,
      ...props
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(
      Math.min(Math.max(0, defaultIndex), Math.max(0, items.length - 1)),
    );
    const [direction, setDirection] = useState<1 | -1>(1);

    if (!items || items.length === 0) {
      return null;
    }

    const total = items.length;
    const isCompleted = currentIndex >= total;
    const canPrev = loop ? true : currentIndex > 0;
    const canNext = loop ? true : currentIndex < total - 1;
    const canDismiss = loop || canDismissLastCard || currentIndex < total - 1;

    const handlePrev = () => {
      if (!canPrev) return;
      setDirection(-1);
      const nextIdx = currentIndex > 0 ? currentIndex - 1 : total - 1;
      setCurrentIndex(nextIdx);
      onCardChange?.(nextIdx);
    };

    const handleNext = () => {
      if (!canNext) return;
      setDirection(1);
      const nextIdx = currentIndex < total - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIdx);
      onCardChange?.(nextIdx);
    };

    const handleDismissCard = (dismissDir: "left" | "right") => {
      if (!canDismiss) return;
      const currentItem = items[currentIndex % total];
      setDirection(dismissDir === "right" ? 1 : -1);
      const nextIdx = loop ? (currentIndex + 1) % total : currentIndex + 1;
      setCurrentIndex(nextIdx);
      onDismiss?.(currentItem, dismissDir);
      onCardChange?.(nextIdx % total);
    };

    // Calculate visible cards from current index
    const visibleItems: DeckEntry[] = [];
    const count = Math.min(visibleCards, total);

    if (!isCompleted) {
      for (let i = 0; i < count; i++) {
        const itemIndex = (currentIndex + i) % total;
        if (!loop && currentIndex + i >= total) {
          break;
        }
        visibleItems.push({
          item: items[itemIndex],
          offset: i,
        });
      }
    }

    const slideMultiplier = slideDirection === "left" ? -1 : 1;

    return (
      <div
        ref={ref}
        className={cn("w-full max-w-[500px] select-none", className)}
        {...props}
      >
        {/* Header: Title/Counter on left, Navigation Arrows on right */}
        {showHeader && (
          <div className="flex items-center justify-between mb-4 px-1">
            {title ? (
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
            ) : (
              <span className="text-sm font-medium text-muted-foreground/80 tabular-nums">
                {isCompleted ? "0 left" : `${Math.min(currentIndex + 1, total)} of ${total}`}
              </span>
            )}
            <div className="flex items-center gap-3">
              {title && (
                <span className="text-sm font-medium text-muted-foreground/80 tabular-nums">
                  {isCompleted ? "0 left" : `${Math.min(currentIndex + 1, total)} of ${total}`}
                </span>
              )}
              {showNavigation && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={!canPrev}
                    aria-label="Previous card"
                    className="size-9 rounded-xl border border-foreground/10 dark:border-foreground/15 bg-card hover:bg-muted active:scale-95 transition-all flex items-center justify-center text-foreground disabled:opacity-30 disabled:pointer-events-none shadow-xs"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canNext}
                    aria-label="Next card"
                    className="size-9 rounded-xl border border-foreground/10 dark:border-foreground/15 bg-card hover:bg-muted active:scale-95 transition-all flex items-center justify-center text-foreground disabled:opacity-30 disabled:pointer-events-none shadow-xs"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stack Container with generous padding so stacked cards and shadows never clip */}
        <div className="relative w-full overflow-hidden pt-7 pr-12 pb-8 pl-2">
          <div className="relative h-[195px] sm:h-[200px] w-full">
            {isCompleted ? (
              <div className="size-full rounded-[26px] border border-dashed border-foreground/15 dark:border-foreground/20 flex flex-col items-center justify-center gap-3 p-6 text-center bg-muted/20">
                <p className="text-sm font-medium text-muted-foreground">
                  All cards have been reviewed!
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentIndex(0)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <RotateCcw className="size-3.5" />
                  Replay deck
                </button>
              </div>
            ) : (
              <CardDeck
                visible={visibleItems}
                count={count}
                direction={direction}
                slideMultiplier={slideMultiplier}
                swipeToDismiss={swipeToDismiss}
                canDismiss={canDismiss}
                onSwipe={handleDismissCard}
                renderCard={renderCard}
                cardClassName={cardClassName}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

CardStack.displayName = "CardStack";

export default CardStack;
