"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getThemeStyles } from "./cart-theme";

/**
 * GSAP has to write its "from" values before the browser paints, otherwise the
 * panel is visible for one frame in its final position. useLayoutEffect does
 * that; React warns when it runs during SSR, so fall back on the server.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type CartColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type CartType = "drawer" | "modal" | "page";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  gradient: string;
}

const ItemRow = ({
  item,
  updateQty,
  removeItem,
}: {
  item: CartItem;
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  theme: Record<string, string>;
}) => (
  <div className="flex gap-4 py-4 border-b border-border">
    <div
      className={cn(
        "w-20 h-24 rounded-lg bg-gradient-to-br shrink-0 shadow-inner",
        item.gradient,
      )}
    />
    <div className="flex flex-col flex-1 justify-between">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="text-sm font-bold text-foreground leading-tight">
            {item.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {item.color} | Size: {item.size}
          </p>
        </div>
        <span className="text-sm font-bold text-foreground shrink-0">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center bg-muted border border-border rounded-md p-0.5">
          <button
            onClick={() => updateQty(item.id, -1)}
            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors active:scale-95"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>
          <span className="w-6 text-center text-xs font-bold select-none">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQty(item.id, 1)}
            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors active:scale-95"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="text-muted-foreground hover:text-red-500 transition-colors p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

const Summary = ({
  subtotal,
  theme,
  isPage = false,
}: {
  subtotal: number;
  theme: Record<string, string>;
  isPage?: boolean;
}) => (
  <div
    className={cn(
      "flex flex-col gap-3",
      isPage
        ? "p-6 sm:p-8 bg-muted rounded-2xl border border-border"
        : "",
    )}
  >
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>Subtotal</span>
      <span className="font-medium text-foreground">
        ${subtotal.toFixed(2)}
      </span>
    </div>
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>Shipping</span>
      <span className="font-medium text-foreground">
        Calculated at checkout
      </span>
    </div>
    <div className="border-t border-border my-1" />
    <div className="flex justify-between items-end mb-4">
      <span className="text-base font-bold text-foreground">
        Total
      </span>
      <span className="text-2xl font-black text-foreground">
        ${subtotal.toFixed(2)}
      </span>
    </div>
    <button
      className={cn(
        "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md hover:shadow-lg",
        theme.bg,
      )}
    >
      Proceed to Checkout <ArrowRight size={18} />
    </button>
  </div>
);

/**
 * Every trigger animation below is decoration layered on a plain button: each
 * one tweens *from* an offset back to the resting state CSS already paints, so
 * a blocked, failed or reduced-motion run still leaves a usable trigger.
 */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

/**
 * Defined at module scope on purpose: inside CartBlock it would be a new
 * component type on every render, remounting the button on each cart change.
 */
