"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

interface PlayIconProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  | "color"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
  color?: string;
}

export function PlayIcon({
  className,
  size = 10,
  duration = 1,
  isAnimated = true,
  color,
  ...props
}: PlayIconProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color ?? "currentColor"}
        stroke={color ?? "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        animate={
          isAnimated && !reduced
            ? {
                scale: [1, 1.22, 1],
                x: [0, 1, 0],
              }
            : undefined
        }
        transition={{
          duration: 1.4 * duration,
          repeat: Infinity,
          repeatDelay: 0.6,
          ease: "easeInOut",
        }}
      >
        <polygon points="6 3 20 12 6 21 6 3" />
      </motion.svg>
    </div>
  );
}
