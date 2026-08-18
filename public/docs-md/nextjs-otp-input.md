# OTP Input

A fully accessible, developer-friendly multi-box input designed for One-Time Passwords and 2FA codes.

Building a multi-box input that actually feels good to use is notoriously difficult. This `OtpInputBlock` handles it all automatically: seamless copy/pasting, `ArrowLeft` and `ArrowRight` navigation, intuitive `Backspace` handling that smoothly shifts focus backward, and built-in hooks for both `onChange` and `onComplete`.

## Examples

Explore the different variations of the OTP Input — each example shows a live preview with the exact code to copy. **Try copying a 6-digit number and pasting it directly into the first box.**

export const usageDefault = `import { OtpInputBlock } from "@/components/custom/blocks/OtpInputBlock";

export default function BasicOtp() {
  const [value, setValue] = useState("");

  return (
     console.log("Submitted:", code)}
    />
  );
}`;

export const usageFilled = `"use client";

export default function FilledOtp() {
  const [value, setValue] = useState("");

  return (
    
  );
}`;

export const usageUnderlined = `"use client";

export default function UnderlinedOtp() {
  const [value, setValue] = useState("");

  return (
    
  );
}`;

export const usageLengths = `"use client";

export default function OtpLengths() {
  const [value, setValue] = useState("");

  return (

  );
}`;

export const usageMasked = `"use client";

export default function MaskedOtp() {
  const [value, setValue] = useState("");

  return ;
}`;

export const usageDisabled = `"use client";

export default function DisabledOtp() {
  const [value, setValue] = useState("123456");

  return ;
}`;

## Installation

## Usage

The component acts exactly like a standard controlled or uncontrolled React input. You can listen to every keystroke via `onChange`, or simply wait for the user to finish typing via `onComplete`.

```tsx

export default function VerificationForm() {
  const [code, setCode] = useState("");

  const handleVerify = (finalCode: string) => {
    console.log("Submitting code to API:", finalCode);
    // API logic here...
  };

  return (
    
      Enter Security Code

  );
}
```

## Features
Learn about the OTP Input's seamless user experience, featuring automatic focus advancing, paste support, and backspace handling.

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

          OtpInputBlock

          length

          number

          6

          The number of individual input boxes to generate for the OTP code.

          OtpInputBlock

          value

          string

          ""

          The controlled string value. The internal array state automatically
          syncs with this value.

          OtpInputBlock

          onChange

          (value: string) =&gt; void

          undefined

          Fires every time a single digit is added, changed, or removed,
          returning the newly assembled string.

          OtpInputBlock

          onComplete

          (value: string) =&gt; void

          undefined

          A convenience callback that fires automatically as soon as all input
          boxes have been filled.

          OtpInputBlock

          variant

          "default" | "filled" | "underlined"

          "default"

          Determines the structural styling and border treatment of the
          individual input boxes.

          OtpInputBlock

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          The theme color applied to the borders, text, and focus rings. Fully
          supports custom hex codes.

          OtpInputBlock

          mask

          boolean

          false

          If true, converts the underlying HTML inputs to{" "}
          type="password" to obscure the characters.

          OtpInputBlock

          disabled

          boolean

          false

          If true, disables all interactions across all input boxes and reduces
          their overall opacity.

---

**Component Path:** `nextjs\otp-input\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
