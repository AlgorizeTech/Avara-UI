"use client";

import { Globe, type GlobeVariant } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeDemo({
  variant = "interactive-dots",
  size = 560,
  speed = 1,
}: {
  variant?: GlobeVariant;
  size?: number;
  speed?: number;
}) {
  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4">
      <Globe variant={variant} size={size} speed={speed} interactive={true} />
    </div>
  );
}
