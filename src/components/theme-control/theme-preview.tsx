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
      title: "Summer Vacation 2024",
      location: "Maldives",
      date: "Aug 15, 2024",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      description: "Crystal clear waters and white sand beaches. A trip to remember forever.",
      tag: "Featured",
    },
    {
      id: "2",
      title: "Mountain Hiking Retreat",
      location: "Swiss Alps",
      date: "Sep 02, 2024",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      description: "Reached the summit after 8 hours of climbing. The view was breathtaking.",
    },
    {
      id: "3",
      title: "Tokyo City Lights",
      location: "Tokyo, Japan",
      date: "Oct 10, 2024",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
      description: "Neon lights, busy streets, and amazing food. The energy of this city is unmatched.",
      tag: "City Life",
    }
  ];

  const carouselData = [
    {
      id: "1",
      title: "The Future of AI",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      description: "Exploring the boundaries of machine learning and neural networks.",
    },
    {
      id: "2",
      title: "Sustainable Architecture",
      category: "Design",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
      description: "Building homes that integrate seamlessly with nature.",
    },
    {
      id: "3",
      title: "Deep Space Exploration",
      category: "Science",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      description: "The next frontier in human discovery and space travel.",
    },
    {
      id: "4",
      title: "Modern Minimalist Workspace",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
      description: "Creating productive environments with clean lines and open spaces.",
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
