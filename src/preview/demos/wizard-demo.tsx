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
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

/** Lets the native Enter key advance the wizard from inside a step's form. */
const submitToNext = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // The navigation button handles the step change,
  // but this allows the native "Enter" key to trigger it via an invisible submit button
  const nextBtn = e.currentTarget.querySelector(
    'button[type="button"]',
  ) as HTMLButtonElement;
  if (nextBtn) nextBtn.click();
};

export default function WizardDemo({
  color = "primary",
  wizardKey = 0,
  initialStep = 0,
  showProgress = true,
}: {
  color?: string;
  /** Incremented by the showcase's "Restart Demo" button to remount the wizard. */
  wizardKey?: number;
  /** Step the wizard opens on. */
  initialStep?: number;
  /** Set false to leave <WizardProgress /> out of the tree. */
  showProgress?: boolean;
}) {
  // Local restart counter for the in-demo "Finish & Restart" button
  const [localKey, setLocalKey] = useState(0);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <Wizard
        key={`${wizardKey}-${localKey}`}
        color={color}
        initialStep={initialStep}
      >
        {/* The absolute top progress bar */}
        {showProgress && <WizardProgress />}

        <WizardContainer>
          {/* STEP 1 */}
          <WizardStep index={0}>
            <WizardTitle>1. What's your first name?</WizardTitle>
            <form onSubmit={submitToNext}>
              <WizardInput placeholder="Type your answer here..." autoFocus />
              <WizardNavigation />
            </form>
          </WizardStep>

          {/* STEP 2 */}
          <WizardStep index={1}>
            <WizardTitle>2. What is your role?</WizardTitle>
            <WizardDescription>
              We will customize your dashboard based on this.
            </WizardDescription>
            <form onSubmit={submitToNext}>
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
                onClick={() => setLocalKey((prev) => prev + 1)}
                className="mt-8 px-8 py-3.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold hover:scale-105 transition-transform"
              >
                Finish & Restart
              </button>
            </div>
          </WizardStep>
        </WizardContainer>
      </Wizard>
    </div>
  );
}
