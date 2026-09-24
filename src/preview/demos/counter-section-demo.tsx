"use client";

import React from "react";
import {
  CounterSection,
  type CounterSectionVariant,
  type StatItem,
} from "@/components/custom/blocks/CounterSectionBlock";

export default function CounterSectionDemo({
  variant = "cyber-hud",
  stats,
}: {
  variant?: CounterSectionVariant;
  stats?: StatItem[];
}) {
  return (
    <div className="w-full">
      <CounterSection variant={variant} stats={stats} className="w-full" />
    </div>
  );
}
