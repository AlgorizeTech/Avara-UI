"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Sparkles, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface HeroVideoPlayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
      onPlay,
      onClose,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    const handleOpen = () => {
      setIsOpen(true);
      onPlay?.();
    };

    const handleClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    useEffect(() => {
      // Resolve the window the player actually lives in (supports iframe rendering).
      const win = containerRef.current?.ownerDocument.defaultView ?? window;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          handleClose();
        }
      };
      win.addEventListener("keydown", handleKeyDown);
      return () => win.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {/* Ambient GPU Glow */}
        {enableGlow && (
          <div className="pointer-events-none absolute -inset-4 z-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-3xl opacity-80 dark:opacity-50 transition-opacity duration-500 rounded-3xl" />
        )}

        {/* Hero Card Container with Fluid Mobile Min-Height */}
        <motion.div
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "relative z-10 w-full min-h-[220px] sm:min-h-[280px] lg:min-h-0 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-border/80 bg-zinc-900 shadow-2xl group cursor-pointer flex flex-col justify-between",
            aspectRatios[aspectRatio],
          )}
          onClick={handleOpen}
        >
          {/* Background Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={thumbnailAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Content Overlay with Responsive Padding & Typography */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 z-20">
            {/* Top Badge */}
            <div className="flex justify-start">
              {badge && (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-none">
                    {badge}
                  </span>
                </div>
              )}
            </div>

            {/* Center Play Button (Glassmorphism rounded-2xl with dynamic theme color) */}
            <div className="flex items-center justify-center my-auto py-2 sm:py-0">
              <div className="relative group/btn flex items-center gap-2.5 sm:gap-4 bg-white/15 dark:bg-black/30 hover:bg-white/25 dark:hover:bg-black/50 backdrop-blur-xl border border-white/30 dark:border-white/15 px-5 py-3 sm:px-7 sm:py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 transform group-hover:scale-105">
                <div
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-200 shrink-0 bg-[var(--theme-color,var(--primary))]"
                >
                  <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary-foreground dark:text-zinc-900 fill-primary-foreground dark:fill-zinc-900 ml-0.5" />
                </div>
                <span className="text-xs sm:text-base md:text-lg font-extrabold text-white tracking-tight pr-1 sm:pr-2">
                  {playButtonLabel}
                </span>
              </div>
            </div>

            {/* Bottom Narrative Typography */}
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

        {/* Modal Dialog */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/40 backdrop-blur-sm"
              onClick={handleClose}
            >
              {/* Modal Content Box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                  "relative w-full bg-zinc-950 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl z-50 flex flex-col min-h-[220px] sm:min-h-0",
                  modalSizes[modalSize],
                  modalSize === "full" ? "h-[90vh]" : aspectRatios[aspectRatio],
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Bar */}
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

                {/* Video Player Embed / Frame */}
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
  },
);

HeroVideoPlayer.displayName = "HeroVideoPlayer";
