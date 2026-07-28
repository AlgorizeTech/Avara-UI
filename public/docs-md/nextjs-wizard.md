# Progress Wizard

A "Typeform" style multi-step wizard featuring buttery smooth vertical slide transitions powered by GSAP, native keyboard navigation, and an interactive progress bar.

This component relies on the **Compound Component** pattern using React Context. This allows you to place the `WizardProgress` bar independently of the main `WizardContainer`, and nest complex forms inside the `WizardStep` blocks without passing deep props.

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

## Interactive Showcase
Navigate through the interactive Wizard steps to test the transition animations and form state.

## Installation

### Dependencies

This component leverages **GSAP** for the high-performance vertical slide and progress bar animations.

```bash
npm install gsap
```

## Copy the Component

You can copy the full engine code directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/WizardBlock.tsx.

## Implementation

```tsx

export default function OnboardingFlow() {
  return (
     console.log("Done!")}>
      {/* Top sticky progress bar */}

      {/* Scroll-hidden container for GSAP animations */}
      
        {/* Step 1 */}
        
          1. What's your project name?
           {
              e.preventDefault();
              // Trigger the internal nextStep function manually, or via button click simulation
              const btn = e.currentTarget.querySelector(
                'button[type="button"]',
              );
              if (btn) (btn as HTMLButtonElement).click();
            }}
          >

        {/* Step 2 */}
        
          2. What framework do you use?
          
            We will tailor the documentation to match.
          
           e.preventDefault()}>

  );
}
```

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

          "indigo" | "blue" | "rose" | "emerald" | "zinc"

          "indigo"

          Controls the theme color for the progress bar, active input borders,
          and primary navigation buttons.

          Wizard

          onComplete

          () => void

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
