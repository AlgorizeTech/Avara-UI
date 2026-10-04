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
    // Glass sits in a photo frame from md up. Below md the frame's padding
    // goes — it cost a phone 64px of calendar width — and the card fills
    // edge to edge with the photo showing through it. overflow-hidden clips
    // the card to the frame's corners.
    <div
      className={`w-full transition-all duration-500 rounded-2xl ${
        variant === "glass" ? "overflow-hidden bg-cover bg-center md:p-8" : ""
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.52)), url('https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg')",
            }
          : undefined
      }
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
