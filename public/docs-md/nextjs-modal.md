# Modal Dialog

A highly animated, dynamic Modal component. Built from scratch using `gsap` for butter-smooth scaling and fading animations. It includes distinct visual variants and content types to handle alerts, forms, and complex interfaces.

## Interactive Showcase

Use the control panel below to test the different modal layouts (`standard`, `form`, `fullscreen`, `confirmation`).

_Note: For the documentation preview, the modal uses absolute positioning to stay contained within the box. In your actual application, you can swap it to `fixed` positioning to cover the entire viewport!_

---

## Installation

### 1. Install Dependencies

This component relies heavily on `gsap` to handle the mounting/unmounting lifecycle perfectly without harsh visual jumping, and `lucide-react` for standard UI icons.

```bash
npm install gsap lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          type

          "standard" | "form" | "fullscreen" | "confirmation"

          "standard"

          Changes the internal structure and dimensions of the modal content.

          variant

          "default" | "glass" | "minimal" | "bordered"

          "default"

          Applies overarching structural styles to the modal container.{" "}
          glass adds deep backdrop blurring, while{" "}
          minimal removes borders and harsh shadows.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary buttons, focus rings, and
          accent icons. Accepts valid hex codes (e.g. "#00FF00").

---

**Component Path:** `nextjs\modal\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
