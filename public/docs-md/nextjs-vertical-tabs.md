# Vertical Tabs

A sleek, responsive vertical navigation component. It utilizes a sidebar menu on the left (which stacks automatically on smaller screens) and an active content pane on the right.

## Interactive Showcase

Interact with the menu below to see the GSAP crossfade animations. Use the control panel to switch layouts (`default`, `minimal`, `bordered`, `glass`) and apply custom hex colors to the active tab states!

_Click the **Code** tab in the preview below to copy the full component engine._

---

## Installation

### 1. Install Dependencies

This component uses `gsap` for the smooth opacity and sliding transitions between tab content, and `lucide-react` for the icons.

```bash
npm install gsap lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          tabs

          TabItem[]

          Required

          Array of objects containing the tab id,{" "}
          label, optional icon, and the{" "}
          content to render.

          variant

          "default" | "glass" | "minimal" | "bordered"

          "default"

          Applies overarching structural layouts. bordered connects
          the menu directly to the content, while minimal removes
          background containers.

          color

            "indigo" | "rose" | "emerald" | "zinc" | "purple" | string

          "purple"

          Applies the active state color to the selected tab. Accepts preset
          names or valid hex codes (e.g. "#FF0055").

          defaultActiveId

          string

          tabs[0].id

          Optionally specify which tab ID should be open when the component
          first mounts.

---

**Component Path:** `nextjs\vertical-tabs\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
