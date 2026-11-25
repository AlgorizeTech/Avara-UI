---
title: "Shadcn Progress Wizard"
description: "A Typeform-style multi-step form wizard with vertical slide transitions in plain CSS, keyboard navigation and a progress bar. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/wizard
---

# Shadcn Progress Wizard

A Typeform-style compound multi-step wizard (`Wizard`, `WizardProgress`, `WizardContainer`, `WizardStep`, `WizardNavigation`) with vertical CSS slide transitions and Enter-key progression.

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

## Wizard

Compose `WizardProgress`, `WizardContainer` and one `WizardStep` per question — all state lives in context.

- Set `color="indigo" | "blue" | "rose" | "emerald" | "zinc" | "primary" | "#hex"` themes the progress bar, active input borders, and primary navigation buttons.
- `index` on each `WizardStep` is its 0-based position, and is what the animation uses to compute the Y-offset.
- `onComplete` fires when Next or Enter is pressed on the final step.

```tsx
"use client";

import {
  Wizard,
  WizardContainer,
  WizardDescription,
  WizardInput,
  WizardNavigation,
  WizardProgress,
  WizardStep,
  WizardTitle,
} from "@/components/custom/blocks/WizardBlock";
import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

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

## Starting step

- Use `initialStep` to resume a flow partway through instead of restarting it.

```tsx
"use client";

import {
  Wizard,
  WizardContainer,
  WizardDescription,
  WizardInput,
  WizardNavigation,
  WizardProgress,
  WizardStep,
  WizardTitle,
} from "@/components/custom/blocks/WizardBlock";
import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

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

## Without the progress bar

- `children` can omit `WizardProgress` entirely — it is an independent child, and navigation is unchanged without it.

```tsx
"use client";

import {
  Wizard,
  WizardContainer,
  WizardDescription,
  WizardInput,
  WizardNavigation,
  WizardStep,
  WizardTitle,
} from "@/components/custom/blocks/WizardBlock";
import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

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

## About Shadcn Progress Wizard

**What it is.** A compound multi-step flow (`Wizard`, `WizardProgress`, `WizardContainer`, `WizardStep`, `WizardTitle`, `WizardInput`, `WizardNavigation`) for one-question-at-a-time onboarding and surveys.

**How it is built.** Shares current step index via React Context, animates vertical Y-offset slides with plain CSS transitions, advances on `Enter`, and themes controls via `color`.

**When to use it.** Use `Wizard` for focused Typeform-style onboarding or surveys. For horizontal numbered step headers, use [Stepper](https://avaraui.com/docs/nextjs/stepper).

## For AI agents

**When to use**

- One-question-at-a-time onboarding, intake, or survey flows with vertical slide transitions

**When not to use**

- Horizontal multi-field checkout/setup steps — use [Stepper](https://avaraui.com/docs/nextjs/stepper)
- Single-screen forms — use [Form](https://avaraui.com/docs/nextjs/form)

**Agent notes**

- Named exports from `@/components/custom/blocks/WizardBlock`
- Every `WizardStep` requires a 0-based `index` prop; `WizardProgress` is optional and can be omitted or placed anywhere inside `Wizard`

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

## Works with other components

- Embed [Radio Button](https://avaraui.com/docs/nextjs/radio-button) or [Select](https://avaraui.com/docs/nextjs/select) inside `WizardStep` blocks for structured choices.
- Pair `onComplete` with [Sonner](https://avaraui.com/docs/nextjs/sonner) or [Dialog](https://avaraui.com/docs/nextjs/dialog) completion feedback.

## How do I build a Typeform-style one-question-at-a-time form in React?

Compose `Wizard` with `WizardProgress`, a `WizardContainer` and one `WizardStep` per question, giving each step an `index`. Add `WizardTitle`, `WizardDescription` and `WizardInput`, then finish with `WizardNavigation`. Steps slide vertically as the user advances.

## Where should I store form values across WizardStep panels?

Lift your form state, plain `useState` or `react-hook-form`, into the parent component wrapping `Wizard`. `Wizard` manages the step index and transitions rather than field values, and `WizardInput` forwards native input props such as `onChange`.

## How do I run code when the wizard finishes?

Pass `onComplete` to `Wizard`. It fires when the user clicks Next or presses `Enter` on the final step. Use it to submit your form, then show [Sonner](https://avaraui.com/docs/nextjs/sonner) or a [Dialog](https://avaraui.com/docs/nextjs/dialog) as confirmation.

## Can users move to the next question with the Enter key?

Yes. The wizard advances on `Enter`, which suits typing-heavy forms where a pointer would slow people down. On the last step the same key triggers `onComplete`. `WizardInput` takes native attributes such as `autoFocus` and `type`.

## How do I start on a later step or change the colour?

Set `initialStep` to a zero-based index, which defaults to `0`. `color` themes the progress bar and active input borders, and accepts `"primary"`, `"indigo"`, `"blue"`, `"rose"`, `"emerald"`, `"zinc"` or a custom string. For horizontal numbered headers use [Stepper](https://avaraui.com/docs/nextjs/stepper).

---

Live previews and every example: https://avaraui.com/docs/nextjs/wizard
