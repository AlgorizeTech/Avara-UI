export const metadata = docsPageMetadata("loader");

# Loader

A premium, dependency-free loading indicator component.

Different parts of your UI require different types of loading states. A full-page data fetch might require an indeterminate `bar` or `pulse`, while a small button state might only fit a `sm` size `spinner` or `dots`, or an eye-catching `orbit` dual-ring spinner for prominent async states. This component consolidates 6 distinct, ultra-smooth animations into a single block.

Explore the different variations of the Loader component — each example shows a live preview with the exact code to copy.

export const usageSpinner = `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function BasicLoader() {
  return ;
}`;

export const usageDots = `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function DotsLoader() {
  return ;
}`;

export const usagePulse = `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function PulseLoader() {
  return ;
}`;

export const usageBar = `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function BarLoader() {
  return ;
}`;

export const usageOrbit = `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function OrbitLoader() {
  return (
    
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/loader.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/loader
```

## Examples

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "spinner" | "orbit" | "dots" | "pulse" | "ring" | "bar"

          "spinner"
        
        The architectural style of the loading animation. "orbit" (and "ring") renders the signature dual-ring concentric spinner with counter-rotating arc and pulsing core.

          direction

          "single" | "dual"

          "single"

          Rotation direction for concentric rings in "orbit" and "ring" variants. "single" spins both rings in the same direction; "dual" enables opposite counter-spinning.

          secondaryColor

            "primary" | "indigo" | "rose" | "emerald" | "amber" | "blue" |
            "zinc" | string

          "#10b981"

          Accent color for the inner counter-rotating orbit in "orbit" and "ring" variants. Defaults to emerald (#10b981).

          size

          "sm" | "md" | "lg" | "xl"

          "md"

          Proportionally scales the container width, height, and the helper text
          size.

          color

            "primary" | "indigo" | "rose" | "emerald" | "amber" | "blue" |
            "zinc" | string

          "primary"

          Applies the active color theme to the SVG strokes, dots, and borders.
          Accepts custom hex codes. Unrecognised values fall back to{" "}
          "primary", which follows your theme's{" "}
          --primary token.

          text

          string

          undefined

          Optional text to display beneath the loader. It automatically receives
          a subtle pulsing animation.

          className

          string

          undefined

          Optional CSS classes to apply to the outermost wrapper container.

---

**Component Path:** `[framework]\loader\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
