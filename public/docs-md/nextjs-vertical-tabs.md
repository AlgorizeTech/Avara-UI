# Vertical Tabs

A sleek, responsive tab navigation component. By default the rail is a sidebar menu on the left (which stacks automatically on smaller screens) with the active content pane on the right. Set `orientation="horizontal"` and the same rail runs across the top as a pill bar instead — every `variant` and `color` works identically in both.

## Examples

Switch tabs in any preview to see the GSAP crossfade. The first example's **Code** tab contains the full component source.

export const usageTabsData = `const tabs = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: Your photo gallery, albums or image grids go here.,
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: A playlist, audio controls or your favourite albums.,
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: Video players, stream links or watch-later lists.,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: Preferences, notifications and privacy controls.,
  },
];`;

export const usageDefault = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function MediaTabs() {
  // Each tab carries its own content — the block handles the crossfade.
  return ;
}`;

export const usageHorizontal = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function HorizontalTabs() {
  // Same rail, running across the top. Tabs keep their natural width and
  // scroll sideways rather than squashing, so a long set stays readable.
  return ;
}`;

export const usageHorizontalBordered = `// Every variant works in both orientations — \`bordered\` just moves its
// divider from the right edge of the rail to the bottom.
`;

export const usageMinimal = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function MinimalTabs() {
  // No card chrome — just the rail and the pane.
  return ;
}`;

export const usageBordered = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function BorderedTabs() {
  return ;
}`;

export const usageGlass = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function GlassTabs() {
  return (
    // Glass needs a rich surface behind it to blur.

  );
}`;

export const usageDefaultActive = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function SettingsFirst() {
  // defaultActiveId opens a specific tab instead of the first one.
  return ;
}`;

## Installation

### 1. Install Dependencies

This component uses `gsap` for the smooth opacity and sliding transitions between tab content, and `lucide-react` for the icons.

```bash
npm install gsap lucide-react
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/VerticalTabs.tsx` and copy the engine code from the **Code** tab of the first example above.

## Props Reference

        Prop
        Type
        Default
        Description

          tabs

          TabItem[]

          Required

          Array of objects containing the tab id,{" "}
          label, optional icon, and the{" "}
          content to render.

          variant

          "default" | "glass" | "minimal" | "bordered"

          "default"

          Applies overarching structural layouts. bordered connects
          the menu directly to the content, while minimal removes
          background containers.

          orientation

          "vertical" | "horizontal"

          "vertical"

          Which way the tab rail runs. vertical puts it beside the
          content pane (stacking above it below md);{" "}
          horizontal puts it across the top as a pill bar that
          scrolls sideways when the tabs outgrow the width.

          color

            "indigo" | "rose" | "emerald" | "zinc" | "purple" | string

          "purple"

          Applies the active state color to the selected tab. Accepts preset
          names or valid hex codes (e.g. "#FF0055").

          defaultActiveId

          string

          tabs[0].id

          Optionally specify which tab ID should be open when the component
          first mounts.

---

**Component Path:** `nextjs\vertical-tabs\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
