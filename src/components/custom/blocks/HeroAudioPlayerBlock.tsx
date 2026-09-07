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
 * - `native` — the browser's own `<audio controls>` under the artwork. No
 *   custom transport to keep in sync, and the most accessible by default.
 */
export type HeroAudioVariant = "hero" | "bar" | "native";

export interface HeroAudioPlayerProps
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
  variant?: HeroAudioVariant;
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
  "flex items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";

export const HeroAudioPlayer = React.forwardRef<
  HTMLDivElement,
  HeroAudioPlayerProps
>(
  (
    {
      audioUrl = "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
      audioType = "audio/mpeg",
      artworkUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
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
        controls={variant === "native"}
        className={variant === "native" ? "w-full" : "hidden"}
      >
        <source src={audioUrl} type={audioType} />
        Your browser does not support the audio element.
      </audio>
    );

    const copy = (
      <div className="min-w-0">
        {badge && (
          <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
            <Music className="h-3 w-3 shrink-0 text-amber-400" />
            {badge}
          </span>
        )}
        {title && (
          <h3 className="truncate text-base font-extrabold tracking-tight text-white sm:text-xl md:text-2xl">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="truncate text-[11px] text-zinc-400 sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
    );

    const scrubber = (
      <div className="flex items-center gap-2.5">
        <span className="w-10 shrink-0 text-right font-mono text-[10px] text-zinc-400 tabular-nums sm:text-xs">
          {formatTime(currentTime)}
        </span>
        <div className="relative flex-1">
          {/* The filled track is a plain div behind a transparent range input —
              `accent-color` alone cannot be themed per-instance, and a styled
              input loses the native keyboard behaviour this keeps. */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%`, background: accent }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            disabled={!duration}
            aria-label="Seek"
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed"
          />
        </div>
        <span className="w-10 shrink-0 font-mono text-[10px] text-zinc-400 tabular-nums sm:text-xs">
          {formatTime(duration)}
        </span>
      </div>
    );

    const transport = (
      <div className="flex items-center gap-2 sm:gap-3">
        {skipSeconds > 0 && (
          <button
            type="button"
            onClick={() => skip(-skipSeconds)}
            className={cn(ICON_BUTTON, "h-9 w-9")}
            aria-label={`Rewind ${skipSeconds} seconds`}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={toggle}
          style={{ background: accent }}
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 focus-visible:outline-none active:scale-95 sm:h-14 sm:w-14 dark:text-zinc-900"
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
            className={cn(ICON_BUTTON, "h-9 w-9")}
            aria-label={`Forward ${skipSeconds} seconds`}
          >
            <RotateCw className="h-4 w-4" />
          </button>
        )}
      </div>
    );

    const volumeControl = (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className={cn(ICON_BUTTON, "h-8 w-8")}
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
          className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/20 sm:w-20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    );

    const glow = enableGlow ? (
      <div className="pointer-events-none absolute -inset-4 z-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 opacity-80 blur-3xl transition-opacity duration-500 dark:opacity-50" />
    ) : null;

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
          <div className="relative z-10 flex w-full items-center gap-3 rounded-2xl border border-border/80 bg-zinc-900 p-3 shadow-2xl sm:gap-5 sm:p-4">
            <img
              src={artworkUrl}
              alt={artworkAlt}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {copy}
              {scrubber}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {transport}
              <div className="hidden sm:block">{volumeControl}</div>
            </div>
          </div>
        </div>
      );
    }

    /* ── hero + native: artwork card ──────────────────────────────────────── */
    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {glow}
        <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-zinc-900 shadow-2xl md:flex-row md:rounded-3xl">
          <div className="relative aspect-square w-full shrink-0 overflow-hidden md:aspect-auto md:w-64 lg:w-80">
            <img
              src={artworkUrl}
              alt={artworkAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4 p-5 sm:gap-5 sm:p-8">
            {copy}

            {variant === "native" ? (
              audioElement
            ) : (
              <>
                {scrubber}
                <div className="flex items-center justify-between gap-4">
                  {transport}
                  {volumeControl}
                </div>
              </>
            )}
          </div>
        </div>
        {variant !== "native" && audioElement}
      </div>
    );
  },
);

HeroAudioPlayer.displayName = "HeroAudioPlayer";
