---
title: "Shadcn Tabs"
description: "Shadcn Tabs. Tabs in horizontal and vertical layouts with underline, segmented, soft, elevated, minimal, bordered and glass styles, and keyboard navigation."
url: https://avaraui.com/docs/nextjs/vertical-tabs
---

# Shadcn Tabs

A responsive tab navigation component (`VerticalTabs`) supporting horizontal and `vertical` orientations across eight `variant` styles with animated sliding indicators and keyboard navigation.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/vertical-tabs.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/vertical-tabs
```

## Horizontal tabs

The default. The rail runs across the top and scrolls sideways when the tabs outgrow the width.

- Pass `tabs` as `{ id, label, icon, content }[]` — that is the whole API.
- `orientation="horizontal"` is the default, so you never write it; `vertical` moves the rail beside the pane.
- `defaultActiveId` picks which tab opens first, defaulting to the first entry.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function MediaTabs() {
  // Each tab carries its own content — the block handles the crossfade.
  return <VerticalTabs tabs={tabs} />;
}
```

## Vertical tabs

One prop moves the rail beside the pane. Nothing else about the API changes.

- Set `orientation="vertical"` to put the rail in a fixed-width column on the left with the pane filling the rest — and to stack the two below `md`, so a phone still gets a readable list.
- `variant` is unchanged by the switch — all eight styles render in either direction.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function MediaSidebarTabs() {
  // The rail becomes a sidebar; on narrow screens it stacks on top.
  return <VerticalTabs tabs={tabs} orientation="vertical" />;
}
```

## Underline

The classic browser-tab set — nothing filled, just an accent bar riding a hairline track.

- Set `variant="underline"` to drop all chrome; the rail gets a bottom hairline and a single accent bar slides along it between tabs.
- `color` tints the bar and the active label — this variant never paints a label on top of the accent, so pale colors stay readable.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function UnderlineTabs() {
  // One bar, measured and moved — not a bar per tab fading in and out.
  return <VerticalTabs tabs={tabs} variant="underline" />;
}
```

## Segmented

An iOS-style control: one recessed track, the active tab lifted onto its own surface.

- Set `variant="segmented"` to group the tabs inside one recessed track; a single raised surface slides between segments.
- `orientation="horizontal"` makes the segments share the width evenly rather than clustering at the start.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function SegmentedTabs() {
  // Best for three or four short labels — it is a control, not a nav.
  return <VerticalTabs tabs={tabs} variant="segmented" />;
}
```

## Soft

The quietest selection state: the accent tinted back to a wash, label kept in the accent.

- Set `variant="soft"` for full-round pills with a tinted active state instead of a solid fill.
- `color` supplies both the wash and the label, so any hex stays legible without a contrast check.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function SoftTabs() {
  // Pairs well with dense pages — it never competes with the content.
  return <VerticalTabs tabs={tabs} variant="soft" />;
}
```

## Elevated

Every tab is its own card. The active one takes the accent; the rest stay flat.

- Set `variant="elevated"` to give each tab its own bordered card; hovering an unselected one tints its border toward the accent.
- `className` is worth using here — the cards paint their own surface, so give the block a slightly different background for them to lift off.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function ElevatedTabs() {
  // Put this on a tinted section; matching the card surface leaves nothing to lift off.
  return <VerticalTabs tabs={tabs} variant="elevated" />;
}
```

## Minimal

No card chrome at all — just the rail and the pane.

- Set `variant="minimal"` when the surrounding layout already supplies the panel and the borders.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function MinimalTabs() {
  // Inherits the page background — nothing is drawn but the tabs.
  return <VerticalTabs tabs={tabs} variant="minimal" />;
}
```

## Bordered

Rail and pane joined inside one outlined card, split by a single divider.

- Set `variant="bordered"` to wrap both halves in one border; the divider follows the rail to whichever edge it sits on.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function BorderedTabs() {
  // The divider moves to the bottom edge in this orientation, and to the right edge when vertical.
  return <VerticalTabs tabs={tabs} variant="bordered" />;
}
```

## Glass

Frosted panels — needs a rich background to blur.

- Set `variant="glass"` to frost both the rail and the pane over whatever is behind them.
- `color` tints the active tab; it takes preset names or a hex, and defaults to `primary`.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function GlassTabs() {
  // Glass has nothing to frost on a flat page — give it something to blur.
  return (
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none" />
      <VerticalTabs tabs={tabs} />
    </div>
  );
}
```

## Vertical underline

The bar rotates onto the leading edge and travels down the rail, with no track line to compete with it.

- Combine `variant="underline"` with `orientation="vertical"` for a docs-sidebar rail.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function VerticalUnderlineTabs() {
  // The bar rotates onto the leading edge and travels vertically.
  return <VerticalTabs tabs={tabs} variant="underline" orientation="vertical" />;
}
```

## Vertical soft

Tinted pills stacked down the side — the lightest sidebar there is.

- Combine `variant="soft"` with `orientation="vertical"` for a settings menu that stays out of the way.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function VerticalSoftTabs() {
  return <VerticalTabs tabs={tabs} variant="soft" orientation="vertical" />;
}
```

