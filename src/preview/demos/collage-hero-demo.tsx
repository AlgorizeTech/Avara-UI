"use client";

import { CollageHero } from "@/components/custom/blocks/CollageHeroBlock";
import { cn } from "@/lib/utils";

// Photos from Pexels (free to use): a kindergarten, its toys and its people.
const pexels = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const PHOTOS = [
  { src: pexels(3661193), alt: "Wooden dinosaurs standing on a stack of books" },
  { src: pexels(3661387), alt: "A child playing with wooden blocks on the floor", position: "center 40%" },
  { src: pexels(8612967), alt: "Children painting together at a low table" },
  { src: pexels(8535214), alt: "A teacher helping a girl with her painting", position: "40% top" },
  { src: pexels(3661286), alt: "A boy holding a wooden dinosaur" },
  { src: pexels(8613317), alt: "Children sitting on the grass with their toys" },
  { src: pexels(8535227), alt: "A girl smiling beside a paper lion on the wall", position: "center 35%" },
];

export default function CollageHeroDemo({
  reveal = "immediate",
  rounded = true,
  accent = "#5b4bf0",
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
  /** The violet of the badge, the first coloured word and the pills. */
  accent?: string;
}) {
  return (
    <CollageHero
      reveal={reveal}
      accent={accent}
      brand="KinderNest"
      heading={
        <>
          A happy space
          <br />
          to <em>explore</em> and <em>create</em>
        </>
      }
      tags={[{ label: "#learn" }, { label: "#enjoy" }, { label: "#play" }]}
      caption="Playful and caring for little learners"
      photos={PHOTOS}
      quote="Our kindergarten is a warm and welcoming environment where children feel safe, inspired, and excited to learn every day."
      scrollLabel="Scroll down"
      video={{
        eyebrow: "Watch video",
        text: "Watch how a day unfolds at our friendly kindergarten",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1",
        title: "A day at KinderNest",
      }}
      className={cn("max-w-6xl", rounded && "rounded-[28px] border border-black/[0.06] dark:border-white/10")}
    />
  );
}
