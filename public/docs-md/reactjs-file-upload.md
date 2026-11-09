---
title: "Shadcn File Upload"
description: "A file upload dropzone with an upload queue and upload states, plus a simple file input and a folder drop target. Shadcn/ui with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/file-upload
---

# Shadcn File Upload

A highly-orchestrated, premium file upload component suite based on modern UX engineering principles. It goes far beyond a native `<input type="file">` by addressing five distinct user feedback signals.

1. **Drag Feedback:** The dropzone reacts physically (glow, border shift, icon scale) to drag events.
2. **Honest Progress:** Replaces mystery spinners with exact percentage tracking, dynamic time estimations, and file metadata.
3. **Inline Retry:** Files that fail mid-upload do not reset. They halt their state, turn red, and offer an inline 1-click retry button to resume.
4. **Upload Preview:** Extracts visual proof (thumbnails) of the file instantly on the client side before upload completes.
5. **Independent Queue:** Every file gets its own lane and state. One failure never blocks the others.

The suite is two pieces you compose yourself: a `Dropzone` that hands you `File[]`, and an `UploadItem` that renders one entry of your own queue state. Drop real files into the first preview — its simulator randomly fails some at 89% so you can watch the inline retry resume.

Three upload surfaces live on this page, and each installs separately: the `Dropzone` + `UploadItem` suite, the `Input` block's built-in file mode for simple forms, and the `Folder` block as a playful drop target. Each section below ends with its own install.

## For AI agents

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

## Dropzone and upload queue

The full suite: a `Dropzone` that hands you `File[]`, and an `UploadItem` for each row of your own queue state.

### Dropzone

- Use `accept` with a native input accept string such as `"image/*,application/pdf"` to restrict types.
- `maxSize={50}` is the limit in **megabytes**, and is echoed in the helper text automatically.

```tsx
// Rows fade up in; a removed row fades up out and closes its gap, so the
// rows under it slide up. `animationend` then drops it from state.
const queueCss = `
.upload-row { display: grid; grid-template-rows: 1fr; margin-top: 8px;
  animation: upload-row-in 0.3s cubic-bezier(0, 0, 0.58, 1) backwards; }
.upload-row > * { min-height: 0; }
.upload-row[data-leaving] { animation: upload-row-out 0.3s cubic-bezier(0, 0, 0.58, 1) forwards; }
@keyframes upload-row-in { from { opacity: 0; transform: translateY(20px); } }
@keyframes upload-row-out {
  to { opacity: 0; transform: translateY(-20px); grid-template-rows: 0fr; margin-top: 0; }
}
`;

export default function FileUploader() {
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [leaving, setLeaving] = useState<string[]>([]);

  const handleFilesDrop = (droppedFiles: File[]) => {
    const newItems: FileUploadState[] = droppedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 100,
      status: "success",
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));
    setFiles((prev) => [...newItems, ...prev]);
  };

  const handleRemove = (id: string) => {
    setLeaving((prev) => [...prev, id]);
  };

  const handleGone = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setLeaving((prev) => prev.filter((l) => l !== id));
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-6 mx-auto">
      <Dropzone
        onFilesDrop={handleFilesDrop}
        accept="image/*,application/pdf"
        maxSize={5}
      />

      {files.length > 0 && (
        <div className="flex flex-col">
          <style>{queueCss}</style>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
            <span>Uploaded Files ({files.length - leaving.length})</span>
          </div>

          {files.map((item) => (
            <div
              key={item.id}
              className="upload-row"
              data-leaving={leaving.includes(item.id) || undefined}
              onAnimationEnd={(e) => {
                if (e.target === e.currentTarget && leaving.includes(item.id)) handleGone(item.id);
              }}
            >
              <div>
                <UploadItem item={item} onRemove={handleRemove} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Upload states

- `status` drives the whole row — `idle`, `uploading`, `paused`, `error` and `success` each pick their own colours, icon and messaging.
- `onRetry` is what the inline Retry button calls after an `error`; `onRemove` backs the X.

```tsx
// status is the state machine that drives every colour, icon and action
// on the row. progress/timeLeft/errorMessage come along for the ride.
const queue: FileUploadState[] = [
  {
    id: "1",
    file: new File([], "quarterly-report.pdf", { type: "application/pdf" }),
    progress: 42,
    status: "uploading",
    timeLeft: 12,
  },
  {
    id: "2",
    file: new File([], "product-shot.png", { type: "image/png" }),
    progress: 66,
    status: "paused",
  },
  {
    id: "3",
    file: new File([], "launch-teaser.mp4", { type: "video/mp4" }),
    progress: 89,
    status: "error",
    errorMessage: "Connection lost",
  },
  {
    id: "4",
    file: new File([], "brand-guidelines.pdf", { type: "application/pdf" }),
    progress: 100,
    status: "success",
    timeLeft: 0,
  },
];

