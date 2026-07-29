"use client";

/**
 * Live preview panel for the Theme Customizer.
 *
 * Shows the specific requested components: Wizard, Tilted Card, Counter, Chart, Half-Stars.
 */

import { cn } from "@/lib/utils";
import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { oklchToHex } from "@/lib/color-utils";
import { ShieldCheck } from "lucide-react";

import { CalendarDashboard } from "@/components/custom/blocks/Calendar";
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";

// ─── Section Wrapper ─────────────────────────────────────────────

function PreviewSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 h-full", className)}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
        {title}
      </h3>
      <div className="flex-1 flex flex-col h-full w-full">{children}</div>
    </div>
  );
}

// ─── Main Preview Component ──────────────────────────────────────

export function ThemePreview() {
  const { getColorToken, currentMode } = useThemeCustomizer();

  // Get primary color hex for components that require hex instead of classes
  const primaryOklch = getColorToken(currentMode, "primary");
  const primaryHex = primaryOklch ? oklchToHex(primaryOklch) : "#000000";

  // Data for Chart
  const chartData = [
    { label: "Jan", value: 400 },
    { label: "Feb", value: 300 },
    { label: "Mar", value: 550 },
    { label: "Apr", value: 450 },
    { label: "May", value: 700 },
  ];

  return (
    <div className="space-y-10 p-6 lg:p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Preview Components
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Custom components reacting to real-time theme changes
        </p>
      </div>

      {/* Grid Layout for Components - Balances Row Heights automatically */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* ROW 1 */}
        <PreviewSection title="Tilted Card">
          <div className="flex items-center justify-center p-6 rounded-2xl border border-border bg-card h-full min-h-[400px]">
            <div className="w-full max-w-[280px] aspect-[3/4]">
              <TiltedCard>
                <div className="w-full h-full bg-primary text-primary-foreground rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                  <ShieldCheck className="w-10 h-10 opacity-90" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      Secure Vault
                    </h3>
                    <p className="text-sm opacity-80">
                      Your data is encrypted and safely stored using
                      military-grade standards.
                    </p>
                  </div>
                </div>
              </TiltedCard>
            </div>
          </div>
        </PreviewSection>

        <PreviewSection title="Chart">
          <div className="flex items-center justify-center p-6 rounded-2xl border border-border bg-card h-full min-h-[400px]">
            <div className="w-full h-full flex flex-col justify-center">
              <ChartBlock
                data={chartData}
                type="bar"
                color={primaryHex}
                height={280}
                valuePrefix="$"
              />
            </div>
          </div>
        </PreviewSection>

        {/* ROW 2 */}
        <PreviewSection title="Counter">
          <div className="flex flex-col items-center justify-center gap-8 p-6 rounded-2xl border border-border bg-card h-full min-h-[300px]">
            <CounterBlock
              type="stepper"
              variant="default"
              color="primary"
              initialValue={10}
              min={0}
              max={20}
            />
            <CounterBlock
              type="animated"
              color="primary"
              targetValue={12500}
              prefix="$"
              label="Total Revenue"
            />
          </div>
        </PreviewSection>

        <PreviewSection title="Half Stars">
          <div className="flex items-center justify-center p-6 rounded-2xl border border-border bg-card h-full min-h-[300px]">
            <HalfStars
              rating={4.5}
              size={32}
              interactive={true}
              activeColor="text-primary"
              inactiveColor="text-muted"
            />
          </div>
        </PreviewSection>
      </div>

      {/* Full Width Calendar Section */}
      <PreviewSection title="Calendar Dashboard">
        <div className="rounded-2xl border border-border overflow-hidden">
          <CalendarDashboard color={primaryHex} variant="default" />
        </div>
      </PreviewSection>
    </div>
  );
}
