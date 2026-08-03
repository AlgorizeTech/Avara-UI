"use client";

import {
  ScrollStack,
  StackItem,
} from "@/components/custom/blocks/ScrollStackBlock";
import { Blocks, Layers, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ScrollStackDemo({
  depthScale = 0.05,
  cardGap = 24,
  color = "primary",
}: {
  depthScale?: number;
  cardGap?: number;
  color?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Re-render once after mount so viewportRef.current is passed to GSAP.
  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeCardClass = () => {
    if (color === "primary" || color === "default" || !color) {
      return "bg-primary text-primary-foreground border-primary/30";
    }
    if (color.startsWith("#")) {
      return `bg-[${color}] text-white border-white/20`;
    }
    return `bg-${color}-600 text-white border-${color}-500/30`;
  };

  const themeCardClass = getThemeCardClass();

  const mockItems: StackItem[] = [
    {
      id: "1",
      title: "Real-time Synchronization",
      description:
        "Instantly sync state across clients without writing WebSocket logic. Our engine handles race conditions seamlessly.",
      icon: Zap,
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-full h-full bg-white/10 rounded-xl border border-white/20 shadow-inner flex items-center justify-center">
            <span className="text-white/60 font-mono text-sm font-semibold">
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
      color: themeCardClass,
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
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="h-24 bg-white/10 rounded-xl border border-white/20" />
            <div className="h-24 bg-white/10 rounded-xl border border-white/20" />
            <div className="h-24 bg-white/10 rounded-xl border border-white/20 col-span-2" />
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
      color: themeCardClass,
      content: (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center bg-white/10 shadow-lg">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#050505] relative overflow-hidden transition-colors">
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
          scroller={mounted ? viewportRef.current : null}
        />
      </div>
    </div>
  );
}
