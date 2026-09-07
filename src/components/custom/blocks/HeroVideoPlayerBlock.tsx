"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Sparkles, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

/** Which player renders `videoUrl`. */
export type HeroVideoSource = "youtube" | "video";

/**
 * How the player is revealed.
 *
 * - `modal`  — poster hero, player opens in a centered dialog (the default).
 * - `inline` — poster hero, the player swaps in *inside the card* on click. No
 *   overlay and no scroll lock, so it can sit inside a scrolling column.
 * - `direct` — no poster at all: the player renders immediately and the
 *   badge/title/subtitle move below the frame as a caption, where they cannot
 *   cover the player's own controls.
 */
export type HeroVideoPlaybackMode = "modal" | "inline" | "direct";

export interface HeroVideoPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay"> {
  /**
   * The media URL. For `source="youtube"` this is an embed URL
   * (`https://www.youtube.com/embed/<id>`); for `source="video"` it is a file
   * the browser plays natively (mp4/webm/ogg).
   */
  videoUrl?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  playButtonLabel?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  modalSize?: "md" | "lg" | "xl" | "full";
  enableGlow?: boolean;
  /** Reveal strategy. Defaults to the modal hero. */
  playbackMode?: HeroVideoPlaybackMode;
  /** Player implementation. Defaults to a YouTube (or any embed) iframe. */
  source?: HeroVideoSource;
  /** MIME type for `source="video"`, e.g. `video/mp4`. */
  videoType?: string;
  /**
   * Start playing without a click. Only meaningful for `playbackMode="direct"`
   * — the other two modes are already user-initiated and always autoplay.
   * Browsers block unmuted autoplay, so the native player mutes itself when
   * this is set.
   */
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Native `<video>` controls. Ignored for `source="youtube"`. */
  controls?: boolean;
  onPlay?: () => void;
  onClose?: () => void;
}

const aspectRatios = {
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

const modalSizes = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-[95vw] h-[90vh]",
};

/**
 * Sets or clears `autoplay=1` on an embed URL.
 *
 * The prop is a boolean but YouTube reads a query parameter, so the two have to
 * be reconciled somewhere. Doing it here means `playbackMode="direct"` cannot
 * autoplay by accident just because the URL it was handed still carries the
 * `?autoplay=1` the modal variant needs.
 */
