"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// --- 100% COMPLETE TYPESCRIPT ENGINE CODE ---
const _CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroVideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const HeroVideoPlayer = React.forwardRef<HTMLDivElement, HeroVideoPlayerProps>(
  (
    {
      videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      thumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
      thumbnailAlt = "Hero Video Thumbnail",
      badge = "Next-Gen Architecture",
      title = "Experience the Platform in Action",
      subtitle = "Watch how our lightning-fast workflow engine transforms your development cycle in under 3 minutes.",
      playButtonLabel = "Watch Demo",
      aspectRatio = "16/9",
      modalSize = "lg",
      enableGlow = true,
      onPlay,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const handleOpen = () => {
      setIsOpen(true);
      onPlay?.();
    };

    const handleClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          handleClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
      <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
        {enableGlow && (
          <div className="pointer-events-none absolute -inset-4 z-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-3xl opacity-80 dark:opacity-50 transition-opacity duration-500 rounded-3xl" />
        )}

        <motion.div
          whileHover={{ scale: 0.995 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "relative z-10 w-full min-h-[220px] sm:min-h-[280px] lg:min-h-0 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-900 shadow-2xl group cursor-pointer flex flex-col justify-between",
            aspectRatios[aspectRatio]
          )}
          onClick={handleOpen}
        >
          <img
            src={thumbnailUrl}
            alt={thumbnailAlt}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 transition-opacity duration-300 group-hover:opacity-90" />

          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 z-20">
            <div className="flex justify-start">
              {badge && (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 rounded-full bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 animate-pulse shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-none">{badge}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center my-auto py-2 sm:py-0">
              <div className="relative group/btn flex items-center gap-2.5 sm:gap-4 bg-white/15 dark:bg-black/30 hover:bg-white/25 dark:hover:bg-black/50 backdrop-blur-xl border border-white/30 dark:border-white/15 px-4 py-2.5 sm:px-6 sm:py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 transform group-hover:scale-105">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40 group-hover/btn:bg-indigo-500 transition-colors duration-200 shrink-0">
                  <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                </div>
                <span className="text-xs sm:text-base md:text-lg font-bold text-white tracking-tight pr-1 sm:pr-2">
                  {playButtonLabel}
                </span>
              </div>
            </div>

            <div className="max-w-2xl">
              {title && (
                <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight mb-1 sm:mb-2 drop-shadow-sm line-clamp-2">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-[11px] sm:text-xs md:text-base text-zinc-300 line-clamp-1 sm:line-clamp-2 leading-relaxed font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                  "relative w-full bg-zinc-950 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl z-50 flex flex-col min-h-[220px] sm:min-h-0",
                  modalSizes[modalSize],
                  modalSize === "full" ? "h-[90vh]" : aspectRatios[aspectRatio]
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="relative w-full h-full bg-black flex-1">
                  <iframe
                    src={videoUrl}
                    title={title || "Video Player Demo"}
                    className="w-full h-full border-0 object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HeroVideoPlayer.displayName = "HeroVideoPlayer";`;

// --- 100% COMPLETE PURE JAVASCRIPT ENGINE CODE ---
const _CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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

export const HeroVideoPlayer = React.forwardRef(
  (
    {
      videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      thumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
      thumbnailAlt = "Hero Video Thumbnail",
      badge = "Next-Gen Architecture",
      title = "Experience the Platform in Action",
      subtitle = "Watch how our lightning-fast workflow engine transforms your development cycle in under 3 minutes.",
      playButtonLabel = "Watch Demo",
      aspectRatio = "16/9",
      modalSize = "lg",
      enableGlow = true,
      onPlay,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    React.useImperativeHandle(ref, () => containerRef.current);

    const handleOpen = () => {
      setIsOpen(true);
      onPlay?.();
    };

    const handleClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape" && isOpen) {
          handleClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
      <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
        {enableGlow && (
          <div className="pointer-events-none absolute -inset-4 z-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-3xl opacity-80 dark:opacity-50 transition-opacity duration-500 rounded-3xl" />
        )}

        <motion.div
          whileHover={{ scale: 0.995 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "relative z-10 w-full min-h-[220px] sm:min-h-[280px] lg:min-h-0 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-900 shadow-2xl group cursor-pointer flex flex-col justify-between",
            aspectRatios[aspectRatio]
          )}
          onClick={handleOpen}
        >
          <img
            src={thumbnailUrl}
            alt={thumbnailAlt}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 transition-opacity duration-300 group-hover:opacity-90" />

          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 z-20">
            <div className="flex justify-start">
              {badge && (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 rounded-full bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 animate-pulse shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-none">{badge}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center my-auto py-2 sm:py-0">
              <div className="relative group/btn flex items-center gap-2.5 sm:gap-4 bg-white/15 dark:bg-black/30 hover:bg-white/25 dark:hover:bg-black/50 backdrop-blur-xl border border-white/30 dark:border-white/15 px-4 py-2.5 sm:px-6 sm:py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 transform group-hover:scale-105">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40 group-hover/btn:bg-indigo-500 transition-colors duration-200 shrink-0">
                  <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                </div>
                <span className="text-xs sm:text-base md:text-lg font-bold text-white tracking-tight pr-1 sm:pr-2">
                  {playButtonLabel}
                </span>
              </div>
            </div>

            <div className="max-w-2xl">
              {title && (
                <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight mb-1 sm:mb-2 drop-shadow-sm line-clamp-2">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-[11px] sm:text-xs md:text-base text-zinc-300 line-clamp-1 sm:line-clamp-2 leading-relaxed font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                  "relative w-full bg-zinc-950 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl z-50 flex flex-col min-h-[220px] sm:min-h-0",
                  modalSizes[modalSize],
                  modalSize === "full" ? "h-[90vh]" : aspectRatios[aspectRatio]
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="relative w-full h-full bg-black flex-1">
                  <iframe
                    src={videoUrl}
                    title={title || "Video Player Demo"}
                    className="w-full h-full border-0 object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HeroVideoPlayer.displayName = "HeroVideoPlayer";`;

export function HeroVideoPlayerShowcase() {
  const [enableGlow, setEnableGlow] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<"16/9" | "21/9" | "4/3">(
    "16/9",
  );
  const [modalSize, setModalSize] = useState<"lg" | "xl" | "full">("lg");
  const [color, setColor] = useState<string>("#6366F1");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hero-video-change", {
          detail: { ratio: aspectRatio },
        })
      );
    }
  }, [aspectRatio]);

  const generateUsageCode = () => {
    return `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function HeroSection() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <HeroVideoPlayer
        enableGlow={${enableGlow}}
        aspectRatio="${aspectRatio}"
        modalSize="${modalSize}"
        badge="Platform v2.4"
        title="Experience the Architecture in Action"
        subtitle="Watch how our lightning-fast engine transforms your development workflow in under 3 minutes."
        playButtonLabel="Watch 4K Demo"
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        thumbnailUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <VariantTabs
            label="Aspect Ratio"
            variants={["16/9", "21/9", "4/3"]}
            defaultValue="16/9"
            onValueChange={(v) => setAspectRatio(v as "16/9" | "21/9" | "4/3")}
          />
          <VariantTabs
            label="Modal Size"
            variants={["lg", "xl", "full"]}
            defaultValue="xl"
            onValueChange={(v) => setModalSize(v as "lg" | "xl" | "full")}
          />

          {/* Glow Toggle */}
          <div className="flex items-center justify-start sm:justify-end pt-2">
            <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={enableGlow}
                onChange={(e) => setEnableGlow(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Ambient GPU Glow</span>
            </label>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="HeroVideoPlayerBlock"
        tsCode={_CODE_TS}
        jsCode={_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full bg-zinc-50 dark:bg-[#020202] relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-3 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl">
            <HeroVideoPlayer
              enableGlow={enableGlow}
              aspectRatio={aspectRatio}
              modalSize={modalSize}
              badge="Platform v2.4"
              title="Experience the Architecture in Action"
              subtitle="Watch how our lightning-fast engine transforms your development workflow in under 3 minutes."
              playButtonLabel="Watch 4K Demo"
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
