---
title: "Shadcn Ribbon Drift"
description: "Shadcn Ribbon Drift. A hero showcase card with two floating marquee ribbons, an animated gradient backdrop, a 3D illustration and a frosted glass promo card."
url: https://avaraui.com/docs/nextjs/ribbon-drift
---

# Shadcn Ribbon Drift

A dynamic hero showcase card featuring dual floating infinite marquee ribbons, an animated ambient gradient drift backdrop, center 3D illustration, and an interactive frosted glass promo card.

Originally created as the signature visual counterpart for authentication layouts, it is completely decoupled as a standalone visual card that works across landing pages, feature highlights, onboarding heroes, and product showcase sections.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/ribbon-drift

**When to use it.** Two infinite marquee ribbons over an ambient, drifting gradient background, in two looks: a brand-logo strip with criss-crossing ribbons, or a hero card with a central 3D character and a frosted promo.

**Gotchas:**

- Both are looks of the one `ribbon-drift` item: install it once and set `variant` from the index.
- `color` tunes the ambient glow for either look; `bgColor` overrides the background with a custom colour.

### The 2 variants

1. **Cross ribbon logos** (`cross-logos`): Two criss-crossing logo marquees with frosted glass blur over an ambient drift background.
   - Live: https://avaraui.com/view/ribbon-drift/cross-logos
   - Best for: a trusted-by or partner strip that should feel animated
   - Avoid if: you have no brand logos to show; you want a hero card with a central illustration
   - Traits: criss-crossing ribbons, brand logos, frosted glass, ambient background
   - Install: `npx shadcn@latest add @avara-ui/ribbon-drift`
   - Set these props: `{"variant":"cross-logos"}`
   - Docs: https://avaraui.com/docs/nextjs/ribbon-drift#cross-ribbon-logos
2. **Hero card** (`default`): Two tilted marquee ribbons around a central 3D character, with a frosted promo card.
   - Live: https://avaraui.com/view/ribbon-drift/default
   - Best for: a hero or promotional banner with a focal illustration
   - Avoid if: you only need a quiet logo strip
   - Traits: tilted ribbons, 3D character, frosted promo card, ambient background
   - Install: `npx shadcn@latest add @avara-ui/ribbon-drift`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/ribbon-drift#ribbon-drift-hero-card

### Cross Ribbon Logos

Dual criss-crossing infinite marquee ribbons featuring leading brand logos with frosted glass blur and ambient drift background.

