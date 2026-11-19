"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useCallback, useRef } from "react";
import { getThemeStyles } from "./timeline-kit-theme";
import { useScrollProgress } from "./timeline-scroll";

export type TimelineStepsColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "violet"
  | "zinc"
  | (string & {});

export interface TimelineStepsItem {
  id: string | number;
  title: string;
  /** Small label above the title, such as a phase or a date. */
  date?: string;
  description?: string;
  /** Extra detail under the description. */
  content?: React.ReactNode;
  /** A button or link under the description. */
  action?: React.ReactNode;
}

export interface TimelineStepsBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TimelineStepsItem[];
  color?: TimelineStepsColor;
  /** The step shown before anything scrolls. */
  defaultIndex?: number;
  /** Fires when the step in focus changes. */
  onIndexChange?: (index: number) => void;
  /** Smooths the rail fill and the step fades. */
  animate?: boolean;
}

/**
 * A scroll-linked step list. Numbered nodes sit on a rail that fills with the
 * accent colour as the page (or the panel the timeline sits in) scrolls, and
 * the step on the focus line stays sharp while the rest fall back.
 *
 * It reads the scroll of its nearest scrolling ancestor, else the page. Click
 * a node to scroll that step into focus.
 */
export const TimelineStepsBlock = forwardRef<HTMLDivElement, TimelineStepsBlockProps>(
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
    const { progress, active, goTo } = useScrollProgress(hostRef, items.length, {
      focus: 0.4,
      initial: defaultIndex,
      onChange: onIndexChange,
    });

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
        <ol className="mx-auto my-0 w-fit max-w-full list-none p-0">
          {items.map((item, index) => {
            const reached = index <= active;
            const current = index === active;
            // How much of the rail below this node the focus line has covered.
            const fill = Math.min(1, Math.max(0, progress - index));

            return (
              <li
                key={item.id}
                className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 pb-24 last:pb-0 @lg/timeline:gap-x-7"
              >
                {index < items.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-5 -bottom-5 left-5 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-border"
                  >
                    <span
                      className="absolute inset-0 origin-top bg-[var(--timeline-color)] transition-transform duration-200 ease-out"
                      style={{ transform: `scaleY(${fill})` }}
                    />
                  </span>
                )}

                <button
                  type="button"
                  data-tl-anchor
                  onClick={() => goTo(index)}
                  aria-current={current ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${item.title}`}
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-[var(--timeline-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    reached
                      ? "border-[var(--timeline-color)] bg-[var(--timeline-color)] text-[var(--timeline-on-color)]"
                      : "border-border bg-background text-muted-foreground",
                    current &&
                      "ring-8 ring-[color-mix(in_oklab,var(--timeline-color)_16%,transparent)]",
                  )}
                >
                  {index + 1}
                </button>

                <div
                  className={cn(
                    "min-w-0 pt-1 transition-opacity duration-500",
                    current ? "opacity-100" : "opacity-45",
                  )}
                >
                  {item.date && (
                    <p className="mb-1.5 font-mono text-xs tracking-[0.18em] text-[var(--timeline-color)] uppercase">
                      {item.date}
                    </p>
                  )}
                  <h3 className="text-2xl font-light tracking-tight text-foreground @lg/timeline:text-4xl">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-3 max-w-xl text-sm/6 text-muted-foreground @lg/timeline:text-base/7">
                      {item.description}
                    </p>
                  )}
                  {item.content && <div className="mt-4 max-w-xl text-sm">{item.content}</div>}
                  {item.action && <div className="mt-4">{item.action}</div>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
);
TimelineStepsBlock.displayName = "TimelineStepsBlock";
