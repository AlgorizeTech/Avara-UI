"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface AppleSelectProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  /** The full sentence or paragraph to render. */
  text: string;
  /**
   * Character range to highlight as `[start, end]` — `end` is exclusive, the
   * same way `String.slice` works. Out-of-range values are clamped.
   */
  selection: [number, number];
  /** Accent for the highlight and handles. Any CSS colour; defaults to the theme primary. */
  color?: string;
  /** Show the iOS-style lollipop handles on either end of the range. */
  handles?: boolean;
  /** Fade the highlight in and pop the handles on mount. */
  animate?: boolean;
}

// Keyframes ship inline so the component stays self-contained — no plugin,
// no globals.css entry. Names are prefixed to avoid clashing with app styles.
const KEYFRAMES = `
@keyframes apple-select-highlight { from { opacity: 0; } to { opacity: 1; } }
@keyframes apple-select-handle {
  0% { opacity: 0; transform: scale(0.4); }
  70% { opacity: 1; transform: scale(1.15); }
  100% { opacity: 1; transform: scale(1); }
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
      className="absolute w-[2px]"
      style={{
        // Centred inside the 4px anchor without a translate, which the
        // entrance animation's scale() transform would otherwise override.
        left: "1px",
        top: "-0.05em",
        height: "1.15em",
        backgroundColor: color,
        transformOrigin: edge === "start" ? "top center" : "bottom center",
        animation: animate ? "apple-select-handle 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.25s both" : undefined,
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

export const AppleSelect = React.forwardRef<HTMLParagraphElement, AppleSelectProps>(
  (
    {
      text,
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
    // Clamp the range so a stale index never throws or highlights backwards.
    const start = Math.min(Math.max(0, selection[0]), text.length);
    const end = Math.min(Math.max(start, selection[1]), text.length);
    const hasRange = end > start;

    return (
      <p
        ref={ref}
        className={cn("leading-relaxed", className)}
        style={style}
        {...props}
      >
        {animate && <style>{KEYFRAMES}</style>}
        {text.slice(0, start)}
        {hasRange && (
          <>
            {handles && <Handle edge="start" color={color} animate={animate} />}
            <mark
              className="rounded-[0.15em] px-[0.05em]"
              style={{
                // Translucent tint keeps the text colour intact — like a real
                // selection rather than a solid highlighter.
                backgroundColor: `color-mix(in oklab, ${color} 35%, transparent)`,
                color: "inherit",
                // Wrapped lines each get their own rounded corners.
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
                animation: animate ? "apple-select-highlight 0.4s ease-out both" : undefined,
              }}
            >
              {text.slice(start, end)}
            </mark>
            {handles && <Handle edge="end" color={color} animate={animate} />}
          </>
        )}
        {text.slice(end)}
      </p>
    );
  }
);

AppleSelect.displayName = "AppleSelect";
