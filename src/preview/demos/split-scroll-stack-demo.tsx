"use client";

import {
  ScrollStackItem,
  SplitScrollStack,
} from "@/components/custom/blocks/SplitScrollStackBlock";
import {
  BarChart3,
  Cpu,
  LayoutTemplate,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = { primary: "var(--primary)", default: "var(--primary)", indigo: "#6366f1", rose: "#f43f5e", emerald: "#10b981", zinc: "#18181b" };
  return map[c] || "var(--primary)";
};

// Abstract UI Mockups for the Stack Cards
const MockLandingView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-2">
      <LayoutTemplate className="w-8 h-8 text-amber-500 dark:text-amber-400" />
      <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
        High-Converting UI
      </span>
    </div>
    <div className="w-full h-24 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
      <div className="w-2/3 h-3 bg-zinc-300 dark:bg-white/20 rounded-full" />
      <div className="w-1/2 h-2.5 bg-zinc-200 dark:bg-white/10 rounded-full" />
      <div className="flex gap-2 mt-auto">
        <div className="h-6 w-20 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-semibold text-amber-600 dark:text-amber-300">
          CTA Button
        </div>
        <div className="h-6 w-16 rounded-md bg-zinc-200 dark:bg-white/10" />
      </div>
    </div>
  </div>
);

const MockSaaSView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-1">
      <BarChart3 className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
      <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
        SaaS Dashboard Architecture
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="h-20 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 flex flex-col justify-between">
        <span className="text-[10px] text-indigo-600 dark:text-indigo-300 font-mono uppercase">
          MRR Growth
        </span>
        <span className="text-xl font-bold text-zinc-900 dark:text-white">+148.2%</span>
      </div>
      <div className="h-20 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-3 flex flex-col justify-between">
        <span className="text-[10px] text-zinc-500 dark:text-white/50 font-mono uppercase">
          Active Users
        </span>
        <span className="text-xl font-bold text-zinc-900 dark:text-white">24,892</span>
      </div>
    </div>
  </div>
);

const MockAIView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-1">
      <Cpu className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
      <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
        AI & LLM Integration
      </span>
    </div>
    <div className="w-full rounded-xl bg-zinc-100 dark:bg-black/40 border border-emerald-500/30 p-3.5 font-mono text-xs text-emerald-600 dark:text-emerald-400/90 flex flex-col gap-1.5 shadow-sm">
      <div className="flex items-center justify-between text-[10px] text-emerald-600/80 dark:text-emerald-500/60 border-b border-emerald-500/20 pb-1">
        <span>TERMINAL // AI_ENGINE</span>
        <span>STATUS: ACTIVE</span>
      </div>
      <p className="mt-1 text-[11px]">&gt; Initializing RAG pipeline...</p>
      <p className="text-[11px]">&gt; Vector embeddings synced (1.2ms)</p>
      <p className="text-emerald-700 dark:text-white font-semibold animate-pulse">
        &gt; Ready for token streaming_
      </p>
    </div>
  </div>
);

const MockMobileView = () => (
  <div className="w-full h-full flex items-center justify-between gap-4">
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2">
        <Smartphone className="w-8 h-8 text-rose-500 dark:text-rose-400" />
        <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
          Mobile First
        </span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-white/60 max-w-[180px] leading-relaxed">
        Silky 60fps native performance across iOS and Android ecosystems.
      </p>
    </div>
    <div className="w-28 h-36 rounded-2xl bg-zinc-100 dark:bg-black/60 border-2 border-zinc-300 dark:border-white/20 p-2 flex flex-col gap-2 shadow-lg flex-shrink-0 relative">
      <div className="w-8 h-1.5 bg-zinc-300 dark:bg-white/20 rounded-full mx-auto" />
      <div className="w-full h-12 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 mt-1 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-rose-500 dark:text-rose-400 animate-spin" />
      </div>
      <div className="w-3/4 h-2 bg-zinc-200 dark:bg-white/20 rounded-full mt-auto" />
      <div className="w-1/2 h-2 bg-zinc-200 dark:bg-white/10 rounded-full" />
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
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
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
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
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
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
    cardContent: <MockAIView />,
  },
  {
    id: "mobile",
    stepNumber: "04",
    title: "Mobile App Development",
    description:
      "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified architectures with silky native device performance.",
    tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
    color: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white",
    cardContent: <MockMobileView />,
  },
];

export default function SplitScrollStackDemo({
  stickySide = "right",
  cardDepthScale = 0.06,
  cardOffset = 20,
  color = "primary",
}: {
  stickySide?: "left" | "right";
  cardDepthScale?: number;
  cardOffset?: number;
  color?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [, setActiveStepIndex] = useState(0);

  return (
    <div
      className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 relative overflow-hidden transition-colors"
      style={{ "--theme-color": getThemeColorHex(color) } as React.CSSProperties}
    >
      {/* Scroll instruction banner */}
      <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 pointer-events-none shadow-lg">
        ↓ Scroll inside preview box to trigger stack ↓
      </div>

      {/* Internal Scrollable Viewport */}
      <div
        ref={viewportRef}
        className="w-full h-[680px] overflow-y-auto overflow-x-hidden custom-scrollbar px-6 sm:px-12 relative"
      >
        <SplitScrollStack
          items={items}
          stickySide={stickySide}
          cardDepthScale={cardDepthScale}
          cardOffset={cardOffset}
          color={getThemeColorHex(color)}
          scrollerRef={viewportRef}
          onActiveIndexChange={setActiveStepIndex}
        />
      </div>
    </div>
  );
}
