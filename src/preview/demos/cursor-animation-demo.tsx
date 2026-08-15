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
    <div className="w-full max-w-full p-0">
      <CursorAnimation variant={variant} label={label} className="w-full" />
    </div>
  );
}
