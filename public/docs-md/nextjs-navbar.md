# Navbar / Header

A highly responsive, production-ready Navigation Bar. It manages pure CSS dropdowns for complex desktop menus, and uses GSAP to smoothly animate a beautiful slide-out drawer on mobile devices.

## Interactive Showcase

Use the control panel below to switch between layouts.

- **Floating:** A modern, pill-shaped glassmorphism navbar (excellent for landing pages).
- **Centered:** Perfectly balances the logo in the center of the screen.
- **Minimal:** Clean, borderless, transparent navigation.

_(Resize your browser window or use mobile view to see the GSAP animated hamburger drawer in action!)_

## Installation

### 1. Install Dependencies

This component uses `gsap` for the buttery-smooth mobile menu slide animations, and `lucide-react` for standard UI icons.

```bash
npm install gsap lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "default" | "floating" | "centered" | "minimal"

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
