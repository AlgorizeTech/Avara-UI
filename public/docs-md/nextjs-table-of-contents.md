---
title: "Shadcn Table of Contents"
description: "Shadcn Table of Contents. A responsive Table of Contents navigation block (`TableOfContentsBlock`) with scroll-spy tracking, spring active indicator."
url: https://avaraui.com/docs/nextjs/table-of-contents
---

# Shadcn Table of Contents

A responsive Table of Contents navigation block (`TableOfContentsBlock`) with scroll-spy tracking, spring active indicator, progress bar, section search, and mobile drawer.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/table-of-contents.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/table-of-contents
```

## Table of Contents (Left Side Navigation)

Sticky left-hand TOC navigation with automatic scroll-spy, progress indicator, and section filter.

- `headings` Array of TOCHeading objects ({ id, title, level }) defining the document outline.
- `showProgress` Displays an animated top progress bar reflecting current document scroll percentage.
- `showSearch` Enables an inline search filter input inside the right-hand TOC sidebar.

```tsx
"use client";

import { TableOfContentsBlock, type TOCItem } from "@/components/custom/blocks/TableOfContentsBlock";

const previewItems: TOCItem[] = [
  {
    id: "overview",
    title: "Overview & Features",
    level: 1,
    description:
      "The Table of Contents component is a powerful, production-grade navigation system designed specifically for content-heavy documentation, technical blogs, and long-form articles. It dynamically monitors viewport scroll position using high-performance IntersectionObserver and scroll-spy events to highlight the active section instantly. On a spring curve with no animation library behind it, the active indicator pill glides fluidly across navigation items without causing layout shifts.",
  },
  {
    id: "installation",
    title: "Installation & Setup",
    level: 1,
    description:
      "Integrating this Table of Contents component into your modern web application takes less than a minute using the shadcn CLI or custom package managers. It comes pre-configured with support for Next.js App Router server components, standard React SPA architectures, and Tailwind CSS v4 styling rules.",
  },
  {
    id: "prerequisites",
    title: "Prerequisites",
    level: 2,
    description:
      "Before installing the component, verify that your development environment satisfies standard modern React framework requirements. You will need Node.js version 18.0.0 or higher, React 18 or 19, and Next.js 14+ if using the App Router.",
  },
  {
    id: "package-install",
    title: "Package Installation",
    level: 2,
    description:
      "Run the official shadcn registry command to automatically download the component file and inject its dependencies into your project structure.",
    codeSnippet:
      "npx shadcn@latest add @avara-ui/table-of-contents",
  },
  {
    id: "configuration",
    title: "Configuration & Customization",
    level: 1,
    description:
      "The component provides an extensive set of customizable props to fit your application's unique branding and layout requirements. You can control the sticky sidebar position, adjust scroll offset margins for fixed site headers, enable or disable the progress indicator bar, and customize section filter behavior.",
  },
  {
    id: "accessibility",
    title: "Accessibility & ARIA",
    level: 1,
    description:
      "Built with Web Content Accessibility Guidelines (WCAG 2.1) compliance in mind, the Table of Contents uses semantic HTML5 navigation landmarks (<nav>) and explicit ARIA attributes like aria-label and aria-current.",
  },
];

