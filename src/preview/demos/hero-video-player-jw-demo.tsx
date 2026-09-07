"use client";

import { HeroJwPlayer } from "@/components/custom/blocks/HeroVideoPlayerJwBlock";

const COPY = {
  default: {
    badge: "JW Player — Default",
    title: "Enterprise-grade video delivery",
    subtitle:
      "JW's own control bar, untouched. Adaptive streaming, analytics and DRM behind it.",
  },
  midnight: {
    badge: "JW Player — Midnight",
    title: "Skinned to your brand",
    subtitle:
      "The same player with a `skin` colour config: control bar, menus, time slider and tooltips.",
  },
  neon: {
    badge: "JW Player — Neon",
    title: "Skinned to your brand",
    subtitle: "A high-contrast cyan preset over the same JW control bar.",
  },
  sunset: {
    badge: "JW Player — Sunset",
    title: "Skinned to your brand",
    subtitle: "A warm amber preset over the same JW control bar.",
  },
  minimal: {
    badge: "JW Player — Minimal",
    title: "Skinned to your brand",
    subtitle: "A transparent control bar that sits directly on the frame.",
  },
} as const;

export default function HeroVideoPlayerJwDemo({
  skin = "default",
  aspectRatio = "16/9",
  enableGlow = true,
  showCaption = true,
  autoStart = false,
  color = "primary",
}: {
  skin?: "default" | "midnight" | "neon" | "sunset" | "minimal";
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  enableGlow?: boolean;
  showCaption?: boolean;
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
        <HeroJwPlayer
          skin={skin}
          aspectRatio={aspectRatio}
          enableGlow={enableGlow}
          showCaption={showCaption}
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
