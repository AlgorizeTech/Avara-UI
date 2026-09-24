"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";
import { toBlockColor } from "@/lib/accent";

export default function HeroFacilityDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="facility"
        color={toBlockColor(color)}
        primaryActionHref="#"
        className="w-full"
      />
    </div>
  );
}
