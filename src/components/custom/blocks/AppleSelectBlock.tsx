"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface AppleSelectProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  /** The full sentence or paragraph to render. */
  text: string;
  /**
   * The element to render. `"span"` sets the selection inline, inside a
   * paragraph of your own, so only a phrase of running copy needs to go
   * through the component.
   */
  as?: "p" | "span";
  /**
   * Character range to highlight as `[start, end]` — `end` is exclusive, the
   * same way `String.slice` works — or several such ranges for more than one
   * phrase. Out-of-range values are clamped; overlapping ranges are merged.
   */
  selection: [number, number] | [number, number][];
  /** Accent for the highlight and handles. Any CSS colour; defaults to the theme primary. */
  color?: string;
  /** Show the iOS-style lollipop handles on either end of the range. */
  handles?: boolean;
  /** Fade the highlight in and pop the handles on mount. */
  animate?: boolean;
}

// Keyframes ship inline so the component stays self-contained — no plugin,
// no globals.css entry. Names are prefixed to avoid clashing with app styles.
// With reduced motion the selection is simply there.
const KEYFRAMES = `
@keyframes apple-select-highlight { from { opacity: 0; } to { opacity: 1; } }
@keyframes apple-select-handle {
  0% { opacity: 0; transform: scale(0.4); }
  70% { opacity: 1; transform: scale(1.15); }
  100% { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: no-preference) {
  .apple-select-highlight { animation: apple-select-highlight 0.4s ease-out both; }
  .apple-select-handle { animation: apple-select-handle 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.25s both; }
}`;

// The handle is a zero-width inline anchor with the bar drawn absolutely, so it
// takes no room in the line box and never becomes a line-break opportunity —
// it always wraps together with the word it is attached to.
const Handle = ({
  edge,
  color,
  animate,
}: {
  edge: "start" | "end";
  color: string;
  animate: boolean;
}) => (
  <span
    aria-hidden
    className="relative inline"
    style={{
      // Reserve a sliver next to the text so the bar does not touch the glyphs.
      paddingInline: "2px",
    }}
  >
    <span
      className={cn("absolute w-[2px]", animate && "apple-select-handle")}
      style={{
        // Centred inside the 4px anchor without a translate, which the
        // entrance animation's scale() transform would otherwise override.
        left: "1px",
        top: "-0.05em",
        height: "1.15em",
        backgroundColor: color,
        transformOrigin: edge === "start" ? "top center" : "bottom center",
      }}
    >
      {/* The lollipop: start handle wears its knob on top, end handle underneath. */}
      <span
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "0.5em",
          height: "0.5em",
          backgroundColor: color,
          [edge === "start" ? "top" : "bottom"]: "-0.42em",
        }}
      />
    </span>
  </span>
);

export const AppleSelect = React.forwardRef<HTMLElement, AppleSelectProps>(
  (
    {
      text,
      as: Tag = "p",
      selection,
      color = "var(--primary)",
      handles = true,
      animate = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // One range or many: clamp each so a stale index never throws or
    // highlights backwards, sort them, and merge any that overlap.
    const raw: [number, number][] =
      Array.isArray(selection[0]) ? (selection as [number, number][]) : [selection as [number, number]];
    const ranges = raw
      .map(([a, b]) => {
        const start = Math.min(Math.max(0, a), text.length);
        const end = Math.min(Math.max(start, b), text.length);
        return [start, end] as [number, number];
      })
      .filter(([a, b]) => b > a)
      .sort((x, y) => x[0] - y[0])
      .reduce<[number, number][]>((acc, r) => {
        const last = acc[acc.length - 1];
        if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
        else acc.push([r[0], r[1]]);
        return acc;
      }, []);

    const parts: React.ReactNode[] = [];
    let cursor = 0;
    ranges.forEach(([start, end], i) => {
      parts.push(text.slice(cursor, start));
      parts.push(
        <React.Fragment key={i}>
          {handles && <Handle edge="start" color={color} animate={animate} />}
          <mark
            className={cn("rounded-[0.15em] px-[0.05em]", animate && "apple-select-highlight")}
            style={{
              // Translucent tint keeps the text colour intact — like a real
              // selection rather than a solid highlighter.
              backgroundColor: `color-mix(in oklab, ${color} 35%, transparent)`,
              color: "inherit",
              // Wrapped lines each get their own rounded corners.
              WebkitBoxDecorationBreak: "clone",
              boxDecorationBreak: "clone",
            }}
          >
            {text.slice(start, end)}
          </mark>
          {handles && <Handle edge="end" color={color} animate={animate} />}
        </React.Fragment>,
      );
      cursor = end;
    });
    parts.push(text.slice(cursor));

    return (
      <Tag
        // Either tag takes the HTMLElement ref; TypeScript reads the union as <p>'s.
        ref={ref as React.Ref<HTMLParagraphElement & HTMLSpanElement>}
        // Inline, the line height is the surrounding paragraph's.
        className={cn(Tag === "p" && "leading-relaxed", className)}
        style={style}
        {...props}
      >
        {animate && <style>{KEYFRAMES}</style>}
        {parts}
      </Tag>
    );
  }
);

AppleSelect.displayName = "AppleSelect";
