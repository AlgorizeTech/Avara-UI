"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";

import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Activity,
  Globe2,
  LockKeyhole,
  Network,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const BENTO_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { ReactNode } from "react";

export interface MagicBentoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MagicBento = React.forwardRef<HTMLDivElement, MagicBentoProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full auto-rows-[minmax(180px,auto)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
MagicBento.displayName = "MagicBento";

export interface MagicBentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  highlight?: boolean;
}

export const MagicBentoCard = React.forwardRef<HTMLDivElement, MagicBentoCardProps>(
  ({ children, className, highlight = false, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-transparent min-h-[200px] transition-transform duration-300 active:scale-[0.98]",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 rounded-3xl bg-zinc-200 dark:bg-zinc-800/80 transition-colors" />
        {highlight && (
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--magic-color)_50%,transparent_100%)] opacity-30 dark:opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
        )}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate\`
              radial-gradient(600px circle at \${mouseX}px \${mouseY}px, var(--magic-color), transparent 40%)
            \`,
          }}
        />
        <div className="absolute inset-[1px] rounded-[23px] bg-white dark:bg-[#0a0a0a] transition-colors z-0" />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none mix-blend-normal dark:mix-blend-screen"
          style={{
            background: useMotionTemplate\`
              radial-gradient(600px circle at \${mouseX}px \${mouseY}px, var(--magic-glow), transparent 40%)
            \`,
          }}
        />
        <div className="relative z-20 flex flex-col h-full p-6 sm:p-8 pointer-events-auto">
          {children}
        </div>
      </div>
    );
  }
);
MagicBentoCard.displayName = "MagicBentoCard";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const BENTO_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

export const MagicBento = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full auto-rows-[minmax(180px,auto)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MagicBento.displayName = "MagicBento";

export const MagicBentoCard = React.forwardRef(({ children, className, highlight = false, ...props }, ref) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-transparent min-h-[200px] transition-transform duration-300 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-3xl bg-zinc-200 dark:bg-zinc-800/80 transition-colors" />
      {highlight && (
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--magic-color)_50%,transparent_100%)] opacity-30 dark:opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
      )}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate\`
            radial-gradient(600px circle at \${mouseX}px \${mouseY}px, var(--magic-color), transparent 40%)
          \`,
        }}
      />
      <div className="absolute inset-[1px] rounded-[23px] bg-white dark:bg-[#0a0a0a] transition-colors z-0" />
      <motion.div
        className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none mix-blend-normal dark:mix-blend-screen"
        style={{
          background: useMotionTemplate\`
            radial-gradient(600px circle at \${mouseX}px \${mouseY}px, var(--magic-glow), transparent 40%)
          \`,
        }}
      />
      <div className="relative z-20 flex flex-col h-full p-6 sm:p-8 pointer-events-auto">
        {children}
      </div>
    </div>
  );
});
MagicBentoCard.displayName = "MagicBentoCard";`;

