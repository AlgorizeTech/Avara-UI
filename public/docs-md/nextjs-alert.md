---
title: "Shadcn Alert"
description: "A highly versatile Alert component designed to communicate states and important information to your users. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/alert
---

# Shadcn Alert

A highly versatile Alert component designed to communicate states and important information to your users.

Along with the classic `solid` and `outline` variations, this component now features three completely modern aesthetics: `modern` (SaaS style), `glass` (glassmorphism), and `glow` (dark mode neon).

Each example shows a live preview with the exact code to copy.

## Alert

- Pass `title` and `message` for the heading and body text.
- `type="success"` picks the semantic colour scheme.
- `variant="modern"` sets the visual style — a card with a coloured left rail and shadow.
- `icon="CheckCircle2"` names an icon from the block's `ICON_MAP`.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertDemo() {
  return (
    <Alert
      type="success"
      variant="modern"
      icon="CheckCircle2"
      title="Payment successful"
      message="Your subscription has been renewed for another 12 months."
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/alert.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/alert
```

## Examples

### Semantic types

- Use `type` to pick the semantic colour scheme — `primary`, `secondary`, `success`, `danger`, `warning`, `info` or `dark`. It tints every variant the same way.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertTypes() {
  return (
    <div className="flex flex-col gap-4">
      <Alert type="primary" variant="modern" icon="Info" title="Primary" message="A primary alert for conveying primary information." />
      <Alert type="secondary" variant="modern" icon="Bell" title="Secondary" message="A secondary alert for conveying secondary information." />
      <Alert type="success" variant="modern" icon="CheckCircle2" title="Success" message="A success alert for conveying success information." />
      <Alert type="danger" variant="modern" icon="XCircle" title="Danger" message="A danger alert for conveying danger information." />
      <Alert type="warning" variant="modern" icon="AlertTriangle" title="Warning" message="A warning alert for conveying warning information." />
      <Alert type="info" variant="modern" icon="Info" title="Info" message="A info alert for conveying info information." />
      <Alert type="dark" variant="modern" icon="Bell" title="Dark" message="A dark alert for conveying dark information." />
    </div>
  );
}
```

### Variants

- `variant="solid"` gives a tinted background with a matching border.
- `variant="outline"` gives a plain surface with a coloured border only.
- `variant="modern"` is the card style — coloured left rail and a shadow.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Alert type="primary" variant="solid" icon="Info" title="Solid" message="Tinted background with a matching border." />
      <Alert type="primary" variant="outline" icon="Info" title="Outline" message="Plain surface with a colored border." />
      <Alert type="primary" variant="modern" icon="Info" title="Modern" message="Card with a colored left rail and shadow." />
    </div>
  );
}
```

### Glass

- Set `variant="glass"` to frost the alert with a slow shimmer sweep — it needs a gradient or image behind it to read.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function GlassAlert() {
  return (
    // Glass needs something vibrant behind it — put it over an image or gradient.
    <div className="relative p-8 rounded-2xl overflow-hidden min-h-[250px] flex items-center justify-center">
      <img
        src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg"
        alt="Background"
        className="absolute inset-0 size-full object-cover"
      />
      <Alert
        type="primary"
        variant="glass"
        icon="Info"
        title="Syncing workspace"
        message="Frosted glass with a slow shimmer sweep."
      />
    </div>
  );
}
```

### Glow

- Set `variant="glow"` for a neon border, shadow and a pulsing icon — built for dark dashboards.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function GlowAlert() {
  return (
    // Glow is built for dark surfaces — its icon pulses.
    <div className="p-8 rounded-2xl bg-black">
      <Alert
        type="warning"
        variant="glow"
        icon="AlertTriangle"
        title="API rate limit reached"
        message="Neon border and shadow for dark dashboards."
      />
    </div>
  );
}
```

### Icons

- `icon="Info"` renders a Lucide icon when the string is a key of `ICON_MAP` — `CheckCircle2`, `AlertTriangle`, `Info`, `Bell`, `XCircle`.
- `icon="🚀"` any other string is rendered as-is, so emoji work.
- `icon` omitted (or `null`) gives a text-only alert.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertIcons() {
  return (
    <div className="flex flex-col gap-4">
      {/* A name from ICON_MAP: CheckCircle2 | AlertTriangle | Info | Bell | XCircle */}
      <Alert type="info" variant="modern" icon="Info" title="Lucide icon" message={'Pass a name from ICON_MAP, e.g. icon="Info".'} />

      {/* Any other string renders as text — emoji included */}
      <Alert type="info" variant="modern" icon="🚀" title="Emoji" message={'Any other string renders as-is, e.g. icon="🚀".'} />

      {/* Omit icon (or pass null) for text only */}
      <Alert type="info" variant="modern" title="No icon" message="Leave icon unset (or null) for a text-only alert." />
    </div>
  );
}
```

### Dismissible

- Set `dismissible` to add a close button that animates the alert out.
- `onDismiss` fires after that animation, so it is where you drop the alert from your own state.

```tsx
"use client";


export default function DismissibleAlert() {
  return (
    <Alert
      type="danger"
      variant="modern"
      icon="XCircle"
      title="Upload failed"
      message="We couldn't process that file. Check the format and try again."
      dismissible
      onDismiss={() => console.log("dismissed")}
    />
  );
}
```

### Rich content

- Pass `children` to render buttons, lists or any markup. It appears below `message` rather than replacing it, so omit `message` when the children say it all.

```tsx
import { Alert } from "@/components/custom/blocks/Alerts";

export default function RichAlert() {
  return (
    <Alert
      type="warning"
      variant="modern"
      icon="AlertTriangle"
      title="API Rate Limit Reached"
      dismissible
    >
      <p className="text-sm mb-3">
        This is rich content rendered inside the alert as children. You can put
        lists, buttons, or any valid HTML here.
      </p>
      <div className="flex gap-3">
        <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition">
          Action
        </button>
        <button className="px-4 py-1.5 bg-muted text-foreground rounded-md text-sm font-medium hover:bg-muted/80 transition">
          Cancel
        </button>
      </div>
    </Alert>
  );
}
```

## Features
Learn about the Alert component's capabilities, including different severity levels, customizable icons, and dismissible actions.

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "dark"` | `"primary"` | Determines the semantic color scheme of the alert. |
| `variant` | `"solid" \| "outline" \| "modern" \| "glass" \| "glow"` | `"modern"` | Applies overarching structural layouts and visual styles. |
| `dismissible` | `boolean` | `false` | If true, renders an "X" button that smoothly animates the alert out of the DOM. |
| `icon` | `string \| ReactNode` | `null` | The icon to display. You can pass a string matching the `ICON_MAP`, an emoji, or a custom SVG. |
| `title` | `string` | `null` | The bold header text of the alert. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/alert
