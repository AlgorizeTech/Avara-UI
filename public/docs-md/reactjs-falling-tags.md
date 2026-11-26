---
title: "Shadcn Falling Tags"
description: "A physics playground where tags drop, tumble and pile up as the section scrolls into view. Free shadcn/ui Falling Tags component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/falling-tags
---

# Shadcn Falling Tags

A physics playground where tags drop, tumble and pile up as the section scrolls into view. Inspired by Guo's Falling Tags for Framer.

Visitors can grab any tag with a mouse or finger, drag it around, and fling it across the container with authentic velocity and angular momentum. Built with pure TypeScript and mathematical 2D rigid-body collision dynamics — zero external physics dependencies needed. Tags automatically follow your project's global theme radius (`--radius`).

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/falling-tags.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/falling-tags
```

## Interactive physics arena

Watch the tags float into view, drop and tumble into a natural pile. Click and throw any tag with your mouse or finger.

- `palette="default"` chooses the color scheme — "default", "colorful", "glass", "pastel", "monochrome", "neon", or "black-and-white".
- `hoverDuration=1.4` how many seconds tags hover in anti-gravity before the drop begins.
- `gravity=0.55` downward gravitational acceleration constant for realistic tumbling.
- `interactive=true` enables real-time pointer drag and momentum-based throwing with impulse physics.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

export default function SkillsSection() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <FallingTags
        palette="default"
        gravity={0.55}
        bounce={0.48}
        hoverDuration={1.4}
        height={500}
      />
    </div>
  );
}
```

## Colorful

Vibrant multi-color playful palette across rich indigo, emerald, rose, and amber tones.

- Set `palette="colorful"` for a vivid color distribution across all falling badges.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

export default function ColorfulTags() {
  return (
    <FallingTags
      palette="colorful"
      height={500}
    />
  );
}
```

## Glass

Translucent frosted glass badges with backdrop-blur and luminous specular borders over a scenic backdrop. Moving blur is GPU-heavy on phones.

- Set `palette="glass"` for semi-transparent tags with backdrop blur that blend over dark, light, or image backgrounds.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

const mySkills = [
  "React 19",
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Figma",
  "UI/UX Design",
  "Micro-Interactions",
  "WebGL / Three.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Creative Coding",
  "Design Systems",
  "Performance",
  "Accessibility",
];

export default function GlassTags() {
  return (
    <div
      className="p-6 sm:p-8 rounded-3xl bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none" />
      <div className="relative z-10">
        <FallingTags
          tags={mySkills}
          palette="glass"
          gravity={0.5}
          bounce={0.55}
          height={500}
        />
      </div>
    </div>
  );
}
```

## Neon

High-energy glowing cyberpunk badges with vibrant borders and neon glow shadows.

- Set `palette="neon"` for intense saturated tones with electric glow box-shadows.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

export default function NeonArena() {
  return (
    <FallingTags
      palette="neon"
      gravity={0.58}
      bounce={0.52}
      height={500}
    />
  );
}
```

## Pastel

Soft soothing aesthetic pastel badges designed for serene minimal layouts and creative portfolios.

- Set `palette="pastel"` for delicate muted pastel hues that maintain readability without visual clutter.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

export default function PastelTags() {
  return (
    <FallingTags
      palette="pastel"
      height={500}
    />
  );
}
```

## Monochrome

High-contrast editorial zinc and black/white palette tailored for modern minimalist dark and light themes.

- Set `palette="monochrome"` for a restrained black, white, and zinc palette that follows theme foreground/background tokens.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

export default function MonochromeTags() {
  return (
    <FallingTags
      palette="monochrome"
      height={500}
    />
  );
}
```

## Black and white

High-contrast dual-tone black and white badges. Tags alternate between black background with white text and border, and white background with black text and border.

- Set `palette="black-and-white"` for dual-tone black and white badges with inverted high-contrast borders and text.

```tsx
import FallingTags from "@/components/custom/blocks/FallingTagsBlock";

