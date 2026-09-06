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

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = { primary: "var(--primary)", default: "var(--primary)", indigo: "#6366f1", rose: "#f43f5e", emerald: "#10b981", zinc: "#18181b" };
  return map[c] || "var(--primary)";
};

export default function HorizontalScrollStackDemo({
  title,
  subtitle,
  itemCount,
  color = "primary",
}: {
  title?: string;
  subtitle?: string;
  /** Trims the rail so the pinned scroll distance shortens. */
  itemCount?: number;
  color?: string;
}) {
  const items = itemCount
    ? demoProcessItems.slice(0, itemCount)
    : demoProcessItems;

  return (
    <div
      className="w-full relative"
      style={{ "--theme-color": getThemeColorHex(color) } as React.CSSProperties}
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
