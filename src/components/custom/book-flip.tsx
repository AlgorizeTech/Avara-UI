"use client";

import React, {
    useState,
    useEffect,
    useCallback,
    CSSProperties,
    forwardRef,
    useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw, Globe, QrCode, Sparkles } from "lucide-react";

export interface PageFlipLeaf {
    id?: string | number;
    frontImage: string;
    backImage: string;
    frontTitle?: string;
    backTitle?: string;
    frontSubtitle?: string;
    backSubtitle?: string;
    frontBadge?: string;
    backBadge?: string;
    frontColor?: string;
    backColor?: string;
}

export interface BookFlipProps {
    /** Array of page leaves, each containing front and back images & metadata */
    pages?: PageFlipLeaf[];
    /** Default turned page count (0 = closed book on cover) */
    defaultTurnedIndex?: number;
    /** Controlled turned page count */
    turnedIndex?: number;
    /** Callback fired when page flip changes */
    onPageChange?: (turnedCount: number, totalLeaves: number) => void;
    /** Width of a single page in pixels (default: 260) */
    pageWidth?: number;
    /** Height of a single page in pixels (default: 380) */
    pageHeight?: number;
    /** 3D perspective depth in pixels (default: 1400) */
    perspective?: number;
    /** Maximum hover peek angle in degrees (default: 14) */
    peekAngle?: number;
    /** Total turn angle in degrees (default: 180) */
    turnAngle?: number;
    /** Transition flip animation duration in seconds (default: 0.7) */
    duration?: number;
    /** Easing curve for flip animation (default: "cubic-bezier(0.4, 0, 0.2, 1)") */
    easing?: string;
    /** Shadow intensity factor (0.0 to 1.0, default: 0.35) */
    shadowIntensity?: number;
    /** Dynamically shift spine horizontally when book is open to center the 2-page spread (default: true) */
    spineShift?: boolean;
    /** Border radius for pages (default: "4px") */
    radius?: string | number;
    /** Enable page numbering tags (default: true) */
    showPageNumbers?: boolean;
    /** Enable outer book spine binding shadow (default: true) */
    showSpineBinding?: boolean;
    /** Enable automatic page flipping (default: false) */
    autoplay?: boolean;
    /** Autoplay interval in milliseconds (default: 3500) */
    autoplayInterval?: number;
    /** Pause autoplay on hover (default: true) */
    pauseOnHover?: boolean;
    /** Enable interactive click on pages to flip (default: true) */
    interactive?: boolean;
    /** Enable navigation buttons (default: true) */
    showControls?: boolean;
    /** Optional container class name */
    className?: string;
    /** Optional container inline style */
    style?: CSSProperties;
}

export interface BookFlipHandle {
    next: () => void;
    prev: () => void;
    reset: () => void;
    goTo: (index: number) => void;
    getTurnedCount: () => number;
    getTotalLeaves: () => number;
}

