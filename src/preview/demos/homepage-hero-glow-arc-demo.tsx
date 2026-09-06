"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HomepageHeroGlowArcDemo() {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#08080a]">
      <HeroBlock
        variant="pet-shop"
        className="w-full"
      />
    </div>
  );
}
