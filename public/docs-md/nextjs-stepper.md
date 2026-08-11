# Stepper

A production-grade, highly animated multi-step wizard component engineered exclusively with **GSAP**. It splits the layout into two decoupled blocks: the visual progress tracker and the bidirectional sliding content payload.

Unlike basic UI placeholders, this engine is designed to handle **real form state, per-step input validation, and asynchronous API submission handling** (including error states) with silky 60fps transitions.

## Examples

`Stepper` (the tracker) and `StepperContent` (the sliding payload) are decoupled — they only share the `steps` array and a `currentStep` number that you own. Validation, submission and error handling stay in your component. The first example's **Code** tab contains the full component source.

export const usageFlow = `"use client";

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ fullName: "", company: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (current) => {
    if (current === 0 && !formData.fullName) {
      setErrors({ fullName: "Name required" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/submit", { method: "POST", body: JSON.stringify(formData) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: "profile", title: "Profile", description: "Personal details", icon: User, content:  },
    { id: "workspace", title: "Workspace", description: "Organization", icon: Building2, content:  },
    { id: "review", title: "Review", description: "Confirm & Submit", icon: CheckCircle2, content:  },
  ];

  return (
    
      {/* onStepChange is what makes the circles clickable — gate it on validation */}
       {
          if (target 

         setStep((s) => s - 1)} disabled={step === 0}>
          Back
        
        {step === steps.length - 1 ? (
          Submit
        ) : (
           validateStep(step) && setStep((s) => s + 1)}>Next
        )}

  );
}`;

export const usageHeaderOnly = `"use client";

export default function CheckoutProgress() {
  const [step, setStep] = useState(0);

  // Stepper works on its own — use it as a progress tracker above
  // content you lay out yourself.
  return ;
}`;

export const usageMinimalSteps = `import { Stepper, StepperContent } from "@/components/custom/blocks/StepperBlock";

// Only id and title are required on a Step. Drop icon and description
// and the circles fall back to their 1-based index.
const steps = [
  { id: "profile", title: "Profile", content:  },
  { id: "workspace", title: "Workspace", content:  },
  { id: "security", title: "Security", content:  },
  { id: "review", title: "Review", content:  },
];

export default function MinimalStepper({ step, setStep }) {
  return (
    <>

  );
}`;

export const usageColor = `import { Stepper } from "@/components/custom/blocks/StepperBlock";

export default function BrandedStepper({ step, setStep }) {
  // color takes a hex (applied inline) or a Tailwind background class.
  return (
    
  );
}`;

## Installation

### Dependencies

This component relies exclusively on **GSAP** for all line scaling, icon scaling, ring pulsing, and layout transitions.

```bash
npm install gsap lucide-react
```

### Copy the Component

Create a new file at `components/custom/blocks/StepperBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

## Features
Learn about the Stepper component's linear progression features, providing clear visual feedback for multi-step forms and processes.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          Stepper

          steps

          Step[]

          Required

          An array defining the wizard sequence. Each object requires an{" "}
          id and title. description,{" "}
          icon, and content are optional.

          Stepper

          currentStep

          number

          Required

          The active zero-indexed step of the sequence. Controls the GSAP
          progress line fill and active/completed indicator states.

          Stepper

          onStepChange

          (step: number) =&gt; void

          undefined

          Callback fired when a user clicks directly on a step circle in the
          header. If omitted, the steps become static visual indicators. When
          provided, users can click any step to jump forward or backward freely.

          Stepper

          color

          string

          "#FFAB1D"

          The active theme color. Accepts valid hex codes (e.g.,{" "}
          "#FFAB1D") which are applied dynamically via inline
          styles, or standard Tailwind utility classes.

          Stepper

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost navigation
          header wrapper.

          StepperContent

          steps

          Step[]

          Required

          The identical array passed to the header component. This engine
          extracts the active step's content node and animates its
          entrance/exit via GSAP.

          StepperContent

          currentStep

          number

          Required

          The active zero-indexed step used to identify which payload to render
          and determine the direction (left/right) of the GSAP sliding
          animation.

          StepperContent

          className

          string

          undefined

          Custom Tailwind CSS classes applied to the sliding content wrapper
          container.

          Step

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          GSAP key mapping.

          Step

          title

          string

          Required

          Primary headline text displayed prominently below the step circle
          indicator.

          Step

          description

          string

          undefined

          Optional secondary helper text displayed directly underneath the step
          title on larger screens.

          Step

          icon

          React.ElementType

          undefined

          Optional Lucide React icon or custom SVG component rendered inside the
          step circle indicator instead of a default number.

          Step

          content

          React.ReactNode

          undefined

          The actual JSX/UI payload (e.g., input forms, review summaries)
          rendered inside the StepperContent container when this
          step is active.

---

**Component Path:** `nextjs\stepper\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
