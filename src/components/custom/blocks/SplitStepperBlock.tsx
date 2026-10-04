"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useRef, useState } from "react";

// ==========================================
// CARD DECK MOTION (CSS transitions)
// ==========================================
/** GSAP's power3.out, sampled into a CSS `linear()` curve. */
const EASE_POWER3_OUT =
  "linear(0, .0963, .1855, .2679, .3439, .4138, .478, .5367, .5904, .6392, .6836, .7237, .7599, .7924, .8215, .8474, .8704, .8907, .9085, .924, .9375, .9491, .959, .9674, .9744, .9802, .985, .9888, .9919, .9943, .9961, .9974, .9984, .9991, .9995, .9998, .9999, 1, 1, 1, 1)";

/** The card also carries `transition-shadow`; its transition is kept alongside the deck motion. */
const CARD_CLASS_TRANSITION = ["box-shadow"];

/**
 * Where a card sits in the deck — stacked behind the active card, at the
 * front, or waiting below — as a style that transitions there from wherever
 * the card is now.
 */
function deckCardStyle(
  idx: number,
  active: number,
  count: number,
  cardOffset: number,
  cardDepthScale: number,
  upcomingY: number,
): React.CSSProperties {
  let y = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = count + 10;
  let duration = 0.6;

  if (idx < active) {
    // Stacked behind in the deck
    const depth = active - idx;
    y = -depth * cardOffset;
    scale = 1 - depth * cardDepthScale;
    opacity = Math.max(0.2, 1 - depth * 0.25);
    zIndex = idx;
  } else if (idx > active) {
    // Upcoming, hidden below
    y = upcomingY;
    scale = 0.95;
    opacity = 0;
    zIndex = idx;
    duration = 0.5;
  }

  const deck = ["transform", "opacity", "z-index"];
  return {
    transform: `translateY(${y}px) scale(${scale})`,
    opacity,
    zIndex,
    transitionProperty: [...deck, ...CARD_CLASS_TRANSITION].join(", "),
    transitionDuration: [
      ...deck.map(() => `${duration}s`),
      ...CARD_CLASS_TRANSITION.map(
        () => "var(--tw-duration, var(--default-transition-duration, 150ms))",
      ),
    ].join(", "),
    transitionTimingFunction: [
      ...deck.map(() => EASE_POWER3_OUT),
      ...CARD_CLASS_TRANSITION.map(
        () =>
          "var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1)))",
      ),
    ].join(", "),
  };
}

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
  /** Hex accent for the active step. Defaults to the theme's primary. */
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
      color,
      className,
      onStepChange,
      ...props
    },
    ref,
  ) => {
    const [activeStep, setActiveStep] = useState(0);
    const listRefs = useRef<(HTMLDivElement | null)[]>([]);
    const accent = color ?? "var(--primary)";
    const isHex = !color || color.startsWith("#");

    const handleStepSelect = (index: number) => {
      setActiveStep(index);
      onStepChange?.(index);
      listRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    };

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
                  borderColor: isActive && isHex ? accent : undefined,
                }}
              >
                {isActive && (
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300"
                    style={{ backgroundColor: isHex ? accent : undefined }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-semibold text-sm border transition-colors duration-300",
                        isActive
                          ? cn(color ? "text-white" : "text-primary-foreground", "border-transparent shadow-md")
                          : isCompleted
                            ? "bg-muted text-foreground border-transparent"
                            : "bg-muted text-muted-foreground border-border",
                      )}
                      style={{
                        backgroundColor: isActive && isHex ? accent : undefined,
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
                        "text-lg sm:text-2xl font-semibold tracking-tight transition-colors duration-300",
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
                      backgroundColor: isActive ? `color-mix(in oklab, ${accent} 8%, transparent)` : "transparent",
                      color: isActive ? accent : "currentColor",
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
                          "px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider border transition-all duration-300",
                          isActive
                            ? "border-transparent shadow-xs"
                            : "bg-transparent border-border text-muted-foreground/70",
                        )}
                        style={{
                          backgroundColor: isActive ? `color-mix(in oklab, ${accent} 7%, transparent)` : undefined,
                          color: isActive ? accent : undefined,
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
                  className={cn(
                    "absolute inset-0 w-full h-full rounded-[2.5rem] p-8 border overflow-hidden shadow-2xl flex flex-col justify-between origin-top transition-shadow",
                    step.color ||
                      "bg-zinc-900 text-white border-white/10 dark:border-zinc-800",
                  )}
                  style={deckCardStyle(
                    index,
                    activeStep,
                    steps.length,
                    cardOffset,
                    cardDepthScale,
                    120,
                  )}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono font-semibold tracking-widest uppercase border border-white/15">
                      STEP // {step.stepNumber}
                    </span>
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: accent }}
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
