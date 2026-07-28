"use client";

import {
  HorizontalScrollStack,
  ScrollStackItem,
} from "@/components/custom/blocks/HorizontalScrollStackBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Compass,
  Cpu,
  FileText,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// --- TYPESCRIPT ENGINE CODE ---
const _CODE_TS = `"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export type ScrollStackItem = {
  id: string | number;
  number?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export interface HorizontalScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollStackItem[];
  title?: string;
  subtitle?: string;
}

function StackCard({
  item, index, total, progress, cardWidth, gap, stackOffset, scrollEndThreshold, isMobile = false,
}: {
  item: ScrollStackItem; index: number; total: number; progress: MotionValue<number>; cardWidth: number; gap: number; stackOffset: number; scrollEndThreshold: number; isMobile?: boolean;
}) {
  const travelPerCard = cardWidth + gap - stackOffset;
  const lockDistance = index * travelPerCard;
  const lockProgress = total > 1 ? (index / (total - 1)) * scrollEndThreshold : 0;
  const safeLockProgress = Math.max(0.0001, lockProgress);
  const x = useTransform(progress, [0, safeLockProgress, 1], [0, -lockDistance, -lockDistance]);
  const displayNum = item.number || \`0\${index + 1}\`;

  return (
    <motion.div
      style={{ width: isMobile ? "100%" : \`\${cardWidth}px\`, x: isMobile || index === 0 ? 0 : x }}
      className={cn("shrink-0 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between group hover:border-indigo-500/50 dark:hover:border-zinc-700 transition-colors duration-300 relative", isMobile ? "w-full" : "")}
    >
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center text-slate-700 dark:text-zinc-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 dark:group-hover:bg-indigo-500 transition-all duration-300">
            {item.icon}
          </div>
          <span className="text-4xl sm:text-5xl font-black text-slate-200 dark:text-zinc-800/80 tracking-tighter select-none group-hover:text-indigo-100 dark:group-hover:text-zinc-700/50 transition-colors duration-300">{displayNum}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3">{item.title}</h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">{item.description}</p>
      </div>
      <div className="mt-8 w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 dark:bg-indigo-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
}

function ProgressBarItem({ index, total, progress, scrollEndThreshold }: { index: number; total: number; progress: MotionValue<number>; scrollEndThreshold: number }) {
  const start = (index / total) * scrollEndThreshold;
  const end = ((index + 1) / total) * scrollEndThreshold;
  const scaleX = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="h-1.5 flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <motion.div className="h-full bg-indigo-600 dark:bg-indigo-500" style={{ scaleX, transformOrigin: "left" }} />
    </div>
  );
}

export function HorizontalScrollStack({
  items,
  title = "We follow a streamlined design process",
  subtitle = "from understanding your goals to delivering polished assets.",
  className,
  style,
  ...props
}: HorizontalScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ cardWidth: 440, gap: 32, stackOffset: 60 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const modifiedAncestors: { element: HTMLElement; overflow: string; overflowX: string; overflowY: string; contain: string }[] = [];
    let parent = containerRef.current?.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const computed = window.getComputedStyle(parent);
      const { overflow, overflowX, overflowY, contain } = computed;
      const hasOverflowTrap = ["hidden", "auto", "scroll", "overlay"].some(val => val === overflow || val === overflowX || val === overflowY);
      const hasContainTrap = contain && contain !== "none" && contain !== "normal";

      if (hasOverflowTrap || hasContainTrap) {
        modifiedAncestors.push({
          element: parent,
          overflow: parent.style.overflow,
          overflowX: parent.style.overflowX,
          overflowY: parent.style.overflowY,
          contain: parent.style.contain,
        });
        if (["hidden", "auto", "scroll", "overlay"].includes(overflowX)) parent.style.overflowX = "clip";
        if (["hidden", "auto", "scroll", "overlay"].includes(overflowY)) parent.style.overflowY = "visible";
        if (["hidden", "auto", "scroll", "overlay"].includes(overflow)) parent.style.overflow = "visible";
        if (hasContainTrap) parent.style.contain = "none";
      }
      parent = parent.parentElement;
    }

    const updateLayout = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) {
        const offset = Math.min(24, Math.max(14, Math.floor((w - 120) / (items.length || 1))));
        const cardW = Math.min(300, w - (items.length - 1) * offset - 32);
        setLayout({ cardWidth: Math.max(240, cardW), gap: 16, stackOffset: offset });
      } else if (w < 1024) {
        setLayout({ cardWidth: 360, gap: 24, stackOffset: 44 });
      } else {
        setLayout({ cardWidth: 440, gap: 32, stackOffset: 60 });
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      modifiedAncestors.forEach(({ element, overflow, overflowX, overflowY, contain }) => {
        element.style.overflow = overflow;
        element.style.overflowX = overflowX;
        element.style.overflowY = overflowY;
        element.style.contain = contain;
      });
    };
  }, [items.length]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const SCROLL_END_THRESHOLD = 0.70;
  const dynamicHeight = Math.max(400, items.length * 70);

  return (
    <div ref={containerRef} style={{ height: isMobile ? "auto" : \`\${dynamicHeight}vh\`, ...style }} className={cn("relative w-full bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300", isMobile ? "py-12 px-4 sm:px-8" : "", className)} {...props}>
      {isMobile ? (
        <div className="w-full flex flex-col gap-6">
          <div className="max-w-3xl mb-4 shrink-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base mt-2 font-normal">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-6 w-full mt-2">
            {items.map((item, index) => (
              <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} cardWidth={0} gap={0} stackOffset={0} scrollEndThreshold={SCROLL_END_THRESHOLD} isMobile={true} />
            ))}
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20">
          <div className="max-w-3xl mb-8 sm:mb-12 shrink-0">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-lg mt-2 sm:mt-3 font-normal">{subtitle}</p>
          </div>
          <div className="w-full overflow-visible py-4">
            <div style={{ gap: \`\${layout.gap}px\` }} className="flex w-max items-stretch">
              {items.map((item, index) => (
                <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} cardWidth={layout.cardWidth} gap={layout.gap} stackOffset={layout.stackOffset} scrollEndThreshold={SCROLL_END_THRESHOLD} isMobile={false} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8 sm:mt-12 max-w-xs w-full shrink-0">
            {items.map((_, i) => (
              <ProgressBarItem key={i} index={i} total={items.length} progress={scrollYProgress} scrollEndThreshold={SCROLL_END_THRESHOLD} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const _CODE_JS = `"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

