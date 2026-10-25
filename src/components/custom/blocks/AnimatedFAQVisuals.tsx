"use client";

import { useState } from "react";
import {
  Terminal,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Activity,
  Zap,
  Sliders,
  Palette,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. CLI & INSTALLATION VISUAL (Interactive Terminal)
// ============================================================================
export function CLIInstallationVisual() {
  const [pkg, setPkg] = useState<"npm" | "pnpm" | "bun">("pnpm");
  const [copied, setCopied] = useState(false);

  const command =
    pkg === "pnpm"
      ? "pnpm dlx shadcn@latest add @avara-ui/animated-faq"
      : pkg === "bun"
      ? "bunx --bun shadcn@latest add @avara-ui/animated-faq"
      : "npx shadcn@latest add @avara-ui/animated-faq";

  const handleCopy = () => {
    navigator.clipboard?.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full py-4.5 px-6 sm:px-8 flex flex-col justify-between bg-card dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-mono text-xs select-none transition-colors duration-200">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/80" />
            <div className="size-2.5 rounded-full bg-yellow-500/80" />
            <div className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans font-medium pl-1 flex items-center gap-1.5">
            <Terminal className="size-3 text-primary" /> install-component.sh
          </span>
        </div>

        {/* Package Switcher */}
        <div className="flex bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-0.5 text-[10px]">
          {(["pnpm", "npm", "bun"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPkg(p)}
              className={cn(
                "px-2 py-0.5 rounded transition-colors cursor-pointer",
                pkg === p
                  ? "bg-white dark:bg-primary text-neutral-900 dark:text-primary-foreground font-semibold shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body & Execution Log */}
      <div className="my-auto py-3 space-y-2 text-[11px] sm:text-xs leading-relaxed">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="text-primary font-bold">$</span>
            <span className="text-neutral-800 dark:text-neutral-200 truncate">{command}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors shrink-0 cursor-pointer"
            title="Copy command"
          >
            {copied ? <Check className="size-3 text-emerald-500 dark:text-emerald-400" /> : <Copy className="size-3" />}
          </button>
        </div>

        <div className="space-y-1 text-[10.5px] text-neutral-600 dark:text-neutral-400 pt-1">
          <p className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <Check className="size-3 shrink-0" />
            <span>Found registry component @avara-ui/animated-faq</span>
          </p>
          <p className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <Check className="size-3 shrink-0" />
            <span>Generated src/components/custom/blocks/AnimatedFAQBlock.tsx</span>
          </p>
          <p className="flex items-center gap-1.5 text-neutral-500 font-sans">
            <Sparkles className="size-3 text-primary shrink-0" />
            <span>Zero build lock-in • Pure TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>

      {/* Terminal Footer Status */}
      <div className="pt-2.5 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-500 font-sans">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Ready to Import
        </span>
        <span>Output: 100% Native Code</span>
      </div>
    </div>
  );
}

// ============================================================================
// 2. TAILWIND & THEMING VISUAL (Interactive Token & Palette Customizer)
// ============================================================================
export function ThemingVisual() {
  const [selectedColor, setSelectedColor] = useState({
    name: "Emerald",
    hex: "#10b981",
    bgClass: "bg-emerald-500",
    textClass: "text-emerald-500 dark:text-emerald-400",
    borderClass: "border-emerald-500/40",
  });
  const radius = "rounded-xl";

  const PALETTES = [
    { name: "Emerald", hex: "#10b981", bgClass: "bg-emerald-500", textClass: "text-emerald-500 dark:text-emerald-400", borderClass: "border-emerald-500/40" },
    { name: "Violet", hex: "#8b5cf6", bgClass: "bg-purple-500", textClass: "text-purple-500 dark:text-purple-400", borderClass: "border-purple-500/40" },
    { name: "Cyan", hex: "#06b6d4", bgClass: "bg-cyan-500", textClass: "text-cyan-500 dark:text-cyan-400", borderClass: "border-cyan-500/40" },
    { name: "Amber", hex: "#f59e0b", bgClass: "bg-amber-500", textClass: "text-amber-500 dark:text-amber-400", borderClass: "border-amber-500/40" },
    { name: "Rose", hex: "#f43f5e", bgClass: "bg-rose-500", textClass: "text-rose-500 dark:text-rose-400", borderClass: "border-rose-500/40" },
  ];

  return (
    <div className="w-full h-full py-4.5 px-6 sm:px-8 flex flex-col justify-between bg-card dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 select-none transition-colors duration-200">
      {/* Header Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-primary" />
          <span className="text-xs font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
            Live Design Token Engine
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/60">
          OKLCH Tokens
        </span>
      </div>

      {/* Interactive Swatches & Controls */}
      <div className="my-auto py-2 space-y-4">
        {/* Color Swatch Picker */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5 font-medium">
            <span>Primary Color</span>
            <span className="font-mono font-semibold" style={{ color: selectedColor.hex }}>
              {selectedColor.name} ({selectedColor.hex})
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {PALETTES.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelectedColor(p)}
                className={cn(
                  "size-6 rounded-full transition-transform cursor-pointer border-2 shadow-xs",
                  selectedColor.name === p.name
                    ? "scale-110 border-neutral-900 dark:border-white ring-2 ring-neutral-900/20 dark:ring-white/20"
                    : "border-transparent opacity-75 hover:opacity-100"
                )}
                style={{ backgroundColor: p.hex }}
                title={p.name}
              />
            ))}
          </div>
        </div>

        {/* Live Morphing Preview Component */}
        <div
          className={cn(
            "p-3.5 border bg-muted/30 dark:bg-neutral-900/70 transition-all duration-300 flex items-center justify-between gap-3 shadow-xs",
            radius,
            selectedColor.borderClass
          )}
        >
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground">Interactive Component</p>
            <p className="text-[10px] text-muted-foreground">Adapts to your global theme tokens</p>
          </div>
          <button
            type="button"
            className={cn(
              "px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all duration-300 cursor-pointer",
              radius,
              selectedColor.bgClass
            )}
          >
            Action
          </button>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1">
          <Sliders className="size-3 text-primary" /> CSS Variables Auto-Sync
        </span>
        <span>Dark & Light Native</span>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MIT LICENSING VISUAL (Commercial Open-Source Certificate)
// ============================================================================
export function LicensingVisual() {
  return (
    <div className="w-full h-full py-4.5 px-6 sm:px-8 flex flex-col justify-between bg-card dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 select-none transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="size-4" />
          </div>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            MIT Open-Source License
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
          100% FREE
        </span>
      </div>

      {/* License Feature Matrix */}
      <div className="my-auto py-2 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex items-center gap-2 shadow-xs">
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-foreground font-medium">Commercial SaaS</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex items-center gap-2 shadow-xs">
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-foreground font-medium">Client Projects</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex items-center gap-2 shadow-xs">
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-foreground font-medium">Zero Royalties</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex items-center gap-2 shadow-xs">
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-foreground font-medium">Private Repos</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs text-primary">
          <span className="font-semibold flex items-center gap-1.5">
            <Sparkles className="size-3.5" /> No Attribution Required
          </span>
          <span className="font-mono text-[10px] opacity-80">Perpetual</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        <span>License: MIT (SPDX: MIT)</span>
        <span>Free for Life</span>
      </div>
    </div>
  );
}

// ============================================================================
// 4. PERFORMANCE & 60FPS VISUAL (Lighthouse 100 & GPU Engine HUD)
// ============================================================================
export function PerformanceVisual() {
  return (
    <div className="w-full h-full py-4.5 px-6 sm:px-8 flex flex-col justify-between bg-card dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 select-none transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            GPU Motion & Performance Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
          <Zap className="size-3" /> 60.0 FPS
        </div>
      </div>

      {/* Benchmark HUD Grid */}
      <div className="my-auto py-2 grid grid-cols-3 gap-2.5 text-center">
        {/* Lighthouse 100 */}
        <div className="p-3 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex flex-col items-center justify-center shadow-xs">
          <div className="size-11 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-sm shadow-[0_0_10px_rgba(16,185,129,0.15)] dark:shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            100
          </div>
          <span className="text-[10px] text-muted-foreground font-medium mt-1.5">Lighthouse</span>
        </div>

        {/* 0.00 CLS */}
        <div className="p-3 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex flex-col items-center justify-center shadow-xs">
          <div className="text-base sm:text-lg font-extrabold text-foreground font-mono">
            0.00
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Zero CLS</span>
          <span className="text-[9px] text-muted-foreground font-mono">Layout Shift</span>
        </div>

        {/* 0kB Runtime */}
        <div className="p-3 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex flex-col items-center justify-center shadow-xs">
          <div className="text-base sm:text-lg font-extrabold text-foreground font-mono">
            0 kB
          </div>
          <span className="text-[10px] text-primary font-medium mt-0.5">Zero Bloat</span>
          <span className="text-[9px] text-muted-foreground font-mono">Native CSS</span>
        </div>
      </div>

      {/* GPU Stream Line */}
      <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <Cpu className="size-3" /> transform: translate3d
        </span>
        <span className="text-neutral-500">Hardware Accelerated</span>
      </div>
    </div>
  );
}
