"use client";

import { useState } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Flame,
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductDetailsVariant =
  | "modern-split-gallery"
  | "floating-card-glass"
  | "bento-editorial-showcase"
  | "color-sync-gallery";

export interface ProductColor {
  name: string;
  class: string;
  image?: string;
}

export interface ProductDetailsProps {
  variant?: ProductDetailsVariant;
  title?: string;
  price?: string;
  originalPrice?: string;
  description?: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  images?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  className?: string;
}

const DEFAULT_IMAGES = [
  "/assets/red-shows.jpg",
  "/assets/purple-shows.jpg",
  "/assets/blue-shows.jpg",
  "/assets/baby-pink-shows.jpg",
];

const ITEM_BG_CLASSES = [
  "bg-card border-border",
  "bg-card border-border",
  "bg-card border-border",
  "bg-card border-border",
];

const DEFAULT_COLORS: ProductColor[] = [
  { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: ITEM_BG_CLASSES[0], image: DEFAULT_IMAGES[0] },
  { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: ITEM_BG_CLASSES[1], image: DEFAULT_IMAGES[1] },
  { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: ITEM_BG_CLASSES[2], image: DEFAULT_IMAGES[2] },
  { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: ITEM_BG_CLASSES[3], image: DEFAULT_IMAGES[3] },
];

const DEFAULT_SIZES = ["US 8", "US 9", "US 10", "US 11", "US 12"];

