"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface SplitStep {
  id: string;
  stepNumber: string; // e.g., "01", "02"
  title: string;
  description: string;
  tags?: string[];
  cardContent: React.ReactNode;
  color?: string; // Optional accent color for specific cards
}

export interface SplitStepperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: SplitStep[];
  stickySide?: "left" | "right"; // Option to switch which side is static
  cardDepthScale?: number; // Shrink rate of stacked background cards (default: 0.05)
  cardOffset?: number; // Vertical pixel distance between stacked cards (default: 16)
  color?: string; // Global active theme color (default: #FFAB1D)
  onStepChange?: (index: number) => void;
}

// ==========================================
// MAIN SPLIT-STACK STEPPER ENGINE (GSAP)
// ==========================================
export const SplitStepper = React.forwardRef<HTMLDivElement, SplitStepperProps>(
  (
    {
      steps,
      stickySide = "right",
      cardDepthScale = 0.05,
      cardOffset = 16,
      color = "#FFAB1D",
      className,
      onStepChange,
      ...props
    },
    ref,
  ) => {
    const [activeStep, setActiveStep] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const listRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isHex = color.startsWith("#");

    // Handle Step Selection
    const handleStepSelect = (index: number) => {
      setActiveStep(index);
      onStepChange?.(index);

      // Smooth scroll narrative card into view if inside a scrollable container
      listRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    };

    // GSAP Card Stacking & Depth Animation
    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        if (idx < activeStep) {
          // ── Stacked Behind ──
          const depth = activeStep - idx;
          gsap.to(card, {
            y: -depth * cardOffset,
            scale: 1 - depth * cardDepthScale,
            opacity: Math.max(0.2, 1 - depth * 0.25),
            zIndex: idx,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else if (idx === activeStep) {
          // ── Active Card at Front ──
          gsap.to(card, {
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: steps.length + 10,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          // ── Upcoming Cards Hidden Below ──
          gsap.to(card, {
            y: 120,
            scale: 0.95,
            opacity: 0,
            zIndex: idx,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    }, [activeStep, cardDepthScale, cardOffset, steps.length]);

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 w-full relative items-start",
          className,
        )}
        {...props}
      >
        {/* ========================================== */}
        {/* COLUMN A: SCROLLING NARRATIVE LIST         */}
        {/* ========================================== */}
        <div
          className={cn(
            "md:col-span-6 lg:col-span-7 flex flex-col gap-4 relative z-10",
            stickySide === "left" ? "md:order-2" : "md:order-1",
          )}
        >
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isCompleted = activeStep > index;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  listRefs.current[index] = el;
                }}
                onClick={() => handleStepSelect(index)}
                className={cn(
                  "group relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 cursor-pointer select-none overflow-hidden",
                  isActive
                    ? "bg-white dark:bg-zinc-900 shadow-xl border-transparent"
                    : "bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800/60 hover:bg-white dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-700",
                )}
                style={{
                  borderColor: isActive && isHex ? color : undefined,
                }}
              >
                {/* Active Left/Right Accent Glow Border */}
                {isActive && (
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300"
                    style={{ backgroundColor: isHex ? color : undefined }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  {/* Step Badge & Title */}
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-colors duration-300",
                        isActive
                          ? "text-white border-transparent shadow-md"
                          : isCompleted
                            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent"
                            : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700",
                      )}
                      style={{
                        backgroundColor: isActive && isHex ? color : undefined,
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        step.stepNumber
                      )}
                    </span>

                    <h3
                      className={cn(
                        "text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-zinc-900 dark:text-white"
                          : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200",
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Active Indicator Arrow */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
                      isActive
                        ? "translate-x-0 opacity-100 shadow-sm"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40",
                    )}
                    style={{
                      backgroundColor: isActive ? `${color}15` : "transparent",
                      color: isActive ? color : "currentColor",
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    "mt-4 text-sm sm:text-base leading-relaxed transition-colors duration-300 pl-[54px]",
                    isActive
                      ? "text-zinc-600 dark:text-zinc-300"
                      : "text-zinc-400 dark:text-zinc-500",
                  )}
                >
                  {step.description}
                </p>

                {/* Feature Tags Pill Array */}
                {step.tags && step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pl-[54px]">
                    {step.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={cn(
                          "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-300",
                          isActive
                            ? "border-transparent shadow-xs"
                            : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600",
                        )}
                        style={{
                          backgroundColor: isActive ? `${color}12` : undefined,
                          color: isActive ? color : undefined,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* COLUMN B: STICKY VISUAL SHOWCASE STACK     */}
        {/* ========================================== */}
        <div
          className={cn(
            "md:col-span-6 lg:col-span-5 sticky top-8 w-full h-[450px] sm:h-[500px] flex items-center justify-center perspective-[1200px] z-20",
            stickySide === "left" ? "md:order-1" : "md:order-2",
          )}
        >
          <div className="relative w-full h-full max-w-lg">
            {steps.map((step, index) => {
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={cn(
                    "absolute inset-0 w-full h-full rounded-[2.5rem] p-6 sm:p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow",
                    step.color ||
                      "bg-zinc-900 text-white border-white/10 dark:border-zinc-800",
                  )}
                  style={{
                    // Initial fallback styles before GSAP mounts
                    opacity: index === 0 ? 1 : 0,
                    zIndex: index === 0 ? 10 : 0,
                  }}
                >
                  {/* Subtle Top Inner Highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between relative z-10 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase border border-white/15">
                      STEP // {step.stepNumber}
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* Custom Card Visual Payload */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">
                    {step.cardContent}
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-medium">
                    <span className="truncate pr-2">{step.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 flex-shrink-0">
                      INTERACTIVE STACK
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
SplitStepper.displayName = "SplitStepper";
