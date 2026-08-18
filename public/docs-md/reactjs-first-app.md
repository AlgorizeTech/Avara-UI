# Creating Your First App

Two guides in one. The first gets an Algorize UI component rendering in a few
minutes; the rest is a React + Vite walkthrough for anyone starting from scratch.

## Prerequisites

Before you start, make sure you have:

- Node.js 18 or later installed
- A code editor (we recommend Visual Studio Code)
- A terminal or command prompt

## Quick start: your first component

### 1. Create a Vite app

Skip this if you already have one.

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### 2. Set up Tailwind and the `@/` alias

Both are prerequisites for the CLI, and the alias in particular has to be
declared twice — once for TypeScript, once for Vite. The
[Installation guide](/docs/reactjs/installation) covers this in full; the short
version:

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

```css
/* src/index.css */
@import "tailwindcss";
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### 3. Initialize shadcn

Run once per project. It writes `components.json` and the `cn` helper in
`src/lib/utils.ts` that every component imports. Answer **no** when it asks
about React Server Components — a Vite app has none.

```bash
npx shadcn@latest init
```

### 4. Add a component

Every component page carries its own command — this one installs the card:

```bash
npx shadcn@latest add card.json
```

The CLI writes `src/components/custom/blocks/CardBlock.tsx` and installs whatever
that component needs.

### 5. Use it

```tsx
// src/App.tsx

export default function App() {
  return (

          Welcome
          Your first Algorize UI component.

            Edit the file the CLI just wrote — it is yours now.

  );
}
```

Run `npm run dev`, open `http://localhost:5173`, and it is on screen. Every
component page has a **Usage** tab with a full file you can paste the same way.

## Full walkthrough: React + Vite from scratch

Everything below is independent of the quick start above and does not use
Algorize UI. It builds a small React app from an empty directory — start here if
you are new to Vite, or skip it entirely if you already have an app running.

### Step 1: Create a new Vite app

```bash
npm create vite@latest my-first-app -- --template react-ts
cd my-first-app
npm install
```

This scaffolds a React application with:

- TypeScript configured
- Fast HMR through Vite's dev server
- An ES-module build with no bundling in development

### Step 2: Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your new app. Vite prints the URL on start —
note that it is **5173**, not 3000.

### Step 3: Explore the project structure

```bash
my-first-app/
├── public/              # Static assets served as-is
├── src/
│   ├── assets/          # Assets imported by your code
│   ├── App.tsx          # Root component
│   ├── App.css          # Component styles
│   ├── main.tsx         # Entry point — mounts React to the DOM
│   └── index.css        # Global styles
├── index.html           # The HTML shell (at the project root, not in public/)
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

Two things surprise people coming from Next.js. `index.html` lives at the project
root and is the real entry point — Vite transforms it. And there is no
file-system router: `src/main.tsx` mounts a single React tree, and routing is
something you add.

#### src/main.tsx

```tsx

import "./index.css";

createRoot(document.getElementById("root")!).render(

  ,
);
```

#### src/App.tsx

```tsx
export default function App() {
  return (
    
      Welcome
      This is my first React app!
    
  );
}
```

### Step 4: Add routing

Vite has no built-in router. React Router is the usual choice:

```bash
npm install react-router-dom
```

```tsx
// src/main.tsx

import "./index.css";

createRoot(document.getElementById("root")!).render(

        } />
        } />

  ,
);
```

```tsx
// src/routes/About.tsx
export default function About() {
  return (
    
      About
    
  );
}
```

### Step 5: Add navigation

```tsx

export default function Nav() {
  return (

        Home

        About

  );
}
```

This is the substitution to remember when reading a Next.js snippet: `next/link`
with `href` becomes React Router's `Link` with `to`. If you are not using a
router at all, a plain `` is fine.

### Step 6: Create a component

```tsx
// src/components/Greeting.tsx
export default function Greeting({ name }: { name: string }) {
  return Hello, {name}.;
}
```

```tsx
// src/App.tsx

export default function App() {
  return (

  );
}
```

Every component in a Vite app is a client component. There is no server/client
split to think about, which is why the `"use client"` line at the top of Algorize
UI components is simply ignored here.

### Step 7: Fetch data

Without server components, data fetching happens in an effect or through a
library like TanStack Query:

```tsx

type Post = { id: number; title: string };

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/posts")
      .then((response) => response.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    
      {posts.map((post) => (
        {post.title}
      ))}
    
  );
}
```

### Step 8: Add styling

With Tailwind installed as shown in Step 2, utility classes work anywhere. For
component-scoped CSS, Vite supports CSS Modules out of the box:

```css
/* src/components/Card.module.css */
.card {
  border-radius: 0.75rem;
  padding: 1.5rem;
}
```

```tsx

export default function Card() {
  return Content;
}
```

### Step 9: Build and deploy

```bash
npm run build
```

This writes a static bundle to `dist/`, which any static host will serve —
Netlify, Vercel, Cloudflare Pages, S3, or your own nginx.

One deployment detail matters if you added React Router: the host must rewrite
unknown paths to `index.html`, or a hard refresh on `/about` will 404. Most
platforms call this a SPA fallback and it is a single line of configuration.

## Next Steps

1. [Browse the components](/docs/reactjs/all-components) — each page has an install command and a full usage file
2. [Read the Introduction](/docs/reactjs/index) to see how the registry install model works
3. [Check the Architecture](/docs/reactjs/architecture) for how components are structured

## Resources

- [Vite documentation](https://vite.dev)
- [React documentation](https://react.dev)
- [React Router documentation](https://reactrouter.com)
- [Tailwind CSS documentation](https://tailwindcss.com)

---

**Component Path:** `[framework]\first-app\_content\reactjs.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
