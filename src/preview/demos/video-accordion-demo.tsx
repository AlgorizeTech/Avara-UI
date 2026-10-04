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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description:
      "Venture deep into lush, ancient pine groves and mist-shrouded woodland valleys untouched by time.",
    videoSrc: "/videos/rainforest.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790159968/photo-1470058869958-2a77ade41c02-1790159970122.jpg",
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description:
      "Soar above golden sunset horizons, jagged rocky cliffs, and sweeping atmospheric cloudscapes.",
    videoSrc: "/videos/ridge.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description:
      "Listen to the peaceful roar of crystal streams flowing through mossy granite boulders in deep wilderness.",
    videoSrc: "/videos/waterfalls.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790159968/photo-1432405972618-c60b0225b8f9-1790159970121.jpg",
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
