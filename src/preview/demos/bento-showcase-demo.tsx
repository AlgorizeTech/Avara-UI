"use client";

import { BentoShowcase, type BentoPlan, type BentoStat } from "@/components/custom/blocks/BentoShowcaseBlock";
import { cn } from "@/lib/utils";

const HERO_PHOTO = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_900,c_limit/v1790145139/pexels-photo-7709208-1790145143489.jpg";
const TEAM_PHOTO = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790166050/pexels-photo-8867482-1790166052229.jpg";

const AVATARS = ["https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg", "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790166049/pexels-photo-8867433-1790166052228.jpg", "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg"];

const CASE_STUDIES = [
  {
    quote: "More deals closed and more meetings booked for an IT services vendor",
    metrics: [{ value: "+64%", label: "Win rate" }, { value: "$230K", label: "New revenue" }],
  },
  {
    quote: "Hours back: triple the weekly demos on the calendar for a B2B startup",
    metrics: [{ value: "+80%", label: "Meetings" }, { value: "$150K", label: "New pipeline" }],
  },
  {
    quote: "Fully booked delivery windows and fewer late drop-offs for a courier",
    metrics: [{ value: "+40%", label: "Punctual" }, { value: "$95K", label: "Cost cut" }],
  },
];

const STATS: BentoStat[] = [
  { value: ">28,000", caption: "Average prospects sourced each month", tone: "cream", ornament: "spheres" },
  { value: "$165M", caption: "In revenue won for partners to date", tone: "lilac", ornament: "ring" },
  { value: "220+", caption: "Reps taking calls for clients today", tone: "ink", ornament: "drops" },
];

const PLANS: [BentoPlan, BentoPlan] = [
  {
    rank: "#2",
    name: "Growth",
    price: "$3,200",
    note: "A promised 8–12 vetted prospects every month",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    benefits: ["Prospect vetting", "Account research", "Cold email sequences"],
    action: "Get started",
  },
  {
    rank: "#3",
    name: "Scale",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145140/photo-1550684848-fac1c5b4e853-1790145143489.jpg",
  },
];

// Four photos and two figure discs make six cells — an even count keeps the
// high/low rhythm intact across the loop.
const TEAM = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7688336-1790166052227.jpg", alt: "Overhead view of a workspace with a laptop, notebook and mug" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg", alt: "A pair of reps working side by side" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg", alt: "A rep on the phone, grinning at a teammate" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7709086-1790166052228.jpg", alt: "A rep typing away at a laptop" },
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
        label="Managed call centre"
        photo={HERO_PHOTO}
        photoAlt="A call centre rep in a headset, working at a laptop"
        chat={{
          from: "Lena",
          fromRole: "Account rep",
          message: "Hello! Could you drop the booking I made for Sam Ortega a few days ago, please?",
          as: "Callnest",
          reply: "Of course, it's cancelled for you right now!",
        }}
        avatars={AVATARS}
      >
        <em>Chosen by</em> thousands of sales teams
      </BentoShowcase.Hero>

      <BentoShowcase.CaseStudies rating={5} reviews={42} items={CASE_STUDIES} />

      <BentoShowcase.Headline label="Call handling" photo={TEAM_PHOTO} photoAlt="The call team at work, wearing headsets">
        We pick up the
        <br />
        phone while you <em>grow the company</em>
      </BentoShowcase.Headline>

      <BentoShowcase.Stats items={STATS} />

      <BentoShowcase.Phone plans={PLANS} />

      <BentoShowcase.Team photos={TEAM} stat={{ value: "96%", caption: "Calls resolved inside target time" }} />
    </BentoShowcase>
  );
}
