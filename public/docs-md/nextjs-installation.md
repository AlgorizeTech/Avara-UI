# Installation & Setup Guide

Get started with Next.js by creating a new project or adding it to an existing application.

## System Requirements & Compatibility

Before installing Next.js, ensure your environment meets the following requirements:

      Framework
      Next.js App Router
    
    Next.js 14 / 15 App Router Architecture

      React Version
      React 18 & React 19
    
    Full React Server Component Support

      Styling
      Tailwind CSS v3.4+ / v4
    
    Utility-first CSS styling & design tokens

      Language
      TypeScript 5+ & JS
    
    Strict type checking or pure JavaScript

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

## CLI & Manual Component Setup Guide

Whether you prefer automated CLI scaffolding or manual copy-paste integration, follow our enterprise-grade architecture for setting up `/src/components/` and `/src/lib/` directories.

### Option 1: Automated CLI Scaffolding (Recommended)

Quickly initialize the directory structure and copy components using our CLI:

```bash
# Initialize project configuration & directories
npx docs-ui@latest init

# Add specific UI component blocks to your project
npx docs-ui@latest add hero-block avatar cart-block
```

### Option 2: Production Manual Setup & Directory Layout

To maintain zero bundle bloat and ensure 100% code ownership, structure your repository using our standardized layout:

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

### Manual Setup Workflow

1. **Base Primitives (`/src/components/ui/`)**: Place underlying Radix UI or base primitives here.
2. **Custom Blocks (`/src/components/custom/blocks/`)**: Copy-paste high-level UI blocks (e.g. `HeroBlock.tsx`, `Avatar.tsx`, `CartBlock.tsx`).
3. **Utility Helper (`/src/lib/utils.ts`)**: Keep your class merging `cn` helper in the `lib` folder so all components can import it cleanly via `@/lib/utils`.

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

1. [Learning the basics](/docs/nextjs/routing) of Next.js routing
2. [Adding data fetching](/docs/nextjs/data-fetching) to your pages
3. [Styling your application](/docs/nextjs/styling) with CSS
4. [Optimizing performance](/docs/nextjs/performance) with built-in features
5. [Adding authentication](/docs/nextjs/authentication) to protect routes
6. [Testing your application](/docs/nextjs/testing) with Jest or Cypress
7. [Deploying your application](/docs/nextjs/deployment) to production

---

**Component Path:** `nextjs\installation\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
