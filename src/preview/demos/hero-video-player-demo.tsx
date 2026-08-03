"use client";

import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function HeroVideoPlayerDemo({
  enableGlow = true,
  aspectRatio = "16/9",
  modalSize = "lg",
}: {
  enableGlow?: boolean;
  aspectRatio?: "16/9" | "21/9" | "4/3";
  modalSize?: "lg" | "xl" | "full";
}) {
  return (
    <div className="w-full bg-zinc-50 dark:bg-[#020202] relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-3 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl">
        <HeroVideoPlayer
          enableGlow={enableGlow}
          aspectRatio={aspectRatio}
          modalSize={modalSize}
          badge="Platform v2.4"
          title="Experience the Architecture in Action"
          subtitle="Watch how our lightning-fast engine transforms your development workflow in under 3 minutes."
          playButtonLabel="Watch 4K Demo"
        />
      </div>
    </div>
  );
}
