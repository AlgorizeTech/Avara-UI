"use client";

import { CollageHero } from "@/components/custom/blocks/CollageHeroBlock";
import { cn } from "@/lib/utils";

const PHOTOS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148862/pexels-photo-3661193-1790148865106.jpg", alt: "Wooden toy dinosaurs posed atop a pile of books" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148867/pexels-photo-3661387-1790148865107.jpg", alt: "A toddler building with timber blocks on the rug", position: "center 40%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/pexels-photo-8612967-1790148865108.jpg", alt: "Kids painting side by side around a small table" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/pexels-photo-8535214-1790148865108.jpg", alt: "An educator guiding a young girl's brushwork", position: "40% top" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/pexels-photo-3661286-1790148865107.jpg", alt: "A little boy clutching a toy wooden dinosaur" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148866/pexels-photo-8613317-1790148865109.jpg", alt: "Kids gathered on the lawn with their playthings" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148862/pexels-photo-8535227-1790148865108.jpg", alt: "A grinning girl next to a paper lion pinned to the wall", position: "center 35%" },
];

export default function CollageHeroDemo({
  reveal = "immediate",
  rounded = true,
  accent,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
  /** Pins the accent (badge, first coloured word, pills); the theme's primary by default. */
  accent?: string;
}) {
  return (
    <CollageHero
      reveal={reveal}
      accent={accent}
      brand="PlayMeadow"
      heading={
        <>
          A bright place
          <br />
          to <em>discover</em> and <em>imagine</em>
        </>
      }
      tags={[{ label: "#grow" }, { label: "#laugh" }, { label: "#build" }]}
      caption="Gentle, fun care for young explorers"
      photos={PHOTOS}
      quote="Our preschool is a cosy, friendly place where every child feels secure, curious and eager to discover something new each day."
      scrollLabel="Keep scrolling"
      video={{
        eyebrow: "See the film",
        text: "Follow a typical day at our cheerful little preschool",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1",
        title: "Inside PlayMeadow",
      }}
      className={cn("max-w-6xl", rounded && "rounded-[28px] border border-border")}
    />
  );
}
