"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";
import { toBlockColor } from "@/lib/accent";

export default function HomepageHeroGlowArcDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="pet-shop"
        color={toBlockColor(color)}
        className="w-full"
      />
    </div>
  );
}
