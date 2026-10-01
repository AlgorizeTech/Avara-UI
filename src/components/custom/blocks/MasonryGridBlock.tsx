"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
// gsap/dist: the plain "gsap/Flip" path clashes with types/flip.d.ts on case-insensitive file systems.
import { Flip } from "gsap/dist/Flip";
import React, { useLayoutEffect, useRef } from "react";
import { bezierEase } from "./gsap-motion";
import { LAYOUT_TRANSITION, springEase } from "./motion-curves";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export interface MasonryGridProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnsClassName?: string;
  gapClassName?: string;
  animateIn?: boolean;
  staggerDelay?: number;
}

/** The grid itself fades in over 0.3s on Framer's default opacity curve. */
const CONTAINER_EASE = bezierEase([0.25, 0.1, 0.35, 1]);
/** Each tile: one spring for opacity, rise, scale and blur. */
const ITEM_SPRING = springEase({ stiffness: 200, damping: 20, mass: 1 });
/** Reflow when items change: Framer's default layout transition. */
const LAYOUT_EASE = bezierEase(LAYOUT_TRANSITION.ease);

const ITEM_HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(40px) scale(0.95)",
  filter: "blur(8px)",
};

export function MasonryGrid<T extends { id: string | number }>({
  items,
  renderItem,
  columnsClassName = "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
  gapClassName = "gap-6",
  animateIn = true,
  staggerDelay = 0.08,
  className,
  style,
  ...props
}: MasonryGridProps<T>) {
  const itemSpacingClass = gapClassName.replace("gap-", "mb-");

  const containerRef = useRef<HTMLDivElement>(null);
  const tiles = useRef(new Map<string | number, HTMLDivElement>());
  const entering = useRef(new Set<HTMLDivElement>());
  const known = useRef(new Set<HTMLDivElement>());
  const revealed = useRef(false);

  // Tiles' boxes before this render commits, for the reflow below.
  const before = useRef<Flip.FlipState | null>(null);
  const captureBefore = () => {
    if (tiles.current.size > 0) {
      before.current = Flip.getState(Array.from(tiles.current.values()));
    }
  };

  /** Blur-fade a tile in: y 40 → 0, scale 0.95 → 1, opacity and blur on the same spring. */
  const enter = (el: HTMLDivElement, delay: number) => {
    entering.current.add(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: ITEM_SPRING.duration,
        ease: ITEM_SPRING.ease,
        delay,
        force3D: false,
        onUpdate() {
          el.style.filter = `blur(${Math.max(0, 8 * (1 - this.ratio))}px)`;
        },
        onComplete: () => {
          entering.current.delete(el);
          el.style.filter = "blur(0px)";
          gsap.set(el, { clearProps: "transform" });
        },
      },
    );
  };

  // Entrance: once, when the grid comes within 50px of the viewport.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!animateIn || !container) return;
    const ctx = gsap.context(() => {});
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        revealed.current = true;
        ctx.add(() => {
          gsap.to(container, { opacity: 1, duration: 0.3, ease: CONTAINER_EASE });
          Array.from(tiles.current.values())
            .sort((a, b) => (a.compareDocumentPosition(b) & 2 ? 1 : -1))
            .forEach((el, i) => enter(el, 0.1 + i * staggerDelay));
        });
      },
      { rootMargin: "-50px" },
    );
    observer.observe(container);
    const inFlight = entering.current;
    return () => {
      observer.disconnect();
      ctx.revert();
      inFlight.clear();
      revealed.current = false;
    };
  }, [animateIn, staggerDelay]);

  // After every commit: tiles added after the entrance come in on their own,
  // and tiles the columns moved glide from where they were.
  useLayoutEffect(() => {
    const state = before.current;
    before.current = null;
    const current = Array.from(tiles.current.values());
    const visible = !animateIn || revealed.current;
    current.forEach((el) => {
      if (!known.current.has(el) && animateIn && revealed.current) enter(el, 0);
    });
    known.current = new Set(current);
    if (!state || !visible) return;
    const moved = current.filter((el) => {
      if (entering.current.has(el)) return false;
      const was = state.getElementState(el)?.bounds;
      if (!was) return false;
      const now = el.getBoundingClientRect();
      return (
        Math.abs(was.left - now.left) > 0.5 ||
        Math.abs(was.top - now.top) > 0.5 ||
        Math.abs(was.width - now.width) > 0.5 ||
        Math.abs(was.height - now.height) > 0.5
      );
    });
    if (moved.length) {
      Flip.from(state, {
        targets: moved,
        duration: LAYOUT_TRANSITION.duration,
        ease: LAYOUT_EASE,
        scale: true,
        // Back to no transform at rest, as Framer leaves it.
        onComplete: () => {
          gsap.set(moved, { clearProps: "transform" });
        },
      });
    }
  });

  return (
    <BeforeCommit capture={captureBefore}>
      <div
        ref={containerRef}
        className={cn("w-full", columnsClassName, gapClassName, className)}
        style={animateIn ? { ...style, opacity: 0 } : style}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) tiles.current.set(item.id, el);
              else tiles.current.delete(item.id);
            }}
            style={animateIn ? ITEM_HIDDEN : undefined}
            // 2. FIXED GAP ISSUE: Added "inline-block w-full" to prevent margin collapse & awkward breaks
            className={cn(
              "break-inside-avoid inline-block w-full",
              itemSpacingClass,
            )}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </BeforeCommit>
  );
}

/**
 * Runs `capture` on every update, just before React touches the DOM (the
 * commit's before-mutation phase), so the grid can record where its tiles sat
 * before the new items/columns land. Renders nothing of its own.
 */
class BeforeCommit extends React.Component<{
  capture: () => void;
  children: React.ReactNode;
}> {
  getSnapshotBeforeUpdate() {
    this.props.capture();
    return null;
  }

  // Required alongside getSnapshotBeforeUpdate; the work happens in the grid's layout effect.
  componentDidUpdate() {}

  render() {
    return this.props.children;
  }
}
