---
title: "Shadcn Breadcrumb"
description: "A navigational aid that helps users understand their current location within a website's hierarchy. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/breadcrumb
---

# Shadcn Breadcrumb

A navigational aid that helps users understand their current location within a website's hierarchy.

This component features four distinct visual variants, seamless color theming, and **built-in automatic path truncation**. If the user's path is too deep, it automatically collapses the middle items behind a clickable ellipsis (`...`) button.

You describe the trail as an `items` array; the component handles dividers, the active item and truncation.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/breadcrumb

**When to use it.** A trail showing where the reader is in a hierarchy. One is composed from parts and animates as the route changes; the other is driven by an `items` array and offers four styles.

**Gotchas:**

- Each is its own registry item with its own API: install only the one you picked.
- The flow breadcrumb animates by item key, so give every `BreadcrumbItem` its route as a stable `key`, and put its separator inside the item.
- The flow breadcrumb's `render` prop on `BreadcrumbLink` is how you use your router's Link; the other takes `linkComponent`.

### The 2 variants

1. **Flow breadcrumb** (`flow`): Composable parts; items fade in and out as the route changes and the rest slide into place.
   - Live: https://avaraui.com/view/breadcrumb/flow
   - Best for: an app whose path changes without a page reload; a long path that collapses behind an ellipsis
   - Avoid if: you want to describe the trail as a plain array; you want slash, solid or ghost styles
   - Traits: composable, animated route changes, hover, tap and keyboard ellipsis, no motion library
   - Install: `npx shadcn@latest add @avara-ui/breadcrumb-flow`
   - Docs: https://avaraui.com/docs/nextjs/breadcrumb#flow-breadcrumb
2. **Breadcrumb** (`block`): An `items` array with four styles (classic, slash, solid, ghost), icons and automatic collapsing.
   - Live: https://avaraui.com/view/breadcrumb/block
   - Best for: a static site or docs where the trail is known per page; a quick drop-in with icons
   - Avoid if: the trail changes live and you want it to animate
   - Traits: items array, four styles, icons, click-to-expand ellipsis
   - Install: `npx shadcn@latest add @avara-ui/breadcrumb`
   - Docs: https://avaraui.com/docs/nextjs/breadcrumb#breadcrumb

## Flow breadcrumb

Composed from parts. Items fade in and out as the route changes and the rest slide into place; past `maxItems` the middle collapses behind an ellipsis.

- Give each `BreadcrumbItem` its page as a stable `key`, with its `BreadcrumbSeparator` inside it, so it can animate.
- `maxItems` sets the visible slots; the ellipsis opens on hover, tap, Enter, Space or ArrowDown.

```tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/custom/blocks/BreadcrumbFlowBlock";
import { ChevronRight, FileText, Folder, Home } from "lucide-react";
import { useState } from "react";

type Page = { label: string; children?: string[] };

// A small site, by page id. Opening a page adds it to the trail.
const site: Record<string, Page> = {
  home: { label: "Home", children: ["projects", "team", "settings"] },
  projects: { label: "Projects", children: ["nexus", "atlas", "orbit"] },
  team: { label: "Team", children: ["members", "roles"] },
  settings: { label: "Settings", children: ["profile", "billing", "security"] },
  nexus: { label: "Nexus UI Kit", children: ["components", "tokens", "changelog"] },
  atlas: { label: "Atlas Dashboard" },
  orbit: { label: "Orbit Mobile" },
  members: { label: "Members" },
  roles: { label: "Roles" },
  profile: { label: "Profile" },
  billing: { label: "Billing" },
  security: { label: "Security" },
  components: { label: "Components", children: ["navigation", "forms", "data-display"] },
  tokens: { label: "Design Tokens" },
  changelog: { label: "Changelog" },
  navigation: { label: "Navigation", children: ["breadcrumb", "tabs", "sidebar"] },
  forms: { label: "Forms" },
  "data-display": { label: "Data Display" },
  breadcrumb: { label: "Breadcrumb.tsx" },
  tabs: { label: "Tabs.tsx" },
  sidebar: { label: "Sidebar.tsx" },
};

// Give every item its page id as a stable key: items fade in and out as the
// path changes, and past `maxItems` the middle collapses behind the ellipsis.
export default function BreadcrumbFlowExample() {
  const [path, setPath] = useState(["home", "projects", "nexus"]);
  const current = site[path[path.length - 1]];
  const next = current.children ?? [];

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList maxItems={4}>
          {path.map((id, index) => (
            <BreadcrumbItem key={id}>
              {index > 0 && <BreadcrumbSeparator />}
              {index === path.length - 1 ? (
                <BreadcrumbPage>{site[id].label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPath(path.slice(0, index + 1));
                  }}
                >
                  {index === 0 && <Home aria-hidden />}
                  {site[id].label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {next.length > 0 ? `Inside ${current.label}` : `${current.label} is a page`}
        </p>
        {next.length > 0 ? (
          <ul className="grid gap-2 sm:grid-cols-3">
            {next.map((id) => {
              const child = site[id];
              const Icon = child.children ? Folder : FileText;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setPath([...path, id])}
                    className="group flex w-full items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate">{child.label}</span>
                    <ChevronRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <button
            type="button"
            onClick={() => setPath(["home"])}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Home aria-hidden className="size-4" /> Back to Home
          </button>
        )}
      </div>
    </div>
  );
}
```

