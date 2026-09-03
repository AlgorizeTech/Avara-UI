"use client";

import {
  PricingBuilder,
  PricingCards,
  PricingColor,
  PricingData,
  PricingSlider,
  PricingTable,
  PricingTableData,
  PricingTypographic,
  PricingVariant,
} from "@/components/custom/blocks/Pricing";
import PricingPlans from "@/components/custom/blocks/PricingPlans";

type LayoutType =
  | "cards"
  | "builder"
  | "table"
  | "slider"
  | "typographic"
  | "plans";

const sampleCardsData: PricingData = {
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

const sampleTableData: PricingTableData = {
  plans: [
    { id: "basic", title: "Basic", price: "$19", buttonText: "Get Started" },
    {
      id: "pro",
      title: "Pro",
      price: "$49",
      buttonText: "Upgrade to Pro",
      featured: true,
    },
    {
      id: "ent",
      title: "Enterprise",
      price: "$99",
      buttonText: "Contact Sales",
    },
  ],
  sections: [
    {
      title: "Core Features",
      features: [
        { name: "Projects", values: ["5", "25", "Unlimited"] },
        { name: "Users", values: ["1", "5", "Unlimited"] },
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
        { name: "Custom Domains", values: [false, true, true] },
        { name: "Analytics API", values: [false, false, true] },
        { name: "Priority Support", values: [false, "Email", "24/7 Phone"] },
      ],
    },
  ],
};

const sampleTypographicData = [
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

export default function PricingDemo({
  layout = "cards",
  variant = "default",
  color = "primary",
  counting = true,
}: {
  layout?: LayoutType;
  variant?: PricingVariant;
  color?: PricingColor;
  counting?: boolean;
}) {
  return (
    <div
      className={`w-full py-4 md:py-8 transition-colors duration-300 ${layout === "typographic" ? "bg-transparent rounded-3xl" : "bg-zinc-50/50 dark:bg-transparent"}`}
    >
      {layout === "cards" && (
        <PricingCards
          key={`cards-${variant}-${color}-${counting}`}
          variant={variant}
          color={color}
          counting={counting}
          data={sampleCardsData}
        />
      )}
      {layout === "builder" && (
        <PricingBuilder key={`builder-${color}-${counting}`} color={color} counting={counting} />
      )}
      {layout === "table" && (
        <PricingTable key={`table-${color}-${counting}`} color={color} counting={counting} data={sampleTableData} />
      )}
      {layout === "slider" && (
        <PricingSlider key={`slider-${color}-${counting}`} color={color} counting={counting} />
      )}
      {layout === "typographic" && (
        <PricingTypographic
          key={`type-${color}-${counting}`}
          packages={sampleTypographicData}
          color={color}
          counting={counting}
        />
      )}
      {layout === "plans" && (
        <PricingPlans key={`plans-${color}-${counting}`} color={color} counting={counting} />
      )}
    </div>
  );
}
