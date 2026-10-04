export const metadata = docsPageMetadata("navigation");

# Navigation Menu

A highly composable, accessible, and smoothly animated navigation menu built for modern React applications.

This `NavigationMenu` uses a strict context-driven composition pattern to share state across its sub-components. It features a smoothly sliding background indicator that tracks the active menu item and gracefully handles dropdown positioning.

The menu is context-driven: `NavigationMenu` publishes the open item, `variant` and `color`, and the `Indicator` measures the active trigger and slides to it. That hierarchy — `Menu` > `List` > `Item` > `Trigger` / `Content` — is what makes the animation work, so keep it intact.

export const usageMinimal = `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/custom/blocks/NavigationMenu";

export default function MinimalNav() {
  // Pill chrome removed; the indicator becomes a thin underline.
  return (

          Features
          
            {/* ── MOBILE ULTRA-COMPACT GRID WIDTH ── */}

                    Lightning Fast

                    Experience uncompromised performance with our edge-first
                    architecture.

                Advanced encryption protocols.

                APIs & webhooks.

                Tailor experience.

          Resources
          
            {/* ── MOBILE ULTRA-COMPACT GRID WIDTH ── */}

                Quick setup guide.

                iOS & Android.

          {/* Standard link wrapped in trigger-like styles without the chevron */}
          
            Pricing

  );
}

function ListItem({
  className,
  title,
  children,
  icon: Icon,
  ...props
}: {
  className?: string;
  title: string;
  children: ReactNode;
  icon?: ElementType;
} & ComponentPropsWithoutRef) {
  return (

          {Icon && }
          {title}

          {children}

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/navigation-menu
```

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

## Props Reference

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

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies the active color theme to the hover states, soft backgrounds,
          and the sliding indicator. Fully supports custom hex codes;
          unrecognised names fall back to "primary".

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

---

**Component Path:** `[framework]\navigation\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
