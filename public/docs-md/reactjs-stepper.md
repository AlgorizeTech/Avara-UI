---
title: "Stepper"
description: "A production-grade, highly animated multi-step stepper and wizard component built on plain CSS transitions and the Web Animations API — no animation library."
url: https://avaraui.com/docs/nextjs/stepper
---

# Stepper

A production-grade, highly animated multi-step stepper and wizard component built on plain **CSS transitions and the Web Animations API** — no animation library. It splits the layout into two decoupled blocks: the visual progress tracker and the bidirectional sliding content payload.

Unlike basic UI placeholders, this engine is designed to handle **real form state, per-step input validation, and asynchronous API submission handling** (including error states) with silky 60fps transitions.

`Stepper` (the tracker) and `StepperContent` (the sliding payload) are decoupled — they only share the `steps` array and a `currentStep` number that you own, so `Stepper` also works alone as a progress header above content you lay out yourself. Validation, submission and error handling stay in your component.

## Stepper

Per-step validation blocks Next, and the Review step can simulate a failed submit.

- Pass `steps` as `{ id, title }[]` — `description`, `icon` and `content` are optional per step.
- `currentStep` is the zero-indexed active step, and drives the progress line fill.
- `onStepChange` makes the circles clickable. Omit it and they become static indicators.
- `color` takes any CSS colour — hex, `rgb()`, `oklch()`, `var(--token)` — applied inline. A Tailwind class works for the line and circles, but the pulse ring is skipped, since its border colour would need a class Tailwind's scanner never sees.

```tsx
// The Workspace step picks a role with the Select block:
//   npx shadcn@latest add @avara-ui/select

const PRIMARY_ROLE_OPTIONS = [
  "Developer",
  "Designer",
  "Product Manager",
  "Founder",
].map((r) => ({ label: r, value: r }));

const BACK_BTN =
  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-foreground/10 bg-card text-foreground font-semibold text-sm shadow-[0_1px_2px_rgb(0_0_0/0.04)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-all active:scale-95 cursor-pointer";
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
    <label className="flex flex-col gap-1.5 w-full">
      <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
        {label} <span className="text-destructive">*</span>
      </span>
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-muted-foreground pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            // Focus is a soft primary glow: the border takes the colour and a
            // faint 4px halo fades in with it.
            "w-full h-11 bg-background border rounded-xl px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-200 ease-out",
            Icon && "pl-10",
            error
              ? "border-destructive focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--destructive)_16%,transparent)]"
              : "border-input hover:border-foreground/20 focus:border-primary/65 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_16%,transparent)]",
          )}
        />
      </div>
      {error && (
        <span className="flex items-center gap-1 text-xs font-semibold text-destructive mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </span>
      )}
    </label>
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
    <div className="w-full p-6 sm:p-8 bg-card text-card-foreground rounded-2xl border border-foreground/[0.06] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
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
type Errors = Partial<Record<keyof FormData, string>>;

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    role: "Developer",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
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
        <StepCard title="Personal Information" subtitle="Enter your contact details to begin setting up your account.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              icon={User}
              placeholder="e.g. Alex Rivera"
              value={formData.fullName}
              onChange={set("fullName")}
              error={errors.fullName}
            />
            <Field
              label="Work Email"
              icon={Mail}
              type="email"
              placeholder="alex@company.com"
              value={formData.email}
              onChange={set("email")}
            />
          </div>
        </StepCard>
      ),
    },
    {
      id: "workspace",
      title: "Workspace",
      description: "Organization",
      icon: Building2,
      content: (
        <StepCard title="Workspace Setup" subtitle="Name your organization and select your primary role.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Company Name"
              icon={Building2}
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={set("company")}
              error={errors.company}
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Primary Role
              </label>
              <SelectBlock
                options={PRIMARY_ROLE_OPTIONS}
                value={formData.role}
                onChange={set("role")}
                variant="default"
                placeholder="Select your role"
              />
            </div>
          </div>
        </StepCard>
      ),
    },
    {
      id: "security",
      title: "Security",
      description: "Credentials",
      icon: ShieldCheck,
      content: (
        <StepCard title="Security Credentials" subtitle="Create a secure password for your workspace access.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={set("password")}
              error={errors.password}
            />
            <Field
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="Re-type password"
              value={formData.confirmPassword}
              onChange={set("confirmPassword")}
            />
          </div>
        </StepCard>
      ),
    },
    {
      id: "review",
      title: "Review",
      description: "Confirm & Submit",
      icon: CheckCircle2,
      content: (
        <StepCard title="Review Summary" subtitle="Please verify your details before submitting the onboarding payload.">
          <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-xl border border-border text-xs">
            <div>
              <span className="text-muted-foreground block font-semibold">Name:</span>
              <span className="font-semibold text-foreground text-sm">{formData.fullName || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block font-semibold">Email:</span>
              <span className="font-semibold text-foreground text-sm truncate block">{formData.email || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block font-semibold">Company:</span>
              <span className="font-semibold text-foreground text-sm">{formData.company || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block font-semibold">Role:</span>
              <span className="font-semibold text-foreground text-sm">{formData.role || "—"}</span>
            </div>
          </div>

          {submitError && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-3 text-destructive">
              <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="font-semibold block mb-0.5">Submission Failed</strong>
                <span>{submitError}</span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-muted-foreground">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
                className="rounded border-input accent-primary"
              />
              Simulate Server Error on Submit
            </label>
            <span className="text-[10px] text-muted-foreground font-mono">DEBUG_MODE</span>
          </div>
        </StepCard>
      ),
    },
  ];

  return (
    // A whisper of the primary on the shell separates it from a white page;
    // the white step cards float on it.
    <div className="max-w-3xl mx-auto flex flex-col gap-8 rounded-3xl p-6 sm:p-10 border bg-[oklch(from_var(--primary)_0.975_calc(c*0.12)_h)] border-[oklch(from_var(--primary)_0.91_calc(c*0.2)_h)] dark:bg-[oklch(from_var(--primary)_0.21_calc(c*0.1)_h)] dark:border-foreground/10 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_20px_48px_-20px_rgb(0_0_0/0.18)]">
      {/* onStepChange is what makes the circles clickable — gate it on validation */}
      <Stepper
        steps={steps}
        currentStep={step}
        onStepChange={(target) => {
          if (target < step || validateStep(step)) setStep(target);
        }}
      />

      <StepperContent steps={steps} currentStep={step} />

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0 || isSubmitting}
          className={BACK_BTN}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {step === steps.length - 1 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={NEXT_BTN}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Onboarding</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        ) : (
          <button type="button" onClick={handleNext} className={NEXT_BTN}>
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/stepper.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/stepper
```

