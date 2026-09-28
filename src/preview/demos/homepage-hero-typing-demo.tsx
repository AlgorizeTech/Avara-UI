"use client";

import type { PrefixPosition } from "@/components/custom/blocks/AnimatedTypographyBlock";
import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HomepageHeroTypingDemo({
  color = "primary",
  prefixPosition,
}: {
  color?: string;
  /** Whether the title holds still ("fixed") or re-centres as the word types ("fluid"). */
  prefixPosition?: PrefixPosition;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="typing"
        prefixPosition={prefixPosition}
        color={color}
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