const DEFAULT_PAGES: PageFlipLeaf[] = [
    {
        id: 1,
        frontImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "TERRA INCOGNITA",
        frontSubtitle: "A Visual Exploration of Earth's Most Remote Frontiers",
        frontBadge: "LIMITED EDITION",
        frontColor: "from-amber-400 to-yellow-600",
        backTitle: "Whispering Evergreens",
        backSubtitle: "Highland Ridges & Ancient Pines",
        backBadge: "Plate 01",
        backColor: "from-emerald-500 to-teal-600",
    },
    {
        id: 2,
        frontImage: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Cascading Emerald",
        frontSubtitle: "Basalt Columns & Rainforest Mist",
        frontBadge: "Plate 02",
        frontColor: "from-teal-500 to-cyan-600",
        backTitle: "Crimson Canyons",
        backSubtitle: "Red Rock Gorges & Sunset Radiance",
        backBadge: "Plate 03",
        backColor: "from-rose-500 to-pink-600",
    },
    {
        id: 3,
        frontImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Celestial Auroras",
        frontSubtitle: "Polar Nights & Luminous Fjord Skies",
        frontBadge: "Plate 04",
        frontColor: "from-indigo-500 to-purple-600",
        backTitle: "Summit Horizons",
        backSubtitle: "Glacial Peaks & Alpenglow Glow",
        backBadge: "Plate 05",
        backColor: "from-blue-500 to-indigo-600",
    },
    {
        id: 4,
        frontImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Velvet Saharas",
        frontSubtitle: "Wind Sculpted Dunes & Sunset Glow",
        frontBadge: "Plate 06",
        frontColor: "from-amber-600 to-yellow-500",
        backTitle: "Azure Lagoons",
        backSubtitle: "Coral Gardens & Crystal Waters",
        backBadge: "Plate 07",
        backColor: "from-cyan-500 to-blue-500",
    },
    {
        id: 5,
        frontImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Zen Bamboo Sanctuary",
        frontSubtitle: "Whispering Canopy & Sunlit Paths",
        frontBadge: "Plate 08",
        frontColor: "from-emerald-600 to-lime-600",
        backTitle: "Alpine Glaciers",
        backSubtitle: "Glacial Reflections & Peak Shadows",
        backBadge: "Plate 09",
        backColor: "from-sky-500 to-blue-600",
    },
    {
        id: 6,
        frontImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1476514525535-ce74f458149e?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Golden Autumn",
        frontSubtitle: "Amber Woods & Crisp Air",
        frontBadge: "Plate 10",
        frontColor: "from-amber-500 to-orange-600",
        backTitle: "Nordic Glaciers",
        backSubtitle: "Fjord Passages & Ice Peaks",
        backBadge: "Plate 11",
        backColor: "from-cyan-600 to-teal-700",
    },
    {
        id: 7,
        frontImage: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Wilderness Meadows",
        frontSubtitle: "Alpine Wildflowers & Valley Breezes",
        frontBadge: "Plate 12",
        frontColor: "from-green-500 to-emerald-600",
        backTitle: "Starlit Peaks",
        backSubtitle: "Cosmic Heavens Above Mountain Ridges",
        backBadge: "Plate 13",
        backColor: "from-indigo-600 to-violet-700",
    },
    {
        id: 8,
        frontImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80",
        backImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        frontTitle: "Twilight Solitude",
        frontSubtitle: "Ocean Horizon & Evening Glow",
        frontBadge: "Plate 14",
        frontColor: "from-rose-500 to-purple-600",
        backTitle: "THE INFINITE COSMOS",
        backSubtitle: "Published by Algorize Fine Art Press",
        backBadge: "HARDCOVER MONOGRAPH",
        backColor: "from-purple-600 to-violet-800",
    },
];

