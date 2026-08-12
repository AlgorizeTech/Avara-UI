# Kbd (Keyboard)

A specialized typography component used to display keyboard buttons, shortcuts, and commands.

Displaying keyboard shortcuts to power users is a critical part of modern web design (especially in tools like Command Menus). The `KbdBlock` uses a native `` HTML element for strict semantic accuracy, and applies a precise combination of borders, background colors, and inset shadows to simulate a physical, tactile keyboard key.

## Examples

Explore the different variations of the Kbd component — each example shows a live preview with the exact code to copy. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function BasicKbd() {
  return ⌘;
}`;

export const usageSizes = `
  ⌘
  ⌘
  ⌘
`;

export const usageCombinations = `import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function ShortcutList() {
  return (
    
      Force Reload:
      
        ⇧
        ⌘
        R

  );
}`;

export const usageInline = `import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function InlineShortcut() {
  return (
    
      Press ⌘ K to open the command palette, or{" "}
      Esc to dismiss it.
    
  );
}`;

` element.",
      props: { example: "single" },
      usage: usageDefault,
      code: extractCode("src/components/custom/blocks/KbdBlock.tsx"),
    },
    {
      title: "Sizes",
      subheading: "Use the `size` prop to change the size.",
      props: { example: "sizes" },
      usage: usageSizes,
    },
    {
      title: "Combinations",
      subheading: "Sequence several keys to spell out a shortcut.",
      props: {},
      usage: usageCombinations,
    },
    {
      title: "Inline in text",
      subheading: "Keys sit on the text baseline, so they read naturally in prose.",
      props: { example: "inline" },
      usage: usageInline,
    },
  ]}
/>

## Installation

### Copy the Component

This component is **100% dependency-free** and forwards all standard HTML attributes.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Code** tab of the first example above. Place it in `components/custom/blocks/KbdBlock.tsx`.

---

## Usage

You can use the component independently, or string multiple together to represent complex key combinations.

```tsx

export default function ShortcutHint() {
  return (
    
      To open the command palette, press
      
        ⌘
        K

  );
}
```

## Features
Learn about the Kbd component's typography styles for displaying keyboard shortcuts and command instructions consistently.

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

          size

          "sm" | "md" | "lg"

          "sm"
        
        Controls the height, padding, and font-size of the key element.

          className

          string

          undefined

          Standard Tailwind CSS overrides. Useful for adding specific margin or
          overriding the shadow if needed.

          ...props

          HTMLAttributes&lt;HTMLElement&gt;

          {}

          Accepts all standard HTML attributes for a native{" "}
          &lt;kbd&gt; element, including title or{" "}
          aria-label for accessibility.

---

**Component Path:** `nextjs\kbd\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
