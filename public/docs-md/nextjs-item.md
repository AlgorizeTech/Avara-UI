# Item

A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions.

Instead of writing complex Flexbox or Grid classes every time you need to build a notification row, a settings item, a user listing, or a simple feature card, `ItemBlock` handles all the responsive alignments and spacing automatically. It dynamically transforms between horizontal rows and vertical cards based on the `variant` prop.

## Interactive Showcase

Use the control panel below to construct your ideal layout.

- The `card` variant stacks the elements vertically and pins the actions to the bottom, perfect for grids.
- The `compact` variant reduces padding and text sizes, ideal for dense dropdown menus or sidebars.
- Passing an `onClick` handler automatically converts the component into an accessible `` and applies standard hover/active scaling states.

---

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

---

**Component Path:** `nextjs\item\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
