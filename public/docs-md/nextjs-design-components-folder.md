# Design Components

An interactive multi-tab component folder showcasing live AI Chat, Real-time Analytics, Auth Form, and CLI Terminal components inside a sleek desktop window interface. Built with Framer Motion and Tailwind CSS.

## Examples

Two components ship here: `DesignComponentsFolder`, the full hub with animated cards rising out of a frosted folder, and `DesignFolderBox`, the same folder shell with nothing inside it. Each example's **Code** tab contains that component's full source.

### Components hub

export const usageFolder = `import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";

export default function Showcase() {
  return ;
}`;

### Standalone folder box

A pure frosted glass folder container without the animated cards inside — useful as a showcase box of your own.

export const usageBox = `import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function Container() {
  return ;
}`;

export const usageBoxLabels = `// \`title\` and \`subtitle\` are the only text in the box — they default to
// "Design" / "Components".
`;

## Installation

### 1. Install Dependencies

Ensure you have `framer-motion` (or `motion`), `lucide-react`, and `@/lib/utils` installed in your Next.js project.

```bash
npm install motion lucide-react
```

### 2. Copy the Component

Copy the full Hub source from the **Code** tab of the first example above into `components/custom/blocks/DesignComponentsFolder.tsx`, or the standalone Box from the **Code** tab of the folder-box example into `components/custom/blocks/DesignFolderBox.tsx`. They are independent files — take only the one you need.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          DesignComponentsFolder

          color

          string

          undefined

          Accent for the folder and its cards. Accepts{" "}
          "indigo", "rose", "emerald",{" "}
          "zinc" or any CSS color; it is applied by overriding the{" "}
          --primary variable on the wrapper. Left unset (or set to{" "}
          "primary") it inherits your theme.

          DesignComponentsFolder

          className

          string

          undefined
        
        Merged onto the outer section for layout overrides.

          DesignFolderBox

          title

          string

          "Design"
        
        First line of the wordmark on the folder tab.

          DesignFolderBox

          subtitle

          string

          "Components"
        
        Second line of the wordmark on the folder tab.

          DesignFolderBox

          color

          string

          undefined

          Same accent resolution as the hub — a preset name, a CSS color, or
          unset to inherit the theme.

          DesignFolderBox

          ...divProps

          React.HTMLAttributes&lt;HTMLDivElement&gt;

          —

          Every remaining prop is spread onto the root section, and
          the component forwards its ref.

---

**Component Path:** `nextjs\design-components-folder\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
