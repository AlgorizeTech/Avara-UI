# Footer

A collection of 4 production-ready, high-capacity, fully responsive Footer components designed for modern web applications, SaaS platforms, e-commerce stores, and enterprise products.

`Footer` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for centered layouts, frosted glass docks, cyberpunk neon glow pulses, and quantum particle beams.

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

## Installation

## Examples

## Features

Discover the key capabilities of the `Footer` component:

    4 High-Performance Responsive Variants
    Includes Simple Centered, Glass Dock, Neon Glow Pulse, and Quantum Particle Beam.

    100% Screen & Device Responsive
    Fluid Tailwind CSS grid and flex layouts built to adapt from 320px mobile viewports up to 4K ultra-wide screens.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        FooterVariant
        "simple-centered"
        Selects from the 4 active responsive footer variants ("simple-centered", "glass-dock", "neon-glow-pulse", "quantum-particle-beam").

        brandName
        string
        "Algorize UI"
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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
