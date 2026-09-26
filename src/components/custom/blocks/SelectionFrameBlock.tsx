"use client";

import { cn } from "@/lib/utils";
import React, { useLayoutEffect, useRef, useState } from "react";
import { springLinear } from "./motion-curves";

export type FrameHandles = "square" | "circle";
export type FrameLine = "solid" | "dashed" | "long";

export interface SelectionFrameProps {
  /** The content to frame — measured live, so it can change size freely. */
  children: React.ReactNode;
  /** Corner handle shape. Default "square". */
  handles?: FrameHandles;
  /** Stroke style. Default "solid". "dashed" and "long" both march when animated. */
  line?: FrameLine;
  /** Override the [dash, gap] px pair a non-solid `line` resolves to. */
  dash?: [number, number];
  /** Marching ants — only applies to "dashed" / "long" lines. Handles always pop in. Default false. */
  animated?: boolean;
  /** Accent colour. Default primary theme color. */
  color?: string;
  /** Frame corner radius. Default 0. */
  radius?: number;
  /** Gap between the content and the frame. Default 4. */
  padding?: number;
  /** Render inline (for text spans) instead of block. Default true. */
  inline?: boolean;
  className?: string;
}

const STROKE = 1.5;

const LINE_DASH: Record<FrameLine, [number, number] | undefined> = {
  solid: undefined,
  dashed: [4, 4],
  long: [10, 6],
};

/** Handle pop-in: a stiffness 600 / damping 24 spring, as a CSS easing. */
const HANDLE_SPRING = springLinear({ stiffness: 600, damping: 24 }, 120);

// Plain CSS. Both loops sit behind prefers-reduced-motion: the march is an
// indefinite loop, and the handles then simply start in place.
const KEYFRAMES = `
@keyframes selection-frame-march {
  from { stroke-dashoffset: 0px; }
  to { stroke-dashoffset: calc(var(--selection-frame-period) * -1); }
}
@keyframes selection-frame-handle {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: no-preference) {
  .selection-frame-march { animation: selection-frame-march 1s linear infinite; }
  .selection-frame-handle { animation: selection-frame-handle ${HANDLE_SPRING.duration}ms ${HANDLE_SPRING.easing} backwards; }
}`;

export function SelectionFrame({
  children,
  handles = "square",
  line = "solid",
  dash,
  animated = false,
  color = "var(--primary, #0d99ff)",
  radius = 0,
  padding = 4,
  inline = true,
  className,
}: SelectionFrameProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // The frame box sits `padding` outside the content, stroke centred on its edge.
  const fw = size.w + padding * 2;
  const fh = size.h + padding * 2;
  const resolvedDash = dash ?? LINE_DASH[line];
  const period = resolvedDash ? resolvedDash[0] + resolvedDash[1] : 0;

  // Marching ants need a dash pattern, so `animated` with a solid stroke is
  // just a static frame with animated corner handles. Reduced motion disables
  // both (in the stylesheet above), since the march is an indefinite loop.
  const marching = animated && !!resolvedDash;
  const animateHandles = animated;

  // The rect is drawn inset by STROKE/2 so its stroke centres inside the SVG
  // box — its visible corner tip is at (STROKE/2, STROKE/2), not (0, 0). Place
  // the handles on those centreline corners; using the box corners instead
  // leaves every handle 0.75px diagonally outward from the tip it marks.
  const half = STROKE / 2;
  const corners: Array<[string, number, number]> = [
    ["tl", half, half],
    ["tr", fw - half, half],
    ["bl", half, fh - half],
    ["br", fw - half, fh - half],
  ];

  const handleSize = handles === "circle" ? 8 : 7;

  return (
    <span
      className={cn("relative", inline ? "inline-block" : "block", className)}
      style={{ lineHeight: inline ? undefined : 0 }}
    >
      <span ref={ref} className={cn(inline ? "inline-block" : "block")}>
        {children}
      </span>

      {fw > 0 && (
        <>
          {/* frame */}
          <svg
            className="absolute pointer-events-none overflow-visible"
            width={fw}
            height={fh}
            style={{ left: -padding, top: -padding }}
            aria-hidden
          >
            <rect
              x={STROKE / 2}
              y={STROKE / 2}
              width={Math.max(0, fw - STROKE)}
              height={Math.max(0, fh - STROKE)}
              rx={radius}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeDasharray={resolvedDash ? `${resolvedDash[0]} ${resolvedDash[1]}` : undefined}
              {...(marching
                ? {
                    className: "selection-frame-march",
                    style: {
                      "--selection-frame-period": `${period}px`,
                      animationDuration: `${period * 0.075}s`,
                    } as React.CSSProperties,
                  }
                : {})}
            />
          </svg>

          {/* Corner handles. boxSizing: border-box is what keeps these centred on
              their corner point: without it the border adds outside the declared
              width/height, so the -handleSize/2 margin offset undershoots and the
              handle renders visibly off-centre from the true corner. */}
          {corners.map(([key, cx, cy], i) => (
            <FrameHandle
              key={key}
              pop={animateHandles}
              delay={0.28 + i * 0.05}
              style={{
                left: cx - padding,
                top: cy - padding,
                width: handleSize,
                height: handleSize,
                marginLeft: -handleSize / 2,
                marginTop: -handleSize / 2,
                boxSizing: "border-box",
                border: `${STROKE}px solid ${color}`,
                borderRadius: handles === "circle" ? "9999px" : 1,
                boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </>
      )}
      <style>{KEYFRAMES}</style>
    </span>
  );
}

/**
 * One corner handle. Whether it pops in is settled when it mounts: switching
 * `animated` on later leaves a handle that is already on screen in place.
 */
function FrameHandle({
  pop,
  delay,
  style,
}: {
  pop: boolean;
  /** Seconds. */
  delay: number;
  style: React.CSSProperties;
}) {
  const [popIn] = useState(pop);
  return (
    <span
      aria-hidden
      className={cn(
        "absolute pointer-events-none bg-background",
        popIn && "selection-frame-handle",
      )}
      style={{ animationDelay: popIn ? `${delay}s` : undefined, ...style }}
    />
  );
}
