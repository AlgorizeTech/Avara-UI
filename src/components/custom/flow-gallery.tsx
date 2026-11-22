"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface FlowGalleryItem {
    id: string | number;
    title?: string;
    imageUrl: string;
}

export interface FlowGalleryProps {
    /** List of image items */
    items?: FlowGalleryItem[];
    /** Stream flow angle variant (default: "top-left") */
    direction?: "top-left" | "top-right" | "vertical-up" | "vertical-down" | "vertical";
    /** Auto-flow speed (default: 3.5) */
    speed?: number;
    /** Pause auto-flow on hover (default: true) */
    pauseOnHover?: boolean;
    /** Columns count in grid stream (default: 9) */
    columns?: number;
    /** Enable alternating column stream flow directions (default: true) */
    reverseAlternatingColumns?: boolean;
    /** Footer caption text */
    footerCaption?: string;
    /** Custom class name */
    className?: string;
}

const DEFAULT_ITEMS: FlowGalleryItem[] = [
    {
        id: "1",
        title: "Cyberpunk Officer",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    },
    {
        id: "2",
        title: "Neon Cyberpunk Girl",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1578632767115-351597cf2477-1790150482281.jpg",
    },
    {
        id: "3",
        title: "Ramen Bowl Art",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1569718212165-3a8278d5f624-1790148865111.jpg",
    },
    {
        id: "4",
        title: "Suit Business Portrait",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
    },
    {
        id: "5",
        title: "Grizzly Bear Wildlife",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
    },
    {
        id: "6",
        title: "Skateboard Graphic",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1520045892732-304bc3ac5d8e-1790150482278.jpg",
    },
    {
        id: "7",
        title: "Abstract Fluid Ink",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
    },
    {
        id: "8",
        title: "Deep Space Black Hole",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790145141/photo-1451187580459-43490279c0fa-1790145143491.jpg",
    },
    {
        id: "9",
        title: "Misty Pine Forest",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    },
    {
        id: "10",
        title: "Sunset Mountain Peak",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    },
];

/** Card edge and row spacing, in px. A column repeats every `items.length * STRIDE`. */
const CARD_SIZE = 140;
const ROW_GAP = 20;
const STRIDE = CARD_SIZE + ROW_GAP;
/** The stream plane is 260% of the stage height (the `h-[260%]` class below). */
const PLANE_HEIGHT_RATIO = 2.6;
const DEFAULT_STAGE_HEIGHT = 560;
const FRAME_MS = 1000 / 60;

