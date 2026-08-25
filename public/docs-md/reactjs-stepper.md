# Stepper

A production-grade, highly animated multi-step wizard component engineered exclusively with **GSAP**. It splits the layout into two decoupled blocks: the visual progress tracker and the bidirectional sliding content payload.

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

export const usageFlow = `// The Workspace step picks a role with the Select block:
//   npx shadcn@latest add https://algorize-ui.vercel.app/r/select.json

const PRIMARY_ROLE_OPTIONS = [
  "Developer",
  "Designer",
  "Product Manager",
  "Founder",
].map((r) => ({ label: r, value: r }));

const BACK_BTN =
  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer";
const NEXT_BTN =
  "flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer bg-indigo-600";

// Controlled field. \`error\` is what makes a blocked Next visible to the reader.
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
            "w-full h-11 bg-zinc-50 dark:bg-zinc-900 border rounded-xl px-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all",
            Icon && "pl-10",
            error
              ? "border-rose-500 focus:ring-rose-500/20"
              : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600",
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
                className="rounded border-zinc-300 dark:border-zinc-700 text-rose-500 focus:ring-rose-500"
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

          The active theme color for the progress line, completed/active
          circles and the pulse ring. Any CSS color value — hex,{" "}
          rgb(), hsl(), oklch() or{" "}
          var(--token) — is applied inline. A Tailwind background
          class (e.g. "bg-indigo-500") also works for the line and
          circles, but the pulse ring is skipped: its border color would need a{" "}
          border-* class built at runtime, which Tailwind's scanner
          never sees.

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

**Component Path:** `[framework]\stepper\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
