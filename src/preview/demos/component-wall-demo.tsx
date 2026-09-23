"use client";

import { ComponentWall } from "@/components/custom/blocks/ComponentWallBlock";
import { GitHubIcon } from "@/components/custom/blocks/Icons";
import { WALL_AVATARS, WALL_ITEMS, WALL_STACK } from "@/constants/component-wall";

export default function ComponentWallDemo({
  interval = 4500,
  order = "serial",
  layout = "center",
}: {
  /** Milliseconds the camera rests on a card; 0 holds still. */
  interval?: number;
  /** Card by card, or every card once per round in a random order. */
  order?: "serial" | "shuffle";
  /** Copy on the left and the wall on the right, or the copy between two walls. */
  layout?: "split" | "center";
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <ComponentWall
        badge={{ label: "Next-gen React components", href: "#" }}
        heading="Build interactive {word}."
        headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
        accent="interactive"
        description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Framer Motion."
        install={{ command: "npx shadcn@latest add @algorize-ui/{item}" }}
        primaryAction={{ label: "Browse components", href: "#" }}
        secondaryAction={{ label: "Star on GitHub", href: "#", icon: <GitHubIcon size={16} /> }}
        trust={{ text: "Loved by developers shipping real products with it", avatars: WALL_AVATARS, rating: 5 }}
        items={WALL_ITEMS}
        stack={{ label: "Built with", groups: WALL_STACK }}
        interval={interval}
        order={order}
        layout={layout}
      />
    </div>
  );
}
