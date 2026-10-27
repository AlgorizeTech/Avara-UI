"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BadgePercent,
  ChevronDown,
  Command,
  Heart,
  Menu,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Truck,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { getThemeStyles } from "./navbar-theme";

export type NavbarColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

export type NavbarVariant =
  | "default"
  | "floating"
  | "centered"
  | "minimal"
  | "glass"
  | "spotlight"
  | "ecommerce-mega-nav";

export interface NavbarProps {
  variant?: NavbarVariant;
  color?: NavbarColor;
  logoText?: string;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
}

const NAV_LINKS = [
  { name: "Products", href: "#", hasDropdown: true },
  { name: "Solutions", href: "#", hasDropdown: false },
  { name: "Resources", href: "#", hasDropdown: true },
  { name: "Pricing", href: "#", hasDropdown: false },
];

// Mobile menu motion. Opening fades the overlay in (0.3s power2.out) and
// slides the menu in from the right (0.4s power3.out); closing reverses both in
// 0.3s (power2.in / power3.in). A transition takes its timing from the state it
// is heading to, so each state carries its own; @starting-style is where the
// layer starts when it stops being display:none.
const POWER3_OUT =
  "linear(0, .1268, .2412, .3439, .4358, .5177, .5904, .6545, .7108, .7599, .8025, .8391, .8704, .8969, .9191, .9375, .9526, .9647, .9744, .9819, .9877, .9919, .9949, .997, .9984, .9992, .9997, .9999, 1, 1, 1)";
const POWER3_IN =
  "linear(0, 0, 0, .0001, .0003, .0008, .0016, .003, .0051, .0081, .0123, .0181, .0256, .0353, .0474, .0625, .0809, .1031, .1296, .1609, .1975, .2401, .2892, .3455, .4096, .4823, .5642, .6561, .7588, .8732, 1)";

const MOBILE_MENU_CSS = `
.navbar-mobile-overlay {
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.3333, 0, 0.6667, 0);
}
.navbar-mobile-overlay[data-open="true"] {
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.3333, 1, 0.6667, 1);
}
.navbar-mobile-menu {
  transform: translateX(100%);
  transition: transform 0.3s ${POWER3_IN};
}
.navbar-mobile-menu[data-open="true"] {
  transform: none;
  transition: transform 0.4s ${POWER3_OUT};
}
@starting-style {
  .navbar-mobile-overlay[data-open="true"] { opacity: 0; }
  .navbar-mobile-menu[data-open="true"] { transform: translateX(100%); }
}
`;

/**
 * These three are defined at module scope on purpose. Declaring them inside
 * NavbarBlock would make each a new component type on every render, remounting
 * the header and dropping any open dropdown or focus.
 */
function Logo({
  themeBg,
  logoText,
  linkComponent: Link,
}: {
  themeBg: string;
  logoText: string;
  linkComponent: React.ElementType;
}) {
  return (
    <Link href="#" className="flex items-center gap-2 group">
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105",
          themeBg,
        )}
      >
        {/* No hardcoded colour: theme.bg above already carries the correct
            contrasting foreground for every theme, including a white pick. */}
        <Command className="w-4 h-4" />
      </div>
      <span className="font-bold text-xl tracking-tight text-foreground">
        {logoText}
      </span>
    </Link>
  );

}

