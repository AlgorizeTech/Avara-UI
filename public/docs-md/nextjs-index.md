export const metadata = docsPageMetadata("index", {
  title: "Introduction",
  description: `What Avara UI is, how components are installed into your project, and what your project needs.`
});

# Introduction

Avara UI is a library of **192 animated, responsive React
components** — from buttons and inputs to dashboards, carousels and full
marketing sections.

It is not an npm package. Components are published as a
[shadcn registry](https://ui.shadcn.com/docs/registry), and the CLI copies each
component's source **into your project**, where you can edit it like any other
file.

```bash
npx shadcn@latest add https://avaraui.com/r/button.json
```

The short @avara-ui/… form needs the registry
registered once.
Switch to **URL** above for a command that needs no setup.

## Why this approach

    You own the code
    No wrapper package and no version to track. The source lives in your repo.

    Your theme
    Components read your Tailwind theme tokens. Preview a palette on the Themes page.

    Only what you use
    Each component declares its own dependencies, and the CLI installs them with it.

## Requirements

{/* Written as JSX, not a markdown table: remarkPlugins is empty in
    next.config.ts, so GFM tables render as literal pipe characters. */}

        React
        18 or 19

          Next.js
          App Router

          Vite
          Any recent version

        Tailwind CSS
        v4

        TypeScript
        Optional

## Where next

    Installation
    Set up Tailwind, shadcn and the registry.

    Quick Start
    Get a component on screen in minutes.

    All components
    Browse the full library by category.

---

**Component Path:** `[framework]\index\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