export default function TableOfContentsDemo() {
  return (
    <TableOfContentsBlock
      items={previewItems}
      sidebarTitle="On this page"
      showProgress={true}
      showSearch={true}
    />
  );
}
```

## About Shadcn Table of Contents

**What it is.** `TableOfContentsBlock` renders a sticky outline sidebar (`items: TOCItem[]`) with scroll-spy highlighting, an optional scroll progress bar (`showProgress`), inline section filtering (`showSearch`), and a mobile drawer.

**How it is built.** Uses `IntersectionObserver` scroll-spy and a spring-eased active indicator pill (no animation library) with semantic `<nav>` landmarks and `aria-current`.

**When to use it.** Use `TableOfContentsBlock` alongside long documentation pages, technical blogs, and multi-section guides.

## For AI agents

**When to use**

- Sticky article/docs outline navigation with scroll-spy, progress indicator, and search filter

**When not to use**

- Multi-page app navigation — use [Sidebar](https://avaraui.com/docs/nextjs/sidebar) or [Navigation Menu](https://avaraui.com/docs/nextjs/navigation)

**Agent notes**

- Named exports: `TableOfContentsBlock`, `type TOCItem` from `@/components/custom/blocks/TableOfContentsBlock`
- Toggle `showProgress` and `showSearch` props to enable the scroll progress bar and inline filter

## Props Reference

| Component / Object | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `TableOfContentsBlock` | `items` | `TOCItem[]` | `DEFAULT_ITEMS` | Array of section content blocks with titles, levels, descriptions, and optional code snippets. |
| `TableOfContentsBlock` | `headings` | `TOCHeading[]` | Derived from `items` | Custom outline structure containing `id`, `title`, and `level` (1 \| 2 \| 3). |
| `TableOfContentsBlock` | `activeId` | `string` | Controlled by scroll-spy | Manually override the currently highlighted active section ID. |
| `TableOfContentsBlock` | `onSelectHeading` | `(id: string) => void` | Smooth scroll to target | Callback fired when a user clicks on a section heading in the TOC sidebar. |
| `TableOfContentsBlock` | `color` | `string` | `"var(--primary)"` | Accent theme color for active indicator, progress bar, and search highlights (Hex, RGB, or CSS var). |
| `TableOfContentsBlock` | `showProgress` | `boolean` | `true` | Shows or hides the top reading progress indicator bar. |
| `TableOfContentsBlock` | `showSearch` | `boolean` | `true` | Shows or hides the inline section search filter input inside the sidebar. |
| `TableOfContentsBlock` | `sidebarTitle` | `string` | `"On this page"` | Header text displayed at the top of the sticky TOC sidebar. |
| `TOCItem` / `TOCHeading` | `id` | `string` | Required | Unique DOM element ID matching the section heading target. |
| `TOCItem` / `TOCHeading` | `title` | `string` | Required | Display title shown in the TOC sidebar and main content section. |
| `TOCItem` / `TOCHeading` | `level` | `1 \| 2 \| 3` | `1` | Indentation hierarchy level for sub-sections. |
| `TOCItem` | `description` | `string` | — | Body paragraph content associated with the section. |
| `TOCItem` | `codeSnippet` | `string` | — | Code snippet displayed inside the section card with a copy-to-clipboard button. |
| `TOCItem` | `badge` | `string` | — | Badge label shown next to the section title (e.g., "New", "Updated"). |

## Works with other components

- Pair `TableOfContentsBlock` with [Breadcrumb](https://avaraui.com/docs/nextjs/breadcrumb) and [Scroll Area](https://avaraui.com/docs/nextjs/scroll-area) on long documentation layouts.

## How do I add a table of contents with scroll spy in React?

Render `TableOfContentsBlock` with an `items` array whose `id` values match the DOM IDs of your sections. It uses an `IntersectionObserver` for scroll-spy, highlights the active heading with a spring indicator, and smooth-scrolls to a section when its entry is clicked.

## Does TableOfContentsBlock work on mobile viewports?

Yes. On small screens the sidebar outline becomes a mobile drawer so the page content keeps the full width. The sticky sidebar layout applies on larger screens. The same `items` and `headings` data drives both, so you configure nothing twice.

## How do I turn off the progress bar or the search box?

Set `showProgress={false}` to hide the reading progress bar and `showSearch={false}` to hide the inline section filter. Both default to `true`. Change the header text with `sidebarTitle`, which defaults to `"On this page"`.

## How do I control the active heading myself?

Pass `activeId` to override the scroll-spy highlight, and use `onSelectHeading` to handle clicks yourself. Without `onSelectHeading`, a click smooth-scrolls to the target. Each entry also has a `level` of `1`, `2` or `3` to set its indentation.

## Can I build the outline from my own headings?

Yes. Pass `headings` with `id`, `title` and `level`, instead of letting them derive from `items`. Items can also carry a `description`, a `codeSnippet` with a copy button and a `badge` such as "New", which suit documentation-style layouts.

---

Live previews and every example: https://avaraui.com/docs/nextjs/table-of-contents
