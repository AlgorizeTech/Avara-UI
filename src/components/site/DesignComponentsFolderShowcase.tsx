"use client";

import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";
import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";
import { useState } from "react";

const DESIGN_COMPONENTS_TS = `"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bot,
  Check,
  Copy,
  Lock,
  Send,
  Sparkles,
  Terminal,
} from "lucide-react";
import { motion } from "motion/react";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

export interface DesignComponentsFolderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultTab?: "ai" | "chart" | "auth" | "terminal";
}

const sampleChartData = [
  { label: "Mon", value: 3400 },
  { label: "Tue", value: 4200 },
  { label: "Wed", value: 3100 },
  { label: "Thu", value: 5600 },
  { label: "Fri", value: 4800 },
  { label: "Sat", value: 6200 },
  { label: "Sun", value: 7400 },
];

export const DesignComponentsFolder = forwardRef<
  HTMLDivElement,
  DesignComponentsFolderProps
>(({ defaultTab = "ai", className, ...props }, ref) => {
  const [activeTab, setActiveTab] = useState<
    "ai" | "chart" | "auth" | "terminal"
  >(defaultTab);
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleCopyCode = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("npx docs-ui@latest init");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-[1050px] mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/80 gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="hidden xs:flex items-center gap-2 text-xs font-semibold text-muted-foreground ml-2 px-2.5 py-0.5 rounded-md bg-background/50 border border-border/40">
            <Sparkles className="size-3.5 text-primary" />
            <span>Interactive Design Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-background/80 p-1 rounded-lg border border-border/60 shadow-inner overflow-x-auto max-w-full no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold whitespace-nowrap",
              activeTab === "ai"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bot className="size-3.5" />
            AI Chat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("chart")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold whitespace-nowrap",
              activeTab === "chart"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart3 className="size-3.5" />
            Analytics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("auth")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold whitespace-nowrap",
              activeTab === "auth"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Lock className="size-3.5" />
            Auth
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terminal")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold whitespace-nowrap",
              activeTab === "terminal"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Terminal className="size-3.5" />
            CLI
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 min-h-[340px] flex flex-col justify-between bg-gradient-to-b from-transparent to-muted/10">
        {activeTab === "ai" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full flex flex-col h-full justify-between gap-3"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
                  <Bot className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-foreground">
                    AI Assistant
                  </h4>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                GPT-4o
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-medium py-1">
              <div className="flex gap-2 items-start">
                <div className="size-6 rounded-md bg-muted flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Bot className="size-3.5" />
                </div>
                <div className="p-2.5 rounded-2xl rounded-tl-none bg-muted/80 text-foreground max-w-[85%] leading-relaxed border border-border/40">
                  Hello! Welcome to Docs UI. How can I assist you with your
                  React project today?
                </div>
              </div>

              <div className="flex gap-2 items-start justify-end">
                <div className="p-2.5 rounded-2xl rounded-tr-none bg-primary text-primary-foreground max-w-[85%] leading-relaxed shadow-md">
                  How do I add these interactive components to my codebase?
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <div className="size-6 rounded-md bg-muted flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Bot className="size-3.5" />
                </div>
                <div className="p-2.5 rounded-2xl rounded-tl-none bg-muted/80 text-foreground max-w-[85%] leading-relaxed border border-border/40">
                  Run{" "}
                  <code className="px-1 py-0.5 rounded bg-background font-mono text-[11px] text-primary">
                    npx docs-ui@latest add &lt;component&gt;
                  </code>{" "}
                  or copy the source code directly. Zero npm lock-in!
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-background shadow-inner">
              <input
                type="text"
                placeholder="Message AI Assistant..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent px-2 text-xs text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all cursor-pointer"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "chart" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between h-full"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Weekly Growth Metrics
                </h4>
                <p className="text-[10px] text-muted-foreground">
                  Real-time data visualization
                </p>
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                +24.8%
              </span>
            </div>
            <ChartBlock
              data={sampleChartData}
              type="bar"
              color="var(--primary)"
              height={220}
              valuePrefix="$"
            />
          </motion.div>
        )}

        {activeTab === "auth" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between h-full max-w-sm mx-auto w-full"
          >
            <div>
              <div className="text-center mb-4">
                <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-2 font-bold shadow-sm">
                  <Lock className="size-4" />
                </div>
                <h4 className="text-sm font-extrabold text-foreground">
                  Welcome Back
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Enter your credentials to access your account
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2">
              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "terminal" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-border bg-[#0d1117] text-zinc-100 p-3.5 flex flex-col justify-between h-full font-mono text-xs shadow-inner"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="size-3.5 text-primary" />
                <span className="text-[11px] font-bold text-zinc-300">
                  docs-ui.sh
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="size-3" /> Copied
                  </span>
                ) : (
                  <>
                    <span>Copy</span>
                    <Copy className="size-3" />
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed text-zinc-300">
              <p>
                <span className="text-primary font-bold">$</span> npx
                docs-ui@latest init
              </p>
              <p className="text-emerald-400">
                ✔ Initialized Docs UI configuration in project root.
              </p>
              <p className="text-emerald-400">
                ✔ Installed dependencies: framer-motion, gsap, lucide-react.
              </p>
              <p>
                <span className="text-primary font-bold">$</span> npx
                docs-ui@latest add ai-chat chart-block
              </p>
              <p className="text-emerald-400">
                ✔ Copying components to src/components/custom/blocks/
              </p>
              <p className="text-emerald-400 font-bold">
                ✔ All components ready to import!
              </p>
            </div>

            <div className="pt-2 text-[10px] text-zinc-500 border-t border-zinc-800 flex items-center justify-between">
              <span>Bash / zsh</span>
              <span>Zero npm lock-in</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="px-4 py-2 bg-muted/40 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Interactive Live Component Preview
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">
          Interactive Demo
        </span>
      </div>
    </div>
  );
});

DesignComponentsFolder.displayName = "DesignComponentsFolder";
`;

