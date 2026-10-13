"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";
import { toBlockColor } from "@/lib/accent";

interface HeroOrbitDemoProps {
  color?: string;
}

export default function HeroOrbitDemo({
  color: pickedColor = "primary",
}: HeroOrbitDemoProps) {
  const color = toBlockColor(pickedColor);

  return (
    <div className="w-full my-4 sm:my-6 overflow-hidden rounded-2xl border border-border bg-background">
      <HeroBlock
        variant="orbit"
        color={color}
        badgeText="Identity & animation studio"
        badgeHref="#"
        title="Movement is what"
        titleAccent="people notice first."
        subtitle="We design brand identities and the animation that brings them to life — from early sketches to the live release."
        primaryActionLabel="Work with us"
        primaryActionHref="#"
        secondaryActionLabel="View projects"
        secondaryActionHref="#"
        className="w-full py-12 sm:py-16 lg:py-20"
      />
    </div>
  );
}

