"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function HeroDoctorDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="doctor"
        color={color}
        badgeHref="#"
        primaryActionHref="#"
        secondaryActionHref="#"
        className="w-full"
      />
    </div>
  );
}
