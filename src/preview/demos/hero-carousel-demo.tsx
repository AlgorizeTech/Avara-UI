"use client";

import { HeroCarousel, type HeroSlide } from "@/components/custom/blocks/HeroCarouselBlock";

// Photos from Unsplash (free to use): high country, from first light to the stars.
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const SLIDES: HeroSlide[] = [
  {
    image: unsplash("1506905925346-21bda4d32df4"),
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
    image: unsplash("1470071459604-3b5ec3a7fe05"),
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
    image: unsplash("1500530855697-b586d89ba3ee"),
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
    image: unsplash("1519681393784-d120267933ba"),
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

const AVATARS = [12, 32, 47, 5, 58].map((n) => ({ src: `https://i.pravatar.cc/80?img=${n}`, alt: "" }));

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
