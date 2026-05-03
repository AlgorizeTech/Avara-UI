# Skeleton Loader

A high-performance visual placeholder system used to reduce perceived loading times.

While standard Tailwind gives you the `animate-pulse` class, modern applications rely on **Shimmer** effects (a sleek gradient sliding across the background). This component injects its own pure CSS `@keyframes` to achieve a gorgeous shimmer. It provides composite templates out of the box (like Cards and Profiles), but also exposes top-level props so you can strictly define custom widths, heights, and border radii.

## Interactive Showcase

Use the control panel below to test the different animation styles and structural variants.

- The `card` and `profile` variants are composite elements that automatically arrange multiple skeleton layers.
- The `custom` variant demonstrates how you can piece together atomic skeletons using exact pixel values and radii.

---

## Installation

### Copy the Component

This component is completely dependency-free. It uses standard Tailwind classes and automatically injects the lightweight CSS required for the shimmer effect.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/SkeletonBlock.tsx`.

---

## Usage

### Composite Use

If you are loading standard layouts like a user profile or a product card, just use the built-in composite variants to save time.

```tsx

export default function FeedLoader() {
  return (

  );
}
```

## Custom Skeletons

For everything else, you can leverage explicit props to build perfect placeholder boundaries without wrestling with Tailwind class strings.

```tsx

export default function CustomDashboardLoader() {
  return (
    
      {/* Build any layout using exact width/height/radius props */}

  );
}
```

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

**Component Path:** `nextjs\skeleton\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
