"use client";

import { BentoShowcase, type BentoPlan, type BentoStat } from "@/components/custom/blocks/BentoShowcaseBlock";
import { cn } from "@/lib/utils";

const HERO_PHOTO = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_900,c_limit/v1790145139/pexels-photo-7709208-1790145143489.jpg";
const TEAM_PHOTO = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790166050/pexels-photo-8867482-1790166052229.jpg";

const AVATARS = ["https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg", "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790166049/pexels-photo-8867433-1790166052228.jpg", "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg"];

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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    benefits: ["Lead qualification", "Intelligent research", "Email outreach"],
    action: "Start now",
  },
  {
    rank: "#3",
    name: "Enterprise",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145140/photo-1550684848-fac1c5b4e853-1790145143489.jpg",
  },
];

// Four photos and two figure discs make six cells — an even count keeps the
// high/low rhythm intact across the loop.
const TEAM = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7688336-1790166052227.jpg", alt: "A desk from above: laptop, notes and a coffee" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg", alt: "Two agents at their desks" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg", alt: "Agent on a call, smiling at a colleague" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790166049/pexels-photo-7709086-1790166052228.jpg", alt: "Agent working on a laptop" },
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
