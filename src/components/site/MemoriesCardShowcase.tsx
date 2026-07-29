"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import {
  MemoriesCard,
  MemoryItem,
} from "@/components/custom/blocks/MemoriesCardBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const MEMORIES_CODE_TS = `"use client";

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

          // Fixed: Pass the correct original index of the NEW front card to the parent
          if (onCardChange && newStack[0]) {
            const nextActiveIndex = items.findIndex(
              (orig) => orig.id === newStack[0].id,
            );
            onCardChange(nextActiveIndex);
          }

          return newStack;
        });
        x.set(0);
        y.set(0);
      }
    };

    const handleReset = () => {
      setCards(items);
      if (onCardChange) onCardChange(0);
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

              // Fixed: Lookup card's original sequence index in the immutable items prop
              const originalIndex = items.findIndex(
                (orig) => orig.id === item.id,
              );

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
                      ? "cursor-grab active:cursor-grabbing shadow-primary/20 dark:shadow-primary/20 ring-2 ring-primary"
                      : "pointer-events-none hover:border-primary/50 shadow-md shadow-zinc-300/40 dark:shadow-black/50",
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
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground shadow-sm">
                          <Sparkles className="w-3 h-3" />
                          {item.tag}
                        </span>
                      ) : (
                        <div />
                      )}

                      {/* Fixed: Displays actual sequence (1/4, 2/4, etc.) based on original index */}
                      <span className="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {originalIndex + 1} / {items.length}
                      </span>
                    </div>

                    {/* Bottom Metadata Payload */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
                      <div className="flex items-center gap-4 text-xs font-medium text-zinc-300 dark:text-zinc-400 mb-2">
                        {item.date && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {item.date}
                          </span>
                        )}
                        {item.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-background border border-border px-3 py-1.5 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 transition-all"
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
`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const MEMORIES_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MapPin, Calendar, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const MemoriesCard = React.forwardRef(
  ({ items, onCardChange, className, ...props }, ref) => {
    const [cards, setCards] = useState(items);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-150, 150], [14, -14]), { stiffness: 300, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-150, 150], [-14, 14]), { stiffness: 300, damping: 25 });

    const handleMouseMove = (e) => {
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

    const handleDragEnd = (_, info) => {
      if (Math.abs(info.offset.x) > 80) {
        setCards((prev) => {
          const newStack = [...prev];
          const removed = newStack.shift();
          if (removed) newStack.push(removed);
          
          // Fixed: Pass the correct original index of the NEW front card to parent
          if (onCardChange && newStack[0]) {
            const nextActiveIndex = items.findIndex((orig) => orig.id === newStack[0].id);
            onCardChange(nextActiveIndex);
          }
          
          return newStack;
        });
        x.set(0);
        y.set(0);
      }
    };

    const handleReset = () => {
      setCards(items);
      if (onCardChange) onCardChange(0);
    };

    return (
      <div ref={ref} className={cn("relative w-full min-h-[520px] flex flex-col items-center justify-center py-8 select-none perspective-[1200px]", className)} {...props}>
        <div className="relative w-[300px] sm:w-[340px] md:w-[380px] h-[440px] sm:h-[480px] flex items-center justify-center">
          <AnimatePresence>
            {cards.map((item, index) => {
              const isFront = index === 0;
              
              // Fixed: Lookup card's original sequence index in the immutable items prop
              const originalIndex = items.findIndex((orig) => orig.id === item.id);
              
              const fanRotate = index === 1 ? 6 : index === 2 ? -6 : index * 4;
              const fanX = index === 1 ? 24 : index === 2 ? -24 : 0;
              const fanY = index * 12;
              const fanScale = 1 - index * 0.05;
              const fanZIndex = cards.length - index;

              if (index > 3) return null;

              return (
                <motion.div
                  key={item.id}
                  style={isFront ? { rotateX, rotateY, zIndex: fanZIndex } : { zIndex: fanZIndex }}
                  onMouseMove={isFront ? handleMouseMove : undefined}
                  onMouseLeave={isFront ? handleMouseLeave : undefined}
                  drag={isFront ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={isFront ? handleDragEnd : undefined}
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: fanScale, rotateZ: isFront ? 0 : fanRotate, x: isFront ? 0 : fanX, y: isFront ? 0 : fanY, opacity: 1 - index * 0.2 }}
                  exit={{ x: x.get() < 0 ? -350 : 350, opacity: 0, rotateZ: x.get() < 0 ? -20 : 20, transition: { duration: 0.3 } }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={cn(
                    "absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10",
                    isFront ? "cursor-grab active:cursor-grabbing shadow-zinc-400/60 dark:shadow-black/90 ring-1 ring-black/5 dark:ring-white/20" : "pointer-events-none shadow-md shadow-zinc-300/40 dark:shadow-black/50"
                  )}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />
                    <div className="absolute top-5 inset-x-5 flex items-center justify-between pointer-events-none text-white">
                      {item.tag ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md text-white/95 border border-white/20">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          {item.tag}
                        </span>
                      ) : <div />}
                      {/* Fixed: Displays actual sequence (1/4, 2/4, etc.) based on original index */}
                      <span className="text-xs font-medium text-white/80 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">{originalIndex + 1} / {items.length}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none text-white">
                      <div className="flex items-center gap-4 text-xs font-medium text-zinc-300 dark:text-zinc-400 mb-2">
                        {item.date && <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-400" />{item.date}</span>}
                        {item.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" />{item.location}</span>}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-snug text-white">{item.title}</h3>
                      {item.description && <p className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[380px] mt-6 px-2 z-40">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">← Swipe card left or right to cycle →</span>
          <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all"><RotateCcw className="w-3.5 h-3.5" />Reset</button>
        </div>
      </div>
    );
  }
);
MemoriesCard.displayName = "MemoriesCard";`;

export function MemoriesCardShowcase() {
  const sampleMemories: MemoryItem[] = [
    {
      id: "m1",
      tag: "Highlight",
      title: "Kyoto Lantern Festival",
      location: "Kyoto, Japan",
      date: "Oct 2025",
      description:
        "Walking through thousands of glowing paper lanterns illuminating the historic Gion district at twilight.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "m2",
      tag: "Expedition",
      title: "Dolomites Alpine Ridge",
      location: "South Tyrol, Italy",
      date: "Aug 2025",
      description:
        "Reaching the summit just as the morning sun cast jagged shadows across the limestone peaks.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "m3",
      tag: "Sanctuary",
      title: "Amalfi Coast Drive",
      location: "Positano, Italy",
      date: "Jul 2025",
      description:
        "Cruising along cliffside roads winding above the turquoise waters of the Mediterranean Sea.",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "m4",
      tag: "Wilderness",
      title: "Banff Glacial Lake",
      location: "Alberta, Canada",
      date: "Jun 2025",
      description:
        "Canoeing across crystal-clear emerald waters fed directly by ancient mountain glaciers.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const generateUsageCode = () => {
    return `import { MemoriesCard } from "@/components/custom/blocks/MemoriesCardBlock";

export default function MemoriesSection() {
  const memories = [
    {
      id: "1",
      tag: "Highlight",
      title: "Kyoto Lantern Festival",
      location: "Kyoto, Japan",
      date: "Oct 2025",
      description: "Walking through glowing paper lanterns in historic Gion.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    },
    // Add 3-5 total memories for optimal stacking depth
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <MemoriesCard items={memories} />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Feature Explainer Panel */}
      <ShowcaseControlPanel className="flex flex-col gap-4 p-5 rounded-xl z-0 relative">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          An interactive stack card featuring real-time{" "}
          <strong>3D perspective tilt</strong> that tracks cursor movement, a
          dynamic fanned background spread that scales and rotates depth layers,
          and physics-enabled swipe gestures. Swiping any direction cycles the
          front card smoothly to the back of the deck.
        </p>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="MemoriesCardBlock"
        tsCode={MEMORIES_CODE_TS}
        jsCode={MEMORIES_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-12 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
          {/* Ambient Radial Backglow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primary/5 dark:bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="w-full max-w-4xl mx-auto relative z-10">
            <MemoriesCard items={sampleMemories} />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
