# Hero

A collection of modern Hero components for marketing websites. Built with Tailwind CSS and Framer Motion, featuring rotating word spring bounce, character typewriter effect, continuous thumbnail slider marquee, CLI copy button, and call-to-action buttons.

export const usageWordBounce = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageTyping = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageSlider = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageGlowArc = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageDoctor = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageComponentWall = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function ComponentWallHeroDemo() {
  return (
    
  );
}`;

export const usageOrbit = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function OrbitHeroDemo() {
  return (
    
  );
}`;

export const usageNorway = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function NorwayHeroDemo() {
  return (
    
  );
}`;

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "bounce" | "typing" | "slider" | "glow-arc" | "pet-shop" | "doctor" | "component-wall" | "orbit" | "norway"

          "bounce"

          The layout & animation style. "bounce" uses spring word motion; "typing" uses typewriter effect; "slider" renders split 2-column hero with continuous marquee; "glow-arc" renders centered radial glow arc; "component-wall" renders 3D component grid; "orbit" renders 360° revolving gallery orbit; "norway" renders hexagonal honeycomb nature gallery.

          typingWords

          string[]

          ["Interfaces", "Components", …]

          The rotating words between titlePrefix and titleSuffix.

          petImage · secondaryPetImage

          string

          Unsplash URLs

          Custom image URLs for the main featured pet photo and secondary avatar badge photo (used when variant="pet-shop").

          sliderImages

          string[]

          […]

          Array of thumbnail image URLs for the continuous right-to-left marquee slider (used when variant="slider").

          mainImage

          string

          "…"

          Featured image URL for the right column (used when variant="slider").

          badgeText · badgeHref · titlePrefix · titleSuffix · subtitle · cliCommand

          string

          —

          Every string in the section is a prop, each with a sensible default. cliCommand feeds the one-click copy button.

          primaryActionLabel · primaryActionHref · secondaryActionLabel · secondaryActionHref

          string

          —
        
        Label and destination for each of the two call-to-action buttons.

          color

          string

          undefined

          Accent color — a preset name or any CSS color. Left unset it inherits your theme.

---

**Component Path:** `[framework]\hero\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
