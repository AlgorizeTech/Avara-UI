"use client";

import { cn } from "@/lib/utils";
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
 * The animations have to apply their "from" values before the browser paints,
 * otherwise the panel is visible for one frame in its final position.
 * useLayoutEffect does that; React warns when it runs during SSR, so fall back
 * on the server.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ==========================================
// MOTION — Web Animations, no library
// ==========================================
// GSAP's eases as CSS easings: cubic-beziers where exact, else `linear()`
// sampled from GSAP's own curves (max error 0.15%).
const POWER1_OUT = "cubic-bezier(.3333, .6667, .6667, 1)";
const POWER2_OUT = "cubic-bezier(.3333, 1, .6667, 1)";
const POWER2_IN = "cubic-bezier(.3333, 0, .6667, 0)";
const POWER1_IN_OUT =
  "linear(0, .002 3.125%, .0078 6.25%, .0176 9.375%, .0313 12.5%, .0488 15.625%, .0703 18.75%, .0957 21.875%, .125 25%, .1582 28.125%, .1953 31.25%, .2363 34.375%, .2813 37.5%, .3301 40.625%, .3828 43.75%, .4395 46.875%, .5 50%, .5605 53.125%, .6172 56.25%, .6699 59.375%, .7188 62.5%, .7637 65.625%, .8047 68.75%, .8418 71.875%, .875 75%, .9043 78.125%, .9297 81.25%, .9512 84.375%, .9688 87.5%, .9824 90.625%, .9922 93.75%, .998 96.875%, 1)";
const POWER3_OUT =
  "linear(0, .1945, .3591, .4971, .6115, .7052, .7808, .8409, .8877, .9233, .9497, .9686, .9816, .9901, .9952, .998, .9994, .9999, 1, 1)";
const POWER3_IN =
  "linear(0, .0002 12.5%, .0039 25%, .0095 31.25%, .0198 37.5%, .0366 43.75%, .0625 50%, .0797 53.125%, .1001 56.25%, .1243 59.375%, .1526 62.5%, .1855 65.625%, .2234 68.75%, .2669 71.875%, .3164 75%, .3725 78.125%, .4358 81.25%, .5068 84.375%, .5862 87.5%, .6745 90.625%, .7725 93.75%, .8807 96.875%, 1)";
const BACK_OUT_1_5 =
  "linear(0, .2103, .3925, .5484, .68, .7891, .8775, .9472, 1, 1.0378, 1.0625, 1.0759, 1.08, 1.0766, 1.0675, 1.0547, 1.04, 1.0253, 1.0125, 1.0034, 1)";
const BACK_OUT_4 = "cubic-bezier(.3333, 2.3333, .6667, 1)";
const ELASTIC_OUT_045 =
  "linear(0, .0583 0.781%, .1239 1.563%, .1951 2.344%, .2702 3.125%, .5832 6.25%, .7313 7.813%, .8002 8.594%, .8649 9.375%, .9248 10.156%, .9796 10.938%, 1.029 11.719%, 1.073 12.5%, 1.1115 13.281%, 1.1444 14.063%, 1.1719 14.844%, 1.1942 15.625%, 1.2115 16.406%, 1.224 17.188%, 1.2321 17.969%, 1.2361 18.75%, 1.2364 19.531%, 1.2333 20.313%, 1.2187 21.875%, 1.1953 23.438%, 1.1661 25%, 1.1007 28.125%, 1.0392 31.25%, 1.0134 32.813%, .992 34.375%, .9751 35.938%, .9628 37.5%, .9549 39.063%, .951 40.625%, .9525 43.75%, .9625 46.875%, .9761 50%, 1 56.25%, 1.0069 59.375%, 1.0101 62.5%, 1.0084 68.75%, 1.0028 75%, .9988 81.25%, .9978 87.5%, 1)";
