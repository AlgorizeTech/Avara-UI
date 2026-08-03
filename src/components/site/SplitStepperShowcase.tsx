"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import {
  SplitStep,
  SplitStepper,
} from "@/components/custom/blocks/SplitStepperBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Cpu,
  LayoutTemplate,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const RAW_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface SplitStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  tags?: string[];
  cardContent: React.ReactNode;
  color?: string;
}

export interface SplitStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: SplitStep[];
  stickySide?: "left" | "right";
  cardDepthScale?: number;
  cardOffset?: number;
  color?: string;
  onStepChange?: (index: number) => void;
}

export const SplitStepper = React.forwardRef<HTMLDivElement, SplitStepperProps>(
  ({ steps, stickySide = "right", cardDepthScale = 0.05, cardOffset = 16, color = "#FFAB1D", className, onStepChange, ...props }, ref) => {
    const [activeStep, setActiveStep] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const listRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isHex = color.startsWith("#");

    const handleStepSelect = (index: number) => {
      setActiveStep(index);
      onStepChange?.(index);
      listRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        if (idx < activeStep) {
          const depth = activeStep - idx;
          gsap.to(card, { y: -depth * cardOffset, scale: 1 - depth * cardDepthScale, opacity: Math.max(0.2, 1 - depth * 0.25), zIndex: idx, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else if (idx === activeStep) {
          gsap.to(card, { y: 0, scale: 1, opacity: 1, zIndex: steps.length + 10, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.to(card, { y: 120, scale: 0.95, opacity: 0, zIndex: idx, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      });
    }, [activeStep, cardDepthScale, cardOffset, steps.length]);

    return (
      <div ref={ref} className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 w-full relative items-start", className)} {...props}>
        <div className={cn("flex flex-col gap-4 relative z-10", stickySide === "left" ? "md:order-2 md:col-span-6 lg:col-span-7" : "md:order-1 md:col-span-6 lg:col-span-7")}>
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isCompleted = activeStep > index;
            return (
              <div key={step.id} ref={(el) => { listRefs.current[index] = el; }} onClick={() => handleStepSelect(index)} className={cn("group relative rounded-3xl p-5 sm:p-8 border transition-all duration-300 cursor-pointer select-none overflow-hidden", isActive ? "bg-white dark:bg-zinc-900 shadow-xl border-transparent" : "bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/60 hover:bg-white dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-700")} style={{ borderColor: isActive && isHex ? color : undefined }}>
                {isActive && <div className="absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300" style={{ backgroundColor: isHex ? color : undefined }} />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className={cn("w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-colors duration-300", isActive ? "text-white border-transparent shadow-md" : isCompleted ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent" : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700")} style={{ backgroundColor: isActive && isHex ? color : undefined }}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step.stepNumber}
                    </span>
                    <h3 className={cn("text-lg sm:text-2xl font-bold tracking-tight transition-colors duration-300", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}>{step.title}</h3>
                  </div>
                  <div className={cn("w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0", isActive ? "translate-x-0 opacity-100 shadow-sm" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40")} style={{ backgroundColor: isActive ? \`\${color}15\` : "transparent", color: isActive ? color : "currentColor" }}>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <p className={cn("mt-4 text-sm sm:text-base leading-relaxed transition-colors duration-300 pl-[48px] sm:pl-[54px]", isActive ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500")}>{step.description}</p>
                {step.tags && step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pl-[48px] sm:pl-[54px]">
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={cn("px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all duration-300", isActive ? "border-transparent shadow-xs" : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600")} style={{ backgroundColor: isActive ? \`\${color}12\` : undefined, color: isActive ? color : undefined }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={cn("hidden md:block w-full sticky z-20 top-8 h-[450px] lg:h-[500px]", stickySide === "left" ? "md:order-1 md:col-span-6 lg:col-span-5" : "md:order-2 md:col-span-6 lg:col-span-5")}>
          <div className="relative w-full h-full max-w-lg mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} ref={(el) => { cardRefs.current[index] = el; }} className={cn("absolute inset-0 w-full h-full rounded-[2.5rem] p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow", step.color || "bg-zinc-900 text-white border-white/10 dark:border-zinc-800")} style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 10 : 0 }}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between relative z-10 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase border border-white/15">STEP // {step.stepNumber}</span>
                  <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">{step.cardContent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
SplitStepper.displayName = "SplitStepper";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const RAW_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const SplitStepper = React.forwardRef(
  ({ steps, stickySide = "right", cardDepthScale = 0.05, cardOffset = 16, color = "#FFAB1D", className, onStepChange, ...props }, ref) => {
    const [activeStep, setActiveStep] = useState(0);
    const cardRefs = useRef([]);
    const listRefs = useRef([]);
    const isHex = color.startsWith("#");

    const handleStepSelect = (index) => {
      setActiveStep(index);
      if (onStepChange) onStepChange(index);
      if (listRefs.current[index]) {
        listRefs.current[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };

    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        if (idx < activeStep) {
          const depth = activeStep - idx;
          gsap.to(card, { y: -depth * cardOffset, scale: 1 - depth * cardDepthScale, opacity: Math.max(0.2, 1 - depth * 0.25), zIndex: idx, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else if (idx === activeStep) {
          gsap.to(card, { y: 0, scale: 1, opacity: 1, zIndex: steps.length + 10, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.to(card, { y: 120, scale: 0.95, opacity: 0, zIndex: idx, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      });
    }, [activeStep, cardDepthScale, cardOffset, steps.length]);

    return (
      <div ref={ref} className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 w-full relative items-start", className)} {...props}>
        <div className={cn("flex flex-col gap-4 relative z-10", stickySide === "left" ? "md:order-2 md:col-span-6 lg:col-span-7" : "md:order-1 md:col-span-6 lg:col-span-7")}>
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isCompleted = activeStep > index;
            return (
              <div key={step.id} ref={(el) => { listRefs.current[index] = el; }} onClick={() => handleStepSelect(index)} className={cn("group relative rounded-3xl p-5 sm:p-8 border transition-all duration-300 cursor-pointer select-none overflow-hidden", isActive ? "bg-white dark:bg-zinc-900 shadow-xl border-transparent" : "bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/60 hover:bg-white dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-700")} style={{ borderColor: isActive && isHex ? color : undefined }}>
                {isActive && <div className="absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300" style={{ backgroundColor: isHex ? color : undefined }} />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className={cn("w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-colors duration-300", isActive ? "text-white border-transparent shadow-md" : isCompleted ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent" : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700")} style={{ backgroundColor: isActive && isHex ? color : undefined }}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step.stepNumber}
                    </span>
                    <h3 className={cn("text-lg sm:text-2xl font-bold tracking-tight transition-colors duration-300", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}>{step.title}</h3>
                  </div>
                  <div className={cn("w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0", isActive ? "translate-x-0 opacity-100 shadow-sm" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40")} style={{ backgroundColor: isActive ? \`\${color}15\` : "transparent", color: isActive ? color : "currentColor" }}>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <p className={cn("mt-4 text-sm sm:text-base leading-relaxed transition-colors duration-300 pl-[48px] sm:pl-[54px]", isActive ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500")}>{step.description}</p>
                {step.tags && step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pl-[48px] sm:pl-[54px]">
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={cn("px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all duration-300", isActive ? "border-transparent shadow-xs" : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600")} style={{ backgroundColor: isActive ? \`\${color}12\` : undefined, color: isActive ? color : undefined }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={cn("hidden md:block w-full sticky z-20 top-8 h-[450px] lg:h-[500px]", stickySide === "left" ? "md:order-1 md:col-span-6 lg:col-span-5" : "md:order-2 md:col-span-6 lg:col-span-5")}>
          <div className="relative w-full h-full max-w-lg mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} ref={(el) => { cardRefs.current[index] = el; }} className={cn("absolute inset-0 w-full h-full rounded-[2.5rem] p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow", step.color || "bg-zinc-900 text-white border-white/10 dark:border-zinc-800")} style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 10 : 0 }}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between relative z-10 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase border border-white/15">STEP // {step.stepNumber}</span>
                  <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">{step.cardContent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
SplitStepper.displayName = "SplitStepper";`;

export function SplitStepperShowcase() {
  const [stickySide, setStickySide] = useState<"left" | "right">("right");
  const [cardDepthScale, setCardDepthScale] = useState(0.06);
  const [cardOffset, setCardOffset] = useState(20);
  const [color, setColor] = useState<string>("#FFAB1D"); // Syncs with Local Storage

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

  const generateUsageCode = () => {
    return `import { SplitStepper } from "@/components/custom/blocks/SplitStepperBlock";
import { LayoutTemplate, BarChart3, Cpu } from "lucide-react";

export default function ServicesSection() {
  const steps = [
    {
      id: "1",
      stepNumber: "01",
      title: "Landing Page Design",
      description: "We engineer high-converting layouts with engaging animations.",
      tags: ["Conversion Focused", "Figma To Code"],
      cardContent: <div>Custom Visual Card 1</div>,
    },
    {
      id: "2",
      stepNumber: "02",
      title: "SaaS Development",
      description: "Modular, multi-tenant web applications designed to scale.",
      tags: ["Multi-Tenant Architecture", "Real-Time Sync"],
      cardContent: <div>Custom Visual Card 2</div>,
    },
    // ... add more steps
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <SplitStepper 
        steps={steps} 
        stickySide="${stickySide}" // Switch between "left" or "right"
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
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Side Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Sticky Showcase Side
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
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SplitStepperBlock"
        tsCode={RAW_CODE_TS}
        jsCode={RAW_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="split-stepper"
        sandboxProps={{ stickySide, cardDepthScale, cardOffset, color }}
      >
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
      </ComponentPreview>
    </div>
  );
}
