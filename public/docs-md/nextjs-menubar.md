# Menubar

A visually persistent, OS-style menu component that provides quick access to a consistent set of commands.

Native application menus have complex, unwritten interaction rules. If you click to open "File", and then hover your mouse horizontally over "Edit", the "Edit" menu should instantly open while "File" closes. Building this from scratch is notoriously difficult. This `MenubarBlock` solves all of that natively in React using Context, providing a 100% dependency-free implementation.

## Examples

Click a trigger to open its menu, then hover the neighbours — they swap instantly, exactly like a native app. The first example's **Code** tab contains the full component source.

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
        
           console.log("New Tab")}>New Tab
          New Window
          Open File…

        Edit
        
          Undo
          Redo
          Cut

  );
}`;

export const usageShortcuts = `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";

export default function EditMenu() {
  return (

        Edit
        
          {/* MenubarShortcut right-aligns itself inside the item */}
          
            Undo ⌘Z

            Redo ⇧⌘Z

            Cut ⌘X

            Copy ⌘C

            Paste ⌘V

  );
}`;

export const usageIcons = `import { useState } from "react";

export default function ViewMenu() {
  const [theme, setTheme] = useState("System");

  return (

        View
        
          {/* inset lines the label up with the icon-bearing items below */}
          Theme Options

           setTheme("Light")}>
             Light Mode
            {theme === "Light" && (
              Active
            )}
          
           setTheme("Dark")}>
             Dark Mode
            {theme === "Dark" && (
              Active
            )}
          
           setTheme("System")}>
             System Default
            {theme === "System" && (
              Active
            )}

  );
}`;

export const usageDisabled = `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";

export default function FileMenu() {
  return (

        File
        
          Save

          {/* disabled dims the row and kills pointer events + onClick */}
          Save All

          {/* className styles a single destructive row */}
          
            Quit Nexus ⌘Q

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

export default function AppWindow() {
  return (
    
      {/* Strip the Menubar's own chrome so it reads as part of the title bar */}

            Nexus UI
            
              About Nexus

                Preferences… ⌘,

            Edit

                Undo ⌘Z

            Profiles
            {/* align anchors the dropdown to the trigger: start | center | end */}
            
              Active Account
              
                 Andy Bernard

              Add Account…

      {/* your app canvas */}
    
  );
}`;

## Installation

### Copy the Component

This entire suite is completely dependency-free. It uses standard React Context to share state between the triggers and the dropdowns, meaning it adds almost zero weight to your JavaScript bundle compared to heavy external UI libraries.

Create a new file at `components/custom/blocks/MenubarBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

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

**Component Path:** `nextjs\menubar\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
