"use client";

import {
  ScrollStack,
  StackItem,
} from "@/components/custom/blocks/ScrollStackBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { Blocks, Layers, ShieldCheck, Zap } from "lucide-react";
import { useRef, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const STACK_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StackItem { id: string; title: string; description: string; content?: React.ReactNode; color?: string; icon?: React.ElementType; }
export interface ScrollStackProps extends React.HTMLAttributes<HTMLDivElement> { items: StackItem[]; depthScale?: number; cardGap?: number; scroller?: string | Element | null; }

export const ScrollStack = ({ items, depthScale = 0.05, cardGap = 24, scroller, className, ...props }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card || index === items.length - 1) return;
      const nextCard = cardRefs.current[index + 1];
      if (!nextCard) return;

      const targetScale = 1 - (items.length - 1 - index) * depthScale;
      const tween = gsap.to(card, {
        scale: targetScale,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          scroller: scroller || window,
          start: "top 85%",
          end: "top 20%",
          scrub: true,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [items.length, depthScale, scroller]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} style={{ paddingBottom: "15vh" }} {...props}>
      {items.map((item, index) => (
        <div key={item.id} className="flex min-h-screen w-full items-center justify-center sticky top-0" style={{ top: \`calc(5vh + \${index * cardGap}px)\`, zIndex: index + 1 }}>
          <div ref={(el) => { cardRefs.current[index] = el; }} className={cn("relative w-full max-w-4xl h-[60vh] sm:h-[65vh] rounded-[2.5rem] p-8 md:p-12 shadow-xl dark:shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border transition-colors duration-300", item.color || "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white")}>
            <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.03] pointer-events-none" />
            <div className="flex-1 flex flex-col justify-center relative z-10">
              {item.icon && <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-6 border border-zinc-200 dark:border-white/20"><item.icon className="w-7 h-7 text-zinc-800 dark:text-white" /></div>}
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{item.title}</h2>
              <p className={cn("text-base sm:text-lg font-medium leading-relaxed", item.color ? "text-white/80" : "text-zinc-600 dark:text-white/70")}>{item.description}</p>
            </div>
            {item.content && <div className="flex-1 relative z-10 rounded-2xl overflow-hidden bg-zinc-100/80 dark:bg-black/20 border border-zinc-200/80 dark:border-white/10 hidden md:flex items-center justify-center">{item.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const STACK_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollStack = ({ items, depthScale = 0.05, cardGap = 24, scroller, className, ...props }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const triggers = [];

    cardRefs.current.forEach((card, index) => {
      if (!card || index === items.length - 1) return;
      const nextCard = cardRefs.current[index + 1];
      if (!nextCard) return;

      const targetScale = 1 - (items.length - 1 - index) * depthScale;
      const tween = gsap.to(card, {
        scale: targetScale,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          scroller: scroller || window,
          start: "top 85%",
          end: "top 20%",
          scrub: true,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [items.length, depthScale, scroller]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} style={{ paddingBottom: "15vh" }} {...props}>
      {items.map((item, index) => (
        <div key={item.id} className="flex min-h-screen w-full items-center justify-center sticky top-0" style={{ top: \`calc(5vh + \${index * cardGap}px)\`, zIndex: index + 1 }}>
          <div ref={(el) => { cardRefs.current[index] = el; }} className={cn("relative w-full max-w-4xl h-[60vh] sm:h-[65vh] rounded-[2.5rem] p-8 md:p-12 shadow-xl dark:shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border transition-colors duration-300", item.color || "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white")}>
            <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.03] pointer-events-none" />
            <div className="flex-1 flex flex-col justify-center relative z-10">
              {item.icon && <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-6 border border-zinc-200 dark:border-white/20"><item.icon className="w-7 h-7 text-zinc-800 dark:text-white" /></div>}
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{item.title}</h2>
              <p className={cn("text-base sm:text-lg font-medium leading-relaxed", item.color ? "text-white/80" : "text-zinc-600 dark:text-white/70")}>{item.description}</p>
            </div>
            {item.content && <div className="flex-1 relative z-10 rounded-2xl overflow-hidden bg-zinc-100/80 dark:bg-black/20 border border-zinc-200/80 dark:border-white/10 hidden md:flex items-center justify-center">{item.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};`;

export function ScrollStackShowcase() {
  const [depthScale, setDepthScale] = useState(0.05);
  const [cardGap, setCardGap] = useState(24);
  const viewportRef = useRef<HTMLDivElement>(null);

  const mockItems: StackItem[] = [
    {
      id: "1",
      title: "Real-time Synchronization",
      description:
        "Instantly sync state across clients without writing WebSocket logic. Our engine handles race conditions seamlessly.",
      icon: Zap,
      // Uses default adaptive surface (bg-white in light mode, bg-zinc-900 in dark mode)
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-full h-full bg-zinc-200/50 dark:bg-white/5 rounded-xl border border-zinc-300/80 dark:border-white/10 shadow-inner flex items-center justify-center">
            <span className="text-zinc-500 dark:text-white/40 font-mono text-sm font-semibold">
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
      color: "bg-indigo-600 text-white border-indigo-500/30",
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
      // Default adaptive surface
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="h-24 bg-zinc-200/60 dark:bg-white/10 rounded-xl border border-zinc-300/80 dark:border-white/10" />
            <div className="h-24 bg-zinc-200/60 dark:bg-white/10 rounded-xl border border-zinc-300/80 dark:border-white/10" />
            <div className="h-24 bg-zinc-200/60 dark:bg-white/10 rounded-xl border border-zinc-300/80 dark:border-white/10 col-span-2" />
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
      color: "bg-emerald-600 text-white border-emerald-500/30",
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center bg-white/10 shadow-lg">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
        </div>
      ),
    },
  ];

  const generateUsageCode = () => {
    return `import { ScrollStack } from "@/components/custom/blocks/ScrollStackBlock";
import { Zap, Layers, Blocks, ShieldCheck } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      id: "1",
      title: "Real-time Sync",
      description: "Instantly sync state across clients seamlessly.",
      icon: Zap,
      // Omit color to use adaptive light/dark mode defaults automatically!
    },
    {
      id: "2",
      title: "Layered Architecture",
      description: "Build robust systems with separated concerns.",
      icon: Layers,
      color: "bg-indigo-600 text-white", // Or apply accent colors
    },
  ];

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950">
      <ScrollStack 
        items={features} 
        depthScale={${depthScale}} 
        cardGap={${cardGap}} 
      />
    </div>
  );
}`;
  };

  // Cross-browser targeted structural selectors for sliders
  const sliderClasses = cn(
    "w-full appearance-none bg-transparent cursor-pointer outline-none",
    "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-zinc-200 dark:[&::-webkit-slider-runnable-track]:bg-zinc-800 [&::-webkit-slider-runnable-track]:rounded-full",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110",
    "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:bg-zinc-200 dark:[&::-moz-range-track]:bg-zinc-800 [&::-moz-range-track]:rounded-full",
    "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform hover:[&::-moz-range-thumb]:scale-110"
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Depth Scale (Shrink Rate)
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
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
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
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
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-[#050505] relative overflow-hidden transition-colors">
          {/* Scroll Instruction Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/90 dark:bg-black/80 backdrop-blur-md text-zinc-800 dark:text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-zinc-300 dark:border-white/10 pointer-events-none shadow-lg">
            ↓ Scroll inside preview box to trigger stack ↓
          </div>

          {/* Viewport Scroller Ref passed to GSAP ScrollTrigger */}
          <div
            ref={viewportRef}
            className="w-full h-[750px] overflow-y-auto overflow-x-hidden custom-scrollbar relative px-4 sm:px-8"
          >
            <div className="h-[25vh] flex items-center justify-center flex-col gap-3">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-zinc-400 dark:via-white/30 to-transparent" />
            </div>

            <ScrollStack
              items={mockItems}
              depthScale={depthScale}
              cardGap={cardGap}
              scroller={viewportRef.current}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}