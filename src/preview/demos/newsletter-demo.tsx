"use client";

import { Newsletter, type NewsletterVariant } from "@/components/custom/blocks/NewsletterBlock";
import { cn } from "@/lib/utils";

const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg",
];

const PORTRAITS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg", alt: "A subscriber" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg", alt: "A subscriber" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg", alt: "A subscriber" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg", alt: "A subscriber" },
];

const JOINED = [
  { name: "Iris", avatar: FACES[0], when: "just now" },
  { name: "Ben", avatar: FACES[1], when: "2 min ago" },
  { name: "Yuki", avatar: FACES[2], when: "5 min ago" },
  { name: "Dev", avatar: FACES[3], when: "8 min ago" },
  { name: "Sol", avatar: FACES[4], when: "12 min ago" },
  { name: "Omar", when: "15 min ago" },
];

const ISSUES = [
  {
    title: "Defaults do the heavy lifting",
    date: "Issue 42 · This week",
    excerpt: "The settings nobody touches end up defining your product more than the features you debate for weeks — so choose them deliberately.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    tag: "Design",
  },
  { title: "The case for smaller releases", date: "Issue 41", excerpt: "" },
  { title: "First-run experiences, revisited", date: "Issue 40", excerpt: "" },
];

export default function NewsletterDemo({
  variant = "portraits",
  reveal = "immediate",
  rounded = true,
}: {
  variant?: NewsletterVariant;
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
}) {
  const subscribe = () => new Promise<void>((resolve) => setTimeout(resolve, 900));
  const frame = cn("max-w-5xl", rounded && "rounded-[28px]");

  if (variant === "spotlight") {
    return (
      <Newsletter variant="spotlight" reveal={reveal} className={frame}>
        <Newsletter.Heading>Your Thursday read, worth opening</Newsletter.Heading>
        <Newsletter.Intro>
          A weekly note on making products people stick with. No filler, no chain letters, and you can opt out anytime.
        </Newsletter.Intro>
        <Newsletter.Form onSubscribe={subscribe} action="Sign up free" />
        <Newsletter.Proof avatars={FACES}>24,000 founders and designers subscribe</Newsletter.Proof>
        <Newsletter.Ticker items={JOINED} />
      </Newsletter>
    );
  }

  if (variant === "issues") {
    return (
      <Newsletter variant="issues" reveal={reveal} className={cn(frame, rounded && "border border-border")}>
        <Newsletter.Heading>Notes on building with care</Newsletter.Heading>
        <Newsletter.Intro>
          Writing on product, craft and the little choices that add up over time. Try the newest one before you commit.
        </Newsletter.Intro>
        <Newsletter.Form onSubscribe={subscribe} action="Subscribe" />
        <Newsletter.Proof avatars={FACES}>24,000 readers and counting</Newsletter.Proof>
        <Newsletter.Issues items={ISSUES} />
      </Newsletter>
    );
  }

  return (
    <Newsletter variant="portraits" portraits={PORTRAITS} reveal={reveal} className={frame}>
      <Newsletter.Heading>24,000 makers read this every week</Newsletter.Heading>
      <Newsletter.Intro>
        One concise weekly note on product thinking, design and building with care. Free to read, and one click to leave.
      </Newsletter.Intro>
      <Newsletter.Form onSubscribe={subscribe} />
      <Newsletter.Proof avatars={FACES}>Read by teams at Fernway, Quillo and Brightpath</Newsletter.Proof>
    </Newsletter>
  );
}
