"use client";

import {
  AnimatedTimelineBlock,
  TimelineAnimation,
  TimelineColor,
  TimelineLayout,
} from "@/components/custom/blocks/AnimatedTimelineBlock";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Palette,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

const SAMPLE_DATA = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description:
      "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description:
      "Wireframing, prototyping, and finalizing the UI kit components.",
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
    title: "Testing & QA",
    date: "Apr 2024",
    description:
      "Running automated tests and squashing complex accessibility bugs.",
    icon: Loader2,
  },
  {
    id: "5",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
  {
    id: "6",
    title: "Global Expansion",
    date: "Jun 2024",
    description: "Reaching 100k active users globally.",
    icon: MapPin,
  },
  {
    id: "7",
    title: "Milestone Achieved",
    date: "Present",
    description: "We did it.",
    icon: CheckCircle2,
  },
];

export default function AnimatedTimelineDemo({
  layout = "center",
  animation = "flip-up",
  color = "primary",
  resetKey = 0,
}: {
  layout?: TimelineLayout;
  animation?: TimelineAnimation;
  color?: TimelineColor | string;
  resetKey?: number;
}) {
  return (
    <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-border bg-muted/40 overflow-hidden">
      {/* Scrollable container to demonstrate the intersection observer */}
      <div className="w-full h-[600px] overflow-y-auto overflow-x-hidden p-6 sm:p-12 relative custom-scrollbar">
        <div className="w-full max-w-3xl mx-auto pt-32 pb-48">
          <div className="text-center mb-16 opacity-50 select-none">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Scroll Down
            </p>
            <div className="w-px h-12 bg-border mx-auto mt-4 animate-bounce" />
          </div>

          {/* The key prop forces React to remount, resetting the observers if you change layout */}
          <AnimatedTimelineBlock
            key={`${resetKey}-${layout}-${animation}`}
            items={SAMPLE_DATA}
            layout={layout}
            animation={animation}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}
