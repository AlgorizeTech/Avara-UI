<div align="center">

<h1>Algorize UI</h1>

<strong>A shadcn registry of animated React components you install straight into your own codebase.</strong>
<br />
<sub><!-- component-count -->180<!-- /component-count --> components and website sections · Next.js and React (Vite) · themed with CSS variables · MIT licensed</sub>

<br />
<br />

[![Website](https://img.shields.io/badge/Website-algorize--ui.vercel.app-9B8AFB?style=flat-square)](https://algorize-ui.vercel.app)
[![Docs](https://img.shields.io/badge/Docs-read-9B8AFB?style=flat-square)](https://algorize-ui.vercel.app/docs/nextjs/index)
[![Registry](https://img.shields.io/badge/shadcn-registry-9B8AFB?style=flat-square)](https://algorize-ui.vercel.app/r/registry.json)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](LICENSE)

[**Browse components →**](https://algorize-ui.vercel.app/docs/nextjs/all-components) · [**Get started →**](https://algorize-ui.vercel.app/docs/nextjs/installation) · [**Build a theme →**](https://algorize-ui.vercel.app/themes)

</div>

<br />

## Why Algorize UI?

Most component libraries hand you a package to depend on. Algorize UI hands you the source. Each component is published as a [shadcn registry](https://ui.shadcn.com/docs/registry) item, so the `shadcn` CLI writes the file into your project, installs whatever npm packages it needs, and steps out of the way. After that it is your code: rename it, restyle it, delete the parts you don't use.

There is no wrapper package to keep up to date and nothing to eject from later.

## What you get

- **<!-- component-count -->180<!-- /component-count --> components**, from base UI primitives to full page sections. Run `npx shadcn@latest list @algorize-ui` for the live list.
- **Full website sections as well as primitives.** Heroes, pricing, footers, dashboards, auth forms, carousels, maps, media players and more, in 18 categories.
- **One source for two frameworks.** No shipped component imports from `next/*`, so the same file compiles in a Next.js App Router project and in a Vite React app. Components that render links or images accept a `linkComponent` / `imageComponent` prop, so Next.js users can pass `next/link` and `next/image`.
- **Themes as CSS variables.** Colours, radius and fonts come from CSS variables, not hard-coded classes. The [Themes page](https://algorize-ui.vercel.app/themes) has 14 presets and a customiser, and it exports a block you paste into your global stylesheet.
- **Motion that fits the job.** Fixed animations are plain CSS. Pointer, scroll and drag effects use GSAP, and several of those also ship a Motion build under the same name with a `-motion` suffix.
- **Open in v0.** Docs examples can be opened in [v0](https://v0.dev) with your chosen theme applied.
- **Docs as Markdown too.** Every docs page is also published as plain Markdown under `/docs-md/`, which is handy for pasting into an AI assistant.

## Quick start

Algorize UI assumes a project that already has Tailwind CSS and a `shadcn` setup. The [installation guide](https://algorize-ui.vercel.app/docs/nextjs/installation) walks through both from scratch.

**1. Initialise shadcn** (once per project). The components are built on Radix, so choose the Radix base:

```bash
npx shadcn@latest init --base radix --preset nova
```

**2. Register the Algorize UI registry** (once per project):

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
```

That is the same as adding this to `components.json` yourself:

```json
{
  "registries": {
    "@algorize-ui": "https://algorize-ui.vercel.app/r/{name}.json"
  }
}
```

**3. Add components by name:**

```bash
npx shadcn@latest add @algorize-ui/hero
npx shadcn@latest add @algorize-ui/hero @algorize-ui/navbar   # several at once
```

You can skip step 2 and install by full URL instead, e.g. `npx shadcn@latest add https://algorize-ui.vercel.app/r/hero.json`. Every component page on the site shows both forms.

To search the registry from your terminal:

```bash
npx shadcn@latest search @algorize-ui --query pricing
```

## Supported frameworks

| Framework | Supported versions | Guide |
| :-------- | :----------------- | :---- |
| **Next.js** (App Router) | Next.js 14, 15 and 16 · React 18 and 19 · Tailwind CSS v3.4+ or v4 | [Installation](https://algorize-ui.vercel.app/docs/nextjs/installation) · [Quick start](https://algorize-ui.vercel.app/docs/nextjs/first-app) |
| **React + Vite** | Vite 5 to 8 · React 18 and 19 · Tailwind CSS v4 | [Installation](https://algorize-ui.vercel.app/docs/reactjs/installation) · [Quick start](https://algorize-ui.vercel.app/docs/reactjs/first-app) |

Both need the `@/*` path alias. TypeScript is recommended, but plain JavaScript projects work too. The components also work in Create React App and React Router projects.

## Categories

| Category | Items | | Category | Items |
| :------- | ----: |-| :------- | ----: |
| Marketing | 63 | | Commerce | 11 |
| Data display | 40 | | Communication | 10 |
| Layout | 34 | | Actions | 7 |
| Media | 31 | | Feedback | 7 |
| Forms | 28 | | Overlays | 7 |
| Navigation | 19 | | Typography | 6 |
| Utilities | 19 | | Code | 5 |
| Scroll | 13 | | Authentication | 4 |
| Maps | 2 | | Dates | 4 |

Some items belong to more than one category, so the counts add up to more than the item total.

## Running the docs site locally

This repository holds the components and the documentation site that publishes them.

```bash
git clone https://github.com/AlgorizeTech/Reusable-Component-Documentation.git
cd Reusable-Component-Documentation
npm install
npm run dev      # http://localhost:3000
```

The site is a static export (`output: "export"`) built with Next.js 15, React 19, Tailwind CSS 4, TypeScript and MDX. `npm run build` does more than compile the site. It regenerates the Markdown docs, rebuilds the registry, runs the framework and consumer type checks, and only then runs `next build`.

The optional `.env` settings (site URL, analytics, verification tokens and so on) are documented in [`.env.example`](.env.example). The site builds without any of them.

### Where things live

| Path | What it is |
| :--- | :--------- |
| `src/components/custom/blocks/` | The components and sections the registry ships. |
| `src/components/custom/ui/`, `src/components/ui/` | Base UI primitives, also shipped. |
| `src/app/docs/[framework]/` | One MDX docs page per component, shared by the Next.js and React docs. |
| `src/preview/demos/` | Live demos rendered on the docs pages. |
| `src/scripts/` | Registry generator, drift checks and Markdown export. |
| `registry.json`, `public/r/` | The generated registry. Don't edit by hand. |
| `api/v0.ts` | The site's only serverless function, which serves themed items to v0. |
| `mcp/` | An MCP server for AI coding agents (standalone package, not yet published). |

## Contributing

Bug fixes, improvements to existing components and docs corrections are all welcome. Please read the [contribution guide](CONTRIBUTING.md) before opening a pull request. It covers the checks every change has to pass.

## Credits

A handful of base primitives (accordion, avatar, badge, button, sheet and slider) are derived from [shadcn/ui](https://github.com/shadcn-ui/ui) under its MIT License. [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) lists exactly which files. Everything else is original AlgorizeTech work.

Runtime libraries the components use, such as Radix UI, Lucide, GSAP and Motion, are installed from npm in your project and keep their own licenses.

## License

Algorize UI is free for personal and commercial use under the [MIT License](LICENSE). Copyright © 2025–2026 AlgorizeTech.
