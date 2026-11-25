---
title: "Shadcn Folder"
description: "Shadcn Folder. A tactile folder (`Folder`, `SkeletonCard`) with a 3D frosted-glass pocket, OKLCH color-derived shades, and fanned card previews on hover, tap."
url: https://avaraui.com/docs/nextjs/folder
---

# Shadcn Folder

A tactile folder (`Folder`, `SkeletonCard`) with a 3D frosted-glass pocket, OKLCH color-derived shades, and fanned card previews on hover, tap, or focus.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/folder.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/folder
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/folder-motion.json
```

## Folder

Hover, tap or focus the folder to fan the cards out.

- `peek` is how many skeleton cards to show when no `files` are given — `0` is an empty folder, `3` (default) is filled.
- `size` is the folder width in pixels; height, tab, corner radius and card sizes all derive from it.
- `color` defaults to a soft tint of `--primary` (lightness 0.88, chroma at 40%), so the folder — body, pocket, icon and the peeking cards — follows your theme preset and the colour picker above without going heavy. Pass any CSS colour to pin one.

```tsx
import { Folder } from "@/components/custom/blocks/FolderBlock";
import { Image } from "lucide-react";

// The folder takes a soft tint of the theme colour by default; pass `color` to pin one.
// peek={0} → an empty folder; peek={3} (default) → filled
export default function ProductShots() {
  return (
    <Folder label="Product shots" count="36 photos" icon={Image} peek={3} />
  );
}
```

## Fan on hover

Hover a card for its name. Use the arrows — or drag a card sideways — to page through; the window wraps at either end.

- `files` is the list peeking out. Without `thumb` each one renders as a unified skeleton card; `name` shows in a tooltip while the fan is open. Past five, the fan pages.

```tsx
import { Folder } from "@/components/custom/blocks/FolderBlock";
import { FileText } from "lucide-react";

// Hovering fans the cards out into an arc above the folder — hovering a
// card shows its name. Past five, arrows page through and wrap around.
const files = [
  { name: "Deposition_transcript.pdf" },
  { name: "Exhibit_A_photos.zip" },
  { name: "Witness_statement_02.docx" },
  { name: "Timeline_v3.xlsx" },
  { name: "Court_filing_draft.pdf" },
  { name: "Evidence_log.csv" },
  { name: "Contract_redline.docx" },
  { name: "Settlement_terms.pdf" },
];

export default function CaseFiles() {
  return <Folder files={files} label="Case files" icon={FileText} />;
}
```

## Icon

Pick an icon — it and the pocket take their shades from the theme colour chosen at the top of the page.

- `icon` is any lucide icon component; it sits centred on the front pocket and is darkened from `color` by a fixed OKLCH amount, so it stays legible on light and dark bodies alike.

```tsx
"use client";

import { Folder } from "@/components/custom/blocks/FolderBlock";
import { Camera, FileText, Image, type LucideIcon, Music, Palette, Video } from "lucide-react";
import { useState } from "react";

const ICONS: Array<{ id: string; icon: LucideIcon }> = [
  { id: "palette", icon: Palette },
  { id: "image", icon: Image },
  { id: "file", icon: FileText },
  { id: "camera", icon: Camera },
  { id: "music", icon: Music },
  { id: "video", icon: Video },
];

