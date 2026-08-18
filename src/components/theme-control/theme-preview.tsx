"use client";

/**
 * Live preview panel for the Theme Customizer.
 *
 * Shows the specific requested components: Memories Card, 3D Carousel, Chart, Stepper, Calendar.
 */

import { cn } from "@/lib/utils";
import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { oklchToHex } from "@/lib/color-utils";

import { CalendarDashboard } from "@/components/custom/blocks/Calendar";
import { MemoriesCard } from "@/components/custom/blocks/MemoriesCardBlock";
import { ThreeDCarousel } from "@/components/custom/blocks/ThreeDCarouselBlock";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

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
    { label: "Jan", value: 120 },
    { label: "Feb", value: 250 },
    { label: "Mar", value: 400 },
    { label: "Apr", value: 380 },
    { label: "May", value: 500 },
    { label: "Jun", value: 450 },
    { label: "Jul", value: 700 },
    { label: "Aug", value: 650 },
    { label: "Sep", value: 800 },
    { label: "Oct", value: 920 },
    { label: "Nov", value: 850 },
    { label: "Dec", value: 1100 },
  ];

  const memoriesData = [
    {
      id: "1",
      title: "Alpine Forest Lake",
      location: "Swiss Alps",
      date: "Aug 15, 2024",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
      description: "Serene pine forests reflecting over calm turquoise mountain waters at sunrise.",
      tag: "Featured",
    },
    {
      id: "2",
      title: "Majestic Mountain Ridge",
      location: "Dolomites, Italy",
      date: "Sep 02, 2024",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
      description: "Towering mountain peaks bathed in golden morning sunlight above lush valley mist.",
    },
    {
      id: "3",
      title: "Emerald Forest Stream",
      location: "Pacific Northwest",
      date: "Oct 10, 2024",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
      description: "A tranquil river winding through dense ancient rainforests and mossy rocks.",
      tag: "Wilderness",
    }
  ];

  const carouselData = [
    {
      id: "1",
      title: "Misty Pine Forest",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
      description: "Early morning fog weaving through dense evergreen woodland trees.",
    },
    {
      id: "2",
      title: "Lush River Valley",
      category: "Wilderness",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=80",
      description: "Sunbeams streaming through valley clouds onto pristine forest waters.",
    },
    {
      id: "3",
      title: "Autumn Woodland Path",
      category: "Landscape",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80",
      description: "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    },
    {
      id: "4",
      title: "Cascading Mountain Falls",
      category: "Sanctuary",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
      description: "Fresh mountain spring water cascading through untouched wilderness slopes.",
    }
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
        <PreviewSection title="Memories Card">
          <div className="flex items-center justify-center p-6 rounded-2xl border border-border bg-card h-full min-h-[500px]">
            <MemoriesCard items={memoriesData} className="scale-90 md:scale-100 origin-center" />
          </div>
        </PreviewSection>

        <PreviewSection title="Chart">
          <div className="flex items-center justify-center p-6 rounded-2xl border border-border bg-card h-full min-h-[500px]">
            <div className="w-full h-full flex flex-col justify-center">
              <ChartBlock
                data={chartData}
                type="bar"
                color="var(--primary)"
                height={280}
                valuePrefix=""
              />
            </div>
          </div>
        </PreviewSection>
      </div>

      {/* Full Width Carousel Section */}
      <PreviewSection title="3D Carousel">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <ThreeDCarousel items={carouselData} autoPlay={false} />
        </div>
      </PreviewSection>

      {/* Full Width Calendar Section */}
      <PreviewSection title="Calendar Dashboard">
        <div className="rounded-2xl border border-border overflow-hidden">
          <CalendarDashboard color="primary" variant="default" />
        </div>
      </PreviewSection>
    </div>
  );
}
