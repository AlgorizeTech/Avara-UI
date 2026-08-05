"use client";

import React from "react";
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
  // All cards start tucked 100% deep inside the solid bottom-center of the folder box
  const fanOutVariants = {
    hidden: (custom: { initX: number; initY: number }) => ({
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
        type: "spring",
        stiffness: 90,
        damping: 14,
        delay: custom.delay,
      },
    }),
  };

  return (
    <section className={cn("relative w-full py-8 md:py-16 overflow-hidden select-none flex justify-center items-center", className)}>
      {/* 
        Responsive Stage:
        Uses relative container scaling so all cards and folder box are 100% visible on mobile, tablet, and desktop
      */}
      <div className="relative w-full max-w-[940px] h-[390px] sm:h-[480px] md:h-[580px] flex items-end justify-center">
        
        {/* ═══════════════════════════════════════════════
           CARDS FANNING OUT (RESPONSIVE CARDS)
           ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">

            {/* Card 1: Top Left Photo Card with Play Overlay */}
            <motion.div
              custom={{ initX: 140, initY: 260, rotate: -8, delay: 0.1, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: -3, y: -10, zIndex: 40 }}
              className="absolute top-[2%] left-[10%] sm:left-[14%] md:left-[19%] w-[130px] sm:w-[170px] md:w-[220px] h-[85px] sm:h-[110px] md:h-[140px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/25 cursor-pointer group bg-zinc-800"
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop"
                alt="Delivery Video Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="size-6 sm:size-8 md:size-9 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="size-3 sm:size-4 fill-white ml-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Top Center Neon Lime Yellow Exchange Card */}
            <motion.div
              custom={{ initX: 30, initY: 270, rotate: 2, delay: 0.22, zIndex: 14 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[0%] left-[34%] sm:left-[38%] md:left-[42%] w-[135px] sm:w-[175px] md:w-[225px] h-[90px] sm:h-[115px] md:h-[145px] rounded-xl sm:rounded-2xl bg-[#DFFF00] text-black p-2.5 sm:p-3.5 md:p-4 shadow-2xl border border-black/10 cursor-pointer font-sans flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[8px] sm:text-[10px] md:text-[11px] font-bold tracking-tight text-black/70">
                <span>Exchange</span>
                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold">USD ➔ EUR</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-black">
                $285.72
              </div>
              <div className="text-[7px] sm:text-[9px] md:text-[10px] font-semibold text-black/60">
                Available balance
              </div>
            </motion.div>

            {/* Card 3: Top Right Orange Calories Burned Card */}
            <motion.div
              custom={{ initX: -140, initY: 260, rotate: 12, delay: 0.34, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 4, y: -10, zIndex: 40 }}
              className="absolute top-[5%] right-[8%] sm:right-[11%] md:right-[14%] w-[120px] sm:w-[155px] md:w-[195px] h-[85px] sm:h-[110px] md:h-[140px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF5500] to-[#E04400] text-white p-2.5 sm:p-3.5 md:p-4 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] md:text-[11px] font-medium text-white/90">
                <Flame className="size-3 sm:size-4 fill-white text-white" />
                <div className="leading-none">
                  <div className="font-bold text-[8px] sm:text-[10px] md:text-xs">Calories</div>
                  <div className="text-[6px] sm:text-[8px] md:text-[9px] text-white/70">Age: 37</div>
                </div>
              </div>
              <div className="text-lg sm:text-2xl md:text-4xl font-extrabold tracking-tight">
                11,840
              </div>
            </motion.div>

            {/* Card 4: Mid Left Dark F1 Racing Card */}
            <motion.div
              custom={{ initX: 110, initY: 210, rotate: -4, delay: 0.46, zIndex: 16 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -1, y: -10, zIndex: 40 }}
              className="absolute top-[18%] left-[16%] sm:left-[21%] md:left-[26%] w-[145px] sm:w-[190px] md:w-[245px] h-[115px] sm:h-[150px] md:h-[190px] rounded-xl sm:rounded-2xl bg-[#1C1D1F]/95 backdrop-blur-md border border-white/10 p-2.5 sm:p-3.5 md:p-4 shadow-2xl text-white cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-1 sm:pb-1.5 md:pb-2 border-b border-white/10">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="size-3.5 sm:size-4 md:size-5 rounded-full bg-red-600 font-extrabold text-[6px] sm:text-[7px] md:text-[8px] flex items-center justify-center text-white">
                    F1
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs font-bold leading-none text-zinc-100">Saudi Arabian GP</div>
                    <div className="text-[6px] sm:text-[8px] md:text-[9px] text-zinc-400">Tomorrow</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[7px] sm:text-[9px] md:text-[10px] font-bold text-zinc-400 mb-1">
                  <span>🏁</span>
                  <span>Starting Grid</span>
                </div>
                <div className="space-y-0.5 sm:space-y-1 text-[8px] sm:text-[10px] md:text-[11px]">
                  <div className="flex items-center gap-1 sm:gap-2 text-zinc-200">
                    <span className="text-zinc-500 font-mono text-[7px]">1.</span>
                    <span className="font-semibold truncate">Max V.</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-zinc-400">
                    <span className="text-zinc-500 font-mono text-[7px]">2.</span>
                    <span className="truncate">Charles L.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Center Right Screen Time Green Card (#269159) */}
            <motion.div
              custom={{ initX: -110, initY: 190, rotate: 4, delay: 0.7, zIndex: 18 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1, y: -10, zIndex: 40 }}
              className="absolute top-[22%] right-[11%] sm:right-[15%] md:right-[20%] w-[145px] sm:w-[190px] md:w-[245px] h-[165px] sm:h-[220px] md:h-[280px] rounded-2xl sm:rounded-3xl bg-[#269159] text-white p-2.5 sm:p-4 md:p-5 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[8px] sm:text-[10px] md:text-xs font-bold text-white">
                    <ArrowLeft className="size-3 sm:size-3.5" />
                    <span>Screen Time</span>
                  </div>
                  <MoreHorizontal className="size-3 sm:size-3.5 text-white/70" />
                </div>

                <div className="mt-1.5 sm:mt-2.5 flex items-center bg-black/15 p-0.5 rounded-full text-[8px] sm:text-[10px] font-semibold text-center border border-white/10">
                  <div className="flex-1 py-0.5 sm:py-1 rounded-full bg-white text-[#269159] shadow-sm font-bold">
                    Daily
                  </div>
                  <div className="flex-1 py-0.5 sm:py-1 text-white/80">
                    Weekly
                  </div>
                </div>

                <div className="mt-1.5 sm:mt-2.5">
                  <div className="text-[7px] sm:text-[9px] md:text-[10px] text-white/80 font-medium">Daily Avg</div>
                  <div className="flex items-baseline gap-1 sm:gap-2 mt-0.5">
                    <span className="text-sm sm:text-xl md:text-3xl font-extrabold tracking-tight text-white">8h 28m</span>
                    <span className="text-[6px] sm:text-[8px] md:text-[9px] font-bold px-1 py-0.2 rounded-full bg-white/20 text-white">
                      -12%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-1 h-10 sm:h-12 md:h-16 pt-1">
                {[
                  { h: "50%", colors: ["bg-pink-400", "bg-cyan-300"] },
                  { h: "80%", colors: ["bg-cyan-300", "bg-purple-300", "bg-amber-300"] },
                  { h: "100%", colors: ["bg-purple-300", "bg-amber-300", "bg-cyan-300"] },
                  { h: "65%", colors: ["bg-amber-300", "bg-pink-400"] },
                  { h: "85%", colors: ["bg-white", "bg-purple-300", "bg-cyan-300"] },
                  { h: "40%", colors: ["bg-cyan-300"] },
                  { h: "70%", colors: ["bg-purple-300", "bg-pink-400"] },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 rounded-t overflow-hidden" style={{ height: bar.h }}>
                    {bar.colors.map((c, j) => (
                      <div key={j} className={cn("w-full flex-1 rounded-sm", c)} />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 6: Far Left Purple Monthly Revenue Card */}
            <motion.div
              custom={{ initX: 160, initY: 180, rotate: -12, delay: 0.82, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[5%] sm:left-[9%] md:left-[13%] w-[120px] sm:w-[155px] md:w-[190px] h-[145px] sm:h-[190px] md:h-[240px] rounded-xl sm:rounded-2xl bg-[#B485FF] text-white p-2.5 sm:p-3.5 md:p-4 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[8px] sm:text-[10px] md:text-[11px] font-medium text-white/90">Revenue</div>
                <div className="text-sm sm:text-xl md:text-3xl font-extrabold mt-0.5 sm:mt-1">$12,450</div>
                <div className="text-[6px] sm:text-[8px] md:text-[9px] text-white/70">14 Jan - 12 Feb</div>
              </div>
              <div className="h-8 sm:h-11 md:h-14 w-full relative overflow-hidden">
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

            {/* Card 7: Far Right Green Light Card */}
            <motion.div
              custom={{ initX: -160, initY: 180, rotate: 12, delay: 0.94, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] right-[2%] sm:right-[4%] md:right-[7%] w-[120px] sm:w-[155px] md:w-[190px] h-[145px] sm:h-[190px] md:h-[240px] rounded-xl sm:rounded-2xl bg-zinc-800/90 text-white p-2.5 sm:p-3.5 md:p-4 shadow-2xl border border-white/10 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[8px] sm:text-[10px] md:text-xs font-bold text-zinc-100">Green Light</div>
                <div className="text-[6px] sm:text-[8px] md:text-[9px] text-zinc-400">Lucide</div>
              </div>
              <div className="rounded-lg sm:rounded-xl overflow-hidden h-20 sm:h-28 md:h-36 relative bg-zinc-700">
                <img
                  src="https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=300&auto=format&fit=crop"
                  alt="Sprint Runner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-1.5 left-1.5 text-[7px] sm:text-[9px] md:text-[10px] font-bold text-white leading-tight drop-shadow">
                  Sprint Mode
                </div>
              </div>
            </motion.div>

            {/* Card 8: Center Video Stabilization Card */}
            <motion.div
              custom={{ initX: 40, initY: 180, rotate: 1, delay: 0.58, zIndex: 28 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[28%] sm:left-[33%] md:left-[39%] w-[135px] sm:w-[175px] md:w-[215px] h-[115px] sm:h-[150px] md:h-[185px] rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-2.5 sm:p-4 md:p-5 shadow-2xl border-none cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm sm:text-lg md:text-2xl font-extrabold leading-tight text-zinc-900 dark:text-white">
                  Video<br />Stabilization
                </h4>
                <p className="text-[7px] sm:text-[9px] md:text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 sm:mt-2 leading-relaxed">
                  Smooth out shaky footage.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           FOREGROUND SOLID THEME FOLDER BOX (ALWAYS VISIBLE)
           ═══════════════════════════════════════════════ */}
        <div className="absolute bottom-0 w-[92%] sm:w-[85%] md:w-[640px] h-[210px] sm:h-[260px] md:h-[310px] z-30 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Folder Box */}
            <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
              <svg
                className="w-full h-full"
                viewBox="0 0 640 310"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="folderSolidThemeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A75FF" stopOpacity="1" />
                    <stop offset="50%" stopColor="#355FE5" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1E40D6" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="folder2pxBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#99BCFF" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

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
                  fill="url(#folderSolidThemeGrad)"
                  stroke="url(#folder2pxBorderGrad)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Folder Text Content Overlay */}
            <div className="absolute inset-0 p-5 sm:p-8 md:p-10 flex flex-col justify-end pointer-events-auto">
              <div className="relative z-10 pb-0.5 sm:pb-1">
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
                  Design<br />Components
                </h3>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default DesignComponentsFolder;
