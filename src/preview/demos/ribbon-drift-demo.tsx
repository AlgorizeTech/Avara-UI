"use client";

import {
  RibbonDriftBlock,
  RibbonLogos,
  type RibbonDriftProps,
  type RibbonLogosProps,
} from "@/components/custom/blocks/RibbonDriftBlock";
import { accentStyle, toBlockColor } from "@/lib/accent";
import { cn } from "@/lib/utils";

export default function RibbonDriftDemo({
  variant = "default",
  layout = "default",
  color = "primary",
  image,
  className,
  ...props
}: RibbonDriftProps & RibbonLogosProps & { layout?: "default" | "cross-logos" }) {
  const activeColor = toBlockColor(color);
  const isCrossLogos = variant === "cross-logos" || layout === "cross-logos";

  if (isCrossLogos) {
    return (
      <div
        style={accentStyle(color)}
        className="w-full min-h-[460px] p-2 sm:p-6 flex items-center justify-center"
      >
        <div className="w-full max-w-4xl">
          <RibbonLogos
            title="Trusted by leading brands worldwide"
            color={activeColor}
            speed={48}
            pauseOnHover={true}
            className={cn("w-full rounded-2xl sm:rounded-3xl", className)}
            {...props}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={accentStyle(color)}
      className="w-full min-h-[580px] p-2 sm:p-6 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl">
        <RibbonDriftBlock
          color={activeColor}
          image={image}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
}
