"use client";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import {
 LazyMotion,
 domMin,
 m,
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

export interface GmailIconHandle {
 startAnimation: () => void;
 stopAnimation: () => void;
}

interface GmailIconProps extends Omit<
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

const GmailIcon = forwardRef<GmailIconHandle, GmailIconProps>(
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
    else onMouseEnter?.(e as any);
   },
   [controls, reduced, isAnimated, onMouseEnter],
  );

  const handleLeave = useCallback(
   (e?: React.MouseEvent<HTMLDivElement>) => {
    if (!isControlled.current) controls.start("normal");
    else onMouseLeave?.(e as any);
   },
   [controls, onMouseLeave],
  );

  const iconVariants: Variants = {
   normal: { scale: 1, y: 0 },
   animate: {
    scale: [1, 1.14, 0.96, 1.05, 1],
    y: [0, -1, 0],
    transition: {
     duration: 0.75 * duration,
     ease: "easeInOut",
    },
   },
  };

  return (
   <LazyMotion features={domMin} strict>
    <m.div
     className={cn("inline-flex items-center justify-center", className)}
     onMouseEnter={handleEnter}
     onMouseLeave={handleLeave}
     {...props}
     style={{ color, ...props.style }}
    >
     <m.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      animate={controls}
      initial="normal"
     >
      <m.g
       variants={iconVariants}
       style={{ transformBox: "view-box", originX: "12px", originY: "12px" }}
      >
       <path
        fill="#4285F4"
        d="M3.636 19.5h2.728v-6.625L2 9.6v8.264C2 18.768 2.733 19.5 3.636 19.5Z"
       />
       <path
        fill="#34A853"
        d="M17.636 19.5h2.728c.903 0 1.636-.732 1.636-1.636V9.6l-4.364 3.275V19.5Z"
       />
       <path
        fill="#FBBC05"
        d="M17.636 6.727v6.148L22 9.6V7.418c0-2.022-2.309-3.176-3.927-1.963l-.437.327Z"
       />
       <path
        fill="#EA4335"
        d="M6.364 12.875V6.727L12 10.955l5.636-4.228v6.148L12 17.102l-5.636-4.227Z"
       />
       <path
        fill="#C5221F"
        d="M2 7.418V9.6l4.364 3.275V6.727l-.437-.327C4.309 5.187 2 6.34 2 7.418Z"
       />
      </m.g>
     </m.svg>
    </m.div>
   </LazyMotion>
  );
 },
);

GmailIcon.displayName = "GmailIcon";
export { GmailIcon };
