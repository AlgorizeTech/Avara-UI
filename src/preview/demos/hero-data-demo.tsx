"use client";

import {
  Hero,
  HeroAction,
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroTitle,
  HeroVisual,
} from "@/components/custom/blocks/HeroBlock";
import { PlayCircle } from "lucide-react";

export default function HeroDataDemo() {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">
      <Hero layout="split-left" color="primary">
        <HeroContent>
          <HeroTitle>
            Where your data turns into software with a click
          </HeroTitle>
          <HeroDescription>
            Build custom portals, CRMs, and tools effortlessly. From concept
            to launch in minutes, not months.
          </HeroDescription>
          <HeroActions>
            <HeroAction variant="primary">
              <PlayCircle className="w-5 h-5 mr-2 -ml-1" /> Watch Demo
            </HeroAction>
          </HeroActions>
        </HeroContent>
        <HeroVisual>
          <div className="w-full h-[300px] lg:h-[450px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Data interface"
            />
          </div>
        </HeroVisual>
      </Hero>
    </div>
  );
}
