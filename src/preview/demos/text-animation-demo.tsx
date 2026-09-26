"use client";

import {
  TextAnimation,
  TextAnimationProps,
} from "@/components/custom/blocks/TextAnimationBlock";
import React from "react";

const ALL_VARIANTS = [
  "typewriter",
  "blur-reveal",
  "wave",
  "pop-in",
  "flip",
  "spin-in",
  "blur-in-up",
] as const;

export default function TextAnimationDemo({
  variant = "typewriter",
  text = "Better Experiences",
  textColor,
  animKey = 0,
  duration,
  delay,
  as,
  showAll,
}: {
  variant?: TextAnimationProps["variant"];
  text?: string;
  textColor?: string;
  /** Incremented to force a remount and replay the animation. */
  animKey?: number;
  duration?: number;
  delay?: number;
  /** Underlying element the text renders into (defaults to `p`). */
  as?: string;
  /** Renders every variant in one frame. */
  showAll?: "variants";
}) {
  const colorClass = textColor ? "" : "text-foreground";

  if (showAll === "variants") {
    return (
      <div className="w-full min-h-[300px] bg-background rounded-2xl border border-border flex flex-col gap-8 p-8 overflow-hidden">
        {ALL_VARIANTS.map((v) => (
          <div key={v} className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              variant=&quot;{v}&quot;
            </span>
            <TextAnimation
              text={text}
              variant={v}
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${colorClass}`}
              style={textColor ? { color: textColor } : undefined}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[300px] bg-background rounded-2xl border border-border flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      <TextAnimation
        key={animKey}
        as={as as React.ElementType | undefined}
        text={text}
        variant={variant}
        duration={duration}
        delay={delay}
        className={`text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl ${colorClass}`}
        style={textColor ? { color: textColor } : undefined}
      />
    </div>
  );
}
