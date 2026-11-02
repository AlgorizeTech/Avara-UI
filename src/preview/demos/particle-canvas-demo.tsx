"use client";

import { ParticleCanvas } from "@/components/custom/blocks/ParticleCanvasBlock";
import { accentStyle, toBlockColor } from "@/lib/accent";

export default function ParticleCanvasDemo({
  variant = "repel",
  content = "AlgorizeTech",
  particleSize = 2.5,
  particleGap = 5,
  speed = 1,
  color: pickedColor,
}: {
  variant?: "repel" | "wordmark-glow";
  content?: string;
  particleSize?: number;
  particleGap?: number;
  speed?: number;
  color?: string;
}) {
  const color = toBlockColor(pickedColor);
  const isWordmark = variant === "wordmark-glow";

  return (
    <div
      style={accentStyle(color)}
      className={
        isWordmark
          ? "relative w-full h-[260px] min-h-max bg-background rounded-xl overflow-hidden flex items-end justify-center border border-border transition-colors"
          : "relative w-full h-[650px] min-h-max bg-background rounded-xl overflow-hidden flex items-center justify-center border border-border transition-colors"
      }
    >
      <ParticleCanvas
        variant={variant}
        content={content}
        particleSize={particleSize}
        particleGap={particleGap}
        speed={speed}
        color={color}
        className={isWordmark ? "w-full h-full min-h-[260px]" : "w-full h-full min-h-[650px]"}
      />
    </div>
  );
}
