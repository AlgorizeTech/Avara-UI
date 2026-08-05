"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  BarChart2,
  Terminal,
  LayoutGrid,
  Search,
  Lock,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DesignComponentsFolderProps {
  className?: string;
}

export function DesignComponentsFolder({ className }: DesignComponentsFolderProps) {
  const [isInView, setIsInView] = useState(false);
  const [retractedIndex, setRetractedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    // Start auto loop 2 seconds after initial entrance fan-out
    const startTimer = setTimeout(() => {
      let current = 0;

      const interval = setInterval(() => {
        // Retract card into folder
        setRetractedIndex(current);

        // Bring card back out to visible state after 900ms
        setTimeout(() => {
          setRetractedIndex(null);
          current = (current + 1) % 8;
        }, 900);
      }, 2500);

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(startTimer);
  }, [isInView]);

  // Fan-out animation variants
  const fanOutVariants = {
    hidden: (custom: { initX: number; initY: number; zIndex?: number }) => ({
      x: custom.initX,
      y: custom.initY,
      scale: 0.2,
      opacity: 0,
      rotate: 0,
      zIndex: custom.zIndex ?? 10,
    }),
    visible: (custom: { rotate: number; delay: number; zIndex?: number }) => ({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotate: custom.rotate,
      zIndex: custom.zIndex ?? 10,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
        delay: custom.delay,
      },
    }),
    retracted: (custom: { initX: number; initY: number; zIndex?: number }) => ({
      x: custom.initX,
      y: custom.initY,
      scale: 0.2,
      opacity: 0,
      rotate: 0,
      zIndex: custom.zIndex ?? 10,
      transition: {
        type: "spring" as const,
        stiffness: 110,
        damping: 15,
      },
    }),
  };

  return (
    <section className={cn("relative w-full py-4 md:py-8 overflow-hidden select-none flex justify-center items-center", className)}>
      {/* 
        Full Width Responsive Stage (Matching max-w-[1320px] Component Preview Catalog container)
      */}
      <motion.div 
        onViewportEnter={() => setIsInView(true)}
        className="relative w-full max-w-[1320px] mx-auto h-[400px] sm:h-[540px] md:h-[680px] lg:h-[760px] flex items-end justify-center"
      >
        {/* CARDS FANNING OUT & AUTOMATIC SEQUENTIAL RETRACTING LOOP */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">

            {/* Card 0: Calendar (calendar.tsx) -> /docs/nextjs/calendar */}
            <motion.div
              custom={{ initX: 240, initY: 340, rotate: -8, delay: 0.1, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 0 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: -3, y: -10, zIndex: 40 }}
              className="absolute top-[2%] left-[6%] sm:left-[10%] md:left-[14%] lg:left-[16%] w-[140px] sm:w-[210px] md:w-[280px] lg:w-[320px] h-[120px] sm:h-[165px] md:h-[210px] lg:h-[235px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/calendar" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">calendar.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden w-full">
                    <div className="w-full p-1.5 rounded-xl bg-background border-y border-border/80 space-y-1 my-auto text-[6.5px]">
                      <div className="flex items-center justify-between border-b border-border/40 pb-0.5 px-0.5">
                        <div className="flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="font-extrabold text-[7.5px] text-foreground">August 2026</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-muted-foreground text-[6px]">
                          <span className="size-3 rounded bg-muted/60 border border-border flex items-center justify-center font-bold">‹</span>
                          <span className="size-3 rounded bg-muted/60 border border-border flex items-center justify-center font-bold">›</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 font-extrabold text-muted-foreground/70 text-center text-[5.5px] uppercase">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 text-center font-bold text-[6px] items-center">
                        <span className="text-muted-foreground/30 py-0.5">30</span>
                        <span className="text-muted-foreground/30 py-0.5">31</span>
                        <span className="py-0.5 rounded text-foreground">1</span>
                        <span className="py-0.5 rounded text-foreground">2</span>
                        <span className="py-0.5 rounded text-foreground">3</span>
                        <span className="py-0.5 rounded text-foreground">4</span>
                        <span className="py-0.5 rounded text-foreground">5</span>
                        <span className="py-0.5 rounded-l-md bg-primary text-primary-foreground font-black">14</span>
                        <span className="py-0.5 bg-primary/20 text-primary font-extrabold">15</span>
                        <span className="py-0.5 bg-primary/20 text-primary font-extrabold">16</span>
                        <span className="py-0.5 rounded-r-md bg-primary text-primary-foreground font-black">17</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow (Matching Component Preview Catalog verbatim) */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Calendar
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Date Picker Grid
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 1: Data Table (data-table.tsx) -> /docs/nextjs/data-table */}
            <motion.div
              custom={{ initX: 60, initY: 350, rotate: 2, delay: 0.22, zIndex: 14 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 1 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[0%] left-[30%] sm:left-[34%] md:left-[38%] lg:left-[40%] w-[145px] sm:w-[215px] md:w-[290px] lg:w-[330px] h-[125px] sm:h-[170px] md:h-[215px] lg:h-[240px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/data-table" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">data-table.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden w-full">
                    <div className="w-full p-1.5 rounded-xl bg-card border border-border/80 space-y-1 my-auto text-[6px]">
                      <div className="flex justify-between items-center border-b border-border/40 pb-1 px-0.5">
                        <div className="flex items-center gap-1">
                          <span className="font-extrabold text-foreground text-[6.5px]">Invoices</span>
                          <span className="px-1 py-0.2 rounded bg-primary/10 text-primary font-mono text-[5px]">128 total</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-1 items-center bg-primary/5 p-0.5 rounded border border-primary/20 text-[5.5px]">
                        <span className="col-span-1 text-center text-primary font-bold">☑</span>
                        <span className="col-span-6 font-bold text-foreground truncate">Alex Rivers</span>
                        <span className="col-span-5 text-right font-extrabold text-emerald-500">$1,250.00</span>
                      </div>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm z-10">
                    New
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Data Table
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Sortable Table
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 2: Map (fleet-tracker.tsx) -> /docs/nextjs/fleet-tracker */}
            <motion.div
              custom={{ initX: -240, initY: 340, rotate: 12, delay: 0.34, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 2 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 4, y: -10, zIndex: 40 }}
              className="absolute top-[4%] right-[4%] sm:right-[7%] md:right-[10%] lg:right-[12%] w-[130px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[120px] sm:h-[165px] md:h-[210px] lg:h-[235px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/fleet-tracker" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">fleet-tracker.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none fill-primary/20 stroke-primary/50 stroke-1" viewBox="0 0 100 100">
                      <path d="M 45 10 Q 55 12, 60 20 Q 65 25, 75 30 Q 80 40, 70 50 Q 75 60, 68 75 Q 60 85, 55 90 Q 50 82, 45 78 Q 40 70, 32 65 Q 25 60, 28 50 Q 30 40, 35 30 Q 32 20, 45 10 Z" />
                    </svg>
                    <div className="absolute top-[48%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
                      <span className="size-3 rounded-full bg-rose-500/30 block animate-ping absolute inset-0" />
                      <span className="size-2 rounded-full bg-rose-500 block ring-2 ring-rose-500/40 border border-white shadow-xs" />
                    </div>
                    <div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-background/90 border border-border text-[5px] font-black text-primary shadow-2xs">
                      Bangladesh
                    </div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Map
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Fleet Tracker Map
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: Loader (loader.tsx) -> /docs/nextjs/loader */}
            <motion.div
              custom={{ initX: 180, initY: 280, rotate: -4, delay: 0.46, zIndex: 16 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 3 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: -1, y: -10, zIndex: 40 }}
              className="absolute top-[18%] left-[12%] sm:left-[16%] md:left-[20%] lg:left-[23%] w-[155px] sm:w-[230px] md:w-[310px] lg:w-[350px] h-[145px] sm:h-[205px] md:h-[265px] lg:h-[295px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/loader" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">loader.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="my-auto flex items-center justify-center gap-3">
                    <div className="size-6 sm:size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <div className="flex gap-1">
                      <span className="size-1.5 sm:size-2 rounded-full bg-primary animate-bounce" />
                      <span className="size-1.5 sm:size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]" />
                      <span className="size-1.5 sm:size-2 rounded-full bg-primary/30 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Loader
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Spinners &amp; Pulse
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 4: Dock (dock.tsx) -> /docs/nextjs/dock */}
            <motion.div
              custom={{ initX: -180, initY: 260, rotate: 4, delay: 0.7, zIndex: 18 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 4 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: 1, y: -10, zIndex: 40 }}
              className="absolute top-[20%] right-[7%] sm:right-[11%] md:right-[15%] lg:right-[18%] w-[155px] sm:w-[230px] md:w-[310px] lg:w-[350px] h-[195px] sm:h-[285px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/dock" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">dock.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="w-full flex items-center justify-center my-auto">
                    <div className="px-2.5 py-1.5 rounded-2xl bg-background border border-border/80 shadow-md flex items-end gap-1.5">
                      <div className="size-4 rounded-lg bg-rose-500/80 flex items-center justify-center text-[7px] text-white font-bold">A</div>
                      <div className="size-4 rounded-lg bg-amber-500/80 flex items-center justify-center text-[7px] text-white font-bold">B</div>
                      <div className="size-5 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-[9px] font-bold shadow-sm -translate-y-1">★</div>
                      <div className="size-4 rounded-lg bg-emerald-500/80 flex items-center justify-center text-[7px] text-white font-bold">C</div>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm z-10">
                    New
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Dock
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      macOS Magnification
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 5: File Upload (file-upload.tsx) -> /docs/nextjs/file-upload */}
            <motion.div
              custom={{ initX: 260, initY: 250, rotate: -12, delay: 0.82, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 5 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: -6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[2%] sm:left-[4%] md:left-[7%] lg:left-[9%] w-[130px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[175px] sm:h-[255px] md:h-[345px] lg:h-[385px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/file-upload" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">file-upload.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-dashed border-primary/60 text-center space-y-1 my-auto mx-auto">
                    <span className="text-xs text-primary font-bold">☁</span>
                    <div className="text-[8px] font-bold text-foreground">Drag &amp; Drop File</div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      File Upload
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Drag &amp; Drop Motion
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 6: Network Graph (network-graph.tsx) -> /docs/nextjs/network-graph */}
            <motion.div
              custom={{ initX: -260, initY: 250, rotate: 12, delay: 0.94, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 6 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: 6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] right-[1%] sm:right-[2%] md:right-[4%] lg:right-[5%] w-[130px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[175px] sm:h-[255px] md:h-[345px] lg:h-[385px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/network-graph" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">network-graph.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="w-full h-full relative flex items-center justify-center p-1 my-auto overflow-hidden">
                    <div className="size-20 rounded-full border border-dashed border-primary/25 absolute flex items-center justify-center pointer-events-none">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-emerald-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">A</div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-amber-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">B</div>
                    </div>
                    <div className="size-5 rounded-full bg-primary text-primary-foreground font-black text-[7px] flex items-center justify-center shadow-md z-10 border-2 border-background ring-2 ring-primary/20">Core</div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm z-10">
                    New
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Network Graph
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Node Graph Canvas
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 7: Navbar (navbar.tsx) -> /docs/nextjs/navbar */}
            <motion.div
              custom={{ initX: 60, initY: 250, rotate: 1, delay: 0.58, zIndex: 28 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 7 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[24%] sm:left-[28%] md:left-[33%] lg:left-[36%] w-[145px] sm:w-[215px] md:w-[290px] lg:w-[330px] h-[145px] sm:h-[205px] md:h-[265px] lg:h-[295px] rounded-2xl overflow-hidden shadow-2xl border border-border/70 cursor-pointer group bg-card p-3 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/navbar" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">navbar.tsx</span>
                    <div className="size-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="w-full my-auto px-0.5">
                    <div className="w-full p-1.5 rounded-xl bg-background border border-border/80 flex items-center justify-between shadow-xs px-2.5">
                      <div className="flex items-center gap-1.5 text-[8.5px] font-black text-foreground">
                        <span className="size-2 rounded bg-primary" />
                        <span>DocsUI</span>
                      </div>
                      <div className="flex items-center gap-2 text-[7px] font-bold text-muted-foreground">
                        <span>Docs</span>
                        <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold text-[6.5px]">Login</span>
                      </div>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm z-10">
                    Core
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary truncate">
                      Navbar
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Responsive Header
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           FOREGROUND SOLID THEME FOLDER BOX (SCALED FOR LARGE CANVAS)
           ═══════════════════════════════════════════════ */}
        <div className="absolute bottom-0 w-[94%] sm:w-[88%] md:w-[780px] lg:w-[920px] h-[220px] sm:h-[290px] md:h-[380px] lg:h-[430px] z-30 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Folder Box */}
            <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
              <svg
                className="w-full h-full"
                viewBox="0 0 640 310"
                preserveAspectRatio="none"
              >
                <path
                  d="
                    M 0 20
                    C 0 10, 10 0, 20 0
                    L 195 0
                    C 212 0, 224 12, 236 22
                    C 244 28, 256 34, 272 34
                    L 620 34
                    C 631 34, 640 43, 640 54
                    L 640 296
                    C 640 304, 632 310, 620 310
                    L 20 310
                    C 8 310, 0 302, 0 294
                    Z
                  "
                  fill="var(--primary)"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Folder Text Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-end pointer-events-auto">
              <div className="relative z-10 pb-1">
                <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white dark:text-black tracking-tight leading-[1.05] drop-shadow-md">
                  Design<br />Components
                </h3>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}

export default DesignComponentsFolder;
