"use client";

import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Small,
} from "@/components/custom/blocks/TypographyBlock";

export default function TypographyDemo({
  example,
}: {
  /** Isolates one family of elements instead of the full article. */
  example?:
    | "article"
    | "headings"
    | "paragraph"
    | "blockquote"
    | "list"
    | "supporting";
}) {
  if (example && example !== "article") {
    return (
      <div className="w-full min-h-[400px] relative z-10 overflow-hidden p-6 sm:p-10">
        <div className="mx-auto max-w-2xl">
          {example === "headings" && (
            <>
              <H1>The Elements of UI</H1>
              <H2>Why semantic tags matter</H2>
              <H3>Key benefits</H3>
              <H4>A minor aside</H4>
            </>
          )}

          {example === "paragraph" && (
            <>
              <Lead>
                A comprehensive guide to composing beautiful web applications
                using modular design systems.
              </Lead>
              <P>
                Typography is the foundation of any good interface. Rather than
                scattering raw Tailwind classes like{" "}
                <InlineCode>text-4xl font-extrabold tracking-tight</InlineCode>{" "}
                across hundreds of files, standardized components keep the
                rhythm predictable everywhere.
              </P>
              <P>
                A second paragraph picks up its own top margin automatically, so
                you never hand-tune spacing between blocks.
              </P>
            </>
          )}

          {example === "blockquote" && (
            <Blockquote>
              &quot;Good typography is like a good map. It guides the reader
              gracefully from start to finish without calling attention to
              itself.&quot;
            </Blockquote>
          )}

          {example === "list" && (
            <List>
              <li>Consistent top and bottom margins automatically applied.</li>
              <li>Perfect dark mode contrast ratios.</li>
              <li>Semantic HTML attributes preserved.</li>
            </List>
          )}

          {example === "supporting" && (
            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <Large>Written by Nexus</Large>
              <div className="flex flex-col items-end">
                <Small>Author Status: Verified</Small>
                <Muted>Published April 2026</Muted>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

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
