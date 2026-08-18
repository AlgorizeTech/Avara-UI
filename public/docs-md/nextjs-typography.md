# Typography

Styles for headings, paragraphs, lists, and inline text elements.

While Tailwind provides fantastic utility classes for text, manually copying strings like `scroll-m-20 text-4xl font-extrabold tracking-tight` onto every single `` tag in your application is tedious and error-prone. The `TypographyBlock` provides a collection of semantic React components that standardize your vertical rhythm, sizing, and dark-mode colors across your entire project.

## Examples

Every component is a thin semantic wrapper around a native HTML tag, so you compose them exactly like the tags themselves.

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
    
      Crafting High-Performance UI Architecture
      
        A modern engineering guide to building scalable, accessible, and resilient design systems.

        Typography is the backbone of intuitive user interface design. Rather than hardcoding chaotic inline utilities like{" "}
        text-4xl font-extrabold tracking-tight across hundreds of files, establishing a unified typography token hierarchy brings rhythmic consistency.

      Semantic Structure & Accessibility
      
        "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

      Core Engineering Principles
      
        Automatic vertical rhythm and baseline spacing between components.
        Native dark mode contrast compliance with HSL color tokens.
        Fluid typography scaling across mobile, tablet, and desktop displays.

        Written by Alex Rivers
        
          Author Status: Principal Architect
          Updated August 2026

  );
}`;

export const usageHeadings = `import { H1, H2, H3, H4 } from "@/components/custom/blocks/TypographyBlock";

export default function Headings() {
  return (
    <>
      Crafting High-Performance UI
      Semantic Structure & Accessibility
      Core Engineering Principles
      Implementation Details & Guidelines
    
  );
}`;

export const usageParagraph = `import { InlineCode, Lead, P } from "@/components/custom/blocks/TypographyBlock";

export default function Body() {
  return (
    <>
      A modern engineering guide to building scalable, accessible design systems.
      
        Typography is the backbone of intuitive user interface design. Standardized components keep the rhythm predictable — no more pasting{" "}
        text-4xl font-extrabold tracking-tight by hand.
      
      Subsequent paragraphs automatically maintain predictable top margins.
    
  );
}`;

export const usageBlockquote = `import { Blockquote } from "@/components/custom/blocks/TypographyBlock";

  "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
`;

export const usageList = `import { List } from "@/components/custom/blocks/TypographyBlock";

// \`List\` styles the marker and spacing; the \`li\` children stay yours.

  Automatic vertical rhythm and baseline spacing between components.
  Native dark mode contrast compliance with HSL color tokens.
  Fluid typography scaling across mobile, tablet, and desktop displays.
`;

export const usageSupporting = `import { Large, Muted, Small } from "@/components/custom/blocks/TypographyBlock";

export default function Byline() {
  return (
    
      Written by Alex Rivers
      
        Author Status: Principal Architect
        Updated August 2026

  );
}`;

` tags — markers, indentation and item spacing are handled for you.",
        },
      ],
      props: { example: "list" },
      usage: usageList,
    },
    {
      title: "Supporting text",
      propNotes: [
        {
          prop: "children",
          effect:
            "of `Large`, `Small` and `Muted` covers bylines, captions and metadata respectively.",
        },
      ],
      props: { example: "supporting" },
      usage: usageSupporting,
    },
  ]}
/>

## Installation

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

**Component Path:** `[framework]\typography\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
