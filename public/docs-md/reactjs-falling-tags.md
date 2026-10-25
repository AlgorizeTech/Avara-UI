export const metadata = docsPageMetadata("falling-tags");

# Falling Tags

A physics-based interactive tags playground inspired by the viral **Falling Tags** Framer component by Guo. When the section scrolls into view, tags fade in floating gently near the top, hover weightlessly for a moment, then lose their footing, drop, tumble, collide realistically, and pile up naturally at the bottom.

Visitors can grab any tag with a mouse or finger, drag it around, and fling it across the container with authentic velocity and angular momentum. Built with pure TypeScript and mathematical 2D rigid-body collision dynamics — zero external physics dependencies needed. Tags automatically follow your project's global theme radius (`--radius`).

export const usageDefault = `export default function SkillsSection() {
  return (

  );
}`;

export const usageColorful = `export default function ColorfulTags() {
  return (
    
  );
}`;

export const usageGlass = `const mySkills = [
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

  );
}`;

export const usageNeon = `export default function NeonArena() {
  return (
    
  );
}`;

export const usagePastel = `export default function PastelTags() {
  return (
    
  );
}`;

export const usageMonochrome = `export default function MonochromeTags() {
  return (
    
  );
}`;

export const usageBlackAndWhite = `export default function BlackAndWhiteTags() {
  return (
    
  );
}`;

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/falling-tags.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/falling-tags
```

## Examples

## Features

    Float-to-Drop Sequence
    When scrolled into view, tags appear in the upper arena with a gentle floating levitation wave before gravity triggers the drop.

    Real 2D Rigid-Body Physics
    Mathematically exact capsule-capsule and capsule-wall collision solver with realistic mass, angular inertia, restitution bounce, and sliding friction.

    Interactive Grab & Throw
    Grab tags with your mouse or finger, toss them in any direction, and watch them rebound off walls and scatter other tags with momentum.

    Zero External Dependencies
    Built purely using native React and high-efficiency requestAnimationFrame loop. Zero bulky physics library dependencies.

## Props Reference

        Prop
        Type
        Default
        Description

        tags
        (string | FallingTagItem)[]
        DEFAULT_TAG_LABELS
        List of tag labels or custom tag objects with individual colors/icons.

        palette
        "default" | "colorful" | "glass" | "pastel" | "monochrome" | "neon" | "black-and-white"
        "default"
        Preset color distribution applied across the tags.

        gravity
        number
        0.55
        Vertical acceleration rate applied when falling.

        bounce
        number
        0.48
        Restitution coefficient between 0 (no bounce) and 1 (super bouncy).

        friction
        number
        0.985
        Velocity damping factor for air and contact surfaces.

        hoverDuration
        number
        1.4
        Duration in seconds that tags hover in anti-gravity before dropping.

        height
        number | string
        500
        Height of the physics playground viewport.

        showControls
        boolean
        false
        Renders top action bar with Drop Again, Scatter, and Zero-G Float toggles.

        title
        string
        undefined
        Optional title shown in the top header bar when controls or title are enabled.

        description
        string
        undefined
        Optional subtitle description in the top header bar.

        interactive
        boolean
        true
        Allows pointer drag and toss throwing physics.

        autoStartOnView
        boolean
        true
        Triggers entrance drop when component scrolls into viewport.

---

**Component Path:** `[framework]\falling-tags\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
