---
title: "Shadcn Navigation Menu"
description: "A highly composable, accessible, and smoothly animated navigation menu built for modern React applications. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/navigation
---

# Shadcn Navigation Menu

A highly composable, accessible, and smoothly animated navigation menu built for modern React applications.

This `NavigationMenu` uses a strict context-driven composition pattern to share state across its sub-components. It features a smoothly sliding background indicator that tracks the active menu item and gracefully handles dropdown positioning.

The menu is context-driven: `NavigationMenu` publishes the open item, `variant` and `color`, and the `Indicator` measures the active trigger and slides to it. That hierarchy — `Menu` > `List` > `Item` > `Trigger` / `Content` — is what makes the animation work, so keep it intact.

## Minimal

Pill chrome removed; the indicator becomes a thin underline.

- Set `variant="minimal"` to strip the pill background from the bar and its panels — the indicator becomes a thin underline.

```tsx
import {
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
    <NavigationMenu variant="minimal">
      <NavigationMenuList>
        <NavigationMenuItem value="features">
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* ── MOBILE ULTRA-COMPACT GRID WIDTH ── */}
            <ul className="grid gap-1 p-1 w-[calc(100vw-3.5rem)] max-w-[240px] sm:max-w-[440px] sm:w-[380px] md:w-[440px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="hidden lg:block lg:row-span-3">
                <NavigationMenuLink
                  href="#"
                  className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-[color-mix(in_oklab,var(--nav-accent)_5%,transparent)] to-[color-mix(in_oklab,var(--nav-accent)_16%,transparent)] p-3 sm:p-6 no-underline outline-none focus:shadow-md"
                >
                  <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-foreground mb-2 sm:mb-4" />
                  <div className="mb-1 sm:mb-2 mt-1 sm:mt-4 text-sm sm:text-lg font-semibold text-foreground">
                    Lightning Fast
                  </div>
                  <p className="text-[11px] sm:text-sm leading-snug sm:leading-tight text-muted-foreground">
                    Experience uncompromised performance with our edge-first
                    architecture.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Security" icon={Shield}>
                Advanced encryption protocols.
              </ListItem>
              <ListItem href="#" title="Developers" icon={Code}>
                APIs & webhooks.
              </ListItem>
              <ListItem href="#" title="Customization" icon={Palette}>
                Tailor experience.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* ── MOBILE ULTRA-COMPACT GRID WIDTH ── */}
            <ul className="grid w-[calc(100vw-3.5rem)] max-w-[240px] sm:max-w-[420px] sm:w-[360px] md:w-[420px] gap-1 p-1 md:grid-cols-2">
              <ListItem href="#" title="Documentation" icon={Layers}>
                Quick setup guide.
              </ListItem>
              <ListItem href="#" title="Mobile Apps" icon={Smartphone}>
                iOS & Android.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="pricing">
          {/* Standard link wrapped in trigger-like styles without the chevron */}
          <a
            href="#"
            className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1.5 rounded-full px-2 sm:px-4 py-1 sm:py-2 text-[11px] sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors outline-none whitespace-nowrap"
          >
            Pricing
          </a>
        </NavigationMenuItem>

        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
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
} & ComponentPropsWithoutRef<typeof NavigationMenuLink>) {
  return (
    <li>
      <NavigationMenuLink
        className={cn(
          "block select-none space-y-1 rounded-md p-2.5 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground shrink-0" />}
          {title}
        </div>
        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground mt-1 sm:mt-1.5">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/navigation-menu.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/navigation-menu
```

## Features
Explore the Navigation menu's accessible dropdown features, including hover-delays, animated viewports, and responsive collapsing.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `NavigationMenu` | `variant` | `"default" \| "minimal" \| "glass"` | `"default"` | Determines the core visual architecture and styling of the navigation bar and its dropdown menus. |
| `NavigationMenu` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies the active color theme to the hover states, soft backgrounds, and the sliding indicator. Fully supports custom hex codes; unrecognised names fall back to `"primary"`. |
| `NavigationMenuItem` | `value` | `string` | Required | A unique string identifier used by the internal context engine to link the `Trigger` to its specific `Content` dropdown. |
| `NavigationMenuLink` | `active` | `boolean` | `false` | Manually forces the link into an active state, applying the soft background color of your currently selected theme. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/navigation
