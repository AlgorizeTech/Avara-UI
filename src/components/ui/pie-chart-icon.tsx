"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

interface PieChartIconProps extends Omit<
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

export function PieChartIcon({
  className,
  size = 20,
  duration = 1,
  isAnimated = true,
  color,
  ...props
}: PieChartIconProps) {
  const reduced = useReducedMotion();

  const drawTransition = {
    duration: 2.0 * duration,
    repeat: Infinity,
    repeatDelay: 0.35,
    ease: "easeInOut" as const,
  };

  const animateDraw =
    isAnimated && !reduced
      ? { pathLength: [0, 1, 0], opacity: [0.4, 1, 0.25] }
      : undefined;

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g stroke={color ?? "currentColor"} opacity={0.35}>
          <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        </g>

        {isAnimated && !reduced && (
          <g stroke={color ?? "currentColor"}>
            <motion.path
              d="M21.21 15.89A10 10 0 1 1 8 2.83"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={animateDraw}
              transition={drawTransition}
            />
            <motion.path
              d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={animateDraw}
              transition={{ ...drawTransition, delay: 0.25 }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
