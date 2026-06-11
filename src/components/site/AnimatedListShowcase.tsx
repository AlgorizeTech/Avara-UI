"use client";

import {
  AnimatedList,
  AnimatedListItem,
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

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export interface AnimatedListProps extends React.HTMLAttributes<HTMLDivElement> { staggerDelay?: number; animationDelay?: number; ease?: string; duration?: number; }

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(({ children, staggerDelay = 0.12, animationDelay = 0, ease = "back.out(1.5)", duration = 0.8, className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    gsap.set(items, { opacity: 0, y: 40, scale: 0.9, rotationX: -45, transformOrigin: "top center", filter: "blur(8px)" });
    gsap.to(items, { opacity: 1, y: 0, scale: 1, rotationX: 0, filter: "blur(0px)", duration, ease, stagger: staggerDelay, delay: animationDelay, force3D: true });
    return () => { gsap.killTweensOf(items); };
  }, [staggerDelay, animationDelay, ease, duration]);

  return (<div ref={containerRef} className={cn("flex flex-col gap-3 lg:gap-4 perspective-[1000px]", className)} {...props}>{children}</div>);
});
AnimatedList.displayName = "AnimatedList";

export interface AnimatedListItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AnimatedListItem = forwardRef<HTMLDivElement, AnimatedListItemProps>(({ children, className, ...props }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at \${x}px \${y}px, rgba(255,255,255,0.06), transparent 40%)\`, duration: 0.1 });
  };

  const handleMouseLeave = () => {
    if (glowRef.current) gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0), transparent 40%)\`, duration: 0.5 });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("relative w-full rounded-2xl bg-white dark:bg-[#0d0d12] border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] opacity-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden", className)} {...props}>
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none z-10" />
      <div className="relative z-20">{children}</div>
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const LIST_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export const AnimatedList = forwardRef(({ children, staggerDelay = 0.12, animationDelay = 0, ease = "back.out(1.5)", duration = 0.8, className, ...props }, ref) => {
  const containerRef = useRef(null);
  React.useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    gsap.set(items, { opacity: 0, y: 40, scale: 0.9, rotationX: -45, transformOrigin: "top center", filter: "blur(8px)" });
    gsap.to(items, { opacity: 1, y: 0, scale: 1, rotationX: 0, filter: "blur(0px)", duration, ease, stagger: staggerDelay, delay: animationDelay, force3D: true });
    return () => { gsap.killTweensOf(items); };
  }, [staggerDelay, animationDelay, ease, duration]);

  return (<div ref={containerRef} className={cn("flex flex-col gap-3 lg:gap-4 perspective-[1000px]", className)} {...props}>{children}</div>);
});
AnimatedList.displayName = "AnimatedList";

export const AnimatedListItem = forwardRef(({ children, className, ...props }, ref) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  React.useImperativeHandle(ref, () => cardRef.current);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at \${x}px \${y}px, rgba(255,255,255,0.06), transparent 40%)\`, duration: 0.1 });
  };

  const handleMouseLeave = () => {
    if (glowRef.current) gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0), transparent 40%)\`, duration: 0.5 });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("relative w-full rounded-2xl bg-white dark:bg-[#0d0d12] border border-zinc-200/80 dark:border-zinc-800/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] opacity-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden", className)} {...props}>
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/5 pointer-events-none z-10" />
      <div className="relative z-20">{children}</div>
    </div>
  );
});
AnimatedListItem.displayName = "AnimatedListItem";`;

export function AnimatedListShowcase() {
  const [key, setKey] = useState(0);

  const notifications = [
    {
      id: 1,
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      title: "Payment Received",
      desc: "Stripe successfully processed $129.00",
      time: "2m ago",
    },
    {
      id: 2,
      icon: UserPlus,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      title: "New Signup",
      desc: "alice@example.com created a Pro account",
      time: "15m ago",
    },
    {
      id: 3,
      icon: CheckCircle2,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      title: "Deployment Successful",
      desc: "Production deployment (v2.4.1) is live",
      time: "1h ago",
    },
    {
      id: 4,
      icon: Zap,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      title: "Server Scaled",
      desc: "Auto-scaled cluster to handle traffic spike",
      time: "3h ago",
    },
  ];

  const generateUsageCode = (isTs: boolean) => {
    return `import { AnimatedList, AnimatedListItem } from "@/components/custom/blocks/AnimatedListBlock";

export default function NotificationFeed() {
  return (
    // Adjust staggerDelay to control how fast they cascade
    <AnimatedList staggerDelay={0.15}>
      
      <AnimatedListItem>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-emerald-500 font-bold">$</span>
          </div>
          <div>
            <h4 className="text-[15px] font-bold">Payment Received</h4>
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
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Watch the elements flip in via a 3D GSAP perspective stagger. Hover
            over the cards to reveal the mouse-tracking glassmorphic spotlight.
          </div>

          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-bold rounded-lg border bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center w-full sm:w-auto shadow-sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Replay Cascade
          </button>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AnimatedListBlock"
        tsCode={LIST_ENGINE_CODE_TS}
        jsCode={LIST_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex justify-center bg-[#fafafa] dark:bg-[#050505] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden py-16 relative">
          {/* Subtle Abstract Background Glows */}
          <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

          {/* Device Mockup Container */}
          <div className="w-full max-w-md bg-zinc-50 dark:bg-[#09090b]/80 backdrop-blur-2xl rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative z-10">
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md">
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">
                Activity Feed
              </h3>
              <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                Real-time system events
              </p>
            </div>

            {/* List Container */}
            <div className="p-4 sm:p-5">
              <AnimatedList key={key} staggerDelay={0.15}>
                {notifications.map((notif) => (
                  <AnimatedListItem key={notif.id}>
                    <div className="flex items-center gap-4">
                      {/* Icon Container with Hover Bounce */}
                      <div
                        className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                          notif.bg,
                          notif.color,
                        )}
                      >
                        <notif.icon
                          className="w-[22px] h-[22px]"
                          strokeWidth={2.5}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-[14.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {notif.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-zinc-400 flex-shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {notif.desc}
                        </p>
                      </div>
                    </div>
                  </AnimatedListItem>
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
