# Terminal Snippet

A beautiful, dependency-free code display block inspired by Mac OS windows.

If you are building a documentation site, a developer portfolio, or writing technical blog posts, you need a sleek way to present code. This `TerminalBlock` handles the structural styling, Mac-like window controls, built-in "Copy to Clipboard" functionality, and dynamic language badging without relying on heavy third-party syntax highlighters.

## Interactive Showcase

Use the control panel below to test the different themes, variants, and copy functionalities. Notice how the `glass` variant uses backdrop-blur to blend elegantly over complex backgrounds!

## Installation

### Copy the Component

This component leverages pure React state for the copy transitions and Tailwind CSS for the dark-mode compatible styling. It is **100% dependency-free**.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/TerminalBlock.tsx`.

---

## Usage

Simply pass your raw code string to the `code` prop. The component automatically handles the scroll overflow for long lines.

```tsx

const installCommand = `npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm install lucide-react clsx tailwind-merge
npm run dev`;

export default function Docs() {
  return (
    
      1. Initialize the Project

  );
}
```

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          MarqueeBlock

          direction

          "left" | "right" | "up" | "down"

          "left"

          Determines the direction the marquee will continuously slide. Note:
          Ensure you set a fixed height on the component when using
          "up" or "down".

          MarqueeBlock

          speed

          "slow" | "normal" | "fast" | number

          "normal"

          Controls the animation duration. Can use a preset string or a specific
          number representing duration in seconds (e.g., speed={15}{" "}
          equals a 15s loop).

          MarqueeBlock

          pauseOnHover

          boolean

          false

          If true, the animation automatically pauses when the user's cursor
          hovers over the container.

          MarqueeBlock

          fade

          boolean

          false

          If true, applies a CSS mask-image gradient to smoothly
          fade out the edges of the marquee container. Works seamlessly across
          light and dark modes.

          MarqueeBlock

          gap

          string

          "1rem"

          The CSS gap applied between the individual items inside the marquee.
          Accepts any valid CSS unit (e.g., "2rem",{" "}
          "32px").

---

**Component Path:** `nextjs\terminal\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
