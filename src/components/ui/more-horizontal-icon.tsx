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

export interface MoreHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MoreHorizontalIconProps extends Omit<
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

const MoreHorizontalIcon = forwardRef<
  MoreHorizontalIconHandle,
  MoreHorizontalIconProps
>(
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
          stroke={color ?? "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {[5, 12, 19].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy="12"
              r="1.6"
              fill={color ?? "currentColor"}
              strokeWidth="0"
              animate={
                isAnimated && !reduced
                  ? {
                      y: [0, -2.5, 0],
                      scale: [1, 1.25, 1],
                      fill: color
                        ? color
                        : [
                            "currentColor",
                            "var(--primary)",
                            "currentColor",
                          ],
                    }
                  : controls
              }
              transition={{
                duration: 1.1 * duration,
                delay: i * 0.18,
                repeat: Infinity,
                repeatDelay: 0.9,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>
    );
  },
);

MoreHorizontalIcon.displayName = "MoreHorizontalIcon";
export { MoreHorizontalIcon };
