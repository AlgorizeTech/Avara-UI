# Menubar

A visually persistent, OS-style menu component that provides quick access to a consistent set of commands.

Native application menus have complex, unwritten interaction rules. If you click to open "File", and then hover your mouse horizontally over "Edit", the "Edit" menu should instantly open while "File" closes. Building this from scratch is notoriously difficult. This `MenubarBlock` solves all of that natively in React using Context, providing a 100% dependency-free implementation.

## Interactive Showcase

Interact with the simulated application header below. Try clicking a menu to open it, and then simply hover over the adjacent triggers to see the seamless switching behavior. Clicking outside the menu or hitting `Escape` will close it.

---

## Installation

### Copy the Component

This entire suite is completely dependency-free. It uses standard React Context to share state between the triggers and the dropdowns, meaning it adds almost zero weight to your JavaScript bundle compared to heavy external UI libraries.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/MenubarBlock.tsx`.

---

## Usage

The Menubar uses a highly composable structure. Wrap everything in ``, create columns with ``, set your button with ``, and list your actions inside ``.

```tsx

export default function TopNav() {
  return (

        File
        
           console.log('New')}>
            New Tab ⌘T

            Share

            Print... ⌘P

        Edit
        
          Copy
          Paste

  );
}
```

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
