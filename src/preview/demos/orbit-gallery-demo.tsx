"use client";

import { OrbitGallery } from "@/components/custom/blocks/OrbitGalleryBlock";
import { toBlockColor } from "@/lib/accent";

export default function OrbitGalleryDemo({ color: pickedColor = "primary" }: { color?: string }) {
  const color = toBlockColor(pickedColor);
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <OrbitGallery
        color={color}
        badgeText="Brand & motion studio"
        badgeHref="#"
        title="Motion is the"
        titleAccent="first thing anyone reads."
        subtitle="We build identity systems and the motion that carries them — from the first frame to the shipped product."
        primaryActionLabel="Start a project"
        primaryActionHref="#"
        secondaryActionLabel="See the work"
        secondaryActionHref="#"
        className="w-full py-8 sm:py-12"
      />
    </div>
  );
}
