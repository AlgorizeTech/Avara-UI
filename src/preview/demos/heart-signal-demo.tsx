"use client";

import { HeartSignal, type HeartSignalVariant } from "@/components/custom/blocks/HeartSignalBlock";
import { toBlockColor } from "@/lib/accent";

export default function HeartSignalDemo({
  variant = "ecg-line",
  bpm = 75,
  speed = 0.25,
  color: pickedColor,
  showBPM = true,
  showGrid = true,
}: {
  variant?: HeartSignalVariant;
  bpm?: number;
  speed?: number;
  color?: string;
  showBPM?: boolean;
  showGrid?: boolean;
}) {
  const color = toBlockColor(pickedColor);
  return (
    <div className="w-full flex items-center justify-center p-1 sm:p-3 md:p-4">
      <HeartSignal
        variant={variant}
        bpm={bpm}
        speed={speed}
        color={color}
        showBPM={showBPM}
        showGrid={showGrid}
        className="w-full h-[480px] sm:h-[560px] lg:h-[680px]"
      />
    </div>
  );
}