function StackCard({
  item, index, total, progress, cardWidth, gap, stackOffset, scrollEndThreshold, isMobile = false,
}) {
  const travelPerCard = cardWidth + gap - stackOffset;
  const lockDistance = index * travelPerCard;
  const lockProgress = total > 1 ? (index / (total - 1)) * scrollEndThreshold : 0;
  const safeLockProgress = Math.max(0.0001, lockProgress);
  const x = useTransform(progress, [0, safeLockProgress, 1], [0, -lockDistance, -lockDistance]);
  const displayNum = item.number || \`0\${index + 1}\`;

  return (
    <motion.div
      style={{ width: isMobile ? "100%" : \`\${cardWidth}px\`, x: isMobile || index === 0 ? 0 : x }}
      className={cn("shrink-0 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between group hover:border-indigo-500/50 dark:hover:border-zinc-700 transition-colors duration-300 relative", isMobile ? "w-full" : "")}
    >
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center text-slate-700 dark:text-zinc-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 dark:group-hover:bg-indigo-500 transition-all duration-300">
            {item.icon}
          </div>
          <span className="text-4xl sm:text-5xl font-black text-slate-200 dark:text-zinc-800/80 tracking-tighter select-none group-hover:text-indigo-100 dark:group-hover:text-zinc-700/50 transition-colors duration-300">{displayNum}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3">{item.title}</h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">{item.description}</p>
      </div>
      <div className="mt-8 w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 dark:bg-indigo-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
}

function ProgressBarItem({ index, total, progress, scrollEndThreshold }) {
  const start = (index / total) * scrollEndThreshold;
  const end = ((index + 1) / total) * scrollEndThreshold;
  const scaleX = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="h-1.5 flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <motion.div className="h-full bg-indigo-600 dark:bg-indigo-500" style={{ scaleX, transformOrigin: "left" }} />
    </div>
  );
}

export function HorizontalScrollStack({
  items,
  title = "We follow a streamlined design process",
  subtitle = "from understanding your goals to delivering polished assets.",
  className,
  style,
  ...props
}) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ cardWidth: 440, gap: 32, stackOffset: 60 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const modifiedAncestors: { element: HTMLElement; overflow: string; overflowX: string; overflowY: string; contain: string }[] = [];
    let parent = containerRef.current?.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const computed = window.getComputedStyle(parent);
      const { overflow, overflowX, overflowY, contain } = computed;
      const hasOverflowTrap = ["hidden", "auto", "scroll", "overlay"].some(val => val === overflow || val === overflowX || val === overflowY);
      const hasContainTrap = contain && contain !== "none" && contain !== "normal";

      if (hasOverflowTrap || hasContainTrap) {
        modifiedAncestors.push({
          element: parent,
          overflow: parent.style.overflow,
          overflowX: parent.style.overflowX,
          overflowY: parent.style.overflowY,
          contain: parent.style.contain,
        });
        if (["hidden", "auto", "scroll", "overlay"].includes(overflowX)) parent.style.overflowX = "clip";
        if (["hidden", "auto", "scroll", "overlay"].includes(overflowY)) parent.style.overflowY = "visible";
        if (["hidden", "auto", "scroll", "overlay"].includes(overflow)) parent.style.overflow = "visible";
        if (hasContainTrap) parent.style.contain = "none";
      }
      parent = parent.parentElement;
    }

    const updateLayout = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) {
        const offset = Math.min(24, Math.max(14, Math.floor((w - 120) / (items.length || 1))));
        const cardW = Math.min(300, w - (items.length - 1) * offset - 32);
        setLayout({ cardWidth: Math.max(240, cardW), gap: 16, stackOffset: offset });
      } else if (w < 1024) {
        setLayout({ cardWidth: 360, gap: 24, stackOffset: 44 });
      } else {
        setLayout({ cardWidth: 440, gap: 32, stackOffset: 60 });
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      modifiedAncestors.forEach(({ element, overflow, overflowX, overflowY, contain }) => {
        element.style.overflow = overflow;
        element.style.overflowX = overflowX;
        element.style.overflowY = overflowY;
        element.style.contain = contain;
      });
    };
  }, [items.length]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const SCROLL_END_THRESHOLD = 0.70;
  const dynamicHeight = Math.max(400, items.length * 70);

  return (
    <div ref={containerRef} style={{ height: isMobile ? "auto" : \`\${dynamicHeight}vh\`, ...style }} className={cn("relative w-full bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300", isMobile ? "py-12 px-4 sm:px-8" : "", className)} {...props}>
      {isMobile ? (
        <div className="w-full flex flex-col gap-6">
          <div className="max-w-3xl mb-4 shrink-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base mt-2 font-normal">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-6 w-full mt-2">
            {items.map((item, index) => (
              <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} cardWidth={0} gap={0} stackOffset={0} scrollEndThreshold={SCROLL_END_THRESHOLD} isMobile={true} />
            ))}
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20">
          <div className="max-w-3xl mb-8 sm:mb-12 shrink-0">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-lg mt-2 sm:mt-3 font-normal">{subtitle}</p>
          </div>
          <div className="w-full overflow-visible py-4">
            <div style={{ gap: \`\${layout.gap}px\` }} className="flex w-max items-stretch">
              {items.map((item, index) => (
                <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} cardWidth={layout.cardWidth} gap={layout.gap} stackOffset={layout.stackOffset} scrollEndThreshold={SCROLL_END_THRESHOLD} isMobile={false} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8 sm:mt-12 max-w-xs w-full shrink-0">
            {items.map((_, i) => (
              <ProgressBarItem key={i} index={i} total={items.length} progress={scrollYProgress} scrollEndThreshold={SCROLL_END_THRESHOLD} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`;

const demoProcessItems: ScrollStackItem[] = [
  {
    id: "1",
    title: "Understand",
    description:
      "Business goals and strategies, persona and painpoints, competitors.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Define",
    description:
      "Strategy, information architecture, user flows, moodboard, visual direction.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Ideate",
    description: "Brainstorming, solution propose, sketching, wireframing.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "4",
    title: "Design",
    description: "Style guide, design system, interface design",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "5",
    title: "Test",
    description: "User testing, feedback collection and implementation",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "6",
    title: "Approval",
    description: "Submission for client approval",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "7",
    title: "Delivery",
    description: "Asset preparation, assets exports.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

export function HorizontalScrollStackShowcase() {
  const generateUsageCode = () => {
    return `import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";
import { Compass, FileText, Sparkles, Layers } from "lucide-react";

const steps = [
  { id: "1", title: "Understand", description: "Business goals and strategies, persona and painpoints.", icon: <Compass /> },
  { id: "2", title: "Define", description: "Strategy, information architecture, user flows.", icon: <FileText /> },
  { id: "3", title: "Ideate", description: "Brainstorming, solution propose, sketching.", icon: <Sparkles /> },
  { id: "4", title: "Design", description: "Style guide, design system, interface design.", icon: <Layers /> },
];

export default function ProcessSection() {
  return (
    <HorizontalScrollStack 
      items={steps}
      title="We follow a streamlined design process"
      subtitle="from understanding your goals to delivering polished assets."
    />
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <ComponentPreview
        name="HorizontalScrollStackBlock"
        tsCode={_CODE_TS}
        jsCode={_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        disableFrame
      >
        <div className="w-full relative rounded-3xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950">
          <HorizontalScrollStack items={demoProcessItems} />
        </div>
      </ComponentPreview>
    </div>
  );
}
