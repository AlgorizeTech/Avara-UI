# Accordion

A powerful, reusable extension of the standard shadcn/ui accordion. This custom wrapper adds built-in support for array-based data mapping, dynamic icons, and 5 highly customizable styling variants.

## Interactive Showcase

Explore the different structural variants of the accordion component. Toggle between interaction modes (like forcing one panel to always remain open), and switch styling variants.

_Click the **Code** tab in the preview below to copy the exact usage code for your selected configuration._

---

## Installation

### 1. Install Dependencies

This component relies on the standard `shadcn/ui` accordion primitives and `lucide-react` for icons. Run the following commands:

```bash
npx shadcn-ui@latest add accordion
npm install lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          accordionData

          AccordionDataItem[]

          []

          Array of objects defining value, title,{" "}
          icon, and content.

          variant

          "default" | "bordered" | "filled" | "elevated" | "ghost"

          "default"
        
        Applies pre-defined structural and aesthetic styling.

          type

          "single" | "multiple"

          "single"

          Determines if one or multiple panels can be open simultaneously.

          collapsible

          boolean

          true

          If type="single", allows closing the currently open
          panel.

          defaultValue

          string | string[]

          null

          The value of the item(s) open by default.

          expandIcon

          ReactNode | string

          null

          Overrides the default chevron icon. Pass a lucide string like{" "}
          "Plus".

          className

          string

          ""
        
        Custom classes applied to the root container.

          itemClassName

          string

          ""
        
        Custom classes applied to individual accordion items.

          triggerClassName

          string

          ""
        
        Custom classes applied to the clickable trigger row.

          contentClassName

          string

          ""
        
        Custom classes applied to the expanded content area.

---

**Component Path:** `nextjs\accordion\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
