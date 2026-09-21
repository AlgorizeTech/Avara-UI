"use client";

import { HoneycombHero } from "@/components/custom/blocks/HoneycombHeroBlock";

export default function HoneycombHeroDemo({
  interval = 4000,
}: {
  /** Milliseconds between steps; 0 turns autoplay off. */
  interval?: number;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl">
      <HoneycombHero
        title="Amazing"
        titleAccent="Norway"
        subtitle="Visit Norway, you will never regret it. This is something incredible - fantastic nature, fjords, fancy outlines of the coast..."
        primaryActionLabel={"Book\na tour"}
        primaryActionHref="#"
        interval={interval}
        className="w-full"
      />
    </div>
  );
}
