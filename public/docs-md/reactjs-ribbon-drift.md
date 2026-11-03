export const metadata = docsPageMetadata("ribbon-drift");

# Ribbon Drift

A dynamic hero showcase card featuring dual floating infinite marquee ribbons, an animated ambient gradient drift backdrop, center 3D illustration, and an interactive frosted glass promo card.

Originally created as the signature visual counterpart for authentication layouts, it is completely decoupled as a standalone visual card that works across landing pages, feature highlights, onboarding heroes, and product showcase sections.

export const usageDefault = `import { RibbonDriftBlock } from "@/components/custom/blocks/RibbonDriftBlock";

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

  );
}`;

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

        Component
        Prop
        Type
        Default
        Description

          RibbonDriftBlock

          image

          string

          defaultImage

          Central illustration URL positioned between the layered ribbons.

          RibbonDriftBlock

          imageAlt

          string

          "Feature illustration"

          Accessible alt text for the central illustration.

          RibbonDriftBlock

          ribbonsTop

          string[]

          defaultRibbonsTop

          Items scrolling in the upper ribbon (tilted at -7deg, drifting left).

          RibbonDriftBlock

          ribbonsBottom

          string[]

          defaultRibbonsBottom

          Items scrolling in the lower ribbon (tilted at +5deg in reverse direction).

          RibbonDriftBlock

          promo

          RibbonDriftPromo | null

          defaultPromo

          Floating frosted badge at the bottom featuring an interactive AvatarStack (spring-shift on hover with tooltip) and arrow link (pass null to hide).

          RibbonDriftBlock

          color

          RibbonDriftColor

          "primary"

          Color theme palette ("primary", "indigo", "rose", "emerald", "amber", "violet", "zinc").

          RibbonDriftBlock

          badge

          ReactNode

          undefined

          Custom badge or logo node rendered in the top-right frosted pill.

          RibbonDriftBlock

          logoConfig

          RibbonDriftLogo

          &#123; brandName: "Avara", brandAccent: "UI" &#125;

          Configuration options for the top-right pill badge.

          RibbonDriftBlock

          rounded

          string | number

          "rounded-3xl"

          Corner radius for the outer card and promo card (e.g. 24, "2rem", "rounded-3xl").

          RibbonDriftBlock

          marqueeDuration

          number

          48

          Loop duration in seconds for the marquee ribbons.

          RibbonDriftBlock

          pauseOnHover

          boolean

          false

          Whether the marquee animation pauses when hovering over the card.

          RibbonDriftBlock

          className

          string

          undefined

          Custom Tailwind CSS classes applied to the root card container.

---

**Component Path:** `[framework]\ribbon-drift\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
