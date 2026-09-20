# Components Folder

An interactive multi-tab component folder showcasing live AI Chat, Real-time Analytics, Auth Form, and CLI Terminal components inside a sleek desktop window interface. Built with Framer Motion and Tailwind CSS.

export const usageFolder = `import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";

export default function Showcase() {
  return ;
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/design-components-folder
```

export const usageBoxLabels = `import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function CustomLabelBox() {
  // \`title\` and \`subtitle\` are the only text in the box — they default to
  // "Design" / "Components".
  return ;
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/design-folder-box
```

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

**Component Path:** `[framework]\design-components-folder\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
