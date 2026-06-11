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

export interface AnimatedListProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  animationDelay?: number;
  ease?: string;
  duration?: number;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(({ children, staggerDelay = 0.1, animationDelay = 0, ease = "back.out(1.2)", duration = 0.6, className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    gsap.set(items, { opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" });
    gsap.to(items, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration, ease, stagger: staggerDelay, delay: animationDelay });
    return () => { gsap.killTweensOf(items); };
  }, [staggerDelay, animationDelay, ease, duration]);

  return (<div ref={containerRef} className={cn("flex flex-col gap-3", className)} {...props}>{children}</div>);
});
AnimatedList.displayName = "AnimatedList";

export interface AnimatedListItemProps extends React.HTMLAttributes<HTMLDivElement> {}
export const AnimatedListItem = forwardRef<HTMLDivElement, AnimatedListItemProps>(({ children, className, ...props }, ref) => {
  return (<div ref={ref} className={cn("w-full rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 p-4 shadow-sm backdrop-blur-sm opacity-0", className)} {...props}>{children}</div>);
});
AnimatedListItem.displayName = "AnimatedListItem";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const LIST_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";

export const AnimatedList = forwardRef(({ children, staggerDelay = 0.1, animationDelay = 0, ease = "back.out(1.2)", duration = 0.6, className, ...props }, ref) => {
  const containerRef = useRef(null);
  React.useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    gsap.set(items, { opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" });
    gsap.to(items, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration, ease, stagger: staggerDelay, delay: animationDelay });
    return () => { gsap.killTweensOf(items); };
  }, [staggerDelay, animationDelay, ease, duration]);

  return (<div ref={containerRef} className={cn("flex flex-col gap-3", className)} {...props}>{children}</div>);
});
AnimatedList.displayName = "AnimatedList";

export const AnimatedListItem = forwardRef(({ children, className, ...props }, ref) => {
  return (<div ref={ref} className={cn("w-full rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 p-4 shadow-sm backdrop-blur-sm opacity-0", className)} {...props}>{children}</div>);
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-600 font-bold">$</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Payment Received</h4>
            <p className="text-xs text-gray-500">$129.00 via Stripe</p>
          </div>
        </div>
      </AnimatedListItem>

      <AnimatedListItem>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">+</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold">New User Signup</h4>
            <p className="text-xs text-gray-500">alice@example.com</p>
          </div>
        </div>
      </AnimatedListItem>

    </AnimatedList>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
            Watch the elements seamlessly stagger in via GSAP. Perfect for live
            feeds, feature lists, or testimonials.
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
        <div className="w-full flex justify-center bg-[#fbfbfb] dark:bg-[#050505] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden py-16 relative">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />

          {/* Device Mockup Container */}
          <div className="w-full max-w-md bg-zinc-50 dark:bg-[#09090b] rounded-3xl border border-zinc-200 dark:border-zinc-800/80 shadow-2xl overflow-hidden relative z-10">
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Activity Feed
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Live updates from your workspace
              </p>
            </div>

            {/* List Container */}
            <div className="p-4 bg-zinc-50 dark:bg-[#09090b]">
              <AnimatedList key={key} staggerDelay={0.12}>
                {notifications.map((notif) => (
                  <AnimatedListItem key={notif.id}>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          notif.bg,
                          notif.color,
                        )}
                      >
                        <notif.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {notif.title}
                          </h4>
                          <span className="text-[11px] text-zinc-400 flex-shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
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
