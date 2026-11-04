---
title: "Shadcn Tabs"
description: "Shadcn Tabs. Tabs in horizontal and vertical layouts with underline, segmented, soft, elevated, minimal, bordered and glass styles, and keyboard navigation."
url: https://avaraui.com/docs/nextjs/vertical-tabs
---

# Shadcn Tabs

A sleek, responsive tab navigation component. By default the rail runs across the top as a pill bar, with the active content pane below it — and when the tabs outgrow the width they scroll sideways instead of squashing. Set `orientation="vertical"` and the same rail becomes a sidebar menu beside the pane, stacking above it on narrow screens.

Eight `variant` styles ship with it — from a filled pill bar to an underline rail, a segmented control and a stack of cards — and every one of them works in both orientations, in any `color`.

Switch tabs in any preview and the panel slides in from the side you moved toward. Arrow keys walk the rail, `Home` and `End` jump to its ends, and nothing animates on load. The component is exported as `VerticalTabs`, which is the original name and stays the import so existing installs keep working.

## Horizontal tabs

The default. The rail runs across the top and scrolls sideways when the tabs outgrow the width.

- Pass `tabs` as `{ id, label, icon, content }[]` — that is the whole API.
- `orientation="horizontal"` is the default, so you never write it; `vertical` moves the rail beside the pane.
- `defaultActiveId` picks which tab opens first, defaulting to the first entry.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

## Vertical layout

### Vertical tabs

One prop moves the rail beside the pane. Nothing else about the API changes.

- Set `orientation="vertical"` to put the rail in a fixed-width column on the left with the pane filling the rest — and to stack the two below `md`, so a phone still gets a readable list.
- `variant` is unchanged by the switch — all eight styles render in either direction.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

## Horizontal styles

Seven ways to dress the top rail. Every one takes the page `color`, so pick the shape here and the accent above.

### Underline

The classic browser-tab set — nothing filled, just an accent bar riding a hairline track.

- Set `variant="underline"` to drop all chrome; the rail gets a bottom hairline and a single accent bar slides along it between tabs.
- `color` tints the bar and the active label — this variant never paints a label on top of the accent, so pale colors stay readable.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Segmented

An iOS-style control: one recessed track, the active tab lifted onto its own surface.

- Set `variant="segmented"` to group the tabs inside one recessed track; a single raised surface slides between segments.
- `orientation="horizontal"` makes the segments share the width evenly rather than clustering at the start.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Soft

The quietest selection state: the accent tinted back to a wash, label kept in the accent.

- Set `variant="soft"` for full-round pills with a tinted active state instead of a solid fill.
- `color` supplies both the wash and the label, so any hex stays legible without a contrast check.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Elevated

Every tab is its own card. The active one takes the accent; the rest stay flat.

- Set `variant="elevated"` to give each tab its own bordered card; hovering an unselected one tints its border toward the accent.
- `className` is worth using here — the cards paint their own surface, so give the block a slightly different background for them to lift off.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Minimal

No card chrome at all — just the rail and the pane.

- Set `variant="minimal"` when the surrounding layout already supplies the panel and the borders.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Bordered

Rail and pane joined inside one outlined card, split by a single divider.

- Set `variant="bordered"` to wrap both halves in one border; the divider follows the rail to whichever edge it sits on.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Glass

Frosted panels — needs a rich background to blur.

- Set `variant="glass"` to frost both the rail and the pane over whatever is behind them.
- `color` tints the active tab; it takes preset names or a hex, and defaults to `primary`.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

## Vertical styles

The same seven styles with `orientation="vertical"`. The rail becomes a column, the divider and the travelling indicator move to the edge facing the pane, and the arrow keys switch from left/right to up/down.

### Vertical underline

The bar rotates onto the leading edge and travels down the rail, with no track line to compete with it.

- Combine `variant="underline"` with `orientation="vertical"` for a docs-sidebar rail.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Vertical soft

Tinted pills stacked down the side — the lightest sidebar there is.

- Combine `variant="soft"` with `orientation="vertical"` for a settings menu that stays out of the way.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Vertical elevated

A stack of cards, the active one filled and raised.

- Combine `variant="elevated"` with `orientation="vertical"` when each tab is a destination worth its own surface.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Vertical segmented

The track turns on its side and the raised surface travels vertically; segments keep their full width rather than sharing it.

- Combine `variant="segmented"` with `orientation="vertical"` for a compact grouped switcher in a narrow column.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Vertical bordered

One card around both halves, divided down the middle.

- Combine `variant="bordered"` with `orientation="vertical"` and the divider moves from the bottom edge to the right edge of the rail.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

### Vertical glass

Two frosted panels side by side.

- Combine `variant="glass"` with `orientation="vertical"` over a photo or gradient — it needs something to blur.

```tsx
import { VerticalTabs, type TabItem } from "@/components/custom/blocks/VerticalTabs";

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `TabItem[]` | Required | Array of objects containing the tab `id`, `label`, optional `icon`, and the `content` to render. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Which way the tab rail runs. `horizontal` puts it across the top as a bar that scrolls sideways when the tabs outgrow the width; `vertical` puts it beside the content pane, stacking above it below `md`. |
| `variant` | `"default" \| "glass" \| "minimal" \| "bordered" \| "underline" \| "segmented" \| "soft" \| "elevated"` | `"default"` | The visual treatment, independent of `orientation`. `default` is a filled pill on a card; `underline` marks the active tab with an accent bar and no fill; `segmented` groups the tabs in one recessed track; `soft` tints the accent instead of filling with it; `elevated` gives every tab its own card; `bordered` joins rail and pane inside one outline; `minimal` removes every background container; and `glass` frosts them. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "purple" \| "zinc" \| string` | `"primary"` | Applies the active state color to the selected tab. Accepts preset names or valid hex codes (e.g. `"#FF0055"`) — a hex also derives its own label color, so pale accents stay readable. |
| `defaultActiveId` | `string` | `tabs[0].id` | Optionally specify which tab ID should be open when the component first mounts. |
| `className` | `string` | `—` | Merged onto the outer wrapper, so layout and background belong here. |

## Keyboard and motion

The rail is a real `tablist`: each tab is a `tab` that owns the panel through `aria-controls`, and only the selected tab is in the page's tab order. Reaching the rail with Tab lands on the selected tab; from there the arrow keys along the rail's own axis move the selection — left and right when the rail runs across the top, up and down when it runs down the side — and Home and End jump to its ends. Tab again moves into the panel.

Focus is drawn in the current `color` rather than the browser default, so it belongs to the theme.

Two things move, and both only in answer to something you did. The `underline` and `segmented` indicators are single elements that travel between tabs, and the panel enters from the side you moved toward — later tab, enters from the far edge; earlier tab, from the near one. Nothing animates on load, and under `prefers-reduced-motion` the travel is dropped for a plain fade.

---

Live previews and every example: https://avaraui.com/docs/nextjs/vertical-tabs