const ELASTIC_OUT_04 =
  "linear(0, .0598 0.781%, .1295 1.563%, .2069 2.344%, .2898 3.125%, .6398 6.25%, .7238 7.031%, .804 7.813%, .8792 8.594%, .9488 9.375%, 1.0121 10.156%, 1.0687 10.938%, 1.1184 11.719%, 1.1609 12.5%, 1.1963 13.281%, 1.2248 14.063%, 1.2464 14.844%, 1.2617 15.625%, 1.271 16.406%, 1.2746 17.188%, 1.2733 17.969%, 1.2674 18.75%, 1.2576 19.531%, 1.2443 20.313%, 1.2101 21.875%, 1.125 25%, 1.0816 26.563%, 1.0413 28.125%, 1.0063 29.688%, .9776 31.25%, .956 32.813%, .9414 34.375%, .9335 35.938%, .9313 37.5%, .934 39.063%, .9404 40.625%, .9599 43.75%, .9817 46.875%, 1 50%, 1.0119 53.125%, 1.0168 56.25%, 1.0162 59.375%, 1.0121 62.5%, 1.0017 68.75%, .9961 75%, .9991 87.5%, 1)";
const BOUNCE_OUT =
  "linear(0, .0018 1.563%, .0074 3.125%, .0166 4.688%, .0295 6.25%, .0462 7.813%, .0665 9.375%, .0905 10.938%, .1182 12.5%, .1496 14.063%, .1846 15.625%, .2234 17.188%, .2659 18.75%, .312 20.313%, .3619 21.875%, .4154 23.438%, .4727 25%, .5279 26.42%, .5862 27.841%, .6475 29.261%, .7119 30.682%, .7794 32.102%, .8499 33.523%, .9234 34.943%, 1 36.364%, .9697 37.5%, .9313 39.063%, .8965 40.625%, .8655 42.188%, .8381 43.75%, .8145 45.313%, .7945 46.875%, .7782 48.438%, .7656 50%, .7567 51.563%, .7515 53.125%, .75 54.688%, .7522 56.25%, .7581 57.813%, .7676 59.375%, .7809 60.938%, .7979 62.5%, .8336 65.057%, .8792 67.614%, .9346 70.17%, 1 72.727%, .9727 75%, .9584 76.563%, .9478 78.125%, .9409 79.688%, .9377 81.25%, .9382 82.813%, .9424 84.375%, .9503 85.938%, .9619 87.5%, .9788 89.205%, 1 90.909%, .9883 93.182%, .9844 95.455%, .9883 97.727%, 1)";

/** Every animation still attached to an element, so a new gesture can kill them. */
const liveAnimations = new WeakMap<Element, Set<Animation>>();

