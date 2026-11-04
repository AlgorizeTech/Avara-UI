---
title: "Sonner (Toast Stack)"
description: "An opinionated, dependency-free toast component that mimics the famous \"Sonner\" library aesthetic. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/sonner
---

# Sonner (Toast Stack)

An opinionated, dependency-free toast component that mimics the famous "Sonner" library aesthetic.

Traditional toast notifications stack in a massive, screen-blocking vertical list. This `SonnerBlock` stacks new notifications _on top_ of old ones, scaling older toasts down and pushing them backwards in 3D space to keep your UI clean. Hovering over the stack automatically expands it so users can read previous notifications.

Click the trigger buttons to spawn toasts, then hover the floating stack to expand it.

## Sonner

Mount `<Toaster />` once, then call `toast()` from anywhere — no provider needed.

- `children` of `toast()` is the message; everything else about the toast is optional.

```tsx
"use client";



// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function SaveButton() {
  return (
    <>
      <Toaster position="bottom-right" />

      <button
        className={BTN}
        onClick={() =>
          toast("Profile updated successfully", {
            description: "Your changes have been saved to the database.",
          })
        }
      >
        Show toast
      </button>
    </>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/sonner.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/sonner
```

## Examples

### Types

- Use `toast.success` `toast.error` and `toast.info` for the semantic icon and colour. They take the same arguments as `toast()`.

```tsx
"use client";



// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function ToastTypes() {
  return (
    <>
      <div className="flex flex-wrap gap-4">
      <button
 className={BTN}
 onClick={() => toast("Profile updated successfully", { description: "Your changes have been saved to the database." })}>
        Default
      </button>
      <button
 className={BTN}
 onClick={() => toast.success("Deployment Complete", { description: "Your site is now live on the production server." })}>
        Success
      </button>
      <button
 className={BTN}
 onClick={() => toast.error("Connection Failed", { description: "Could not reach the database. Please try again later." })}>
        Error
      </button>
      <button
 className={BTN}
 onClick={() => toast.info("New login detected", { description: "A new device just signed in to your account." })}>
        Info
      </button>
      </div>
      <Toaster />
    </>
  );
}
```

### With action

- Pass `action` as `{ label, onClick }` to add an inline button — the usual home for Undo.

```tsx
"use client";



// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function UndoToast() {
  return (
    <>
      <button
        className={BTN}
        onClick={() =>
          toast("Message deleted", {
            action: {
              label: "Undo",
              onClick: () => alert("Undo clicked!"),
            },
          })
        }
      >
        With Action
      </button>
      <Toaster />
    </>
  );
}
```

### Stacking

- `position` on the Toaster decides where they pile up; newer toasts sit on top and older ones recede until hovered.

```tsx
"use client";



// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function StackDemo() {
  // New toasts stack on top; older ones scale down and slide back in 3D.
  // Hover the stack to expand it into a readable list.
  const uploadAll = () => {
    toast.success("File uploaded", { description: "report-q3.pdf" });
    setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
    setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
  };

  return (
    <>
      <button className={BTN} onClick={uploadAll}>
        Spawn three toasts
      </button>
      <Toaster />
    </>
  );
}
```

### Always expanded

- Set `expand` on the Toaster to keep the stack open instead of collapsing it to a pile.

```tsx
"use client";



// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

export default function ExpandedStack() {
  // expand keeps the stack permanently open instead of collapsing it in 3D.
  // Mount <Toaster /> once, at the root of your app.
  return (
    <>
      <Toaster expand />

      <button
        className={BTN}
        onClick={() => {
          toast.success("File uploaded", { description: "report-q3.pdf" });
          setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
          setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
        }}
      >
        Spawn three toasts
      </button>
    </>
  );
}
```

### Duration

- `duration` is the auto-dismiss delay in milliseconds. Pass `Infinity` and the toast stays up until dismissed.

```tsx
"use client";



// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function ToastDuration() {
  return (
    <>
      <div className="flex flex-wrap gap-4">
      {/* Infinity disables auto-dismiss — the user closes it */}
      <button
        className={BTN}
        onClick={() =>
          toast("Syncing your workspace", {
            description: "This toast stays until you dismiss it.",
            duration: Infinity,
          })
        }
      >
        Persistent
      </button>

      <button
        className={BTN}
        onClick={() =>
          toast.success("Saved", {
            description: "Gone in 1.5 seconds.",
            duration: 1500,
          })
        }
      >
        Quick
      </button>
      </div>
      <Toaster />
    </>
  );
}
```

### Position

- `position` anchors the stack to any of the six edges — `top-left` through `bottom-right`.

```tsx
"use client";





const POSITIONS: { value: NonNullable<ToasterProps["position"]>; label: string }[] = [
  { value: "top-left", label: "Top left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
];

export default function PositionDemo() {
  const [position, setPosition] = useState<NonNullable<ToasterProps["position"]>>("bottom-right");

  return (
    <>
      {/* In a real app you mount <Toaster /> once, at the root, with a fixed position */}
      <Toaster position={position} />

      <div className="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-3">
        {POSITIONS.map((p) => (
          <button
            key={p.value}
            onClick={() => {
              // Clear first, then move the stack, so the new toast animates in
              // at the new anchor instead of sliding across from the old one.
              toast.clear();
              setPosition(p.value);
              setTimeout(() => {
                toast(p.label, { description: `Stack anchored to "${p.value}".` });
              }, 50);
            }}
            className={cn(
              "px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
              position === p.value
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "bg-muted text-foreground hover:bg-foreground/10",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </>
  );
}
```

## Features
Explore the Sonner toast notification features, including stacked layouts, swipe-to-dismiss, and promise-based loading states.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Target | Prop / Argument | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `<Toaster>` | `position` | `"bottom-right" \| "bottom-center" \| "bottom-left" \| "top-right" \| "top-center" \| "top-left"` | `"bottom-right"` | Controls where the stack anchors on the screen. |
| `<Toaster>` | `expand` | `boolean` | `false` | If true, the stack is permanently expanded and will not collapse into the 3D view. |
| `toast()` | `title` | `string` | Required | The main, bold text of the notification. Passed as the first argument to the function. |
| `toast()` | `options.description` | `string` | `undefined` | Optional secondary text displayed beneath the title. |
| `toast()` | `options.duration` | `number` | `4000` | How long (in milliseconds) before the toast auto-dismisses. Pass `Infinity` to disable auto-dismiss. |
| `toast()` | `options.action` | `{ label: string, onClick: () => void }` | `undefined` | Provides an actionable button inside the toast. |
| `toast()` | `options.type` | `"default" \| "success" \| "error" \| "info"` | `"default"` | Determines the color scheme and accompanying icon. Alternatively, use the shorthand methods: `toast.success()`, `toast.error()`, etc. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/sonner
