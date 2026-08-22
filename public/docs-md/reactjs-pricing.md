# Pricing Components

A collection of highly-converting, responsive pricing sections. Whether you need traditional tiered subscription cards, a detailed comparison table, or an interactive GSAP-powered quote builder, these components are designed to maximize conversions.

## Examples

`Pricing.tsx` exports five independent layouts — `PricingCards`, `PricingBuilder`, `PricingTable`, `PricingSlider` and `PricingTypographic` — that share one color engine. Pick the layout that matches your funnel, then use the theme control above the gallery to see the accent cascade through badges, gradients, glows and buttons.

export const pricingData = `const data: PricingData = {
  tabs: [
    {
      id: "monthly",
      label: "Monthly",
      plans: [
        {
          id: "startup",
          title: "Startup",
          subtitle: "Perfect for small teams.",
          price: "$29",
          period: "mo",
          buttonText: "Get Started",
          popular: false,
          icon: "Rocket",
          features: ["10 projects", "Basic analytics", "24-hour support"],
        },
        {
          id: "pro",
          title: "Pro",
          subtitle: "For scaling businesses.",
          price: "$59",
          period: "mo",
          buttonText: "Upgrade to Pro",
          popular: true,
          icon: "Zap",
          features: ["25 projects", "Custom reporting", "1-hour support"],
        },
        {
          id: "enterprise",
          title: "Enterprise",
          subtitle: "For organisations at scale.",
          price: "$149",
          period: "mo",
          buttonText: "Contact Sales",
          popular: false,
          icon: "Building2",
          features: ["Unlimited projects", "SSO & audit logs", "24/7 phone support"],
        },
      ],
    },
    {
      id: "annually",
      label: "Annually (Save 20%)",
      plans: [
        {
          id: "startup",
          title: "Startup",
          subtitle: "Perfect for small teams.",
          price: "$23",
          period: "mo",
          buttonText: "Get Started",
          popular: false,
          icon: "Rocket",
          features: ["10 projects", "Basic analytics", "24-hour support"],
        },
        {
          id: "pro",
          title: "Pro",
          subtitle: "For scaling businesses.",
          price: "$47",
          period: "mo",
          buttonText: "Upgrade to Pro",
          popular: true,
          icon: "Zap",
          features: ["25 projects", "Custom reporting", "1-hour support"],
        },
        {
          id: "enterprise",
          title: "Enterprise",
          subtitle: "For organisations at scale.",
          price: "$119",
          period: "mo",
          buttonText: "Contact Sales",
          popular: false,
          icon: "Building2",
          features: ["Unlimited projects", "SSO & audit logs", "24/7 phone support"],
        },
      ],
    },
  ],
};`;

export const usageCards = `import { PricingCards, PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function Pricing() {
  return ;
}`;

export const usagePremium = `import { PricingCards, PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function PremiumPricing() {
  // Heavier shadows, gradient price text and a scaled-up popular card.
  return ;
}`;

export const usageElegant = `import { PricingCards, PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function ElegantPricing() {
  // Soft top-border accent on the popular card, lighter type.
  return ;
}`;

export const usageMinimal = `import { PricingCards, PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function MinimalPricing() {
  // No card chrome until hover — the popular plan is marked by a ring.
  return ;
}`;

export const usageBordered = `import { PricingCards, PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function BorderedPricing() {
  // Hard neo-brutalist edges and offset shadows.
  return ;
}`;

export const usageBuilder = `import { PricingBuilder } from "@/components/custom/blocks/Pricing";

// Self-contained: the builder owns its own module list, totals and GSAP
// timeline, so \`color\` is the only prop.
export default function QuoteBuilder() {
  return ;
}`;

export const usageTable = `import { PricingTable, PricingTableData } from "@/components/custom/blocks/Pricing";

const data: PricingTableData = {
  plans: [
    { id: "basic", title: "Basic", price: "$19", buttonText: "Get Started" },
    { id: "pro", title: "Pro", price: "$49", buttonText: "Upgrade to Pro", featured: true },
    { id: "ent", title: "Enterprise", price: "$99", buttonText: "Contact Sales" },
  ],
  sections: [
    {
      title: "Core Features",
      features: [
        { name: "Projects", values: ["5", "25", "Unlimited"] },
        {
          name: "Storage",
          helpText: "Total storage across all projects",
          values: ["10GB", "100GB", "1TB"],
        },
      ],
    },
    {
      title: "Advanced",
      features: [
        // \`true\` renders a check, \`false\` a dash, a string renders verbatim.
        { name: "Custom Domains", values: [false, true, true] },
        { name: "Priority Support", values: [false, "Email", "24/7 Phone"] },
      ],
    },
  ],
};

export default function ComparePlans() {
  return ;
}`;

export const usageSlider = `import { PricingSlider } from "@/components/custom/blocks/Pricing";

// Usage-based pricing: the slider computes the tier and price internally.
export default function UsagePricing() {
  return ;
}`;

export const usageTypographic = `import { PricingTypographic } from "@/components/custom/blocks/Pricing";

// One flat array — \`billingCycle\` splits it into the monthly/yearly toggle.
const packages = [
  {
    id: "m1",
    billingCycle: "monthly",
    name: "Creator",
    price: 29,
    description: "Everything you need to kickstart your portfolio.",
    features: ["1 User", "5 Projects", "Basic Support"],
    isFeatured: false,
  },
  {
    id: "m2",
    billingCycle: "monthly",
    name: "Agency",
    price: 149,
    description: "Advanced tools for scaling design teams.",
    features: ["10 Users", "Unlimited Projects", "Priority Support"],
    isFeatured: true,
  },
  {
    id: "y1",
    billingCycle: "yearly",
    name: "Creator",
    price: 19,
    description: "Everything you need to kickstart your portfolio.",
    features: ["1 User", "5 Projects", "Basic Support"],
    isFeatured: false,
  },
];

export default function PricingMenu() {
  return ;
}`;

## Installation

## Props Reference: PricingCards

        Prop
        Type
        Default
        Description

          data

          PricingData

          Required

          The core data object containing an array of tabs (e.g.
          Monthly vs Annually), which in turn contain an array of{" "}
          plans.

          variant

            "default" | "premium" | "elegant" | "minimal" | "bordered"

          "default"

          Applies overarching structural layouts. premium adds
          heavy shadows and gradients to popular cards, while{" "}
          elegant uses soft border-top accents.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the "Most Popular" badges, checkmark
          icons, primary buttons, and gradients. Any custom hex string is
          resolved through CSS variables.

## Props Reference: Other Layouts

        Component
        Prop
        Type
        Default
        Description

          PricingBuilder

          color

          PricingColor

          "indigo"

          Accent for the module toggles, animated total and call to action. The
          builder supplies its own modules, so this is its only prop.

          PricingTable

          data

          PricingTableData

          Required

          plans become the columns (one may set{" "}
          featured) and sections group the feature
          rows. Each feature's values array must line up with the
          plan order.

          PricingTable

          color

          PricingColor

          "indigo"

          Accent for the featured column, checkmarks and buttons.

          PricingSlider

          color

          PricingColor

          "indigo"

          Accent for the range track, thumb and computed price. Tiers are
          defined inside the component.

          PricingTypographic

          packages

          PricingTypographicPlan[]

          Required

          A flat list of plans. Entries are split by{" "}
          billingCycle ("monthly" /{" "}
          "yearly") to feed the toggle, and{" "}
          isFeatured highlights one row per cycle.

          PricingTypographic

          color

          PricingColor

          "indigo"

          Accent for the active row, price and underline treatment.

---

**Component Path:** `[framework]\pricing\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
