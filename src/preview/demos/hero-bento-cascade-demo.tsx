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
          ? "w-full my-4 sm:my-6 overflow-hidden rounded-2xl border border-border bg-background"
          : "w-full overflow-hidden bg-background"
      }
    >
      <BentoCascadeHero
        accent={color}
        title="Search any doctors & plan"
        titleAccent="your next visit"
        subtitle="Experience leading healthcare services with expert treatments tailored to your work needs"
        primaryActionLabel="Contact us"
        primaryActionHref="#contact"
        secondaryActionLabel="What we do"
        secondaryActionHref="#services"
        speed={30}
        className="w-full py-12 sm:py-16 lg:py-20"
      />
    </div>
  );
}
