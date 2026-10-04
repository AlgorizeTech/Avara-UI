"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface StackCardItemProps {
  item: CardStackItem;
  offset: number;
  isTop: boolean;
  count: number;
  direction: number;
  slideMultiplier: number;
  swipeToDismiss: boolean;
  canDismiss: boolean;
  onDismiss: (dir: "left" | "right") => void;
  renderCard?: (item: CardStackItem, index: number, isTop: boolean) => React.ReactNode;
  cardClassName?: string;
}

function StackCardItem({
  item,
  offset,
  isTop,
  count,
  direction,
  slideMultiplier,
  swipeToDismiss,
  canDismiss,
  onDismiss,
  renderCard,
  cardClassName,
}: StackCardItemProps) {
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-260, 260], [-18, 18]);

  const rotate = offset * 1.6;
  const offsetX = offset * 8;
  const offsetY = -offset * 4;
  const zIndex = count - offset;

  const isDraggable = isTop && swipeToDismiss && canDismiss;

  return (
    <motion.div
      key={item.id}
      layout
      custom={direction}
      drag={isDraggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (!isDraggable) return;
        const threshold = 80;
        const velocityThreshold = 280;
        if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
          onDismiss("right");
        } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
          onDismiss("left");
        }
      }}
      variants={{
        initial: (dir: number) =>
          isTop && dir < 0
            ? {
                x: 220 * slideMultiplier,
                y: -10,
                rotate: 8 * slideMultiplier,
                opacity: 0,
                scale: 0.98,
                zIndex: count + 2,
              }
            : {
                x: offsetX,
                y: offsetY,
                rotate,
                opacity: 0,
                zIndex,
              },
        animate: {
          x: offsetX,
          y: offsetY,
          rotate,
          opacity: 1,
          scale: 1,
          zIndex,
        },
        exit: (dir: number) => ({
          x: (dir > 0 ? 320 : -320) * (swipeToDismiss ? 1 : slideMultiplier),
          y: -10,
          rotate: (dir > 0 ? 14 : -14) * (swipeToDismiss ? 1 : slideMultiplier),
          opacity: 0,
          scale: 0.96,
          zIndex: count + 2,
          transition: {
            duration: 0.26,
            ease: [0.25, 1, 0.5, 1],
          },
        }),
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.8,
      }}
      style={{
        transformOrigin: "bottom center",
        ...(isDraggable ? { x, rotate: dragRotate } : {}),
      }}
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
                  if (Math.abs(x.get()) > 5) {
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
    </motion.div>
  );
}

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
    const visibleItems: { item: CardStackItem; offset: number }[] = [];
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
              <AnimatePresence custom={direction} initial={false}>
                {visibleItems
                  .slice()
                  .reverse()
                  .map(({ item, offset }) => (
                    <StackCardItem
                      key={item.id}
                      item={item}
                      offset={offset}
                      isTop={offset === 0}
                      count={count}
                      direction={direction}
                      slideMultiplier={slideMultiplier}
                      swipeToDismiss={swipeToDismiss}
                      canDismiss={canDismiss}
                      onDismiss={handleDismissCard}
                      renderCard={renderCard}
                      cardClassName={cardClassName}
                    />
                  ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    );
  },
);

CardStack.displayName = "CardStack";

export default CardStack;
