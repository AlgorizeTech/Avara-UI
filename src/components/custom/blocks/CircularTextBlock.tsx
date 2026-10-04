"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

// ==========================================
// CIRCULAR TEXT
// Words set on a circle, turning slowly, with room in the middle for a mark
// or a button. The ring is an SVG textPath so it stays crisp at any size and
// the text is real text — screen readers get it once, from the sr-only copy.
// ==========================================

export interface CircularTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The words on the ring. */
  text: string;
  /** Separator placed between repeats of `text`. */
  separator?: string;
  /** How many times `text` goes round. Leave unset to fill the ring by length. */
  repeat?: number;
  /** Outer size in pixels. */
  size?: number;
  /** Seconds per full turn; `0` holds still. */
  speed?: number;
  direction?: "clockwise" | "counterclockwise";
  /** Font size of the ring text, in SVG units of a 100-wide circle (≈ percent of size). */
  fontSize?: number;
  /** Letter spacing of the ring text, in em. */
  tracking?: number;
  /** Colour of the ring text; the theme's primary by default. */
  color?: string;
  /** Radius of the text path, out of 50. */
  radius?: number;
  /** A thin inner ring, for badges that want an edge. */
  innerRing?: boolean;
  /** What sits in the middle. */
  children?: React.ReactNode;
}

export const CircularText = React.forwardRef<HTMLDivElement, CircularTextProps>(
  (
    {
      text,
      separator = " · ",
      repeat,
      size = 128,
      speed = 22,
      direction = "clockwise",
      fontSize = 9.5,
      tracking = 0.18,
      color = "var(--primary)",
      radius = 38,
      innerRing = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    // Enough repeats to fill the circumference, unless told otherwise. A
    // character at this size is about 0.62em wide; the separator counts too.
    const unit = `${text}${separator}`;
    const circumference = 2 * Math.PI * radius;
    const perChar = fontSize * (0.62 + tracking);
    const count = repeat ?? Math.max(1, Math.floor(circumference / (unit.length * perChar)));
    const ring = unit.repeat(count);

    return (
      <div
        ref={ref}
        className={cn("relative grid place-items-center", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <svg
          viewBox="0 0 100 100"
          className={cn(
            "absolute inset-0 size-full motion-reduce:animate-none",
            speed > 0 && "animate-[spin_var(--ct-speed)_linear_infinite]",
            direction === "counterclockwise" && "[animation-direction:reverse]",
          )}
          style={{ "--ct-speed": `${speed}s` } as React.CSSProperties}
          aria-hidden
        >
          <defs>
            <path
              id={id}
              d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <text
            className="font-sans font-semibold"
            style={{ fill: color, fontSize, letterSpacing: `${tracking}em` }}
          >
            <textPath href={`#${id}`} startOffset="0">
              {ring}
            </textPath>
          </text>
        </svg>
        {innerRing && (
          <span
            className="absolute rounded-full border border-foreground/15"
            style={{ inset: `${49 - radius}%` }}
            aria-hidden
          />
        )}
        {children && <span className="relative grid place-items-center">{children}</span>}
        <span className="sr-only">{text}</span>
      </div>
    );
  },
);
CircularText.displayName = "CircularText";

export default CircularText;
