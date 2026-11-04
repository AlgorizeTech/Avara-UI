"use client";

import { HeroBlock } from "@/components/custom/blocks/HeroBlock";
import { toBlockColor } from "@/lib/accent";

export default function HomepageHeroDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background">
      <HeroBlock
        variant="bounce"
        color={toBlockColor(color)}
        badgeText="Next-Gen React Components"
        badgeHref="#"
        titlePrefix="Build Interactive "
        typingWords={["Interfaces", "Components", "Experiences", "Animations"]}
        subtitle="A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
        cliCommand="npx shadcn@latest add button"
        primaryActionLabel="Browse Components"
        primaryActionHref="#"
        secondaryActionLabel="Star on GitHub"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
