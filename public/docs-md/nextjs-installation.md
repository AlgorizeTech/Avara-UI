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

Every component installs and builds unchanged on Next.js 16. Nothing in the library touches an API that Next.js 16 removed — there is no synchronous `params`, `searchParams`, `cookies()`, `headers()` or `draftMode()` access, no `next/legacy/image`, no legacy `` props, no `next/amp`, and no runtime config. The only Next.js APIs the components reach for are `next/link`, `next/image` and `next/dynamic`, and the ones that defer a browser-only library with `ssr: false` already carry `"use client"` — so they behave the same under both versions.

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

## Adding components

Components are published as a [shadcn registry](https://ui.shadcn.com/docs/registry), so you install them with the `shadcn` CLI — there is nothing to copy and paste.

### Step 1: Initialize your project

Run this once per project. It creates `components.json`, sets up the `cn` helper and confirms your path aliases.

```bash
npx shadcn@latest init
```

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

### TypeScript Path Alias Setup (`tsconfig.json`)

Ensure your `@/*` path aliases are properly configured so all component imports resolve cleanly across your application:

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

The CLI creates these directories as needed, so you do not have to make them yourself. `shadcn init` also writes `/src/lib/utils.ts` with the `cn` helper that every component imports from `@/lib/utils`.

## Installation & Peer Dependencies Setup

Follow this step-by-step guide to install common peer dependencies, configure Tailwind CSS, and set up the class name helper utility (`cn`).

### Step 1: Install Common Peer Dependencies

Install the core peer dependencies used across our UI components for animations, icons, themes, and interactive resizable layouts:

```bash
npm install framer-motion lucide-react next-themes re-resizable clsx tailwind-merge
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

      Layout Handling
      re-resizable
    
    Drag-to-resize split containers & preview panels

### Step 2: Create the `cn` Helper Function

Create a file at `src/lib/utils.ts` (or `lib/utils.js`) and paste the following helper implementation:

```typescript

/**
 * Merges Tailwind CSS classes cleanly without class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 3: Install & Configure Container Queries (`@container`)

To enable native container queries for responsive component boundaries, install the official plugin:

```bash
npm install -D @tailwindcss/container-queries
```

### Step 4: Configure `tailwind.config.ts`

Ensure your Tailwind CSS configuration file is set up with plugins and content paths:

```typescript

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
```

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
4. For the framework itself — routing, data fetching, deployment — see the
   [Next.js documentation](https://nextjs.org/docs)

---

**Component Path:** `nextjs\installation\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