function DesktopLinks({
  isGlass,
  linkComponent: Link,
}: {
  isGlass: boolean;
  linkComponent: React.ElementType;
}) {
  return (
    <ul className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map((link) => (
        <li key={link.name} className="relative group">
          <Link
            href={link.href}
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground rounded-full transition-colors",
              isGlass
                ? "hover:bg-foreground/5"
                : "hover:bg-[color-mix(in_oklab,var(--navbar-accent)_8%,transparent)]",
            )}
          >
            {link.name}
            {link.hasDropdown && (
              <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform" />
            )}
          </Link>
          {link.hasDropdown && (
            <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              {/* A plain popover is the same white as the page behind it; the
                  panel wears a whisper of the accent, a tinted edge and a
                  layered shadow so it lifts off (glass keeps its blur). */}
              <div
                className={cn(
                  "w-48 rounded-xl p-2 flex flex-col gap-1 text-popover-foreground",
                  isGlass
                    ? "bg-popover/60 backdrop-blur-2xl border border-foreground/10 shadow-[0_2px_4px_rgb(0_0_0/0.05),0_24px_48px_-16px_rgb(0_0_0/0.28)]"
                    : "border bg-[oklch(from_var(--navbar-accent)_0.978_calc(c*0.1)_h)] border-[oklch(from_var(--navbar-accent)_0.9_calc(c*0.22)_h)] dark:bg-[oklch(from_var(--navbar-accent)_0.21_calc(c*0.1)_h)] dark:border-foreground/10 shadow-[0_2px_4px_rgb(0_0_0/0.04),0_20px_40px_-14px_rgb(0_0_0/0.22)]",
                )}
              >
                {["Overview", "Features", "Integrations"].map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className={cn(
                      "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors",
                      isGlass
                        ? "hover:bg-foreground/5"
                        : "hover:bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)]",
                    )}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

}

function DesktopActions({
  themeBg,
  linkComponent: Link,
}: {
  themeBg: string;
  linkComponent: React.ElementType;
}) {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Link
        href="#"
        className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="#"
        className={cn(
          "px-5 py-2 text-sm font-semibold rounded-full transition-transform active:scale-95 shadow-sm",
          themeBg,
        )}
      >
        Get Started
      </Link>
    </div>
  );
}

// ==========================================
// E-COMMERCE MEGA NAV DATA & COMPONENT
// ==========================================
interface MegaMenuLink {
  name: string;
  href: string;
}

interface MegaMenuProduct {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  tag?: string;
  rating: number;
  image: string;
  href: string;
}

interface MegaMenuPromo {
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  href: string;
}

interface MegaCategory {
  id: string;
  name: string;
  productsTitle: string;
  products: MegaMenuProduct[];
  column1Title: string;
  column1Links: MegaMenuLink[];
  column2Title: string;
  column2Links: MegaMenuLink[];
  promo: MegaMenuPromo;
}

const CLD = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto";

const IMG_CHOCOLATE = `${CLD}/v1790509367/flavour-chocolate-1790509374070.webp`;
const IMG_COOKIE = `${CLD}/v1790509368/flavour-cookie-1790509374071.webp`;
const IMG_BERRY = `${CLD}/v1790509367/flavour-berry-1790509374070.webp`;
const IMG_MANGO = `${CLD}/v1790509367/flavour-mango-1790509374071.webp`;

const ECOM_CATEGORIES: MegaCategory[] = [
  {
    id: "protein",
    name: "Protein",
    productsTitle: "Our Protein",
    products: [
      { id: "p-1", name: "Isoclear Clear Whey", subtitle: "Chocolate · 900g", price: "$39.90", tag: "Bestseller", rating: 4.9, image: IMG_CHOCOLATE, href: "#" },
      { id: "p-2", name: "Designer Whey Protein", subtitle: "Cookie · 1kg", price: "$34.90", rating: 4.8, image: IMG_COOKIE, href: "#" },
      { id: "p-3", name: "Vegan Protein Blend", subtitle: "Mixed berry · 750g", price: "$29.90", originalPrice: "$36.90", tag: "-20%", rating: 4.7, image: IMG_BERRY, href: "#" },
      { id: "p-4", name: "Clear Whey Isolate", subtitle: "Mango · 500g", price: "$24.90", tag: "New", rating: 4.8, image: IMG_MANGO, href: "#" },
    ],
    column1Title: "Overview",
    column1Links: [
      { name: "Whey Protein", href: "#" },
      { name: "Vegan Protein", href: "#" },
      { name: "Clear Whey Isolate", href: "#" },
    ],
    column2Title: "Shop by goal",
    column2Links: [
      { name: "Muscle Building", href: "#" },
      { name: "Weight Management", href: "#" },
    ],
    promo: {
      tag: "Top rated",
      title: "Protein Bestsellers",
      subtitle: "Save up to 25% on our highest-rated whey & plant blends.",
      cta: "Discover now",
      image: IMG_CHOCOLATE,
      href: "#",
    },
  },
  {
    id: "bars",
    name: "Bars & Snacks",
    productsTitle: "Bars & Snacks",
    products: [
      { id: "b-1", name: "Crunchy Protein Bar", subtitle: "Chocolate · 12 pack", price: "$27.90", tag: "Bestseller", rating: 4.9, image: IMG_CHOCOLATE, href: "#" },
      { id: "b-2", name: "Cookie Dough Bites", subtitle: "Cookie · 10 pack", price: "$19.90", rating: 4.7, image: IMG_COOKIE, href: "#" },
      { id: "b-3", name: "Berry Protein Crisps", subtitle: "Mixed berry · 8 pack", price: "$16.90", tag: "New", rating: 4.6, image: IMG_BERRY, href: "#" },
      { id: "b-4", name: "Mango Fruit Bar", subtitle: "Mango · 12 pack", price: "$18.90", originalPrice: "$22.90", tag: "-15%", rating: 4.6, image: IMG_MANGO, href: "#" },
    ],
    column1Title: "Overview",
    column1Links: [
      { name: "Protein Bars", href: "#" },
      { name: "Protein Crisps", href: "#" },
      { name: "Nut Butters", href: "#" },
    ],
    column2Title: "Shop by need",
    column2Links: [
      { name: "On-the-go", href: "#" },
      { name: "Low Sugar", href: "#" },
    ],
    promo: {
      tag: "Just landed",
      title: "New Flavours",
      subtitle: "Freshly baked protein bars & bites with zero added sugar.",
      cta: "Taste them all",
      image: IMG_BERRY,
      href: "#",
    },
  },
  {
    id: "vitamins",
    name: "Vitamins & Health",
    productsTitle: "Vitamins & Health",
    products: [
      { id: "v-1", name: "Daily Multivitamin", subtitle: "Mixed berry · 60 caps", price: "$21.90", tag: "Bestseller", rating: 4.8, image: IMG_BERRY, href: "#" },
      { id: "v-2", name: "Omega-3 Softgels", subtitle: "Mango · 90 caps", price: "$24.90", rating: 4.7, image: IMG_MANGO, href: "#" },
      { id: "v-3", name: "Vitamin D3 + K2", subtitle: "Chocolate · 120 caps", price: "$17.90", tag: "New", rating: 4.8, image: IMG_CHOCOLATE, href: "#" },
      { id: "v-4", name: "Greens Superfood", subtitle: "Cookie · 300g", price: "$32.90", originalPrice: "$39.90", tag: "-18%", rating: 4.6, image: IMG_COOKIE, href: "#" },
    ],
    column1Title: "Overview",
    column1Links: [
      { name: "Multivitamins", href: "#" },
      { name: "Omega-3", href: "#" },
      { name: "Minerals", href: "#" },
    ],
    column2Title: "Shop by goal",
    column2Links: [
      { name: "Immunity", href: "#" },
      { name: "Sleep & Recovery", href: "#" },
    ],
    promo: {
      tag: "Daily routine",
      title: "Health Essentials",
      subtitle: "Daily micronutrients formulated for immunity & recovery.",
      cta: "Discover now",
      image: IMG_MANGO,
      href: "#",
    },
  },
  {
    id: "creatine",
    name: "Creatine",
    productsTitle: "Our Creatine",
    products: [
      { id: "c-1", name: "Creatine Monohydrate", subtitle: "Mango · 500g", price: "$22.90", tag: "Bestseller", rating: 4.9, image: IMG_MANGO, href: "#" },
      { id: "c-2", name: "Creatine Gummies", subtitle: "Mixed berry · 90 pcs", price: "$26.90", tag: "New", rating: 4.7, image: IMG_BERRY, href: "#" },
      { id: "c-3", name: "Pre-Workout Pump", subtitle: "Chocolate · 300g", price: "$29.90", rating: 4.6, image: IMG_CHOCOLATE, href: "#" },
      { id: "c-4", name: "Creatine Chewables", subtitle: "Cookie · 150 tabs", price: "$19.90", originalPrice: "$24.90", tag: "-20%", rating: 4.7, image: IMG_COOKIE, href: "#" },
    ],
    column1Title: "Overview",
    column1Links: [
      { name: "Creatine Powder", href: "#" },
      { name: "Creatine Gummies", href: "#" },
      { name: "Pre-Workout", href: "#" },
    ],
    column2Title: "Shop by goal",
    column2Links: [
      { name: "Strength", href: "#" },
      { name: "Power Output", href: "#" },
    ],
    promo: {
      tag: "Athlete pick",
      title: "Strength Stack",
      subtitle: "Ultra-pure micronized creatine for peak strength output.",
      cta: "Build your stack",
      image: IMG_COOKIE,
      href: "#",
    },
  },
];

const ECOM_STATIC_LINKS = ["Hydration", "Bundles"];

const CART_PREVIEW_ITEMS = [
  { name: "Crunchy Protein Bar", variant: "Chocolate · 12 pack", qty: 1, price: "$27.90", image: IMG_CHOCOLATE },
  { name: "Mango Fruit Bar", variant: "Mango · 12 pack", qty: 2, price: "$37.80", image: IMG_MANGO },
];

const SEARCH_CATALOG = [
  { title: "Vitamin D3 + K2", path: "/products/vitamin-d3-k2" },
  { title: "Omega 3 Softgels", path: "/products/omega-3-softgels" },
  { title: "Isoclear Clear Whey", path: "/products/isoclear-clear-whey" },
  { title: "Designer Whey Protein", path: "/products/designer-whey-protein" },
  { title: "Crunchy Protein Bar", path: "/products/crunchy-protein-bar" },
  { title: "Cookie Dough Bites", path: "/products/cookie-dough-bites" },
  { title: "Berry Protein Crisps", path: "/products/berry-protein-crisps" },
  { title: "Mango Fruit Bar", path: "/products/mango-fruit-bar" },
  { title: "Creatine Monohydrate", path: "/products/creatine-monohydrate" },
];

// The panel is mounted once and never unmounted while you move between
// categories — only its content swaps (with a short cross-fade). Opening
// eases the height in via grid-template-rows 0fr → 1fr.
const MEGA_NAV_CSS = `
@keyframes mega-nav-content-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
.mega-nav-content { animation: mega-nav-content-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes mega-nav-drawer-in {
  from { transform: translateX(-100%); }
  to { transform: none; }
}
.mega-nav-drawer { animation: mega-nav-drawer-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes mega-nav-fade-in { from { opacity: 0; } to { opacity: 1; } }
.mega-nav-overlay { animation: mega-nav-fade-in 0.3s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .mega-nav-content, .mega-nav-drawer, .mega-nav-overlay { animation: none; }
}
`;

function StarRating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      {value.toFixed(1)}
    </span>
  );
}

function EcommerceMegaNav({
  color = "primary",
  logoText = "NUTRIFY",
  linkComponent: Link = "a",
}: {
  color?: NavbarColor;
  logoText?: string;
  linkComponent?: React.ElementType;
}) {
  const { theme, style } = getThemeStyles(color);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  // Remembers the last category so the panel keeps its content while it
  // eases closed instead of going blank mid-animation.
  const [lastMenuId, setLastMenuId] = useState<string>(ECOM_CATEGORIES[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(ECOM_CATEGORIES[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredSearchItems = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SEARCH_CATALOG.slice(0, 4);
    const matches = SEARCH_CATALOG.filter(
      (item) => item.title.toLowerCase().includes(q) || item.path.toLowerCase().includes(q),
    );
    return matches.length > 0 ? matches : SEARCH_CATALOG.slice(0, 2);
  })();

  const isOpen = activeMenuId !== null;
  const shownCategory =
    ECOM_CATEGORIES.find((c) => c.id === (activeMenuId ?? lastMenuId)) ?? ECOM_CATEGORIES[0];

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openMenu = (id: string) => {
    cancelClose();
    setActiveMenuId(id);
    setLastMenuId(id);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setActiveMenuId(null), 200);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!isOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuId(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, searchOpen]);

  return (
    <div className="relative w-full z-50 font-sans bg-background rounded-t-[inherit]" style={style}>
      <style>{MEGA_NAV_CSS}</style>

      {/* ── Announcement bar ── */}
      <div className={cn("w-full rounded-t-[inherit] text-[11px] sm:text-xs py-2 px-4 flex items-center justify-center gap-2 font-medium transition-colors", theme.bg)}>
        <Truck className="w-3.5 h-3.5 opacity-85" />
        <span>Free delivery from $80</span>
      </div>

      {/* ── Row 1: logo · search · actions ── */}
      <div className="w-full border-b border-border lg:border-b-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-10 h-16 lg:h-[72px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-full text-foreground hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="#" className="shrink-0">
              <span className={cn("font-bold text-xl sm:text-[22px] tracking-tight select-none transition-colors", theme.text)}>
                {logoText}
              </span>
            </Link>
          </div>

          <div className="hidden lg:block flex-1 max-w-md">
            <button
              type="button"
              onClick={() => {
                setActiveMenuId(null);
                setSearchOpen(true);
              }}
              className="relative w-full h-10 pl-11 pr-4 text-left text-sm rounded-full bg-[color-mix(in_oklab,var(--navbar-accent)_6%,var(--muted))] border border-[color-mix(in_oklab,var(--navbar-accent)_18%,transparent)] hover:border-[color-mix(in_oklab,var(--navbar-accent)_40%,transparent)] transition-colors flex items-center text-muted-foreground cursor-text"
            >
              <Search className={cn("w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none", theme.text)} />
              <span className="truncate">{searchQuery || "Search for protein, creatine, ..."}</span>
            </button>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                setActiveMenuId(null);
                setSearchOpen(true);
              }}
              className="lg:hidden p-2 rounded-full text-foreground hover:bg-muted transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button type="button" aria-label="Account" className="hidden sm:inline-flex p-2 rounded-full text-foreground hover:bg-muted transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button type="button" aria-label="Wishlist" className="hidden sm:inline-flex p-2 rounded-full text-foreground hover:bg-muted transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCartOpen((v) => !v)}
                aria-label="Cart (3 items)"
                className="relative p-2 rounded-full text-foreground hover:bg-muted transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className={cn("absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center leading-none", theme.bg)}>
                  3
                </span>
              </button>

              {cartOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl p-4 bg-background border border-border shadow-2xl z-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <span className="font-semibold text-sm text-foreground">Your cart (3)</span>
                      <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {CART_PREVIEW_ITEMS.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.variant} · Qty {item.qty}</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{item.price}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold text-foreground">$85.70</span>
                    </div>
                    <Link
                      href="#"
                      onClick={() => setCartOpen(false)}
                      className={cn("w-full py-3 text-center text-sm font-semibold rounded-full transition-opacity", theme.bg)}
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: category links + persistent mega panel (desktop) ── */}
      <nav
        aria-label="Shop categories"
        className="relative hidden lg:block w-full border-b border-border"
        onMouseLeave={scheduleClose}
      >
        <ul className="flex items-center justify-center gap-1 h-12 pb-1">
          <li>
            <Link
              href="#"
              onMouseEnter={scheduleClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-foreground rounded-full hover:bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)] transition-colors"
            >
              <BadgePercent className={cn("w-4 h-4", theme.text)} />
              Deals
            </Link>
          </li>
          {ECOM_CATEGORIES.map((cat) => {
            const isActive = activeMenuId === cat.id;
            return (
              <li key={cat.id} onMouseEnter={() => openMenu(cat.id)}>
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls="mega-nav-panel"
                  onClick={() => (isActive ? setActiveMenuId(null) : openMenu(cat.id))}
                  onFocus={() => openMenu(cat.id)}
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                    isActive
                      ? theme.bg
                      : "text-foreground hover:bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)] hover:text-[var(--navbar-accent)]",
                  )}
                >
                  {cat.name}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 opacity-60 transition-transform duration-300",
                      isActive && "rotate-180 opacity-100",
                    )}
                  />
                </button>
              </li>
            );
          })}
          {ECOM_STATIC_LINKS.map((name) => (
            <li key={name}>
              <Link
                href="#"
                onMouseEnter={scheduleClose}
                className="block px-3.5 py-1.5 text-sm font-medium text-foreground rounded-full hover:bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)] hover:text-[var(--navbar-accent)] transition-colors"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mounted once. Height eases 0fr → 1fr; only the inner content swaps. */}
        <div
          id="mega-nav-panel"
          aria-hidden={!isOpen}
          onMouseEnter={cancelClose}
          className={cn(
            "absolute top-full left-0 right-0 z-50 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="bg-background border-b border-border shadow-[0_32px_64px_-32px_rgb(0_0_0/0.35)]">
              <div key={shownCategory.id} className="mega-nav-content max-w-6xl mx-auto px-6 xl:px-10 py-8 grid grid-cols-[minmax(0,1fr)_17rem] gap-8">
                {/* Left: header, products, link columns */}
                <div className="flex flex-col gap-6 min-w-0">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground">{shownCategory.productsTitle}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Hand-picked favourites from our community</p>
                    </div>
                    <Link
                      href="#"
                      tabIndex={isOpen ? 0 : -1}
                      className={cn("group inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity", theme.text)}
                    >
                      View all products
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {shownCategory.products.map((prod) => (
                      <Link key={prod.id} href={prod.href} tabIndex={isOpen ? 0 : -1} className="group flex flex-col gap-3">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-muted ring-1 ring-transparent group-hover:ring-[color-mix(in_oklab,var(--navbar-accent)_45%,transparent)] transition-all">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          {prod.tag && (
                            <span
                              className={cn(
                                "absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-xs",
                                prod.tag.startsWith("-")
                                  ? "bg-rose-500 text-white"
                                  : theme.bg,
                              )}
                            >
                              {prod.tag}
                            </span>
                          )}
                          <span className={cn("absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg", theme.bg)}>
                            <Plus className="w-4 h-4" />
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground group-hover:text-[var(--navbar-accent)] transition-colors truncate">{prod.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate">{prod.subtitle}</span>
                          <div className="flex items-center justify-between mt-0.5">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-bold text-foreground">{prod.price}</span>
                              {prod.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">{prod.originalPrice}</span>
                              )}
                            </div>
                            <StarRating value={prod.rating} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-5 border-t border-border">
                    {[
                      { title: shownCategory.column1Title, links: shownCategory.column1Links },
                      { title: shownCategory.column2Title, links: shownCategory.column2Links },
                    ].map((col) => (
                      <div key={col.title} className="col-span-2 flex flex-col gap-2.5">
                        <span className={cn("text-[11px] font-bold uppercase tracking-[0.12em]", theme.text)}>
                          {col.title}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {col.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              tabIndex={isOpen ? 0 : -1}
                              className="px-3 py-1.5 rounded-full border border-[color-mix(in_oklab,var(--navbar-accent)_25%,var(--border))] bg-[color-mix(in_oklab,var(--navbar-accent)_6%,transparent)] text-xs font-medium text-foreground hover:bg-[var(--navbar-accent)] hover:text-white hover:border-[var(--navbar-accent)] transition-colors"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: themed promo card */}
                <Link
                  href={shownCategory.promo.href}
                  tabIndex={isOpen ? 0 : -1}
                  className="group relative rounded-3xl p-4 flex flex-col justify-between gap-4 overflow-hidden border border-[color-mix(in_oklab,var(--navbar-accent)_22%,var(--border))] bg-gradient-to-b from-[color-mix(in_oklab,var(--navbar-accent)_8%,var(--background))] to-[color-mix(in_oklab,var(--navbar-accent)_16%,var(--background))] shadow-xs"
                >
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-background/90 border border-[color-mix(in_oklab,var(--navbar-accent)_15%,var(--border))] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--navbar-accent)_14%,transparent),transparent_70%)] pointer-events-none" />
                    <img
                      src={shownCategory.promo.image}
                      alt={shownCategory.promo.title}
                      loading="lazy"
                      className="relative z-10 w-full h-full object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className={cn("absolute top-2.5 left-2.5 z-20 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide not-italic shadow-xs", theme.bg)}>
                      {shownCategory.promo.tag}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 px-0.5">
                    <h4 className="text-base font-bold leading-snug tracking-tight text-foreground not-italic">
                      {shownCategory.promo.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 not-italic">
                      {shownCategory.promo.subtitle}
                    </p>
                  </div>

                  <span className={cn("inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold not-italic transition-all shadow-xs", theme.bg)}>
                    {shownCategory.promo.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile / tablet sidebar ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mega-nav-overlay absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="mega-nav-drawer absolute left-0 top-0 bottom-0 w-[88%] max-w-sm bg-background shadow-2xl flex flex-col">
            <div className="px-5 h-16 border-b border-border flex items-center justify-between shrink-0">
              <span className={cn("font-bold not-italic text-xl tracking-tight select-none", theme.text)}>{logoText}</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="relative w-full h-10 pl-10 pr-4 text-left text-sm rounded-full bg-[color-mix(in_oklab,var(--navbar-accent)_6%,var(--muted))] border border-[color-mix(in_oklab,var(--navbar-accent)_18%,transparent)] flex items-center text-muted-foreground"
              >
                <Search className={cn("w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none", theme.text)} />
                <span className="truncate">{searchQuery || "Search for protein, creatine, ..."}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4">
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-3.5 text-[15px] font-semibold text-foreground rounded-xl hover:bg-muted transition-colors"
              >
                <BadgePercent className={cn("w-4 h-4", theme.text)} />
                Deals
              </Link>

              {ECOM_CATEGORIES.map((cat) => {
                const isExpanded = expandedMobileCategory === cat.id;
                return (
                  <div key={cat.id} className="border-t border-border/60">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedMobileCategory(isExpanded ? null : cat.id)}
                      className="w-full flex items-center justify-between px-3 py-3.5 text-left text-[15px] font-medium text-foreground"
                    >
                      {cat.name}
                      <ChevronDown
                        className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", isExpanded && "rotate-180")}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-3 pb-5 flex flex-col gap-5">
                          <div className="grid grid-cols-2 gap-3">
                            {cat.products.map((prod) => (
                              <Link
                                key={prod.id}
                                href={prod.href}
                                onClick={() => setMobileOpen(false)}
                                tabIndex={isExpanded ? 0 : -1}
                                className="group flex flex-col gap-1.5 min-w-0"
                              >
                                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-muted ring-1 ring-border/50">
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  {prod.tag && (
                                    <span
                                      className={cn(
                                        "absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[9px] font-semibold leading-none shadow-xs",
                                        prod.tag.startsWith("-") ? "bg-rose-500 text-white" : theme.bg,
                                      )}
                                    >
                                      {prod.tag}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-semibold text-foreground truncate">{prod.name}</span>
                                <div className="flex items-baseline gap-1.5 -mt-0.5">
                                  <span className="text-xs font-bold text-foreground">{prod.price}</span>
                                  {prod.originalPrice && (
                                    <span className="text-[10px] text-muted-foreground line-through">{prod.originalPrice}</span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {[
                            { title: cat.column1Title, links: cat.column1Links },
                            { title: cat.column2Title, links: cat.column2Links },
                          ].map((col) => (
                            <div key={col.title} className="flex flex-col gap-2">
                              <span className={cn("text-[10px] font-bold uppercase tracking-[0.12em]", theme.text)}>
                                {col.title}
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {col.links.map((link) => (
                                  <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    tabIndex={isExpanded ? 0 : -1}
                                    className="px-3 py-1.5 rounded-full border border-[color-mix(in_oklab,var(--navbar-accent)_25%,var(--border))] bg-[color-mix(in_oklab,var(--navbar-accent)_6%,transparent)] text-xs font-medium text-foreground"
                                  >
                                    {link.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          <Link
                            href={cat.promo.href}
                            onClick={() => setMobileOpen(false)}
                            tabIndex={isExpanded ? 0 : -1}
                            className="flex items-center gap-3.5 p-3 rounded-2xl border border-[color-mix(in_oklab,var(--navbar-accent)_22%,var(--border))] bg-[color-mix(in_oklab,var(--navbar-accent)_10%,var(--background))]"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-background/90 border border-border/60 p-1.5 flex items-center justify-center">
                              <img src={cat.promo.image} alt={cat.promo.title} loading="lazy" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={cn("inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold not-italic mb-1", theme.bg)}>
                                {cat.promo.tag}
                              </span>
                              <span className="block text-sm font-bold text-foreground not-italic leading-tight truncate">{cat.promo.title}</span>
                              <span className="block text-[11px] text-muted-foreground not-italic truncate mt-0.5">{cat.promo.cta}</span>
                            </div>
                            <span className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", theme.bg)}>
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {ECOM_STATIC_LINKS.map((name) => (
                <Link
                  key={name}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-3.5 text-[15px] font-medium text-foreground border-t border-border/60"
                >
                  {name}
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-border flex flex-col gap-2.5 shrink-0 bg-background">
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className={cn("w-full h-12 text-sm font-semibold rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-transform", theme.bg)}
              >
                <ShoppingBag className="w-4 h-4" />
                View cart · $85.70
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 text-xs font-medium text-foreground border border-border rounded-full flex items-center justify-center gap-1.5 hover:bg-muted transition-colors"
                >
                  <User className="w-4 h-4" />
                  Account
                </Link>
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 text-xs font-medium text-foreground border border-border rounded-full flex items-center justify-center gap-1.5 hover:bg-muted transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Centered Search Modal (Framer Command Search) ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-start justify-center pt-28 sm:pt-36 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div
            className="mega-nav-overlay absolute inset-0 bg-black/60 backdrop-blur-[1px]"
            onClick={() => setSearchOpen(false)}
          />
          <div className="mega-nav-content relative z-10 w-full max-w-[440px] rounded-2xl bg-background border border-[color-mix(in_oklab,var(--navbar-accent)_28%,var(--border))] shadow-[0_24px_48px_-12px_color-mix(in_oklab,var(--navbar-accent)_22%,rgb(0_0_0/0.45))] overflow-hidden">
            <div className="flex items-center gap-3 px-4 h-12 bg-[color-mix(in_oklab,var(--navbar-accent)_5%,transparent)]">
              <Search className={cn("w-4 h-4 shrink-0", theme.text)} />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for protein, creatine, ..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                aria-label={searchQuery ? "Clear search" : "Close search"}
                onClick={() => {
                  if (searchQuery) setSearchQuery("");
                  else setSearchOpen(false);
                }}
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center transition-opacity shrink-0 opacity-85 hover:opacity-100",
                  theme.bg,
                )}
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>

            <div className="border-t border-[color-mix(in_oklab,var(--navbar-accent)_18%,var(--border))] max-h-64 overflow-y-auto">
              {filteredSearchItems.map((item, idx) => (
                <Link
                  key={item.path}
                  href="#"
                  onClick={() => setSearchOpen(false)}
                  className={cn(
                    "group flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-[color-mix(in_oklab,var(--navbar-accent)_10%,transparent)]",
                    idx === 0 && "bg-[color-mix(in_oklab,var(--navbar-accent)_8%,transparent)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium text-foreground leading-snug transition-colors group-hover:text-[var(--navbar-accent)]",
                      idx === 0 && theme.text,
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.path}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StandardNavbar({
  variant = "default",
  color = "primary",
  logoText = "Nexus",
  linkComponent: Link = "a",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Keeps the layer mounted for the 0.4s slide-out after closing.
  const [closing, setClosing] = useState(false);
  const { theme, style } = getThemeStyles(color);

  const isGlass = variant === "glass";

  // Visibility is derived, not synced: the layer shows whenever the menu is
  // open, and `closing` only extends that through the exit animation. It used
  // to be a separate `renderLayer` flag set during render when `mobileMenuOpen`
  // flipped — under StrictMode that update was dropped a frame after commit,
  // so the layer went back to display:none and a tap looked like it did nothing.
  const showLayer = mobileMenuOpen || closing;

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setClosing(true);
  };

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setClosing(false), 400);
    return () => clearTimeout(t);
  }, [closing]);

  const getContainerStyles = () => {
    switch (variant) {
      case "floating":
        return "max-w-5xl mx-auto top-6 rounded-full bg-background/80 backdrop-blur-lg border border-border shadow-lg px-6";
      case "glass":
        return "w-full bg-background/40 backdrop-blur-xl border-b border-foreground/10 shadow-sm px-6 lg:px-12";
      case "minimal":
        return "w-full bg-transparent px-6 lg:px-12 pt-6";
      case "centered":
      case "default":
      default:
        return "w-full bg-background border-b border-border px-6 lg:px-12";
    }
  };

  return (
    <div className="relative w-full z-50" style={style}>
      <style>{MOBILE_MENU_CSS}</style>
      <nav
        className={cn(
          "absolute left-0 right-0 h-16 flex items-center transition-all duration-300",
          getContainerStyles(),
        )}
      >
        {variant === "centered" ? (
          // Not grid-cols-3: equal thirds give the links only a third of the
          // width, which the four of them overflow long before the viewport
          // runs out. Letting the logo size to its content and splitting the
          // remainder keeps it centred while giving the links real room.
          <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex justify-start">
              <DesktopLinks isGlass={isGlass} linkComponent={Link} />
            </div>
            <div className="flex justify-center">
              <Logo themeBg={theme.bg} logoText={logoText} linkComponent={Link} />
            </div>
            <div className="flex justify-end gap-4">
              <DesktopActions themeBg={theme.bg} linkComponent={Link} />
              <Button
                variant="ghost"
                size="sm"
                aria-label="Open menu"
                iconLeft={<Menu className="w-6 h-6 text-foreground" />}
                className="lg:hidden shadow-none"
                onClick={() => setMobileMenuOpen(true)}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Logo themeBg={theme.bg} logoText={logoText} linkComponent={Link} />
              <DesktopLinks isGlass={isGlass} linkComponent={Link} />
            </div>
            <div className="flex items-center gap-4">
              <DesktopActions themeBg={theme.bg} linkComponent={Link} />
              <Button
                variant="ghost"
                size="sm"
                aria-label="Open menu"
                iconLeft={<Menu className="w-6 h-6" />}
                className="lg:hidden -mr-2 text-muted-foreground shadow-none"
                onClick={() => setMobileMenuOpen(true)}
              />
            </div>
          </div>
        )}
      </nav>
      <div
        className={cn(
          "fixed inset-0 z-[100] pointer-events-none lg:hidden",
          !showLayer && "hidden",
        )}
      >
        <div
          onClick={closeMenu}
          data-open={mobileMenuOpen}
          className="navbar-mobile-overlay absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        />
        <div
          data-open={mobileMenuOpen}
          className={cn(
            "navbar-mobile-menu absolute right-0 top-0 bottom-0 w-full max-w-sm shadow-2xl pointer-events-auto flex flex-col",
            isGlass
              ? "bg-background/70 backdrop-blur-2xl border-l border-foreground/10"
              : "bg-background border-l border-border",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between p-6 border-b",
              isGlass
                ? "border-foreground/10"
                : "border-border",
            )}
          >
            <Logo themeBg={theme.bg} logoText={logoText} linkComponent={Link} />
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close menu"
              iconLeft={<X className="w-5 h-5" />}
              onClick={closeMenu}
              className={cn(
                "-mr-2 rounded-full text-muted-foreground shadow-none hover:text-foreground",
                isGlass
                  ? "hover:bg-foreground/5"
                  : "bg-muted",
              )}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="flex flex-col gap-3">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="text-xl font-semibold text-foreground flex items-center justify-between"
                >
                  {link.name}{" "}
                  {link.hasDropdown && (
                    <ArrowRight className="w-5 h-5 opacity-30" />
                  )}
                </Link>
                {link.hasDropdown && (
                  <div
                    className={cn(
                      "flex flex-col gap-3 pl-4 border-l-2",
                      isGlass
                        ? "border-foreground/10"
                        : "border-border",
                    )}
                  >
                    {["Overview", "Features", "Integrations"].map((sub) => (
                      <Link
                        key={sub}
                        href="#"
                        onClick={closeMenu}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className={cn(
              "p-6 flex flex-col gap-3 border-t",
              isGlass
                ? "bg-foreground/5 border-foreground/10"
                : "bg-muted border-border",
            )}
          >
            <Link
              href="#"
              onClick={closeMenu}
              className={cn(
                "w-full py-3 px-4 text-center font-semibold text-foreground border rounded-xl transition-colors",
                isGlass
                  ? "border-foreground/10 hover:bg-foreground/5"
                  : "border-border hover:bg-muted",
              )}
            >
              Sign In
            </Link>
            <Link
              href="#"
              onClick={closeMenu}
              className={cn(
                "w-full py-3 px-4 text-center font-semibold rounded-xl transition-transform active:scale-95",
                theme.bg,
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightRollupButton({
  themeBg,
  label = "Get Started",
  href = "#",
  className,
  onClick,
  linkComponent: Link,
}: {
  themeBg: string;
  label?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  linkComponent: React.ElementType;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full overflow-hidden group border border-[var(--navbar-accent)] transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--navbar-accent)]",
        themeBg,
        className,
      )}
    >
      <span className="absolute inset-0 bg-[#282828] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
      <span className="relative block overflow-hidden h-[1em] leading-none">
        <span className="flex justify-center items-center transition-transform duration-300 ease-out group-hover:-translate-y-full leading-none">
          {label}
        </span>
        <span className="absolute left-0 right-0 top-full flex justify-center items-center text-gray-200 transition-transform duration-300 ease-out group-hover:-translate-y-full leading-none">
          {label}
        </span>
      </span>
    </Link>
  );
}

function SpotlightNavbar({
  color = "primary",
  logoText = "Nexus",
  linkComponent: Link = "a",
}: {
  color?: NavbarColor;
  logoText?: string;
  linkComponent?: React.ElementType;
}) {
  const { theme, style } = getThemeStyles(color);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [pillRect, setPillRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  }>({ x: 0, y: 0, width: 0, height: 0, visible: false });

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      const target = e?.target;
      if (
        target instanceof HTMLElement &&
        navRef.current &&
        target.contains(navRef.current)
      ) {
        setScrolled(target.scrollTop > 40);
        return;
      }
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    handleScroll();
    return () =>
      window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  const handleLinkEnter = (e: React.MouseEvent<HTMLElement>) => {
    const container = linksContainerRef.current;
    if (!container) return;
    const itemRect = e.currentTarget.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setPillRect({
      x: itemRect.left - containerRect.left,
      y: itemRect.top - containerRect.top,
      width: itemRect.width,
      height: itemRect.height,
      visible: true,
    });
  };

  const handleContainerLeave = () => {
    setPillRect((prev) => ({ ...prev, visible: false }));
  };

  return (
    <nav
      ref={navRef}
      style={style}
      className={cn(
        "sticky top-0 z-50 w-full px-6 py-3 transition-all duration-300",
        !scrolled && "bg-transparent",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex items-center justify-between rounded-full px-4 py-1.5 transition-all duration-300",
          scrolled
            ? "max-w-3xl bg-foreground/[0.08] dark:bg-black/35 backdrop-blur-[10px] border border-foreground/10 shadow-sm"
            : "max-w-4xl bg-transparent border border-transparent",
        )}
      >
        {/* Left: Our Logo (shrinks smoothly on scroll) */}
        <div className="flex items-center gap-2">
          <Link href="#" className="flex items-center gap-2 group py-1">
            <div
              className={cn(
                "rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105",
                scrolled ? "w-7 h-7" : "w-9 h-9",
                theme.bg,
              )}
            >
              <Command
                className={cn(
                  "transition-all duration-300",
                  scrolled ? "w-3.5 h-3.5" : "w-4 h-4",
                )}
              />
            </div>
            <span
              className={cn(
                "font-bold tracking-tight text-foreground transition-all duration-300",
                scrolled ? "text-lg" : "text-xl",
              )}
            >
              {logoText}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links with Sliding Hover Pill */}
        <div
          ref={linksContainerRef}
          onMouseLeave={handleContainerLeave}
          className="relative hidden md:flex items-center gap-2 ml-7"
        >
          <div
            aria-hidden
            className="absolute left-0 top-0 rounded-full bg-foreground/10 dark:bg-[#262626] z-0 pointer-events-none"
            style={{
              width: pillRect.width,
              height: pillRect.height,
              transform: `translate3d(${pillRect.x}px, ${pillRect.y}px, 0) scale(${pillRect.visible ? 1 : 0.95})`,
              opacity: pillRect.visible ? 1 : 0,
              transition:
                "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease-out",
            }}
          />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={handleLinkEnter}
              className="nav-item relative z-10 px-4 py-2 text-sm rounded-full text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Animated Roll-Up Pill CTA Button */}
        <div className="hidden md:block">
          <SpotlightRollupButton
            themeBg={theme.bg}
            label="Get Started"
            linkComponent={Link}
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full cursor-pointer bg-foreground/10 dark:bg-white/10"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <span className="block w-5 h-[2px] bg-foreground relative">
              <span className="absolute left-0 top-[-6px] w-5 h-[2px] bg-foreground" />
              <span className="absolute left-0 top-[6px] w-5 h-[2px] bg-foreground" />
            </span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu Card */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-6 right-6 top-full mt-1 mx-auto max-w-4xl rounded-2xl bg-background/40 dark:bg-black/35 backdrop-blur-[12px] border border-foreground/10 p-6 space-y-2 flex flex-col shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-foreground text-sm font-medium px-4 py-3 rounded-lg hover:bg-foreground/10 dark:hover:bg-white/10 transition"
            >
              {link.name}
            </Link>
          ))}
          <SpotlightRollupButton
            themeBg={theme.bg}
            label="Get Started"
            className="w-full mt-4"
            onClick={() => setMobileMenuOpen(false)}
            linkComponent={Link}
          />
        </div>
      )}
    </nav>
  );
}

export function NavbarBlock({
  variant = "default",
  color = "primary",
  logoText,
  linkComponent = "a",
}: NavbarProps) {
  if (variant === "ecommerce-mega-nav") {
    return (
      <EcommerceMegaNav
        color={color}
        logoText={logoText ?? "NUTRIFY"}
        linkComponent={linkComponent}
      />
    );
  }

  if (variant === "spotlight") {
    return (
      <SpotlightNavbar
        color={color}
        logoText={logoText ?? "Nexus"}
        linkComponent={linkComponent}
      />
    );
  }

  return (
    <StandardNavbar
      variant={variant}
      color={color}
      logoText={logoText ?? "Nexus"}
      linkComponent={linkComponent}
    />
  );
}
