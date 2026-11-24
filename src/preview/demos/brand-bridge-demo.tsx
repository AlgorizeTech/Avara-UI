"use client";

import {
  BrandBridge,
  BRANDS,
  type BrandBridgeProps,
} from "@/components/custom/blocks/BrandBridgeBlock";

export default function BrandBridgeDemo({
  variant = "default",
  title,
  description,
  ...props
}: BrandBridgeProps & { variant?: "default" | "eight-brands" }) {
  const isEight = variant === "eight-brands";
  const brands = isEight ? BRANDS : undefined;
  const resolvedTitle =
    title ?? (isEight ? "Entire EcoSystem" : "Unified Workspace");
  const resolvedDescription =
    description ??
    (isEight
      ? "Orchestrate up to eight connected services simultaneously with live data comets and magnetic wire routing."
      : "Link your daily stack into a single live pipeline. Click any app to wire it in, or click again to disconnect.");

  return (
    <div className="w-full min-h-[460px] p-4 sm:p-8 flex items-center justify-center">
      <BrandBridge
        brands={brands}
        title={resolvedTitle}
        description={resolvedDescription}
        {...props}
      />
    </div>
  );
}
