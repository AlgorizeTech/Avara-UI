"use client";

import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function LoaderDemo({
  variant = "spinner",
  size = "md",
  color = "primary",
  showText = false,
  showAll,
}: {
  variant?: "spinner" | "dots" | "pulse" | "ring" | "bar";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  showText?: boolean;
  /** Render-all mode: every size in one frame. */
  showAll?: "sizes";
}) {
  // Scalar prop — every size shares a single frame.
  if (showAll === "sizes") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-10 min-h-[300px] relative z-10">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <LoaderBlock key={s} variant={variant} color={color} size={s} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
      <LoaderBlock
        key={`${variant}-${color}-${size}-${showText}`}
        variant={variant}
        color={color}
        size={size}
        text={showText ? "Processing data..." : undefined}
      />
    </div>
  );
}
