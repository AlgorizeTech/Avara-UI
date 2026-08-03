"use client";

import {
  CarouselItem,
  ThreeDCarousel,
} from "@/components/custom/blocks/ThreeDCarouselBlock";

const sampleItems: CarouselItem[] = [
  {
    id: "c1",
    category: "Architecture",
    title: "Futuristic Urban Sanctuary",
    description:
      "Experience next-generation living spaces integrated seamlessly with natural organic flora.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c2",
    category: "Automotive",
    title: "Cybernetic Grand Tourer",
    description:
      "Pure electric performance meeting aerodynamic excellence and bespoke luxury craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c3",
    category: "Horology",
    title: "Chronograph Royale",
    description:
      "Precision Swiss engineering housed inside a brushed titanium and sapphire crystal case.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c4",
    category: "Expedition",
    title: "Nordic Glacial Retreat",
    description:
      "Isolated tranquility under the mesmerizing lights of the Arctic Aurora Borealis.",
    image:
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c5",
    category: "Acoustics",
    title: "Obsidian Studio Monitors",
    description:
      "Audiophile-grade acoustic fidelity engineered for high-resolution spatial soundscapes.",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Carousel3DDemo() {
  return (
    <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] py-8 sm:py-12 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
      {/* Subtle Ambient Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <ThreeDCarousel items={sampleItems} autoPlay={true} autoPlayInterval={4000} />
      </div>
    </div>
  );
}
