"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Heart,
  ShoppingCart,
  Star,
  Zap,
  CheckCircle2,
  Plus,
  Eye,
} from "lucide-react";

export type ProductCardVariant = "standard" | "compact" | "horizontal";

export interface ProductColorOption {
  name: string;
  value: string; // Tailwind color class or hex string (e.g. 'bg-indigo-600')
}

export interface ProductCardProps {
  className?: string;
  variant?: ProductCardVariant;
  title: string;
  subtitle?: string;
  description?: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  badgeVariant?: "emerald" | "rose" | "indigo" | "amber" | "zinc";
  inStock?: boolean;
  image?: React.ReactNode;
  colors?: ProductColorOption[];
  defaultColorIndex?: number;
  onColorChange?: (color: ProductColorOption, index: number) => void;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  onQuickView?: () => void;
  onFavoriteToggle?: (isLiked: boolean) => void;
  interactive?: boolean;
}

const badgeColorStyles: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
  indigo: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  zinc: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/20",
};

export function ProductCard({
  className,
  variant = "standard",
  title,
  subtitle,
  description,
  price,
  originalPrice,
  rating,
  reviewsCount,
  badge,
  badgeVariant = "emerald",
  inStock = true,
  image,
  colors,
  defaultColorIndex = 0,
  onColorChange,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onFavoriteToggle,
  interactive = false,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(defaultColorIndex);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    onFavoriteToggle?.(newLiked);
  };

  const handleColorSelect = (color: ProductColorOption, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColorIdx(idx);
    onColorChange?.(color, idx);
  };

  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "w-full rounded-2xl bg-primary/[0.008] border border-primary/20 p-4 flex flex-col sm:flex-row items-center gap-4 text-foreground transition-all duration-200",
          interactive && "hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5",
          className
        )}
      >
        {/* Thumbnail Image */}
        <div className="size-24 rounded-2xl bg-primary/10 border border-primary/20 shrink-0 flex items-center justify-center overflow-hidden">
          {image || <span className="text-3xl font-bold">🛍️</span>}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            {badge && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border",
                  badgeColorStyles[badgeVariant] || badgeColorStyles.emerald
                )}
              >
                {badge}
              </span>
            )}
            {rating !== undefined && (
              <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                <Star className="size-3 fill-amber-500" /> {rating}
              </span>
            )}
          </div>
          <h4 className="text-base font-extrabold text-foreground line-clamp-1">{title}</h4>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center gap-4 shrink-0 border-t sm:border-t-0 sm:border-l border-border/60 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <span className="text-lg font-bold text-foreground">{price}</span>
            {originalPrice && (
              <p className="text-xs text-muted-foreground line-through">{originalPrice}</p>
            )}
          </div>
          {onAddToCart && (
            <button
              type="button"
              onClick={onAddToCart}
              className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95 shadow-xs"
            >
              <Plus className="size-5" />
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "w-full rounded-2xl bg-primary/[0.008] border border-primary/20 overflow-hidden flex flex-col justify-between text-foreground transition-all duration-200 group",
        interactive && "hover:shadow-lg hover:border-primary/50 hover:-translate-y-1",
        className
      )}
    >
      {/* Image Preview Area */}
      <div className="relative aspect-4/3 w-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center p-0 overflow-hidden">
        {badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border z-20",
              badgeColorStyles[badgeVariant] || badgeColorStyles.emerald
            )}
          >
            {badge}
          </span>
        )}

        {inStock !== undefined && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold z-20">
            <CheckCircle2 className="size-3" /> {inStock ? "In Stock" : "Out of Stock"}
          </div>
        )}

        {onFavoriteToggle && (
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={cn(
              "absolute right-3 p-2 rounded-full bg-background/80 backdrop-blur-xs border border-border text-muted-foreground hover:text-rose-500 transition-colors shadow-2xs z-20",
              inStock !== undefined ? "top-10" : "top-3"
            )}
          >
            <Heart className={cn("size-4", liked && "fill-rose-500 text-rose-500")} />
          </button>
        )}

        {/* Product Visual */}
        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {image || <span className="text-4xl font-bold">📦</span>}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 pb-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            {subtitle && <span className="font-semibold text-primary">{subtitle}</span>}
            {rating !== undefined && (
              <span className="flex items-center gap-1 font-semibold text-amber-500 ml-auto">
                <Star className="size-3.5 fill-amber-500" /> {rating}
                {reviewsCount !== undefined && (
                  <span className="text-muted-foreground font-normal">({reviewsCount})</span>
                )}
              </span>
            )}
          </div>

          <h3 className="text-base font-extrabold text-foreground line-clamp-1">{title}</h3>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          )}
        </div>

        {/* Color Options Swatches */}
        {colors && colors.length > 0 && (
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-border/40">
            <span className="text-[11px] font-semibold text-muted-foreground">Color</span>
            <div className="flex items-center gap-1.5">
              {colors.map((col, idx) => (
                <button
                  key={col.name || idx}
                  type="button"
                  title={col.name}
                  onClick={(e) => handleColorSelect(col, idx, e)}
                  className={cn(
                    "size-3.5 rounded-full border transition-all",
                    col.value,
                    selectedColorIdx === idx
                      ? "ring-2 ring-primary ring-offset-1 scale-110"
                      : "opacity-75 hover:opacity-100"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <div className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-1">
        <div>
          <span className="text-lg font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through ml-2">
              {originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onQuickView && (
            <button
              type="button"
              onClick={onQuickView}
              className="px-3 py-2 rounded-xl border border-primary/30 bg-background hover:bg-primary/10 hover:text-primary hover:border-primary/50 text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            >
              <Eye className="size-3.5" /> Quick View
            </button>
          )}

          {onAddToCart && (
            <button
              type="button"
              onClick={onAddToCart}
              className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity active:scale-95 shadow-xs"
            >
              <ShoppingCart className="size-3.5" /> Add
            </button>
          )}

          {onBuyNow && (
            <button
              type="button"
              onClick={onBuyNow}
              className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity active:scale-95 shadow-xs"
            >
              <Zap className="size-3.5" /> Buy Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