function TriggerButton({
  isOpen,
  onToggle,
  totalItems,
  themeBg,
  themeBorder,
}: {
  isOpen: boolean;
  onToggle: () => void;
  totalItems: number;
  themeBg: string;
  themeBorder: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const nudgeRef = useRef<gsap.core.Timeline | null>(null);
  const prevTotal = useRef(totalItems);

  const shouldNudge = !isOpen && totalItems > 0;

  // --- "click me": the bag tilts every few seconds and pushes out a ring.
  useIsomorphicLayoutEffect(() => {
    const icon = iconRef.current;
    const ring = ringRef.current;
    if (!icon || !ring || !shouldNudge || prefersReducedMotion()) return;

    const tl = gsap.timeline({ delay: 1.2, repeat: -1, repeatDelay: 2.8 });
    tl.fromTo(
      ring,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1.8, opacity: 0, duration: 0.9, ease: "power2.out" },
      0,
    )
      .to(icon, { rotate: -14, duration: 0.16, ease: "power2.out" }, 0)
      .to(icon, { rotate: 10, duration: 0.16, ease: "power1.inOut" })
      .to(icon, { rotate: -6, duration: 0.14, ease: "power1.inOut" })
      .to(icon, { rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" });

    nudgeRef.current = tl;
    return () => {
      nudgeRef.current = null;
      tl.kill();
      gsap.set(icon, { rotate: 0 });
      gsap.set(ring, { clearProps: "transform,opacity" });
    };
  }, [shouldNudge]);

  // Pointing at the button is already engagement. Stop nudging and settle the
  // bag upright rather than freezing it mid-tilt.
  const pauseNudge = () => {
    if (!nudgeRef.current) return;
    nudgeRef.current.pause();
    gsap.to(iconRef.current, { rotate: 0, duration: 0.25, ease: "power2.out" });
    gsap.to(ringRef.current, { opacity: 0, duration: 0.2 });
  };
  const resumeNudge = () => nudgeRef.current?.restart(true);

  // --- the press itself: squash, spring back, and throw a ring outwards so the
  // click reads as the thing that pushed the panel into view.
  const playPress = () => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    const ring = ringRef.current;
    if (!button || !icon || prefersReducedMotion()) return;

    nudgeRef.current?.pause();
    gsap.killTweensOf([button, icon]);

    const tl = gsap.timeline();
    tl.to(button, { scale: 0.86, duration: 0.1, ease: "power2.in" })
      .to(button, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.45)" })
      .to(
        icon,
        { rotate: 0, y: 3, scale: 0.9, duration: 0.1, ease: "power2.in" },
        0,
      )
      .to(
        icon,
        { y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" },
        0.1,
      );

    if (ring)
      tl.fromTo(
        ring,
        { scale: 0.85, opacity: 0.6 },
        { scale: 1.9, opacity: 0, duration: 0.6, ease: "power3.out" },
        0.04,
      );
  };

  // --- something landed in the bag: pop the count and bounce the icon, so a
  // quantity change is visible even while the panel is closed.
  useEffect(() => {
    const grew = totalItems > prevTotal.current;
    prevTotal.current = totalItems;
    if (!grew || prefersReducedMotion()) return;

    if (badgeRef.current)
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.3 },
        { scale: 1, duration: 0.6, ease: "back.out(4)" },
      );
    if (iconRef.current)
      gsap.fromTo(
        iconRef.current,
        { y: -4 },
        { y: 0, duration: 0.6, ease: "bounce.out" },
      );
  }, [totalItems]);

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        playPress();
        onToggle();
      }}
      onMouseEnter={pauseNudge}
      onMouseLeave={resumeNudge}
      onFocus={pauseNudge}
      onBlur={resumeNudge}
      aria-expanded={isOpen}
      aria-label={`${isOpen ? "Close" : "Open"} cart, ${totalItems} item${
        totalItems === 1 ? "" : "s"
      }`}
      className={cn(
        "relative flex items-center justify-center p-3 rounded-full bg-card border border-border shadow-sm hover:shadow-md text-foreground will-change-transform",
        // Transform belongs to GSAP here - a CSS transition on it would fight
        // the spring and flatten the press.
        "transition-[background-color,box-shadow,border-color] duration-200",
        // The only press feedback a reduced-motion user gets, since playPress
        // opts out for them.
        "active:bg-muted",
        isOpen && "bg-muted",
      )}
    >
      <span
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full border-2 opacity-0",
          themeBorder,
        )}
      />
      <span ref={iconRef} className="block will-change-transform">
        <ShoppingBag size={22} />
      </span>
      {totalItems > 0 && (
        <span
          ref={badgeRef}
          className={cn(
            "absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full shadow-sm",
            themeBg,
          )}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function CartBlock({
  initialItems = [],
  type = "drawer",
  color = "primary",
}: {
  /**
   * Items the cart starts with. Own this list in the parent - the component
   * ships no sample data, so a CartBlock rendered without `initialItems`
   * shows its empty state.
   */
  initialItems?: readonly CartItem[];
  type?: CartType;
  color?: CartColor;
}) {
  const [isOpen, setIsOpen] = useState(false);
  /**
   * The animated layer stays mounted for the whole open -> close cycle. It is
   * set from the click handler, in the same update as `isOpen`, and cleared by
   * the exit tween's onComplete, so the two can never disagree.
   */
  const [isLayerMounted, setIsLayerMounted] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => [...initialItems]);
  const { theme, style } = getThemeStyles(color);

  const openCart = () => {
    setIsLayerMounted(true);
    setIsOpen(true);
  };
  const closeCart = () => setIsOpen(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const updateQty = (id: string, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) =>
    setItems(items.filter((item) => item.id !== id));

  // --- ANIMATION ---
  useIsomorphicLayoutEffect(() => {
    if (type === "page" || !isLayerMounted) return;

    const el = containerRef.current;
    const overlay = overlayRef.current;
    if (!el) return;

    // A fast toggle can leave a tween mid-flight. Killing it also cancels its
    // onComplete, so a superseded close cannot unmount a cart that is opening
    // again.
    gsap.killTweensOf(overlay ? [el, overlay] : el);

    if (isOpen) {
      if (overlay)
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        );

      if (type === "drawer")
        gsap.fromTo(
          el,
          { x: "100%" },
          { x: "0%", duration: 0.4, ease: "power3.out" },
        );
      if (type === "modal")
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
        );
      return;
    }

    // Unmount when the exit tween actually finishes, rather than on a fixed
    // timer that can fire out of step with the open state.
    const unmountLayer = () => setIsLayerMounted(false);

    if (overlay)
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });

    if (type === "drawer")
      gsap.to(el, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: unmountLayer,
      });
    if (type === "modal")
      gsap.to(el, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: unmountLayer,
      });
  }, [isOpen, isLayerMounted, type]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (type === "page") {
    return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-8" style={style}>
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className={cn("w-8 h-8", theme.text)} />
          <h2 className="text-3xl font-black text-foreground">
            Your Cart
          </h2>
          <span className="ml-2 px-3 py-1 rounded-full bg-muted text-sm font-bold text-muted-foreground">
            {totalItems} Items
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-background border border-border rounded-3xl">
            <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Your cart is empty
            </h3>
            <button
              className={cn(
                "mt-4 px-6 py-3 rounded-xl font-bold shadow-sm transition-opacity",
                theme.bg,
              )}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-4">
                Order Items
              </h3>
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  updateQty={updateQty}
                  removeItem={removeItem}
                  theme={theme}
                />
              ))}
            </div>
            <div className="w-full lg:w-[380px] shrink-0">
              <Summary subtotal={subtotal} theme={theme} isPage={true} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center relative"
      style={style}
    >
      <div className="relative z-[90]">
        <TriggerButton
          isOpen={isOpen}
          onToggle={() => (isOpen ? closeCart() : openCart())}
          totalItems={totalItems}
          themeBg={theme.bg}
          themeBorder={theme.border}
        />
      </div>

      {(type === "drawer" || type === "modal") && isLayerMounted && (
        <div
          className={cn(
            "fixed inset-0 z-[100] pointer-events-none flex",
            type === "drawer" ? "justify-end" : "justify-center items-center",
          )}
        >
          <div
            ref={overlayRef}
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto opacity-0"
          />

          <div
            ref={containerRef}
            className={cn(
              "relative z-[101] bg-background flex flex-col shadow-2xl pointer-events-auto",
              type === "drawer"
                ? "w-full max-w-md h-[100dvh] border-l border-border"
                : "w-full max-w-lg max-h-[85vh] rounded-3xl border border-border opacity-0",
            )}
          >
            <div className="px-6 py-5 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className={cn("w-5 h-5", theme.text)} />
                <h3 className="text-lg font-bold text-foreground">
                  Shopping Cart
                </h3>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-xs font-bold text-muted-foreground">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {items.map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      updateQty={updateQty}
                      removeItem={removeItem}
                      theme={theme}
                    />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/50 shrink-0">
                <Summary subtotal={subtotal} theme={theme} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
