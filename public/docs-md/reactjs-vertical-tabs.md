# Vertical Tabs

A sleek, responsive tab navigation component. By default the rail is a sidebar menu on the left (which stacks automatically on smaller screens) with the active content pane on the right. Set `orientation="horizontal"` and the same rail runs across the top as a pill bar instead — every `variant` and `color` works identically in both.

Switch tabs in any preview to see the GSAP crossfade.

export const usageTabsData = `const tabs = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active dot indicator
        clearly shows your current location in the app structure.
      
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      
        Adjust your preferences, notification settings, and privacy controls
        here.
      
    ),
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

export const usageHorizontalBordered = `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function HorizontalRail() {
  // Every variant works in both orientations — \`bordered\` just moves its
  // divider from the right edge of the rail to the bottom.
  return ;
}`;

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

  );
}`;

## Installation

## Examples

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

**Component Path:** `[framework]\vertical-tabs\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
