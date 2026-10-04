# Installation

Set up a React + Vite project so you can install Algorize UI components with the
shadcn CLI.

    Build tool
    Vite

    React
    18 or 19

    Styling
    Tailwind CSS v4

    Language
    TypeScript or JS

Components are plain React and never import from `next/*`, so they compile in a
Vite app as-is.

## Create a project

Skip this if you already have a Vite app.

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

Use the `react` template instead of `react-ts` for plain JavaScript.

## Set up Tailwind CSS

**1. Install the packages**

```bash
npm install tailwindcss @tailwindcss/vite
```

**2. Replace `src/index.css`** with a single line. The template's starter styles
fight the layout utilities components rely on.

```css
@import "tailwindcss";
```

Also delete `src/App.css` and its import in `src/App.tsx`.

    Keep it the first line. An @import below other rules is silently ignored, and src/main.tsx must import index.css — otherwise every component renders unstyled.

## Configure the path alias

Every component imports through `@/`, so the alias must resolve in **both**
TypeScript and Vite.

**`vite.config.ts`** — this also registers the Tailwind plugin:

```ts

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**`tsconfig.json` and `tsconfig.app.json`** — add `paths` to `compilerOptions`,
keeping everything else in the files as it is:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Do not add `baseUrl` — TypeScript 6 reports it as an error, and `paths` does not
need it.

## Add components

### Step 1: Initialize shadcn

Run once per project. It creates `components.json`, `src/lib/utils.ts` (the `cn`
helper every component imports) and installs `lucide-react`.

```bash
npx shadcn@latest init --base radix --preset nova
```

Algorize UI builds on Radix primitives. If you run `init` without flags, choose
**Radix UI** when asked. The CLI detects Vite and sets `rsc` to `false`.

### Step 2: Register the registry

Run once per project. It lets you install components by name:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
```

This adds the following to `components.json`, which you can also write by hand:

```json
{
  "registries": {
    "@algorize-ui": "https://algorize-ui.vercel.app/r/{name}.json"
  }
}
```

### Step 3: Pick a theme

Open the [Themes page](/themes), choose a preset, press **Copy Code**, and paste
it into `src/index.css` below `@import "tailwindcss";`. Components pick up the
colours, radius and fonts from these variables.

### Step 4: Add a component

Every component page has its own command:

```bash
npx shadcn@latest add @algorize-ui/hero
```

The CLI writes the source into your project and installs the component's npm
packages and any other components it depends on.

### Where files land

```bash
src/
├── components/
│   ├── custom/
│   │   ├── blocks/     # Most components (Hero, Card, Navbar, …)
│   │   └── ui/         # Shared pieces used by several components
│   └── ui/             # shadcn primitives
└── lib/
    └── utils.ts        # The cn helper
```

### Links and images

Components that render links or images accept a `linkComponent` /
`imageComponent` prop. Pass React Router's `Link` as `linkComponent` for
client-side navigation.

## Troubleshooting

    Failed to resolve import @/lib/utils
    The alias is set in TypeScript but not in Vite, or the reverse. Both need it.

    Components render unstyled
    Check that @import "tailwindcss"; is the first line of src/index.css, that src/main.tsx imports it, and that tailwind.css in components.json points at it.

    "Module level directives cause errors when bundled"
    A harmless Rollup warning about the "use client" line at the top of components. Vite ignores the directive and the build succeeds.

    Unknown registry "@algorize-ui"
    Run Step 2, or switch the command to URL, which needs no setup.

## Next steps

- [Quick Start](/docs/reactjs/first-app) — put a component on screen
- [All components](/docs/reactjs/all-components) — browse the library

For anything beyond Algorize UI, see the [Vite](https://vite.dev/guide/),
[Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) and
[shadcn CLI](https://ui.shadcn.com/docs/cli) docs.

---

**Component Path:** `[framework]\installation\_content\reactjs.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
