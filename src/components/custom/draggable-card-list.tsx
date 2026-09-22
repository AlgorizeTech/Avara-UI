"use client";

import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { GripVertical, Calendar, ExternalLink, CheckCircle2, Circle } from "lucide-react";

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

interface SingleCardItemProps {
    item: DraggableCardItem;
    variant: "classic" | "modern";
    dragHandlePosition: "right" | "left";
    enableCheckboxes: boolean;
    enableBadges: boolean;
    cardClassName?: string;
    onToggle?: (id: string | number) => void;
}

function SingleCardItem({
    item,
    variant,
    dragHandlePosition,
    enableCheckboxes,
    enableBadges,
    cardClassName,
    onToggle,
}: SingleCardItemProps) {
    const controls = useDragControls();

    const renderDragHandle = () => (
        <div
            onPointerDown={(e) => controls.start(e)}
            aria-label="Drag to reorder"
            className={cn(
                "p-2.5 rounded-2xl text-muted-foreground/60 hover:text-foreground hover:bg-muted/80 cursor-grab active:cursor-grabbing transition-colors shrink-0 group-hover:text-foreground/90",
                variant === "modern" && "bg-muted/60 dark:bg-zinc-800/80 border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/30 transition-all duration-200"
            )}
        >
            <GripVertical className="w-5 h-5" />
        </div>
    );

    // VARIANT 1: Modern (Glass-Glow Card + Left Accent Color Border Shift on Hover)
    if (variant === "modern") {
        return (
            <Reorder.Item
                value={item}
                id={String(item.id)}
                dragControls={controls}
                dragListener={false}
                whileDrag={{
                    scale: 1.02,
                    zIndex: 50,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={cn(
                    "relative w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-primary/10 backdrop-blur-2xl p-4 sm:p-5 shadow-none transition-colors select-none group flex items-start justify-between gap-3",
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
            </Reorder.Item>
        );
    }

    // VARIANT 2: Classic (Left Accent Color Border Shift on Hover, Zero Shadow)
    return (
        <Reorder.Item
            value={item}
            id={String(item.id)}
            whileDrag={{
                scale: 1.02,
                zIndex: 50,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
                "relative w-full rounded-2xl border border-border/80 bg-card dark:bg-zinc-900/90 backdrop-blur-xl p-4 sm:p-5 shadow-none transition-colors select-none group flex items-start justify-between gap-3 cursor-grab active:cursor-grabbing",
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
        </Reorder.Item>
    );
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
            <Reorder.Group
                axis="y"
                values={itemList}
                onReorder={handleReorder}
                className="space-y-3"
            >
                {itemList.map((item) => (
                    <SingleCardItem
                        key={item.id}
                        item={item}
                        variant={variant}
                        dragHandlePosition={dragHandlePosition}
                        enableCheckboxes={enableCheckboxes}
                        enableBadges={enableBadges}
                        cardClassName={cardClassName}
                        onToggle={handleToggleComplete}
                    />
                ))}
            </Reorder.Group>
        </div>
    );
}

export default DraggableCardList;
