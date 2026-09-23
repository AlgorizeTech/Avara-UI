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

    const animationName = isVertical
      ? isReverse
        ? `marquee-v-down-${uniqueId}`
        : `marquee-v-up-${uniqueId}`
      : isReverse
        ? `marquee-h-right-${uniqueId}`
        : `marquee-h-left-${uniqueId}`;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex overflow-hidden",
          `marquee-container-${uniqueId}`,
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
            justify-content: flex-start;
            gap: var(--marquee-gap);
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            animation: ${animationName} var(--marquee-duration) linear infinite;
          }
          
          /* Instant smooth pause without jumping or browser matrix snap */
          ${pauseOnHover ? `
            .marquee-container-${uniqueId}:hover .marquee-inner-${uniqueId},
            .marquee-inner-${uniqueId}:hover {
              animation-play-state: paused !important;
            }
          ` : ""}

          /* Hold still for people who asked for less motion */
          @media (prefers-reduced-motion: reduce) {
            .marquee-inner-${uniqueId} { animation-play-state: paused !important; }
          }

          /* Leftward scroll: from 0 to -100% */
          @keyframes marquee-h-left-${uniqueId} {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(calc(-100% - var(--marquee-gap)), 0, 0); }
          }

          /* Rightward scroll: from -100% to 0, running forward so pause never jumps! */
          @keyframes marquee-h-right-${uniqueId} {
            from { transform: translate3d(calc(-100% - var(--marquee-gap)), 0, 0); }
            to { transform: translate3d(0, 0, 0); }
          }

          /* Vertical up scroll */
          @keyframes marquee-v-up-${uniqueId} {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(0, calc(-100% - var(--marquee-gap)), 0); }
          }

          /* Vertical down scroll */
          @keyframes marquee-v-down-${uniqueId} {
            from { transform: translate3d(0, calc(-100% - var(--marquee-gap)), 0); }
            to { transform: translate3d(0, 0, 0); }
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

        {/* Track 1 */}
        <div
          className={cn(
            `marquee-inner-${uniqueId}`,
            isVertical ? "flex-col" : "flex-row",
          )}
          aria-hidden="false"
        >
          {children}
        </div>

        {/* Track 2 (Duplicate for seamless loop) */}
        <div
          className={cn(
            `marquee-inner-${uniqueId}`,
            isVertical ? "flex-col" : "flex-row",
          )}
          aria-hidden="true"
        >
          {children}
        </div>

        {/* Track 3 (Guarantees zero-gap on reverse/rightward scroll and ultra-wide screens) */}
        <div
          className={cn(
            `marquee-inner-${uniqueId}`,
            isVertical ? "flex-col" : "flex-row",
          )}
          aria-hidden="true"
        >
          {children}
        </div>

        {/* Track 4 (Guarantees zero-gap on reverse/rightward scroll and ultra-wide screens) */}
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
