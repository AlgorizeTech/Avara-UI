"use client";

import {
  ScrollStackItem,
  SplitScrollStack,
} from "@/components/custom/blocks/SplitScrollStackBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Cpu,
  LayoutTemplate,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const SCROLL_CODE_TS = `/* Exposes the full GSAP SplitScrollStackBlock architecture natively via module export */`;
const SCROLL_CODE_JS = `/* Exposes the full GSAP SplitScrollStackBlock architecture natively via module export */`;

export function SplitScrollStackShowcase() {
  const [stickySide, setStickySide] = useState<"left" | "right">("right");
  const [cardDepthScale, setCardDepthScale] = useState(0.06);
  const [cardOffset, setCardOffset] = useState(20);
  const [color, setColor] = useState<string>("#FFAB1D"); // Syncs with Local Storage
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  // Abstract UI Mockups for the Stack Cards
  const MockLandingView = () => (
    <div className="w-full h-full flex flex-col gap-3 justify-center">
      <div className="flex items-center gap-2 mb-2">
        <LayoutTemplate className="w-8 h-8 text-amber-400" />
        <span className="text-lg font-bold text-white tracking-tight">
          High-Converting UI
        </span>
      </div>
      <div className="w-full h-24 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
        <div className="w-2/3 h-3 bg-white/20 rounded-full" />
        <div className="w-1/2 h-2.5 bg-white/10 rounded-full" />
        <div className="flex gap-2 mt-auto">
          <div className="h-6 w-20 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[10px] font-bold text-amber-300">
            CTA Button
          </div>
          <div className="h-6 w-16 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );

  const MockSaaSView = () => (
    <div className="w-full h-full flex flex-col gap-3 justify-center">
      <div className="flex items-center gap-2 mb-1">
        <BarChart3 className="w-8 h-8 text-indigo-400" />
        <span className="text-lg font-bold text-white tracking-tight">
          SaaS Dashboard Architecture
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="h-20 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 flex flex-col justify-between">
          <span className="text-[10px] text-indigo-300 font-mono uppercase">
            MRR Growth
          </span>
          <span className="text-xl font-black text-white">+148.2%</span>
        </div>
        <div className="h-20 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col justify-between">
          <span className="text-[10px] text-white/50 font-mono uppercase">
            Active Users
          </span>
          <span className="text-xl font-black text-white">24,892</span>
        </div>
      </div>
    </div>
  );

  const MockAIView = () => (
    <div className="w-full h-full flex flex-col gap-3 justify-center">
      <div className="flex items-center gap-2 mb-1">
        <Cpu className="w-8 h-8 text-emerald-400" />
        <span className="text-lg font-bold text-white tracking-tight">
          AI & LLM Integration
        </span>
      </div>
      <div className="w-full rounded-xl bg-black/40 border border-emerald-500/30 p-3.5 font-mono text-xs text-emerald-400/90 flex flex-col gap-1.5 shadow-lg">
        <div className="flex items-center justify-between text-[10px] text-emerald-500/60 border-b border-emerald-500/20 pb-1">
          <span>TERMINAL // AI_ENGINE</span>
          <span>STATUS: ACTIVE</span>
        </div>
        <p className="mt-1 text-[11px]">&gt; Initializing RAG pipeline...</p>
        <p className="text-[11px]">&gt; Vector embeddings synced (1.2ms)</p>
        <p className="text-white font-bold animate-pulse">
          &gt; Ready for token streaming_
        </p>
      </div>
    </div>
  );

  const MockMobileView = () => (
    <div className="w-full h-full flex items-center justify-between gap-4">
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-8 h-8 text-rose-400" />
          <span className="text-lg font-bold text-white tracking-tight">
            Mobile First
          </span>
        </div>
        <p className="text-xs text-white/60 max-w-[180px] leading-relaxed">
          Silky 60fps native performance across iOS and Android ecosystems.
        </p>
      </div>
      <div className="w-28 h-36 rounded-2xl bg-black/60 border-2 border-white/20 p-2 flex flex-col gap-2 shadow-2xl flex-shrink-0 relative">
        <div className="w-8 h-1.5 bg-white/20 rounded-full mx-auto" />
        <div className="w-full h-12 rounded-lg bg-rose-500/20 border border-rose-500/30 mt-1 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-rose-400 animate-spin" />
        </div>
        <div className="w-3/4 h-2 bg-white/20 rounded-full mt-auto" />
        <div className="w-1/2 h-2 bg-white/10 rounded-full" />
      </div>
    </div>
  );

  const items: ScrollStackItem[] = [
    {
      id: "landing",
      stepNumber: "01",
      title: "Landing Page Design",
      description:
        "Most landing pages fail quietly. Traffic comes in, nothing happens. We engineer high-converting layouts with scroll-triggered GSAP animations that capture attention.",
      tags: ["Conversion Focused", "Figma To Code", "Mobile First"],
      color: "bg-[#0c0c10] border-amber-500/20",
      cardContent: <MockLandingView />,
    },
    {
      id: "saas",
      stepNumber: "02",
      title: "SaaS Product Development",
      description:
        "Every successful SaaS product starts with a complex problem. We build modular, multi-tenant web applications designed to scale cleanly to millions of requests.",
      tags: [
        "Multi-Tenant Architecture",
        "Stripe Integration",
        "Real-Time Sync",
      ],
      color: "bg-[#090a14] border-indigo-500/20",
      cardContent: <MockSaaSView />,
    },
    {
      id: "ai",
      stepNumber: "03",
      title: "AI Product Development",
      description:
        "Building an AI product is not about just plugging in an API. We fine-tune custom LLM models, engineer vector RAG pipelines, and build streaming chat UIs.",
      tags: [
        "LLM API Integration",
        "Vector RAG Setup",
        "Custom Model Training",
      ],
      color: "bg-[#06100c] border-emerald-500/20",
      cardContent: <MockAIView />,
    },
    {
      id: "mobile",
      stepNumber: "04",
      title: "Mobile App Development",
      description:
        "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified architectures with silky native device performance.",
      tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
      color: "bg-[#12080a] border-rose-500/20",
      cardContent: <MockMobileView />,
    },
  ];

  const generateUsageCode = () => {
    return `import { SplitScrollStack } from "@/components/custom/blocks/SplitScrollStackBlock";

export default function LandingSection() {
  const items = [
    {
      id: "1",
      stepNumber: "01",
      title: "Landing Page Design",
      description: "We engineer high-converting layouts with scroll-triggered GSAP animations.",
      tags: ["Conversion Focused", "Figma To Code"],
      cardContent: <div>Custom Visual Card 1</div>,
    },
    {
      id: "2",
      stepNumber: "02",
      title: "SaaS Development",
      description: "Modular, multi-tenant web applications designed to scale cleanly.",
      tags: ["Multi-Tenant Architecture", "Real-Time Sync"],
      cardContent: <div>Custom Visual Card 2</div>,
    },
    // ... add more items
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <SplitScrollStack 
        items={items} 
        stickySide="${stickySide}" // Swap between "left" or "right"
        cardDepthScale={${cardDepthScale}} 
        cardOffset={${cardOffset}} 
        color="#FFAB1D" 
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
    "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform hover:[&::-moz-range-thumb]:scale-110",
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Side Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
              <span>Sticky Showcase Side</span>
              <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono text-zinc-700 dark:text-zinc-300">
                Active: STEP {activeStepIndex + 1}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2 bg-zinc-200/60 dark:bg-zinc-800/60 p-1 rounded-xl border border-zinc-300/50 dark:border-zinc-700/50">
              <button
                type="button"
                onClick={() => setStickySide("left")}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                  stickySide === "left"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200",
                )}
              >
                Left Side
              </button>
              <button
                type="button"
                onClick={() => setStickySide("right")}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                  stickySide === "right"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200",
                )}
              >
                Right Side
              </button>
            </div>
          </div>

          {/* Depth Scale Slider */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Card Shrink Rate
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
                {(cardDepthScale * 100).toFixed(0)}%
              </span>
            </label>
            <input
              type="range"
              min="0.02"
              max="0.10"
              step="0.01"
              value={cardDepthScale}
              onChange={(e) => setCardDepthScale(parseFloat(e.target.value))}
              className={sliderClasses}
            />
          </div>

          {/* Vertical Offset Slider */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Stack Offset Distance
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
                {cardOffset}px
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="35"
              value={cardOffset}
              onChange={(e) => setCardOffset(parseInt(e.target.value))}
              className={sliderClasses}
            />
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SplitScrollStackBlock"
        tsCode={SCROLL_CODE_TS}
        jsCode={SCROLL_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-[#040406] relative overflow-hidden transition-colors">
          {/* Scroll instruction banner */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 pointer-events-none shadow-lg">
            ↓ Scroll inside preview box to trigger stack ↓
          </div>

          {/* Internal Scrollable Viewport with dedicated scrollerRef for GSAP */}
          <div
            ref={viewportRef}
            className="w-full h-[680px] overflow-y-auto overflow-x-hidden custom-scrollbar px-6 sm:px-12 relative"
          >
            <SplitScrollStack
              items={items}
              stickySide={stickySide}
              cardDepthScale={cardDepthScale}
              cardOffset={cardOffset}
              color={color}
              scroller={viewportRef.current} // Pass container to ScrollTrigger
              onActiveIndexChange={setActiveStepIndex}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
