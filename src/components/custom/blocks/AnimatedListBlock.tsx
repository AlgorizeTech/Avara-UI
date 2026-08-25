"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export type AnimationVariant =
  | "flip"
  | "slide-right"
  | "slide-left"
  | "slide-up"
  | "pop";

export interface AnimatedListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  animationDelay?: number;
  ease?: string;
  duration?: number;
  variant?: AnimationVariant;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  (
    {
      children,
      staggerDelay = 0.12,
      animationDelay = 0,
      ease = "back.out(1.5)",
      duration = 0.6,
      variant = "slide-right",
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    useEffect(() => {
      if (!containerRef.current) return;

      const items = containerRef.current.children;

      // Define dynamic starting states based on the selected variant
      let startState: gsap.TweenVars = { opacity: 0, filter: "blur(8px)" };

      switch (variant) {
        case "slide-right":
          startState = { ...startState, x: 60 };
          break;
        case "slide-left":
          startState = { ...startState, x: -60 };
          break;
        case "slide-up":
          startState = { ...startState, y: 40 };
          break;
        case "pop":
          startState = { ...startState, scale: 0.6 };
          break;
        case "flip":
        default:
          startState = {
            ...startState,
            y: 40,
            scale: 0.9,
            rotationX: -45,
            transformOrigin: "top center",
          };
          break;
      }

      // Reset items to start state
      gsap.set(items, startState);

      // Orchestrate the animated entrance
      gsap.to(items, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        filter: "blur(0px)",
        duration: duration,
        ease: ease,
        stagger: staggerDelay,
        delay: animationDelay,
        force3D: true, // Forces GPU acceleration
      });

      return () => {
        gsap.killTweensOf(items);
      };
    }, [staggerDelay, animationDelay, ease, duration, variant]);

    return (
      <div
        ref={containerRef}
        // perspective enables the 3D rotationX effect on children if 'flip' is chosen
        className={cn(
          "flex flex-col gap-3 lg:gap-4 perspective-[1000px]",
          className,
        )}
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
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

  // Mouse-tracking Spotlight Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`,
      duration: 0.1,
    });
  };

  const handleMouseLeave = () => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      background: `radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0), transparent 40%)`,
      duration: 0.5,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full rounded-2xl bg-white dark:bg-[#0d0d12] border border-border/80 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] opacity-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Spotlight Overlay Layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />

      {/* Inner Border Shine */}
      <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none z-10" />

      {/* Content Layer */}
      <div className="relative z-20">{children}</div>
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";
