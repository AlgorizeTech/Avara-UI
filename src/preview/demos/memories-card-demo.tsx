"use client";

import {
  MemoriesCard,
  MemoryItem,
} from "@/components/custom/blocks/MemoriesCardBlock";

const sampleMemories: MemoryItem[] = [
  {
    id: "m1",
    tag: "Highlight",
    title: "Kyoto Lantern Festival",
    location: "Kyoto, Japan",
    date: "Oct 2025",
    description:
      "Walking through thousands of glowing paper lanterns illuminating the historic Gion district at twilight.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "m3",
    tag: "Sanctuary",
    title: "Amalfi Coast Drive",
    location: "Positano, Italy",
    date: "Jul 2025",
    description:
      "Cruising along cliffside roads winding above the turquoise waters of the Mediterranean Sea.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "m4",
    tag: "Wilderness",
    title: "Banff Glacial Lake",
    location: "Alberta, Canada",
    date: "Jun 2025",
    description:
      "Canoeing across crystal-clear emerald waters fed directly by ancient mountain glaciers.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function MemoriesCardDemo() {
  return (
    <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-12 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
      {/* Ambient Radial Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primary/5 dark:bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <MemoriesCard items={sampleMemories} />
      </div>
    </div>
  );
}
