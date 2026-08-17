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
      <div className="w-full relative z-10 p-4 sm:p-8">
        <div className="mx-auto max-w-2xl w-full">
          {example === "headings" && (
            <>
              <H1>Crafting High-Performance UI</H1>
              <H2>Semantic Structure & Accessibility</H2>
              <H3>Core Engineering Principles</H3>
              <H4>Implementation Details & Guidelines</H4>
            </>
          )}

          {example === "paragraph" && (
            <>
              <Lead>
                A modern engineering guide to building scalable, accessible, and
                resilient design systems for Next.js applications.
              </Lead>
              <P>
                Typography is the backbone of intuitive user interface design.
                Rather than hardcoding chaotic inline utilities like{" "}
                <InlineCode>text-4xl font-extrabold tracking-tight</InlineCode>{" "}
                across hundreds of files, establishing a unified typography token
                hierarchy brings rhythmic consistency and effortless readability to
                every screen.
              </P>
              <P>
                Subsequent paragraphs automatically maintain predictable top
                margins, eliminating manual spacing tweaks across layout templates.
              </P>
            </>
          )}

          {example === "blockquote" && (
            <Blockquote>
              &quot;Design is not just what it looks like and feels like. Design
              is how it works.&quot; — Steve Jobs
            </Blockquote>
          )}

          {example === "list" && (
            <List>
              <li>
                Automatic vertical rhythm and baseline spacing between
                components.
              </li>
              <li>
                Native dark mode contrast compliance with HSL color tokens.
              </li>
              <li>
                Fluid typography scaling across mobile, tablet, and desktop
                displays.
              </li>
            </List>
          )}

          {example === "supporting" && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <Large>Written by Alex Rivers</Large>
              <div className="flex flex-col sm:items-end">
                <Small>Author Status: Principal Architect</Small>
                <Muted>Updated August 2026</Muted>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative z-10 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl w-full">
        <H1>Crafting High-Performance UI Architecture</H1>
        <Lead className="mt-4">
          A modern engineering guide to building scalable, accessible, and
          resilient design systems for Next.js applications.
        </Lead>

        <P>
          Typography is the backbone of intuitive user interface design. Rather
          than hardcoding chaotic inline utilities like{" "}
          <InlineCode>text-4xl font-extrabold tracking-tight</InlineCode>{" "}
          across hundreds of files, establishing a unified typography token
          hierarchy brings rhythmic consistency and effortless readability to
          every screen.
        </P>

        <H2>Semantic Structure & Accessibility</H2>
        <P>
          Utilizing precise semantic HTML tags ensures native screen reader
          navigation (
          <InlineCode>h1</InlineCode> through <InlineCode>h6</InlineCode>),
          superior SEO indexability, and automatic dark mode contrast compliance.
        </P>

        <Blockquote>
          &quot;Design is not just what it looks like and feels like. Design is
          how it works.&quot; — Steve Jobs
        </Blockquote>

        <H3>Core Engineering Principles</H3>
        <List>
          <li>
            Automatic vertical rhythm and baseline spacing between components.
          </li>
          <li>
            Native dark mode contrast compliance with HSL color tokens.
          </li>
          <li>
            Fluid typography scaling across mobile, tablet, and desktop
            displays.
          </li>
        </List>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <Large>Written by Alex Rivers</Large>
          <div className="flex flex-col sm:items-end">
            <Small>Author Status: Principal Architect</Small>
            <Muted>Updated August 2026</Muted>
          </div>
        </div>
      </div>
    </div>
  );
}
