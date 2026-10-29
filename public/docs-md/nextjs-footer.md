export const metadata = docsPageMetadata("footer");

# Footer

A collection of 8 production-ready, high-capacity, fully responsive Footer components designed for modern web applications, SaaS platforms, e-commerce stores, and enterprise products.

`Footer` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for centered layouts, frosted glass docks, cyberpunk neon glow pulses, quantum particle beams, snapshot studio card piles, colorful modern scroll stack cards, giant glowing scroll-reveal wordmarks, and architectural editorial tilted CTA cards.

export const usageEditorial = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function EditorialFooterDemo() {
  return (
    
  );
}`;

export const usageSimple = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function SimpleFooterDemo() {
  return ;
}`;

export const usageGlassDock = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function GlassDockFooterDemo() {
  return ;
}`;

export const usageNeonGlow = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function NeonGlowFooterDemo() {
  return ;
}`;

export const usageQuantumBeam = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function QuantumBeamFooterDemo() {
  return ;
}`;

export const usageSnapshot = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function SnapshotFooterDemo() {
  return (
    
  );
}`;

export const usageModernStack = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function ModernStackFooterDemo() {
  return (
    
  );
}`;

export const usageWordmark = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function WordmarkFooterDemo() {
  return (
    
  );
}`;

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

## Features

Discover the key capabilities of the `Footer` component:

    8 High-Performance Responsive Variants
    Includes Editorial Tilted Card, Snapshot, Modern Stack, Wordmark Glow, Simple Centered, Glass Dock, Neon Glow Pulse, and Quantum Particle Beam.

    100% Screen & Device Responsive
    Fluid Tailwind CSS grid and flex layouts built to adapt from 320px mobile viewports up to 4K ultra-wide screens.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        FooterVariant
        "snapshot"
        Selects from the 8 footer variants ("editorial-card", "snapshot", "modern-stack", "wordmark-glow", "simple-centered", "glass-dock", "neon-glow-pulse", "quantum-particle-beam").

        color
        string
        "primary"
        Accent theme color (e.g. "indigo", "rose", "emerald", "lavender", or hex). Bridges with the active color picker to style interactive stickers, badges, and glows.

        snapshot
        SnapshotFooterContent
        Marlo Studio demo copy
        Content for variant="snapshot": headingLines, description, taglineLines, five photos (&#123; src, caption &#125;), note card address, hours, stickerText and legalLinks. Every field is optional.

        editorialCta
        EditorialFooterProps
        Husham Sam inspired editorial defaults
        Content for variant="editorial-card": headline, buttonText, buttonHref, menuLinks, copyright, and rightsText.

        sections
        FooterLinkSection[]
        Per-variant columns
        Link columns. A link may carry a badge (e.g. 3), shown as a count pill by snapshot.

        brandName
        string
        "Avara UI"
        Brand name string displayed in the logo header.

        tagline
        string
        "Elevate your web..."
        Brand vision tagline text.

        logo
        React.ReactNode
        undefined
        Custom logo icon component.

        socialLinks
        SocialLink[]
        X, GitHub, LinkedIn, YouTube, Instagram
        The social row, rendered by Social Links. Each entry is &#123; network, href, label? &#125;; pass only the networks you have.

        className
        string
        ""
        Custom Tailwind CSS class overrides.

---

**Component Path:** `[framework]\footer\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
