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
const SCROLL_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, CheckCircle2, Layers } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollStackItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  tags?: string[];
  cardContent: React.ReactNode;
  color?: string;
}

export interface SplitScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollStackItem[];
  stickySide?: "left" | "right";
  cardDepthScale?: number;
  cardOffset?: number;
  color?: string;
  scroller?: string | Element | null;
  scrollerRef?: React.RefObject<HTMLElement | null>;
  onActiveIndexChange?: (index: number) => void;
}

export const SplitScrollStack = React.forwardRef<HTMLDivElement, SplitScrollStackProps>(
  ({ items, stickySide = "right", cardDepthScale = 0.05, cardOffset = 16, color = "#FFAB1D", scroller, scrollerRef, className, onActiveIndexChange, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isHex = color.startsWith("#");

    const onActiveIndexChangeRef = useRef(onActiveIndexChange);
    useEffect(() => { onActiveIndexChangeRef.current = onActiveIndexChange; }, [onActiveIndexChange]);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    useEffect(() => {
      if (!containerRef.current) return;
      const targetScroller = scrollerRef?.current || scroller || window;
      const triggers: ScrollTrigger[] = [];

      sectionRefs.current.forEach((section, idx) => {
        if (!section) return;
        const trigger = ScrollTrigger.create({
          trigger: section,
          scroller: targetScroller,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(idx);
              onActiveIndexChangeRef.current?.(idx);
            }
          },
        });
        triggers.push(trigger);
      });

      const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 150);
      return () => {
        clearTimeout(timer);
        triggers.forEach((t) => t.kill());
      };
    }, [scroller, scrollerRef, items.length]);

    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        if (idx < activeIndex) {
          const depth = activeIndex - idx;
          gsap.to(card, { y: -depth * cardOffset, scale: 1 - depth * cardDepthScale, opacity: Math.max(0.2, 1 - depth * 0.25), zIndex: idx, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else if (idx === activeIndex) {
          gsap.to(card, { y: 0, scale: 1, opacity: 1, zIndex: items.length + 10, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.to(card, { y: 140, scale: 0.95, opacity: 0, zIndex: idx, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      });
    }, [activeIndex, cardDepthScale, cardOffset, items.length]);

    return (
      <div ref={containerRef} className={cn("grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 w-full relative", className)} {...props}>
        <div className={cn("col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-12 sm:gap-24 relative z-10 py-6 sm:py-12", stickySide === "left" ? "md:order-2" : "md:order-1")}>
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isPassed = activeIndex > index;
            return (
              <div key={item.id} ref={(el) => { sectionRefs.current[index] = el; }} className={cn("group relative rounded-3xl p-6 sm:p-10 border transition-all duration-500 min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center", isActive ? "bg-white dark:bg-zinc-900 shadow-2xl border-transparent scale-[1.01]" : "bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/80 dark:border-zinc-800/60 opacity-60 hover:opacity-90")} style={{ borderColor: isActive && isHex ? color : undefined }}>
                {isActive && <div className="absolute top-6 bottom-6 left-0 w-1.5 rounded-r-full transition-colors duration-300" style={{ backgroundColor: isHex ? color : undefined }} />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className={cn("w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-all duration-300 shadow-sm", isActive ? "text-white border-transparent scale-110" : isPassed ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent" : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700")} style={{ backgroundColor: isActive && isHex ? color : undefined }}>
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : item.stepNumber}
                    </span>
                    <h3 className={cn("text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400")}>{item.title}</h3>
                  </div>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0", isActive ? "opacity-100 scale-100 shadow-sm" : "opacity-0 scale-75")} style={{ backgroundColor: isActive ? \`\${color}15\` : "transparent", color: isActive ? color : "currentColor" }}>
                    <ArrowDownRight className="w-5 h-5 animate-bounce" />
                  </div>
                </div>
                <p className={cn("mt-6 text-base sm:text-lg leading-relaxed transition-colors duration-300 pl-0 sm:pl-[58px]", isActive ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500")}>{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-8 pl-0 sm:pl-[58px]">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={cn("px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300", isActive ? "border-transparent shadow-xs font-extrabold" : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600")} style={{ backgroundColor: isActive ? \`\${color}15\` : undefined, color: isActive ? color : undefined }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={cn("hidden md:block md:col-span-6 lg:col-span-5 w-full relative z-20", stickySide === "left" ? "md:order-1" : "md:order-2")}>
          <div className="sticky top-20 sm:top-28 w-full h-[450px] sm:h-[520px] flex items-center justify-center perspective-[1200px] py-4">
            <div className="relative w-full h-full max-w-lg">
              {items.map((item, index) => (
                <div key={item.id} ref={(el) => { cardRefs.current[index] = el; }} className={cn("absolute inset-0 w-full h-full rounded-[2.5rem] p-6 sm:p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow", item.color || "bg-zinc-900 text-white border-white/10 dark:border-zinc-800")} style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 10 : 0 }}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10 mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase border border-white/15 flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> DECK // {item.stepNumber}</span>
                    <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                  </div>
                  <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">{item.cardContent}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
SplitScrollStack.displayName = "SplitScrollStack";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const SCROLL_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, CheckCircle2, Layers } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SplitScrollStack = React.forwardRef(
  ({ items, stickySide = "right", cardDepthScale = 0.05, cardOffset = 16, color = "#FFAB1D", scroller, scrollerRef, className, onActiveIndexChange, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const sectionRefs = useRef([]);
    const isHex = color.startsWith("#");

    const onActiveIndexChangeRef = useRef(onActiveIndexChange);
    useEffect(() => { onActiveIndexChangeRef.current = onActiveIndexChange; }, [onActiveIndexChange]);

    React.useImperativeHandle(ref, () => containerRef.current);

    useEffect(() => {
      if (!containerRef.current) return;
      const targetScroller = scrollerRef?.current || scroller || window;
      const triggers = [];

      sectionRefs.current.forEach((section, idx) => {
        if (!section) return;
        const trigger = ScrollTrigger.create({
          trigger: section,
          scroller: targetScroller,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(idx);
              onActiveIndexChangeRef.current?.(idx);
            }
          },
        });
        triggers.push(trigger);
      });

      const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 150);
      return () => {
        clearTimeout(timer);
        triggers.forEach((t) => t.kill());
      };
    }, [scroller, scrollerRef, items.length]);

    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        if (idx < activeIndex) {
          const depth = activeIndex - idx;
          gsap.to(card, { y: -depth * cardOffset, scale: 1 - depth * cardDepthScale, opacity: Math.max(0.2, 1 - depth * 0.25), zIndex: idx, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else if (idx === activeIndex) {
          gsap.to(card, { y: 0, scale: 1, opacity: 1, zIndex: items.length + 10, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.to(card, { y: 140, scale: 0.95, opacity: 0, zIndex: idx, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      });
    }, [activeIndex, cardDepthScale, cardOffset, items.length]);

    return (
      <div ref={containerRef} className={cn("grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 w-full relative", className)} {...props}>
        <div className={cn("col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-12 sm:gap-24 relative z-10 py-6 sm:py-12", stickySide === "left" ? "md:order-2" : "md:order-1")}>
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isPassed = activeIndex > index;
            return (
              <div key={item.id} ref={(el) => { sectionRefs.current[index] = el; }} className={cn("group relative rounded-3xl p-6 sm:p-10 border transition-all duration-500 min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center", isActive ? "bg-white dark:bg-zinc-900 shadow-2xl border-transparent scale-[1.01]" : "bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/80 dark:border-zinc-800/60 opacity-60 hover:opacity-90")} style={{ borderColor: isActive && isHex ? color : undefined }}>
                {isActive && <div className="absolute top-6 bottom-6 left-0 w-1.5 rounded-r-full transition-colors duration-300" style={{ backgroundColor: isHex ? color : undefined }} />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className={cn("w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-all duration-300 shadow-sm", isActive ? "text-white border-transparent scale-110" : isPassed ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent" : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700")} style={{ backgroundColor: isActive && isHex ? color : undefined }}>
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : item.stepNumber}
                    </span>
                    <h3 className={cn("text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400")}>{item.title}</h3>
                  </div>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0", isActive ? "opacity-100 scale-100 shadow-sm" : "opacity-0 scale-75")} style={{ backgroundColor: isActive ? \`\${color}15\` : "transparent", color: isActive ? color : "currentColor" }}>
                    <ArrowDownRight className="w-5 h-5 animate-bounce" />
                  </div>
                </div>
                <p className={cn("mt-6 text-base sm:text-lg leading-relaxed transition-colors duration-300 pl-0 sm:pl-[58px]", isActive ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500")}>{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-8 pl-0 sm:pl-[58px]">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={cn("px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300", isActive ? "border-transparent shadow-xs font-extrabold" : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600")} style={{ backgroundColor: isActive ? \`\${color}15\` : undefined, color: isActive ? color : undefined }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={cn("hidden md:block md:col-span-6 lg:col-span-5 w-full relative z-20", stickySide === "left" ? "md:order-1" : "md:order-2")}>
          <div className="sticky top-20 sm:top-28 w-full h-[450px] sm:h-[520px] flex items-center justify-center perspective-[1200px] py-4">
            <div className="relative w-full h-full max-w-lg">
              {items.map((item, index) => (
                <div key={item.id} ref={(el) => { cardRefs.current[index] = el; }} className={cn("absolute inset-0 w-full h-full rounded-[2.5rem] p-6 sm:p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow", item.color || "bg-zinc-900 text-white border-white/10 dark:border-zinc-800")} style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 10 : 0 }}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10 mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase border border-white/15 flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> DECK // {item.stepNumber}</span>
                    <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                  </div>
                  <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">{item.cardContent}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
SplitScrollStack.displayName = "SplitScrollStack";`;

export function SplitScrollStackShowcase() {
  const [stickySide, setStickySide] = useState<"left" | "right">("right");
  const [cardDepthScale, setCardDepthScale] = useState(0.06);
  const [cardOffset, setCardOffset] = useState(20);
  const [color, setColor] = useState<string>("#FFAB1D");
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
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <SplitScrollStack 
        items={items} 
        stickySide="${stickySide}" 
        cardDepthScale={${cardDepthScale}} 
        cardOffset={${cardOffset}} 
        color="#FFAB1D" 
      />
    </div>
  );
}`;
  };

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
          <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 pointer-events-none shadow-lg">
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
              color={color}
              scrollerRef={viewportRef} // CRITICAL FIX: Pass ref object directly
              onActiveIndexChange={setActiveStepIndex}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
