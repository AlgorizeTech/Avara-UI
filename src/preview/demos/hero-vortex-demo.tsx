"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HeroVortexDemo({
  color,
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="vortex"
        color={color && color !== "primary" && color !== "default" ? color : "#0052cc"}
        primaryActionHref="#"
        className="w-full"
      />
    </div>
  );
}
