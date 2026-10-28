export const metadata = docsPageMetadata("cta-section");

# CTA Section

An interconnected, conversion-focused **Brand Pillars** call-to-action component built for agencies, SaaS platforms, and studios. Rather than presenting services or value propositions as plain bullet points, this section transforms them into an interactive ecosystem with synchronized animated scorecards, live progress meters, and active highlight popovers.

Hovering or tapping any pillar card on the left automatically synchronizes with the right scorecard canvas, animating scores and progress bars to illustrate holistic brand synergy.

export const usageBrandPillars = `import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function BrandPillarsExample() {
  return (
    
  );
}`;

export const usageSplit = `import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function SplitCtaExample() {
  return (
    
  );
}`;

export const usageMinimal = `import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function MinimalCtaExample() {
  return (
    
  );
}`;

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

    Synchronized Scorecard
    Selecting any feature or service card on the left automatically synchronizes with the right scorecard canvas, animating scores and progress meters.

    Signature 3D Popover
    Features an eye-catching floating active badge with vibrant accent gradients, bold typography, and smooth transitions.

    Design Token Integration
    Seamlessly respects var(--radius) corner rounding and brand accent tokens across Light and Dark themes.

    Fully Responsive
    Adapts effortlessly from expansive two-column desktop layouts to stacked, touch-friendly mobile flows without horizontal overflow.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "brand-pillars" | "minimal" | "split"
        "brand-pillars"
        Visual mode. "brand-pillars" renders the interactive two-panel system with scorecard.

        color
        string
        "#f95716"
        Primary accent color. Accepts hex colors (e.g. "#f95716"), CSS variables ("var(--primary)"), or preset names ("orange", "primary", "indigo", "rose", "emerald").

        heading
        string
        undefined
        Optional main section heading.

        subheading
        string
        undefined
        Optional eyebrow label above the heading.

        statement
        string
        Standard statement
        The primary bold philosophy statement rendered on the scorecard panel.

        pillars
        PillarItem[]
        DEFAULT_PILLARS
        Array of 4 pillar objects containing id, eyebrow, title, description, score, and optional icon.

        summaryText
        string
        'One complete, consistent brand" — 100%'
        Text displayed inside the bottom summary bar.

        summaryScore
        string | number
        "50%"
        Metric or score shown on the summary bar.

        ctaText
        string
        "Get Started"
        Call-to-action button label.

        ctaHref
        string
        "#"
        Link destination for the CTA button.

        rounded
        string | number
        "var(--radius, 16px)"
        Corner rounding radius for the cards, panels, and buttons.

        className
        string
        undefined
        Custom Tailwind CSS classes applied to the root section element.

---

**Component Path:** `[framework]\cta-section\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
