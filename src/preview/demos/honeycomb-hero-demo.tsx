"use client";

import { HoneycombHero } from "@/components/custom/blocks/HoneycombHeroBlock";

export default function HoneycombHeroDemo({ color = "primary" }: { color?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <HoneycombHero
        color={color}
        title="Amazing"
        titleAccent="Norway"
        subtitle="Visit Norway, you will never regret it. This is something incredible - fantastic nature, fjords, fancy outlines of the coast..."
        primaryActionLabel="Book a tour"
        primaryActionHref="#"
        className="w-full"
      />
    </div>
  );
}
