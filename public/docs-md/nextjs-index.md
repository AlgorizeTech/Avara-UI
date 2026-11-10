---
title: "Introduction"
description: "What Avara UI is, how its shadcn registry installs components into your project, and what your project needs."
url: https://avaraui.com/docs/nextjs
---

# Introduction

Avara UI is a free, MIT-licensed library of **195 animated,
responsive React components** — from buttons and inputs to dashboards, carousels
and full marketing sections.

It is not an npm package. Components are published as a
[shadcn registry](https://ui.shadcn.com/docs/registry), and the CLI copies each
component's source **into your project**, where you can edit it like any other
file.

```bash
npx shadcn@latest add https://avaraui.com/r/button.json
```

The short `@avara-ui/…` form needs the registry
[registered once](https://avaraui.com/docs/nextjs/installation#step-2-register-the-registry).
Switch to **URL** above for a command that needs no setup.

## Why this approach

### You own the code

No wrapper package and no version to track. The source lives in your repo.

### Your theme

Components read your Tailwind theme tokens. Preview a palette on the [Themes page](https://avaraui.com/themes).

### Only what you use

Each component declares its own dependencies, and the CLI installs them with it.

## Requirements

| React | 18 or 19 |
| --- | --- |
| Next.js | App Router |
| Tailwind CSS | v4 |
| TypeScript | Optional |

## Where next

[Installation Set up Tailwind, shadcn and the registry.](https://avaraui.com/docs/nextjs/installation)
[Quick Start Get a component on screen in minutes.](https://avaraui.com/docs/nextjs/first-app)
[All components Browse the full library by category.](https://avaraui.com/docs/nextjs/all-components)

---

Live previews and every example: https://avaraui.com/docs/nextjs
