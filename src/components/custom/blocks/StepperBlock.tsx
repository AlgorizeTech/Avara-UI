"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, { useEffect, useRef } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ElementType;
  content?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  /** Any CSS color (hex, rgb/hsl/oklch, var(--token)) or a Tailwind bg class. */
  color?: string;
}

/**
 * A raw CSS color is applied inline; anything else is assumed to be a Tailwind
 * class the consumer already has in their build. Inline is the richer path —
 * the pulse ring needs a border color, and a `border-*` class derived at
 * runtime would never be seen by Tailwind's scanner.
 */
const isCssColorValue = (color: string) =>
  /^(#|rgb|hsl|oklch|lab|lch|color\(|var\()/.test(color.trim());

// ==========================================
// MOTION CURVES (CSS easings)
// ==========================================
/** power3.inOut, sampled into a CSS `linear()` curve. */
const EASE_POWER3_IN_OUT =
  "linear(0, 0, 0, .0001, .0002, .0004, .0008, .0015, .0025, .0041, .0062, .009, .0128, .0176, .0237, .0313, .0405, .0516, .0648, .0804, .0988, .12, .1446, .1727, .2048, .2411, .2821, .3281, .3794, .4366, .5, .5634, .6206, .672, .7179, .7589, .7952, .8273, .8554, .88, .9012, .9196, .9352, .9484, .9595, .9688, .9763, .9824, .9872, .991, .9938, .996, .9975, .9985, .9992, .9996, .9998, 1, 1, 1, 1)";
/** power3.out, sampled into a CSS `linear()` curve. */
const EASE_POWER3_OUT =
  "linear(0, .0963, .1855, .2679, .3439, .4138, .478, .5367, .5904, .6392, .6836, .7237, .7599, .7924, .8215, .8474, .8704, .8907, .9085, .924, .9375, .9491, .959, .9674, .9744, .9802, .985, .9888, .9919, .9943, .9961, .9974, .9984, .9991, .9995, .9998, .9999, 1, 1, 1, 1)";
/** back.out(2.5) is a cubic, so this bezier is exact. */
const EASE_BACK_OUT = "cubic-bezier(0.3333, 1.8333, 0.6667, 1)";
/** power2.out, exact. */
const EASE_POWER2_OUT = "cubic-bezier(0.3333, 1, 0.6667, 1)";

// ==========================================
// STEPPER NAVIGATION HEADER (CSS transitions)
// ==========================================
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep,
      onStepChange,
      color = "var(--primary)",
      className,
      ...props
    },
    ref,
  ) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const progressPlaced = useRef(false);
    // A single step has no line to fill (and would divide by zero).
    const progress = steps.length > 1 ? currentStep / (steps.length - 1) : 0;
    const isCssColor = isCssColorValue(color);

    // Progress Line Animation — grows from the `scale-x-0` rest state on
    // mount, then from wherever it is to each new step.
    useEffect(() => {
      const el = progressRef.current;
      if (!el) return;
      // Settle the starting style first so the very first change transitions.
      if (!progressPlaced.current) {
        void el.offsetWidth;
        progressPlaced.current = true;
      }
      el.style.transition = `scale 0.5s ${EASE_POWER3_IN_OUT}`;
      el.style.scale = `${progress} 1`;
    }, [progress]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <style>{`
          @keyframes stepper-pulse-ring {
            from { transform: scale(1); opacity: 0.8; }
            to { transform: scale(1.45); opacity: 0; }
          }
        `}</style>

        {/* Background Track Line — sits on the circle centre (16px on mobile, 20px from sm up) */}
        <div className="absolute top-4 sm:top-5 left-0 w-full h-[2px] bg-muted -translate-y-1/2 z-0 rounded-full overflow-hidden">
          {/* Animated Foreground Progress Line */}
          <div
            ref={progressRef}
            className={cn(
              "absolute top-0 left-0 w-full h-full origin-left scale-x-0",
              !isCssColor && color,
            )}
            style={{ backgroundColor: isCssColor ? color : undefined }}
          />
        </div>

        {/* Step Indicators */}
        <div className="relative z-10 flex justify-between w-full">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isActive = currentStep === index;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center group relative min-w-0 px-1 sm:px-1.5"
                style={{ width: `${100 / steps.length}%` }}
              >
                {/* Clickable Area (Now unlocked for ALL steps) */}
                <button
                  type="button"
                  onClick={() => onStepChange?.(index)}
                  disabled={!onStepChange}
                  className={cn(
                    "relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border-2 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isCompleted || isActive
                      ? cn("border-transparent text-primary-foreground", !isCssColor && color)
                      : "border-border bg-card text-muted-foreground",
                    onStepChange
                      ? "cursor-pointer hover:scale-110 active:scale-95"
                      : "cursor-default",
                  )}
                  style={{
                    backgroundColor:
                      (isCompleted || isActive) && isCssColor
                        ? color
                        : undefined,
                  }}
                >
                  {/* Dynamic Inner Content with Pop */}
                  <StepIndicatorContent
                    isCompleted={isCompleted}
                    isActive={isActive}
                    index={index}
                    icon={step.icon}
                  />

                  {/* Active Ring Pulse Effect (CSS keyframes) */}
                  {isActive && isCssColor && <PulseRing color={color} />}
                </button>

                {/* Step Text */}
                <div className="mt-1.5 sm:mt-3 text-center flex flex-col items-center w-full min-w-0">
                  <span
                    className={cn(
                      "text-[11px] sm:text-sm font-semibold leading-tight break-words hyphens-auto transition-colors duration-300",
                      isActive || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-[11px] font-medium text-muted-foreground hidden sm:block mt-0.5 max-w-[120px] leading-tight">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
Stepper.displayName = "Stepper";

// ==========================================
// HELPER: STEP ICON POP ANIMATION
// ==========================================
interface StepIndicatorContentProps {
  isCompleted: boolean;
  isActive: boolean;
  index: number;
  icon?: React.ElementType;
}

const StepIndicatorContent = ({
  isCompleted,
  isActive,
  index,
  icon: Icon,
}: StepIndicatorContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<Animation | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    popRef.current?.cancel();
    popRef.current = el.animate(
      [
        { transform: "scale(0.3)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 400, easing: EASE_BACK_OUT },
    );
  }, [isCompleted, isActive]);

  if (isCompleted) {
    return (
      <div ref={contentRef} className="flex items-center justify-center">
        <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
      </div>
    );
  }

  return (
    <div
      ref={contentRef}
      className="font-semibold text-xs sm:text-sm flex items-center justify-center"
    >
      {Icon ? <Icon className="w-4 h-4 sm:w-5 sm:h-5" /> : index + 1}
    </div>
  );
};

// ==========================================
// HELPER: CONTINUOUS RING PULSE
// ==========================================
const PulseRing = ({ color }: { color: string }) => {
  return (
    <div
      className="absolute inset-0 rounded-full border-2 pointer-events-none"
      style={{
        borderColor: color,
        animation: `stepper-pulse-ring 1.5s ${EASE_POWER2_OUT} infinite`,
      }}
    />
  );
};

// ==========================================
// STEPPER CONTENT VIEW (Sliding Transitions)
// ==========================================
export interface StepperContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
}

export const StepperContent = React.forwardRef<
  HTMLDivElement,
  StepperContentProps
>(({ steps, currentStep, className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(currentStep);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    if (!containerRef.current) return;
    const dir = currentStep >= prevStepRef.current ? 1 : -1;
    prevStepRef.current = currentStep;

    // Animate slide-in
    const animations = Array.from(containerRef.current.children, (child) =>
      child.animate(
        [
          { transform: `translateX(${45 * dir}px) scale(0.98)`, opacity: 0 },
          { transform: "translateX(0px) scale(1)", opacity: 1 },
        ],
        { duration: 450, easing: EASE_POWER3_OUT },
      ),
    );
    return () => animations.forEach((animation) => animation.cancel());
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {/* Key change triggers React to swap DOM nodes cleanly for the slide-in */}
      <div key={currentStep} className="w-full">
        {steps[currentStep]?.content}
      </div>
    </div>
  );
});
StepperContent.displayName = "StepperContent";
