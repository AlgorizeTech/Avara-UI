# Installation

Set up a Next.js project so you can install Avara UI components with the
shadcn CLI.

    Framework
    Next.js App Router

    React
    18 or 19

    Styling
    Tailwind CSS v4

    Language
    TypeScript or JS

## Create a project

Skip this if you already have a Next.js app with Tailwind CSS v4.

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
```

`--tailwind` installs Tailwind and writes `globals.css` for you. Adding Avara UI
to an app without Tailwind? [Set it up first](#set-up-tailwind-css).

## Add components

### Step 1: Initialize shadcn

Run once per project. It creates `components.json` and `lib/utils.ts` (the `cn`
helper every component imports).

```bash
npx shadcn@latest init --base radix --preset nova
```

Avara UI builds on Radix primitives. If you run `init` without flags, choose
**Radix UI** when asked. Any preset works — it only sets the starting theme.

### Step 2: Register the registry

Optional, once per project. Components install by URL with no setup; this
lets you install them by name instead (@avara-ui/hero):

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
```

This adds the following to `components.json`, which you can also write by hand:

```json
{
  "registries": {
    "@avara-ui": "https://avaraui.com/r/{name}.json"
  }
}
```

### Step 3: Pick a theme

Open the [Themes page](/themes), choose a preset, press **Copy Code**, and paste
it into `globals.css` below `@import "tailwindcss";`. Components pick up the
colours, radius and fonts from these variables.

### Step 4: Add a component

Every component page has its own command:

```bash
npx shadcn@latest add https://avaraui.com/r/hero.json
```

The CLI writes the source into your project and installs the component's npm
packages and any other components it depends on.

### Where files land

```bash
components/
├── custom/
│   ├── blocks/     # Most components (Hero, Card, Navbar, …)
│   └── ui/         # Shared pieces used by several components
└── ui/             # shadcn primitives
lib/
└── utils.ts        # The cn helper
```

Components import through the `@/` alias, which `create-next-app` configures for
you — keep it in `tsconfig.json`.

## Set up Tailwind CSS

Only needed if your project does not have Tailwind CSS v4 yet.

**1. Install the packages**

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

**2. Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**3. Import Tailwind in `app/globals.css`**

```css
@import "tailwindcss";
```

    Keep it the first line. An @import below other rules is silently ignored, and your root layout must import globals.css — otherwise every component renders unstyled.

Upgrading from Tailwind v3? Run `npx @tailwindcss/upgrade`. Components use
v4-only syntax.

## Troubleshooting

    Components render unstyled
    Check that @import "tailwindcss"; is the first line of globals.css, that your root layout imports that file, and that tailwind.css in components.json points at it.

    Unknown registry "@avara-ui"
    Run Step 2, or switch the command to URL, which needs no setup.

    Cannot find module @/lib/utils
    Run Step 1, and make sure tsconfig.json has a paths entry for @/*.

## Next steps

- [Quick Start](/docs/nextjs/first-app) — put a component on screen
- [All components](/docs/nextjs/all-components) — browse the library

For anything beyond Avara UI, see the
[Next.js](https://nextjs.org/docs/app/getting-started/installation),
[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs) and
[shadcn CLI](https://ui.shadcn.com/docs/cli) docs.

---

**Component Path:** `[framework]\installation\_content\nextjs.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
