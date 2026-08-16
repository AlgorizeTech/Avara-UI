# Typography

Styles for headings, paragraphs, lists, and inline text elements.

While Tailwind provides fantastic utility classes for text, manually copying strings like `scroll-m-20 text-4xl font-extrabold tracking-tight` onto every single `` tag in your application is tedious and error-prone. The `TypographyBlock` provides a collection of semantic React components that standardize your vertical rhythm, sizing, and dark-mode colors across your entire project.

## Examples

Every component is a thin semantic wrapper around a native HTML tag, so you compose them exactly like the tags themselves. The first example's **Code** tab contains the full component source.

export const usageArticle = `import {
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

export default function BlogPost() {
  return (
    
      The Elements of UI
      
        A comprehensive guide to composing beautiful web applications.

        Rather than scattering raw classes like{" "}
        text-4xl font-extrabold across hundreds of
        files, standardized components keep the rhythm predictable.

      Why semantic tags matter
      
        "Good typography guides the reader without calling attention to itself."

      Key Benefits
      
        Consistent margins applied automatically.
        Perfect dark mode contrast ratios.

        Written by Nexus
        
          Author Status: Verified
          Published April 2026

  );
}`;

export const usageHeadings = `import { H1, H2, H3, H4 } from "@/components/custom/blocks/TypographyBlock";

export default function Headings() {
  return (
    <>
      The Elements of UI
      Why semantic tags matter
      Key benefits
      A minor aside
    
  );
}`;

export const usageParagraph = `import { InlineCode, Lead, P } from "@/components/custom/blocks/TypographyBlock";

export default function Body() {
  return (
    <>
      A comprehensive guide to composing beautiful web apps.
      
        Standardized components keep the rhythm predictable — no more pasting{" "}
        text-4xl font-extrabold tracking-tight by hand.
      
      A following paragraph picks up its own top margin automatically.
    
  );
}`;

export const usageBlockquote = `import { Blockquote } from "@/components/custom/blocks/TypographyBlock";

  "Good typography is like a good map. It guides the reader gracefully from
  start to finish without calling attention to itself."
`;

export const usageList = `import { List } from "@/components/custom/blocks/TypographyBlock";

// \`List\` styles the marker and spacing; the \`li\` children stay yours.

  Consistent top and bottom margins automatically applied.
  Perfect dark mode contrast ratios.
  Semantic HTML attributes preserved.
`;

export const usageSupporting = `import { Large, Muted, Small } from "@/components/custom/blocks/TypographyBlock";

export default function Byline() {
  return (
    
      Written by Nexus
      
        Author Status: Verified
        Published April 2026

  );
}`;

## Installation

### Copy the Component

This suite of components simply wraps native HTML tags with carefully crafted Tailwind CSS strings. It is completely dependency-free.

Copy the full engine code from the **Code** tab of the first example above into `components/custom/blocks/TypographyBlock.tsx`.

## Props Reference

        Component
        Tag Output
        Description

          H1

          &lt;h1&gt;
        
        Primary page heading. Massive, bold, and tightly tracked.

          H2

          &lt;h2&gt;

          Section heading. Includes a bottom border and distinct top margin.

          H3

          &lt;h3&gt;
        
        Subsection heading.

          H4

          &lt;h4&gt;
        
        Minor heading.

          P

          &lt;p&gt;

          Standard paragraph text. Automatically handles top margins if it
          follows another element.

          Blockquote

          &lt;blockquote&gt;
        
        Indented and italicized quote block with a left border.

          List

          &lt;ul&gt;

          An unordered list. Handles left indentation and margin spacing for
          child &lt;li&gt; tags.

          InlineCode

          &lt;code&gt;
        
        Monospaced, slightly smaller text with a subtle background box.

          Lead

          &lt;p&gt;

          Introductory paragraph text. Slightly larger and muted compared to
          standard paragraphs.

          Large

          &lt;div&gt;
        
        Bolder, larger standard text.

          Small

          &lt;small&gt;
        
        Small, medium-weight text.

          Muted

          &lt;span&gt;
        
        Standard text but rendered in a lower-contrast, muted color.

          All Components

          ...props

          Accept className for standard overrides, and forward all
          native HTML attributes (like id, onClick,
          etc.) for their respective HTML tags.

---

**Component Path:** `nextjs\typography\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
