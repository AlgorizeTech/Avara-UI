"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageViewerVariant =
  | "inner-zoom"
  | "side-zoom"
  | "slider"
  | "thumbnails";

export type ThumbnailPosition = "left" | "right" | "bottom";

export interface ImageViewerColor {
  name: string;
  class: string;
  bgClass?: string;
  image?: string;
}

export interface ImageViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Display architecture variant */
  variant?: ImageViewerVariant;
  /** Position of thumbnails when variant="thumbnails" ('left' | 'right' | 'bottom'). Default: 'left' */
  thumbnailPosition?: ThumbnailPosition;
  /** List of product/gallery image URLs */
  images?: string[];
  /** Optional colorways with matching images; colorway `i`'s `bgClass` tints the frame and thumbnail behind image `i` */
  colors?: ImageViewerColor[];
  /** Index of initial active image (0-indexed). Defaults to 3 for 'side-zoom', 1 for 'slider', 2 for 'thumbnails', 0 for others */
  defaultImage?: number;
  /** Badge text shown in the top corner (e.g. "20% OFF") */
  badge?: string;
  /** Whether to show the floating wishlist heart button */
  showWishlist?: boolean;
  /** Whether clicking the image opens fullscreen lightbox modal */
  enableLightbox?: boolean;
  /**
   * Magnification of the side-zoom loupe over the image as shown in the frame.
   * 3–10 is the usual e-commerce range; serve images large enough to stay
   * sharp at it. Default: 3
   */
  zoomLevel?: number;
  /** Custom callback when active image changes */
  onImageChange?: (index: number) => void;
  className?: string;
}

const DEFAULT_IMAGES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg",
];

const ITEM_BG_CLASSES = [
  "bg-primary/10 border-primary/20",
  "bg-primary/10 border-primary/20",
  "bg-primary/10 border-primary/20",
  "bg-primary/10 border-primary/20",
];

const LOUPE_MAX = 360;
const SCREEN_MARGIN = 12;
/** The frame shows its image at scale-140, so the loupe starts from that. */
const FRAME_SCALE = 1.4;

/** Loupe edge in px: as large as LOUPE_MAX allows without crowding the screen. */
function loupeSize() {
  return Math.min(
    LOUPE_MAX,
    window.innerWidth - SCREEN_MARGIN * 2,
    window.innerHeight * 0.5,
  );
}

/**
 * Places the side-zoom loupe just above the pointer, clear of the reticle.
 * It flips below when there is no room above and is clamped to the viewport
 * on every edge, so it never leaves the screen at any size.
 */
function placeLoupe(cx: number, cy: number, size: number, reticle: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = reticle / 2 + 12;
  const clamp = (v: number, max: number) =>
    Math.min(Math.max(v, SCREEN_MARGIN), max - SCREEN_MARGIN - size);

  let top = cy - gap - size;
  if (top < SCREEN_MARGIN) top = cy + gap;
  return {
    width: size,
    height: size,
    left: clamp(cx - size / 2, vw),
    top: clamp(top, vh),
  };
}

/**
 * Offset of the zoomed image inside the loupe so the point under the pointer
 * sits at its centre. `pct` is the pointer's position across the frame and
 * `full` the zoomed image's edge; clamped so the loupe never shows past the
 * image's edge.
 */
function loupeOffset(pct: number, full: number, size: number) {
  const along = 0.5 + (pct / 100 - 0.5) / FRAME_SCALE;
  return Math.min(0, Math.max(size - full, size / 2 - along * full));
}

const DEFAULT_COLORS: ImageViewerColor[] = [
  { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: ITEM_BG_CLASSES[0], image: DEFAULT_IMAGES[0] },
  { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: ITEM_BG_CLASSES[1], image: DEFAULT_IMAGES[1] },
  { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: ITEM_BG_CLASSES[2], image: DEFAULT_IMAGES[2] },
  { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: ITEM_BG_CLASSES[3], image: DEFAULT_IMAGES[3] },
];

