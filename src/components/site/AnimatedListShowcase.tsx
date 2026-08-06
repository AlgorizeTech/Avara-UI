"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import {
  AnimatedList,
  AnimatedListItem,
  AnimationVariant,
} from "@/components/custom/blocks/AnimatedListBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  CreditCard,
  RefreshCw,
  UserPlus,
  Zap,
} from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const LIST_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export type AnimationVariant = "flip" | "slide-right" | "slide-left" | "slide-up" | "pop";

export interface AnimatedListProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number; animationDelay?: number; ease?: string; duration?: number; variant?: AnimationVariant;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(({ children, staggerDelay = 0.12, animationDelay = 0, ease = "back.out(1.5)", duration = 0.6, variant = "slide-right", className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    let startState: gsap.TweenVars = { opacity: 0, filter: "blur(8px)" };

    switch (variant) {
      case "slide-right": startState = { ...startState, x: 60 }; break;
      case "slide-left": startState = { ...startState, x: -60 }; break;
      case "slide-up": startState = { ...startState, y: 40 }; break;
      case "pop": startState = { ...startState, scale: 0.6 }; break;
      case "flip": default: startState = { ...startState, y: 40, scale: 0.9, rotationX: -45, transformOrigin: "top center" }; break;
    }

    gsap.set(items, startState);
    gsap.to(items, { opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0, filter: "blur(0px)", duration, ease, stagger: staggerDelay, delay: animationDelay, force3D: true });
    return () => { gsap.killTweensOf(items); };
  }, [staggerDelay, animationDelay, ease, duration, variant]);

  return (<div ref={containerRef} className={cn("flex flex-col gap-3 lg:gap-4 perspective-[1000px]", className)} {...props}>{children}</div>);
});
AnimatedList.displayName = "AnimatedList";

export type AnimatedListItemProps = React.HTMLAttributes<HTMLDivElement>;

export const AnimatedListItem = forwardRef<HTMLDivElement, AnimatedListItemProps>(({ children, className, ...props }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null); const glowRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at \${x}px \${y}px, rgba(255,255,255,0.06), transparent 40%)\`, duration: 0.1 });
  };
  const handleMouseLeave = () => { if (glowRef.current) gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0), transparent 40%)\`, duration: 0.5 }); };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("relative w-full rounded-2xl bg-white dark:bg-[#0d0d12] border border-zinc-200/80 dark:border-zinc-800/80 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] opacity-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden", className)} {...props}>
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none z-10" />
      <div className="relative z-20">{children}</div>
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const LIST_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export const AnimatedList = forwardRef(({ children, staggerDelay = 0.12, animationDelay = 0, ease = "back.out(1.5)", duration = 0.6, variant = "slide-right", className, ...props }, ref) => {
  const containerRef = useRef(null);
  React.useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    let startState = { opacity: 0, filter: "blur(8px)" };

    switch (variant) {
      case "slide-right": startState = { ...startState, x: 60 }; break;
      case "slide-left": startState = { ...startState, x: -60 }; break;
      case "slide-up": startState = { ...startState, y: 40 }; break;
      case "pop": startState = { ...startState, scale: 0.6 }; break;
      case "flip": default: startState = { ...startState, y: 40, scale: 0.9, rotationX: -45, transformOrigin: "top center" }; break;
    }

    gsap.set(items, startState);
    gsap.to(items, { opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0, filter: "blur(0px)", duration, ease, stagger: staggerDelay, delay: animationDelay, force3D: true });
    return () => { gsap.killTweensOf(items); };
  }, [staggerDelay, animationDelay, ease, duration, variant]);

  return (<div ref={containerRef} className={cn("flex flex-col gap-3 lg:gap-4 perspective-[1000px]", className)} {...props}>{children}</div>);
});
AnimatedList.displayName = "AnimatedList";

export const AnimatedListItem = forwardRef(({ children, className, ...props }, ref) => {
  const cardRef = useRef(null); const glowRef = useRef(null);
  React.useImperativeHandle(ref, () => cardRef.current);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at \${x}px \${y}px, rgba(255,255,255,0.06), transparent 40%)\`, duration: 0.1 });
  };
  const handleMouseLeave = () => { if (glowRef.current) gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0), transparent 40%)\`, duration: 0.5 }); };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("relative w-full rounded-2xl bg-white dark:bg-[#0d0d12] border border-zinc-200/80 dark:border-zinc-800/80 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] opacity-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden", className)} {...props}>
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none z-10" />
      <div className="relative z-20">{children}</div>
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";`;

