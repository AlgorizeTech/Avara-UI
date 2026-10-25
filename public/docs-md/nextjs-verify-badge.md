export const metadata = docsPageMetadata("verify-badge", {
  title: "Verify Badge",
  description: "A highly customizable verified badge component similar to Twitter/X or premium verified markers, with built-in animation support."
});

# Verify Badge

A versatile verified badge component that can be customized with various styles (blue, gold, dark, gray), sizes, and an optional subtle pulse animation for premium aesthetics.

It includes distinct customization options to match different areas of your application.

Explore the different variations of the Verify Badge — each example shows a live preview with the exact code to copy. Hover a badge to see its shine effect.

export const usageDefault = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function ProfileName() {
  return (

        AvaraSystem

  );
}`;

export const usageSizes = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function BadgeSizes() {
  return (

  );
}`;

export const usageStatic = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function StaticBadge() {
  return (

        AvaraSystem

  );
}`;

export const usageInline = `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

// The badge is the only piece that ships with the component — everything
// around it is ordinary markup, shown here so the card matches the preview.
const accent = "var(--primary)";

function BotAvatar({ className }: { className?: string }) {
  return (

  );
}

export default function NotificationCard() {
  return (

            AvaraSystem

            Bot

            Today at 2:34 PM

          Deployment{" "}
          
            #421
          {" "}
          to production completed successfully.

              Build Passed 🚀

              All 142 tests passed in 12s. The latest preview is now live on
              Vercel.

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/verify-badge.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/verify-badge
```

## Examples

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

          "var(--primary)"

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

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
