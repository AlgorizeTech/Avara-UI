export const metadata = docsPageMetadata("footer");

# Footer

A collection of 9 production-ready, high-capacity, fully responsive Footer components designed for modern web applications, SaaS platforms, e-commerce stores, and enterprise products.

`Footer` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for architectural blueprint drafting grids with interactive liquid ink typography, centered layouts, frosted glass docks, cyberpunk neon glow pulses, quantum particle beams, snapshot studio card piles, colorful modern scroll stack cards, giant glowing scroll-reveal wordmarks, and architectural editorial tilted CTA cards.

export const usageArchitecturalLiquid = `import { Footer } from "@/components/custom/blocks/FooterBlock";

export default function ArchitecturalLiquidFooterDemo() {
  return (
    
  );
}`;

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

', effect: "replaces default brand mark with your full custom company logo (image string or JSX element)." },
      ],
      props: { variant: "snapshot" },
      usage: usageSnapshot,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
    {
      title: "Modern Stack Footer",
      propNotes: [
        { lead: "Use", prop: "variant", value: '"modern-stack"', effect: "studio footer with multi-colored cards inspired by modern scroll stack and interactive spring hover physics." },
        { lead: "Logo", prop: "logo", value: '', effect: "replaces default brand mark with your full custom company logo (image string or JSX element)." },
      ],
      props: { variant: "modern-stack" },
      usage: usageModernStack,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
    {
      title: "Wordmark Glow Footer",
      propNotes: [
        { lead: "Use", prop: "variant", value: '"wordmark-glow"', effect: "a brand footer with solutions columns, direct contact info, legal row, and a giant wordmark that animates in with a staggered spring bounce on scroll alongside a soft pointer glow." },
        { lead: "Logo", prop: "logo", value: '', effect: "full brand logo displayed in top header area; customize via logo or brandName." },
      ],
      props: { variant: "wordmark-glow" },
      usage: usageWordmark,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
  ]}
/>

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

', effect: "replaces default brand icon & text with your full custom logo component or image string." },
      ],
      props: { variant: "simple-centered" },
      usage: usageSimple,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
    {
      title: "Glass Dock Footer",
      propNotes: [
        { lead: "Use", prop: "variant", value: '"glass-dock"', effect: "floating glassmorphism bar dock card with backdrop blur." },
        { lead: "Logo", prop: "logo", value: '', effect: "replaces default brand icon & text with your full custom logo component or image string." },
      ],
      props: { variant: "glass-dock" },
      usage: usageGlassDock,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
    {
      title: "Neon Glow Pulse Cyberpunk Footer",
      propNotes: [
        { lead: "Use", prop: "variant", value: '"neon-glow-pulse"', effect: "dark cyberpunk theme with glowing border pulse effect." },
        { lead: "Logo", prop: "logo", value: '', effect: "replaces default brand icon & text with your full custom logo component or image string." },
      ],
      props: { variant: "neon-glow-pulse" },
      usage: usageNeonGlow,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
    {
      title: "Quantum Particle Beam Lines Footer",
      propNotes: [
        { lead: "Use", prop: "variant", value: '"quantum-particle-beam"', effect: "high-energy quantum particle beam lines with glowing neon nodes." },
        { lead: "Logo", prop: "logo", value: '', effect: "replaces default brand icon & text with your full custom logo component or image string." },
      ],
      props: { variant: "quantum-particle-beam" },
      usage: usageQuantumBeam,
      code: extractCode("src/components/custom/blocks/FooterBlock.tsx"),
    },
  ]}
/>

## Features

Discover the key capabilities of the `Footer` component:

    9 High-Performance Responsive Variants
    Includes Architectural Blueprint Liquid, Editorial Tilted Card, Snapshot, Modern Stack, Wordmark Glow, Simple Centered, Glass Dock, Neon Glow Pulse, and Quantum Particle Beam.

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
        Selects from the 9 footer variants ("architectural-liquid", "editorial-card", "snapshot", "modern-stack", "wordmark-glow", "simple-centered", "glass-dock", "neon-glow-pulse", "quantum-particle-beam").

        blueprintWordmark
        string
        "AVARA UI"
        Custom text for the architectural blueprint wordmark with interactive liquid ink hover physics in variant="architectural-liquid". Supports all alphanumeric characters and symbols.

        heroTitle
        string
        "CRAFTED FOR EXTRAORDINARY INTERFACES"
        Top headline statement for variant="architectural-liquid".

        architecturalLiquid
        ArchitecturalLiquidFooterProps
        Heron AI architectural layout copy
        Customization options for the "architectural-liquid" variant: headline, brandWordmark, subscribeText, addressLines, directionHref, businessEmail, inquiryEmail, navColumns, socials, and legalLinks.

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
        React.ReactNode | string
        Built-in Vector Logo
        Custom logo component or image URL string. When provided, replaces the default brand logo area completely across all variants without requiring local icon assets.

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
