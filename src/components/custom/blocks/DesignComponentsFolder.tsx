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
  color?: string;
  className?: string;
}

export function DesignComponentsFolder({ color, className }: DesignComponentsFolderProps) {
  const [isInView, setIsInView] = useState(false);
  const [retractedIndex, setRetractedIndex] = useState<number | null>(null);

  const getAccentColor = (col?: string) => {
    if (!col || col === "primary" || col === "default") return undefined;
    const presets: Record<string, string> = {
      indigo: "#6366f1",
      rose: "#f43f5e",
      emerald: "#10b981",
      zinc: "#18181b",
    };
    return presets[col] || col;
  };

  const resolvedColor = getAccentColor(color);
  const customStyle: React.CSSProperties = resolvedColor
    ? ({ "--primary": resolvedColor } as React.CSSProperties)
    : {};

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
    <section style={customStyle} className={cn("relative w-full py-8 md:py-16 select-none flex justify-center items-center", className)}>
      {/* 
        Full Width Responsive Stage with Scale Wrapper to ensure cards shrink smoothly on mobile/small screens
      */}
      <div className="w-full flex justify-center items-center px-1 sm:px-0">
        <motion.div 
          onViewportEnter={() => setIsInView(true)}
          className="relative w-full min-[494px]:w-[70%] sm:w-full max-w-[960px] mx-auto h-[380px] min-[450px]:h-[440px] min-[550px]:h-[500px] min-[620px]:h-[540px] sm:h-[580px] md:h-[660px] lg:h-[700px] flex items-end justify-center origin-bottom scale-[0.88] min-[400px]:scale-[0.94] min-[500px]:scale-[0.98] sm:scale-100 transition-all duration-300"
        >
          {/* CARDS FANNING OUT & AUTOMATIC SEQUENTIAL RETRACTING LOOP */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">

            {/* Card 0: Calendar (calendar.tsx) -> Indigo/Purple Tint */}
            <motion.div
              custom={{ initX: 240, initY: 340, rotate: -8, delay: 0.1, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 0 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: -3, y: -10, zIndex: 40 }}
              className="absolute top-[26%] sm:top-[6%] left-[6%] sm:left-[10%] md:left-[14%] lg:left-[16%] w-[130px] sm:w-[210px] md:w-[280px] lg:w-[320px] h-[105px] sm:h-[165px] md:h-[210px] lg:h-[235px] rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/30 cursor-pointer group bg-gradient-to-br from-indigo-500/10 via-card to-purple-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/calendar" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-indigo-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-indigo-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">calendar.tsx</span>
                    <div className="size-2 rounded-full bg-indigo-500/40" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden w-full">
                    <div className="w-full p-1.5 rounded-xl bg-card border border-indigo-500/20 space-y-1 my-auto text-[6.5px]">
                      <div className="flex items-center justify-between border-b border-border/40 pb-0.5 px-0.5">
                        <div className="flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
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
                        <span className="py-0.5 rounded-l-md bg-indigo-600 text-white font-black">14</span>
                        <span className="py-0.5 bg-indigo-500/20 text-indigo-600 font-extrabold">15</span>
                        <span className="py-0.5 bg-indigo-500/20 text-indigo-600 font-extrabold">16</span>
                        <span className="py-0.5 rounded-r-md bg-indigo-600 text-white font-black">17</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-indigo-500 truncate">
                      Calendar
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Date Picker Grid
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 transition-all group-hover:bg-indigo-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 1: Data Table (data-table.tsx) -> Emerald/Teal Tint */}
            <motion.div
              custom={{ initX: 60, initY: 350, rotate: 2, delay: 0.22, zIndex: 14 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 1 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[24%] sm:top-[4%] left-[30%] sm:left-[34%] md:left-[38%] lg:left-[40%] w-[135px] sm:w-[215px] md:w-[290px] lg:w-[330px] h-[110px] sm:h-[170px] md:h-[215px] lg:h-[240px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 cursor-pointer group bg-gradient-to-br from-emerald-500/10 via-card to-teal-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/data-table" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-emerald-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-emerald-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">data-table.tsx</span>
                    <div className="size-2 rounded-full bg-emerald-500/40" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden w-full">
                    <div className="w-full p-1.5 rounded-xl bg-card border border-emerald-500/20 space-y-1 my-auto text-[6px]">
                      <div className="flex justify-between items-center border-b border-border/40 pb-1 px-0.5">
                        <div className="flex items-center gap-1">
                          <span className="font-extrabold text-foreground text-[6.5px]">Invoices</span>
                          <span className="px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-600 font-mono text-[5px]">128 total</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-1 items-center bg-emerald-500/10 p-0.5 rounded border border-emerald-500/20 text-[5.5px]">
                        <span className="col-span-1 text-center text-emerald-600 font-bold">☑</span>
                        <span className="col-span-6 font-bold text-foreground truncate">Alex Rivers</span>
                        <span className="col-span-5 text-right font-extrabold text-emerald-500">$1,250.00</span>
                      </div>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm z-10">
                    New
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-emerald-500 truncate">
                      Data Table
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Sortable Table
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 transition-all group-hover:bg-emerald-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 2: Map (fleet-tracker.tsx) -> Blue/Sky Tint */}
            <motion.div
              custom={{ initX: -240, initY: 340, rotate: 12, delay: 0.34, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 2 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 4, y: -10, zIndex: 40 }}
              className="absolute top-[24%] sm:top-[4%] right-[4%] sm:right-[7%] md:right-[10%] lg:right-[12%] w-[125px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[105px] sm:h-[165px] md:h-[210px] lg:h-[235px] rounded-2xl overflow-hidden shadow-2xl border border-sky-500/30 cursor-pointer group bg-gradient-to-br from-sky-500/10 via-card to-blue-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/fleet-tracker" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-sky-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-sky-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">fleet-tracker.tsx</span>
                    <div className="size-2 rounded-full bg-sky-500/40" />
                  </div>

                  <div className="w-full h-full rounded-lg bg-sky-500/10 border border-sky-500/20 relative flex items-center justify-center my-auto overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none fill-sky-500/20 stroke-sky-500/50 stroke-1" viewBox="0 0 100 100">
                      <path d="M 45 10 Q 55 12, 60 20 Q 65 25, 75 30 Q 80 40, 70 50 Q 75 60, 68 75 Q 60 85, 55 90 Q 50 82, 45 78 Q 40 70, 32 65 Q 25 60, 28 50 Q 30 40, 35 30 Q 32 20, 45 10 Z" />
                    </svg>
                    <div className="absolute top-[48%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
                      <span className="size-3 rounded-full bg-rose-500/30 block animate-ping absolute inset-0" />
                      <span className="size-2 rounded-full bg-rose-500 block ring-2 ring-rose-500/40 border border-white shadow-xs" />
                    </div>
                    <div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-background/90 border border-sky-500/30 text-[5px] font-black text-sky-600 shadow-2xs">
                      Bangladesh
                    </div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-sky-500 truncate">
                      Map
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Fleet Tracker Map
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500 transition-all group-hover:bg-sky-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: Breadcrumb (breadcrumb.tsx) -> Violet/Fuchsia Tint */}
            <motion.div
              custom={{ initX: 180, initY: 280, rotate: -4, delay: 0.46, zIndex: 16 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 3 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: -1, y: -10, zIndex: 40 }}
              className="absolute top-[28%] sm:top-[18%] left-[12%] sm:left-[16%] md:left-[20%] lg:left-[23%] w-[145px] sm:w-[230px] md:w-[310px] lg:w-[350px] h-[125px] sm:h-[205px] md:h-[265px] lg:h-[295px] rounded-2xl overflow-hidden shadow-2xl border border-violet-500/30 cursor-pointer group bg-gradient-to-br from-violet-500/10 via-card to-fuchsia-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/breadcrumb" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-violet-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-violet-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">breadcrumb.tsx</span>
                    <div className="size-2 rounded-full bg-violet-500/40" />
                  </div>

                  <div className="w-full flex items-center justify-center my-auto">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-card border border-violet-500/20 shadow-sm flex items-center gap-1 sm:gap-1.5 text-[6.5px] sm:text-[8px] font-bold">
                      <span className="text-muted-foreground">Docs</span>
                      <span className="text-muted-foreground/50">/</span>
                      <span className="text-muted-foreground">Components</span>
                      <span className="text-muted-foreground/50">/</span>
                      <span className="text-violet-600 dark:text-violet-400 font-extrabold">Breadcrumb</span>
                    </div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-violet-500 truncate">
                      Breadcrumb
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Truncated Navigation
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 transition-all group-hover:bg-violet-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 4: Dock (dock.tsx) -> Amber/Orange Tint */}
            <motion.div
              custom={{ initX: -180, initY: 260, rotate: 4, delay: 0.7, zIndex: 18 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 4 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: 1, y: -10, zIndex: 40 }}
              className="absolute top-[30%] sm:top-[20%] right-[7%] sm:right-[11%] md:right-[15%] lg:right-[18%] w-[145px] sm:w-[230px] md:w-[310px] lg:w-[350px] h-[155px] sm:h-[285px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 cursor-pointer group bg-gradient-to-br from-amber-500/10 via-card to-orange-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/dock" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-amber-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-amber-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">dock.tsx</span>
                    <div className="size-2 rounded-full bg-amber-500/40" />
                  </div>

                  <div className="w-full flex items-center justify-center my-auto">
                    <div className="px-2.5 py-1.5 rounded-2xl bg-card border border-amber-500/20 shadow-md flex items-end gap-1.5">
                      <div className="size-4 rounded-lg bg-rose-500/80 flex items-center justify-center text-[7px] text-white font-bold">A</div>
                      <div className="size-4 rounded-lg bg-amber-500/80 flex items-center justify-center text-[7px] text-white font-bold">B</div>
                      <div className="size-5 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[9px] font-bold shadow-sm -translate-y-1">★</div>
                      <div className="size-4 rounded-lg bg-emerald-500/80 flex items-center justify-center text-[7px] text-white font-bold">C</div>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm z-10">
                    New
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-amber-500 truncate">
                      Dock
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      macOS Magnification
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 transition-all group-hover:bg-amber-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 5: File Upload (file-upload.tsx) -> Rose/Pink Tint */}
            <motion.div
              custom={{ initX: 260, initY: 250, rotate: -12, delay: 0.82, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 5 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: -6, y: -10, zIndex: 40 }}
              className="absolute top-[38%] sm:top-[28%] left-[2%] sm:left-[4%] md:left-[7%] lg:left-[9%] w-[125px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[145px] sm:h-[255px] md:h-[345px] lg:h-[385px] rounded-2xl overflow-hidden shadow-2xl border border-rose-500/30 cursor-pointer group bg-gradient-to-br from-rose-500/10 via-card to-pink-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/file-upload" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-rose-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-rose-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">file-upload.tsx</span>
                    <div className="size-2 rounded-full bg-rose-500/40" />
                  </div>

                  <div className="w-full max-w-[130px] p-2 rounded-xl bg-card border border-dashed border-rose-500/60 text-center space-y-1 my-auto mx-auto">
                    <span className="text-xs text-rose-500 font-bold">☁</span>
                    <div className="text-[8px] font-bold text-foreground">Drag &amp; Drop File</div>
                  </div>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-rose-500 truncate">
                      File Upload
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Drag &amp; Drop Motion
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 transition-all group-hover:bg-rose-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 6: Network Graph (network-graph.tsx) -> Cyan/Blue Tint */}
            <motion.div
              custom={{ initX: -260, initY: 250, rotate: 12, delay: 0.94, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 6 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: 6, y: -10, zIndex: 40 }}
              className="absolute top-[38%] sm:top-[28%] right-[1%] sm:right-[2%] md:right-[4%] lg:right-[5%] w-[125px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[145px] sm:h-[255px] md:h-[345px] lg:h-[385px] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 cursor-pointer group bg-gradient-to-br from-cyan-500/10 via-card to-blue-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/network-graph" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-cyan-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-1.5 sm:mb-2 group-hover:border-cyan-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">network-graph.tsx</span>
                    <div className="size-2 rounded-full bg-cyan-500/40" />
                  </div>

                  <div className="w-full h-full relative flex items-center justify-center p-1 my-auto overflow-hidden">
                    <div className="size-20 rounded-full border border-dashed border-cyan-500/35 absolute flex items-center justify-center pointer-events-none">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-emerald-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">A</div>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-amber-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">B</div>
                    </div>
                    <div className="size-5 rounded-full bg-cyan-500 text-white font-black text-[7px] flex items-center justify-center shadow-md z-10 border-2 border-background ring-2 ring-cyan-500/20">Core</div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-500 text-white shadow-sm z-10">
                    New
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-cyan-500 truncate">
                      Network Graph
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Node Graph Canvas
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 transition-all group-hover:bg-cyan-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 7: Navbar (navbar.tsx) -> Purple/Primary Tint */}
            <motion.div
              custom={{ initX: 60, initY: 250, rotate: 1, delay: 0.58, zIndex: 28 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 7 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[36%] sm:top-[28%] left-[24%] sm:left-[28%] md:left-[33%] lg:left-[36%] w-[135px] sm:w-[215px] md:w-[290px] lg:w-[330px] h-[125px] sm:h-[205px] md:h-[265px] lg:h-[295px] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 cursor-pointer group bg-gradient-to-br from-purple-500/10 via-card to-indigo-500/10 p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <Link href="/docs/nextjs/navbar" className="w-full h-full flex flex-col justify-between">
                {/* Top: Miniature Illustration Container */}
                <div className="w-full flex-1 rounded-xl border border-purple-500/20 bg-background/80 p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative mb-2 group-hover:border-purple-500/60 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">navbar.tsx</span>
                    <div className="size-2 rounded-full bg-purple-500/40" />
                  </div>

                  <div className="w-full my-auto px-0.5">
                    <div className="w-full p-1.5 rounded-xl bg-card border border-purple-500/20 flex items-center justify-between shadow-xs px-2.5">
                      <div className="flex items-center gap-1.5 text-[8.5px] font-black text-foreground">
                        <span className="size-2 rounded bg-purple-500" />
                        <span>DocsUI</span>
                      </div>
                      <div className="flex items-center gap-2 text-[7px] font-bold text-muted-foreground">
                        <span>Docs</span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-extrabold text-[6.5px]">Login</span>
                      </div>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500 text-white shadow-sm z-10">
                    Core
                  </span>
                </div>

                {/* Bottom: Card Info & Arrow */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="min-w-0 pr-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-purple-500 truncate">
                      Navbar
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium truncate">
                      Responsive Header
                    </p>
                  </div>
                  <div className="size-6 sm:size-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 transition-all group-hover:bg-purple-600 group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           FOREGROUND BLUE FROSTED GLASS FOLDER BOX (+50PX HEIGHT, TIGHTER CORNERS)
           ═══════════════════════════════════════════════ */}
        <div className="absolute bottom-0 w-[90%] sm:w-[82%] md:w-[620px] lg:w-[720px] h-[210px] min-[420px]:h-[250px] min-[520px]:h-[290px] sm:h-[330px] md:h-[400px] lg:h-[440px] z-30 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Folder Box */}
            <div className="absolute inset-0">
              {/* Subtle backdrop blur clipped strictly within folder shape boundaries */}
              <div 
                className="absolute inset-0 backdrop-blur-[3px] pointer-events-none"
                style={{ clipPath: "url(#folderShapeClip)" }}
              />
              <svg
                className="w-full h-full relative z-10"
                viewBox="-10 0 660 310"
                preserveAspectRatio="none"
              >
                <defs>
                  <clipPath id="folderShapeClip" clipPathUnits="objectBoundingBox">
                    <path d="M -0.012,0.0258 C -0.012,0.0097 -0.004,0 0.012,0 L 0.500,0 C 0.525,0 0.545,0.0806 0.564,0.145 C 0.576,0.187 0.594,0.2193 0.618,0.2193 L 0.966,0.2193 C 0.975,0.2193 0.982,0.2322 0.982,0.258 L 0.939,0.9742 C 0.939,0.9903 0.933,1 0.924,1 L 0.045,1 C 0.036,1 0.030,0.9903 0.030,0.9742 Z" />
                  </clipPath>
                  <linearGradient id="themeFolderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path
                  d="
                    M -8 8
                    C -8 3, -3 0, 8 0
                    L 330 0
                    C 347 0, 360 25, 372 45
                    C 380 58, 392 68, 408 68
                    L 638 68
                    C 644 68, 648 72, 648 80
                    L 620 302
                    C 620 307, 616 310, 610 310
                    L 30 310
                    C 24 310, 20 307, 20 302
                    Z
                  "
                  fill="url(#themeFolderGradient)"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Folder Text Content Overlay */}
            <div className="absolute inset-0 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-end pointer-events-auto">
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground tracking-tight leading-[1.05]">
                  Design<br />Components
                </h3>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
      </div>
    </section>
  );
}

export default DesignComponentsFolder;
