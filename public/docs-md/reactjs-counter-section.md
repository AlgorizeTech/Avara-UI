---
title: "Shadcn Counter Section"
description: "Shadcn Counter Section. A collection of 4 animated high-impact Counter and Stats Sections designed for modern landing pages, SaaS platforms, agency portfolios."
url: https://avaraui.com/docs/nextjs/counter-section
---

# Shadcn Counter Section

A collection of 4 animated high-impact Counter and Stats Sections designed for modern landing pages, SaaS platforms, agency portfolios, and enterprise portals. From high-tech telemetry HUDs to clean agency minimalism with monospace slash labels, architectural halftone strips, and interactive cursor spotlights. All variants are built with viewport-triggered count-up animations, zero shadows, clean flat borders, and full adaptive styling for both Light and Dark modes.

## For AI agents

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/counter-section

**When to use it.** A stats row for a landing page: big animated numbers with labels. Four designs, from a developer terminal HUD to an architectural halftone strip.

**When to use something else:**

- [Counter](https://avaraui.com/docs/reactjs/counter): for a single animated number or stepper rather than a whole stats section.

**Gotchas:**

- All four are looks of the one `counter-section` item: install it once and set `variant` from the index. Pass your own numbers through the `stats` prop.

### The 4 variants

1. **Cyber HUD** (`cyber-hud`): A developer and fintech terminal HUD with corner crosshairs, scanlines, status LEDs and decrypting characters on reveal.
   - Live: https://avaraui.com/view/counter-section/cyber-hud
   - Best for: developer tools, fintech and security products
   - Avoid if: your brand is warm, soft or editorial
   - Traits: terminal look, scanlines, status LEDs, character scramble on reveal
   - Install: `npx shadcn@latest add @avara-ui/counter-section`
   - Set these props: `{"variant":"cyber-hud"}`
   - Docs: https://avaraui.com/docs/nextjs/counter-section#1-cyber-hud-terminal-telemetry
2. **Spotlight gradient** (`spotlight-gradient`): Floating cards lit by a radial spotlight that follows the cursor, with gradient accents, icon badges and trend metrics.
   - Live: https://avaraui.com/view/counter-section/spotlight-gradient
   - Best for: SaaS and product sites that want a polished, interactive stats row
   - Avoid if: your visitors are mostly on touch devices (the spotlight follows a cursor)
   - Traits: cursor-tracking spotlight, gradient accents, category icon badges, trend metrics
   - Install: `npx shadcn@latest add @avara-ui/counter-section`
   - Set these props: `{"variant":"spotlight-gradient"}`
   - Docs: https://avaraui.com/docs/nextjs/counter-section#4-spotlight-gradient-interactive-pointer
3. **Minimal slash** (`minimal-slash`): Clean typographic layout with floating Swiss cards, giant watermark numerals and monospace uppercase labels.
   - Live: https://avaraui.com/view/counter-section/minimal-slash
   - Best for: agencies and studios that want a confident, typographic stats row
   - Avoid if: you want a techy or glowing look
   - Traits: Swiss cards, watermark numerals, monospace labels, expanding accents
   - Install: `npx shadcn@latest add @avara-ui/counter-section`
   - Set these props: `{"variant":"minimal-slash"}`
   - Docs: https://avaraui.com/docs/nextjs/counter-section#2-minimal-slash-agency-studio
4. **Halftone cinema** (`halftone-cinema`): An atmospheric strip with a dot-matrix halftone texture, hairline column dividers and multi-line descriptions.
   - Live: https://avaraui.com/view/counter-section/halftone-cinema
   - Best for: architecture, design and premium brands that want an atmospheric strip
   - Avoid if: you want bright, playful cards
   - Traits: halftone dot-matrix texture, hairline dividers, multi-line descriptions
   - Install: `npx shadcn@latest add @avara-ui/counter-section`
   - Set these props: `{"variant":"halftone-cinema"}`
   - Docs: https://avaraui.com/docs/nextjs/counter-section#3-halftone-cinema-architectural

## 1. Cyber HUD (Terminal & Telemetry)

Developer and fintech terminal HUD with bracket corner crosshairs [+], subtle scanlines, live status LEDs, and character scramble decryption on reveal.

- Set `variant="cyber-hud"` to activate the cyber terminal layout. Pass custom metrics through the stats prop.

```tsx
// 1. Define custom telemetry stats data
const stats = [
  {
    value: 2.4,
    decimals: 1,
    prefix: "$",
    suffix: "B",
    label: "LIQUIDITY POOL RESERVE",
    sublabel: "VERIFIED MULTI-SIG ON-CHAIN VAULT",
    tag: "SEC-L3",
  },
  {
    value: 99.999,
    decimals: 3,
    suffix: "%",
    label: "CONSENSUS SYNCHRONIZATION",
    sublabel: "ZERO DIVERGENCE EPOCH ROUNDS",
    tag: "BFT-PASS",
  },
  {
    value: 180,
    suffix: "+",
    label: "VALIDATOR EDGE NODES",
    sublabel: "DISTRIBUTED GEOGRAPHIC SHARDING",
    tag: "ACTIVE",
  },
  {
    value: 4.8,
    decimals: 1,
    suffix: "ms",
    label: "GLOBAL BLOCK FINALITY",
    sublabel: "SUB-5MS DETERMINISTIC LATENCY",
    tag: "OPTIMAL",
  },
];

export default function CyberHudCounter() {
  return (
    <CounterSection
      variant="cyber-hud"
      stats={stats}
    />
  );
}
```

## 2. Minimal Slash (Agency / Studio)

Clean, high-impact typographic layout with floating Swiss modular cards, giant watermark numerals, monospace uppercase /LABELS, and interactive expanding accents.

- Set `variant="minimal-slash"` to activate floating Swiss cards with watermark numbers. Pass custom stats through the stats prop.

```tsx
// 1. Define custom agency stats data
const stats = [
  {
    value: 130,
    prefix: "$",
    suffix: "M",
    label: "/REVENUE UNLOCKED",
    sublabel: "Processed securely across global commerce partners",
    tag: "+42% YoY",
  },
  {
    value: 98,
    suffix: "%",
    label: "/CLIENT SATISFACTION",
    sublabel: "Verified feedback score from over 1,200 enterprises",
    tag: "Top 1%",
  },
  {
    value: 90,
    suffix: "+",
    label: "/INDUSTRIES SERVED",
    sublabel: "From fintech innovators to deep-tech logistics",
    tag: "Global",
  },
  {
    value: 4.9,
    decimals: 1,
    suffix: "★",
    label: "/GLOBAL RATING",
    sublabel: "Independent peer review score on Gartner & G2",
    tag: "Leader",
  },
];

export default function MinimalSlashCounter() {
  return (
    <CounterSection
      variant="minimal-slash"
      stats={stats}
    />
  );
}
```

## 3. Halftone Cinema (Architectural)

Atmospheric architectural strip featuring an authentic dot-matrix halftone texture, hairline vertical column dividers, and multi-line descriptions. Adapts cleanly to light and dark modes.

- Set `variant="halftone-cinema"` to activate the halftone dot-matrix strip. Pass custom stats through the stats prop.

```tsx
// 1. Define custom architectural stats data
const stats = [
  {
    value: 60,
    suffix: "+",
    label: "Years of experience",
    sublabel: "Pioneering architectural and computational design",
  },
  {
    value: 97,
    suffix: "%",
    label: "Client retention rate",
    sublabel: "Long-term partnership contracts spanning multiple decades",
  },
  {
    value: 100,
    suffix: "+m",
    label: "Sq. Ft. currently managed",
    sublabel: "Sustainable grade-A commercial real estate and facilities",
  },
  {
    value: 98,
    suffix: "%",
    label: "Quality audit score",
    sublabel: "Zero non-compliance marks on international safety audits",
  },
];

export default function HalftoneCinemaCounter() {
  return (
    <CounterSection
      variant="halftone-cinema"
      stats={stats}
    />
  );
}
```

## 4. Spotlight Gradient (Interactive Pointer)

Interactive radial spotlight that tracks the cursor across modern floating cards, highlighting gradient accents, category icon badges, and micro-metric trends with zero box shadows.

- Set `variant="spotlight-gradient"` to activate the cursor-tracking spotlight cards. Pass custom stats through the stats prop.

```tsx
// 1. Define custom telemetry & performance stats data
const stats = [
  {
    value: 850,
    suffix: "K+",
    label: "Daily Active Sessions",
    sublabel: "Powering modern user experiences on web and mobile",
    tag: "Fast",
  },
  {
    value: 12,
    suffix: "ms",
    label: "Median Edge Latency",
    sublabel: "Global compute routing under sub-15 millisecond target",
    tag: "Ultra Low",
  },
  {
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Security Audit Grade",
    sublabel: "SOC2 Type II, ISO 27001, and HIPAA compliance verified",
    tag: "Certified",
  },
  {
    value: 3.2,
    decimals: 1,
    suffix: "x",
    label: "Efficiency Acceleration",
    sublabel: "Average engineering velocity increase reported by engineering teams",
    tag: "Productivity",
  },
];

export default function SpotlightGradientCounter() {
  return (
    <CounterSection
      variant="spotlight-gradient"
      stats={stats}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/counter-section.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/counter-section
```

## Features

### 4 Production Variants

Cyber HUD for fintech & developer tools, Minimal Slash for agencies, Halftone Cinema for architecture, and Spotlight Gradient for modern tech.

### 100% Reusable with Custom Datasets

Every variant accepts a typed stats array prop with value, prefix, suffix, label, sublabel, and tag for complete customization.

### No Shadows, Pure Flat Design

Engineered with clean, crisp borders and zero box-shadows for a modern, sleek aesthetic that blends into any layout.

### 100% Theme Adaptive

Every variant—including Halftone and Cyber HUD—renders completely light in Light Mode and deep dark in Dark Mode.

## Best Practices & Guidelines

### Layout & Placement

Place counter sections below the hero fold or immediately after high-level feature highlights. The animated count-up runs automatically when the section intersects the viewport (using `useInView`), making it ideal for social proof and conversion trust anchors.

### Variant Selection

Choose `variant="cyber-hud"` for developer tools, Web3, security, and fintech telemetry; `variant="minimal-slash"` for modern agencies, SaaS, and portfolios; `variant="halftone-cinema"` for architecture and editorial brands; and `variant="spotlight-gradient"` for interactive consumer tech and modern AI applications.

### Custom Data & Precision

Always specify the `decimals` prop on stats when dealing with floating-point metrics (e.g., `decimals: 1` for `2.4` or `decimals: 3` for `99.999`). This prevents awkward integer rounding during the count-up animation.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"cyber-hud" \| "minimal-slash" \| "halftone-cinema" \| "spotlight-gradient"` | `"cyber-hud"` | Design aesthetic variant to render. |
| `stats` | `StatItem[]` | `DEFAULT_STATS[variant]` | Array of numerical metrics to animate and display. |
| `eyebrow` | `string` | `undefined` | Optional pill or category badge rendered above the header. |
| `heading` | `string` | `undefined` | Main title copy for the counter section. |
| `description` | `string` | `undefined` | Supporting paragraph copy below the main heading. |
| `allowReplay` | `boolean` | `true` | Enables or disables the interactive replay trigger button. |
| `className` | `string` | `undefined` | Custom CSS classes for outer container styling. |

### StatItem Object

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | Required | Target numerical value to interpolate and display. |
| `label` | `string` | Required | Primary metric title (e.g., "/REVENUE UNLOCKED"). |
| `prefix` | `string` | `""` | Text placed before the count-up number (e.g., "$"). |
| `suffix` | `string` | `""` | Text placed after the count-up number (e.g., "%", "+", "M"). |
| `decimals` | `number` | `0` | Number of decimal places to format during the count-up. |
| `sublabel` | `string` | `undefined` | Secondary descriptive copy rendered beneath the metric. |
| `tag` | `string` | `undefined` | Status badge or delta indicator pill. |
| `trend` | `string` | `undefined` | Percentage or trend delta string. |
| `icon` | `React.ReactNode` | `undefined` | Optional Lucide icon or custom SVG graphic element. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/counter-section
