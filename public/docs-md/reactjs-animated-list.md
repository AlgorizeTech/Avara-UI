---
title: "Shadcn Animated List"
description: "An animated list: items rise and blur in, then fade, glide and reflow as they are added, removed or filtered. Free shadcn/ui component animated with GSAP."
url: https://avaraui.com/docs/nextjs/animated-list
---

# Shadcn Animated List

An animated list: items rise and blur in, then fade and glide as they are added, removed or filtered.

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

```tsx
import { AnimatedList, AnimatedListItem } from "@/components/custom/blocks/AnimatedListBlock";
import { AnimatedNumber } from "@/components/custom/blocks/AnimatedNumberBlock";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Cloud, Globe, Loader2, Mail, Server, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "paying" | "paid" | "failed";
type FilterId = "all" | "soon" | "autopay";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "soon", label: "Due soon" },
  { id: "autopay", label: "Autopay" },
];

const SOON_DAYS = 6;

const subscriptions = [
  { id: "hosting", name: "Cloud hosting", amount: 48, dueInDays: 2, autopay: true, icon: Server },
  { id: "domain", name: "Domain renewal", amount: 14.99, dueInDays: 5, icon: Globe },
  { id: "email", name: "Email delivery", amount: 29, dueInDays: 11, autopay: true, icon: Mail },
  { id: "storage", name: "Object storage", amount: 18.4, dueInDays: 16, icon: Cloud },
  { id: "analytics", name: "Analytics", amount: 79, dueInDays: 23, icon: Zap },
];
type Subscription = (typeof subscriptions)[number];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// Demo only: the first Domain payment is declined so you can see Retry.
const declined = new Set<string>();
async function pay(item: Subscription) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (item.id === "domain" && !declined.has(item.id)) {
    declined.add(item.id);
    throw new Error("Card declined");
  }
}

const dueLabel = (days: number) =>
  days <= 0 ? "Due today" : days === 1 ? "Due tomorrow" : `Due in ${days} days`;

// The row's own look. AnimatedList only animates it; nothing here is required.
function PaymentRow({
  item,
  status,
  onPay,
}: {
  item: Subscription;
  status: Status;
  onPay: () => void;
}) {
  const Icon = item.icon;
  const amount = money.format(item.amount);
  const paying = status === "paying";
  const paid = status === "paid";
  const failed = status === "failed";

  return (
    <div
      className={cn(
        "group/row flex items-center gap-3 rounded-[1.75rem] bg-card p-3 pr-4 text-card-foreground",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)] ring-1 ring-[#F7F7F6] dark:ring-border/60",
        "transition-[background-color] duration-200 hover:bg-muted/50 focus-within:bg-muted/50",
        (paying || failed) && "bg-muted/50",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
          failed
            ? "bg-destructive/10 text-destructive"
            : paid
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-background text-muted-foreground group-hover/row:bg-muted",
        )}
      >
        <Icon className="size-[18px]" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
          {failed ? (
            <span className="rounded-full bg-destructive/10 px-2 py-0.5 font-medium text-destructive">
              Payment failed
            </span>
          ) : paid ? (
            <span className="text-muted-foreground">Paid</span>
          ) : item.dueInDays <= SOON_DAYS ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-700 dark:text-amber-400">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-current opacity-60 motion-safe:animate-ping" />
                <span className="relative size-1.5 rounded-full bg-current" />
              </span>
              {dueLabel(item.dueInDays)}
            </span>
          ) : (
            <span className="text-muted-foreground">{dueLabel(item.dueInDays)}</span>
          )}
          {item.autopay && !paid ? (
            <span className="rounded-full border border-border px-2 py-0.5 font-medium text-muted-foreground">
              Autopay
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid shrink-0 select-none items-center justify-items-stretch [&>*]:col-start-1 [&>*]:row-start-1">
        {paid ? (
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            Paid
          </span>
        ) : failed ? (
          <button
            type="button"
            onClick={onPay}
            className="h-8 cursor-pointer rounded-full bg-destructive/10 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50"
          >
            Retry
          </button>
        ) : (
          <>
            {/* The amount fades out under the row hover; the Pay button fades in. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none inline-flex h-8 min-w-[4.5rem] items-center justify-center rounded-full bg-muted px-3 text-sm font-medium tabular-nums text-foreground transition-[opacity,filter] duration-200",
                paying
                  ? "opacity-0 blur-[3px]"
                  : "group-hover/row:opacity-0 group-hover/row:blur-[3px] group-focus-within/row:opacity-0 group-focus-within/row:blur-[3px]",
              )}
            >
              {amount}
            </span>
            <button
              type="button"
              disabled={paying}
              aria-busy={paying}
              aria-label={`Pay ${item.name}, ${amount}`}
              onClick={onPay}
              className={cn(
                "inline-flex h-8 min-w-[4.5rem] cursor-pointer items-center justify-center rounded-full bg-foreground px-3 text-sm font-medium text-background transition-[opacity,filter] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                paying
                  ? "opacity-100"
                  : "opacity-0 blur-[3px] group-hover/row:opacity-100 group-hover/row:blur-none group-focus-within/row:opacity-100 group-focus-within/row:blur-none",
              )}
            >
              {paying ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : "Pay"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function FilterMenu({
  value,
  onChange,
}: {
  value: FilterId;
  onChange: (value: FilterId) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitemradio"]'),
    );
    const at = items.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === "ArrowDown"
        ? (at + 1) % items.length
        : e.key === "ArrowUp"
          ? (at - 1 + items.length) % items.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? items.length - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    items[next].focus();
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-muted pl-3.5 pr-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {FILTERS.find((f) => f.id === value)?.label}
        <ChevronDown
          className={cn("size-4 text-muted-foreground transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <div
        ref={menuRef}
        role="menu"
        aria-label="Filter"
        onKeyDown={onMenuKeyDown}
        className={cn(
          "absolute right-0 top-full z-20 mt-2 w-40 rounded-2xl border border-border bg-popover p-1 text-popover-foreground shadow-lg transition-[opacity,filter,visibility] duration-200",
          open ? "visible opacity-100 blur-none" : "invisible opacity-0 blur-sm",
        )}
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="menuitemradio"
            aria-checked={f.id === value}
            tabIndex={-1}
            onClick={() => {
              onChange(f.id);
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
          >
            {f.label}
            {f.id === value ? <Check className="size-4" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function UpcomingPayments() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const statusOf = (id: string): Status => statuses[id] ?? "idle";
  const total = subscriptions.reduce(
    (sum, s) => (statusOf(s.id) === "paid" ? sum : sum + s.amount),
    0,
  );
  const visible = subscriptions.filter(
    (s) => filter === "all" || (filter === "soon" ? s.dueInDays <= SOON_DAYS : s.autopay),
  );

  const payItem = async (item: Subscription) => {
    setStatuses((s) => ({ ...s, [item.id]: "paying" }));
    try {
      await pay(item);
      setStatuses((s) => ({ ...s, [item.id]: "paid" }));
    } catch {
      setStatuses((s) => ({ ...s, [item.id]: "failed" }));
    }
  };

  return (
    <div className="w-full max-w-md rounded-[2rem] bg-muted/60 p-2.5 dark:bg-muted/40">
      <div className="flex items-start justify-between gap-4 px-3 pb-1 pt-2">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Coming up</h3>
          <AnimatedNumber
            value={total}
            format={(n) => money.format(n)}
            className="mt-1 block text-3xl font-semibold tracking-tight text-foreground"
          />
        </div>
        <FilterMenu value={filter} onChange={setFilter} />
      </div>

      <AnimatedList className="mt-3 flex flex-col gap-2.5">
        {visible.map((item) => (
          <AnimatedListItem key={item.id}>
            <PaymentRow
              item={item}
              status={statusOf(item.id)}
              onPay={() => payItem(item)}
            />
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  );
}
```

