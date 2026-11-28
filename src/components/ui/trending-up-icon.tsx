"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
} from "react";

export interface TrendingUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TrendingUpIconProps extends Omit<
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

const TrendingUpIcon = forwardRef<TrendingUpIconHandle, TrendingUpIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 24,
      duration = 1,
      isAnimated = true,
      color,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
      isControlled.current = true;
      return {
        startAnimation: () =>
          reduced ? controls.start("normal") : controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleEnter = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (!isAnimated || reduced) return;
        if (!isControlled.current) controls.start("animate");
        else onMouseEnter?.(e as React.MouseEvent<HTMLDivElement>);
      },
      [controls, reduced, isAnimated, onMouseEnter],
    );

    const handleLeave = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlled.current) controls.start("normal");
        else onMouseLeave?.(e as React.MouseEvent<HTMLDivElement>);
      },
      [controls, onMouseLeave],
    );

    const drawTransition = {
      duration: 1.8 * duration,
      repeat: Infinity,
      repeatDelay: 0.25,
      ease: "easeInOut" as const,
    };

    const overlayAnimate =
      isAnimated && !reduced
        ? {
            pathLength: [0, 1, 0],
            opacity: [0.4, 1, 0.25],
          }
        : undefined;

    return (
      <motion.div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
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
          {/* Base icon always visible */}
          <g stroke={color ?? "currentColor"} opacity={0.4}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </g>

          {/* Drawing animation on top */}
          {isAnimated && !reduced && (
            <g stroke={color ?? "currentColor"}>
              <motion.polyline
                points="2 17 8.5 10.5 13.5 15.5 22 7"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={overlayAnimate}
                transition={drawTransition}
              />
              <motion.polyline
                points="16 7 22 7 22 13"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={overlayAnimate}
                transition={{ ...drawTransition, delay: 0.25 }}
              />
            </g>
          )}
        </svg>
      </motion.div>
    );
  },
);

TrendingUpIcon.displayName = "TrendingUpIcon";
export { TrendingUpIcon };
