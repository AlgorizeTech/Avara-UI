import type { PageVariants } from "./types";

export const error: PageVariants = {
  slug: "error",
  intro:
    "Error page sections for root application error boundaries, Next.js error.tsx, and system failure screens.",
  gotchas: [
    "Install `error` once; choose between the cyberpunk terminal look, modern animated orbital pulse, and interactive service pipeline topology via `variant`.",
  ],
  variants: [
    {
      id: "terminal",
      label: "Cyberpunk Terminal",
      summary: "Full-width futuristic telemetry enclosure with Mac window indicators, crash icon, and technical trace console.",
      bestFor: ["developer platforms, cyber/tech apps, and root error boundaries needing technical telemetry"],
      avoidIf: ["you want a soft, minimalist, or non-technical presentation"],
      traits: ["terminal chrome", "stacktrace console", "incident hash copy"],
      item: "error",
      demo: "error",
      example: "Cyberpunk Terminal Section",
    },
    {
      id: "modern-animated",
      label: "Modern Animated Pulse",
      summary: "Ultra-modern animated orbital radar with counter-rotating rings, sweeping radar, and micro-health monitors.",
      bestFor: ["SaaS platforms, modern web apps, and polished production error boundaries"],
      avoidIf: ["you prefer dense terminal console output over clean visual aesthetics"],
      traits: ["animated orbital rings", "conic radar sweep", "micro-service monitors", "expandable trace drawer"],
      item: "error",
      demo: "error",
      example: "Modern Animated Orbital Pulse",
      props: { variant: "modern-animated" },
      setProps: { variant: "modern-animated" },
    },
    {
      id: "service-pipeline",
      label: "Service Pipeline Topology",
      summary: "Interactive animated network topology and pipeline failure state with live heartbeat flatline and remediation playbook.",
      bestFor: ["cloud platforms, API services, microservices architecture, and DevOps developer portals"],
      avoidIf: ["you prefer a dense terminal console or circular radar over topology flows"],
      traits: ["animated topology flow", "heartbeat flatline", "remediation playbook", "pipeline telemetry"],
      item: "error",
      demo: "error",
      example: "Service Pipeline Topology",
      props: { variant: "service-pipeline" },
      setProps: { variant: "service-pipeline" },
    },
  ],
};
