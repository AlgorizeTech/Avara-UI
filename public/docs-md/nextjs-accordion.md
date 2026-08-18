# Accordion

A powerful, reusable extension of the standard shadcn/ui accordion. This custom wrapper adds built-in support for array-based data mapping, dynamic icons, and 5 highly customizable styling variants.

## Examples

You feed it an `accordionData` array — the wrapper maps it to items, icons and content for you.

export const usageData = `const faqItems = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];`;

export const usageDefault = `import { Accordion } from "@/components/custom/blocks/Accordion";

${usageData}

export default function Faq() {
  return (
    
  );
}`;

export const usageVariants = `import { Accordion } from "@/components/custom/blocks/Accordion";

export default function AccordionVariants() {
  return (

  );
}`;

export const usageMultiple = `import { Accordion } from "@/components/custom/blocks/Accordion";

${usageData}

export default function MultiOpenFaq() {
  // type="multiple" lets any number of panels stay open at once.
  // defaultValue becomes an array in this mode.
  return (
    
  );
}`;

export const usageMandatory = `import { Accordion } from "@/components/custom/blocks/Accordion";

${usageData}

export default function AlwaysOpenFaq() {
  // collapsible={false} stops the user closing the last open panel,
  // so exactly one is always showing.
  return (
    
  );
}`;

export const usageIcon = `import { Accordion } from "@/components/custom/blocks/Accordion";

${usageData}

export default function PlusFaq() {
  // expandIcon swaps the chevron — pass a lucide name from ICON_MAP.
  return (
    
  );
}`;

## Installation

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
