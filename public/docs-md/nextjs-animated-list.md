---
title: "Shadcn Animated List"
description: "Shadcn Animated List. A list that staggers its items into view with 3D perspective transforms and no animation library."
url: https://avaraui.com/docs/nextjs/animated-list
---

# Shadcn Animated List

A hyper-polished list component that staggers its children into view using 3D perspective transforms (no animation library), complete with a mouse-tracking glassmorphic spotlight hover effect.

Standard list animations often feel rigid. By wrapping your notification or activity feeds in the `AnimatedList` container, the engine sets a `perspective` boundary and plays a staggered entrance (`slide-right` with `back.out(1.5)` easing by default, or the 3D `flip`) on every direct child. Furthermore, the `AnimatedListItem` wrapper brings the component to life _after_ entry by tracking the user's cursor to render a subtle spotlight gradient glow.

Each list plays its entrance once it scrolls into view — use a preview's reload button to replay it. Hover a card afterwards for the cursor-tracking spotlight.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-list.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-list
```

## Animated list

Wrap the feed in `AnimatedList` and each row in `AnimatedListItem` — the stagger, perspective and hover spotlight come with it.

- Set `staggerDelay={0.15}` to the gap in seconds between one child starting and the next.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";
import { CheckCircle2, CreditCard, UserPlus, Zap } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
    title: "Payment Received",
    desc: "Stripe successfully processed $129.00",
    time: "2m",
  },
  {
    id: 2,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
    title: "New Signup",
    desc: "alice@example.com created a Pro account",
    time: "15m",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
    title: "Deployment Successful",
    desc: "Production deployment (v2.4.1) is live",
    time: "1h",
  },
  {
    id: 4,
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
    title: "Server Scaled",
    desc: "Auto-scaled cluster to handle traffic spike",
    time: "3h",
  },
];

// One row. The group-hover styles work because AnimatedListItem is the group.
function NotificationRow({ notif }: { notif: (typeof notifications)[number] }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={[
          "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          notif.bg,
          notif.color,
        ].join(" ")}
      >
        <notif.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-foreground truncate">
            {notif.title}
          </h4>
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-muted-foreground flex-shrink-0">
            {notif.time}
          </span>
        </div>
        <p className="text-[11.5px] sm:text-[12px] font-medium text-muted-foreground leading-snug break-words line-clamp-2 mt-[1px]">
          {notif.desc}
        </p>
      </div>
    </div>
  );
}

export default function NotificationFeed() {
  // The wrapper establishes the 3D perspective the children animate inside.
  return (
    <AnimatedList staggerDelay={0.15}>
      {notifications.map((notif) => (
        <AnimatedListItem key={notif.id} className="p-3.5 sm:p-4">
          <NotificationRow notif={notif} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

## Flip

- Use `variant="flip"` to rotate each row in on the X axis against the container's 3D perspective — the signature entrance.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";
import { CheckCircle2, CreditCard, UserPlus, Zap } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
    title: "Payment Received",
    desc: "Stripe successfully processed $129.00",
    time: "2m",
  },
  {
    id: 2,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
    title: "New Signup",
    desc: "alice@example.com created a Pro account",
    time: "15m",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
    title: "Deployment Successful",
    desc: "Production deployment (v2.4.1) is live",
    time: "1h",
  },
  {
    id: 4,
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
    title: "Server Scaled",
    desc: "Auto-scaled cluster to handle traffic spike",
    time: "3h",
  },
];

// One row. The group-hover styles work because AnimatedListItem is the group.
function NotificationRow({ notif }: { notif: (typeof notifications)[number] }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={[
          "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          notif.bg,
          notif.color,
        ].join(" ")}
      >
        <notif.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-foreground truncate">
            {notif.title}
          </h4>
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-muted-foreground flex-shrink-0">
            {notif.time}
          </span>
        </div>
        <p className="text-[11.5px] sm:text-[12px] font-medium text-muted-foreground leading-snug break-words line-clamp-2 mt-[1px]">
          {notif.desc}
        </p>
      </div>
    </div>
  );
}

export default function FlipFeed() {
  return (
    <AnimatedList variant="flip">
      {notifications.map((notif) => (
        <AnimatedListItem key={notif.id} className="p-3.5 sm:p-4">
          <NotificationRow notif={notif} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

## Slide up

- Use `variant="slide-up"` to translate the rows in from an edge instead of rotating. `slide-left` and `slide-right` do the same from the sides.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";
import { CheckCircle2, CreditCard, UserPlus, Zap } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
    title: "Payment Received",
    desc: "Stripe successfully processed $129.00",
    time: "2m",
  },
  {
    id: 2,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
    title: "New Signup",
    desc: "alice@example.com created a Pro account",
    time: "15m",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
    title: "Deployment Successful",
    desc: "Production deployment (v2.4.1) is live",
    time: "1h",
  },
  {
    id: 4,
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
    title: "Server Scaled",
    desc: "Auto-scaled cluster to handle traffic spike",
    time: "3h",
  },
];

// One row. The group-hover styles work because AnimatedListItem is the group.
function NotificationRow({ notif }: { notif: (typeof notifications)[number] }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={[
          "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          notif.bg,
          notif.color,
        ].join(" ")}
      >
        <notif.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-foreground truncate">
            {notif.title}
          </h4>
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-muted-foreground flex-shrink-0">
            {notif.time}
          </span>
        </div>
        <p className="text-[11.5px] sm:text-[12px] font-medium text-muted-foreground leading-snug break-words line-clamp-2 mt-[1px]">
          {notif.desc}
        </p>
      </div>
    </div>
  );
}

export default function SlideUpFeed() {
  return (
    <AnimatedList variant="slide-up">
      {notifications.map((notif) => (
        <AnimatedListItem key={notif.id} className="p-3.5 sm:p-4">
          <NotificationRow notif={notif} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

## Pop

- Use `variant="pop"` to scale each row in from small.
- `ease="elastic.out(1, 0.5)"` adds the overshoot that makes the pop bounce.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";
import { CheckCircle2, CreditCard, UserPlus, Zap } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
    title: "Payment Received",
    desc: "Stripe successfully processed $129.00",
    time: "2m",
  },
  {
    id: 2,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
    title: "New Signup",
    desc: "alice@example.com created a Pro account",
    time: "15m",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
    title: "Deployment Successful",
    desc: "Production deployment (v2.4.1) is live",
    time: "1h",
  },
  {
    id: 4,
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
    title: "Server Scaled",
    desc: "Auto-scaled cluster to handle traffic spike",
    time: "3h",
  },
];

// One row. The group-hover styles work because AnimatedListItem is the group.
function NotificationRow({ notif }: { notif: (typeof notifications)[number] }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={[
          "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          notif.bg,
          notif.color,
        ].join(" ")}
      >
        <notif.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-foreground truncate">
            {notif.title}
          </h4>
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-muted-foreground flex-shrink-0">
            {notif.time}
          </span>
        </div>
        <p className="text-[11.5px] sm:text-[12px] font-medium text-muted-foreground leading-snug break-words line-clamp-2 mt-[1px]">
          {notif.desc}
        </p>
      </div>
    </div>
  );
}

export default function PopFeed() {
  return (
    <AnimatedList variant="pop">
      {notifications.map((notif) => (
        <AnimatedListItem key={notif.id} className="p-3.5 sm:p-4">
          <NotificationRow notif={notif} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

## Timing

- `staggerDelay={0.35}` is the gap between children.
- `duration={1.1}` is how long each one takes.
- `animationDelay={0.3}` is how long the whole sequence waits before starting.
- `ease="power4.out"` takes any GSAP-style ease name — no GSAP needed.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";
import { CheckCircle2, CreditCard, UserPlus, Zap } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
    title: "Payment Received",
    desc: "Stripe successfully processed $129.00",
    time: "2m",
  },
  {
    id: 2,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
    title: "New Signup",
    desc: "alice@example.com created a Pro account",
    time: "15m",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
    title: "Deployment Successful",
    desc: "Production deployment (v2.4.1) is live",
    time: "1h",
  },
  {
    id: 4,
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
    title: "Server Scaled",
    desc: "Auto-scaled cluster to handle traffic spike",
    time: "3h",
  },
];

// One row. The group-hover styles work because AnimatedListItem is the group.
function NotificationRow({ notif }: { notif: (typeof notifications)[number] }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={[
          "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          notif.bg,
          notif.color,
        ].join(" ")}
      >
        <notif.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-foreground truncate">
            {notif.title}
          </h4>
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-muted-foreground flex-shrink-0">
            {notif.time}
          </span>
        </div>
        <p className="text-[11.5px] sm:text-[12px] font-medium text-muted-foreground leading-snug break-words line-clamp-2 mt-[1px]">
          {notif.desc}
        </p>
      </div>
    </div>
  );
}

export default function TimedFeed() {
  // duration is per item; staggerDelay is the gap between them.
  return (
    <AnimatedList duration={0.9} staggerDelay={0.25} animationDelay={0.3}>
      {notifications.map((notif) => (
        <AnimatedListItem key={notif.id} className="p-3.5 sm:p-4">
          <NotificationRow notif={notif} />
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

## About Shadcn Animated List

**What it is.** `AnimatedList` and `AnimatedListItem` make a staggered feed. Each direct child enters with one of five `variant` motions (`flip`, `slide-up`, `slide-left`, `slide-right`, `pop`), and each `AnimatedListItem` shows a cursor-tracking spotlight on hover.

**How it is built.** `AnimatedList` sets a 1000px `perspective` and runs the entrance in a `requestAnimationFrame` loop, driven by `staggerDelay`, `duration`, `animationDelay` and an `ease` string. It parses GSAP-style ease names itself, so it has no animation dependency, and it imports nothing from `next/*`.

**When to use it.** Use it for notification feeds, activity logs, onboarding checklists and live event streams that should arrive one row at a time.

## For AI agents

**When to use**

- Notification feeds, activity logs
- Onboarding checklists, live event streams

**When not to use**

- Rows users must reorder by dragging: use [Draggable Card List](https://avaraui.com/docs/nextjs/draggable-card-list)
- Dated milestones with status markers: use [Timeline](https://avaraui.com/docs/nextjs/timeline)

**Agent notes**

- Named exports `AnimatedList` and `AnimatedListItem` from `@/components/custom/blocks/AnimatedListBlock`. Put `AnimatedListItem` as a direct child: the entrance styles go on the list's direct children only.
- `variant` is `"flip" | "slide-up" | "slide-left" | "slide-right" | "pop"` and defaults to `"slide-right"`.
- Timing props are in seconds: `staggerDelay` (0.12), `animationDelay` (0), `duration` (0.6). `ease` defaults to `"back.out(1.5)"`.
- The entrance runs once on mount and again when one of those props changes. A row added later stays hidden (`AnimatedListItem` starts at `opacity-0`), so remount the list with a new `key` after adding rows.
- There is no reduced-motion check: pass `duration={0}` and `staggerDelay={0}` yourself for people who prefer less motion.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `AnimatedList` | `staggerDelay` | `number` | `0.12` | The amount of time (in seconds) to wait before animating the next consecutive child element in the list. |
| `AnimatedList` | `animationDelay` | `number` | `0` | The total delay (in seconds) before the staggered entrance begins. |
| `AnimatedList` | `duration` | `number` | `0.6` | The total duration (in seconds) of the entry animation for a single list item. |
| `AnimatedList` | `ease` | `string` | `"back.out(1.5)"` | The easing applied to the entrance animation, named the GSAP way (`"power4.out"`, `"elastic.out(1, 0.5)"`) and evaluated without the library; CSS keywords and `cubic-bezier()` work too. |
| `AnimatedList` | `variant` | `"flip" \| "slide-up" \| "slide-left" \| "slide-right" \| "pop"` | `"slide-right"` | Entrance motion for each child. All variants also fade in from a small blur. |
| `AnimatedList` | `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Passed to the list container, including `className`. |
| `AnimatedListItem` | `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Accepts all native HTML div attributes. This component automatically handles its own `onMouseMove` and `onMouseLeave` events to drive the glassmorphic spotlight gradient under the hood. |

## Works with other components

- [Item](https://avaraui.com/docs/nextjs/item) for structured rows (media, title, description) to put inside each `AnimatedListItem`.
- [Draggable Card List](https://avaraui.com/docs/nextjs/draggable-card-list) when people need to reorder the rows, which `AnimatedList` does not support.
- [Timeline](https://avaraui.com/docs/nextjs/timeline) for dated, status-driven events on a vertical rail instead of a feed of cards.

## Does AnimatedList require GSAP when using ease strings like `power4.out`?

No. `AnimatedList` parses the ease string itself and installs no animation library. It understands GSAP names such as `power1` to `power4`, `sine`, `expo`, `circ`, `bounce`, `back`, `elastic` and `steps`, plus CSS keywords and `cubic-bezier()`. An unrecognised name falls back to `power1.out`.

## How do I add the cursor-tracking hover spotlight?

Wrap each row in `AnimatedListItem` inside `AnimatedList`; there is nothing to switch on. It tracks `onMouseMove` and draws a 600px white radial glow at 6% opacity under the pointer, which fades out on `onMouseLeave`. The glow is faint on light cards and clearer on dark ones.

## Why are rows I add to AnimatedList later invisible?

`AnimatedListItem` starts at `opacity-0` and only the entrance loop reveals it. That loop runs on mount and again when `staggerDelay`, `animationDelay`, `ease`, `duration` or `variant` change. A row appended afterwards is never animated in, so give the list a new `key` to replay the whole entrance.

## How do I change the entrance direction of AnimatedList?

Set `variant`. `slide-right` is the default and moves rows in 60px from the right, `slide-left` does the same from the left, `slide-up` rises 40px, `pop` scales up from 0.6, and `flip` tilts rows in on the X axis against the list's perspective. Every variant also fades in from a small blur.

## How do I turn the AnimatedList entrance off for reduced motion?

`AnimatedList` has no built-in `prefers-reduced-motion` check, so add one yourself. Read the media query in your component and pass `duration={0}` and `staggerDelay={0}` when it matches. Rows then appear almost at once instead of animating, and the spotlight hover still works.

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-list
