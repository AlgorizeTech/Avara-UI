"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HomepageHeroNorwayDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-black">
      <HeroBlock
        variant="norway"
        color={color}
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full"
      />
    </div>
  );
}
