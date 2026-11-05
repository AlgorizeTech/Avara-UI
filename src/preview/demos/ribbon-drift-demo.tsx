"use client";

import {
  RibbonDriftBlock,
  type RibbonDriftProps,
} from "@/components/custom/blocks/RibbonDriftBlock";
import { accentStyle, toBlockColor } from "@/lib/accent";

export default function RibbonDriftDemo({
  color = "primary",
  image,
  className,
  ...props
}: RibbonDriftProps) {
  const activeColor = toBlockColor(color);

  return (
    <div
      style={accentStyle(color)}
      className="w-full min-h-[580px] p-4 sm:p-8 flex items-center justify-center"
    >
      <div className="w-full max-w-2xl">
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
