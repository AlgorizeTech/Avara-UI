# Pricing Components

A collection of highly-converting, responsive pricing sections. Whether you need traditional tiered subscription cards, a detailed comparison table, or an interactive GSAP-powered quote builder, these components are designed to maximize conversions.

## Interactive Showcase

Use the control panel below to flip between the four layouts: **Tiered Cards**, **GSAP Builder**, **Comparison Table**, and **Usage Slider**.

You can customize the visual structure of the cards (`default`, `premium`, `elegant`) and apply global color themes that cascade instantly across buttons, gradients, glows, and badges.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

## Installation

### 1. Install Dependencies

These components rely on `lucide-react` for icons, and `gsap` specifically for the smooth animation effects found in the **GSAP Builder** layout. Run the following command:

```bash
npm install lucide-react gsap
```

## Props Reference: PricingCards

        Prop
        Type
        Default
        Description

          data

          PricingData

          Required

          The core data object containing an array of tabs (e.g.
          Monthly vs Annually), which in turn contain an array of{" "}
          plans.

          variant

            "default" | "premium" | "elegant" | "minimal" | "bordered"

          "default"

          Applies overarching structural layouts. premium adds
          heavy shadows and gradients to popular cards, while{" "}
          elegant uses soft border-top accents.

          color

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global color themes to the "Most Popular" badges, checkmark
          icons, primary buttons, and gradients.

---

**Component Path:** `nextjs\pricing\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
