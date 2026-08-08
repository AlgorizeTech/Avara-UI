"use client";

import { HomepageHeroTypingBlock } from "@/components/custom/blocks/HomepageHeroTypingBlock";

export default function HomepageHeroTypingDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full min-h-[95vh] flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">
      <HomepageHeroTypingBlock color={color} className="w-full min-h-[95vh]" />
    </div>
  );
}
