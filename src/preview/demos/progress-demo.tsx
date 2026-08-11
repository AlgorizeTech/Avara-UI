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
  showAll,
  example = "field",
}: {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  barSize?: ProgressSize;
  color?: string;
  /** Render-all modes: every visual variant, or every bar size, in one frame. */
  showAll?: "variants" | "sizes";
  /** "field" is the classic labelled layout; the others show narrower slices. */
  example?: "field" | "bare" | "formatted" | "steps";
}) {
  if (showAll) {
    const variants: ProgressVariant[] = ["default", "glass", "glow", "minimal"];
    const sizes: ProgressSize[] = ["sm", "md", "lg"];

    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
          {showAll === "variants"
            ? variants.map((v) => (
                <ProgressField key={v} label={v} value={value} max={max}>
                  <Progress
                    value={value}
                    max={max}
                    variant={v}
                    color={color}
                    barSize={barSize}
                  />
                </ProgressField>
              ))
            : sizes.map((s) => (
                <ProgressField key={s} label={`barSize="${s}"`} value={value} max={max}>
                  <Progress
                    value={value}
                    max={max}
                    variant={variant}
                    color={color}
                    barSize={s}
                  />
                </ProgressField>
              ))}
        </div>
      </div>
    );
  }

  if (example === "bare") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <Progress
            value={value}
            max={max}
            variant={variant}
            color={color}
            barSize={barSize}
          />
        </div>
      </div>
    );
  }

  if (example === "formatted") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField
            label="Storage Usage"
            value={value}
            max={max}
            valueFormat={(val, m) => `${val} GB / ${m} GB`}
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

  if (example === "steps") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField
            label="Step 2 of 4 — Billing details"
            value={value}
            max={max}
            showValue={false}
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
