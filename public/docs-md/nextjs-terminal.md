# Terminal Snippet

A beautiful, dependency-free code display block inspired by Mac OS windows.

If you are building a documentation site, a developer portfolio, or writing technical blog posts, you need a sleek way to present code. This `TerminalBlock` handles the structural styling, Mac-like window controls, built-in "Copy to Clipboard" functionality, and dynamic language badging without relying on heavy third-party syntax highlighters.

## Examples

Pass a raw `code` string and the block handles the window chrome, language badge, overflow scrolling and copy button.

export const usageDefault = `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

const installCommand = \`npx create-next-app@latest my-app --typescript --tailwind
cd my-app
npm run dev\`;

export default function Docs() {
  return (
    
  );
}`;

export const usageLanguages = `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

export default function PythonTerminal() {
  // \`language\` drives the badge; the block never ships a heavyweight
  // highlighter, so any language string is safe to pass.
  return ;
}`;

export const usageGlass = `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

export default function GlassTerminal() {
  return (
    // Backdrop-blurred chrome — put it over a gradient.

  );
}`;

export const usageMinimal = `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

export default function MinimalTerminal() {
  // Drops the window controls and the border for inline snippets.
  return ;
}`;

export const usageBare = `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";

export default function BareTerminal() {
  // No filename header, no copy button — just the code.
  return ;
}`;

## Installation

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          TerminalBlock

          code

          {`string`}

          {`Required`}

          The snippet rendered inside the window. Newlines in the string become terminal lines.

          TerminalBlock

          language

          {`string`}

          {`"bash"`}

          Drives the syntax highlighting and the badge shown in the header.

          TerminalBlock

          filename

          {`string`}

          {`undefined`}

          Label beside the badge. Omit it and the header keeps only the window controls.

          TerminalBlock

          copyable

          {`boolean`}

          {`true`}

          Renders the copy button. Set it false for a read-only block.

          TerminalBlock

          variant

          {`"default" | "glass" | "minimal"`}

          {`"default"`}

          Surface treatment of the window chrome.

          TerminalBlock

          color

          {`"primary" | "indigo" | "rose" | "emerald" | "zinc" | string`}

          {`"primary"`}

          Accent for the language badge and border. Unrecognised values fall back to "primary".

---

**Component Path:** `nextjs\terminal\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
