"use client";

import {
  SkeletonAnimation,
  SkeletonBlock,
  SkeletonVariant,
} from "@/components/custom/blocks/SkeletonBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const SKELETON_ENGINE_CODE_TS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SkeletonVariant = "rect" | "circle" | "text" | "profile" | "card" | "custom";
export type SkeletonAnimation = "pulse" | "shimmer" | "none";

export interface SkeletonBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
}

export function SkeletonBlock({ variant = "rect", animation = "shimmer", width, height, radius, className, style, ...props }: SkeletonBlockProps) {
  const baseClasses = cn("relative overflow-hidden bg-zinc-200 dark:bg-zinc-800/80", animation === "pulse" && "animate-pulse");

  const ShimmerLayer = () => {
    if (animation !== "shimmer") return null;
    return (
      <>
        <style>{\`@keyframes shimmer-slide { 100% { transform: translateX(100%); } } .animate-shimmer-slide { animation: shimmer-slide 1.5s infinite linear; }\`}</style>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer-slide z-10" />
      </>
    );
  };

  if (variant === "profile") {
    return (
      <div className={cn("flex items-center gap-4 w-full", className)} style={style} {...props}>
        <div className={cn(baseClasses, "w-12 h-12 rounded-full shrink-0")}><ShimmerLayer /></div>
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
          <div className={cn(baseClasses, "h-4 w-full rounded-md")}><ShimmerLayer /></div>
          <div className={cn(baseClasses, "h-3 w-2/3 rounded-md")}><ShimmerLayer /></div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("flex flex-col gap-3 w-full max-w-sm p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#050505]", className)} style={style} {...props}>
        <div className={cn(baseClasses, "w-full h-40 rounded-xl mb-2")}><ShimmerLayer /></div>
        <div className={cn(baseClasses, "h-5 w-3/4 rounded-md")}><ShimmerLayer /></div>
        <div className={cn(baseClasses, "h-4 w-full rounded-md")}><ShimmerLayer /></div>
        <div className={cn(baseClasses, "h-4 w-5/6 rounded-md")}><ShimmerLayer /></div>
      </div>
    );
  }

  const atomicClasses = cn(baseClasses, variant === "circle" && !radius && "rounded-full w-12 h-12", variant === "text" && !height && "h-4 w-full", variant === "text" && !radius && "rounded-md", variant === "rect" && !height && "min-h-[100px] w-full", variant === "rect" && !radius && "rounded-xl", className);
  const customStyles: React.CSSProperties = { ...style, width: width ?? style?.width, height: height ?? style?.height, borderRadius: radius ?? style?.borderRadius };

  return (
    <div className={atomicClasses} style={customStyles} {...props}>
      <ShimmerLayer />
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const SKELETON_ENGINE_CODE_JS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function SkeletonBlock({ variant = "rect", animation = "shimmer", width, height, radius, className, style, ...props }) {
  const baseClasses = cn("relative overflow-hidden bg-zinc-200 dark:bg-zinc-800/80", animation === "pulse" && "animate-pulse");

  const ShimmerLayer = () => {
    if (animation !== "shimmer") return null;
    return (
      <>
        <style>{\`@keyframes shimmer-slide { 100% { transform: translateX(100%); } } .animate-shimmer-slide { animation: shimmer-slide 1.5s infinite linear; }\`}</style>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer-slide z-10" />
      </>
    );
  };

  if (variant === "profile") {
    return (
      <div className={cn("flex items-center gap-4 w-full", className)} style={style} {...props}>
        <div className={cn(baseClasses, "w-12 h-12 rounded-full shrink-0")}><ShimmerLayer /></div>
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
          <div className={cn(baseClasses, "h-4 w-full rounded-md")}><ShimmerLayer /></div>
          <div className={cn(baseClasses, "h-3 w-2/3 rounded-md")}><ShimmerLayer /></div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("flex flex-col gap-3 w-full max-w-sm p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#050505]", className)} style={style} {...props}>
        <div className={cn(baseClasses, "w-full h-40 rounded-xl mb-2")}><ShimmerLayer /></div>
        <div className={cn(baseClasses, "h-5 w-3/4 rounded-md")}><ShimmerLayer /></div>
        <div className={cn(baseClasses, "h-4 w-full rounded-md")}><ShimmerLayer /></div>
        <div className={cn(baseClasses, "h-4 w-5/6 rounded-md")}><ShimmerLayer /></div>
      </div>
    );
  }

  const atomicClasses = cn(baseClasses, variant === "circle" && !radius && "rounded-full w-12 h-12", variant === "text" && !height && "h-4 w-full", variant === "text" && !radius && "rounded-md", variant === "rect" && !height && "min-h-[100px] w-full", variant === "rect" && !radius && "rounded-xl", className);
  const customStyles = { ...style, width: width ?? style?.width, height: height ?? style?.height, borderRadius: radius ?? style?.borderRadius };

  return (
    <div className={atomicClasses} style={customStyles} {...props}>
      <ShimmerLayer />
    </div>
  );
}`;

export function SkeletonShowcase() {
  const [variant, setVariant] = useState<SkeletonVariant>("card");
  const [animation, setAnimation] = useState<SkeletonAnimation>("shimmer");

  const generateUsageCode = (isTs: boolean) => {
    if (variant === "custom") {
      return `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function CustomDashboardLoader() {
  return (
    <div className="flex gap-4">
      {/* Build any layout using exact width/height/radius props */}
      <SkeletonBlock width={64} height={64} radius="1rem" animation="${animation}" />
      <div className="flex flex-col gap-2">
        <SkeletonBlock width={200} height={16} radius="4px" animation="${animation}" />
        <SkeletonBlock width={140} height={16} radius="4px" animation="${animation}" />
        <SkeletonBlock width={80} height={12} radius="4px" animation="${animation}" />
      </div>
    </div>
  );
}`;
    }

    return `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function LoadingState() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SkeletonBlock 
        variant="${variant}" 
        animation="${animation}" 
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col md:flex-row gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Component Variant
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(
              [
                "card",
                "profile",
                "rect",
                "text",
                "circle",
                "custom",
              ] as SkeletonVariant[]
            ).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Animation Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Animation Style
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(["shimmer", "pulse", "none"] as SkeletonAnimation[]).map((a) => (
              <button
                key={a}
                onClick={() => setAnimation(a)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  animation === a
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SkeletonBlock"
        tsCode={SKELETON_ENGINE_CODE_TS}
        jsCode={SKELETON_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          {variant === "custom" ? (
            <div className="flex gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900 shadow-sm w-full max-w-sm">
              <SkeletonBlock
                width={64}
                height={64}
                radius="1rem"
                animation={animation}
                variant="custom"
              />
              <div className="flex flex-col gap-2 flex-1 pt-1">
                <SkeletonBlock
                  width="100%"
                  height={16}
                  radius="4px"
                  animation={animation}
                  variant="custom"
                />
                <SkeletonBlock
                  width="70%"
                  height={16}
                  radius="4px"
                  animation={animation}
                  variant="custom"
                />
                <SkeletonBlock
                  width="40%"
                  height={12}
                  radius="4px"
                  animation={animation}
                  variant="custom"
                  className="mt-2"
                />
              </div>
            </div>
          ) : (
            <SkeletonBlock
              key={`${variant}-${animation}`}
              variant={variant}
              animation={animation}
              className={variant === "rect" ? "max-w-md w-full h-48" : ""}
            />
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
