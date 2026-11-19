"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsDown } from "lucide-react";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { getThemeStyles } from "./timeline-kit-theme";
import {
  useActiveIndex,
  usePrefersReducedMotion,
  useStepControls,
} from "./timeline-scroll";

export type TimelineRulerColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "violet"
  | "zinc"
  | (string & {});

export interface TimelineRulerItem {
  id: string | number;
  /** The label on the ruler, such as `Apr 2026`. */
  date: string;
  /** Names the entry in the detail panel. */
  title: string;
  /** A headline figure, shown large. */
  value?: React.ReactNode;
  /** The caption under the figure, or the body text when there is no figure. */
  description?: string;
  /** Avatar beside the title. */
  image?: string;
  /** Icon beside the title when there is no `image`. */
  icon?: React.ElementType;
  /** Extra detail under the caption. */
  content?: React.ReactNode;
  /** A small badge above the title, such as `Launch` or `Q2`. */
  tag?: string;
  /** A change against the previous entry, such as `+12%`. A leading `-` reads as a drop. */
  delta?: string;
  /** Short bullet points of what happened, shown as a checklist. */
  highlights?: string[];
  /** A button or link at the foot of the detail. */
  action?: React.ReactNode;
}

export interface TimelineRulerBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TimelineRulerItem[];
  color?: TimelineRulerColor;
  /** The entry in focus on mount. */
  defaultIndex?: number;
  /** Fires when the entry in focus changes. */
  onIndexChange?: (index: number) => void;
  /** Slides the ruler and fades the detail between entries. */
  animate?: boolean;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Ruler height and row pitch, in px. The wave path below is drawn from them. */
const HEIGHT = 528;
const ROW = 96;

/**
 * A date-ruler timeline. The labels slide past a fixed wavy rail, the one that
 * stops at the bulge is detailed on the right, and the round button steps on to
 * the next. Click a label, use the mouse wheel, arrow keys or drag to move.
 */
