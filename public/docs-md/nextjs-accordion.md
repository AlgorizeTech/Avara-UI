export const metadata = docsPageMetadata("accordion");

# Accordion

A data-driven accordion built on the Radix primitive, with five variants that each look like a different component rather than the same card in five borders. The open panel is the only thing that gets the accent: it lifts out as a card, inverts to your primary color, or grows a rail down its edge, depending on the variant.

You feed it an `accordionData` array — the wrapper maps it to items, icons and content for you. Switch on `animation="stack"` and the items start piled on the first one and deal down into place when the accordion scrolls into view.

export const usageData = `const faqItems: AccordionDataItem[] = [
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

export const usageDefault = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

${usageData}

export default function Faq() {
  // animation="stack" piles the items on the first one and deals them out
  // once the accordion scrolls into view. Leave it off for plain rendering.
  return (
    
  );
}`;

export const usageMultiple = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

${usageData}

export default function MultiOpenFaq() {
  // type="multiple" lets any number of panels stay open at once.
  // defaultValue becomes an array in this mode.
  return (
    
  );
}`;

export const usageMandatory = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

${usageData}

export default function AlwaysOpenFaq() {
  // collapsible={false} stops the user closing the last open panel,
  // so exactly one is always showing.
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/accordion
```

## Examples

export const usageSection = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

// The three faces on the "Still stuck?" card.
const SUPPORT_TEAM = [
  { name: "Ana R.", src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg" },
  { name: "Tom M.", src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg" },
  { name: "Mara K.", src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg" },
];

const faq: AccordionDataItem[] = [
  {
    value: "frameworks",
    title: "Does it work outside Next.js?",
    icon: "Code",
    content: [
      "Every block is plain React and Tailwind. The docs show a Next.js and a React (Vite) version of each snippet, and only the few components that use next/link or next/image need a one-line swap.",
    ],
  },
  {
    value: "theming",
    title: "Can I change the colors?",
    icon: "Palette",
    content: [
      "Everything reads the shadcn theme tokens (primary, card, muted, border), so one edit to globals.css restyles all of it.",
    ],
  },
  {
    value: "updates",
    title: "How do updates reach my project?",
    icon: "RefreshCw",
    content: [
      "The CLI copies the source into your repo, so nothing changes behind your back. Re-run the install command to pull a newer version, then review the diff like any other change.",
    ],
  },
  {
    value: "license",
    title: "How is it licensed?",
    icon: "Scale",
    content: ["MIT. Use it in client work, products and templates, with no attribution required."],
  },
];

export default function FaqSection() {
  return (

        {/* Left column stays put while the answers scroll on large screens. */}

            Questions people ask before they install.

            Short answers on licensing, theming and where the components run.
            If yours isn't here, we read every message.

              {SUPPORT_TEAM.map((person) => (
                
              ))}

              Still stuck?
              
                Email the team, we reply within a day

  );
}`;

export const usageStackElevated = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

${usageData}

export default function StackedFaq() {
  // The entrance works with every variant. It waits for the accordion to
  // scroll into view, and is skipped for visitors who prefer reduced motion.
  return (
    
  );
}`;

export const usageVariants = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

${usageData}

const variants = ["default", "bordered", "filled", "elevated", "ghost"] as const;

export default function AccordionVariants() {
  return (
    
      {variants.map((variant) => (
        
      ))}
    
  );
}`;

export const usageMultiplePermanent = `import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

${usageData}

export default function PermanentMultiOpenFaq() {
  // type="multiple" and collapsible={false} allows opening multiple panels,
  // but once opened, a panel cannot be closed by clicking it again.
  return (
    
  );
}`;

## Features
Single or multiple open panels, a one-time stack entrance, and five variants that all read your theme tokens.

    Follows your theme
    Every variant is built from the shadcn tokens, so changing --primary restyles the open panel, the rail and the icon tile together.

    Accessible
    Radix handles roles, arrow-key navigation and focus. The visible focus ring follows the shape of each variant, and the entrance respects reduced motion.

    Responsive
    Rows wrap cleanly at phone width; the open card in the default variant only grows wider than the list from sm up.

    No animation library
    The stack entrance uses the Web Animations API and runs once. The only dependency beyond Radix is lucide-react.

## Best Practices & Guidelines

    Usage Guidelines
    Use animation="stack" once per page, on the accordion you want people to notice; two decks dealing at the same time cancel each other out. Give it at least three items so the pile reads as a deck, and keep defaultValue set so the open card is part of the deal.

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

          Which look to use. default lifts the open row out as a
          card, bordered grows a rail on it, filled{" "}
          inverts it to primary, elevated raises it on
          a ring, ghost is type and hairlines only.

          animation

          "none" | "stack"

          "none"

          "stack" piles the items on the first one and deals them
          into place once the accordion scrolls into view. Runs once; skipped
          under prefers-reduced-motion.

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

**Component Path:** `[framework]\accordion\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
