"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
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
// STEPPER NAVIGATION HEADER (GSAP)
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
    const progress = currentStep / (steps.length - 1);
    const isCssColor = isCssColorValue(color);

    // GSAP Progress Line Animation
    useEffect(() => {
      if (!progressRef.current) return;
      gsap.to(progressRef.current, {
        scaleX: progress,
        duration: 0.5,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }, [progress]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
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
                    "relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border-2 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
                    isCompleted || isActive
                      ? cn("border-transparent text-white", !isCssColor && color)
                      : "border-border bg-card text-zinc-400 dark:text-zinc-600",
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
                  {/* Dynamic Inner Content with GSAP Pop */}
                  <StepIndicatorContent
                    isCompleted={isCompleted}
                    isActive={isActive}
                    index={index}
                    icon={step.icon}
                  />

                  {/* Active Ring Pulse Effect (GSAP Timeline) */}
                  {isActive && isCssColor && <PulseRing color={color} />}
                </button>

                {/* Step Text */}
                <div className="mt-1.5 sm:mt-3 text-center flex flex-col items-center w-full min-w-0">
                  <span
                    className={cn(
                      "text-[11px] sm:text-sm font-bold leading-tight break-words hyphens-auto transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : isCompleted
                          ? "text-foreground"
                          : "text-zinc-400 dark:text-zinc-600",
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
// GSAP HELPER: STEP ICON POP ANIMATION
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

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { scale: 0.3, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2.5)",
        overwrite: "auto",
      },
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
      className="font-bold text-xs sm:text-sm flex items-center justify-center"
    >
      {Icon ? <Icon className="w-4 h-4 sm:w-5 sm:h-5" /> : index + 1}
    </div>
  );
};

// ==========================================
// GSAP HELPER: CONTINUOUS RING PULSE
// ==========================================
const PulseRing = ({ color }: { color: string }) => {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ringRef.current) return;
    const tween = gsap.fromTo(
      ringRef.current,
      { scale: 1, opacity: 0.8 },
      {
        scale: 1.45,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="absolute inset-0 rounded-full border-2 pointer-events-none"
      style={{ borderColor: color }}
    />
  );
};

// ==========================================
// STEPPER CONTENT VIEW (GSAP Sliding Transitions)
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

    // Animate slide-in with GSAP
    gsap.fromTo(
      containerRef.current.children,
      { x: 45 * dir, opacity: 0, scale: 0.98 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      },
    );
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {/* Key change triggers React to swap DOM nodes cleanly for the GSAP tween */}
      <div key={currentStep} className="w-full">
        {steps[currentStep]?.content}
      </div>
    </div>
  );
});
StepperContent.displayName = "StepperContent";
