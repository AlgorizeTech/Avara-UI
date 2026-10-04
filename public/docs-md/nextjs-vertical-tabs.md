export const metadata = docsPageMetadata("vertical-tabs");

# Tabs

A sleek, responsive tab navigation component. By default the rail runs across the top as a pill bar, with the active content pane below it — and when the tabs outgrow the width they scroll sideways instead of squashing. Set `orientation="vertical"` and the same rail becomes a sidebar menu beside the pane, stacking above it on narrow screens.

Eight `variant` styles ship with it — from a filled pill bar to an underline rail, a segmented control and a stack of cards — and every one of them works in both orientations, in any `color`.

Switch tabs in any preview and the panel slides in from the side you moved toward. Arrow keys walk the rail, `Home` and `End` jump to its ends, and nothing animates on load. The component is exported as `VerticalTabs`, which is the original name and stays the import so existing installs keep working.

export const usageTabsData = `const tabs: TabItem[] = [
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
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      
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

{/*
  Every example is the same file with a different prop line, so the snippets
  are built from one template rather than fifteen near-identical literals.
  `note` becomes the comment that explains what the props above it change.
*/}

export const tabsUsage = ({ name, props = "", note }) => `import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function ${name}() {
${note ? `  // ${note}\n` : ""}  return ;
}`;

export const glassUsage = ({ name, props = "" }) => `import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

${usageTabsData}

export default function ${name}() {
  // Glass has nothing to frost on a flat page — give it something to blur.
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/vertical-tabs
```

## Vertical layout

## Horizontal styles

Seven ways to dress the top rail. Every one takes the page `color`, so pick the shape here and the accent above.

## Vertical styles

The same seven styles with `orientation="vertical"`. The rail becomes a column, the divider and the travelling indicator move to the edge facing the pane, and the arrow keys switch from left/right to up/down.

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

          orientation

          "horizontal" | "vertical"

          "horizontal"

          Which way the tab rail runs. horizontal puts it across
          the top as a bar that scrolls sideways when the tabs outgrow the
          width; vertical puts it beside the content pane, stacking
          above it below md.

          variant

            "default" | "glass" | "minimal" | "bordered" | "underline" |
            "segmented" | "soft" | "elevated"

          "default"

          The visual treatment, independent of orientation.{" "}
          default is a filled pill on a card;{" "}
          underline marks the active tab with an accent bar and no
          fill; segmented groups the tabs in one recessed track;{" "}
          soft tints the accent instead of filling with it;{" "}
          elevated gives every tab its own card;{" "}
          bordered joins rail and pane inside one outline;{" "}
          minimal removes every background container; and{" "}
          glass frosts them.

          color

            "primary" | "indigo" | "rose" | "emerald" | "purple" | "zinc" |
            string

          "primary"

          Applies the active state color to the selected tab. Accepts preset
          names or valid hex codes (e.g. "#FF0055") — a hex also
          derives its own label color, so pale accents stay readable.

          defaultActiveId

          string

          tabs[0].id

          Optionally specify which tab ID should be open when the component
          first mounts.

          className

          string

          —

          Merged onto the outer wrapper, so layout and background belong here.

## Keyboard and motion

The rail is a real `tablist`: each tab is a `tab` that owns the panel through `aria-controls`, and only the selected tab is in the page's tab order. Reaching the rail with Tab lands on the selected tab; from there the arrow keys along the rail's own axis move the selection — left and right when the rail runs across the top, up and down when it runs down the side — and Home and End jump to its ends. Tab again moves into the panel.

Focus is drawn in the current `color` rather than the browser default, so it belongs to the theme.

Two things move, and both only in answer to something you did. The `underline` and `segmented` indicators are single elements that travel between tabs, and the panel enters from the side you moved toward — later tab, enters from the far edge; earlier tab, from the near one. Nothing animates on load, and under `prefers-reduced-motion` the travel is dropped for a plain fade.

---

**Component Path:** `[framework]\vertical-tabs\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
