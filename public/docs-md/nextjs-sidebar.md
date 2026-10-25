export const metadata = docsPageMetadata("sidebar");

# Sidebar

A powerful, composable sidebar component that automatically manages mobile flyout states and desktop collapse logic.

Building a good sidebar is one of the hardest parts of dashboard development. It requires managing state across completely different structural elements, handling viewport resizing, and animating complex CSS properties smoothly. This `SidebarBlock` utilizes React Context to handle all of this internally.

Click the collapse trigger in each preview's header to watch the labels hide and the icons centre — hover a collapsed icon and its label appears in a Tooltip. Switch a preview to the phone size and the sidebar becomes a dismissible flyout instead.

{/* Both examples are the same app shell; only where the rail starts differs. */}

export const sidebarUsage = ({ name, expanded, note }) => `"use client";

export default function ${name}() {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    // ${note}

          }>
            Nexus UI

          {/* SidebarGroup labels fade out when the rail collapses */}
          
            }
              active={activeRoute === "Dashboard"}
              onClick={() => setActiveRoute("Dashboard")}
            >
              Dashboard
            
            }
              active={activeRoute === "Customers"}
              onClick={() => setActiveRoute("Customers")}
            >
              Customers
            
            }
              active={activeRoute === "Billing"}
              onClick={() => setActiveRoute("Billing")}
            >
              Billing

            }>Help Center
            }>Settings

          }>Log out

            {/* Opens the flyout under md; collapses the rail above it */}

            {activeRoute}

        {/* Your page goes here */}

            Main Content Area

  );
}`;

export const usageDefault = sidebarUsage({
  name: "AppLayout",
  expanded: true,
  note: "The provider owns expanded/mobile state for every part below it.",
});

export const usageCollapsed = sidebarUsage({
  name: "RailLayout",
  expanded: false,
  note: "Start as an icon rail — labels appear as tooltips on hover.",
});

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/sidebar.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/sidebar
```

## Examples

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

**Component Path:** `[framework]\sidebar\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
