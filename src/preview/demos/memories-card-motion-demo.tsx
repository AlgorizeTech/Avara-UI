"use client";

import {
  MemoriesCard,
  MemoryItem,
} from "@/components/custom/blocks/framer/MemoriesCardBlock";
import { accentStyle } from "@/lib/accent";
import { useState } from "react";

const sampleMemories: MemoryItem[] = [
  {
    id: "m1",
    tag: "Highlight",
    title: "Alpine Forest Lake",
    location: "Swiss Alps",
    date: "Oct 2025",
    description:
      "Serene pine forests reflecting over calm turquoise mountain waters at sunrise.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "m2",
    tag: "Expedition",
    title: "Dolomites Alpine Ridge",
    location: "South Tyrol, Italy",
    date: "Aug 2025",
    description:
      "Reaching the summit just as the morning sun cast jagged shadows across the limestone peaks.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
  {
    id: "m3",
    tag: "Sanctuary",
    title: "Emerald Forest Stream",
    location: "Pacific Northwest",
    date: "Jul 2025",
    description:
      "A tranquil river winding through dense ancient rainforests and mossy rocks.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "m4",
    tag: "Wilderness",
    title: "Cascading Mountain Falls",
    location: "Alberta, Canada",
    date: "Jun 2025",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
];

export default function MemoriesCardFramerDemo({
  itemSet = "full",
  showIndex = false,
  color = "primary",
}: {
  /** "minimal" strips the optional tag/location/date/description fields. */
  itemSet?: "full" | "minimal";
  /** Renders an onCardChange readout under the deck. */
  showIndex?: boolean;
  /** Accent from the gallery's colour picker. */
  color?: string;
}) {
  const items =
    itemSet === "minimal"
      ? sampleMemories.map(({ id, title, image }) => ({ id, title, image }))
      : sampleMemories;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    // MemoriesCard is already written against --primary (active ring, tag pill,
    // date/location icons, reset button), so repointing the token recolours it.
    <div
      style={accentStyle(color)}
      className="w-full flex flex-col items-center justify-center bg-muted/40 py-8 sm:py-12 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-border transition-colors duration-300"
    >
      {/* Ambient Radial Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primary/5 dark:bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <MemoriesCard
          key={itemSet}
          items={items}
          onCardChange={showIndex ? setActiveIndex : undefined}
        />
      </div>

      {showIndex && (
        <p className="relative z-10 mt-6 text-sm font-semibold text-muted-foreground tabular-nums">
          onCardChange → index {activeIndex+1}
        </p>
      )}
    </div>
  );
}
