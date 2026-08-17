"use client";

import {
  SkeletonAnimation,
  SkeletonBlock,
  SkeletonVariant,
} from "@/components/custom/blocks/SkeletonBlock";

export default function SkeletonDemo({
  variant = "card",
  animation = "shimmer",
}: {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] relative z-10">
      {variant === "custom" ? (
        <div className="flex gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900 shadow-sm w-full max-w-sm">
          <SkeletonBlock
            width={64}
            height={64}
            radius="1rem"
            animation={animation}
            variant="custom"
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
          className={variant === "rect" ? "max-w-md w-full h-48" : ""}
        />
      )}
    </div>
  );
}
