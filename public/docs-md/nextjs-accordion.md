# Accordion

A powerful, reusable extension of the standard shadcn/ui accordion. This custom wrapper adds built-in support for array-based data mapping, dynamic icons, and 5 highly customizable styling variants.

## Features
Discover the flexible features of the Accordion, such as single or multiple collapsible states, smooth height animations, and full keyboard accessibility.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Explore the different structural variants of the accordion component. Toggle between interaction modes (like forcing one panel to always remain open), and switch styling variants.

_Click the **Code** tab in the preview below to copy the exact usage code for your selected configuration._

## Installation

### 1. Install Dependencies

This component relies on the standard `shadcn/ui` accordion primitives and `lucide-react` for icons. Run the following commands:

```bash
npx shadcn-ui@latest add accordion
npm install lucide-react
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

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
