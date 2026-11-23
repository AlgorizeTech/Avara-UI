"use client";

import { AnimatedTimelineBlock } from "@/components/custom/blocks/AnimatedTimelineBlock";
import { Palette, Rocket, Target, Zap } from "lucide-react";

const ITEMS = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description: "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description: "Wireframing, prototyping, and finalizing the UI kit components.",
    icon: Palette,
  },
  {
    id: "3",
    title: "Development",
    date: "Mar 2024",
    description: "Writing the core logic and React components from scratch.",
    icon: Zap,
  },
  {
    id: "4",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
];

/**
 * The Animated Timeline catalog card's scene. The docs demo sits in a 600px
 * scroller that reveals items as they scroll into view, which a card cannot
 * scroll, so this renders the timeline itself with a few items.
 */
export default function AnimatedTimelineScene() {
  return (
    <div className="w-full max-w-3xl px-6 py-4">
      <AnimatedTimelineBlock items={ITEMS} layout="center" animation="flip-up" />
    </div>
  );
}
