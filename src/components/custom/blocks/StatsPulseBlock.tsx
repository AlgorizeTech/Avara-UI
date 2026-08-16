"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Activity,
  TrendingUp,
  Zap,
  Radio,
  BarChart3,
  Flame,
  ShieldCheck,
  Globe,
  Cpu,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export type StatsPulseVariant =
  | "live-badge"
  | "glowing-card"
  | "metric-spark"
  | "wave-pulse"
  | "counter-radar"
  | "health-monitor"
  | "network-node"
  | "gradient-beam"
  | "floating-pill"
  | "status-beacon";

export type StatsPulseColor = "indigo" | "rose" | "emerald" | "zinc" | "primary" | (string & {});

export interface StatsPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatsPulseVariant;
  color?: StatsPulseColor | string;
  title?: string;
  value?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  pulseInterval?: number;
  className?: string;
}

const colorThemes: Record<string, { accent: string; rgb: string }> = {
  primary: {
    accent: "#6366f1",
    rgb: "99, 102, 241",
  },
  indigo: {
    accent: "#6366f1",
    rgb: "99, 102, 241",
  },
  rose: {
    accent: "#f43f5e",
    rgb: "244, 63, 94",
  },
  emerald: {
    accent: "#10b981",
    rgb: "16, 185, 129",
  },
  zinc: {
    accent: "#a1a1aa",
    rgb: "161, 161, 170",
  },
};

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

