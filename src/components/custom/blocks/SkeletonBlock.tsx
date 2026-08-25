"use client";

import { cn } from "@/lib/utils";
import React from "react";

// ==========================================
// TYPES & PROPS
// ==========================================
export type SkeletonVariant =
  | "rect"
  | "circle"
  | "text"
  | "profile"
  | "card"
  | "custom";
export type SkeletonAnimation = "pulse" | "shimmer" | "none";

export interface SkeletonBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
/**
 * Defined at module scope on purpose. Declaring it inside SkeletonBlock would
 * make it a new component type on every render, restarting the shimmer
 * animation each time the parent re-renders.
 */
function ShimmerLayer({ animation }: { animation: SkeletonAnimation }) {
  if (animation !== "shimmer") return null;
  return (
    <>
      <style>{`
          @keyframes shimmer-slide {
            100% { transform: translateX(100%); }
          }
          .animate-shimmer-slide {
            animation: shimmer-slide 1.5s infinite linear;
          }
        `}</style>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer-slide z-10" />
    </>
  );
}

export function SkeletonBlock({
  variant = "rect",
  animation = "shimmer",
  width,
  height,
  radius,
  className,
  style,
  ...props
}: SkeletonBlockProps) {
  // Base shapes for the atomic components
  const baseClasses = cn(
    "relative overflow-hidden bg-muted",
    animation === "pulse" && "animate-pulse",
  );


  // --- COMPOSITE VARIANTS ---

  if (variant === "profile") {
    return (
      <div
        className={cn("flex items-center justify-center gap-4 w-full max-w-xs mx-auto", className)}
        style={style}
        {...props}
      >
        <div className={cn(baseClasses, "w-12 h-12 rounded-full shrink-0")}>
          <ShimmerLayer animation={animation} />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
          <div className={cn(baseClasses, "h-4 w-full rounded-md")}>
            <ShimmerLayer animation={animation} />
          </div>
          <div className={cn(baseClasses, "h-3 w-2/3 rounded-md")}>
            <ShimmerLayer animation={animation} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div
        className={cn(
          "flex flex-col gap-2.5 w-full max-w-sm mx-auto items-center",
          className,
        )}
        style={style}
        {...props}
      >
        <div className={cn(baseClasses, "h-4 w-full rounded-md")}>
          <ShimmerLayer animation={animation} />
        </div>
        <div className={cn(baseClasses, "h-4 w-3/4 rounded-md")}>
          <ShimmerLayer animation={animation} />
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 w-full max-w-sm p-4 border border-border rounded-2xl bg-white dark:bg-[#050505]",
          className,
        )}
        style={style}
        {...props}
      >
        <div className={cn(baseClasses, "w-full h-40 rounded-xl mb-2")}>
          <ShimmerLayer animation={animation} />
        </div>
        <div className={cn(baseClasses, "h-5 w-3/4 rounded-md")}>
          <ShimmerLayer animation={animation} />
        </div>
        <div className={cn(baseClasses, "h-4 w-full rounded-md")}>
          <ShimmerLayer animation={animation} />
        </div>
        <div className={cn(baseClasses, "h-4 w-5/6 rounded-md")}>
          <ShimmerLayer animation={animation} />
        </div>
      </div>
    );
  }

  // --- ATOMIC & CUSTOM VARIANTS ---

  const atomicClasses = cn(
    baseClasses,
    variant === "circle" && !radius && "rounded-full w-12 h-12",
    variant === "rect" && !height && "min-h-[100px] w-full",
    variant === "rect" && !radius && "rounded-xl",
    className,
  );

  // Combine standard style prop with our explicit custom props
  const customStyles: React.CSSProperties = {
    ...style,
    width: width ?? style?.width,
    height: height ?? style?.height,
    borderRadius: radius ?? style?.borderRadius,
  };

  return (
    <div className={atomicClasses} style={customStyles} {...props}>
      <ShimmerLayer animation={animation} />
    </div>
  );
}
