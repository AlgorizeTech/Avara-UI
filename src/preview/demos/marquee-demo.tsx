"use client";

import { cn } from "@/lib/utils";
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";
import {
  Box,
  Boxes,
  Code2,
  Command,
  Hexagon,
  Layers,
  Network,
  Palette,
  Sparkles,
  Triangle,
} from "lucide-react";

const logos = [
  { icon: Command, name: "Command" },
  { icon: Palette, name: "Palette" },
  { icon: Sparkles, name: "Motion" },
  { icon: Boxes, name: "Packages" },
  { icon: Network, name: "Network" },
  { icon: Hexagon, name: "Hexagon" },
  { icon: Layers, name: "Layers" },
  { icon: Triangle, name: "Triangle" },
  { icon: Code2, name: "Code" },
  { icon: Box, name: "Blocks" },
];

const testimonials = [
  {
    name: "Sarah Connor",
    role: "Product Manager",
    text: "This component library has completely transformed our workflow. Everything just works perfectly out of the box.",
  },
  {
    name: "John Wick",
    role: "Lead Developer",
    text: "The cleanest, most well-documented React code I have ever seen. Absolutely essential for modern web dev.",
  },
  {
    name: "Ellen Ripley",
    role: "UX Designer",
    text: "Beautiful default styles and incredibly smooth animations. It makes prototyping high-fidelity interfaces a breeze.",
  },
  {
    name: "Neo",
    role: "Software Engineer",
    text: "Finally, a library that gives me full control over the code without abstracting away all the important details.",
  },
];

const images = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", // Mountain sunset
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop", // Lush forest trees
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Tropical beach ocean
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", // Snowy mountain night star sky
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", // Foggy green valley mountain
];

export default function MarqueeDemo({
  contentType = "logos",
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  fade = true,
}: {
  contentType?: "logos" | "testimonials" | "images";
  direction?: "left" | "right" | "up" | "down";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  fade?: boolean;
}) {
  // Determine gap based on content type
  const gap = contentType === "logos" ? "4rem" : "1.5rem";
  const isVertical = direction === "up" || direction === "down";

  const renderContent = () => {
    if (contentType === "logos") {
      return logos.map((logo, i) => (
        <div
          key={i}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-bold text-xl"
        >
          <logo.icon className="w-8 h-8" />
          {logo.name}
        </div>
      ));
    }
    if (contentType === "testimonials") {
      return testimonials.map((t, i) => (
        <div
          key={i}
          className="w-[300px] shrink-0 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            "{t.text}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {t.name}
              </p>
              <p className="text-xs text-zinc-500">{t.role}</p>
            </div>
          </div>
        </div>
      ));
    }
    if (contentType === "images") {
      return images.map((src, i) => (
        <div
          key={i}
          className="w-[220px] h-[160px] shrink-0 rounded-2xl overflow-hidden shadow-md border border-zinc-200/60 dark:border-zinc-800"
        >
          <img src={src} alt="Nature landscape" className="w-full h-full object-cover" />
        </div>
      ));
    }
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center relative z-10 overflow-hidden py-16 sm:py-24 px-4 my-auto",
        isVertical ? "min-h-[480px]" : "min-h-[260px]",
      )}
    >
      <MarqueeBlock
        key={`${contentType}-${direction}-${speed}-${pauseOnHover}-${fade}`} // Force re-render on drastic changes to ensure clean animation resets
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
        fade={fade}
        gap={gap}
        className={isVertical ? "h-[380px] w-full max-w-[300px]" : "w-full py-2"}
      >
        {renderContent()}
      </MarqueeBlock>
    </div>
  );
}
