---
title: "Pricing Components"
description: "Pricing sections: tiered, dot-matrix, scale, elegant, minimal and bordered plan cards, a quote builder, a comparison table and a usage slider."
url: https://avaraui.com/docs/nextjs/pricing
---

# Pricing Components

A collection of highly-converting, responsive pricing sections. Whether you need traditional tiered subscription cards, a detailed comparison table, or an interactive quote builder, these components are designed to maximize conversions.

`Pricing.tsx` exports nine independent layouts — `PricingCards`, `PricingScale`, `PricingDotPattern`, `PricingPlansPro`, `PricingBuilder`, `PricingTable`, `PricingSlider`, `PricingTypographic` and `PricingPlans` — that share one color engine. Pick the layout that matches your funnel, then use the theme control above the gallery to see the accent cascade through badges, gradients, glows and buttons.

## Selectable workspace plans

Interactive radio-selectable plans with Monthly/Annual toggle, team seat stepper, and responsive mobile accordion view.

- Set `variant="plans-pro"` for selectable workspace plans with a sliding Monthly/Annual switch, Team Seats stepper, and orbiting border on the selected tier.
- Render `PricingPlansPro` with `plans` (`monthlyPrice`, `yearlyPrice`, `subtitle`, `features`). Automatically switches from a 3-column card grid on desktop to an expandable radio stack on mobile.
- `scalePriceWithUsers={true}` multiplies each plan's displayed price as the user increments or decrements the Team Seats stepper.

```tsx
import { PricingPlansPro, type PlansProItem } from "@/components/custom/blocks/Pricing";

const plansProItems: PlansProItem[] = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "creator",
    monthlyPrice: 9.0,
    yearlyPrice: 7.0,
    monthlyPeriod: "Month",
    yearlyPeriod: "Year",
    features: [
      "500GB Cloud Storage",
      "14-day version history",
      "End-to-end TLS encryption",
    ],
  },
  {
    id: "growth",
    title: "Growth",
    subtitle: "studio",
    monthlyPrice: 15.0,
    yearlyPrice: 12.0,
    monthlyPeriod: "Month",
    yearlyPeriod: "Year",
    features: [
      "2TB Cloud Storage",
      "60-day version history",
      "Custom domain & SSO",
    ],
  },
  {
    id: "scale",
    title: "Scale",
    subtitle: "agency",
    monthlyPrice: 29.0,
    yearlyPrice: 23.0,
    monthlyPeriod: "Month",
    yearlyPeriod: "Year",
    features: [
      "Unlimited Cloud Storage",
      "365-day version history",
      "Dedicated SLA & audit logs",
    ],
  },
];

export default function WorkspacePlanSelector() {
  return (
    <PricingPlansPro
      variant="plans-pro"
      title="Choose Your Workspace"
      plans={plansProItems}
      defaultSelectedPlanId="scale"
      discountBadge="SAVE 20%"
      counting={true}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/pricing.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/pricing
```

## Examples

### Tiered cards

One card per plan, with a billing-cycle tab strip above them.

- Set `variant="default"` for the classic three-column tiered subscription layout.
- Pass `data` as `{ tabs: [{ plans: [...] }] }` — the tabs become the billing-cycle strip.
- `popular={true}` on a plan scales that card up, accents it with the theme border, and adds a subtle 3D tilt hover effect.

```tsx
import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

const data: PricingData = {
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
};

export default function Pricing() {
  return <PricingCards data={data} variant="default" color="indigo" counting={true} />;
}
```

### Dot matrix cards

Minimalist cards with top dot-matrix pattern, corner frame accents, and featured glow state.

- Set `variant="dot-pattern"` for minimalist cards with a dot-matrix header pattern and corner angle brackets.
- Render `PricingDotPattern` with `plans` — each a `badgeTag`, `price`, `period`, `description` and `features` under a `featuresTitle`. `featured` gives that card the glow.

```tsx
import { PricingDotPattern, type DotPatternPlanItem } from "@/components/custom/blocks/Pricing";

const dotPatternPlans: DotPatternPlanItem[] = [
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
];

export default function DotPatternPricing() {
  // A dot-matrix header and corner brackets on each card; featured adds the glow.
  return <PricingDotPattern variant="dot-pattern" plans={dotPatternPlans} color="indigo" counting={true} />;
}
```

### Scale cards

Modern dual-card layout with launch & scale plans, monthly/annual toggle, and bottom strategy call CTA.

- Set `variant="scale"` for the dual-panel launch & scale cards with a bottom strategy-call banner.
- Render `PricingScale` with `plans` as `{ monthly, annually }` — two plans each. A plan's `popularBadgeText` and `featuresTitle` label the highlighted card and its list; `footerTitle`, `footerSubtitle` and `footerCtaText` / `footerCtaHref` write the strategy-call strip.

