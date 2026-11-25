---
title: "Shadcn File Upload"
description: "A file upload dropzone with an upload queue and upload states, plus a simple file input and a folder drop target. Shadcn/ui with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/file-upload
---

# Shadcn File Upload

A file upload suite featuring a drag-and-drop `Dropzone` + `UploadItem` queue, `InputBlock` file mode, and an interactive `Folder` drop target.

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

### Folder drop target

The `Folder` block as an upload surface: drop files on it or click to browse. Each dropped file becomes a card with its own progress bar.

- Use `interactive` to enable drag-and-drop and click-to-browse. `onFiles` receives the dropped or picked `File[]`.
- `peek={0}` keeps the folder empty until the first drop. Without it the folder shows three placeholder cards.
- `progress` drives the bar across the pocket (0–100); a per-file `progress` draws a bar on that card.

```tsx
"use client";

import { Folder, type FolderFile } from "@/components/custom/blocks/FolderBlock";
import { Image } from "lucide-react";
import { useState } from "react";

export default function DropZone() {
  const [files, setFiles] = useState<FolderFile[]>([]);
  const [progress, setProgress] = useState<number>();

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
      setFiles((prev) => prev.map((f) => (f.progress! < 100 ? { ...f, progress: p } : f)));
      if (p >= 100) clearInterval(id);
    }, 80);
  };

  return (
    // The folder takes a soft tint of the theme colour by default; pass `color` to pin one.
    <Folder
      interactive
      peek={0}
      icon={Image}
      label="Drop zone"
      files={files}
      progress={progress}
      onFiles={onFiles}
      onRemoveFile={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
      accept="image/*,.pdf"
    />
  );
}
```

## About Shadcn File Upload

**What it is.** Three composable file-upload surfaces: the `Dropzone` + `UploadItem` upload queue (`upload`), `InputBlock type="file"` for simple forms (`input`), and an interactive `Folder` drop target (`folder`).

**How it is built.** `Dropzone` hands the dropped or picked files to `onFilesDrop` as a `File[]`, and each `UploadItem` renders a row for one `FileUploadState` in its `idle`, `uploading`, `paused`, `error` or `success` state. None of these components uploads anything or checks file size: you run the request and feed `progress` back in. `accept` is passed to the native file input, and `maxSize` only changes the helper text.

**When to use it.** Use `Dropzone` + `UploadItem` when uploads need per-file progress, retry, or thumbnails; use `InputBlock type="file"` for simple form attachments; use `Folder` for playful drag-and-drop targets.

## For AI agents

**When to use**

- Multi-file upload queues with per-file progress, thumbnails, and retry (`Dropzone` + `UploadItem` from `UploadBlock`)
- Simple form file attachments (`InputBlock` with `type="file"`) or visual folder dropzones (`Folder` with `interactive`)

**When not to use**

