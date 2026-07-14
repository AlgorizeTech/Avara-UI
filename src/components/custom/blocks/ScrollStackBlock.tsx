"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface StackItem {
  id: string;
  title: string;
  description: string;
  content?: React.ReactNode;
  color?: string; // Optional custom background classes
  icon?: React.ElementType;
}

export interface ScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StackItem[];
  depthScale?: number; // How much smaller background cards get (default: 0.05)
  cardGap?: number; // Pixel distance between stacked sticky cards (default: 24)
  scroller?: string | Element | null; // Target viewport for GSAP ScrollTrigger
}

// ==========================================
// MAIN CONTAINER (GSAP POWERED)
// ==========================================
export const ScrollStack = ({
  items,
  depthScale = 0.05,
  cardGap = 24,
  scroller,
  className,
  ...props
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Animate each card as the NEXT card scrolls up to stack over it
    cardRefs.current.forEach((card, index) => {
      if (!card || index === items.length - 1) return; // Last card doesn't need to shrink

      const nextCard = cardRefs.current[index + 1];
      if (!nextCard) return;

      const targetScale = 1 - (items.length - 1 - index) * depthScale;

      const tween = gsap.to(card, {
        scale: targetScale,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          scroller: scroller || window,
          start: "top 85%",
          end: "top 20%",
          scrub: true,
        },
      });

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [items.length, depthScale, scroller]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ paddingBottom: "15vh" }}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex min-h-screen w-full items-center justify-center sticky -top-25"
          // style={{
          //   // Stack offset positioning
          //   top: `calc(5vh + ${index * cardGap}px)`,
          //   zIndex: index + 1,
          // }}
        >
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={cn(
              "relative w-full max-w-4xl h-[60vh] sm:h-[65vh] rounded-[2.5rem] p-8 md:p-12 shadow-xl dark:shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border transition-colors duration-300",
              item.color ||
                "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white",
            )}
          >
            {/* Subtle Glass Noise Overlay */}
            <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.03] pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {item.icon && (
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm dark:shadow-inner border border-zinc-200/80 dark:border-white/20 transition-colors">
                  <item.icon className="w-7 h-7 text-zinc-800 dark:text-white" />
                </div>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {item.title}
              </h2>
              <p
                className={cn(
                  "text-base sm:text-lg font-medium leading-relaxed max-w-lg transition-colors",
                  item.color
                    ? "text-white/80"
                    : "text-zinc-600 dark:text-white/70",
                )}
              >
                {item.description}
              </p>
            </div>

            {/* Right-Side Content Payload */}
            {item.content && (
              <div className="flex-1 relative z-10 rounded-2xl overflow-hidden bg-zinc-100/80 dark:bg-black/20 border border-zinc-200/80 dark:border-white/10 hidden md:flex items-center justify-center transition-colors">
                {item.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