export function FlowGallery({
    items = DEFAULT_ITEMS,
    direction = "top-left",
    speed = 3.5,
    pauseOnHover = true,
    columns = 9,
    reverseAlternatingColumns = true,
    footerCaption = "",
    className,
}: FlowGalleryProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [stageHeight, setStageHeight] = useState(DEFAULT_STAGE_HEIGHT);

    const totalItems = items.length;
    const loopSpan = totalItems * STRIDE;
    const isVertical = direction === "vertical" || direction === "vertical-up" || direction === "vertical-down";

    // Rows needed so a column still covers the plane after sliding one full loop.
    const copies = Math.max(2, Math.ceil((stageHeight * PLANE_HEIGHT_RATIO + loopSpan) / Math.max(1, loopSpan)));
    const rowsPerCol = totalItems * copies;

    // Motion state lives in refs, so nothing here re-renders React. The frame
    // loop writes the column transforms straight to the DOM.
    const motion = useRef({ offset: 0, velocity: 0, lastAxis: 0, lastTime: 0, isDown: false, hovered: false });
    const config = useRef({ direction, speed, pauseOnHover, reverseAlternatingColumns, loopSpan });
    config.current = { direction, speed, pauseOnHover, reverseAlternatingColumns, loopSpan };

    const paint = useRef(() => {
        const { reverseAlternatingColumns: reverse, loopSpan: span } = config.current;
        if (span <= 0) return;
        const { offset } = motion.current;
        columnRefs.current.forEach((col, i) => {
            if (!col) return;
            const raw = reverse && i % 2 === 1 ? -offset : offset;
            const y = (((raw % span) + span) % span) - span;
            col.style.transform = `translate3d(0, ${y}px, 0)`;
        });
    }).current;

    // Track the stage height (className can override it) so the row count stays right.
    useEffect(() => {
        const el = containerRef.current;
        if (!el || typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(([entry]) => {
            const next = Math.ceil(entry.contentRect.height / 100) * 100;
            if (next > 0) setStageHeight(next);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Columns are (re)created when the grid changes; place them before the
    // browser paints so they never flash at their unshifted position.
    useLayoutEffect(() => {
        paint();
    }, [paint, columns, rowsPerCol, loopSpan, reverseAlternatingColumns]);

    // Auto-flow loop. It runs only while the stage is on screen and the tab is
    // visible, and it is paced by elapsed time, so the speed matches on 60, 120
    // and 144Hz displays.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let raf = 0;
        let last = 0;
        let inView = true;

        const tick = (time: number) => {
            const m = motion.current;
            const cfg = config.current;
            const frames = last ? Math.min(time - last, 64) / FRAME_MS : 1;
            last = time;

            const before = m.offset;
            if (!m.isDown) {
                const dir = cfg.direction === "vertical-up" || cfg.direction === "vertical" ? -1 : 1;
                if (!reduceMotion.matches && !(m.hovered && cfg.pauseOnHover)) {
                    m.offset += dir * cfg.speed * frames;
                }
                m.velocity *= Math.pow(0.94, frames);
                if (Math.abs(m.velocity) < 0.01) m.velocity = 0;
                m.offset += m.velocity * frames;
            }
            if (m.offset !== before) paint();
            raf = requestAnimationFrame(tick);
        };

        const sync = () => {
            const shouldRun = inView && !document.hidden;
            if (shouldRun && !raf) {
                last = 0;
                raf = requestAnimationFrame(tick);
            } else if (!shouldRun && raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                sync();
            },
            { rootMargin: "120px" },
        );
        observer.observe(el);
        document.addEventListener("visibilitychange", sync);
        sync();

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", sync);
            cancelAnimationFrame(raf);
            raf = 0;
        };
    }, [paint]);

    // Pointer drag. The stage only toggles a data attribute for the cursor, so
    // dragging never triggers a React render.
    const dragAxis = (e: React.PointerEvent<HTMLDivElement>) =>
        direction === "top-left"
            ? e.clientY - e.clientX * 0.4
            : direction === "top-right"
            ? e.clientY + e.clientX * 0.4
            : e.clientY;

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const m = motion.current;
        m.isDown = true;
        m.lastAxis = dragAxis(e);
        m.lastTime = performance.now();
        m.velocity = 0;
        e.currentTarget.dataset.dragging = "true";
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const m = motion.current;
        if (!m.isDown) return;

        const now = performance.now();
        const axis = dragAxis(e);
        const dy = axis - m.lastAxis;
        const dt = Math.max(1, now - m.lastTime);

        m.offset -= dy * 1.5;
        m.velocity = (-dy / dt) * 12;
        m.lastAxis = axis;
        m.lastTime = now;
        paint();
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        motion.current.isDown = false;
        delete e.currentTarget.dataset.dragging;
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
            // Ignore if pointer capture released
        }
    };

    // The card grid is static: built once per items/columns/rows, so neither
    // frames nor pointer events ever reconcile it.
    const streamColumns = useMemo(
        () =>
            Array.from({ length: columns }).map((_, colIdx) => {
                const colStagger = colIdx * 3;
                return (
                    <div
                        key={colIdx}
                        ref={(node) => {
                            columnRefs.current[colIdx] = node;
                        }}
                        className="flex flex-col gap-4 sm:gap-5"
                        style={{ willChange: "transform" }}
                    >
                        {Array.from({ length: rowsPerCol }).map((_, rowIdx) => {
                            const itemIdx = (((rowIdx + colStagger) % totalItems) + totalItems) % totalItems;
                            const item = items[itemIdx] || items[0];

                            return (
                                <div
                                    key={rowIdx}
                                    className="relative flex-shrink-0 overflow-hidden rounded-[22px] border border-border bg-card shadow-md shadow-slate-300/50 dark:shadow-black/60"
                                    style={{ width: CARD_SIZE, height: CARD_SIZE }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title || "Flow Gallery Item"}
                                        className="pointer-events-none h-full w-full rounded-[20px] object-cover"
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            }),
        [items, columns, rowsPerCol, totalItems],
    );

    const planeTransform = direction === "top-right"
        ? "rotate(24deg) skewX(-8deg)"
        : isVertical
        ? "none"
        : "rotate(-24deg) skewX(8deg)";

    const stageContent = (
        <div
            ref={containerRef}
            onMouseEnter={() => {
                motion.current.hovered = true;
            }}
            onMouseLeave={() => {
                motion.current.hovered = false;
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn(
                "relative w-full h-[560px] rounded-[24px] overflow-hidden border border-border bg-background text-foreground select-none flex items-center justify-center cursor-grab data-[dragging=true]:cursor-grabbing",
                className
            )}
        >
            {/* Ambient Vignette & Vertical Top/Bottom Edge Overlays */}
            {isVertical ? (
                <>
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background via-background/85 to-transparent z-30 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background via-background/85 to-transparent z-30 pointer-events-none" />
                </>
            ) : (
                <div
                    className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_55%,color-mix(in_oklab,var(--background)_85%,transparent)_100%)]"
                />
            )}

            {/* Stream Plane */}
            <div
                className={cn(
                    "absolute pointer-events-none flex justify-center items-center",
                    isVertical ? "w-[120%] h-[260%]" : "w-[240%] h-[260%]"
                )}
                style={{ transform: planeTransform }}
            >
                <div className="w-full h-full flex justify-center gap-4 sm:gap-5">
                    {streamColumns}
                </div>
            </div>
        </div>
    );

    if (!footerCaption) {
        return stageContent;
    }

    return (
        <div className="w-full space-y-2 select-none font-sans">
            {stageContent}
            <p className="text-xs font-mono tracking-wide text-muted-foreground pt-1">
                {footerCaption}
            </p>
        </div>
    );
}

export default FlowGallery;
