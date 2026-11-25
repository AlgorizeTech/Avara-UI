---
title: "Shadcn Input"
description: "Shadcn Input. A multi-purpose Input component (`InputBlock`) with password toggles, a password-strength meter, autocomplete suggestions."
url: https://avaraui.com/docs/nextjs/input
---

# Shadcn Input

A multi-purpose Input component (`InputBlock`) with password toggles, a password-strength meter, autocomplete suggestions, and several field styles.

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

## Password Strength

Live password strength meter with four segmented bars, dynamic strength label (Weak, Fair, Good, Strong), and real-time criteria checklist.

- Use `variant="password-strength"` for the segmented password strength meter and live rule checklist.
- `type="password"` enables the masked field with a show/hide password toggle.
- `floatingLabel={true}` floats the label onto the top border when focused or filled; omit or pass `false` for a static label above the input.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function PasswordStrengthInput() {
  return (
    <InputBlock
      variant="password-strength"
      type="password"
      label="New password"
      floatingLabel={true}
      placeholder="Enter a strong password..."
    />
  );
}
```

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

## Filled

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

## Underlined

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

## Password

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

## Autocomplete

Suggestions appear like a select menu, but the field stays free text — pick one or keep typing.

- Pass `suggestions` as a `string[]`. Focus shows the list, typing filters it (the matched letters are highlighted), and ↑ ↓ Enter pick from the keyboard.
- `onSuggestionSelect` fires after a pick. Your normal `onChange` fires too, so controlled and uncontrolled inputs both just work.
- `maxSuggestions={8}` caps how many rows show at once; the rest scroll.

```tsx
"use client";

import { useState } from "react";
import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { MapPin } from "lucide-react";

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

## Pill badge

Capsule-shaped fields featuring isolated left icon badges and smooth accent glow.

- Use `variant="pill"` to wrap the input in a capsule silhouette with a vertical divider for the leading icon.
- `leftIcon` renders inside the segregated badge on the left.

