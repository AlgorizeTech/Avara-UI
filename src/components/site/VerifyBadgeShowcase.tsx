"use client";

import React, { useState, useEffect } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { VerifyBadge, VerifyBadgeProps } from "@/components/custom/blocks/VerifyBadgeBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

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
  const [color, setColor] = useState<string>("primary"); // Default primary
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [animate, setAnimate] = useState<boolean>(true);

  const getThemeColorHex = (c: string) => {
    if (c.startsWith('#')) return c;
    const map: Record<string, string> = {
      primary: "var(--primary)",
      default: "var(--primary)",
      indigo: "#6366f1",
      rose: "#f43f5e",
      emerald: "#10b981",
      zinc: "#18181b",
    };
    return map[c] || "var(--primary)";
  };

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

  // Helper to handle both preset colors and custom hex colors
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (typeof window !== "undefined") {
      localStorage.setItem("primaryColor", newColor);
    }
  };

  useEffect(() => {
    let stateColor = "blue";
    if (color === "#eab308") stateColor = "gold";
    if (color === "#0f172a" || color === "#f8fafc" || color === "rgb(15, 23, 42)") stateColor = "dark";
    if (color === "#94a3b8") stateColor = "gray";
    
    document.body.setAttribute("data-active-vstate", `${stateColor}-${size}-${animate}`);
    
    // Dispatch custom event for the Docs Updater
    const event = new CustomEvent("verify-badge-change", {
      detail: { color: getThemeColorHex(color), size, animate }
    });
    window.dispatchEvent(event);
    
    return () => {
      document.body.removeAttribute("data-active-vstate");
    };
  }, [color, size, animate]);

  const getUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? ` color="${color}"` : "";
    return `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function ProfilePage() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">Elon Musk</span>
      <VerifyBadge${colorPropStr} size="${size}" animate={${animate}} />
    </div>
  );
};`;
  };

  const activeHex = getThemeColorHex(color);

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <VariantTabs
          label="Size"
          variants={["sm", "md", "lg", "xl"]}
          defaultValue="md"
          onValueChange={(v) => setSize(v as "sm" | "md" | "lg" | "xl")}
        />
        <VariantTabs
          label="Animation"
          variants={["ON", "OFF"]}
          defaultValue="ON"
          onValueChange={(v) => setAnimate(v === "ON")}
        />

        {/* Color */}
        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="VerifyBadge"
        tsCode={VERIFY_BADGE_TS}
        jsCode={VERIFY_BADGE_JS}
        usageCode={getUsageCode(true)}
        jsUsageCode={getUsageCode(false)}
        sandbox="verify-badge"
        sandboxProps={{ color, size, animate }}
      >
        <div className="w-full min-h-[380px] flex flex-col items-center justify-center overflow-hidden">
          {/* Chat Notification Card */}
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 min-w-0">
            
            {/* Desktop Bot Avatar */}
            <div className="hidden sm:flex flex-shrink-0 mt-0.5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: activeHex }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
                </svg>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex flex-col w-full min-w-0">
              
              {/* Header */}
              <div className="flex items-center gap-2 flex-wrap min-w-0 w-full">
                {/* Mobile Bot Avatar */}
                <div
                  className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0"
                  style={{ backgroundColor: activeHex }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
                  </svg>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm sm:text-[15px] tracking-tight truncate">AlgorizeSystem</span>
                <VerifyBadge color={activeHex} size={size} animate={animate} />
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider border shrink-0"
                  style={{
                    backgroundColor: activeHex.startsWith('#') ? `${activeHex}20` : `color-mix(in srgb, ${activeHex} 15%, transparent)`,
                    borderColor: activeHex.startsWith('#') ? `${activeHex}30` : `color-mix(in srgb, ${activeHex} 30%, transparent)`,
                    color: activeHex,
                  }}
                >
                  Bot
                </span>
                <span className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium shrink-0">Today at 2:34 PM</span>
              </div>

              {/* Text */}
              <p className="mt-2 sm:mt-1 text-zinc-800 dark:text-zinc-200 text-xs sm:text-[15px] leading-relaxed break-words">
                Deployment <span className="font-semibold hover:underline cursor-pointer" style={{ color: activeHex }}>#421</span> to <strong>production</strong> completed successfully.
              </p>

              {/* Embed Box */}
              <div className="mt-3 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 relative overflow-hidden min-w-0">
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: activeHex }}></div>
                <div className="flex flex-col gap-1 ml-1 min-w-0 flex-1">
                  <span className="font-semibold text-xs sm:text-[14px] text-zinc-900 dark:text-zinc-50 tracking-tight">Build Passed 🚀</span>
                  <span className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug break-words">
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
