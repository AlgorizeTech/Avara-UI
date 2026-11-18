"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Compass,
  Palette,
  Cpu,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// 1. TYPES & DATA
// ==========================================

export interface ArcProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

// Preset color hex mappings so swatch names (lavender, indigo, rose, emerald, etc.) resolve cleanly in both SVG and HTML
export const ARC_COLOR_PRESETS: Record<string, string> = {
  lavender: "#9b8afb",
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#18181b",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  blue: "#3b82f6",
  cyan: "#06b6d4",
};

export type ArcProcessVariant = "arc-dock" | "default" | "semicircle" | (string & {});
export type ArcProcessHighlightShape = "ribbon" | "wave" | "double" | "curve";

export interface ArcProcessProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant style. Defaults to "arc-dock". */
  variant?: ArcProcessVariant;
  /** Shape style of the animated underline under the highlighted word. Defaults to "ribbon" (Ribbon Drift dual gradient draw). */
  highlightShape?: ArcProcessHighlightShape;
  /** Optional badge pill text displayed above the main heading */
  badgeText?: string;
  /** Top primary heading text */
  title?: string;
  /** Highlighted word in the heading that gets an animated hand-drawn underline */
  highlightWord?: string;
  /** Second muted heading text */
  subtitle?: string;
  /** List of step milestone items */
  steps?: ArcProcessStep[];
  /** Accent color for the active arc stroke, apex dot, badge, and step numbers. Defaults to theme color. */
  themeColor?: string;
  /** If true, auto-advances the rotating ring at a set interval when not scrolling. Default false. */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds. Default 5000. */
  autoPlayInterval?: number;
  /** Custom classes for outer section container */
  className?: string;
}

