export const metadata = docsPageMetadata("alert");

# Alerts

A highly versatile Alert component designed to communicate states and important information to your users.

Along with the classic `solid` and `outline` variations, this component now features three completely modern aesthetics: `modern` (SaaS style), `glass` (glassmorphism), and `glow` (dark mode neon).

Each example shows a live preview with the exact code to copy.

export const usageDefault = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertDemo() {
  return (
    
  );
}`;

export const usageTypes = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertTypes() {
  return (

  );
}`;

export const usageVariants = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertVariants() {
  return (

  );
}`;

export const usageGlass = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function GlassAlert() {
  return (
    // Glass needs something vibrant behind it — put it over an image or gradient.

  );
}`;

export const usageGlow = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function GlowAlert() {
  return (
    // Glow is built for dark surfaces — its icon pulses.

  );
}`;

export const usageIcons = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertIcons() {
  return (
    
      {/* A name from ICON_MAP: CheckCircle2 | AlertTriangle | Info | Bell | XCircle */}

      {/* Any other string renders as text — emoji included */}

      {/* Omit icon (or pass null) for text only */}

  );
}`;

export const usageDismissible = `export default function DismissibleAlert() {
  return (
     console.log("dismissed")}
    />
  );
}`;

export const usageRichContent = `import { Alert } from "@/components/custom/blocks/Alerts";

export default function RichAlert() {
  return (

        This is rich content rendered inside the alert as children. You can put
        lists, buttons, or any valid HTML here.

          Action

          Cancel

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/alert
```

## Examples

## Features
Learn about the Alert component's capabilities, including different severity levels, customizable icons, and dismissible actions.

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

        Prop
        Type
        Default
        Description

          type

            "primary" | "secondary" | "success" | "danger" | "warning" | "info"
            | "dark"

          "primary"
        
        Determines the semantic color scheme of the alert.

          variant

          "solid" | "outline" | "modern" | "glass" | "glow"

          "modern"
        
        Applies overarching structural layouts and visual styles.

          dismissible

          boolean

          false

          If true, renders an "X" button that smoothly animates the alert out of
          the DOM.

          icon

          string | ReactNode

          null

          The icon to display. You can pass a string matching the{" "}
          ICON_MAP, an emoji, or a custom SVG.

          title

          string

          null
        
        The bold header text of the alert.

---

**Component Path:** `[framework]\alert\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
