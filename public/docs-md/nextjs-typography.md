# Typography

Styles for headings, paragraphs, lists, and inline text elements.

While Tailwind provides fantastic utility classes for text, manually copying strings like `scroll-m-20 text-4xl font-extrabold tracking-tight` onto every single `` tag in your application is tedious and error-prone. The `TypographyBlock` provides a collection of semantic React components that standardize your vertical rhythm, sizing, and dark-mode colors across your entire project.

## Interactive Showcase

Review the preview below to see how the various typography components flow together to create a beautifully structured document.

## Installation

### Copy the Component

This suite of components simply wraps native HTML tags with carefully crafted Tailwind CSS strings. It is completely dependency-free.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/TypographyBlock.tsx`.

---

## Usage

Simply import the semantic wrappers you need and use them exactly like standard HTML tags.

```tsx

export default function BlogPost() {
  return (
    
      Building Next-Gen UIs
      A deep dive into modular component architecture.

        When building large-scale applications, you want to avoid repeating
        yourself. This is where Typography components
        shine.

      The Core Principles
      
        Maintain semantic HTML structure
        Automate vertical spacing (margins)
        Ensure accessible color contrast

        Consistency is the easiest way to make your app look professional.

  );
}
```

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