## Vertical elevated

A stack of cards, the active one filled and raised.

- Combine `variant="elevated"` with `orientation="vertical"` when each tab is a destination worth its own surface.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function VerticalElevatedTabs() {
  return <VerticalTabs tabs={tabs} variant="elevated" orientation="vertical" />;
}
```

## Vertical segmented

The track turns on its side and the raised surface travels vertically; segments keep their full width rather than sharing it.

- Combine `variant="segmented"` with `orientation="vertical"` for a compact grouped switcher in a narrow column.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function VerticalSegmentedTabs() {
  return <VerticalTabs tabs={tabs} variant="segmented" orientation="vertical" />;
}
```

## Vertical bordered

One card around both halves, divided down the middle.

- Combine `variant="bordered"` with `orientation="vertical"` and the divider moves from the bottom edge to the right edge of the rail.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function VerticalBorderedTabs() {
  return <VerticalTabs tabs={tabs} variant="bordered" orientation="vertical" />;
}
```

## Vertical glass

Two frosted panels side by side.

- Combine `variant="glass"` with `orientation="vertical"` over a photo or gradient — it needs something to blur.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const tabs: TabItem[] = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera, // the Lucide component itself, not a string
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

export default function VerticalGlassTabs() {
  // Glass has nothing to frost on a flat page — give it something to blur.
  return (
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none" />
      <VerticalTabs tabs={tabs} orientation="vertical" />
    </div>
  );
}
```

## About Shadcn Tabs

**What it is.** `VerticalTabs` renders accessible horizontal or vertical tab rails with eight `variant` styles (`default`, `underline`, `segmented`, `bordered`, `minimal`, `glass`, `soft`, `elevated`), icons, and directional panel transitions.

**How it is built.** Implements WAI-ARIA `tablist` / `tab` / `aria-controls` keyboard navigation (`ArrowLeft`/`ArrowRight` in horizontal, `ArrowUp`/`ArrowDown` in vertical, plus `Home`/`End`). Travelling indicators and directional panel slides respect `prefers-reduced-motion` by falling back to a plain fade.

