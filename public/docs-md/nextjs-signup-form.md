# Authentication Block

A complete, production-ready Authentication Block that acts as both a Login and Signup component. It features comprehensive client-side validation, error state handling, simulated loading states, password visibility toggles, and social auth button templates.

## Interactive Showcase

Use the control panel below to switch between the `login` and `signup` form types. You can also customize the visual structure (`default`, `split`, `glass`, `minimal`) and apply global color themes that instantly update the buttons, focus rings, and structural gradients.

_Click the **Code** tab in the preview below to copy the full component engine._

---

## Installation

### 1. Install Dependencies

This component relies heavily on `lucide-react` for its interface iconography (such as the password visibility eye toggle and social icons).

```bash
npm install lucide-react
```

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

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
