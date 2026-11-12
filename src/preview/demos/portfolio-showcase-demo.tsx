"use client";

import { PortfolioShowcase, type PortfolioItem } from "@/components/custom/blocks/PortfolioShowcaseBlock";

export default function PortfolioShowcaseDemo({
  variant = "masonry-portfolio",
  interval = true,
  intervalTime = 5500,
  order = "shuffle",
  zoom = 0.55,
  mobileZoom = 0.42,
  gap = 16,
  stagger = 72,
  draggable = true,
  drift,
  cardDim = 1,
  highlightFocus = false,
  cardShadow = true,
  itemModal = true,
  items,
}: {
  variant?: "masonry-portfolio" | "fullscreen";
  interval?: boolean | number;
  intervalTime?: number;
  order?: "serial" | "shuffle";
  zoom?: number;
  mobileZoom?: number;
  gap?: number;
  stagger?: number;
  draggable?: boolean;
  drift?: boolean | { x?: number; y?: number };
  cardDim?: number;
  highlightFocus?: boolean;
  cardShadow?: boolean;
  itemModal?: boolean;
  items?: PortfolioItem[];
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border">
      <PortfolioShowcase
        variant={variant}
        items={items}
        interval={interval}
        intervalTime={intervalTime}
        order={order}
        zoom={zoom}
        mobileZoom={mobileZoom}
        gap={gap}
        stagger={stagger}
        draggable={draggable}
        drift={drift}
        cardDim={cardDim}
        highlightFocus={highlightFocus}
        cardShadow={cardShadow}
        itemModal={itemModal}
      />
    </div>
  );
}
