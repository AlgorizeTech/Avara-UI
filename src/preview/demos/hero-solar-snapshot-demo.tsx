"use client";

import { SolarSnapshotHero } from "@/components/custom/blocks/SolarSnapshotHeroBlock";
import { toBlockColor } from "@/lib/accent";

interface HeroSolarSnapshotDemoProps {
  color?: string;
  rounded?: boolean;
}

export default function HeroSolarSnapshotDemo({
  color: pickedColor = "primary",
}: HeroSolarSnapshotDemoProps) {
  const color = toBlockColor(pickedColor);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <SolarSnapshotHero
        accent={color}
        title="Where natural light meets"
        titleAccent="expressive digital craft."
        description="Guide the radiant sun across the canvas with your cursor and click anywhere to capture an instant live snapshot of the stage."
        primaryActionLabel="Initiate Project"
        primaryActionHref="#explore"
        primaryButtonVariant="pricing-typographic"
        secondaryActionLabel="Explore Studio"
        secondaryActionHref="#lightbox"
        secondaryButtonVariant="pricing-typographic-muted"
        snapshotDurationMs={10000}
        className="h-full min-h-0"
      />
    </div>
  );
}
