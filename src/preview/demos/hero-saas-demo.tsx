"use client";

import {
  Hero,
  HeroBadge,
  HeroBadgeText,
  HeroContent,
  HeroDescription,
  HeroTitle,
  HeroVisual,
} from "@/components/custom/blocks/HeroBlock";

export default function HeroSaaSDemo() {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">
      <Hero layout="center" color="primary" pattern="grid">
        <HeroContent>
          <HeroBadge href="#">
            <HeroBadgeText>SETUP_EASY-PEASY!</HeroBadgeText>
          </HeroBadge>
          <HeroTitle animation="blur-in" className="max-w-4xl">
            Hassle-free setup with
            <br />
            all major development frameworks
          </HeroTitle>
          <HeroDescription className="max-w-3xl">
            Collecting submissions with formcarry is super easy, there's no
            dependency needed by default and it works with all of the popular
            development frameworks.
          </HeroDescription>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["HTML", "React", "Vue", "Svelte", "jQuery"].map((fw) => (
              <span
                key={fw}
                className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 shadow-sm"
              >
                {fw}
              </span>
            ))}
          </div>
        </HeroContent>

        <HeroVisual>
          <div className="w-full max-w-4xl mx-auto h-[300px] sm:h-[400px] bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden mt-8">
            <img
              src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2000&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-80"
              alt="App Preview"
            />
          </div>
        </HeroVisual>
      </Hero>
    </div>
  );
}
