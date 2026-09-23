"use client";

import { cn } from "@/lib/utils";
import {
  SkeletonAnimation,
  SkeletonBlock,
  SkeletonVariant,
} from "@/components/custom/blocks/SkeletonBlock";

const colorMap: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  lavender: "#9b8afb",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color?: string) => {
  if (!color || color === "primary" || color === "default") return undefined;
  if (color.startsWith("#")) return color;
  return colorMap[color] || undefined;
};

export default function SkeletonDemo({
  variant = "card",
  animation = "shimmer",
  color = "primary",
  width,
  height,
  radius,
  className,
}: {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  color?: string;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
}) {
  const themeColor = getThemeColor(color);
  const containerStyle: React.CSSProperties | undefined = themeColor
    ? ({ "--primary": themeColor } as React.CSSProperties)
    : undefined;

  return (
    <div
      style={containerStyle}
      className="w-full flex items-center justify-center min-h-[400px] relative z-10"
    >
      {variant === "custom" ? (
        <div className="flex gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-foreground shadow-sm w-full max-w-sm">
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