## About Shadcn Animated List

**What it is.** `AnimatedList` and `AnimatedListItem` add motion to a list and nothing else. The row design, title, total and filter are yours.

**How it works.** Items rise and blur in one after another when the list scrolls into view. Afterwards, an item you add fades in, one you remove fades out where it stood, and the rest glide to their new place.

**When to use it.** Use it for feeds, bills, renewals and any list that filters, sorts or grows. Pair it with [Animated Number](https://avaraui.com/docs/reactjs/animated-number) for a total that follows the list.

## For AI agents

**When to use**

- Feeds, bill lists, filtered or sorted lists that should animate
- Any row content: the item renders whatever you put in it

**When not to use**

- Rows users must reorder by dragging: use [Draggable Card List](https://avaraui.com/docs/reactjs/draggable-card-list)
- Dated milestones on a rail: use [Timeline](https://avaraui.com/docs/reactjs/timeline)

**Agent notes**

- Named exports `AnimatedList` and `AnimatedListItem` from `@/components/custom/blocks/AnimatedListBlock`. `AnimatedList` renders a `ul` and `AnimatedListItem` an `li`.
- Give every `AnimatedListItem` a stable `key` (an id, never an array index): the key decides what was added, removed or moved.
- Put titles, filters and totals outside `AnimatedList`. Two lists in one section are two `AnimatedList`s.
- Use `as="div"` on both for non-list markup.
- Do not put transform utilities (`translate-*`, `scale-*`) on the item itself; the motion owns its transform. Put them on the content inside.
- A removed item fades out as a copy, so it cannot be clicked while it fades.
- Honours `prefers-reduced-motion`: items appear and change without motion.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `AnimatedList` | `as` | `"ul" \| "ol" \| "div"` | `"ul"` | The element to render. |
| `AnimatedList` | `staggerDelay` | `number` | `0.07` | Seconds between one item starting its entrance and the next. |
| `AnimatedList` | `duration` | `number` | `0.55` | Entrance duration of each item, in seconds. |
| `AnimatedList` | `...props` | `HTMLAttributes<HTMLElement>` | `undefined` | Passed to the element, including `className` for the layout. |
| `AnimatedListItem` | `as` | `"li" \| "div"` | `"li"` | The element to render. Use `"div"` inside an `as="div"` list. |
| `AnimatedListItem` | `...props` | `HTMLAttributes<HTMLElement>` | `undefined` | Passed to the element, including `key`, `className` and children. |

## Works with other components

- [Animated Number](https://avaraui.com/docs/reactjs/animated-number) for a total that counts up and follows the list.
- [Item](https://avaraui.com/docs/reactjs/item) for structured rows (media, title, description) to put inside each item.
- [Draggable Card List](https://avaraui.com/docs/reactjs/draggable-card-list) when people need to reorder rows.

## How do I animate a filtered list with AnimatedList?

Render only the matching `AnimatedListItem`s and give each a stable `key`. When the filter changes, items that leave fade out where they stood, new ones fade in and the rest glide to their new place.

## Can AnimatedListItem hold any content?

Yes. It animates its own box and nothing inside it, so a row can be a card, a link or your own component. Put the title, total and filter outside `AnimatedList`.

## Why do my items not animate when the list changes?

The change is read from each item's `key`. Items with array-index keys look the same before and after, so nothing counts as added or removed. Use an id.

## Can I use AnimatedList for a div layout?

Yes. Set `as="div"` on `AnimatedList` and on each `AnimatedListItem`. The list then renders no `ul` or `li`.

## How does AnimatedList handle reduced motion?

When the visitor prefers reduced motion, items appear at once and changes apply without fades or gliding.

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-list
