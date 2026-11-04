---
title: "Shadcn Progress Wizard"
description: "A Typeform-style multi-step form wizard with vertical slide transitions in plain CSS, keyboard navigation and a progress bar. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/wizard
---

# Shadcn Progress Wizard

A "Typeform" style multi-step wizard featuring buttery smooth vertical slide transitions powered by plain CSS transitions, native keyboard navigation, and an interactive progress bar.

This component relies on the **Compound Component** pattern using React Context. This allows you to place the `WizardProgress` bar independently of the main `WizardContainer`, and nest complex forms inside the `WizardStep` blocks without passing deep props.

Because every piece reads the wizard's state from context, you compose the flow yourself — drop the progress bar wherever you like, or leave it out. Press **Enter** inside any step to advance. It includes dynamic theme binding via the `color` prop (`"indigo"`, `"rose"`, `"emerald"`, `"zinc"`, `"blue"`, `"primary"`, or hex) to automatically style the progress bar, input focus rings, and action buttons.

## Wizard

Compose `WizardProgress`, `WizardContainer` and one `WizardStep` per question — all state lives in context.

- Set `color="indigo" | "blue" | "rose" | "emerald" | "zinc" | "primary" | "#hex"` themes the progress bar, active input borders, and primary navigation buttons.
- `index` on each `WizardStep` is its 0-based position, and is what the animation uses to compute the Y-offset.
- `onComplete` fires when Next or Enter is pressed on the final step.

```tsx
export default function OnboardingFlow() {
  // Remounting the Wizard is what resets it back to the first step.
  const [runKey, setRunKey] = useState(0);

  // Enter submits the step's form; forwarding it to the OK button
  // is what makes keyboard progression work.
  const submitToNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector<HTMLButtonElement>(
      'button[type="button"]',
    );
    if (btn) btn.click();
  };

  return (
    <Wizard key={runKey} color="indigo">
      {/* Top progress bar — reads totalSteps from context */}
      <WizardProgress />

      {/* Overflow-hidden container the slide happens inside */}
      <WizardContainer>
        <WizardStep index={0}>
          <WizardTitle>1. What's your first name?</WizardTitle>
          <form onSubmit={submitToNext}>
            <WizardInput placeholder="Type your answer here..." autoFocus />
            <WizardNavigation />
          </form>
        </WizardStep>

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

        {/* The closing step is just markup — no input, no navigation. */}
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
              onClick={() => setRunKey((prev) => prev + 1)}
              className="mt-8 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
            >
              Finish & Restart
            </button>
          </div>
        </WizardStep>
      </WizardContainer>
    </Wizard>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/wizard.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/wizard
```

## Examples

### Starting step

- Use `initialStep` to resume a flow partway through instead of restarting it.

```tsx
export default function ResumedOnboarding() {
  // Remounting the Wizard is what resets it back to the first step.
  const [runKey, setRunKey] = useState(0);

  // Enter submits the step's form; forwarding it to the OK button
  // is what makes keyboard progression work.
  const submitToNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector<HTMLButtonElement>(
      'button[type="button"]',
    );
    if (btn) btn.click();
  };

  return (
    // Open on step 2 — useful when you persist progress between sessions.
    <Wizard key={runKey} initialStep={1}>
      {/* Top progress bar — reads totalSteps from context */}
      <WizardProgress />

      {/* Overflow-hidden container the slide happens inside */}
      <WizardContainer>
        <WizardStep index={0}>
          <WizardTitle>1. What's your first name?</WizardTitle>
          <form onSubmit={submitToNext}>
            <WizardInput placeholder="Type your answer here..." autoFocus />
            <WizardNavigation />
          </form>
        </WizardStep>

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

        {/* The closing step is just markup — no input, no navigation. */}
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
              onClick={() => setRunKey((prev) => prev + 1)}
              className="mt-8 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
            >
              Finish & Restart
            </button>
          </div>
        </WizardStep>
      </WizardContainer>
    </Wizard>
  );
}
```

### Without the progress bar

- `children` can omit `WizardProgress` entirely — it is an independent child, and navigation is unchanged without it.

```tsx
export default function BareWizard() {
  // Remounting the Wizard is what resets it back to the first step.
  const [runKey, setRunKey] = useState(0);

  // Enter submits the step's form; forwarding it to the OK button
  // is what makes keyboard progression work.
  const submitToNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector<HTMLButtonElement>(
      'button[type="button"]',
    );
    if (btn) btn.click();
  };

  return (
    // WizardProgress is an independent child — omit it entirely and the
    // steps still animate and navigate exactly the same.
    <Wizard key={runKey}>
      {/* Overflow-hidden container the slide happens inside */}
      <WizardContainer>
        <WizardStep index={0}>
          <WizardTitle>1. What's your first name?</WizardTitle>
          <form onSubmit={submitToNext}>
            <WizardInput placeholder="Type your answer here..." autoFocus />
            <WizardNavigation />
          </form>
        </WizardStep>

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

        {/* The closing step is just markup — no input, no navigation. */}
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
              onClick={() => setRunKey((prev) => prev + 1)}
              className="mt-8 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
            >
              Finish & Restart
            </button>
          </div>
        </WizardStep>
      </WizardContainer>
    </Wizard>
  );
}
```

## Features
Learn about the Wizard component's multi-step capabilities, providing state management and validation for complex onboarding flows.

### Compound Components

Uses React Context to share state across child components, preventing messy prop drilling and enabling flexible layouts.

### Library-free Animations

Features premium, buttery smooth vertical sliding transitions built on CSS transitions — no animation library to install.

### Keyboard Navigation

Natively supports "Enter" key progression to submit forms and move to the next step instantly.

### Auto-Progress Bar

Automatically calculates completion percentage based on the number of active steps rendered.

## Best Practices & Guidelines

### State Management

Since `WizardStep` components act as independent layout blocks, keep your actual form state (e.g., using React Hook Form or standard state) lifted up to the parent component wrapping the `WizardContainer`.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Wizard` | `initialStep` | `number` | `0` | The index of the step to show on the initial render. |
| `Wizard` | `color` | `"primary" \| "indigo" \| "blue" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Controls the theme color for the progress bar, active input borders, and primary navigation buttons. Accepts valid hex codes. |
| `Wizard` | `onComplete` | `() => void` | `undefined` | Callback function fired if the user clicks "Next" or presses "Enter" while currently on the final step. |
| `WizardStep` | `index` | `number` | Required | The 0-based index of this specific step. Used by the animation engine to calculate the vertical Y-offset relative to the `currentStep`. |
| `WizardInput` | `...props` | `InputHTMLAttributes` | `undefined` | Accepts all native HTML input attributes (e.g., `placeholder`, `autoFocus`, `onChange`, `type`). |
| `WizardTitle` | `children` | `ReactNode` | Required | The primary heading or question for the current step. |
| `WizardDescription` | `children` | `ReactNode` | Required | Secondary context or helper text displayed below the title. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/wizard
