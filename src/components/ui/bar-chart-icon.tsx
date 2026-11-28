"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

interface BarChartIconProps extends Omit<
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

export function BarChartIcon({
  className,
  size = 20,
  duration = 1,
  isAnimated = true,
  color,
  ...props
}: BarChartIconProps) {
  const reduced = useReducedMotion();

  const bars = [
    { d: "M6 20v-4", delay: 0 },
    { d: "M12 20V4", delay: 0.18 },
    { d: "M18 20v-10", delay: 0.36 },
  ];

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
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g stroke={color ?? "currentColor"} opacity={0.35}>
          {bars.map((bar) => (
            <path key={bar.d} d={bar.d} />
          ))}
        </g>

        {isAnimated && !reduced && (
          <g stroke={color ?? "currentColor"}>
            {bars.map((bar) => (
              <motion.path
                key={bar.d}
                d={bar.d}
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: [0, 1, 0], opacity: [0.4, 1, 0.25] }}
                transition={{
                  duration: 1.8 * duration,
                  delay: bar.delay,
                  repeat: Infinity,
                  repeatDelay: 0.35,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
