# Item

A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions.

Instead of writing complex Flexbox or Grid classes every time you need to build a notification row, a settings item, a user listing, or a simple feature card, `ItemBlock` handles all the responsive alignments and spacing automatically. It dynamically transforms between horizontal rows and vertical cards based on the `variant` prop.

## Examples

`title` is the only required prop — `media`, `description` and `actions` are slots you fill as needed.

export const usageDefault = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function SettingsRow() {
  return (

      }
    />
  );
}`;

export const usageCard = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function FeatureCard() {
  return (
    // "card" stacks the slots vertically and pins actions to the bottom —
    // drop it straight into a grid.

      }
      actions={
        
          Configure
        
      }
    />
  );
}`;

## Installation

## Features
Discover the Item component's structural layout features, designed for lists, dropdowns, and menus with proper spacing.

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

---

**Component Path:** `[framework]\item\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