- Set `variant="cross-logos"` switches to dual intersecting brand ribbon animation.
- Set `color="primary" | "indigo" | "rose" | "emerald" | "lavender" | "amber" | "violet" | "zinc"` tunes the ambient glow gradient background.
- `bgColor` optional custom background color override (e.g. #F8C83C for warm yellow).
- `speed` marquee scrolling duration in seconds (default: 48).

```tsx
import { RibbonLogos } from "@/components/custom/blocks/RibbonDriftBlock";

export default function CrossRibbonLogosExample() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden">
      <RibbonLogos
        title="Trusted by leading brands worldwide"
        color="primary"
        speed={48}
        pauseOnHover={true}
        // Optional custom background color override:
        // bgColor="#F8C83C"
      />
    </div>
  );
}
```

### Ribbon Drift Hero Card

Dual infinite marquee ribbons, central 3D character, ambient gradient drift, and frosted promo card.

- Set `color="primary" | "indigo" | "rose" | "emerald" | "lavender" | "amber" | "violet" | "zinc"` tunes the ambient glow gradient, diamond separators, and hover accents.
- `ribbonsTop` items rendered in the top ribbon (-7deg tilt, drifting left).
- `ribbonsBottom` items rendered in the bottom ribbon (+5deg tilt, drifting right).

```tsx
import { RibbonDriftBlock } from "@/components/custom/blocks/RibbonDriftBlock";

const AVATARS = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Ana Watson",
    name: "Ana Watson",
    designation: "Founder & CEO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    name: "Tom Hardy",
    designation: "Co-Founder & CTO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    name: "Mara Jade",
    designation: "Managing Director",
  },
];

export default function RibbonDriftCardExample() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <RibbonDriftBlock
        color="primary"
        image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1793701432/register-hero-1793701431524.png"
        ribbonsTop={[
          "Interviews run day and night",
          "Every applicant, the same questions",
          "Recordings ready for your review",
        ]}
        ribbonsBottom={[
          "Qualified candidates, interviewed in minutes",
          "Your first round, handled",
          "You make every hiring decision",
        ]}
        promo={{
          title: "Interviews run day and night",
          body: "See who qualified while you were away",
          href: "#",
          avatars: AVATARS,
        }}
      />
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/ribbon-drift.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/ribbon-drift
```

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `RibbonDriftBlock` / `RibbonLogos` | `variant` | `"default" \| "cross-logos"` | `"default"` | Display variant: `"default"` for the 3D illustration hero card with frosted promo, or `"cross-logos"` for dual criss-crossing infinite brand marquee ribbons. |
| `RibbonLogos` | `title` | `ReactNode` | `"Trusted by leading brands worldwide"` | Heading text displayed centered above the crossing ribbons. |
| `RibbonLogos` | `bgColor` | `string` | `undefined` | Optional custom background color override (e.g. `"#F8C83C"` for warm yellow). When omitted, uses the signature ambient drift background of the original variant. |
| `RibbonDriftBlock` | `image` | `string` | `defaultImage` | Central illustration URL positioned between the layered ribbons. |
| `RibbonDriftBlock` | `imageAlt` | `string` | `"Feature illustration"` | Accessible alt text for the central illustration. |
| `RibbonDriftBlock` | `ribbonsTop` | `string[]` | `defaultRibbonsTop` | Items scrolling in the upper ribbon (tilted at -7deg, drifting left). |
| `RibbonDriftBlock` | `ribbonsBottom` | `string[]` | `defaultRibbonsBottom` | Items scrolling in the lower ribbon (tilted at +5deg in reverse direction). |
| `RibbonDriftBlock` | `promo` | `RibbonDriftPromo \| null` | `defaultPromo` | Floating frosted badge at the bottom featuring an interactive AvatarStack (spring-shift on hover with tooltip) and arrow link (pass `null` to hide). |
| `RibbonDriftBlock` | `color` | `RibbonDriftColor` | `"primary"` | Color theme palette (`"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"lavender"`, `"amber"`, `"violet"`, `"zinc"`). |
| `RibbonDriftBlock` | `badge` | `ReactNode` | `undefined` | Custom badge or logo node rendered in the top-right frosted pill (overrides the entire pill content). |
| `RibbonDriftBlock` | `logo` | `ReactNode \| string` | `DefaultBrandIcon` | Brand logo image URL string or custom ReactNode / SVG. Defaults to the built-in self-contained vector Avara logo. |
| `RibbonDriftBlock` | `logoDark` | `string` | `undefined` | Optional dark mode brand logo image URL (swapped automatically in dark mode). |
| `RibbonDriftBlock` | `brandName` | `string` | `"Avara"` | Brand name text displayed next to the logo. |
| `RibbonDriftBlock` | `brandAccent` | `string` | `"UI"` | Accent word styled with the active theme color (e.g. `"UI"`). |
| `RibbonDriftBlock` | `logoHref` | `string` | `"#"` | Target link URL for the logo badge. |
| `RibbonDriftBlock` | `logoConfig` | `RibbonDriftLogo` | `&#123; brandName: "Avara", brandAccent: "UI" &#125;` | Optional grouped configuration object for the top-right logo badge. |
| `RibbonDriftBlock` | `rounded` | `string \| number` | `"rounded-3xl"` | Corner radius for the outer card and promo card (e.g. `24`, `"2rem"`, `"rounded-3xl"`). |
| `RibbonDriftBlock` | `marqueeDuration` | `number` | `48` | Loop duration in seconds for the marquee ribbons. |
| `RibbonDriftBlock` | `pauseOnHover` | `boolean` | `false` | Whether the marquee animation pauses when hovering over the card. |
| `RibbonDriftBlock` | `className` | `string` | `undefined` | Custom Tailwind CSS classes applied to the root card container. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/ribbon-drift
