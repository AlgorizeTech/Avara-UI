---
title: "Shadcn Alert"
description: "Shadcn Alert. An inline alert banner for persistent status messages in six severity types and five surface variants (`inset`, `default`, `soft`, `glass`."
url: https://avaraui.com/docs/nextjs/alert
---

# Shadcn Alert

An inline alert banner for persistent status messages in six severity types and five surface variants (`inset`, `default`, `soft`, `glass`, and `solid`).

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

## Inset

- `variant="inset"` puts the icon and title on top and the message in an inset well, like the Accordion.

```tsx
import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function InsetAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <Alert
          variant="inset"
          type="neutral"
          title="New features available"
          message="Check out our latest updates including dark mode support and improved accessibility features."
        />
        <Alert
          variant="inset"
          type="info"
          title="Update available"
          message="A new version is available. Refresh to get the latest features and fixes."
          action={
            <>
              <AlertAction appearance="outline">Later</AlertAction>
              <AlertAction>Refresh</AlertAction>
            </>
          }
        />
        <Alert
          variant="inset"
          type="success"
          title="Profile updated successfully"
          dismissible
        />
        <Alert
          variant="inset"
          type="warning"
          title="Payment method expires soon"
          message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
          dismissible
          action={
            <>
              <AlertAction appearance="outline">Not now</AlertAction>
              <AlertAction>Update billing</AlertAction>
            </>
          }
        />
        <Alert
          variant="inset"
          type="danger"
          title="Unable to connect to server"
          message="We're experiencing connection issues. Please try the following:"
          action={
            <>
              <AlertAction appearance="outline">Contact support</AlertAction>
              <AlertAction>Retry</AlertAction>
            </>
          }
        >
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Check your internet connection</li>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
          </ul>
        </Alert>
        <Alert
          variant="inset"
          type="loading"
          title="Processing your request"
          message="Please wait while we sync your data. This may take a few moments."
        />
      </div>
    </div>
  );
}
```

## Default

- `variant="default"` is a card surface where only the icon carries the type colour.

```tsx
import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function DefaultAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <Alert
          type="neutral"
          title="New features available"
          message="Check out our latest updates including dark mode support and improved accessibility features."
        />
        <Alert
          type="info"
          title="Update available"
          message="A new version is available. Refresh to get the latest features and fixes."
          action={<AlertAction>Refresh</AlertAction>}
        />
        <Alert
          type="success"
          title="Profile updated successfully"
          dismissible
        />
        <Alert
          type="warning"
          title="Payment method expires soon"
          message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
          action={<AlertAction>Update billing</AlertAction>}
          dismissible
        />
        <Alert
          type="danger"
          title="Unable to connect to server"
          message="We're experiencing connection issues. Please try the following:"
          action={<AlertAction>Retry</AlertAction>}
        >
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Check your internet connection</li>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
          </ul>
        </Alert>
        <Alert
          type="loading"
          title="Processing your request"
          message="Please wait while we sync your data. This may take a few moments."
        />
      </div>
    </div>
  );
}
```

## Soft

- `variant="soft"` bleeds the type colour into a pale card from the left corners.

```tsx
import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function SoftAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <Alert
          variant="soft"
          type="neutral"
          title="New features available"
          message="Check out our latest updates including dark mode support and improved accessibility features."
        />
        <Alert
          variant="soft"
          type="info"
          title="Update available"
          message="A new version is available. Refresh to get the latest features and fixes."
          action={
            <>
              <AlertAction appearance="outline">Later</AlertAction>
              <AlertAction>Refresh</AlertAction>
            </>
          }
        />
        <Alert
          variant="soft"
          type="success"
          title="Profile updated successfully"
          dismissible
        />
        <Alert
          variant="soft"
          type="warning"
          title="Payment method expires soon"
          message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
          dismissible
          action={
            <>
              <AlertAction appearance="outline">Not now</AlertAction>
              <AlertAction>Update billing</AlertAction>
            </>
          }
        />
        <Alert
          variant="soft"
          type="danger"
          title="Unable to connect to server"
          message="We're experiencing connection issues. Please try the following:"
          action={
            <>
              <AlertAction appearance="outline">Contact support</AlertAction>
              <AlertAction>Retry</AlertAction>
            </>
          }
        >
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Check your internet connection</li>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
          </ul>
        </Alert>
        <Alert
          variant="soft"
          type="loading"
          title="Processing your request"
          message="Please wait while we sync your data. This may take a few moments."
        />
      </div>
    </div>
  );
}
```

## Glass

- `variant="glass"` frosts the alert and keeps the icon in the type colour. It needs an image or gradient behind it.

