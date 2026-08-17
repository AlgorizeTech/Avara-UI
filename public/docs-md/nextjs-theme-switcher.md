# Theme Switcher

A premium, GSAP-powered dark mode toggle component built specifically for Next.js applications using `next-themes`.

It includes three distinct layout variants (Icon, Pill, and Dropdown) to match different areas of your application, from compact navigation bars to sprawling settings menus. It safely handles React hydration to prevent the dreaded "dark mode flash" on initial load.

## Examples

Each switcher below is live and writes through `next-themes`, so flipping one changes the theme for the whole docs site. The first example's **Code** tab contains the full component source.

export const usageIcon = `import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function DashboardHeader() {
  return (
    
      My App
      {/* Compact enough for a navbar */}

  );
}`;

export const usagePill = `// A segmented control that shows the current mode explicitly — better on a
// settings page than in a dense navbar.
`;

export const usageDropdown = `// Includes the "system" option, so users can defer to their OS setting.
`;

## Installation

### 1. Install Dependencies

This component relies heavily on `next-themes` to manage the actual CSS classes and localStorage states securely, and `gsap` for the micro-interactions.

```bash
npm install next-themes gsap lucide-react
```

### 2. Configure Next Themes

Ensure your app/layout.tsx (or pages/\_app.tsx) is wrapped in the ThemeProvider so the hook functions correctly across your app.

```tsx
// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

          {children}

  );
}
```

### 3. Copy the Component

Copy the full engine code from the **Code** tab of the first example above into `components/custom/blocks/ThemeSwitcherBlock.tsx`.

## Features

Explore the Theme Switcher's dark mode capabilities, featuring hydration-safe rendering and GSAP-powered layout transitions.

    Hydration Safe
    Safely checks if the component is mounted on the client to completely eliminate the infamous React hydration mismatch errors.

    GSAP Animations
    Uses GSAP for premium layout transitions and smooth sliding animations that feel completely native.

    3 Layout Variants
    Ships with a compact Icon toggle, a sliding Pill control, and a classic Dropdown menu to fit any UI design.

    System Sync
    Automatically syncs with the user's OS-level dark mode preferences if the "system" theme is selected.

## Best Practices & Guidelines

    SSR Considerations
    Since `next-themes` relies on `localStorage` which isn't available during Server-Side Rendering, always wrap the component's inner rendering logic in a `mounted` check to prevent hydration mismatch flashes.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          ThemeSwitcher

          variant

          "icon" | "pill" | "dropdown"

          "icon"

          Determines the structural layout and specific GSAP animations applied
          to the toggler.

              icon: A simple, rotating toggle button.

              pill: A segmented control with a sliding active
              indicator.

              dropdown: A click-to-open menu with all theme
              options.

          ThemeSwitcher

          ...props

          HTMLAttributes&lt;HTMLDivElement&gt;

          undefined

          Accepts all native HTML div attributes (e.g., className,{" "}
          id) which are seamlessly forwarded to the root wrapper.

---

**Component Path:** `nextjs\theme-switcher\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