```tsx
import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { Lock, Mail, User } from "lucide-react";

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

## About Shadcn Input

**What it is.** `InputBlock` is a styled text-field component supporting `default`, `filled`, `underlined`, `glow`, `pill` and `password-strength` variants, plus built-in password visibility toggles and keyboard-navigable autocomplete suggestions.

**How it is built.** Extends native `React.InputHTMLAttributes<HTMLInputElement>` with Tailwind CSS styling and focus and error rings that follow `--primary` or `color`. Suggestions use the ARIA `combobox` and `listbox` roles, and the strength bar has `role="meter"`. It forwards its ref to the `input` and needs only `lucide-react`.

**When to use it.** Use `InputBlock` for text, email, password, search, and autocomplete inputs. For drag-and-drop file selection, use [File Upload](https://avaraui.com/docs/nextjs/file-upload); for verification codes, use [OTP Input](https://avaraui.com/docs/nextjs/otp-input).

## For AI agents

**When to use**

- Standard, filled, underlined, or capsule-pill text inputs with labels, icons, and validation errors
- Password fields with built-in show/hide toggle (`type="password"`) or live strength meter (`variant="password-strength"`)
- Free-text inputs with filterable `suggestions` autocomplete

**When not to use**

- Drag-and-drop file inputs — use [File Upload](https://avaraui.com/docs/nextjs/file-upload)
- Multi-digit verification codes — use [OTP Input](https://avaraui.com/docs/nextjs/otp-input)
- Fixed-option dropdowns — use [Select](https://avaraui.com/docs/nextjs/select)

**Agent notes**

- Named export: `import { InputBlock } from "@/components/custom/blocks/InputBlock"`
- Pass `suggestions: string[]` + `onSuggestionSelect` for autocomplete; pass `floatingLabel` with `variant="password-strength"` to float the label onto the top border
- `label` renders a `<label>` that is not linked to the input and `error` is not wired to `aria-invalid` or `aria-describedby`, so pass `aria-label` and `aria-invalid` to the input yourself where screen readers matter
- The `password-strength` variant always renders a password field with its own toggle and a generate-password button, whatever `type` is
- Install also copies `input-theme.ts` next to `InputBlock.tsx`

**Ask before you pick.** This page has 5 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 5 options as live previews: https://avaraui.com/view/input

**When to use it.** A text field with labels, helper text, a password toggle and autocomplete suggestions, in four styles: bordered, filled, underlined and a pill badge.

**When to use something else:**

- [File Upload](https://avaraui.com/docs/nextjs/file-upload): for drag-and-drop or file selection fields.

**Gotchas:**

- All four are looks of the one `input` item: install it once and set `variant` from the index.
- A password field is `inputType="password"` (the show/hide toggle comes with it) and autocomplete is the `suggestions` prop: neither is a different design.

### The 5 variants

1. **Password Strength** (`password-strength`): A password field with a 4-segment strength meter, Weak/Fair/Good/Strong label, and live criteria checklist.
   - Live: https://avaraui.com/view/input/password-strength
   - Best for: sign-up or password-reset forms where users need immediate strength feedback
   - Avoid if: you only need a plain masked password input without rules
   - Traits: 4-segment meter, live checklist, Weak/Fair/Good/Strong tones
   - Install: `npx shadcn@latest add @avara-ui/input`
   - Set these props: `{"variant":"password-strength","type":"password"}`
   - Docs: https://avaraui.com/docs/nextjs/input#password-strength
2. **Bordered** (`default`): The default bordered box, with an optional label above and helper text below.
   - Live: https://avaraui.com/view/input/default
   - Best for: a standard form field that should look clearly like a field
   - Avoid if: the form's design system calls for a flatter field
   - Traits: bordered box, default look
   - Install: `npx shadcn@latest add @avara-ui/input`
   - Docs: https://avaraui.com/docs/nextjs/input#input
3. **Filled** (`filled`): A solid, low-contrast field with no visible border at rest.
   - Live: https://avaraui.com/view/input/filled
   - Best for: a soft, modern form on a light background
   - Avoid if: the field must stand out against a similar-coloured surface
   - Traits: solid fill, no border at rest
   - Install: `npx shadcn@latest add @avara-ui/input`
   - Set these props: `{"variant":"filled"}`
   - Docs: https://avaraui.com/docs/nextjs/input#filled
4. **Underlined** (`underlined`): The chrome is reduced to a single baseline rule.
   - Live: https://avaraui.com/view/input/underlined
   - Best for: a minimal, editorial form
   - Avoid if: fields must be easy to spot in a dense form
   - Traits: baseline rule only
   - Install: `npx shadcn@latest add @avara-ui/input`
   - Set these props: `{"variant":"underlined"}`
   - Docs: https://avaraui.com/docs/nextjs/input#underlined
5. **Pill badge** (`pill`): The input sits in a capsule with a vertical divider after a leading icon in a segregated badge.
   - Live: https://avaraui.com/view/input/pill
   - Best for: a search or single-field sign-up with a leading icon
   - Avoid if: you have a long multi-field form
   - Traits: capsule shape, leading icon badge, vertical divider
   - Install: `npx shadcn@latest add @avara-ui/input`
   - Set these props: `{"variant":"pill"}`
   - Docs: https://avaraui.com/docs/nextjs/input#input-pill

## Props Reference

This component extends `React.InputHTMLAttributes<HTMLInputElement>`, meaning you can pass any standard input prop (like `onChange`, `value`, `name`, `disabled`, etc.).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"text" \| "password" \| "email" \| "number" \| "file"` | `"text"` | Determines the behavior. `"password"` adds a visibility toggle. `"file"` turns the field into a drag-and-drop zone — documented on the [File upload](https://avaraui.com/docs/nextjs/file-upload) page. |
| `suggestions` | `string[]` | `undefined` | Autocomplete list. Focus shows it, typing filters it (case-insensitive, matched letters highlighted), and a click or Enter writes the suggestion into the field. Ignored for `"password"` and `"file"`. |
| `onSuggestionSelect` | `(value: string) => void` | `undefined` | Fired after a suggestion is written into the field. The regular `onChange` fires as well. |
| `maxSuggestions` | `number` | `8` | Maximum rows shown at once; further matches scroll. |
| `inputSize` | `"sm" \| "md" \| "lg"` | `"md"` | Uniformly scales the height, padding, text size, and icon size of the input or dropzone. |
| `variant` | `"default" \| "filled" \| "underlined" \| "glow" \| "pill" \| "password-strength"` | `"default"` | Determines the visual styling of the borders, background, and focus rings. |
| `color` | `"primary" \| "lavender" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies the global color theme to the focus ring, glow shadow, and drag-active states. The default follows your theme's `--primary`. Accepts hex codes. |
| `label` | `string` | `undefined` | Renders a bold, accessible label directly above the input. |
| `floatingLabel` | `boolean` | `false` | Floats the label onto the top border when focused or filled. Used by the `password-strength` variant. |
| `helperText` | `string` | `undefined` | Subtle instructional text rendered below the input. |
| `error` | `string` | `undefined` | If provided, turns the input red, adds an alert icon, and replaces the helper text with the error message. |
| `onFilesChange` | `(files: File[]) => void` | `undefined` | Called with the chosen files when `type="file"`. |
| `disabled` | `boolean` | `false` | Disables interactions and applies a faded, read-only style. |
| `leftIcon / rightIcon` | `ReactNode` | `undefined` | Standard Mode Only: Injects an icon or element into the left or right side of the input field. |

## Works with other components

- Compose `InputBlock` inside [Form](https://avaraui.com/docs/nextjs/form) or [Auth Forms](https://avaraui.com/docs/nextjs/auth-forms) with [Button](https://avaraui.com/docs/nextjs/button).
- Pair with [Select](https://avaraui.com/docs/nextjs/select) and [Date Picker](https://avaraui.com/docs/nextjs/date-picker) for matching `default` and `underlined` field styling.
- Embed inside [Dialog](https://avaraui.com/docs/nextjs/dialog) for edit-profile and modal forms.
- Use [OTP Input](https://avaraui.com/docs/nextjs/otp-input) instead for one-time codes, and [File Upload](https://avaraui.com/docs/nextjs/file-upload) for drag-and-drop files.

## How do I enable the show/hide password toggle in InputBlock?

Pass `type="password"` to `InputBlock`. The visibility toggle button is rendered automatically and no extra prop is needed. With `variant="password-strength"` the toggle is always present, and its button is labelled "Show password" or "Hide password" for screen readers.

## How does InputBlock autocomplete work?

Pass a string array to `suggestions`. Focusing the field opens the list, and typing filters it to entries that contain the typed text anywhere, ignoring case, with the match highlighted. Arrow keys move, Enter picks, and Escape or Tab closes. `onSuggestionSelect` fires alongside `onChange`.

## How does the InputBlock password strength meter score a password?

With `variant="password-strength"` the meter counts four rules: at least 12 characters, upper and lower case, a number, and a special character. The label runs Weak, Fair, Good, Strong. Passwords containing common patterns such as "password" or "1234" show "Commonly guessed" and stay at Weak. A sparkle button generates a 16-character password.

## How do I show a validation error on InputBlock?

Pass the message as `error`. The field turns red, an alert icon appears, and the message replaces `helperText`. Because `InputBlock` forwards its ref and spreads input props, `{...register("email")}` from react-hook-form works, with `error={errors.email?.message}`. Add `aria-invalid` yourself for assistive technology.

## How do I change the InputBlock size and colour?

`inputSize` accepts `sm`, `md` (default) or `lg` and scales height, padding, text and icons. `color` accepts `primary` (default, following your theme), `lavender`, `indigo`, `rose`, `emerald`, `zinc` or a hex string, and tints the focus ring, glow and autocomplete highlight.

## Is InputBlock accessible to screen readers?

Partly. The autocomplete list uses `combobox`, `listbox` and `option` roles with `aria-activedescendant`, and the strength bar is a labelled `meter`. The `label` element is not linked to the input and errors are not announced, so pass `aria-label` and `aria-invalid` to the input directly. It has no `next/*` imports.

---

Live previews and every example: https://avaraui.com/docs/nextjs/input
