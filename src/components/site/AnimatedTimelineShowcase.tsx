"use client";

import {
  AnimatedTimelineBlock,
  TimelineAnimation,
  TimelineColor,
  TimelineLayout,
} from "@/components/custom/blocks/AnimatedTimelineBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Palette,
  Rocket,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const ANIMATED_TIMELINE_CODE_TS = `"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TimelineLayout = "left" | "right" | "center";
export type TimelineAnimation = "fade-up" | "slide-in" | "zoom-in" | "flip-up" | "blur-in";
export type TimelineColor = "indigo" | "rose" | "emerald" | "blue" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500", glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]" },
  rose: { bg: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500", glow: "shadow-[0_0_15px_rgba(225,29,72,0.5)]" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
  blue: { bg: "bg-blue-600", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500", glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
};

const hexToRgb = (hex: string) => { let cleanHex = hex.replace(/^#/, ""); if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join(""); const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex); return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241"; };
export const getThemeStyles = (color: string) => { if (color && color.startsWith("#")) { const rgb = hexToRgb(color); return { theme: { bg: "bg-[var(--atl-color)]", text: "text-[var(--atl-color)]", border: "border-[var(--atl-color)]", glow: "shadow-[0_0_15px_var(--atl-glow)]" }, style: { "--atl-color": color, "--atl-glow": \`rgba(\${rgb}, 0.5)\` } as React.CSSProperties, }; } return { theme: colorThemes[color] || colorThemes.indigo, style: {} }; };

export interface AnimatedTimelineItem { id: string | number; title: string; date: string; description?: string; icon?: React.ElementType; }
export interface AnimatedTimelineProps extends React.HTMLAttributes<HTMLDivElement> { items: AnimatedTimelineItem[]; layout?: TimelineLayout; animation?: TimelineAnimation; color?: TimelineColor; }

function AnimatedTimelineNode({ item, index, isLast, theme, layout, animation }: { item: AnimatedTimelineItem; index: number; isLast: boolean; theme: Record<string, string>; layout: TimelineLayout; animation: TimelineAnimation; }) {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;
  const isEven = index % 2 === 0; const isCenter = layout === "center";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); else setIsVisible(false); }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  let slideDir = "translate-y-8";
  if (animation === "slide-in") { if (layout === "left") slideDir = "-translate-x-12"; else if (layout === "right") slideDir = "translate-x-12"; else if (layout === "center") slideDir = isEven ? "-translate-x-12" : "translate-x-12"; }

  const getAnimationClasses = () => {
    if (!isVisible) return cn("opacity-0", animation === "fade-up" && "translate-y-8", animation === "slide-in" && slideDir, animation === "zoom-in" && "scale-90", animation === "flip-up" && "rotate-x-90", animation === "blur-in" && "blur-xl scale-95");
    return cn("opacity-100 translate-y-0 translate-x-0 scale-100 rotate-x-0 blur-0", "transition-all duration-700 ease-out");
  };

  return (
    <div ref={nodeRef} className="relative flex flex-col sm:flex-row w-full group perspective-[1000px]">
      {!isLast && (<div className={cn("absolute w-[2px] bg-zinc-200 dark:bg-zinc-800 transition-all duration-1000 origin-top", "left-[19px] sm:left-auto top-10 bottom-[-32px] sm:bottom-[-48px]", layout === "left" && "sm:left-[19px]", layout === "right" && "sm:right-[19px]", layout === "center" && "sm:left-1/2 sm:-translate-x-1/2", isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0")} />)}
      <div className={cn("absolute z-10 flex items-center justify-center rounded-full border-2 bg-white dark:bg-[#09090b] transition-all duration-500 delay-300", "w-10 h-10 left-0 sm:left-auto", layout === "left" && "sm:left-0", layout === "right" && "sm:right-0", layout === "center" && "sm:left-1/2 sm:-translate-x-1/2", isVisible ? cn(theme.border, theme.glow, "scale-100 opacity-100") : "border-zinc-200 dark:border-zinc-800 scale-50 opacity-0")}>
        {Icon ? (<Icon className={cn("w-4 h-4 transition-colors duration-500 delay-500", isVisible ? theme.text : "text-transparent")} />) : (<div className={cn("w-3 h-3 rounded-full transition-colors duration-500 delay-500", isVisible ? theme.bg : "bg-transparent")} />)}
      </div>
      <div className={cn("flex flex-col w-full pl-16 sm:pl-0", layout === "center" ? "sm:w-[calc(50%-3rem)]" : "sm:w-[calc(100%-4rem)]", layout === "left" && "sm:ml-16", layout === "right" && "sm:mr-16 sm:text-right", isCenter && isEven && "sm:mr-auto sm:pr-0 sm:text-right", isCenter && !isEven && "sm:ml-auto sm:pl-0 sm:text-left")}>
        <div className={cn("flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700", getAnimationClasses())} style={{ transitionDelay: "100ms" }}>
          <div className={cn("flex flex-col sm:flex-row justify-between gap-2 sm:gap-4", (layout === "right" || (isCenter && isEven)) && "sm:flex-row-reverse")}>
            <h3 className={cn("text-base font-bold text-zinc-900 dark:text-zinc-100 transition-colors", \`group-hover:\${theme.text}\`)}>{item.title}</h3>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 w-max bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors duration-500", isVisible && theme.text)}>{item.date}</span>
          </div>
          {item.description && (<p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>)}
        </div>
      </div>
    </div>
  );
}

export const AnimatedTimelineBlock = forwardRef<HTMLDivElement, AnimatedTimelineProps>(({ items, layout = "left", animation = "fade-up", color = "indigo", className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  return (
    <div ref={ref} className={cn("w-full py-4", className)} style={style} {...props}>
      <div className="relative flex flex-col gap-8 sm:gap-12">
        {items.map((item, index) => (<AnimatedTimelineNode key={item.id} item={item} index={index} isLast={index === items.length - 1} theme={theme} layout={layout} animation={animation} />))}
      </div>
    </div>
  );
});
AnimatedTimelineBlock.displayName = "AnimatedTimelineBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const ANIMATED_TIMELINE_CODE_JS = `"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500", glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]" },
  rose: { bg: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500", glow: "shadow-[0_0_15px_rgba(225,29,72,0.5)]" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
  blue: { bg: "bg-blue-600", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500", glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
};

const hexToRgb = (hex) => { let cleanHex = hex.replace(/^#/, ""); if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join(""); const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex); return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241"; };
export const getThemeStyles = (color) => { if (color && color.startsWith("#")) { const rgb = hexToRgb(color); return { theme: { bg: "bg-[var(--atl-color)]", text: "text-[var(--atl-color)]", border: "border-[var(--atl-color)]", glow: "shadow-[0_0_15px_var(--atl-glow)]" }, style: { "--atl-color": color, "--atl-glow": \`rgba(\${rgb}, 0.5)\` }, }; } return { theme: colorThemes[color] || colorThemes.indigo, style: {} }; };

function AnimatedTimelineNode({ item, index, isLast, theme, layout, animation }) {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);
  const Icon = item.icon;
  const isEven = index % 2 === 0; const isCenter = layout === "center";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); else setIsVisible(false); }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  let slideDir = "translate-y-8";
  if (animation === "slide-in") { if (layout === "left") slideDir = "-translate-x-12"; else if (layout === "right") slideDir = "translate-x-12"; else if (layout === "center") slideDir = isEven ? "-translate-x-12" : "translate-x-12"; }

  const getAnimationClasses = () => {
    if (!isVisible) return cn("opacity-0", animation === "fade-up" && "translate-y-8", animation === "slide-in" && slideDir, animation === "zoom-in" && "scale-90", animation === "flip-up" && "rotate-x-90", animation === "blur-in" && "blur-xl scale-95");
    return cn("opacity-100 translate-y-0 translate-x-0 scale-100 rotate-x-0 blur-0", "transition-all duration-700 ease-out");
  };

  return (
    <div ref={nodeRef} className="relative flex flex-col sm:flex-row w-full group perspective-[1000px]">
      {!isLast && (<div className={cn("absolute w-[2px] bg-zinc-200 dark:bg-zinc-800 transition-all duration-1000 origin-top", "left-[19px] sm:left-auto top-10 bottom-[-32px] sm:bottom-[-48px]", layout === "left" && "sm:left-[19px]", layout === "right" && "sm:right-[19px]", layout === "center" && "sm:left-1/2 sm:-translate-x-1/2", isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0")} />)}
      <div className={cn("absolute z-10 flex items-center justify-center rounded-full border-2 bg-white dark:bg-[#09090b] transition-all duration-500 delay-300", "w-10 h-10 left-0 sm:left-auto", layout === "left" && "sm:left-0", layout === "right" && "sm:right-0", layout === "center" && "sm:left-1/2 sm:-translate-x-1/2", isVisible ? cn(theme.border, theme.glow, "scale-100 opacity-100") : "border-zinc-200 dark:border-zinc-800 scale-50 opacity-0")}>
        {Icon ? (<Icon className={cn("w-4 h-4 transition-colors duration-500 delay-500", isVisible ? theme.text : "text-transparent")} />) : (<div className={cn("w-3 h-3 rounded-full transition-colors duration-500 delay-500", isVisible ? theme.bg : "bg-transparent")} />)}
      </div>
      <div className={cn("flex flex-col w-full pl-16 sm:pl-0", layout === "center" ? "sm:w-[calc(50%-3rem)]" : "sm:w-[calc(100%-4rem)]", layout === "left" && "sm:ml-16", layout === "right" && "sm:mr-16 sm:text-right", isCenter && isEven && "sm:mr-auto sm:pr-0 sm:text-right", isCenter && !isEven && "sm:ml-auto sm:pl-0 sm:text-left")}>
        <div className={cn("flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700", getAnimationClasses())} style={{ transitionDelay: "100ms" }}>
          <div className={cn("flex flex-col sm:flex-row justify-between gap-2 sm:gap-4", (layout === "right" || (isCenter && isEven)) && "sm:flex-row-reverse")}>
            <h3 className={cn("text-base font-bold text-zinc-900 dark:text-zinc-100 transition-colors", \`group-hover:\${theme.text}\`)}>{item.title}</h3>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 w-max bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors duration-500", isVisible && theme.text)}>{item.date}</span>
          </div>
          {item.description && (<p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>)}
        </div>
      </div>
    </div>
  );
}

export const AnimatedTimelineBlock = forwardRef(({ items, layout = "left", animation = "fade-up", color = "indigo", className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  return (
    <div ref={ref} className={cn("w-full py-4", className)} style={style} {...props}>
      <div className="relative flex flex-col gap-8 sm:gap-12">
        {items.map((item, index) => (<AnimatedTimelineNode key={item.id} item={item} index={index} isLast={index === items.length - 1} theme={theme} layout={layout} animation={animation} />))}
      </div>
    </div>
  );
});
AnimatedTimelineBlock.displayName = "AnimatedTimelineBlock";`;

const SAMPLE_DATA = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description:
      "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description:
      "Wireframing, prototyping, and finalizing the UI kit components.",
    icon: Palette,
  },
  {
    id: "3",
    title: "Development",
    date: "Mar 2024",
    description: "Writing the core logic and React components from scratch.",
    icon: Zap,
  },
  {
    id: "4",
    title: "Testing & QA",
    date: "Apr 2024",
    description:
      "Running automated tests and squashing complex accessibility bugs.",
    icon: Loader2,
  },
  {
    id: "5",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
  {
    id: "6",
    title: "Global Expansion",
    date: "Jun 2024",
    description: "Reaching 100k active users globally.",
    icon: MapPin,
  },
  {
    id: "7",
    title: "Milestone Achieved",
    date: "Present",
    description: "We did it.",
    icon: CheckCircle2,
  },
];

export function AnimatedTimelineShowcase() {
  const [layout, setLayout] = useState<TimelineLayout>("center");
  const [animation, setAnimation] = useState<TimelineAnimation>("flip-up");
  const [resetKey, setResetKey] = useState(0); // Force re-render to replay animations

  const [color, setColor] = useState<TimelineColor | string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("primaryColor") || "indigo";
    return "indigo";
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    }, 1000);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) setColor(e.newValue);
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const triggerReplay = () => setResetKey((prev) => prev + 1);

  const generateUsageCode = (isTs: boolean) => {
    const propsStr = `\n        items={events}\n        layout="${layout}"\n        animation="${animation}"\n        color="${color}"`;

    return `import { AnimatedTimelineBlock } from "@/components/custom/blocks/AnimatedTimelineBlock";
import { Rocket, Target, Zap } from "lucide-react";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

const events = [
  { id: "1", title: "Project Start", date: "Jan 2024", icon: Target },
  { id: "2", title: "Development", date: "Mar 2024", icon: Zap },
  { id: "3", title: "Launch", date: "May 2024", icon: Rocket },
];

export default function HistoryPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-24">
      <AnimatedTimelineBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col lg:flex-row gap-6">
          <VariantTabs
            label="Timeline Layout"
            variants={["left", "center", "right"]}
            defaultValue="left"
            onValueChange={(v) => { setLayout(v as TimelineLayout); triggerReplay(); }}
          />
          <VariantTabs
            label="Entry Animation"
            variants={["fade-up", "slide-in", "zoom-in", "flip-up", "blur-in"]}
            defaultValue="fade-up"
            onValueChange={(v) => { setAnimation(v as TimelineAnimation); triggerReplay(); }}
          />
        </div>
        <ThemeColorPicker color={color} onChange={handleColorChange} label="Active Focus Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AnimatedTimelineBlock"
        tsCode={ANIMATED_TIMELINE_CODE_TS}
        jsCode={ANIMATED_TIMELINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] overflow-hidden">
          {/* Scrollable container to demonstrate the intersection observer */}
          <div className="w-full h-[600px] overflow-y-auto overflow-x-hidden p-6 sm:p-12 relative custom-scrollbar">
            <div className="w-full max-w-3xl mx-auto pt-32 pb-48">
              <div className="text-center mb-16 opacity-50 select-none">
                <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                  Scroll Down
                </p>
                <div className="w-px h-12 bg-zinc-300 dark:bg-zinc-700 mx-auto mt-4 animate-bounce" />
              </div>

              {/* The key prop forces React to remount, resetting the observers if you change layout */}
              <AnimatedTimelineBlock
                key={`${resetKey}-${layout}-${animation}`}
                items={SAMPLE_DATA}
                layout={layout}
                animation={animation}
                color={color}
              />
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
