"use client";

import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function HeroVideoPlayerDemo({
  enableGlow = true,
  aspectRatio = "16/9",
  modalSize = "lg",
  color = "primary",
}: {
  enableGlow?: boolean;
  aspectRatio?: "16/9" | "21/9" | "4/3";
  modalSize?: "lg" | "xl" | "full";
  color?: string;
}) {
  return (
    <div
      style={{ "--theme-color": color.startsWith("#") ? color : `var(--${color},var(--primary))` } as React.CSSProperties}
      className="w-full relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl">
        <HeroVideoPlayer
          enableGlow={enableGlow}
          aspectRatio={aspectRatio}
          modalSize={modalSize}
          badge="Nature 4K"
          title="Wilderness Unbound"
          subtitle="A cinematic journey through serene mountain vistas and ancient forests."
          playButtonLabel="Watch Film"
          videoUrl="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1"
          thumbnailUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        />
      </div>
    </div>
  );
}
