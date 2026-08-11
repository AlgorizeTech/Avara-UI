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
  variant = "flip-up",
  align = "center",
  customSize = "",
  customText = "The quick brown fox jumps over the lazy dog.",
  animationKey = 0,
  color = "primary",
  showAll,
  variants,
}: {
  tag?: TypographyTag;
  variant?: TypographyVariant;
  align?: TypographyAlign;
  customSize?: string;
  customText?: string;
  animationKey?: number;
  color?: TypographyColor | string;
  /**
   * Renders every step of one axis in a single frame. `variant` is NOT one of
   * them — animations are grouped by family instead, via `variants` below.
   */
  showAll?: "tags" | "align" | "sizes";
  /**
   * A small family of related animations to show together (2–5), each labelled
   * with its variant name. Grouping similar effects keeps them comparable;
   * dumping all nine in one frame does not (Rule 14).
   */
  variants?: TypographyVariant[];
}) {
  if (variants?.length) {
    return (
      <div className="w-full min-h-[350px] relative z-10 overflow-hidden p-6 sm:p-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {variants.map((v) => (
            <div key={v} className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
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
                variant="fade-up"
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
                  variant="fade-up"
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
                  variant="fade-up"
                  align="left"
                  size={s}
                  text="The quick brown fox."
                  color={color}
                />
              ),
            }));

    return (
      <div className="w-full min-h-[350px] relative z-10 overflow-hidden p-6 sm:p-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
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
