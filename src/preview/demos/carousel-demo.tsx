"use client";

import {
  CustomCarousel,
  HeroCarousel,
  ImageCarousel,
} from "@/components/custom/carousel";
import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";

type CarouselType = "image" | "hero" | "thumbnails" | "fluid";
type ThumbPosition = "bottom" | "left" | "right";

const sampleImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
];

const sampleSlides = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
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
    </div>
  );
}
