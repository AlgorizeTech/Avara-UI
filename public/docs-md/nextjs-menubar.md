# Menubar

A visually persistent, OS-style menu component that provides quick access to a consistent set of commands.

Native application menus have complex, unwritten interaction rules. If you click to open "File", and then hover your mouse horizontally over "Edit", the "Edit" menu should instantly open while "File" closes. Building this from scratch is notoriously difficult. This `MenubarBlock` solves all of that natively in React using Context, providing a 100% dependency-free implementation.

Click a trigger to open its menu, then hover the neighbours — they swap instantly, exactly like a native app.

export const usageDefault = `"use client";

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

export const usageApp = `"use client";

/** Every row carries one, so no row needs \`inset\` to fake the gutter. */
const icon = "w-4 h-4 mr-2 shrink-0";
/** Marks the active theme; ml-auto keeps it clear of the label. */
const activeMark = "ml-auto w-4 h-4 shrink-0 text-indigo-500";

export default function AppWindow() {
  const [theme, setTheme] = useState("System");

  // No overflow-hidden on the frame: it would crop any menu taller or wider
  // than the window. The header rounds its own top corners instead.
  return (
    
      {/* Native OS-style Application Header */}

          {/* 1. FILE MENU */}
          
            Nexus UI

                 About Nexus

                 Preferences...{" "}
                ⌘,

                 Hide Nexus{" "}
                ⌘H

                 Hide Others{" "}
                ⇧⌘H

                 Show All

                 Quit Nexus{" "}
                ⌘Q

          {/* 2. EDIT MENU */}
          
            Edit

                 Undo{" "}
                ⌘Z

                 Redo{" "}
                ⇧⌘Z

                 Cut{" "}
                ⌘X

                 Copy{" "}
                ⌘C

                 Paste{" "}
                ⌘V

          {/* 3. VIEW (THEME) MENU */}
          
            View
            
              {/* Labels sit flush left; the rows carry the icon gutter. */}
              Theme Options
               setTheme("Light")}>
                 Light Mode
                {theme === "Light" && }
              
               setTheme("Dark")}>
                 Dark Mode
                {theme === "Dark" && }
              
               setTheme("System")}>
                 System Default
                {theme === "System" && }

                 Toggle Fullscreen{" "}
                F11

          {/* 4. PROFILES MENU */}
          
            Profiles
            
              Active Account
              
                 Andy Bernard

                 Add Account...

                 Manage Profiles

      {/* Fake App Body */}

          Application Canvas

          Click the menus at the top to test the interaction states and
          cross-menu hover switching.

  );
}`;

## Installation

## Examples

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
