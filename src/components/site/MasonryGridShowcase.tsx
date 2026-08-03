"use client";

import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Cpu, Layers, Sparkles, Wand2 } from "lucide-react";
import React, { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const _CODE_TS = `"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MasonryGridProps<T> extends Omit<HTMLMotionProps<"div">, "children"> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnsClassName?: string;
  gapClassName?: string;
  animateIn?: boolean;
  staggerDelay?: number;
}

export function MasonryGrid<T extends { id: string | number }>({
  items,
  renderItem,
  columnsClassName = "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
  gapClassName = "gap-6",
  animateIn = true,
  staggerDelay = 0.08,
  className,
  ...props
}: MasonryGridProps<T>) {
  const itemSpacingClass = gapClassName.replace("gap-", "mb-");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.95 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { type: "spring", stiffness: 200, damping: 20, mass: 1 } },
  };

  return (
    <motion.div className={cn("w-full", columnsClassName, gapClassName, className)} variants={animateIn ? containerVariants : undefined} initial={animateIn ? "hidden" : "visible"} whileInView={animateIn ? "visible" : undefined} viewport={{ once: true, margin: "-50px" }} {...props}>
      {items.map((item, index) => (
        <motion.div key={item.id} layout variants={animateIn ? itemVariants : undefined} className={cn("break-inside-avoid inline-block w-full", itemSpacingClass)}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const _CODE_JS = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MasonryGrid({
  items,
  renderItem,
  columnsClassName = "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
  gapClassName = "gap-6",
  animateIn = true,
  staggerDelay = 0.08,
  className,
  ...props
}) {
  const itemSpacingClass = gapClassName.replace("gap-", "mb-");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.95 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { type: "spring", stiffness: 200, damping: 20, mass: 1 } },
  };

  return (
    <motion.div className={cn("w-full", columnsClassName, gapClassName, className)} variants={animateIn ? containerVariants : undefined} initial={animateIn ? "hidden" : "visible"} whileInView={animateIn ? "visible" : undefined} viewport={{ once: true, margin: "-50px" }} {...props}>
      {items.map((item, index) => (
        <motion.div key={item.id} layout variants={animateIn ? itemVariants : undefined} className={cn("break-inside-avoid inline-block w-full", itemSpacingClass)}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}`;

// [The rest of the showcase component remains exactly the same]

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

const demoItems: GridItem[] = [
  {
    id: "1",
    type: "card",
    height: "h-56",
    title: "Design Engineering",
    desc: "Bridging the gap between pixels and code.",
    icon: <Layers className="w-5 h-5" />,
    theme: "blue",
  },
  {
    id: "2",
    type: "image",
    height: "h-[28rem]",
    imageId: "1618005182384-a83a8bd57fbe",
  },
  {
    id: "3",
    type: "gradient",
    height: "h-40",
    title: "Fluid Animations",
    desc: "Orchestrated via Framer Motion.",
    icon: <Wand2 className="w-5 h-5" />,
    theme: "purple",
  },
  {
    id: "4",
    type: "card",
    height: "h-72",
    title: "Neural Processing",
    desc: "On-device AI integration for instant feedback.",
    icon: <Cpu className="w-5 h-5" />,
    theme: "emerald",
  },
  {
    id: "5",
    type: "image",
    height: "h-52",
    imageId: "1550684848-fac1c5b4e853",
  },
  {
    id: "6",
    type: "card",
    height: "h-60",
    title: "Generative UI",
    desc: "Interfaces that adapt to user intent.",
    icon: <Sparkles className="w-5 h-5" />,
    theme: "rose",
  },
  {
    id: "7",
    type: "image",
    height: "h-[22rem]",
    imageId: "1620121692029-d088224ddc74",
  },
  {
    id: "8",
    type: "gradient",
    height: "h-48",
    title: "Serverless Edge",
    desc: "Deployed globally in milliseconds.",
    icon: <Layers className="w-5 h-5" />,
    theme: "blue",
  },
];

export function MasonryGridShowcase() {
  const [triggerKey, setTriggerKey] = useState(0);

  const generateUsageCode = () => {
    return `import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";
import { ArrowUpRight } from "lucide-react";

const myItems = [
  { id: "1", title: "Component Architecture", content: "Building scalable UI." },
  { id: "2", title: "Fluid Layouts", content: "Adapting gracefully to any screen size with CSS columns and modern layout techniques." },
];

export default function PremiumGallery() {
  return (
    <div className="p-8 w-full max-w-6xl mx-auto">
      <MasonryGrid 
        items={myItems}
        columnsClassName="columns-1 sm:columns-2 md:columns-3"
        gapClassName="gap-6"
        renderItem={(item) => (
          <div className="group relative p-8 rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-zinc-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 overflow-hidden cursor-pointer">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="font-semibold tracking-tight text-lg mb-2 text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.content}</p>
              </div>
              <div className="mt-6 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}`;
  };

  const themeColors = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
    purple:
      "text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20",
    emerald:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
    rose: "text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* <div className="flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
        <button
          onClick={() => setTriggerKey((prev) => prev + 1)}
          className="w-max px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-xl shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Replay Stagger Sequence
        </button>
      </div> */}

      <ComponentPreview
        name="MasonryGridBlock"
        tsCode={_CODE_TS}
        jsCode={_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="masonry-grid"
        sandboxProps={{ triggerKey }}
      >
        <div className="w-full relative p-4 sm:p-8 md:p-12 bg-[#f8f9fa] dark:bg-[#0a0a0a] rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

          <MasonryGrid
            key={triggerKey}
            items={demoItems}
            columnsClassName="columns-1 sm:columns-2 lg:columns-3"
            gapClassName="gap-6"
            className="relative z-10"
            renderItem={(item) => {
              if (item.type === "image") {
                return (
                  <div
                    className={cn(
                      "w-full rounded-[2rem] overflow-hidden relative group cursor-pointer border border-black/[0.04] dark:border-white/[0.04] shadow-sm",
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
                      "w-full p-8 rounded-[2rem] relative group cursor-pointer overflow-hidden border border-black/5 dark:border-white/5",
                      item.height,
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 opacity-20 dark:opacity-40 transition-opacity duration-500 group-hover:opacity-30 dark:group-hover:opacity-60",
                        themeColors[item.theme || "blue"].split(" ")[2],
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 dark:from-zinc-900/60 dark:to-zinc-900/10 backdrop-blur-sm" />
                    <div className="relative z-10 flex flex-col items-start justify-between h-full">
                      <div
                        className={cn(
                          "p-3 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/5",
                          themeColors[item.theme || "blue"].split(" ")[0],
                          themeColors[item.theme || "blue"].split(" ")[1],
                        )}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
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
                    "w-full p-8 rounded-[2rem] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group",
                    item.height,
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300",
                      themeColors[item.theme || "blue"],
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="w-full">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[90%]">
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            }}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
