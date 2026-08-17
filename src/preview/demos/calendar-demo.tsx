"use client";

import {
  CalendarColor,
  CalendarDashboard,
  CalendarVariant,
} from "@/components/custom/blocks/Calendar";

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
  return (
    <div
      className={`w-full transition-all duration-500 ${variant === "glass" ? "p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl" : ""}`}
    >
      <CalendarDashboard
        key={`${variant}-${color}`} // Force re-render on theme change to prevent state staleness
        variant={variant}
        color={color}
        mockEvents={mockEvents}
      />
    </div>
  );
}
