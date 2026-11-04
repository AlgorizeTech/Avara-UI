---
title: "Shadcn Navbar"
description: "Responsive navbars and headers: a spotlight pill, centered, floating, minimal and glass navbars, and an e-commerce mega menu. Free shadcn/ui Navbar block."
url: https://avaraui.com/docs/nextjs/navbar
---

# Shadcn Navbar

A highly responsive, production-ready Navigation Bar. It manages pure CSS dropdowns for complex desktop menus, and uses CSS transitions to smoothly animate a beautiful slide-out drawer on mobile devices.

Switch any preview to a mobile width with the device buttons to see the hamburger drawer.

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
