export const metadata = docsPageMetadata("resizable");

# Resizable

A high-performance system for building resizable panel layouts, complete with keyboard accessibility and nested group support.

Most UI frameworks rely on massive, complex external libraries to handle the math of dragging panels. This `ResizableBlock` uses a sophisticated direct-DOM manipulation engine instead. By directly writing to `element.style.flex`, it bypasses the React render cycle during drag operations, resulting in **zero-latency, 60fps butter-smooth resizing** without sacrificing declarative React composition.

Drag any handle to resize. Click a handle to focus it, then use the arrow keys — the engine ships with the ARIA separator semantics and keyboard stepping already wired.

export const paneHelper = `// Panel bodies — swap these for your own content.
function Pane({ label }: { label: string }) {
  return (
    
      {label}
    
  );
}`;

export const splitPanes = `${paneHelper}

const PanelOne = () => ;
const PanelTwo = () => ;`;

export const sidebarPanes = `${paneHelper}

const Sidebar = () => ;
const Editor = () => ;`;

export const studioPanes = `function Explorer() {
  return (

        Explorer

  );
}

function Editor() {
  return (

        page.tsx
        
          Active

          export default function{" "}
          Page() {"{"}
        
        return (
        
          &lt;div{" "}
          className=
          &quot;flex h-full w-full flex-col p-4&quot;
          &gt;

          &lt;h2{" "}
          className=
          &quot;text-2xl font-semibold&quot;
          &gt;
          John Doe
          &lt;/h2&gt;

          {"{/* Drag handle bars to resize panels live */}"}
        
        &lt;/div&gt;
        );
        {"}"}

  );
}

function TerminalPane() {
  return (

        Terminal
        bash

        project@app:~${" "}
        npm run dev
        
        ✓ Ready in 850ms

  );
}`;

export const usageDefault = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

${studioPanes}

export default function StudioLayout() {
  return (
    // Simulated Studio Window
    
      {/* Fake Header Bar */}

            Nexus Studio

          Resizable Layout

      {/* Main Resizable Workspace */}

  );
}`;

export const usageHorizontal = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

${splitPanes}

export default function HorizontalSplit() {
  // A panel group is height:100%, so it collapses to nothing unless an ancestor
  // is sized. Give it a fixed height, or h-screen to fill the viewport.
  return (

  );
}`;

export const usageVertical = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

${splitPanes}

export default function VerticalSplit() {
  // \`direction\` sets the flex axis of the group and the drag axis of every
  // handle inside it.
  // A panel group is height:100%, so it collapses to nothing unless an ancestor
  // is sized. Give it a fixed height, or h-screen to fill the viewport.
  return (

  );
}`;

export const usageConstraints = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

${sidebarPanes}

export default function ConstrainedSidebar() {
  // A panel group is height:100%, so it collapses to nothing unless an ancestor
  // is sized. Give it a fixed height, or h-screen to fill the viewport.
  return (

        {/* Percentages of the group. The engine clamps the drag so a panel can
            never escape its bounds. */}

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/resizable
```

## Examples

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

**Component Path:** `[framework]\resizable\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
