# Dock

A premium, macOS-inspired navigation dock featuring real-time physics magnification, floating label tooltips, active application indicators, and notification badges. Highly customizable via direct layout and physics props, it adapts seamlessly between desktop floating tooltips and touch-safe mobile layouts.

## Interactive Showcase

Hover across the dock icons on desktop to experience unclipped Framer Motion magnification physics. Click any icon to switch the active indicator dot.

## Installation

### Dependencies

This component requires **Framer Motion** for real-time cursor tracking and spring physics, and **Lucide React** for UI icons.

```bash
npm install framer-motion lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/DockBlock.tsx.

## Implementation

```tsx

export default function BottomNav() {
  const dockItems = [
    { id: "home", label: "Home", icon: , isActive: true },
    { id: "mail", label: "Mail", icon: , badge: "3" },
    { id: "terminal", label: "Terminal", icon:  },
    { id: "settings", label: "Settings", icon:  },
  ];

  return (

  );
}
```

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          Dock

          items

          DockItem[]

          Required

          An array of data objects defining the icons, labels, onClick
          callbacks, badges, and active states for each item.

          Dock

          containerHeight

          number | string

          64

          The height of the glassmorphic background bar (in pixels if passed as
          a number, or valid CSS string e.g., "4.5rem").

          Dock

          gap

          number

          12

          The horizontal gap spacing (in pixels) between resting dock icon
          buttons. Automatically compresses on mobile viewports.

          Dock

          baseSize

          number

          48

          The resting width and height (in pixels) of each dock icon button
          before any hover interaction occurs.

          Dock

          magnification

          number

          80

          The maximum expanded width and height (in pixels) an icon reaches when
          the mouse cursor is directly over its center.

          Dock

          distance

          number

          140

          The pixel distance radius around the mouse cursor within which
          neighboring icons will begin to magnify.

          Dock

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost glassmorphic
          dock wrapper container.

          DockItem

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          layout animations.

          DockItem

          label

          string

          Required

          The text displayed inside the floating tooltip tag above the icon when
          hovered.

          DockItem

          icon

          React.ReactNode

          Required

          A React element or Lucide icon component to render inside the button
          (should use classes like w-full h-full).

          DockItem

          onClick

          () =&gt; void

          undefined

          Optional callback function fired whenever the user clicks on the
          specific dock icon button.

          DockItem

          isActive

          boolean

          false

          When set to true, displays a smooth animated dot
          indicator beneath the icon button.

          DockItem

          badge

          string | number

          undefined

          Optional notification badge string or number (e.g., "3", "NEW")
          rendered as a pulsing red pill in the top-right corner.

---

**Component Path:** `nextjs\dock\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
