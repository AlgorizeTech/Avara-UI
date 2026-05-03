# Sidebar

A powerful, composable sidebar component that automatically manages mobile flyout states and desktop collapse logic.

Building a good sidebar is one of the hardest parts of dashboard development. It requires managing state across completely different structural elements, handling viewport resizing, and animating complex CSS properties smoothly. This `SidebarBlock` utilizes React Context to handle all of this internally.

## Interactive Showcase

Use the interactive preview below. It functions as a complete mini-application shell.

1. Try clicking the desktop collapse trigger (the menu icon in the top header) to see how the text hides and icons seamlessly center. Note how native tooltips appear on hover when collapsed!
2. If you view this page on a mobile device (or shrink your browser window), the sidebar automatically becomes a dismissible flyout drawer.

---

## Installation

### Copy the Component

This suite relies entirely on standard React Context and Tailwind CSS transitions. It has zero external library dependencies (other than Lucide icons used for illustration).

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/SidebarBlock.tsx`.

---

## Usage

The Sidebar uses a Provider architecture. Wrap your entire application shell in ``, place the `` adjacent to your main content ``, and drop the triggers wherever you want them to live.

```tsx

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (

          My App

            } active>Dashboard
            }>Team

          }>Preferences

          {children}

  );
}
```

## Props Reference

        Component
        Prop
        Type
        Description

          SidebarProvider

          defaultExpanded

          boolean

          Sets the initial desktop state. Defaults to true.

          SidebarProvider

          color

          string

          Applies the UI kit's theme color to active items. (e.g.{" "}
          "indigo", "rose").

          Sidebar

          variant

          "attached" | "floating"

          Determines if the sidebar is pinned flat against the edge (attached)
          or acts like an elevated, floating island panel.

          SidebarBrand

          icon

          ReactNode

          The logo icon. The text children passed to this component will
          automatically hide with a smooth transition when the sidebar
          collapses.

          SidebarGroup

          label

          string

          Optional uppercase header text for a cluster of links. Automatically
          hides when the sidebar collapses.

          SidebarItem

          icon

          ReactNode

          The icon graphic placed on the left side of the item. Automatically
          centers when collapsed.

          SidebarItem

          active

          boolean

          Highlights the item using the Provider's selected theme{" "}
          color.

          All Components

          className

          string
        
        Standard Tailwind overrides for layout, margin, or padding.

---

**Component Path:** `nextjs\sidebar\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
