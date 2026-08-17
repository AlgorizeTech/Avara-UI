# Context Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.

Building a Context Menu is difficult because it involves intercepting the browser's native right-click event (`onContextMenu`) and rendering an overlay component precisely at the user's mouse coordinates without it getting clipped by CSS `overflow` properties.

This `ContextMenuBlock` is a **100% dependency-free** solution. It uses React's `createPortal` to escape DOM limitations, and includes highly optimized boundary-collision logic to guarantee the menu never opens off the edge of the user's screen.

## Examples

Right-click (or long-press on touch) inside each dashed box. Try it near the edges — the boundary maths keeps the menu on screen.

export const usageDefault = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";

export default function RightClickArea() {
  return (
    
      {/* This whole element intercepts the right-click */}
      
        Right-click anywhere inside this box

      {/* Rendered in a portal at the cursor position */}
      
         console.log("Edit")}>Edit File
         console.log("Duplicate")}>Duplicate
         console.log("Rename")}>Rename

  );
}`;

export const usageFull = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";

export default function DocumentMenu() {
  const run = (action: string) => console.log(action);

  return (

        Right-click anywhere inside this box

        Document Actions
         run("Edit")}>
          
          Edit File
          ⌘E
        
         run("Download")}>
          
          Download PDF
          ⌘S
        
         run("Share")}>
          
          Share Link

        Clipboard
         run("Copy")}>
          
          Copy
          ⌘C

        {/* disabled dims the row and swallows the click */}

          Cut
          ⌘X

        {/* className restyles a single destructive row */}
         run("Delete")}
          className="text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          
          Delete
          ⌘⌫

  );
}`;

export const usageInset = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";

export default function ViewMenu() {
  const run = (action: string) => console.log(action);

  return (

        Right-click anywhere inside this box

        {/* inset pads the left edge so text-only rows line up with icon rows */}
        View
         run("List")}>List
         run("Grid")}>Grid

         run("Download")}>
          
          Download PDF

  );
}`;

## Installation

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
