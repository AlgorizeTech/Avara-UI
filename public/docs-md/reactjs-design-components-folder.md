---
title: "Components Folder"
description: "A multi-tab folder showing live AI Chat, Analytics, Auth Form and Terminal components in a desktop window, animated with CSS transitions only."
url: https://avaraui.com/docs/nextjs/design-components-folder
---

# Components Folder

An interactive multi-tab component folder showcasing live AI Chat, Real-time Analytics, Auth Form, and CLI Terminal components inside a sleek desktop window interface. Built with Tailwind CSS and native CSS transitions — no animation library.

## Design components folder

The cards fan out once the folder scrolls into view, then retract one at a time on hover.

- `color` accents the folder and every card — a preset name (`indigo`, `rose`, `emerald`, `zinc`) or any CSS colour. It works by overriding the `--primary` variable on the wrapper, so leaving it unset inherits your theme.

```tsx
import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";

export default function Showcase() {
  return <DesignComponentsFolder />;
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/design-components-folder.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/design-components-folder
```

### Custom labels

- `title="Design"` is the first line of the wordmark on the folder tab, defaulting to `Design`.
- `subtitle="Components"` is the second line, defaulting to `Components`.

```tsx
import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function CustomLabelBox() {
  // `title` and `subtitle` are the only text in the box — they default to
  // "Design" / "Components".
  return <DesignFolderBox title="Design" subtitle="Components" />;
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/design-folder-box.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/design-folder-box
```

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `DesignComponentsFolder` | `color` | `string` | `undefined` | Accent for the folder and its cards. Accepts `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or any CSS color; it is applied by overriding the `--primary` variable on the wrapper. Left unset (or set to `"primary"`) it inherits your theme. |
| `DesignComponentsFolder` | `className` | `string` | `undefined` | Merged onto the outer section for layout overrides. |
| `DesignFolderBox` | `title` | `string` | `"Design"` | First line of the wordmark on the folder tab. |
| `DesignFolderBox` | `subtitle` | `string` | `"Components"` | Second line of the wordmark on the folder tab. |
| `DesignFolderBox` | `color` | `string` | `undefined` | Same accent resolution as the hub — a preset name, a CSS color, or unset to inherit the theme. |
| `DesignFolderBox` | `...divProps` | `React.HTMLAttributes<HTMLDivElement>` | `—` | Every remaining prop is spread onto the root `section`, and the component forwards its ref. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/design-components-folder
