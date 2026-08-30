"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
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
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "2",
        title: "Neon Cyberpunk Girl",
        imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "3",
        title: "Ramen Bowl Art",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "4",
        title: "Suit Business Portrait",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "5",
        title: "Grizzly Bear Wildlife",
        imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "6",
        title: "Skateboard Graphic",
        imageUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "7",
        title: "Abstract Fluid Ink",
        imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "8",
        title: "Deep Space Black Hole",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "9",
        title: "Misty Pine Forest",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "10",
        title: "Sunset Mountain Peak",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
];

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
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Flow Motion Physics State
    const motionRef = useRef({
        offset: 0,
        velocity: 0,
        lastY: 0,
        lastTime: 0,
        isDown: false,
    });

    const [renderOffset, setRenderOffset] = useState(0);

    // Silky-Smooth 60fps Continuous Auto-Flow Loop
    useEffect(() => {
        let animId: number;

        const updateLoop = () => {
            const motion = motionRef.current;

            if (!motion.isDown) {
                const baseDirFactor = (direction === "vertical-up" || direction === "vertical") ? -1 : 1;

                if (!isHovered || !pauseOnHover) {
                    motion.offset += baseDirFactor * speed;
                }

                motion.velocity *= 0.94;
                motion.offset += motion.velocity;
            }

            setRenderOffset(motion.offset);
            animId = requestAnimationFrame(updateLoop);
        };

        updateLoop();

        return () => {
            cancelAnimationFrame(animId);
        };
    }, [speed, isHovered, pauseOnHover, direction]);

    // Pointer Event Handlers for Drag
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const motion = motionRef.current;
        motion.isDown = true;
        const dragAxis = direction === "top-left"
            ? e.clientY - e.clientX * 0.4
            : direction === "top-right"
            ? e.clientY + e.clientX * 0.4
            : e.clientY;
        motion.lastY = dragAxis;
        motion.lastTime = performance.now();
        motion.velocity = 0;
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const motion = motionRef.current;
        if (!motion.isDown) return;

        const now = performance.now();
        const dragAxis = direction === "top-left"
            ? e.clientY - e.clientX * 0.4
            : direction === "top-right"
            ? e.clientY + e.clientX * 0.4
            : e.clientY;
        const dy = dragAxis - motion.lastY;
        const dt = Math.max(1, now - motion.lastTime);

        motion.offset -= dy * 1.5;
        motion.velocity = (-dy / dt) * 12;

        motion.lastY = dragAxis;
        motion.lastTime = now;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const motion = motionRef.current;
        motion.isDown = false;
        setIsDragging(false);
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
            // Ignore if pointer capture released
        }
    };

    // Card dimensions & dense full stage 3D grid layout
    const cardWidth = 140;
    const cardHeight = 140;
    const gapY = 20;
    const strideY = cardHeight + gapY;

    const totalItems = items.length;
    const loopSpanHeight = totalItems * strideY;
    const rowsPerCol = totalItems * 3;

    const isVertical = direction === "vertical" || direction === "vertical-up" || direction === "vertical-down";

    const planeTransform = direction === "top-right"
        ? "rotate(24deg) skewX(-8deg)"
        : isVertical
        ? "none"
        : "rotate(-24deg) skewX(8deg)";

    const stageContent = (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn(
                "relative w-full h-[560px] rounded-[24px] overflow-hidden border border-border bg-background text-foreground select-none transition-all duration-300 flex items-center justify-center",
                isDragging ? "cursor-grabbing" : "cursor-grab",
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
                    className={cn(
                        "absolute inset-0 pointer-events-none z-20 transition-opacity",
                        isDark
                            ? "bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,7,0.85)_100%)]"
                            : "bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(255,255,255,0.85)_100%)]"
                    )}
                />
            )}

            {/* Stream Plane */}
            <div
                className={cn(
                    "absolute pointer-events-none flex justify-center items-center",
                    isVertical ? "w-[120%] h-[260%]" : "w-[240%] h-[260%]"
                )}
                style={{
                    transform: planeTransform,
                }}
            >
                <div className="w-full h-full flex justify-center gap-4 sm:gap-5">
                    {Array.from({ length: columns }).map((_, colIdx) => {
                        const colStagger = colIdx * 3;

                        // Alternating column stream direction algorithm
                        const colDirMultiplier = (reverseAlternatingColumns && colIdx % 2 === 1) ? -1 : 1;
                        const colRawOffset = renderOffset * colDirMultiplier;
                        const colOffset = ((colRawOffset % loopSpanHeight) + loopSpanHeight) % loopSpanHeight - loopSpanHeight;

                        return (
                            <div
                                key={colIdx}
                                className="flex flex-col gap-4 sm:gap-5"
                                style={{
                                    transform: `translateY(${colOffset}px)`,
                                }}
                            >
                                {Array.from({ length: rowsPerCol }).map((_, rowIdx) => {
                                    const itemIdx = ((rowIdx + colStagger) % totalItems + totalItems) % totalItems;
                                    const item = items[itemIdx] || items[0];

                                    return (
                                        <div
                                            key={rowIdx}
                                            className={cn(
                                                "relative rounded-[22px] overflow-hidden border shadow-md transition-all duration-200 flex-shrink-0 group",
                                                isDark
                                                    ? "border-slate-800/80 bg-slate-900 shadow-black/60"
                                                    : "border-slate-200 bg-white shadow-slate-300/50"
                                            )}
                                            style={{
                                                width: `${cardWidth}px`,
                                                height: `${cardHeight}px`,
                                            }}
                                        >
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title || "Flow Gallery Item"}
                                                className="w-full h-full object-cover rounded-[20px] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                                                loading="lazy"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
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
