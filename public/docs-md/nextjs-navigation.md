# Navigation Menu

A highly composable, accessible, and smoothly animated navigation menu built for modern React applications.

This `NavigationMenu` uses a strict context-driven composition pattern to share state across its sub-components. It features a smoothly sliding background indicator that tracks the active menu item and gracefully handles dropdown positioning.

## Interactive Showcase

Use the control panel below to test the different styles and colors.

- **Composition:** The menu relies on a specific hierarchy (`Menu` > `List` > `Item` > `Trigger` / `Content`) to ensure smooth animations.
- **Dynamic Indicator:** The `NavigationMenuIndicator` automatically calculates the width and position of the active trigger and slides to it.

## Installation

### Copy the Component

Because this relies on standard React Context and GSAP for the smooth indicator sliding, it fits right into your existing architecture.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/NavigationMenu.tsx`.

---

## Usage

Define your navigation structure using the provided sub-components. The `value` prop on the `NavigationMenuItem` is required to link the trigger to its content.

```tsx

export default function TopNav() {
  return (

            Products

                  SaaS Platform

                  Mobile App

              Pricing

  );
}
```

        Component
        Prop
        Type
        Default
        Description

          NavigationMenu

          variant

          "default" | "minimal" | "glass"

          "default"

          Determines the core visual architecture and styling of the navigation
          bar and its dropdown menus.

          NavigationMenu

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies the active color theme to the hover states, soft backgrounds,
          and the sliding indicator. Fully supports custom hex codes.

          NavigationMenuItem

          value

          string

          Required

          A unique string identifier used by the internal context engine to link
          the Trigger to its specific Content{" "}
          dropdown.

          NavigationMenuLink

          active

          boolean

          false

          Manually forces the link into an active state, applying the soft
          background color of your currently selected theme.

## Features
Explore the Navigation menu's accessible dropdown features, including hover-delays, animated viewports, and responsive collapsing.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

---

**Component Path:** `nextjs\navigation\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
