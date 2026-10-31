"use client";

import { BentoCascadeHero } from "@/components/custom/blocks/BentoCascadeHeroBlock";
import { toBlockColor } from "@/lib/accent";

interface HeroBentoCascadeDemoProps {
  color?: string;
  rounded?: boolean;
}

export default function HeroBentoCascadeDemo({
  color: pickedColor = "primary",
  rounded = true,
}: HeroBentoCascadeDemoProps) {
  const color = toBlockColor(pickedColor);

  return (
    <div
      className={
        rounded
          ? "w-full my-4 sm:my-6 overflow-hidden rounded-[var(--radius-2xl,1rem)] border border-border bg-background"
          : "w-full overflow-hidden bg-background"
      }
    >
      <BentoCascadeHero
        accent={color}
        title="Explore wild nature & plan"
        titleAccent="your next escape"
        subtitle="Discover handpicked alpine sanctuaries, secluded glacial lakes, and ancient redwood trails tailored for unforgettable outdoor journeys."
        primaryActionLabel="Start exploring"
        primaryActionHref="#explore"
        secondaryActionLabel="View journeys"
        secondaryActionHref="#destinations"
        speed={30}
        className="w-full py-8 sm:py-12 lg:py-16"
      />
    </div>
  );
}
