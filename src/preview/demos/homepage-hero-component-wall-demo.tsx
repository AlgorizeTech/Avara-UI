"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HomepageHeroComponentWallDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">
      <HeroBlock
        variant="component-wall"
        color={color}
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full py-6 sm:py-10"
      />
    </div>
  );
}
