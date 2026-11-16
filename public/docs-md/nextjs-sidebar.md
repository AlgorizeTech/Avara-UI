---
title: "Shadcn Sidebar"
description: "A composable sidebar that handles the mobile flyout and the desktop collapse, with a collapsed icon-rail variant. Free shadcn/ui Sidebar block."
url: https://avaraui.com/docs/nextjs/sidebar
---

# Shadcn Sidebar

A powerful, composable sidebar component that automatically manages mobile flyout states and desktop collapse logic.

Building a good sidebar is one of the hardest parts of dashboard development. It requires managing state across completely different structural elements, handling viewport resizing, and animating complex CSS properties smoothly. This `SidebarBlock` utilizes React Context to handle all of this internally.

Click the collapse trigger in each preview's header to watch the labels hide and the icons centre — hover a collapsed icon and its label appears in a [Tooltip](https://avaraui.com/docs/nextjs/tooltip). Switch a preview to the phone size and the sidebar becomes a dismissible flyout instead.

## Categorized Dashboard Sidebar

Modern SaaS sidebar layout with workspace switcher, collapsible category groups, counter badges, and user profile footer.

- Use `variant="categorized"` for a floating rounded store card sidebar with workspace switcher, collapsible categories, and notification badges.

```tsx
"use client";

import {
  SidebarProvider,
  CategorizedSidebar,
  MobileSidebarTrigger,
} from "@/components/custom/blocks/SidebarBlock";
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Bell,
  Search,
} from "lucide-react";
import { useState } from "react";

const GROUPS = [
  {
    label: "MENU",
    items: [
      { id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: "Products", label: "Products", icon: <Box className="w-4 h-4" />, badge: 4 },
      { id: "Orders", label: "Orders & Invoices", icon: <ShoppingBag className="w-4 h-4" />, badge: 8 },
      { id: "Analytics", label: "Sales Analytics", icon: <BarChart3 className="w-4 h-4" /> },
      { id: "Insights", label: "Customer Insights", icon: <Users className="w-4 h-4" /> },
      { id: "Reports", label: "Reports", icon: <BarChart3 className="w-4 h-4" />, badge: 2 },
    ],
  },
  {
    label: "OTHERS",
    items: [
      { id: "Settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
      { id: "Team", label: "Team Members", icon: <Users className="w-4 h-4" />, badge: 3 },
      { id: "Help", label: "Help Center", icon: <HelpCircle className="w-4 h-4" /> },
    ],
  },
];

export default function CategorizedSidebarDemo() {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    <SidebarProvider defaultExpanded={true}>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <CategorizedSidebar
          workspace={{
            name: "Avara UI",
            badge: "Pro",
            isPrivate: true,
            user: "Noah Bellingham",
            userEmail: "noah@avara.design",
          }}
          groups={GROUPS}
          activeRoute={activeRoute}
          onRouteChange={setActiveRoute}
        />
        <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border">
            <div className="flex items-center gap-3">
              <MobileSidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-semibold text-foreground">{activeRoute}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="w-8 h-8 rounded-full bg-muted" />
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="w-full h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
              Main Content Area
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
```

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

### Curved

Floating organic curved wave rail sidebar with smooth bezier S-curve contours, elevated active squircle, and tooltip labels.

- Use `variant="curved"` for an organic curved wave rail with smooth S-curves, elevated active card, and tooltip labels.

```tsx
"use client";

import {
  SidebarProvider,
  CurvedSidebar,
  MobileSidebarTrigger,
} from "@/components/custom/blocks/SidebarBlock";
import {
  LayoutGrid,
  User,
  Clock,
  Bell,
  Calendar,
  MessageSquare,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const WAVE_ITEMS = [
  { id: "Dashboard", label: "Dashboard", icon: <LayoutGrid className="w-5 h-5" /> },
  { id: "Profile", label: "User Profile", icon: <User className="w-5 h-5" /> },
  {
    id: "TimeTracker",
    label: "Time Tracker",
    icon: <Clock className="w-5 h-5" />,
  },
  { id: "Notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
  { id: "Calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
  { id: "Messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
  { id: "Notes", label: "Notes & Tasks", icon: <FileText className="w-5 h-5" /> },
  { id: "Help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" /> },
];

export default function CurvedSidebarDemo() {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#f6f7fb] dark:bg-background">
        <CurvedSidebar
          items={WAVE_ITEMS}
          activeRoute={activeRoute}
          onRouteChange={setActiveRoute}
        />
        <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
          <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border/60">
            <div className="flex items-center gap-3">
              <MobileSidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-bold text-foreground">{activeRoute}</h1>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            {/* Main content goes here */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
```

### Sidebar

Wrap the shell in `SidebarProvider`, then compose header, groups and footer.

- `color` on the provider themes every active item below it.
- `active` on a `SidebarItem` is what highlights it in that colour.
- `label` on a `SidebarGroup` is the uppercase cluster header — it hides itself when collapsed.

