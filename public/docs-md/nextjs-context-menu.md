# Context Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.

Building a Context Menu is difficult because it involves intercepting the browser's native right-click event (`onContextMenu`) and rendering an overlay component precisely at the user's mouse coordinates without it getting clipped by CSS `overflow` properties.

This `ContextMenuBlock` is a **100% dependency-free** solution. It uses React's `createPortal` to escape DOM limitations, and includes highly optimized boundary-collision logic to guarantee the menu never opens off the edge of the user's screen.

## Features
Explore the ContextMenu's right-click features, including nested submenus, disabled states, and keyboard navigation.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Right-click anywhere inside the dashed box below to see the context menu in action. Try clicking near the extreme edges of the dashed box to see how the boundary-collision math prevents the menu from falling off the screen.

## Installation

### Copy the Component

This component is completely native and relies only on `react-dom` for the portal functionality.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ContextMenuBlock.tsx`.

---

## Usage

A `` component requires a Trigger area and a Content portal. The `` wraps any content you want to act as the right-click listener zone.

```tsx

export default function RightClickTable() {
  return (
    
      {/* 1. This entire DIV now intercepts right-clicks */}
      
        Right-click anywhere inside this div

      {/* 2. The menu that appears at the cursor */}
      
         alert("Back clicked")}>
          Back
          ⌘[

          Forward
          ⌘]

         alert("Reload clicked")}>
          Reload
          ⌘R

  );
}
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          ContextMenuTrigger

          className

          string

          undefined

          Standard Tailwind CSS overrides for the boundary container that
          intercepts the right-click event.

          ContextMenuContent

          className

          string

          undefined

          Standard Tailwind CSS overrides for the floating menu card. By
          default, you usually want to set a width here (e.g., w-64
          ).

          ContextMenuItem

          disabled

          boolean

          false

          If true, the item becomes slightly transparent, ignores hover effects,
          and prevents onClick events from firing.

          ContextMenuItem

          onClick

          {`(e: React.MouseEvent) => void`}

          undefined

          Event handler fired when the user left-clicks the item. Clicking an
          item automatically closes the context menu.

          ContextMenuItem

          inset

          boolean

          false

          If true, adds left padding to the item. This is incredibly useful when
          aligning text items with other items that have icons.

          ContextMenuLabel

          inset

          boolean

          false

          If true, adds left padding to match the alignment of inset menu items.

          All Components

          ...props

          HTMLAttributes

          {}

          Standard HTML attributes for their respective underlying{" "}
          &lt;div&gt; elements.

---

**Component Path:** `nextjs\context-menu\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
