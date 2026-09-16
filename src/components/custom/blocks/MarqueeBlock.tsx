"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

// ==========================================
// MARQUEE COMPONENT
// ==========================================
export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The direction the marquee should slide */
  direction?: "left" | "right" | "up" | "down";
  /** The speed of the marquee. Can be a preset string or a number in seconds */
  speed?: "slow" | "normal" | "fast" | number;
  /** Whether the marquee should pause when hovered */
  pauseOnHover?: boolean;
  /** Whether to apply a gradient fade mask to the edges */
  fade?: boolean;
  /** CSS gap between items (e.g., "1rem", "24px") */
  gap?: string;
  /** The content to be duplicated and animated */
  children: React.ReactNode;
}

export const MarqueeBlock = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      direction = "left",
      speed = "normal",
      pauseOnHover = false,
      fade = false,
      gap = "1rem",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isVertical = direction === "up" || direction === "down";
    const isReverse = direction === "right" || direction === "down";

    // Determine animation duration based on speed
    let duration: string;
    if (typeof speed === "number") {
      duration = `${speed}s`;
    } else {
      switch (speed) {
        case "slow":
          duration = "40s";
          break;
        case "fast":
          duration = "10s";
          break;
        case "normal":
        default:
          duration = "20s";
          break;
      }
    }

    const uniqueId = React.useId().replace(/:/g, "");

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex overflow-hidden",
          isVertical ? "flex-col" : "flex-row",
          fade && isVertical && "mask-vertical",
          fade && !isVertical && "mask-horizontal",
          className,
        )}
        style={
          {
            "--marquee-gap": gap,
            "--marquee-duration": duration,
            gap: gap,
          } as React.CSSProperties
        }
        {...props}
      >
        <style>{`
          .marquee-inner-${uniqueId} {
            display: flex;
            flex-shrink: 0;
            justify-content: space-around;
            gap: var(--marquee-gap);
            animation: ${isVertical ? "marquee-vertical" : "marquee-horizontal"} var(--marquee-duration) linear infinite;
            animation-direction: ${isReverse ? "reverse" : "normal"};
          }
          
          /* THE FIX: Hardcode the pause logic directly into the injected stylesheet so it never fails */
          ${pauseOnHover ? `.group:hover .marquee-inner-${uniqueId} { animation-play-state: paused; }` : ""}

          /* Hold still for people who asked for less motion; the content is all still there. */
          @media (prefers-reduced-motion: reduce) {
            .marquee-inner-${uniqueId} { animation-play-state: paused; }
          }

          @keyframes marquee-horizontal {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-100% - var(--marquee-gap))); }
          }

          @keyframes marquee-vertical {
            from { transform: translateY(0); }
            to { transform: translateY(calc(-100% - var(--marquee-gap))); }
          }

          .mask-horizontal {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }

          .mask-vertical {
            mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          }
        `}</style>

        {/* First track */}
        <div
          className={cn(
            `marquee-inner-${uniqueId}`,
            isVertical ? "flex-col" : "flex-row",
          )}
          aria-hidden="false"
        >
          {children}
        </div>

        {/* Second track (Duplicate for seamless loop) */}
        <div
          className={cn(
            `marquee-inner-${uniqueId}`,
            isVertical ? "flex-col" : "flex-row",
          )}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    );
  },
);
MarqueeBlock.displayName = "MarqueeBlock";
