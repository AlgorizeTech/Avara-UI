"use client";

import {
  Progress,
  ProgressField,
  ProgressSize,
  ProgressVariant,
} from "@/components/custom/blocks/ProgressBlock";

export default function ProgressDemo({
  value = 45,
  max = 100,
  variant = "glow",
  barSize = "md",
  color = "primary",
}: {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  barSize?: ProgressSize;
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        <ProgressField
          label="Database Synchronization Pipeline"
          value={value}
          max={max}
        >
          <Progress
            value={value}
            max={max}
            variant={variant}
            color={color}
            barSize={barSize}
          />
        </ProgressField>
      </div>
    </div>
  );
}
