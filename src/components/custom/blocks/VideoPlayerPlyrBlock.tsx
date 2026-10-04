"use client";

import { cn } from "@/lib/utils";
import type PlyrInstance from "plyr";
import React, { useEffect, useRef, useState } from "react";

import "plyr/dist/plyr.css";

/** Where the media comes from. Plyr wraps all three behind one control bar. */
export type PlyrProvider = "html5" | "youtube" | "vimeo";

export interface PlyrPlayerProps
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
  title?: string;
  subtitle?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  /**
   * Drives Plyr's `--plyr-color-main`, which is what actually skins the
   * control bar, the progress fill and the focus ring. Defaults to the theme's
   * primary colour.
   */
  accentColor?: string;
  /** Plyr control names in bar order. Omit for Plyr's own default set. */
  controls?: string[];
  enableGlow?: boolean;
  /**
   * The title/subtitle laid over the frame: at the foot until the video is
   * first played, then a hover-only bar at the top. Turn it off for a bare
   * player with no copy on it.
   */
  showOverlay?: boolean;
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

/**
 * Title and subtitle laid over the frame, following the convention YouTube set.
 *
 * Before anything has played the copy sits at the FOOT of the frame and stays
 * there: nothing is happening yet, so it is free to introduce the video, and a
 * viewer should not have to hover to find out what they are about to watch.
 * Its bottom padding keeps it clear of Plyr's control bar, so the gradient
 * reaches the bottom edge but the text stops above the scrubber.
 *
 * Once playback has started that is no longer true — the picture is the point,
 * and a permanent caption is in the way. So the copy moves to the TOP of the
 * frame and only appears on hover, where it overlaps nothing that matters.
 *
 * `pointer-events-none` keeps every click going through to Plyr in both
 * positions.
 */
function MediaOverlay({
  title,
  subtitle,
  hasPlayed,
}: {
  title?: string;
  subtitle?: string;
  /** Whether the viewer has started watching. Drives the whole treatment. */
  hasPlayed?: boolean;
}) {
  if (!title && !subtitle) return null;

  const copy = (
    <>
      {title && (
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-white drop-shadow-sm sm:text-xl md:text-2xl">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-300 sm:text-xs md:text-sm">
          {subtitle}
        </p>
      )}
    </>
  );

  if (hasPlayed) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/85 via-black/40 to-transparent px-4 pt-4 pb-16 opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100 group-focus-within/frame:opacity-100 sm:px-6 sm:pt-5 sm:pb-20">
        {copy}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pt-16 pb-14 transition-opacity duration-300 sm:px-6 sm:pt-24 sm:pb-16">
      {copy}
    </div>
  );
}

export const PlyrPlayer = React.forwardRef<
  HTMLDivElement,
  PlyrPlayerProps
>(
  (
    {
      src = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
      provider = "html5",
      mediaType = "video",
      srcType = "video/mp4",
      posterUrl = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      title = "View From A Blue Moon",
      subtitle = "An accessible, customizable HTML5, YouTube and Vimeo player.",
      aspectRatio = "16/9",
      accentColor,
      controls,
      enableGlow = true,
      showOverlay = true,
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
    // Latches on the first play and never goes back: the title treatment keys
    // off "has this viewer started watching", not the current paused state, so
    // pausing must not bring the bottom caption back over the picture.
    const [hasPlayed, setHasPlayed] = useState(false);
    const onReadyRef = useRef(onReady);
    useEffect(() => {
      onReadyRef.current = onReady;
    });

    const isEmbed = provider !== "html5";
    // `controls` is an array literal, so it is a new reference on every parent
    // render. The effect keys off its serialized value and reads the live array
    // through a ref — depending on the array itself would rebuild the player on
    // every render and restart playback under the viewer.
    const controlsKey = controls ? JSON.stringify(controls) : "";
    const controlsRef = useRef(controls);
    useEffect(() => {
      controlsRef.current = controls;
    });

    useEffect(() => {
      const element = mediaRef.current;
      if (!element) return;

      let cancelled = false;
      let player: PlyrInstance | null = null;
      setHasPlayed(false);

      // Plyr touches `document` at construction, so it is imported here rather
      // than at module scope: the component then renders on the server and
      // hydrates without the library ever loading during SSR.
      void import("plyr").then(({ default: Plyr }) => {
        if (cancelled) return;
        const barControls = controlsRef.current;
        player = new Plyr(element, {
          autoplay: autoPlay,
          muted: muted || autoPlay,
          loop: { active: loop },
          ratio: plyrRatios[aspectRatio],
          ...(barControls ? { controls: barControls } : {}),
          ...(iconUrl ? { iconUrl } : {}),
        });
        player.on("play", () => setHasPlayed(true));
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
    }, [
      src,
      provider,
      mediaType,
      aspectRatio,
      autoPlay,
      muted,
      loop,
      iconUrl,
      controlsKey,
    ]);

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
          {
            "--plyr-color-main": accentColor ?? "var(--primary)",
          } as React.CSSProperties
        }
        {...props}
      >
        {enableGlow && (
          <div className="pointer-events-none absolute -inset-4 z-0 rounded-3xl bg-gradient-to-tr from-primary/20 via-primary/20 to-primary/10 opacity-80 blur-3xl transition-opacity duration-500 dark:opacity-50" />
        )}

        <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-zinc-900 shadow-2xl sm:rounded-2xl md:rounded-3xl">
          <div
            className={cn(
              "group/frame relative w-full bg-black",
              isAudio ? "p-4 sm:p-6" : aspectRatios[aspectRatio],
            )}
          >
            {/* An audio player has no picture to lay copy over, so its title
                sits above the control bar in normal flow instead. */}
            {isAudio && showOverlay && (title || subtitle) && (
              <div className="mb-3">
                {title && (
                  <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-white sm:text-xl">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-400 sm:text-xs">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

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

            {!isAudio && isReady && showOverlay && (
              <MediaOverlay
                title={title}
                subtitle={subtitle}
                hasPlayed={hasPlayed}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

PlyrPlayer.displayName = "PlyrPlayer";
