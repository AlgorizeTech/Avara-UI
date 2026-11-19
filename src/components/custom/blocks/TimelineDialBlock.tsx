"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { getThemeStyles } from "./timeline-kit-theme";
import {
  useActiveIndex,
  usePrefersReducedMotion,
  useStepControls,
} from "./timeline-scroll";

export type TimelineDialColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "violet"
  | "zinc"
  | (string & {});

export interface TimelineDialItem {
  id: string | number;
  title: string;
  /** Shown on the wheel and above the title, such as a year. */
  date: string;
  /** Small label above the title, such as `V1.0 RELEASED`. */
  eyebrow?: string;
  description?: string;
  icon?: React.ElementType;
}

export interface TimelineDialBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TimelineDialItem[];
  color?: TimelineDialColor;
  /** The entry in focus on mount. */
  defaultIndex?: number;
  /** Fires when the entry in focus changes. */
  onIndexChange?: (index: number) => void;
  /** Turns the wheel and fades the detail between entries. */
  animate?: boolean;
}

/** Degrees between two entries on the wheel. */
const STEP = 14;
/** Degrees between two tick marks; four ticks to an entry. */
const TICK = STEP / 4;
/** Entries further than this from the focus are hidden. */
const VISIBLE = 3;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * A wheel timeline. The entries ride an arc beside a ruler of tick marks, and
 * the one in focus is detailed on the left. Click an entry, use the arrows,
 * the mouse wheel, arrow keys or drag up and down to turn it.
 */
export const TimelineDialBlock = forwardRef<HTMLDivElement, TimelineDialBlockProps>(
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
    // The whole panel turns the wheel: mouse wheel, arrow keys and drag.
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
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 450, easing: EASE },
      );
      return () => animation?.cancel();
    }, [active, motion]);

    const item = items[active];
    if (!item) return null;

    const transition = motion ? `${650}ms ${EASE}` : "0ms";
    const total = String(items.length).padStart(2, "0");
    const lastTick = Math.floor(((items.length - 1) * STEP + 70) / TICK);
    const ticks = Array.from(
      { length: lastTick + Math.floor(70 / TICK) + 1 },
      (_, i) => (i - Math.floor(70 / TICK)) * TICK,
    );

    return (
      <div
        ref={setRefs}
        tabIndex={0}
        role="group"
        aria-label="Timeline wheel"
        className={cn(
          "@container/timeline relative w-full touch-pan-x overflow-hidden rounded-3xl border border-border bg-card text-card-foreground outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--timeline-color)]/50",
          className,
        )}
        style={{ ...style, ...styleProp }}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_50%,color-mix(in_oklab,var(--timeline-color)_9%,transparent),transparent)]" />

        <div className="relative flex flex-col @2xl/timeline:h-[39rem] @2xl/timeline:flex-row">
          {/* Detail for the entry in focus. */}
          <div className="flex shrink-0 flex-col justify-center gap-5 p-6 @2xl/timeline:w-[42%] @2xl/timeline:p-10">
            <div ref={detailRef} className="flex flex-col items-start gap-3" aria-live="polite">
              <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--timeline-color)_14%,transparent)] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--timeline-color)]">
                {item.icon && <item.icon aria-hidden className="size-3" />}
                {item.date}
              </span>
              {item.eyebrow && (
                <p className="text-xs font-semibold tracking-[0.16em] text-[var(--timeline-color)] uppercase">
                  {item.eyebrow}
                </p>
              )}
              <h3 className="text-3xl font-light tracking-tight text-foreground @2xl/timeline:text-5xl">
                {item.title}
              </h3>
              {item.description && (
                <p className="max-w-sm text-sm/6 text-muted-foreground">{item.description}</p>
              )}
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span>
                {String(active + 1).padStart(2, "0")} / {total}
              </span>
              <span className="flex gap-1">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={active === 0}
                  aria-label="Previous"
                  className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-30"
                >
                  <ChevronUp aria-hidden className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={active === items.length - 1}
                  aria-label="Next"
                  className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-30"
                >
                  <ChevronDown aria-hidden className="size-3.5" />
                </button>
              </span>
            </div>
          </div>

          {/* The wheel. */}
          <div className="relative h-[30rem] flex-1 overflow-hidden [--dial-r:12rem] [--dial-tick:6rem] [--dial-x:14%] @2xl/timeline:h-auto @2xl/timeline:[--dial-r:24rem] @2xl/timeline:[--dial-tick:11rem] @2xl/timeline:[--dial-x:24%]">
            {/* Everything below turns about the wheel's centre, to the left of the focus. */}
            <div
              className="absolute top-1/2 size-0"
              style={{ left: "calc(var(--dial-x) - var(--dial-r))" }}
            >
              {ticks.map((angle) => {
                const rel = angle - active * STEP;
                if (Math.abs(rel) > 62) return null;
                const major = Math.abs(angle % STEP) < 0.01;
                const focus = Math.abs(rel) < TICK / 2;
                return (
                  <span
                    key={angle}
                    aria-hidden
                    className={cn(
                      "absolute top-0 left-0 h-px origin-left rounded-full",
                      major ? "w-4" : "w-2.5",
                      focus
                        ? "h-0.5 w-10 bg-[var(--timeline-color)] shadow-[0_0_10px_var(--timeline-glow)]"
                        : "bg-foreground",
                    )}
                    style={{
                      opacity: focus ? 1 : Math.max(0, 0.5 - Math.abs(rel) / 140),
                      transform: `rotate(${rel}deg) translateX(calc(var(--dial-r) + var(--dial-tick)))`,
                      transition: `transform ${transition}, opacity ${transition}`,
                    }}
                  />
                );
              })}

              {items.map((entry, index) => {
                const offset = index - active;
                const shown = Math.abs(offset) <= VISIBLE;
                const angle = offset * STEP;
                const current = offset === 0;
                const Icon = entry.icon;
                return (
                  <div
                    key={entry.id}
                    className="pointer-events-none absolute top-0 left-0 size-0"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transition: `transform ${transition}`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0"
                      style={{
                        transform: `translateX(var(--dial-r)) rotate(${-angle}deg)`,
                        transition: `transform ${transition}`,
                      }}
                    >
                      <button
                        type="button"
                        tabIndex={shown ? 0 : -1}
                        onClick={() => setActive(index)}
                        aria-current={current ? "true" : undefined}
                        className={cn(
                          "flex -translate-y-1/2 origin-left items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-1.5 text-left whitespace-nowrap outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-[var(--timeline-color)]",
                          shown ? "pointer-events-auto" : "pointer-events-none",
                          current
                            ? "border-[color-mix(in_oklab,var(--timeline-color)_40%,transparent)] bg-background shadow-lg"
                            : "border-border bg-background/60 backdrop-blur-sm hover:bg-background",
                        )}
                        style={{
                          opacity: shown ? 1 - Math.abs(offset) * 0.24 : 0,
                          scale: current ? 1.06 : 1 - Math.abs(offset) * 0.04,
                          transition: `opacity ${transition}, scale ${transition}`,
                        }}
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-500",
                            current
                              ? "bg-[var(--timeline-color)] text-[var(--timeline-on-color)]"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {Icon ? <Icon aria-hidden className="size-3.5" /> : index + 1}
                        </span>
                        <span className="flex flex-col leading-tight">
                          <span
                            className={cn(
                              "font-mono text-[0.65rem] font-semibold",
                              current
                                ? "text-[var(--timeline-color)]"
                                : "text-muted-foreground",
                            )}
                          >
                            {entry.date}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-medium",
                              current ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            {entry.title}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
TimelineDialBlock.displayName = "TimelineDialBlock";
