"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductDetailsVariant =
  | "modern-split-gallery"
  | "floating-card-glass"
  | "bento-editorial-showcase"
  | "color-sync-gallery";

export interface ProductDetailsProps {
  variant?: ProductDetailsVariant;
  title?: string;
  price?: string;
  originalPrice?: string;
  description?: string;
  className?: string;
}

export function ProductDetails({
  variant = "modern-split-gallery",
  title,
  price,
  originalPrice,
  description,
  className,
}: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("US 10");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "reviews">("specs");

  const shoeSizes = ["US 8", "US 9", "US 10", "US 11", "US 12"];

  // Swapped ONLY 2nd and 4th images while keeping colors array untouched
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
  ];

  // Colors array left untouched as requested
  const colors = [
    { name: "Crimson Red / Black", class: "bg-rose-600", image: images[0] },
    { name: "Vibrant Yellow Edition", class: "bg-amber-400", image: images[1] },
    { name: "Stealth Black / Gold", class: "bg-slate-900", image: images[2] },
    { name: "Minimal Pure White", class: "bg-slate-100 border border-slate-300 dark:border-slate-700", image: images[3] },
  ];

  return (
    <section className={cn("w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-10 sm:py-20 px-4 sm:px-6 overflow-hidden", className)}>
      {/* 1. MODERN SPLIT GALLERY */}
      {variant === "modern-split-gallery" && (
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-square w-full rounded-3xl bg-white dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 relative group">
                <img src={images[selectedImage]} alt="Sneaker" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold uppercase tracking-wider z-10">
                  20% OFF
                </span>

                <button onClick={() => setLiked(!liked)} className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:text-rose-500 transition-all z-10">
                  <Heart className={cn("size-5", liked && "fill-rose-500 text-rose-500")} />
                </button>

                {/* Left & Right Slider Arrow Buttons */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:scale-110 transition-all backdrop-blur-md z-10"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <button
                  onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:scale-110 transition-all backdrop-blur-md z-10"
                  aria-label="Next Image"
                >
                  <ChevronRight className="size-5" />
                </button>

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn("h-2 rounded-full transition-all", selectedImage === idx ? "w-6 bg-slate-900 dark:bg-white" : "w-2 bg-slate-300 dark:bg-slate-700")}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400"><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /></div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">4.9</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">(3,150 Verified Runner Reviews)</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{title || "Nike Air Max 270 React Sneakers"}</h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center gap-2">
                <Flame className="size-4 shrink-0 text-amber-500" />
                <span>High Demand: Only 4 pairs left in stock for fast dispatch!</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{price || "$160.00"}</span>
                <span className="text-lg text-slate-400 dark:text-slate-500 line-through">{originalPrice || "$190.00"}</span>
                <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold">Save $30 Today</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>Colorway: {colors[selectedColor].name}</span>
                </div>
                <div className="flex gap-3">
                  {colors.map((c, idx) => (
                    <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-9 rounded-full transition-all border-2 flex items-center justify-center", c.class, selectedColor === idx ? "ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110" : "opacity-80")}>
                      {selectedColor === idx && <Check className={cn("size-4", idx === 3 ? "text-slate-900" : "text-white")} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>Select US Shoe Size</span>
                  <a href="#" className="text-slate-900 dark:text-slate-100 hover:underline text-[11px]">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {shoeSizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-4 py-2.5 rounded-xl text-xs font-bold border transition-all bg-white dark:bg-slate-900", selectedSize === s ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Minus className="size-3.5" /></button>
                  <span className="px-4 text-xs font-bold text-slate-900 dark:text-slate-100">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Plus className="size-3.5" /></button>
                </div>

                <button className="flex-1 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="size-4" /> Add Sneaker to Bag
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><Truck className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />Free Shipping</div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><RotateCcw className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />30-Day Easy Exchange</div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><ShieldCheck className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />100% Authentic Guaranteed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
              {(["specs", "shipping", "reviews"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all capitalize", activeTab === tab ? "border-slate-900 dark:border-white text-slate-900 dark:text-white" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white")}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Upper Material</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">Breathable Flyknit Mesh</p></div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Midsole</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">Max Air 270 Cushioning</p></div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Outsole</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">Durable Rubber Traction</p></div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Weight</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">310 grams (US 10)</p></div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-medium">
                <p className="font-bold text-slate-900 dark:text-slate-100">Double-Boxed Express Delivery</p>
                <p>All shoes ship in protective double-boxing with tracking link provided.</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-medium">
                <p className="font-bold text-slate-900 dark:text-slate-100">4.9 out of 5 stars (3,150 Verified Reviews)</p>
                <p>"Super comfortable for all-day walking and running. True to size!" - Marcus L.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. FLOATING CARD GLASS */}
      {variant === "floating-card-glass" && (
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 space-y-4">
                <div className="aspect-[4/3] w-full rounded-2xl bg-white dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                  <img src={images[selectedImage]} alt="Glass Sneaker" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-extrabold uppercase tracking-wider">
                    20% OFF
                  </div>
                  <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:text-rose-500 transition-all">
                    <Heart className={cn("size-4", liked && "fill-rose-500 text-rose-500")} />
                  </button>
                </div>

                <div className="flex gap-2.5">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setSelectedImage(idx)} className={cn("flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all bg-white dark:bg-slate-900", selectedImage === idx ? "border-slate-900 dark:border-white" : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100")}>
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-[11px] font-bold">Best Seller</span>
                    <div className="flex text-amber-400"><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /><Star className="size-3.5 fill-amber-400" /></div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">4.9 (3,150 Reviews)</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title || "Adidas Ultraboost Light Running Shoes"}</h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center gap-2">
                  <Flame className="size-4 text-amber-500 shrink-0" />
                  <span>High Demand: Only 4 pairs left in stock for fast dispatch!</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{price || "$160.00"}</span>
                  <span className="text-base text-slate-400 dark:text-slate-500 line-through">{originalPrice || "$190.00"}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Save $30 Today</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Colorway: {colors[selectedColor].name}</span>
                  <div className="flex gap-2.5">
                    {colors.map((c, idx) => (
                      <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-8 rounded-xl border-2 transition-all flex items-center justify-center", c.class, selectedColor === idx ? "ring-2 ring-slate-900 dark:ring-white scale-110" : "opacity-75")}>
                        {selectedColor === idx && <Check className={cn("size-3.5", idx === 3 ? "text-slate-900" : "text-white")} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">US Shoe Size</span>
                  <div className="flex gap-2">
                    {shoeSizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all bg-white dark:bg-slate-950", selectedSize === s ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Minus className="size-3" /></button>
                    <span className="px-3 text-xs font-bold text-slate-900 dark:text-slate-100">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Plus className="size-3" /></button>
                  </div>

                  <button className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="size-4" /> Add Sneaker to Bag
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><Truck className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />Free Shipping</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><RotateCcw className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />30-Day Easy Exchange</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><ShieldCheck className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />100% Authentic Guaranteed</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BENTO EDITORIAL SHOWCASE */}
      {variant === "bento-editorial-showcase" && (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative rounded-3xl bg-slate-950 text-white overflow-hidden border border-slate-800 p-8 sm:p-12 flex flex-col justify-between min-h-[460px]">
              <img src={images[selectedImage]} alt="Bento Sneaker" className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30 pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
                  20% OFF
                </span>
                <button onClick={() => setLiked(!liked)} className="p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:text-rose-500 transition-all backdrop-blur-md">
                  <Heart className={cn("size-5", liked && "fill-rose-500 text-rose-500")} />
                </button>
              </div>

              <div className="relative z-10 space-y-3 max-w-xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Star className="size-4 fill-amber-400" /> 4.9 Rating (3,150 Verified Runner Reviews)
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{title || "Air Jordan 1 Retro High OG Vintage"}</h1>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-black text-white">{price || "$160.00"}</span>
                  <span className="text-lg text-slate-400 line-through">{originalPrice || "$190.00"}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">Save $30</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center gap-2">
                  <Flame className="size-4 text-amber-500 shrink-0" />
                  <span>High Demand: Only 4 pairs left in stock!</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Colorway: {colors[selectedColor].name}</label>
                  <div className="flex gap-2.5">
                    {colors.map((c, idx) => (
                      <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-8 rounded-full border-2 transition-all flex items-center justify-center", c.class, selectedColor === idx ? "ring-2 ring-slate-900 dark:ring-white scale-110" : "opacity-75")}>
                        {selectedColor === idx && <Check className={cn("size-3.5", idx === 3 ? "text-slate-900" : "text-white")} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">US Shoe Size</label>
                  <div className="flex flex-wrap gap-2">
                    {shoeSizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all bg-white dark:bg-slate-950", selectedSize === s ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Minus className="size-3" /></button>
                    <span className="px-3 text-xs font-bold text-slate-900 dark:text-slate-100">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Plus className="size-3" /></button>
                  </div>

                  <button className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="size-4" /> Add Sneaker to Bag
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><Truck className="size-3.5 mx-auto mb-1 text-slate-900 dark:text-slate-100" />Free Shipping</div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><RotateCcw className="size-3.5 mx-auto mb-1 text-slate-900 dark:text-slate-100" />30-Day Exchange</div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"><ShieldCheck className="size-3.5 mx-auto mb-1 text-slate-900 dark:text-slate-100" />100% Authentic</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {images.map((img, idx) => (
              <button key={idx} onClick={() => setSelectedImage(idx)} className={cn("aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all bg-white dark:bg-slate-900", selectedImage === idx ? "border-slate-900 dark:border-white scale-105" : "border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100")}>
                <img src={img} alt="Bento Thumb" className="w-full h-full object-cover" />
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
              <div className="aspect-square w-full rounded-3xl bg-white dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 relative group">
                <img
                  src={images[selectedColor]}
                  alt={colors[selectedColor].name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold uppercase tracking-wider z-10">
                  20% OFF
                </span>

                <button onClick={() => setLiked(!liked)} className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:text-rose-500 transition-all z-10">
                  <Heart className={cn("size-5", liked && "fill-rose-500 text-rose-500")} />
                </button>

                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold backdrop-blur-md z-10 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-500" /> Studio Colorway: {colors[selectedColor].name}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400"><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /><Star className="size-4 fill-amber-400" /></div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">4.9</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">(3,150 Verified Runner Reviews)</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{title || "Nike Air Max 270 React Sneakers"}</h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description || "Engineered with Max Air 270 cushioning and lightweight Nike React foam for exceptional everyday comfort and energy return."}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold flex items-center gap-2">
                <Flame className="size-4 shrink-0 text-amber-500" />
                <span>High Demand: Only 4 pairs left in stock for fast dispatch!</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{price || "$160.00"}</span>
                <span className="text-lg text-slate-400 dark:text-slate-500 line-through">{originalPrice || "$190.00"}</span>
                <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold">Save $30 Today</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>Select Colorway (Swaps Image): {colors[selectedColor].name}</span>
                </div>
                <div className="flex gap-3">
                  {colors.map((c, idx) => (
                    <button key={idx} onClick={() => setSelectedColor(idx)} className={cn("size-9 rounded-full transition-all border-2 flex items-center justify-center", c.class, selectedColor === idx ? "ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110" : "opacity-80")}>
                      {selectedColor === idx && <Check className={cn("size-4", idx === 3 ? "text-slate-900" : "text-white")} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>Select US Shoe Size</span>
                  <a href="#" className="text-slate-900 dark:text-slate-100 hover:underline text-[11px]">Size Guide</a>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {shoeSizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={cn("px-4 py-2.5 rounded-xl text-xs font-bold border transition-all bg-white dark:bg-slate-900", selectedSize === s ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Minus className="size-3.5" /></button>
                  <span className="px-4 text-xs font-bold text-slate-900 dark:text-slate-100">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"><Plus className="size-3.5" /></button>
                </div>

                <button className="flex-1 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="size-4" /> Add Sneaker to Bag
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><Truck className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />Free Shipping</div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><RotateCcw className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />30-Day Easy Exchange</div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><ShieldCheck className="size-4 mx-auto mb-1 text-slate-900 dark:text-slate-100" />100% Authentic Guaranteed</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
              {(["specs", "shipping", "reviews"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all capitalize", activeTab === tab ? "border-slate-900 dark:border-white text-slate-900 dark:text-white" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white")}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Upper Material</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">Breathable Flyknit Mesh</p></div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Midsole</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">Max Air 270 Cushioning</p></div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Outsole</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">Durable Rubber Traction</p></div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">Weight</span><p className="font-bold text-sm text-slate-900 dark:text-slate-100">310 grams (US 10)</p></div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-medium">
                <p className="font-bold text-slate-900 dark:text-slate-100">Double-Boxed Express Delivery</p>
                <p>All shoes ship in protective double-boxing with tracking link provided.</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-medium">
                <p className="font-bold text-slate-900 dark:text-slate-100">4.9 out of 5 stars (3,150 Verified Reviews)</p>
                <p>"Super comfortable for all-day walking and running. True to size!" - Marcus L.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
