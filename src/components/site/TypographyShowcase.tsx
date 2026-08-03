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
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const TYPOGRAPHY_ENGINE_CODE_TS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("scroll-m-20 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("leading-7 text-zinc-700 dark:text-zinc-300 [&:not(:first-child)]:mt-6", className)} {...props} />;
}
export function Blockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return <blockquote className={cn("mt-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-6 italic text-zinc-600 dark:text-zinc-400", className)} {...props} />;
}
export function List({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-700 dark:text-zinc-300", className)} {...props} />;
}
export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cn("relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100", className)} {...props} />;
}
export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xl text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
export function Large({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-lg font-semibold text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function Small({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <small className={cn("text-sm font-medium leading-none text-zinc-600 dark:text-zinc-400", className)} {...props} />;
}
export function Muted({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const TYPOGRAPHY_ENGINE_CODE_JS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function H1({ className, ...props }) {
  return <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function H2({ className, ...props }) {
  return <h2 className={cn("scroll-m-20 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function H3({ className, ...props }) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function H4({ className, ...props }) {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function P({ className, ...props }) {
  return <p className={cn("leading-7 text-zinc-700 dark:text-zinc-300 [&:not(:first-child)]:mt-6", className)} {...props} />;
}
export function Blockquote({ className, ...props }) {
  return <blockquote className={cn("mt-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-6 italic text-zinc-600 dark:text-zinc-400", className)} {...props} />;
}
export function List({ className, ...props }) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-700 dark:text-zinc-300", className)} {...props} />;
}
export function InlineCode({ className, ...props }) {
  return <code className={cn("relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100", className)} {...props} />;
}
export function Lead({ className, ...props }) {
  return <p className={cn("text-xl text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
export function Large({ className, ...props }) {
  return <div className={cn("text-lg font-semibold text-zinc-950 dark:text-zinc-50", className)} {...props} />;
}
export function Small({ className, ...props }) {
  return <small className={cn("text-sm font-medium leading-none text-zinc-600 dark:text-zinc-400", className)} {...props} />;
}
export function Muted({ className, ...props }) {
  return <span className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
`;

export function TypographyShowcase() {
  const generateUsageCode = () => {
    return `import { 
  H1, H2, P, Blockquote, List, InlineCode, Lead, Muted 
} from "@/components/custom/blocks/TypographyBlock";

export default function ArticlePreview() {
  return (
    <article className="max-w-2xl mx-auto">
      <H1>The Elements of UI</H1>
      <Lead>A guide to composing beautiful web applications.</Lead>
      
      <P>
        Typography is the foundation of any good interface. Using standardized
        components ensures your text maintains a perfect rhythm.
      </P>
      
      <H2>Installation</H2>
      <P>
        Start by importing the <InlineCode>Typography</InlineCode> components 
        into your file.
      </P>

      <Blockquote>
        "Good typography is like a good map. It guides the reader gracefully 
        from start to finish."
      </Blockquote>

      <List>
        <li>Consistent margins and line heights</li>
        <li>Dark mode support out-of-the-box</li>
        <li>Semantic HTML tags for accessibility</li>
      </List>
      
      <div className="mt-8 text-center">
        <Muted>Last updated: April 2026</Muted>
      </div>
    </article>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <ComponentPreview
        name="TypographyBlock"
        tsCode={TYPOGRAPHY_ENGINE_CODE_TS}
        jsCode={TYPOGRAPHY_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="typography"
      >
        <div className="w-full min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10 overflow-hidden">
          <div className="mx-auto max-w-2xl">
            <H1>The Elements of UI</H1>
            <Lead className="mt-4">
              A comprehensive guide to composing beautiful web applications
              using modular design systems.
            </Lead>

            <P>
              Typography is the foundation of any good interface. Rather than
              scattering raw Tailwind classes like{" "}
              <InlineCode>text-4xl font-extrabold tracking-tight</InlineCode>{" "}
              across hundreds of files, utilizing standardized components
              ensures your text maintains a perfect, predictable rhythm
              everywhere.
            </P>

            <H2>Why semantic tags matter</H2>
            <P>
              Using the correct HTML tag is crucial for accessibility. Screen
              readers rely heavily on heading structures (
              <InlineCode>h1</InlineCode> through <InlineCode>h6</InlineCode>)
              to navigate documents.
            </P>

            <Blockquote>
              "Good typography is like a good map. It guides the reader
              gracefully from start to finish without calling attention to
              itself."
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
      </ComponentPreview>
    </div>
  );
}
