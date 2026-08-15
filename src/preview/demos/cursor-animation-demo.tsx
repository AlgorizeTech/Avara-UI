"use client";

import { CursorAnimation, type CursorVariant } from "@/components/custom/blocks/CursorAnimationBlock";

export default function CursorAnimationDemo({
  variant = "glow",
  label = "Explore",
}: {
  variant?: CursorVariant;
  label?: string;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      <CursorAnimation variant={variant} label={label} />
    </div>
  );
}
