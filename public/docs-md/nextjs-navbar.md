export const metadata = docsPageMetadata("navbar");

# Navbar / Header

A highly responsive, production-ready Navigation Bar. It manages pure CSS dropdowns for complex desktop menus, and uses CSS transitions to smoothly animate a beautiful slide-out drawer on mobile devices.

Switch any preview to a mobile width with the device buttons to see the hamburger drawer.

export const usageDefault = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function SiteHeader() {
  return (
    
  );
}`;

export const usageFloating = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function LandingHeader() {
  // A pill that floats over the hero — pair it with a colorful background.
  return (
    
  );
}`;

export const usageCentered = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function CenteredHeader() {
  // Logo in the middle, links split either side.
  return (
    
  );
}`;

export const usageMinimal = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function MinimalHeader() {
  // Borderless and transparent — lets the page behind it show through.
  return (
    
  );
}`;

export const usageGlass = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function GlassHeader() {
  // Full-width bar with a backdrop blur, so content scrolls under it.
  return (
    
  );
}`;

export const usageEcommerce = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function EcommerceHeader() {
  // A conversion-focused E-Commerce Mega Nav with announcement bar,
  // persistent mega menu panel, product previews, promo banners, cart, and mobile drawer.
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/navbar
```

## Examples

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "default" | "floating" | "centered" | "minimal" | "glass" | "ecommerce-mega-nav"

          "default"
        
        Determines the structural layout and positioning of the navbar. Use "ecommerce-mega-nav" for a full-featured e-commerce header with announcement bar, product-rich mega menus, cart, and mobile drawer.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the logo icon and primary
          Call-to-Action button. Accepts named themes or valid hex codes (e.g.{" "}
          "#8b5cf6").

          logoText

          string

          "Nexus"
        
        The text displayed next to the logo mark.

          linkComponent

          React.ElementType

          "a"

          The React component used for internal links. In Next.js, pass{" "}
          next/link to preserve client-side routing.

---

**Component Path:** `[framework]\navbar\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