export default function BlackAndWhiteTags() {
  return (
    <FallingTags
      palette="black-and-white"
      height={500}
    />
  );
}
```

## About Shadcn Falling Tags

**What it is.** **Shadcn Falling Tags** (`FallingTags`) is an interactive 2D rigid-body physics arena where skill or category badges float into view, drop under gravity, collide, and can be grabbed and thrown by pointer or touch.

**How it is built.** A pure TypeScript oriented-box collision solver runs in a `requestAnimationFrame` loop, with no Matter.js or other physics engine. The only npm dependency is `lucide-react`. Tags inherit your global `--radius` token, support 7 palettes, and read `prefers-reduced-motion`. It is the default export of `FallingTagsBlock`.

**When to use it.** Use it for portfolio skill sections, product capability tags, interactive about pages, and playful feature showcases.

## For AI agents

**When to use**

- Portfolio skill sections, product capability tags
- Interactive about pages, playful feature showcases

**When not to use**

- A static strip of tool logos: use [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack)
- Decorative particles with no collision physics: use [Particle Canvas](https://avaraui.com/docs/reactjs/particle-canvas)

**Agent notes**

- `FallingTags` accepts `tags`, `palette` (`"default" | "colorful" | "glass" | "pastel" | "monochrome" | "neon" | "black-and-white"`), `gravity`, `bounce`, `hoverDuration`, `interactive`, and `height`.
- Uses a pure TypeScript 2D rigid-body solver with zero external physics dependencies.
- `interactive` is `true` by default, so visitors can grab and fling badges; pass `interactive={false}` to disable it.
- `tags` takes strings or `{ id, label, icon?, color?, bg?, border?, text?, className? }` objects. Defaults: `height` `520`, `gravity` `0.55`, `bounce` `0.48`, `friction` `0.985`.
- `showControls` adds Drop Again, Scatter and Zero-G Float buttons; `autoStartOnView` (default `true`) starts the drop when the arena scrolls into view.

**Ask before you pick.** This page has 7 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 7 options as live previews: https://avaraui.com/view/falling-tags

**When to use it.** A physics arena where tags float in, drop under gravity, collide and pile up, and can be grabbed and thrown. The look is a palette: the default, colorful, pastel, neon, glass, monochrome or black and white.

**When to use something else:**

- [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack): you want a static strip of tool logos, not a physics toy.
- [Particle Canvas](https://avaraui.com/docs/reactjs/particle-canvas): you want decorative particles with no collision physics.

**Gotchas:**

- All of them are looks of the one `falling-tags` item: install it once and set `palette` from the index.
- `glass` uses backdrop blur over a scenic backdrop and is GPU-heavy on phones; give it a background that shows through.
- `gravity`, `bounce` and `hoverDuration` tune the physics, not the design.

### The 7 variants

1. **Default** (`default`): The standard palette: tags float in, drop and tumble into a natural pile.
   - Live: https://avaraui.com/view/falling-tags/default
   - Best for: a portfolio skills section; a first look before choosing a palette
   - Avoid if: the brand needs a specific mood such as neon or monochrome
   - Traits: default palette, physics arena, drag and throw
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#interactive-physics-arena
2. **Colorful** (`colorful`): A vivid multi-colour palette across indigo, emerald, rose and amber tones.
   - Live: https://avaraui.com/view/falling-tags/colorful
   - Best for: a playful about or skills page; a creative studio site
   - Avoid if: you want a calm, minimal layout
   - Traits: multi-colour, playful, high saturation
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Set these props: `{"palette":"colorful"}`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#colorful
3. **Pastel** (`pastel`): Soft, soothing pastel badges for serene, minimal layouts and creative portfolios.
   - Live: https://avaraui.com/view/falling-tags/pastel
   - Best for: a gentle portfolio or wellness brand; a light, airy page
   - Avoid if: you want strong contrast
   - Traits: soft tones, minimal, low contrast
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Set these props: `{"palette":"pastel"}`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#pastel
4. **Neon** (`neon`): High-energy glowing badges with vivid borders and neon glow shadows.
   - Live: https://avaraui.com/view/falling-tags/neon
   - Best for: a dark, cyberpunk or gaming page; a developer tool landing page
   - Avoid if: you want a calm, restrained look
   - Traits: glow, dark backgrounds, high energy
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Set these props: `{"palette":"neon"}`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#neon
5. **Glass** (`glass`): Translucent frosted badges with backdrop blur and bright edges, over a scenic backdrop.
   - Live: https://avaraui.com/view/falling-tags/glass
   - Best for: a hero over a photo or gradient; a premium, modern look
   - Avoid if: it must run smoothly on low-end phones; the background is flat
   - Traits: backdrop blur, needs a backdrop, GPU-heavy on phones
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Set these props: `{"palette":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#glass
6. **Monochrome** (`monochrome`): A high-contrast editorial zinc and black-and-white palette for minimal light and dark themes.
   - Live: https://avaraui.com/view/falling-tags/monochrome
   - Best for: an editorial or minimalist site; a theme that already uses zinc greys
   - Avoid if: you want colour to carry meaning
   - Traits: zinc greys, editorial, works in light and dark
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Set these props: `{"palette":"monochrome"}`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#monochrome
7. **Black and white** (`black-and-white`): Strict two-tone badges that alternate black on white and white on black.
   - Live: https://avaraui.com/view/falling-tags/black-and-white
   - Best for: a stark, graphic brand; a print-inspired page
   - Avoid if: you want any colour at all
   - Traits: two-tone, alternating, maximum contrast
   - Install: `npx shadcn@latest add @avara-ui/falling-tags`
   - Set these props: `{"palette":"black-and-white"}`
   - Docs: https://avaraui.com/docs/nextjs/falling-tags#black-and-white

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tags` | `(string \| FallingTagItem)[]` | `DEFAULT_TAG_LABELS` | List of tag labels or custom tag objects with individual colors/icons. |
| `palette` | `"default" \| "colorful" \| "glass" \| "pastel" \| "monochrome" \| "neon" \| "black-and-white"` | `"default"` | Preset color distribution applied across the tags. `"black-white"` is accepted as an alias of `"black-and-white"`. |
| `gravity` | `number` | `0.55` | Vertical acceleration rate applied when falling. |
| `bounce` | `number` | `0.48` | Restitution coefficient between 0 (no bounce) and 1 (super bouncy). |
| `friction` | `number` | `0.985` | Velocity damping factor for air and contact surfaces. |
| `hoverDuration` | `number` | `1.4` | Duration in seconds that tags hover in anti-gravity before dropping. |
| `height` | `number \| string` | `520` | Height of the physics playground viewport. |
| `showControls` | `boolean` | `false` | Renders top action bar with Drop Again, Scatter, and Zero-G Float toggles. |
| `title` | `string` | `undefined` | Optional title shown in the top header bar when controls or title are enabled. |
| `description` | `string` | `undefined` | Optional subtitle description in the top header bar. |
| `interactive` | `boolean` | `true` | Allows pointer drag and toss throwing physics. |
| `autoStartOnView` | `boolean` | `true` | Triggers entrance drop when component scrolls into viewport. |
| `className` | `string` | `undefined` | Classes for the arena container. Other div attributes are spread onto it too. |

## Works with other components

Combine `FallingTags` with [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack) for structured logo strips, [Particle Canvas](https://avaraui.com/docs/reactjs/particle-canvas) for interactive text physics, and [Badge](https://avaraui.com/docs/reactjs/verify-badge) for static status pills.

## Does FallingTags require Matter.js or another physics engine?

No. Collision detection, gravity, bounce and angular momentum are implemented in TypeScript inside the component and stepped with `requestAnimationFrame`. The registry item's only npm dependency is `lucide-react`, so you install no physics library and the file has no `next/*` imports.

## Can visitors grab and throw the tags?

Yes, and `interactive` defaults to `true`. Pressing a tag with a mouse or finger picks it up, and releasing it flings it with the velocity of your pointer. Each tag sets `touch-action: none`. Pass `interactive={false}` to turn dragging off and let the pile settle on its own.

## How do I use my own tags, with icons or custom colours?

Pass `tags` as an array of strings, or of `FallingTagItem` objects with `id` and `label` plus optional `icon`, `bg`, `text`, `border` and `className`. The `bg`, `text` and `border` values are Tailwind classes that replace the `palette` styling for that one tag.

## How do I control when the tags drop and replay the animation?

Tags float for `hoverDuration` seconds (default `1.4`) before gravity takes over. With `autoStartOnView` on, the drop begins once a quarter of the arena is visible, and only the first time. Add `showControls` for Drop Again, Scatter and Zero-G Float buttons that replay or shake the pile.

## How do I make FallingTags heavier or bouncier?

Tune `gravity` (default `0.55`), `bounce` (default `0.48`, from 0 for no rebound to 1 for very lively) and `friction` (default `0.985`, the damping applied to velocity). Raise `gravity` and lower `bounce` for tags that thud and settle quickly. `height` sets how far they fall.

## Does FallingTags respect prefers-reduced-motion?

Partly. The animation loop checks `prefers-reduced-motion` every frame and, when it is set, skips the physics for every tag you are not dragging, so the pile stops simulating. A dragged tag still follows the pointer. Tags are not collision-resolved in that mode, so test the layout with the setting on.

---

Live previews and every example: https://avaraui.com/docs/nextjs/falling-tags
