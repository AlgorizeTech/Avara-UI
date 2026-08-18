# Progress Wizard

A "Typeform" style multi-step wizard featuring buttery smooth vertical slide transitions powered by GSAP, native keyboard navigation, and an interactive progress bar.

This component relies on the **Compound Component** pattern using React Context. This allows you to place the `WizardProgress` bar independently of the main `WizardContainer`, and nest complex forms inside the `WizardStep` blocks without passing deep props.

## Examples

Because every piece reads the wizard's state from context, you compose the flow yourself — drop the progress bar wherever you like, or leave it out. Press **Enter** inside any step to advance.

export const usageDefault = `import {
  Wizard,
  WizardContainer,
  WizardDescription,
  WizardInput,
  WizardNavigation,
  WizardProgress,
  WizardStep,
  WizardTitle,
} from "@/components/custom/blocks/WizardBlock";

export default function OnboardingFlow() {
  // Enter submits the step's form; forwarding it to the OK button
  // is what makes keyboard progression work.
  const submitToNext = (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button[type="button"]');
    if (btn) btn.click();
  };

  return (
    
      {/* Top progress bar — reads totalSteps from context */}

      {/* Overflow-hidden container the GSAP slide happens inside */}

          1. What's your first name?

          2. What is your role?
          
            We will customize your dashboard based on this.

  );
}`;

export const usageInitialStep = `import {
  Wizard,
  WizardContainer,
  WizardProgress,
  WizardStep,
} from "@/components/custom/blocks/WizardBlock";

export default function ResumedOnboarding() {
  // Open on step 2 — useful when you persist progress between sessions.
  return (

      {/* ...steps... */}
    
  );
}`;

export const usageNoProgress = `import {
  Wizard,
  WizardContainer,
  WizardStep,
} from "@/components/custom/blocks/WizardBlock";

export default function BareWizard() {
  // WizardProgress is an independent child — omit it entirely and the
  // steps still animate and navigate exactly the same.
  return (
    
      {/* ...steps... */}
    
  );
}`;

## Installation

## Features
Learn about the Wizard component's multi-step capabilities, providing state management and validation for complex onboarding flows.

    Compound Components
    Uses React Context to share state across child components, preventing messy prop drilling and enabling flexible layouts.

    GSAP Animations
    Features premium, buttery smooth vertical sliding transitions engineered with GSAP.

    Keyboard Navigation
    Natively supports "Enter" key progression to submit forms and move to the next step instantly.

    Auto-Progress Bar
    Automatically calculates completion percentage based on the number of active steps rendered.

## Best Practices & Guidelines

    State Management
    Since `WizardStep` components act as independent layout blocks, keep your actual form state (e.g., using React Hook Form or standard state) lifted up to the parent component wrapping the `WizardContainer`.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Wizard

          initialStep

          number

          0
        
        The index of the step to show on the initial render.

          Wizard

          color

          "primary" | "indigo" | "blue" | "rose" | "emerald" | "zinc" | string

          "primary"

          Controls the theme color for the progress bar, active input borders,
          and primary navigation buttons. Accepts valid hex codes.

          Wizard

          onComplete

          () =&gt; void

          undefined

          Callback function fired if the user clicks "Next" or presses "Enter"
          while currently on the final step.

          WizardStep

          index

          number

          Required

          The 0-based index of this specific step. Used by the GSAP animation
          engine to calculate the vertical Y-offset relative to the{" "}
          currentStep.

          WizardInput

          ...props

          InputHTMLAttributes

          undefined

          Accepts all native HTML input attributes (e.g.,{" "}
          placeholder, autoFocus,{" "}
          onChange, type).

          WizardTitle

          children

          ReactNode

          Required
        
        The primary heading or question for the current step.

          WizardDescription

          children

          ReactNode

          Required
        
        Secondary context or helper text displayed below the title.

---

**Component Path:** `nextjs\wizard\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
