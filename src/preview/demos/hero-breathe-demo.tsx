"use client";

import { BreatheHero } from "@/components/custom/blocks/BreatheHeroBlock";
import { toBlockColor } from "@/lib/accent";

interface HeroBreatheDemoProps {
  color?: string;
  rounded?: boolean;
}

export default function HeroBreatheDemo({
  color: pickedColor = "primary",
  rounded = true,
}: HeroBreatheDemoProps) {
  const color = toBlockColor(pickedColor);

  return (
    <div
      className={
        rounded
          ? "w-full h-screen overflow-hidden bg-background"
          : "w-full h-screen overflow-hidden bg-background"
      }
    >
      <BreatheHero
        accent={color}
        title="Crafted for depth,"
        titleAccent="built for motion."
        description="Create immersive digital experiences where fluid scroll choreography, spatial architecture, and tactile visual polish move in effortless harmony."
        badgeText="Interactive Motion Architecture"
        badgeHighlight="Studio v2.4"
        badgeHref="#explore"
        buttonLabel="Start Exploring"
        buttonHref="#get-started"
        secondaryButtonLabel="View Showroom"
        secondaryButtonHref="#showroom"
        internalScroll={true}
        scrollMode="grow"
        hoverMode="zoom"
        captions="hover"
      />
    </div>
  );
}
