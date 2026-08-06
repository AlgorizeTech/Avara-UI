"use client";

import {
  AnimatedTypographyBlock,
  TypographyAlign,
  TypographyColor,
  TypographyTag,
  TypographyVariant,
} from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function AnimatedTypographyDemo({
  tag = "h1",
  variant = "flip-up",
  align = "center",
  customSize = "",
  customText = "The quick brown fox jumps over the lazy dog.",
  animationKey = 0,
  color = "primary",
}: {
  tag?: TypographyTag;
  variant?: TypographyVariant;
  align?: TypographyAlign;
  customSize?: string;
  customText?: string;
  animationKey?: number;
  color?: TypographyColor | string;
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[350px] relative z-10 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col justify-center">
        {/* The key prop forces React to remount the component, re-triggering the CSS/JS animations */}
        <AnimatedTypographyBlock
          key={`${animationKey}-${variant}-${tag}-${align}`}
          as={tag}
          variant={variant}
          align={align}
          size={customSize}
          text={customText}
          color={color}
        />
      </div>
    </div>
  );
}
