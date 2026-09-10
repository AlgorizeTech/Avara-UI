"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface SquircleCarouselItem {
    id: string | number;
    title?: string;
    imageUrl: string;
}

export interface SquircleCarouselProps {
    /** List of carousel image items */
    items?: SquircleCarouselItem[];
    /** Grid rows count (default: 4) */
    rows?: number;
    /** Tile gap in pixels (default: 8) */
    gridGap?: number;
    /** Edge fade overlay width percentage (0-50, default: 36) */
    fadeWidthPercent?: number;
    /** Show outer header shell (default: false) */
    showHeaderShell?: boolean;
    /** Header title */
    title?: string;
    /** Category tag */
    categoryTag?: string;
    /** Subtitle description */
    description?: string;
    /** Tags list */
    tags?: string[];
    /** Preview button text */
    previewText?: string;
    /** CTA button text */
    ctaText?: string;
    /** Footer caption text */
    footerCaption?: string;
    /** Custom class name */
    className?: string;
}

const DEFAULT_ITEMS: SquircleCarouselItem[] = [
    {
        id: "1",
        title: "Misty Pine Forest",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "2",
        title: "Alpine Glacier Lake",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "3",
        title: "Sunset Mountain Range",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "4",
        title: "Lush River Valley",
        imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "5",
        title: "Autumn Woodland Path",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    },
];

const DEFAULT_TAGS = [
    "carousel",
    "squircle",
    "grid",
    "mask",
    "nature",
    "drag",
    "inertia",
];