- Plain text or password fields — use [Input](https://avaraui.com/docs/nextjs/input)

**Agent notes**

- `Dropzone` and `UploadItem` install via the `upload` registry item (`@/components/custom/blocks/UploadBlock`); `InputBlock` via `input`; `Folder` via `folder`
- `maxSize` is specified in megabytes and only changes the helper text; validate size (and dropped file types) yourself in `onFilesDrop`
- The components do not upload: create each `FileUploadState` (`id`, `file`, `progress`, `status`, optional `timeLeft`, `errorMessage`, `previewUrl`) and update `progress` and `status` as your request runs
- `UploadItem` shows a Retry button for `"error"` and `"paused"` rows when `onRetry` is passed; nothing in it pauses an upload
- `Folder` has a GSAP build (`folder`) and a Motion build (`folder-motion`); install one

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/file-upload

**When to use it.** Ways to let a visitor attach files. Three designs: a full dropzone with per-file progress, a plain file field with previews inside a form, and a folder you drop files onto.

**Gotchas:**

- `input` and `folder` are general components used for much more than uploads. Install the one that matches the chosen design and set its props from the index.

### The 3 variants

1. **Dropzone with upload states** (`dropzone`): A drag-and-drop zone with a row per file: progress, pause, retry, time remaining and success or error states.
   - Live: https://avaraui.com/view/file-upload/dropzone
   - Best for: multi-file uploads where users need to watch each file land
   - Avoid if: you only need to attach one file to a form
   - Traits: drag feedback, per-file progress, retry, size limit in megabytes
   - Install: `npx shadcn@latest add @avara-ui/upload`
   - Docs: https://avaraui.com/docs/nextjs/file-upload#dropzone
2. **File input with previews** (`file-input`): The Input block in file mode: a drag-and-drop field with previews and removal, built to sit inside a form.
   - Live: https://avaraui.com/view/file-upload/file-input
   - Best for: a form that just needs files attached
   - Avoid if: users need to see progress and retry for each file
   - Traits: inside a form, previews, removal, returns native File[]
   - Install: `npx shadcn@latest add @avara-ui/input`
   - Set these props: `{"inputType":"file"}`
   - Docs: https://avaraui.com/docs/nextjs/file-upload#simple-file-input
3. **Folder drop target** (`folder-drop`): A tactile frosted-glass folder that takes dropped or picked files; each file becomes a card with its own progress bar.
   - Live: https://avaraui.com/view/file-upload/folder-drop
   - Best for: galleries and file groups where a folder metaphor fits
   - Avoid if: you want a plain form field
   - Traits: folder metaphor, cards per file, progress bar, follows the theme colour
   - Install: `npx shadcn@latest add @avara-ui/folder`
   - Docs: https://avaraui.com/docs/nextjs/file-upload#folder-drop-target

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Dropzone` | `onFilesDrop` | `(files: File[]) => void` | Required | Callback function triggered when the user drops files into the zone or selects them via the native file browser. Receives every file as dropped, with no filtering. |
| `Dropzone` | `maxSize` | `number` | `50` | File size in Megabytes (MB) shown in the helper text ("up to 50 MB"). It is display only; the component does not reject larger files. |
| `Dropzone` | `accept` | `string` | `undefined` | Native HTML input accept string restricting the types offered by the browse dialog (e.g., `"image/*,application/pdf"`). Files dropped onto the zone are not filtered by it. |
| `UploadItem` | `item` | `FileUploadState` | Required | The data object tracking the specific file's progress, status, and metadata. |
| `UploadItem` | `onRetry` | `(id: string) => void` | `undefined` | Callback fired when the user clicks the inline "Retry" button after a file fails to upload. |
| `UploadItem` | `onRemove` | `(id: string) => void` | `undefined` | Callback fired when the user clicks the "X" button to cancel an upload or clear a completed file from the queue. |
| `FileUploadState` | `status` | `"idle" \| "uploading" \| "paused" \| "error" \| "success"` | Required | The core state machine parameter that drives the UI colors, icons, and messaging for the specific upload item. |
| `InputBlock` | `type` | `"file"` | `"text"` | Switches the Input block into the drag-and-drop zone shown in the simple file input example. |
| `InputBlock` | `onFilesChange` | `(files: File[]) => void` | `undefined` | Fired when files are dropped, selected, or removed, with the current native `File[]`. |
| `InputBlock` | `multiple` / `accept` | `boolean` / `string` | `false` / `undefined` | Allow several files, and restrict types with the standard HTML accept string (e.g. `"image/*"`). |
| `FileUploadState` | `previewUrl` | `string` | `undefined` | Optional local Blob URL used to render instant client-side image thumbnails before the upload completes. |

## Works with other components

- Pair `Dropzone` + `UploadItem` inside [Form](https://avaraui.com/docs/nextjs/form) or [Dialog](https://avaraui.com/docs/nextjs/dialog) upload modals.
- See [Input](https://avaraui.com/docs/nextjs/input) for `InputBlock` text/password modes and [Folder](https://avaraui.com/docs/nextjs/folder) for standalone animated folder cards.

## Does Dropzone upload files or check their size and type?

No. `Dropzone` only collects files and calls `onFilesDrop` with a `File[]`. `accept` goes to the native file input and filters the browse dialog, but dropped files are not filtered. `maxSize` only changes the "up to N MB" helper text, so check `file.size` and `file.type` yourself.

## How do I handle failed uploads and retries?

Set an item's `status` to `"error"` and, if you like, an `errorMessage` (the row shows "Connection lost" otherwise). When you pass `onRetry` to `UploadItem`, a Retry button appears on `"error"` and `"paused"` rows and calls `onRetry(id)` for that file only, leaving other rows alone.

## How do I show progress and time remaining on an UploadItem?

Keep a `FileUploadState[]` in state and update each item's `progress` (0 to 100) from your upload request. The bar tweens to the new value. `timeLeft` is in seconds and renders as "12s left" or "1m 5s left"; leave it unset to see "Calculating...". `previewUrl` adds an image thumbnail.

## Should I use Dropzone, InputBlock type="file" or Folder?

Use `Dropzone` plus `UploadItem` (`upload`) when you need a per-file queue with progress. Use `InputBlock` with `type="file"` (`input`) for a form field that reports `File[]` through `onFilesChange`. Use `Folder` with `interactive` (`folder`) as a playful drop target. `Dropzone` always accepts several files; `InputBlock` needs `multiple`.

## Can keyboard users open the file picker?

Not by default. `Dropzone` and the `InputBlock` file zone are plain `div` elements with click handlers, without `tabIndex` or a role. For `Dropzone`, pass `tabIndex={0}`, `role="button"` and an `onKeyDown` that calls `e.currentTarget.click()` on Enter. An `interactive` `Folder` is focusable but has no key handler to open the picker.

## How do I change the colours of the upload components?

They use theme tokens, so a Themes preset restyles them. The `Dropzone` drag highlight and the `UploadItem` progress bar use `--primary`, while error rows use rose and success rows use emerald. `Dropzone` takes `className`, `Folder` takes `color`, and you can edit the installed file for anything else.

---

Live previews and every example: https://avaraui.com/docs/nextjs/file-upload
