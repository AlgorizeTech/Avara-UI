"use client";

import {
  Wizard,
  WizardContainer,
  WizardDescription,
  WizardInput,
  WizardNavigation,
  WizardProgress,
  WizardStep,
  WizardTitle,
} from "@/components/custom/blocks/WizardBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const WIZARD_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface WizardContextType { currentStep: number; totalSteps: number; nextStep: () => void; prevStep: () => void; setTotalSteps: (steps: number) => void; color: string; }
const WizardContext = createContext<WizardContextType | null>(null);
export function useWizard() { const context = useContext(WizardContext); if (!context) throw new Error("Missing WizardContext"); return context; }

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> { initialStep?: number; color?: string; onComplete?: () => void; }
export const Wizard = forwardRef<HTMLDivElement, WizardProps>(({ children, initialStep = 0, color = "indigo", onComplete, className, ...props }, ref) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [totalSteps, setTotalSteps] = useState(0);

  const nextStep = () => { if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1); else if (onComplete) onComplete(); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep((prev) => prev - 1); };

  return (
    <WizardContext.Provider value={{ currentStep, totalSteps, nextStep, prevStep, setTotalSteps, color }}>
      <div ref={ref} className={cn("relative w-full flex flex-col", className)} {...props}>{children}</div>
    </WizardContext.Provider>
  );
});
Wizard.displayName = "Wizard";

