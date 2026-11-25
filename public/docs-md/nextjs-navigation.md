---
title: "Shadcn Navigation Menu"
description: "Shadcn Navigation Menu. A context-driven navigation bar (`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`."
url: https://avaraui.com/docs/nextjs/navigation
---

# Shadcn Navigation Menu

A context-driven navigation bar (`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuIndicator`) with an active sliding indicator.

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
import { cn } from "@/lib/utils";
import { Code, Layers, Palette, Shield, Smartphone, Zap } from "lucide-react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

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

## About Shadcn Navigation Menu

**What it is.** `NavigationMenu` (`NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuIndicator`) provides animated site navigation with hover/click dropdown panels and a sliding active indicator.

**How it is built.** Context-driven hierarchy (`NavigationMenu` → `NavigationMenuList` → `NavigationMenuItem` → `NavigationMenuTrigger` / `NavigationMenuContent`). Each trigger measures itself when it becomes active, and `NavigationMenuIndicator` slides to that position with a CSS transition. Panels are centred under the `<nav>` element.

**When to use it.** Use `NavigationMenu` for top-level site headers and mega-menus. For desktop application command bars, use [Menubar](https://avaraui.com/docs/nextjs/menubar).

## For AI agents

**When to use**

- Top-level site navigation bars with animated dropdown viewports and sliding active indicators (`variant="default" | "minimal" | "glass"`)

**When not to use**

- Desktop File/Edit/View command bars — use [Menubar](https://avaraui.com/docs/nextjs/menubar)
- Breadcrumb hierarchy trails — use [Breadcrumb](https://avaraui.com/docs/nextjs/breadcrumb)

**Agent notes**

- Installs via `navigation-menu` (`@/components/custom/blocks/NavigationMenu`)
- Keep the `NavigationMenu` → `NavigationMenuList` → `NavigationMenuItem` → `NavigationMenuTrigger` / `NavigationMenuContent` hierarchy intact. Every `NavigationMenuItem` needs a unique `value`, and using these parts outside `NavigationMenu` throws.
- `NavigationMenuIndicator` only slides to a `NavigationMenuTrigger`. A plain link item (an `<a>` inside a `NavigationMenuItem`) gets no indicator.
- `color` accepts `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex string starting with `#`. Any other name falls back to `"primary"`.
- Mark the current page with `active` on `NavigationMenuLink`, which also sets `aria-current="page"`.
- The only npm dependency is `lucide-react`; the item also installs a small `navigation-menu-theme` helper file beside it.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `NavigationMenu` | `variant` | `"default" \| "minimal" \| "glass"` | `"default"` | Determines the core visual architecture and styling of the navigation bar and its dropdown menus. |
| `NavigationMenu` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies the active color theme to the hover states, soft backgrounds, and the sliding indicator. Fully supports custom hex codes; unrecognised names fall back to `"primary"`. |
| `NavigationMenuItem` | `value` | `string` | Required | A unique string identifier used by the internal context engine to link the `Trigger` to its specific `Content` dropdown. |
| `NavigationMenuLink` | `active` | `boolean` | `false` | Manually forces the link into an active state, applying the soft background color of your currently selected theme. |

## Works with other components

- Pair `NavigationMenu` with [Navbar](https://avaraui.com/docs/nextjs/navbar) and [Theme Switcher](https://avaraui.com/docs/nextjs/theme-switcher) in site headers.
- Use [Menubar](https://avaraui.com/docs/nextjs/menubar) for desktop File/Edit/View command bars instead of site navigation.
- Add a [Breadcrumb](https://avaraui.com/docs/nextjs/breadcrumb) below the header to show where the current page sits.

## How does variant="minimal" change NavigationMenu?

`variant="minimal"` makes the pill container around `NavigationMenuList` transparent with no border or shadow. The dropdown panels keep their tinted background and shadow, and `NavigationMenuIndicator` still draws a soft highlight behind the active trigger rather than an underline.

## How do I change the NavigationMenu accent color?

Pass `color` to `NavigationMenu`. Use `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex string such as `"#0ea5e9"`. It tints the indicator, link hover and the default and minimal panels. Any other name falls back to `"primary"`, which follows your theme token.

## How do I mark the current page in NavigationMenu?

Set `active` on the matching `NavigationMenuLink`. It adds a soft accent background with semibold text, sets `data-active`, and adds `aria-current="page"` so screen readers announce the current link. `NavigationMenu` does not read the router, so you pass `active` yourself.

## Does NavigationMenu work with touch and the keyboard?

Hover opens a panel only for mouse pointers; on touch devices a tap on `NavigationMenuTrigger` toggles it. Focusing a trigger also opens its panel. The component has no Escape handler and no `aria-expanded`, so add those yourself if your design needs them.

## Why does NavigationMenu throw a "must be used within" error?

`NavigationMenuList`, `NavigationMenuTrigger`, `NavigationMenuContent` and `NavigationMenuIndicator` read context from the root and throw when rendered outside `NavigationMenu`. `NavigationMenuTrigger` and `NavigationMenuContent` also throw outside a `NavigationMenuItem`, which supplies the `value` that links them. Wrap the parts in the full hierarchy to fix it.

## When should I pick NavigationMenu instead of Navbar?

Choose `NavigationMenu` when you only need the pill bar with hover dropdown panels and a sliding indicator, and you supply your own header layout. It has no mobile slide-out drawer. Choose [Navbar](https://avaraui.com/docs/nextjs/navbar) when you want a complete header with a built-in mobile drawer.

---

Live previews and every example: https://avaraui.com/docs/nextjs/navigation
