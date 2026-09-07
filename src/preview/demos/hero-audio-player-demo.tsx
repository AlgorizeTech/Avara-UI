"use client";

import { HeroAudioPlayer } from "@/components/custom/blocks/HeroAudioPlayerBlock";

export default function HeroAudioPlayerDemo({
  variant = "hero",
  enableGlow = true,
  skipSeconds = 10,
  loop = false,
  color = "primary",
}: {
  variant?: "hero" | "bar" | "native";
  enableGlow?: boolean;
  skipSeconds?: number;
  loop?: boolean;
  color?: string;
}) {
  return (
    <div
      style={{ "--theme-color": color.startsWith("#") ? color : `var(--${color},var(--primary))` } as React.CSSProperties}
      className="w-full relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl">
        <HeroAudioPlayer
          variant={variant}
          enableGlow={enableGlow}
          skipSeconds={skipSeconds}
          loop={loop}
          badge="Now Playing"
          title="It All Began With a Burst"
          subtitle="Kishi Bashi — 151a"
          artworkUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
          artworkAlt="Studio microphone in warm light"
        />
      </div>
    </div>
  );
}
