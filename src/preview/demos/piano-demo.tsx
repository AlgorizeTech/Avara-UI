"use client";

import { Piano } from "@/components/custom/piano";

export default function PianoDemo() {
  return (
    <div className="w-full min-h-[440px] p-6 sm:p-12 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60">
      <Piano />
    </div>
  );
}
