---
title: "Shadcn Form"
description: "Shadcn Form. A state-agnostic form wrapper (`FormWrapper`, `FormField`."
url: https://avaraui.com/docs/nextjs/form
---

# Shadcn Form

A state-agnostic form wrapper (`FormWrapper`, `FormField`, `FormSubmit`) with a spinning glow border and animated error text that works with plain `useState` or `react-hook-form` + `zod`.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/form.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/form
```

## React Hook Form + Zod

- Pass `onSubmit` the result of RHF's `handleSubmit()` directly — `FormWrapper` never breaks child `ref`s, so `register()` just works.

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormField,
  FormSubmit,
  FormWrapper,
} from "@/components/custom/blocks/FormBlock";
import { InputBlock } from "@/components/custom/blocks/InputBlock";

const schema = z.object({
  companyName: z.string().min(2, "Company name is strictly required."),
  workEmail: z.string().email("Invalid corporate email format detected."),
  password: z.string().min(8, "Security requirement: Minimum 8 characters."),
});

export default function EnterpriseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), mode: "onTouched" });

  return (
    <FormWrapper
      title="Enterprise Registration"
      description="Click inside the fields and immediately blur away to trigger Zod validation states."
      onSubmit={handleSubmit(async (data) => console.log(data))}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <FormField label="Company Name" error={errors.companyName?.message}>
            <InputBlock {...register("companyName")} placeholder="e.g. Acme Corp" />
          </FormField>
        </div>

        <FormField label="Work Email" error={errors.workEmail?.message}>
          <InputBlock
            {...register("workEmail")}
            type="email"
            placeholder="name@company.com"
          />
        </FormField>

        <FormField label="Secure Password" error={errors.password?.message}>
          <InputBlock {...register("password")} type="password" placeholder="••••••••" />
        </FormField>
      </div>

      <FormSubmit isSubmitting={isSubmitting}>Create Workspace</FormSubmit>
    </FormWrapper>
  );
}
```

## Submitting

- Pass `isSubmitting` to `FormSubmit` to swap the label for a spinner and disable the button, which is what blocks double submits.

```tsx
import {
  FormField,
  FormSubmit,
  FormWrapper,
} from "@/components/custom/blocks/FormBlock";
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function SubmittingForm() {
  return (
    <FormWrapper
      title="Newsletter Signup"
      description="FormSubmit swaps its label for a spinner and disables itself while isSubmitting is true."
      onSubmit={(e) => e.preventDefault()}
    >
      <FormField label="Email Address">
        <InputBlock type="email" placeholder="Enter your email..." />
      </FormField>

      {/* Wire this to react-hook-form's formState.isSubmitting */}
      <FormSubmit isSubmitting>Subscribe Now</FormSubmit>
    </FormWrapper>
  );
}
```

## About Shadcn Form

**What it is.** `FormWrapper`, `FormField` and `FormSubmit` provide a styled form container with a spinning glow border that brightens on hover, glitching error text, and a submit button that disables itself while `isSubmitting` is true.

**How it is built.** `color` sets one CSS variable on the wrapper that tints the border and the submit button. The wrapper never clones or intercepts child `ref`s, so native HTML forms, controlled `useState`, and `react-hook-form` (`register()` + `zodResolver`) all work out of the box.