```tsx
import { PricingScale, type PricingScaleProps } from "@/components/custom/blocks/Pricing";

const scalePlansData: PricingScaleProps["plans"] = {
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
};

export default function ScalablePricing() {
  // Two plans side by side, a monthly/annual switch, and a strategy-call footer.
  return <PricingScale variant="scale" plans={scalePlansData} color="indigo" counting={true} />;
}
```

### Elegant cards

- Set `variant="elegant"` for a lighter type scale and a top-border accent that lifts on hover.
- `counting={false}` disables animated price counting for a static numeric display.

```tsx
import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

const data: PricingData = {
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
};

export default function ElegantPricing() {
  // Soft top-border accent on the popular card, lighter type.
  return <PricingCards data={data} variant="elegant" color="indigo" counting={false} />;
}
```

### Minimal cards

- Set `variant="minimal"` to drop the card borders — the popular plan is marked by a single ring instead.

```tsx
import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

const data: PricingData = {
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
};

export default function MinimalPricing() {
  // No card chrome until hover — the popular plan is marked by a ring.
  return <PricingCards data={data} variant="minimal" color="indigo" counting={true} />;
}
```

### Bordered cards

- Set `variant="bordered"` for the neo-brutalist take: square corners, thick borders, offset shadows.

```tsx
import { PricingCards, type PricingData } from "@/components/custom/blocks/Pricing";

const data: PricingData = {
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
};

export default function BorderedPricing() {
  // Hard neo-brutalist edges and offset shadows.
  return <PricingCards data={data} variant="bordered" color="indigo" counting={true} />;
}
```

### Quote builder

- Set `variant="builder"` for an interactive modular quote calculator.
- `color` is `PricingBuilder`'s primary theme prop — it carries its own module data and recalculates the animated total itself.

```tsx
import { PricingBuilder, type PricingBuilderModule } from "@/components/custom/blocks/Pricing";

const modules: PricingBuilderModule[] = [
  { id: "auth", name: "User Authentication", price: 15 },
  { id: "db", name: "Database Storage", price: 25 },
  { id: "analytics", name: "Advanced Analytics", price: 35 },
  { id: "support", name: "24/7 SLA Support", price: 50 },
  { id: "domain", name: "Custom Domain & SSL", price: 10 },
];

export default function QuoteBuilder() {
  return (
    <PricingBuilder
      variant="builder"
      title="Custom Quote Builder"
      subtitle="Select only the modules you need for your project."
      basePrice={29}
      modules={modules}
      defaultSelected={["auth", "db"]}
      buttonText="Deploy Custom Stack"
      color="indigo"
      counting={true}
    />
  );
}
```

### Comparison table

- Set `variant="table"` for a multi-column feature comparison matrix.
- `data` on `PricingTable` lays plans out as columns and features as grouped rows. A `values` entry may be `true`, `false` or a string.

```tsx
import { PricingTable, type PricingTableData } from "@/components/custom/blocks/Pricing";

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
        // `true` renders a check, `false` a dash, a string renders verbatim.
        { name: "Custom Domains", values: [false, true, true] },
        { name: "Priority Support", values: [false, "Email", "24/7 Phone"] },
      ],
    },
  ],
};

export default function ComparePlans() {
  return <PricingTable variant="table" data={data} color="indigo" counting={true} />;
}
```

### Usage slider

- Set `variant="slider"` for a volume-based range slider pricing tier.
- `data` on `PricingSlider` defines the volume tiers — dragging updates the tier, price and included limits together.

```tsx
import { PricingSlider } from "@/components/custom/blocks/Pricing";

export default function UsagePricing() {
  return (
    <PricingSlider
      variant="slider"
      title="Usage Based Pricing"
      subtitle="Scale your pricing as your traffic grows."
      basePrice={29}
      pricePerStep={10}
      minViews="10k Views"
      maxViews="1M+ Views"
      buttonText="Start 14-Day Free Trial"
      color="emerald"
      counting={true}
    />
  );
}
```

### Typographic menu

- Set `variant="typographic"` for an editorial horizontal list layout.
- `data` on `PricingTypographic` takes every plan in one array; tag each with `billingCycle` to drive the monthly/yearly switch — a `ToggleGroup` in the block's `color`.

```tsx
import { PricingTypographic } from "@/components/custom/blocks/Pricing";

// One flat array — `billingCycle` splits it into the monthly/yearly toggle.
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
  return <PricingTypographic variant="typographic" packages={packages} color="zinc" counting={true} />;
}
```

### Interactive service checklist