```tsx
"use client";

import {
  MobileSidebarTrigger,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/custom/blocks/SidebarBlock";
import { Bell, CreditCard, HelpCircle, Hexagon, LayoutDashboard, LogOut, Search, Settings, Users } from "lucide-react";
import { useState } from "react";

export default function AppLayout() {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    // The provider owns expanded/mobile state for every part below it.
    <SidebarProvider defaultExpanded={true}>
      <Sidebar variant="attached">
        <SidebarHeader>
          <SidebarBrand icon={<Hexagon className="w-6 h-6 text-primary" fill="currentColor" />}>
            Nexus UI
          </SidebarBrand>
        </SidebarHeader>

        <SidebarContent>
          {/* SidebarGroup labels fade out when the rail collapses */}
          <SidebarGroup label="Platform">
            <SidebarItem
              icon={<LayoutDashboard className="w-5 h-5" />}
              active={activeRoute === "Dashboard"}
              onClick={() => setActiveRoute("Dashboard")}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              icon={<Users className="w-5 h-5" />}
              active={activeRoute === "Customers"}
              onClick={() => setActiveRoute("Customers")}
            >
              Customers
            </SidebarItem>
            <SidebarItem
              icon={<CreditCard className="w-5 h-5" />}
              active={activeRoute === "Billing"}
              onClick={() => setActiveRoute("Billing")}
            >
              Billing
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup label="Support">
            <SidebarItem icon={<HelpCircle className="w-5 h-5" />}>Help Center</SidebarItem>
            <SidebarItem icon={<Settings className="w-5 h-5" />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarItem icon={<LogOut className="w-5 h-5" />}>Log out</SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
          <div className="flex items-center gap-4">
            {/* Opens the flyout under md; collapses the rail above it */}
            <MobileSidebarTrigger className="md:hidden" />
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">{activeRoute}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="w-8 h-8 rounded-full bg-muted" />
          </div>
        </header>

        {/* Your page goes here */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="w-full h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
            Main Content Area
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="w-full h-48 bg-muted rounded-xl" />
            <div className="w-full h-48 bg-muted rounded-xl" />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
```

### Collapsed rail

- Set `defaultExpanded={false}` to boot straight into the icon rail — item icons centre themselves and labels become hover tooltips.

```tsx
"use client";

import {
  MobileSidebarTrigger,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/custom/blocks/SidebarBlock";
import { Bell, CreditCard, HelpCircle, Hexagon, LayoutDashboard, LogOut, Search, Settings, Users } from "lucide-react";
import { useState } from "react";

export default function RailLayout() {
  const [activeRoute, setActiveRoute] = useState("Dashboard");

  return (
    // Start as an icon rail — labels appear as tooltips on hover.
    <SidebarProvider defaultExpanded={false}>
      <Sidebar variant="attached">
        <SidebarHeader>
          <SidebarBrand icon={<Hexagon className="w-6 h-6 text-primary" fill="currentColor" />}>
            Nexus UI
          </SidebarBrand>
        </SidebarHeader>

        <SidebarContent>
          {/* SidebarGroup labels fade out when the rail collapses */}
          <SidebarGroup label="Platform">
            <SidebarItem
              icon={<LayoutDashboard className="w-5 h-5" />}
              active={activeRoute === "Dashboard"}
              onClick={() => setActiveRoute("Dashboard")}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              icon={<Users className="w-5 h-5" />}
              active={activeRoute === "Customers"}
              onClick={() => setActiveRoute("Customers")}
            >
              Customers
            </SidebarItem>
            <SidebarItem
              icon={<CreditCard className="w-5 h-5" />}
              active={activeRoute === "Billing"}
              onClick={() => setActiveRoute("Billing")}
            >
              Billing
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup label="Support">
            <SidebarItem icon={<HelpCircle className="w-5 h-5" />}>Help Center</SidebarItem>
            <SidebarItem icon={<Settings className="w-5 h-5" />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarItem icon={<LogOut className="w-5 h-5" />}>Log out</SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
          <div className="flex items-center gap-4">
            {/* Opens the flyout under md; collapses the rail above it */}
            <MobileSidebarTrigger className="md:hidden" />
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">{activeRoute}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="w-8 h-8 rounded-full bg-muted" />
          </div>
        </header>

        {/* Your page goes here */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="w-full h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
            Main Content Area
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="w-full h-48 bg-muted rounded-xl" />
            <div className="w-full h-48 bg-muted rounded-xl" />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
```

## Props Reference

| Component | Prop | Type | Description |
| --- | --- | --- | --- |
| `SidebarProvider` | `defaultExpanded` | `boolean` | Sets the initial desktop state. Defaults to `true`. |
| `SidebarProvider` | `color` | `string` | Applies the UI kit's theme color to active items. (e.g. `"indigo"`, `"rose"`). |
| `Sidebar` | `variant` | `"attached" \| "floating"` | Determines if the sidebar is pinned flat against the edge (attached) or acts like an elevated, floating island panel. |
| `SidebarBrand` | `icon` | `ReactNode` | The logo icon. The text children passed to this component will automatically hide with a smooth transition when the sidebar collapses. |
| `SidebarGroup` | `label` | `string` | Optional uppercase header text for a cluster of links. Automatically hides when the sidebar collapses. |
| `SidebarItem` | `icon` | `ReactNode` | The icon graphic placed on the left side of the item. Automatically centers when collapsed. |
| `SidebarItem` | `active` | `boolean` | Highlights the item using the Provider's selected theme `color`. |
| `CategorizedSidebar` | `groups` | `SidebarRouteGroup[]` | Array of categories/groups with label, collapsible state, and route items (id, label, icon, badge). |
| `CategorizedSidebar` | `workspace` | `SidebarWorkspace` | Workspace details including name, plan badge (Pro/Free), privacy, user name, and email. |
| `CategorizedSidebar` | `activeRoute` | `string` | The ID of the currently selected route. |
| `CategorizedSidebar` | `onRouteChange` | `(routeId: string) => void` | Callback fired when a route is clicked. |
| `CurvedSidebar` | `items` | `WaveSidebarItem[]` | Array of navigation items with id, label, icon, and optional badge/badgeClassName. |
| `CurvedSidebar` | `activeRoute` | `string` | The ID of the currently selected route. |
| `CurvedSidebar` | `onRouteChange` | `(routeId: string) => void` | Callback fired when an item is clicked. |
| `CurvedSidebar` | `waveColor` | `string` | Optional custom color class. Defaults to theme primary. |
| All Components | `className` | `string` | Standard Tailwind overrides for layout, margin, or padding. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/sidebar
