---
title: "Shadcn Input"
description: "A multi-purpose Input component with password toggles, autocomplete suggestions, and five layout variants. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/input
---

# Shadcn Input

A multi-purpose Input component with password toggles, autocomplete suggestions, and five layout variants.

Pass `suggestions` and the field lists them the way a select menu would — typing narrows the list, and choosing one writes the text straight into the field. The drag-and-drop file mode lives on its own page: see [File upload](https://avaraui.com/docs/nextjs/file-upload).

Explore the different variations of the Input component — each example shows a live preview with the exact code to copy.

## Input

A labelled text field with helper text and a leading icon.

- `label` sits above the field and `helperText` below it.
- `variant="default"` is the bordered box; see the next three for the alternatives.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function BasicInput() {
  return (
    <InputBlock
      type="email"
      label="Email Address"
      placeholder="Enter your email..."
      helperText="We'll never share your data."
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/input.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/input
```

## Examples

### Filled

- Use `variant="filled"` for a solid, low-contrast field with no visible border at rest.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function FilledInput() {
  return (
    <InputBlock
      variant="filled"
      label="Email Address"
      placeholder="Enter your email..."
      helperText="We'll never share your data."
    />
  );
}
```

### Underlined

- Use `variant="underlined"` to reduce the chrome to a single baseline rule.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function UnderlinedInput() {
  return (
    <InputBlock
      variant="underlined"
      label="Email Address"
      placeholder="Enter your email..."
      helperText="We'll never share your data."
    />
  );
}
```

### Password

- Set `type="password"` and the show/hide toggle is added for you — there is no separate prop for it.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function PasswordInput() {
  return (
    <InputBlock
      type="password"
      label="Password"
      placeholder="Enter your password..."
      helperText="We'll never share your data."
    />
  );
}
```

### Autocomplete

Suggestions appear like a select menu, but the field stays free text — pick one or keep typing.

- Pass `suggestions` as a `string[]`. Focus shows the list, typing filters it (the matched letters are highlighted), and ↑ ↓ Enter pick from the keyboard.
- `onSuggestionSelect` fires after a pick. Your normal `onChange` fires too, so controlled and uncontrolled inputs both just work.
- `maxSuggestions={8}` caps how many rows show at once; the rest scroll.

```tsx
"use client";




const CITIES = [
  "Amsterdam", "Berlin", "Dhaka", "London", "New York",
  "San Francisco", "Santiago", "Singapore", "Tokyo",
];

export default function DestinationInput() {
  const [city, setCity] = useState("");

  // Focus lists every suggestion; typing narrows it. Choosing one writes
  // the text into the field, so onChange fires exactly as if it were typed.
  return (
    <InputBlock
      label="Destination"
      placeholder="Type a city…"
      leftIcon={<MapPin className="w-4 h-4" />}
      value={city}
      onChange={(e) => setCity(e.target.value)}
      suggestions={CITIES}
      onSuggestionSelect={(value) => console.log("Picked", value)}
      helperText="Pick a suggestion or type your own."
    />
  );
}
```

### Pill badge

Capsule-shaped fields featuring isolated left icon badges and smooth accent glow.

- Use `variant="pill"` to wrap the input in a capsule silhouette with a vertical divider for the leading icon.
- `leftIcon` renders inside the segregated badge on the left.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function PillInputs() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <InputBlock
        variant="pill"
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={<User className="w-4 h-4" />}
      />
      <InputBlock
        variant="pill"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        leftIcon={<Mail className="w-4 h-4" />}
      />
      <InputBlock
        variant="pill"
        type="password"
        label="Password"
        placeholder="Enter your password"
        leftIcon={<Lock className="w-4 h-4" />}
      />
    </div>
  );
}
```

## Features
Learn about the Input component's versatile states, including disabled, error, and focused styles, along with icon support.

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

This component extends `React.InputHTMLAttributes<HTMLInputElement>`, meaning you can pass any standard input prop (like `onChange`, `value`, `name`, `disabled`, etc.).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"text" \| "password" \| "email" \| "number" \| "file"` | `"text"` | Determines the behavior. `"password"` adds a visibility toggle. `"file"` turns the field into a drag-and-drop zone — documented on the [File upload](https://avaraui.com/docs/nextjs/file-upload) page. |
| `suggestions` | `string[]` | `undefined` | Autocomplete list. Focus shows it, typing filters it (case-insensitive, matched letters highlighted), and a click or Enter writes the suggestion into the field. Ignored for `"password"` and `"file"`. |
| `onSuggestionSelect` | `(value: string) => void` | `undefined` | Fired after a suggestion is written into the field. The regular `onChange` fires as well. |
| `maxSuggestions` | `number` | `8` | Maximum rows shown at once; further matches scroll. |
| `inputSize` | `"sm" \| "md" \| "lg"` | `"md"` | Uniformly scales the height, padding, text size, and icon size of the input or dropzone. |
| `variant` | `"default" \| "filled" \| "underlined" \| "glow" \| "pill"` | `"default"` | Determines the visual styling of the borders, background, and focus rings. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"indigo"` | Applies the global color theme to the focus ring, glow shadow, and drag-active states. Accepts hex codes. |
| `label` | `string` | `undefined` | Renders a bold, accessible label directly above the input. |
| `helperText` | `string` | `undefined` | Subtle instructional text rendered below the input. |
| `error` | `string` | `undefined` | If provided, turns the input red, adds an alert icon, and replaces the helper text with the error message. |
| `disabled` | `boolean` | `false` | Disables interactions and applies a faded, read-only style. |
| `leftIcon / rightIcon` | `ReactNode` | `undefined` | Standard Mode Only: Injects an icon or element into the left or right side of the input field. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/input
