# Loader

A premium, dependency-free loading indicator component.

Different parts of your UI require different types of loading states. A full-page data fetch might require an indeterminate `bar` or `pulse`, while a small button state might only fit a `sm` size `spinner` or `dots`. This component consolidates 5 distinct, ultra-smooth animations into a single block.

## Interactive Showcase

Use the control panel below to test the variants, scale the sizes, and apply theme colors. The injected animations are buttery-smooth CSS `@keyframes` that require zero external libraries.

---

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

---

**Component Path:** `nextjs\loader\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
