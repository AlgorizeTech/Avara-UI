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
    <div className="w-full rounded-2xl border border-border bg-background/80 relative overflow-hidden shadow-sm">
      {/* Internal scroll viewport */}
      <div
        ref={viewportRef}
        className="w-full h-[750px] overflow-y-auto overflow-x-hidden custom-scrollbar relative"
      >
        <div className="h-12" />

        <TopDestinations
          title={title}
          subtitle={subtitle}
          scrollOffset={scrollOffset}
          scrollerRef={mounted ? viewportRef : undefined}
          onExplore={(item) => {
            console.log("Selected destination:", item.title);
          }}
        />

        <div className="h-16" />
      </div>
    </div>
  );
}
