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
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description:
      "Venture deep into lush, ancient pine groves and mist-shrouded woodland valleys untouched by time.",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description:
      "Soar above golden sunset horizons, jagged rocky cliffs, and sweeping atmospheric cloudscapes.",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description:
      "Listen to the peaceful roar of crystal streams flowing through mossy granite boulders in deep wilderness.",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1200&auto=format&fit=crop",
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
    <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-16 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
      {/* Subtle Adaptive Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-zinc-900/5 dark:bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10 shadow-2xl">
        {/* By omitting defaultActiveId, it starts in the clean resting state */}
        <VideoAccordion
          key={`${defaultActiveId}-${panels.length}`}
          panels={panels}
          defaultActiveId={defaultActiveId}
        />
      </div>
    </div>
  );
}
