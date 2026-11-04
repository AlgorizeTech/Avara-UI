---
title: "Shadcn Animated List"
description: "Shadcn Animated List. A list that staggers its items into view with 3D perspective transforms and no animation library."
url: https://avaraui.com/docs/nextjs/animated-list
---

# Shadcn Animated List

A hyper-polished list component that staggers its children into view using 3D perspective transforms (no animation library), complete with a mouse-tracking glassmorphic spotlight hover effect.

Standard list animations often feel rigid. By wrapping your notification or activity feeds in the `AnimatedList` container, the engine forces a `perspective` boundary and applies a high-end 3D flip-in sequence (`back.out` easing) to every direct child. Furthermore, the `AnimatedListItem` wrapper brings the component to life _after_ entry by tracking the user's cursor to render a subtle spotlight gradient glow.

Each list plays its entrance once it scrolls into view — use a preview's reload button to replay it. Hover a card afterwards for the cursor-tracking spotlight.

## Animated list

Wrap the feed in `AnimatedList` and each row in `AnimatedListItem` — the stagger, perspective and hover spotlight come with it.

- Set `staggerDelay={0.15}` to the gap in seconds between one child starting and the next.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

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

## Examples

### Flip

- Use `variant="flip"` to rotate each row in on the X axis against the container's 3D perspective — the signature entrance.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

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

### Slide up

- Use `variant="slide-up"` to translate the rows in from an edge instead of rotating. `slide-left` and `slide-right` do the same from the sides.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

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

### Pop

- Use `variant="pop"` to scale each row in from small.
- `ease="elastic.out(1, 0.5)"` adds the overshoot that makes the pop bounce.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

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

### Timing

- `staggerDelay={0.35}` is the gap between children.
- `duration={1.1}` is how long each one takes.
- `animationDelay={0.3}` is how long the whole sequence waits before starting.
- `ease="power4.out"` takes any GSAP-style ease name — no GSAP needed.

```tsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

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

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `AnimatedList` | `staggerDelay` | `number` | `0.12` | The amount of time (in seconds) to wait before animating the next consecutive child element in the list. |
| `AnimatedList` | `animationDelay` | `number` | `0` | The total delay (in seconds) before the entire staggered 3D flip-in sequence begins. |
| `AnimatedList` | `duration` | `number` | `0.8` | The total duration (in seconds) of the entry animation for a single list item. |
| `AnimatedList` | `ease` | `string` | `"back.out(1.5)"` | The easing applied to the entrance animation, named the GSAP way (`"power4.out"`, `"elastic.out(1, 0.5)"`) and evaluated without the library; CSS keywords and `cubic-bezier()` work too. |
| `AnimatedListItem` | `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Accepts all native HTML div attributes. This component automatically handles its own `onMouseMove` and `onMouseLeave` events to drive the glassmorphic spotlight gradient under the hood. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-list
