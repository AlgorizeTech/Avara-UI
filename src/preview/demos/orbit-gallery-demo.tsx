"use client";

import { OrbitGallery } from "@/components/custom/blocks/OrbitGalleryBlock";
import { toBlockColor } from "@/lib/accent";

export default function OrbitGalleryDemo({ color: pickedColor = "primary" }: { color?: string }) {
  const color = toBlockColor(pickedColor);
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background">
      <OrbitGallery
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
