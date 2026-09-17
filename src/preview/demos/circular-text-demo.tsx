"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { CircularText } from "@/components/custom/blocks/CircularTextBlock";

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
        <CircularText text="Est. 2021" separator=" ✦ " size={140} speed={speed} direction={direction} fontSize={10} innerRing color="var(--primary)">
          <span className="font-serif text-3xl italic">tz</span>
        </CircularText>
        <CircularText text="Open studio" size={110} speed={speed} direction={direction} fontSize={11} tracking={0.22} color="#111">
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
          className="group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <CircularText text="See the work" size={128} speed={speed} direction={direction} fontSize={10} color="currentColor" className="text-[#111] dark:text-white">
            <span className="grid size-12 place-items-center rounded-full border border-current transition-all duration-300 group-hover:bg-[#111] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#111]">
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </CircularText>
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-[260px] w-full items-center justify-center px-6">
      <CircularText text="Learn about us through this video" size={128} speed={speed} direction={direction} fontSize={10} tracking={0.12} color="currentColor" className="text-[#111] dark:text-white">
        <span className="grid size-11 place-items-center rounded-full bg-[#111] text-white dark:bg-white dark:text-[#111]">
          <Play size={14} className="ml-0.5 fill-current" />
        </span>
      </CircularText>
    </div>
  );
}
