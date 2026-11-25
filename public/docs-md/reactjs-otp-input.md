---
title: "Shadcn OTP Input"
description: "Shadcn OTP Input. A multi-box verification code input (`OtpInputBlock`) with paste distribution, arrow-key navigation, smart backspace focus."
url: https://avaraui.com/docs/nextjs/otp-input
---

# Shadcn OTP Input

A multi-box verification code input (`OtpInputBlock`) with paste distribution, arrow-key navigation, smart backspace focus, a labelled input per digit, and an `onComplete` callback.

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

## OTP Input

Paste, arrow-key and backspace handling are built in.

- `value` and `onChange` work with the assembled string, not an array — the internal per-box state syncs to it.
- `onComplete` fires once every box is filled, which saves you comparing lengths yourself.

```tsx
import { OtpInputBlock } from "@/components/custom/blocks/OtpInputBlock";
import { CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";

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

## Underlined

- Use `variant="underlined"` to reduce each box to a baseline rule.

```tsx
import { OtpInputBlock } from "@/components/custom/blocks/OtpInputBlock";
import { CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";

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

## About Shadcn OTP Input

**What it is.** `OtpInputBlock` renders a configurable `length` row of single-character numeric boxes (`default`, `filled` or `underlined` variant) with paste support, `ArrowLeft`/`ArrowRight` navigation, and `Backspace` focus-back behavior.

**How it is built.** Exposes `value` and `onChange` as a single assembled string rather than a per-box array, plus an `onComplete(code)` callback fired automatically when all boxes are filled.

**When to use it.** Use `OtpInputBlock` for 2FA, email/SMS verification codes, and PIN entry flows. For standard text or password inputs, use [Input](https://avaraui.com/docs/reactjs/input).

## For AI agents

**When to use**

- 2FA, SMS, or email verification code inputs of any `length` (`default`, `filled` or `underlined`); the boxes shrink to fit, so 4 to 8 digits all stay on one row

**When not to use**

- Standard text or password-strength fields — use [Input](https://avaraui.com/docs/reactjs/input)

**Agent notes**

- Named export: `import { OtpInputBlock } from "@/components/custom/blocks/OtpInputBlock"`
- `value` and `onChange` operate on the joined string; use `onComplete` to trigger verification once all digits are entered.
- Only digits are accepted (a typed space slips through the numeric check). There is no prop for letters, so alphanumeric codes need a different input.
- Empty boxes are dropped when the string is assembled. If you clear a middle box in controlled mode, `onChange` returns a shorter string and the digits after it shift left on the next sync.
- Spread extra attributes (`aria-label`, `id`, `data-*`) on the component: they land on the wrapper `div`, not on the inputs.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/otp-input

**When to use it.** A multi-box input for one-time passwords and 2FA codes with paste support, arrow-key navigation and backspace handling, in two styles: boxed or underlined.

**Gotchas:**

- Both are looks of the one `otp-input` item: install it once and set `variant` from the index.
- `value` and `onChange` work with the assembled string, not an array; `onComplete` fires once every box is filled.

### The 2 variants

1. **Boxed** (`default`): A row of separate boxes, six by default. The default look.
   - Live: https://avaraui.com/view/otp-input/default
   - Best for: a verification step that should clearly read as a code entry
   - Avoid if: you want a lighter, line-only field
   - Traits: separate boxes, default look, `length` prop
   - Install: `npx shadcn@latest add @avara-ui/otp-input`
   - Docs: https://avaraui.com/docs/nextjs/otp-input#otp-input
2. **Underlined** (`underlined`): Each box is reduced to a baseline rule.
   - Live: https://avaraui.com/view/otp-input/underlined
   - Best for: a minimal, editorial verification screen
   - Avoid if: you want each digit in its own box
   - Traits: baseline rules
   - Install: `npx shadcn@latest add @avara-ui/otp-input`
   - Set these props: `{"variant":"underlined"}`
   - Docs: https://avaraui.com/docs/nextjs/otp-input#underlined

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `OtpInputBlock` | `length` | `number` | `6` | The number of individual input boxes to generate for the OTP code. |
| `OtpInputBlock` | `value` | `string` | `""` | The assembled code. The internal per-box state syncs from it when it changes, and the component also works without it. |
| `OtpInputBlock` | `onChange` | `(value: string) => void` | `undefined` | Fires when a digit is added, changed, removed or pasted, returning the newly assembled string. |
| `OtpInputBlock` | `onComplete` | `(value: string) => void` | `undefined` | Fires with the code whenever a change leaves every box filled, so it fires again if a digit of a complete code is edited. |
| `OtpInputBlock` | `variant` | `"default" \| "filled" \| "underlined"` | `"default"` | Determines the structural styling and border treatment of the individual input boxes. |
| `OtpInputBlock` | `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | The color applied to the focus ring, entered digits and underline. Accepts the four names or a hex string starting with `#`; any other value falls back to `"primary"`. |
| `OtpInputBlock` | `mask` | `boolean` | `false` | If true, converts the underlying HTML inputs to `type="password"` to obscure the characters. |
| `OtpInputBlock` | `disabled` | `boolean` | `false` | If true, disables every input box and drops their opacity to 50%. |

## Works with other components

- Embed `OtpInputBlock` inside [Auth Forms](https://avaraui.com/docs/reactjs/auth-forms) or [Dialog](https://avaraui.com/docs/reactjs/dialog) 2FA verification modals.
- Pair `onComplete` with [Action Button](https://avaraui.com/docs/reactjs/action-buttons) or [Sonner](https://avaraui.com/docs/reactjs/sonner) for instant code verification feedback.
- Use [Input](https://avaraui.com/docs/reactjs/input) for the email or password step that comes before the code.

## How does pasting a code into OtpInputBlock work?

Pasting into any box fills the row from the first box. The handler keeps the first `length` characters, drops non-digits, writes the rest in order over the existing boxes and focuses the next empty one. Because it trims before filtering, a pasted `123 456` loses a digit, so strip spaces and dashes first.

## When does onComplete fire in OtpInputBlock?

`onComplete` runs inside the same step as `onChange`, whenever a typed digit, deletion or paste leaves all `length` boxes filled, and it receives the joined string. Editing one digit of a finished code fires it again. It does not fire when you set `value` from props.

## Can OtpInputBlock accept letters, or hide the digits?

No letters: the change handler rejects anything that is not a number, so it only suits numeric codes. To hide digits as they are typed, pass `mask`, which renders each box as `type="password"`. Every box also sets `inputMode="numeric"` so mobile keyboards open on the number pad.

## What variants and colors does OtpInputBlock offer?

Three `variant` values exist: `"default"` (bordered), `"filled"` (muted background) and `"underlined"` (bottom rule). `color` takes `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex string such as `"#f97316"`. Anything else, including a named CSS color, falls back to the theme `"primary"`.

## Which keyboard shortcuts does OtpInputBlock support?

`ArrowLeft` and `ArrowRight` move between boxes and select the digit there. `Backspace` clears the current box, or when it is already empty clears the previous box and moves focus back to it. Each input has an `aria-label` such as "Digit 1 of 6" and `autoComplete="one-time-code"`.

## Does OtpInputBlock work without Next.js?

Yes. It has no `next/*` imports and no npm dependencies. The shadcn registry item installs `OtpInputBlock.tsx`, a small `otp-input-theme.ts` helper and the `utils` item. The layout uses Tailwind container queries (`@container/otp`), so use a Tailwind version that supports them.

---

Live previews and every example: https://avaraui.com/docs/nextjs/otp-input
