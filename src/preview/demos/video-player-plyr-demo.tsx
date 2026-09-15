"use client";

import { PlyrPlayer } from "@/components/custom/blocks/VideoPlayerPlyrBlock";

/** Per-provider media, so switching `provider` in a showcase stays playable. */
const MEDIA = {
  html5: {
    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    srcType: "video/mp4",
    posterUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
    title: "View From A Blue Moon",
    subtitle: "A native mp4 behind Plyr's control bar",
  },
  youtube: {
    src: "LXb3EKWsInQ",
    srcType: undefined,
    posterUrl: undefined,
    title: "Wilderness Unbound",
    subtitle: "The same control bar, in front of YouTube",
  },
  vimeo: {
    src: "76979871",
    srcType: undefined,
    posterUrl: undefined,
    title: "Vimeo Staff Picks",
    subtitle: "The same control bar, in front of Vimeo",
  },
} as const;

const AUDIO = {
  src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
  srcType: "audio/mpeg",
  posterUrl: undefined,
  title: "It All Began With a Burst",
  subtitle: "Kishi Bashi — 151a",
} as const;

export default function VideoPlayerPlyrDemo({
  provider = "html5",
  mediaType = "video",
  aspectRatio = "16/9",
  enableGlow = true,
  showOverlay = true,
  accentColor,
  color = "primary",
}: {
  provider?: "html5" | "youtube" | "vimeo";
  mediaType?: "video" | "audio";
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  enableGlow?: boolean;
  showOverlay?: boolean;
  accentColor?: string;
  color?: string;
}) {
  const media = mediaType === "audio" ? AUDIO : MEDIA[provider];

  return (
    <div
      style={{ "--theme-color": color.startsWith("#") ? color : `var(--${color},var(--primary))` } as React.CSSProperties}
      className="w-full relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl">
        <PlyrPlayer
          provider={mediaType === "audio" ? "html5" : provider}
          mediaType={mediaType}
          aspectRatio={aspectRatio}
          enableGlow={enableGlow}
          showOverlay={showOverlay}
          // Falls through to the page's theme colour when no explicit accent is
          // set, so the Plyr control bar tracks the docs colour picker.
          accentColor={accentColor ?? "var(--theme-color, var(--primary))"}
          {...media}
        />
      </div>
    </div>
  );
}
