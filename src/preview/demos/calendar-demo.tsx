"use client";

import {
  CalendarColor,
  CalendarDashboard,
  CalendarVariant,
  LiquidGlassSvgFilter,
} from "@/components/custom/blocks/Calendar";
import { cn } from "@/lib/utils";

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

const DEMO_EVENTS: Record<string, string[]> = {
  [`${currentYear}-${currentMonth}-2`]: ["pentest", "kickoff"],
  [`${currentYear}-${currentMonth}-10`]: ["pentest", "kickoff"],
  [`${currentYear}-${currentMonth}-15`]: ["pentest", "kickoff"],
  [`${currentYear}-${currentMonth}-24`]: ["kickoff", "pentest"],
};

export default function CalendarDemo({
  variant = "default",
  color = "primary",
  mockEvents = DEMO_EVENTS,
}: {
  variant?: CalendarVariant;
  color?: CalendarColor | string;
  /** Override the seeded events — pass {} for the empty state. */
  mockEvents?: Record<string, string[]>;
}) {
  const isGlass = variant === "glass" || variant === "liquid-glass";

  return (
    <div
      className={cn(
        "w-full transition-all duration-500 relative flex items-center justify-center overflow-hidden",
        isGlass
          ? "p-0 -my-6 -mx-4 w-[calc(100%+2rem)] min-w-[calc(100%+2rem)] max-w-none"
          : "w-full"
      )}
    >
      <LiquidGlassSvgFilter />
      {isGlass && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
          }}
        />
      )}
      {isGlass && (
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />
      )}
      <div className={cn("w-full relative z-10", isGlass && "p-4 sm:p-8")}>
        <CalendarDashboard
          key={`${variant}-${color}`} // Force re-render on theme change to prevent state staleness
          variant={variant}
          color={color}
          mockEvents={mockEvents}
        />
      </div>
    </div>
  );
}
