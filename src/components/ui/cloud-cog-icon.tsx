"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

interface CloudCogIconProps extends Omit<
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

export function CloudCogIcon({
  className,
  size = 20,
  duration = 1,
  isAnimated = true,
  color,
  ...props
}: CloudCogIconProps) {
  const reduced = useReducedMotion();

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
        stroke={color ?? "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"
          opacity={0.35}
        />
        {isAnimated && !reduced && (
          <motion.path
            d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0.4, 1, 0.25] }}
            transition={{
              duration: 2.2 * duration,
              repeat: Infinity,
              repeatDelay: 0.35,
              ease: "easeInOut",
            }}
          />
        )}

        <motion.g
          animate={
            isAnimated && !reduced ? { rotate: [0, 360] } : undefined
          }
          transition={{
            duration: 6 * duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "12px 17px" }}
        >
          <circle cx="12" cy="17" r="3" />
          <path d="m15.7 18.4-.9-.3" />
          <path d="m9.2 15.9-.9-.3" />
          <path d="m10.6 20.7.3-.9" />
          <path d="m13.1 14.2.3-.9" />
          <path d="m13.6 20.7-.4-1" />
          <path d="m10.8 14.3-.4-1" />
          <path d="m8.3 18.6 1-.4" />
          <path d="m14.7 15.8 1-.4" />
        </motion.g>
      </svg>
    </div>
  );
}
