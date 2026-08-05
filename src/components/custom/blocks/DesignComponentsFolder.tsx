"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ArrowLeft,
  Flame,
  MoreHorizontal,
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
        
        {/* ═══════════════════════════════════════════════
           CARDS FANNING OUT & AUTOMATIC SEQUENTIAL RETRACTING LOOP
           ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">

            {/* Card 0: Top Left Photo Card with Play Overlay */}
            <motion.div
              custom={{ initX: 240, initY: 340, rotate: -8, delay: 0.1, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 0 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: -3, y: -10, zIndex: 40 }}
              className="absolute top-[2%] left-[6%] sm:left-[10%] md:left-[14%] lg:left-[16%] w-[140px] sm:w-[210px] md:w-[280px] lg:w-[320px] h-[90px] sm:h-[135px] md:h-[180px] lg:h-[200px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/25 cursor-pointer group bg-zinc-800"
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop"
                alt="Delivery Video Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="size-7 sm:size-10 md:size-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="size-3.5 sm:size-5 fill-white ml-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 1: Top Center Neon Lime Yellow Exchange Card */}
            <motion.div
              custom={{ initX: 60, initY: 350, rotate: 2, delay: 0.22, zIndex: 14 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 1 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[0%] left-[30%] sm:left-[34%] md:left-[38%] lg:left-[40%] w-[145px] sm:w-[215px] md:w-[290px] lg:w-[330px] h-[95px] sm:h-[140px] md:h-[185px] lg:h-[210px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-[#DFFF00] text-black p-3 sm:p-4 md:p-6 shadow-2xl border border-black/10 cursor-pointer font-sans flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[9px] sm:text-[12px] md:text-[14px] font-bold tracking-tight text-black/70">
                <span>Exchange</span>
                <span className="text-[8px] sm:text-[11px] md:text-[12px] font-bold">USD ➔ EUR</span>
              </div>
              <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black">
                $285.72
              </div>
              <div className="text-[8px] sm:text-[11px] md:text-[13px] font-semibold text-black/60">
                Available balance
              </div>
            </motion.div>

            {/* Card 2: Top Right Orange Calories Burned Card */}
            <motion.div
              custom={{ initX: -240, initY: 340, rotate: 12, delay: 0.34, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 2 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 4, y: -10, zIndex: 40 }}
              className="absolute top-[4%] right-[4%] sm:right-[7%] md:right-[10%] lg:right-[12%] w-[130px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[90px] sm:h-[135px] md:h-[180px] lg:h-[200px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#FF5500] to-[#E04400] text-white p-3 sm:p-4 md:p-6 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 sm:gap-2.5 text-[9px] sm:text-[12px] md:text-sm font-medium text-white/90">
                <Flame className="size-3.5 sm:size-5 fill-white text-white" />
                <div className="leading-none">
                  <div className="font-bold text-[9px] sm:text-[12px] md:text-base">Calories</div>
                  <div className="text-[7px] sm:text-[10px] md:text-xs text-white/70">Age: 37</div>
                </div>
              </div>
              <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                11,840
              </div>
            </motion.div>

            {/* Card 3: Mid Left Dark F1 Racing Card */}
            <motion.div
              custom={{ initX: 180, initY: 280, rotate: -4, delay: 0.46, zIndex: 16 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 3 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: -1, y: -10, zIndex: 40 }}
              className="absolute top-[18%] left-[12%] sm:left-[16%] md:left-[20%] lg:left-[23%] w-[155px] sm:w-[230px] md:w-[310px] lg:w-[350px] h-[125px] sm:h-[180px] md:h-[240px] lg:h-[270px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-[#1C1D1F]/95 backdrop-blur-md border border-white/10 p-3 sm:p-5 md:p-6 shadow-2xl text-white cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <div className="size-4 sm:size-6 md:size-7 rounded-full bg-red-600 font-extrabold text-[7px] sm:text-[9px] md:text-xs flex items-center justify-center text-white">
                    F1
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[12px] md:text-base font-bold leading-none text-zinc-100">Saudi Arabian GP</div>
                    <div className="text-[7px] sm:text-[10px] md:text-xs text-zinc-400">Tomorrow</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[8px] sm:text-[11px] md:text-xs font-bold text-zinc-400 mb-1 sm:mb-2">
                  <span>🏁</span>
                  <span>Starting Grid</span>
                </div>
                <div className="space-y-1 text-[9px] sm:text-[12px] md:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 text-zinc-200">
                    <span className="text-zinc-500 font-mono text-[8px] sm:text-xs">1.</span>
                    <span className="font-semibold truncate">Max Verstappen</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2.5 text-zinc-400">
                    <span className="text-zinc-500 font-mono text-[8px] sm:text-xs">2.</span>
                    <span className="truncate">Charles Leclerc</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Center Right Screen Time Green Card (#269159) */}
            <motion.div
              custom={{ initX: -180, initY: 260, rotate: 4, delay: 0.7, zIndex: 18 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 4 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: 1, y: -10, zIndex: 40 }}
              className="absolute top-[20%] right-[7%] sm:right-[11%] md:right-[15%] lg:right-[18%] w-[155px] sm:w-[230px] md:w-[310px] lg:w-[350px] h-[175px] sm:h-[260px] md:h-[350px] lg:h-[390px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-[#269159] text-white p-3 sm:p-5 md:p-7 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[12px] md:text-base font-bold text-white">
                    <ArrowLeft className="size-3.5 sm:size-5" />
                    <span>Screen Time</span>
                  </div>
                  <MoreHorizontal className="size-3.5 sm:size-5 text-white/70" />
                </div>

                <div className="mt-2 sm:mt-4 flex items-center bg-black/15 p-1 rounded-full text-[9px] sm:text-[12px] font-semibold text-center border border-white/10">
                  <div className="flex-1 py-1 sm:py-1.5 rounded-full bg-white text-[#269159] shadow-sm font-bold">
                    Daily
                  </div>
                  <div className="flex-1 py-1 sm:py-1.5 text-white/80">
                    Weekly
                  </div>
                </div>

                <div className="mt-2 sm:mt-4">
                  <div className="text-[8px] sm:text-[11px] md:text-xs text-white/80 font-medium">Daily Avg</div>
                  <div className="flex items-baseline gap-1.5 sm:gap-3 mt-1">
                    <span className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">8h 28m</span>
                    <span className="text-[7px] sm:text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                      -12%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-1 sm:gap-2 h-12 sm:h-16 md:h-24 pt-2">
                {[
                  { h: "50%", colors: ["bg-pink-400", "bg-cyan-300"] },
                  { h: "80%", colors: ["bg-cyan-300", "bg-purple-300", "bg-amber-300"] },
                  { h: "100%", colors: ["bg-purple-300", "bg-amber-300", "bg-cyan-300"] },
                  { h: "65%", colors: ["bg-amber-300", "bg-pink-400"] },
                  { h: "85%", colors: ["bg-white", "bg-purple-300", "bg-cyan-300"] },
                  { h: "40%", colors: ["bg-cyan-300"] },
                  { h: "70%", colors: ["bg-purple-300", "bg-pink-400"] },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 sm:gap-1 rounded-t overflow-hidden" style={{ height: bar.h }}>
                    {bar.colors.map((c, j) => (
                      <div key={j} className={cn("w-full flex-1 rounded-sm", c)} />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 5: Far Left Purple Monthly Revenue Card */}
            <motion.div
              custom={{ initX: 260, initY: 250, rotate: -12, delay: 0.82, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 5 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: -6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[2%] sm:left-[4%] md:left-[7%] lg:left-[9%] w-[130px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[155px] sm:h-[230px] md:h-[310px] lg:h-[350px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-[#B485FF] text-white p-3 sm:p-5 md:p-6 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[9px] sm:text-[12px] md:text-sm font-medium text-white/90">Revenue</div>
                <div className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mt-1">$12,450</div>
                <div className="text-[7px] sm:text-[10px] md:text-xs text-white/70 mt-1">14 Jan - 12 Feb</div>
              </div>
              <div className="h-10 sm:h-16 md:h-20 w-full relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path
                    d="M 0 35 Q 25 10, 50 25 T 100 5"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Card 6: Far Right Green Light Card */}
            <motion.div
              custom={{ initX: -260, initY: 250, rotate: 12, delay: 0.94, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 6 ? "retracted" : "visible"}
              whileHover={{ scale: 1.05, rotate: 6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] right-[1%] sm:right-[2%] md:right-[4%] lg:right-[5%] w-[130px] sm:w-[195px] md:w-[260px] lg:w-[290px] h-[155px] sm:h-[230px] md:h-[310px] lg:h-[350px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-zinc-800/90 text-white p-3 sm:p-5 md:p-6 shadow-2xl border border-white/10 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[9px] sm:text-[12px] md:text-base font-bold text-zinc-100">Green Light</div>
                <div className="text-[7px] sm:text-[10px] md:text-xs text-zinc-400">Lucide</div>
              </div>
              <div className="rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden h-24 sm:h-36 md:h-48 relative bg-zinc-700">
                <img
                  src="https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=300&auto=format&fit=crop"
                  alt="Sprint Runner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-2 left-2 text-[8px] sm:text-[11px] md:text-xs font-bold text-white leading-tight drop-shadow">
                  Sprint Mode
                </div>
              </div>
            </motion.div>

            {/* Card 7: Center Video Stabilization Card */}
            <motion.div
              custom={{ initX: 60, initY: 250, rotate: 1, delay: 0.58, zIndex: 28 }}
              variants={fanOutVariants}
              initial="hidden"
              animate={!isInView ? "hidden" : retractedIndex === 7 ? "retracted" : "visible"}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[24%] sm:left-[28%] md:left-[33%] lg:left-[36%] w-[145px] sm:w-[215px] md:w-[290px] lg:w-[330px] h-[125px] sm:h-[180px] md:h-[240px] lg:h-[270px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-3 sm:p-5 md:p-7 shadow-2xl border-none cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h4 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-zinc-900 dark:text-white">
                  Video<br />Stabilization
                </h4>
                <p className="text-[8px] sm:text-[11px] md:text-sm text-zinc-600 dark:text-zinc-400 mt-1 sm:mt-2.5 leading-relaxed">
                  Smooth out shaky footage for professional look.
                </p>
              </div>
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
                <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
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
