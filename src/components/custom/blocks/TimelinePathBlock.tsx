"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { getThemeStyles } from "./timeline-kit-theme";
import { useScrollProgress } from "./timeline-scroll";

export type TimelinePathColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "violet"
  | "zinc"
  | (string & {});

export interface TimelinePathItem {
  id: string | number;
  title: string;
  /** Small label above the title, such as a phase or a date. */
  date?: string;
  description?: string;
  icon?: React.ElementType;
}

export interface TimelinePathBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TimelinePathItem[];
  color?: TimelinePathColor;
  /** The stop in focus before anything scrolls. */
  defaultIndex?: number;
  /** Fires when the stop in focus changes. */
  onIndexChange?: (index: number) => void;
  /** Smooths the line draw and the card fades. */
  animate?: boolean;
}

type Point = { x: number; y: number };

/** Where a node sits from the top of its row, in px. */
const NODE_TOP = 30;
/** Container width, in px, from which the path winds between two lanes. */
const WIDE = 640;

/** One S-curve from `a` to `b`, leaving and arriving vertically. */
const curve = (a: Point, b: Point) => {
  const mid = (b.y - a.y) / 2;
  return `M${a.x} ${a.y}C${a.x} ${a.y + mid} ${b.x} ${b.y - mid} ${b.x} ${b.y}`;
};

/**
 * A scroll-linked timeline on a winding path. The line draws itself from stop
 * to stop as the page (or the panel the timeline sits in) scrolls, a glowing
 * head leads it, and each card lights up when the head reaches it.
 *
 * It reads the scroll of its nearest scrolling ancestor, else the page. Click
 * a card to scroll its stop into focus. On a narrow column the path hugs the
 * left edge and the cards stack to its right.
 */
export const TimelinePathBlock = forwardRef<HTMLDivElement, TimelinePathBlockProps>(
  (
    {
      items,
      color = "primary",
      defaultIndex = 0,
      onIndexChange,
      animate = true,
      className,
      style: styleProp,
      ...props
    },
    ref,
  ) => {
    const { style } = getThemeStyles(color as string);
    const hostRef = useRef<HTMLDivElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        hostRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );
    const listRef = useRef<HTMLOListElement>(null);
    const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
    const headRef = useRef<SVGCircleElement>(null);
    const [geometry, setGeometry] = useState<{
      width: number;
      height: number;
      wide: boolean;
      points: Point[];
    } | null>(null);

    const { progress, active, goTo } = useScrollProgress(hostRef, items.length, {
      focus: 0.45,
      initial: defaultIndex,
      onChange: onIndexChange,
    });

    // Measure the rows, then place a node on each one.
    useEffect(() => {
      const list = listRef.current;
      if (!list) return;
      const measure = () => {
        const width = list.clientWidth;
        const wide = width >= WIDE;
        // Only the rows: the path's own <svg> is a child of the list too.
        const points = Array.from(
          list.querySelectorAll<HTMLElement>(":scope > li"),
          (row, i) => ({
            x: wide ? width * (i % 2 === 0 ? 0.42 : 0.58) : 16 + (i % 2) * 8,
            y: row.offsetTop + NODE_TOP,
          }),
        );
        setGeometry({ width, height: list.clientHeight, wide, points });
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(list);
      return () => observer.disconnect();
    }, [items]);

    // Park the glowing head on the segment the focus line is crossing.
    useEffect(() => {
      const head = headRef.current;
      if (!head || !geometry || geometry.points.length < 2) return;
      const index = Math.min(Math.floor(progress), geometry.points.length - 2);
      const segment = segmentRefs.current[index];
      if (!segment) return;
      const t = Math.min(1, Math.max(0, progress - index));
      const point = segment.getPointAtLength(segment.getTotalLength() * t);
      head.setAttribute("cx", String(point.x));
      head.setAttribute("cy", String(point.y));
    }, [progress, geometry]);

    return (
      <div
        ref={setRefs}
        className={cn(
          "@container/timeline w-full",
          !animate && "[&_*]:!transition-none",
          className,
        )}
        style={{ ...style, ...styleProp }}
        {...props}
      >
        <ol ref={listRef} className="relative m-0 list-none p-0">
          {geometry && geometry.points.length > 0 && (
            <svg
              aria-hidden
              width={geometry.width}
              height={geometry.height}
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
              className="pointer-events-none absolute inset-0 overflow-visible"
            >
              {geometry.points.slice(0, -1).map((point, i) => {
                const d = curve(point, geometry.points[i + 1]);
                const fill = Math.min(1, Math.max(0, progress - i));
                return (
                  <g key={i}>
                    <path d={d} fill="none" className="stroke-border" strokeWidth={2} />
                    <path
                      ref={(el) => {
                        segmentRefs.current[i] = el;
                      }}
                      d={d}
                      fill="none"
                      pathLength={1}
                      strokeWidth={2}
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - fill}
                      className="stroke-[var(--timeline-color)]"
                    />
                  </g>
                );
              })}
              {geometry.points.map((point, i) => {
                const reached = i <= active;
                return (
                  <g key={i} transform={`translate(${point.x} ${point.y})`}>
                    {i === active && (
                      <circle
                        r={17}
                        className="fill-[var(--timeline-color)]"
                        opacity={0.18}
                      />
                    )}
                    <circle
                      r={9}
                      strokeWidth={2}
                      className={cn(
                        "fill-background transition-colors duration-500",
                        reached ? "stroke-[var(--timeline-color)]" : "stroke-border",
                      )}
                    />
                    <circle
                      r={3.5}
                      className={cn(
                        "transition-colors duration-500",
                        reached
                          ? "fill-[var(--timeline-color)]"
                          : "fill-muted-foreground/40",
                      )}
                    />
                  </g>
                );
              })}
              {geometry.points.length > 1 && (
                <circle
                  ref={headRef}
                  r={4.5}
                  cx={geometry.points[0].x}
                  cy={geometry.points[0].y}
                  className="fill-[var(--timeline-color)]"
                  style={{ filter: "drop-shadow(0 0 7px var(--timeline-color))" }}
                />
              )}
            </svg>
          )}

          {items.map((item, index) => {
            const Icon = item.icon;
            const current = index === active;
            const onLeft = index % 2 === 0;
            return (
              <li
                key={item.id}
                className="relative pb-14 pl-12 last:pb-0 @xl/timeline:pl-0"
              >
                <span
                  data-tl-anchor
                  aria-hidden
                  className="absolute top-[30px] left-0 size-px"
                />
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "block w-full rounded-2xl border bg-card/70 p-5 text-left backdrop-blur-sm outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[var(--timeline-color)] @xl/timeline:w-[calc(42%-2.25rem)]",
                    onLeft ? "@xl/timeline:mr-auto" : "@xl/timeline:ml-auto",
                    current
                      ? "border-[color-mix(in_oklab,var(--timeline-color)_45%,transparent)] opacity-100 shadow-[0_8px_40px_-12px_var(--timeline-glow)]"
                      : "border-border opacity-55",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    {Icon && (
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--timeline-color)_14%,transparent)] text-[var(--timeline-color)]">
                        <Icon aria-hidden className="size-4" />
                      </span>
                    )}
                    {item.date && (
                      <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        {item.date}
                      </span>
                    )}
                  </span>
                  <span className="mt-3 block text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="mt-1.5 block text-sm/6 text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
);
TimelinePathBlock.displayName = "TimelinePathBlock";
