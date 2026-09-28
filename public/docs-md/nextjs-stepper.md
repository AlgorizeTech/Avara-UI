# Stepper

A production-grade, highly animated multi-step wizard component built on plain **CSS transitions and the Web Animations API** — no animation library. It splits the layout into two decoupled blocks: the visual progress tracker and the bidirectional sliding content payload.

Unlike basic UI placeholders, this engine is designed to handle **real form state, per-step input validation, and asynchronous API submission handling** (including error states) with silky 60fps transitions.

`Stepper` (the tracker) and `StepperContent` (the sliding payload) are decoupled — they only share the `steps` array and a `currentStep` number that you own, so `Stepper` also works alone as a progress header above content you lay out yourself. Validation, submission and error handling stay in your component.

export const stepperPanels = `// The three step bodies — swap them for your own fields.
function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    
      {label}

  );
}

function ProfileForm() {
  return (

  );
}

function WorkspaceForm() {
  return (

  );
}

function ReviewPanel() {
  return (
    
      Everything looks good — hit Submit to finish setting up your workspace.
    
  );
}`;

export const usageFlow = `"use client";

// The Workspace step picks a role with the Select block:
//   npx shadcn@latest add @algorize-ui/select

const PRIMARY_ROLE_OPTIONS = [
  "Developer",
  "Designer",
  "Product Manager",
  "Founder",
].map((r) => ({ label: r, value: r }));

const BACK_BTN =
  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-muted text-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/80 transition-all active:scale-95 cursor-pointer";
const NEXT_BTN =
  "flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-primary-foreground font-semibold text-sm shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer bg-primary";

// Controlled field. 'error' is what makes a blocked Next visible to the reader.
function Field({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  error,
  type,
}: {
  label: string;
  icon?: LucideIcon;
  placeholder: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  type?: string;
}) {
  return (

        {label} *

        {Icon && (

        )}
         onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-11 bg-background border rounded-xl px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all",
            Icon && "pl-10",
            error
              ? "border-destructive focus:ring-destructive/20"
              : "border-input focus:border-ring",
          )}
        />
      
      {error && (

          {error}
        
      )}
    
  );
}

// Every step body sits on this card — it is what the preview renders.
function StepCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (

        {title}
        {subtitle}
      
      {children}
    
  );
}

type FormData = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  password: string;
  confirmPassword: string;
};
type Errors = Partial>;

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "Developer",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key: keyof FormData) => (next: string) =>
    setFormData((prev) => ({ ...prev, [key]: next }));

  // Returns false AND records the reason, so the blocked step explains itself.
  const validateStep = (current: number) => {
    const next: Errors = {};
    if (current === 0 && !formData.fullName) next.fullName = "Name required";
    if (current === 1 && !formData.company) next.company = "Company required";
    if (current === 2 && !formData.password) next.password = "Password required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // simulateError is the preview's DEBUG_MODE switch — it lets you see the
      // failure branch without breaking the endpoint. Drop it in your own app.
      if (simulateError) throw new Error("ERR_500: Database insertion failed.");
      await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
      });
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      id: "profile",
      title: "Profile",
      description: "Personal details",
      icon: User,
      content: (

      ),
    },
    {
      id: "workspace",
      title: "Workspace",
      description: "Organization",
      icon: Building2,
      content: (

                Primary Role

      ),
    },
    {
      id: "security",
      title: "Security",
      description: "Credentials",
      icon: ShieldCheck,
      content: (

      ),
    },
    {
      id: "review",
      title: "Review",
      description: "Confirm & Submit",
      icon: CheckCircle2,
      content: (

              Name:
              {formData.fullName || "—"}

              Email:
              {formData.email || "—"}

              Company:
              {formData.company || "—"}

              Role:
              {formData.role || "—"}

          {submitError && (

                Submission Failed
                {submitError}

          )}

               setSimulateError(e.target.checked)}
                className="rounded border-input text-primary focus:ring-primary"
              />
              Simulate Server Error on Submit
            
            DEBUG_MODE

      ),
    },
  ];

  return (
    
      {/* onStepChange is what makes the circles clickable — gate it on validation */}
       {
          if (target 

         setStep((s) => s - 1)}
          disabled={step === 0 || isSubmitting}
          className={BACK_BTN}
        >
          
          Back

        {step === steps.length - 1 ? (
          
            {isSubmitting ? (
              <>
                
                Submitting...
              
            ) : (
              <>
                Submit Onboarding

            )}
          
        ) : (
          
            Next Step

        )}

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/stepper
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

### Stepper

The visual navigation header component that renders step indicators and the animated progress fill line.

        Prop
        Type
        Default
        Description

          steps

          Step[]

          Required

          An array of step objects defining the sequence. Each object requires an id and title. description, icon, and content are optional.

          currentStep

          number

          Required

          The active zero-indexed step of the sequence. Controls the progress line fill and active/completed indicator states.

          onStepChange

          (step: number) =&gt; void

          undefined

          Callback fired when a user clicks directly on a step circle in the header. If omitted, the steps become static visual indicators.

          color

          string

          "var(--primary)"

          The active theme color for the progress line, active/completed circles and pulse ring. Supports any CSS color value or Tailwind background class.

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost navigation header wrapper.

### StepperContent

The sliding content container component that handles the animated sliding entrance of each step payload.

        Prop
        Type
        Default
        Description

          steps

          Step[]

          Required

          The identical array passed to the header component. Renders the active step's content node.

          currentStep

          number

          Required

          The active zero-indexed step used to identify which payload to render and determine the sliding transition direction.

          className

          string

          undefined

          Custom Tailwind CSS classes applied to the sliding content wrapper container.

### Step (TypeScript Interface)

The TypeScript interface defining the structure of each object in the steps array prop.

        Property
        Type
        Required
        Description

          id

          string

          Yes

          A unique identifier string required for safe React list rendering.

          title

          string

          Yes

          Primary headline text displayed prominently below the step circle indicator.

          description

          string

          No

          Optional secondary helper text displayed directly underneath the step title on larger screens.

          icon

          React.ElementType

          No

          Optional Lucide React icon or custom SVG component rendered inside the step circle indicator instead of a default number.

          content

          React.ReactNode

          No

          The JSX/UI payload (e.g., input forms, review summaries) rendered inside StepperContent when this step is active.

---

**Component Path:** `[framework]\stepper\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
