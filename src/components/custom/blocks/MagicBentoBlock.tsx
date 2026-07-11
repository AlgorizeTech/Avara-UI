"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { ReactNode } from "react";

// ==========================================
// BENTO GRID CONTAINER
// ==========================================
export interface MagicBentoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MagicBento = React.forwardRef<HTMLDivElement, MagicBentoProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full auto-rows-[minmax(180px,auto)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
MagicBento.displayName = "MagicBento";

// ==========================================
// BENTO CARD (With Magic Hover Effects)
// ==========================================
export interface MagicBentoCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  highlight?: boolean; // Activates the continuously spinning border
}

export const MagicBentoCard = React.forwardRef<
  HTMLDivElement,
  MagicBentoCardProps
>(({ children, className, highlight = false, ...props }, ref) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse position relative to the card
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-transparent min-h-[200px] transition-transform duration-300 active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {/* 1. Base Static Border */}
      <div className="absolute inset-0 rounded-3xl bg-zinc-200 dark:bg-zinc-800/80 transition-colors" />

      {/* 2. Highlight: Continuously Spinning Conic Gradient */}
      {highlight && (
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--magic-color)_50%,transparent_100%)] opacity-30 dark:opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
      )}

      {/* 3. Hover: Mouse-Tracking Border Spotlight */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                var(--magic-color),
                transparent 40%
              )
            `,
        }}
      />

      {/* 4. Content Mask (Creates the 1px border effect) */}
      <div className="absolute inset-[1px] rounded-[23px] bg-white dark:bg-[#0a0a0a] transition-colors z-0" />

      {/* 5. Hover: Inner Card Soft Glow */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none mix-blend-overlay dark:mix-blend-screen"
        style={{
          background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                var(--magic-glow),
                transparent 40%
              )
            `,
        }}
      />

      {/* 6. Actual Content Area */}
      <div className="relative z-20 flex flex-col h-full p-6 sm:p-8 pointer-events-auto">
        {children}
      </div>
    </div>
  );
});
MagicBentoCard.displayName = "MagicBentoCard";
