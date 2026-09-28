"use client";

import { HeroCarousel, type HeroSlide } from "@/components/custom/blocks/HeroCarouselBlock";

const SLIDES: HeroSlide[] = [
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    alt: "Snowy summits catching dawn light over low cloud",
    title: "Dawn on the crater's edge",
    description: "An early start gets you to the edge as colour floods the valley. Hot coffee waits up top.",
    heading: (
      <>
        Watch the dawn
        <br />
        from the summit
      </>
    ),
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    alt: "Mist drifting across dark ridgelines and forest",
    title: "A misty hike along the crest",
    description: "A six-kilometre trail along the backbone of the range. Firm footing, no climbing.",
    heading: (
      <>
        Hike the crest
        <br />
        before the crowds arrive
      </>
    ),
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
    alt: "A highway winding between red canyon walls toward distant peaks",
    title: "Canyon off-road run",
    description: "Ride an open-top jeep down the gorge until the pavement gives way to dirt track.",
    heading: (
      <>
        Follow the gorge
        <br />
        until the asphalt runs out
      </>
    ),
    position: "center 60%",
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
    alt: "Snow-capped peaks beneath a sky full of stars",
    title: "Night sky from camp",
    description: "After dark the whole trip goes still. Warm blankets, a camp stove and no glow for miles.",
    heading: (
      <>
        Wait for nightfall,
        <br />
        you won't regret it
      </>
    ),
  },
];

const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg", alt: "" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg", alt: "" },
];

export default function HeroCarouselDemo({
  reveal = "immediate",
  interval = 5000,
  accent,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  /** Milliseconds between slides; 0 turns autoplay off. */
  interval?: number;
  /** Pins the accent; the theme's primary by default. */
  accent?: string;
}) {
  return (
    <HeroCarousel
      reveal={reveal}
      interval={interval}
      accent={accent}
      eyebrow="Small-group treks in the mountains"
      heading={
        <>
          Watch the dawn
          <br />
          from the summit
        </>
      }
      slides={SLIDES}
      intro="Three days in the mountains with a local guide who knows every path: dawn at the crater, a hike along the crest and a night sky with no glow for miles."
      avatars={AVATARS}
      avatarsLabel="50+ travellers this season"
      cta={{ label: "Reserve a spot", href: "#book" }}
    />
  );
}