**When to use it.** Use `FormWrapper` for single-step forms, settings panels, and schema-validated inputs. For multi-step flows, use [Wizard](https://avaraui.com/docs/reactjs/wizard) or [Stepper](https://avaraui.com/docs/reactjs/stepper).

## For AI agents

**When to use**

- Single-page forms with `react-hook-form` + `zod` or plain `useState`
- Forms needing built-in `isSubmitting` loading lock on `FormSubmit`

**When not to use**

- Pre-built login/signup/onboarding screens — use [Auth Forms](https://avaraui.com/docs/reactjs/auth-forms)
- Multi-step flows — use [Wizard](https://avaraui.com/docs/reactjs/wizard)

**Agent notes**

- Named exports from `@/components/custom/blocks/FormBlock`: `FormWrapper`, `FormField`, `FormError`, `FormSubmit`
- `FormSubmit` is a `type="submit"` button, so pass `onSubmit` to `FormWrapper` (that renders the `<form>`) or it will not submit anything
- `FormField` renders its `label` without `htmlFor`; give the input its own `aria-label` or `id` handling if screen readers need the name
- Install optional schema packages (`npm install react-hook-form zod @hookform/resolvers`) only if using `zodResolver`

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `FormWrapper` | `title` | `string` | `undefined` | Heading shown above the divider. Omit it (along with `description`) to drop the header entirely. |
| `FormWrapper` | `description` | `string` | `undefined` | Supporting copy rendered under the title. |
| `FormWrapper` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Drives the animated border and the submit button. Accepts a preset name or a hex string starting with `#`; any other string falls back to `primary`. |
| `FormWrapper` | `onSubmit` | `(e: React.FormEvent) => void` | `undefined` | When provided the children are wrapped in a `<form>`; otherwise a plain `<div>` is used. |
| `FormField` | `label` | `string` | `undefined` | Field label. Turns red automatically while `error` is set. |
| `FormField` | `error` | `string` | `undefined` | Message to render below the input. Falsy values render nothing. |
| `FormField` | `errorVariant` | `"glitch" \| "default"` | `"glitch"` | Selects the animated RGB-split error text or the static one. |
| `FormError` | `message` | `string` | `undefined` | Standalone error renderer, for when you are not using `FormField`. |
| `FormError` | `variant` | `"glitch" \| "default"` | `"glitch"` | Animated RGB-split text or the static red text. |
| `FormSubmit` | `isSubmitting` | `boolean` | `false` | Replaces the label with a spinner and disables the button. |

## Works with other components

- Compose [Input](https://avaraui.com/docs/reactjs/input), [Select](https://avaraui.com/docs/reactjs/select), and [Date Picker](https://avaraui.com/docs/reactjs/date-picker) fields inside `FormWrapper`.
- Pair `onSubmit` with [Sonner](https://avaraui.com/docs/reactjs/sonner) or [Alert](https://avaraui.com/docs/reactjs/alert) for server response feedback.
- Use [Auth Forms](https://avaraui.com/docs/reactjs/auth-forms) when you want finished login and signup screens instead of assembling fields.
- Split a long form into steps with [Wizard](https://avaraui.com/docs/reactjs/wizard) and keep a `FormWrapper` on each step.

## Does FormWrapper require react-hook-form or Zod?

No. `FormWrapper` is state-agnostic and works with plain `useState` or native form handlers. The `react-hook-form`, `zod` and `@hookform/resolvers` packages are only needed if you want schema validation, and the registry item itself has no npm dependencies.

## How do I use FormWrapper with react-hook-form and Zod?

Pass `handleSubmit(...)` as `onSubmit`, spread `register("name")` onto each input (the example uses `InputBlock`), and give each `FormField` `error={errors.name?.message}`. Set `isSubmitting` from `formState` on `FormSubmit`. `FormWrapper` never touches child refs, so `register()` keeps working with `zodResolver`.

## How do I stop users from submitting a form twice?

Pass `isSubmitting` to `FormSubmit`. While it is true the button is disabled and shows a spinner instead of its label. Wire it to `formState.isSubmitting` from react-hook-form, or to your own loading state. Without that prop the button stays enabled.

## How do I change the FormWrapper border and button colour?

Set `color` on `FormWrapper` to `primary` (the default, following your theme's `--primary`), `indigo`, `rose`, `emerald` or `zinc`, or pass a hex string such as `#0ea5e9`. One value tints the spinning border and the submit button, and the button text switches with it.

## Can I turn off the glitch effect on FormField errors?

Yes. Set `errorVariant="default"` on `FormField` for static red text, or use `variant="default"` on a standalone `FormError`. The glitch animation has no `prefers-reduced-motion` check, so choose the default variant for audiences who need less motion. The message text is the same in both. The message text is the same in both.

---

Live previews and every example: https://avaraui.com/docs/nextjs/form
