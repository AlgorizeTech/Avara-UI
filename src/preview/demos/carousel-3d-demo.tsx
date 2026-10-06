"use client";

import {
  type CarouselItem,
  ThreeDCarousel,
  type ThreeDCarouselProps,
} from "@/components/custom/blocks/ThreeDCarouselBlock";
import { accentStyle } from "@/lib/accent";

const sampleItems: CarouselItem[] = [
  {
    id: "c1",
    category: "Nature",
    title: "Misty Pine Forest",
    description:
      "Early morning fog weaving through dense evergreen woodland trees.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "c2",
    category: "Wilderness",
    title: "Lush River Valley",
    description:
      "Sunbeams streaming through valley clouds onto pristine forest waters.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "c3",
    category: "Landscape",
    title: "Autumn Woodland Path",
    description:
      "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "c4",
    category: "Sanctuary",
    title: "Cascading Mountain Falls",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "c5",
    category: "Expedition",
    title: "Emerald Mountain Peak",
    description:
      "Panoramic views of majestic mountain ridges rising into crisp morning skies.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function Carousel3DDemo({
  autoPlay = true,
  autoPlayInterval = 4000,
  showArrows = true,
  showDots = true,
  itemCount,
  color = "primary",
}: Pick<
  ThreeDCarouselProps,
  "autoPlay" | "autoPlayInterval" | "showArrows" | "showDots"
> & {
  /** Trims the deck so you can see how the fan tightens with fewer cards. */
  itemCount?: number;
  /** Accent from the gallery's colour picker. */
  color?: string;
}) {
  const items = itemCount ? sampleItems.slice(0, itemCount) : sampleItems;

  return (
    // ThreeDCarousel is already written against --primary (active ring, tag
    // pill, arrows, dots), so repointing the token here recolours all of it.
    <div
      style={accentStyle(color)}
      className="w-full flex items-center justify-center bg-muted/40 py-8 sm:py-12 px-4 md:px-8 relative overflow-hidden min-h-[600px] rounded-3xl border border-border transition-colors duration-300"
    >
      {/* Subtle Ambient Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <ThreeDCarousel
          key={`${autoPlay}-${autoPlayInterval}-${items.length}`}
          items={items}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
          showArrows={showArrows}
          showDots={showDots}
        />
      </div>
    </div>
  );
}
