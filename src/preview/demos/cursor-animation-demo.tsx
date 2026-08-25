"use client";

import {
  CursorAnimation,
  MainContent,
  type CursorColor,
  type CursorVariant,
} from "@/components/custom/blocks/CursorAnimationBlock";

export default function CursorAnimationDemo({
  variant = "glow",
  color = "primary",
  label = "Explore",
}: {
  variant?: CursorVariant;
  color?: CursorColor | string;
  label?: string;
}) {
  return (
    <div className="w-full max-w-full p-0">
      <CursorAnimation
        key={`${variant}-${color}`}
        variant={variant}
        color={color}
        label={label}
        className="w-full"
      />
    </div>
  );
}
