# Item

A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions.

Instead of writing complex Flexbox or Grid classes every time you need to build a notification row, a settings item, a user listing, or a simple feature card, `ItemBlock` handles all the responsive alignments and spacing automatically. It dynamically transforms between horizontal rows and vertical cards based on the `variant` prop.

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

## Interactive Showcase

Use the control panel below to construct your ideal layout.

- The `card` variant stacks the elements vertically and pins the actions to the bottom, perfect for grids.
- The `compact` variant reduces padding and text sizes, ideal for dense dropdown menus or sidebars.
- Passing an `onClick` handler automatically converts the component into an accessible `` and applies standard hover/active scaling states.

## Installation

### Copy the Component

This component is **100% dependency-free**. It simply uses standard Tailwind utility classes to manage the layout switching and hover effects.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ItemBlock.tsx`.

---

## Usage

### Building a List

Use the `default` or `bordered` variant inside a flex-col container to easily build robust lists. Pass whatever JSX you want into the `media` and `actions` slots.

```tsx

export default function UserDirectory() {
  return (

        }
        title="Sarah Jenkins"
        description="Senior Product Designer"
        actions={}
        onClick={() => console.log("Navigate to user")}
      />
      {/* ... more items */}
    
  );
}
```

## Building Cards

Switch the variant to card and the component will automatically stack the media on top, allowing you to use it inside Grid layouts.

```tsx

export default function ProjectGrid() {
  return (
    
      }
        title="Q3 Marketing Assets"
        description="Banners, copy, and localized strings for the upcoming Q3 campaign push."
        actions={
          
            Open Project
          
        }
      />
    
  );
}
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

---

**Component Path:** `nextjs\item\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
