# Custom Code Block

A beautiful, robust code block component with manual syntax highlighting, automatic language icons, and clipboard copy functionality.

This `CustomCodeBlock` provides an elegant interface to display code snippets, complete with macOS-style window controls, dynamic language badges, and a custom syntax highlighter optimized for both light and dark themes.

## Examples

Every block ships with macOS window controls, a language badge derived from `language`, and a copy button. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const html = \`

    Build Faster. Scale Better.
  
\`;

export default function Snippet() {
  return ;
}`;

export const usageTypescript = `// \`language\` drives both the highlighter and the icon in the header;
// \`fileName\` is the label beside it.
`;

export const usageBash = `// Shell snippets get a terminal icon and comment-aware highlighting.
`;

export const usageTabs = `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

// Pass \`tabs\` instead of \`code\` to switch between related files in one block.
export default function MultiFileSnippet() {
  return (
    
  );
}`;

## Installation

### Dependencies

The language badges come from `react-icons`, and the copy affordance from `lucide-react`.

```bash
npm install react-icons lucide-react
```

### Copy the Component

Create a new file at `components/custom/blocks/CustomCodeBlock.tsx` and copy the source from the **Code** tab of the first example above.

## Features
Explore the Custom Code Block's syntax highlighting features, complete with copy-to-clipboard functionality and line numbering.

    Zero Dependencies
    Uses a lightweight, custom regex engine for syntax highlighting. No need to install heavy libraries like PrismJS or Shiki.

    Language Badges
    Automatically displays the correct language icon (React, JS, TS, HTML, CSS, Bash) in the macOS-style header.

    Clipboard Copy
    Includes a built-in copy button with a temporary success state (checkmark) for an excellent developer experience.

    Dark Mode Ready
    The syntax highlighter colors are carefully chosen to look gorgeous on both light and dark backgrounds.

## Best Practices & Guidelines

    Language Prop Mapping
    Make sure to pass the correct language prop (e.g., "tsx", "bash", "css"). This prop drives both the regex syntax highlighting engine and the language icon rendered in the header.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          CustomCodeBlock

          code

          string
        
        -
        The raw code string to display.

          CustomCodeBlock

          language

          string

          "typescript"
        
        The programming language for syntax highlighting (e.g. "javascript", "tsx", "html", "bash").

          CustomCodeBlock

          fileName

          string
        
        -
        Optional custom file name to display in the header (e.g. "app.tsx").

---

**Component Path:** `nextjs\custom-code-block\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
