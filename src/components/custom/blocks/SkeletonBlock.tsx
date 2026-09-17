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
  // Base shapes for the atomic components — uses opacity-tinted primary theme color
  // so the docs theme color picker dynamically themes the skeleton placeholders live.
  const baseClasses = cn(
    "relative overflow-hidden bg-primary/10 border border-primary/20",
    animation === "pulse" && "animate-pulse",
  );


  // Combine standard style prop with explicit width/height/radius custom props
  const customStyles: React.CSSProperties = {
    ...style,
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(radius !== undefined && { borderRadius: radius }),
  };

  // --- COMPOSITE VARIANTS ---

  if (variant === "profile") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-4 w-full mx-auto",
          width === undefined && "max-w-xs",
          className,
        )}
        style={customStyles}
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
          "flex flex-col gap-2.5 w-full mx-auto items-center",
          width === undefined && "max-w-sm",
          className,
        )}
        style={customStyles}
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
          "flex flex-col gap-3 w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 text-foreground shadow-sm",
          width === undefined && "max-w-sm",
          className,
        )}
        style={customStyles}
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

  // --- ATOMIC & CUSTOM VARIANTS (rect, circle, custom) ---

  const atomicClasses = cn(
    baseClasses,
    variant === "circle" && !radius && "rounded-full",
    variant === "circle" && width === undefined && "w-12",
    variant === "circle" && height === undefined && "h-12",
    variant === "rect" && width === undefined && "w-full",
    variant === "rect" && height === undefined && "min-h-[100px]",
    variant === "rect" && !radius && "rounded-xl",
    className,
  );

  return (
    <div className={atomicClasses} style={customStyles} {...props}>
      <ShimmerLayer animation={animation} />
    </div>
  );
}
