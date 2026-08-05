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
    <section className={cn("relative w-full py-12 md:py-16 overflow-hidden select-none flex justify-center items-center", className)}>
      {/* Perspective Stage */}
      <div className="relative w-full max-w-[940px] h-[520px] md:h-[580px] flex items-end justify-center">
        
        {/* ═══════════════════════════════════════════════
           CARDS 100% HIDDEN INSIDE BOTTOM-CENTER OF FOLDER BOX
           AND FANNING OUT ONE BY ONE
           ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">

            {/* Card 1: Top Left Photo Card with Play Overlay */}
            <motion.div
              custom={{ initX: 260, initY: 330, rotate: -8, delay: 0.1, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: -3, y: -10, zIndex: 40 }}
              className="absolute top-[2%] left-[16%] md:left-[19%] w-[190px] md:w-[220px] h-[120px] md:h-[140px] rounded-2xl overflow-hidden shadow-2xl border border-white/25 cursor-pointer group bg-zinc-800"
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop"
                alt="Delivery Video Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="size-9 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="size-4 fill-white ml-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Top Center Neon Lime Yellow Exchange Card */}
            <motion.div
              custom={{ initX: 60, initY: 340, rotate: 2, delay: 0.22, zIndex: 14 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[0%] left-[39%] md:left-[42%] w-[195px] md:w-[225px] h-[130px] md:h-[145px] rounded-2xl bg-[#DFFF00] text-black p-4 shadow-2xl border border-black/10 cursor-pointer font-sans flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] font-bold tracking-tight text-black/70">
                <span>Exchange</span>
                <span className="text-[10px] font-bold">USD ➔ EUR</span>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">
                $285.72
              </div>
              <div className="text-[10px] font-semibold text-black/60">
                Available balance
              </div>
            </motion.div>

            {/* Card 3: Top Right Orange Calories Burned Card */}
            <motion.div
              custom={{ initX: -260, initY: 330, rotate: 12, delay: 0.34, zIndex: 11 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 4, y: -10, zIndex: 40 }}
              className="absolute top-[5%] right-[10%] md:right-[14%] w-[170px] md:w-[195px] h-[125px] md:h-[140px] rounded-2xl bg-gradient-to-br from-[#FF5500] to-[#E04400] text-white p-4 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                <Flame className="size-4 fill-white text-white" />
                <div className="leading-none">
                  <div className="font-bold">Calories Burned</div>
                  <div className="text-[9px] text-white/70">Your Age: 37</div>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
                11,840
              </div>
            </motion.div>

            {/* Card 4: Mid Left Dark F1 Racing Card */}
            <motion.div
              custom={{ initX: 190, initY: 260, rotate: -4, delay: 0.46, zIndex: 16 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -1, y: -10, zIndex: 40 }}
              className="absolute top-[18%] left-[23%] md:left-[26%] w-[210px] md:w-[245px] h-[170px] md:h-[190px] rounded-2xl bg-[#1C1D1F]/95 backdrop-blur-md border border-white/10 p-4 shadow-2xl text-white cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-red-600 font-extrabold text-[8px] flex items-center justify-center text-white">
                    F1
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-none text-zinc-100">Saudi Arabian GP</div>
                    <div className="text-[9px] text-zinc-400">Tomorrow, 00:00</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 mb-1.5">
                  <span>🏁</span>
                  <span>Starting Grid</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-zinc-200">
                    <span className="text-zinc-500 font-mono">1.</span>
                    <span className="size-3.5 rounded-full bg-amber-400/20 text-amber-300 text-[8px] flex items-center justify-center">M</span>
                    <span className="font-semibold">Max V.</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-zinc-500 font-mono">2.</span>
                    <span className="size-3.5 rounded-full bg-red-400/20 text-red-300 text-[8px] flex items-center justify-center">C</span>
                    <span>Charles L.</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-zinc-500 font-mono">3.</span>
                    <span className="size-3.5 rounded-full bg-teal-400/20 text-teal-300 text-[8px] flex items-center justify-center">G</span>
                    <span>George R.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Center Right Screen Time White Card */}
            <motion.div
              custom={{ initX: -180, initY: 240, rotate: 4, delay: 0.7, zIndex: 18 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1, y: -10, zIndex: 40 }}
              className="absolute top-[22%] right-[17%] md:right-[20%] w-[215px] md:w-[245px] h-[250px] md:h-[280px] rounded-3xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-4 md:p-5 shadow-2xl border border-zinc-200 dark:border-zinc-800 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-100">
                    <ArrowLeft className="size-3.5" />
                    <span>Screen Time</span>
                  </div>
                  <MoreHorizontal className="size-3.5 text-zinc-400" />
                </div>

                <div className="mt-2.5 flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-full text-[10px] font-semibold text-center">
                  <div className="flex-1 py-1 rounded-full bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white">
                    Daily
                  </div>
                  <div className="flex-1 py-1 text-zinc-500">
                    Weekly
                  </div>
                </div>

                <div className="mt-2.5">
                  <div className="text-[10px] text-zinc-500 font-medium">Daily Average</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight">8h 28m</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      -12.54%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-1.5 h-16 pt-2">
                {[
                  { h: "50%", colors: ["bg-pink-500", "bg-cyan-400"] },
                  { h: "80%", colors: ["bg-cyan-400", "bg-purple-500", "bg-emerald-400"] },
                  { h: "100%", colors: ["bg-purple-500", "bg-amber-400", "bg-cyan-400"] },
                  { h: "65%", colors: ["bg-amber-400", "bg-pink-500"] },
                  { h: "85%", colors: ["bg-emerald-400", "bg-purple-500", "bg-cyan-400"] },
                  { h: "40%", colors: ["bg-cyan-400"] },
                  { h: "70%", colors: ["bg-purple-500", "bg-pink-500"] },
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
              custom={{ initX: 300, initY: 220, rotate: -12, delay: 0.82, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -6, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[10%] md:left-[13%] w-[160px] md:w-[190px] h-[210px] md:h-[240px] rounded-2xl bg-[#B485FF] text-white p-4 shadow-2xl border border-white/20 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-medium text-white/90">Monthly Revenue</div>
                <div className="text-2xl md:text-3xl font-extrabold mt-1">$12,450</div>
                <div className="text-[9px] text-white/70 mt-0.5">14 Jan - 12 Feb</div>
              </div>
              <div className="h-14 w-full relative overflow-hidden">
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

            {/* Card 7: Far Right Green Light & Sprint Mode Card */}
            <motion.div
              custom={{ initX: -300, initY: 210, rotate: 10, delay: 0.94, zIndex: 10 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 4, y: -10, zIndex: 40 }}
              className="absolute top-[30%] right-[4%] md:right-[7%] w-[160px] md:w-[190px] h-[190px] md:h-[210px] rounded-2xl bg-zinc-800/90 text-white p-3.5 shadow-2xl border border-white/10 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-zinc-100">Green Light</div>
                <div className="text-[9px] text-zinc-400">Lucide</div>
              </div>
              <div className="rounded-xl overflow-hidden h-24 relative bg-zinc-700">
                <img
                  src="https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=300&auto=format&fit=crop"
                  alt="Sprint Runner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-2 left-2 text-[10px] font-bold text-white leading-tight drop-shadow">
                  Sprint Mode<br /><span className="text-[8px] font-normal opacity-80">Settings</span>
                </div>
              </div>
            </motion.div>

            {/* Card 8: Center Video Stabilization Off-White Card (EXPLICIT INLINE Z-INDEX: 28 SO IT STAYS ON TOP CONSTANTLY WITHOUT HOVERING) */}
            <motion.div
              custom={{ initX: 80, initY: 220, rotate: 1, delay: 0.58, zIndex: 28 }}
              variants={fanOutVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 0, y: -10, zIndex: 40 }}
              className="absolute top-[28%] left-[36%] md:left-[39%] w-[190px] md:w-[215px] h-[160px] md:h-[185px] rounded-2xl bg-[#ECEFF2] dark:bg-zinc-800 text-zinc-900 dark:text-white p-4 md:p-5 shadow-2xl border border-white/50 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-extrabold leading-tight text-zinc-900 dark:text-white">
                  Video<br />Stabilization
                </h4>
                <p className="text-[10px] md:text-[11px] text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  Smooth out shaky footage for a professional look.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           FOREGROUND SOLID THEME FOLDER BOX (ALWAYS VISIBLE)
           ═══════════════════════════════════════════════ */}
        <div className="absolute bottom-0 w-[90%] max-w-[640px] h-[270px] md:h-[310px] z-30 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Folder Box */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
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
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-auto">
              <div className="relative z-10 pb-1">
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
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
