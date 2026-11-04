---
title: "Form Engine"
description: "A high-fidelity Form toolkit engineered for both simple landing pages and complex enterprise dashboards. Free shadcn/ui Form for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/form
---

# Form Engine

A high-fidelity Form toolkit engineered for both simple landing pages and complex enterprise dashboards.

This engine decouples layout from state. It provides a stunning visual wrapper with a **slim animated glowing border** that tracks focus, and a custom **glitching error text effect** that draws immediate attention to invalid fields.

`FormWrapper` is unopinionated about state — it works with plain `useState` and with `react-hook-form`'s `handleSubmit` alike, because it never clones or intercepts child `ref`s.

## React Hook Form + Zod

- Pass `onSubmit` the result of RHF's `handleSubmit()` directly — `FormWrapper` never breaks child `ref`s, so `register()` just works.

```tsx
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

### Optional — schema validation

The form primitives are unopinionated about validation; the native example uses plain React state. Only add these if you want the schema-driven approach from the second example.

```bash
npx shadcn@latest install react-hook-form zod @hookform/resolvers
```

## Examples

### Submitting

- Pass `isSubmitting` to `FormSubmit` to swap the label for a spinner and disable the button, which is what blocks double submits.

```tsx
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

## Features
Explore the Form component's validation integration, accessible error messages, and loading state management.

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

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `FormWrapper` | `title` | `string` | `undefined` | Heading shown above the divider. Omit it (along with `description`) to drop the header entirely. |
| `FormWrapper` | `description` | `string` | `undefined` | Supporting copy rendered under the title. |
| `FormWrapper` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Drives the animated border, focus ring and submit button. Accepts any hex string. |
| `FormWrapper` | `onSubmit` | `(e: React.FormEvent) => void` | `undefined` | When provided the children are wrapped in a `<form>`; otherwise a plain `<div>` is used. |
| `FormField` | `label` | `string` | `undefined` | Field label. Turns red automatically while `error` is set. |
| `FormField` | `error` | `string` | `undefined` | Message to render below the input. Falsy values render nothing. |
| `FormField` | `errorVariant` | `"glitch" \| "default"` | `"glitch"` | Selects the animated RGB-split error text or the static one. |
| `FormError` | `message` | `string` | `undefined` | Standalone error renderer, for when you are not using `FormField`. |
| `FormSubmit` | `isSubmitting` | `boolean` | `false` | Replaces the label with a spinner and disables the button. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/form
