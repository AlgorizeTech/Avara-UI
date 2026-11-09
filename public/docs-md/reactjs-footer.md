---
title: "Shadcn Footer"
description: "Nine responsive footer layouts for web apps, SaaS platforms, e-commerce stores and enterprise products. Free shadcn/ui Footer block for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/footer
---

# Shadcn Footer

A collection of 9 production-ready, high-capacity, fully responsive Footer components designed for modern web applications, SaaS platforms, e-commerce stores, and enterprise products.

`Footer` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for architectural blueprint drafting grids with interactive liquid ink typography, centered layouts, frosted glass docks, cyberpunk neon glow pulses, quantum particle beams, snapshot studio card piles, colorful modern scroll stack cards, giant glowing scroll-reveal wordmarks, and architectural editorial tilted CTA cards.

## For AI agents

**Ask before you pick.** This page has 9 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 9 options as live previews: https://avaraui.com/view/footer

**When to use it.** The closing section of a page or app. Nine designs of one component, from a plain centred footer to a blueprint grid with liquid-ink type; each is a different layout, not a restyle.

**When to use something else:**

- [Newsletter](https://avaraui.com/docs/reactjs/newsletter): for a stand-alone sign-up section above the footer.
- [CTA Section](https://avaraui.com/docs/reactjs/cta-section): for a closing call to action that is its own section rather than part of the footer.
- [Navbar](https://avaraui.com/docs/reactjs/navbar): for the site header; the footer only carries links at the bottom of the page.

**Gotchas:**

- The component's own default is `simple-centered`, but the docs preview defaults to `snapshot`. Always pass `variant` explicitly; the chosen look's `props` in the index are the values to set.
- All nine are looks of the one `footer` item: install it once, then set `variant`. Do not install it again per look.
- Each look takes its content through its own prop: `sections` for the link columns of most looks, `editorialCta` for `editorial-card`, `architecturalLiquid` for `architectural-liquid`, `wordmarkFooter` for `wordmark-glow`, `snapshot` for `snapshot` and `modern-stack`. A `sections` array does not reach `editorial-card` or `architectural-liquid`.
- Several names are aliases of a look: `tilted-cta` is `editorial-card`, `heron-blueprint` and `blueprint-liquid` are `architectural-liquid`, `snapshot-stack` is `modern-stack`.

### The 9 variants

1. **Editorial tilted card footer** (`editorial-card`): Grid studio footer with Newsletter, Colophon and Privacy tabs, a live clock, a globe badge and a tilted call-to-action.
   - Live: https://avaraui.com/view/footer/editorial-card
   - Best for: studios, agencies and portfolios that want a strong closing call to action; a footer that carries a newsletter sign-up without a separate section
   - Avoid if: you need several columns of grouped links (it takes a flat menu list, not columns); you want a quiet footer that stays out of the way
   - Traits: tabs, live clock, tilted card, newsletter field, interactive, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"editorial-card"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#editorial-tilted-card-footer
2. **Snapshot footer** (`snapshot`): Modern studio footer with sunken interactive cards, address and hours, and a say-hi sticker that lifts out on hover.
   - Live: https://avaraui.com/view/footer/snapshot
   - Best for: small studios and agencies that want a warm, personal footer with an address and opening hours; a footer that shows a few cards of news or notes
   - Avoid if: you want a plain list of links and nothing else; you want no hover effects
   - Traits: interactive cards, sticker, address and hours, custom logo, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"snapshot"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#snapshot-footer
3. **Modern stack footer** (`modern-stack`): Studio footer made of multi-coloured cards with spring hover physics, in the style of a scroll stack.
   - Live: https://avaraui.com/view/footer/modern-stack
   - Best for: playful, colourful brands, creative studios and consumer products; a footer that feels like part of the page's design rather than an afterthought
   - Avoid if: your brand is sober or single-colour, unless you set each card's `bgColor` and `textColor`; you want a quiet footer
   - Traits: multi-coloured cards, spring hover, interactive, custom logo, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"modern-stack"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#modern-stack-footer
4. **Wordmark glow footer** (`wordmark-glow`): Brand footer with solution columns, contact details and a legal row, under a giant wordmark that bounces in on scroll.
   - Live: https://avaraui.com/view/footer/wordmark-glow
   - Best for: product and SaaS brands with a short name worth showing off; a footer that needs full link columns, direct contact info and a legal row
   - Avoid if: you want a compact footer (the wordmark takes a lot of height); you have no brand name or logo to feature
   - Traits: giant wordmark, scroll reveal, pointer glow, link columns, contact info, legal row, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"wordmark-glow"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#wordmark-glow-footer
5. **Architectural blueprint and liquid ink footer** (`architectural-liquid`): Blueprint grid with a 3D isometric brand cube, technical metrics and a wordmark that fills like liquid ink on hover.
   - Live: https://avaraui.com/view/footer/architectural-liquid
   - Best for: developer tools, AI and technical products that want a statement footer; a footer with an email sign-up, address and directions link built in
   - Avoid if: you want a quiet footer that stays out of the way; you need only a row of links and social icons
   - Traits: blueprint grid, 3D cube, liquid-ink wordmark, email sign-up, address, interactive, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"architectural-liquid"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#architectural-blueprint-liquid-ink-footer-heron-ai-inspired
6. **Neon glow pulse footer** (`neon-glow-pulse`): Cyberpunk footer card with a pulsing glowing border in the theme's primary colour and four link columns.
   - Live: https://avaraui.com/view/footer/neon-glow-pulse
   - Best for: gaming, crypto and developer products with a neon, high-energy look; a footer that matches a dark, techy page
   - Avoid if: your brand is calm, formal or corporate; you want a flat footer without glow or pulsing motion
   - Traits: glowing border, pulse animation, dark techy look, four link columns, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"neon-glow-pulse"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#neon-glow-pulse-cyberpunk-footer
7. **Quantum particle beam footer** (`quantum-particle-beam`): Gradient footer card with animated particle beam lines and glowing nodes, and four link columns.
   - Live: https://avaraui.com/view/footer/quantum-particle-beam
   - Best for: AI, data and infrastructure products that want an animated, high-energy footer; a footer with more visual interest than a card but still a normal link layout
   - Avoid if: you want a calm, static footer; your brand is formal or traditional
   - Traits: particle beam lines, glowing nodes, gradient card, four link columns, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"quantum-particle-beam"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#quantum-particle-beam-lines-footer
8. **Simple centred footer** (`simple-centered`): Clean, spacious footer: a centred brand logo, navigation pills and a social row.
   - Live: https://avaraui.com/view/footer/simple-centered
   - Best for: most sites that need a standard, low-key footer; portfolios, docs sites and small products
   - Avoid if: you want a footer that makes a statement or carries a sign-up form; you need rich contact details in the footer
   - Traits: centred, navigation pills, social row, minimal, custom logo, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"simple-centered"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#simple-centered-footer
9. **Glass dock footer** (`glass-dock`): A floating frosted-glass card with backdrop blur holding the brand, four link columns and a social row.
   - Live: https://avaraui.com/view/footer/glass-dock
   - Best for: pages with a soft gradient or image behind the footer, where a frosted card shows through; a modern, light footer with a full set of link columns
   - Avoid if: you want a flat, full-width footer bar; the page behind the footer is a plain solid colour (the blur then adds nothing)
   - Traits: frosted glass, backdrop blur, floating card, four link columns, custom logo, uses the `footer` item
   - Install: `npx shadcn@latest add @avara-ui/footer`
   - Set these props: `{"variant":"glass-dock"}`
   - Docs: https://avaraui.com/docs/nextjs/footer#glass-dock-footer

## Architectural Blueprint & Liquid Ink Footer (Heron AI Inspired)

- Use `variant="architectural-liquid"` an architectural blueprint drafting grid footer featuring 3D isometric brand cube, technical metrics, and interactive liquid ink typography that organically fills and ripples with fluid physics strictly when hovering directly over the text.
- Wordmark `blueprintWordmark="Avara UI"` pass any custom wordmark text directly from usage props (defaults to 'Avara UI').

```tsx
import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function ArchitecturalLiquidFooterDemo() {
  return (
    <Footer
      variant="architectural-liquid"
      blueprintWordmark="Avara UI"
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
      tagline="AI first-round screening for recruiters. Avara UI checks every applicant and runs the first interview, day or night."
      wordmark="Avara UI"
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