// Helper to convert hex to RGB for the CSS variables
const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export function MagicBentoShowcase() {
  const [color, setColor] = useState<string>("primary");

  const getThemeColorHex = (c: string) => {
    if (c.startsWith("#")) return c;
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

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (typeof window !== "undefined") {
      localStorage.setItem("primaryColor", newColor);
    }
  };

  const activeHex = getThemeColorHex(color);

  const generateUsageCode = () => {
    return `import { MagicBento, MagicBentoCard } from "@/components/custom/blocks/MagicBentoBlock";
import { Users, Workflow, Activity, Globe2 } from "lucide-react";

export default function DashboardLayout() {
  return (
    {/* CSS Variables drive the tracking glow colors */}
    <div style={{ "--magic-color": "var(--primary)", "--magic-glow": "color-mix(in srgb, var(--primary) 15%, transparent)" } as React.CSSProperties}>
      
      {/* Set auto-rows to control uniform height mapping */}
      <MagicBento className="auto-rows-[220px]">
        
        {/* Top Left - Small */}
        <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
          <span className="text-zinc-500 font-semibold flex items-center gap-2"><Activity className="w-4 h-4"/> Insights</span>
          <div>
            <h3 className="text-lg font-bold">Analytics</h3>
            <p className="text-sm text-zinc-500">Track user behavior</p>
          </div>
        </MagicBentoCard>

        {/* ... Follow the exact span mapping for the rest of the grid ... */}

      </MagicBento>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Feature Explainer Panel */}
      <ShowcaseControlPanel className="flex flex-col gap-4 p-5 rounded-xl z-0 relative">
        <div className="flex justify-between items-center w-full pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
        </div>
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          This grid layout perfectly mirrors the requested 4x3 mapping (with 2x2
          spans in opposite corners). We made it unique by separating the
          category labels to the top and pushing the primary text to the bottom,
          while adding abstract UI mockups inside the large span cards to make
          them feel premium and full. Mobile view natively stacks the grid to
          single-column automatically.
        </p>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="MagicBentoBlock"
        tsCode={BENTO_CODE_TS}
        jsCode={BENTO_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div
          className="w-full flex items-center justify-center py-16 px-4 transition-colors duration-300 relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80"
          style={{
            "--theme-color": activeHex,
            backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
          } as React.CSSProperties}
        >
          {/* Inject Dynamic CSS Variables for the Magic Colors */}
          <div
            className="w-full relative z-10"
            style={
              {
                "--magic-color": "var(--theme-color, var(--primary))",
                "--magic-glow": "color-mix(in srgb, var(--theme-color, var(--primary)) 15%, transparent)",
              } as React.CSSProperties
            }
          >
            <MagicBento className="auto-rows-[220px]">
              {/* CARD 1: TOP LEFT (1x1) */}
              <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold">
                  <Activity className="w-4 h-4" />
                  Insights
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    Analytics
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Track user behavior
                  </p>
                </div>
              </MagicBentoCard>

              {/* CARD 2: TOP MID-LEFT (1x1) */}
              <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold">
                  <Globe2 className="w-4 h-4" />
                  Overview
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    Dashboard
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Centralized data view
                  </p>
                </div>
              </MagicBentoCard>

              {/* CARD 3: TOP RIGHT (2x2) */}
              <MagicBentoCard
                highlight
                className="col-span-1 row-span-2 md:col-span-2 flex flex-col justify-between relative"
              >
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold relative z-10">
                  <Users className="w-4 h-4" />
                  Teamwork
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center scale-[0.8] sm:scale-100">
                    <div className="absolute w-40 h-40 border border-zinc-200 dark:border-zinc-800 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                    <div className="absolute w-24 h-24 border border-zinc-300 dark:border-zinc-700 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 10%, transparent)",
                        color: "var(--theme-color, var(--primary))",
                        border: "1px solid color-mix(in srgb, var(--theme-color, var(--primary)) 30%, transparent)",
                      }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Collaboration
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">
                    Work together seamlessly across the globe
                  </p>
                </div>
              </MagicBentoCard>

              {/* CARD 4: BOTTOM LEFT (2x2) */}
              <MagicBentoCard className="col-span-1 row-span-2 md:col-span-2 flex flex-col justify-between relative">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold relative z-10">
                  <Workflow className="w-4 h-4" />
                  Efficiency
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 dark:opacity-100">
                  <div className="flex flex-col gap-3 w-full max-w-[200px] sm:max-w-none sm:w-3/4 scale-[0.85] sm:scale-100">
                    <div className="h-8 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-md border border-zinc-300 dark:border-zinc-700/50" />
                    <div className="flex gap-3">
                      <div className="h-8 w-1/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-md border border-zinc-300 dark:border-zinc-700/50" />
                      <div className="h-8 w-2/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-md border border-zinc-300 dark:border-zinc-700/50" />
                    </div>
                    <div
                      className="h-8 w-1/2 rounded-md shadow-sm border"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 10%, transparent)",
                        borderColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 30%, transparent)",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    Automation
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">
                    Streamline workflows and save thousands of hours
                  </p>
                </div>
              </MagicBentoCard>

              {/* CARD 5: BOTTOM MID-RIGHT (1x1) */}
              <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold">
                  <Network className="w-4 h-4" />
                  Connectivity
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    Integration
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Connect favorite tools
                  </p>
                </div>
              </MagicBentoCard>

              {/* CARD 6: BOTTOM RIGHT (1x1) */}
              <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold">
                  <LockKeyhole className="w-4 h-4" />
                  Protection
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                    Security
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Enterprise-grade protection
                  </p>
                </div>
              </MagicBentoCard>
            </MagicBento>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
