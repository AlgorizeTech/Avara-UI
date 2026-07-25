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
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("lg");
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
            
            {/* Custom Color Picker */}
            <div className="relative flex items-center justify-center w-6 h-6 ml-1 group">
              <input
                type="color"
                value={color.startsWith("#") ? color : "#1d9bf0"}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                title="Custom Color"
              />
              <div
                className={`w-full h-full rounded-full border-2 transition-all duration-200 overflow-hidden ${
                  !["#1d9bf0", "#eab308", "#0f172a", "#94a3b8"].includes(color)
                    ? "border-zinc-400 dark:border-zinc-500 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "border-dashed border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 group-hover:scale-110"
                }`}
              >
                <div
                  className="w-full h-full pointer-events-none"
                  style={{ backgroundColor: color.startsWith("#") ? color : "transparent" }}
                />
              </div>
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
        <div className="w-full min-h-[300px] bg-white dark:bg-black rounded-2xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center p-8 gap-4">
          <div className="flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse overflow-hidden">
               <img src="https://github.com/shadcn.png" alt="Avatar" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">AlgorizeTech</span>
                <VerifyBadge color={color} size={size} animate={animate} />
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
