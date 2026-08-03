"use client";

import {
  SplitStep,
  SplitStepper,
} from "@/components/custom/blocks/SplitStepperBlock";
import {
  BarChart3,
  Cpu,
  LayoutTemplate,
  Smartphone,
  Sparkles,
} from "lucide-react";

// Abstract UI Mockups for the Stack Cards
const MockLandingView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-2">
      <LayoutTemplate className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
      <span className="text-base sm:text-lg font-bold text-white tracking-tight">
        High-Converting UI
      </span>
    </div>
    <div className="w-full h-20 sm:h-24 rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
      <div className="w-2/3 h-2.5 sm:h-3 bg-white/20 rounded-full" />
      <div className="w-1/2 h-2 sm:h-2.5 bg-white/10 rounded-full" />
      <div className="flex gap-2 mt-auto">
        <div className="h-5 w-16 sm:h-6 sm:w-20 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-amber-300">
          CTA Button
        </div>
        <div className="h-5 w-12 sm:h-6 sm:w-16 rounded-md bg-white/10" />
      </div>
    </div>
  </div>
);

const MockSaaSView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-1">
      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
      <span className="text-base sm:text-lg font-bold text-white tracking-tight">
        SaaS Dashboard Architecture
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
      <div className="h-16 sm:h-20 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-2.5 sm:p-3 flex flex-col justify-between">
        <span className="text-[9px] sm:text-[10px] text-indigo-300 font-mono uppercase">
          MRR Growth
        </span>
        <span className="text-lg sm:text-xl font-black text-white">
          +148.2%
        </span>
      </div>
      <div className="h-16 sm:h-20 rounded-xl bg-white/5 border border-white/10 p-2.5 sm:p-3 flex flex-col justify-between">
        <span className="text-[9px] sm:text-[10px] text-white/50 font-mono uppercase">
          Active Users
        </span>
        <span className="text-lg sm:text-xl font-black text-white">
          24,892
        </span>
      </div>
    </div>
  </div>
);

const MockAIView = () => (
  <div className="w-full h-full flex flex-col gap-3 justify-center">
    <div className="flex items-center gap-2 mb-1">
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
      <span className="text-base sm:text-lg font-bold text-white tracking-tight">
        AI & LLM Integration
      </span>
    </div>
    <div className="w-full rounded-xl bg-black/40 border border-emerald-500/30 p-2.5 sm:p-3.5 font-mono text-[10px] sm:text-xs text-emerald-400/90 flex flex-col gap-1.5 shadow-lg">
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-emerald-500/60 border-b border-emerald-500/20 pb-1">
        <span>TERMINAL // AI_ENGINE</span>
        <span>STATUS: ACTIVE</span>
      </div>
      <p className="mt-1 text-[10px] sm:text-[11px]">
        &gt; Initializing RAG pipeline...
      </p>
      <p className="text-[10px] sm:text-[11px]">
        &gt; Vector embeddings synced (1.2ms)
      </p>
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
        <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
        <span className="text-base sm:text-lg font-bold text-white tracking-tight">
          Mobile First
        </span>
      </div>
      <p className="text-[11px] sm:text-xs text-white/60 max-w-[140px] sm:max-w-[180px] leading-relaxed">
        Silky 60fps native performance across iOS and Android ecosystems.
      </p>
    </div>
    <div className="w-20 h-28 sm:w-28 sm:h-36 rounded-2xl bg-black/60 border-2 border-white/20 p-2 flex flex-col gap-2 shadow-2xl flex-shrink-0 relative">
      <div className="w-6 sm:w-8 h-1 sm:h-1.5 bg-white/20 rounded-full mx-auto" />
      <div className="w-full h-8 sm:h-12 rounded-lg bg-rose-500/20 border border-rose-500/30 mt-1 flex items-center justify-center">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 animate-spin" />
      </div>
      <div className="w-3/4 h-1.5 sm:h-2 bg-white/20 rounded-full mt-auto" />
      <div className="w-1/2 h-1.5 sm:h-2 bg-white/10 rounded-full" />
    </div>
  </div>
);

const steps: SplitStep[] = [
  {
    id: "landing",
    stepNumber: "01",
    title: "Landing Page Design",
    description:
      "Most landing pages fail quietly. Traffic comes in, nothing happens. We engineer high-converting layouts with engaging Framer & GSAP animations.",
    tags: ["Conversion Focused", "Figma To Code", "Mobile First"],
    color: "bg-[#0c0c10] border-amber-500/20",
    cardContent: <MockLandingView />,
  },
  {
    id: "saas",
    stepNumber: "02",
    title: "SaaS Product Development",
    description:
      "Every successful SaaS product starts with a complex problem. We build modular, multi-tenant web applications designed to scale to millions of requests.",
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
      "Building a mobile app shouldn't mean managing two separate codebases. We deploy unified React Native architectures with native device capabilities.",
    tags: ["iOS & Android", "Single Codebase Build", "App Store Submission"],
    color: "bg-[#12080a] border-rose-500/20",
    cardContent: <MockMobileView />,
  },
];

export default function SplitStepperDemo({
  stickySide = "right",
  cardDepthScale = 0.06,
  cardOffset = 20,
  color = "#FFAB1D",
}: {
  stickySide?: "left" | "right";
  cardDepthScale?: number;
  cardOffset?: number;
  color?: string;
}) {
  return (
    <div className="w-full rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-[#040406] relative overflow-hidden transition-colors">
      {/* Internal Scrollable Viewport for easy previewing */}
      <div className="w-full h-[650px] overflow-y-auto overflow-x-hidden custom-scrollbar p-6 sm:p-10 relative">
        <SplitStepper
          steps={steps}
          stickySide={stickySide}
          cardDepthScale={cardDepthScale}
          cardOffset={cardOffset}
          color={color}
        />
      </div>
    </div>
  );
}