**When to use it.** Use `VerticalTabs` for settings pages, media panels, and tabbed dashboards. For compact segmented switches without associated panels, use [Toggle Group](https://avaraui.com/docs/nextjs/toggle-group).

## For AI agents

**When to use**

- Horizontal or vertical tabbed interfaces with 8 visual variants and directional content transitions

**When not to use**

- Compact segmented toggles without tab panels — use [Toggle Group](https://avaraui.com/docs/nextjs/toggle-group)

**Agent notes**

- Named exports: `VerticalTabs`, `type TabItem` from `@/components/custom/blocks/VerticalTabs`
- Pass `tabs` as `{ id, label, icon, content }[]`; set `orientation="vertical"` for a left sidebar rail that stacks below `md`

**Ask before you pick.** This page has 8 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 8 options as live previews: https://avaraui.com/view/vertical-tabs

**When to use it.** A tab navigation component in eight styles, from a filled pill bar to an underline rail, a segmented control and a stack of cards. The rail runs across the top by default, or beside the content with `orientation="vertical"`.

**Gotchas:**

- All eight are looks of the one `vertical-tabs` item: install it once and set `variant` from the index.
- Every style works horizontally and vertically: set `orientation="vertical"` for a sidebar-style rail instead of asking for a different design.
- `elevated` paints its own card surfaces, so give the block a slightly different background for them to lift off; `glass` needs something behind it to blur.

### The 8 variants

1. **Pill bar** (`default`): The default: a filled pill bar across the top, scrolling sideways when the tabs outgrow the width.
   - Live: https://avaraui.com/view/vertical-tabs/default
   - Best for: a general-purpose tab strip with no strong style preference
   - Avoid if: the page already supplies its own panel and borders and you want something quieter
   - Traits: filled pill bar, default look, scrolls sideways when crowded
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#horizontal-tabs
2. **Soft** (`soft`): Full-round pills with a tinted wash and label for the active tab instead of a solid fill.
   - Live: https://avaraui.com/view/vertical-tabs/soft
   - Best for: a settings menu or sidebar that should stay out of the way
   - Avoid if: you want the active tab to stand out with a solid fill
   - Traits: round pills, tinted active state, legible with any hex colour
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"soft"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#soft
3. **Segmented** (`segmented`): The tabs sit inside one recessed track, and a single raised surface slides between the segments.
   - Live: https://avaraui.com/view/vertical-tabs/segmented
   - Best for: a compact switcher between a few views, like a segmented control
   - Avoid if: you have many tabs or long labels
   - Traits: recessed track, sliding raised surface, segments can share the width evenly
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"segmented"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#segmented
4. **Underline** (`underline`): No chrome: a bottom hairline with one accent bar that slides between the tabs.
   - Live: https://avaraui.com/view/vertical-tabs/underline
   - Best for: a docs-style or content page where the tabs should feel light
   - Avoid if: you want each tab to read as a button
   - Traits: hairline rail, sliding accent bar, never paints a label on the accent
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"underline"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#underline
5. **Minimal** (`minimal`): Just the tabs, with no panel or border of their own.
   - Live: https://avaraui.com/view/vertical-tabs/minimal
   - Best for: a layout that already supplies the panel and the borders
   - Avoid if: the tabs sit on a bare page and need some structure
   - Traits: no panel, no borders
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#minimal
6. **Bordered** (`bordered`): One border wraps the tab rail and the pane together, with a divider between them on whichever edge the rail sits.
   - Live: https://avaraui.com/view/vertical-tabs/bordered
   - Best for: a tabbed panel that should read as a single boxed unit
   - Avoid if: the tabs sit inside a card that already has a border
   - Traits: single outer border, divider follows the rail
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"bordered"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#bordered
7. **Elevated** (`elevated`): Each tab is its own bordered card, and hovering an unselected one tints its border toward the accent.
   - Live: https://avaraui.com/view/vertical-tabs/elevated
   - Best for: tabs that are destinations worth their own surface
   - Avoid if: you want a flat, lightweight rail
   - Traits: card per tab, hover border tint, paints its own surface
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"elevated"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#elevated
8. **Glass** (`glass`): The rail and the pane are both frosted over whatever sits behind them.
   - Live: https://avaraui.com/view/vertical-tabs/glass
   - Best for: tabs over a photo or gradient background
   - Avoid if: the background is plain, since there is nothing to blur
   - Traits: backdrop blur on rail and pane, tinted active tab
   - Install: `npx shadcn@latest add @avara-ui/vertical-tabs`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/vertical-tabs#glass

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `TabItem[]` | Required | Array of objects containing the tab `id`, `label`, optional `icon`, and the `content` to render. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Which way the tab rail runs. `horizontal` puts it across the top as a bar that scrolls sideways when the tabs outgrow the width; `vertical` puts it beside the content pane, stacking above it below `md`. |
| `variant` | `"default" \| "glass" \| "minimal" \| "bordered" \| "underline" \| "segmented" \| "soft" \| "elevated"` | `"default"` | The visual treatment, independent of `orientation`. `default` is a filled pill on a card; `underline` marks the active tab with an accent bar and no fill; `segmented` groups the tabs in one recessed track; `soft` tints the accent instead of filling with it; `elevated` gives every tab its own card; `bordered` joins rail and pane inside one outline; `minimal` removes every background container; and `glass` frosts them. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "purple" \| "zinc" \| string` | `"primary"` | Applies the active state color to the selected tab. Accepts preset names or valid hex codes (e.g. `"#FF0055"`) — a hex also derives its own label color, so pale accents stay readable. |
| `defaultActiveId` | `string` | `tabs[0].id` | Optionally specify which tab ID should be open when the component first mounts. |
| `className` | `string` | `—` | Merged onto the outer wrapper, so layout and background belong here. |

## Works with other components

- Render [Card](https://avaraui.com/docs/nextjs/card), [Form](https://avaraui.com/docs/nextjs/form), or [Data Table](https://avaraui.com/docs/nextjs/data-table) views inside each tab's `content`.

## How do I build vertical tabs in React?

Pass a `tabs` array to `VerticalTabs`, where each item has an `id`, `label`, `content` and optional `icon`, and set `orientation="vertical"`. The default orientation is `"horizontal"`, a bar across the top that scrolls sideways when the tabs outgrow it.

## How does keyboard navigation work in VerticalTabs?

The rail is a real `tablist` where only the selected tab is in the page tab order. Arrow keys move along the active axis, left and right for horizontal and up and down for vertical, and `Home` and `End` jump to the first or last tab.

## Which VerticalTabs variants are available?

`variant` accepts `"default"`, `"glass"`, `"minimal"`, `"bordered"`, `"underline"`, `"segmented"`, `"soft"` and `"elevated"`, and it works independently of `orientation`. `color` sets the selected-tab accent and defaults to `"primary"`, which follows your theme.

## How do I choose which tab is open first?

Set `defaultActiveId` to the `id` of a tab. If you omit it, the first tab in `tabs` is open when the component mounts. Switching tabs animates the panel with a directional transition and moves the sliding indicator.

## What can I put inside a tab panel?

Anything you can render as a React node in `content`. Examples include a [Card](https://avaraui.com/docs/nextjs/card), a [Form](https://avaraui.com/docs/nextjs/form) or a [Data Table](https://avaraui.com/docs/nextjs/data-table). Use `className` to set layout and background on the outer wrapper.

---

Live previews and every example: https://avaraui.com/docs/nextjs/vertical-tabs
