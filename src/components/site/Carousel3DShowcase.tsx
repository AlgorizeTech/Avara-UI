"use client";

import {
  CarouselItem,
  ThreeDCarousel,
} from "@/components/custom/blocks/ThreeDCarouselBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const CAROUSEL_CODE_TS = `"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface ThreeDCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const ThreeDCarousel = React.forwardRef<HTMLDivElement, ThreeDCarouselProps>(
  ({ items, autoPlay = true, autoPlayInterval = 4000, className, ...props }, ref) => {
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

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

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

    const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
      if (info.offset.x < -50) handleNext();
      else if (info.offset.x > 50) handlePrev();
    };

    const getOffset = (index: number) => {
      let diff = (index - activeIndex) % total;
      if (diff > Math.floor(total / 2)) diff -= total;
      if (diff < -Math.floor(total / 2)) diff += total;
      return diff;
    };

    return (
      <div ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={cn("relative w-full h-[500px] md:h-[580px] flex flex-col items-center justify-center overflow-hidden select-none py-6", className)} {...props}>
        <div className="relative w-full max-w-4xl h-[360px] md:h-[420px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => !isCenter && setActiveIndex(index)}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={false}
                  animate={{
                    x: offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 220),
                    scale: isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15),
                    rotateY: offset * -22,
                    z: -Math.abs(offset) * 140,
                    zIndex: 30 - Math.abs(offset) * 10,
                    opacity: isCenter ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.35),
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className={cn(
                    "absolute w-[280px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[400px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10",
                    isCenter ? "cursor-grab active:cursor-grabbing shadow-zinc-400/50 dark:shadow-black/80 ring-1 ring-black/5 dark:ring-white/20" : "cursor-pointer hover:border-zinc-400 dark:hover:border-white/30"
                  )}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md w-fit mb-2 text-white/90">{item.category}</span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 leading-snug">{item.title}</h3>
                      {item.description && <p className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 mt-6 z-40">
          <button onClick={handlePrev} className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md">{isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}</button>
          <button onClick={handleNext} className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center gap-2 mt-4 z-40">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setActiveIndex(idx)} className={cn("h-1.5 rounded-full transition-all duration-300", idx === activeIndex ? "w-8 bg-zinc-900 dark:bg-white" : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600")} />
          ))}
        </div>
      </div>
    );
  }
);
ThreeDCarousel.displayName = "ThreeDCarousel";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const CAROUSEL_CODE_JS = `"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThreeDCarousel = React.forwardRef(
  ({ items, autoPlay = true, autoPlayInterval = 4000, className, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);
    const total = items.length;

    const handleNext = useCallback(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const handlePrev = useCallback(() => {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

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

    const handleDragEnd = (_, info) => {
      if (info.offset.x < -50) handleNext();
      else if (info.offset.x > 50) handlePrev();
    };

    const getOffset = (index) => {
      let diff = (index - activeIndex) % total;
      if (diff > Math.floor(total / 2)) diff -= total;
      if (diff < -Math.floor(total / 2)) diff += total;
      return diff;
    };

    return (
      <div ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={cn("relative w-full h-[500px] md:h-[580px] flex flex-col items-center justify-center overflow-hidden select-none py-6", className)} {...props}>
        <div className="relative w-full max-w-4xl h-[360px] md:h-[420px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => !isCenter && setActiveIndex(index)}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={false}
                  animate={{
                    x: offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 220),
                    scale: isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15),
                    rotateY: offset * -22,
                    z: -Math.abs(offset) * 140,
                    zIndex: 30 - Math.abs(offset) * 10,
                    opacity: isCenter ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.35),
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className={cn(
                    "absolute w-[280px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[400px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10",
                    isCenter ? "cursor-grab active:cursor-grabbing shadow-zinc-400/50 dark:shadow-black/80 ring-1 ring-black/5 dark:ring-white/20" : "cursor-pointer hover:border-zinc-400 dark:hover:border-white/30"
                  )}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md w-fit mb-2 text-white/90">{item.category}</span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 leading-snug">{item.title}</h3>
                      {item.description && <p className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 mt-6 z-40">
          <button onClick={handlePrev} className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md">{isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}</button>
          <button onClick={handleNext} className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center gap-2 mt-4 z-40">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setActiveIndex(idx)} className={cn("h-1.5 rounded-full transition-all duration-300", idx === activeIndex ? "w-8 bg-zinc-900 dark:bg-white" : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600")} />
          ))}
        </div>
      </div>
    );
  }
);
ThreeDCarousel.displayName = "ThreeDCarousel";`;

export function Carousel3DShowcase() {
  const sampleItems: CarouselItem[] = [
    {
      id: "c1",
      category: "Architecture",
      title: "Futuristic Urban Sanctuary",
      description:
        "Experience next-generation living spaces integrated seamlessly with natural organic flora.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "c2",
      category: "Automotive",
      title: "Cybernetic Grand Tourer",
      description:
        "Pure electric performance meeting aerodynamic excellence and bespoke luxury craftsmanship.",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "c3",
      category: "Horology",
      title: "Chronograph Royale",
      description:
        "Precision Swiss engineering housed inside a brushed titanium and sapphire crystal case.",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "c4",
      category: "Expedition",
      title: "Nordic Glacial Retreat",
      description:
        "Isolated tranquility under the mesmerizing lights of the Arctic Aurora Borealis.",
      image:
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "c5",
      category: "Acoustics",
      title: "Obsidian Studio Monitors",
      description:
        "Audiophile-grade acoustic fidelity engineered for high-resolution spatial soundscapes.",
      image:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const generateUsageCode = () => {
    return `import { ThreeDCarousel } from "@/components/custom/blocks/ThreeDCarouselBlock";

export default function ShowcaseSection() {
  const items = [
    {
      id: "1",
      category: "Architecture",
      title: "Futuristic Sanctuary",
      description: "Next-generation living spaces integrated with natural flora.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    },
    // Add 4-7 items for optimal fanned layout
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <ThreeDCarousel items={items} autoPlay={true} autoPlayInterval={4500} />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Feature Explainer Panel */}
      <div className="flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          A high-performance 3D carousel powered by{" "}
          <strong>Framer Motion</strong> and <strong>Lucide React</strong>.
          Features physics-based touch/mouse dragging, keyboard arrow
          navigation, circular endless fanning, and an adaptive auto-play timer
          that pauses on hover. The aesthetic automatically adjusts between
          crisp zinc shadows in Light Mode and glowing borders in Dark Mode.
        </p>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ThreeDCarouselBlock"
        tsCode={CAROUSEL_CODE_TS}
        jsCode={CAROUSEL_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-12 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
          {/* Subtle Ambient Backglow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-zinc-900/5 dark:bg-white/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto relative z-10">
            <ThreeDCarousel
              items={sampleItems}
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
