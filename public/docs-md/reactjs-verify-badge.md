# Verify Badge

A versatile verified badge component that can be customized with various styles (blue, gold, dark, gray), sizes, and an optional subtle pulse animation for premium aesthetics.

It includes distinct customization options to match different areas of your application.

## Examples

Explore the different variations of the Verify Badge — each example shows a live preview with the exact code to copy. Hover a badge to see its shine effect.

export const usageDefault = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function ProfileName() {
  return (
    
      AlgorizeSystem

  );
}`;

export const usageSizes = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function BadgeSizes() {
  return (

  );
}`;

export const usageStatic = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function StaticBadge() {
  return ;
}`;

export const usageInline = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function NotificationCard() {
  return (
    
      AlgorizeSystem
      
      Today at 2:34 PM
    
  );
}`;

## Installation

## Features
Explore the Verify Badge's authentic design features, providing recognizable trust signals with subtle animated glows.

    SVG Based
    Uses standard SVG elements that scale perfectly to any size without losing quality.

    Custom Themes
    Easily pass any custom hex color or use predefined themes to match your branding.

    Micro-Animations
    Built-in optional subtle pulse animations to draw attention to verified status.

    Flexible Sizing
    Comes with 4 preset sizes (sm, md, lg, xl) that integrate seamlessly into any layout.

## Best Practices & Guidelines

    Accessibility First
    Always ensure that you add an aria-label or title to the badge so that screen readers can convey the "Verified" status to visually impaired users.

    Proper Sizing
    Use the sm or md sizes when placing the badge directly next to standard text (like usernames). The lg and xl sizes are best reserved for profile headers or prominent display cards.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          VerifyBadge

          color

          string (hex/css color)

          "#1d9bf0"

          The theme color of the badge.

          VerifyBadge

          size

          "sm" | "md" | "lg" | "xl"

          "md"

          The physical dimensions and icon size of the badge.

          VerifyBadge

          animate

          boolean

          false

          If true, adds a continuous subtle pulse animation to the background.

          VerifyBadge

          ...props

          HTMLAttributes&lt;HTMLDivElement&gt;

          undefined

          Accepts all native HTML div attributes (e.g., className,{" "}
          id) which are seamlessly forwarded to the root wrapper.

---

**Component Path:** `[framework]\verify-badge\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
