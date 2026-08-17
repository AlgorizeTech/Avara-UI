# Hero Sections

A collection of modern, highly composable Hero components for marketing websites. Built with Tailwind CSS and Framer Motion. This block separates layout structure from visual style through **Compound Components**, so you can write the exact same clean component structure every time.

## Examples

Three independent blocks live on this page: the composable `HeroBlock` system, and the two ready-made homepage heroes (`HomepageHeroBlock` and `HomepageHeroTypingBlock`). The composable set is the one to reach for when you want to arrange your own content; the homepage blocks are drop-in, prop-configured sections. Each gallery's first example carries its own **Code** tab with the full source.

### Composable hero

`Hero` publishes `layout`, `variant` and `color` through context, so `HeroTitle`, `HeroAction` and `HeroVisual` restyle themselves — you never repeat the theme on a child.

export const usageSplitRight = `import {
  Hero,
  HeroAction,
  HeroActions,
  HeroBadge,
  HeroContent,
  HeroDescription,
  HeroTitle,
  HeroVisual,
} from "@/components/custom/blocks/HeroBlock";

export default function LandingPage() {
  return (

          Supercharged Components

          Build stunning interfaces with flawless code.

          Everything you need to launch a beautiful, accessible, and fast web
          application without writing layout CSS from scratch.

            Start Building

            Watch Demo

  );
}`;

export const usageSplitLeft = `// The visual moves to the left column; the markup order never changes.

  {/* … */}
  {/* … */}
`;

export const usageCenter = `// Centred stack. \`HeroVisual\` sits below the copy instead of beside it.

  {/* … */}
  {/* … */}
`;

export const usageLeft = `// Single column, left aligned — no visual column at all.

  {/* … */}
`;

export const usageGlass = `// \`glass\` inverts the palette to light-on-dark and frosts the surfaces.
// \`HeroAction\` picks that up from context — no extra props on the buttons.

  {/* … */}
  {/* … */}
`;

export const usageGlow = `// \`glow\` adds the ambient accent bloom behind the content. Pair it with
// the matching action so the button glows too.

      Start Building

`;

export const usagePattern = `// \`pattern\` paints the backdrop: "none", "grid" or "dots".

  {/* … */}
`;

export const usageGlitch = `// \`animation\` lives on the title, not the root — the other children keep
// their own entrances.

  Build stunning interfaces with flawless code.
`;

` for the matching button.",
      props: { layout: "split-right", variant: "glow", pattern: "grid", titleAnimation: "blur-in", glowAction: true },
      usage: usageGlow,
    },
    {
      title: "Background pattern",
      subheading: "`pattern` takes `\"none\"`, `\"grid\"` or `\"dots\"` and masks itself toward the edges so it never fights the copy.",
      props: { layout: "center", variant: "default", pattern: "dots", titleAnimation: "fade-up" },
      usage: usagePattern,
    },
    {
      title: "Glitch title",
      subheading: "`HeroTitle` carries its own `animation`: `\"fade-up\"`, `\"blur-in\"`, `\"glitch\"` or `\"none\"`.",
      props: { layout: "center", variant: "default", pattern: "none", titleAnimation: "glitch" },
      usage: usageGlitch,
    },
  ]}
/>

### Homepage hero — word bounce

The flagship centered hero: a sparkle pill badge, a rotating word that bounces in and out, a one-click CLI copy button, and two call-to-action buttons. Every string is a prop.

export const usageHomepageHero = `import { HomepageHeroBlock } from "@/components/custom/blocks/HomepageHeroBlock";

export default function Page() {
  return (
    
  );
}`;

### Homepage hero — typing effect

The same layout with a character-by-character typewriter and a blinking cursor in place of the bounce.

export const usageHomepageHeroTyping = `import { HomepageHeroTypingBlock } from "@/components/custom/blocks/HomepageHeroTypingBlock";

export default function Page() {
  return (
    
  );
}`;

### Recipes

Three finished compositions built from the same `HeroBlock` primitives — copy one and replace the copy.

export const usageSaaS = `// Centred, grid backdrop, badge + framework chips instead of buttons.

      SETUP_EASY-PEASY!

      Hassle-free setup with
      
      all major development frameworks

      Collecting submissions is super easy, with no dependency needed by
      default.

      HTML
      React
      Vue
      Svelte

`;

export const usageData = `// Split-left with a single video CTA — good for data tools and dashboards.

    Where your data turns into software with a click
    
      Build custom portals, CRMs, and tools effortlessly. From concept to
      launch in minutes, not months.

         Watch Demo

`;

export const usageMinimal = `// No accent, no pattern — type and whitespace only, with a stats footer.

      Simple. Clean.
      
      Effective.

      The minimalist approach to building great products.

         No credit card required

         Free 14-day trial

         Cancel anytime

        Get Started Free 
      
      View Demo

`;

## Installation

### 1. Install Dependencies

The composable block uses `motion` (Framer Motion) for the title entrances and `lucide-react` for icons.

```bash
npm install motion lucide-react
```

### 2. Copy the Component

The composable system handles every layout shift through Tailwind grid utilities — copy `HeroBlock.tsx` once and build all four layouts from it. Take the source from the **Code** tab of the first example above and place it in `components/custom/blocks/HeroBlock.tsx`.

The two homepage heroes are separate, self-contained files: copy them from the **Code** tab of their own examples into `components/custom/blocks/HomepageHeroBlock.tsx` and `components/custom/blocks/HomepageHeroTypingBlock.tsx`.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Hero

          layout

          "center" | "left" | "split-right" | "split-left"

          "center"

          Structural arrangement of HeroContent and{" "}
          HeroVisual. The split layouts reorder the columns on
          desktop only.

          Hero

          variant

          "default" | "glass" | "glow"

          "default"

          Visual treatment, published through context so children restyle
          themselves. glass goes light-on-dark and frosted;{" "}
          glow blooms the accent behind the content.

          Hero

          pattern

          "none" | "grid" | "dots"

          "none"
        
        Background pattern painted behind the section.

          Hero

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Accent for the badge, primary action and glow. Any hex string is
          resolved through CSS variables.

          HeroTitle

          animation

          "fade-up" | "blur-in" | "glitch" | "none"

          "fade-up"

          Entrance animation for the headline only — the other children keep
          their own.

          HeroAction

          variant

          "primary" | "secondary" | "outline" | "ghost" | "glow"

          "primary"

          Button style. It is also re-derived from the hero's own{" "}
          variant, so the same value looks right on a glass hero
          without extra props.

          HomepageHeroBlock
          
          HomepageHeroTypingBlock

          typingWords

          string[]

          ["Interfaces", "Components", …]

          The rotating words between titlePrefix and{" "}
          titleSuffix.

          HomepageHeroBlock
          
          HomepageHeroTypingBlock

          badgeText · badgeHref ·{" "}
          titlePrefix · titleSuffix ·{" "}
          subtitle · cliCommand

          string

          —

          Every string in the section is a prop, each with a sensible default.{" "}
          cliCommand also feeds the one-click copy button.

          HomepageHeroBlock
          
          HomepageHeroTypingBlock

          primaryActionLabel · primaryActionHref ·{" "}
          secondaryActionLabel ·{" "}
          secondaryActionHref

          string

          —
        
        Label and destination for each of the two call-to-action buttons.

          HomepageHeroBlock
          
          HomepageHeroTypingBlock

          color

          string

          undefined

          Accent color — a preset name or any CSS color. Left unset it inherits
          your theme.

---

**Component Path:** `nextjs\hero\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
