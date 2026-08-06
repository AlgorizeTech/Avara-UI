"use client";

import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function LoaderDemo({
  variant = "spinner",
  size = "md",
  color = "primary",
  showText = false,
}: {
  variant?: "spinner" | "dots" | "pulse" | "ring" | "bar";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  showText?: boolean;
}) {
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