export const DEFAULT_ARC_STEPS: ArcProcessStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Discovery & Strategic Roadmap",
    description:
      "We map your technical roadmap, dissect core user journeys, and align architecture goals before writing a single line of code.",
    icon: Compass,
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Rapid Prototyping & Iteration",
    description:
      "Interactive wireframes and tangible prototypes let you test assumptions early and refine user interactions with direct feedback.",
    icon: Palette,
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Full-Stack Agile Engineering",
    description:
      "Clean, type-safe implementation using modular components, robust state management, and enterprise-grade performance best practices.",
    icon: Cpu,
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Automated QA & Security Audit",
    description:
      "Comprehensive end-to-end testing, accessibility compliance checks, and performance benchmarks to guarantee zero regression.",
    icon: ShieldCheck,
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Global Scale & Continuous Delivery",
    description:
      "Zero-downtime automated deployment pipelines with real-time telemetry, auto-scaling infrastructure, and continuous monitoring.",
    icon: Rocket,
  },
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export const ArcProcess = React.forwardRef<HTMLDivElement, ArcProcessProps>(
  (
    {
      variant = "arc-dock",
      highlightShape = "ribbon",
      badgeText = "ENGINEERING LIFECYCLE",
      title = "A streamlined workflow built for",
      highlightWord = "workflow",
      subtitle = "teams shipping high-standard products",
      steps = DEFAULT_ARC_STEPS,
      themeColor,
      autoPlay = false,
      autoPlayInterval = 5000,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Unique gradient ID for the Ribbon Drift style animated line draw
    const rawId = React.useId();
    const lineGradId = useMemo(
      () => `arc-line-draw-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
      [rawId],
    );

    // Smooth continuous rotation angle in degrees
    const [currentRotation, setCurrentRotation] = useState<number>(0);
    // Dynamic container sizing tracking so component adapts edge-to-edge
    const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
      width: 1200,
      height: 600,
    });
    // Track whether rotation was triggered by step click vs scroll/drag
    const [isAnimatingToStep, setIsAnimatingToStep] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef<boolean>(false);
    const dragStartXRef = useRef<number>(0);
    const dragStartRotationRef = useRef<number>(0);

    const stepCount = steps.length;
    // Increased gap between consecutive steps (55 degrees for generous milestone separation)
    const STEP_ANGLE = 55;
    // Apex of the ring is at top (-90 degrees / 12 o'clock)
    const APEX_ANGLE = -90;

    // Fills parent width cleanly; ring curves down and exits bottom naturally
    const containerWidth = containerSize.width;
    // Proportional diameter that scales smoothly on mobile while filling large screens
    const ringDiameter = Math.min(1150, Math.max(360, containerWidth * 0.92));
    const ringRadius = ringDiameter / 2;
    const ringSize = ringDiameter;
    const ringCenter = ringRadius;
    // Exact fixed gap (155px) matching large screen across all devices so it never enters title/subtitle
    const ringTop = 155;
    // Dome height is strictly ringTop + ringRadius so ONLY the upper 50% (semicircle) is visible on ALL screens
    const domeHeight = ringTop + ringRadius;

    // Track parent container sizing with ResizeObserver
    useEffect(() => {
      const updateSize = () => {
        if (containerRef.current) {
          setContainerSize({
            width: containerRef.current.clientWidth || 1200,
            height: containerRef.current.clientHeight || 600,
          });
        }
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      const ro = new ResizeObserver(updateSize);
      if (containerRef.current) ro.observe(containerRef.current);
      return () => {
        window.removeEventListener("resize", updateSize);
        ro.disconnect();
      };
    }, []);

    // Derived active step index directly synchronized with current continuous rotation
    const activeIndex = Math.max(
      0,
      Math.min(stepCount - 1, Math.round(currentRotation / STEP_ANGLE)),
    );

    // Resolve theme color for CSS variable and inline styles, supporting hex, rgb, and palette presets (lavender, indigo, rose, etc.)
    const resolvedThemeColor = useMemo(() => {
      if (!themeColor || themeColor === "primary" || themeColor === "default") {
        return "var(--theme-color, var(--primary, #9b8afb))";
      }
      const lower = themeColor.toLowerCase();
      if (ARC_COLOR_PRESETS[lower]) {
        return ARC_COLOR_PRESETS[lower];
      }
      if (themeColor.startsWith("#") || themeColor.startsWith("rgb") || themeColor.startsWith("hsl")) {
        return themeColor;
      }
      return themeColor;
    }, [themeColor]);

    // Intelligently splits the title so the highlightWord receives the animated underline inline within the phrase
    const titleParts = useMemo(() => {
      if (!highlightWord) return { prefix: title, word: null, suffix: "" };
      const lowerTitle = title.toLowerCase();
      const lowerWord = highlightWord.toLowerCase();
      const index = lowerTitle.indexOf(lowerWord);
      if (index !== -1) {
        return {
          prefix: title.slice(0, index),
          word: title.slice(index, index + highlightWord.length),
          suffix: title.slice(index + highlightWord.length),
        };
      }
      return { prefix: title, word: highlightWord, suffix: "" };
    }, [title, highlightWord]);

    // Navigate to a specific step by rotating the ring
    const goToStep = useCallback(
      (index: number) => {
        const targetIndex = Math.max(0, Math.min(stepCount - 1, index));
        const targetRotation = targetIndex * STEP_ANGLE;
        setIsAnimatingToStep(true);
        setCurrentRotation(targetRotation);
        setTimeout(() => setIsAnimatingToStep(false), 700);
      },
      [stepCount, STEP_ANGLE],
    );

    // Auto-advance timer when enabled
    useEffect(() => {
      if (!autoPlay) return;
      const timer = setInterval(() => {
        setCurrentRotation((prev) => {
          const nextIndex = (Math.round(prev / STEP_ANGLE) + 1) % stepCount;
          return nextIndex * STEP_ANGLE;
        });
      }, autoPlayInterval);
      return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, stepCount, STEP_ANGLE]);

    // Slow & smooth window scroll listener
    useEffect(() => {
      const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Expanded scroll travel (3.2x) so it rotates very slowly and smoothly through window scroll
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const scrollTravel = (windowHeight + rect.height) * 3.2;
          const currentProgress = (windowHeight - rect.top) / scrollTravel;
          const clamped = Math.max(0, Math.min(1, currentProgress));

          const maxRotation = (stepCount - 1) * STEP_ANGLE;
          const targetRotation = clamped * maxRotation;
          setIsAnimatingToStep(false);
          setCurrentRotation(targetRotation);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [stepCount, STEP_ANGLE]);

    // Slow & silky smooth mouse wheel scrubbing
    const handleWheel = (e: React.WheelEvent) => {
      // Gentle delta: rotates slowly per scroll tick
      const deltaAngle = (e.deltaY / 120) * (STEP_ANGLE * 0.055);
      const maxRotation = (stepCount - 1) * STEP_ANGLE;
      const nextRotation = Math.max(
        0,
        Math.min(maxRotation, currentRotation + deltaAngle),
      );
      setIsAnimatingToStep(false);
      setCurrentRotation(nextRotation);
    };

    // Drag / Swipe handling to rotate the ring directly
    const handleMouseDown = (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      setIsAnimatingToStep(false);
      dragStartXRef.current = e.clientX;
      dragStartRotationRef.current = currentRotation;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - dragStartXRef.current;
      const angleDelta = -deltaX * 0.08;
      const maxRotation = (stepCount - 1) * STEP_ANGLE;
      const newRotation = Math.max(
        0,
        Math.min(maxRotation, dragStartRotationRef.current + angleDelta),
      );
      setCurrentRotation(newRotation);
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const closest = Math.round(currentRotation / STEP_ANGLE);
      goToStep(closest);
    };

    // Fixed polar angles for each icon on the ring in the wheel coordinate space
    const stepAngles = useMemo(() => {
      return steps.map((_, i) => APEX_ANGLE - i * STEP_ANGLE);
    }, [steps, STEP_ANGLE]);

    // Ring coordinate conversion helper
    const polarToCartesian = useCallback(
      (deg: number, radius = ringRadius) => {
        const rad = (deg * Math.PI) / 180;
        return {
          x: ringCenter + radius * Math.cos(rad),
          y: ringCenter + radius * Math.sin(rad),
        };
      },
      [ringCenter, ringRadius],
    );

    // Segment arc length between two adjacent steps
    const segmentArcLength = useMemo(() => {
      return (STEP_ANGLE / 360) * (2 * Math.PI * ringRadius);
    }, [STEP_ANGLE, ringRadius]);

    // Exact progress float (e.g. 0.0 to 4.0)
    const currentStepProgress = currentRotation / STEP_ANGLE;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onWheel={handleWheel}
        style={{
          ...(themeColor ? ({ "--theme-color": resolvedThemeColor } as React.CSSProperties) : {}),
          ...style,
        }}
        className={cn(
          "w-full relative flex flex-col items-center justify-start bg-white dark:bg-zinc-950 overflow-hidden select-none p-0 m-0",
          className,
        )}
        {...props}
      >
        {/* Ribbon Drift style drawing animation styling */}
        <style>{`
          @keyframes ribbon-line-draw {
            0% {
              stroke-dashoffset: 320;
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            45%, 65% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: -320;
              opacity: 0;
            }
          }
          .animate-ribbon-line-draw {
            stroke-dasharray: 320;
            animation: ribbon-line-draw 3.5s ease-in-out infinite;
          }
        `}</style>

        {/* ============================================================== */}
        {/* 1. SECTION HEADER (Single-Line Title + Smaller Font Sizes)     */}
        {/* Sits at the top in normal flow with z-30                       */}
        {/* ============================================================== */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-5 sm:pt-6 pb-2 text-center shrink-0 z-30 relative">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border mb-2 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              <span
                style={{ backgroundColor: resolvedThemeColor }}
                className="w-1.5 h-1.5 rounded-full animate-pulse"
              />
              {badgeText}
            </div>
          )}

          {/* Heading strictly on ONE line with smaller, compact font size and animated underline placed under highlightWord */}
          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap flex items-center justify-center flex-nowrap leading-snug py-0.5 overflow-visible">
            {titleParts.prefix && <span className="truncate">{titleParts.prefix}</span>}
            {titleParts.word && (
              <span className="relative inline-block text-zinc-900 dark:text-zinc-50 shrink-0 mx-1 px-0.5 pb-1">
                {titleParts.word}
                {highlightShape === "double" ? (
                  <svg
                    viewBox="0 0 150 18"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 -bottom-1.5 w-full h-3.5 sm:h-4 overflow-visible pointer-events-none"
                  >
                    <path
                      d="M 2 8 C 40 14, 100 14, 148 6"
                      stroke={resolvedThemeColor}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      className="animate-ribbon-line-draw"
                    />
                    <path
                      d="M 12 14 C 45 18, 95 18, 138 12"
                      stroke={resolvedThemeColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.8"
                      className="animate-ribbon-line-draw"
                    />
                  </svg>
                ) : highlightShape === "curve" ? (
                  <svg
                    viewBox="0 0 150 16"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 -bottom-1.5 w-full h-3.5 sm:h-4 overflow-visible pointer-events-none"
                  >
                    <path
                      d="M 2 8 C 38 14, 96 14, 138 6"
                      stroke={resolvedThemeColor}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      className="animate-ribbon-line-draw"
                    />
                  </svg>
                ) : highlightShape === "wave" ? (
                  <svg
                    viewBox="0 0 150 16"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 -bottom-1.5 w-full h-3.5 sm:h-4 overflow-visible pointer-events-none"
                  >
                    <path
                      d="M 2 11 C 24 3, 48 16, 75 8 C 102 2, 125 15, 148 6"
                      stroke={resolvedThemeColor}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      className="animate-ribbon-line-draw"
                    />
                  </svg>
                ) : (
                  /* Default: "ribbon" — exact 1st variant draw from /docs/nextjs/ribbon-drift */
                  <svg
                    viewBox="0 0 280 14"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 -bottom-1.5 w-full h-3 sm:h-3.5 overflow-visible select-none pointer-events-none"
                  >
                    <defs>
                      <linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={resolvedThemeColor} stopOpacity="0.25" />
                        <stop offset="50%" stopColor={resolvedThemeColor} stopOpacity="1" />
                        <stop offset="100%" stopColor={resolvedThemeColor} stopOpacity="0.25" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M4 10C60 3 170 2 276 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="text-black/10 dark:text-white/10"
                    />
                    <path
                      d="M4 10C60 3 170 2 276 8"
                      stroke={`url(#${lineGradId})`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      className="animate-ribbon-line-draw"
                    />
                  </svg>
                )}
              </span>
            )}
            {titleParts.suffix && <span className="truncate">{titleParts.suffix}</span>}
          </h2>

          {/* When no highlightWord is given, render the full Ribbon Drift underline centered under title */}
          {!titleParts.word && (
            <svg
              className="w-48 sm:w-64 md:w-80 h-3 sm:h-4 mt-1.5 overflow-visible select-none pointer-events-none mx-auto"
              viewBox="0 0 280 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`${lineGradId}-title`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={resolvedThemeColor} stopOpacity="0.25" />
                  <stop offset="50%" stopColor={resolvedThemeColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={resolvedThemeColor} stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d="M4 10C60 3 170 2 276 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-black/10 dark:text-white/10"
              />
              <path
                d="M4 10C60 3 170 2 276 8"
                stroke={`url(#${lineGradId}-title)`}
                strokeWidth="2.75"
                strokeLinecap="round"
                className="animate-ribbon-line-draw"
              />
            </svg>
          )}

          {/* Subtitle strictly on one line with smaller font size */}
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-normal mt-1.5 max-w-2xl mx-auto whitespace-nowrap truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* ============================================================== */}
        {/* 2. ROTATING RING DOME CONTAINER (Strictly 50% Upper Arc Dome)   */}
        {/* Height is locked to ringTop + ringRadius so bottom half is cut  */}
        {/* ============================================================== */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            height: `${domeHeight}px`,
          }}
          className="relative w-full cursor-grab active:cursor-grabbing overflow-hidden shrink-0"
        >
          {/* ============================================================== */}
          {/* 3. PHYSICAL ROTATING RING WHEEL                                */}
          {/* ============================================================== */}
          <div
            style={{
              width: `${ringSize}px`,
              height: `${ringSize}px`,
              top: `${ringTop}px`,
              left: "50%",
              transform: `translate(-50%, 0) rotate(${currentRotation}deg)`,
              transformOrigin: `${ringCenter}px ${ringCenter}px`,
              transition: isDraggingRef.current
                ? "none"
                : isAnimatingToStep
                  ? "transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1)"
                  : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="absolute pointer-events-auto will-change-transform"
          >
            {/* SVG Ring with Base Gray Track & Disconnected-free Segment Arcs */}
            <svg
              viewBox={`0 0 ${ringSize} ${ringSize}`}
              className="w-full h-full pointer-events-none overflow-visible"
            >
              {/* Full circular base gray track */}
              <circle
                cx={ringCenter}
                cy={ringCenter}
                r={ringRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-zinc-200 dark:text-zinc-800"
              />

              {/* Segment-by-segment Arc Rendering:
                  Connects dot to dot cleanly with ZERO gaps and ZERO overshoot! */}
              {steps.slice(0, stepCount - 1).map((_, segIdx) => {
                const startAngle = stepAngles[segIdx];
                const endAngle = stepAngles[segIdx + 1];
                const pStart = polarToCartesian(startAngle);
                const pEnd = polarToCartesian(endAngle);

                // Segment progress: 0 when not reached, 1 when traversed, 0..1 when scrubbing
                const segProgress = Math.max(
                  0,
                  Math.min(1, currentStepProgress - segIdx),
                );

                if (segProgress <= 0.001) return null;

                const pathD = `M ${pStart.x} ${pStart.y} A ${ringRadius} ${ringRadius} 0 0 0 ${pEnd.x} ${pEnd.y}`;

                return (
                  <path
                    key={`seg-${segIdx}`}
                    d={pathD}
                    fill="none"
                    stroke={resolvedThemeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: `${segmentArcLength} ${segmentArcLength * 2}`,
                      strokeDashoffset: (1 - segProgress) * segmentArcLength,
                      transition: isDraggingRef.current
                        ? "none"
                        : isAnimatingToStep
                          ? "stroke-dashoffset 650ms cubic-bezier(0.2, 0.8, 0.2, 1)"
                          : "stroke-dashoffset 320ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                );
              })}
            </svg>

            {/* Step Nodes Attached to the Ring Perimeter:
                Line and Content are physically attached to each milestone!
                They start tilted ("baka") along the arc and smoothly straighten ("soza")
                as the milestone reaches the apex! */}
            {steps.map((step, idx) => {
              const baseAngle = stepAngles[idx] ?? -90;
              const pt = polarToCartesian(baseAngle);
              const StepIcon = step.icon;
              const isActivated = idx <= activeIndex;

              // Angular distance from this step to current scroll position
              const stepDistance = currentStepProgress - idx;
              const absStepDistance = Math.abs(stepDistance);

              // Reveal factor: smoothly emerges as step enters the upper dome (absStepDistance < 0.45)
              const stepReveal = Math.max(0, Math.min(1, (0.45 - absStepDistance) / 0.22));
              // Scale connector line height proportionally so content card stays safely inside the upper 50% dome
              const maxLineHeight = Math.max(38, Math.min(110, ringRadius * 0.24));
              const lineHeight = stepReveal * maxLineHeight;

              return (
                <div
                  key={step.id}
                  style={{
                    left: `${pt.x}px`,
                    top: `${pt.y}px`,
                    // Tangent orientation: points inward towards center of the circle
                    transform: `translate(-50%, -50%) rotate(${baseAngle + 90}deg)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToStep(idx);
                  }}
                  className="absolute w-0 h-0 cursor-pointer select-none group z-20"
                >
                  {/* 1. Dot directly ON the Ring Perimeter (centered at pt.x, pt.y) */}
                  <div
                    style={
                      isActivated
                        ? { backgroundColor: resolvedThemeColor }
                        : {}
                    }
                    className={cn(
                      "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ring-4 ring-white dark:ring-zinc-950 z-20",
                      absStepDistance < 0.25
                        ? "w-3.5 h-3.5 scale-110"
                        : isActivated
                          ? "w-2.5 h-2.5"
                          : "w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-500",
                    )}
                  />

                  {/* 2. Floating Icon Badge */}
                  <div
                    style={{
                      transform: "translate(-50%, -100%)",
                      top: "-14px", // Clearance above the dot
                      left: "0",
                    }}
                    className="absolute z-20 flex flex-col items-center pointer-events-auto"
                  >
                    <div
                      style={
                        isActivated
                          ? {
                              backgroundColor: resolvedThemeColor,
                            }
                          : {}
                      }
                      className={cn(
                        "w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-500",
                        absStepDistance < 0.25
                          ? "scale-105 ring-2 ring-white/30 dark:ring-zinc-900/40"
                          : isActivated
                            ? "scale-100 ring-1 ring-white/20 dark:ring-zinc-900/30"
                            : "bg-zinc-200/90 dark:bg-zinc-800 group-hover:scale-105 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700",
                      )}
                    >
                      <StepIcon
                        style={
                          isActivated
                            ? { color: "#ffffff", stroke: "#ffffff" }
                            : {}
                        }
                        className={cn(
                          "size-4 sm:size-5 stroke-[2.2] shrink-0 transition-colors",
                          isActivated
                            ? "text-white"
                            : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100",
                        )}
                      />
                    </div>
                  </div>

                  {/* 3. Radial Connector Line extending inward from dot */}
                  {/* Starts tilted along with the rotating milestone, and straightens as it reaches apex! */}
                  {stepReveal > 0.01 && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "2px",
                          height: `${lineHeight}px`,
                          transform: "translateX(-50%)",
                          backgroundColor: resolvedThemeColor,
                          opacity: stepReveal,
                          transition: isDraggingRef.current
                            ? "none"
                            : isAnimatingToStep
                              ? "height 350ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 200ms ease-out"
                              : "height 250ms ease-out, opacity 200ms ease-out",
                        }}
                        className="pointer-events-none z-10 origin-top"
                      />

                      {/* 4. Content Card Attached Directly to the Tip of the Line */}
                      {/* Starts tilted with the line and straightens up as the milestone reaches the apex! */}
                      <div
                        style={{
                          position: "absolute",
                          top: `${lineHeight + 6}px`,
                          left: "0",
                          transform: "translateX(-50%)",
                          opacity: stepReveal,
                          transition: isDraggingRef.current
                            ? "none"
                            : isAnimatingToStep
                              ? "opacity 280ms ease-out"
                              : "opacity 200ms ease-out",
                        }}
                        className="flex flex-col items-center text-center w-[250px] sm:w-[320px] md:w-[360px] px-2 z-30 pointer-events-auto"
                      >
                        {/* Step Number */}
                        <span
                          style={{ color: resolvedThemeColor }}
                          className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-0.5 sm:mb-1"
                        >
                          {step.stepNumber}
                        </span>

                        {/* Title (Single Line with responsive font size) */}
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight whitespace-nowrap mb-0.5 sm:mb-1">
                          {step.title}
                        </h3>

                        {/* Description (Responsive font size) */}
                        <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal max-w-[240px] sm:max-w-xs md:max-w-sm mx-auto">
                          {step.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

ArcProcess.displayName = "ArcProcess";

export default ArcProcess;
