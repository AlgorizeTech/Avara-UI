"use client";

import { HeroCarousel, type HeroSlide } from "@/components/custom/blocks/HeroCarouselBlock";
import { resolveAccent } from "@/lib/accent";

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
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Elena Vance",
    name: "Elena Vance",
    designation: "Alpine Trekker",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    name: "Tom Hardy",
    designation: "Summit Guide",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    name: "Mara Jade",
    designation: "Trail Explorer",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
    alt: "Leo Silva",
    name: "Leo Silva",
    designation: "Photographer",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg",
    alt: "June Carter",
    name: "June Carter",
    designation: "Mountain Guide",
  },
];

export default function HeroCarouselDemo({
  reveal = "immediate",
  interval = 5000,
  accent,
  color,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  /** Milliseconds between slides; 0 turns autoplay off. */
  interval?: number;
  /** Pins the accent; the theme's primary by default. */
  accent?: string;
  color?: string;
}) {
  const resolvedAccent = accent ?? resolveAccent(color) ?? undefined;

  return (
    <HeroCarousel
      reveal={reveal}
      interval={interval}
      accent={resolvedAccent}
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
