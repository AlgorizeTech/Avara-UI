"use client";

import {
  AccordionPanel,
  VideoAccordion,
} from "@/components/custom/blocks/VideoAccordionBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const ACCORDION_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export interface AccordionPanel {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterUrl?: string;
}

export interface VideoAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  panels: AccordionPanel[];
  defaultActiveId?: string;
}

export const VideoAccordion = React.forwardRef<HTMLDivElement, VideoAccordionProps>(
  ({ panels, defaultActiveId, className, ...props }, ref) => {
    const [activeId, setActiveId] = useState<string>(defaultActiveId || panels[0]?.id);
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    useEffect(() => {
      panels.forEach((panel, index) => {
        const panelEl = panelRefs.current[index];
        const titleEl = titleRefs.current[index];
        const descEl = descRefs.current[index];
        const videoEl = videoRefs.current[index];
        const isActive = activeId === panel.id;

        if (panelEl) {
          gsap.to(panelEl, {
            flexGrow: isActive ? 5 : 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (titleEl && descEl) {
          gsap.to([titleEl, descEl], {
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 20,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (videoEl) {
          if (isActive) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        }
      });
    }, [activeId, panels]);

    return (
      <div ref={containerRef} className={cn("flex flex-col md:flex-row w-full h-[600px] md:h-[500px] gap-2 md:gap-3 overflow-hidden", className)} {...props}>
        {panels.map((panel, index) => {
          const isActive = activeId === panel.id;
          return (
            <div key={panel.id} ref={(el) => { panelRefs.current[index] = el; }} onMouseEnter={() => setActiveId(panel.id)} onClick={() => setActiveId(panel.id)} className="relative overflow-hidden rounded-2xl cursor-pointer group min-h-[60px] md:min-w-[60px] flex-1 basis-0 bg-zinc-900">
              <video ref={(el) => { videoRefs.current[index] = el; }} src={panel.videoSrc} poster={panel.posterUrl} muted loop playsInline preload="auto" className={cn("absolute inset-0 w-full h-full object-cover transition-transform duration-1000", isActive ? "scale-105" : "scale-100")} />
              <div className={cn("absolute inset-0 transition-all duration-700 pointer-events-none", isActive ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent" : "bg-black/60 backdrop-blur-[2px]")} />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end pointer-events-none">
                <h3 ref={(el) => { titleRefs.current[index] = el; }} style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(20px)" }} className="text-white font-bold tracking-tight text-xl md:text-3xl mb-2 whitespace-normal leading-tight">{panel.title}</h3>
                <p ref={(el) => { descRefs.current[index] = el; }} style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(20px)" }} className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg whitespace-normal line-clamp-3 md:line-clamp-none">{panel.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
VideoAccordion.displayName = "VideoAccordion";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const ACCORDION_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export const VideoAccordion = React.forwardRef(
  ({ panels, defaultActiveId, className, ...props }, ref) => {
    const [activeId, setActiveId] = useState(defaultActiveId || panels[0]?.id);
    const containerRef = useRef(null);
    const panelRefs = useRef([]);
    const videoRefs = useRef([]);
    const titleRefs = useRef([]);
    const descRefs = useRef([]);

    React.useImperativeHandle(ref, () => containerRef.current);

    useEffect(() => {
      panels.forEach((panel, index) => {
        const panelEl = panelRefs.current[index];
        const titleEl = titleRefs.current[index];
        const descEl = descRefs.current[index];
        const videoEl = videoRefs.current[index];
        const isActive = activeId === panel.id;

        if (panelEl) {
          gsap.to(panelEl, {
            flexGrow: isActive ? 5 : 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (titleEl && descEl) {
          gsap.to([titleEl, descEl], {
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 20,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (videoEl) {
          if (isActive) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        }
      });
    }, [activeId, panels]);

    return (
      <div ref={containerRef} className={cn("flex flex-col md:flex-row w-full h-[600px] md:h-[500px] gap-2 md:gap-3 overflow-hidden", className)} {...props}>
        {panels.map((panel, index) => {
          const isActive = activeId === panel.id;
          return (
            <div key={panel.id} ref={(el) => { panelRefs.current[index] = el; }} onMouseEnter={() => setActiveId(panel.id)} onClick={() => setActiveId(panel.id)} className="relative overflow-hidden rounded-2xl cursor-pointer group min-h-[60px] md:min-w-[60px] flex-1 basis-0 bg-zinc-900">
              <video ref={(el) => { videoRefs.current[index] = el; }} src={panel.videoSrc} poster={panel.posterUrl} muted loop playsInline preload="auto" className={cn("absolute inset-0 w-full h-full object-cover transition-transform duration-1000", isActive ? "scale-105" : "scale-100")} />
              <div className={cn("absolute inset-0 transition-all duration-700 pointer-events-none", isActive ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent" : "bg-black/60 backdrop-blur-[2px]")} />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end pointer-events-none">
                <h3 ref={(el) => { titleRefs.current[index] = el; }} style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(20px)" }} className="text-white font-bold tracking-tight text-xl md:text-3xl mb-2 whitespace-normal leading-tight">{panel.title}</h3>
                <p ref={(el) => { descRefs.current[index] = el; }} style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(20px)" }} className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg whitespace-normal line-clamp-3 md:line-clamp-none">{panel.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
VideoAccordion.displayName = "VideoAccordion";`;

export function VideoAccordionShowcase() {
  const samplePanels: AccordionPanel[] = [
    {
      id: "nature",
      title: "Nature & Wildlife",
      description:
        "Transform your audio tracks into compelling visual stories automatically. Experience the majestic beauty of untouched landscapes.",
      videoSrc:
        "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
      posterUrl:
        "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "animal",
      title: "Animal Companions",
      description:
        "Capture the heartwarming moments between pets and their human friends with stunning clarity and rich color grading.",
      videoSrc:
        "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      posterUrl:
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "child",
      title: "Beautiful Moments",
      description:
        "Capture the pure joy and innocence of everyday moments in stunning clarity and incredibly smooth 60fps motion.",
      videoSrc:
        "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-picnic-975-large.mp4",
      posterUrl:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "space",
      title: "Galactic Frontiers",
      description:
        "Time-lapse perfection. Watch the universe unfold in real-time with our advanced cinematic space rendering engine.",
      videoSrc:
        "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
      posterUrl:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const generateUsageCode = () => {
    return `import { VideoAccordion } from "@/components/custom/blocks/VideoAccordionBlock";

export default function HeroSection() {
  const panels = [
    {
      id: "p1",
      title: "Nature & Wildlife",
      description: "Transform your audio tracks into compelling visual stories.",
      videoSrc: "https://your-video-url.mp4",
      posterUrl: "https://your-fallback-image.jpg",
    },
    // Add up to 4 or 5 panels for best results
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <VideoAccordion panels={panels} />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Feature Explainer Panel */}
      <div className="flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          A cinematic, expanding gallery component built entirely on{" "}
          <strong>GSAP</strong>. Hovering over an inactive panel triggers HTML5{" "}
          <code>play()</code> methods while smoothly hiding the text of the
          previously active view. Text is completely hidden on compressed rails
          for a clean, modern aesthetic.
        </p>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="VideoAccordionBlock"
        tsCode={ACCORDION_CODE_TS}
        jsCode={ACCORDION_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center bg-[#0a0a0a] py-8 sm:py-16 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-white/10">
          {/* Subtle Backglow to make the dark UI pop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full max-w-5xl mx-auto relative z-10 shadow-2xl">
            <VideoAccordion panels={samplePanels} />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
