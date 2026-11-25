---
title: "Shadcn Verify Badge"
description: "Shadcn Verify Badge. A crisp SVG verified badge (`VerifyBadge`) with customizable colors, four sizes (`sm`, `md`, `lg`, `xl`), hover shine."
url: https://avaraui.com/docs/nextjs/verify-badge
---

# Shadcn Verify Badge

A crisp SVG verified badge (`VerifyBadge`) with customizable colors, four sizes (`sm`, `md`, `lg`, `xl`), hover shine, and optional pulse animation.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/verify-badge.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/verify-badge
```

## Verify Badge

A verified marker sitting beside a display name.

- `color` is the badge fill — any hex or CSS colour. Defaults to the theme primary.

```tsx
import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function ProfileName() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-foreground text-[15px] tracking-tight">
        AvaraSystem
      </span>
      <VerifyBadge size="md" animate />
    </div>
  );
}
```

## Sizes

- Use `size` to scale the badge and its icon together — `sm`, `md`, `lg` or `xl`.

```tsx
import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function BadgeSizes() {
  return (
    <div className="flex items-center gap-8">
      <VerifyBadge size="sm" />
      <VerifyBadge size="md" />
      <VerifyBadge size="lg" />
      <VerifyBadge size="xl" />
    </div>
  );
}
```

## Static

- Set `animate={false}` to drop the pulse for dense lists. It is off by default, so a row of badges stays calm unless you opt in.

```tsx
import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

export default function StaticBadge() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-foreground text-[15px] tracking-tight">
        AvaraSystem
      </span>
      <VerifyBadge size="md" animate={false} />
    </div>
  );
}
```

## In context

- `size="sm"` is usually right inline with a name — the badge should not outweigh the text it verifies.

```tsx
import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock";

// The badge is the only piece that ships with the component — everything
// around it is ordinary markup, shown here so the card matches the preview.
const accent = "var(--primary)";

function BotAvatar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export default function NotificationCard() {
  return (
    <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-colors hover:bg-muted/50 min-w-0">
      <div className="hidden sm:flex flex-shrink-0 mt-0.5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground"
          style={{ backgroundColor: accent }}
        >
          <BotAvatar className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col w-full min-w-0">
        <div className="flex items-center gap-2 flex-wrap min-w-0 w-full">
          <div
            className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-primary-foreground shrink-0"
            style={{ backgroundColor: accent }}
          >
            <BotAvatar className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-foreground text-sm sm:text-[15px] tracking-tight truncate">
            AvaraSystem
          </span>
          <VerifyBadge color={accent} size="md" animate />
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider border shrink-0"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
              borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
              color: accent,
            }}
          >
            Bot
          </span>
          <span className="text-xs sm:text-[13px] text-muted-foreground font-medium shrink-0">
            Today at 2:34 PM
          </span>
        </div>

        <p className="mt-2 sm:mt-1 text-foreground/90 text-xs sm:text-[15px] leading-relaxed break-words">
          Deployment{" "}
          <span
            className="font-semibold hover:underline cursor-pointer"
            style={{ color: accent }}
          >
            #421
          </span>{" "}
          to <strong>production</strong> completed successfully.
        </p>

        <div className="mt-3 w-full rounded-xl border border-border bg-muted/60 p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 relative overflow-hidden min-w-0">
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: accent }}
          />
          <div className="flex flex-col gap-1 ml-1 min-w-0 flex-1">
            <span className="font-semibold text-xs sm:text-[14px] text-foreground tracking-tight">
              Build Passed 🚀
            </span>
            <span className="text-xs sm:text-[13px] text-muted-foreground leading-snug break-words">
              All 142 tests passed in 12s. The latest preview is now live on
              Vercel.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## About Shadcn Verify Badge

**What it is.** `VerifyBadge` is an inline SVG verification checkmark badge supporting custom `color` values, four sizes (`sm`, `md`, `lg`, `xl`), a subtle hover shine, and an optional `animate` pulse.

**How it is built.** Built with resolution-independent inline SVGs and theme-aware defaults so badges stay sharp on any display and calm in dense lists (`animate` defaults to `false`).

**When to use it.** Use `VerifyBadge` beside user names, creator profiles, organization headers, and verified account rows.

## For AI agents

**When to use**

- Verified account markers next to usernames (`size="sm"` / `"md"`) or profile headers (`size="lg"` / `"xl"`)

**When not to use**

- Generic status pills or counts — use [Live Pulse Pill](https://avaraui.com/docs/nextjs/live-pulse-pill) or [Table](https://avaraui.com/docs/nextjs/table) `TableBadge`

**Agent notes**

- Named export: `import { VerifyBadge } from "@/components/custom/blocks/VerifyBadgeBlock"`
- Pass `aria-label` or `title` for screen-reader accessibility; `animate` defaults to `false`

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `VerifyBadge` | `color` | `string (hex/css color)` | `"var(--primary)"` | The theme color of the badge. |
| `VerifyBadge` | `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | The physical dimensions and icon size of the badge. |
| `VerifyBadge` | `animate` | `boolean` | `false` | If true, adds a continuous subtle pulse animation to the background. |
| `VerifyBadge` | `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Accepts all native HTML div attributes (e.g., `className`, `id`) which are seamlessly forwarded to the root wrapper. |

## Works with other components

- Display beside names in [Profile Card](https://avaraui.com/docs/nextjs/profile-card), [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack), and [Data Table](https://avaraui.com/docs/nextjs/data-table).
- Pair with [Tooltip](https://avaraui.com/docs/nextjs/tooltip) to explain verification criteria on hover.

## How do I add a verified checkmark badge next to a username?

Render `VerifyBadge` beside the name. It is an inline SVG checkmark with a hover shine, so it stays sharp at any size. It accepts native div attributes such as `className` and `id`, and it follows your primary colour unless you set `color`.

## Which size should I use next to usernames?

Use `size="sm"` or `size="md"` inline with body text or display names so the badge complements rather than outweighs the label. Reserve `lg` and `xl` for profile headers. `"md"` is the default.

## How do I change the colour of the verified badge?

Pass any CSS colour to `color`, such as a hex value or a variable. The default is `var(--primary)`, so the badge follows your theme and restyles when theme presets change. There is no separate dark-mode prop to manage.

## How do I make the badge pulse?

Set `animate` to `true`. It adds a continuous, subtle pulse to the badge background and is `false` by default. The hover shine is always on. Use the pulse sparingly, for example on one featured profile, so it keeps drawing the eye.

## How do I explain what verified means?

Pair `VerifyBadge` with [Tooltip](https://avaraui.com/docs/nextjs/tooltip) to show a short explanation on hover and focus. It also fits next to names in [Profile Card](https://avaraui.com/docs/nextjs/profile-card), [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack) and [Data Table](https://avaraui.com/docs/nextjs/data-table) rows.

---

Live previews and every example: https://avaraui.com/docs/nextjs/verify-badge
