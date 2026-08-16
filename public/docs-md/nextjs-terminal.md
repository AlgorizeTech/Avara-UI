# Terminal Snippet

A beautiful, dependency-free code display block inspired by Mac OS windows.

If you are building a documentation site, a developer portfolio, or writing technical blog posts, you need a sleek way to present code. This `TerminalBlock` handles the structural styling, Mac-like window controls, built-in "Copy to Clipboard" functionality, and dynamic language badging without relying on heavy third-party syntax highlighters.

## Examples

Pass a raw `code` string and the block handles the window chrome, language badge, overflow scrolling and copy button. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const installCommand = \`npx create-next-app@latest my-app --typescript --tailwind
cd my-app
npm run dev\`;

export default function Docs() {
  return (
    
  );
}`;

export const usageLanguages = `// \`language\` drives the badge; the block never ships a heavyweight
// highlighter, so any language string is safe to pass.
`;

export const usageGlass = `// Backdrop-blurred chrome — put it over a gradient.

`;

export const usageMinimal = `// Drops the window controls and the border for inline snippets.
`;

export const usageBare = `// No filename header, no copy button — just the code.
`;

## Installation

### Copy the Component

This component leverages pure React state for the copy transitions and Tailwind CSS for the dark-mode compatible styling. It is **100% dependency-free**.

Copy the full engine code from the **Code** tab of the first example above into `components/custom/blocks/TerminalBlock.tsx`.

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
