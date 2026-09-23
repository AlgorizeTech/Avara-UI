"use client";

import { CollageHero } from "@/components/custom/blocks/CollageHeroBlock";
import { cn } from "@/lib/utils";

const PHOTOS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148862/pexels-photo-3661193-1790148865106.jpg", alt: "Wooden dinosaurs standing on a stack of books" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148867/pexels-photo-3661387-1790148865107.jpg", alt: "A child playing with wooden blocks on the floor", position: "center 40%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/pexels-photo-8612967-1790148865108.jpg", alt: "Children painting together at a low table" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/pexels-photo-8535214-1790148865108.jpg", alt: "A teacher helping a girl with her painting", position: "40% top" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/pexels-photo-3661286-1790148865107.jpg", alt: "A boy holding a wooden dinosaur" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148866/pexels-photo-8613317-1790148865109.jpg", alt: "Children sitting on the grass with their toys" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148862/pexels-photo-8535227-1790148865108.jpg", alt: "A girl smiling beside a paper lion on the wall", position: "center 35%" },
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