export function AnimatedListShowcase() {
  const [key, setKey] = useState(0);
  const [variant, setVariant] = useState<AnimationVariant>("slide-right");
  const [ease, setEase] = useState<string>("back.out(1.5)");

  const notifications = [
    {
      id: 1,
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
      title: "Payment Received",
      desc: "Stripe successfully processed $129.00",
      time: "2m",
    },
    {
      id: 2,
      icon: UserPlus,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
      title: "New Signup",
      desc: "alice@example.com created a Pro account",
      time: "15m",
    },
    {
      id: 3,
      icon: CheckCircle2,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
      title: "Deployment Successful",
      desc: "Production deployment (v2.4.1) is live",
      time: "1h",
    },
    {
      id: 4,
      icon: Zap,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
      title: "Server Scaled",
      desc: "Auto-scaled cluster to handle traffic spike",
      time: "3h",
    },
  ];

  const generateUsageCode = (isTs: boolean) => {
    return `import { AnimatedList, AnimatedListItem } from "@/components/custom/blocks/AnimatedListBlock";

export default function NotificationFeed() {
  return (
    <AnimatedList 
      variant="${variant}" 
      ease="${ease}"
      staggerDelay={0.12}
    >
      
      <AnimatedListItem>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-emerald-500 font-bold">$</span>
          </div>
          <div>
            <h4 className="text-[14px] font-bold">Payment Received</h4>
            <p className="text-[13px] text-zinc-500 font-medium">$129.00 via Stripe</p>
          </div>
        </div>
      </AnimatedListItem>

      {/* Add more items... */}

    </AnimatedList>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Entrance Variant
            </label>
            <select
              value={variant}
              onChange={(e) => {
                setVariant(e.target.value as AnimationVariant);
                setKey((prev) => prev + 1); // Auto replay on change
              }}
              className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="slide-right">Slide Right (Toast)</option>
              <option value="slide-left">Slide Left</option>
              <option value="slide-up">Slide Up</option>
              <option value="flip">3D Flip (Perspective)</option>
              <option value="pop">Pop Scale</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Physics / Easing
            </label>
            <select
              value={ease}
              onChange={(e) => {
                setEase(e.target.value);
                setKey((prev) => prev + 1); // Auto replay on change
              }}
              className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="back.out(1.5)">Springy (Back Out)</option>
              <option value="elastic.out(1, 0.6)">Bouncy (Elastic)</option>
              <option value="power3.out">Smooth (Power3 Out)</option>
              <option value="circ.out">Snappy (Circ Out)</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={() => setKey((prev) => prev + 1)}
              className="h-9 px-4 text-sm font-bold rounded-lg border bg-white border-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center w-full shadow-sm active:scale-95"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Replay Effect
            </button>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AnimatedListBlock"
        tsCode={LIST_ENGINE_CODE_TS}
        jsCode={LIST_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="animated-list"
        sandboxProps={{ variant, ease, animKey: key }}
      >
        <div className="w-full flex justify-center items-center bg-[#fafafa] dark:bg-[#050505] rounded-2xl border border-zinc-200 dark:border-zinc-800 py-8 sm:py-16 px-4 sm:px-8 relative">
          {/* Subtle Abstract Background Glows */}
          <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

          {/* Toast Notification Container */}
          <div className="w-full max-w-md relative z-10">
            <AnimatedList
              key={key}
              variant={variant}
              ease={ease}
              staggerDelay={0.15}
            >
              {notifications.map((notif) => (
                <AnimatedListItem key={notif.id} className="p-3 sm:p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon Container with Hover Bounce */}
                    <div
                      className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                        notif.bg,
                        notif.color,
                      )}
                    >
                      <notif.icon
                        className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[13px] sm:text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-zinc-400 dark:text-zinc-500 flex-shrink-0">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11.5px] sm:text-[12px] font-medium text-zinc-500 dark:text-zinc-400 leading-snug break-words line-clamp-2 mt-[1px]">
                        {notif.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedListItem>
              ))}
            </AnimatedList>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
