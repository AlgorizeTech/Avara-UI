"use client";

import {
  Blockquote,
  H1,
  H2,
  H3,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Small,
} from "@/components/custom/blocks/TypographyBlock";

export default function TypographyDemo() {
  return (
    <div className="w-full min-h-[400px] relative z-10 overflow-hidden">
      <div className="mx-auto max-w-2xl">
        <H1>The Elements of UI</H1>
        <Lead className="mt-4">
          A comprehensive guide to composing beautiful web applications using
          modular design systems.
        </Lead>

        <P>
          Typography is the foundation of any good interface. Rather than
          scattering raw Tailwind classes like{" "}
          <InlineCode>text-4xl font-extrabold tracking-tight</InlineCode>{" "}
          across hundreds of files, utilizing standardized components ensures
          your text maintains a perfect, predictable rhythm everywhere.
        </P>

        <H2>Why semantic tags matter</H2>
        <P>
          Using the correct HTML tag is crucial for accessibility. Screen
          readers rely heavily on heading structures (
          <InlineCode>h1</InlineCode> through <InlineCode>h6</InlineCode>) to
          navigate documents.
        </P>

        <Blockquote>
          "Good typography is like a good map. It guides the reader gracefully
          from start to finish without calling attention to itself."
        </Blockquote>

        <H3>Key Benefits</H3>
        <List>
          <li>Consistent top and bottom margins automatically applied.</li>
          <li>Perfect dark mode contrast ratios.</li>
          <li>Semantic HTML attributes preserved.</li>
        </List>

        <div className="mt-12 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <Large>Written by Nexus</Large>
          <div className="flex flex-col items-end">
            <Small>Author Status: Verified</Small>
            <Muted>Published April 2026</Muted>
          </div>
        </div>
      </div>
    </div>
  );
}
