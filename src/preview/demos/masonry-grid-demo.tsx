"use client";

import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Cpu, Layers, Sparkles, Wand2 } from "lucide-react";
import React from "react";

type GridItem = {
  id: string;
  type: "image" | "card" | "gradient";
  height: string;
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
  imageId?: string;
  theme?: "blue" | "purple" | "emerald" | "rose";
};

const naturePhotos = [
  "1448375240586-882707db888b", // Alpine lake
  "1464822759023-fed622ff2c3b", // Mountain peak
  "1506744038136-46273834b3fb", // Emerald stream
  "1470071459604-3b5ec3a7fe05", // Misty forest
  "1426604966848-d7adac402bff", // River valley
  "1441974231531-c6227db76b6e", // Autumn path
  "1469474968028-56623f02e42e", // Waterfall
  "1507525428034-b723cf961d3e", // Beach sunset
];

const variantItems: Record<string, GridItem[]> = {
  default: [
    { id: "1", type: "card", height: "h-56", title: "Alpine Forest Research", desc: "Exploring ancient pine ecosystems.", icon: <Layers className="w-5 h-5" />, theme: "blue" },
    { id: "2", type: "image", height: "h-[28rem]", imageId: naturePhotos[0] },
    { id: "3", type: "gradient", height: "h-48", title: "Mountain Ridge Wind", desc: "Atmospheric motion in high altitude.", icon: <Wand2 className="w-5 h-5" />, theme: "purple" },
    { id: "4", type: "card", height: "h-72", title: "Emerald Canopy", desc: "Dense rainforest vegetation metrics.", icon: <Cpu className="w-5 h-5" />, theme: "emerald" },
    { id: "5", type: "image", height: "h-52", imageId: naturePhotos[1] },
    { id: "6", type: "card", height: "h-60", title: "Wilderness Flora", desc: "Natural biological biodiversity.", icon: <Sparkles className="w-5 h-5" />, theme: "rose" },
    { id: "7", type: "image", height: "h-[22rem]", imageId: naturePhotos[2] },
    { id: "8", type: "gradient", height: "h-48", title: "Cascading Waters", desc: "Glacial river flow dynamics.", icon: <Layers className="w-5 h-5" />, theme: "blue" },
  ],
  columns: [
    { id: "c1", type: "image", height: "h-[22rem]", imageId: naturePhotos[3] },
    { id: "c2", type: "card", height: "h-64", title: "Glacial Expedition", desc: "Tracking ice melt patterns across polar terrain.", icon: <Sparkles className="w-5 h-5" />, theme: "emerald" },
    { id: "c3", type: "image", height: "h-[30rem]", imageId: naturePhotos[4] },
    { id: "c4", type: "gradient", height: "h-52", title: "Sunset Horizon", desc: "Coastal light refraction studies.", icon: <Layers className="w-5 h-5" />, theme: "purple" },
    { id: "c5", type: "image", height: "h-[24rem]", imageId: naturePhotos[5] },
    { id: "c6", type: "card", height: "h-56", title: "Pine Forest Canopy", desc: "High resolution aerial drone mapping.", icon: <Cpu className="w-5 h-5" />, theme: "blue" },
    { id: "c7", type: "image", height: "h-[28rem]", imageId: naturePhotos[6] },
    { id: "c8", type: "gradient", height: "h-48", title: "Lush River Flow", desc: "Freshwater aquatic ecosystem analytics.", icon: <Wand2 className="w-5 h-5" />, theme: "rose" },
  ],
  gap: [
    { id: "g1", type: "card", height: "h-60", title: "Highland Sanctuary", desc: "Protected mountain valley reserves.", icon: <Sparkles className="w-5 h-5" />, theme: "purple" },
    { id: "g2", type: "image", height: "h-[26rem]", imageId: naturePhotos[6] },
    { id: "g3", type: "gradient", height: "h-48", title: "Forest Mist Stream", desc: "Hydrological condensation research.", icon: <Layers className="w-5 h-5" />, theme: "emerald" },
    { id: "g4", type: "image", height: "h-[22rem]", imageId: naturePhotos[7] },
    { id: "g5", type: "card", height: "h-52", title: "Volcanic Ridge", desc: "Thermal geological formations.", icon: <Cpu className="w-5 h-5" />, theme: "rose" },
    { id: "g6", type: "image", height: "h-[28rem]", imageId: naturePhotos[1] },
  ],
  stagger: [
    { id: "s1", type: "image", height: "h-[28rem]", imageId: naturePhotos[2] },
    { id: "s2", type: "gradient", height: "h-52", title: "Aurora Skyward", desc: "Staggered particle illumination.", icon: <Wand2 className="w-5 h-5" />, theme: "blue" },
    { id: "s3", type: "card", height: "h-64", title: "Deep Woodland", desc: "Ancient oak and redwood groves.", icon: <Layers className="w-5 h-5" />, theme: "emerald" },
    { id: "s4", type: "image", height: "h-[24rem]", imageId: naturePhotos[5] },
    { id: "s5", type: "card", height: "h-56", title: "Coastal Breeze", desc: "Oceanic climate metrics.", icon: <Sparkles className="w-5 h-5" />, theme: "rose" },
    { id: "s6", type: "image", height: "h-[30rem]", imageId: naturePhotos[0] },
  ],
  static: [
    { id: "st1", type: "card", height: "h-52", title: "Static Meadow", desc: "Instant zero-motion render view.", icon: <Cpu className="w-5 h-5" />, theme: "emerald" },
    { id: "st2", type: "image", height: "h-[26rem]", imageId: naturePhotos[4] },
    { id: "st3", type: "gradient", height: "h-48", title: "Timberland Grove", desc: "Pure CSS column layout flow.", icon: <Layers className="w-5 h-5" />, theme: "purple" },
    { id: "st4", type: "image", height: "h-[24rem]", imageId: naturePhotos[3] },
    { id: "st5", type: "card", height: "h-60", title: "Glacial Basin", desc: "Sub-zero ice shelf monitoring.", icon: <Wand2 className="w-5 h-5" />, theme: "blue" },
    { id: "st6", type: "image", height: "h-[28rem]", imageId: naturePhotos[6] },
  ],
};

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#3f3f46",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#")) return color;
  return colorMap[color] || "var(--primary)";
};

