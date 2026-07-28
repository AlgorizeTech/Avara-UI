# UX Engineered Upload Flow

A highly-orchestrated, premium file upload component suite based on modern UX engineering principles. It goes far beyond a native `` by addressing five distinct user feedback signals.

1. **Drag Feedback:** The dropzone reacts physically (glow, border shift, icon scale) to drag events via GSAP.
2. **Honest Progress:** Replaces mystery spinners with exact percentage tracking, dynamic time estimations, and file metadata.
3. **Inline Retry:** Files that fail mid-upload do not reset. They halt their state, turn red, and offer an inline 1-click retry button to resume.
4. **Upload Preview:** Extracts visual proof (thumbnails) of the file instantly on the client side before upload completes.
5. **Independent Queue:** Every file gets its own lane and state. One failure never blocks the others.

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

## Interactive Showcase

Drag and drop some real files (images, PDFs) from your desktop into the zone below, or click to browse. The showcase includes a built-in network simulator.

_Note: The simulation will randomly force some files to "fail" at 89% to demonstrate the Inline Retry feature. Click Retry to see it resume seamlessly!_

## Installation

### Dependencies

This component relies heavily on **GSAP** to manage the smooth progress bar fill and the instantaneous dropzone border reactions.

```bash
npm install gsap lucide-react
```

### Copy the Component

You can copy the full layout code directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/UploadBlock.tsx.

## Implementation

```tsx

export default function DocumentUploader() {
  const [queue, setQueue] = useState([]);

  const handleFilesAdded = (nativeFiles: File[]) => {
    // 1. Transform raw files into your state objects
    const newItems = nativeFiles.map((file) => ({
      id: Math.random().toString(),
      file,
      progress: 0,
      status: "uploading" as const,
      // Create local preview if image
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setQueue((prev) => [...prev, ...newItems]);

    // 2. Map over files and trigger your actual Axios/Fetch POST requests here
    // update queue state inside your XHR upload progress listeners
  };

  return (

      {queue.length > 0 && (
        
          {queue.map((item) => (
             console.log("Retry API call for", id)}
              onRemove={(id) =>
                setQueue((prev) => prev.filter((q) => q.id !== id))
              }
            />
          ))}
        
      )}
    
  );
}
```

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

          "idle" | "uploading" | "error" | "success"

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

**Component Path:** `nextjs\file-upload\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
