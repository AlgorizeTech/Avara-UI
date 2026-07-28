# Resizable

A high-performance system for building resizable panel layouts, complete with keyboard accessibility and nested group support.

Most UI frameworks rely on massive, complex external libraries to handle the math of dragging panels. This `ResizableBlock` uses a sophisticated direct-DOM manipulation engine instead. By directly writing to `element.style.flex`, it bypasses the React render cycle during drag operations, resulting in **zero-latency, 60fps butter-smooth resizing** without sacrificing declarative React composition.

## Features
Learn about the Resizable component's panel layout capabilities, supporting drag handles, collapsible panes, and nested groups.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Grab the vertical or horizontal handle bars below to resize the panels.

**Accessibility built-in:** Try clicking on one of the grab handles to focus it, and then use the `ArrowLeft`, `ArrowRight`, `ArrowUp`, or `ArrowDown` keys on your keyboard to resize the panels precisely!

## Installation

### Copy the Component

This engine is **100% dependency-free**. It relies entirely on standard React refs and browser DOM APIs for calculations and accessibility attributes.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ResizableBlock.tsx`.

---

## Usage

This component utilizes highly composable parts. A `` establishes the flex direction, and contains `` elements separated by `` elements.

You can nest groups infinitely to build complex grids (like VS Code or complex dashboards).

```tsx

export default function DashboardLayout() {
  return (
    // The outermost container must have a defined height

          Navigation Links

          Main Application Data

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

          ResizablePanelGroup

          direction

          "horizontal" | "vertical"

          "horizontal"

          The layout orientation of the group. Panels inside will stack either
          side-by-side or top-to-bottom.

          ResizablePanel

          defaultSize

          number

          50

          The initial size of the panel, represented as a relative percentage of
          its parent container.

          ResizablePanel

          minSize

          number

          0

          The minimum allowed size (percentage) the panel can be shrunk to.

          ResizablePanel

          maxSize

          number

          100

          The maximum allowed size (percentage) the panel can be grown to.

          ResizableHandle

          withHandle

          boolean

          false

          If true, renders a small visual grip icon in the center of the
          separator track.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides. Useful for adding specific background
          colors or padding to panels.

---

**Component Path:** `nextjs\resizable\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
