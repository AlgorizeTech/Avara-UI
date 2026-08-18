# Introduction

Algorize UI is a library of **{COMPONENT_COUNT} React components** — from buttons
and inputs to dashboards, carousels and scroll-driven marketing sections. Each
one is animated, responsive, themeable and typed.

It is not an npm package. Components are published as a
[shadcn registry](https://ui.shadcn.com/docs/registry), so the CLI copies a
component's source **into your project**. From that moment the file is yours:
read it, edit it, delete half of it. There is no library version to track and
nothing to fight when a design calls for something the props do not cover.

```bash
npx shadcn@latest add button.json
```

## Component Philosophy

Build software faster with complete code ownership, no wrapper package, and total styling freedom.

    {/* Glyph stays on one line: MDX parses children of a multi-line JSX element as
        block content, which would wrap it in the custom  (mb-4) and push it 8px
        off-centre, since flex centres the margin box. */}
    ⚡
    No Wrapper Package
    
      There is no library to install and version. The CLI writes each component's source into your codebase, so you own it and there is no lock-in.

    🎨
    100% Customizability
    
      Modify styles, animations, and behaviors directly within your components/custom folder.

    🧩
    Dependencies Per Component
    
      Each component declares only what it imports — usually lucide-react, gsap or framer-motion, and often nothing at all. Its page lists them before you install.

## What's in the library

    33
    Marketing sections

    21
    Data display

    18
    Forms &amp; inputs

    15
    Layout

    14
    Media

    13
    Navigation

Plus overlays, feedback, scroll effects, commerce, authentication, maps, code
blocks and typography. [Browse everything](/docs/nextjs/all-components).

## What you need

{/* Written as JSX, not a markdown table: remarkPlugins is empty in
    next.config.ts, so GFM tables render as literal pipe characters. */}

        Requirement
        Supported

        React
        18 or 19

        Next.js
        14, 15 or 16 — App Router

        Tailwind CSS
        v3.4+ or v4

        TypeScript
        5+, or plain JavaScript

Components are plain React. Most work in any React setup, though 13 of them
import `next/image` or `next/link` and need edits outside Next.js — each page
says so.

## How a component reaches your project

Every component page follows the same two steps:

1. **Install it** — one `shadcn add` command, which also pulls in anything it
   depends on.
2. **Install dependencies** — listed explicitly, split between registry
   components and npm packages, because those need different commands. Many
   components need no npm packages at all, and the page says so plainly.

Then copy a snippet from the **Usage** tab. Every snippet is a complete file,
not a fragment.

## Theming

Components read your Tailwind theme tokens, so they inherit your colours and
radii without configuration. Many accept a `color` prop for a per-instance
accent, and the [theme customizer](/themes) lets you preview a palette across
the whole library before committing to it.

## Where next

    Installation
    Set up the CLI and add your first component.

    Quick Start
    A component on screen in four steps.

    Architecture
    How the library is structured and why.

---

**Component Path:** `nextjs\index\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
