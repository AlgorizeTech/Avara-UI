"use client";

import {
  HorizontalScrollStack,
  ScrollStackItem,
} from "@/components/custom/blocks/HorizontalScrollStackBlock";
import {
  Compass,
  Cpu,
  FileText,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const demoProcessItems: ScrollStackItem[] = [
  {
    id: "1",
    title: "Understand",
    description:
      "Business goals and strategies, persona and painpoints, competitors.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Define",
    description:
      "Strategy, information architecture, user flows, moodboard, visual direction.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Ideate",
    description: "Brainstorming, solution propose, sketching, wireframing.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "4",
    title: "Design",
    description: "Style guide, design system, interface design",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "5",
    title: "Test",
    description: "User testing, feedback collection and implementation",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "6",
    title: "Approval",
    description: "Submission for client approval",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "7",
    title: "Delivery",
    description: "Asset preparation, assets exports.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

export default function HorizontalScrollStackDemo({
  title,
  subtitle,
  itemCount,
}: {
  title?: string;
  subtitle?: string;
  /** Trims the rail so the pinned scroll distance shortens. */
  itemCount?: number;
}) {
  const items = itemCount
    ? demoProcessItems.slice(0, itemCount)
    : demoProcessItems;

  return (
    <div
      className="w-full relative rounded-3xl border border-slate-200/80 dark:border-zinc-800"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
      }}
    >
      <HorizontalScrollStack
        key={`${items.length}-${title}-${subtitle}`}
        items={items}
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}
