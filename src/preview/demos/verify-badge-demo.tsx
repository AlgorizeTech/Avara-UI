"use client";

import React from "react";
import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

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

export default function VerifyBadgeDemo({
  color = "primary",
  size = "md",
  animate = true,
}: {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}) {
  const activeHex = getThemeColorHex(color);

  return (
    <div
      className="w-full min-h-[380px] rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center p-8 transition-colors"
      style={
        {
          "--theme-color": activeHex,
          backgroundColor:
            "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
        } as React.CSSProperties
      }
    >
      {/* Chat Notification Card */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex gap-4 transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 shadow-sm">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-colors"
            style={{ backgroundColor: activeHex }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8" y2="16" />
              <line x1="16" y1="16" x2="16" y2="16" />
            </svg>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-zinc-900 dark:text-zinc-50 text-[15px] tracking-tight">
              AlgorizeSystem
            </span>
            <VerifyBadge color={activeHex} size={size} animate={animate} />
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider ml-0.5 border"
              style={{
                backgroundColor: activeHex.startsWith("#")
                  ? `${activeHex}20`
                  : `color-mix(in srgb, ${activeHex} 15%, transparent)`,
                borderColor: activeHex.startsWith("#")
                  ? `${activeHex}30`
                  : `color-mix(in srgb, ${activeHex} 30%, transparent)`,
                color: activeHex,
              }}
            >
              Bot
            </span>
            <span className="text-[13px] text-zinc-500 dark:text-zinc-400 ml-1 font-medium">
              Today at 2:34 PM
            </span>
          </div>

          {/* Text */}
          <p className="mt-1 text-zinc-800 dark:text-zinc-200 text-[15px] leading-relaxed">
            Deployment{" "}
            <span
              className="font-semibold hover:underline cursor-pointer"
              style={{ color: activeHex }}
            >
              #421
            </span>{" "}
            to <strong>production</strong> completed successfully.
          </p>

          {/* Embed Box */}
          <div className="mt-3 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3.5 flex items-start gap-3 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ backgroundColor: activeHex }}
            ></div>
            <div className="flex flex-col gap-1 ml-1">
              <span className="font-semibold text-[14px] text-zinc-900 dark:text-zinc-50 tracking-tight">
                Build Passed 🚀
              </span>
              <span className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug">
                All 142 tests passed in 12s. The latest preview is now live on
                Vercel.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
