# Item

A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions.

Instead of writing complex Flexbox or Grid classes every time you need to build a notification row, a settings item, a user listing, or a simple feature card, `ItemBlock` handles all the responsive alignments and spacing automatically. It dynamically transforms between horizontal rows and vertical cards based on the `variant` prop.

## Examples

`title` is the only required prop — `media`, `description` and `actions` are slots you fill as needed.

export const usageDefault = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function SettingsRow() {
  return (

      }
    />
  );
}`;

export const usageVariants = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function ItemVariants() {
  return (

  );
}`;

export const usageActions = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function ActionRow() {
  return (

      }
      // actions sit on the trailing edge and never squash the text
      actions={

      }
    />
  );
}`;

export const usageCard = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function FeatureCard() {
  return (
    // "card" stacks the slots vertically and pins actions to the bottom —
    // drop it straight into a grid.

      }
      actions={
        
          Configure
        
      }
    />
  );
}`;

export const usageClickable = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function ClickableRow() {
  return (
    // Passing onClick renders a real  and adds hover/active states.

      }
      onClick={() => console.log("Item clicked")}
    />
  );
}`;

export const usageTitleOnly = `import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function DenseRow() {
  // Everything but title is optional — compact + title alone is a menu row.
  return ;
}`;

` — so don't nest another interactive element inside it.",
        },
      ],
      props: { variant: "bordered", showMedia: true, showDescription: true, showActions: false, isClickable: true },
      usage: usageClickable,
    },
    {
      title: "Title only",
      propNotes: [
        {
          prop: "title",
          effect:
            "on its own, with every optional slot dropped, gives the dense row used in menus and dropdowns.",
        },
      ],
      props: { variant: "compact", showMedia: false, showDescription: false, showActions: false },
      usage: usageTitleOnly,
    },
  ]}
/>

## Installation

## Features
Discover the Item component's structural layout features, designed for lists, dropdowns, and menus with proper spacing.

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

---

**Component Path:** `nextjs\item\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
