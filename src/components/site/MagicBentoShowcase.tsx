"use client";

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
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const BENTO_CODE_TS = `/* Exposes the full MagicBentoBlock architecture natively via module export */`;
const BENTO_CODE_JS = `/* Exposes the full MagicBentoBlock architecture natively via module export */`;

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
    : "255, 171, 29"; // Default to primaryColor from context
};

export function MagicBentoShowcase() {
  const [color, setColor] = useState<string>("#FFAB1D"); // Setup based on user summary context

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

  const activeHex = color;
  const rgb = hexToRgb(activeHex);

  const generateUsageCode = () => {
    return `import { MagicBento, MagicBentoCard } from "@/components/custom/blocks/MagicBentoBlock";
import { Users, Workflow, Activity, Globe2 } from "lucide-react";

export default function DashboardLayout() {
  return (
    {/* CSS Variables drive the tracking glow colors */}
    <div style={{ "--magic-color": "rgba(255,171,29,1)", "--magic-glow": "rgba(255,171,29,0.15)" } as React.CSSProperties}>
      
      {/* Set auto-rows to control uniform height mapping */}
      <MagicBento className="auto-rows-[240px]">
        
        {/* Top Left - Small */}
        <MagicBentoCard className="lg:col-span-1 lg:row-span-1 flex flex-col justify-between">
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
      <div className="flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          This grid layout perfectly mirrors the requested 4x3 mapping (with 2x2
          spans in opposite corners). We made it unique by separating the
          category labels to the top and pushing the primary text to the bottom,
          while adding abstract UI mockups inside the large span cards to make
          them feel premium and full.
        </p>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="MagicBentoBlock"
        tsCode={BENTO_CODE_TS}
        jsCode={BENTO_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#020202] py-16 px-4 transition-colors duration-300 relative overflow-hidden">
          {/* Inject Dynamic CSS Variables for the Magic Colors */}
          <div
            className="w-full relative z-10"
            style={
              {
                "--magic-color": `rgba(${rgb}, 1)`,
                "--magic-glow": `rgba(${rgb}, 0.12)`,
              } as React.CSSProperties
            }
          >
            {/* Set a fixed auto-row height so the 2x2 spans look perfectly symmetrical */}
            <MagicBento className="auto-rows-[220px]">
              {/* ============================== */}
              {/* CARD 1: TOP LEFT (1x1)         */}
              {/* ============================== */}
              <MagicBentoCard className="col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col justify-between">
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

              {/* ============================== */}
              {/* CARD 2: TOP MID-LEFT (1x1)     */}
              {/* ============================== */}
              <MagicBentoCard className="col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col justify-between">
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

              {/* ============================== */}
              {/* CARD 3: TOP RIGHT (2x2)        */}
              {/* ============================== */}
              <MagicBentoCard
                highlight
                className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between relative"
              >
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold relative z-10">
                  <Users className="w-4 h-4" />
                  Teamwork
                </div>

                {/* Decorative Visual inside Large Card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-40 h-40 border border-zinc-200 dark:border-zinc-800 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                    <div className="absolute w-24 h-24 border border-zinc-300 dark:border-zinc-700 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: `rgba(${rgb}, 0.1)`,
                        color: activeHex,
                        border: `1px solid rgba(${rgb}, 0.3)`,
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

              {/* ============================== */}
              {/* CARD 4: BOTTOM LEFT (2x2)      */}
              {/* ============================== */}
              <MagicBentoCard className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between relative">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-semibold relative z-10">
                  <Workflow className="w-4 h-4" />
                  Efficiency
                </div>

                {/* Decorative Pipeline Mockup */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 dark:opacity-100">
                  <div className="flex flex-col gap-3 w-3/4">
                    <div className="h-8 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-md border border-zinc-300 dark:border-zinc-700/50" />
                    <div className="flex gap-3">
                      <div className="h-8 w-1/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-md border border-zinc-300 dark:border-zinc-700/50" />
                      <div className="h-8 w-2/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-md border border-zinc-300 dark:border-zinc-700/50" />
                    </div>
                    <div
                      className="h-8 w-1/2 rounded-md shadow-sm border"
                      style={{
                        backgroundColor: `rgba(${rgb}, 0.1)`,
                        borderColor: `rgba(${rgb}, 0.3)`,
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

              {/* ============================== */}
              {/* CARD 5: BOTTOM MID-RIGHT (1x1) */}
              {/* ============================== */}
              <MagicBentoCard className="col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col justify-between">
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

              {/* ============================== */}
              {/* CARD 6: BOTTOM RIGHT (1x1)     */}
              {/* ============================== */}
              <MagicBentoCard className="col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col justify-between">
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
