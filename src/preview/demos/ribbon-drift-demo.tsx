"use client";

import {
  RibbonDriftBlock,
  type RibbonDriftProps,
} from "@/components/custom/blocks/RibbonDriftBlock";

export default function RibbonDriftDemo({
  color = "primary",
  image,
  className,
  ...props
}: RibbonDriftProps) {
  return (
    <div className="w-full min-h-[580px] p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <RibbonDriftBlock
          color={color}
          image={image}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
}