export default function UploadStates() {
  return (
    <div className="flex flex-col gap-3">
      {queue.map((item) => (
        <UploadItem
          key={item.id}
          item={item}
          onRetry={() => {}}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
}
```

### Install the upload suite

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/upload.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/upload
```

The dropzone example animates its queue with a few lines of CSS in the example itself — no extra package. It is optional; `UploadItem` renders fine without it.

## Simple file input

For a form that just needs files attached, the `Input` block has a file mode with previews and removal built in. It has no dependency on the upload suite.

### Simple file input

For a form that just needs files attached: the `Input` block in file mode, with previews and removal built in.

- Set `type="file"` on `InputBlock` to turn the field into a drag-and-drop zone with previews.
- `onFilesChange` returns native `File[]` on drop, selection and removal.
- `multiple` and `accept` pass through; `accept` takes the standard HTML string such as `"image/*"`.

```tsx
export default function FileUploadInput() {
  // type="file" turns the Input block into a drag-and-drop zone with
  // previews, sizes and remove buttons — no queue state to manage.
  return (
    <InputBlock
      type="file"
      multiple
      accept="image/*"
      label="Upload Portfolio"
      helperText="Attach your files here."
      onFilesChange={(files) => console.log("Uploaded files:", files)}
    />
  );
}
```

### Install the input block

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/input.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/input
```

## Folder drop target

The `Folder` block as an upload surface — a playful alternative to a dropzone for a handful of files.

### Folder drop target

The `Folder` block as an upload surface, tinted with the theme colour: drop files on it or click to browse. It starts empty, each dropped file becomes a card with its own progress bar, the pocket tracks the overall figure, and an × removes a file.

- Set `interactive` to enable drag-and-drop and click-to-browse. `onFiles` receives the dropped or picked `File[]`; `accept` and `multiple` pass through to the input.
- `peek={0}` keeps the folder empty until the first drop — without it the folder shows three placeholder cards peeking out.
- `progress` drives the bar across the pocket (0–100); a per-file `progress` draws a bar on that card. `onRemoveFile` adds an × to each fanned card.
- `color` defaults to a soft tint of `--primary` (lightness 0.88, chroma at 40%), so the folder — body, pocket, icon and the peeking cards — follows your theme preset and the colour picker above without going heavy. Pass any CSS colour to pin one.

```tsx
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

### Install the folder block

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

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

### Fluid Animations

Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

### Highly Customizable

Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

### Responsive Design

Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

### Accessible

Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

### Animation Performance

Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

### State Management

When triggering animations via state changes, ensure you wrap state updates in `startTransition` or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Dropzone` | `onFilesDrop` | `(files: File[]) => void` | Required | Callback function triggered when the user successfully drops files into the zone or selects them via the native file browser. |
| `Dropzone` | `maxSize` | `number` | `50` | The maximum allowed file size in Megabytes (MB). Displayed dynamically in the helper text. |
| `Dropzone` | `accept` | `string` | `undefined` | Native HTML input accept string restricting file types (e.g., `"image/*,application/pdf"`). |
| `UploadItem` | `item` | `FileUploadState` | Required | The data object tracking the specific file's progress, status, and metadata. |
| `UploadItem` | `onRetry` | `(id: string) => void` | `undefined` | Callback fired when the user clicks the inline "Retry" button after a file fails to upload. |
| `UploadItem` | `onRemove` | `(id: string) => void` | `undefined` | Callback fired when the user clicks the "X" button to cancel an upload or clear a completed file from the queue. |
| `FileUploadState` | `status` | `"idle" \| "uploading" \| "paused" \| "error" \| "success"` | Required | The core state machine parameter that drives the UI colors, icons, and messaging for the specific upload item. |
| `InputBlock` | `type` | `"file"` | `"text"` | Switches the Input block into the drag-and-drop zone shown in the simple file input example. |
| `InputBlock` | `onFilesChange` | `(files: File[]) => void` | `undefined` | Fired when files are dropped, selected, or removed, with the current native `File[]`. |
| `InputBlock` | `multiple` / `accept` | `boolean` / `string` | `false` / `undefined` | Allow several files, and restrict types with the standard HTML accept string (e.g. `"image/*"`). |
| `FileUploadState` | `previewUrl` | `string` | `undefined` | Optional local Blob URL used to render instant client-side image thumbnails before the upload completes. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/file-upload
