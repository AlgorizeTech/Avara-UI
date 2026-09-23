"use client";

import React from "react";
import { ImageViewer, ImageViewerVariant, ThumbnailPosition } from "@/components/custom/blocks/ImageViewerBlock";

export default function ImageViewerDemo({
  variant = "inner-zoom",
  thumbnailPosition = "left",
  defaultImage,
}: {
  variant?: ImageViewerVariant;
  thumbnailPosition?: ThumbnailPosition;
  defaultImage?: number;
}) {
  return (
    <ImageViewer
      variant={variant}
      thumbnailPosition={thumbnailPosition}
      defaultImage={defaultImage}
    />
  );
}
