"use client";

import {
  CartBlock,
  CartColor,
  CartType,
} from "@/components/custom/blocks/CartBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const CART_ENGINE_CODE_TS = `"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";

export type CartColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type CartType = "drawer" | "modal" | "popover" | "page";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 hover:bg-indigo-700 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", ring: "focus:ring-indigo-600" },
  rose: { bg: "bg-rose-600 hover:bg-rose-700 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10", ring: "focus:ring-rose-600" },
  emerald: { bg: "bg-emerald-600 hover:bg-emerald-700 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", ring: "focus:ring-emerald-600" },
  zinc: { bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white hover:opacity-90", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]", ring: "focus:ring-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface CartItem { id: string; name: string; price: number; quantity: number; size?: string; color?: string; gradient: string; }

const INITIAL_CART: CartItem[] = [
  { id: "1", name: "Signature Heavyweight Tee", price: 45.00, quantity: 1, size: "L", color: "Onyx Black", gradient: "from-zinc-700 to-black" },
  { id: "2", name: "Everyday Denim Jacket", price: 120.00, quantity: 1, size: "M", color: "Washed Blue", gradient: "from-blue-600 to-indigo-900" },
  { id: "3", name: "Minimalist Beanie", price: 28.00, quantity: 2, size: "OS", color: "Forest Green", gradient: "from-emerald-500 to-teal-800" }
];

const ItemRow = ({ item, updateQty, removeItem, theme }: { item: CartItem; updateQty: (id: string, delta: number) => void; removeItem: (id: string) => void; theme: any }) => (
  <div className="flex gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800/50">
    <div className={cn("w-20 h-24 rounded-lg bg-gradient-to-br shrink-0 shadow-inner", item.gradient)} />
    <div className="flex flex-col flex-1 justify-between">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">{item.name}</h4>
          <p className="text-xs text-zinc-500 mt-1">{item.color} | Size: {item.size}</p>
        </div>
        <span className="text-sm font-bold text-zinc-900 dark:text-white shrink-0">\${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5">
          <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-95"><Minus size={14} strokeWidth={2.5}/></button>
          <span className="w-6 text-center text-xs font-bold select-none">{item.quantity}</span>
          <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-95"><Plus size={14} strokeWidth={2.5}/></button>
        </div>
        <button onClick={() => removeItem(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
      </div>
    </div>
  </div>
);

const Summary = ({ subtotal, theme, isPage = false }: { subtotal: number, theme: any, isPage?: boolean }) => (
  <div className={cn("flex flex-col gap-3", isPage ? "p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800" : "")}>
    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400"><span>Subtotal</span><span className="font-medium text-zinc-900 dark:text-white">\${subtotal.toFixed(2)}</span></div>
    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400"><span>Shipping</span><span className="font-medium text-zinc-900 dark:text-white">Calculated at checkout</span></div>
    <div className="border-t border-zinc-200 dark:border-zinc-800 my-1" />
    <div className="flex justify-between items-end mb-4">
      <span className="text-base font-bold text-zinc-900 dark:text-white">Total</span>
      <span className="text-2xl font-black text-zinc-900 dark:text-white">\${subtotal.toFixed(2)}</span>
    </div>
    <button className={cn("w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md hover:shadow-lg", theme.bg)}>
      Proceed to Checkout <ArrowRight size={18} />
    </button>
  </div>
);

export function CartBlock({ type = "drawer", color = "indigo" }: { type?: CartType; color?: CartColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [renderLayer, setRenderLayer] = useState(false);
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const { theme, style } = getThemeStyles(color);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const updateQty = (id: string, delta: number) => { setItems(items.map(item => { if (item.id === id) { const newQty = item.quantity + delta; return newQty > 0 ? { ...item, quantity: newQty } : item; } return item; })); };
  const removeItem = (id: string) => setItems(items.filter(item => item.id !== id));

  useEffect(() => {
    if (isOpen) setRenderLayer(true);
    else { const t = setTimeout(() => setRenderLayer(false), 350); return () => clearTimeout(t); }
  }, [isOpen]);

  useEffect(() => {
    if (type === "page" || !renderLayer) return;
    const el = containerRef.current; const overlay = overlayRef.current;
    if (!el) return;
    if (isOpen) {
      if (overlay) gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      if (type === "drawer") gsap.fromTo(el, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" });
      if (type === "modal") gsap.fromTo(el, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" });
      if (type === "popover") gsap.fromTo(el, { opacity: 0, y: -10, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    } else {
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
      if (type === "drawer") gsap.to(el, { x: "100%", duration: 0.3, ease: "power3.in" });
      if (type === "modal") gsap.to(el, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: "power2.in" });
      if (type === "popover") gsap.to(el, { opacity: 0, y: -10, scale: 0.95, duration: 0.2, ease: "power2.in" });
    }
  }, [isOpen, renderLayer, type]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const TriggerButton = () => (
    <button onClick={() => setIsOpen(!isOpen)} className={cn("relative flex items-center justify-center p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all active:scale-95 text-zinc-700 dark:text-zinc-200", isOpen && "bg-zinc-100 dark:bg-zinc-800")}>
      <ShoppingBag size={22} />
      {totalItems > 0 && <span className={cn("absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full shadow-sm", theme.bg)}>{totalItems}</span>}
    </button>
  );

  if (type === "page") {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-8" style={style}>
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className={cn("w-8 h-8", theme.text)} />
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Your Cart</h2>
          <span className="ml-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400">{totalItems} Items</span>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h3>
            <button className={cn("mt-4 px-6 py-3 rounded-xl font-bold shadow-sm transition-opacity", theme.bg)}>Continue Shopping</button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-zinc-800/50 pb-4">Order Items</h3>
              {items.map(item => <ItemRow key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} theme={theme} />)}
            </div>
            <div className="w-full lg:w-[380px] shrink-0"><Summary subtotal={subtotal} theme={theme} isPage={true} /></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center relative" style={style}>
      <div className={cn("relative z-[90]", type === "popover" ? "flex flex-col items-center" : "")}>
        <TriggerButton />
        {type === "popover" && (
          <div className="absolute top-[calc(100%+12px)] right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-[100] pointer-events-none">
            <div ref={containerRef} className={cn("w-[340px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col opacity-0", !renderLayer && "hidden")}>
              <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50"><span className="font-bold text-zinc-900 dark:text-white">Cart ({totalItems})</span></div>
              <div className="max-h-[300px] overflow-y-auto px-4 py-2">
                {items.length === 0 ? <p className="text-center text-sm text-zinc-500 py-8">Your cart is empty.</p> : items.map(item => <ItemRow key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} theme={theme} />)}
              </div>
              {items.length > 0 && (
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
                  <div className="flex justify-between items-center mb-4"><span className="text-sm font-medium text-zinc-500">Subtotal</span><span className="text-lg font-bold text-zinc-900 dark:text-white">\${subtotal.toFixed(2)}</span></div>
                  <button className={cn("w-full py-3 rounded-lg font-bold shadow-sm transition-opacity", theme.bg)}>Checkout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {(type === "drawer" || type === "modal") && (
        <div className={cn("fixed inset-0 z-[100] pointer-events-none flex", type === "drawer" ? "justify-end" : "justify-center items-center")}>
          <div ref={overlayRef} onClick={() => setIsOpen(false)} className={cn("absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto opacity-0", !renderLayer && "hidden")} />
          <div ref={containerRef} className={cn("relative z-[101] bg-white dark:bg-zinc-950 flex flex-col shadow-2xl pointer-events-auto", !renderLayer && "hidden", type === "drawer" ? "w-full max-w-md h-[100dvh] border-l border-zinc-200 dark:border-zinc-800" : "w-full max-w-lg max-h-[85vh] rounded-3xl border border-zinc-200 dark:border-zinc-800 opacity-0")}>
            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className={cn("w-5 h-5", theme.text)} />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Shopping Cart</h3>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400">{totalItems}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4"><ShoppingCart size={48} className="opacity-20" /><p>Your cart is empty.</p></div> : <div className="flex flex-col">{items.map(item => <ItemRow key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} theme={theme} />)}</div>}
            </div>
            {items.length > 0 && <div className="p-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0"><Summary subtotal={subtotal} theme={theme} /></div>}
          </div>
        </div>
      )}
    </div>
  );
}`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const CART_ENGINE_CODE_JS = `"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 hover:bg-indigo-700 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", ring: "focus:ring-indigo-600" },
  rose: { bg: "bg-rose-600 hover:bg-rose-700 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10", ring: "focus:ring-rose-600" },
  emerald: { bg: "bg-emerald-600 hover:bg-emerald-700 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", ring: "focus:ring-emerald-600" },
  zinc: { bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white hover:opacity-90", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]", ring: "focus:ring-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const INITIAL_CART = [
  { id: "1", name: "Signature Heavyweight Tee", price: 45.00, quantity: 1, size: "L", color: "Onyx Black", gradient: "from-zinc-700 to-black" },
  { id: "2", name: "Everyday Denim Jacket", price: 120.00, quantity: 1, size: "M", color: "Washed Blue", gradient: "from-blue-600 to-indigo-900" },
  { id: "3", name: "Minimalist Beanie", price: 28.00, quantity: 2, size: "OS", color: "Forest Green", gradient: "from-emerald-500 to-teal-800" }
];

const ItemRow = ({ item, updateQty, removeItem, theme }) => (
  <div className="flex gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800/50">
    <div className={cn("w-20 h-24 rounded-lg bg-gradient-to-br shrink-0 shadow-inner", item.gradient)} />
    <div className="flex flex-col flex-1 justify-between">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">{item.name}</h4>
          <p className="text-xs text-zinc-500 mt-1">{item.color} | Size: {item.size}</p>
        </div>
        <span className="text-sm font-bold text-zinc-900 dark:text-white shrink-0">\${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5">
          <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-95"><Minus size={14} strokeWidth={2.5}/></button>
          <span className="w-6 text-center text-xs font-bold select-none">{item.quantity}</span>
          <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-95"><Plus size={14} strokeWidth={2.5}/></button>
        </div>
        <button onClick={() => removeItem(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
      </div>
    </div>
  </div>
);

const Summary = ({ subtotal, theme, isPage = false }) => (
  <div className={cn("flex flex-col gap-3", isPage ? "p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800" : "")}>
    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400"><span>Subtotal</span><span className="font-medium text-zinc-900 dark:text-white">\${subtotal.toFixed(2)}</span></div>
    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400"><span>Shipping</span><span className="font-medium text-zinc-900 dark:text-white">Calculated at checkout</span></div>
    <div className="border-t border-zinc-200 dark:border-zinc-800 my-1" />
    <div className="flex justify-between items-end mb-4">
      <span className="text-base font-bold text-zinc-900 dark:text-white">Total</span>
      <span className="text-2xl font-black text-zinc-900 dark:text-white">\${subtotal.toFixed(2)}</span>
    </div>
    <button className={cn("w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md hover:shadow-lg", theme.bg)}>
      Proceed to Checkout <ArrowRight size={18} />
    </button>
  </div>
);

export function CartBlock({ type = "drawer", color = "indigo" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [renderLayer, setRenderLayer] = useState(false);
  const [items, setItems] = useState(INITIAL_CART);
  const { theme, style } = getThemeStyles(color);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const updateQty = (id, delta) => { setItems(items.map(item => { if (item.id === id) { const newQty = item.quantity + delta; return newQty > 0 ? { ...item, quantity: newQty } : item; } return item; })); };
  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  useEffect(() => {
    if (isOpen) setRenderLayer(true);
    else { const t = setTimeout(() => setRenderLayer(false), 350); return () => clearTimeout(t); }
  }, [isOpen]);

  useEffect(() => {
    if (type === "page" || !renderLayer) return;
    const el = containerRef.current; const overlay = overlayRef.current;
    if (!el) return;
    if (isOpen) {
      if (overlay) gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      if (type === "drawer") gsap.fromTo(el, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" });
      if (type === "modal") gsap.fromTo(el, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" });
      if (type === "popover") gsap.fromTo(el, { opacity: 0, y: -10, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    } else {
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
      if (type === "drawer") gsap.to(el, { x: "100%", duration: 0.3, ease: "power3.in" });
      if (type === "modal") gsap.to(el, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: "power2.in" });
      if (type === "popover") gsap.to(el, { opacity: 0, y: -10, scale: 0.95, duration: 0.2, ease: "power2.in" });
    }
  }, [isOpen, renderLayer, type]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const TriggerButton = () => (
    <button onClick={() => setIsOpen(!isOpen)} className={cn("relative flex items-center justify-center p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all active:scale-95 text-zinc-700 dark:text-zinc-200", isOpen && "bg-zinc-100 dark:bg-zinc-800")}>
      <ShoppingBag size={22} />
      {totalItems > 0 && <span className={cn("absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full shadow-sm", theme.bg)}>{totalItems}</span>}
    </button>
  );

  if (type === "page") {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-8" style={style}>
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className={cn("w-8 h-8", theme.text)} />
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Your Cart</h2>
          <span className="ml-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400">{totalItems} Items</span>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h3>
            <button className={cn("mt-4 px-6 py-3 rounded-xl font-bold shadow-sm transition-opacity", theme.bg)}>Continue Shopping</button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-100 dark:border-zinc-800/50 pb-4">Order Items</h3>
              {items.map(item => <ItemRow key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} theme={theme} />)}
            </div>
            <div className="w-full lg:w-[380px] shrink-0"><Summary subtotal={subtotal} theme={theme} isPage={true} /></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center relative" style={style}>
      <div className={cn("relative z-[90]", type === "popover" ? "flex flex-col items-center" : "")}>
        <TriggerButton />
        {type === "popover" && (
          <div className="absolute top-[calc(100%+12px)] right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-[100] pointer-events-none">
            <div ref={containerRef} className={cn("w-[340px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col opacity-0", !renderLayer && "hidden")}>
              <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50"><span className="font-bold text-zinc-900 dark:text-white">Cart ({totalItems})</span></div>
              <div className="max-h-[300px] overflow-y-auto px-4 py-2">
                {items.length === 0 ? <p className="text-center text-sm text-zinc-500 py-8">Your cart is empty.</p> : items.map(item => <ItemRow key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} theme={theme} />)}
              </div>
              {items.length > 0 && (
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
                  <div className="flex justify-between items-center mb-4"><span className="text-sm font-medium text-zinc-500">Subtotal</span><span className="text-lg font-bold text-zinc-900 dark:text-white">\${subtotal.toFixed(2)}</span></div>
                  <button className={cn("w-full py-3 rounded-lg font-bold shadow-sm transition-opacity", theme.bg)}>Checkout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {(type === "drawer" || type === "modal") && (
        <div className={cn("fixed inset-0 z-[100] pointer-events-none flex", type === "drawer" ? "justify-end" : "justify-center items-center")}>
          <div ref={overlayRef} onClick={() => setIsOpen(false)} className={cn("absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto opacity-0", !renderLayer && "hidden")} />
          <div ref={containerRef} className={cn("relative z-[101] bg-white dark:bg-zinc-950 flex flex-col shadow-2xl pointer-events-auto", !renderLayer && "hidden", type === "drawer" ? "w-full max-w-md h-[100dvh] border-l border-zinc-200 dark:border-zinc-800" : "w-full max-w-lg max-h-[85vh] rounded-3xl border border-zinc-200 dark:border-zinc-800 opacity-0")}>
            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className={cn("w-5 h-5", theme.text)} />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Shopping Cart</h3>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400">{totalItems}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4"><ShoppingCart size={48} className="opacity-20" /><p>Your cart is empty.</p></div> : <div className="flex flex-col">{items.map(item => <ItemRow key={item.id} item={item} updateQty={updateQty} removeItem={removeItem} theme={theme} />)}</div>}
            </div>
            {items.length > 0 && <div className="p-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0"><Summary subtotal={subtotal} theme={theme} /></div>}
          </div>
        </div>
      )}
    </div>
  );
}`;

export function CartShowcase() {
  const [type, setType] = useState<CartType>("drawer");

  // Initialize with localStorage if available
  const [color, setColor] = useState<CartColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "rose";
    }
    return "rose";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    return `import { CartBlock } from "@/components/custom/blocks/CartBlock";

export default function Layout() {
  return (
    <div className="relative w-full min-h-screen">
      <CartBlock 
        type="${type}" 
        color="${color}" 
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl">
        <VariantTabs
          variants={["drawer", "modal", "popover", "page"]}
          label="Cart Layout"
          defaultValue={type}
          onValueChange={(v) => setType(v as CartType)}
        />

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="CartBlock"
        tsCode={CART_ENGINE_CODE_TS}
        jsCode={CART_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`relative w-full flex items-center justify-center min-h-[600px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${type === "page" ? "bg-white dark:bg-black" : "bg-zinc-50/50 dark:bg-zinc-950/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-200/40 via-zinc-50 to-zinc-50 dark:from-zinc-800/40 dark:via-zinc-950 dark:to-zinc-950"}`}
        >
          <CartBlock key={`${type}-${color}`} type={type} color={color} />
        </div>
      </ComponentPreview>
    </div>
  );
}
