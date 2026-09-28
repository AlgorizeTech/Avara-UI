# Progress Wizard

A "Typeform" style multi-step wizard featuring buttery smooth vertical slide transitions powered by plain CSS transitions, native keyboard navigation, and an interactive progress bar.

This component relies on the **Compound Component** pattern using React Context. This allows you to place the `WizardProgress` bar independently of the main `WizardContainer`, and nest complex forms inside the `WizardStep` blocks without passing deep props.

Because every piece reads the wizard's state from context, you compose the flow yourself — drop the progress bar wherever you like, or leave it out. Press **Enter** inside any step to advance. It includes dynamic theme binding via the `color` prop (`"indigo"`, `"rose"`, `"emerald"`, `"zinc"`, `"blue"`, `"primary"`, or hex) to automatically style the progress bar, input focus rings, and action buttons.

export const wizardSteps = `        
          1. What's your first name?

          2. What is your role?
          
            We will customize your dashboard based on this.

        {/* The closing step is just markup — no input, no navigation. */}

            You're all set!
            
              Your workspace has been successfully configured.
            
             setRunKey((prev) => prev + 1)}
              className="mt-8 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
            >
              Finish & Restart

        `;

export const wizardPreamble = `  // Remounting the Wizard is what resets it back to the first step.
  const [runKey, setRunKey] = useState(0);

  // Enter submits the step's form; forwarding it to the OK button
  // is what makes keyboard progression work.
  const submitToNext = (e: FormEvent) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector(
      'button[type="button"]',
    );
    if (btn) btn.click();
  };`;

export const usageDefault = `"use client";

export default function OnboardingFlow() {
${wizardPreamble}

  return (
    
      {/* Top progress bar — reads totalSteps from context */}

      {/* Overflow-hidden container the slide happens inside */}
      
${wizardSteps}

  );
}`;

export const usageInitialStep = `"use client";

export default function ResumedOnboarding() {
${wizardPreamble}

  return (
    // Open on step 2 — useful when you persist progress between sessions.
    
      {/* Top progress bar — reads totalSteps from context */}

      {/* Overflow-hidden container the slide happens inside */}
      
${wizardSteps}

  );
}`;

export const usageNoProgress = `"use client";

export default function BareWizard() {
${wizardPreamble}

  return (
    // WizardProgress is an independent child — omit it entirely and the
    // steps still animate and navigate exactly the same.
    
      {/* Overflow-hidden container the slide happens inside */}
      
${wizardSteps}

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/wizard
```

## Examples

## Features
Learn about the Wizard component's multi-step capabilities, providing state management and validation for complex onboarding flows.

    Compound Components
    Uses React Context to share state across child components, preventing messy prop drilling and enabling flexible layouts.

    Library-free Animations
    Features premium, buttery smooth vertical sliding transitions built on CSS transitions — no animation library to install.

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

          The 0-based index of this specific step. Used by the animation
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

**Component Path:** `[framework]\wizard\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
