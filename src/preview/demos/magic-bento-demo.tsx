"use client";

import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";
import {
  Activity,
  Globe2,
  LockKeyhole,
  Network,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import React from "react";

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = {
    primary: "var(--primary)",
    default: "var(--primary)",
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    lavender: "#9b8afb",
  };
  return map[c] || "var(--primary)";
};

export default function MagicBentoDemo({
  color = "primary",
  example,
}: {
  color?: string;
  /** Isolates one behaviour instead of rendering the full six-card grid. */
  example?: "grid" | "highlight" | "spans";
}) {
  const activeHex = getThemeColorHex(color);

  if (example === "highlight" || example === "spans") {
    return (
      <div
        className="w-full flex items-center justify-center py-16 px-4 transition-colors duration-300 relative overflow-hidden rounded-2xl border border-border/80"
        style={
          {
            "--theme-color": activeHex,
            backgroundColor:
              "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
          } as React.CSSProperties
        }
      >
        <div
          className="w-full relative z-10"
          style={
            {
              "--magic-color": "var(--theme-color, var(--primary))",
              "--magic-glow":
                "color-mix(in srgb, var(--theme-color, var(--primary)) 15%, transparent)",
            } as React.CSSProperties
          }
        >
          {example === "highlight" ? (
            <MagicBento className="lg:grid-cols-2 auto-rows-[240px] max-w-3xl">
              <MagicBentoCard className="flex flex-col justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
                  <Activity className="w-4 h-4" />
                  Default card
                </div>
                <p className="text-sm text-muted-foreground">
                  The border track and inner glow follow the cursor.
                </p>
              </MagicBentoCard>
              <MagicBentoCard highlight className="flex flex-col justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  highlight
                </div>
                <p className="text-sm text-muted-foreground">
                  Adds a conic gradient that keeps spinning behind the mask,
                  cursor or not.
                </p>
              </MagicBentoCard>
            </MagicBento>
          ) : (
            <MagicBento className="auto-rows-[160px] max-w-4xl">
              <MagicBentoCard className="md:col-span-2 flex items-end">
                <span className="text-sm font-semibold text-foreground">
                  md:col-span-2
                </span>
              </MagicBentoCard>
              <MagicBentoCard className="row-span-2 flex items-end">
                <span className="text-sm font-semibold text-foreground">
                  row-span-2
                </span>
              </MagicBentoCard>
              <MagicBentoCard className="flex items-end">
                <span className="text-sm font-semibold text-foreground">
                  1 × 1
                </span>
              </MagicBentoCard>
              <MagicBentoCard className="md:col-span-2 flex items-end">
                <span className="text-sm font-semibold text-foreground">
                  md:col-span-2
                </span>
              </MagicBentoCard>
              <MagicBentoCard className="flex items-end">
                <span className="text-sm font-semibold text-foreground">
                  1 × 1
                </span>
              </MagicBentoCard>
            </MagicBento>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center py-16 px-4 transition-colors duration-300 relative overflow-hidden rounded-2xl border border-border/80"
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
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <Activity className="w-4 h-4" />
              Insights
            </div>
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Analytics
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Track user behavior
              </p>
            </div>
          </MagicBentoCard>

          {/* CARD 2: TOP MID-LEFT (1x1) */}
          <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <Globe2 className="w-4 h-4" />
              Overview
            </div>
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Dashboard
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Centralized data view
              </p>
            </div>
          </MagicBentoCard>

          {/* CARD 3: TOP RIGHT (2x2) */}
          <MagicBentoCard
            highlight
            className="col-span-1 row-span-2 md:col-span-2 flex flex-col justify-between relative"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold relative z-10">
              <Users className="w-4 h-4" />
              Teamwork
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center scale-[0.8] sm:scale-100">
                <div className="absolute w-40 h-40 border border-border rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                <div className="absolute w-24 h-24 border border-foreground/15 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
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
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                Collaboration
              </h3>
              <p className="text-base text-muted-foreground mt-1">
                Work together seamlessly across the globe
              </p>
            </div>
          </MagicBentoCard>

          {/* CARD 4: BOTTOM LEFT (2x2) */}
          <MagicBentoCard className="col-span-1 row-span-2 md:col-span-2 flex flex-col justify-between relative">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold relative z-10">
              <Workflow className="w-4 h-4" />
              Efficiency
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 dark:opacity-100">
              <div className="flex flex-col gap-3 w-full max-w-[200px] sm:max-w-none sm:w-3/4 scale-[0.85] sm:scale-100">
                <div className="h-8 w-full bg-muted rounded-md border border-border" />
                <div className="flex gap-3">
                  <div className="h-8 w-1/3 bg-muted rounded-md border border-border" />
                  <div className="h-8 w-2/3 bg-muted rounded-md border border-border" />
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
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                Automation
              </h3>
              <p className="text-base text-muted-foreground mt-1">
                Streamline workflows and save thousands of hours
              </p>
            </div>
          </MagicBentoCard>

          {/* CARD 5: BOTTOM MID-RIGHT (1x1) */}
          <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <Network className="w-4 h-4" />
              Connectivity
            </div>
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Integration
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect favorite tools
              </p>
            </div>
          </MagicBentoCard>

          {/* CARD 6: BOTTOM RIGHT (1x1) */}
          <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <LockKeyhole className="w-4 h-4" />
              Protection
            </div>
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Security
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enterprise-grade protection
              </p>
            </div>
          </MagicBentoCard>
        </MagicBento>
      </div>
    </div>
  );
}
