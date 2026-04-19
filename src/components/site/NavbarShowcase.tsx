"use client";

import {
  NavbarBlock,
  NavbarColor,
  NavbarVariant,
} from "@/components/custom/blocks/NavbarBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const NAVBAR_ENGINE_CODE_TS = `"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Command, ArrowRight } from "lucide-react";
import Link from "next/link";

export type NavbarColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type NavbarVariant = "default" | "floating" | "centered" | "minimal";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 hover:bg-indigo-700 text-white", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 hover:bg-rose-700 text-white", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 hover:bg-emerald-700 text-white", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  zinc: { text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100" },
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
      theme: { text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white hover:opacity-90", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const NAV_LINKS = [
  { name: "Products", href: "#", hasDropdown: true },
  { name: "Solutions", href: "#", hasDropdown: false },
  { name: "Resources", href: "#", hasDropdown: true },
  { name: "Pricing", href: "#", hasDropdown: false },
];

export function NavbarBlock({ variant = "default", color = "indigo", logoText = "Nexus" }: { variant?: NavbarVariant; color?: NavbarColor; logoText?: string; }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renderLayer, setRenderLayer] = useState(false);
  const { theme, style } = getThemeStyles(color);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileMenuOpen) setRenderLayer(true);
    else { const t = setTimeout(() => setRenderLayer(false), 400); return () => clearTimeout(t); }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!renderLayer) return;
    const menu = mobileMenuRef.current; const overlay = overlayRef.current;
    if (!menu || !overlay) return;
    if (mobileMenuOpen) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(menu, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(menu, { x: "100%", duration: 0.3, ease: "power3.in" });
    }
  }, [mobileMenuOpen, renderLayer]);

  const getContainerStyles = () => {
    switch (variant) {
      case "floating": return "max-w-5xl mx-auto top-6 rounded-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 shadow-lg px-6";
      case "minimal": return "w-full bg-transparent px-6 md:px-12 pt-6";
      case "centered":
      case "default":
      default: return "w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-12";
    }
  };

  const Logo = () => (
    <Link href="#" className="flex items-center gap-2 group">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105", theme.bg)}><Command className="w-4 h-4 text-white" /></div>
      <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">{logoText}</span>
    </Link>
  );

  const DesktopLinks = () => (
    <ul className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((link) => (
        <li key={link.name} className="relative group">
          <Link href={link.href} className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
            {link.name}
            {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform" />}
          </Link>
          {link.hasDropdown && (
            <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-2 flex flex-col gap-1">
                {["Overview", "Features", "Integrations"].map((sub) => (
                  <Link key={sub} href="#" className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors">{sub}</Link>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const DesktopActions = () => (
    <div className="hidden md:flex items-center gap-3">
      <Link href="#" className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">Sign In</Link>
      <Link href="#" className={cn("px-5 py-2 text-sm font-bold rounded-full transition-transform active:scale-95 shadow-sm", theme.bg)}>Get Started</Link>
    </div>
  );

  return (
    <div className="relative w-full z-50" style={style}>
      <nav className={cn("absolute left-0 right-0 h-16 flex items-center transition-all duration-300", getContainerStyles())}>
        {variant === "centered" ? (
          <div className="w-full grid grid-cols-3 items-center">
            <div className="flex justify-start"><DesktopLinks /></div>
            <div className="flex justify-center"><Logo /></div>
            <div className="flex justify-end gap-4"><DesktopActions /><button className="md:hidden" onClick={() => setMobileMenuOpen(true)}><Menu className="w-6 h-6 text-zinc-900 dark:text-white" /></button></div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-8"><Logo /><DesktopLinks /></div>
            <div className="flex items-center gap-4"><DesktopActions /><button className="md:hidden p-2 -mr-2 text-zinc-600 dark:text-zinc-300" onClick={() => setMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button></div>
          </div>
        )}
      </nav>
      <div className={cn("fixed inset-0 z-[100] pointer-events-none md:hidden", !renderLayer && "hidden")}>
        <div ref={overlayRef} onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" />
        <div ref={mobileMenuRef} className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl pointer-events-auto flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800/50">
            <Logo />
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="flex flex-col gap-3">
                <Link href={link.href} className="text-xl font-bold text-zinc-900 dark:text-white flex items-center justify-between">{link.name} {link.hasDropdown && <ArrowRight className="w-5 h-5 opacity-30" />}</Link>
                {link.hasDropdown && (
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
                    {["Overview", "Features", "Integrations"].map((sub) => (
                      <Link key={sub} href="#" className="text-base font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">{sub}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-3">
            <Link href="#" className="w-full py-3 px-4 text-center font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Sign In</Link>
            <Link href="#" className={cn("w-full py-3 px-4 text-center font-bold rounded-xl transition-transform active:scale-95", theme.bg)}>Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const NAVBAR_ENGINE_CODE_JS = NAVBAR_ENGINE_CODE_TS.replace(
  /:\s?[A-Z][A-Za-z0-9_<>]*(\[\])?/g,
  "",
)
  .replace(/<any>/g, "")
  .replace(/as any/g, "")
  .replace(/type [A-Za-z0-9_]+ = [^;]+;/g, "")
  .replace(/export interface [A-Za-z0-9_]+ \{[^}]+\}/g, "")
  .replace(/as React.CSSProperties/g, "");

export function NavbarShowcase() {
  const [variant, setVariant] = useState<NavbarVariant>("floating");
  const [color, setColor] = useState<NavbarColor>("indigo");

  const generateUsageCode = (isTs: boolean) => {
    return `import { NavbarBlock } from "@/components/custom/blocks/NavbarBlock";

export default function RootLayout({ children }) {
  return (
    <body>
      <NavbarBlock 
        variant="${variant}" 
        color="${color}" 
        logoText="Nexus"
      />
      <main className="pt-24">{children}</main>
    </body>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col md:flex-row gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Navbar Structure
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(
              ["default", "floating", "centered", "minimal"] as NavbarVariant[]
            ).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Theme Color
          </label>
          <div className="flex items-center gap-2 h-10 px-2">
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as NavbarColor)}
                className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}

            {/* Custom Color Picker */}
            <div
              className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
            >
              <input
                type="color"
                value={color.startsWith("#") ? color : "#6366f1"}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                title="Custom Hex Color"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="NavbarBlock"
        tsCode={NAVBAR_ENGINE_CODE_TS}
        jsCode={NAVBAR_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="relative overflow-hidden w-full flex flex-col items-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-200/40 via-zinc-50 to-zinc-50 dark:from-zinc-800/40 dark:via-zinc-950 dark:to-zinc-950">
          <NavbarBlock
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
          />

          {/* Dummy content below navbar to show transparency/blur effects */}
          <div className="w-full max-w-5xl mx-auto mt-32 px-8 flex flex-col gap-6 opacity-30 pointer-events-none">
            <div className="w-2/3 h-12 bg-zinc-300 dark:bg-zinc-800 rounded-xl" />
            <div className="w-1/2 h-6 bg-zinc-300 dark:bg-zinc-800 rounded-lg" />
            <div className="w-full h-32 bg-zinc-300 dark:bg-zinc-800 rounded-2xl mt-8" />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
