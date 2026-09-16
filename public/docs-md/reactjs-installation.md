# Installation & Setup Guide

Get started with Algorize UI in a React project built on Vite — either a fresh one or an application you already have.

## System Requirements & Compatibility

      Build Tool
      Vite 5 &ndash; 8
    
    Also works with Create React App and React Router

      React Version
      React 18 & React 19
    
    No server components required

      Styling
      Tailwind CSS v4
    
    Utility-first CSS styling & design tokens

      Language
      TypeScript 5 & 6
    
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

Already have a React app? Skip ahead to [Adding to an existing React app](#adding-to-an-existing-react-app).
For the full walkthrough — every template, every flag, and the dev-server options — see Vite's
[Getting Started guide](https://vite.dev/guide/) and React's
[Creating a React App](https://react.dev/learn/creating-a-react-app).

### Install Tailwind CSS

Tailwind v4 ships a first-party Vite plugin, which is the shortest path. Three steps, then a
check. **None of the three are optional**, and the third is the one people skip.

The canonical version of this process is Tailwind's own
[Using Vite guide](https://tailwindcss.com/docs/installation/using-vite); what follows is that
same process with the Algorize UI specifics folded in.

#### 1. Install the packages

```bash
npm install tailwindcss @tailwindcss/vite
```

#### 2. Register the plugin in `vite.config.ts`

```ts

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

#### 3. Add `@import "tailwindcss";` to `src/index.css`

Installing the plugin does not switch Tailwind on. Nothing generates a single utility class
until your stylesheet imports Tailwind, and the failure is silent — the install succeeds, the
dev server starts, the build passes, and every component renders completely unstyled.

`src/index.css` already exists in the Vite React template, but it is starter boilerplate:
`:root` colour tokens, and a `#root` rule that pins the app to a fixed width and centres its
text. Those rules do not go away when you add Tailwind — they fight the layout utilities the
components rely on. **Replace the entire file** with:

```css
@import "tailwindcss";
```

    Two things that make this line fail quietly
    
      It has to be the first rule in the file. CSS requires @import to come before every other rule, so an @import sitting underneath your own styles is discarded by the browser without an error.
      Your entry file has to import that stylesheet. The Vite template's src/main.tsx already carries import "./index.css";. If you removed that line, or your project puts its global CSS somewhere else, Tailwind never reaches the page.

While you are here, delete `src/App.css` along with the `import "./App.css";` line in
`src/App.tsx` — it holds the rest of the template's starter styling.

#### 4. Confirm it worked

```bash
npm run dev
```

Put the classes `text-3xl font-bold underline` on a heading in `src/App.tsx`. If it renders
large, bold and underlined, Tailwind is compiling and you can move on to the path aliases. If it
renders as plain text, step 3 is the thing to re-check.

### Path aliases — do not skip this

Every component imports through `@/`, so the alias has to resolve in **two** places: TypeScript, for editor and type checking, and Vite, for the actual bundle. Configuring only one is the single most common setup failure, and it fails confusingly — types resolve but the build cannot find the module, or the reverse.

`tsconfig.json` — the Vite React template uses project references, so **add** the
`compilerOptions` block and keep `files` and `references` exactly as they are. Replacing
the whole file drops the references, and with them the `noEmit` that lives in
`tsconfig.app.json`, which makes `tsc -b` emit stray `.js` files next to your sources:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Do not add `baseUrl`. It is deprecated in TypeScript 6 and reported as an error
(`TS5101`), which fails the build — and it has been unnecessary since TypeScript 4.4,
because `paths` resolve relative to the config file that declares them.

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

If your project splits TypeScript config across `tsconfig.app.json` and `tsconfig.node.json` — which the Vite React template does — put the `paths` block in `tsconfig.app.json`, and mirror `paths` into the root `tsconfig.json` so the shadcn CLI can read them.

## Adding components

Components are published as a [shadcn registry](https://ui.shadcn.com/docs/registry), so you install them with the `shadcn` CLI — there is nothing to copy and paste.

### Step 1: Initialize your project

Run this once per project. It creates `components.json`, writes `src/lib/utils.ts` with the
`cn` helper, installs `lucide-react` as the icon library, and confirms your path aliases.
Every component imports those two, which is why no component page lists them again —
each page's install step names only what that component adds on top.

Algorize UI components are built on Radix primitives, so select the Radix base. Passing it
on the command line also keeps the command usable in CI:

```bash
npx shadcn@latest init --base radix --preset nova
```

Running it without flags is fine too — the CLI will ask which component library to use
(**choose Radix UI**, not the recommended default) and which preset. Any preset works;
it only sets the starting theme.

The CLI detects Vite and sets `rsc` to `false` for you. The resulting `components.json`
should read:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
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

### Step 2: Pick a theme

Do this before you add anything. Every component reads its colours, radius and fonts from CSS
variables rather than hard-coded classes, and `shadcn init` only wrote the default set.

Open the [Themes page](/themes), choose a preset or customise one, press **Copy Code**, and paste
the block into `src/index.css` — underneath the `@import "tailwindcss";` line you added earlier.

Adding components first is not fatal; they render in the default palette until you paste your
own variables in. Doing it now just means the first component you install already looks like
your product.

### Step 3: Add a component

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

1. **Tailwind v4 is installed and imported.** The `@tailwindcss/vite` plugin is registered in
   `vite.config.ts`, **and** `@import "tailwindcss";` is the first line of the CSS file your entry
   point imports. Both halves are required — see [Install Tailwind CSS](#install-tailwind-css)
   above, or Tailwind's [Using Vite guide](https://tailwindcss.com/docs/installation/using-vite)
   for the full process.
2. **The `@/` alias resolves in both TypeScript and your bundler.** See
   [Path aliases](#path-aliases--do-not-skip-this) above.
3. **`components.json` exists** — run `init` and answer `no` to RSC.

Then paste a theme from the [Themes page](/themes) into your entry CSS, and you are on the same
footing as a fresh project.

Nothing else about your app has to change. The registry writes source files into your tree; there is no provider to mount, no wrapper package to depend on, and no build step of its own.

Still on Tailwind v3? Run `npx @tailwindcss/upgrade` rather than porting the config by hand —
the components are written against v4 tokens.

## Troubleshooting

    "Failed to resolve import @/lib/utils"
    The alias is configured in TypeScript but not in Vite, or the reverse. Both files need it — tsconfig.json and vite.config.ts.

    Components render completely unstyled
    Almost always the missing @import "tailwindcss";. Check three things, in order: the line is the first rule in src/index.css; src/main.tsx imports that file; and components.json points tailwind.css at that same file. Installing @tailwindcss/vite alone generates nothing. Install Tailwind CSS walks through it, step by step.

    "Module level directives cause errors when bundled"
    A Rollup warning about "use client". Harmless — the build succeeds and the component works. See the note above.

    Links do not navigate the way you expect
    Components render a plain &lt;a&gt;, which does a full page load. If you use React Router, pass its Link as linkComponent to get client-side navigation.

## Next steps

1. [Adding your first component](/docs/nextjs/first-app) in four steps
2. [Browsing the component library](/docs/nextjs/all-components)
3. [Reading the Architecture](/docs/nextjs/architecture) to see how components are structured

### Upstream documentation

This page covers only what Algorize UI needs. For the complete installation process for each
tool underneath it:

    Vite
    Getting Started
    Scaffolding a project, every template, and the dev-server options

    React
    Creating a React App
    How the React team recommends starting a new project

    Tailwind CSS v4
    Install with Vite
    The five official steps, including the @import "tailwindcss"; line

    shadcn
    CLI reference
    Every flag on init and add, and the components.json schema

---

**Component Path:** `[framework]\installation\_content\reactjs.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
