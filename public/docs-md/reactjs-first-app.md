# Quick Start

Get an Algorize UI component on screen in a new React + Vite app. For an existing
project, follow the [Installation guide](/docs/reactjs/installation) instead.

## 1. Create a Vite app

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## 2. Set up Tailwind and the path alias

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
/* src/index.css — replace the whole file */
@import "tailwindcss";
```

Add the alias to `compilerOptions` in both `tsconfig.json` and
`tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

## 3. Initialize shadcn

Creates `components.json` and the `cn` helper every component imports.

```bash
npx shadcn@latest init --base radix --preset nova
```

## 4. Register the registry

Tells the CLI where `@algorize-ui/…` components live.

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
```

## 5. Add a component

```bash
npx shadcn@latest add @algorize-ui/card
```

This writes `src/components/custom/blocks/CardBlock.tsx` into your project.

## 6. Use it

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

Run `npm run dev` and open `http://localhost:5173`.

## Next steps

- [Pick a theme](/themes) and paste it into `src/index.css`
- [Browse all components](/docs/reactjs/all-components) — each page has an install command and a usage example

---

**Component Path:** `[framework]\first-app\_content\reactjs.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
