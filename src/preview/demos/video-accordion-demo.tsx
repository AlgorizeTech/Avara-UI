"use client";

import {
  AccordionPanel,
  VideoAccordion,
} from "@/components/custom/blocks/VideoAccordionBlock";

const samplePanels: AccordionPanel[] = [
  {
    id: "ocean",
    title: "Alpine Sanctuary",
    description:
      "Explore the tranquil turquoise waters of pristine high-altitude mountain lakes surrounded by majestic peaks.",
    videoSrc: "/videos/sanctuary.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description:
      "Venture deep into lush, ancient pine groves and mist-shrouded woodland valleys untouched by time.",
    videoSrc: "/videos/rainforest.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description:
      "Soar above golden sunset horizons, jagged rocky cliffs, and sweeping atmospheric cloudscapes.",
    videoSrc: "/videos/ridge.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description:
      "Listen to the peaceful roar of crystal streams flowing through mossy granite boulders in deep wilderness.",
    videoSrc: "/videos/waterfalls.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function VideoAccordionDemo({
  defaultActiveId,
  panelCount,
}: {
  /** Starts with one panel already expanded instead of the resting state. */
  defaultActiveId?: string;
  /** Trims the rail so you can see how few panels still read well. */
  panelCount?: number;
}) {
  const panels = panelCount ? samplePanels.slice(0, panelCount) : samplePanels;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full h-full relative z-10">
        {/* By omitting defaultActiveId, it starts in the clean resting state */}
        <VideoAccordion
          key={`${defaultActiveId}-${panels.length}`}
          panels={panels}
          defaultActiveId={defaultActiveId}
          className="w-full h-full min-h-[500px]"
        />
      </div>
    </div>
  );
}
