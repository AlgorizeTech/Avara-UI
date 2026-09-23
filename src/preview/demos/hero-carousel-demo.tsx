"use client";

import { HeroCarousel, type HeroSlide } from "@/components/custom/blocks/HeroCarouselBlock";

const SLIDES: HeroSlide[] = [
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    alt: "Snow peaks at sunrise above a sea of cloud",
    title: "Crater rim at first light",
    description: "Up before dawn and on the rim as the valley fills with colour. Coffee at the top.",
    heading: (
      <>
        Wake up above
        <br />
        the clouds
      </>
    ),
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    alt: "Fog rolling over dark ridges and forest",
    title: "Ridge walk through the mist",
    description: "Six kilometres along the spine of the range. Steady ground, no scrambling.",
    heading: (
      <>
        Walk the ridge
        <br />
        while it is still yours
      </>
    ),
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
    alt: "A road running through a red rock canyon towards the mountains",
    title: "The canyon by 4×4",
    description: "A jeep run down the canyon road to where the tarmac ends and the trail begins.",
    heading: (
      <>
        Drive the canyon
        <br />
        to the end of the road
      </>
    ),
    position: "center 60%",
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
    alt: "Snowy mountains under a starry night sky",
    title: "Stars from the hut",
    description: "The night is the quiet part of the trip. Blankets, a stove, and no light for fifty miles.",
    heading: (
      <>
        Stay for the dark,
        <br />
        it is worth it
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
  accent = "#f2c14e",
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  /** Milliseconds between slides; 0 turns autoplay off. */
  interval?: number;
  /** The colour of the eyebrow pip and the focus rings. */
  accent?: string;
}) {
  return (
    <HeroCarousel
      reveal={reveal}
      interval={interval}
      accent={accent}
      eyebrow="Guided trips in the high country"
      heading={
        <>
          Wake up above
          <br />
          the clouds
        </>
      }
      slides={SLIDES}
      intro="Three days in the high country with a guide who grew up there: sunrise on the rim, a ridge above the weather and a night with no light for fifty miles."
      avatars={AVATARS}
      avatarsLabel="50+ people joined this year"
      cta={{ label: "Book the trip", href: "#book" }}
    />
  );
}
