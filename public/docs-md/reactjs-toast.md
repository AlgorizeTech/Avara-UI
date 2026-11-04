---
title: "Toast / Notification"
description: "A toast notification system with typed variants, action buttons, custom durations and glow, glass, stacked and minimal styles. Free shadcn/ui Toast component."
url: https://avaraui.com/docs/nextjs/toast
---

# Toast / Notification

A robust, highly-animated notification system. Popups and alerts are essential for user feedback, but most libraries are heavy, difficult to style, or lack smooth animations.

This headless-style Toast component handles its own global state via Context, uses the browser's built-in Web Animations API for elastic entrance/exit animations (no animation library), automatically handles stacking, and integrates flawlessly with your dynamic theme engine.

Click the trigger buttons in each preview to fire a toast. Toasts auto-dismiss after 5 seconds — hover to pause the timer, or click the `X` to dismiss it manually. Turn on `stack` to pile them up like a notification centre instead of listing them.

## Toast

Wrap the app in `ToastProvider`, then call `toast()` from the `useToast` hook.

- `position` on the provider is global — individual toasts cannot override it.

```tsx
function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() =>
          toast({
            title: "Message sent",
            description: "We'll let you know as soon as they reply.",
          })
        }
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
      >
        Show toast
      </button>
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function SendMessage() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/toast.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/toast
```

### Wrap your app

`ToastProvider` owns the queue, so it has to sit above anything that calls `useToast` — usually `app/layout.tsx`. The global `variant` and `position` are set there, and the first example's **Usage** tab shows the whole wiring.

## Examples

### Types

- `type` picks the icon and accent — `success`, `error`, `warning`, `info` or `default`.

```tsx
const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastTypes() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

### With action

- Pass `action` to add a button. Clicking it dismisses the toast as well as running your handler.

```tsx
function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() =>
          toast({
            title: "Update available",
            description: "A new version of the app is ready to install.",
            type: "info",
            action: {
              label: "Install Now",
              onClick: () => console.log("Installing..."),
            },
          })
        }
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
      >
        Toast with action
      </button>
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastWithAction() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

### Duration

- `duration` is the auto-dismiss delay in milliseconds. `0` keeps the toast up until it is dismissed.

```tsx
const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() =>
          toast({
            title: "Upload in progress",
            description: "This toast stays until you dismiss it.",
            type: "info",
            duration: 0,
          })
        }
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
      >
        Persistent toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Saved",
            description: "This one disappears after 1.5 seconds.",
            type: "success",
            duration: 1500,
          })
        }
        className={`${TRIGGER} text-white bg-emerald-600 hover:bg-emerald-700`}
      >
        Quick toast
      </button>
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastDuration() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

### Glow

- Set `variant="glow"` to surround the card with a coloured halo — built for dark surfaces.

```tsx
const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function GlowToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.
    <ToastProvider variant="glow" position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

### Glass

- Set `variant="glass"` for a frosted card with the type accent bleeding in from the icon corner — solid badge icons, centred close button.

```tsx
const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Changes saved", description: "Your profile has been updated.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Info", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function GlassToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.
    <ToastProvider variant="glass" position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

### Stacked

Fire a few in a row, then hover the pile to fan it out.

- Set `stack` on the provider to pile toasts behind the newest one instead of listing them. Hovering expands the pile and pauses every timer in it; `stack` works with any `variant`.

```tsx
const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Changes saved", description: "Your profile has been updated.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "info", label: "Info", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function StackedToasts() {
  return (
    // stack piles toasts behind the newest one; hover the pile to fan it out.
    <ToastProvider variant="glass" stack position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

### Minimal

- Set `variant="minimal"` to strip the card down to a thin accent bar and text.

```tsx
const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function MinimalToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.
    <ToastProvider variant="minimal" position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Features
Discover the Toast component's notification features, including auto-dismissal, action buttons, and accessible screen reader announcements.

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

### `<ToastProvider>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-right" \| "top-left" \| "top-center" \| "bottom-right" \| "bottom-left" \| "bottom-center"` | `"bottom-right"` | The global position where all toasts will stack on the screen. |
| `variant` | `"default" \| "glow" \| "glass" \| "minimal"` | `"default"` | Determines the global visual styling of the toast cards. `glow` adds a coloured halo, `glass` a frosted, type-tinted card, `minimal` a thin accent bar. |
| `stack` | `boolean` | `false` | Piles toasts on top of each other with the newest in front and older ones peeking out behind it. Hovering the pile fans it out into a list and pauses auto-dismiss until the pointer leaves. |

### `toast(options)` Properties

When calling the `toast()` function from the `useToast` hook, you can pass the following properties in the options object:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | Required | The bold, primary text displayed at the top of the toast. |
| `description` | `string` | `undefined` | The subtle, secondary text displayed below the title. |
| `type` | `"success" \| "error" \| "warning" \| "info" \| "default"` | `"default"` | Determines which icon is rendered next to the text. |
| `duration` | `number` | `5000` | Time in milliseconds before the toast automatically dismisses. Set to `0` to disable auto-dismiss. |
| `action` | `{ label: string, onClick: () => void }` | `undefined` | If provided, renders a bold, clickable button at the bottom of the toast. Automatically dismisses the toast when clicked. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/toast
