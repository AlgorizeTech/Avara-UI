# Pricing Components

A collection of highly-converting, responsive pricing sections. Whether you need traditional tiered subscription cards, a detailed comparison table, or an interactive GSAP-powered quote builder, these components are designed to maximize conversions.

`Pricing.tsx` exports eight independent layouts — `PricingCards`, `PricingScale`, `PricingDotPattern`, `PricingBuilder`, `PricingTable`, `PricingSlider`, `PricingTypographic` and `PricingPlans` — that share one color engine. Pick the layout that matches your funnel, then use the theme control above the gallery to see the accent cascade through badges, gradients, glows and buttons.

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
          features: [
            "10 projects",
            "Up to 2,000 subscribers",
            "Basic analytics",
            "24-hour support",
          ],
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
          features: [
            "25 projects",
            "Up to 10,000 subscribers",
            "Custom reporting",
            "1-hour support",
          ],
        },
        {
          id: "enterprise",
          title: "Enterprise",
          subtitle: "For larger organizations.",
          price: "$99",
          period: "mo",
          buttonText: "Contact Sales",
          popular: false,
          icon: "Building",
          features: [
            "Unlimited projects",
            "Unlimited subscribers",
            "Dedicated manager",
            "24/7 support",
          ],
        },
      ],
    },
    {
      id: "annually",
      label: "Annually (Save 20%)",
      plans: [
        {
          id: "startup-annual",
          title: "Startup",
          subtitle: "Perfect for small teams.",
          price: "$279",
          period: "yr",
          buttonText: "Get Started",
          popular: false,
          icon: "Rocket",
          features: [
            "10 projects",
            "Up to 2,000 subscribers",
            "Basic analytics",
            "24-hour support",
          ],
        },
        {
          id: "pro-annual",
          title: "Pro",
          subtitle: "For scaling businesses.",
          price: "$569",
          period: "yr",
          buttonText: "Upgrade to Pro",
          popular: true,
          icon: "Zap",
          features: [
            "25 projects",
            "Up to 10,000 subscribers",
            "Custom reporting",
            "1-hour support",
          ],
        },
        {
          id: "enterprise-annual",
          title: "Enterprise",
          subtitle: "For larger organizations.",
          price: "$949",
          period: "yr",
          buttonText: "Contact Sales",
          popular: false,
          icon: "Building",
          features: [
            "Unlimited projects",
            "Unlimited subscribers",
            "Dedicated manager",
            "24/7 support",
          ],
        },
      ],
    },
  ],
};`;

export const usageCards = `import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function Pricing() {
  return ;
}`;

export const usageElegant = `import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function ElegantPricing() {
  // Soft top-border accent on the popular card, lighter type.
  return ;
}`;

export const usageMinimal = `import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function MinimalPricing() {
  // No card chrome until hover — the popular plan is marked by a ring.
  return ;
}`;

export const usageBordered = `import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

${pricingData}

export default function BorderedPricing() {
  // Hard neo-brutalist edges and offset shadows.
  return ;
}`;

export const usageBuilder = `import { PricingBuilder, type PricingBuilderModule } from "@/components/custom/blocks/Pricing";

const modules: PricingBuilderModule[] = [
  { id: "auth", name: "User Authentication", price: 15 },
  { id: "db", name: "Database Storage", price: 25 },
  { id: "analytics", name: "Advanced Analytics", price: 35 },
  { id: "support", name: "24/7 SLA Support", price: 50 },
  { id: "domain", name: "Custom Domain & SSL", price: 10 },
];

export default function QuoteBuilder() {
  return (
    
  );
}`;

export const usageTable = `import { PricingTable, type PricingTableData } from "@/components/custom/blocks/Pricing";

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