function withAutoplay(url: string, autoplay: boolean): string {
  if (!/^https?:\/\//i.test(url)) return url;
  try {
    const parsed = new URL(url);
    if (autoplay) parsed.searchParams.set("autoplay", "1");
    else parsed.searchParams.delete("autoplay");
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * The player with no hero chrome around it. The inline swap and the modal both
 * render this, which is why an embed and a native file behave identically in
 * every mode.
 */
function PlayerFrame({
  source,
  videoUrl,
  videoType,
  title,
  poster,
  autoplay,
  loop,
  muted,
  controls,
}: {
  source: HeroVideoSource;
  videoUrl: string;
  videoType?: string;
  title?: string;
  poster?: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
}) {
  if (source === "video") {
    return (
      <video
        // Remounting on a changed src is what makes a swapped source load at
        // all: <video> ignores the attribute once it already has metadata.
        key={videoUrl}
        className="h-full w-full bg-black object-contain"
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted || autoplay}
        playsInline
        preload="metadata"
      >
        <source src={videoUrl} type={videoType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <iframe
      src={withAutoplay(videoUrl, autoplay)}
      title={title || "Video player"}
      className="h-full w-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

/** Close affordance shared by the inline swap and the modal. */
function CloseButton({
  onClick,
  buttonRef,
  label = "Close video",
}: {
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  label?: string;
}) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      type="button"
      className="cursor-pointer rounded-full border border-white/10 bg-black/60 p-2 text-white/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-black/80 hover:text-white active:scale-95 sm:p-2.5"
      aria-label={label}
    >
      <X className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}

export const HeroVideoPlayer = React.forwardRef<
  HTMLDivElement,
  HeroVideoPlayerProps
>(
  (
    {
      videoUrl = "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1",
      thumbnailUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      thumbnailAlt = "Nature Wilderness Video Thumbnail",
      badge = "Wilderness Exploration",
      title = "Experience Untouched Nature in 4K",
      subtitle = "Embark on an immersive journey through serene mountain vistas, ancient forests, and cascading waterfalls.",
      playButtonLabel = "Watch Nature Documentary",
      aspectRatio = "16/9",
      modalSize = "lg",
      enableGlow = true,
      playbackMode = "modal",
      source = "youtube",
      videoType,
      autoPlay = false,
      loop = false,
      muted = false,
      controls = true,
      onPlay,
      onClose,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    // Where focus returns when the player is dismissed. Without it a keyboard
    // user who closes the modal lands back at the top of the document.
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    const isDirect = playbackMode === "direct";

    const handleOpen = () => {
      if (isDirect) return;
      setIsOpen(true);
      onPlay?.();
    };

    const handleClose = useCallback(() => {
      setIsOpen(false);
      onClose?.();
      triggerRef.current?.focus();
    }, [onClose]);

    useEffect(() => {
      if (isDirect || !isOpen) return;
      // Resolve the window the player actually lives in (supports iframe rendering).
      const win = containerRef.current?.ownerDocument.defaultView ?? window;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };
      win.addEventListener("keydown", handleKeyDown);
      return () => win.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isDirect, handleClose]);

    // The modal covers the page, so what is behind it must not scroll. Scoped
    // to the owning document so a player rendered inside a preview iframe locks
    // that iframe rather than the host page.
    useEffect(() => {
      if (playbackMode !== "modal" || !isOpen) return;
      const doc = containerRef.current?.ownerDocument ?? document;
      const previous = doc.body.style.overflow;
      doc.body.style.overflow = "hidden";
      closeRef.current?.focus();
      return () => {
        doc.body.style.overflow = previous;
      };
    }, [isOpen, playbackMode]);

    const frame = (
      <PlayerFrame
        source={source}
        videoUrl={videoUrl}
        videoType={videoType}
        title={title}
        poster={thumbnailUrl}
        // modal and inline are click-initiated, so playback starts immediately.
        // direct renders on load and only autoplays when explicitly asked to.
        autoplay={isDirect ? autoPlay : true}
        loop={loop}
        muted={muted}
        controls={controls}
      />
    );

    const glow = enableGlow ? (
      <div className="pointer-events-none absolute -inset-4 z-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 opacity-80 blur-3xl transition-opacity duration-500 dark:opacity-50" />
    ) : null;

    const badgePill = badge ? (
      <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm backdrop-blur-md sm:gap-2 sm:px-4 sm:text-xs dark:bg-black/40">
        <Sparkles className="h-3 w-3 shrink-0 animate-pulse text-amber-400 sm:h-3.5 sm:w-3.5" />
        <span className="max-w-[180px] truncate sm:max-w-none">{badge}</span>
      </div>
    ) : null;

    /* ── direct: the player is the hero, the copy sits under it ───────────── */
    if (isDirect) {
      return (
        <div
          ref={containerRef}
          className={cn("relative w-full", className)}
          {...props}
        >
          {glow}
          <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-zinc-900 shadow-2xl sm:rounded-2xl md:rounded-3xl">
            <div
              className={cn(
                "relative w-full overflow-hidden bg-black",
                aspectRatios[aspectRatio],
              )}
            >
              {frame}
            </div>

            {(badge || title || subtitle) && (
              <div className="flex flex-col gap-1.5 p-4 sm:gap-2 sm:p-6 md:p-8">
                {badgePill && <div className="flex justify-start">{badgePill}</div>}
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
    }

    /* ── modal + inline: poster hero with a play CTA ──────────────────────── */
    const showInlinePlayer = playbackMode === "inline" && isOpen;

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {/* Ambient GPU Glow */}
        {glow}

        {/* Hero Card Container with Fluid Mobile Min-Height */}
        <motion.div
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "group relative z-10 flex min-h-[220px] w-full flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-zinc-900 shadow-2xl sm:min-h-[280px] sm:rounded-2xl md:rounded-3xl lg:min-h-0",
            aspectRatios[aspectRatio],
            !showInlinePlayer && "cursor-pointer",
          )}
          onClick={showInlinePlayer ? undefined : handleOpen}
        >
          {showInlinePlayer ? (
            <>
              <div className="absolute inset-0 bg-black">{frame}</div>
              <div className="absolute top-2.5 right-2.5 z-20 sm:top-4 sm:right-4">
                <CloseButton
                  onClick={handleClose}
                  buttonRef={closeRef}
                  label="Close video and return to the poster"
                />
              </div>
            </>
          ) : (
            <>
              {/* Background Thumbnail */}
              <img
                src={thumbnailUrl}
                alt={thumbnailAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Content Overlay with Responsive Padding & Typography */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8 md:p-12">
                {/* Top Badge */}
                <div className="flex justify-start">{badgePill}</div>

                {/* Center Play Button — a real <button>, so the hero is
                    reachable by keyboard. The card keeps its own click handler
                    for mice, and the button stops that from firing twice. */}
                <div className="my-auto flex items-center justify-center py-2 sm:py-0">
                  <button
                    ref={triggerRef}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen();
                    }}
                    aria-haspopup={
                      playbackMode === "modal" ? "dialog" : undefined
                    }
                    className="group/btn relative flex transform cursor-pointer items-center gap-2.5 rounded-2xl border border-white/30 bg-white/15 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 group-hover:scale-105 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none sm:gap-4 sm:px-7 sm:py-4 dark:border-white/15 dark:bg-black/30 dark:hover:bg-black/50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-color,var(--primary))] shadow-lg transition-colors duration-200 sm:h-12 sm:w-12">
                      <Play className="ml-0.5 h-3.5 w-3.5 fill-primary-foreground text-primary-foreground sm:h-5 sm:w-5 dark:fill-zinc-900 dark:text-zinc-900" />
                    </span>
                    <span className="pr-1 text-xs font-extrabold tracking-tight text-white sm:pr-2 sm:text-base md:text-lg">
                      {playButtonLabel}
                    </span>
                  </button>
                </div>

                {/* Bottom Narrative Typography */}
                <div className="max-w-2xl">
                  {title && (
                    <h3 className="mb-1 line-clamp-2 text-base leading-snug font-extrabold tracking-tight text-white drop-shadow-sm sm:mb-2 sm:text-2xl sm:leading-tight md:text-3xl lg:text-4xl">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="line-clamp-1 text-[11px] leading-relaxed font-normal text-zinc-300 sm:line-clamp-2 sm:text-xs md:text-base">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Modal Dialog */}
        <AnimatePresence>
          {playbackMode === "modal" && isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-6 md:p-10"
              onClick={handleClose}
            >
              {/* Modal Content Box */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={title || "Video player"}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                  "relative z-50 flex min-h-[220px] w-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl sm:min-h-0 sm:rounded-2xl md:rounded-3xl",
                  modalSizes[modalSize],
                  modalSize === "full" ? "h-[90vh]" : aspectRatios[aspectRatio],
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Bar */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-2 sm:top-4 sm:right-4">
                  <CloseButton
                    onClick={handleClose}
                    buttonRef={closeRef}
                    label="Close modal"
                  />
                </div>

                {/* Video Player Embed / Frame */}
                <div className="relative h-full w-full flex-1 bg-black">
                  {frame}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

HeroVideoPlayer.displayName = "HeroVideoPlayer";
