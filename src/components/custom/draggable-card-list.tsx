"use client";

import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { GripVertical, Calendar, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { gsapTicker } from "@/components/custom/blocks/gsap-motion";
import { createSpringFollower, springEase, type SpringFollower } from "@/components/custom/blocks/motion-curves";

export interface DraggableCardItem {
    id: string | number;
    title: string;
    description?: string;
    date?: string;
    badge?: string;
    badgeStyle?: string;
    accentColor?: string;
    hoverBorderColor?: string;
    linkText?: string;
    linkUrl?: string;
    completed?: boolean;
    category?: string;
}

export interface DraggableCardListProps {
    /** List of draggable card items */
    items?: DraggableCardItem[];
    /** Card style variant: "classic" | "modern" (default: "classic") */
    variant?: "classic" | "modern";
    /** Callback fired when items are reordered */
    onReorder?: (newItems: DraggableCardItem[]) => void;
    /** Callback fired when an item's completion status is toggled */
    onToggleComplete?: (id: string | number, completed: boolean) => void;
    /** Optional title heading text above the list */
    title?: string;
    /** Optional subtitle text under the heading */
    subtitle?: string;
    /** Drag handle position: "right" or "left" (default: "right") */
    dragHandlePosition?: "right" | "left";
    /** Enable interactive completion checkboxes (default: false) */
    enableCheckboxes?: boolean;
    /** Enable category badges (default: true) */
    enableBadges?: boolean;
    /** Container class name */
    className?: string;
    /** Card container class name */
    cardClassName?: string;
}

const DEFAULT_ITEMS: DraggableCardItem[] = [
    {
        id: "1",
        title: "System Performance Audit",
        description: "Optimize bundle splitting, reduce LCP to 0.8s, and tree-shake unused assets",
        date: "2026-08-30",
        badge: "PERFORMANCE",
        badgeStyle: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30",
        accentColor: "from-amber-400 via-orange-500 to-yellow-500",
        hoverBorderColor: "hover:border-amber-500/80 dark:hover:border-amber-400/80",
        completed: false,
    },
    {
        id: "2",
        title: "Security Vulnerability Patch",
        description: "Upgrade dependencies, sanitize input payloads, and rotate API tokens",
        date: "2026-08-30",
        badge: "SECURITY",
        badgeStyle: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
        accentColor: "from-emerald-400 via-teal-500 to-cyan-500",
        hoverBorderColor: "hover:border-emerald-500/80 dark:hover:border-emerald-400/80",
        completed: false,
    },
    {
        id: "3",
        title: "UI Component Library Release",
        description: "Publish version 2.4 with dark mode token updates and accessible aria roles",
        date: "2026-08-30",
        badge: "LIBRARY",
        badgeStyle: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30",
        accentColor: "from-purple-400 via-indigo-500 to-violet-500",
        hoverBorderColor: "hover:border-purple-500/80 dark:hover:border-purple-400/80",
        completed: false,
    },
    {
        id: "4",
        title: "Database Schema Migration",
        description: "Execute zero-downtime PostgreSQL indexing and partition query optimization",
        date: "2026-08-30",
        badge: "DATABASE",
        badgeStyle: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30",
        accentColor: "from-blue-400 via-indigo-500 to-cyan-500",
        hoverBorderColor: "hover:border-blue-500/80 dark:hover:border-blue-400/80",
        linkText: "View database migration logs",
        linkUrl: "#",
        completed: false,
    },
];

/** Lift while dragging, and the glide of cards moving out of the way. */
const CARD_SPRING = { stiffness: 350, damping: 25 };
const LAYOUT = springEase(CARD_SPRING);
/** The spring that pulls a released card home. */
const RETURN_SPRING = { stiffness: 200, damping: 40 };

/** Drag and reorder only answer the primary pointer. */
const isPrimaryPointer = (e: PointerEvent) =>
    e.pointerType === "mouse" ? e.button === 0 : e.isPrimary !== false;

/** Pointer velocity (px/s) over the last 100ms, sampled like Motion's pan gesture. */
function panVelocity(history: { y: number; t: number }[]) {
    if (history.length < 2) return 0;
    const last = history[history.length - 1];
    let from = history[0];
    for (let i = history.length - 1; i >= 0; i--) {
        from = history[i];
        if (last.t - from.t > 100) break;
    }
    const time = (last.t - from.t) / 1000;
    if (time === 0) return 0;
    const v = (last.y - from.y) / time;
    return Number.isFinite(v) ? v : 0;
}

/** What each card element needs from the list: to be known, and to start a drag. */
interface Reorderer {
    register: (id: string, el: HTMLLIElement | null) => void;
    press: (id: string, e: PointerEvent) => void;
}

/** A card's motion: drag offset, layout-glide offset and lift, painted as one transform. */
interface CardMotion {
    el: HTMLLIElement;
    y: number;
    layoutY: number;
    scale: number;
    lift: SpringFollower;
}

function paintCard(m: CardMotion) {
    const offset = m.y + m.layoutY;
    m.el.style.transform = offset || m.scale !== 1 ? `translateY(${offset}px) scale(${m.scale})` : "none";
    // Above its neighbours while displaced by a drag, as Reorder.Item does.
    m.el.style.zIndex = m.y ? "1" : "unset";
}

/** Styles every card carries; a card that drags from anywhere also blocks
 *  text selection and the ghost image, and leaves horizontal pans to the page. */
const CARD_STYLE: React.CSSProperties = { zIndex: "unset" };
const WHOLE_CARD_DRAG_STYLE: React.CSSProperties = {
    ...CARD_STYLE,
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
    touchAction: "pan-x",
};

interface SingleCardItemProps {
    reorder: Reorderer;
    item: DraggableCardItem;
    variant: "classic" | "modern";
    dragHandlePosition: "right" | "left";
    enableCheckboxes: boolean;
    enableBadges: boolean;
    cardClassName?: string;
    onToggle?: (id: string | number) => void;
}

function SingleCardItem({
    reorder,
    item,
    variant,
    dragHandlePosition,
    enableCheckboxes,
    enableBadges,
    cardClassName,
    onToggle,
}: SingleCardItemProps) {
    const id = String(item.id);
    const ref = useCallback((el: HTMLLIElement | null) => reorder.register(id, el), [reorder, id]);

    const renderDragHandle = () => (
        <div
            onPointerDown={(e) => reorder.press(id, e.nativeEvent)}
            aria-label="Drag to reorder"
            className={cn(
                // touch-none: the handle's vertical drag must not scroll the page instead.
                "p-2.5 rounded-2xl text-muted-foreground/60 cursor-grab active:cursor-grabbing shrink-0 touch-none bg-muted/60 border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/30 transition-all duration-200"
            )}
        >
            <GripVertical className="w-5 h-5" />
        </div>
    );

    // VARIANT 1: Modern (Glass-Glow Card + Left Accent Color Border Shift on Hover)
    if (variant === "modern") {
        return (
            <li
                ref={ref}
                id={id}
                style={CARD_STYLE}
                className={cn(
                    "relative w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 dark:to-primary/10 backdrop-blur-2xl p-4 sm:p-5 shadow-none transition-colors select-none group flex items-start justify-between gap-3",
                    item.hoverBorderColor || "hover:border-primary/80",
                    item.completed && "opacity-60 bg-muted/40",
                    cardClassName
                )}
            >
                {/* Glowing Left Side Gradient Bar */}
                <div
                    className={cn(
                        "absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b",
                        item.accentColor || "from-primary via-primary/80 to-primary/40"
                    )}
                />

                {dragHandlePosition === "left" && renderDragHandle()}

                {/* Main Card Content */}
                <div className="flex-1 min-w-0 space-y-1.5 pl-2">
                    {/* Header Row: Title & Right-Aligned Badge */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            {enableCheckboxes && (
                                <button
                                    type="button"
                                    onClick={() => onToggle?.(item.id)}
                                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                                >
                                    {item.completed ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                                    ) : (
                                        <Circle className="w-4 h-4" />
                                    )}
                                </button>
                            )}
                            <h3 className={cn("text-base font-semibold tracking-tight text-foreground leading-tight", item.completed && "line-through text-muted-foreground")}>
                                {item.title}
                            </h3>
                        </div>

                        {enableBadges && item.badge && (
                            <span
                                className={cn(
                                    "px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider shrink-0 shadow-2xs ml-auto",
                                    item.badgeStyle || "bg-primary/10 text-primary border border-primary/30"
                                )}
                            >
                                {item.badge}
                            </span>
                        )}
                    </div>

                    {item.description && (
                        <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    )}

                    {/* Footer Row */}
                    <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2 flex-wrap text-xs text-muted-foreground/80 font-mono">
                        {item.date && (
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                <span>{item.date}</span>
                            </div>
                        )}

                        {item.linkText && (
                            <a
                                href={item.linkUrl || "#"}
                                onClick={(e) => {
                                    if (!item.linkUrl || item.linkUrl === "#") e.preventDefault();
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-primary hover:underline hover:text-primary/80 transition-colors ml-auto"
                            >
                                <span>{item.linkText}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                </div>

                {dragHandlePosition === "right" && renderDragHandle()}
            </li>
        );
    }

    // VARIANT 2: Classic (Left Accent Color Border Shift on Hover, Zero Shadow)
    return (
        <li
            ref={ref}
            id={id}
            draggable={false}
            style={WHOLE_CARD_DRAG_STYLE}
            onPointerDown={(e) => reorder.press(id, e.nativeEvent)}
            className={cn(
                "relative w-full rounded-2xl border border-border/80 bg-card backdrop-blur-xl p-4 sm:p-5 shadow-none transition-colors select-none group flex items-start justify-between gap-3 cursor-grab active:cursor-grabbing",
                item.hoverBorderColor || "hover:border-primary/80",
                item.completed && "opacity-60 bg-muted/40",
                cardClassName
            )}
        >
            {dragHandlePosition === "left" && renderDragHandle()}

            {/* Main Card Content */}
            <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                    {enableCheckboxes && (
                        <button
                            type="button"
                            onClick={() => onToggle?.(item.id)}
                            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                        >
                            {item.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                            ) : (
                                <Circle className="w-4 h-4" />
                            )}
                        </button>
                    )}
                    <h3 className={cn("text-base font-semibold tracking-tight text-foreground leading-tight", item.completed && "line-through text-muted-foreground")}>
                        {item.title}
                    </h3>

                    {enableBadges && item.badge && (
                        <span
                            className={cn(
                                "px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ml-auto sm:ml-0 shadow-2xs",
                                item.badgeStyle || "bg-primary/10 text-primary border border-primary/30"
                            )}
                        >
                            {item.badge}
                        </span>
                    )}
                </div>

                {item.description && (
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                        {item.description}
                    </p>
                )}

                <div className="pt-1 flex items-center justify-between gap-2 flex-wrap text-xs text-muted-foreground/80 font-mono">
                    {item.date && (
                        <div className="flex items-center gap-1 text-[11px]">
                            <Calendar className="w-3.5 h-3.5 opacity-70" />
                            <span>{item.date}</span>
                        </div>
                    )}

                    {item.linkText && (
                        <a
                            href={item.linkUrl || "#"}
                            onClick={(e) => {
                                if (!item.linkUrl || item.linkUrl === "#") e.preventDefault();
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-primary hover:underline hover:text-primary/80 transition-colors ml-auto"
                        >
                            <span>{item.linkText}</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>

            {dragHandlePosition === "right" && renderDragHandle()}
        </li>
    );
}

interface DragSession {
    id: string;
    event: PointerEvent;
    pointerId: number;
    startX: number;
    startY: number;
    /** The card's drag offset when the drag began (plus any layout jump since). */
    origin: number;
    started: boolean;
    history: { y: number; t: number }[];
    /** Rendered size over layout size, so a list inside a scaled parent still
     *  follows the pointer 1:1 (pointer moves are in page pixels, the card
     *  moves in its own). */
    scale: number;
}

/**
 * Vertical drag-to-reorder, on the rules Motion's Reorder uses: a press stops
 * the card where it is; it starts following the pointer 1:1 once the pointer
 * has moved 3px; while moving down it swaps with the next card as soon as its
 * bottom edge passes that card's middle (moving up: its top edge, the previous
 * card's middle), one swap per move. The dragged card keeps its place under
 * the pointer across a swap, the others glide to their new slots, and on
 * release it springs home.
 */
function createReorderer() {
    // The reorderer owns its mutable state, so the component never touches it
    // during render; the list and callback are synced in after each commit.
    const cards = { current: new Map<string, CardMotion>() };
    const drag = { current: null as DragSession | null };
    const list = { current: [] as DraggableCardItem[] };
    const reorder = { current: (() => {}) as (items: DraggableCardItem[]) => void };

    const goHome = (m: CardMotion) => {
        gsap.killTweensOf(m, "y");
        const from = m.y;
        if (!from) return;
        // Settles once within 1px of home, where Motion's release spring stops.
        if (Math.abs(from) <= 1) {
            m.y = 0;
            paintCard(m);
            return;
        }
        const { duration, ease } = springEase({ ...RETURN_SPRING, restDelta: 1 / Math.abs(from) });
        gsap.to(m, { y: 0, duration, ease, onUpdate: () => paintCard(m) });
    };

    const swapIfPast = (id: string, offset: number, velocity: number) => {
        const items = list.current;
        const index = items.findIndex((i) => String(i.id) === id);
        if (index === -1) return;
        const dir = velocity > 0 ? 1 : -1;
        const next = items[index + dir];
        const card = cards.current.get(id)?.el;
        const other = next && cards.current.get(String(next.id))?.el;
        if (!card || !other) return;
        const otherCentre = other.offsetTop + other.offsetHeight / 2;
        const past =
            dir === 1
                ? card.offsetTop + card.offsetHeight + offset > otherCentre
                : card.offsetTop + offset < otherCentre;
        if (!past) return;
        const reordered = [...items];
        const [moved] = reordered.splice(index, 1);
        reordered.splice(index + dir, 0, moved);
        // Commit now, so the layout effect re-anchors the dragged card before
        // the next frame paints it one slot off.
        flushSync(() => reorder.current(reordered));
    };

    const move = (e: PointerEvent) => {
        const s = drag.current;
        if (!s || e.pointerId !== s.pointerId) return;
        const m = cards.current.get(s.id);
        if (!m) return;
        s.history.push({ y: e.pageY, t: performance.now() });
        const dy = (e.pageY - s.startY) / s.scale;
        if (!s.started) {
            if (Math.hypot(e.pageX - s.startX, dy) < 3) return;
            s.started = true;
            s.origin = m.y;
            m.lift.set(1.02);
        }
        m.y = s.origin + dy;
        paintCard(m);
        const velocity = panVelocity(s.history);
        if (velocity) swapIfPast(s.id, m.y, velocity);
    };

    const end = (e: PointerEvent) => {
        const s = drag.current;
        if (!s || e.pointerId !== s.pointerId) return;
        finish();
    };

    const detach = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", end);
        window.removeEventListener("pointercancel", end);
    };

    const finish = () => {
        const s = drag.current;
        drag.current = null;
        detach();
        const m = s && cards.current.get(s.id);
        if (!s || !m) return;
        if (s.started) m.lift.set(1);
        goHome(m);
    };

    const reorderer: Reorderer & {
        sync: (items: DraggableCardItem[], onReorder: (items: DraggableCardItem[]) => void) => void;
        snapshot: () => Map<string, number>;
        settle: (before: Map<string, number>) => void;
        destroy: () => void;
    } = {
        /** Latest list and reorder callback, for the next pointer move. */
        sync(items, onReorder) {
            list.current = items;
            reorder.current = onReorder;
        },
        /** Where each card's layout box sits right now. */
        snapshot() {
            return new Map(
                Array.from(cards.current, ([id, m]) => [id, m.el.offsetTop] as const),
            );
        },
        /** After a commit: animate every card from its `before` slot to its new one. */
        settle(before) {
            cards.current.forEach((m, id) => {
                const was = before.get(id);
                if (was === undefined) return;
                const delta = was - m.el.offsetTop;
                if (!delta) return;
                const s = drag.current;
                if (s?.started && s.id === id) {
                    // The dragged card stays under the pointer: its jump to the
                    // new slot is folded into the drag offset.
                    s.origin += delta;
                    m.y += delta;
                    paintCard(m);
                    return;
                }
                // Everyone else glides from where they were to their new slot.
                gsap.killTweensOf(m, "layoutY");
                m.layoutY += delta;
                paintCard(m);
                gsap.to(m, {
                    layoutY: 0,
                    duration: LAYOUT.duration,
                    ease: LAYOUT.ease,
                    onUpdate: () => paintCard(m),
                });
            });
        },
        register(id, el) {
            const old = cards.current.get(id);
            if (old && old.el === el) return;
            if (old) {
                old.lift.destroy();
                gsap.killTweensOf(old);
                cards.current.delete(id);
            }
            if (!el) return;
            const m: CardMotion = { el, y: 0, layoutY: 0, scale: 1, lift: null as unknown as SpringFollower };
            m.lift = createSpringFollower(
                1,
                (v) => {
                    m.scale = v;
                    paintCard(m);
                },
                { ...CARD_SPRING, ticker: gsapTicker },
            );
            cards.current.set(id, m);
        },
        press(id, e) {
            // The modern handle and the card both report the same press.
            if (drag.current?.event === e || !isPrimaryPointer(e)) return;
            if (drag.current) finish();
            const m = cards.current.get(id);
            if (!m) return;
            gsap.killTweensOf(m, "y");
            const scale = m.el.offsetHeight ? m.el.getBoundingClientRect().height / m.el.offsetHeight : 1;
            drag.current = {
                id,
                event: e,
                pointerId: e.pointerId,
                startX: e.pageX,
                startY: e.pageY,
                origin: m.y,
                started: false,
                history: [{ y: e.pageY, t: performance.now() }],
                scale: scale || 1,
            };
            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", end);
            window.addEventListener("pointercancel", end);
        },
        destroy() {
            drag.current = null;
            detach();
        },
    };
    return reorderer;
}

export function DraggableCardList({
    items: initialItems = DEFAULT_ITEMS,
    variant = "classic",
    onReorder,
    onToggleComplete,
    title,
    subtitle,
    dragHandlePosition = "right",
    enableCheckboxes = false,
    enableBadges = true,
    className,
    cardClassName,
}: DraggableCardListProps) {
    const [itemList, setItemList] = useState<DraggableCardItem[]>(initialItems);
    // Re-seed when the caller hands over a different array. Doing it here
    // rather than in an effect avoids rendering the previous list first.
    const [seededFrom, setSeededFrom] = useState(initialItems);
    if (seededFrom !== initialItems) {
        setSeededFrom(initialItems);
        setItemList(initialItems);
    }

    const handleReorder = (newItems: DraggableCardItem[]) => {
        setItemList(newItems);
        if (onReorder) {
            onReorder(newItems);
        }
    };

    // ── Drag-to-reorder ──────────────────────────────────────────────────
    const [reorder] = useState(createReorderer);
    useEffect(() => () => reorder.destroy(), [reorder]);

    // Where each card's layout box sat before this render commits — the
    // snapshot a layout animation starts from. Taken by <BeforeCommit> just
    // before React mutates the DOM.
    const before = useRef(new Map<string, number>());
    const captureBefore = () => {
        before.current = reorder.snapshot();
    };
    useLayoutEffect(() => {
        reorder.sync(itemList, handleReorder);
        reorder.settle(before.current);
    });

    const handleToggleComplete = (id: string | number) => {
        const updated = itemList.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setItemList(updated);
        const target = updated.find((i) => i.id === id);
        if (onToggleComplete && target) {
            onToggleComplete(id, target.completed || false);
        }
    };

    return (
        <BeforeCommit capture={captureBefore}>
            <div className={cn("w-full max-w-xl mx-auto space-y-4 py-2 select-none", className)}>
                {/* Optional Title Header */}
                {title && (
                    <div className="text-center space-y-1 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Reorder Group Container */}
                <ul className="space-y-3">
                    {itemList.map((item) => (
                        <SingleCardItem
                            key={item.id}
                            reorder={reorder}
                            item={item}
                            variant={variant}
                            dragHandlePosition={dragHandlePosition}
                            enableCheckboxes={enableCheckboxes}
                            enableBadges={enableBadges}
                            cardClassName={cardClassName}
                            onToggle={handleToggleComplete}
                        />
                    ))}
                </ul>
            </div>
        </BeforeCommit>
    );
}

/**
 * Runs `capture` on every update, just before React touches the DOM (the
 * commit's before-mutation phase), so the list can record where its cards sat
 * before the new order lands. Renders nothing of its own.
 */
class BeforeCommit extends Component<{
    capture: () => void;
    children: React.ReactNode;
}> {
    getSnapshotBeforeUpdate() {
        this.props.capture();
        return null;
    }

    // Required alongside getSnapshotBeforeUpdate; the work happens in the list's layout effect.
    componentDidUpdate() {}

    render() {
        return this.props.children;
    }
}

export default DraggableCardList;
