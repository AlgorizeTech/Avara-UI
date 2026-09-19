"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { CircularText } from "@/components/custom/blocks/CircularTextBlock";

// Every example is written against the theme tokens — the ring's default
// `color` is `var(--primary)`, centres use `bg-primary` / `text-primary-foreground`,
// and where the ring is `currentColor` its parent carries `text-primary` — so
// the preset and the docs colour picker reach all three.
export default function CircularTextDemo({
  example = "badge",
  speed = 20,
  direction = "clockwise",
}: {
  /** `badge` is a play button; `stamp` a plain mark; `link` an arrow that reacts to hover. */
  example?: "badge" | "stamp" | "link";
  speed?: number;
  direction?: "clockwise" | "counterclockwise";
}) {
  if (example === "stamp") {
    return (
      <div className="flex min-h-[260px] w-full items-center justify-center gap-10 px-6">
        {/* Ring in the theme colour, mark in ink. */}
        <CircularText text="Est. 2021" separator=" ✦ " size={140} speed={speed} direction={direction} fontSize={10} innerRing>
          <span className="font-serif text-3xl italic text-foreground">tz</span>
        </CircularText>
        {/* The other way round: ring in ink, the dot in the theme colour. */}
        <CircularText text="Open studio" size={110} speed={speed} direction={direction} fontSize={11} tracking={0.22} color="currentColor" className="text-foreground">
          <span className="size-3 rounded-full bg-primary" />
        </CircularText>
      </div>
    );
  }

  if (example === "link") {
    return (
      <div className="flex min-h-[260px] w-full items-center justify-center px-6">
        <a
          href="#work"
          className="group rounded-full text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <CircularText text="See the work" size={128} speed={speed} direction={direction} fontSize={10} color="currentColor">
            <span className="grid size-12 place-items-center rounded-full border border-current transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </CircularText>
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-[260px] w-full items-center justify-center px-6">
      <CircularText text="Learn about us through this video" size={128} speed={speed} direction={direction} fontSize={10} tracking={0.12}>
        <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play size={14} className="ml-0.5 fill-current" />
        </span>
      </CircularText>
    </div>
  );
}
