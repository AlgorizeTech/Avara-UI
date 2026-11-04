---
title: "Not Found"
description: "A full-page 404 section with a radial glow, a masked grid backdrop, an animated compass and customisable shortcut links. Free shadcn/ui 404 Page."
url: https://avaraui.com/docs/nextjs/not-found
---

# Not Found

A responsive, full-page 404 Hyperspace website section featuring ambient radial glow, masked cyber grid backdrop, animated compass indicator, and customizable shortcuts.

Designed as a drop-in replacement for Next.js `not-found.tsx` or standalone missing route pages.

## Architectural CAD Blueprint 404 (Zero Shadow)

- `variant="animated-beam-border"` activates zero-shadow architectural modular CAD blueprint layout with clean modular grid division and precision drafting details.
- `code="404"` monumental typographic drafting display with drafting ticks ruler bar and protocol telemetry spec.
- `showShortcuts=true` displays tactical navigation directory with pure white icon hover transitions.

```tsx
import { NotFoundSection } from "@/components/custom/blocks/NotFoundBlock";

export default function NotFound() {
  return (
    <NotFoundSection
      variant="animated-beam-border"
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

## Hyperspace 404 Section

- `variant="hyperspace"` classic celestial cosmic grid backdrop with ambient radial glow and rotating compass.
- `code="404"` displays the primary numerical status code with serif typography.
- `badge="Error 404 • Page Not Found"` floating status badge with animated rotating compass icon.

```tsx
import { NotFoundSection } from "@/components/custom/blocks/NotFoundBlock";

export default function NotFound() {
  return (
    <NotFoundSection
      variant="hyperspace"
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

## Quantum Hologram 404 (Advanced Animated)

- `variant="quantum-hologram"` activates 3D gyroscopic orbital singularity with chromatic glitch aberration and quantum radar telemetry.
- `code="404"` tri-layer chromatic glitch headline with audio frequency bars and HUD coordinate brackets.
- `showShortcuts=true` displays holographic trajectory recovery grid with live telemetry nodes and pure white icon hover transitions.

```tsx
import { NotFoundSection } from "@/components/custom/blocks/NotFoundBlock";

export default function NotFound() {
  return (
    <NotFoundSection
      variant="quantum-hologram"
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

## Features

Discover the key capabilities of the `NotFoundSection` component:

### Animated Conic Laser Border & Halo

 360° rotating high-speed conic gradient beam border paired with a diffuse outer glow halo for a futuristic cyberpunk visual presence.

### Shifting Multi-Color Typography

Floating 404 heading with animated chromatic color wave transition and real-time diffuse projection reflections.

### Ambient Radial Glow & Cyber Grid

Dual glowing radial light sources with a subtle masked 24px cyber grid overlay for a cosmic depth effect.

### 100% Screen & Device Responsive

Adaptive fluid clamp typography and flexible touch-friendly action buttons that fit effortlessly on 320px mobile up to 4K displays.

### Diagnostic Telemetry Bar

High-tech monospace route drop monitor with real-time pulsing signal beacon indicating network coordinates status.

### Theme Accent Color Switching

Full live CSS variable integration (`--primary`), allowing interactive accent palette switching across light and dark modes.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"hyperspace" \| "animated-beam-border"` | `"hyperspace"` | Visual style variant: classic cosmic hyperspace or rotating neon laser beam border with shifting color. |
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
