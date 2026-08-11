# Navbar / Header

A highly responsive, production-ready Navigation Bar. It manages pure CSS dropdowns for complex desktop menus, and uses GSAP to smoothly animate a beautiful slide-out drawer on mobile devices.

## Examples

Switch any preview to a mobile width with the device buttons to see the GSAP hamburger drawer. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function SiteHeader() {
  return ;
}`;

export const usageFloating = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function LandingHeader() {
  // A pill that floats over the hero — pair it with a colorful background.
  return ;
}`;

export const usageCentered = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function CenteredHeader() {
  // Logo in the middle, links split either side.
  return ;
}`;

export const usageMinimal = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function MinimalHeader() {
  // Borderless and transparent — lets the page behind it show through.
  return ;
}`;

export const usageGlass = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function GlassHeader() {
  // Full-width bar with a backdrop blur, so content scrolls under it.
  return ;
}`;

export const usageLogo = `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function BrandedHeader() {
  // logoText replaces the wordmark without touching the component.
  return ;
}`;

## Installation

### 1. Install Dependencies

This component uses `gsap` for the buttery-smooth mobile menu slide animations, and `lucide-react` for standard UI icons.

```bash
npm install gsap lucide-react
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/NavbarBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "default" | "floating" | "centered" | "minimal" | "glass"

          "default"
        
        Determines the structural layout and positioning of the navbar.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the logo icon and primary
          Call-to-Action button. Accepts valid hex codes (e.g.{" "}
          "#00FF00").

          logoText

          string

          "Nexus"
        
        The text displayed next to the logo mark.

---

**Component Path:** `nextjs\navbar\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
