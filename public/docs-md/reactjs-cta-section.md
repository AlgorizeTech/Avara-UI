---
title: "Shadcn CTA Section"
description: "An interconnected, conversion-focused call-to-action block designed for modern web applications, agencies, and SaaS platforms. Free shadcn/ui CTA Section."
url: https://avaraui.com/docs/nextjs/cta-section
---

# Shadcn CTA Section

An interconnected, conversion-focused call-to-action block designed for modern web applications, agencies, and SaaS platforms. Features high-impact interactive systems including the **Concentric Portal** (scroll-driven expanding circular lens with gyroscopic monospace orbital text and segmented actions inspired by contentarchitecture.dev) and **Brand Pillars** (synchronized animated scorecards and live synergy meters).

## Concentric Portal — variant="concentric-portal"

Pass `variant="concentric-portal"` for the scroll-driven expanding circular lens with continuous gyroscopic orbital text rings.

- Pass `variant="concentric-portal"` Selects the concentric orbital portal experience with scroll-scrubbed expansion.
- Set `autoRotate=true` Enables automatic gyroscopic rotation for all concentric text orbits (set to false to keep static).
- Set `phrase="THE CONTENT ARCHITECTURE"` Defines the repeating monospace text string orbiting around the portal.

```tsx
import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function ConcentricPortalExample() {
  return (
    <CTASection
      variant="concentric-portal"
      heading="The next 5 days are yours."
      subheading="Access Portal"
      phrase="THE CONTENT ARCHITECTURE"
      ctaText="GET ACCESS"
      ctaHref="#"
      autoRotate={true}
    />
  );
}
```

## Brand Pillars — variant="brand-pillars"

Pass `variant="brand-pillars"` for the interactive synchronized scorecard with dynamic progress metrics.

- Pass `variant="brand-pillars"` Selects the multi-pillar brand scorecard layout with live score recalculation.
- Set `color="#f95716"` Sets the signature brand accent color for active cards, meters, and badges.

```tsx
import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function BrandPillarsExample() {
  return (
    <CTASection
      variant="brand-pillars"
      color="#f95716"
      statement="A strong brand isn't built from a single element. Branding, website, social, and data reinforce each other — together creating a brand that's recognizable, consistent, and effective."
      summaryText='One complete, consistent brand" — 100%'
      ctaText="Boek a demo"
      ctaHref="#"
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/cta-section.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/cta-section
```

## Features

Discover the key capabilities that make this component an excellent choice for modern interactive user interfaces.

### Synchronized Scorecard

Selecting any feature or service card on the left automatically synchronizes with the right scorecard canvas, animating scores and progress meters.

### Signature 3D Popover

Features an eye-catching floating active badge with vibrant accent gradients, bold typography, and smooth transitions.

### Design Token Integration

Seamlessly respects `var(--radius)` corner rounding and brand accent tokens across Light and Dark themes.

### Fully Responsive

Adapts effortlessly from expansive two-column desktop layouts to stacked, touch-friendly mobile flows without horizontal overflow.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"brand-pillars" \| "minimal" \| "split" \| "concentric-portal" \| "orbital-lens"` | `"brand-pillars"` | Visual mode. `"concentric-portal"` renders the scroll-driven expanding circular lens with gyroscopic monospace orbital text and segmented actions; `"brand-pillars"` renders the interactive scorecard ecosystem. |
| `phrase` | `string` | `"THE CONTENT ARCHITECTURE"` | Monospace uppercase text string repeated around the concentric orbital rings in `concentric-portal` variant. |
| `autoRotate` | `boolean` | `true` | Controls continuous automatic ambient spinning of the concentric text rings. Set to `false` to keep them static. |
| `scrollProgress` | `number` | `undefined` | Optional manual scroll progress (`0` to `1`). When provided, locks the concentric portal expansion to a specific progression without requiring scroll track. |
| `color` | `string` | `"#f95716"` | Primary accent color. Accepts hex colors (e.g. `"#f95716"`), CSS variables (`"var(--primary)"`), or preset names (`"orange"`, `"primary"`, `"indigo"`, `"rose"`, `"emerald"`). |
| `heading` | `string` | `undefined` | Optional main section heading. |
| `subheading` | `string` | `undefined` | Optional eyebrow label above the heading. |
| `statement` | `string` | Standard statement | The primary bold philosophy statement rendered on the scorecard panel. |
| `pillars` | `PillarItem[]` | `DEFAULT_PILLARS` | Array of 4 pillar objects containing `id`, `eyebrow`, `title`, `description`, `score`, and optional `icon`. |
| `summaryText` | `string` | `'One complete, consistent brand" — 100%'` | Text displayed inside the bottom summary bar. |
| `summaryScore` | `string \| number` | `"50%"` | Metric or score shown on the summary bar. |
| `ctaText` | `string` | `"Get Started"` | Call-to-action button label. |
| `ctaHref` | `string` | `"#"` | Link destination for the CTA button. |
| `rounded` | `string \| number` | `"var(--radius, 16px)"` | Corner rounding radius for the cards, panels, and buttons. |
| `className` | `string` | `undefined` | Custom Tailwind CSS classes applied to the root section element. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/cta-section