const DESIGN_COMPONENTS_USAGE = `import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";

export default function DesignHubExample() {
  return <DesignComponentsFolder defaultTab="ai" />;
}`;

const DESIGN_FOLDER_BOX_TS = `"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DesignFolderBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  color?: string;
}

export const DesignFolderBox = forwardRef<
  HTMLDivElement,
  DesignFolderBoxProps
>(
  (
    {
      title = "Design",
      subtitle = "Components",
      color,
      className,
      ...props
    },
    ref
  ) => {
    const getAccentColor = (col?: string) => {
      if (!col || col === "primary" || col === "default") return undefined;
      const presets: Record<string, string> = {
        indigo: "#6366f1",
        rose: "#f43f5e",
        emerald: "#10b981",
        zinc: "#18181b",
      };
      return presets[col] || col;
    };

    const resolvedColor = getAccentColor(color);
    const customStyle: React.CSSProperties = resolvedColor
      ? ({ "--primary": resolvedColor } as React.CSSProperties)
      : {};

    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full py-4 md:py-8 overflow-hidden select-none flex justify-center items-center",
          className
        )}
        {...props}
      >
        <div className="w-full flex justify-center items-center overflow-hidden px-1 sm:px-0">
          <div className="relative w-full max-w-[960px] mx-auto h-[220px] min-[420px]:h-[260px] min-[520px]:h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] flex items-end justify-center">
            <div className="relative w-[95%] sm:w-[85%] md:w-[680px] lg:w-[780px] h-full z-30 pointer-events-none">
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 backdrop-blur-[3px] pointer-events-none"
                    style={{ clipPath: "url(#pureFolderShapeClip)" }}
                  />
                  <svg
                    className="w-full h-full relative z-10"
                    viewBox="-10 0 660 310"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <clipPath
                        id="pureFolderShapeClip"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path d="M -0.012,0.0258 C -0.012,0.0097 -0.004,0 0.012,0 L 0.500,0 C 0.525,0 0.545,0.0806 0.564,0.145 C 0.576,0.187 0.594,0.2193 0.618,0.2193 L 0.966,0.2193 C 0.975,0.2193 0.982,0.2322 0.982,0.258 L 0.939,0.9742 C 0.939,0.9903 0.933,1 0.924,1 L 0.045,1 C 0.036,1 0.030,0.9903 0.030,0.9742 Z" />
                      </clipPath>
                      <linearGradient
                        id="themePureFolderGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--primary)"
                          stopOpacity="0.75"
                        />
                        <stop
                          offset="50%"
                          stopColor="var(--primary)"
                          stopOpacity="0.82"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--primary)"
                          stopOpacity="0.9"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="
                        M -8 8
                        C -8 3, -3 0, 8 0
                        L 330 0
                        C 347 0, 360 25, 372 45
                        C 380 58, 392 68, 408 68
                        L 638 68
                        C 644 68, 648 72, 648 80
                        L 620 302
                        C 620 307, 616 310, 610 310
                        L 30 310
                        C 24 310, 20 307, 20 302
                        Z
                      "
                      fill="url(#themePureFolderGradient)"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-end pointer-events-auto">
                  <div className="relative z-10">
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground tracking-tight leading-[1.05]">
                      {title}
                      {subtitle && (
                        <>
                          <br />
                          {subtitle}
                        </>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

DesignFolderBox.displayName = "DesignFolderBox";
`;

const DESIGN_FOLDER_BOX_USAGE = `import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function FolderBoxExample() {
  return <DesignFolderBox title="Design" subtitle="Components" />;
}`;

export function DesignComponentsFolderShowcase() {
  const [color, setColor] = useState("primary");

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <ThemeColorPicker color={color} onChange={setColor} label="Accent Color" />
      </ShowcaseControlPanel>

      <ComponentPreview
        name="DesignComponentsFolder"
        tsCode={DESIGN_COMPONENTS_TS}
        jsCode={DESIGN_COMPONENTS_TS}
        usageCode={DESIGN_COMPONENTS_USAGE}
        jsUsageCode={DESIGN_COMPONENTS_USAGE}
        sandbox="design-components-folder"
        sandboxProps={{ color }}
      >
        <div className="w-full p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center rounded-2xl border border-border bg-background">
          <DesignComponentsFolder color={color} />
        </div>
      </ComponentPreview>
    </div>
  );
}

export function DesignFolderBoxShowcase() {
  const [color, setColor] = useState("primary");

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <ThemeColorPicker color={color} onChange={setColor} label="Accent Color" />
      </ShowcaseControlPanel>

      <ComponentPreview
        name="DesignFolderBox"
        tsCode={DESIGN_FOLDER_BOX_TS}
        jsCode={DESIGN_FOLDER_BOX_TS}
        usageCode={DESIGN_FOLDER_BOX_USAGE}
        jsUsageCode={DESIGN_FOLDER_BOX_USAGE}
        sandbox="design-folder-box"
        sandboxProps={{ color }}
      >
        <div className="w-full p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center rounded-2xl border border-border bg-background">
          <DesignFolderBox color={color} />
        </div>
      </ComponentPreview>
    </div>
  );
}

