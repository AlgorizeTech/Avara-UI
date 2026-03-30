export const pricingData = {
  tabs: [
    { id: "weekly", label: "Weekly", icon: null },
    { id: "monthly", label: "Monthly", icon: null },
    { id: "annually", label: "Annually", icon: null },
  ],
  plans: {
    weekly: [
      {
        id: "trial", title: "Free Trial", subtitle: "Try our service for free", price: "$0",
        period: "7 days", buttonText: "Start Free Trial", popular: false, active: false,
        icon: "Calendar", features: ["Basic access", "No credit card required", "Cancel anytime"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "freelancer", title: "Freelancer", subtitle: "Perfect for individual projects.", price: "$10",
        period: "7 days", buttonText: "Buy plan", popular: false, active: false,
        icon: "Users", features: ["3 products", "Up to 500 subscribers", "Basic analytics"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "startup", title: "Startup", subtitle: "Ideal for small businesses.", price: "$20",
        period: "7 days", buttonText: "Buy plan", popular: true, active: true, popularText: "Most popular",
        icon: "Rocket", features: ["10 products", "Up to 2,000 subscribers", "Basic analytics", "24-hour support response time"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "enterprise", title: "Enterprise", subtitle: "For larger organizations.", price: "$40",
        period: "7 days", buttonText: "Buy plan", popular: false, active: false,
        icon: "Building", features: ["Unlimited products", "Up to 5,000 subscribers", "Priority support"],
        rootClassName: "", buttonClassName: "",
      },
    ],
    monthly: [
      {
        id: "hobby", title: "Hobby", subtitle: "The essentials to provide your best work for clients.", price: "$19",
        period: "month", buttonText: "Buy plan", popular: false, active: false,
        icon: "Zap", features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "freelancer", title: "Freelancer", subtitle: "The essentials to provide your best work for clients.", price: "$29",
        period: "month", buttonText: "Buy plan", popular: false, active: false,
        icon: "Users", features: ["5 products", "Up to 1,000 subscribers", "Basic analytics", "48-hour support response time"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "startup", title: "Startup", subtitle: "A plan that scales with your rapidly growing business.", price: "$59",
        period: "month", buttonText: "Buy plan", popular: true, active: true, popularText: "Most popular",
        icon: "Rocket", features: ["25 products", "Up to 10,000 subscribers", "Advanced analytics", "24-hour support response time", "Marketing automations"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "enterprise", title: "Enterprise", subtitle: "Dedicated support and infrastructure for your company.", price: "$99",
        period: "month", buttonText: "Buy plan", popular: false, active: false,
        icon: "Building", features: ["Unlimited products", "Unlimited subscribers", "Advanced analytics", "1-hour, dedicated support response time", "Marketing automations", "Custom reporting tools"],
        rootClassName: "", buttonClassName: "",
      },
    ],
    annually: [
      {
        id: "hobby", title: "Hobby", subtitle: "The essentials to provide your best work for clients.", price: "$190",
        period: "year", buttonText: "Buy plan", popular: false, active: false,
        icon: "Zap", features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "freelancer", title: "Freelancer", subtitle: "The essentials to provide your best work for clients.", price: "$290",
        period: "year", buttonText: "Buy plan", popular: false, active: false,
        icon: "Users", features: ["5 products", "Up to 1,000 subscribers", "Basic analytics", "48-hour support response time"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "startup", title: "Startup", subtitle: "A plan that scales with your rapidly growing business.", price: "$590",
        period: "year", buttonText: "Buy plan", popular: true, active: true, popularText: "Most popular",
        icon: "Rocket", features: ["25 products", "Up to 10,000 subscribers", "Advanced analytics", "24-hour support response time", "Marketing automations"],
        rootClassName: "", buttonClassName: "",
      },
      {
        id: "enterprise", title: "Enterprise", subtitle: "Dedicated support and infrastructure for your company.", price: "$990",
        period: "year", buttonText: "Buy plan", popular: false, active: false,
        icon: "Building", features: ["Unlimited products", "Unlimited subscribers", "Advanced analytics", "1-hour, dedicated support response time", "Marketing automations", "Custom reporting tools"],
        rootClassName: "", buttonClassName: "",
      },
    ],
  },
};

export const transformPricingData = (data: any) => {
  return {
    tabs: data.tabs.map((tab: any) => ({
      ...tab,
      plans: data.plans[tab.id] || [],
    })),
  };
};

export const pricingDataV2 = {
  tabs: [
    { id: "monthly", label: "Monthly", icon: "Calendar" },
    { id: "annually", label: "Annually", icon: "CalendarCog" },
  ],
  plans: {
    monthly: [
      { id: "starter", title: "Starter", price: "$19", period: "month", buttonText: "Buy plan", featured: false },
      { id: "growth", title: "Growth", price: "$49", period: "month", buttonText: "Buy plan", featured: true },
      { id: "scale", title: "Scale", price: "$99", period: "month", buttonText: "Buy plan", featured: false },
    ],
    annually: [
      { id: "starter", title: "Starter", price: "$190", period: "year", buttonText: "Buy plan", featured: false },
      { id: "growth", title: "Growth", price: "$490", period: "year", buttonText: "Buy plan", featured: true },
      { id: "scale", title: "Scale", price: "$990", period: "year", buttonText: "Buy plan", featured: false },
    ],
  },
  featureSections: [
    {
      title: "Features",
      features: [
        { name: "Edge content delivery", values: [true, true, true] },
        { name: "Custom domains", values: [1, 3, "Unlimited"] },
        { name: "Team members", values: [3, 20, "Unlimited"] },
        { name: "Single sign-on (SSO)", values: [false, false, true] },
      ],
    },
    {
      title: "Reporting",
      features: [
        { name: "Advanced analytics", values: [true, true, true] },
        { name: "Basic reports", values: [false, true, true] },
        { name: "Professional reports", values: [false, false, true] },
        { name: "Custom report builder", values: [false, false, true] },
      ],
    },
    {
      title: "Support",
      features: [
        { name: "24/7 online support", values: [true, true, true] },
        { name: "Quarterly workshops", values: [false, true, true] },
        { name: "Priority phone support", values: [false, false, true] },
        { name: "1:1 onboarding tour", values: [false, false, true] },
      ],
    },
  ],
};

export const transformPricingDataV2 = (data: any) => {
  return {
    tabs: data.tabs.map((tab: any) => ({
      ...tab,
      plans: data.plans[tab.id] || [],
      featureSections: data.featureSections,
    })),
  };
};