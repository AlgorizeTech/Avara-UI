# Scroll Area

Augments native scroll functionality for custom, cross-browser styling.

This `ScrollAreaBlock` provides a beautiful, native-feeling scrollbar that works seamlessly across Webkit browsers (Chrome, Safari, Edge) and Firefox. It uses pure CSS and avoids heavy third-party dependencies while allowing deep theme integration.

## Examples

Give the block a height or width constraint and it takes over the scrollbar styling from there — same rendering in Webkit and Firefox. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

export default function LongList() {
  const tags = Array.from({ length: 50 }).map((_, i) => \`Item \${i + 1}\`);

  return (

        {tags.map((tag) => (
          
            {tag}
          
        ))}

  );
}`;

export const usageHorizontal = `// Horizontal areas need content wider than the box — \`w-max\` on the inner
// row is the usual way to get it.

    {artwork.map((item) => )}
  
`;

export const usageBoth = `
  
`;

export const usageMinimal = `// Thinner thumb, no track chrome.

`;

export const usageGlass = `

`;

export const usageAutoHide = `// \`autoHide\` fades the bar out until you scroll or hover; \`hideTrack\`
// removes the groove behind the thumb entirely.

`;

## Installation

### Copy the Component

This component dynamically injects standard CSS scrollbar properties via a `style` tag, scoping them securely to unique class names to prevent overriding global scrollbars unless desired.

Copy the full engine code from the **Code** tab of the first example above into `components/custom/blocks/ScrollAreaBlock.tsx`.

## Features
Explore the Scroll Area's custom scrollbar features, providing a unified, stylized scrolling experience across all operating systems.

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

        Component
        Prop
        Type
        Default
        Description

          ScrollAreaBlock

          variant

          "default" | "minimal" | "glass"

          "default"

          Determines the architectural style and thickness of the scroll track
          and thumb.

          ScrollAreaBlock

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "zinc"

          The color of the scrollbar thumb and hover states. Fully supports
          dynamic custom hex codes.

          ScrollAreaBlock

          orientation

          "vertical" | "horizontal" | "both"

          "vertical"

          Defines which axis should be scrollable. This automatically applies
          the correct CSS overflow utilities.

          ScrollAreaBlock

          hideTrack

          boolean

          false

          If true, forces the background scroll track to be completely
          transparent, showing only the thumb.

          ScrollAreaBlock

          autoHide

          boolean

          false

          If true, the scrollbar thumb fades to transparent when the container
          is not being actively hovered.

---

**Component Path:** `nextjs\scroll-area\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
