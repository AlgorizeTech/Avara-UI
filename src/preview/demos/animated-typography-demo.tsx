"use client";

import {
  AnimatedTypographyBlock,
  TypographyAlign,
  TypographyColor,
  TypographyTag,
  TypographyVariant,
} from "@/components/custom/blocks/AnimatedTypographyBlock";
import React from "react";

const ALL_TAGS: TypographyTag[] = ["h1", "h2", "h3", "p", "blockquote"];
const ALL_ALIGN: TypographyAlign[] = ["left", "center", "right", "justify"];
const ALL_SIZES = ["5xl", "24px", "2rem"];

export default function AnimatedTypographyDemo({
  tag = "h1",
  variant = "matrix-scramble",
  align = "center",
  customSize = "",
  customText = "The quick brown fox jumps over the lazy dog.",
  animationKey = 0,
  color = "primary",
  showAll,
  variants,
  singleVariant,
  titlePrefix,
  words,
}: {
  tag?: TypographyTag;
  variant?: TypographyVariant;
  align?: TypographyAlign;
  customSize?: string;
  customText?: string;
  animationKey?: number;
  color?: TypographyColor | string;
  showAll?: "tags" | "align" | "sizes";
  variants?: TypographyVariant[];
  singleVariant?: TypographyVariant;
  /** Static text before the animated part — the rotating variants read best with one. */
  titlePrefix?: string;
  /** The words the rotating variants cycle through. */
  words?: string[];
}) {
  if (singleVariant) {
    const tags: TypographyTag[] = ["h3", "h4", "p"];
    return (
      <div className="w-full min-h-[350px] relative z-10 overflow-hidden p-3 sm:p-6 md:p-10 flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl flex flex-col gap-6 items-center text-center">
          {tags.map((t) => (
            <AnimatedTypographyBlock
              key={`${animationKey}-${singleVariant}-${t}`}
              as={t}
              variant={singleVariant}
              align="center"
              text={customText}
              titlePrefix={titlePrefix}
              words={words}
              color={color}
            />
          ))}
        </div>
      </div>
    );
  }
  if (variants?.length) {
    return (
      <div className="w-full min-h-[350px] relative z-10 overflow-hidden p-3 sm:p-6 md:p-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {variants.map((v) => (
            <div key={v} className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                variant=&quot;{v}&quot;
              </span>
              <AnimatedTypographyBlock
                key={`${animationKey}-${v}`}
                as="h3"
                variant={v}
                align="left"
                size="2xl"
                text="The quick brown fox."
                color={color}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showAll) {
    const rows: Array<{ label: string; node: React.ReactNode }> =
      showAll === "tags"
        ? ALL_TAGS.map((t) => ({
            label: `as="${t}"`,
            node: (
              <AnimatedTypographyBlock
                as={t}
                variant="matrix-scramble"
                align="left"
                text="The quick brown fox."
                color={color}
              />
            ),
          }))
        : showAll === "align"
          ? ALL_ALIGN.map((a) => ({
              label: `align="${a}"`,
              node: (
                <AnimatedTypographyBlock
                  as="p"
                  variant="matrix-scramble"
                  align={a}
                  size="lg"
                  text={customText}
                  color={color}
                />
              ),
            }))
          : ALL_SIZES.map((s) => ({
              label: `size="${s}"`,
              node: (
                <AnimatedTypographyBlock
                  as="h2"
                  variant="matrix-scramble"
                  align="left"
                  size={s}
                  text="The quick brown fox."
                  color={color}
                />
              ),
            }));

    return (
      <div className="w-full min-h-[350px] relative z-10 overflow-hidden p-3 sm:p-6 md:p-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {row.label}
              </span>
              {row.node}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[350px] relative z-10 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col justify-center">
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
