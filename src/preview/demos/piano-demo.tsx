"use client";

import { Piano } from "@/components/custom/piano";

export default function PianoDemo() {
  return (
    <div className="w-full min-h-[440px] p-6 sm:p-12 flex flex-col items-center justify-center bg-muted/40 rounded-2xl border border-border">
      <Piano />
    </div>
  );
}
