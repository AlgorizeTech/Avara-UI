# Alerts

A highly versatile Alert component designed to communicate states and important information to your users.

Along with the classic `solid` and `outline` variations, this component now features three completely modern aesthetics: `modern` (SaaS style), `glass` (glassmorphism), and `glow` (dark mode neon).

## Interactive Showcase

Use the control panel below to cycle through the different permutations. You can toggle icons, rich content elements (like buttons), and dismissibility.

_If you enable `dismissible`, you can use the reset button to replay the entrance animations._

## Installation

### 1. Copy the Component

This component manages its own exit/entrance animations using Tailwind CSS utility classes and basic React state, meaning you don't need any complex external animation libraries to use it.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/Alerts.tsx`.

---

## Usage

Simply drop the `Alert` into your layout and define the `type` and `variant` props.

```tsx

export default function Dashboard() {
  return (
    
      {/* A modern, high-contrast alert */}

      {/* A glowing dark-mode alert with rich content */}

          You have exceeded your monthly API quota. Please upgrade your plan to
          continue using the service without interruptions.

          Upgrade Plan

  );
}
```

## Features
Learn about the Alert component's capabilities, including different severity levels, customizable icons, and dismissible actions.

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

## Props Reference

        Prop
        Type
        Default
        Description

          type

            "primary" | "secondary" | "success" | "danger" | "warning" | "info"
            | "dark"

          "primary"
        
        Determines the semantic color scheme of the alert.

          variant

          "solid" | "outline" | "modern" | "glass" | "glow"

          "modern"
        
        Applies overarching structural layouts and visual styles.

          dismissible

          boolean

          false

          If true, renders an "X" button that smoothly animates the alert out of
          the DOM.

          icon

          string | ReactNode

          null

          The icon to display. You can pass a string matching the{" "}
          ICON_MAP, an emoji, or a custom SVG.

          title

          string

          null
        
        The bold header text of the alert.

---

**Component Path:** `nextjs\alert\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
