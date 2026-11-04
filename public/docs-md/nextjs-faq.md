---
title: "Frequently Asked Questions"
description: "What Avara UI is, what it costs, how it differs from shadcn/ui, how to install it, and whether it works with Next.js, Vite and AI agents."
url: https://avaraui.com/docs/nextjs/faq
---

# Frequently Asked Questions

Short answers to what people most often ask about Avara UI: what it is, what
it costs, how it installs and what it works with.

## What is Avara UI?

Avara UI is a free, MIT-licensed library of 194 animated React
components and website sections, published as a
[shadcn registry](https://ui.shadcn.com/docs/registry). The shadcn CLI copies each
component's source into your project, where you can edit it like any other file.
It is built with React, TypeScript and Tailwind CSS v4 by
[AlgorizeTech](https://github.com/AlgorizeTech).

## Is Avara UI free?

Yes. Every component is free, and you do not need an account, license key or API
key. Each item is a public file that the shadcn CLI fetches.

## Can I use Avara UI in commercial projects?

Yes. The MIT license lets you use and modify it in personal projects, client work
and commercial products with no fees, as long as you keep the copyright notice with
the code. The Avara UI and AlgorizeTech names and logos are not covered by the
license. Packages a component depends on, such as
[GSAP](https://gsap.com/standard-license/), keep their own licenses.

## How is Avara UI different from shadcn/ui?

shadcn/ui is a set of base components, plus the CLI and registry format used to
distribute them. Avara UI is a separate library that uses that same CLI and
format, and adds animated components and full website sections. The two work side
by side because Avara UI components read the same theme tokens and
`components.json`. Avara UI is listed in the
[shadcn registry directory](https://ui.shadcn.com/docs/directory).

## How do I install a component?

Register the registry once per project with
`npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json`, then add what you need with
`npx shadcn@latest add @avara-ui/button`. The CLI copies the
source into your project and installs the npm packages and other registry items it
depends on.

```bash
npx shadcn@latest add https://avaraui.com/r/button.json
```

To skip registering, add the item by URL instead: **URL** in the command above
shows how. The [installation guide](https://avaraui.com/docs/nextjs/installation) covers a new
project from the start.

## Do I need to install an npm package?

No. There is no Avara UI package, so nothing depends on one at runtime. You get
the source of the items you add, plus the npm packages each of those items lists.

## What does my project need?

React 18 or 19, Tailwind CSS v4, and a `components.json` file, which
`npx shadcn@latest init` creates along with the `cn` helper. Components import
through the `@/` path alias.

## Does it work with Next.js and Vite?

Yes. There are installation guides for Next.js and for React with Vite. Components
never import from `next/*`: where one renders links or images, they come in as
`linkComponent` and `imageComponent` props that default to a plain `<a>` and
`<img>`, so the same source compiles in either.

## Which animation libraries does it use?

It depends on the component. Fixed-value motion is meant to be plain CSS, and motion
driven by the pointer, scroll or dragging uses GSAP. Where a component has both, the
default build uses GSAP and the Motion build installs as `<name>-motion`; they write
the same file, so install one or the other.

## Can I change the colors, dark mode and border radius?

Yes. Components are styled with theme tokens such as `bg-primary` and
`text-foreground` rather than fixed colors, and dark mode follows your `.dark`
class. Change the CSS variables once, or try the presets on the
[Themes page](/themes), and every component restyles in light and dark.

## How do I update a component?

Run the same add command again with `--overwrite` to replace the file with the
latest version. That overwrites your edits, so commit first, and use `--dry-run` to
preview the changes before anything is written.

## Are the components accessible?

Where a component is built on Radix UI, such as the accordion, dialog, select and
slider, you get Radix's ARIA roles, keyboard navigation and focus management.
Decorative and animated blocks are custom, so test keyboard and screen reader
behavior in your own app before shipping.

## Can AI coding agents install Avara UI components?

Yes. Avara UI is a standard shadcn registry, so the shadcn MCP server lets Claude
Code, Cursor, VS Code, Codex and OpenCode browse, search and install components from
a plain-language prompt. The server is free and needs no API key. The
[MCP guide](https://avaraui.com/docs/nextjs/mcp) covers the setup.

## How do I report a bug or ask for a component?

Open an issue on [GitHub](https://github.com/AlgorizeTech/Avara-UI/issues) with the
component name and what you expected to happen. Contributions are welcome too.

---

Live previews and every example: https://avaraui.com/docs/nextjs/faq