export function StatsPulse({
  variant = "live-badge",
  color = "primary",
  title = "Active Live Users",
  value = "18,492",
  change = "+24.8%",
  trend = "up",
  icon,
  pulseInterval = 2000,
  className,
  ...props
}: StatsPulseProps) {
  const isPrimary = color === "primary" || color === "default" || !color;
  const activeColor = isPrimary
    ? "var(--primary)"
    : color?.startsWith("#")
      ? color
      : colorThemes[color]?.accent || "var(--primary)";

  const activeRgb = isPrimary
    ? "var(--primary)"
    : color?.startsWith("#")
      ? hexToRgb(color)
      : colorThemes[color]?.rgb || "99, 102, 241";

  const [ping, setPing] = useState(false);
  const [liveValue, setLiveValue] = useState(value);

  // Periodic pulse animation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(true);
      setTimeout(() => setPing(false), 1000);
    }, pulseInterval);
    return () => clearInterval(interval);
  }, [pulseInterval]);

  const defaultIcon = () => {
    switch (variant) {
      case "live-badge":
        return <Activity className="w-5 h-5" />;
      case "glowing-card":
        return <Flame className="w-5 h-5" />;
      case "metric-spark":
        return <TrendingUp className="w-5 h-5" />;
      case "wave-pulse":
        return <Zap className="w-5 h-5" />;
      case "counter-radar":
        return <Radio className="w-5 h-5" />;
      case "health-monitor":
        return <ShieldCheck className="w-5 h-5" />;
      case "network-node":
        return <Globe className="w-5 h-5" />;
      case "gradient-beam":
        return <Cpu className="w-5 h-5" />;
      case "floating-pill":
        return <Sparkles className="w-5 h-5" />;
      case "status-beacon":
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden select-none border transition-all duration-300",
        "bg-zinc-50 dark:bg-[#09090b] border-zinc-200 dark:border-zinc-800/80",
        "flex flex-col items-center justify-center p-6 text-center",
        className
      )}
      {...props}
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* VARIANT 1: LIVE BADGE STAT */}
      {variant === "live-badge" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span
                  className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    ping && "scale-150"
                  )}
                  style={{ backgroundColor: activeColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-3 w-3"
                  style={{ backgroundColor: activeColor }}
                />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                LIVE METRIC
              </span>
            </div>
            <div
              className="p-2 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.12)" : `rgba(${activeRgb}, 0.12)`,
                color: activeColor,
              }}
            >
              {icon || defaultIcon()}
            </div>
          </div>

          <div className="text-left">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
            <div className="flex items-baseline justify-between mt-1">
              <h4 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                {liveValue}
              </h4>
              <span
                className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                  color: activeColor,
                }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                {change}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT 2: GLOWING CARD STAT */}
      {variant === "glowing-card" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-md space-y-4">
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-20 pointer-events-none transition-all duration-500"
            style={{ backgroundColor: activeColor }}
          />
          <div className="relative flex items-center justify-between">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md border"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                borderColor: isPrimary ? "hsl(var(--primary) / 0.3)" : `rgba(${activeRgb}, 0.3)`,
                color: activeColor,
              }}
            >
              {icon || defaultIcon()}
            </div>
            <span
              className="text-xs font-extrabold px-3 py-1 rounded-full border shadow-xs"
              style={{
                borderColor: isPrimary ? "hsl(var(--primary) / 0.3)" : `rgba(${activeRgb}, 0.3)`,
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.1)" : `rgba(${activeRgb}, 0.1)`,
                color: activeColor,
              }}
            >
              Active Stream
            </span>
          </div>

          <div className="relative text-left pt-2">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {liveValue}
            </h3>
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1">{title}</p>
          </div>
        </div>
      )}

      {/* VARIANT 3: METRIC SPARK STAT */}
      {variant === "metric-spark" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              Performance Spark
            </span>
            <div
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: isPrimary ? "hsl(var(--primary) / 0.12)" : `rgba(${activeRgb}, 0.12)`, color: activeColor }}
            >
              {icon || defaultIcon()}
            </div>
          </div>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            {liveValue}
          </h2>
          <div className="w-full h-12 relative overflow-hidden pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
              <path
                d="M 0 25 Q 20 5, 40 18 T 80 8 L 100 2"
                fill="none"
                stroke={activeColor}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}

      {/* VARIANT 4: WAVE PULSE STAT */}
      {variant === "wave-pulse" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                color: activeColor,
              }}
            >
              {icon || defaultIcon()}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-zinc-400">{title}</p>
              <h4 className="text-2xl font-black text-zinc-900 dark:text-white">{liveValue}</h4>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: ping ? "85%" : "70%",
                backgroundColor: activeColor,
              }}
            />
          </div>
        </div>
      )}

      {/* VARIANT 5: COUNTER RADAR STAT */}
      {variant === "counter-radar" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full border-2 border-dashed animate-spin transition-transform duration-1000"
              style={{
                borderColor: isPrimary ? "hsl(var(--primary) / 0.4)" : `rgba(${activeRgb}, 0.4)`,
              }}
            />
            <div
              className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: activeColor, color: "#fff" }}
            >
              {icon || defaultIcon()}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {liveValue}
            </h3>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">{title}</p>
          </div>
        </div>
      )}

      {/* VARIANT 6: HEALTH MONITOR STAT */}
      {variant === "health-monitor" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md text-left space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-zinc-900 dark:text-white">System Healthy</span>
            </div>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                color: activeColor,
              }}
            >
              99.9% Uptime
            </span>
          </div>

          <div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{title}</span>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-0.5">
              {liveValue}
            </h2>
          </div>
        </div>
      )}

      {/* VARIANT 7: NETWORK NODE STAT */}
      {variant === "network-node" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div
              className="p-3 rounded-2xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                color: activeColor,
              }}
            >
              {icon || defaultIcon()}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Node Syncing</span>
            </div>
          </div>

          <div className="text-left pt-1">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {liveValue}
            </h3>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">{title}</p>
          </div>
        </div>
      )}

      {/* VARIANT 8: GRADIENT BEAM STAT */}
      {variant === "gradient-beam" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden text-left space-y-3">
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: activeColor }}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400">{title}</span>
            <div
              className="p-2 rounded-xl"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.12)" : `rgba(${activeRgb}, 0.12)`,
                color: activeColor,
              }}
            >
              {icon || defaultIcon()}
            </div>
          </div>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            {liveValue}
          </h2>
        </div>
      )}

      {/* VARIANT 9: FLOATING PILL STAT */}
      {variant === "floating-pill" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3 text-left">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: activeColor, color: "#fff" }}
            >
              {icon || defaultIcon()}
            </div>
            <div>
              <h4 className="text-2xl font-black text-zinc-900 dark:text-white leading-none">
                {liveValue}
              </h4>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">{title}</p>
            </div>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-extrabold"
            style={{
              backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
              color: activeColor,
            }}
          >
            {change}
          </span>
        </div>
      )}

      {/* VARIANT 10: STATUS BEACON STAT */}
      {variant === "status-beacon" && (
        <div className="relative z-10 w-full max-w-sm p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: activeColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-3 w-3"
                  style={{ backgroundColor: activeColor }}
                />
              </span>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Beacon Signal</span>
            </div>
            <div
              className="p-1.5 rounded-lg"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.12)" : `rgba(${activeRgb}, 0.12)`,
                color: activeColor,
              }}
            >
              {icon || defaultIcon()}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {liveValue}
            </h2>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">{title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
