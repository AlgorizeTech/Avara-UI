"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

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
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  // Core GSAP Layout & Video Playback Engine
  useEffect(() => {
    panels.forEach((panel, index) => {
      const panelEl = panelRefs.current[index];
      const videoEl = videoRefs.current[index];
      const titleEl = titleRefs.current[index];
      const descEl = descRefs.current[index];
      const isActive = activeId === panel.id;

      // 1. Animate the Flexbox Layout (Expansion)
      if (panelEl) {
        gsap.to(panelEl, {
          flexGrow: isActive ? 5 : 1, // 5x wider than inactive rails
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
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

      // 3. Animate Text Visibility (Only show when active)
      if (titleEl && descEl) {
        gsap.to([titleEl, descEl], {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 20,
          stagger: 0.05, // Slight delay between title and desc
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
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
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                }}
                className="text-white font-semibold tracking-tight text-xl md:text-3xl mb-2 whitespace-normal leading-tight"
              >
                {panel.title}
              </h3>
              <p
                ref={(el) => {
                  descRefs.current[index] = el;
                }}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
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