"use client";

import {
  TimelineRulerBlock,
  type TimelineRulerItem,
} from "@/components/custom/blocks/TimelineRulerBlock";
import { BarChart3, Globe, Rocket, Sparkles, Trophy, Users } from "lucide-react";

const milestones: TimelineRulerItem[] = [
  {
    id: 1,
    date: "Feb 2026",
    tag: "Launch",
    title: "Public beta opens",
    icon: Rocket,
    value: "1,200",
    delta: "New",
    description: "Sign-ups in the first month",
    highlights: ["Waitlist opened to everyone", "Onboarding done in under 3 minutes"],
  },
  {
    id: 2,
    date: "Mar 2026",
    tag: "Growth",
    title: "Teams and shared workspaces",
    icon: Users,
    value: "3,450",
    delta: "+188%",
    description: "Active workspaces",
    highlights: ["Invite teammates with one link", "Roles for owners, editors and viewers"],
  },
  {
    id: 3,
    date: "Apr 2026",
    tag: "Product",
    title: "Analytics dashboard ships",
    icon: BarChart3,
    value: "7,340",
    delta: "+112%",
    description: "Weekly active users",
    highlights: ["Live charts for every project", "Export reports to CSV and PDF"],
  },
  {
    id: 4,
    date: "May 2026",
    tag: "Reach",
    title: "Localised in 12 languages",
    icon: Globe,
    value: "6,915",
    delta: "-6%",
    description: "Weekly active users, after the pricing change",
    highlights: ["Right-to-left layouts supported", "Regional pricing in local currencies"],
  },
  {
    id: 5,
    date: "Jun 2026",
    tag: "AI",
    title: "Smart suggestions arrive",
    icon: Sparkles,
    value: "8,760",
    delta: "+27%",
    description: "Weekly active users",
    highlights: ["Drafts written from a short prompt", "Suggestions learn from past work"],
  },
  {
    id: 6,
    date: "Jul 2026",
    tag: "Milestone",
    title: "10,000 teams on board",
    icon: Trophy,
    value: "9,480",
    delta: "+8%",
    description: "Weekly active users",
    highlights: ["Named a top tool of the quarter", "99.98% uptime across the launch"],
  },
];

export default function TimelineRulerExample() {
  return <TimelineRulerBlock items={milestones} defaultIndex={2} />;
}
