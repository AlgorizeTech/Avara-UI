export const metadata = docsPageMetadata("breadcrumb");

# Breadcrumb

A navigational aid that helps users understand their current location within a website's hierarchy.

This component features four distinct visual variants, seamless color theming, and **built-in automatic path truncation**. If the user's path is too deep, it automatically collapses the middle items behind a clickable ellipsis (`...`) button.

You describe the trail as an `items` array; the component handles dividers, the active item and truncation.

export const usageDefault = `import { BreadcrumbBlock, type BreadcrumbItem } from "@/components/custom/blocks/BreadcrumbBlock";

const items: BreadcrumbItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
];

export default function BreadcrumbDemo() {
  // The last item is rendered as the current page, not a link.
  return ;
}`;

export const usageIcons = `import { BreadcrumbBlock, type BreadcrumbItem } from "@/components/custom/blocks/BreadcrumbBlock";

const items: BreadcrumbItem[] = [
  // icon takes the Lucide component itself, not a string
  { label: "Home", href: "/", icon: Home },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: "/settings/profile" },
];

export default function BreadcrumbWithIcons() {
  return ;
}`;

export const usageTruncated = `import { BreadcrumbBlock, type BreadcrumbItem } from "@/components/custom/blocks/BreadcrumbBlock";

const deepPath: BreadcrumbItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Nexus UI Kit", href: "/projects/nexus" },
  { label: "Components", href: "/projects/nexus/components" },
  { label: "Breadcrumb.tsx", href: "#", icon: FileText },
];

export default function DeepBreadcrumb() {
  // More items than maxItems? The middle collapses behind a "..." button
  // that expands the full trail when clicked.
  return ;
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/breadcrumb
```

## Examples

## Features
Explore the Breadcrumb navigation features, including collapsible items, custom separators, and SEO-friendly structure.

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

          items

          BreadcrumbItem[]

          Required

          An array of objects containing a label (string), optional{" "}
          href (string), and optional icon (Lucide
          Component).

          variant

          "classic" | "slash" | "solid" | "ghost"

          "classic"

          Determines the visual styling of the links and the dividers between
          them.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the active text and hover states.
          Accepts valid hex codes (e.g. "#00FF00").

          maxItems

          number

          4

          The maximum number of links to display before automatically truncating
          the middle of the path.

          linkComponent

          React.ElementType

          "a"

          The element each item renders as. It defaults to a plain{" "}
          &lt;a&gt; so one source works in any React app — pass{" "}
          Link from next/link to get client-side
          navigation and prefetching back.

---

**Component Path:** `[framework]\breadcrumb\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
