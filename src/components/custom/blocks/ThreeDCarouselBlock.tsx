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
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface ThreeDCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// Sub-component for individual cards to cleanly manage 3D tilt hooks without loop issues
interface CarouselCardProps {
  item: CarouselItem;
  index: number;
  activeIndex: number;
  total: number;
  onClick: () => void;
  onDragEnd: (_: MouseEvent | TouchEvent, info: PanInfo) => void;
}

function CarouselCard({
  item,
  index,
  activeIndex,
  total,
  onClick,
  onDragEnd,
}: CarouselCardProps) {
  // Calculate circular distance offset for fanned 3D layout
  let diff = (index - activeIndex) % total;
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;

  const offset = diff;
  const isCenter = offset === 0;

  // 3D Tilt Motion Values for interactive hover
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

  // Do not render cards that are too far out of the fan view
  if (Math.abs(offset) > 2) return null;

  return (
    <motion.div
      onClick={onClick}
      drag={isCenter ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      initial={false}
      animate={{
        x:
          offset *
          (typeof window !== "undefined" && window.innerWidth < 640
            ? 120
            : 220),
        scale: isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15),
        rotateY: offset * -22,
        z: -Math.abs(offset) * 140,
        zIndex: 30 - Math.abs(offset) * 10,
        opacity: isCenter ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.35),
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
      }}
      className={cn(
        "absolute w-[280px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[400px] md:h-[420px] rounded-3xl",
        isCenter
          ? "cursor-grab active:cursor-grabbing z-30"
          : "cursor-pointer z-10",
      )}
    >
      {/* Inner wrapper separates hover tilt transforms from outer fanned layout transforms */}
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: isCenter ? 1.02 : 1.05,
          transition: { duration: 0.2 },
        }}
        className={cn(
          "w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300",
          "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10",
          isCenter
            ? "shadow-zinc-400/50 dark:shadow-black/80 ring-1 ring-black/5 dark:ring-white/20"
            : "hover:border-zinc-400 dark:hover:border-white/30 shadow-md",
        )}
      >
        {/* Image Background */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
          />

          {/* Theme Adaptive Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />

          {/* Content Payload */}
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md w-fit mb-2 text-white/90">
              {item.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 leading-snug">
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
    </motion.div>
  );
}

export const ThreeDCarousel = React.forwardRef<
  HTMLDivElement,
  ThreeDCarouselProps
>(
  (
    { items, autoPlay = true, autoPlayInterval = 4000, className, ...props },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const total = items.length;

    const handleNext = useCallback(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const handlePrev = useCallback(() => {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Keyboard Navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

    // Auto-Play Timer
    useEffect(() => {
      if (isPlaying && !isHovered) {
        timerRef.current = setInterval(handleNext, autoPlayInterval);
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [isPlaying, isHovered, handleNext, autoPlayInterval]);

    // Drag / Swipe Interaction
    const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x < -threshold) {
        handleNext();
      } else if (info.offset.x > threshold) {
        handlePrev();
      }
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full h-[500px] md:h-[580px] flex flex-col items-center justify-center overflow-hidden select-none py-6",
          className,
        )}
        {...props}
      >
        {/* 3D Fanned Cards Container */}
        <div className="relative w-full max-w-4xl h-[360px] md:h-[420px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <CarouselCard
                key={item.id}
                item={item}
                index={index}
                activeIndex={activeIndex}
                total={total}
                onClick={() => index !== activeIndex && setActiveIndex(index)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls Bar */}
        <div className="flex items-center gap-4 mt-6 z-40">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Auto-play Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mt-4 z-40">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === activeIndex
                  ? "w-8 bg-zinc-900 dark:bg-white"
                  : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600",
              )}
            />
          ))}
        </div>
      </div>
    );
  },
);

ThreeDCarousel.displayName = "ThreeDCarousel";
