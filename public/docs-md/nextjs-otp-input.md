export const metadata = docsPageMetadata("otp-input");

# OTP Input

A fully accessible, developer-friendly multi-box input designed for One-Time Passwords and 2FA codes.

Building a multi-box input that actually feels good to use is notoriously difficult. This `OtpInputBlock` handles it all automatically: seamless copy/pasting, `ArrowLeft` and `ArrowRight` navigation, intuitive `Backspace` handling that smoothly shifts focus backward, and built-in hooks for both `onChange` and `onComplete`.

Explore the different variations of the OTP Input — each example shows a live preview with the exact code to copy. **Try copying a 6-digit number and pasting it directly into the first box.**

export const usageDefault = `"use client";

const LENGTH = 6;

export default function BasicOtp() {
  const [value, setValue] = useState("");
  const [verified, setVerified] = useState(false);

  // The card around the input is ordinary markup — only OtpInputBlock ships
  // with the component.
  return (

          Two-Step Verification

          Please enter the {LENGTH}-digit code sent to your email address.

            (Try pasting a code!)

       {
          console.log("Submitted:", code);
          setVerified(true);
        }}
        disabled={verified}
      />

        {verified ? (

            Verified Successfully
          
        ) : (
          
            Verify Code
          
        )}

  );
}`;

export const usageUnderlined = `"use client";

const LENGTH = 6;

export default function UnderlinedOtp() {
  const [value, setValue] = useState("");
  const [verified, setVerified] = useState(false);

  // The card around the input is ordinary markup — only OtpInputBlock ships
  // with the component.
  return (

          Two-Step Verification

          Please enter the {LENGTH}-digit code sent to your email address.

            (Try pasting a code!)

       {
          console.log("Submitted:", code);
          setVerified(true);
        }}
        disabled={verified}
      />

        {verified ? (

            Verified Successfully
          
        ) : (
          
            Verify Code
          
        )}

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/otp-input
```

## Examples

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

          "primary"

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

**Component Path:** `[framework]\otp-input\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
