"use client";

import {
  TopDestinations,
  type DestinationItem,
} from "@/components/custom/blocks/TopDestinationsBlock";
import { useEffect, useRef, useState } from "react";

export default function TopDestinationsDemo({
  title = "Top Destinations",
  subtitle = "Experience our Instagram moments, where we share team activities, product stories, and memorable events that showcase our brand's journey and community connections.",
  scrollOffset = 450,
}: {
  title?: string;
  subtitle?: string;
  scrollOffset?: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full pl-[15px] pt-[15px] pb-[15px] pr-0">
      <div className="w-full rounded-l-2xl border-y border-l border-border bg-background/80 relative overflow-hidden shadow-sm">
        {/* Internal scroll viewport */}
        <div
          ref={viewportRef}
          className="w-full h-[560px] sm:h-[750px] overflow-y-auto overflow-x-hidden custom-scrollbar relative"
        >
          <TopDestinations
            title={title}
            subtitle={subtitle}
            scrollOffset={scrollOffset}
            scrollerRef={mounted ? viewportRef : undefined}
            onExplore={(item) => {
              console.log("Selected destination:", item.title);
            }}
          />
        </div>
      </div>
    </div>
  );
}
