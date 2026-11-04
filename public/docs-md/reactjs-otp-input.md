---
title: "Shadcn OTP Input"
description: "A fully accessible, developer-friendly multi-box input designed for One-Time Passwords and 2FA codes. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/otp-input
---

# Shadcn OTP Input

A fully accessible, developer-friendly multi-box input designed for One-Time Passwords and 2FA codes.

Building a multi-box input that actually feels good to use is notoriously difficult. This `OtpInputBlock` handles it all automatically: seamless copy/pasting, `ArrowLeft` and `ArrowRight` navigation, intuitive `Backspace` handling that smoothly shifts focus backward, and built-in hooks for both `onChange` and `onComplete`.

Explore the different variations of the OTP Input — each example shows a live preview with the exact code to copy. **Try copying a 6-digit number and pasting it directly into the first box.**

## OTP Input

Paste, arrow-key and backspace handling are built in.

- `value` and `onChange` work with the assembled string, not an array — the internal per-box state syncs to it.
- `onComplete` fires once every box is filled, which saves you comparing lengths yourself.

```tsx
const LENGTH = 6;

export default function BasicOtp() {
  const [value, setValue] = useState("");
  const [verified, setVerified] = useState(false);

  // The card around the input is ordinary markup — only OtpInputBlock ships
  // with the component.
  return (
    <div className="flex flex-col items-center max-w-sm w-full text-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2 text-foreground">
          <KeyRound className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          Two-Step Verification
        </h3>
        <p className="text-sm text-muted-foreground">
          Please enter the {LENGTH}-digit code sent to your email address.
          <br />
          <span className="opacity-60 text-xs mt-1 block">
            (Try pasting a code!)
          </span>
        </p>
      </div>

      <OtpInputBlock
        length={LENGTH}
        value={value}
        onChange={setValue}
        onComplete={(code) => {
          console.log("Submitted:", code);
          setVerified(true);
        }}
        disabled={verified}
      />

      <div className="h-10 flex items-center justify-center">
        {verified ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            Verified Successfully
          </div>
        ) : (
          <button
            disabled={value.length !== LENGTH}
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Verify Code
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
npx shadcn@latest add https://avaraui.com/r/otp-input.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/otp-input
```

## Examples

### Underlined

- Use `variant="underlined"` to reduce each box to a baseline rule.

```tsx
const LENGTH = 6;

export default function UnderlinedOtp() {
  const [value, setValue] = useState("");
  const [verified, setVerified] = useState(false);

  // The card around the input is ordinary markup — only OtpInputBlock ships
  // with the component.
  return (
    <div className="flex flex-col items-center max-w-sm w-full text-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2 text-foreground">
          <KeyRound className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          Two-Step Verification
        </h3>
        <p className="text-sm text-muted-foreground">
          Please enter the {LENGTH}-digit code sent to your email address.
          <br />
          <span className="opacity-60 text-xs mt-1 block">
            (Try pasting a code!)
          </span>
        </p>
      </div>

      <OtpInputBlock
        variant="underlined"
        length={LENGTH}
        value={value}
        onChange={setValue}
        onComplete={(code) => {
          console.log("Submitted:", code);
          setVerified(true);
        }}
        disabled={verified}
      />

      <div className="h-10 flex items-center justify-center">
        {verified ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            Verified Successfully
          </div>
        ) : (
          <button
            disabled={value.length !== LENGTH}
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Verify Code
          </button>
        )}
      </div>
    </div>
  );
}
```

## Features
Learn about the OTP Input's seamless user experience, featuring automatic focus advancing, paste support, and backspace handling.

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
| `OtpInputBlock` | `length` | `number` | `6` | The number of individual input boxes to generate for the OTP code. |
| `OtpInputBlock` | `value` | `string` | `""` | The controlled string value. The internal array state automatically syncs with this value. |
| `OtpInputBlock` | `onChange` | `(value: string) => void` | `undefined` | Fires every time a single digit is added, changed, or removed, returning the newly assembled string. |
| `OtpInputBlock` | `onComplete` | `(value: string) => void` | `undefined` | A convenience callback that fires automatically as soon as all input boxes have been filled. |
| `OtpInputBlock` | `variant` | `"default" \| "filled" \| "underlined"` | `"default"` | Determines the structural styling and border treatment of the individual input boxes. |
| `OtpInputBlock` | `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | The theme color applied to the borders, text, and focus rings. Fully supports custom hex codes. |
| `OtpInputBlock` | `mask` | `boolean` | `false` | If true, converts the underlying HTML inputs to `type="password"` to obscure the characters. |
| `OtpInputBlock` | `disabled` | `boolean` | `false` | If true, disables all interactions across all input boxes and reduces their overall opacity. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/otp-input
