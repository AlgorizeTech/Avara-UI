"use client";

import {
  TimelineDialBlock,
  type TimelineDialItem,
} from "@/components/custom/blocks/TimelineDialBlock";
import { Award, Flag, Globe, Sprout, TrendingUp, Zap } from "lucide-react";

const milestones: TimelineDialItem[] = [
  {
    id: 1,
    date: "2018",
    title: "Founded",
    eyebrow: "Day one",
    description: "Two founders, one laptop and a first prototype of the platform.",
    icon: Sprout,
  },
  {
    id: 2,
    date: "2019",
    title: "Seed Round",
    eyebrow: "First funding",
    description: "Raised our seed round and grew the team from two people to twelve.",
    icon: TrendingUp,
  },
  {
    id: 3,
    date: "2020",
    title: "Product Launch",
    eyebrow: "V1.0 released",
    description:
      "Launched our flagship platform to 500+ beta users. Achieved 94% satisfaction rate and 40% month-over-month growth.",
    icon: Zap,
  },
  {
    id: 4,
    date: "2021",
    title: "Series A",
    eyebrow: "Scaling up",
    description: "Closed our Series A and opened a second office to support customers.",
    icon: Flag,
  },
  {
    id: 5,
    date: "2022",
    title: "Global Expansion",
    eyebrow: "New markets",
    description: "Opened in 14 countries with localized support and regional data centers.",
    icon: Globe,
  },
  {
    id: 6,
    date: "2024",
    title: "Industry Leader",
    eyebrow: "Where we are",
    description: "Named a category leader by independent analysts for the third year running.",
    icon: Award,
  },
];

export default function TimelineDialExample() {
  return <TimelineDialBlock items={milestones} defaultIndex={2} />;
}
