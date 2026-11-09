---
title: "Shadcn Navbar"
description: "Responsive navbars and headers: a spotlight pill, centered, floating, minimal and glass navbars, and an e-commerce mega menu. Free shadcn/ui Navbar block."
url: https://avaraui.com/docs/nextjs/navbar
---

# Shadcn Navbar

A highly responsive, production-ready Navigation Bar. It manages pure CSS dropdowns for complex desktop menus, and uses CSS transitions to smoothly animate a beautiful slide-out drawer on mobile devices.

Switch any preview to a mobile width with the device buttons to see the hamburger drawer.

## For AI agents

**Ask before you pick.** This page has 7 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 7 options as live previews: https://avaraui.com/view/navbar

**When to use it.** The site header. Seven designs of one responsive navigation bar, from a plain bar with dropdowns to a full e-commerce mega menu; each handles desktop dropdowns and a mobile drawer.

**When to use something else:**

- [Sidebar](https://avaraui.com/docs/nextjs/sidebar): for navigation down the side of an app rather than across the top.

**Gotchas:**

- All seven are looks of the one `navbar` item: install it once and set `variant` from the index. Do not install it again per look.

### The 7 variants

1. **Default navbar** (`default`): The default bar: wordmark, desktop links with dropdowns, and a mobile drawer.
   - Live: https://avaraui.com/view/navbar/default
   - Best for: most sites that need a standard header
   - Avoid if: you want the header to float over a hero or to carry a mega menu
   - Traits: wordmark, dropdown menus, mobile drawer, themed call to action
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#navbar
2. **Centred navbar** (`centered`): Balances the logo in the middle with links either side.
   - Live: https://avaraui.com/view/navbar/centered
   - Best for: brand-led sites, portfolios and studios where the logo should anchor the header
   - Avoid if: you have many links (they split across two sides)
   - Traits: logo in the middle, links either side, mobile drawer
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"centered"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#centered
3. **Minimal navbar** (`minimal`): Drops the border and background entirely so the links sit directly on the page.
   - Live: https://avaraui.com/view/navbar/minimal
   - Best for: clean, content-first pages and hero sections that run to the top edge
   - Avoid if: the page behind the bar is busy (links have no backing)
   - Traits: no border, no background, mobile drawer
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#minimal
4. **Glass navbar** (`glass`): A full-width bar that blurs whatever scrolls beneath it.
   - Live: https://avaraui.com/view/navbar/glass
   - Best for: long pages with imagery, where the bar should stay readable as content passes under it
   - Avoid if: you want a floating pill rather than a full-width bar
   - Traits: full width, backdrop blur, mobile drawer
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#glass
5. **Floating navbar** (`floating`): A pill-shaped glass bar that hovers over the hero.
   - Live: https://avaraui.com/view/navbar/floating
   - Best for: landing pages with a full-bleed hero the header should sit on top of
   - Avoid if: you want a header that fills the full width
   - Traits: pill shape, glass, hovers over content
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"floating"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#floating
6. **Spotlight pill navbar** (`spotlight`): A pill that shrinks and blurs as you scroll, with a sliding hover indicator and a roll-up call-to-action button.
   - Live: https://avaraui.com/view/navbar/spotlight
   - Best for: product and agency sites that want a polished, animated header
   - Avoid if: you want a static header with no scroll-reactive behaviour
   - Traits: scroll-reactive shrink, blur, sliding hover pill, roll-up call to action
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"spotlight"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#spotlight-pill-navbar
7. **E-commerce mega nav** (`ecommerce-mega-nav`): An announcement bar, mega menus with product cards and promo banners, a cart indicator and a mobile drawer.
   - Live: https://avaraui.com/view/navbar/ecommerce-mega-nav
   - Best for: online stores with several product categories
   - Avoid if: your site has a handful of pages and no catalogue
   - Traits: announcement bar, mega menus, product cards, promo banners, cart indicator
   - Install: `npx shadcn@latest add @avara-ui/navbar`
   - Set these props: `{"variant":"ecommerce-mega-nav"}`
   - Docs: https://avaraui.com/docs/nextjs/navbar#e-commerce-mega-nav

## Spotlight Pill Navbar

A sticky pill navbar that smoothly narrows and gains a frosted glass backdrop on scroll, paired with a sliding pill hover indicator behind navigation links and an interactive roll-up CTA button.

- Set `variant="spotlight"` activates the scroll-reactive shrink and blur pill container, sliding hover pill indicator, and dual-layer roll-up CTA button.
- Customize `color` themes the logo mark icon and roll-up CTA button.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function SpotlightHeader() {
  // Sticky pill navbar that shrinks and blurs on scroll, with sliding hover indicator and roll-up CTA.
  return (
    <NavbarBlock
      variant="spotlight"
      color="primary"
      logoText="Nexus"
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/navbar.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/navbar
```

## Examples

### Navbar

The default bar: wordmark, desktop links with dropdowns, and a mobile drawer.

- Set `color="indigo" | "rose" | "emerald" | "zinc" | "primary" | "#hex"` themes the logo mark icon and the primary call-to-action button.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function SiteHeader() {
  return (
    <NavbarBlock
      variant="default"
      color="indigo"
      logoText="Nexus"
    />
  );
}
```

### Centered

- Set `variant="centered"` to balance the logo in the middle with links either side.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function CenteredHeader() {
  // Logo in the middle, links split either side.
  return (
    <NavbarBlock
      variant="centered"
      logoText="Nexus"
    />
  );
}
```

### Floating

- Set `variant="floating"` for a pill-shaped glass bar that hovers over the hero.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function LandingHeader() {
  // A pill that floats over the hero — pair it with a colorful background.
  return (
    <NavbarBlock
      variant="floating"
      logoText="Nexus"
    />
  );
}
```

### Minimal

- Set `variant="minimal"` to drop the border and background entirely.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function MinimalHeader() {
  // Borderless and transparent — lets the page behind it show through.
  return (
    <NavbarBlock
      variant="minimal"
      logoText="Nexus"
    />
  );
}
```

### Glass

- Set `variant="glass"` to keep the full-width bar but blur whatever scrolls beneath it.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function GlassHeader() {
  // Full-width bar with a backdrop blur, so content scrolls under it.
  return (
    <NavbarBlock
      variant="glass"
      logoText="Nexus"
    />
  );
}
```

### E-Commerce Mega Nav

A conversion-focused e-commerce navigation inspired by Framer's E-Commerce Mega Nav. Features a top announcement bar, product-rich mega menus with direct product previews and promotional cards, live search, cart badge with mini-cart, and a responsive mobile drawer with drill-down categories.

- Set `variant="ecommerce-mega-nav"` activates the comprehensive e-commerce navigation with announcement bar, multi-category mega menus, product cards, promo banners, cart indicator, and mobile drawer.
- Pass `logoText="NUTRIFY"` sets the brand name in both the desktop bar and mobile drawer.
- Customize `color` themes the announcement bar, badges, active indicators, and checkout CTA buttons.

```tsx
import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function EcommerceHeader() {
  // A conversion-focused E-Commerce Mega Nav with announcement bar,
  // persistent mega menu panel, product previews, promo banners, cart, and mobile drawer.
  return (
    <NavbarBlock
      variant="ecommerce-mega-nav"
      color="primary"
      logoText="NUTRIFY"
    />
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "floating" \| "centered" \| "minimal" \| "glass" \| "spotlight" \| "ecommerce-mega-nav"` | `"default"` | Determines the structural layout and positioning of the navbar. Use `"ecommerce-mega-nav"` for a full-featured e-commerce header with announcement bar, product-rich mega menus, cart, and mobile drawer. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies global color themes to the logo icon and primary Call-to-Action button. Accepts named themes or valid hex codes (e.g. `"#8b5cf6"`). |
| `logoText` | `string` | `"Nexus"` | The text displayed next to the logo mark. |
| `linkComponent` | `React.ElementType` | `"a"` | The React component used for internal links. In Next.js, pass `next/link` to preserve client-side routing. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/navbar
