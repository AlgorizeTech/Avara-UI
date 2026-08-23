# UX Engineered Upload Flow

A highly-orchestrated, premium file upload component suite based on modern UX engineering principles. It goes far beyond a native `` by addressing five distinct user feedback signals.

1. **Drag Feedback:** The dropzone reacts physically (glow, border shift, icon scale) to drag events via GSAP.
2. **Honest Progress:** Replaces mystery spinners with exact percentage tracking, dynamic time estimations, and file metadata.
3. **Inline Retry:** Files that fail mid-upload do not reset. They halt their state, turn red, and offer an inline 1-click retry button to resume.
4. **Upload Preview:** Extracts visual proof (thumbnails) of the file instantly on the client side before upload completes.
5. **Independent Queue:** Every file gets its own lane and state. One failure never blocks the others.

The suite is two pieces you compose yourself: a `Dropzone` that hands you `File[]`, and an `UploadItem` that renders one entry of your own queue state. Drop real files into the first preview — its simulator randomly fails some at 89% so you can watch the inline retry resume.

export const usageDropzone = `export default function AvatarDropzone() {
  // accept is the native input string; maxSize is in MB and is echoed
  // in the helper text under the icon.
  return (
     console.log(files)}
      accept="image/png,image/jpeg"
      maxSize={5}
    />
  );
}`;

export const usageStates = `// status is the state machine that drives every colour, icon and action
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
    
      {queue.map((item) => (
         {}}
          onRemove={() => {}}
        />
      ))}
    
  );
}`;

## Installation

### Optional — animated queue

The animated-queue example additionally uses `framer-motion`. It is optional; `UploadItem` renders fine without it.

```bash
npx shadcn@latest install framer-motion
```

## Examples

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          Dropzone

          onFilesDrop

          (files: File[]) =&gt; void

          Required

          Callback function triggered when the user successfully drops files
          into the zone or selects them via the native file browser.

          Dropzone

          maxSize

          number

          50

          The maximum allowed file size in Megabytes (MB). Displayed dynamically
          in the helper text.

          Dropzone

          accept

          string

          undefined

          Native HTML input accept string restricting file types (e.g.,{" "}
          "image/*,application/pdf").

          UploadItem

          item

          FileUploadState

          Required

          The data object tracking the specific file's progress, status, and
          metadata.

          UploadItem

          onRetry

          (id: string) =&gt; void

          undefined

          Callback fired when the user clicks the inline "Retry" button after a
          file fails to upload.

          UploadItem

          onRemove

          (id: string) =&gt; void

          undefined

          Callback fired when the user clicks the "X" button to cancel an upload
          or clear a completed file from the queue.

          FileUploadState

          status

          "idle" | "uploading" | "paused" | "error" | "success"

          Required

          The core state machine parameter that drives the UI colors, icons, and
          messaging for the specific upload item.

          FileUploadState

          previewUrl

          string

          undefined

          Optional local Blob URL used to render instant client-side image
          thumbnails before the upload completes.

---

**Component Path:** `[framework]\file-upload\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