## Features
Learn about the Stepper component's linear progression features, providing clear visual feedback for multi-step forms and processes.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

### Stepper

The visual navigation header component that renders step indicators and the animated progress fill line.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `Step[]` | Required | An array of step objects defining the sequence. Each object requires an `id` and `title`. `description`, `icon`, and `content` are optional. |
| `currentStep` | `number` | Required | The active zero-indexed step of the sequence. Controls the progress line fill and active/completed indicator states. |
| `onStepChange` | `(step: number) => void` | `undefined` | Callback fired when a user clicks directly on a step circle in the header. If omitted, the steps become static visual indicators. |
| `color` | `string` | `"var(--primary)"` | The active theme color for the progress line, active/completed circles and pulse ring. Supports any CSS color value or Tailwind background class. |
| `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost navigation header wrapper. |

### StepperContent

The sliding content container component that handles the animated sliding entrance of each step payload.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `Step[]` | Required | The identical array passed to the header component. Renders the active step's `content` node. |
| `currentStep` | `number` | Required | The active zero-indexed step used to identify which payload to render and determine the sliding transition direction. |
| `className` | `string` | `undefined` | Custom Tailwind CSS classes applied to the sliding content wrapper container. |

### Step (TypeScript Interface)

The TypeScript interface defining the structure of each object in the `steps` array prop.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | A unique identifier string required for safe React list rendering. |
| `title` | `string` | Yes | Primary headline text displayed prominently below the step circle indicator. |
| `description` | `string` | No | Optional secondary helper text displayed directly underneath the step title on larger screens. |
| `icon` | `React.ElementType` | No | Optional Lucide React icon or custom SVG component rendered inside the step circle indicator instead of a default number. |
| `content` | `React.ReactNode` | No | The JSX/UI payload (e.g., input forms, review summaries) rendered inside `StepperContent` when this step is active. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/stepper