function play(
  el: Element | null,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation | null {
  if (!el || typeof el.animate !== "function") return null;
  const animation = el.animate(keyframes, options);
  const live = liveAnimations.get(el) ?? new Set<Animation>();
  liveAnimations.set(el, live);
  live.add(animation);
  const forget = () => live.delete(animation);
  animation.addEventListener("finish", forget);
  animation.addEventListener("cancel", forget);
  return animation;
}

/** Stop every animation on these elements; they fall back to their resting CSS. */
function killAnimationsOf(elements: (Element | null)[]) {
  for (const el of elements) {
    if (!el) continue;
    for (const animation of [...(liveAnimations.get(el) ?? [])]) animation.cancel();
  }
}

/** Current (animated) values of some CSS properties, as keyframe values. */
function readStyle(el: Element, properties: string[]): Keyframe {
  const computed = getComputedStyle(el);
  const frame: Keyframe = {};
  for (const property of properties) frame[property] = computed.getPropertyValue(property);
  return frame;
}

/**
 * Tween to `to`, from `from` or else from wherever the element is right now,
 * replacing whatever was animating it. The end values are written inline, as
 * the resting state, so nothing depends on a fill.
 */
function tweenTo(
  el: HTMLElement,
  to: Record<string, string>,
  options: { from?: Keyframe; duration: number; easing: string },
): Animation | null {
  const from = options.from ?? readStyle(el, Object.keys(to));
  killAnimationsOf([el]);
  for (const [property, value] of Object.entries(to)) el.style.setProperty(property, value);
  return play(el, [from, to], { duration: options.duration * 1000, easing: options.easing });
}

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
          <h4 className="text-sm font-semibold text-foreground leading-tight">
            {item.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {item.color} | Size: {item.size}
          </p>
        </div>
        <span className="text-sm font-semibold text-foreground shrink-0">
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
          <span className="w-6 text-center text-xs font-semibold select-none">
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
      <span className="text-base font-semibold text-foreground">
        Total
      </span>
      <span className="text-2xl font-bold text-foreground">
        ${subtotal.toFixed(2)}
      </span>
    </div>
    <button
      className={cn(
        "w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md hover:shadow-lg",
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
  const nudgeRef = useRef<{ pause: () => void; restart: () => void } | null>(null);
  const prevTotal = useRef(totalItems);

  const shouldNudge = !isOpen && totalItems > 0;

  // --- "click me": the bag tilts every few seconds and pushes out a ring.
  // One 4.5s cycle (1.7s of motion + 2.8s rest), repeating after a 1.2s delay.
  useIsomorphicLayoutEffect(() => {
    const icon = iconRef.current;
    const ring = ringRef.current;
    const button = buttonRef.current;
    if (!icon || !ring || !button || !shouldNudge || prefersReducedMotion()) return;

    killAnimationsOf([button, icon, ring]);

    const CYCLE = 4.5;
    const at = (seconds: number) => seconds / CYCLE;
    const timing: KeyframeAnimationOptions = {
      duration: CYCLE * 1000,
      delay: 1200,
      iterations: Infinity,
      // The ring sits at its starting pose through the delay, as it always has.
      fill: "backwards",
    };
    let cycle: Animation[] = [];
    let settle: Animation[] = [];

    const start = () => {
      cycle = [
        play(
          ring,
          [
            { scale: "0.9", opacity: 0.5, offset: 0, easing: POWER2_OUT },
            { scale: "1.8", opacity: 0, offset: at(0.9) },
            { scale: "1.8", opacity: 0, offset: 1 },
          ],
          timing,
        ),
        play(
          icon,
          [
            { rotate: "0deg", offset: 0, easing: POWER2_OUT },
            { rotate: "-14deg", offset: at(0.16) },
            // The tilt back starts once the ring has finished (0.9s), so the
            // bag holds its lean until then.
            { rotate: "-14deg", offset: at(0.9), easing: POWER1_IN_OUT },
            { rotate: "10deg", offset: at(1.06), easing: POWER1_IN_OUT },
            { rotate: "-6deg", offset: at(1.2), easing: ELASTIC_OUT_045 },
            { rotate: "0deg", offset: at(1.7) },
            { rotate: "0deg", offset: 1 },
          ],
          timing,
        ),
      ].filter((a): a is Animation => a !== null);
    };
    const stop = () => {
      for (const animation of [...cycle, ...settle]) animation.cancel();
      cycle = [];
      settle = [];
    };

    start();
    nudgeRef.current = {
      // Freeze the cycle, then settle the bag upright and fade the ring.
      pause: () => {
        for (const animation of cycle) animation.pause();
        const hold = { fill: "forwards" } as const;
        settle.push(
          ...[
            play(icon, [readStyle(icon, ["rotate"]), { rotate: "0deg" }], { ...hold, duration: 250, easing: POWER2_OUT }),
            play(ring, [readStyle(ring, ["opacity"]), { opacity: 0 }], { ...hold, duration: 200, easing: POWER1_OUT }),
          ].filter((a): a is Animation => a !== null),
        );
      },
      // From the top, delay included.
      restart: () => {
        stop();
        start();
      },
    };
    return () => {
      nudgeRef.current = null;
      stop();
    };
  }, [shouldNudge]);

  // Pointing at the button is already engagement. Stop nudging and settle the
  // bag upright rather than freezing it mid-tilt.
  const pauseNudge = () => {
    nudgeRef.current?.pause();
  };
  const resumeNudge = () => {
    if (shouldNudge && nudgeRef.current) {
      nudgeRef.current.restart();
    }
  };

  // --- the press itself: squash, spring back, and throw a ring outwards so the
  // click reads as the thing that pushed the panel into view.
  const playPress = () => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    const ring = ringRef.current;
    if (!button || !icon || prefersReducedMotion()) return;

    // A press while nudging opens the cart, which ends the nudge and puts the
    // bag back at rest before the press starts; otherwise the press starts
    // wherever an earlier one left off.
    const fromRest = shouldNudge;
    const buttonFrom = fromRest ? { scale: "1" } : readStyle(button, ["scale"]);
    const iconFrom = fromRest
      ? { rotate: "0deg", translate: "0px 0px", scale: "1" }
      : readStyle(icon, ["rotate", "translate", "scale"]);

    killAnimationsOf([button, icon, ring]);

    play(
      button,
      [
        { scale: buttonFrom.scale, easing: POWER2_IN },
        { scale: "0.86", offset: 0.1 / 0.65, easing: ELASTIC_OUT_045 },
        { scale: "1" },
      ],
      { duration: 650 },
    );
    play(icon, [{ rotate: iconFrom.rotate, easing: POWER2_IN }, { rotate: "0deg" }], {
      duration: 100,
    });
    play(
      icon,
      [
        { translate: iconFrom.translate, scale: iconFrom.scale, easing: POWER2_IN },
        { translate: "0px 3px", scale: "0.9", offset: 0.1 / 0.6, easing: ELASTIC_OUT_04 },
        { translate: "0px 0px", scale: "1" },
      ],
      { duration: 600 },
    );
    play(
      ring,
      [
        { scale: "0.85", opacity: 0.6 },
        { scale: "1.9", opacity: 0 },
      ],
      { duration: 600, delay: 40, easing: POWER3_OUT, fill: fromRest ? "none" : "backwards" },
    );
  };

  // --- something landed in the bag: pop the count and bounce the icon, so a
  // quantity change is visible even while the panel is closed.
  useEffect(() => {
    const grew = totalItems > prevTotal.current;
    prevTotal.current = totalItems;
    if (!grew || prefersReducedMotion()) return;

    play(badgeRef.current, [{ scale: "0.3" }, { scale: "1" }], {
      duration: 600,
      easing: BACK_OUT_4,
    });
    play(iconRef.current, [{ translate: "0px -4px" }, { translate: "0px 0px" }], {
      duration: 600,
      easing: BOUNCE_OUT,
    });
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
        // Scale belongs to the press animation here - a CSS transition on it
        // would fight the spring and flatten it.
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
            "absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-semibold rounded-full shadow-sm",
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

    // A fast toggle can leave a tween mid-flight. tweenTo cancels it, which
    // also drops its completion, so a superseded close cannot unmount a cart
    // that is opening again.
    if (isOpen) {
      if (overlay)
        tweenTo(overlay, { opacity: "1" }, { from: { opacity: 0 }, duration: 0.3, easing: POWER2_OUT });

      if (type === "drawer")
        tweenTo(el, { translate: "0%" }, { from: { translate: "100%" }, duration: 0.4, easing: POWER3_OUT });
      if (type === "modal")
        tweenTo(
          el,
          { opacity: "1", scale: "1", translate: "0px 0px" },
          {
            from: { opacity: 0, scale: "0.95", translate: "0px 10px" },
            duration: 0.4,
            easing: BACK_OUT_1_5,
          },
        );
      return;
    }

    // Unmount when the exit tween actually finishes, rather than on a fixed
    // timer that can fire out of step with the open state.
    const unmountLayer = () => setIsLayerMounted(false);

    if (overlay) tweenTo(overlay, { opacity: "0" }, { duration: 0.3, easing: POWER2_IN });

    let exit: Animation | null = null;
    if (type === "drawer")
      exit = tweenTo(el, { translate: "100%" }, { duration: 0.3, easing: POWER3_IN });
    if (type === "modal")
      exit = tweenTo(
        el,
        { opacity: "0", scale: "0.95", translate: "0px 10px" },
        { duration: 0.3, easing: POWER2_IN },
      );
    if (exit) exit.addEventListener("finish", unmountLayer);
    else if (type === "drawer" || type === "modal") unmountLayer();
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
          <h2 className="text-3xl font-bold text-foreground">
            Your Cart
          </h2>
          <span className="ml-2 px-3 py-1 rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {totalItems} Items
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-background border border-border rounded-3xl">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <button
              className={cn(
                "mt-4 px-6 py-3 rounded-xl font-semibold shadow-sm transition-opacity",
                theme.bg,
              )}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-4">
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
                <h3 className="text-lg font-semibold text-foreground">
                  Shopping Cart
                </h3>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
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
