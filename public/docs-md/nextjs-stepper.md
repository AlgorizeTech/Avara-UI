# Stepper

A production-grade, highly animated multi-step wizard component engineered exclusively with **GSAP**. It splits the layout into two decoupled blocks: the visual progress tracker and the bidirectional sliding content payload.

Unlike basic UI placeholders, this engine is designed to handle **real form state, per-step input validation, and asynchronous API submission handling** (including error states) with silky 60fps transitions.

## Interactive Showcase

Fill in the fields below and step through the wizard. If you try clicking Next without filling required fields, red validation errors will prevent navigation. On the final **Review** step, toggle the **Simulate Server Error** checkbox to test both successful completions and backend failure alerts.

## Installation

### Dependencies

This component relies exclusively on **GSAP** for all line scaling, icon scaling, ring pulsing, and layout transitions.

```bash
npm install gsap lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/StepperBlock.tsx.

## Usage Architecture

To build a complete form wizard, manage your data in a parent state object and pass per-step validation checks into your navigation handlers:

```tsx

export default function RealFormWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ fullName: "", company: "" });
  const [errors, setErrors] = useState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (current: number) => {
    if (current === 0 && !formData.fullName) {
      setErrors({ fullName: "Name required" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      alert("Success!");
    } catch (err) {
      alert("Submission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      id: "1",
      title: "Profile",
      icon: User,
      content: (
        
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
      ),
    },
    {
      id: "2",
      title: "Workspace",
      icon: Building2,
      content: Workspace Form,
    },
    {
      id: "3",
      title: "Review",
      icon: CheckCircle2,
      content: Summary Screen,
    },
  ];

  return (

         setStep((s) => s - 1)} disabled={step === 0}>
          Back
        
        {step === steps.length - 1 ? (
          
            Submit
          
        ) : (
          Next
        )}

  );
}
```

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
