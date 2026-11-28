"use client";

import { cn } from "@/lib/utils";
import {
  Music,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * How much chrome the player carries.
 *
 * - `hero`   — full artwork card with its own transport (the default).
 * - `bar`    — one compact row: artwork thumb, copy, transport. Fits a sidebar
 *   or the bottom of a page without claiming a hero slot.
 */
export type AudioVariant = "hero" | "bar";

export interface AudioPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay" | "onPause"> {
  /** Audio file the browser plays natively — mp3, ogg, wav, m4a. */
  audioUrl?: string;
  /** MIME type, e.g. `audio/mpeg`. Lets the browser skip a file it cannot play. */
  audioType?: string;
  artworkUrl?: string;
  artworkAlt?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  variant?: AudioVariant;
  enableGlow?: boolean;
  /** Seconds the skip buttons jump. Set to 0 to hide them. */
  skipSeconds?: number;
  loop?: boolean;
  /**
   * Start on mount. Browsers refuse unmuted autoplay without a prior
   * interaction, so treat this as a hint rather than a guarantee.
   */
  autoPlay?: boolean;
  preload?: "none" | "metadata" | "auto";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/** `m:ss`, or `—:—` before metadata has arrived. */
function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

const ICON_BUTTON =
  "flex shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#EFEFED] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-background/70 motion-reduce:transition-none";

export const AudioPlayer = React.forwardRef<
  HTMLDivElement,
  AudioPlayerProps
>(
  (
    {
      audioUrl = "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
      audioType = "audio/mpeg",
      artworkUrl = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145142/photo-1511671782779-c97d3d27a1d4-1790145143493.jpg",
      artworkAlt = "Album artwork",
      badge = "Now Playing",
      title = "It All Began With a Burst",
      subtitle = "Kishi Bashi — 151a",
      variant = "hero",
      enableGlow = true,
      skipSeconds = 10,
      loop = false,
      autoPlay = false,
      preload = "metadata",
      onPlay,
      onPause,
      onEnded,
      className,
      ...props
    },
    ref,
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    // The <audio> element is the source of truth for playback state, not React.
    // Anything can change it — the native controls, a media key, the OS — so the
    // UI mirrors its events rather than assuming its own clicks are the only
    // way it moves.
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const onLoaded = () => setDuration(audio.duration);
      const onTime = () => setCurrentTime(audio.currentTime);
      const onPlaying = () => setIsPlaying(true);
      const onPaused = () => setIsPlaying(false);
      const onEnd = () => {
        setIsPlaying(false);
        onEnded?.();
      };
      const onVolume = () => {
        setVolume(audio.volume);
        setIsMuted(audio.muted);
      };

      audio.addEventListener("loadedmetadata", onLoaded);
      audio.addEventListener("durationchange", onLoaded);
      audio.addEventListener("timeupdate", onTime);
      audio.addEventListener("play", onPlaying);
      audio.addEventListener("pause", onPaused);
      audio.addEventListener("ended", onEnd);
      audio.addEventListener("volumechange", onVolume);
      return () => {
        audio.removeEventListener("loadedmetadata", onLoaded);
        audio.removeEventListener("durationchange", onLoaded);
        audio.removeEventListener("timeupdate", onTime);
        audio.removeEventListener("play", onPlaying);
        audio.removeEventListener("pause", onPaused);
        audio.removeEventListener("ended", onEnd);
        audio.removeEventListener("volumechange", onVolume);
      };
    }, [onEnded]);

    const toggle = useCallback(() => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        // A blocked autoplay rejects rather than throwing, and an unhandled
        // rejection here would surface as a console error on every locked tab.
        void audio.play().then(() => onPlay?.()).catch(() => setIsPlaying(false));
      } else {
        audio.pause();
        onPause?.();
      }
    }, [onPlay, onPause]);

    const skip = useCallback((delta: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const limit = Number.isFinite(audio.duration) ? audio.duration : Infinity;
      audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), limit);
    }, []);

    const seek = (value: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = value;
      setCurrentTime(value);
    };

    const changeVolume = (value: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = value;
      audio.muted = value === 0;
    };

    const toggleMute = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = !audio.muted;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const accent = "var(--theme-color, var(--primary))";

    const audioElement = (
      <audio
        ref={audioRef}
        // Remount on a changed src: <audio> ignores the attribute once it has
        // already loaded metadata for the previous one.
        key={audioUrl}
        loop={loop}
        autoPlay={autoPlay}
        preload={preload}
        className="hidden"
      >
        <source src={audioUrl} type={audioType} />
        Your browser does not support the audio element.
      </audio>
    );

    const copy = (
      <div className="min-w-0">
        {badge && (
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F6] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase dark:bg-background/50">
            <Music
              className="h-3 w-3 shrink-0"
              style={{ color: accent }}
              aria-hidden="true"
            />
            {badge}
          </span>
        )}
        {title && (
          <h3 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
    );

    const scrubber = (
      <div className="flex items-center gap-3">
        <span className="w-10 shrink-0 text-right text-[11px] text-muted-foreground tabular-nums sm:text-xs">
          {formatTime(currentTime)}
        </span>
        <div className="relative flex h-5 flex-1 items-center rounded-full has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-ring">
          {/* The filled track is a plain div behind a transparent range input —
              `accent-color` alone cannot be themed per-instance, and a styled
              input loses the native keyboard behaviour this keeps. */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F7F7F6] dark:bg-background/50">
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-linear motion-reduce:transition-none"
              style={{ width: `${progress}%`, background: accent }}
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card shadow-[0_1px_2px_rgba(0,0,0,0.12),0_2px_8px_-2px_rgba(0,0,0,0.25)]"
            style={{ left: `${progress}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            disabled={!duration}
            aria-label="Seek"
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 focus:outline-none disabled:cursor-not-allowed"
          />
        </div>
        <span className="w-10 shrink-0 text-[11px] text-muted-foreground tabular-nums sm:text-xs">
          {formatTime(duration)}
        </span>
      </div>
    );

    const transport = (
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {skipSeconds > 0 && (
          <button
            type="button"
            onClick={() => skip(-skipSeconds)}
            className={cn(ICON_BUTTON, "h-10 w-10")}
            aria-label={`Rewind ${skipSeconds} seconds`}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={toggle}
          style={{ background: accent }}
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_20px_-8px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] motion-reduce:transition-none sm:h-14 sm:w-14"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
          ) : (
            <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
          )}
        </button>

        {skipSeconds > 0 && (
          <button
            type="button"
            onClick={() => skip(skipSeconds)}
            className={cn(ICON_BUTTON, "h-10 w-10")}
            aria-label={`Forward ${skipSeconds} seconds`}
          >
            <RotateCw className="h-4 w-4" />
          </button>
        )}
      </div>
    );

    const volumeControl = (
      <div className="flex items-center gap-1 rounded-full bg-[#F7F7F6] py-0.5 pr-4 pl-0.5 dark:bg-background/50">
        <button
          type="button"
          onClick={toggleMute}
          className={cn(ICON_BUTTON, "h-9 w-9")}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
          aria-label="Volume"
          className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-20 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
        />
      </div>
    );

    // A soft wash of the accent colour behind the card, never an outline.
    const glow = enableGlow ? (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-8 -bottom-2 z-0 rounded-[1.75rem] opacity-20 blur-3xl dark:opacity-15"
        style={{ background: accent }}
      />
    ) : null;

    const SURFACE =
      "relative z-10 bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)]";

    /* ── bar: one compact row ─────────────────────────────────────────────── */
    if (variant === "bar") {
      return (
        <div
          ref={ref}
          className={cn("relative w-full", className)}
          {...props}
        >
          {glow}
          {audioElement}
          <div
            className={cn(
              SURFACE,
              "flex w-full items-center gap-3 rounded-[1.75rem] p-2 sm:gap-4",
            )}
          >
            <img
              src={artworkUrl}
              alt={artworkAlt}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-[1.25rem] object-cover sm:h-20 sm:w-20"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
              <div className="min-w-0">
                {title && (
                  <h3 className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="truncate text-xs text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
              {scrubber}
            </div>
            <div className="flex shrink-0 items-center gap-2 pr-2 sm:gap-3 sm:pr-3">
              {transport}
              <div className="hidden lg:block">{volumeControl}</div>
            </div>
          </div>
        </div>
      );
    }

    /* ── hero: artwork card ──────────────────────────────────────── */
    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {glow}
        <div
          className={cn(
            SURFACE,
            "flex w-full flex-col gap-2 rounded-[1.75rem] p-2 md:flex-row md:gap-3",
          )}
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[1.25rem] md:aspect-square md:w-56 lg:w-64">
            <img
              src={artworkUrl}
              alt={artworkAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-3 sm:p-5">
            {copy}

            {scrubber}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {transport}
              {volumeControl}
            </div>
          </div>
        </div>
        {audioElement}
      </div>
    );
  },
);

AudioPlayer.displayName = "AudioPlayer";
