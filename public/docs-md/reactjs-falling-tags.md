---
title: "Falling Tags"
description: "A physics-based interactive tags playground inspired by the viral Falling Tags Framer component by Guo. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/falling-tags
---

# Falling Tags

A physics-based interactive tags playground inspired by the viral **Falling Tags** Framer component by Guo. When the section scrolls into view, tags fade in floating gently near the top, hover weightlessly for a moment, then lose their footing, drop, tumble, collide realistically, and pile up naturally at the bottom.

Visitors can grab any tag with a mouse or finger, drag it around, and fling it across the container with authentic velocity and angular momentum. Built with pure TypeScript and mathematical 2D rigid-body collision dynamics — zero external physics dependencies needed. Tags automatically follow your project's global theme radius (`--radius`).

## Interactive physics arena

Watch the tags float into view, drop and tumble into a natural pile. Click and throw any tag with your mouse or finger.

- `palette="default"` chooses the color scheme — "default", "colorful", "glass", "pastel", "monochrome", "neon", or "black-and-white".
- `hoverDuration=1.4` how many seconds tags hover in anti-gravity before the drop begins.
- `gravity=0.55` downward gravitational acceleration constant for realistic tumbling.
- `interactive=true` enables real-time pointer drag and momentum-based throwing with impulse physics.

```tsx
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

### Colorful

Vibrant multi-color playful palette across rich indigo, emerald, rose, and amber tones.

- Set `palette="colorful"` for a vivid color distribution across all falling badges.

```tsx
export default function ColorfulTags() {
  return (
    <FallingTags
      palette="colorful"
      height={500}
    />
  );
}
```

### Glass

Translucent frosted glass badges with backdrop-blur and luminous specular borders over a scenic backdrop.

- Set `palette="glass"` for semi-transparent tags with backdrop blur that blend over dark, light, or image backgrounds.

```tsx
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

### Neon

High-energy glowing cyberpunk badges with vibrant borders and neon glow shadows.

- Set `palette="neon"` for intense saturated tones with electric glow box-shadows.

```tsx
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

### Pastel

Soft soothing aesthetic pastel badges designed for serene minimal layouts and creative portfolios.

- Set `palette="pastel"` for delicate muted pastel hues that maintain readability without visual clutter.

```tsx
export default function PastelTags() {
  return (
    <FallingTags
      palette="pastel"
      height={500}
    />
  );
}
```

### Monochrome

High-contrast editorial zinc and black/white palette tailored for modern minimalist dark and light themes.

- Set `palette="monochrome"` for a restrained black, white, and zinc palette that follows theme foreground/background tokens.

```tsx
export default function MonochromeTags() {
  return (
    <FallingTags
      palette="monochrome"
      height={500}
    />
  );
}
```

### Black and white

High-contrast dual-tone black and white badges. Tags alternate between black background with white text and border, and white background with black text and border.

- Set `palette="black-and-white"` for dual-tone black and white badges with inverted high-contrast borders and text.

```tsx
export default function BlackAndWhiteTags() {
  return (
    <FallingTags
      palette="black-and-white"
      height={500}
    />
  );
}
```

## Features

### Float-to-Drop Sequence

When scrolled into view, tags appear in the upper arena with a gentle floating levitation wave before gravity triggers the drop.

### Real 2D Rigid-Body Physics

Mathematically exact capsule-capsule and capsule-wall collision solver with realistic mass, angular inertia, restitution bounce, and sliding friction.

### Interactive Grab & Throw

Grab tags with your mouse or finger, toss them in any direction, and watch them rebound off walls and scatter other tags with momentum.

### Zero External Dependencies

Built purely using native React and high-efficiency requestAnimationFrame loop. Zero bulky physics library dependencies.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tags` | `(string \| FallingTagItem)[]` | `DEFAULT_TAG_LABELS` | List of tag labels or custom tag objects with individual colors/icons. |
| `palette` | `"default" \| "colorful" \| "glass" \| "pastel" \| "monochrome" \| "neon" \| "black-and-white"` | `"default"` | Preset color distribution applied across the tags. |
| `gravity` | `number` | `0.55` | Vertical acceleration rate applied when falling. |
| `bounce` | `number` | `0.48` | Restitution coefficient between 0 (no bounce) and 1 (super bouncy). |
| `friction` | `number` | `0.985` | Velocity damping factor for air and contact surfaces. |
| `hoverDuration` | `number` | `1.4` | Duration in seconds that tags hover in anti-gravity before dropping. |
| `height` | `number \| string` | `500` | Height of the physics playground viewport. |
| `showControls` | `boolean` | `false` | Renders top action bar with Drop Again, Scatter, and Zero-G Float toggles. |
| `title` | `string` | `undefined` | Optional title shown in the top header bar when controls or title are enabled. |
| `description` | `string` | `undefined` | Optional subtitle description in the top header bar. |
| `interactive` | `boolean` | `true` | Allows pointer drag and toss throwing physics. |
| `autoStartOnView` | `boolean` | `true` | Triggers entrance drop when component scrolls into viewport. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/falling-tags