export function ImageViewer({
  variant = "inner-zoom",
  thumbnailPosition = "left",
  images = DEFAULT_IMAGES,
  colors = DEFAULT_COLORS,
  defaultImage,
  badge = "20% OFF",
  showWishlist = true,
  enableLightbox = true,
  zoomLevel = 3,
  onImageChange,
  className,
  ...props
}: ImageViewerProps) {
  const getVariantDefaultImage = (v: ImageViewerVariant) => {
    if (v === "side-zoom") return 3;
    if (v === "slider") return 1;
    if (v === "thumbnails") return 2;
    return 0;
  };
  const initialIndex =
    defaultImage !== undefined ? defaultImage : getVariantDefaultImage(variant);
  const [selectedImage, setSelectedImage] = useState(initialIndex);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // x/y: percent within the frame; cx/cy: pointer in viewport px and fw: frame
  // width in px (side loupe).
  const [zoomPos, setZoomPos] = useState<{
    x: number;
    y: number;
    cx: number;
    cy: number;
    fw: number;
    visible: boolean;
  }>({ x: 0, y: 0, cx: 0, cy: 0, fw: 0, visible: false });

  const activeImage = images[selectedImage % images.length] || images[0];
  // The tint behind image `idx`: its colourway's `bgClass` when one is given.
  const tintFor = (idx: number) =>
    colors[idx]?.bgClass ?? ITEM_BG_CLASSES[idx % ITEM_BG_CLASSES.length];

  const handleSelectImage = useCallback(
    (index: number) => {
      setSelectedImage(index);
      onImageChange?.(index);
    },
    [onImageChange]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y, cx: e.clientX, cy: e.clientY, fw: width, visible: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, visible: false }));
  };

  // Set while a finger is down on the frame (read by the scroll hide below).
  const touchingRef = useRef(false);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    touchingRef.current = true;
    const x = Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - top) / height) * 100));
    setZoomPos({ x, y, cx: touch.clientX, cy: touch.clientY, fw: width, visible: true });
  };

  // The loupe is fixed to the viewport, so a wheel scroll would strand it away
  // from a still mouse; hide it until the next move instead. Touch is exempt:
  // a drag scrolls the page too, but every touchmove re-places the loupe.
  useEffect(() => {
    if (variant !== "side-zoom" || !zoomPos.visible) return;
    const hide = () => {
      if (!touchingRef.current) setZoomPos((prev) => ({ ...prev, visible: false }));
    };
    window.addEventListener("scroll", hide, { capture: true, passive: true });
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, { capture: true });
      window.removeEventListener("resize", hide);
    };
  }, [variant, zoomPos.visible]);

  const handleTouchEnd = () => {
    touchingRef.current = false;
    setZoomPos((prev) => ({ ...prev, visible: false }));
  };

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Keyboard controls for modal
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, nextImage, prevImage]);

  const isVerticalThumbnails = thumbnailPosition === "left" || thumbnailPosition === "right";
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbSize, setThumbSize] = useState<number | null>(null);

  useEffect(() => {
    if (!isVerticalThumbnails || !containerRef.current) return;
    const el = containerRef.current;
    const updateSize = () => {
      const w = el.clientWidth;
      if (w > 0 && images.length > 0) {
        const colGap = window.innerWidth >= 640 ? 16 : 12;
        const itemGap = window.innerWidth >= 640 ? 10 : 8;
        const totalItemGaps = (images.length - 1) * itemGap;
        const size = Math.max(30, Math.floor((w - colGap - totalItemGaps) / (images.length + 1)));
        setThumbSize(size);
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVerticalThumbnails, images.length]);

  const renderThumbnailList = () => {
    const fallbackWidth = `calc((100% - 16px - ${Math.max(0, images.length - 1)} * 10px) / ${images.length + 1})`;

    return (
      <div
        style={
          isVerticalThumbnails
            ? { width: thumbSize ? `${thumbSize}px` : fallbackWidth }
            : undefined
        }
        className={cn(
          isVerticalThumbnails
            ? "flex flex-col gap-2 sm:gap-2.5 shrink-0 overflow-hidden"
            : "grid grid-cols-4 gap-2.5 sm:gap-3 w-full"
        )}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectImage(idx)}
            style={
              isVerticalThumbnails && thumbSize
                ? { width: `${thumbSize}px`, height: `${thumbSize}px` }
                : undefined
            }
            className={cn(
              "aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all p-0 flex items-center justify-center cursor-pointer shadow-sm shrink-0",
              tintFor(idx),
              selectedImage === idx
                ? "border-primary ring-2 ring-primary/30 scale-105"
                : "border-border opacity-70 hover:opacity-100 hover:border-primary/50"
            )}
            aria-label={`Thumbnail image ${idx + 1}`}
          >
            <img src={img} alt="Thumbnail Preview" className="w-full h-full object-cover scale-110 p-0" />
          </button>
        ))}
      </div>
    );
  };

  // Side-zoom loupe geometry. `full` is the zoomed image's edge: the frame's
  // on-screen image (frame width × scale-140) times zoomLevel. The reticle
  // marks the frame area that fills the loupe at that magnification.
  const loupe =
    variant === "side-zoom" && zoomPos.visible
      ? (() => {
          const size = loupeSize();
          return {
            size,
            full: zoomPos.fw * FRAME_SCALE * zoomLevel,
            reticle: size / zoomLevel,
          };
        })()
      : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-2xl select-none mx-auto",
        className
      )}
      {...props}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. INNER ZOOM VIEWER                                          */}
      {/* ------------------------------------------------------------- */}
      {variant === "inner-zoom" && (
        <div className="space-y-4">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={cn(
              "aspect-square w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-border relative flex items-center justify-center p-0 transition-colors group cursor-crosshair",
              tintFor(selectedImage)
            )}
          >
            <img
              src={activeImage}
              alt="Product View"
              className={cn(
                "w-full h-full object-cover scale-140 p-0 transition-all duration-300",
                zoomPos.visible && "opacity-0"
              )}
            />

            {/* Inner Magnifier Zoom Canvas */}
            {zoomPos.visible && (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-150 rounded-3xl sm:rounded-[2.5rem]"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundSize: "260%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}

            {/* Top Badge */}
            {badge && (
              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-extrabold uppercase tracking-wider z-20 pointer-events-auto shadow-md">
                {badge}
              </span>
            )}

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-3 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground hover:text-rose-500 transition-all z-20 cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                aria-label="Save to Wishlist"
              >
                <Heart className={cn("size-4 sm:size-5 transition-colors", liked && "fill-rose-500 text-rose-500")} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. SIDE LENS ZOOM VIEWER                                      */}
      {/* ------------------------------------------------------------- */}
      {variant === "side-zoom" && (
        <div className="space-y-4">
          <div className="relative w-full">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={cn(
                "aspect-square w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-border relative flex items-center justify-center p-0 transition-colors group cursor-crosshair",
                tintFor(selectedImage)
              )}
            >
              <img
                src={activeImage}
                alt="Product View"
                className="w-full h-full object-cover scale-140 p-0 transition-all duration-300"
              />

              {/* Reticle Lens Box — sized to exactly the area the loupe shows */}
              {loupe && (
                <div
                  className="absolute rounded-lg border-2 border-primary/70 bg-primary/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 block shadow-lg"
                  style={{
                    left: `${zoomPos.x}%`,
                    top: `${zoomPos.y}%`,
                    width: loupe.reticle,
                    height: loupe.reticle,
                  }}
                />
              )}

              {/* Badge */}
              {badge && (
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-extrabold uppercase tracking-wider z-20 pointer-events-auto shadow-md">
                  {badge}
                </span>
              )}

              {/* Wishlist */}
              {showWishlist && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                  }}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-3 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground hover:text-rose-500 transition-all z-20 cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={cn("size-4 sm:size-5 transition-colors", liked && "fill-rose-500 text-rose-500")} />
                </button>
              )}
            </div>

            {/* Floating Loupe — rendered into <body> with fixed positioning so
                no clipping ancestor can crop it; placeLoupe keeps it above the
                pointer and inside the viewport. */}
            {loupe &&
              createPortal(
                <div
                  className={cn(
                    "fixed rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 border-border z-[100] pointer-events-none shadow-2xl animate-in fade-in zoom-in-95 duration-150 motion-reduce:animate-none",
                    tintFor(selectedImage)
                  )}
                  style={placeLoupe(zoomPos.cx, zoomPos.cy, loupe.size, loupe.reticle)}
                >
                  {/* A square object-cover <img> crops exactly like the frame,
                      whatever the image's own aspect ratio. */}
                  <img
                    src={activeImage}
                    alt=""
                    className="absolute max-w-none object-cover"
                    style={{
                      width: loupe.full,
                      height: loupe.full,
                      left: loupeOffset(zoomPos.x, loupe.full, loupe.size),
                      top: loupeOffset(zoomPos.y, loupe.full, loupe.size),
                    }}
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-[10px] sm:text-xs font-bold text-foreground flex items-center gap-1.5 shadow-sm">
                    <Maximize2 className="size-3 sm:size-3.5 text-primary" /> {zoomLevel}x Zoom
                  </div>
                </div>,
                document.body
              )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. SLIDER / CAROUSEL VIEWER                                   */}
      {/* ------------------------------------------------------------- */}
      {variant === "slider" && (
        <div className="space-y-4">
          <div
            onClick={() => enableLightbox && setIsModalOpen(true)}
            className={cn(
              "aspect-square w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-border relative flex items-center justify-center p-0 transition-colors group",
              enableLightbox ? "cursor-pointer" : "cursor-default",
              tintFor(selectedImage)
            )}
          >
            <img
              src={activeImage}
              alt="Slider Product View"
              className="peer w-full h-full object-cover scale-140 p-0 transition-all duration-300 group-hover:scale-105"
            />

            {/* Click to Expand Overlay */}
            {enableLightbox && (
              <div className="absolute inset-0 bg-black/20 opacity-0 peer-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                <span className="px-4 py-2 rounded-full bg-black/70 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <ZoomIn className="size-4" /> Click to Expand
                </span>
              </div>
            )}

            {/* Badge */}
            {badge && (
              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-extrabold uppercase tracking-wider z-20 pointer-events-auto shadow-md">
                {badge}
              </span>
            )}

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-3 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground hover:text-rose-500 transition-all z-20 cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                aria-label="Save to Wishlist"
              >
                <Heart className={cn("size-4 sm:size-5 transition-colors", liked && "fill-rose-500 text-rose-500")} />
              </button>
            )}

            {/* Left Slider Arrow Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/90 border border-border text-foreground hover:scale-110 transition-all backdrop-blur-md z-20 cursor-pointer shadow-md active:scale-95"
              aria-label="Previous Image"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Right Slider Arrow Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/90 border border-border text-foreground hover:scale-110 transition-all backdrop-blur-md z-20 cursor-pointer shadow-md active:scale-95"
              aria-label="Next Image"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Slide Indicator Dots */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 p-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectImage(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all cursor-pointer",
                    selectedImage === idx ? "w-6 bg-primary" : "w-2 bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. THUMBNAIL STRIP GALLERY VIEWER                            */}
      {/* ------------------------------------------------------------- */}
      {variant === "thumbnails" && (
        <div
          className={cn(
            thumbnailPosition === "left" && "flex flex-row gap-3 sm:gap-4 items-start",
            thumbnailPosition === "right" && "flex flex-row gap-3 sm:gap-4 items-start",
            thumbnailPosition === "bottom" && "flex flex-col gap-3 sm:gap-4"
          )}
        >
          {thumbnailPosition === "left" && renderThumbnailList()}

          <div
            onClick={() => enableLightbox && setIsModalOpen(true)}
            className={cn(
              "aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-border relative flex items-center justify-center p-0 transition-colors group",
              thumbnailPosition === "bottom" ? "w-full" : "flex-1 min-w-0",
              enableLightbox ? "cursor-pointer" : "cursor-default",
              tintFor(selectedImage)
            )}
          >
            <img
              src={activeImage}
              alt="Thumbnail Product View"
              className="peer w-full h-full object-cover scale-140 p-0 transition-all duration-300 group-hover:scale-105"
            />

            {/* Click to Expand Overlay */}
            {enableLightbox && (
              <div className="absolute inset-0 bg-black/20 opacity-0 peer-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                <span className="px-4 py-2 rounded-full bg-black/70 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <ZoomIn className="size-4" /> Click to Expand
                </span>
              </div>
            )}

            {/* Badge */}
            {badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-extrabold uppercase tracking-wider z-20 pointer-events-auto shadow-md">
                {badge}
              </span>
            )}

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="absolute top-4 right-4 p-2.5 sm:p-3 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground hover:text-rose-500 transition-all z-20 cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                aria-label="Save to Wishlist"
              >
                <Heart className={cn("size-4 sm:size-5 transition-colors", liked && "fill-rose-500 text-rose-500")} />
              </button>
            )}
          </div>

          {thumbnailPosition === "right" && renderThumbnailList()}
          {thumbnailPosition === "bottom" && renderThumbnailList()}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FULLSCREEN LIGHTBOX MODAL DIALOG                              */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-card/80 hover:bg-card border border-border text-foreground transition-all backdrop-blur-md z-50 cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Close Lightbox"
          >
            <X className="size-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative flex flex-col items-center justify-center p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Relative Image Wrapper */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "p-0 rounded-3xl border border-border max-w-[80vw] sm:max-w-2xl max-h-[65vh] aspect-square sm:aspect-[4/3] flex items-center justify-center transition-colors overflow-hidden",
                  tintFor(selectedImage)
                )}
              >
                <img
                  src={activeImage}
                  alt="Full Screen Expanded View"
                  className="w-full h-full object-cover scale-140 transition-all duration-300"
                />
              </div>

              {/* Lightbox Slider Arrows */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute right-[calc(100%+10px)] sm:right-[calc(100%+25px)] top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-card/90 hover:bg-card border border-border text-foreground backdrop-blur-md transition-all z-50 cursor-pointer hover:scale-110 shrink-0"
                aria-label="Previous Image"
              >
                <ChevronLeft className="size-5 sm:size-6" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute left-[calc(100%+10px)] sm:left-[calc(100%+25px)] top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-card/90 hover:bg-card border border-border text-foreground backdrop-blur-md transition-all z-50 cursor-pointer hover:scale-110 shrink-0"
                aria-label="Next Image"
              >
                <ChevronRight className="size-5 sm:size-6" />
              </button>

              {/* Thumbnails inside Lightbox */}
              <div className="absolute top-[calc(100%+15px)] sm:top-[calc(100%+30px)] left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-card/90 backdrop-blur-md border border-border z-50">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectImage(idx)}
                    className={cn(
                      "size-9 sm:size-12 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0 flex items-center justify-center",
                      tintFor(idx),
                      selectedImage === idx
                        ? "border-primary ring-2 ring-primary/40 scale-105"
                        : "border-border opacity-70 hover:opacity-100"
                    )}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt="Thumbnail Preview" className="w-full h-full object-cover scale-120 p-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
