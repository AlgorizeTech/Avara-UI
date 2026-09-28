"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HomepageHeroGlowArcDemo() {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="pet-shop"
        className="w-full"
      />
    </div>
  );
}
