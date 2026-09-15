"use client";

import { JwPlayer } from "@/components/custom/blocks/VideoPlayerJwBlock";

// Overlay copy is one line over the picture, so it stays short.
const COPY = {
  default: {
    title: "Enterprise-grade video delivery",
    subtitle: "JW's own control bar, untouched",
  },
  midnight: {
    title: "Midnight skin",
    subtitle: "Indigo controls on near-black",
  },
  neon: {
    title: "Neon skin",
    subtitle: "High-contrast cyan over a dark bar",
  },
  sunset: {
    title: "Sunset skin",
    subtitle: "Warm amber over a stone bar",
  },
  minimal: {
    title: "Minimal skin",
    subtitle: "A transparent bar, straight on the frame",
  },
} as const;

export default function VideoPlayerJwDemo({
  skin = "default",
  aspectRatio = "16/9",
  enableGlow = true,
  showOverlay = true,
  autoStart = false,
  color = "primary",
}: {
  skin?: "default" | "midnight" | "neon" | "sunset" | "minimal";
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  enableGlow?: boolean;
  showOverlay?: boolean;
  autoStart?: boolean;
  color?: string;
}) {
  return (
    <div
      style={{ "--theme-color": color.startsWith("#") ? color : `var(--${color},var(--primary))` } as React.CSSProperties}
      className="w-full relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl">
        <JwPlayer
          skin={skin}
          aspectRatio={aspectRatio}
          enableGlow={enableGlow}
          showOverlay={showOverlay}
          autoStart={autoStart}
          // JW's public docs library. Swap in your own player id before shipping.
          playlistUrl="https://cdn.jwplayer.com/v2/media/hWF9vG66"
          file="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          posterUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
          {...COPY[skin]}
        />
      </div>
    </div>
  );
}
