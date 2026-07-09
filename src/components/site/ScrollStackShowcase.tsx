"use client";

import {
  ScrollStack,
  StackItem,
} from "@/components/custom/blocks/ScrollStackBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { Blocks, Layers, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const STACK_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export interface StackItem { id: string; title: string; description: string; content?: React.ReactNode; color?: string; icon?: React.ElementType; }
export interface ScrollStackProps extends React.HTMLAttributes<HTMLDivElement> { items: StackItem[]; depthScale?: number; cardGap?: number; }

export const ScrollStack = ({ items, depthScale = 0.05, cardGap = 24, className, ...props }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} style={{ paddingBottom: "10vh" }} {...props}>
      {items.map((item, index) => {
        const targetScale = 1 - (items.length - index) * depthScale;
        return <ScrollStackCard key={item.id} item={item} index={index} totalItems={items.length} progress={scrollYProgress} targetScale={targetScale} cardGap={cardGap} />;
      })}
    </div>
  );
};

const ScrollStackCard = ({ item, index, totalItems, progress, targetScale, cardGap }: any) => {
  const startProgress = index * (1 / totalItems);
  const scale = useTransform(progress, [startProgress, 1], [1, targetScale]);
  const opacity = useTransform(progress, [startProgress, 1], [1, 0.6]);

  return (
    <div className="flex h-screen w-full items-center justify-center sticky top-0">
      <motion.div style={{ scale, opacity, top: \`calc(10vh + \${index * cardGap}px)\` }} className={cn("relative w-full max-w-4xl h-[65vh] rounded-[2rem] p-8 md:p-12 shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border border-white/10", item.color || "bg-zinc-900")}>
        <div className="absolute inset-0 bg-white/5 opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="flex-1 flex flex-col justify-center relative z-10">
          {item.icon && <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20"><item.icon className="w-7 h-7 text-white" /></div>}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{item.title}</h2>
          <p className="text-lg text-white/70 font-medium leading-relaxed">{item.description}</p>
        </div>
        {item.content && <div className="flex-1 relative z-10 rounded-xl bg-black/20 border border-white/10 hidden md:flex items-center justify-center">{item.content}</div>}
      </motion.div>
    </div>
  );
};`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const STACK_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const ScrollStack = ({ items, depthScale = 0.05, cardGap = 24, className, ...props }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} style={{ paddingBottom: "10vh" }} {...props}>
      {items.map((item, index) => {
        const targetScale = 1 - (items.length - index) * depthScale;
        return <ScrollStackCard key={item.id} item={item} index={index} totalItems={items.length} progress={scrollYProgress} targetScale={targetScale} cardGap={cardGap} />;
      })}
    </div>
  );
};

const ScrollStackCard = ({ item, index, totalItems, progress, targetScale, cardGap }) => {
  const startProgress = index * (1 / totalItems);
  const scale = useTransform(progress, [startProgress, 1], [1, targetScale]);
  const opacity = useTransform(progress, [startProgress, 1], [1, 0.6]);

  return (
    <div className="flex h-screen w-full items-center justify-center sticky top-0">
      <motion.div style={{ scale, opacity, top: \`calc(10vh + \${index * cardGap}px)\` }} className={cn("relative w-full max-w-4xl h-[65vh] rounded-[2rem] p-8 md:p-12 shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border border-white/10", item.color || "bg-zinc-900")}>
        <div className="absolute inset-0 bg-white/5 opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="flex-1 flex flex-col justify-center relative z-10">
          {item.icon && <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20"><item.icon className="w-7 h-7 text-white" /></div>}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{item.title}</h2>
          <p className="text-lg text-white/70 font-medium leading-relaxed">{item.description}</p>
        </div>
        {item.content && <div className="flex-1 relative z-10 rounded-xl bg-black/20 border border-white/10 hidden md:flex items-center justify-center">{item.content}</div>}
      </motion.div>
    </div>
  );
};`;

export function ScrollStackShowcase() {
  const [depthScale, setDepthScale] = useState(0.04);
  const [cardGap, setCardGap] = useState(24);

  const mockItems: StackItem[] = [
    {
      id: "1",
      title: "Real-time Synchronization",
      description:
        "Instantly sync state across clients without writing WebSocket logic. Our engine handles race conditions seamlessly.",
      icon: Zap,
      color: "bg-indigo-600",
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 shadow-inner flex items-center justify-center">
            <span className="text-white/40 font-mono text-sm">
              [Animation Interface]
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      title: "Layered Architecture",
      description:
        "Build robust systems with separated concerns. Easily swap out databases or auth providers without rewriting your core.",
      icon: Layers,
      color: "bg-blue-600",
      content: (
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center p-8">
          <div className="w-3/4 h-12 bg-white/10 rounded-lg border border-white/10" />
          <div className="w-full h-16 bg-white/20 rounded-lg border border-white/20 shadow-xl" />
          <div className="w-3/4 h-12 bg-white/10 rounded-lg border border-white/10" />
        </div>
      ),
    },
    {
      id: "3",
      title: "Composable Blocks",
      description:
        "Don't reinvent the wheel. Utilize our library of pre-built, accessible UI blocks designed to drop into any codebase.",
      icon: Blocks,
      color: "bg-emerald-600",
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="h-24 bg-white/10 rounded-xl border border-white/10" />
            <div className="h-24 bg-white/10 rounded-xl border border-white/10" />
            <div className="h-24 bg-white/10 rounded-xl border border-white/10 col-span-2" />
          </div>
        </div>
      ),
    },
    {
      id: "4",
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, automated compliance tracking, and granular role-based access control built in out of the box.",
      icon: ShieldCheck,
      color: "bg-rose-600",
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-32 h-32 rounded-full border-4 border-emerald-400 flex items-center justify-center bg-emerald-400/10">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
        </div>
      ),
    },
  ];

  const generateUsageCode = (isTs: boolean) => {
    return `import { ScrollStack } from "@/components/custom/blocks/ScrollStackBlock";
import { Zap, Layers, Blocks, ShieldCheck } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      id: "1",
      title: "Real-time Sync",
      description: "Instantly sync state across clients without writing WebSocket logic.",
      icon: Zap,
      color: "bg-indigo-600", // Tailwind colors work perfectly
    },
    // ... add more items here
  ];

  return (
    <div className="w-full bg-zinc-950">
      <ScrollStack 
        items={features} 
        depthScale={${depthScale}} 
        cardGap={${cardGap}} 
      />
    </div>
  );
}`;
  };

  // Cross-browser targeted structural selectors to keep track line locked visible permanently
  const sliderClasses = cn(
    "w-full appearance-none bg-transparent cursor-pointer outline-none",
    // ── Webkit Track Styles (Permanent Visibility) ──
    "[&::-webkit-slider-runnable-track]:h-1.5",
    "[&::-webkit-slider-runnable-track]:bg-zinc-200",
    "dark:[&::-webkit-slider-runnable-track]:bg-zinc-800",
    "[&::-webkit-slider-runnable-track]:rounded-full",
    // ── Webkit Thumb Styles ──
    "[&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:w-4",
    "[&::-webkit-slider-thumb]:h-4",
    "[&::-webkit-slider-thumb]:rounded-full",
    "[&::-webkit-slider-thumb]:bg-indigo-500",
    "[&::-webkit-slider-thumb]:mt-[-5px]", // Vertical adjustment offset positioning
    "[&::-webkit-slider-thumb]:shadow-sm",
    "[&::-webkit-slider-thumb]:transition-transform",
    "hover:[&::-webkit-slider-thumb]:scale-110",
    // ── Mozilla Track Styles ──
    "[&::-moz-range-track]:h-1.5",
    "[&::-moz-range-track]:bg-zinc-200",
    "dark:[&::-moz-range-track]:bg-zinc-800",
    "[&::-moz-range-track]:rounded-full",
    // ── Mozilla Thumb Styles ──
    "[&::-moz-range-thumb]:w-4",
    "[&::-moz-range-thumb]:h-4",
    "[&::-moz-range-thumb]:rounded-full",
    "[&::-moz-range-thumb]:bg-indigo-500",
    "[&::-moz-range-thumb]:border-none",
    "[&::-moz-range-thumb]:shadow-sm",
    "[&::-moz-range-thumb]:transition-transform",
    "hover:[&::-moz-range-thumb]:scale-110",
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Depth Scale (Shrink Rate)
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {(depthScale * 100).toFixed(0)}%
              </span>
            </label>
            <input
              type="range"
              min="0.01"
              max="0.10"
              step="0.01"
              value={depthScale}
              onChange={(e) => setDepthScale(parseFloat(e.target.value))}
              className={sliderClasses}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Top Card Gap
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {cardGap}px
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={cardGap}
              onChange={(e) => setCardGap(parseInt(e.target.value))}
              className={sliderClasses}
            />
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ScrollStackBlock"
        tsCode={STACK_ENGINE_CODE_TS}
        jsCode={STACK_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#050505] relative overflow-hidden">
          {/* CRITICAL: For the showcase we simulate a constrained viewport using h-[600px] and overflow-y-auto. 
            In your actual app, you will place the ScrollStack on your main page and let the window native scroll handle it.
          */}
          <div className="w-full h-[600px] overflow-y-auto overflow-x-hidden custom-scrollbar relative">
            <div className="h-[30vh] flex items-center justify-center flex-col gap-4">
              <span className="px-3 py-1 bg-white/10 text-white/70 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                Scroll Down
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
            </div>

            <ScrollStack
              items={mockItems}
              depthScale={depthScale}
              cardGap={cardGap}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
