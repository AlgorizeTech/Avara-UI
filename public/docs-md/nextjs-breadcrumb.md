---
title: "Shadcn Breadcrumb"
description: "Shadcn Breadcrumb. A hierarchical breadcrumb trail (`BreadcrumbBlock`) and a composable animated version (`BreadcrumbFlowBlock`)."
url: https://avaraui.com/docs/nextjs/breadcrumb
---

# Shadcn Breadcrumb

A hierarchical breadcrumb trail (`BreadcrumbBlock`) and a composable animated version (`BreadcrumbFlowBlock`), both with middle-path truncation and router link support.

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

## With icons

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

## Truncated path

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

## About Shadcn Breadcrumb

**What it is.** Two ways to show where a page sits in a hierarchy. `BreadcrumbBlock` renders an `items` array in one of four `variant` styles, with optional Lucide icons and `maxItems` truncation. `BreadcrumbFlowBlock.tsx` exports separate parts (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem` and more) that fade and slide as the route changes.

**How it is built.** `BreadcrumbBlock` renders the last item as plain text with `aria-current="page"`, collapses long paths behind a `...` button, and takes a `linkComponent` such as `Link` from `next/link`. The flow parts animate with the Web Animations API and CSS transitions, skip that motion under `prefers-reduced-motion`, and neither build needs GSAP or Motion: both install only `lucide-react` and the `utils` item.

**When to use it.** Use `BreadcrumbBlock` when the trail comes from data. Use the flow parts when the trail changes without a page reload and you want items to animate in and out.

## For AI agents

**When to use**

- Hierarchical page trails: `BreadcrumbBlock` from an `items` array, or the `BreadcrumbFlowBlock` parts for animated transitions

**When not to use**

- Top-level site navigation bars — use [Navigation Menu](https://avaraui.com/docs/nextjs/navigation)
- Multi-step form progress — use [Stepper](https://avaraui.com/docs/nextjs/stepper)

**Agent notes**

- `BreadcrumbBlock` installs via `breadcrumb`; the flow parts (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`) install via `breadcrumb-flow` from `BreadcrumbFlowBlock`
- Both files export a `BreadcrumbItem` with a different shape (a data type in one, a component in the other), so import each from the file you mean
- On `BreadcrumbBlock`, pass `linkComponent={Link}` from `next/link`; on the flow parts, pass `render` to `BreadcrumbLink`
- The last `BreadcrumbBlock` item renders as plain text even if it has an `href`
- In the flow parts, every `BreadcrumbItem` needs a stable `key`, such as the page id, or it cannot animate

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` | Required | An array of objects containing a `label` (string), optional `href` (string), and optional `icon` (Lucide Component). |
| `variant` | `"classic" \| "slash" \| "solid" \| "ghost"` | `"classic"` | Determines the visual styling of the links and the dividers between them. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies a color theme to the active text and hover states. The default uses your `primary` theme token; an unknown name falls back to it. Accepts hex codes (e.g. `"#00FF00"`). |
| `maxItems` | `number` | `4` | The most slots shown, the `...` button included, before the middle of the path collapses. A collapsed trail shows the first item, the button, then the last `maxItems - 2` items. |
| `linkComponent` | `React.ElementType` | `"a"` | The element each item renders as. It defaults to a plain `<a>` so one source works in any React app — pass `Link` from `next/link` to get client-side navigation and prefetching back. |

### Flow breadcrumb parts

| Part | Prop | Description |
| --- | --- | --- |
| `Breadcrumb` | `labels` | Overrides the built-in strings: `{ label, showHidden }`. |
| `BreadcrumbList` | `maxItems`, `overflowLabel` | Visible slots including the ellipsis (minimum 3, default 4; `Infinity` turns collapsing off), and the ellipsis button's accessible name. |
| `BreadcrumbItem` | `key` | A stable route key. Items that arrive fade in, items that leave fade out, and the rest slide into place. |
| `BreadcrumbLink` | `render` | Render your router's Link, spreading the received props onto it. |
| `BreadcrumbPage`, `BreadcrumbSeparator` | — | The current page (`aria-current="page"`) and a decorative divider that goes inside the following item. |

## Works with other components

- Place `BreadcrumbBlock` above [Table of Contents](https://avaraui.com/docs/nextjs/table-of-contents), [Data Table](https://avaraui.com/docs/nextjs/data-table), or [Sidebar](https://avaraui.com/docs/nextjs/sidebar) content headers.
- Pair it with the [Navbar](https://avaraui.com/docs/nextjs/navbar): the navbar holds the top-level sections and the breadcrumb shows where you are inside one.

## How do I use Next.js Link with BreadcrumbBlock or BreadcrumbLink?

On `BreadcrumbBlock`, pass `linkComponent={Link}` with `Link` from `next/link`; it defaults to a plain `a`. On the flow parts, give `BreadcrumbLink` a `render` function that spreads the received props onto your router's `Link`. Neither file imports from `next/*`, so Vite and other routers work too.

## How does maxItems collapse a long BreadcrumbBlock path?

When `items` is longer than `maxItems` (default 4), `BreadcrumbBlock` shows the first item, a `...` button, then the last `maxItems - 2` items. Clicking the button expands the full trail, and it stays expanded afterwards. The button carries the label "Show hidden breadcrumbs".

## How do I change the BreadcrumbBlock color to match my brand?

Set `color` to `"indigo"`, `"rose"`, `"emerald"` or `"zinc"`, or pass any hex string such as `"#00FF00"`. It tints the current page and the link hover state. The default, `"primary"`, follows your theme token, so a theme preset restyles it automatically. Use `variant` for the look: `"classic"`, `"slash"`, `"solid"` or `"ghost"`.

## When should I use the flow parts instead of BreadcrumbBlock?

Use the `breadcrumb-flow` parts when the trail changes in place, such as drilling into folders without a reload. Give each `BreadcrumbItem` the page id as `key` and new items fade in, removed ones fade out, and the rest slide across. `BreadcrumbBlock` is simpler when you already have an `items` array.

## Is the breadcrumb keyboard and screen-reader accessible?

Both render a `nav` landmark labelled "Breadcrumb" and mark the current page with `aria-current="page"`. The flow ellipsis is a button with `aria-expanded`: Enter, Space or ArrowDown opens its list, ArrowDown moves focus in, and Escape closes it. The flow motion is skipped under `prefers-reduced-motion`.

## Which dependencies does the breadcrumb install?

Both items install `lucide-react` and the `utils` helper that provides `cn`, and nothing else. The `breadcrumb` item also ships a small `breadcrumb-theme.ts` file for the color themes. There is no GSAP or Motion build, since the flow animation uses the Web Animations API.

---

Live previews and every example: https://avaraui.com/docs/nextjs/breadcrumb
