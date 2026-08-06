"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Box,
  Code2,
  Command,
  Figma,
  Framer,
  Github,
  Gitlab,
  Hexagon,
  Layers,
  Triangle,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const MARQUEE_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right" | "up" | "down";
  speed?: "slow" | "normal" | "fast" | number;
  pauseOnHover?: boolean;
  fade?: boolean;
  gap?: string;
  children: React.ReactNode;
}

export const MarqueeBlock = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ direction = "left", speed = "normal", pauseOnHover = false, fade = false, gap = "1rem", className, children, ...props }, ref) => {
    const isVertical = direction === "up" || direction === "down";
    const isReverse = direction === "right" || direction === "down";

    let duration = "20s";
    if (typeof speed === "number") duration = \`\${speed}s\`;
    else if (speed === "slow") duration = "40s";
    else if (speed === "fast") duration = "10s";

    const uniqueId = React.useId().replace(/:/g, "");

    return (
      <div ref={ref} className={cn("group relative flex overflow-hidden", isVertical ? "flex-col" : "flex-row", fade && isVertical && "mask-vertical", fade && !isVertical && "mask-horizontal", className)} style={{ "--marquee-gap": gap, "--marquee-duration": duration, gap: gap } as React.CSSProperties} {...props}>
        <style>{\`
          .marquee-inner-\${uniqueId} { display: flex; flex-shrink: 0; justify-content: space-around; gap: var(--marquee-gap); animation: \${isVertical ? "marquee-vertical" : "marquee-horizontal"} var(--marquee-duration) linear infinite; animation-direction: \${isReverse ? "reverse" : "normal"}; }
          \${pauseOnHover ? \`.group:hover .marquee-inner-\${uniqueId} { animation-play-state: paused; }\` : ""}
          @keyframes marquee-horizontal { from { transform: translateX(0); } to { transform: translateX(calc(-100% - var(--marquee-gap))); } }
          @keyframes marquee-vertical { from { transform: translateY(0); } to { transform: translateY(calc(-100% - var(--marquee-gap))); } }
          .mask-horizontal { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
          .mask-vertical { mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); }
        \`}</style>
        <div className={cn(\`marquee-inner-\${uniqueId}\`, isVertical ? "flex-col" : "flex-row")} aria-hidden="false">{children}</div>
        <div className={cn(\`marquee-inner-\${uniqueId}\`, isVertical ? "flex-col" : "flex-row")} aria-hidden="true">{children}</div>
      </div>
    );
  }
);
MarqueeBlock.displayName = "MarqueeBlock";`;

// --- JAVASCRIPT ENGINE CODE ---
const MARQUEE_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const MarqueeBlock = forwardRef(
  ({ direction = "left", speed = "normal", pauseOnHover = false, fade = false, gap = "1rem", className, children, ...props }, ref) => {
    const isVertical = direction === "up" || direction === "down";
    const isReverse = direction === "right" || direction === "down";

    let duration = "20s";
    if (typeof speed === "number") duration = \`\${speed}s\`;
    else if (speed === "slow") duration = "40s";
    else if (speed === "fast") duration = "10s";

    const uniqueId = React.useId().replace(/:/g, "");

    return (
      <div ref={ref} className={cn("group relative flex overflow-hidden", isVertical ? "flex-col" : "flex-row", fade && isVertical && "mask-vertical", fade && !isVertical && "mask-horizontal", className)} style={{ "--marquee-gap": gap, "--marquee-duration": duration, gap: gap }} {...props}>
        <style>{\`
          .marquee-inner-\${uniqueId} { display: flex; flex-shrink: 0; justify-content: space-around; gap: var(--marquee-gap); animation: \${isVertical ? "marquee-vertical" : "marquee-horizontal"} var(--marquee-duration) linear infinite; animation-direction: \${isReverse ? "reverse" : "normal"}; }
          \${pauseOnHover ? \`.group:hover .marquee-inner-\${uniqueId} { animation-play-state: paused; }\` : ""}
          @keyframes marquee-horizontal { from { transform: translateX(0); } to { transform: translateX(calc(-100% - var(--marquee-gap))); } }
          @keyframes marquee-vertical { from { transform: translateY(0); } to { transform: translateY(calc(-100% - var(--marquee-gap))); } }
          .mask-horizontal { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
          .mask-vertical { mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); }
        \`}</style>
        <div className={cn(\`marquee-inner-\${uniqueId}\`, isVertical ? "flex-col" : "flex-row")} aria-hidden="false">{children}</div>
        <div className={cn(\`marquee-inner-\${uniqueId}\`, isVertical ? "flex-col" : "flex-row")} aria-hidden="true">{children}</div>
      </div>
    );
  }
);
MarqueeBlock.displayName = "MarqueeBlock";`;

const logos = [
  { icon: Command, name: "Command" },
  { icon: Figma, name: "Figma" },
  { icon: Framer, name: "Framer" },
  { icon: Github, name: "Github" },
  { icon: Gitlab, name: "Gitlab" },
  { icon: Hexagon, name: "Hexagon" },
  { icon: Layers, name: "Layers" },
  { icon: Triangle, name: "Triangle" },
  { icon: Code2, name: "Code" },
  { icon: Box, name: "Blocks" },
];

const testimonials = [
  {
    name: "Sarah Connor",
    role: "Product Manager",
    text: "This component library has completely transformed our workflow. Everything just works perfectly out of the box.",
  },
  {
    name: "John Wick",
    role: "Lead Developer",
    text: "The cleanest, most well-documented React code I have ever seen. Absolutely essential for modern web dev.",
  },
  {
    name: "Ellen Ripley",
    role: "UX Designer",
    text: "Beautiful default styles and incredibly smooth animations. It makes prototyping high-fidelity interfaces a breeze.",
  },
  {
    name: "Neo",
    role: "Software Engineer",
    text: "Finally, a library that gives me full control over the code without abstracting away all the important details.",
  },
];

const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
];

export function MarqueeShowcase() {
  const [contentType, setContentType] = useState<
    "logos" | "testimonials" | "images"
  >("logos");
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down">(
    "left",
  );
  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal");
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [fade, setFade] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("indigo");

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== primaryColor) setPrimaryColor(stored);
    };
    handleStorage(); // initial grab
    window.addEventListener("storage", handleStorage);
    // Add a simple interval to catch local changes seamlessly
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [primaryColor]);

  // Determine gap based on content type
  const gap = contentType === "logos" ? "4rem" : "1.5rem";
  const isVertical = direction === "up" || direction === "down";

  const renderContent = () => {
    if (contentType === "logos") {
      return logos.map((logo, i) => (
        <div
          key={i}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-bold text-xl"
        >
          <logo.icon className="w-8 h-8" />
          {logo.name}
        </div>
      ));
    }
    if (contentType === "testimonials") {
      return testimonials.map((t, i) => (
        <div
          key={i}
          className="w-[300px] shrink-0 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            "{t.text}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {t.name}
              </p>
              <p className="text-xs text-zinc-500">{t.role}</p>
            </div>
          </div>
        </div>
      ));
    }
    if (contentType === "images") {
      return images.map((src, i) => (
        <div
          key={i}
          className="w-[200px] h-[200px] shrink-0 rounded-2xl overflow-hidden shadow-sm"
        >
          <img src={src} alt="Gallery" className="w-full h-full object-cover" />
        </div>
      ));
    }
  };

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        direction="${direction}"\n        speed="${speed}"`;
    if (pauseOnHover) propsStr += `\n        pauseOnHover`;
    if (fade) propsStr += `\n        fade`;
    if (gap !== "1.5rem") propsStr += `\n        gap="${gap}"`;

    return `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

