# Sidebar

A powerful, composable sidebar component that automatically manages mobile flyout states and desktop collapse logic.

Building a good sidebar is one of the hardest parts of dashboard development. It requires managing state across completely different structural elements, handling viewport resizing, and animating complex CSS properties smoothly. This `SidebarBlock` utilizes React Context to handle all of this internally.

Click the collapse trigger in each preview's header to watch the labels hide and the icons centre — hover a collapsed icon and its label appears in a Tooltip. Switch a preview to the phone size and the sidebar becomes a dismissible flyout instead.

export const usageDefault = `export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    // The provider owns expanded/mobile state for every part below it.

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
            
            }>Billing

            }>Settings

          }>Log out

          {/* Opens the flyout under md; collapses the rail above it */}

          {activeRoute}

        {children}

  );
}`;

export const usageCollapsed = `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/custom/blocks/SidebarBlock";

export default function RailLayout({ children }: { children: React.ReactNode }) {
  return (
    // Start as an icon rail — labels appear as tooltips on hover.

            } active>
              Dashboard
            
            }>Customers

        {children}

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/sidebar
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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