```tsx
import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function GlassAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      {/* Glass needs an image or gradient behind it, and its text is white. */}
      <div className="relative overflow-hidden rounded-2xl p-4 md:p-8">
        <img
          src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex flex-col gap-3">
          <Alert
            variant="glass"
            type="neutral"
            title="New features available"
            message="Check out our latest updates including dark mode support and improved accessibility features."
          />
          <Alert
            variant="glass"
            type="info"
            title="Update available"
            message="A new version is available. Refresh to get the latest features and fixes."
            action={<AlertAction>Refresh</AlertAction>}
          />
          <Alert
            variant="glass"
            type="success"
            title="Profile updated successfully"
            dismissible
          />
          <Alert
            variant="glass"
            type="warning"
            title="Payment method expires soon"
            message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
            action={<AlertAction>Update billing</AlertAction>}
            dismissible
          />
          <Alert
            variant="glass"
            type="danger"
            title="Unable to connect to server"
            message="We're experiencing connection issues. Please try the following:"
            action={<AlertAction>Retry</AlertAction>}
          >
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
            </ul>
          </Alert>
          <Alert
            variant="glass"
            type="loading"
            title="Processing your request"
            message="Please wait while we sync your data. This may take a few moments."
          />
        </div>
      </div>
    </div>
  );
}
```

## Solid

- `variant="solid"` fills the alert with a flat light tint of the type colour.

```tsx
import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function SolidAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <Alert
          variant="solid"
          type="neutral"
          title="New features available"
          message="Check out our latest updates including dark mode support and improved accessibility features."
        />
        <Alert
          variant="solid"
          type="info"
          title="Update available"
          message="A new version is available. Refresh to get the latest features and fixes."
          action={<AlertAction>Refresh</AlertAction>}
        />
        <Alert
          variant="solid"
          type="success"
          title="Profile updated successfully"
          dismissible
        />
        <Alert
          variant="solid"
          type="warning"
          title="Payment method expires soon"
          message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
          action={<AlertAction>Update billing</AlertAction>}
          dismissible
        />
        <Alert
          variant="solid"
          type="danger"
          title="Unable to connect to server"
          message="We're experiencing connection issues. Please try the following:"
          action={<AlertAction>Retry</AlertAction>}
        >
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Check your internet connection</li>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
          </ul>
        </Alert>
        <Alert
          variant="solid"
          type="loading"
          title="Processing your request"
          message="Please wait while we sync your data. This may take a few moments."
        />
      </div>
    </div>
  );
}
```

## About Shadcn Alert

**What it is.** `Alert` is an inline banner with six `type` values (`neutral`, `info`, `success`, `warning`, `danger` and `loading`) and five `variant` surfaces (`inset`, `default`, `soft`, `glass`, `solid`). It takes a `title`, a `message`, an optional `action` slot and a `dismissible` close button. `AlertAction` is the matching pill button.

**How it is built.** The `type` picks a `lucide-react` icon and a colour, and the `variant` picks the surface. `danger` and `warning` render with `role="alert"`, the other types with `role="status"`, and `loading` adds `aria-busy` with a spinning icon. Dismissing fades the alert out over 200 ms and then calls `onDismiss`.