export function SquircleCarousel({
    items = DEFAULT_ITEMS,
    rows = 4,
    gridGap = 8,
    fadeWidthPercent = 36,
    showHeaderShell = false,
    title = "Squircle Carousel",
    categoryTag = "⟲ CAROUSELS",
    description = "Horizontal flowing carousel where images are masked behind a grid of rounded cubes with snap physics and smooth inertia.",
    tags = DEFAULT_TAGS,
    previewText = "PREVIEW",
    ctaText = "GET IT FOR $10.00",
    footerCaption = "Drag to explore; snaps between images",
    className,
}: SquircleCarouselProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

    // Drag Physics State
    const dragRef = useRef({
        startX: 0,
        scrollPos: 0,
        targetPos: 0,
        velocity: 0,
        lastX: 0,
        lastTime: 0,
        isDown: false,
    });

    // Preload images into HTMLImageElement instances
    useEffect(() => {
        let isMounted = true;
        const imagePromises = items.map((item) => {
            return new Promise<HTMLImageElement>((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = item.imageUrl;
                img.onload = () => resolve(img);
                img.onerror = () => resolve(img);
            });
        });

        Promise.all(imagePromises).then((imgs) => {
            if (isMounted) {
                setLoadedImages(imgs);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [items]);

    // Canvas Render Loop
    const renderCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        let bgStyle: string;
        const isDarkTheme = isDark;

        if (containerRef.current) {
            const computedBg = getComputedStyle(containerRef.current).backgroundColor;
            if (computedBg && computedBg !== "rgba(0, 0, 0, 0)" && computedBg !== "transparent") {
                bgStyle = computedBg;
            } else {
                bgStyle = isDarkTheme ? "#09090b" : "#ffffff";
            }
        } else {
            bgStyle = isDarkTheme ? "#09090b" : "#ffffff";
        }

        ctx.fillStyle = bgStyle;
        ctx.fillRect(0, 0, width, height);

        if (loadedImages.length === 0) return;

        const totalItems = loadedImages.length;
        const currentPos = dragRef.current.scrollPos;

        const isMobile = width < 640;

        const gap = isMobile ? Math.max(4, gridGap - 2) : gridGap;
        const padY = isMobile ? 12 : 24;
        const padX = isMobile ? 8 : 16;
        const availW = width - padX * 2;
        const availH = height - padY * 2;
        const stageCenterX = width / 2;

        const cardCols = isMobile ? 4 : 6;
        const cellW = Math.round((availW * (isMobile ? 0.82 : 0.68)) / cardCols);
        const tileStride = cellW + gap;
        const cellH = (availH - (rows - 1) * gap) / rows;
        const cornerRadius = isMobile ? 10 : 14;

        ctx.save();

        const colsHalfStage = Math.ceil((stageCenterX + 200) / tileStride);
        const centerColIdx = Math.floor(currentPos / tileStride);
        const startGlobalCol = centerColIdx - colsHalfStage;
        const endGlobalCol = centerColIdx + colsHalfStage;

        for (let r = 0; r < rows; r++) {
            const cellY = padY + r * (cellH + gap);

            for (let globalCol = startGlobalCol; globalCol <= endGlobalCol; globalCol++) {
                const cellX = globalCol * tileStride - currentPos + stageCenterX - cellW / 2;

                if (cellX + cellW < -60 || cellX > width + 60) continue;

                const normalizedColIdx = ((globalCol % (cardCols * totalItems)) + (cardCols * totalItems)) % (cardCols * totalItems);
                const cardIdx = Math.floor(normalizedColIdx / cardCols);
                const colInCard = normalizedColIdx % cardCols;

                const img = loadedImages[cardIdx];

                ctx.save();

                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(cellX, cellY, cellW, cellH, cornerRadius);
                } else {
                    ctx.rect(cellX, cellY, cellW, cellH);
                }
                ctx.clip();

                if (img && img.complete && img.naturalWidth > 0) {
                    const imgWidthSpan = cardCols * tileStride - gap;
                    const scaleFactor = Math.max(imgWidthSpan / img.naturalWidth, availH / img.naturalHeight);
                    const fullImgW = img.naturalWidth * scaleFactor;
                    const fullImgH = img.naturalHeight * scaleFactor;

                    const cardOriginX = (globalCol - colInCard) * tileStride - currentPos + stageCenterX - cellW / 2;
                    const drawX = cardOriginX + (imgWidthSpan - fullImgW) / 2;
                    const drawY = padY + (availH - fullImgH) / 2;

                    ctx.drawImage(img, drawX, drawY, fullImgW, fullImgH);
                }

                ctx.restore();
            }
        }

        const fadeWidth = width * (Math.min(50, Math.max(0, fadeWidthPercent)) / 100);

        if (fadeWidth > 0) {
            const leftGrad = ctx.createLinearGradient(0, 0, fadeWidth, 0);
            const rightGrad = ctx.createLinearGradient(width - fadeWidth, 0, width, 0);

            if (isDarkTheme) {
                leftGrad.addColorStop(0, "rgba(9, 9, 11, 1.0)");
                leftGrad.addColorStop(0.5, "rgba(9, 9, 11, 0.78)");
                leftGrad.addColorStop(1, "rgba(9, 9, 11, 0)");

                rightGrad.addColorStop(0, "rgba(9, 9, 11, 0)");
                rightGrad.addColorStop(0.5, "rgba(9, 9, 11, 0.78)");
                rightGrad.addColorStop(1, "rgba(9, 9, 11, 1.0)");
            } else {
                leftGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
                leftGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.82)");
                leftGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

                rightGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
                rightGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.82)");
                rightGrad.addColorStop(1, "rgba(255, 255, 255, 1.0)");
            }

            ctx.fillStyle = leftGrad;
            ctx.fillRect(0, 0, fadeWidth, height);

            ctx.fillStyle = rightGrad;
            ctx.fillRect(width - fadeWidth, 0, fadeWidth, height);
        }

        ctx.restore();
    }, [rows, gridGap, fadeWidthPercent, loadedImages, isDark]);

    // Drag Physics Animation Loop
    useEffect(() => {
        let animId: number;

        const updatePhysics = () => {
            const drag = dragRef.current;
            const container = containerRef.current;
            if (container) {
                const w = container.clientWidth;
                const h = container.clientHeight;
                if (canvasRef.current && (canvasRef.current.width !== w || canvasRef.current.height !== h)) {
                    canvasRef.current.width = w;
                    canvasRef.current.height = h;
                }
            }

            if (!drag.isDown) {
                drag.velocity *= 0.92;
                drag.targetPos += drag.velocity;
                drag.scrollPos += (drag.targetPos - drag.scrollPos) * 0.18;
            } else {
                drag.scrollPos += (drag.targetPos - drag.scrollPos) * 0.35;
            }

            renderCanvas();
            animId = requestAnimationFrame(updatePhysics);
        };

        updatePhysics();

        return () => {
            cancelAnimationFrame(animId);
        };
    }, [renderCanvas]);

    // Pointer Event Handlers for Mouse Drag
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        drag.isDown = true;
        drag.startX = e.clientX;
        drag.lastX = e.clientX;
        drag.lastTime = performance.now();
        drag.velocity = 0;
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag.isDown) return;

        const now = performance.now();
        const dx = e.clientX - drag.lastX;
        const dt = Math.max(1, now - drag.lastTime);

        drag.targetPos -= dx * 1.4;
        drag.velocity = (-dx / dt) * 14;

        drag.lastX = e.clientX;
        drag.lastTime = now;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        drag.isDown = false;
        setIsDragging(false);

        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
            // Ignore pointer capture release error if already lost
        }
    };

    const stageContent = (
        <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn(
                "relative w-full h-[500px] rounded-[24px] overflow-hidden border border-border bg-background text-foreground select-none transition-all",
                isDragging ? "cursor-grabbing" : "cursor-grab",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
        </div>
    );

    if (!showHeaderShell) {
        return stageContent;
    }

    return (
        <div className="w-full space-y-4 font-sans text-foreground select-none">
            {/* Header Metadata Shell */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        {title}
                    </h2>
                    {categoryTag && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                            {categoryTag}
                        </span>
                    )}
                </div>

                {description && (
                    <p className="text-xs sm:text-sm font-normal text-muted-foreground max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Badge tags */}
                {tags && tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border bg-muted/60 text-muted-foreground border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 pt-2">
                    {previewText && (
                        <button
                            type="button"
                            className="px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider text-primary bg-primary/10 hover:bg-primary/20 transition-colors uppercase cursor-pointer"
                        >
                            {previewText}
                        </button>
                    )}

                    {ctaText && (
                        <button
                            type="button"
                            className="px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider text-primary-foreground bg-primary hover:bg-primary/90 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                        >
                            <span>🔒</span>
                            <span>{ctaText}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Main Stage */}
            {stageContent}

            {/* Footer Caption */}
            {footerCaption && (
                <p className="text-xs font-mono tracking-wide text-muted-foreground pt-1">
                    {footerCaption}
                </p>
            )}
        </div>
    );
}

export default SquircleCarousel;