export function ProductDetails({
  variant = "modern-split-gallery",
  title = "Nike Air Max Pulse 2026",
  price = "$189.99",
  originalPrice = "$240.00",
  description = "Engineered with reactive Air Cushioning and breathable Flyknit upper for high-performance city workouts and daily street style.",
  badge = "Special Edition",
  rating = 4.9,
  reviewsCount = 284,
  images = DEFAULT_IMAGES,
  colors = DEFAULT_COLORS,
  sizes = DEFAULT_SIZES,
  className,
}: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(sizes[2] || sizes[0] || "US 10");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "reviews">("specs");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentImageSrc = variant === "color-sync-gallery" ? images[selectedColor] : images[selectedImage];

  const sizeIndex = Math.max(0, sizes.indexOf(selectedSize));
  const sizeScales = ["scale-100", "scale-105", "scale-110", "scale-115", "scale-120"];
  const sizeScaleClass = sizeScales[sizeIndex % sizeScales.length] || "scale-110";

  return (
    <section className={cn("w-full bg-background text-foreground transition-colors py-10 sm:py-20 px-4 sm:px-6 overflow-hidden", className)}>
      {/* 1. MODERN SPLIT GALLERY */}
      {variant === "modern-split-gallery" && (
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "aspect-square w-full rounded-3xl overflow-hidden border border-border relative cursor-pointer flex items-center justify-center p-0 transition-colors",
                  ITEM_BG_CLASSES[selectedImage % ITEM_BG_CLASSES.length]
                )}
              >
                <img src={images[selectedImage]} alt="Sneaker" className={cn("peer w-full h-full object-cover scale-140 p-0 transition-all duration-300 hover:scale-105", sizeScaleClass)} />

                <div className="absolute inset-0 bg-black/20 opacity-0 peer-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                  <span className="px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-bold flex items-center gap-2">
                    <ZoomIn className="size-4" /> Click to Expand
                  </span>
                </div>

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-extrabold uppercase tracking-wider z-20 pointer-events-auto">
                  20% OFF
                </span>

                <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-border text-foreground hover:text-rose-500 transition-all z-20">
                  <Heart className={cn("size-5", liked && "fill-rose-500 text-rose-500")} />
                </button>

                {/* Left & Right Slider Arrow Buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-border text-foreground hover:scale-110 transition-all backdrop-blur-md z-20"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-border text-foreground hover:scale-110 transition-all backdrop-blur-md z-20"
                  aria-label="Next Image"
                >
                  <ChevronRight className="size-5" />
                </button>

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20" onClick={(e) => e.stopPropagation()}>
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn("h-2 rounded-full transition-all", selectedImage === idx ? "w-6 bg-primary" : "w-2 bg-muted")}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex text-amber-400 shrink-0"><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /></div>
                  <span className="text-xs font-bold text-foreground shrink-0">4.9</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">(3,150 Verified Runner Reviews)</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{title || "Nike Air Max 270 React Sneakers"}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border text-foreground text-xs font-bold flex items-center gap-2">
                <Flame className="size-4 shrink-0 text-amber-500" />
                <span>High Demand: Only 4 pairs left in stock for fast dispatch!</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-black text-foreground">{price || "$160.00"}</span>
                <span className="text-base sm:text-lg text-muted-foreground line-through">{originalPrice || "$190.00"}</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground text-xs font-bold shrink-0 whitespace-nowrap">Save $30 Today</span>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground gap-1">
                  <span>Colorway: {colors[selectedColor].name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c, idx) => (
                    <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-9 rounded-full transition-all border-2 flex items-center justify-center shrink-0", c.class, selectedColor === idx ? "ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110" : "opacity-80")}>
                      {selectedColor === idx && <Check className={cn("size-4", idx === 3 ? "text-foreground" : "text-white")} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground gap-1">
                  <span>Select US Shoe Size</span>
                  <a href="#" className="text-foreground hover:underline text-[11px]">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all bg-card shrink-0", selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <div className="flex items-center justify-between sm:justify-start rounded-2xl border border-border bg-card p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-xl hover:bg-muted text-foreground"><Minus className="size-3.5" /></button>
                  <span className="px-4 text-xs font-bold text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 rounded-xl hover:bg-muted text-foreground"><Plus className="size-3.5" /></button>
                </div>

                <button className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="size-4" /> Add Sneaker to Bag
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border text-center text-xs text-muted-foreground">
                <div className="p-3 rounded-2xl bg-card border border-border"><Truck className="size-4 mx-auto mb-1 text-foreground" />Free Shipping</div>
                <div className="p-3 rounded-2xl bg-card border border-border"><RotateCcw className="size-4 mx-auto mb-1 text-foreground" />30-Day Easy Exchange</div>
                <div className="p-3 rounded-2xl bg-card border border-border"><ShieldCheck className="size-4 mx-auto mb-1 text-foreground" />100% Authentic Guaranteed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 space-y-6">
            <div className="flex gap-4 border-b border-border pb-3">
              {(["specs", "shipping", "reviews"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all capitalize", activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Upper Material</span><p className="font-bold text-sm text-foreground">Breathable Flyknit Mesh</p></div>
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Midsole</span><p className="font-bold text-sm text-foreground">Max Air 270 Cushioning</p></div>
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Outsole</span><p className="font-bold text-sm text-foreground">Durable Rubber Traction</p></div>
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Weight</span><p className="font-bold text-sm text-foreground">310 grams (US 10)</p></div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-1 font-medium">
                <p className="font-bold text-foreground">Double-Boxed Express Delivery</p>
                <p>All shoes ship in protective double-boxing with tracking link provided.</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-1 font-medium">
                <p className="font-bold text-foreground">4.9 out of 5 stars (3,150 Verified Reviews)</p>
                <p>"Super comfortable for all-day walking and running. True to size!" - Marcus L.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. FLOATING CARD GLASS */}
      {variant === "floating-card-glass" && (
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border space-y-8 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 space-y-4">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className={cn(
                    "aspect-square w-full rounded-2xl overflow-hidden border border-border relative cursor-pointer flex items-center justify-center p-0 transition-colors",
                    ITEM_BG_CLASSES[selectedImage % ITEM_BG_CLASSES.length]
                  )}
                >
                  <img src={images[selectedImage]} alt="Glass Sneaker" className={cn("peer w-full h-full object-cover scale-140 p-0 transition-all duration-300 hover:scale-105", sizeScaleClass)} />
 
                  <div className="absolute inset-0 bg-black/20 opacity-0 peer-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                    <span className="px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-bold flex items-center gap-2">
                      <ZoomIn className="size-4" /> Click to Expand
                    </span>
                  </div>
 
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-wider z-20">
                    20% OFF
                  </div>
 
                  <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="absolute top-3 right-3 p-2.5 rounded-full bg-card border border-border text-foreground hover:text-rose-500 transition-all z-20">
                    <Heart className={cn("size-4", liked && "fill-rose-500 text-rose-500")} />
                  </button>
                </div>
 
                <div className="flex gap-2.5">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setSelectedImage(idx)} className={cn("flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all p-0 flex items-center justify-center", ITEM_BG_CLASSES[idx % ITEM_BG_CLASSES.length], selectedImage === idx ? "border-primary scale-105" : "border-border opacity-70 hover:opacity-100")}>
                      <img src={img} alt="Thumb" className="w-full h-full object-cover scale-120 p-0" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-background border border-border text-foreground text-[11px] font-bold shrink-0 whitespace-nowrap">Best Seller</span>
                    <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                      <div className="flex text-amber-400 shrink-0"><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /></div>
                      <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">4.9 (3,150 Reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title || "Adidas Ultraboost Light Running Shoes"}</h1>
                  <p className="text-xs text-muted-foreground leading-relaxed">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
                </div>

                <div className="p-3 rounded-xl bg-background border border-border text-foreground text-xs font-bold flex items-center gap-2">
                  <Flame className="size-4 text-amber-500 shrink-0" />
                  <span>High Demand: Only 4 pairs left in stock for fast dispatch!</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground">{price || "$160.00"}</span>
                  <span className="text-base text-muted-foreground line-through">{originalPrice || "$190.00"}</span>
                  <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground text-xs font-bold shrink-0 whitespace-nowrap">Save $30 Today</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Colorway: {colors[selectedColor].name}</span>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((c, idx) => (
                      <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-8 rounded-xl border-2 transition-all flex items-center justify-center shrink-0", c.class, selectedColor === idx ? "ring-2 ring-primary scale-110" : "opacity-75")}>
                        {selectedColor === idx && <Check className={cn("size-3.5", idx === 3 ? "text-foreground" : "text-white")} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">US Shoe Size</span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all bg-background shrink-0", selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <div className="flex items-center justify-between sm:justify-start rounded-xl border border-border bg-background p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1.5 rounded-lg hover:bg-muted text-foreground"><Minus className="size-3" /></button>
                    <span className="px-3 text-xs font-bold text-foreground">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-1.5 rounded-lg hover:bg-muted text-foreground"><Plus className="size-3" /></button>
                  </div>

                  <button className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="size-4" /> Add Sneaker to Bag
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-border text-center text-xs text-muted-foreground">
              <div className="p-3 rounded-xl bg-background border border-border"><Truck className="size-4 mx-auto mb-1 text-foreground" />Free Shipping</div>
              <div className="p-3 rounded-xl bg-background border border-border"><RotateCcw className="size-4 mx-auto mb-1 text-foreground" />30-Day Easy Exchange</div>
              <div className="p-3 rounded-xl bg-background border border-border"><ShieldCheck className="size-4 mx-auto mb-1 text-foreground" />100% Authentic Guaranteed</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BENTO EDITORIAL SHOWCASE */}
      {variant === "bento-editorial-showcase" && (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "lg:col-span-7 relative rounded-3xl overflow-hidden border border-slate-800 p-6 sm:p-10 flex flex-col justify-between min-h-[460px] cursor-pointer transition-colors",
                ITEM_BG_CLASSES[selectedImage % ITEM_BG_CLASSES.length]
              )}
            >
              <img src={images[selectedImage]} alt="Bento Sneaker" className={cn("peer absolute inset-0 w-full h-full object-cover scale-140 p-0 transition-all duration-500 hover:scale-105 z-0", sizeScaleClass)} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none z-0" />

              <div className="absolute inset-0 bg-black/20 opacity-0 peer-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                <span className="px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-bold flex items-center gap-2">
                  <ZoomIn className="size-4" /> Click to Expand
                </span>
              </div>

              <div className="relative z-20 flex justify-between items-start">
                <span className="px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
                  20% OFF
                </span>
                <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:text-rose-500 transition-all backdrop-blur-md z-20">
                  <Heart className={cn("size-5", liked && "fill-rose-500 text-rose-500")} />
                </button>
              </div>

              <div className="relative z-20 space-y-3 max-w-xl pointer-events-none">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold drop-shadow">
                  <Star className="size-4 fill-amber-300" /> 4.9 Rating (3,150 Verified Runner Reviews)
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">{title || "Air Jordan 1 Retro High OG Vintage"}</h1>
                <p className="text-xs sm:text-sm text-slate-100/90 line-clamp-2 drop-shadow">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                  <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">{price || "$160.00"}</span>
                  <span className="text-base sm:text-lg text-white/70 line-through">{originalPrice || "$190.00"}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold backdrop-blur-sm shrink-0 whitespace-nowrap">Save $30 Today</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 p-6 rounded-3xl bg-card border border-border flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-background border border-border text-foreground text-xs font-bold flex items-center gap-2">
                  <Flame className="size-4 text-amber-500 shrink-0" />
                  <span>High Demand: Only 4 pairs left in stock!</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Colorway: {colors[selectedColor].name}</label>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((c, idx) => (
                      <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-8 rounded-full border-2 transition-all flex items-center justify-center shrink-0", c.class, selectedColor === idx ? "ring-2 ring-primary scale-110" : "opacity-75")}>
                        {selectedColor === idx && <Check className={cn("size-3.5", idx === 3 ? "text-foreground" : "text-white")} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">US Shoe Size</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all bg-background shrink-0", selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center justify-between sm:justify-start rounded-xl border border-border bg-background p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1.5 rounded-lg hover:bg-muted text-foreground"><Minus className="size-3" /></button>
                    <span className="px-3 text-xs font-bold text-foreground">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-1.5 rounded-lg hover:bg-muted text-foreground"><Plus className="size-3" /></button>
                  </div>

                  <button className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="size-4" /> Add Sneaker to Bag
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-border text-center text-[10px] text-muted-foreground">
                <div className="p-2 rounded-xl bg-background border border-border"><Truck className="size-3.5 mx-auto mb-1 text-foreground" />Free Shipping</div>
                <div className="p-2 rounded-xl bg-background border border-border"><RotateCcw className="size-3.5 mx-auto mb-1 text-foreground" />30-Day Exchange</div>
                <div className="p-2 rounded-xl bg-background border border-border"><ShieldCheck className="size-3.5 mx-auto mb-1 text-foreground" />100% Authentic</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {images.map((img, idx) => (
              <button key={idx} onClick={() => setSelectedImage(idx)} className={cn("aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all p-0 flex items-center justify-center", ITEM_BG_CLASSES[idx % ITEM_BG_CLASSES.length], selectedImage === idx ? "border-primary scale-105" : "border-border opacity-70 hover:opacity-100")}>
                <img src={img} alt="Bento Thumb" className="w-full h-full object-cover scale-120 p-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. COLOR SYNC GALLERY */}
      {variant === "color-sync-gallery" && (
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "aspect-square w-full rounded-3xl overflow-hidden border border-border relative cursor-pointer flex items-center justify-center p-0 transition-colors",
                  ITEM_BG_CLASSES[selectedColor % ITEM_BG_CLASSES.length]
                )}
              >
                <img
                  src={images[selectedColor]}
                  alt={colors[selectedColor].name}
                  className={cn("peer w-full h-full object-cover scale-140 p-0 transition-all duration-300 hover:scale-105", sizeScaleClass)}
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 peer-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                  <span className="px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-bold flex items-center gap-2">
                    <ZoomIn className="size-4" /> Click to Expand
                  </span>
                </div>

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-extrabold uppercase tracking-wider z-20">
                  20% OFF
                </span>

                <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-border text-foreground hover:text-rose-500 transition-all z-20">
                  <Heart className={cn("size-5", liked && "fill-rose-500 text-rose-500")} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex text-amber-400 shrink-0"><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /></div>
                  <span className="text-xs font-bold text-foreground shrink-0">4.9</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">(3,150 Verified Runner Reviews)</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{title || "Nike Air Max 270 React Sneakers"}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border text-foreground text-xs font-bold flex items-center gap-2">
                <Flame className="size-4 shrink-0 text-amber-500" />
                <span>High Demand: Only 4 pairs left in stock for fast dispatch!</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-black text-foreground">{price || "$160.00"}</span>
                <span className="text-base sm:text-lg text-muted-foreground line-through">{originalPrice || "$190.00"}</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground text-xs font-bold shrink-0 whitespace-nowrap">Save $30 Today</span>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground gap-1">
                  <span>Select Colorway (Swaps Image): {colors[selectedColor].name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c, idx) => (
                    <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-9 rounded-full transition-all border-2 flex items-center justify-center shrink-0", c.class, selectedColor === idx ? "ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110" : "opacity-80")}>
                      {selectedColor === idx && <Check className={cn("size-4", idx === 3 ? "text-foreground" : "text-white")} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground gap-1">
                  <span>Select US Shoe Size</span>
                  <a href="#" className="text-foreground hover:underline text-[11px]">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all bg-card shrink-0", selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <div className="flex items-center justify-between sm:justify-start rounded-2xl border border-border bg-card p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-xl hover:bg-muted text-foreground"><Minus className="size-3.5" /></button>
                  <span className="px-4 text-xs font-bold text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 rounded-xl hover:bg-muted text-foreground"><Plus className="size-3.5" /></button>
                </div>

                <button className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="size-4" /> Add Sneaker to Bag
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border text-center text-xs text-muted-foreground">
                <div className="p-3 rounded-2xl bg-card border border-border"><Truck className="size-4 mx-auto mb-1 text-foreground" />Free Shipping</div>
                <div className="p-3 rounded-2xl bg-card border border-border"><RotateCcw className="size-4 mx-auto mb-1 text-foreground" />30-Day Easy Exchange</div>
                <div className="p-3 rounded-2xl bg-card border border-border"><ShieldCheck className="size-4 mx-auto mb-1 text-foreground" />100% Authentic Guaranteed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 space-y-6">
            <div className="flex gap-4 border-b border-border pb-3">
              {(["specs", "shipping", "reviews"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all capitalize", activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Upper Material</span><p className="font-bold text-sm text-foreground">Breathable Flyknit Mesh</p></div>
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Midsole</span><p className="font-bold text-sm text-foreground">Max Air 270 Cushioning</p></div>
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Outsole</span><p className="font-bold text-sm text-foreground">Durable Rubber Traction</p></div>
                <div className="p-4 rounded-2xl bg-card border border-border"><span className="text-muted-foreground">Weight</span><p className="font-bold text-sm text-foreground">310 grams (US 10)</p></div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-1 font-medium">
                <p className="font-bold text-foreground">Double-Boxed Express Delivery</p>
                <p>All shoes ship in protective double-boxing with tracking link provided.</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-1 font-medium">
                <p className="font-bold text-foreground">4.9 out of 5 stars (3,150 Verified Reviews)</p>
                <p>"Super comfortable for all-day walking and running. True to size!" - Marcus L.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL SCREEN IMAGE LIGHTBOX MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/60 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-card/80 hover:bg-card border border-border text-foreground transition-all backdrop-blur-md z-50 cursor-pointer"
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
                  ITEM_BG_CLASSES[(variant === "color-sync-gallery" ? selectedColor : selectedImage) % ITEM_BG_CLASSES.length]
                )}
              >
                <img
                  src={currentImageSrc}
                  alt="Full Screen Preview"
                  className={cn("w-full h-full object-cover scale-140 transition-all duration-300", sizeScaleClass)}
                />
              </div>

              {/* Lightbox Slider Arrows (positioned 25px OUTSIDE the image box on desktop, 10px on mobile) */}
              {variant !== "color-sync-gallery" && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute right-[calc(100%+10px)] sm:right-[calc(100%+25px)] top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-card/90 hover:bg-card border border-border text-foreground backdrop-blur-md transition-all z-50 cursor-pointer hover:scale-110 shrink-0"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="size-5 sm:size-6" />
                  </button>

                  <button
                    onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute left-[calc(100%+10px)] sm:left-[calc(100%+25px)] top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-card/90 hover:bg-card border border-border text-foreground backdrop-blur-md transition-all z-50 cursor-pointer hover:scale-110 shrink-0"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="size-5 sm:size-6" />
                  </button>
                </>
              )}

              {/* Thumbnails inside Lightbox (positioned 30px below image on desktop, 15px on mobile) */}
              {variant !== "color-sync-gallery" && (
                <div className="absolute top-[calc(100%+15px)] sm:top-[calc(100%+30px)] left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-card/90 backdrop-blur-md border border-border z-50">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "size-9 sm:size-12 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0 flex items-center justify-center",
                        ITEM_BG_CLASSES[idx % ITEM_BG_CLASSES.length],
                        selectedImage === idx ? "border-primary scale-105" : "border-border opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover scale-120 p-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
