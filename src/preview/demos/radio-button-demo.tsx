"use client";

import * as React from "react";
import {
  RadioButtonGroup,
  type RadioButtonOption,
  type RadioButtonVariant,
} from "@/components/custom/blocks/RadioButtonBlock";
import { accentStyle } from "@/lib/accent";
import {
  Building2,
  CreditCard,
  Crown,
  Flame,
  Gem,
  Layers,
  Rocket,
  Wallet,
} from "lucide-react";

const PLAN_OPTIONS: RadioButtonOption[] = [
  {
    value: "starter",
    label: "Starter",
    description: "Essential components for solo makers and side projects.",
    meta: "$5/mo",
  },
  {
    value: "pro",
    label: "Pro",
    description: "Full registry access with priority updates and templates.",
    meta: "$15/mo",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Dedicated support, custom tokens, and team seats.",
    meta: "$45/mo",
  },
];

const SUBSCRIPTION_OPTIONS: RadioButtonOption[] = [
  {
    value: "annual",
    label: "Annual",
    description: "Billed yearly for full component access.",
    meta: "$99/yr",
  },
  {
    value: "annual-toolkit",
    label: "Annual + Toolkit",
    badge: "Save up to 50%",
    description: "Includes Figma kit, motion presets, and lifetime updates.",
    meta: "$149/yr",
  },
];

const DELIVERY_OPTIONS: RadioButtonOption[] = [
  {
    value: "standard",
    label: "Standard",
    description: "4–6 business days",
    meta: "$5.00",
  },
  {
    value: "express",
    label: "Express",
    description: "2–3 business days",
    meta: "$16.00",
  },
  {
    value: "super-fast",
    label: "Super Fast",
    description: "Next-day delivery",
    meta: "$25.00",
  },
];

const PAYMENT_OPTIONS: RadioButtonOption[] = [
  {
    value: "visa-0123",
    label: "**** 0123",
    description: "Expires 08/2028",
    icon: <CreditCard className="size-4" />,
  },
  {
    value: "mc-8304",
    label: "**** 8304",
    description: "Expires 11/2027",
    icon: <CreditCard className="size-4" />,
  },
  {
    value: "paypal",
    label: "PayPal",
    description: "Instant checkout",
    icon: <Wallet className="size-4" />,
  },
  {
    value: "bank",
    label: "Bank Transfer",
    description: "ACH / Wire",
    icon: <Building2 className="size-4" />,
  },
];

const MAILING_OPTIONS: RadioButtonOption[] = [
  {
    value: "newsletter",
    label: "Newsletter",
    description: "621 users",
  },
  {
    value: "existing",
    label: "Existing Customers",
    description: "1,200 users",
  },
  {
    value: "trial",
    label: "Trial Users",
    description: "2,740 users",
  },
];

const WORKSPACE_OPTIONS: RadioButtonOption[] = [
  {
    value: "starter",
    label: "Starter",
    badge: "Most popular",
    meta: "$12",
    metaSuffix: "per month",
    description: "For freelancers and solo makers shipping fast.",
    icon: <Layers className="size-4" />,
  },
  {
    value: "growth",
    label: "Growth",
    meta: "$29",
    metaSuffix: "per month",
    description: "For small teams scaling their product.",
    icon: <Flame className="size-4" />,
  },
  {
    value: "business",
    label: "Business",
    meta: "$59",
    metaSuffix: "per month",
    description: "For companies with advanced compliance needs.",
    icon: <Rocket className="size-4" />,
  },
  {
    value: "scale",
    label: "Scale",
    meta: "$149",
    metaSuffix: "per month",
    description: "Dedicated infra, SLA, and custom integrations.",
    icon: <Gem className="size-4" />,
  },
  {
    value: "enterprise",
    label: "Enterprise",
    meta: "$299",
    metaSuffix: "per month",
    description: "White-glove onboarding, custom contracts.",
    icon: <Crown className="size-4" />,
  },
];

