export const metadata = docsPageMetadata("skeleton");

# Skeleton Loader

A high-performance visual placeholder system used to reduce perceived loading times.

While standard Tailwind gives you the `animate-pulse` class, modern applications rely on **Shimmer** effects (a sleek gradient sliding across the background). This component injects its own pure CSS `@keyframes` to achieve a gorgeous shimmer. It provides composite templates out of the box (like Cards and Profiles), but also exposes top-level props so you can strictly define custom widths, heights, and border radii.

Explore the different variations of the Skeleton component — each example shows a live preview with the exact code to copy.

export const usageCard = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function CardSkeleton() {
  return ;
}`;

export const usageProfile = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function ProfileSkeleton() {
  return ;
}`;

export const usageText = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function TextSkeleton() {
  return ;
}`;

export const usageRect = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function RectSkeleton() {
  return ;
}`;

export const usageCircle = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function CircleSkeleton() {
  return ;
}`;

export const usagePulse = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function PulseSkeleton() {
  return ;
}`;

export const usageNone = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function StaticSkeleton() {
  return ;
}`;

export const usageCustom = `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

// Custom atomic composition with explicit width, height and radius props
export default function CustomSkeleton() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/skeleton
```

## Examples

## Features
Learn about the Skeleton component's loading placeholder features, featuring a subtle pulsing animation that reduces perceived wait times.

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

          variant

            "rect" | "circle" | "text" | "profile" | "card" | "custom"

          "rect"

          Determines the structural shape. profile and{" "}
          card output pre-arranged composite layouts.

          animation

          "pulse" | "shimmer" | "none"

          "shimmer"

          Determines the loading animation style. shimmer slides a
          gradient, pulse fades opacity.

          width

          string | number

          undefined

          Sets an exact inline width (e.g. 200 or{" "}
          "50%"). Overrides Tailwind utility classes.

          height

          string | number

          undefined

          Sets an exact inline height (e.g. 48 or{" "}
          "100vh"). Overrides Tailwind utility classes.

          radius

          string | number

          undefined

          Sets an exact border-radius (e.g. "1rem" or{" "}
          8). Useful for perfect circles or custom rounding.

          className

          string

          undefined

          Allows you to pass custom Tailwind classes to manage layout
          constraints like margins or max-widths.

---

**Component Path:** `[framework]\skeleton\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
