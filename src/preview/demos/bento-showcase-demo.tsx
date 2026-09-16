"use client";

import { BentoShowcase, type BentoPlan, type BentoStat } from "@/components/custom/blocks/BentoShowcaseBlock";
import { cn } from "@/lib/utils";

// Photos from Pexels (free to use): call-centre agents and a support team.
const pexels = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const HERO_PHOTO = pexels(7709208);
const TEAM_PHOTO = pexels(8867482, 600);

const AVATARS = [pexels(7658387, 120), pexels(8867433, 120), pexels(8867434, 120)];

const CASE_STUDIES = [
  {
    quote: "5% of deal-closing rate and appointments for a solution provider",
    metrics: [{ value: "+70%", label: "Close rate" }, { value: "$250K", label: "Revenue" }],
  },
  {
    quote: "Saving time: 3x appointments booked per week for a SaaS team",
    metrics: [{ value: "+85%", label: "Bookings" }, { value: "$140K", label: "Pipeline" }],
  },
  {
    quote: "Sold-out delivery slots and a reduced late rate for a logistics firm",
    metrics: [{ value: "+45%", label: "On time" }, { value: "$90K", label: "Saved" }],
  },
];

const STATS: BentoStat[] = [
  { value: ">30,000", caption: "Leads generated a month, on average", tone: "cream", ornament: "spheres" },
  { value: "$180M", caption: "Brought to our clients so far", tone: "lilac", ornament: "ring" },
  { value: "200+", caption: "Sales reps on the floor right now", tone: "ink", ornament: "drops" },
];

const PLANS: [BentoPlan, BentoPlan] = [
  {
    rank: "#2",
    name: "Professional",
    price: "$3,500",
    note: "7–12 qualified leads a month, guaranteed",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    benefits: ["Lead qualification", "Intelligent research", "Email outreach"],
    action: "Start now",
  },
  {
    rank: "#3",
    name: "Enterprise",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
  },
];

// Four photos and two figure discs make six cells — an even count keeps the
// high/low rhythm intact across the loop.
const TEAM = [
  { src: pexels(7688336, 500), alt: "A desk from above: laptop, notes and a coffee" },
  { src: pexels(8867434, 500), alt: "Two agents at their desks" },
  { src: pexels(7658387, 500), alt: "Agent on a call, smiling at a colleague" },
  { src: pexels(7709086, 500), alt: "Agent working on a laptop" },
];

export default function BentoShowcaseDemo({
  rounded = true,
}: {
  /** Round the section's corners — off when it is the page. */
  rounded?: boolean;
}) {
  return (
    <BentoShowcase className={cn("max-w-6xl", rounded && "rounded-[36px]")}>
      <BentoShowcase.Hero
        label="Outsourcing company"
        photo={HERO_PHOTO}
        photoAlt="A support agent wearing a headset at her laptop"
        chat={{
          from: "Maria",
          fromRole: "Sales rep",
          message: "Hi! Can you help me cancel my reservation for Pete Mitchell made earlier this week?",
          as: "AgainAgain",
          reply: "Sure, I'll cancel that immediately for you!",
        }}
        avatars={AVATARS}
      >
        <em>Trusted by</em> 1000&rsquo;s of sales reps
      </BentoShowcase.Hero>

      <BentoShowcase.CaseStudies rating={5} reviews={42} items={CASE_STUDIES} />

      <BentoShowcase.Headline label="Customer support" photo={TEAM_PHOTO} photoAlt="The support team, headsets on">
        We handle your
        <br />
        calls so you <em>run your business</em>
      </BentoShowcase.Headline>

      <BentoShowcase.Stats items={STATS} />

      <BentoShowcase.Phone plans={PLANS} />

      <BentoShowcase.Team photos={TEAM} stat={{ value: "97%", caption: "AHT (Average Handling Time)" }} />
    </BentoShowcase>
  );
}
