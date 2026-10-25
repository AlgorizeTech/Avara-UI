# Quick Start

Get a Avara UI component on screen in a new Next.js app. For an existing
project, follow the [Installation guide](/docs/nextjs/installation) instead.

## 1. Create a Next.js app

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
```

## 2. Initialize shadcn

Creates `components.json` and the `cn` helper every component imports.

```bash
npx shadcn@latest init --base radix --preset nova
```

## 3. Register the registry

Tells the CLI where @avara-ui/… components live.

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
```

## 4. Add a component

```bash
npx shadcn@latest add https://avaraui.com/r/card.json
```

This writes `components/custom/blocks/CardBlock.tsx` into your project.

## 5. Use it

```tsx
// app/page.tsx

export default function Home() {
  return (

          Welcome
          Your first installed component.

            Edit the file the CLI just wrote — it is yours now.

  );
}
```

Run `npm run dev` and open `http://localhost:3000`.

## Next steps

- [Pick a theme](/themes) and paste it into `globals.css`
- [Browse all components](/docs/nextjs/all-components) — each page has an install command and a usage example

---

**Component Path:** `[framework]\first-app\_content\nextjs.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
