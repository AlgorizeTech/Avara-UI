"use client";

import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function LoaderDemo({
  variant = "spinner",
  size = "md",
  color = "primary",
  secondaryColor,
  direction = "single",
  showText = false,
  showAll,
}: {
  variant?: "spinner" | "dots" | "pulse" | "ring" | "bar" | "orbit";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  secondaryColor?: string;
  direction?: "single" | "dual";
  showText?: boolean;
  /** Render-all mode: every size in one frame. */
  showAll?: "sizes";
}) {
  // Scalar prop — every size shares a single frame.
  if (showAll === "sizes") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-10 min-h-[300px] relative z-10">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <LoaderBlock
            key={s}
            variant={variant}
            color={color}
            secondaryColor={secondaryColor}
            direction={direction}
            size={s}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
      <LoaderBlock
        key={`${variant}-${color}-${size}-${direction}-${showText}`}
        variant={variant}
        color={color}
        secondaryColor={secondaryColor}
        direction={direction}
        size={size}
        text={showText ? "Processing data..." : undefined}
      />
    </div>
  );
}
