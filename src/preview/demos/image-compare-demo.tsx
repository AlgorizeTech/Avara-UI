"use client";

import {
  ImageCompare,
  type ImageCompareColor,
  type ImageCompareVariant,
} from "@/components/custom/blocks/ImageCompareBlock";

export default function ImageCompareDemo({
  variant = "classic-slider",
  color = "primary",
  beforeLabel,
  afterLabel,
}: {
  variant?: ImageCompareVariant;
  color?: ImageCompareColor | string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="w-full max-w-full p-0">
      <ImageCompare
        key={`${variant}-${color}`}
        variant={variant}
        color={color}
        beforeLabel={beforeLabel}
        afterLabel={afterLabel}
        className="w-full"
      />
    </div>
  );
}
