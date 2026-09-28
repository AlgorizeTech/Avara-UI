# Item

A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions.

Instead of writing complex Flexbox or Grid classes every time you need to build a notification row, a settings item, a user listing, or a simple feature card, `ItemBlock` handles all the responsive alignments and spacing automatically. It dynamically transforms between horizontal rows and vertical cards based on the `variant` prop.

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

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/item
```

## Examples

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

## Props Reference

        Prop
        Type
        Default
        Description

          title

          ReactNode

          -
        
        The primary title text or element displayed in the item block (required).

          description

          ReactNode

          undefined
        
        Secondary description text or content displayed below the title.

          media

          ReactNode

          undefined
        
        Visual media element such as an icon, avatar, or thumbnail.

          actions

          ReactNode

          undefined
        
        Action elements like buttons or icons placed on the trailing edge or bottom.

          variant

          "default" | "compact" | "card" | "bordered"

          "default"
        
        Applies structural layout and visual styling variant.

          onClick

          () => void

          undefined
        
        Optional click event handler. Transforms the container into an interactive button.

          className

          string

          undefined
        
        Additional CSS class names to apply custom styles.

---

**Component Path:** `[framework]\item\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
