"use client";

import {
  AccordionShowcaseItem,
  ScrollAccordionShowcase,
  ShowcaseDisplayMode,
} from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

const showcaseItems: AccordionShowcaseItem[] = [
  {
    id: "landing-page",
    stepNumber: "01",
    title: "Landing Page Design",
    description:
      "Most landing pages fail quietly. Traffic comes in, nothing happens, and budgets burn. We engineer high-converting layouts with strategic visual hierarchy and micro-interactions.",
    tags: [
      "CONVERSION FOCUSED DESIGN",
      "FIGMA TO CODE CONVERSION",
      "MOBILE FIRST RESPONSIVE",
    ],
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1460925895917-afdab827c52f-1790146212204.jpg",
    badgeText: "SELECTED SERVICE",
  },
  {
    id: "saas-dev",
    stepNumber: "02",
    title: "SaaS Product Development",
    description:
      "Modular, multi-tenant web applications designed to scale from your first 1,000 users to millions of daily requests without refactoring your core backend architecture.",
    tags: [
      "MULTI-TENANT ARCHITECTURE",
      "REAL-TIME SYNC",
      "EDGE COMPUTED API",
    ],
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1551288049-bebda4e38f71-1790146212211.jpg",
    badgeText: "SELECTED SERVICE",
  },
  {
    id: "ai-product",
    stepNumber: "03",
    title: "AI Product Development",
    description:
      "Building an AI product is not about plugging in an API and hoping for the best. We build custom retrieval pipelines, fine-tuned models, and intuitive streaming UI interfaces.",
    tags: [
      "CUSTOM RAG PIPELINES",
      "STREAMING RESPONSES",
      "VECTOR DATABASE SETUP",
    ],
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    badgeText: "SELECTED SERVICE",
  },
  {
    id: "web-app",
    stepNumber: "04",
    title: "Web App Development",
    description:
      "There is a massive difference between a static website and a mission-critical web application. We deliver complex dashboards, data tables, and secure portal architectures.",
    tags: [
      "SERVER-SIDE RENDERING",
      "ROLE-BASED ACCESS CONTROL",
      "REAL-TIME NOTIFICATIONS",
    ],
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1504639725590-34d0984388bd-1790146212207.jpg",
    badgeText: "SELECTED SERVICE",
  },
];

export default function ScrollAccordionDemo({
  displayMode = "both",
  defaultIndex = 0,
}: {
  displayMode?: ShowcaseDisplayMode;
  /** Row expanded on first render. */
  defaultIndex?: number;
}) {
  return (
    <div className="w-full bg-zinc-50 dark:bg-[#0a0a0a] py-8 px-2 sm:px-8 relative rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <ScrollAccordionShowcase
        items={showcaseItems}
        displayMode={displayMode}
        defaultIndex={defaultIndex}
        localStorageKey="primaryColor"
      />
    </div>
  );
}