### Install the flow breadcrumb

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/breadcrumb-flow.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/breadcrumb-flow
```

### Breadcrumb with items

## Breadcrumb

- Pass `items` as an array of `{ label, href }` — the last entry is treated as the current page and is not linked.
- `color` themes the active text and hover states — a named key or a hex string such as `#00FF00`.
- `linkComponent` swaps the plain `a` each item renders for your router's link — pass `Link` from `next/link` to keep client-side navigation and prefetching.

```tsx
import { BreadcrumbBlock, type BreadcrumbItem } from "@/components/custom/blocks/BreadcrumbBlock";

const items: BreadcrumbItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
];

export default function BreadcrumbDemo() {
  // The last item is rendered as the current page, not a link.
  return <BreadcrumbBlock items={items} />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/breadcrumb.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/breadcrumb
```

## Examples

### With icons

- Give an item an `icon` — the Lucide component itself, not its name — to label it visually beside the text.

```tsx
import { BreadcrumbBlock, type BreadcrumbItem } from "@/components/custom/blocks/BreadcrumbBlock";
import { Home, Settings } from "lucide-react";

const items: BreadcrumbItem[] = [
  // icon takes the Lucide component itself, not a string
  { label: "Home", href: "/", icon: Home },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: "/settings/profile" },
];

export default function BreadcrumbWithIcons() {
  return <BreadcrumbBlock items={items} />;
}
```

### Truncated path

- `maxItems={4}` is the default — past that many links the middle collapses behind a `...` the reader can click to expand.

```tsx
import { BreadcrumbBlock, type BreadcrumbItem } from "@/components/custom/blocks/BreadcrumbBlock";
import { FileText, Folder, Home } from "lucide-react";

const deepPath: BreadcrumbItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Nexus UI Kit", href: "/projects/nexus" },
  { label: "Components", href: "/projects/nexus/components" },
  { label: "Breadcrumb.tsx", href: "#", icon: FileText },
];

export default function DeepBreadcrumb() {
  // More items than maxItems? The middle collapses behind a "..." button
  // that expands the full trail when clicked.
  return <BreadcrumbBlock items={deepPath} maxItems={4} />;
}
```

## Features
Explore the Breadcrumb navigation features, including collapsible items, custom separators, and SEO-friendly structure.

Easily adapt the component's styling and behavior to fit your application's unique design system.

Built with accessibility in mind, ensuring all users can interact with your application effectively.

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` | Required | An array of objects containing a `label` (string), optional `href` (string), and optional `icon` (Lucide Component). |
| `variant` | `"classic" \| "slash" \| "solid" \| "ghost"` | `"classic"` | Determines the visual styling of the links and the dividers between them. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"indigo"` | Applies global color themes to the active text and hover states. Accepts valid hex codes (e.g. `"#00FF00"`). |
| `maxItems` | `number` | `4` | The maximum number of links to display before automatically truncating the middle of the path. |
| `linkComponent` | `React.ElementType` | `"a"` | The element each item renders as. It defaults to a plain `<a>` so one source works in any React app — pass `Link` from `next/link` to get client-side navigation and prefetching back. |

### Flow breadcrumb parts

| Part | Prop | Description |
| --- | --- | --- |
| `Breadcrumb` | `labels` | Overrides the built-in strings: `{ label, showHidden }`. |
| `BreadcrumbList` | `maxItems`, `overflowLabel` | Visible slots including the ellipsis (minimum 3, default 4; `Infinity` turns collapsing off), and the ellipsis button's accessible name. |
| `BreadcrumbItem` | `key` | A stable route key. Items that arrive fade in, items that leave fade out, and the rest slide into place. |
| `BreadcrumbLink` | `render` | Render your router's Link, spreading the received props onto it. |
| `BreadcrumbPage`, `BreadcrumbSeparator` | — | The current page (`aria-current="page"`) and a decorative divider that goes inside the following item. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/breadcrumb
