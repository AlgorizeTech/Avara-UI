"use client";

import { HomepageHeroBlock } from "@/components/custom/blocks/HomepageHeroBlock";

export default function HomepageHeroDemo() {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">
      <HomepageHeroBlock
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
