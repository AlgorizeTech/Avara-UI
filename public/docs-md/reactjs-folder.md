# Folder

A tactile folder — unified skeleton cards (or your own photos) tuck behind a frosted-glass front pocket.

The back panel and its tab are one continuous squircle path, the pocket is frosted glass that tilts open in 3D, and the cards inside lift into a shallow arc on hover, tap or focus. Give it a `color` and the pocket, icon and cards all derive their shades from it in OKLCH. Pass `files` with thumbnails to show real photos, names to get hover tooltips, or switch on `interactive` to make it a drag-and-drop upload target with progress bars.

Explore the different variations of the Folder — each example shows a live preview with the exact code to copy. Hover a folder to open it.

export const usageDefault = `import { Folder } from "@/components/custom/blocks/FolderBlock";

// peek={0} → an empty folder; peek={3} (default) → filled
export default function ProductShots() {
  return (
    
  );
}`;

export const usageFan = `import { Folder } from "@/components/custom/blocks/FolderBlock";

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
  return ;
}`;

export const usageIcon = `const ICONS: Array = [
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
    
      {/* the icon adopts a darker shade of the folder colour */}

        {ICONS.map(({ id, icon: I }) => (
           setIconId(id)}
            className={iconId === id ? "flex size-8 items-center justify-center rounded-full bg-zinc-900 text-white" : "flex size-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"}
          >

        ))}

  );
}`;

export const usagePhotos = `import { Folder } from "@/components/custom/blocks/FolderBlock";

// { thumb } turns a card into a photo. Add { name } for a hover tooltip.
const photos = [
  { thumb: "/photos/IMG_4021.jpg", name: "IMG_4021.jpg" },
  { thumb: "/photos/IMG_4022.jpg", name: "IMG_4022.jpg" },
  { thumb: "/photos/IMG_4023.jpg", name: "IMG_4023.jpg" },
  { thumb: "/photos/IMG_4024.jpg", name: "IMG_4024.jpg" },
  { thumb: "/photos/IMG_4025.jpg", name: "IMG_4025.jpg" },
  { thumb: "/photos/IMG_4026.jpg", name: "IMG_4026.jpg" },
];

export default function SummerTrip() {
  return ;
}`;

export const usageUpload = `export default function DropZone() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState();

  // Replace the timer with your real upload — set each file's progress and
  // the overall figure as bytes go out; the bars vanish once they reach 100.
  const onFiles = (incoming: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...incoming.map((f) => ({
        name: f.name,
        progress: 0,
        thumb: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
      })),
    ]);
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + 4);
      setProgress(p);
      setFiles((prev) => prev.map((f) => (f.progress! = 100) clearInterval(id);
    }, 80);
  };

  return (
     setFiles((prev) => prev.filter((_, idx) => idx !== i))}
      accept="image/*,.pdf"
    />
  );
}`;

## Installation

## Examples

## Features
Discover the Folder's capabilities for presenting a group of files as one tactile object.

    One silhouette
    The tab and body are a single rounded path, so the join never shows a notch and every corner — including the slant — is a true squircle.

    Colour-derived shades
    Pocket, icon and skeleton cards are computed from color in OKLCH, so any base colour — near-black included — stays readable.

    Fits the room
    The fan measures its nearest clipping ancestor and tightens the gap — then drops a card — rather than overflowing on a narrow screen.

    Reachable everywhere
    Hover opens it on desktop; a tap toggles it on touch; focus opens it from the keyboard. Every animation respects prefers-reduced-motion.

## Best Practices & Guidelines

    Leave headroom above the folder
    The fan lifts cards roughly half the folder's height above it and the arrows sit just outside its width. Give the folder that space, and avoid overflow-hidden on its immediate parent.

    Do not double up the click
    An interactive folder spends its click on the file picker, so tap-to-toggle is off there. If an ancestor already handles clicks, pass toggleOnClick={false} and focusable so the fan stays keyboard-reachable.

## Props Reference

### `` Props

        Prop
        Type
        Default
        Description

        label
        string
        —
        Title under the folder.

        count
        string
        —
        Count / subtitle line. Falls back to "{"{n}"} items", or "Drop files or click" when interactive.

        color
        string
        soft neutral
        Folder body colour — any CSS colour. Pocket, icon and skeleton cards derive their shades from it.

        icon
        LucideIcon
        —
        A lucide icon component shown on the front pocket.

        files
        FolderFile[]
        —
        {"{ thumb?, name?, progress? }"} — photo, skeleton card, or both; name shows in a tooltip on hover.

        peek
        number
        3
        Skeleton cards to show when no files are given.

        open
        boolean
        —
        Force the fan open or closed. Omit to let hover, tap, focus and drag drive it.

        blur
        number
        6
        Frosted-glass blur on the pocket, in px.

        size
        number
        260
        Folder width in px. Height derives from it.

        progress
        number
        —
        Overall upload progress 0–100 — drives the bar across the pocket while below 100.

        stickers
        ReactNode
        —
        Extra decoration on the pocket (emoji, etc.) — sits under the icon.

        showLabel
        boolean
        true
        Show the title.

        showCount
        boolean
        true
        Show the count line.

        interactive
        boolean
        false
        Enable drag-and-drop + click-to-browse.

        toggleOnClick
        boolean
        !interactive
        Tap toggles the fan — the touch/keyboard path to the hover reveal. Turn off when an ancestor owns the click.

        focusable
        boolean
        false
        Join the tab order and open the fan on focus without a tap toggling it — for when toggleOnClick is off.

        accept
        string
        —
        Passed to the hidden file input.

        multiple
        boolean
        true
        Allow picking several files at once.

        onFiles
        {"(files: File[]) => void"}
        —
        Fires with dropped or selected files.

        onRemoveFile
        {"(index: number) => void"}
        —
        Shows an × on each fanned card, reporting the file's index within files.

        className
        string
        —
        Merged onto the root.

### `SkeletonCard`

Also exported. The placeholder "document" the folder draws for files without a `thumb` — reuse it anywhere you need a pretend file so the language stays consistent.

---

**Component Path:** `[framework]\folder\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
