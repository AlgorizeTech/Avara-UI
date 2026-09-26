"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HeroDataDemo() {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
