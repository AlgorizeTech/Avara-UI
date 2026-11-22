"use client";

import type { MapsColor, MapsVariant } from "@/components/custom/blocks/Maps";
import dynamic from "next/dynamic";

const Maps = dynamic(() => import("@/components/custom/blocks/Maps"), {
  ssr: false,
});

export default function MapsDemo({
  variant = "route-planner",
  color = "primary",
}: {
  variant?: MapsVariant;
  color?: MapsColor | string;
}) {
  return (
    <div className="w-full transition-all duration-300 bg-transparent">
      <Maps key={`${variant}-${color}`} variant={variant} color={color} />
    </div>
  );
}
