"use client";

import {
  TextAnimation,
  TextAnimationProps,
} from "@/components/custom/blocks/TextAnimationBlock";

export default function TextAnimationDemo({
  variant = "typewriter",
  text = "Better Experiences",
  textColor = "#0f172a",
  animKey = 0,
}: {
  variant?: TextAnimationProps["variant"];
  text?: string;
  textColor?: string;
  /** Incremented to force a remount and replay the animation. */
  animKey?: number;
}) {
  return (
    <div className="w-full min-h-[300px] bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      <TextAnimation
        key={animKey}
        text={text}
        variant={variant}
        className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl"
        style={{ color: textColor }}
      />
    </div>
  );
}
