"use client";

import { HoneycombHero } from "@/components/custom/blocks/HoneycombHeroBlock";

export default function HoneycombHeroDemo({
  interval = 4000,
  accent,
  color,
}: {
  /** Milliseconds between steps; 0 turns autoplay off. */
  interval?: number;
  /** The docs colour picker: `primary` keeps the theme's, a hex or preset overrides it. */
  accent?: string;
  color?: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl">
      <HoneycombHero
        title="Wander the"
        titleAccent="Fjords"
        subtitle="Waterfalls that drop straight into the sea, red cabins at the water's edge and skies that glow green after dark — small-group journeys through the far north."
        primaryActionLabel={"Plan\nyour trip"}
        primaryActionHref="#"
        accent={accent}
        color={color}
        interval={interval}
        className="w-full"
      />
    </div>
  );
}