export const TimelineRulerBlock = forwardRef<HTMLDivElement, TimelineRulerBlockProps>(
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
    const reduced = usePrefersReducedMotion();
    const motion = animate && !reduced;
    const [active, setActive] = useActiveIndex(items.length, defaultIndex, onIndexChange);
    const hostRef = useRef<HTMLDivElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        hostRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );
    const detailRef = useRef<HTMLDivElement>(null);
    const step = useCallback((delta: number) => setActive(active + delta), [active, setActive]);
    // The whole panel scrolls the ruler: mouse wheel, arrow keys and drag.
    useStepControls(hostRef, { count: items.length, active, onStep: step });

    // Replay the detail's entrance whenever the entry changes.
    const first = useRef(true);
    useEffect(() => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (!motion) return;
      const animation = detailRef.current?.animate(
        [
          { opacity: 0, transform: "translateY(14px)", filter: "blur(4px)" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        ],
        { duration: 500, easing: EASE },
      );
      return () => animation?.cancel();
    }, [active, motion]);

    const item = items[active];
    if (!item) return null;
    const Icon = item.icon;
    const hasValue = item.value !== undefined && item.value !== null;

    return (
      <div
        ref={setRefs}
        tabIndex={0}
        role="group"
        aria-label="Timeline ruler"
        className={cn(
          "@container/timeline relative w-full touch-pan-x overflow-hidden rounded-3xl border border-border bg-card text-card-foreground outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--timeline-color)]/50",
          className,
        )}
        style={{ ...style, ...styleProp }}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_50%,color-mix(in_oklab,var(--timeline-color)_8%,transparent),transparent)]" />

        <div className="relative flex flex-col items-center @xl/timeline:flex-row @xl/timeline:items-center @xl/timeline:justify-center @xl/timeline:gap-6 @3xl/timeline:gap-12">
          {/* The ruler: labels move, the rail and button stay put. */}
          <div className="relative w-[264px] shrink-0 overflow-hidden" style={{ height: HEIGHT }}>
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)]">
              <div
                className="absolute top-0 left-0 w-[154px]"
                style={{
                  transform: `translateY(${HEIGHT / 2 - (active + 0.5) * ROW}px)`,
                  transition: motion ? `transform 650ms ${EASE}` : "none",
                }}
              >
                {items.map((entry, index) => {
                  const distance = Math.abs(index - active);
                  const current = distance === 0;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-current={current ? "true" : undefined}
                      className="flex w-full items-center justify-end gap-3 outline-none"
                      style={{ height: ROW }}
                    >
                      <span
                        className={cn(
                          "font-medium whitespace-nowrap transition-all duration-500",
                          current
                            ? "text-xl font-semibold text-foreground"
                            : distance === 1
                              ? "text-base text-muted-foreground"
                              : "text-sm text-muted-foreground/60",
                        )}
                      >
                        {entry.date}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "h-px transition-all duration-500",
                          current
                            ? "w-9 bg-foreground"
                            : distance === 1
                              ? "w-6 bg-border"
                              : "w-4 bg-border/60",
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <svg
                aria-hidden
                width={96}
                height={HEIGHT}
                viewBox={`0 0 96 ${HEIGHT}`}
                className="pointer-events-none absolute top-0 left-[158px]"
              >
                <path
                  d={`M32 0V${HEIGHT / 2 - 86}C32 ${HEIGHT / 2 - 46} 10 ${HEIGHT / 2 - 46} 10 ${HEIGHT / 2}C10 ${HEIGHT / 2 + 46} 32 ${HEIGHT / 2 + 46} 32 ${HEIGHT / 2 + 86}V${HEIGHT}`}
                  fill="none"
                  strokeWidth={1.5}
                  className="stroke-foreground/70"
                />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setActive(active === items.length - 1 ? 0 : active + 1)}
              aria-label={active === items.length - 1 ? "Back to the first entry" : "Next entry"}
              className="absolute top-1/2 left-[200px] flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-[0_0_30px_-6px_var(--timeline-glow)] backdrop-blur-md outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--timeline-color)] active:scale-95"
            >
              <ChevronsDown aria-hidden className="size-6" />
            </button>
          </div>

          {/* Detail for the entry in focus. */}
          <div
            ref={detailRef}
            aria-live="polite"
            className="min-w-0 px-6 pb-8 @xl/timeline:w-full @xl/timeline:max-w-lg @xl/timeline:flex-none @xl/timeline:px-0 @xl/timeline:py-8"
          >
            <div className="flex items-center justify-between gap-3">
              {item.tag ? (
                <span className="rounded-full bg-[color-mix(in_oklab,var(--timeline-color)_14%,transparent)] px-2.5 py-1 text-xs font-medium tracking-wide text-[var(--timeline-color)]">
                  {item.tag}
                </span>
              ) : (
                <span />
              )}
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="size-11 rounded-full border-2 border-background object-cover shadow ring-1 ring-border"
                />
              ) : Icon ? (
                <span className="flex size-11 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--timeline-color)_16%,transparent)] text-[var(--timeline-color)]">
                  <Icon aria-hidden className="size-5" />
                </span>
              ) : null}
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
            </div>

            {hasValue && (
              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-5xl font-semibold tracking-tight text-foreground tabular-nums @xl/timeline:text-6xl">
                  {item.value}
                </p>
                {item.delta && (
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-sm font-medium tabular-nums",
                      item.delta.trim().startsWith("-")
                        ? "bg-destructive/10 text-destructive"
                        : "bg-[color-mix(in_oklab,var(--timeline-color)_14%,transparent)] text-[var(--timeline-color)]",
                    )}
                  >
                    {item.delta}
                  </span>
                )}
              </div>
            )}
            {item.description && (
              <p
                className={cn(
                  "text-muted-foreground",
                  hasValue ? "mt-2 text-base font-medium" : "mt-4 max-w-md text-sm/6",
                )}
              >
                {item.description}
              </p>
            )}

            {item.highlights && item.highlights.length > 0 && (
              <ul className="m-0 mt-5 grid list-none gap-2 p-0">
                {item.highlights.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm/6 text-foreground/90">
                    <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--timeline-color)_16%,transparent)] text-[var(--timeline-color)]">
                      <Check aria-hidden className="size-3" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            )}
            {item.content && <div className="mt-4 text-sm">{item.content}</div>}
            {item.action && <div className="mt-5">{item.action}</div>}
          </div>
        </div>
      </div>
    );
  },
);
TimelineRulerBlock.displayName = "TimelineRulerBlock";