export default function UsagePricing() {
  return (
    
  );
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
    features: [
      "10 Users",
      "Unlimited Projects",
      "Priority Support",
      "Custom Domain",
    ],
    isFeatured: true,
  },
  {
    id: "m3",
    billingCycle: "monthly",
    name: "Enterprise",
    price: 499,
    description: "Dedicated infrastructure and account management.",
    features: [
      "Unlimited Everything",
      "24/7 SLA Support",
      "SSO & SAML",
      "Dedicated Manager",
    ],
    isFeatured: false,
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
  {
    id: "y2",
    billingCycle: "yearly",
    name: "Agency",
    price: 129,
    description: "Advanced tools for scaling design teams.",
    features: [
      "10 Users",
      "Unlimited Projects",
      "Priority Support",
      "Custom Domain",
    ],
    isFeatured: true,
  },
  {
    id: "y3",
    billingCycle: "yearly",
    name: "Enterprise",
    price: 399,
    description: "Dedicated infrastructure and account management.",
    features: [
      "Unlimited Everything",
      "24/7 SLA Support",
      "SSO & SAML",
      "Dedicated Manager",
    ],
    isFeatured: false,
  },
];

export default function PricingMenu() {
  return ;
}`;

export const usagePlans = `import { PricingPlans, type PricingServiceOption } from "@/components/custom/blocks/Pricing";

const services: PricingServiceOption[] = [
  {
    id: "design",
    name: "Design",
    description: "Top-notch custom design",
    price: 300,
    icon: "PenTool",
    features: [
      "Top-notch custom design",
      "Figma design & interactive prototype",
    ],
  },
  {
    id: "development",
    name: "Development",
    description: "Full development solution",
    price: 400,
    icon: "Code2",
    features: [
      "Framer/Custom development",
      "2 months of free support",
    ],
  },
  {
    id: "fast",
    name: "Fast",
    description: "Quick budget solution",
    price: 100,
    icon: "Zap",
    tag: "Fast Track",
    features: [
      "Fast delivery (3X everything)",
    ],
  },
];

export default function InteractiveChecklistPricing() {
  return (
    
  );
}`;

export const dotPatternData = `const dotPatternPlans = [
  {
    id: "basic",
    badgeTag: "BASIC",
    price: "$199",
    period: "/month",
    description: "Basic tools for content generation. Best for one just trying out.",
    buttonText: "Get Started",
    featured: false,
    featuresTitle: "What's included:",
    features: ["1 project", "Up to 3 pages", "Email support", "Basic analytics"],
  },
  {
    id: "starter",
    badgeTag: "STARTER",
    price: "$299",
    period: "/month",
    description: "Advanced tools for consistent content generation. Best for one getting started.",
    buttonText: "Get Started",
    featured: true,
    featuresTitle: "What's included:",
    features: ["1 project", "Up to 3 pages", "Email support", "Basic analytics"],
  },
  {
    id: "pro",
    badgeTag: "PRO",
    price: "$599",
    period: "/month",
    description: "Advanced tools for consistent content generation, unlimited credits. Best for teams",
    buttonText: "Get Started",
    featured: false,
    featuresTitle: "What's included:",
    features: ["1 project", "Up to 3 pages", "Email support", "Basic analytics"],
  },
];`;

export const usageDotPattern = `import { PricingDotPattern, type DotPatternPlanItem } from "@/components/custom/blocks/Pricing";

${dotPatternData}

