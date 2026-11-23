"use client";

import {
  type AccordionPanel,
  VideoAccordion,
} from "@/components/custom/blocks/VideoAccordionBlock";

const poster = (id: string) =>
  `https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/${id}`;

// No `videoSrc`: the docs demo streams four large clips, which a thumbnail must
// not download. Each panel keeps its poster, which is what the card shows.
const PANELS: AccordionPanel[] = [
  {
    id: "ocean",
    title: "Alpine Sanctuary",
    description: "Tranquil turquoise waters surrounded by majestic peaks.",
    videoSrc: "",
    posterUrl: poster("v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"),
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description: "Lush, ancient pine groves and mist-shrouded valleys.",
    videoSrc: "",
    posterUrl: poster("v1790159968/photo-1470058869958-2a77ade41c02-1790159970122.jpg"),
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description: "Golden sunset horizons and sweeping cloudscapes.",
    videoSrc: "",
    posterUrl: poster("v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"),
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description: "Crystal streams flowing through mossy granite boulders.",
    videoSrc: "",
    posterUrl: poster("v1790159968/photo-1432405972618-c60b0225b8f9-1790159970121.jpg"),
  },
];

/** The Video Accordion catalog card's scene: the rail with posters, no video. */
export default function VideoAccordionScene() {
  return (
    <div className="h-[330px] w-full max-w-3xl px-6">
      <VideoAccordion panels={PANELS} className="h-full w-full" />
    </div>
  );
}
