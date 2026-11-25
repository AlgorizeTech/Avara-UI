---
title: "Shadcn Components Folder"
description: "Shadcn Components Folder. A multi-tab folder showing live AI Chat, Analytics, Auth Form and Terminal components in a desktop window."
url: https://avaraui.com/docs/nextjs/design-components-folder
---

# Shadcn Components Folder

An animated folder (`DesignComponentsFolder`) that fans out eight component preview cards, plus a card-free `DesignFolderBox` with custom two-line labels, built with Tailwind CSS and CSS transitions.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/design-folder-box.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/design-folder-box
```

### Custom labels

- `title="Design"` is the first line of the wordmark on the folder tab, defaulting to `Design`.
- `subtitle="Components"` is the second line, defaulting to `Components`.

```tsx
import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function CustomLabelBox() {
  // `title` and `subtitle` are the only text in the box — they default to
  // "Design" / "Components".
  return <DesignFolderBox title="Design" subtitle="Components" />;
}
```

## About Shadcn Components Folder

**What it is.** `DesignComponentsFolder` fans eight mini previews (Calendar, Data Table, Map, Breadcrumb, Dock, File Upload, Network Graph, Navbar) out of a folder, and each card links to its docs page. `DesignFolderBox` is the same folder shape without cards, with your own `title` and `subtitle`.

**How it is built.** Tailwind CSS and CSS transitions drawn from spring curves, with no animation library; the only npm dependency is `lucide-react`. The fan-out starts when an `IntersectionObserver` sees the folder, and the accent follows `--primary` or the `color` you pass.

**When to use it.** Use `DesignComponentsFolder` as a landing-page or docs-home showcase of your component library. Use `DesignFolderBox` when you only want the folder with a label. For general file/photo folders, use [Folder](https://avaraui.com/docs/nextjs/folder).

## For AI agents

**When to use**

- Interactive component-showcase folder (`DesignComponentsFolder`) or custom-labeled folder box (`DesignFolderBox`)

**When not to use**

- File/photo collection folders or upload drop targets — use [Folder](https://avaraui.com/docs/nextjs/folder)

**Agent notes**

- `DesignComponentsFolder` installs via `design-components-folder`; `DesignFolderBox` installs via `design-folder-box`
- Leave `color` unset to inherit the active `--primary` theme token
- The eight cards and the "Design Components" wordmark are fixed in `DesignComponentsFolder`; only `DesignFolderBox` takes `title` and `subtitle`
- Card links point at `/docs/nextjs/<slug>`: pass `disableLinks` or your own `linkComponent` in an app that has no such routes

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `DesignComponentsFolder` | `color` | `string` | `undefined` | Accent for the folder and its cards. Accepts `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or any CSS color; it is applied by overriding the `--primary` variable on the wrapper. Left unset (or set to `"primary"`) it inherits your theme. |
| `DesignComponentsFolder` | `disableLinks` | `boolean` | `false` | Points every card at `#` and cancels the click, so the cards no longer navigate to the `/docs/nextjs` pages. |
| `DesignComponentsFolder` | `linkComponent` | `React.ElementType` | `"a"` | Element used for the card links. Pass `next/link` in Next.js for client-side navigation. |
| `DesignComponentsFolder` | `className` | `string` | `undefined` | Merged onto the outer section for layout overrides. |
| `DesignFolderBox` | `title` | `string` | `"Design"` | First line of the wordmark on the folder tab. |
| `DesignFolderBox` | `subtitle` | `string` | `"Components"` | Second line of the wordmark on the folder tab. |
| `DesignFolderBox` | `color` | `string` | `undefined` | Same accent resolution as the hub — a preset name, a CSS color, or unset to inherit the theme. |
| `DesignFolderBox` | `...divProps` | `React.HTMLAttributes<HTMLDivElement>` | `—` | Every remaining prop is spread onto the root `section`, and the component forwards its ref. |

## Works with other components

- Compare with [Folder](https://avaraui.com/docs/nextjs/folder) for file/photo folders and [Designs Toolkit](https://avaraui.com/docs/nextjs/designs-toolkit) for section showcases.

## How do I change the accent color on DesignComponentsFolder?

Pass `color` as `indigo`, `rose`, `emerald`, `zinc` or any CSS color. The component writes it to `--primary` on its wrapper, and the folder fill and wordmark are derived from that variable. Leave `color` unset, or use `primary`, to inherit your theme.

## Why do the cards in DesignComponentsFolder link to /docs/nextjs pages?

Each card's `href` is hard-coded to a docs path such as `/docs/nextjs/calendar`. In an app without those routes, set `disableLinks` so the cards render `#` and cancel the click. In Next.js, pass `linkComponent={Link}` from `next/link` to keep client-side navigation.

## Can I change the cards or the wordmark in DesignComponentsFolder?

Not through props. The eight cards and the "Design Components" wordmark are written into the file, which you own after install, so edit them there. If you only need a different label, use `DesignFolderBox` and set `title` and `subtitle`, which default to "Design" and "Components".

## What is the difference between DesignComponentsFolder and DesignFolderBox?

`DesignComponentsFolder` is the full scene: eight preview cards fan out and retract around a solid folder. `DesignFolderBox` is a frosted-glass folder with no cards, a `title` and `subtitle`, and a forwarded ref. They install separately as `design-components-folder` and `design-folder-box`.

## When does the DesignComponentsFolder animation play?

The cards fan out the first time the folder scrolls into view. After about two seconds one card at a time retracts into the folder and returns, and the loop pauses while the folder is off screen. Pointer hover lifts a card; touch input does not. The component does not read `prefers-reduced-motion`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/design-components-folder
