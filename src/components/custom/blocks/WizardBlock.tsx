"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ==========================================
// CONTEXT
// ==========================================
interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setTotalSteps: (steps: number) => void;
  color: string;
}

const WizardContext = createContext<WizardContextType | null>(null);

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("Wizard components must be used within a Wizard root.");
  }
  return context;
}

// ==========================================
// COMPONENTS
// ==========================================

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  initialStep?: number;
  color?: string;
  onComplete?: () => void;
}

export const Wizard = forwardRef<HTMLDivElement, WizardProps>(
  (
    {
      children,
      initialStep = 0,
      color = "indigo",
      onComplete,
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [totalSteps, setTotalSteps] = useState(0);

    const nextStep = () => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else if (onComplete) {
        onComplete();
      }
    };

    const prevStep = () => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
    };

    return (
      <WizardContext.Provider
        value={{
          currentStep,
          totalSteps,
          nextStep,
          prevStep,
          setTotalSteps,
          color,
        }}
      >
        <div
          ref={ref}
          className={cn("relative w-full flex flex-col", className)}
          {...props}
        >
          {children}
        </div>
      </WizardContext.Provider>
    );
  },
);
Wizard.displayName = "Wizard";

export const WizardProgress = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentStep, totalSteps, color } = useWizard();
  const progressRef = useRef<HTMLDivElement>(null);

  // Calculate percentage (avoid division by zero)
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [progress]);

  // Tailwind color mapping
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-600 dark:bg-indigo-500",
    blue: "bg-blue-600 dark:bg-blue-500",
    rose: "bg-rose-600 dark:bg-rose-500",
    emerald: "bg-emerald-600 dark:bg-emerald-500",
    zinc: "bg-zinc-900 dark:bg-zinc-100",
  };

  return (
    <div
      ref={ref}
      className={cn("w-full h-1.5 bg-zinc-200 dark:bg-zinc-800", className)}
      {...props}
    >
      <div
        ref={progressRef}
        className={cn("h-full w-0", colorMap[color] || colorMap.indigo)}
      />
    </div>
  );
});
WizardProgress.displayName = "WizardProgress";

export const WizardContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { setTotalSteps } = useWizard();

  useEffect(() => {
    // Automatically count the number of WizardStep children
    const stepCount = React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).displayName === "WizardStep",
    ).length;
    setTotalSteps(stepCount);
  }, [children, setTotalSteps]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full h-[500px] overflow-hidden bg-white dark:bg-[#09090b]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
WizardContainer.displayName = "WizardContainer";

export interface WizardStepProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

export const WizardStep = forwardRef<HTMLDivElement, WizardStepProps>(
  ({ children, index, className, ...props }, ref) => {
    const { currentStep } = useWizard();
    const stepRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => stepRef.current as HTMLDivElement);

    useEffect(() => {
      if (!stepRef.current) return;

      const isActive = index === currentStep;
      const isPast = index < currentStep;

      // Typeform style vertical scroll logic
      let yOffset = 0;
      if (isPast)
        yOffset = -150; // Scrolled up
      else if (index > currentStep) yOffset = 150; // Waiting below

      gsap.to(stepRef.current, {
        y: yOffset,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        duration: 0.7,
        ease: "power3.out",
      });
    }, [currentStep, index]);

    return (
      <div
        ref={stepRef}
        className={cn(
          "absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 opacity-0 pointer-events-none",
          className,
        )}
        {...props}
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          {children}
        </div>
      </div>
    );
  },
);
WizardStep.displayName = "WizardStep";

export const WizardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
});
WizardTitle.displayName = "WizardTitle";

export const WizardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mt-2",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
WizardDescription.displayName = "WizardDescription";

export const WizardInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { color } = useWizard();

  const focusColors: Record<string, string> = {
    indigo: "focus:border-indigo-500",
    blue: "focus:border-blue-500",
    rose: "focus:border-rose-500",
    emerald: "focus:border-emerald-500",
    zinc: "focus:border-zinc-500 dark:focus:border-zinc-400",
  };

  return (
    <input
      ref={ref}
      className={cn(
        "w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none transition-colors",
        focusColors[color] || focusColors.indigo,
        className,
      )}
      {...props}
    />
  );
});
WizardInput.displayName = "WizardInput";

export const WizardNavigation = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { currentStep, nextStep, prevStep, color } = useWizard();

  const btnColors: Record<string, string> = {
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    rose: "bg-rose-600 hover:bg-rose-700 text-white",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
    zinc: "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900",
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-4 mt-8", className)}
      {...props}
    >
      <button
        type="button"
        onClick={nextStep}
        className={cn(
          "px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all active:scale-95 shadow-sm",
          btnColors[color] || btnColors.indigo,
        )}
      >
        OK{" "}
        <span className="font-normal opacity-70 ml-2 hidden sm:inline">
          press Enter ↵
        </span>
      </button>
      {currentStep > 0 && (
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Back
        </button>
      )}
    </div>
  );
});
WizardNavigation.displayName = "WizardNavigation";
