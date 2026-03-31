"use client";

import {
  CustomCarousel,
  HeroCarousel,
  ImageCarousel,
} from "@/components/custom/carousel";
import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

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

export function CarouselShowcase() {
  const [carouselType, setCarouselType] = useState<CarouselType>("image");
  const [thumbPosition, setThumbPosition] = useState<ThumbPosition>("bottom");

  // Dynamic code generation based on selected state
  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    if (carouselType === "image") {
      return `"use client";

import { ImageCarousel } from "@/components/custom/carousel";

export default function CarouselDemo()${typeDef} {
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-xl overflow-hidden shadow-sm">
      <ImageCarousel
        images={images}
        autoPlay={true}
        autoPlayInterval={3000}
      />
    </div>
  );
}`;
    }

    if (carouselType === "hero") {
      return `"use client";

import { HeroCarousel } from "@/components/custom/carousel";

export default function CarouselDemo()${typeDef} {
  const slides = [
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
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border">
      <HeroCarousel slides={slides} autoPlay={true} />
    </div>
  );
}`;
    }

    if (carouselType === "thumbnails") {
      return `"use client";

import { CustomCarousel } from "@/components/custom/carousel";

export default function CarouselDemo()${typeDef} {
  const items = [
    {
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      title: "Ocean Paradise",
      des: "Experience the serenity of crystal-clear waters.",
    },
    {
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
      title: "Mountain Summit",
      des: "Conquer new heights and witness breathtaking views.",
    },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border">
      <CustomCarousel
        items={items}
        imageButtonPosition="${thumbPosition}"
      />
    </div>
  );
}`;
    }

    if (carouselType === "fluid") {
      return `"use client";

import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";

export default function CarouselDemo()${typeDef} {
  return (
    <div className="w-full">
      <FluidGlassSlider className="rounded-xl border shadow-sm" />
    </div>
  );
}`;
    }
    return "";
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        {/* Carousel Type Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Carousel Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {[
              { id: "image", label: "Standard Image" },
              { id: "hero", label: "Hero Slider" },
              { id: "thumbnails", label: "Thumbnails" },
              { id: "fluid", label: "Fluid Glass" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setCarouselType(v.id as CarouselType)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  carouselType === v.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Position Selector (Only shows when "thumbnails" is selected) */}
        {carouselType === "thumbnails" && (
          <div className="flex flex-col gap-2 animate-in fade-in duration-300">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Thumbnail Position
            </label>
            <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
              {(["bottom", "left", "right"] as ThumbPosition[]).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setThumbPosition(pos)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    thumbPosition === pos
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="Carousel"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className="w-full">
          {carouselType === "image" && (
            <div className="max-w-4xl mx-auto border dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
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
              <CustomCarousel
                items={sampleSlides}
                imageButtonPosition={thumbPosition}
              />
            </div>
          )}

          {carouselType === "fluid" && (
            <FluidGlassSlider className="rounded-xl border dark:border-zinc-800 shadow-sm w-full" />
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
