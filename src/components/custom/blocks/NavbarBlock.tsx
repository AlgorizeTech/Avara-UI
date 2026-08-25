"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, ChevronDown, Command, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type NavbarColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type NavbarVariant =
  | "default"
  | "floating"
  | "centered"
  | "minimal"
  | "glass";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 hover:bg-rose-700 text-white",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

/**
 * Foreground that stays legible on top of a filled `--theme-color` swatch.
 * Without this a light pick (white especially) leaves white-on-white content
 * inside the logo tile and the CTA buttons.
 */
const contrastingForeground = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((v) => parseInt(v.trim(), 10));
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance =
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.45 ? "#09090b" : "#ffffff";
};

export const getThemeStyles = (color: string) => {
  if (color === "primary" || color === "default" || !colorThemes[color]) {
    if (color && color.startsWith("#")) {
      const rgb = hexToRgb(color);
      return {
        theme: {
          text: "text-[var(--theme-color)]",
          bg: "bg-[var(--theme-color)] text-[var(--theme-on-color)] hover:opacity-90",
          bgSoft:
            "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        },
        style: {
          "--theme-color": color,
          "--theme-color-rgb": rgb,
          "--theme-on-color": contrastingForeground(rgb),
        } as React.CSSProperties,
      };
    }
    return {
      theme: {
        text: "text-primary",
        bg: "bg-primary text-primary-foreground hover:bg-primary/90",
        bgSoft: "bg-primary/10 text-primary",
      },
      style: {} as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color], style: {} };
};

const NAV_LINKS = [
  { name: "Products", href: "#", hasDropdown: true },
  { name: "Solutions", href: "#", hasDropdown: false },
  { name: "Resources", href: "#", hasDropdown: true },
  { name: "Pricing", href: "#", hasDropdown: false },
];

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
      <span className="font-black text-xl tracking-tight text-foreground">
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
                ? "hover:bg-white/20 dark:hover:bg-white/10"
                : "hover:bg-muted",
            )}
          >
            {link.name}
            {link.hasDropdown && (
              <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform" />
            )}
          </Link>
          {link.hasDropdown && (
            <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div
                className={cn(
                  "w-48 rounded-xl shadow-xl p-2 flex flex-col gap-1",
                  isGlass
                    ? "bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10"
                    : "bg-background border border-border",
                )}
              >
                {["Overview", "Features", "Integrations"].map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    className={cn(
                      "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors",
                      isGlass
                        ? "hover:bg-white/20 dark:hover:bg-white/10"
                        : "hover:bg-muted",
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
        className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="#"
        className={cn(
          "px-5 py-2 text-sm font-bold rounded-full transition-transform active:scale-95 shadow-sm",
          themeBg,
        )}
      >
        Get Started
      </Link>
    </div>
  );
}

export function NavbarBlock({
  variant = "default",
  color = "primary",
  logoText = "Nexus",
  linkComponent: Link = "a",
}: {
  variant?: NavbarVariant;
  color?: NavbarColor;
  logoText?: string;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renderLayer, setRenderLayer] = useState(false);
  const { theme, style } = getThemeStyles(color);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isGlass = variant === "glass";

  // Opening must show the layer immediately. Adjusting state during render on a
  // state change is React's documented alternative to an effect here, and avoids
  // the extra render an effect would cost on every open.
  const [prevMenuOpen, setPrevMenuOpen] = useState(mobileMenuOpen);
  if (prevMenuOpen !== mobileMenuOpen) {
    setPrevMenuOpen(mobileMenuOpen);
    if (mobileMenuOpen) setRenderLayer(true);
  }

  useEffect(() => {
    if (mobileMenuOpen) return;
    const t = setTimeout(() => setRenderLayer(false), 400);
    return () => clearTimeout(t);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!renderLayer) return;
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;
    if (mobileMenuOpen) {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        menu,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
      );
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(menu, { x: "100%", duration: 0.3, ease: "power3.in" });
    }
  }, [mobileMenuOpen, renderLayer]);

  const getContainerStyles = () => {
    switch (variant) {
      case "floating":
        return "max-w-5xl mx-auto top-6 rounded-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border border-border shadow-lg px-6";
      case "glass":
        return "w-full bg-white/40 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm px-6 lg:px-12";
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
              <button
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6 text-foreground" />
              </button>
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
              <button
                className="lg:hidden p-2 -mr-2 text-muted-foreground"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </nav>
      <div
        className={cn(
          "fixed inset-0 z-[100] pointer-events-none lg:hidden",
          !renderLayer && "hidden",
        )}
      >
        <div
          ref={overlayRef}
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        />
        <div
          ref={mobileMenuRef}
          className={cn(
            "absolute right-0 top-0 bottom-0 w-full max-w-sm shadow-2xl pointer-events-auto flex flex-col",
            isGlass
              ? "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-l border-white/20 dark:border-white/10"
              : "bg-background border-l border-border",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between p-6 border-b",
              isGlass
                ? "border-white/10"
                : "border-border",
            )}
          >
            <Logo themeBg={theme.bg} logoText={logoText} linkComponent={Link} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "p-2 -mr-2 rounded-full text-muted-foreground hover:text-foreground transition-colors",
                isGlass
                  ? "hover:bg-white/20 dark:hover:bg-white/10"
                  : "bg-muted",
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="flex flex-col gap-3">
                <Link
                  href={link.href}
                  className="text-xl font-bold text-foreground flex items-center justify-between"
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
                        ? "border-white/10"
                        : "border-border",
                    )}
                  >
                    {["Overview", "Features", "Integrations"].map((sub) => (
                      <Link
                        key={sub}
                        href="#"
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
                ? "bg-white/10 dark:bg-white/5 border-white/10"
                : "bg-muted border-border",
            )}
          >
            <Link
              href="#"
              className={cn(
                "w-full py-3 px-4 text-center font-bold text-foreground border rounded-xl transition-colors",
                isGlass
                  ? "border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10"
                  : "border-border hover:bg-muted",
              )}
            >
              Sign In
            </Link>
            <Link
              href="#"
              className={cn(
                "w-full py-3 px-4 text-center font-bold rounded-xl transition-transform active:scale-95",
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