export const BookFlip = forwardRef<BookFlipHandle, BookFlipProps>(({
    pages = DEFAULT_PAGES,
    defaultTurnedIndex = 0,
    turnedIndex: controlledTurnedIndex,
    onPageChange,
    pageWidth = 260,
    pageHeight = 380,
    perspective = 1400,
    peekAngle = 14,
    turnAngle = 180,
    duration = 0.7,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    shadowIntensity = 0.35,
    spineShift = true,
    radius = "4px",
    showPageNumbers = true,
    showSpineBinding = true,
    autoplay = false,
    autoplayInterval = 3500,
    pauseOnHover = true,
    interactive = true,
    showControls = true,
    className,
    style,
}, ref) => {
    const [internalTurned, setInternalTurned] = useState<number>(defaultTurnedIndex);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [peekingIndex, setPeekingIndex] = useState<number | null>(null);

    const totalLeaves = pages.length;
    const currentTurned = controlledTurnedIndex !== undefined ? controlledTurnedIndex : internalTurned;

    const parsedRadius = typeof radius === "number" ? `${radius}px` : radius;

    const setTurned = useCallback((newCount: number) => {
        const clamped = Math.max(0, Math.min(newCount, totalLeaves));
        if (controlledTurnedIndex === undefined) {
            setInternalTurned(clamped);
        }
        if (onPageChange) {
            onPageChange(clamped, totalLeaves);
        }
    }, [controlledTurnedIndex, totalLeaves, onPageChange]);

    const flipNext = useCallback(() => {
        if (currentTurned < totalLeaves) {
            setTurned(currentTurned + 1);
        }
    }, [currentTurned, totalLeaves, setTurned]);

    const flipPrev = useCallback(() => {
        if (currentTurned > 0) {
            setTurned(currentTurned - 1);
        }
    }, [currentTurned, setTurned]);

    const resetBook = useCallback(() => {
        setTurned(0);
    }, [setTurned]);

    useImperativeHandle(ref, () => ({
        next: flipNext,
        prev: flipPrev,
        reset: resetBook,
        goTo: (idx) => setTurned(idx),
        getTurnedCount: () => currentTurned,
        getTotalLeaves: () => totalLeaves,
    }));

    // Autoplay Timer
    useEffect(() => {
        if (!autoplay || (pauseOnHover && isHovered) || totalLeaves <= 1) return;
        const timer = setInterval(() => {
            setInternalTurned((prev) => (prev >= totalLeaves ? 0 : prev + 1));
        }, autoplayInterval);
        return () => clearInterval(timer);
    }, [autoplay, autoplayInterval, pauseOnHover, isHovered, totalLeaves]);

    // Preload Page Images to eliminate initial flip rendering jump/flash
    useEffect(() => {
        pages.forEach((page) => {
            if (page.frontImage) {
                const imgFront = new Image();
                imgFront.src = page.frontImage;
            }
            if (page.backImage) {
                const imgBack = new Image();
                imgBack.src = page.backImage;
            }
        });
    }, [pages]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") flipNext();
            if (e.key === "ArrowLeft") flipPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [flipNext, flipPrev]);

    const handleLeafClick = (index: number) => {
        if (!interactive) return;
        if (index === currentTurned) {
            flipNext();
        } else if (index === currentTurned - 1) {
            flipPrev();
        }
    };

    // Container Translation for Spine Centering:
    let containerTranslateX = 0;
    if (spineShift) {
        if (currentTurned > 0 && currentTurned < totalLeaves) {
            containerTranslateX = pageWidth / 2;
        } else if (currentTurned === totalLeaves) {
            containerTranslateX = pageWidth;
        }
    }

    return (
        <div
            className={cn("w-full flex flex-col items-center justify-center select-none py-6", className)}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setPeekingIndex(null);
            }}
        >
            {/* 3D Book Viewport Stage */}
            <div
                className="relative flex items-center justify-center transition-all duration-500"
                style={{
                    perspective: `${perspective}px`,
                    width: `${pageWidth * 2 + 40}px`,
                    height: `${pageHeight + 40}px`,
                }}
            >
                {/* 3D Book Container */}
                <div
                    className="relative transition-transform"
                    style={{
                        width: `${pageWidth}px`,
                        height: `${pageHeight}px`,
                        transformStyle: "preserve-3d",
                        transition: `transform ${duration}s ${easing}`,
                        transform: `translateX(${containerTranslateX}px)`,
                    }}
                >
                    {/* Spine Binding Crease Line */}
                    {showSpineBinding && (
                        <div
                            className="absolute top-0 bottom-0 left-[-3px] w-[6px] rounded-l-sm bg-gradient-to-r from-black/80 via-zinc-800 to-black/30 z-[999] pointer-events-none opacity-95"
                        />
                    )}

                    {/* Book Leaves Stacking Loop */}
                    {pages.map((leaf, index) => {
                        const isTurned = index < currentTurned;
                        const isCanPeek = index === currentTurned;
                        const isPeeking = peekingIndex === index;
                        const isFrontCover = index === 0;
                        const isBackCover = index === totalLeaves - 1;

                        // Calculate robust stack zIndex
                        // Unturned leaves stack downwards (top leaf highest)
                        // Turned leaves stack upwards (last turned leaf highest)
                        let zIndex = isTurned ? index + 1 : totalLeaves - index;

                        // Give highest z-index priority to the active leaf currently flipping
                        if (index === currentTurned - 1) {
                            // Leaf that was just flipped to the left stays on top of left stack
                            zIndex = totalLeaves + 20;
                        } else if (index === currentTurned) {
                            // Leaf about to flip from right stays on top of right stack
                            zIndex = totalLeaves + 10;
                        }

                        let leafRotation = isTurned ? -turnAngle : 0;
                        if (!isTurned && isPeeking) {
                            leafRotation = -peekAngle;
                        }

                        const frontGrad = leaf.frontColor || "from-emerald-500 to-teal-600";
                        const backGrad = leaf.backColor || "from-indigo-500 to-purple-600";

                        return (
                            <div
                                key={leaf.id ?? index}
                                onClick={() => handleLeafClick(index)}
                                onMouseEnter={() => {
                                    if (isCanPeek) setPeekingIndex(index);
                                }}
                                onMouseLeave={() => {
                                    if (peekingIndex === index) setPeekingIndex(null);
                                }}
                                className={cn(
                                    "absolute inset-0 origin-left border-0 shadow-none transition-transform",
                                    interactive ? "cursor-pointer" : "pointer-events-none"
                                )}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transition: `transform ${duration}s ${easing}`,
                                    transform: `rotateY(${leafRotation}deg)`,
                                    zIndex,
                                    borderRadius: parsedRadius,
                                }}
                            >
                                {/* FRONT FACE */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-zinc-900 dark:bg-zinc-950 overflow-hidden flex flex-col justify-between"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        borderRadius: parsedRadius,
                                    }}
                                >
                                    <img
                                        src={leaf.frontImage}
                                        alt={leaf.frontTitle ?? `Plate ${index * 2 + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                                        loading="eager"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                                    {/* Integrated Spine Crease Overlay on Front Face */}
                                    <div className="absolute top-0 bottom-0 left-0 w-[8px] bg-gradient-to-r from-black/90 via-zinc-900/60 to-transparent pointer-events-none z-30" />

                                    {/* Top Header */}
                                    <div className="relative p-3.5 z-10 flex items-center justify-between pointer-events-none">
                                        {!isFrontCover && leaf.frontBadge ? (
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-white bg-gradient-to-r ml-2",
                                                frontGrad
                                            )}>
                                                {leaf.frontBadge}
                                            </span>
                                        ) : <div />}
                                        {/* Page Number */}
                                        {showPageNumbers && !isFrontCover && (
                                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-black/60 backdrop-blur-md text-emerald-300">
                                                #{index * 2}
                                            </span>
                                        )}
                                    </div>

                                    {/* Bottom Content Metadata */}
                                    {isFrontCover ? (
                                        /* High-Fashion Minimalist Magazine Editorial Cover Design */
                                        <div className="relative p-6 z-10 w-full h-full flex flex-col justify-between pointer-events-none">
                                            {/* Top Brand Header */}
                                            <div className="flex items-center justify-between z-20 pt-2">
                                                <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase">
                                                        VOL. 08 — EDITION I
                                                    </span>
                                                </div>
                                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                            </div>

                                            {/* Bottom Magazine Monograph Header */}
                                            <div className="z-20 space-y-2 pb-6">
                                                <div className="w-10 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
                                                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase font-sans leading-none drop-shadow-2xl">
                                                    {leaf.frontTitle || "TERRA INCOGNITA"}
                                                </h1>
                                                <p className="text-xs font-medium text-emerald-200/90 leading-relaxed max-w-[90%]">
                                                    {leaf.frontSubtitle || "A Visual Exploration of Earth's Most Remote Frontiers"}
                                                </p>
                                                <div className="pt-2 text-[9px] font-mono font-semibold tracking-widest text-zinc-300 uppercase">
                                                    ALGORIZE MAGNATE PRESS
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Standard Plate Front Layout */
                                        <div className="relative p-4 z-10 space-y-1 pointer-events-none">
                                            {leaf.frontTitle && (
                                                <h4 className="text-base font-black tracking-tight text-white leading-tight">
                                                    {leaf.frontTitle}
                                                </h4>
                                            )}
                                            {leaf.frontSubtitle && (
                                                <p className="text-xs font-semibold text-emerald-200/90 line-clamp-1">
                                                    {leaf.frontSubtitle}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* BACK FACE */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-zinc-900 dark:bg-zinc-950 overflow-hidden flex flex-col justify-between"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        borderRadius: parsedRadius,
                                    }}
                                >
                                    <img
                                        src={leaf.backImage}
                                        alt={leaf.backTitle ?? `Plate ${index * 2 + 2}`}
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                                        loading="eager"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                                    {/* Integrated Spine Crease Overlay on Back Face */}
                                    <div className="absolute top-0 bottom-0 right-0 w-[8px] bg-gradient-to-l from-black/90 via-zinc-900/60 to-transparent pointer-events-none z-30" />

                                    {/* Top Header */}
                                    <div className="relative p-3.5 z-10 flex items-center justify-between pointer-events-none">
                                        {!isBackCover && leaf.backBadge ? (
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-white bg-gradient-to-r",
                                                backGrad
                                            )}>
                                                {leaf.backBadge}
                                            </span>
                                        ) : <div />}
                                        {/* Page Number */}
                                        {showPageNumbers && !isBackCover && (
                                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-black/60 backdrop-blur-md text-cyan-300 mr-2">
                                                #{index * 2 + 1}
                                            </span>
                                        )}
                                    </div>

                                    {/* Bottom Content Metadata */}
                                    {isBackCover ? (
                                        /* Luxurious Royal Back Cover Design */
                                        <div className="relative p-6 z-10 w-full space-y-3 pointer-events-none bg-gradient-to-t from-black/95 via-black/85 to-transparent text-center flex flex-col items-center justify-end pb-9">
                                            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mb-1" />
                                            <h3 className="text-base font-black tracking-[0.2em] uppercase text-white font-serif">
                                                {leaf.backTitle || "THE INFINITE COSMOS"}
                                            </h3>
                                            <p className="text-[11px] font-medium text-zinc-300/90 leading-relaxed max-w-[92%]">
                                                {leaf.backSubtitle || "Published by Algorize Fine Art Press. All rights reserved."}
                                            </p>
                                            <div className="pt-2 w-full flex items-center justify-between border-t border-white/15 text-zinc-400 text-[9px] font-mono">
                                                <span>ISBN 978-0-321-12345-6</span>
                                                <QrCode className="w-4 h-4 text-white/80" />
                                            </div>
                                        </div>
                                    ) : (
                                        /* Standard Plate Back Layout */
                                        <div className="relative p-4 z-10 space-y-1 pointer-events-none">
                                            {leaf.backTitle && (
                                                <h4 className="text-base font-black tracking-tight text-white leading-tight">
                                                    {leaf.backTitle}
                                                </h4>
                                            )}
                                            {leaf.backSubtitle && (
                                                <p className="text-xs font-semibold text-cyan-200/90 line-clamp-1">
                                                    {leaf.backSubtitle}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Minimal Shadowless Icon-Only Controls Toolbar */}
            {showControls && (
                <div className="flex items-center justify-center gap-2 mt-5 p-1.5 rounded-full bg-muted/60 dark:bg-zinc-900/60 border border-border/70 backdrop-blur-md z-50 select-none shadow-none">
                    {/* Prev Button (Icon Only) */}
                    <button
                        onClick={flipPrev}
                        disabled={currentTurned === 0}
                        aria-label="Previous Page"
                        className="p-2.5 rounded-full flex items-center justify-center bg-background hover:bg-accent text-foreground border border-border/60 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-none"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Reset Button (Icon Only) */}
                    <button
                        onClick={resetBook}
                        disabled={currentTurned === 0}
                        aria-label="Reset Book"
                        className="p-2.5 rounded-full flex items-center justify-center bg-background hover:bg-accent text-muted-foreground hover:text-foreground border border-border/60 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer group shadow-none"
                    >
                        <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
                    </button>

                    {/* Page Leaves Counter Badge */}
                    <div className="px-3.5 py-1.5 rounded-full bg-background border border-border/60 text-xs font-mono font-bold text-foreground flex items-center gap-1.5 shadow-none">
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{currentTurned}</span>
                        <span className="text-muted-foreground/60 font-normal">/</span>
                        <span>{totalLeaves}</span>
                    </div>

                    {/* Next Button (Icon Only) */}
                    <button
                        onClick={flipNext}
                        disabled={currentTurned === totalLeaves}
                        aria-label="Next Page"
                        className="p-2.5 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-none"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
});

BookFlip.displayName = "BookFlip";

export default BookFlip;
export { BookFlip as ThreeDImagePageflip };
