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

export interface PlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlusIconProps extends Omit<
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

const PlusIcon = forwardRef<PlusIconHandle, PlusIconProps>(
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
      duration: 2.6 * duration,
      repeat: Infinity,
      repeatDelay: 0.5,
      ease: "easeInOut" as const,
    };

    const lineAnimate =
      isAnimated && !reduced
        ? { pathLength: [0, 1, 1, 0], opacity: [0.35, 1, 1, 0] }
        : undefined;

    return (
      <motion.div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={
            isAnimated && !reduced
              ? { rotate: [0, 0, 90, 90, 0] }
              : controls
          }
          transition={{
            duration: 3.0 * duration,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Base always-visible plus */}
          <g stroke={color ?? "currentColor"} opacity={0.4}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </g>

          {/* Drawing animation on top */}
          {isAnimated && !reduced && (
            <g stroke={color ?? "currentColor"}>
              <motion.path
                d="M5 12h14"
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={lineAnimate}
                transition={drawTransition}
              />
              <motion.path
                d="M12 5v14"
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={lineAnimate}
                transition={{ ...drawTransition, delay: 0.2 }}
              />
            </g>
          )}
        </motion.svg>
      </motion.div>
    );
  },
);

PlusIcon.displayName = "PlusIcon";
export { PlusIcon };
