"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

/** GSAP's power3.out, sampled into a CSS `linear()` curve. */
const EASE_POWER3_OUT =
  "linear(0, .0963, .1855, .2679, .3439, .4138, .478, .5367, .5904, .6392, .6836, .7237, .7599, .7924, .8215, .8474, .8704, .8907, .9085, .924, .9375, .9491, .959, .9674, .9744, .9802, .985, .9888, .9919, .9943, .9961, .9974, .9984, .9991, .9995, .9998, .9999, 1, 1, 1, 1)";

export interface AccordionPanel {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterUrl?: string; // High quality fallback image
}

export interface VideoAccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  panels: AccordionPanel[];
  defaultActiveId?: string; // Optional: starts with one expanded
}

export const VideoAccordion = React.forwardRef<
  HTMLDivElement,
  VideoAccordionProps
>(({ panels, defaultActiveId, className, ...props }, ref) => {
  // Allows null so we can have a "resting state" where no text is shown
  const [activeId, setActiveId] = useState<string | null>(
    defaultActiveId || null,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const settled = useRef(false);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Core Layout & Video Playback Engine
  useEffect(() => {
    // Settle the painted `flex-1` rest state once, so a default-active panel
    // still grows open on mount instead of appearing already open.
    if (!settled.current) {
      void containerRef.current?.offsetWidth;
      settled.current = true;
    }

    panels.forEach((panel, index) => {
      const panelEl = panelRefs.current[index];
      const videoEl = videoRefs.current[index];
      const isActive = activeId === panel.id;

      // 1. Animate the Flexbox Layout (Expansion)
      if (panelEl) {
        panelEl.style.transition = `flex-grow 0.8s ${EASE_POWER3_OUT}`;
        panelEl.style.flexGrow = isActive ? "5" : "1"; // 5x wider than inactive rails
      }

      // 2. Handle Video Playback (Only play active/hovered panel, pause others)
      if (videoEl) {
        videoEl.muted = true;
        if (isActive) {
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          videoEl.pause();
        }
      }

      // 3. Text visibility is rendered below: the rise transitions, the
      // opacity switches at once.
    });
  }, [activeId, panels]);

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => setActiveId(null)} // Resets to a clean, text-free state when mouse leaves
      className={cn(
        // Responsive: Vertical stack on mobile, horizontal rail on md+
        "flex flex-col md:flex-row w-full h-[600px] md:h-[500px] gap-2 md:gap-3 overflow-hidden",
        className,
      )}
      {...props}
    >
      {panels.map((panel, index) => {
        const isActive = activeId === panel.id;

        return (
          <div
            key={panel.id}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            onMouseEnter={() => {
              setActiveId(panel.id);
              const vid = videoRefs.current[index];
              if (vid) {
                vid.muted = true;
                vid.play().catch(() => {});
              }
            }}
            onMouseLeave={() => {
              const vid = videoRefs.current[index];
              if (vid) {
                vid.pause();
              }
            }}
            onClick={() => {
              setActiveId(panel.id);
              const vid = videoRefs.current[index];
              if (vid) {
                vid.muted = true;
                vid.play().catch(() => {});
              }
            }}
            className="relative overflow-hidden rounded-2xl cursor-pointer group min-h-[60px] md:min-w-[60px] flex-1 basis-0 bg-zinc-900"
          >
            {/* Background Video Layer with Poster fallback when paused */}
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={panel.videoSrc}
              poster={panel.posterUrl}
              muted
              loop
              playsInline
              preload="auto"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 opacity-100",
                isActive ? "scale-105" : "scale-100",
              )}
            />

            {/* Cinematic Overlay (Dark universally for best video contrast) */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-700 pointer-events-none",
                isActive
                  ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                  : "bg-black/50 backdrop-blur-[2px]",
              )}
            />

            {/* Content Payload (Hidden on inactive via inline styles to prevent First-Paint flicker) */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end pointer-events-none">
              <h3
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                  transition: `transform 0.6s ${EASE_POWER3_OUT}`,
                }}
                className="text-white font-semibold tracking-tight text-xl md:text-3xl mb-2 whitespace-normal leading-tight"
              >
                {panel.title}
              </h3>
              <p
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                  // Slight delay between title and desc
                  transition: `transform 0.6s ${EASE_POWER3_OUT} 0.05s`,
                }}
                className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg whitespace-normal line-clamp-3 md:line-clamp-none"
              >
                {panel.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
});
VideoAccordion.displayName = "VideoAccordion";