# Installation & Setup Guide

Get started with Next.js by creating a new project or adding it to an existing application.

## System Requirements & Compatibility

Before installing Next.js, ensure your environment meets the following requirements:

      Framework
      Next.js App Router
    
    Next.js 14 / 15 / 16 App Router Architecture

      React Version
      React 18 & React 19
    
    Full React Server Component Support

      Styling
      Tailwind CSS v3.4+ / v4
    
    Utility-first CSS styling & design tokens

      Language
      TypeScript 5+ & JS
    
    Strict type checking or pure JavaScript

### Next.js 16

Every component installs and builds unchanged on Next.js 16. Nothing in the library touches an API that Next.js 16 removed — there is no synchronous `params`, `searchParams`, `cookies()`, `headers()` or `draftMode()` access, no `next/legacy/image`, no legacy `` props, no `next/amp`, and no runtime config. The components import no Next.js API at all: those that render links or images take a `linkComponent` / `imageComponent` prop instead, and the ones wrapping a browser-only library defer it themselves after mount. Pass `next/link` and `next/image` into those props to keep prefetching and image optimisation — each of their pages shows the line.

    What Next.js 16 asks of your project
    Next.js 16 itself raises the floor: Node.js 20.9+, TypeScript 5.1+ and React 19.2, with Turbopack as the default bundler for next dev and next build. These are requirements of the framework, not of the components — the library builds cleanly under Turbopack. If your app still has a custom webpack config, either migrate it to turbopack or run next build --webpack.

## Creating a New Next.js App

### Using create-next-app

The easiest way to get started is with `create-next-app`, which sets up everything automatically:

```bash
npx create-next-app@latest
```

For TypeScript support:
```bash
npx create-next-app@latest --typescript
```

For the App Router (default in Next.js 13+):
```bash
npx create-next-app@latest --app
```

You can also combine flags:
```bash
npx create-next-app@latest my-app --typescript --app
```

Answer **yes** to the Tailwind CSS prompt — `create-next-app` then installs it and writes
`src/app/globals.css` for you, and you can skip the manual Tailwind setup below. If you answered
**no**, or you are adding Algorize UI to an app that predates the prompt, set Tailwind up by hand.

Every prompt and flag is documented in the
[Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation).

## Adding components

