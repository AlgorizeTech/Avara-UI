# Menubar

A visually persistent, OS-style menu component that provides quick access to a consistent set of commands.

Native application menus have complex, unwritten interaction rules. If you click to open "File", and then hover your mouse horizontally over "Edit", the "Edit" menu should instantly open while "File" closes. Building this from scratch is notoriously difficult. This `MenubarBlock` solves all of that natively in React using Context, providing a 100% dependency-free implementation.

## Examples

Click a trigger to open its menu, then hover the neighbours — they swap instantly, exactly like a native app.

export const usageDefault = `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";

export default function TopNav() {
  return (
    
      {/* Every MenubarMenu needs a unique \`value\` — the context tracks it */}
      
        File
        
          {/* shrink-0 keeps the icon square when a narrow menu squeezes the row */}
           console.log("New Tab")}>
             New Tab

             New Window

             Open File…

        Edit

             Undo

             Redo

             Cut

  );
}`;

export const usageApp = `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";

const icon = "w-4 h-4 mr-2 shrink-0";

export default function AppWindow() {
  return (
    {/* No overflow-hidden here: it would crop any menu that opens past the
        window. The header rounds its own top corners instead. */}
    
      {/* Strip the Menubar's own chrome so it reads as part of the title bar */}

            Nexus UI

                 About Nexus

                 Preferences…{" "}
                ⌘,

            Edit

                 Undo ⌘Z

            Profiles
            {/* align anchors the dropdown to the trigger: start | center | end */}
            
              Active Account
              
                 Andy Bernard

                 Add Account…

                 Manage Profiles

      {/* your app canvas */}
    
  );
}`;

## Installation

## Features
Learn about the Menubar's desktop-style navigation features, supporting complex nested menus, radio groups, and checkboxes.

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
        Description

          MenubarMenu

          value

          string

          Required. A unique identifier for the menu column
          (e.g., "file"). Used by the internal state context to
          track which dropdown is open.

          MenubarContent

          align

          "start" | "center" | "end"

          Determines how the dropdown is anchored relative to its trigger
          button. Defaults to "start".

          MenubarItem

          inset

          boolean

          Adds extra left-padding to the item, aligning text cleanly when
          adjacent items use icons.

          MenubarItem

          disabled

          boolean

          Dims the item, changes the cursor, and completely disables pointer
          events and click handlers.

          MenubarItem

          onClick

          {`() => void`}

          Fires your custom action. The menu will{" "}
          automatically close after the click.

          MenubarLabel

          inset

          boolean

          Aligns the label text with inset menu items.

          All Components

          className

          string

          Every component supports custom Tailwind classes for easy styling
          overrides.

---

**Component Path:** `[framework]\menubar\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
