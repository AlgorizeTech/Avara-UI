"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface SplitStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  tags?: string[];
  cardContent: React.ReactNode;
  color?: string;
}

export interface SplitStepperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: SplitStep[];
  stickySide?: "left" | "right";
  cardDepthScale?: number;
  cardOffset?: number;
  color?: string;
  onStepChange?: (index: number) => void;
}

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

    const handleStepSelect = (index: number) => {
      setActiveStep(index);
      onStepChange?.(index);
      listRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    };

    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        if (idx < activeStep) {
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
          "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 w-full relative items-start",
          className,
        )}
        {...props}
      >
        {/* NARRATIVE LIST - Full width on Mobile */}
        <div
          className={cn(
            "flex flex-col gap-4 relative z-10",
            stickySide === "left"
              ? "md:order-2 md:col-span-6 lg:col-span-7"
              : "md:order-1 md:col-span-6 lg:col-span-7",
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
                  "group relative rounded-3xl p-5 sm:p-8 border transition-all duration-300 cursor-pointer select-none overflow-hidden",
                  isActive
                    ? "bg-card shadow-xl border-transparent"
                    : "bg-muted/60 border-border/80 hover:bg-card hover:border-border",
                )}
                style={{
                  borderColor: isActive && isHex ? color : undefined,
                }}
              >
                {isActive && (
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300"
                    style={{ backgroundColor: isHex ? color : undefined }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-colors duration-300",
                        isActive
                          ? "text-white border-transparent shadow-md"
                          : isCompleted
                            ? "bg-muted text-foreground border-transparent"
                            : "bg-muted text-muted-foreground border-border",
                      )}
                      style={{
                        backgroundColor: isActive && isHex ? color : undefined,
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        step.stepNumber
                      )}
                    </span>

                    <h3
                      className={cn(
                        "text-lg sm:text-2xl font-bold tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
                      isActive
                        ? "translate-x-0 opacity-100 shadow-sm"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-40",
                    )}
                    style={{
                      backgroundColor: isActive ? `${color}15` : "transparent",
                      color: isActive ? color : "currentColor",
                    }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                <p
                  className={cn(
                    "mt-4 text-sm sm:text-base leading-relaxed transition-colors duration-300 pl-[48px] sm:pl-[54px]",
                    isActive
                      ? "text-muted-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.description}
                </p>

                {step.tags && step.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pl-[48px] sm:pl-[54px]">
                    {step.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={cn(
                          "px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all duration-300",
                          isActive
                            ? "border-transparent shadow-xs"
                            : "bg-transparent border-border text-zinc-400 dark:text-zinc-600",
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

        {/* VISUAL STACK - HIDDEN ON MOBILE (hidden md:block) */}
        <div
          className={cn(
            "hidden md:block w-full sticky z-20 top-8 h-[450px] lg:h-[500px]",
            stickySide === "left"
              ? "md:order-1 md:col-span-6 lg:col-span-5"
              : "md:order-2 md:col-span-6 lg:col-span-5",
          )}
        >
          <div className="relative w-full h-full max-w-lg mx-auto">
            {steps.map((step, index) => {
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={cn(
                    "absolute inset-0 w-full h-full rounded-[2.5rem] p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow",
                    step.color ||
                      "bg-zinc-900 text-white border-white/10 dark:border-zinc-800",
                  )}
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    zIndex: index === 0 ? 10 : 0,
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-bold tracking-widest uppercase border border-white/15">
                      STEP // {step.stepNumber}
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">
                    {step.cardContent}
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
