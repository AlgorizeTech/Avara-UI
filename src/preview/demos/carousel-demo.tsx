"use client";

import {
  CustomCarousel,
  HeroCarousel,
  ImageCarousel,
  RadialCarousel,
} from "@/components/custom/carousel";
import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";

type CarouselType = "image" | "hero" | "thumbnails" | "fluid" | "radial";
type ThumbPosition = "bottom" | "left" | "right";

const sampleImages = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
];

const sampleSlides = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function CarouselDemo({
  carouselType = "image",
  thumbPosition = "bottom",
}: {
  carouselType?: CarouselType;
  thumbPosition?: ThumbPosition;
}) {
  return (
    <div className="w-full">
      {carouselType === "image" && (
        <div className="w-full rounded-xl overflow-hidden border dark:border-zinc-800 shadow-sm">
          <ImageCarousel
            images={sampleImages}
            autoPlay={true}
            autoPlayInterval={3000}
          />
        </div>
      )}

      {carouselType === "hero" && (
        <div className="w-full rounded-xl overflow-hidden border dark:border-zinc-800 shadow-sm">
          <HeroCarousel slides={sampleSlides} autoPlay={true} />
        </div>
      )}

      {carouselType === "thumbnails" && (
        <div className="w-full rounded-xl overflow-hidden border dark:border-zinc-800 shadow-sm">
          <CustomCarousel items={sampleSlides} imageButtonPosition={thumbPosition} />
        </div>
      )}

      {carouselType === "fluid" && (
        <FluidGlassSlider className="rounded-xl border dark:border-zinc-800 shadow-sm w-full" />
      )}

      {carouselType === "radial" && (
        <div className="w-full rounded-xl overflow-hidden border dark:border-zinc-800 shadow-sm bg-zinc-950/5 dark:bg-zinc-900/30">
          <RadialCarousel autoPlay={true} autoPlayInterval={3500} />
        </div>
      )}
    </div>
  );
}