export default function DotPatternPricing() {
  return (
    
  );
}`;

export const scaleData = `const scalePlansData = {
  monthly: [
    {
      id: "launch",
      title: "Launch Plan",
      subtitle: "Ideal for startups and solo marketers",
      price: "$299.00",
      period: "/Month",
      buttonText: "Start with Launch",
      popular: false,
      icon: "Rocket",
      featuresTitle: "WHAT'S INCLUDED:",
      features: [
        "Up to 10,000 subscribers",
        "5 automation workflows",
        "Basic A/B testing",
        "Email support",
        "Drag-and-drop builder",
      ],
    },
    {
      id: "scale",
      title: "Scale Plan",
      subtitle: "For growing teams ready to accelerate",
      price: "$899.00",
      period: "/Month",
      buttonText: "Upgrade to Scale",
      popular: true,
      popularBadgeText: "Most Popular",
      icon: "Sprout",
      featuresTitle: "INCLUDED EVERYTHING IN LAUNCH, PLUS:",
      features: [
        "Unlimited automation workflows",
        "Advanced segmentation & analytics",
        "Priority live chat support",
        "Custom branded templates",
        "Dedicated onboarding",
      ],
    },
  ],
  annually: [
    {
      id: "launch-annual",
      title: "Launch Plan",
      subtitle: "Ideal for startups and solo marketers",
      price: "$269.00",
      period: "/Month",
      buttonText: "Start with Launch",
      popular: false,
      icon: "Rocket",
      featuresTitle: "WHAT'S INCLUDED:",
      features: [
        "Up to 10,000 subscribers",
        "5 automation workflows",
        "Basic A/B testing",
        "Email support",
        "Drag-and-drop builder",
      ],
    },
    {
      id: "scale-annual",
      title: "Scale Plan",
      subtitle: "For growing teams ready to accelerate",
      price: "$809.00",
      period: "/Month",
      buttonText: "Upgrade to Scale",
      popular: true,
      popularBadgeText: "Most Popular",
      icon: "Sprout",
      featuresTitle: "INCLUDED EVERYTHING IN LAUNCH, PLUS:",
      features: [
        "Unlimited automation workflows",
        "Advanced segmentation & analytics",
        "Priority live chat support",
        "Custom branded templates",
        "Dedicated onboarding",
      ],
    },
  ],
};`;

export const usageScale = `import { PricingScale, type ScalePlanItem } from "@/components/custom/blocks/Pricing";

${scaleData}

export default function ScalablePricing() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/pricing
```

## Examples

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

          counting

          boolean

          true

          Toggles animated number count-up for price values across all plans.
          When set to true, prices count up smoothly on mount or tab change; when false, prices display statically without animation.

## Props Reference: Other Layouts

        Component
        Prop
        Type
        Default
        Description

          PricingBuilder

          counting

          boolean

          true

          Controls animated count-up for the calculated total price.

          PricingBuilder

          color

          PricingColor

          "indigo"

          Accent for the module toggles, animated total and call to action.

          PricingTable

          data

          PricingTableData

          Required

          plans become the columns (one may set{" "}
          featured) and sections group the feature
          rows.

          PricingTable

          counting

          boolean

          true

          Toggles animated count-up for plan prices in column headers.

          PricingTable

          color

          PricingColor

          "indigo"

          Accent for the featured column, checkmarks and buttons.

          PricingSlider

          counting

          boolean

          true

          Controls animated count-up when dragging the usage volume slider.

          PricingSlider

          color

          PricingColor

          "indigo"

          Accent for the range track, thumb and computed price.

          PricingTypographic

          packages

          PricingTypographicPlan[]

          Required

          A flat list of plans split by billingCycle.

          PricingTypographic

          counting

          boolean

          true

          Toggles animated count-up for active plan prices.

          PricingTypographic

          color

          PricingColor

          "indigo"

          Accent for the active row, price and underline treatment.

          PricingPlans

          services

          PricingServiceOption[]

          List of selectable service items with pricing, icons and feature bullet points.

          PricingPlans

          color

          PricingColor

          Accent theme color for selected checkboxes, total calculation and CTA button.

          PricingScale

          plans

          {"{ monthly: ScalePlanItem[]; annually: ScalePlanItem[] }"}

          Object containing monthly and annually arrays of pricing plan cards with titles, prices, icons and features.

          PricingScale

          badgeText / title / subtitle

          string

          Custom text props for top pill badge, section heading, and description paragraph.

          PricingScale

          footerTitle / footerSubtitle / footerCtaText / footerCtaHref

          string

          Configuration props for the bottom strategy call CTA banner.

          PricingScale

          color

          PricingColor

          Applies accent color to popular plan ring/badge, checkmarks, active toggle, and CTA buttons.

---

**Component Path:** `[framework]\pricing\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
