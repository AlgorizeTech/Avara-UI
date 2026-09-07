"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type PlyrInstance from "plyr";
import React, { useEffect, useRef, useState } from "react";

import "plyr/dist/plyr.css";

/** Where the media comes from. Plyr wraps all three behind one control bar. */
export type PlyrProvider = "html5" | "youtube" | "vimeo";

export interface HeroPlyrPlayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * For `provider="html5"` a media file URL. For `youtube` / `vimeo` either a
   * watch URL or the bare video id — Plyr accepts both.
   */
  src?: string;
  provider?: PlyrProvider;
  /** `video` renders a `<video>`, `audio` an `<audio>`. HTML5 only. */
  mediaType?: "video" | "audio";
  /** MIME type for the HTML5 source, e.g. `video/mp4`. */
  srcType?: string;
  posterUrl?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  /**
   * Drives Plyr's `--plyr-color-main`, which is what actually skins the
   * control bar, the progress fill and the focus ring.
   */
  accentColor?: string;
  /** Plyr control names in bar order. Omit for Plyr's own default set. */
  controls?: string[];
  enableGlow?: boolean;
  /** Caption block under the frame. Turn off for a bare player. */
  showCaption?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  /**
   * Where Plyr fetches its control icons. Defaults to Plyr's own CDN sprite —
   * point it at a self-hosted copy of `plyr.svg` if the page must not reach
   * out to a third-party host.
   */
  iconUrl?: string;
  onReady?: () => void;
}

const aspectRatios = {
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

/** Plyr's `ratio` option wants `w:h`, not the CSS `w/h` this component takes. */
const plyrRatios: Record<string, string> = {
  "16/9": "16:9",
  "21/9": "21:9",
  "4/3": "4:3",
  "1/1": "1:1",
};

/**
 * A YouTube or Vimeo embed id.
 *
 * Plyr reads the id out of `data-plyr-embed-id`, and while it does accept a
 * full URL there, handing it the id keeps the attribute stable across the
 * half-dozen URL shapes YouTube serves (`watch?v=`, `youtu.be/`, `/embed/`,
 * `/shorts/`) rather than depending on Plyr's own parsing.
 */
function embedId(src: string, provider: PlyrProvider): string {
  if (provider === "html5" || !/^https?:\/\//i.test(src)) return src;
  try {
    const url = new URL(src);
    const fromQuery = url.searchParams.get("v");
    if (fromQuery) return fromQuery;
    const last = url.pathname.split("/").filter(Boolean).pop();
    return last || src;
  } catch {
    return src;
  }
}

export const HeroPlyrPlayer = React.forwardRef<
  HTMLDivElement,
  HeroPlyrPlayerProps
>(
  (
    {
      src = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
      provider = "html5",
      mediaType = "video",
      srcType = "video/mp4",
      posterUrl = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      badge = "Plyr Player",
      title = "View From A Blue Moon",
      subtitle = "An accessible, customizable HTML5, YouTube and Vimeo player.",
      aspectRatio = "16/9",
      accentColor,
      controls,
      enableGlow = true,
      showCaption = true,
      autoPlay = false,
      muted = false,
      loop = false,
      iconUrl,
      onReady,
      className,
      ...props
    },
    ref,
  ) => {
    const mediaRef = useRef<HTMLElement | null>(null);
    const playerRef = useRef<PlyrInstance | null>(null);
    const [isReady, setIsReady] = useState(false);
    const onReadyRef = useRef(onReady);
    onReadyRef.current = onReady;

    const isEmbed = provider !== "html5";
    // JSON props arrive as fresh arrays every render, so the effect keys off the
    // serialized value — otherwise the player is torn down and rebuilt on every
    // parent render, and playback restarts under the viewer.
    const controlsKey = controls ? JSON.stringify(controls) : "";

    useEffect(() => {
      const element = mediaRef.current;
      if (!element) return;

      let cancelled = false;
      let player: PlyrInstance | null = null;

      // Plyr touches `document` at construction, so it is imported here rather
      // than at module scope: the component then renders on the server and
      // hydrates without the library ever loading during SSR.
      void import("plyr").then(({ default: Plyr }) => {
        if (cancelled) return;
        player = new Plyr(element, {
          autoplay: autoPlay,
          muted: muted || autoPlay,
          loop: { active: loop },
          ratio: plyrRatios[aspectRatio],
          ...(controls ? { controls } : {}),
          ...(iconUrl ? { iconUrl } : {}),
        });
        playerRef.current = player;
        setIsReady(true);
        onReadyRef.current?.();
      });

      return () => {
        cancelled = true;
        setIsReady(false);
        playerRef.current = null;
        // A YouTube/Vimeo teardown can race the provider iframe and throw after
        // the node is already gone. Nothing useful is left to do at that point,
        // and letting it escape breaks the unmount of everything above it.
        try {
          player?.destroy();
        } catch {
          /* already torn down */
        }
      };
    }, [src, provider, mediaType, aspectRatio, autoPlay, muted, loop, iconUrl, controlsKey, controls]);

    const setMedia = (el: HTMLElement | null) => {
      mediaRef.current = el;
    };

    const media = isEmbed ? (
      <div
        ref={setMedia}
        data-plyr-provider={provider}
        data-plyr-embed-id={embedId(src, provider)}
      />
    ) : mediaType === "audio" ? (
      <audio ref={setMedia} controls>
        <source src={src} type={srcType} />
      </audio>
    ) : (
      <video ref={setMedia} controls playsInline poster={posterUrl}>
        <source src={src} type={srcType} />
      </video>
    );

    const isAudio = !isEmbed && mediaType === "audio";

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        // Plyr is skinned entirely through CSS custom properties, so the accent
        // is set on the wrapper rather than through a stylesheet override.
        style={
          accentColor
            ? ({ "--plyr-color-main": accentColor } as React.CSSProperties)
            : undefined
        }
        {...props}
      >
        {enableGlow && (
          <div className="pointer-events-none absolute -inset-4 z-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 opacity-80 blur-3xl transition-opacity duration-500 dark:opacity-50" />
        )}

        <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-zinc-900 shadow-2xl sm:rounded-2xl md:rounded-3xl">
          <div
            className={cn(
              "relative w-full bg-black",
              isAudio ? "p-4 sm:p-6" : aspectRatios[aspectRatio],
            )}
          >
            {/* Plyr rewrites the media element into its own markup on init.
                Until that happens the raw <video> would flash at its intrinsic
                size, so it is held invisible behind a matching placeholder. */}
            <div
              className={cn(
                "h-full w-full",
                !isReady && "invisible",
                !isAudio && "[&_.plyr]:h-full [&_.plyr]:w-full",
              )}
            >
              {media}
            </div>

            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
              </div>
            )}
          </div>

          {showCaption && (badge || title || subtitle) && (
            <div className="flex flex-col gap-1.5 p-4 sm:gap-2 sm:p-6 md:p-8">
              {badge && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm backdrop-blur-md sm:gap-2 sm:px-4 sm:text-xs dark:bg-black/40">
                    <Sparkles className="h-3 w-3 shrink-0 animate-pulse text-amber-400 sm:h-3.5 sm:w-3.5" />
                    <span className="max-w-[180px] truncate sm:max-w-none">
                      {badge}
                    </span>
                  </div>
                </div>
              )}
              {title && (
                <h3 className="text-base font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-[11px] leading-relaxed text-zinc-300 sm:text-xs md:text-base">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

HeroPlyrPlayer.displayName = "HeroPlyrPlayer";
