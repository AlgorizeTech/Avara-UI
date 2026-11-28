"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useAnimation,
  useReducedMotion,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
} from "react";

export interface UsersIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UsersIconProps extends Omit<
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

const UsersIcon = forwardRef<UsersIconHandle, UsersIconProps>(
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
      repeatDelay: 0.2,
      ease: "easeInOut" as const,
    };

    const overlayAnimate =
      isAnimated && !reduced
        ? {
            pathLength: [0, 1, 0],
            opacity: [0.4, 1, 0.2],
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Base gray icon always visible */}
          <g stroke="currentColor" opacity={0.55}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </g>

          {/* Theme-colored drawing animation on top */}
          {isAnimated && !reduced && (
            <g stroke={color ?? "var(--primary)"}>
              <motion.path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={overlayAnimate}
                transition={drawTransition}
              />
              <motion.circle
                cx="9"
                cy="7"
                r="4"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={overlayAnimate}
                transition={{ ...drawTransition, delay: 0.14 }}
              />
              <motion.path
                d="M22 21v-2a4 4 0 0 0-3-3.87"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={overlayAnimate}
                transition={{ ...drawTransition, delay: 0.26 }}
              />
              <motion.path
                d="M16 3.13a4 4 0 0 1 0 7.75"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={overlayAnimate}
                transition={{ ...drawTransition, delay: 0.36 }}
              />
            </g>
          )}
        </svg>
      </motion.div>
    );
  },
);

UsersIcon.displayName = "UsersIcon";
export { UsersIcon };
