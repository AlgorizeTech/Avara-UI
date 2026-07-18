"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  PanInfo,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Calendar, MapPin, RotateCcw, Sparkles } from "lucide-react";
import React, { useState } from "react";

export interface MemoryItem {
  id: string;
  title: string;
  location?: string;
  date?: string;
  image: string;
  description?: string;
  tag?: string;
}

export interface MemoriesCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: MemoryItem[];
  onCardChange?: (index: number) => void;
}

export const MemoriesCard = React.forwardRef<HTMLDivElement, MemoriesCardProps>(
  ({ items, onCardChange, className, ...props }, ref) => {
    const [cards, setCards] = useState<MemoryItem[]>(items);

    // 3D Tilt Motion Values for Front Card
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-150, 150], [14, -14]), {
      stiffness: 300,
      damping: 25,
    });
    const rotateY = useSpring(useTransform(x, [-150, 150], [-14, 14]), {
      stiffness: 300,
      damping: 25,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
      const threshold = 80;
      if (Math.abs(info.offset.x) > threshold) {
        // Remove front card and push to the back of the stack
        setCards((prev) => {
          const newStack = [...prev];
          const removed = newStack.shift();
          if (removed) newStack.push(removed);
          if (onCardChange) onCardChange(0);
          return newStack;
        });
        x.set(0);
        y.set(0);
      }
    };

    const handleReset = () => {
      setCards(items);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full min-h-[520px] flex flex-col items-center justify-center py-8 select-none perspective-[1200px]",
          className,
        )}
        {...props}
      >
        {/* Card Stack Container */}
        <div className="relative w-[300px] sm:w-[340px] md:w-[380px] h-[440px] sm:h-[480px] flex items-center justify-center">
          <AnimatePresence>
            {cards.map((item, index) => {
              const isFront = index === 0;

              // Calculate fanned background spread offsets
              const fanRotate = index === 1 ? 6 : index === 2 ? -6 : index * 4;
              const fanX = index === 1 ? 24 : index === 2 ? -24 : 0;
              const fanY = index * 12;
              const fanScale = 1 - index * 0.05;
              const fanZIndex = cards.length - index;

              // Hide cards deep in the stack for performance
              if (index > 3) return null;

              return (
                <motion.div
                  key={item.id}
                  style={
                    isFront
                      ? { rotateX, rotateY, zIndex: fanZIndex }
                      : { zIndex: fanZIndex }
                  }
                  onMouseMove={isFront ? handleMouseMove : undefined}
                  onMouseLeave={isFront ? handleMouseLeave : undefined}
                  drag={isFront ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={isFront ? handleDragEnd : undefined}
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{
                    scale: fanScale,
                    rotateZ: isFront ? 0 : fanRotate,
                    x: isFront ? 0 : fanX,
                    y: isFront ? 0 : fanY,
                    opacity: 1 - index * 0.2,
                  }}
                  exit={{
                    x: x.get() < 0 ? -350 : 350,
                    opacity: 0,
                    rotateZ: x.get() < 0 ? -20 : 20,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={cn(
                    "absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300",
                    "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10",
                    isFront
                      ? "cursor-grab active:cursor-grabbing shadow-zinc-400/60 dark:shadow-black/90 ring-1 ring-black/5 dark:ring-white/20"
                      : "pointer-events-none shadow-md shadow-zinc-300/40 dark:shadow-black/50",
                  )}
                >
                  {/* Card Background Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />

                    {/* Top Bar Badges */}
                    <div className="absolute top-5 inset-x-5 flex items-center justify-between pointer-events-none text-white">
                      {item.tag ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md text-white/95 border border-white/20">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          {item.tag}
                        </span>
                      ) : (
                        <div />
                      )}
                      <span className="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {index + 1} / {cards.length}
                      </span>
                    </div>

                    {/* Bottom Metadata Payload */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
                      <div className="flex items-center gap-4 text-xs font-medium text-zinc-300 dark:text-zinc-400 mb-2">
                        {item.date && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {item.date}
                          </span>
                        )}
                        {item.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-snug text-white">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Controls & Instructions */}
        <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[380px] mt-6 px-2 z-40">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
            ← Swipe card left or right to cycle →
          </span>

          <button
            onClick={handleReset}
            title="Reset stack order"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>
    );
  },
);

MemoriesCard.displayName = "MemoriesCard";
