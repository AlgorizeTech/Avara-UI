---
title: "Shadcn Footer"
description: "Nine responsive footer layouts for web apps, SaaS platforms, e-commerce stores and enterprise products. Free shadcn/ui Footer block for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/footer
---

# Shadcn Footer

A collection of 9 production-ready, high-capacity, fully responsive Footer components designed for modern web applications, SaaS platforms, e-commerce stores, and enterprise products.

`Footer` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for architectural blueprint drafting grids with interactive liquid ink typography, centered layouts, frosted glass docks, cyberpunk neon glow pulses, quantum particle beams, snapshot studio card piles, colorful modern scroll stack cards, giant glowing scroll-reveal wordmarks, and architectural editorial tilted CTA cards.

## Architectural Blueprint & Liquid Ink Footer (Heron AI Inspired)

- Use `variant="architectural-liquid"` an architectural blueprint drafting grid footer featuring 3D isometric brand cube, technical metrics, and interactive liquid ink typography that organically fills and ripples with fluid physics strictly when hovering directly over the text.
- Wordmark `blueprintWordmark="algorize"` pass any custom wordmark text directly from usage props (defaults to 'algorize').

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function ArchitecturalLiquidFooterDemo() {
  return (
    <Footer
      variant="architectural-liquid"
      blueprintWordmark="algorize"
      heroTitle="CRAFTED FOR EXTRAORDINARY INTERFACES"
    />
  );
}
```

## Editorial Tilted Card Footer

- Use `variant="editorial-card"` an architectural grid studio footer with interactive tabs (Newsletter, Colophon, Privacy Policy), live real-time clock, wireframe globe badge, and a shadow-free tilted CTA card that straightens and lifts on hover.

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function EditorialFooterDemo() {
  return (
    <Footer
      variant="editorial-card"
      brandName="HS"
      editorialCta={{
        headline: "LET'S BUILD SOMETHING MEANINGFUL TOGETHER.",
        buttonText: "START A PROJECT",
        buttonHref: "#",
      }}
    />
  );
}
```

## Snapshot Footer

- Use `variant="snapshot"` a modern studio footer with sunken interactive cards and an animated say hi sticker that lifts out on hover.
- Logo `logo=<img src="/my-logo.svg" />` replaces default brand mark with your full custom company logo (image string or JSX element).

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function SnapshotFooterDemo() {
  return (
    <Footer
      variant="snapshot"
      brandName="Avara UI"
      snapshot={{
        headingLines: ["Design freely.", "Ship extraordinary apps."],
        taglineLines: ["Modern components.", "Infinite creativity.", "Built for everyone."],
        address: ["Avara Studio", "Level 4, Innovation Park", "Dhaka 1212, Bangladesh", "+880 1700 000 000"],
      }}
    />
  );
}
```

## Modern Stack Footer

- Use `variant="modern-stack"` studio footer with multi-colored cards inspired by modern scroll stack and interactive spring hover physics.
- Logo `logo=<img src="/my-logo.svg" />` replaces default brand mark with your full custom company logo (image string or JSX element).

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function ModernStackFooterDemo() {
  return (
    <Footer
      variant="modern-stack"
      brandName="Avara UI"
      snapshot={{
        headingLines: ["Design freely.", "Ship extraordinary apps."],
        taglineLines: ["Modern components.", "Infinite creativity.", "Built for everyone."],
        address: ["Avara Studio", "Level 4, Innovation Park", "Dhaka 1212, Bangladesh", "+880 1700 000 000"],
      }}
    />
  );
}
```

## Wordmark Glow Footer

