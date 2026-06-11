"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export interface AnimatedListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  animationDelay?: number;
  ease?: string;
  duration?: number;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  (
    {
      children,
      staggerDelay = 0.1,
      animationDelay = 0,
      ease = "back.out(1.2)",
      duration = 0.6,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Forward the ref while keeping our local ref for GSAP
    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    useEffect(() => {
      if (!containerRef.current) return;

      // Select all direct children of the list container
      const items = containerRef.current.children;

      // Reset initial state in case of re-renders
      gsap.set(items, { opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" });

      // Orchestrate the staggered animation
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: duration,
        ease: ease,
        stagger: staggerDelay,
        delay: animationDelay,
      });

      // Cleanup
      return () => {
        gsap.killTweensOf(items);
      };
    }, [staggerDelay, animationDelay, ease, duration]);

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AnimatedList.displayName = "AnimatedList";

export type AnimatedListItemProps = React.HTMLAttributes<HTMLDivElement>;

export const AnimatedListItem = forwardRef<
  HTMLDivElement,
  AnimatedListItemProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 p-4 shadow-sm backdrop-blur-sm opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";
