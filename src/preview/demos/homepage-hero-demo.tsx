"use client";

import { HomepageHeroBlock } from "@/components/custom/blocks/HomepageHeroBlock";

export default function HomepageHeroDemo() {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HomepageHeroBlock
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
