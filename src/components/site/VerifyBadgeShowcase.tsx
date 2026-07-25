"use client";

import React, { useState, useEffect } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { VerifyBadge, VerifyBadgeProps } from "@/components/custom/blocks/VerifyBadgeBlock";

const VERIFY_BADGE_TS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface VerifyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

export const VerifyBadge = React.forwardRef<HTMLDivElement, VerifyBadgeProps>(
  (
    { color = "#1d9bf0", size = "md", animate = false, className, ...props },
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
            className="absolute inset-0 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: color }}
          />
        )}
        
        {/* Badge SVG shape (Twitter-like decagon/star) */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute inset-0 w-full h-full"
          style={{
            color: color,
            filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))",
          }}
        >
          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.92-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.92 1.79-3.92 4 0 .495.084.965.238 1.4-1.274.65-2.148 2.02-2.148 3.6 0 1.46.74 2.76 1.87 3.45-.094.347-.144.712-.144 1.09 0 2.21 1.71 4 3.92 4 .55 0 1.07-.12 1.54-.33.64 1.25 1.93 2.13 3.44 2.13 1.51 0 2.8-.88 3.44-2.13.47.21 1 .33 1.55.33 2.21 0 3.92-1.79 3.92-4 0-.378-.05-.743-.144-1.09 1.13-.69 1.87-1.99 1.87-3.45z" />
        </svg>

        {/* Checkmark inside */}
        <Check
          className={cn(
            "relative z-10 stroke-[4] text-white",
            iconSizeClasses[size]
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
  const [color, setColor] = useState<string>("#1d9bf0"); // Default blue
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [animate, setAnimate] = useState<boolean>(true);

  // Helper to handle both preset colors and custom hex colors
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  useEffect(() => {
    // If the color matches a preset, we could use that for vstate, but let's just 
    // try to map it to a predefined state name if it's one of the 4 original ones 
    // so the MDX toggle still works for the predefined ones (blue/gold/dark/gray)
    let stateColor = "blue";
    if (color === "#eab308") stateColor = "gold";
    if (color === "#0f172a" || color === "#f8fafc" || color === "rgb(15, 23, 42)") stateColor = "dark";
    if (color === "#94a3b8") stateColor = "gray";
    
    document.body.setAttribute("data-active-vstate", `${stateColor}-${size}-${animate}`);
    
    // Dispatch custom event for the Docs Updater
    const event = new CustomEvent("verify-badge-change", {
      detail: { color, size, animate }
    });
    window.dispatchEvent(event);
    
    return () => {
      document.body.removeAttribute("data-active-vstate");
    };
  }, [color, size, animate]);

  const getUsageCode = (isTs: boolean) => {
    return `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function ProfilePage() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">Elon Musk</span>
      <VerifyBadge color="${color}" size="${size}" animate={${animate}} />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        


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
                className={`px-4 py-1.5 text-sm font-medium rounded-md uppercase transition-all cursor-pointer ${
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
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {[
              { label: "ON", value: true },
              { label: "OFF", value: false }
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAnimate(opt.value)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  animate === opt.value
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Theme Color
          </label>
          <div className="flex items-center gap-2 h-[36px]">
            {[
              { id: "#1d9bf0", bg: "bg-[#1d9bf0]" },
              { id: "#eab308", bg: "bg-[#eab308]" },
              { id: "#0f172a", bg: "bg-slate-900 dark:bg-slate-100" },
              { id: "#94a3b8", bg: "bg-slate-400" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => handleColorChange(c.id)}
                className={`w-6 h-6 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}
            <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />

            {/* Custom Color Picker */}
            <div
              className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                !["#1d9bf0", "#eab308", "#0f172a", "#94a3b8"].includes(color)
                  ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500"
                  : "border-zinc-300 dark:border-zinc-700 hover:scale-110"
              }`}
            >
              <input
                type="color"
                value={!["#1d9bf0", "#eab308", "#0f172a", "#94a3b8"].includes(color) ? color : "#8b5cf6"}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-[-10px] w-12 h-12 cursor-pointer opacity-0"
                title="Custom Hex Color"
              />
              <div
                className="w-full h-full pointer-events-none"
                style={{
                  backgroundColor: !["#1d9bf0", "#eab308", "#0f172a", "#94a3b8"].includes(color)
                    ? color
                    : "transparent",
                }}
              />
            </div>
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
        <div className="w-full min-h-[380px] bg-zinc-50/50 dark:bg-[#09090b] rounded-2xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center p-8">
          
          {/* Chat Notification Card */}
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex gap-4 transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50">
            
            {/* Bot Avatar */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-inner">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
                </svg>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex flex-col w-full">
              
              {/* Header */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-zinc-900 dark:text-zinc-50 text-[15px] tracking-tight">AlgorizeSystem</span>
                <VerifyBadge color={color} size={size} animate={animate} />
                <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider ml-0.5">
                  Bot
                </span>
                <span className="text-[13px] text-zinc-500 dark:text-zinc-400 ml-1 font-medium">Today at 2:34 PM</span>
              </div>

              {/* Text */}
              <p className="mt-1 text-zinc-800 dark:text-zinc-200 text-[15px] leading-relaxed">
                Deployment <span className="text-blue-500 hover:underline cursor-pointer">#421</span> to <strong>production</strong> completed successfully.
              </p>

              {/* Embed Box */}
              <div className="mt-3 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3.5 flex items-start gap-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                <div className="flex flex-col gap-1 ml-1">
                  <span className="font-semibold text-[14px] text-zinc-900 dark:text-zinc-50 tracking-tight">Build Passed 🚀</span>
                  <span className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug">
                    All 142 tests passed in 12s. The latest preview is now live on Vercel.
                  </span>
                </div>
              </div>

            </div>

          </div>
          
        </div>
      </ComponentPreview>
    </div>
  );
}
