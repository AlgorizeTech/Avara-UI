"use client";

import {
  TimelinePathBlock,
  type TimelinePathItem,
} from "@/components/custom/blocks/TimelinePathBlock";
import {
  Building2,
  Globe,
  Handshake,
  Lightbulb,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const milestones: TimelinePathItem[] = [
  {
    id: 1,
    date: "Jan 2019",
    title: "The idea",
    description: "A sketch on a whiteboard turns into the first working prototype.",
    icon: Lightbulb,
  },
  {
    id: 2,
    date: "Aug 2019",
    title: "First hires",
    description: "The founding team grows from three to eight and moves out of the spare room.",
    icon: Users,
  },
  {
    id: 3,
    date: "Mar 2020",
    title: "Public launch",
    description: "The product goes live and the first hundred customers sign up in a week.",
    icon: Rocket,
  },
  {
    id: 4,
    date: "Nov 2020",
    title: "First partnership",
    description: "A deal with a larger platform brings the product to thousands of new teams.",
    icon: Handshake,
  },
  {
    id: 5,
    date: "Jun 2021",
    title: "New headquarters",
    description: "A proper office, a support desk and a team that finally fits in one room.",
    icon: Building2,
  },
  {
    id: 6,
    date: "Feb 2022",
    title: "Going global",
    description: "Translations, local currencies and a second office open up three new continents.",
    icon: Globe,
  },
  {
    id: 7,
    date: "Oct 2023",
    title: "Industry award",
    description: "Named best new productivity tool by a panel of independent reviewers.",
    icon: Trophy,
  },
  {
    id: 8,
    date: "Today",
    title: "What comes next",
    description: "Smart suggestions, deeper integrations and the same small-team care.",
    icon: Sparkles,
  },
];

// The timeline follows the scroll of the box it sits in, so the next entries
// appear as you scroll. The scrollbar is hidden. Outside a box it follows the
// page scroll instead.
export default function TimelinePathExample() {
  return (
    <div className="h-[39rem] w-full overflow-y-auto rounded-2xl border border-border bg-background px-6 py-8 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden">
      <TimelinePathBlock items={milestones} />
    </div>
  );
}