export default function MasonryGridDemo({
  triggerKey = 0,
  columnsClassName = "columns-1 sm:columns-2 lg:columns-3",
  gapClassName = "gap-6",
  animateIn = true,
  staggerDelay,
  color = "primary",
}: {
  triggerKey?: number;
  columnsClassName?: string;
  gapClassName?: string;
  animateIn?: boolean;
  staggerDelay?: number;
  color?: string;
}) {
  const themeColor = getThemeColor(color);
  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({ "--primary": themeColor } as React.CSSProperties)
      : undefined;

  // Determine variant type based on props passed from Sandbox/page.mdx
  let items = variantItems.default;
  if (columnsClassName.includes("lg:columns-4")) {
    items = variantItems.columns;
  } else if (staggerDelay === 0.25) {
    items = variantItems.stagger;
  } else if (animateIn === false) {
    items = variantItems.static;
  } else if (triggerKey === 3) {
    items = variantItems.gap;
  }
  return (
    <div
      className="w-full relative overflow-hidden p-[10px]"
      style={containerStyle}
    >

      <MasonryGrid
        key={`${triggerKey}-${columnsClassName}-${gapClassName}-${animateIn}-${staggerDelay}`}
        items={items}
        columnsClassName={columnsClassName}
        gapClassName={gapClassName}
        animateIn={animateIn}
        staggerDelay={staggerDelay}
        className="relative z-10"
        renderItem={(item) => {
          if (item.type === "image") {
            return (
              <div
                className={cn(
                  "w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-black/[0.04] dark:border-white/[0.04] shadow-sm",
                  item.height,
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src={`https://images.unsplash.com/photo-${item.imageId}?q=80&w=800&auto=format&fit=crop`}
                  alt="Gallery masonry"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex justify-between items-center text-white">
                  <span className="font-medium text-sm tracking-wide">
                    View Project
                  </span>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            );
          }

          if (item.type === "gradient") {
            return (
              <div
                className={cn(
                  "w-full p-5 sm:p-6 md:p-8 rounded-2xl relative group cursor-pointer overflow-hidden border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm",
                  item.height,
                )}
              >
                <div className="relative z-10 flex flex-col items-start justify-between h-full w-full overflow-hidden">
                  <div
                    className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0"
                  >
                    {item.icon}
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              className={cn(
                "w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group relative overflow-hidden",
                item.height,
              )}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 bg-primary/10 text-primary border border-primary/20"
              >
                {item.icon}
              </div>
              <div className="w-full pr-6">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