export default function Demo() {
  return (
    <div className="w-full h-[300px]">
      <MarqueeBlock ${propsStr}
      >
        {/* Place your map function or static items here */}
        <div className="w-64 h-32 bg-zinc-100 rounded-xl" />
        <div className="w-64 h-32 bg-zinc-100 rounded-xl" />
        <div className="w-64 h-32 bg-zinc-100 rounded-xl" />
        <div className="w-64 h-32 bg-zinc-100 rounded-xl" />
      </MarqueeBlock>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Content Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Content Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["logos", "testimonials", "images"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setContentType(v)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    contentType === v
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Direction Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Direction
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["left", "right", "up", "down"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setDirection(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    direction === s
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Speed Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Speed Profile
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["slow", "normal", "fast"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    speed === s
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Features Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setPauseOnHover(!pauseOnHover)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  pauseOnHover
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                style={
                  pauseOnHover
                    ? {
                        backgroundColor: `rgba(var(--${primaryColor}-500), 0.1)`,
                        borderColor: `rgba(var(--${primaryColor}-500), 0.3)`,
                        color: primaryColor.startsWith("#")
                          ? primaryColor
                          : `var(--${primaryColor}-500)`,
                      }
                    : {}
                }
              >
                Pause on Hover
              </button>
              <button
                onClick={() => setFade(!fade)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  fade
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                style={
                  fade
                    ? {
                        backgroundColor: `rgba(var(--${primaryColor}-500), 0.1)`,
                        borderColor: `rgba(var(--${primaryColor}-500), 0.3)`,
                        color: primaryColor.startsWith("#")
                          ? primaryColor
                          : `var(--${primaryColor}-500)`,
                      }
                    : {}
                }
              >
                Fade Edges
              </button>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="MarqueeBlock"
        tsCode={MARQUEE_ENGINE_CODE_TS}
        jsCode={MARQUEE_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="marquee"
        sandboxProps={{ contentType, direction, speed, pauseOnHover, fade }}
      >
        <div className="w-full flex items-center justify-center relative z-10 overflow-hidden">
          <MarqueeBlock
            key={`${contentType}-${direction}-${speed}-${pauseOnHover}-${fade}`} // Force re-render on drastic changes to ensure clean animation resets
            direction={direction}
            speed={speed}
            pauseOnHover={pauseOnHover}
            fade={fade}
            gap={gap}
            className={
              isVertical ? "h-[400px] w-full max-w-[300px]" : "w-full py-4"
            }
          >
            {renderContent()}
          </MarqueeBlock>
        </div>
      </ComponentPreview>
    </div>
  );
}
