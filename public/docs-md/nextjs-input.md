# Input

A multi-purpose Input component with password toggles, autocomplete suggestions, and four layout variants.

Pass `suggestions` and the field lists them the way a select menu would — typing narrows the list, and choosing one writes the text straight into the field. The drag-and-drop file mode lives on its own page: see [File upload](/docs/nextjs/file-upload).

Explore the different variations of the Input component — each example shows a live preview with the exact code to copy.

export const usageDefault = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function BasicInput() {
  return (
    
  );
}`;

export const usageFilled = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function FilledInput() {
  return (
    
  );
}`;

export const usageUnderlined = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function UnderlinedInput() {
  return (
    
  );
}`;

export const usagePassword = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function PasswordInput() {
  return (
    
  );
}`;

export const usageAutocomplete = `"use client";

const CITIES = [
  "Amsterdam", "Berlin", "Dhaka", "London", "New York",
  "San Francisco", "Santiago", "Singapore", "Tokyo",
];

export default function DestinationInput() {
  const [city, setCity] = useState("");

  // Focus lists every suggestion; typing narrows it. Choosing one writes
  // the text into the field, so onChange fires exactly as if it were typed.
  return (
    }
      value={city}
      onChange={(e) => setCity(e.target.value)}
      suggestions={CITIES}
      onSuggestionSelect={(value) => console.log("Picked", value)}
      helperText="Pick a suggestion or type your own."
    />
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/input
```

## Examples

## Features
Learn about the Input component's versatile states, including disabled, error, and focused styles, along with icon support.

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

This component extends `React.InputHTMLAttributes`, meaning you can pass any standard input prop (like `onChange`, `value`, `name`, `disabled`, etc.).

        Prop
        Type
        Default
        Description

          type

          "text" | "password" | "email" | "number" | "file"

          "text"

          Determines the behavior. "password" adds a visibility
          toggle. "file" turns the field into a drag-and-drop
          zone — documented on the{" "}
          File upload page.

          suggestions

          string[]

          undefined

          Autocomplete list. Focus shows it, typing filters it
          (case-insensitive, matched letters highlighted), and a click or
          Enter writes the suggestion into the field. Ignored for{" "}
          "password" and "file".

          onSuggestionSelect

          (value: string) =&gt; void

          undefined

          Fired after a suggestion is written into the field. The regular{" "}
          onChange fires as well.

          maxSuggestions

          number

          8
        
        Maximum rows shown at once; further matches scroll.

          inputSize

          "sm" | "md" | "lg"

          "md"

          Uniformly scales the height, padding, text size, and icon size of the
          input or dropzone.

          variant

          "default" | "filled" | "underlined" | "glow"

          "default"

          Determines the visual styling of the borders, background, and focus
          rings.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies the global color theme to the focus ring, glow shadow, and
          drag-active states. Accepts hex codes.

          label

          string

          undefined
        
        Renders a bold, accessible label directly above the input.

          helperText

          string

          undefined
        
        Subtle instructional text rendered below the input.

          error

          string

          undefined

          If provided, turns the input red, adds an alert icon, and replaces the
          helper text with the error message.

          disabled

          boolean

          false
        
        Disables interactions and applies a faded, read-only style.

          leftIcon / rightIcon

          ReactNode

          undefined

          Standard Mode Only: Injects an icon or element into
          the left or right side of the input field.

---

**Component Path:** `[framework]\input\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
