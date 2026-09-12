"use client";

import { cn } from "@/lib/utils";
import {
  SkeletonAnimation,
  SkeletonBlock,
  SkeletonVariant,
} from "@/components/custom/blocks/SkeletonBlock";

export default function SkeletonDemo({
  variant = "card",
  animation = "shimmer",
  width,
  height,
  radius,
  className,
}: {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] relative z-10">
      {variant === "custom" ? (
        <div className="flex gap-4 p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm w-full max-w-sm">
          <SkeletonBlock
            width={width ?? 64}
            height={height ?? 64}
            radius={radius ?? "1rem"}
            animation={animation}
            variant="custom"
            className={className}
          />
          <div className="flex flex-col gap-2 flex-1 pt-1">
            <SkeletonBlock
              width="100%"
              height={16}
              radius="4px"
              animation={animation}
              variant="custom"
            />
            <SkeletonBlock
              width="70%"
              height={16}
              radius="4px"
              animation={animation}
              variant="custom"
            />
            <SkeletonBlock
              width="40%"
              height={12}
              radius="4px"
              animation={animation}
              variant="custom"
              className="mt-2"
            />
          </div>
        </div>
      ) : (
        <SkeletonBlock
          key={`${variant}-${animation}`}
          variant={variant}
          animation={animation}
          width={width}
          height={height}
          radius={radius}
          className={cn(variant === "rect" && !height && !width && "max-w-md w-full h-48", className)}
        />
      )}
    </div>
  );
}
