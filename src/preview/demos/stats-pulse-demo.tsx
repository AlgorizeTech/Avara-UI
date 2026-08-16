"use client";

import {
  StatsPulse,
  type StatsPulseColor,
  type StatsPulseVariant,
} from "@/components/custom/blocks/StatsPulseBlock";

export default function StatsPulseDemo({
  variant = "live-badge",
  color = "primary",
  title,
  value,
  change,
}: {
  variant?: StatsPulseVariant;
  color?: StatsPulseColor | string;
  title?: string;
  value?: string;
  change?: string;
}) {
  return (
    <div className="w-full max-w-full p-0">
      <StatsPulse
        key={`${variant}-${color}`}
        variant={variant}
        color={color}
        title={title}
        value={value}
        change={change}
        className="w-full"
      />
    </div>
  );
}
