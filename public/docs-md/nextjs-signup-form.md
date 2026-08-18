# Authentication Block

A complete, production-ready Authentication Block that acts as both a Login and Signup component. It features comprehensive client-side validation, error state handling, simulated loading states, password visibility toggles, and social auth button templates.

## Examples

One component covers both halves of your auth flow: `type` swaps the fields and validation rules, `variant` swaps the surrounding chrome.

export const usageSignup = `import AuthForm from "@/components/custom/blocks/AuthForm";

export default function SignupPage() {
  return ;
}`;

export const usageLogin = `import AuthForm from "@/components/custom/blocks/AuthForm";

export default function LoginPage() {
  // "login" drops the name fields, the confirm-password field and the terms checkbox.
  return ;
}`;

export const usageSplit = `import AuthForm from "@/components/custom/blocks/AuthForm";

export default function SplitSignupPage() {
  // "split" pairs the form with a full-height marketing panel on large screens.
  return ;
}`;

export const usageGlass = `import AuthForm from "@/components/custom/blocks/AuthForm";

export default function GlassSignupPage() {
  // "glass" is translucent — put it over a photo or a gradient.
  return (

  );
}`;

export const usageMinimal = `import AuthForm from "@/components/custom/blocks/AuthForm";

export default function MinimalLoginPage() {
  // "minimal" strips the card, leaving just the fields on your own background.
  return ;
}`;

## Installation

## Props Reference

        Prop
        Type
        Default
        Description

          type

          "login" | "signup"

          "signup"
        
        Determines the active layout and validation rules of the form.

          variant

          "default" | "split" | "glass" | "minimal"

          "default"

          Applies overarching structural layouts. split wraps the
          form in a full-width marketing panel, while glass adds
          translucent styling.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary buttons, focus rings, and
          checkbox active states. Accepts valid hex codes (e.g.{" "}
          "#00FF00").

---

**Component Path:** `nextjs\signup-form\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
