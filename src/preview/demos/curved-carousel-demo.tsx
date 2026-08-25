"use client";

import { CurvedCarousel } from "@/components/custom/blocks/CurvedCarouselBlock";

export default function CurvedCarouselDemo({
  variant = "arc-sweep",
  color = "primary",
}: {
  variant?: "arc-sweep" | "infinite-marquee";
  color?: string;
}) {
  return (
    <div className="w-full max-w-full p-0">
      <CurvedCarousel variant={variant} color={color} className="w-full" />
    </div>
  );
}
