"use client";

import { ParticleCanvas } from "@/components/custom/blocks/ParticleCanvasBlock";
import { toBlockColor } from "@/lib/accent";

export default function ParticleCanvasDemo({
  content = "AlgorizeTech",
  particleSize = 2.5,
  particleGap = 5,
  speed = 1,
  color: pickedColor,
}: {
  content?: string;
  particleSize?: number;
  particleGap?: number;
  speed?: number;
  color?: string;
}) {
  const color = toBlockColor(pickedColor);
  return (
    <div className="relative w-full h-[650px] min-h-max bg-background rounded-xl overflow-hidden flex items-center justify-center border border-border">
      <ParticleCanvas
        content={content}
        particleSize={particleSize}
        particleGap={particleGap}
        speed={speed}
        color={color}
        className="w-full h-full min-h-[650px]"
      />
    </div>
  );
}
