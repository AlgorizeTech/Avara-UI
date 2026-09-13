"use client";

import React from "react";
import { ProductDetails, ProductDetailsVariant } from "@/components/custom/blocks/ProductDetailsBlock";

export default function ProductDetailsDemo({ variant = "color-sync-gallery" }: { variant?: ProductDetailsVariant }) {
  return <ProductDetails variant={variant} />;
}
