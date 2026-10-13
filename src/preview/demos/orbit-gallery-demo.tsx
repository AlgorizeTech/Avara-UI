"use client";

import { OrbitGallery } from "@/components/custom/blocks/OrbitGalleryBlock";
import { toBlockColor } from "@/lib/accent";

interface OrbitGalleryDemoProps {
  color?: string;
  variant?: "orbit" | "moving-bento" | "circular-reel";
  swapInterval?: number;
  gap?: number;
  idleRotationSpeed?: number;
  scrollSensitivity?: number;
  ringThickness?: number;
  grayscale?: boolean;
}

export default function OrbitGalleryDemo({
  color: pickedColor = "primary",
  variant = "orbit",
  swapInterval = 3000,
  gap = 12,
  idleRotationSpeed = 5,
  scrollSensitivity = 0.06,
  ringThickness = 37,
  grayscale = false,
}: OrbitGalleryDemoProps) {
  const color = toBlockColor(pickedColor);

  if (variant === "circular-reel") {
    return (
      <div className="w-full -my-2 overflow-hidden rounded-2xl">
        <OrbitGallery
          variant="circular-reel"
          color={color}
          idleRotationSpeed={idleRotationSpeed}
          scrollSensitivity={scrollSensitivity}
          ringThickness={ringThickness}
          grayscale={grayscale}
          className="w-full"
        />
      </div>
    );
  }

  if (variant === "moving-bento") {
    return (
      <div className="w-full -my-2 overflow-hidden rounded-2xl bg-background p-2 sm:p-4">
        <OrbitGallery
          variant="moving-bento"
          color={color}
          swapInterval={swapInterval}
          gap={gap}
          className="w-full p-0 sm:p-0"
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
