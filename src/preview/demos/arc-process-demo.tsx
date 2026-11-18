"use client";

import React from "react";
import {
  Compass,
  Palette,
  Cpu,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import {
  ArcProcess,
  type ArcProcessStep,
} from "@/components/custom/blocks/ArcProcessBlock";
import { resolveAccent, accentStyle } from "@/lib/accent";

const DEMO_PROCESS_STEPS: ArcProcessStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Discovery & Strategic Roadmap",
    description:
      "We map your technical roadmap, dissect core user journeys, and align architecture goals before writing a single line of code.",
    icon: Compass,
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Rapid Prototyping & Iteration",
    description:
      "Interactive wireframes and tangible prototypes let you test assumptions early and refine user interactions with direct feedback.",
    icon: Palette,
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Full-Stack Agile Engineering",
    description:
      "Clean, type-safe implementation using modular components, robust state management, and enterprise-grade performance best practices.",
    icon: Cpu,
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Automated QA & Security Audit",
    description:
      "Comprehensive end-to-end testing, accessibility compliance checks, and performance benchmarks to guarantee zero regression.",
    icon: ShieldCheck,
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Global Scale & Continuous Delivery",
    description:
      "Zero-downtime automated deployment pipelines with real-time telemetry, auto-scaling infrastructure, and continuous monitoring.",
    icon: Rocket,
  },
];

export default function ArcProcessDemo({
  variant = "arc-dock",
  highlightShape = "ribbon",
  themeColor,
  color,
}: {
  variant?: "arc-dock" | "default" | "semicircle";
  highlightShape?: "ribbon" | "wave" | "double" | "curve";
  themeColor?: string;
  color?: string;
}) {
  const chosen = color || themeColor;
  const isDefault = !chosen || chosen === "primary" || chosen === "default";
  const resolved = resolveAccent(chosen);
  const activeColor = !isDefault
    ? (resolved || (chosen?.startsWith("#") ? chosen : chosen))
    : undefined;

  return (
    <div
      style={{
        ...accentStyle(chosen),
        ...(activeColor ? ({ "--theme-color": activeColor } as React.CSSProperties) : {}),
      }}
      className="w-full h-auto min-h-[480px] sm:min-h-[600px] lg:min-h-[720px] relative overflow-hidden flex flex-col items-center justify-start bg-white dark:bg-zinc-950 rounded-2xl border border-border/60 p-0 m-0"
    >
      <ArcProcess
        variant={variant}
        highlightShape={highlightShape}
        badgeText="ENGINEERING LIFECYCLE"
        title="A streamlined workflow built for"
        highlightWord="workflow"
        subtitle="teams shipping high-standard products"
        steps={DEMO_PROCESS_STEPS}
        themeColor={activeColor}
        className="w-full"
      />
    </div>
  );
}