export default function DesignAssets() {
  const [iconId, setIconId] = useState("palette");
  const icon = ICONS.find((i) => i.id === iconId)?.icon ?? Palette;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* the icon adopts a darker shade of the folder colour, itself a tint of the theme */}
      <Folder icon={icon} label="Design assets" count="24 files" />

      <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1">
        {ICONS.map(({ id, icon: I }) => (
          <button
            key={id}
            type="button"
            aria-label={id}
            onClick={() => setIconId(id)}
            className={iconId === id ? "flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground" : "flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"}
          >
            <I size={16} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Photos

Drag a photo sideways — or swipe it with a thumb — to page through; the arrows do the same.

- `files` entries with a `thumb` URL become photo cards — the picture is clipped to the card's rounded corners and fans out like the rest.

```tsx
import { Folder } from "@/components/custom/blocks/FolderBlock";
import { Camera } from "lucide-react";

// { thumb } turns a card into a photo. Add { name } for a hover tooltip.
const photos = [
  { thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg", name: "IMG_4021.jpg" },
  { thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg", name: "IMG_4022.jpg" },
  { thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg", name: "IMG_4023.jpg" },
  { thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg", name: "IMG_4024.jpg" },
  { thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg", name: "IMG_4025.jpg" },
  { thumb: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1518837695005-2083093ee35b-1790150482277.jpg", name: "IMG_4026.jpg" },
];

export default function SummerTrip() {
  return <Folder files={photos} label="Summer trip" count="6 photos" icon={Camera} />;
}
```

## About Shadcn Folder

**What it is.** `Folder` renders a squircle folder with a frosted-glass front pocket, `peek` skeleton cards (or photo/file thumbnails via `files`), paging arrows when there is more than one item (the fan shows up to five cards at a time), and optional `interactive` drag-and-drop upload mode.

**How it is built.** Derives pocket, icon, and card shades in OKLCH from `color` (defaulting to `--primary`), measures its nearest clipping ancestor to fit narrow containers, and respects `prefers-reduced-motion`. The default build uses GSAP; `folder-motion` is the same API on Motion.

**When to use it.** Use `Folder` for file collections, media albums, and playful upload targets. For dropzone upload queues, see [File Upload](https://avaraui.com/docs/nextjs/file-upload); for component-showcase folders, see [Components Folder](https://avaraui.com/docs/nextjs/design-components-folder).

## For AI agents

**When to use**

- Tactile folder previews with fanned skeleton/photo cards (`files`, `peek`, `icon`) or interactive file drop targets (`interactive`)

**When not to use**

- Full multi-file upload queues with per-file progress — use [File Upload](https://avaraui.com/docs/nextjs/file-upload)

**Agent notes**

- Named exports: `Folder`, `SkeletonCard` from `@/components/custom/blocks/FolderBlock` (ships GSAP and Motion twin builds)
- Avoid `overflow-hidden` on the immediate parent so the fanned cards have headroom above the folder
- `files` takes `{ thumb?, name?, progress? }` objects; with no `files`, `peek` skeleton cards are shown.
- Install `folder` (GSAP) or `folder-motion` (Motion), not both. Both pull in the Tooltip block and `lucide-react`.

## Props Reference

### `<Folder>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | Title under the folder. |
| `count` | `string` | — | Count / subtitle line. Falls back to `"{"{n}"} items"`, or `"Drop files or click"` when interactive. |
| `color` | `string` | tint of `--primary` | Folder body colour — any CSS colour. By default a pastel of the theme colour (`FOLDER_THEME_TINT`: lightness 0.88, chroma at 40%). Pocket, icon and skeleton cards derive their shades from it. |
| `icon` | `LucideIcon` | — | A lucide icon component shown on the front pocket. |
| `files` | `FolderFile[]` | — | `{ thumb?, name?, progress? }` — photo, skeleton card, or both; `name` shows in a tooltip on hover. |
| `peek` | `number` | `3` | Skeleton cards to show when no `files` are given. |
| `open` | `boolean` | — | Force the fan open or closed. Omit to let hover, tap, focus and drag drive it. |
| `blur` | `number` | `10` | Frosted-glass blur on the pocket, in px. |
| `size` | `number` | `260` | Folder width in px. Height derives from it. |
| `progress` | `number` | — | Overall upload progress 0–100 — drives the bar across the pocket while below 100. |
| `stickers` | `ReactNode` | — | Extra decoration on the pocket (emoji, etc.) — sits under the icon. |
| `showLabel` | `boolean` | `true` | Show the title. |
| `showCount` | `boolean` | `true` | Show the count line. |
| `interactive` | `boolean` | `false` | Enable drag-and-drop + click-to-browse. |
| `toggleOnClick` | `boolean` | `!interactive` | Tap toggles the fan — the touch/keyboard path to the hover reveal. Turn off when an ancestor owns the click. |
| `focusable` | `boolean` | `false` | Join the tab order and open the fan on focus without a tap toggling it — for when `toggleOnClick` is off. |
| `accept` | `string` | — | Passed to the hidden file input. |
| `multiple` | `boolean` | `true` | Allow picking several files at once. |
| `onFiles` | `(files: File[]) => void` | — | Fires with dropped or selected files. |
| `onRemoveFile` | `(index: number) => void` | — | Shows an × on each fanned card, reporting the file's index within `files`. |
| `className` | `string` | — | Merged onto the root. |

### `SkeletonCard`

Also exported. The placeholder "document" the folder draws for files without a `thumb` — reuse it anywhere you need a pretend file so the language stays consistent.

## Works with other components

- Use `interactive` mode as a playful drop target alongside [File Upload](https://avaraui.com/docs/nextjs/file-upload), which handles the upload queue.
- Compare with [Components Folder](https://avaraui.com/docs/nextjs/design-components-folder) for multi-card showcase folders.
- Card names in the fan are shown with the [Tooltip](https://avaraui.com/docs/nextjs/tooltip) block, which installs as a dependency.

## Why shouldn't I put overflow-hidden on Folder's parent?

When hovered or focused, `Folder` fans its cards roughly half the folder's height above the top edge and places paging arrows just outside its width; `overflow-hidden` on an immediate ancestor will clip them. Leave headroom above the folder.

## How do I show my own photos in the Folder fan?

Pass `files` with a `thumb` URL on each entry. Those cards render as photos clipped to the card corners, while entries without `thumb` render as skeleton cards. Add `name` to show a tooltip, and `onRemoveFile` to get an × on each open card that reports its index.

## How do I turn Folder into a file drop target?

Set `interactive` and handle `onFiles`, which receives the dropped or picked `File[]`. Clicking the folder opens the browser file picker, and `accept` and `multiple` go to the hidden input. Drive the pocket's progress bar with a `progress` value from 0 to 100.

## How do I open the Folder fan on touch or with the keyboard?

By default a tap, or Enter and Space on the focused folder, toggles the fan, and focus inside it also opens it. If an ancestor owns the click, set `toggleOnClick={false}` and add `focusable` so the fan still opens on focus. Pass `open` to force it.

## How do I change the Folder colour?

Pass `color` any CSS colour. Without it the folder uses `FOLDER_THEME_TINT`, a soft tint of your theme's `--primary`, so it follows theme presets. The pocket, icon and skeleton cards derive their shades from `color` in OKLCH, so one value restyles the whole folder.

## Should I use the GSAP or the Motion build of Folder?

Either. `folder` installs with `gsap` and `folder-motion` with `motion`, and both export `Folder` and `SkeletonCard` with the same props and `prefers-reduced-motion` handling. Neither imports `next/*`, so both run in Vite. Pick the library your project already ships and install one.

---

Live previews and every example: https://avaraui.com/docs/nextjs/folder
