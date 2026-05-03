# Breadcrumb

A navigational aid that helps users understand their current location within a website's hierarchy.

This component features four distinct visual variants, seamless color theming, and **built-in automatic path truncation**. If the user's path is too deep, it automatically collapses the middle items behind a clickable ellipsis (`...`) button.

## Interactive Showcase

Use the control panel below to test the different visual styles. Toggle the **Path Length** to see how the component intelligently handles deep page hierarchies without breaking the UI.

_Click the **Code** tab in the preview below to copy the full component engine._

---

## Installation

### 1. Install Dependencies

This component utilizes `lucide-react` for standard UI icons like the Home button, Chevron dividers, and the Ellipsis menu.

```bash
npm install lucide-react
```

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

---

**Component Path:** `nextjs\breadcrumb\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
