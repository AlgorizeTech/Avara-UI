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
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg", alt: "A reader" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg", alt: "A reader" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg", alt: "A reader" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg", alt: "A reader" },
];

const JOINED = [
  { name: "Ana", avatar: FACES[0], when: "just now" },
  { name: "Tom", avatar: FACES[1], when: "2 min ago" },
  { name: "Mei", avatar: FACES[2], when: "5 min ago" },
  { name: "Raj", avatar: FACES[3], when: "8 min ago" },
  { name: "Lea", avatar: FACES[4], when: "12 min ago" },
  { name: "Noah", when: "15 min ago" },
];

const ISSUES = [
  {
    title: "The quiet power of defaults",
    date: "Issue 42 · This week",
    excerpt: "Why the choices you never make shape your product more than the ones you agonise over — and how to pick them well.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    tag: "Design",
  },
  { title: "Shipping less, on purpose", date: "Issue 41", excerpt: "" },
  { title: "Notes on onboarding", date: "Issue 40", excerpt: "" },
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
        <Newsletter.Heading>Get the good stuff, every Thursday</Newsletter.Heading>
        <Newsletter.Intro>
          One email a week on building products people keep using. No fluff, no forwards, unsubscribe in one click.
        </Newsletter.Intro>
        <Newsletter.Form onSubscribe={subscribe} action="Join free" />
        <Newsletter.Proof avatars={FACES}>Read by 24,000 designers and founders</Newsletter.Proof>
        <Newsletter.Ticker items={JOINED} />
      </Newsletter>
    );
  }

  if (variant === "issues") {
    return (
      <Newsletter variant="issues" reveal={reveal} className={cn(frame, rounded && "border border-black/[0.06] dark:border-white/10")}>
        <Newsletter.Heading>A letter about making things well</Newsletter.Heading>
        <Newsletter.Intro>
          Essays on product, craft and the small decisions that compound. Read the latest first — then decide.
        </Newsletter.Intro>
        <Newsletter.Form onSubscribe={subscribe} action="Subscribe" />
        <Newsletter.Proof avatars={FACES}>Joined by 24,000 readers</Newsletter.Proof>
        <Newsletter.Issues items={ISSUES} />
      </Newsletter>
    );
  }

  return (
    <Newsletter variant="portraits" portraits={PORTRAITS} reveal={reveal} className={frame}>
      <Newsletter.Heading>Join 24,000 readers who ship better</Newsletter.Heading>
      <Newsletter.Intro>
        A short, sharp email every week on product, design and the craft of building. Free, and easy to leave.
      </Newsletter.Intro>
      <Newsletter.Form onSubscribe={subscribe} />
      <Newsletter.Proof avatars={FACES}>Loved by teams at Linear, Vercel and Notion</Newsletter.Proof>
    </Newsletter>
  );
}
