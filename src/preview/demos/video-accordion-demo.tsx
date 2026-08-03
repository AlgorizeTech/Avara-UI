"use client";

import {
  AccordionPanel,
  VideoAccordion,
} from "@/components/custom/blocks/VideoAccordionBlock";

const samplePanels: AccordionPanel[] = [
  {
    id: "ocean",
    title: "Ocean Life",
    description:
      "Dive deep into the abyss and discover the serene, mysterious world beneath the waves.",
    videoSrc:
      "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/v1/samples/sea-turtle.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "wildlife",
    title: "Majestic Wildlife",
    description:
      "Experience the power and scale of untamed nature across the world's most remote habitats.",
    videoSrc:
      "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/v1/samples/elephants.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "soaring",
    title: "Aerial Perspectives",
    description:
      "Take to the skies and see the world from a completely new vantage point.",
    videoSrc:
      "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/v1/samples/eagle.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "nature",
    title: "Rolling Pastures",
    description:
      "Peaceful, quiet, and completely natural. A breath of fresh air for your landing pages.",
    videoSrc:
      "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/v1/samples/cows.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function VideoAccordionDemo() {
  return (
    <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-16 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
      {/* Subtle Adaptive Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-zinc-900/5 dark:bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10 shadow-2xl">
        {/* By omitting defaultActiveId, it starts in the clean resting state */}
        <VideoAccordion panels={samplePanels} />
      </div>
    </div>
  );
}
