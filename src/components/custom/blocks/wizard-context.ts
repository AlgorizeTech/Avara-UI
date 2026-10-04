"use client";

import { createContext, useContext } from "react";

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setTotalSteps: (steps: number) => void;
  color: string;
}

export const WizardContext = createContext<WizardContextType | null>(null);

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("Wizard components must be used within a Wizard root.");
  }
  return context;
}
