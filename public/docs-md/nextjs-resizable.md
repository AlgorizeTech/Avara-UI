# Resizable

A high-performance system for building resizable panel layouts, complete with keyboard accessibility and nested group support.

Most UI frameworks rely on massive, complex external libraries to handle the math of dragging panels. This `ResizableBlock` uses a sophisticated direct-DOM manipulation engine instead. By directly writing to `element.style.flex`, it bypasses the React render cycle during drag operations, resulting in **zero-latency, 60fps butter-smooth resizing** without sacrificing declarative React composition.

## Examples

Drag any handle to resize. Click a handle to focus it, then use the arrow keys — the engine ships with the ARIA separator semantics and keyboard stepping already wired.

export const usageDefault = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

export default function StudioLayout() {
  return (
    // The outermost container must have a defined height.

          {/* Groups nest freely — this one splits the main area vertically. */}

  );
}`;

export const usageHorizontal = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

export default function HorizontalSplit() {
  return (

  );
}`;

export const usageVertical = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

export default function VerticalSplit() {
  // \`direction\` sets the flex axis of the group and the drag axis of every
  // handle inside it.
  return (

  );
}`;

export const usageNoGrip = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

export default function HairlineDivider() {
  return (

      {/* Omit \`withHandle\` for a bare 1px divider — still draggable, still
          keyboard accessible, just without the visible grip. */}

  );
}`;

export const usageConstraints = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

export default function ConstrainedSidebar() {
  return (
    
      {/* Percentages of the group. The engine clamps the drag so a panel can
          never escape its bounds. */}

  );
}`;

## Installation

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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
