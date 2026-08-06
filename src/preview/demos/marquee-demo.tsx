"use client";

import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";
import {
  Box,
  Code2,
  Command,
  Figma,
  Framer,
  Github,
  Gitlab,
  Hexagon,
  Layers,
  Triangle,
} from "lucide-react";

const logos = [
  { icon: Command, name: "Command" },
  { icon: Figma, name: "Figma" },
  { icon: Framer, name: "Framer" },
  { icon: Github, name: "Github" },
  { icon: Gitlab, name: "Gitlab" },
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
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
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
          className="w-[200px] h-[200px] shrink-0 rounded-2xl overflow-hidden shadow-sm"
        >
          <img src={src} alt="Gallery" className="w-full h-full object-cover" />
        </div>
      ));
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative z-10 overflow-hidden">
      <MarqueeBlock
        key={`${contentType}-${direction}-${speed}-${pauseOnHover}-${fade}`} // Force re-render on drastic changes to ensure clean animation resets
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
        fade={fade}
        gap={gap}
        className={isVertical ? "h-[400px] w-full max-w-[300px]" : "w-full py-4"}
      >
        {renderContent()}
      </MarqueeBlock>
    </div>
  );
}
