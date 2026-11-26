---
title: "Shadcn 404 Page"
description: "A full-page 404 section with a radial glow, a masked grid backdrop, an animated compass and customisable shortcut links. Free shadcn/ui 404 Page."
url: https://avaraui.com/docs/nextjs/not-found
---

# Shadcn 404 Page

A responsive, full-page 404 Hyperspace website section featuring ambient radial glow, masked cyber grid backdrop, animated compass indicator, and customizable shortcuts.

Designed as a drop-in replacement for Next.js `not-found.tsx` or standalone missing route pages.

## For AI agents

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/not-found

**When to use it.** A full-page 404 section in six looks: a component wall mosaic, an architectural blueprint, a hyperspace grid, a quantum hologram, a 3D perspective infinite horizon, and an aurora celestial singularity.

**When to use something else:**

- [Error](https://avaraui.com/docs/reactjs/error): for a runtime error page rather than a missing page.

**Gotchas:**

- Choose between the component wall mosaic, architectural blueprint, hyperspace grid, quantum hologram, 3D perspective infinite horizon, and aurora celestial singularity via `variant`.

### The 6 variants

1. **Component Wall Mosaic 404** (`component-wall`): A clean, aesthetic 404 mosaic of rounded component screenshots forming the digits 4, 0, 4 without text clutter.
   - Live: https://avaraui.com/view/not-found/component-wall
   - Best for: component libraries, design systems, creative portfolios, and visual showcase websites
   - Avoid if: you want a minimalist monochrome CAD blueprint or terminal display
   - Traits: screenshot mosaic cards, 404 letterform arrangement, Cloudinary component screenshots, clean zero-text look
   - Install: `npx shadcn@latest add @avara-ui/not-found`
   - Set these props: `{"variant":"component-wall"}`
   - Docs: https://avaraui.com/docs/nextjs/not-found#component-wall-mosaic-404
2. **Aurora celestial singularity** (`aurora-glass`): Clean cinematic 404 with hyperspace warp light streaks, horizon laser pulse, and an animated portal inside the 0.
   - Live: https://avaraui.com/view/not-found/aurora-glass
   - Best for: modern SaaS, design-led web apps, AI platforms, and animated showcase 404 pages
   - Avoid if: you need a flat zero-shadow blueprint or minimal text-only layout
   - Traits: warp light streaks, animated 0 portal, horizon laser beam, clean minimal CTAs
   - Install: `npx shadcn@latest add @avara-ui/not-found`
   - Set these props: `{"variant":"aurora-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/not-found#aurora-celestial-singularity-404-ultra-animated
3. **Architectural CAD blueprint** (`blueprint`): A zero-shadow modular CAD blueprint with a drafting ruler bar, protocol telemetry and a navigation directory.
   - Live: https://avaraui.com/view/not-found/blueprint
   - Best for: architecture, engineering and design-led sites
   - Avoid if: you want a playful or cosmic 404
   - Traits: blueprint grid, no shadows, typographic drafting display, navigation directory
   - Install: `npx shadcn@latest add @avara-ui/not-found`
   - Set these props: `{"variant":"animated-beam-border"}`
   - Docs: https://avaraui.com/docs/nextjs/not-found#architectural-cad-blueprint-404-zero-shadow
4. **Infinite Horizon Color 404** (`spatial-portal`): 3D perspective moving grid runway with an animated chromatic 404, mirror reflection, and clean CTAs.
   - Live: https://avaraui.com/view/not-found/spatial-portal
   - Best for: modern SaaS, design-led web apps, developer platforms, and clean uncluttered 404 pages
   - Avoid if: you prefer a flat CAD blueprint or terminal interface
   - Traits: 3D perspective grid, color-animated 404, mirror reflection, clean CTAs
   - Install: `npx shadcn@latest add @avara-ui/not-found`
   - Set these props: `{"variant":"spatial-portal"}`
   - Docs: https://avaraui.com/docs/nextjs/not-found#infinite-horizon-animated-color-404
5. **Hyperspace** (`hyperspace`): A celestial cosmic grid backdrop with ambient radial glow, a rotating compass badge and a serif status code.
   - Live: https://avaraui.com/view/not-found/hyperspace
   - Best for: a classic, atmospheric 404 that fits most tech and product sites
   - Avoid if: your brand is flat and light
   - Traits: masked cyber grid, radial glow, rotating compass, customisable shortcuts
   - Install: `npx shadcn@latest add @avara-ui/not-found`
   - Set these props: `{"variant":"hyperspace"}`
   - Docs: https://avaraui.com/docs/nextjs/not-found#hyperspace-404-section
6. **Quantum hologram** (`quantum-hologram`): A 3D gyroscopic orbital singularity with a chromatic glitch headline, audio frequency bars and HUD brackets.
   - Live: https://avaraui.com/view/not-found/quantum-hologram
   - Best for: sci-fi, gaming and showpiece sites where the 404 can be a moment
   - Avoid if: you want a calm, quick-to-read error page
   - Traits: 3D orbital animation, chromatic glitch headline, radar telemetry, most animated of the three
   - Install: `npx shadcn@latest add @avara-ui/not-found`
   - Set these props: `{"variant":"quantum-hologram"}`
   - Docs: https://avaraui.com/docs/nextjs/not-found#quantum-hologram-404-advanced-animated

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/not-found.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/not-found
```

## Component Wall Mosaic 404

- `variant="component-wall"` activates clean monumental 404 mosaic formed by rounded screenshot and graphic cards from the component library.

```tsx
import {
  NotFoundSection,
  type NotFoundVariant,
} from "@/components/custom/blocks/NotFoundBlock";

const variant: NotFoundVariant = "component-wall";

export default function NotFound() {
  return <NotFoundSection variant={variant} />;
}
```

## Examples

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/not-found.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/not-found
```

### Architectural CAD Blueprint 404 (Zero Shadow)

- `variant="animated-beam-border"` activates zero-shadow architectural modular CAD blueprint layout with clean modular grid division and precision drafting details.
- `code="404"` monumental typographic drafting display with drafting ticks ruler bar and protocol telemetry spec.
- `showShortcuts=true` displays tactical navigation directory with pure white icon hover transitions.

```tsx
import {
  NotFoundSection,
  type NotFoundVariant,
} from "@/components/custom/blocks/NotFoundBlock";

const variant: NotFoundVariant = "animated-beam-border";

export default function NotFound() {
  return (
    <NotFoundSection
      variant={variant}
      code="404"
      badge="CAD SPEC // 0x404 ROUTE EXCEPTION"
      title="Lost in the Digital Architecture?"
      description="The requested navigation vector has collapsed or relocated to an unindexed partition. Re-anchor to safety using the architectural directory below."
      primaryAction={{
        label: "Explore Documentation",
        href: "#",
      }}
      secondaryAction={{
        label: "Return to Homepage",
        href: "/",
      }}
      showShortcuts={true}
    />
  );
}
```

### Hyperspace 404 Section

- `variant="hyperspace"` classic celestial cosmic grid backdrop with ambient radial glow and rotating compass.
- `code="404"` displays the primary numerical status code with serif typography.
- `badge="Error 404 • Page Not Found"` floating status badge with animated rotating compass icon.

```tsx
import {
  NotFoundSection,
  type NotFoundVariant,
} from "@/components/custom/blocks/NotFoundBlock";

const variant: NotFoundVariant = "hyperspace";

export default function NotFound() {
  return (
    <NotFoundSection
      variant={variant}
      code="404"
      badge="Error 404 • Page Not Found"
      title="Lost in Hyperspace?"
      description="The page you are looking for doesn't exist, was relocated, or is temporarily unavailable in this documentation."
      primaryAction={{
        label: "Explore Documentation",
        href: "#",
      }}
      secondaryAction={{
        label: "Back to Home",
        href: "/",
      }}
      showShortcuts={true}
    />
  );
}
```

### Quantum Hologram 404 (Advanced Animated)

- `variant="quantum-hologram"` activates 3D gyroscopic orbital singularity with chromatic glitch aberration and quantum radar telemetry.
- `code="404"` tri-layer chromatic glitch headline with audio frequency bars and HUD coordinate brackets.
- `showShortcuts=true` displays holographic trajectory recovery grid with live telemetry nodes and pure white icon hover transitions.

```tsx
import {
  NotFoundSection,
  type NotFoundVariant,
} from "@/components/custom/blocks/NotFoundBlock";

const variant: NotFoundVariant = "quantum-hologram";

export default function NotFound() {
  return (
    <NotFoundSection
      variant={variant}
      code="404"
      badge="QUANTUM ROUTE ANOMALY // 0x404"
      title="Lost in the Quantum Singularity?"
      description="The spacetime coordinates of this page have drifted into an unmapped event horizon. Re-align your navigational trajectory via the recovery vectors below."
      primaryAction={{
        label: "Re-anchor to Orbit",
        href: "#",
      }}
      secondaryAction={{
        label: "Return to Base",
        href: "/",
      }}
      showShortcuts={true}
    />
  );
}
```

### Infinite Horizon Animated Color 404

- `variant="spatial-portal"` activates full-background 3D perspective moving grid runway with chromatic color-animated 404 and mirror reflection.
- `code="404"` monumental hero typography with smooth chromatic color wave animation and soft diffuse glow.
- `primaryAction={ label: "Back to Home", href: "/" }` primary navigation CTA button routing the user back to the application homepage.

```tsx
import {
  NotFoundSection,
  type NotFoundVariant,
} from "@/components/custom/blocks/NotFoundBlock";

const variant: NotFoundVariant = "spatial-portal";

export default function NotFound() {
  return (
    <NotFoundSection
      variant={variant}
      code="404"
      title="Page Not Found"
      description="The page you are looking for doesn't exist, has been relocated, or is temporarily unavailable."
      primaryAction={{
        label: "Back to Home",
        href: "/",
      }}
      secondaryAction={{
        label: "Explore Documentation",
        href: "#",
      }}
    />
  );
}
```

### Aurora Celestial Singularity 404 (Ultra Animated)

- `variant="aurora-glass"` activates clean cinematic celestial singularity with concentric spacetime gravitational ripples, volumetric aurora light beams, and an animated portal inside the 0.
- `code="404"` monumental typography with chromatic wave animation and a mesmerizing multi-layer dimensional singularity portal in the central 0.
- `primaryAction={ label: "Return to Safety", href: "/" }` primary navigation CTA button routing the user back to the application homepage.

```tsx
import {
  NotFoundSection,
  type NotFoundVariant,
} from "@/components/custom/blocks/NotFoundBlock";

const variant: NotFoundVariant = "aurora-glass";

export default function NotFound() {
  return (
    <NotFoundSection
      variant={variant}
      code="404"
      title="Lost Beyond the Horizon"
      description="The coordinate you were navigating to has drifted into uncharted space or never existed. Let's guide you back to safety."
      primaryAction={{
        label: "Return to Safety",
        href: "/",
      }}
      secondaryAction={{
        label: "Explore Documentation",
        href: "#",
      }}
    />
  );
}
```

## Features

Discover the key capabilities of the `NotFoundSection` component:

Clean full-bleed spatial scene with sweeping hyperspace laser light streaks, horizon laser beam, and a dimensional multi-orbit vortex portal inside the central zero.

Full-section infinite moving 3D perspective cyber grid runway, glowing horizon laser beam, inverted mirror floor reflection, and flowing chromatic 404 typography.

 360° rotating high-speed conic gradient beam border paired with a diffuse outer glow halo for a futuristic cyberpunk visual presence.

Floating 404 heading with animated chromatic color wave transition and real-time diffuse projection reflections.

Dual glowing radial light sources with a subtle masked 24px cyber grid overlay for a cosmic depth effect.

Adaptive fluid clamp typography and flexible touch-friendly action buttons that fit effortlessly on 320px mobile up to 4K displays.

High-tech monospace route drop monitor with real-time pulsing signal beacon indicating network coordinates status.

Full live CSS variable integration (`--primary`), allowing interactive accent palette switching across light and dark modes.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"hyperspace" \| "animated-beam-border" \| "quantum-hologram" \| "spatial-portal" \| "aurora-glass" \| "component-wall"` | `"hyperspace"` | Visual style variant: component wall screenshot mosaic, classic cosmic hyperspace, architectural CAD blueprint, quantum orbital hologram, kinetic animated radar with color 404, or modern aurora spatial glass card. |
| `color` | `string` | `undefined` | Custom theme accent color applied live across borders, badges, buttons, and glow effects. |
| `code` | `string` | `"404"` | Primary numerical status code heading rendered in elegant serif typography or shifting gradient. |
| `badge` | `string` | `"Error 404 • Page Not Found"` | Floating status pill text with animated rotating compass icon. |
| `title` | `string` | `"Lost in Hyperspace?"` | Main title heading describing the missing resource. |
| `description` | `string` | `"The page you are looking for..."` | Explanatory text providing context and guidance to the user. |
| `primaryAction` | `NotFoundAction` | `&#123; label: "Explore Documentation", href: "#" &#125;` | Primary high-emphasis action button (accepts `label`, `href`, `onClick`, `icon`). |
| `secondaryAction` | `NotFoundAction` | `&#123; label: "Back to Home", href: "/" &#125;` | Secondary subtle action button (accepts `label`, `href`, `onClick`, `icon`). |
| `shortcutsTitle` | `string` | `"Popular Shortcuts"` | Header label displayed above the shortcut navigation grid. |
| `shortcuts` | `ShortcutItem[]` | `[All Components, Installation]` | Array of shortcut quick-links rendered in a 2-column side-by-side grid. |
| `showShortcuts` | `boolean` | `true` | Toggles visibility of the shortcut quick-links card. |
| `className` | `string` | `""` | Custom Tailwind CSS class overrides for the container section. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/not-found
