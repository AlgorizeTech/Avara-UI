"use client";

import { OrbitGallery } from "@/components/custom/blocks/OrbitGalleryBlock";
import { toBlockColor } from "@/lib/accent";

interface OrbitGalleryDemoProps {
  color?: string;
  variant?: "orbit" | "moving-bento";
  swapInterval?: number;
  gap?: number;
}

export default function OrbitGalleryDemo({
  color: pickedColor = "primary",
  variant = "orbit",
  swapInterval = 3000,
  gap = 12,
}: OrbitGalleryDemoProps) {
  const color = toBlockColor(pickedColor);

  if (variant === "moving-bento") {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-background p-2 sm:p-4">
        <OrbitGallery
          variant="moving-bento"
          color={color}
          swapInterval={swapInterval}
          gap={gap}
          className="w-full py-0 sm:py-0"
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background">
      <OrbitGallery
        variant="orbit"
        color={color}
        badgeText="Identity & animation studio"
        badgeHref="#"
        title="Movement is what"
        titleAccent="people notice first."
        subtitle="We design brand identities and the animation that brings them to life — from early sketches to the live release."
        primaryActionLabel="Work with us"
        primaryActionHref="#"
        secondaryActionLabel="View projects"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
