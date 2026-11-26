---
title: "Brand Bridge"
description: "Shadcn Brand Bridge. An interactive integration hub card with two columns of brand tiles, a rotating multi-colour hub ring, magnetic gradient wires."
url: https://avaraui.com/docs/nextjs/brand-bridge
---

# Brand Bridge

An interactive integration hub card with two columns of brand tiles, a rotating multi-colour hub ring, magnetic brand-gradient wires, glowing comets, and a reactive 2D particle field.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/brand-bridge

**When to use it.** An interactive integrations card where brand tiles flank a central hub with a rotating colour ring, magnetic gradient wires, glowing comets, and a reactive 2D particle field.

**Gotchas:**

- Autoplay connects each brand one by one in random order, pauses on hover, and hands control to the user on click.
- Supports up to 8 brands (`BRANDS` exports 8 built-in marks; `DEFAULT_BRANDS` uses 6).

### The 2 variants

1. **Core Stack Hub** (`default`): Six-integration card with autoplay wiring, magnetic gradient curves, glowing comets, and a reactive particle field.
   - Live: https://avaraui.com/view/brand-bridge/default
   - Best for: integration showcases and feature cards; tool-ecosystem hero sections
   - Avoid if: you only need a static logo strip
   - Traits: magnetic wires, glowing comets, rotating hub ring, 2D particle field
   - Install: `npx shadcn@latest add @avara-ui/brand-bridge`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/brand-bridge#core-stack-hub
2. **Full Ecosystem Bridge** (`eight-brands`): Eight-integration layout with four brand tiles per column, simultaneous comet pulses, and interactive toggle state.
   - Live: https://avaraui.com/view/brand-bridge/eight-brands
   - Best for: dense integration directories
   - Avoid if: you have fewer than 7 integrations to highlight
   - Traits: 8 brand tiles, magnetic wires, glowing comets, 2D particle field
   - Install: `npx shadcn@latest add @avara-ui/brand-bridge`
   - Set these props: `{"variant":"eight-brands"}`
   - Docs: https://avaraui.com/docs/nextjs/brand-bridge#full-ecosystem-bridge

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/brand-bridge.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/brand-bridge
```

### Full Ecosystem Bridge

Eight-integration layout with four brand tiles per column, simultaneous comet pulses, and interactive toggle state.

- `brands=BRANDS` renders up to 8 brand tiles (4 per side).

```tsx
import { BrandBridge, DEFAULT_BRANDS } from "@/components/custom/blocks/BrandBridgeBlock";

const ECOSYSTEM_BRANDS = [
  ...DEFAULT_BRANDS,
  {
    id: "youtube",
    name: "YouTube",
    colors: ["#FF0000", "#ff7a7a"],
    logo: (
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path
          fill="#FF0000"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
    ),
  },
  {
    id: "apple",
    name: "Apple",
    colors: ["#242423", "#a1a19b"],
    logo: (
      <svg viewBox="0 0 24 24" className="size-6 text-[#242423] dark:text-zinc-100" aria-hidden>
        <path
          fill="currentColor"
          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        />
      </svg>
    ),
  },
];

export default function BrandBridgeEightExample() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <BrandBridge
        brands={ECOSYSTEM_BRANDS}
        title="Entire EcoSystem"
        description="Orchestrate up to eight connected services simultaneously with live data comets and magnetic wire routing."
      />
    </div>
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `brands` | `BridgeBrand[]` | `DEFAULT_BRANDS` | Up to eight brands; the first half stand on the left. Default six (Google, Facebook, Slack, GitHub, Stripe, Spotify). |
| `defaultConnected` | `string[]` | `[]` | Brand IDs connected initially. |
| `autoplay` | `boolean` | `true` | Connects brands one at a time in random order; pauses on hover and stops permanently on tile click. |
| `onToggle` | `(id: string, connected: boolean) => void` | `undefined` | Callback fired when a user clicks a brand tile. |
| `title` | `ReactNode` | `"Unified Workspace"` | Heading displayed beneath the graphic. |
| `description` | `ReactNode` | `"Link your daily stack..."` | Subheading copy beneath the title. |
| `hub` | `ReactNode` | `<BridgeMark />` | Custom icon/element rendered inside the central hub. |
| `particles` | `number` | `48` | Number of ambient particles in the background field (0 to 240). |
| `speed` | `number` | `1` | Comet animation speed multiplier. |
| `className` | `string` | `undefined` | Additional CSS classes for the outer card container. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/brand-bridge
