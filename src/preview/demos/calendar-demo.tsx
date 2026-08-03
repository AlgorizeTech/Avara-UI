"use client";

import {
  CalendarColor,
  CalendarDashboard,
  CalendarVariant,
} from "@/components/custom/blocks/Calendar";

export default function CalendarDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: CalendarVariant;
  color?: CalendarColor | string;
}) {
  return (
    <div
      className={`w-full transition-all duration-500 ${variant === "glass" ? "p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl" : ""}`}
    >
      <CalendarDashboard
        key={`${variant}-${color}`} // Force re-render on theme change to prevent state staleness
        variant={variant}
        color={color}
        mockEvents={{
          "2025-8-31": ["pentest", "kickoff", "pentest"],
          "2025-9-2": ["pentest", "kickoff"],
          "2025-9-10": ["pentest", "kickoff"],
          "2025-9-15": ["pentest", "kickoff"],
          "2025-9-24": ["kickoff", "pentest"],
        }}
      />
    </div>
  );
}
