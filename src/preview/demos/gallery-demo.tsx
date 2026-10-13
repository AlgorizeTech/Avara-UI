"use client";

import { Gallery } from "@/components/custom/blocks/GalleryBlock";
import { toBlockColor } from "@/lib/accent";

interface GalleryDemoProps {
  color?: string;
  variant?: "orbit" | "moving-bento" | "circular-reel" | "pill-carousel" | "arc-carousel" | "arc-carousel-gallery";
  swapInterval?: number;
  gap?: number;
  idleRotationSpeed?: number;
  scrollSensitivity?: number;
  ringThickness?: number;
  grayscale?: boolean;
  cardBorderRadius?: number;
  activeBorderWidth?: number;
  transitionDuration?: number;
  autoSlide?: boolean;
  autoPlayInterval?: number;
  curve?: number;
  cardSize?: number;
  autoScrollSpeed?: number;
}

export default function GalleryDemo({
  color: pickedColor = "primary",
  variant = "orbit",
  swapInterval = 3000,
  gap = 12,
  idleRotationSpeed = 5,
  scrollSensitivity = 0.06,
  ringThickness = 37,
  grayscale = false,
  cardBorderRadius = 200,
  activeBorderWidth = 6,
  transitionDuration = 0.6,
  autoSlide = true,
  autoPlayInterval = 3000,
  curve = -200,
  cardSize = 220,
  autoScrollSpeed = 0.22,
}: GalleryDemoProps) {
  const color = toBlockColor(pickedColor);

  if (variant === "arc-carousel" || variant === "arc-carousel-gallery") {
    return (
      <div className="w-full -my-2 overflow-hidden rounded-2xl bg-background">
        <Gallery
          variant="arc-carousel"
          color={color}
          curve={curve}
          cardSize={cardSize}
          autoScrollSpeed={autoScrollSpeed}
          autoSlide={autoSlide}
          className="w-full"
        />
      </div>
    );
  }

  if (variant === "pill-carousel") {
    return (
      <div className="w-full -my-2 overflow-hidden rounded-2xl bg-background">
        <Gallery
          variant="pill-carousel"
          color={color}
          cardBorderRadius={cardBorderRadius}
          activeBorderWidth={activeBorderWidth}
          transitionDuration={transitionDuration}
          autoSlide={autoSlide}
          autoPlayInterval={autoPlayInterval}
          className="w-full"
        />
      </div>
    );
  }

  if (variant === "circular-reel") {
    return (
      <div className="w-full -my-2 overflow-hidden rounded-2xl">
        <Gallery
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
        <Gallery
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
      <Gallery
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