Components are published as a [shadcn registry](https://ui.shadcn.com/docs/registry), so you install them with the `shadcn` CLI — there is nothing to copy and paste.

Tailwind CSS has to be working before any of this produces a styled component. If
`create-next-app` did not set it up for you, do
[Installation & Peer Dependencies Setup](#installation--peer-dependencies-setup) further down
this page first, then come back here.

### Step 1: Initialize your project

Run this once per project. It creates `components.json`, writes `src/lib/utils.ts` with the
`cn` helper, and confirms your path aliases.

Algorize UI components are built on Radix primitives, so select the Radix base. Passing it on
the command line also keeps the command usable in CI:

```bash
npx shadcn@latest init --base radix --preset nova
```

Running it without flags is fine too — the CLI will ask which component library to use
(**choose Radix UI**, not the recommended default) and which preset. Any preset works; it only
sets the starting theme.

### Step 2: Pick a theme

Do this before you add anything. Every component reads its colours, radius and fonts from CSS
variables rather than hard-coded classes, and `shadcn init` only wrote the default set.

Open the [Themes page](/themes), choose a preset or customise one, press **Copy Code**, and paste
the block into `src/app/globals.css` — underneath the `@import "tailwindcss";` line.

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

### TypeScript Path Alias Setup (`tsconfig.json`)

`create-next-app` already configures this, so there is normally nothing to do — just confirm
your `tsconfig.json` contains the `paths` entry. **Add** it to the existing `compilerOptions`
rather than replacing the file; the generated config also carries `strict`, `noEmit`,
`moduleResolution` and the Next plugin, and losing those breaks the build:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Do not add `baseUrl`. It is deprecated in TypeScript 6 and reported as an error (`TS5101`),
and `paths` has resolved relative to its own config file since TypeScript 4.4.

The CLI creates these directories as needed, so you do not have to make them yourself. `shadcn init` also writes `/src/lib/utils.ts` with the `cn` helper that every component imports from `@/lib/utils`.

## Installation & Peer Dependencies Setup

Follow this step-by-step guide to install common peer dependencies, configure Tailwind CSS, and set up the class name helper utility (`cn`).

### Step 1: Install Common Peer Dependencies

Install the core peer dependencies used across our UI components for animations, icons and themes.
`lucide-react` and the `cn` helper below are what every component imports, so no component page
lists them again — each page's install step names only what that component adds on top:

```bash
npm install framer-motion lucide-react next-themes clsx tailwind-merge
```

      Animation Engine
      framer-motion
    
    Physics-based spring animations & 3D drag gestures

      Icon System
      lucide-react
    
    Clean, responsive SVG icon suite for all components

      Theme Engine
      next-themes
    
    Seamless Light / Dark mode switching & system sync

### Step 2: Verify the `cn` Helper

`shadcn init` already created `src/lib/utils.ts` for you in the previous step. Open it and confirm
it matches the following — every component imports `cn` from `@/lib/utils`, so this file has to
exist before any component will compile:

```typescript

/**
 * Merges Tailwind CSS classes cleanly without class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 3: Install Tailwind CSS

Skip ahead to Step 4 if `create-next-app` already set Tailwind up for you. Otherwise there are
three parts, and the last one is the one people miss.

The canonical version of this process is Tailwind's own
[Next.js installation guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs);
what follows is that same process with the Algorize UI specifics folded in.

#### 1. Install the packages

Next.js compiles CSS through PostCSS, so v4 goes in as a PostCSS plugin — not the Vite plugin the
React guide uses:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

#### 2. Register the plugin in `postcss.config.mjs`

Create the file in the root of your project:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

#### 3. Add the Tailwind import to `src/app/globals.css`

Installing the package does not switch Tailwind on. Nothing generates a single utility class
until your global stylesheet imports Tailwind, and the failure is silent — the install succeeds,
`next dev` starts, `next build` passes, and every component renders completely unstyled.

Make `@import "tailwindcss";` the **first line** of `src/app/globals.css` — or `app/globals.css`
if you skipped the `src/` directory:

```css
@import "tailwindcss";
```

    Two things that make this line fail quietly
    
      It has to be the first rule in the file. CSS requires @import to come before every other rule, so an @import sitting underneath your own styles is discarded by the browser without an error.
      Your root layout has to import that stylesheet. create-next-app puts import "./globals.css"; at the top of src/app/layout.tsx. If your layout does not have it, Tailwind never reaches the page.

### Step 4: Confirm your Tailwind v4 theme

Tailwind v4 is CSS-first — there is no `tailwind.config.ts` to create, and `create-next-app` no
longer emits one. `shadcn init` already wrote the theme tokens into your global stylesheet. Open
`src/app/globals.css` and confirm it starts with something like:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

Content paths are detected automatically, so there is no `content` array to maintain. Container
queries (`@container`, `@sm:`, `@lg:`) are built into v4 — no plugin required; several components
use them to respond to their parent's width rather than the viewport.

Migrating an existing v3 config? Run `npx @tailwindcss/upgrade` rather than porting it by hand.
Do not hand-write a `tailwind.config.ts` with `darkMode: ["class"]` — v4 types that field as
`"class"` or `["class", string]`, so the mismatch fails `next build` type checking.

    Components render completely unstyled
    Almost always the missing @import "tailwindcss";. Check three things, in order: the line is the first rule in src/app/globals.css; your root layout imports that file; and components.json points tailwind.css at that same file. Installing @tailwindcss/postcss on its own generates nothing.

## Development Server

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## TypeScript Setup

### New Projects

Create a TypeScript project:
```bash
npx create-next-app@latest --typescript
```

### Existing Projects

Add TypeScript to an existing project:

1. Install TypeScript dependencies:
```bash
npm install --save-dev typescript @types/react @types/node @types/react-dom
```

2. Create a `tsconfig.json` file:
```bash
touch tsconfig.json
```

3. Start the development server:
```bash
npm run dev
```

Next.js will automatically configure TypeScript for you.

## First Steps

After installation, try these first steps:

1. **Edit the home page**:
   Modify `app/page.js` to change the content

2. **Add a new route**:
   Create `app/about/page.js`:
   ```jsx
   export default function About() {
     return About Page
   }
   ```

3. **Add a component**:
   Create `components/Header.js`:
   ```jsx
   export default function Header() {
     return My Header
   }
   ```

4. **Use the component**:
   Import and use in `app/page.js`:
   ```jsx
   import Header from '@/components/Header'
   
   export default function Home() {
     return (

         Hello, Next.js!
       
     )
   }
   ```

## Next Steps

After setting up your project, consider:

1. [Adding your first component](/docs/nextjs/first-app) in four steps
2. [Browsing the component library](/docs/nextjs/all-components)
3. [Reading the Architecture](/docs/nextjs/architecture) to see how components are structured

### Upstream documentation

This page covers only what Algorize UI needs. For the complete installation process for each tool
underneath it:

    Next.js
    Installation
    Every create-next-app prompt and flag, plus the manual setup

    Tailwind CSS v4
    Install with Next.js
    The official steps, including the @import "tailwindcss"; line

    Next.js
    Full documentation
    Routing, data fetching, and deployment for the framework itself

    shadcn
    CLI reference
    Every flag on init and add, and the components.json schema

---

**Component Path:** `[framework]\installation\_content\nextjs.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