- Set `variant="plans"` for an interactive service toggle checklist and live quote card.
- `PricingPlans` calculates estimated cost based on selected services (Design, Development, Fast Track).

```tsx
import { PricingPlans, type PricingServiceOption } from "@/components/custom/blocks/Pricing";

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
    <PricingPlans
      variant="plans"
      brandTitle="Custom Services"
      brandSubtitle="Select options tailored to your goals"
      brandDescription="Mix and match custom design, full-stack development, and priority delivery to build the ideal package for your business."
      services={services}
      defaultActiveIds={["design"]}
      ctaText="Book a 45-min call"
      color="indigo"
      counting={true}
    />
  );
}
```

## Props Reference: PricingCards

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `PricingData` | Required | The core data object containing an array of `tabs` (e.g. Monthly vs Annually), which in turn contain an array of `plans`. |
| `variant` | `"default" \| "dot-pattern" \| "scale" \| "elegant" \| "minimal" \| "bordered"` | `"default"` | Applies structural card layouts. `dot-pattern` renders dot-matrix header cards, `scale` renders dual-panel scaling cards, `bordered` uses neo-brutalist edges, and `elegant` uses soft border-top accents. |
| `title` | `string` | `undefined` | Optional section header title text displayed above the pricing cards. |
| `subtitle` | `string` | `undefined` | Optional subheader text displayed underneath the main title. |
| `badgeText` | `string` | `undefined` | Optional top badge tag text rendered above the section title. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"indigo"` | Applies global color themes to the "Most Popular" badges, checkmark icons, primary buttons, and gradients. Any custom hex string is resolved through CSS variables. |
| `counting` | `boolean` | `true` | Toggles animated number count-up for price values across all plans. When set to `true`, prices count up smoothly on mount or tab change; when `false`, prices display statically without animation. |

## Props Reference: Other Layouts

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `PricingBuilder` | `counting` | `boolean` | `true` | Controls animated count-up for the calculated total price. |
| `PricingBuilder` | `color` | `PricingColor` | `"indigo"` | Accent for the module toggles, animated total and call to action. |
| `PricingTable` | `data` | `PricingTableData` | Required | `plans` become the columns (one may set `featured`) and `sections` group the feature rows. |
| `PricingTable` | `counting` | `boolean` | `true` | Toggles animated count-up for plan prices in column headers. |
| `PricingTable` | `color` | `PricingColor` | `"indigo"` | Accent for the featured column, checkmarks and buttons. |
| `PricingSlider` | `counting` | `boolean` | `true` | Controls animated count-up when dragging the usage volume slider. |
| `PricingSlider` | `color` | `PricingColor` | `"indigo"` | Accent for the range track, thumb and computed price. |
| `PricingTypographic` | `packages` | `PricingTypographicPlan[]` | Required | A flat list of plans split by `billingCycle`. |
| `PricingTypographic` | `counting` | `boolean` | `true` | Toggles animated count-up for active plan prices. |
| `PricingTypographic` | `color` | `PricingColor` | `"indigo"` | Accent for the active row, price and underline treatment. |
| `PricingPlans` | `services` | `PricingServiceOption[]` | List of selectable service items with pricing, icons and feature bullet points. |
| `PricingPlans` | `color` | `PricingColor` | Accent theme color for selected checkboxes, total calculation and CTA button. |
| `PricingScale` | `plans` | `{ monthly: ScalePlanItem[]; annually: ScalePlanItem[] }` | Object containing `monthly` and `annually` arrays of pricing plan cards with titles, prices, icons and features. |
| `PricingScale` | `badgeText / title / subtitle` | `string` | Custom text props for top pill badge, section heading, and description paragraph. |
| `PricingScale` | `footerTitle / footerSubtitle / footerCtaText / footerCtaHref` | `string` | Configuration props for the bottom strategy call CTA banner. |
| `PricingScale` | `color` | `PricingColor` | Applies accent color to popular plan ring/badge, checkmarks, active toggle, and CTA buttons. |
| `PricingPlansPro` | `plans` | `PlansProItem[]` | `defaultPlansProItems` | Array of selectable plan tiers (`Starter`, `Growth`, `Scale`) with `monthlyPrice`, `yearlyPrice`, `subtitle`, and `features`. |
| `PricingPlansPro` | `layoutMode` | `"responsive" \| "horizontal" \| "vertical"` | `"responsive"` | Renders a 3-column horizontal grid on desktop and automatically switches to a vertical expandable radio stack on mobile screens. |
| `PricingPlansPro` | `scalePriceWithUsers` | `boolean` | `true` | Multiplies each plan's displayed price dynamically as the user adjusts the seat counter stepper. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/pricing
