export const metadata = docsPageMetadata("form");

# Form Engine

A high-fidelity Form toolkit engineered for both simple landing pages and complex enterprise dashboards.

This engine decouples layout from state. It provides a stunning visual wrapper with a **slim animated glowing border** that tracks focus, and a custom **glitching error text effect** that draws immediate attention to invalid fields.

`FormWrapper` is unopinionated about state — it works with plain `useState` and with `react-hook-form`'s `handleSubmit` alike, because it never clones or intercepts child `ref`s.

export const usageZod = `"use client";

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
     console.log(data))}
    >

      Create Workspace
    
  );
}`;

export const usageSubmitting = `"use client";

export default function SubmittingForm() {
  return (
     e.preventDefault()}
    >

      {/* Wire this to react-hook-form's formState.isSubmitting */}
      Subscribe Now
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/form
```

### Optional — schema validation

The form primitives are unopinionated about validation; the native example uses plain React state. Only add these if you want the schema-driven approach from the second example.

```bash
npx shadcn@latest install react-hook-form zod @hookform/resolvers
```

## Examples

## Features
Explore the Form component's validation integration, accessible error messages, and loading state management.

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

        Component
        Prop
        Type
        Default
        Description

          FormWrapper

          title

          string

          undefined
        
        Heading shown above the divider. Omit it (along with description) to drop the header entirely.

          FormWrapper

          description

          string

          undefined
        
        Supporting copy rendered under the title.

          FormWrapper

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"
        
        Drives the animated border, focus ring and submit button. Accepts any hex string.

          FormWrapper

          onSubmit

          (e: React.FormEvent) =&gt; void

          undefined
        
        When provided the children are wrapped in a &lt;form&gt;; otherwise a plain &lt;div&gt; is used.

          FormField

          label

          string

          undefined
        
        Field label. Turns red automatically while error is set.

          FormField

          error

          string

          undefined
        
        Message to render below the input. Falsy values render nothing.

          FormField

          errorVariant

          "glitch" | "default"

          "glitch"
        
        Selects the animated RGB-split error text or the static one.

          FormError

          message

          string

          undefined
        
        Standalone error renderer, for when you are not using FormField.

          FormSubmit

          isSubmitting

          boolean

          false
        
        Replaces the label with a spinner and disables the button.

---

**Component Path:** `[framework]\form\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
