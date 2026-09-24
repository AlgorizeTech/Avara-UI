"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Command, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  | "glass";

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
                    ? "bg-popover/60 text-popover-foreground backdrop-blur-2xl border border-foreground/10"
                    : "bg-popover text-popover-foreground border border-border",
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

export function NavbarBlock({
  variant = "default",
  color = "primary",
  logoText = "Nexus",
  linkComponent: Link = "a",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renderLayer, setRenderLayer] = useState(false);
  const { theme, style } = getThemeStyles(color);

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
          !renderLayer && "hidden",
        )}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
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
