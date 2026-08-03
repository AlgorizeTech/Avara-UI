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
    <div className="w-full flex flex-col items-center justify-center min-h-[220px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10 overflow-hidden">
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
