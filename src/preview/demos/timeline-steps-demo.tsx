"use client";

import {
  TimelineStepsBlock,
  type TimelineStepsItem,
} from "@/components/custom/blocks/TimelineStepsBlock";

const steps: TimelineStepsItem[] = [
  {
    id: 1,
    date: "2019",
    title: "Founded in a spare room",
    description:
      "Three friends start Northwind with a single idea: make project planning feel less like paperwork.",
  },
  {
    id: 2,
    date: "2020",
    title: "First 100 customers",
    description:
      "Word of mouth carries the beta past its first hundred teams, and the waitlist is still growing.",
  },
  {
    id: 3,
    date: "2021",
    title: "Seed round closed",
    description:
      "A small, patient round lets the team grow from three people to twelve and move into a real office.",
  },
  {
    id: 4,
    date: "2022",
    title: "Version 2.0 ships",
    description:
      "A full rebuild brings shared workspaces, a faster editor and an API that other tools can build on.",
  },
  {
    id: 5,
    date: "2023",
    title: "Opened in Europe",
    description:
      "A Berlin office and local data hosting open the door to teams that could not use the product before.",
  },
  {
    id: 6,
    date: "2024",
    title: "One million projects",
    description:
      "Teams in 90 countries now plan their work in Northwind, from two-person studios to global companies.",
  },
  {
    id: 7,
    date: "2025",
    title: "Smart suggestions",
    description:
      "The first AI features arrive, drafting plans from a short brief and learning from how each team works.",
  },
  {
    id: 8,
    date: "Today",
    title: "Building what is next",
    description:
      "A team of 120 keeps shipping every week, guided by the customers who have been here since the start.",
  },
];

// The timeline follows the scroll of the box it sits in, so the next entries
// appear as you scroll. The scrollbar is hidden. Outside a box it follows the
// page scroll instead.
export default function TimelineStepsExample() {
  return (
    <div className="h-[39rem] w-full overflow-y-auto rounded-2xl border border-border bg-background px-6 py-8 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden">
      <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
        Our story
      </p>
      <h2 className="mt-2 mb-10 text-4xl font-light tracking-tight text-foreground">
        A Few Years in the Making
      </h2>
      <TimelineStepsBlock items={steps} />
    </div>
  );
}
