# Installation & Setup Guide

Get started with Algorize UI in a React project built on Vite — either a fresh one or an application you already have.

## System Requirements & Compatibility

      Build Tool
      Vite 5 / 6
    
    Also works with Create React App and React Router

      React Version
      React 18 & React 19
    
    No server components required

      Styling
      Tailwind CSS v3.4+ / v4
    
    Utility-first CSS styling & design tokens

      Language
      TypeScript 5+ & JS
    
    Strict type checking or pure JavaScript

### What the components actually need

The components are plain React. **None of the 123 files this registry ships imports from `next/*`** — what the CLI writes into your project compiles in a Vite app as-is, with no edits.

The dozen components that render links or images take an injectable element instead of importing one:

        Prop
        Default
        Pass your own when…

        linkComponent
        &lt;a&gt;
        You use React Router — pass its Link. It takes to rather than href, so wrap it if your data uses href.

        imageComponent
        &lt;img&gt;
        You have your own image component. Rarely needed under Vite.

Components that depend on a browser-only library — the maps, which use Leaflet — defer that import until after mount on their own, so there is nothing for you to wrap.

    About the "use client" directive
    Most components start with "use client". Under Vite that line is inert — it is just a string expression, and nothing reads it. Rollup may warn "Module level directives cause errors when bundled" during a production build; the warning is harmless and can be silenced in your Rollup config if it bothers you. Leaving the directive in place keeps the file identical to the one the registry publishes, so future updates apply cleanly.

## Creating a New React App

### Using Vite

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

For plain JavaScript, use the `react` template instead of `react-ts`.

### Install Tailwind CSS

Tailwind v4 ships a first-party Vite plugin, which is the shortest path:

```bash
npm install tailwindcss @tailwindcss/vite
```

Add it to `vite.config.ts`:

```ts

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Then import Tailwind at the top of `src/index.css`:

```css
@import "tailwindcss";
```

### Path aliases — do not skip this

Every component imports through `@/`, so the alias has to resolve in **two** places: TypeScript, for editor and type checking, and Vite, for the actual bundle. Configuring only one is the single most common setup failure, and it fails confusingly — types resolve but the build cannot find the module, or the reverse.

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`vite.config.ts`:

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

If your project splits TypeScript config across `tsconfig.app.json` and `tsconfig.node.json` — which the Vite React template does — put the `paths` block in `tsconfig.app.json`, and mirror `baseUrl` and `paths` into the root `tsconfig.json` so the shadcn CLI can read them.

## Adding components

Components are published as a [shadcn registry](https://ui.shadcn.com/docs/registry), so you install them with the `shadcn` CLI — there is nothing to copy and paste.

### Step 1: Initialize your project

Run this once per project. It creates `components.json`, sets up the `cn` helper and confirms your path aliases.

```bash
npx shadcn@latest init
```

When it asks, answer **no** to React Server Components — a Vite app has none. The resulting `components.json` should read:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

Two fields differ from a Next.js setup: `rsc` is `false`, and `tailwind.css` points at `src/index.css` rather than `src/app/globals.css`.

### Step 2: Add a component

Every component page carries its own command. Point the CLI at the component's URL in the registry:

```bash
npx shadcn@latest add hero.json
```

The CLI writes the source into your project, installs its npm dependencies and pulls in any other registry components it needs. You own the file from that point on — edit it freely.

### Where files land

Install targets mirror this repository's layout, so components that import a sibling keep working:

```bash
src/
├── components/
│   ├── ui/                   # Base primitives (e.g. avatar.tsx, dialog.tsx)
│   ├── custom/               # Reusable blocks & custom components
│   │   ├── blocks/           # Hero, Navigation, Cart & Feature blocks
│   │   └── ui/               # Advanced UI extensions (codeblocks, cards)
│   └── site/                 # Layout wrappers, headers, & sidebars
└── lib/
    ├── utils.ts              # Class merging helper (cn function)
    └── docs.ts               # Content parsing & utility scripts
```

## Adding to an existing React app

If you already have a React project, only three things need to be true before the CLI will work:

1. **Tailwind is installed and imported.** v4 via `@tailwindcss/vite`, or v3.4+ with a `tailwind.config.js`.
2. **The `@/` alias resolves in both TypeScript and your bundler.** See above.
3. **`components.json` exists** — run `init` and answer `no` to RSC.

Nothing else about your app has to change. The registry writes source files into your tree; there is no provider to mount, no wrapper package to depend on, and no build step of its own.

## Troubleshooting

    "Failed to resolve import @/lib/utils"
    The alias is configured in TypeScript but not in Vite, or the reverse. Both files need it — tsconfig.json and vite.config.ts.

    Styles render unstyled
    Confirm @import "tailwindcss"; is in the CSS file your app actually imports, and that components.json points tailwind.css at that same file.

    "Module level directives cause errors when bundled"
    A Rollup warning about "use client". Harmless — the build succeeds and the component works. See the note above.

    Links do not navigate the way you expect
    Components render a plain &lt;a&gt;, which does a full page load. If you use React Router, pass its Link as linkComponent to get client-side navigation.

## Next steps

1. [Adding your first component](/docs/nextjs/first-app) in four steps
2. [Browsing the component library](/docs/nextjs/all-components)
3. [Reading the Architecture](/docs/nextjs/architecture) to see how components are structured

---

**Component Path:** `[framework]\installation\_content\reactjs.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
