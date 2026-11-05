"use client";

import { REGISTRY_NAMESPACE } from "@/lib/registry";
import { ComponentWall } from "@/components/custom/blocks/ComponentWallBlock";
import { GitHubIcon } from "@/components/custom/blocks/Icons";
import { WALL_AVATARS, WALL_ITEMS, WallStack } from "@/constants/component-wall";

export default function ComponentWallDemo({
  interval,
  order = "serial",
  layout = "center",
  persistentBackground = false,
  showMobileWall = true,
  mobileBackground,
  mobileZoom,
  gap,
  stagger,
  draggable,
  drift,
  cardDim,
  highlightFocus,
}: {
  /** Milliseconds the camera rests on a card; 0 holds still. */
  interval?: number;
  /** Card by card, or every card once per round in a random order. */
  order?: "serial" | "shuffle";
  /** Copy on the left and the wall on the right, copy between two walls, or full-width wall without copy. */
  layout?: "split" | "center" | "center-background" | "fullscreen" | "wall-only";
  /** Keep wall in the background on mobile instead of dropping as a bottom band. */
  persistentBackground?: boolean;
  /** Whether to show wall animations on mobile/small screens (<lg). Defaults to true. */
  showMobileWall?: boolean;
  /** Alias for showMobileWall. Set to false to hide animations on small screens. */
  mobileBackground?: boolean;
  /** Scale of background cards on small/mobile screens. */
  mobileZoom?: number;
  /** Gap in pixels between cards in all directions (top, bottom, left, right). Defaults to 16. */
  gap?: number;
  /** Stagger offset between alternate columns for masonry flow. Defaults to 72. */
  stagger?: number;
  /** Whether the user can drag/pan the wall in 4 directions. */
  draggable?: boolean;
  /** Ambient slow continuous drift when not dragging. */
  drift?: boolean | { x?: number; y?: number };
  /** Opacity of resting background cards (e.g. 0.52 for dusky aesthetic). */
  cardDim?: number;
  /** Whether to highlight center/focused cards and dim others. */
  highlightFocus?: boolean;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border">
      <ComponentWall
        badge={{ label: "Next-gen React components", href: "#" }}
        heading="Build interactive {word}."
        headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
        accent="interactive"
        description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Motion."
        install={{ command: `npx shadcn@latest add ${REGISTRY_NAMESPACE}/{item}` }}
        primaryAction={{ label: "Browse components", href: "#" }}
        secondaryAction={{ label: "Star on GitHub", href: "#", icon: <GitHubIcon size={16} /> }}
        trust={{ text: "Loved by developers shipping real products with it", avatars: WALL_AVATARS, rating: 5 }}
        items={WALL_ITEMS}
        stack={<WallStack variant={layout === "split" ? "labelled" : "compact"} />}
        interval={interval ?? (layout === "fullscreen" || layout === "wall-only" ? 0 : 4500)}
        order={order}
        layout={layout}
        persistentBackground={persistentBackground}
        showMobileWall={showMobileWall}
        mobileBackground={mobileBackground}
        mobileZoom={mobileZoom}
        gap={gap}
        stagger={stagger}
        draggable={draggable}
        drift={drift}
        cardDim={cardDim}
        highlightFocus={highlightFocus}
      />
    </div>
  );
}
