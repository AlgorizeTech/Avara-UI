export const metadata = docsPageMetadata("not-found-section");

# Not Found Section

A responsive, full-page 404 Hyperspace website section featuring ambient radial glow, masked cyber grid backdrop, animated compass indicator, and customizable shortcuts.

Designed as a drop-in replacement for Next.js `not-found.tsx` or standalone missing route pages.

export const usageDefault = `import { NotFoundSection } from "@/components/custom/blocks/NotFoundSectionBlock";

export default function NotFound() {
  return (
    
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/not-found-section.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/not-found-section
```

## Features

Discover the key capabilities of the `NotFoundSection` component:

    Ambient Radial Glow & Cyber Grid
    Dual glowing radial light sources with a subtle masked 24px cyber grid overlay for a cosmic depth effect.

    100% Screen & Device Responsive
    Adaptive fluid clamp typography and flexible touch-friendly action buttons that fit effortlessly on 320px mobile up to 4K displays.

    Animated Compass Indicator
    Continuous subtle gyro rotation inside the status pill gives the missing page an engaging, alive feel.

    Quick Navigation Shortcuts
    Built-in side-by-side shortcut pills help users immediately jump to documentation, components, or search.

## Props Reference

        Prop
        Type
        Default
        Description

        code
        string
        "404"
        Primary numerical status code heading rendered in elegant serif typography.

        badge
        string
        "Error 404 • Page Not Found"
        Floating status pill text with animated rotating compass icon.

        title
        string
        "Lost in Hyperspace?"
        Main title heading describing the missing resource.

        description
        string
        "The page you are looking for..."
        Explanatory text providing context and guidance to the user.

        primaryAction
        NotFoundAction
        &#123; label: "Explore Documentation", href: "/docs" &#125;
        Primary high-emphasis action button (accepts label, href, onClick, icon).

        secondaryAction
        NotFoundAction
        &#123; label: "Back to Home", href: "/" &#125;
        Secondary subtle action button (accepts label, href, onClick, icon).

        shortcutsTitle
        string
        "Popular Shortcuts"
        Header label displayed above the shortcut navigation grid.

        shortcuts
        ShortcutItem[]
        [All Components, Installation]
        Array of shortcut quick-links rendered in a 2-column side-by-side grid.

        showShortcuts
        boolean
        true
        Toggles visibility of the shortcut quick-links card.

        className
        string
        ""
        Custom Tailwind CSS class overrides for the container section.

---

**Component Path:** `[framework]\not-found-section\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