export const WizardProgress = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { currentStep, totalSteps, color } = useWizard();
  const progressRef = useRef<HTMLDivElement>(null);
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  useEffect(() => { if (progressRef.current) gsap.to(progressRef.current, { width: \`\${progress}%\`, duration: 0.6, ease: "power3.out" }); }, [progress]);

  const colorMap: Record<string, string> = { indigo: "bg-indigo-600 dark:bg-indigo-500", blue: "bg-blue-600 dark:bg-blue-500", rose: "bg-rose-600 dark:bg-rose-500", emerald: "bg-emerald-600 dark:bg-emerald-500", zinc: "bg-zinc-900 dark:bg-zinc-100" };
  return (<div ref={ref} className={cn("w-full h-1.5 bg-zinc-200 dark:bg-zinc-800", className)} {...props}><div ref={progressRef} className={cn("h-full w-0", colorMap[color] || colorMap.indigo)} /></div>);
});
WizardProgress.displayName = "WizardProgress";

export const WizardContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { setTotalSteps } = useWizard();
  useEffect(() => {
    const stepCount = React.Children.toArray(children).filter(child => React.isValidElement(child) && (child.type as any).displayName === "WizardStep").length;
    setTotalSteps(stepCount);
  }, [children, setTotalSteps]);
  return (<div ref={ref} className={cn("relative w-full h-[500px] overflow-hidden bg-white dark:bg-[#09090b]", className)} {...props}>{children}</div>);
});
WizardContainer.displayName = "WizardContainer";

export interface WizardStepProps extends React.HTMLAttributes<HTMLDivElement> { index: number; }
export const WizardStep = forwardRef<HTMLDivElement, WizardStepProps>(({ children, index, className, ...props }, ref) => {
  const { currentStep } = useWizard();
  const stepRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => stepRef.current as HTMLDivElement);

  useEffect(() => {
    if (!stepRef.current) return;
    const isActive = index === currentStep; const isPast = index < currentStep;
    let yOffset = 0; if (isPast) yOffset = -150; else if (index > currentStep) yOffset = 150;
    gsap.to(stepRef.current, { y: yOffset, opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none", duration: 0.7, ease: "power3.out" });
  }, [currentStep, index]);

  return (<div ref={stepRef} className={cn("absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 opacity-0 pointer-events-none", className)} {...props}><div className="w-full max-w-3xl mx-auto flex flex-col gap-6">{children}</div></div>);
});
WizardStep.displayName = "WizardStep";

export const WizardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => {
  return (<h2 ref={ref} className={cn("text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50", className)} {...props}>{children}</h2>);
});
WizardTitle.displayName = "WizardTitle";

export const WizardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ children, className, ...props }, ref) => {
  return (<p ref={ref} className={cn("text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mt-2", className)} {...props}>{children}</p>);
});
WizardDescription.displayName = "WizardDescription";

export const WizardInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  const { color } = useWizard();
  const focusColors: Record<string, string> = { indigo: "focus:border-indigo-500", blue: "focus:border-blue-500", rose: "focus:border-rose-500", emerald: "focus:border-emerald-500", zinc: "focus:border-zinc-500 dark:focus:border-zinc-400" };
  return (<input ref={ref} className={cn("w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none transition-colors", focusColors[color] || focusColors.indigo, className)} {...props} />);
});
WizardInput.displayName = "WizardInput";

export const WizardNavigation = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { currentStep, nextStep, prevStep, color } = useWizard();
  const btnColors: Record<string, string> = { indigo: "bg-indigo-600 hover:bg-indigo-700 text-white", blue: "bg-blue-600 hover:bg-blue-700 text-white", rose: "bg-rose-600 hover:bg-rose-700 text-white", emerald: "bg-emerald-600 hover:bg-emerald-700 text-white", zinc: "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900" };
  return (
    <div ref={ref} className={cn("flex items-center gap-4 mt-8", className)} {...props}>
      <button type="button" onClick={nextStep} className={cn("px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all active:scale-95 shadow-sm", btnColors[color] || btnColors.indigo)}>
        OK <span className="font-normal opacity-70 ml-2 hidden sm:inline">press Enter ↵</span>
      </button>
      {currentStep > 0 && (<button type="button" onClick={prevStep} className="px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Back</button>)}
    </div>
  );
});
WizardNavigation.displayName = "WizardNavigation";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const WIZARD_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WizardContext = createContext(null);
export function useWizard() { const context = useContext(WizardContext); if (!context) throw new Error("Missing WizardContext"); return context; }

export const Wizard = forwardRef(({ children, initialStep = 0, color = "indigo", onComplete, className, ...props }, ref) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [totalSteps, setTotalSteps] = useState(0);

  const nextStep = () => { if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1); else if (onComplete) onComplete(); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep((prev) => prev - 1); };

  return (
    <WizardContext.Provider value={{ currentStep, totalSteps, nextStep, prevStep, setTotalSteps, color }}>
      <div ref={ref} className={cn("relative w-full flex flex-col", className)} {...props}>{children}</div>
    </WizardContext.Provider>
  );
});
Wizard.displayName = "Wizard";

export const WizardProgress = forwardRef(({ className, ...props }, ref) => {
  const { currentStep, totalSteps, color } = useWizard();
  const progressRef = useRef(null);
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  useEffect(() => { if (progressRef.current) gsap.to(progressRef.current, { width: \`\${progress}%\`, duration: 0.6, ease: "power3.out" }); }, [progress]);

  const colorMap = { indigo: "bg-indigo-600 dark:bg-indigo-500", blue: "bg-blue-600 dark:bg-blue-500", rose: "bg-rose-600 dark:bg-rose-500", emerald: "bg-emerald-600 dark:bg-emerald-500", zinc: "bg-zinc-900 dark:bg-zinc-100" };
  return (<div ref={ref} className={cn("w-full h-1.5 bg-zinc-200 dark:bg-zinc-800", className)} {...props}><div ref={progressRef} className={cn("h-full w-0", colorMap[color] || colorMap.indigo)} /></div>);
});
WizardProgress.displayName = "WizardProgress";

export const WizardContainer = forwardRef(({ children, className, ...props }, ref) => {
  const { setTotalSteps } = useWizard();
  useEffect(() => {
    const stepCount = React.Children.toArray(children).filter(child => React.isValidElement(child) && child.type.displayName === "WizardStep").length;
    setTotalSteps(stepCount);
  }, [children, setTotalSteps]);
  return (<div ref={ref} className={cn("relative w-full h-[500px] overflow-hidden bg-white dark:bg-[#09090b]", className)} {...props}>{children}</div>);
});
WizardContainer.displayName = "WizardContainer";

export const WizardStep = forwardRef(({ children, index, className, ...props }, ref) => {
  const { currentStep } = useWizard();
  const stepRef = useRef(null);
  React.useImperativeHandle(ref, () => stepRef.current);

  useEffect(() => {
    if (!stepRef.current) return;
    const isActive = index === currentStep; const isPast = index < currentStep;
    let yOffset = 0; if (isPast) yOffset = -150; else if (index > currentStep) yOffset = 150;
    gsap.to(stepRef.current, { y: yOffset, opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none", duration: 0.7, ease: "power3.out" });
  }, [currentStep, index]);

  return (<div ref={stepRef} className={cn("absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 opacity-0 pointer-events-none", className)} {...props}><div className="w-full max-w-3xl mx-auto flex flex-col gap-6">{children}</div></div>);
});
WizardStep.displayName = "WizardStep";

export const WizardTitle = forwardRef(({ children, className, ...props }, ref) => {
  return (<h2 ref={ref} className={cn("text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50", className)} {...props}>{children}</h2>);
});
WizardTitle.displayName = "WizardTitle";

export const WizardDescription = forwardRef(({ children, className, ...props }, ref) => {
  return (<p ref={ref} className={cn("text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mt-2", className)} {...props}>{children}</p>);
});
WizardDescription.displayName = "WizardDescription";

export const WizardInput = forwardRef(({ className, ...props }, ref) => {
  const { color } = useWizard();
  const focusColors = { indigo: "focus:border-indigo-500", blue: "focus:border-blue-500", rose: "focus:border-rose-500", emerald: "focus:border-emerald-500", zinc: "focus:border-zinc-500 dark:focus:border-zinc-400" };
  return (<input ref={ref} className={cn("w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none transition-colors", focusColors[color] || focusColors.indigo, className)} {...props} />);
});
WizardInput.displayName = "WizardInput";

export const WizardNavigation = forwardRef(({ children, className, ...props }, ref) => {
  const { currentStep, nextStep, prevStep, color } = useWizard();
  const btnColors = { indigo: "bg-indigo-600 hover:bg-indigo-700 text-white", blue: "bg-blue-600 hover:bg-blue-700 text-white", rose: "bg-rose-600 hover:bg-rose-700 text-white", emerald: "bg-emerald-600 hover:bg-emerald-700 text-white", zinc: "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900" };
  return (
    <div ref={ref} className={cn("flex items-center gap-4 mt-8", className)} {...props}>
      <button type="button" onClick={nextStep} className={cn("px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all active:scale-95 shadow-sm", btnColors[color] || btnColors.indigo)}>
        OK <span className="font-normal opacity-70 ml-2 hidden sm:inline">press Enter ↵</span>
      </button>
      {currentStep > 0 && (<button type="button" onClick={prevStep} className="px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Back</button>)}
    </div>
  );
});
WizardNavigation.displayName = "WizardNavigation";`;

export function WizardShowcase() {
  const [color, setColor] = useState<
    "blue" | "indigo" | "rose" | "emerald" | "zinc"
  >("indigo");
  const [key, setKey] = useState(0); // Force remount to restart wizard

  const generateUsageCode = (isTs: boolean) => {
    return `import { 
  Wizard, 
  WizardProgress, 
  WizardContainer, 
  WizardStep, 
  WizardTitle, 
  WizardDescription, 
  WizardInput, 
  WizardNavigation 
} from "@/components/custom/blocks/WizardBlock";

export default function OnboardingFlow() {
  return (
    <Wizard color="${color}">
      <WizardProgress />
      
      <WizardContainer>
        {/* STEP 1 */}
        <WizardStep index={0}>
          <WizardTitle>1. What's your first name?</WizardTitle>
          <form onSubmit={(e) => { e.preventDefault(); /* handle native enter key */ }}>
            <WizardInput placeholder="Type your answer here..." autoFocus />
            <WizardNavigation />
          </form>
        </WizardStep>

        {/* STEP 2 */}
        <WizardStep index={1}>
          <WizardTitle>2. What is your role?</WizardTitle>
          <WizardDescription>This helps us customize your dashboard.</WizardDescription>
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <WizardInput placeholder="e.g. Frontend Developer" />
            <WizardNavigation />
          </form>
        </WizardStep>

        {/* STEP 3 */}
        <WizardStep index={2}>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <WizardTitle>You're all set!</WizardTitle>
            <WizardDescription>Your workspace has been configured.</WizardDescription>
            <button className="mt-8 px-8 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold">
              Go to Dashboard
            </button>
          </div>
        </WizardStep>
      </WizardContainer>
    </Wizard>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Active Theme Color
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["indigo", "blue", "rose", "emerald", "zinc"] as const).map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      color === c
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {c}
                  </button>
                ),
              )}
            </div>
          </div>

          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-bold rounded-lg border bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center w-full sm:w-auto"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 mr-2"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v6h6" />
            </svg>
            Restart Demo
          </button>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="WizardBlock"
        tsCode={WIZARD_ENGINE_CODE_TS}
        jsCode={WIZARD_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] overflow-hidden">
          <Wizard key={key} color={color}>
            {/* The absolute top progress bar */}
            <WizardProgress />

            <WizardContainer>
              {/* STEP 1 */}
              <WizardStep index={0}>
                <WizardTitle>1. What's your first name?</WizardTitle>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // The navigation button handles the step change,
                    // but this allows the native "Enter" key to trigger it via an invisible submit button
                    const nextBtn = e.currentTarget.querySelector(
                      'button[type="button"]',
                    ) as HTMLButtonElement;
                    if (nextBtn) nextBtn.click();
                  }}
                >
                  <WizardInput
                    placeholder="Type your answer here..."
                    autoFocus
                  />
                  <WizardNavigation />
                </form>
              </WizardStep>

              {/* STEP 2 */}
              <WizardStep index={1}>
                <WizardTitle>2. What is your role?</WizardTitle>
                <WizardDescription>
                  We will customize your dashboard based on this.
                </WizardDescription>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const nextBtn = e.currentTarget.querySelector(
                      'button[type="button"]',
                    ) as HTMLButtonElement;
                    if (nextBtn) nextBtn.click();
                  }}
                >
                  <WizardInput placeholder="e.g. Frontend Developer" />
                  <WizardNavigation />
                </form>
              </WizardStep>

              {/* STEP 3 */}
              <WizardStep index={2}>
                <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500 delay-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <WizardTitle>You're all set!</WizardTitle>
                  <WizardDescription>
                    Your workspace has been successfully configured.
                  </WizardDescription>
                  <button
                    onClick={() => setKey((prev) => prev + 1)}
                    className="mt-8 px-8 py-3.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold hover:scale-105 transition-transform"
                  >
                    Finish & Restart
                  </button>
                </div>
              </WizardStep>
            </WizardContainer>
          </Wizard>
        </div>
      </ComponentPreview>
    </div>
  );
}