- Use `variant="wordmark-glow"` a brand footer with solutions columns, direct contact info, legal row, and a giant wordmark that animates in with a staggered spring bounce on scroll alongside a soft pointer glow.
- Logo `logo=<img src="/my-logo.svg" />` full brand logo displayed in top header area; customize via logo or brandName.

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function WordmarkFooterDemo() {
  return (
    <Footer
      variant="wordmark-glow"
      brandName="Avara UI"
      tagline="AI first-round screening for recruiters. Algorize checks every applicant and runs the first interview, day or night."
      wordmark="Algorize"
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/footer.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/footer
```

## Examples

### Simple Centered Footer

- Use `variant="simple-centered"` for clean, spacious centered brand logo and navigation pills.
- Logo `logo=<img src="/my-logo.svg" />` replaces default brand icon & text with your full custom logo component or image string.

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function SimpleFooterDemo() {
  return <Footer variant="simple-centered" />;
}
```

### Glass Dock Footer

- Use `variant="glass-dock"` floating glassmorphism bar dock card with backdrop blur.
- Logo `logo=<img src="/my-logo.svg" />` replaces default brand icon & text with your full custom logo component or image string.

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function GlassDockFooterDemo() {
  return <Footer variant="glass-dock" />;
}
```

### Neon Glow Pulse Cyberpunk Footer

- Use `variant="neon-glow-pulse"` dark cyberpunk theme with glowing border pulse effect.
- Logo `logo=<img src="/my-logo.svg" />` replaces default brand icon & text with your full custom logo component or image string.

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function NeonGlowFooterDemo() {
  return <Footer variant="neon-glow-pulse" />;
}
```

### Quantum Particle Beam Lines Footer

- Use `variant="quantum-particle-beam"` high-energy quantum particle beam lines with glowing neon nodes.
- Logo `logo=<img src="/my-logo.svg" />` replaces default brand icon & text with your full custom logo component or image string.

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function QuantumBeamFooterDemo() {
  return <Footer variant="quantum-particle-beam" />;
}
```

## Features

Discover the key capabilities of the `Footer` component:

### 9 High-Performance Responsive Variants

Includes Architectural Blueprint Liquid, Editorial Tilted Card, Snapshot, Modern Stack, Wordmark Glow, Simple Centered, Glass Dock, Neon Glow Pulse, and Quantum Particle Beam.

### 100% Screen & Device Responsive

Fluid Tailwind CSS grid and flex layouts built to adapt from 320px mobile viewports up to 4K ultra-wide screens.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `FooterVariant` | `"snapshot"` | Selects from the 9 footer variants (`"architectural-liquid"`, `"editorial-card"`, `"snapshot"`, `"modern-stack"`, `"wordmark-glow"`, `"simple-centered"`, `"glass-dock"`, `"neon-glow-pulse"`, `"quantum-particle-beam"`). |
| `blueprintWordmark` | `string` | `"AVARA UI"` | Custom text for the architectural blueprint wordmark with interactive liquid ink hover physics in `variant="architectural-liquid"`. Supports all alphanumeric characters and symbols. |
| `heroTitle` | `string` | `"CRAFTED FOR EXTRAORDINARY INTERFACES"` | Top headline statement for `variant="architectural-liquid"`. |
| `architecturalLiquid` | `ArchitecturalLiquidFooterProps` | Heron AI architectural layout copy | Customization options for the `"architectural-liquid"` variant: `headline`, `brandWordmark`, `subscribeText`, `addressLines`, `directionHref`, `businessEmail`, `inquiryEmail`, `navColumns`, `socials`, and `legalLinks`. |
| `color` | `string` | `"primary"` | Accent theme color (e.g. `"indigo"`, `"rose"`, `"emerald"`, `"lavender"`, or hex). Bridges with the active color picker to style interactive stickers, badges, and glows. |
| `snapshot` | `SnapshotFooterContent` | Marlo Studio demo copy | Content for `variant="snapshot"`: `headingLines`, `description`, `taglineLines`, five `photos` (`&#123; src, caption &#125;`), note card `address`, `hours`, `stickerText` and `legalLinks`. Every field is optional. |
| `editorialCta` | `EditorialFooterProps` | Husham Sam inspired editorial defaults | Content for `variant="editorial-card"`: `headline`, `buttonText`, `buttonHref`, `menuLinks`, `copyright`, and `rightsText`. |
| `sections` | `FooterLinkSection[]` | Per-variant columns | Link columns. A link may carry a `badge` (e.g. `3`), shown as a count pill by `snapshot`. |
| `brandName` | `string` | `"Avara UI"` | Brand name string displayed in the logo header. |
| `tagline` | `string` | `"Elevate your web..."` | Brand vision tagline text. |
| `logo` | `React.ReactNode \| string` | Built-in Vector Logo | Custom logo component or image URL string. When provided, replaces the default brand logo area completely across all variants without requiring local icon assets. |
| `socialLinks` | `SocialLink[]` | X, GitHub, LinkedIn, YouTube, Instagram | The social row, rendered by [Social Links](https://avaraui.com/docs/reactjs/social-links). Each entry is `&#123; network, href, label? &#125;`; pass only the networks you have. |
| `className` | `string` | `""` | Custom Tailwind CSS class overrides. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/footer
