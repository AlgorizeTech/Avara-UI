# Loader

A premium, dependency-free loading indicator component.

Different parts of your UI require different types of loading states. A full-page data fetch might require an indeterminate `bar` or `pulse`, while a small button state might only fit a `sm` size `spinner` or `dots`. This component consolidates 5 distinct, ultra-smooth animations into a single block.

## Interactive Showcase

Use the control panel below to test the variants, scale the sizes, and apply theme colors. The injected animations are buttery-smooth CSS `@keyframes` that require zero external libraries.

## Installation

### Copy the Component

This component is **100% dependency-free** and relies exclusively on standard Tailwind CSS classes alongside a few lightweight custom `@keyframes` for the specialized staggered animations (like the bouncing dots and the indeterminate bar).

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/LoaderBlock.tsx`.

---

## Usage

Import the component and pass your desired variant and size.

```tsx

export default function LoadingState() {
  return (

  );
}
```

## Features
Discover the Loader component's animated states, offering various spinner styles and sizes for indicating background processes.

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

          "spinner" | "dots" | "pulse" | "ring" | "bar"

          "spinner"
        
        The architectural style of the loading animation.

          size

          "sm" | "md" | "lg" | "xl"

          "md"

          Proportionally scales the container width, height, and the helper text
          size.

          color

            "indigo" | "rose" | "emerald" | "amber" | "blue" | "zinc" | string

          "indigo"

          Applies the active color theme to the SVG strokes, dots, and borders.
          Accepts custom hex codes.

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

**Component Path:** `nextjs\loader\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