const REGION_OPTIONS: RadioButtonOption[] = [
  {
    value: "us-east-1",
    label: "US East",
    description: "us-east-1",
  },
  {
    value: "eu-west-1",
    label: "EU West",
    description: "eu-west-1",
  },
  {
    value: "ap-south-1",
    label: "Asia Pacific",
    description: "ap-south-1",
  },
];

export default function RadioButtonDemo({
  variant = "default",
  color,
}: {
  variant?: RadioButtonVariant;
  color?: string;
}) {
  const [controlledVal, setControlledVal] = React.useState("pro");

  if (variant === "delivery-and-payment") {
    return (
      <div
        style={accentStyle(color)}
        className="w-full min-h-[380px] p-4 sm:p-8 flex flex-col items-center justify-center gap-6"
      >
        <RadioButtonGroup
          variant="grid"
          label="Delivery method"
          options={DELIVERY_OPTIONS}
          defaultValue="express"
        />
        <RadioButtonGroup
          variant="with-icons"
          label="Payment method"
          options={PAYMENT_OPTIONS}
          defaultValue="visa-0123"
        />
      </div>
    );
  }

  if (variant === "controlled") {
    return (
      <div
        style={accentStyle(color)}
        className="w-full min-h-[360px] p-4 sm:p-8 flex flex-col items-center justify-center gap-3"
      >
        <RadioButtonGroup
          variant="default"
          label="Select a plan"
          options={PLAN_OPTIONS}
          value={controlledVal}
          onValueChange={setControlledVal}
        />
        <p className="w-[min(390px,100%)] text-xs text-muted-foreground">
          Selected: <span className="font-semibold text-foreground">{controlledVal}</span>
        </p>
      </div>
    );
  }

  const configs: Record<
    Exclude<RadioButtonVariant, "delivery-and-payment" | "controlled">,
    {
      label: string;
      description?: string;
      options: RadioButtonOption[];
      defaultValue: string;
      disabled?: boolean;
    }
  > = {
    default: {
      label: "Select a plan",
      description: "Choose the tier that matches your workflow.",
      options: PLAN_OPTIONS,
      defaultValue: "pro",
    },
    "subscription-plans": {
      label: "Subscription plans",
      description: "Inverted high-contrast selection with press ripple.",
      options: SUBSCRIPTION_OPTIONS,
      defaultValue: "annual-toolkit",
    },
    "custom-indicator": {
      label: "Select a mailing list",
      options: MAILING_OPTIONS,
      defaultValue: "newsletter",
    },
    "disabled-group": {
      label: "Select a plan",
      description: "Plan changes are temporarily unavailable.",
      options: PLAN_OPTIONS,
      defaultValue: "pro",
      disabled: true,
    },
    grid: {
      label: "Delivery method",
      options: DELIVERY_OPTIONS,
      defaultValue: "express",
    },
    "icon-cards": {
      label: "Choose your workspace plan",
      options: WORKSPACE_OPTIONS,
      defaultValue: "growth",
    },
    "no-indicator": {
      label: "Select a plan",
      options: PLAN_OPTIONS,
      defaultValue: "pro",
    },
    "with-icons": {
      label: "Payment method",
      options: PAYMENT_OPTIONS,
      defaultValue: "visa-0123",
    },
    "with-ripple": {
      label: "Deploy region",
      description: "Click any region card to see the press ripple feedback.",
      options: REGION_OPTIONS,
      defaultValue: "us-east-1",
    },
  };

  const cfg = configs[variant] ?? configs.default;

  return (
    <div
      style={accentStyle(color)}
      className="w-full min-h-[340px] p-4 sm:p-8 flex items-center justify-center"
    >
      <RadioButtonGroup
        variant={variant}
        label={cfg.label}
        description={cfg.description}
        options={cfg.options}
        defaultValue={cfg.defaultValue}
        disabled={cfg.disabled}
      />
    </div>
  );
}