**When to use it.** Use `Alert` for persistent in-page banners, form summaries and system notices that stay in the layout. For notifications that disappear on their own, use [Toast](https://avaraui.com/docs/reactjs/toast) or [Sonner](https://avaraui.com/docs/reactjs/sonner).

## For AI agents

**When to use**

- Persistent inline callouts, validation summaries, and status banners inside page layouts or forms
- Visual variants (`inset`, `default`, `soft`, `glass`, `solid`) matched to light, dark, or image/gradient backdrops

**When not to use**

- Temporary floating notifications: use [Sonner](https://avaraui.com/docs/reactjs/sonner) or [Toast](https://avaraui.com/docs/reactjs/toast)
- Blocking confirmations: use [Dialog](https://avaraui.com/docs/reactjs/dialog)

**Agent notes**

- Named exports `Alert` and `AlertAction` from `@/components/custom/blocks/Alerts`; there is no default export.
- `type` is `"neutral" | "info" | "success" | "warning" | "danger" | "loading"`. There is no `error` or `destructive` type: use `danger`.
- `variant="glass"` applies backdrop blur and white text, so it needs an image or gradient behind it.
- Dismissal is internal: the alert hides itself after the fade, and `onDismiss` is only a notification, not a controlled `open` prop.
- Put `AlertAction` in the `action` slot or inside `children`; it takes its colour from the alert's `type` and `variant`.

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/alert

**When to use it.** An inline alert for messages that stay in the layout, with six types (neutral, info, success, warning, danger, loading), an action button slot and optional dismiss, in four styles: default, soft, glass and solid.

**When to use something else:**

- [Toast](https://avaraui.com/docs/reactjs/toast): the message is short-lived and should float over the page instead of sitting in the layout.

**Gotchas:**

- All four are looks of the one `alert` item: install it once and set `variant` from the index.
- The type picks the icon and the colour on every style; it says what the alert is about, so choose it by meaning, not by taste.
- Glass uses white text and needs an image or gradient behind it; on a plain background use another style.

### The 4 variants

1. **Default** (`default`): A card surface where only the icon carries the type colour.
   - Live: https://avaraui.com/view/alert/default
   - Best for: a restrained interface where the alert should not shout
   - Avoid if: the alert has to be noticed at a glance
   - Traits: card surface, coloured icon only
   - Install: `npx shadcn@latest add @avara-ui/alert`
   - Docs: https://avaraui.com/docs/nextjs/alert#default
2. **Soft** (`soft`): A pale card with the type colour bleeding in from the left corners.
   - Live: https://avaraui.com/view/alert/soft
   - Best for: form-level and page-level messages that should read by colour
   - Avoid if: you want a plain card with no tint
   - Traits: corner gradient, dark text, paired footer buttons
   - Install: `npx shadcn@latest add @avara-ui/alert`
   - Set these props: `{"variant":"soft"}`
   - Docs: https://avaraui.com/docs/nextjs/alert#soft
3. **Solid** (`solid`): A flat light fill of the standard type colour with a matching border.
   - Live: https://avaraui.com/view/alert/solid
   - Best for: banners that should read by colour at a glance
   - Avoid if: you want a card with no tint at all
   - Traits: flat tinted fill, coloured icon, filled action buttons
   - Install: `npx shadcn@latest add @avara-ui/alert`
   - Set these props: `{"variant":"solid"}`
   - Docs: https://avaraui.com/docs/nextjs/alert#solid
4. **Glass** (`glass`): A frosted alert with a type-coloured tint and icon.
   - Live: https://avaraui.com/view/alert/glass
   - Best for: an interface over imagery or gradients
   - Avoid if: the background is plain and there is nothing to frost
   - Traits: frosted blur, white text, needs a backdrop
   - Install: `npx shadcn@latest add @avara-ui/alert`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/alert#glass

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"neutral" \| "info" \| "success" \| "warning" \| "danger" \| "loading"` | `"neutral"` | What the alert is about. Sets the icon and the colour. |
| `variant` | `"inset" \| "default" \| "soft" \| "glass" \| "solid"` | `"default"` | The visual style. |
| `title` | `ReactNode` | `undefined` | The bold heading. |
| `message` | `ReactNode` | `undefined` | The text under the title. |
| `icon` | `ReactNode \| null` | The icon for the type | Replaces the icon. Pass `null` to hide it. |
| `action` | `ReactNode` | `undefined` | Slot on the right, usually an `AlertAction`. |
| `dismissible` | `boolean` | `false` | Adds a close button that fades the alert out. |
| `onDismiss` | `() => void` | `null` | Called after the fade, so you can drop the alert from your state. |
| `children` | `ReactNode` | `undefined` | Extra content under the message, such as a list. |
| `className` | `string` | `undefined` | Classes for the alert root. |
| `titleClassName` | `string` | `undefined` | Classes for the title. |
| `messageClassName` | `string` | `undefined` | Classes for the message. |
| `iconClassName` | `string` | `undefined` | Classes for the icon wrapper. |

## Works with other components

- Pair `Alert` above [Form](https://avaraui.com/docs/reactjs/form) or [Input](https://avaraui.com/docs/reactjs/input) groups for server-side validation summaries.
- Use [Toast](https://avaraui.com/docs/reactjs/toast) or [Sonner](https://avaraui.com/docs/reactjs/sonner) when feedback should appear temporarily and auto-dismiss.
- Embed inside [Dialog](https://avaraui.com/docs/reactjs/dialog) to highlight destructive action warnings.

## How do I show an error alert with the Alert component?

Use `type="danger"`. Alert has no `error` or `destructive` type, so `danger` is the red one. It uses the theme's `destructive` colour on the default and soft variants, renders with `role="alert"` so screen readers announce it, and pairs with `AlertAction` for a retry button in the `action` slot.

## When should I use variant="glass" vs variant="soft"?

Use `variant="soft"` on plain light or dark backgrounds: it bleeds the type colour into a pale card from the left corners. Use `variant="glass"` over a photo, gradient or mesh background, where its `backdrop-blur-xl` frosting and white text show through. On a flat background glass loses its effect.

## How do I make an Alert dismissible and react to it closing?

Set `dismissible` to show a close button labelled "Dismiss alert". Clicking it fades the alert out over 200 ms and hides it. `onDismiss` then runs, so use it to drop the alert from your own state. Alert does not take an `open` prop to control visibility.

## How do I add a button to an Alert?

Pass `<AlertAction>` to the `action` prop for a button on the right, or place it inside `children` for one under the message. `AlertAction` reads the alert's `type` and `variant` for its colours, and `appearance="outline"` gives a quieter second button beside a filled one.

## Does Alert announce itself to screen readers?

Yes, with a role chosen from `type`. `danger` and `warning` use `role="alert"`, which interrupts, while `neutral`, `info`, `success` and `loading` use `role="status"`, which is polite. The `loading` type also sets `aria-busy`, and its spinner and entrance animation respect reduced motion.

## What is the difference between Alert and Toast / Sonner?

`Alert` stays inline in the document flow until the person or your state removes it. [Toast](https://avaraui.com/docs/reactjs/toast) and [Sonner](https://avaraui.com/docs/reactjs/sonner) render floating notifications in a viewport corner that disappear after a duration (`Toast` defaults to 5000 ms), so use `Alert` for anything that must stay readable.

---

Live previews and every example: https://avaraui.com/docs/nextjs/alert
