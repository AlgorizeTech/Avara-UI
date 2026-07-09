"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface StackItem {
  id: string;
  title: string;
  description: string;
  content?: React.ReactNode;
  color?: string; // Optional hex or tailwind class
  icon?: React.ElementType;
}

export interface ScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StackItem[];
  depthScale?: number; // How much smaller the background cards get
  cardGap?: number; // Distance in pixels between sticky cards
}

// ==========================================
// MAIN CONTAINER
// ==========================================
export const ScrollStack = ({
  items,
  depthScale = 0.05, // Each layer shrinks by 5%
  cardGap = 24, // 24px spacing between stacked cards
  className,
  ...props
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" means animation begins when top of container hits top of viewport
    // "end end" means it ends when bottom of container hits bottom of viewport
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      // We add padding bottom so the last card has room to scroll and stick
      style={{ paddingBottom: "10vh" }}
      {...props}
    >
      {items.map((item, index) => {
        // Calculate the target scale for this specific card
        const targetScale = 1 - (items.length - index) * depthScale;

        return (
          <ScrollStackCard
            key={item.id}
            item={item}
            index={index}
            totalItems={items.length}
            progress={scrollYProgress}
            targetScale={targetScale}
            cardGap={cardGap}
          />
        );
      })}
    </div>
  );
};

// ==========================================
// INDIVIDUAL STACK CARD
// ==========================================
interface ScrollStackCardProps {
  item: StackItem;
  index: number;
  totalItems: number;
  progress: any; // Framer Motion MotionValue
  targetScale: number;
  cardGap: number;
}

const ScrollStackCard = ({
  item,
  index,
  totalItems,
  progress,
  targetScale,
  cardGap,
}: ScrollStackCardProps) => {
  // Define when this specific card should start and stop animating based on its index
  const startProgress = index * (1 / totalItems);
  const endProgress = 1;

  // Transform scale and opacity dynamically based on scroll progress
  const scale = useTransform(
    progress,
    [startProgress, endProgress],
    [1, targetScale],
  );

  // Cards darken as they move further back
  const opacity = useTransform(
    progress,
    [startProgress, endProgress],
    [1, 0.6],
  );

  return (
    <div
      // The wrapper takes up 100vh so each card gets a full screen of scroll duration
      className="flex h-screen w-full items-center justify-center sticky -top-70"
    >
      <motion.div
        style={{
          scale,
          opacity,
          // Calculate dynamic top positioning to create the stacked visual effect
          top: `calc(10vh + ${index * cardGap}px)`,
        }}
        className={cn(
          "relative w-full max-w-4xl h-[50vh] rounded-[2rem] p-8 md:p-12 shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border border-zinc-200 dark:border-white/10 transition-colors",
          item.color || "bg-white dark:bg-zinc-900",
        )}
      >
        {/* Subtle Glass Noise Overlay (Adaptive) */}
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-50 mix-blend-overlay pointer-events-none" />

        <div className="flex-1 flex flex-col justify-center relative z-10">
          {item.icon && (
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm dark:shadow-inner border border-zinc-200 dark:border-white/20 transition-colors">
              <item.icon className="w-7 h-7 text-zinc-700 dark:text-white" />
            </div>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 transition-colors">
            {item.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-white/70 font-medium leading-relaxed max-w-lg transition-colors">
            {item.description}
          </p>
        </div>

        {/* Optional Right-Side Content Area (For images, charts, etc.) */}
        {item.content && (
          <div className="flex-1 relative z-10 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 flex items-center justify-center hidden md:flex transition-colors">
            {item.content}
          </div>
        )}
      </motion.div>
    </div>
  );
};
