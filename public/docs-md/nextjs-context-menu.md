# Context Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.

Building a Context Menu is difficult because it involves intercepting the browser's native right-click event (`onContextMenu`) and rendering an overlay component precisely at the user's mouse coordinates without it getting clipped by CSS `overflow` properties.

This `ContextMenuBlock` is a **100% dependency-free** solution. It uses React's `createPortal` to escape DOM limitations, and includes highly optimized boundary-collision logic to guarantee the menu never opens off the edge of the user's screen.

Right-click (or long-press on touch) inside each dashed box. Try it near the edges — the boundary maths keeps the menu on screen.

export const usageFull = `"use client";

export default function DocumentMenu() {
  // The live preview raises a toast here; this logs instead so the snippet
  // needs nothing beyond the context menu itself.
  const run = (action: string) => console.log(action);

  return (

            Click / Right-Click / Touch Area

            Click or right-click (long-press on mobile) inside this box to open
            the context menu.

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
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          
          Delete
          ⌘⌫

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/context-menu
```

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

          ContextMenu

          color

          "primary" | "indigo" | "rose" | "emerald" | "blue" | "zinc" | string

          "primary"

          Applies theme accent color to item hover states and trigger container focus/hover borders. Accepts preset named themes or valid hex strings.

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

**Component Path:** `[framework]\context-menu\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
