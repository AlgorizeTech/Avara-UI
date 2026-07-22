"use client";

import React, { useState } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { VerifyBadge, VerifyBadgeProps } from "@/components/custom/blocks/VerifyBadgeBlock";

const VERIFY_BADGE_TS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface VerifyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "blue" | "gold" | "dark" | "gray";
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

export const VerifyBadge = React.forwardRef<HTMLDivElement, VerifyBadgeProps>(
  (
    { variant = "blue", size = "md", animate = false, className, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    };

    const iconSizeClasses = {
      sm: "w-2.5 h-2.5",
      md: "w-3 h-3",
      lg: "w-3.5 h-3.5",
      xl: "w-4 h-4",
    };

    const variantStyles = {
      blue: "text-[#1d9bf0]", // Twitter/X Blue
      gold: "text-[#eab308]", // Verified Org Gold
      dark: "text-slate-900 dark:text-white", // Dark/White theme
      gray: "text-slate-400 dark:text-slate-500", // Generic unverified or subtle
    };

    const bgVariantStyles = {
      blue: "bg-[#1d9bf0]",
      gold: "bg-[#eab308]",
      dark: "bg-slate-900 dark:bg-white",
      gray: "bg-slate-400 dark:bg-slate-500",
    };

    const checkColors = {
      blue: "text-white",
      gold: "text-white",
      dark: "text-white dark:text-slate-900",
      gray: "text-white",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center flex-shrink-0 group",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Animated Shine/Ping effect */}
        {animate && (
          <div
            className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity",
              bgVariantStyles[variant]
            )}
          />
        )}
        
        {/* Badge SVG shape */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn("absolute inset-0 w-full h-full", variantStyles[variant])}
          style={{
            filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))",
          }}
        >
          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.92-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.92 1.79-3.92 4 0 .495.084.965.238 1.4-1.274.65-2.148 2.02-2.148 3.6 0 1.46.74 2.76 1.87 3.45-.094.347-.144.712-.144 1.09 0 2.21 1.71 4 3.92 4 .55 0 1.07-.12 1.54-.33.64 1.25 1.93 2.13 3.44 2.13 1.51 0 2.8-.88 3.44-2.13.47.21 1 .33 1.55.33 2.21 0 3.92-1.79 3.92-4 0-.378-.05-.743-.144-1.09 1.13-.69 1.87-1.99 1.87-3.45z" />
        </svg>

        {/* Checkmark inside */}
        <Check
          className={cn(
            "relative z-10 stroke-[4]",
            iconSizeClasses[size],
            checkColors[variant]
          )}
        />
      </div>
    );
  }
);

VerifyBadge.displayName = "VerifyBadge";
`;

const VERIFY_BADGE_JS = VERIFY_BADGE_TS
  .replace(/export interface VerifyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {[^}]+\}/g, "")
  .replace(/<HTMLDivElement, VerifyBadgeProps>/g, "")
  .replace(/,\n    ref\n  \) => {/g, ", ref) => {");

export function VerifyBadgeShowcase() {
  const [variant, setVariant] = useState<VerifyBadgeProps["variant"]>("blue");
  const [size, setSize] = useState<VerifyBadgeProps["size"]>("lg");
  const [animate, setAnimate] = useState<boolean>(true);

  const getUsageCode = (isTs: boolean) => {
    return `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function App() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">Elon Musk</span>
      <VerifyBadge variant="${variant}" size="${size}"${animate ? " animate" : ""} />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["blue", "gold", "dark", "gray"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
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

        {/* Size Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Size
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md uppercase transition-all ${
                  size === s
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Animation Toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Animation
          </label>
          <div className="flex items-center gap-3 h-[36px]">
            <button
              type="button"
              role="switch"
              aria-checked={animate}
              onClick={() => setAnimate(!animate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
                animate ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  animate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {animate ? "Pulse ON" : "Pulse OFF"}
            </span>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="VerifyBadge"
        tsCode={VERIFY_BADGE_TS}
        jsCode={VERIFY_BADGE_JS}
        usageCode={getUsageCode(true)}
        jsUsageCode={getUsageCode(false)}
      >
        <div className="w-full min-h-[300px] bg-white dark:bg-black rounded-2xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center p-8 gap-4">
          <div className="flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse overflow-hidden">
               <img src="https://github.com/shadcn.png" alt="Avatar" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">AlgorizeTech</span>
                <VerifyBadge variant={variant} size={size} animate={animate} />
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">@algorizetech</span>
            </div>
            <button className="ml-4 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-medium hover:opacity-90">
              Follow
            </button>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
