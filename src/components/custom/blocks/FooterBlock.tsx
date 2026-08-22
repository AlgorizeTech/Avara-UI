"use client";

import React, { useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Globe as GlobeIcon,
  Sparkles,
  ChevronRight,
  Heart,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FooterVariant =
  | "simple-centered"
  | "glass-dock"
  | "neon-glow-pulse"
  | "quantum-particle-beam";

export interface FooterProps {
  variant?: FooterVariant;
  brandName?: string;
  logo?: React.ReactNode;
  tagline?: string;
  className?: string;
}

export function Footer({
  variant = "simple-centered",
  brandName = "Algorize UI",
  logo,
  tagline = "Elevate your web applications with fluid, production-ready animated components.",
  className,
}: FooterProps) {
  const BrandLogo = () => (
    <div className="flex items-center gap-2.5 select-none">
      {logo || (
        <div className="relative flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-[24px]"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" className="fill-foreground" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" className="fill-primary" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" className="fill-foreground" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" className="fill-primary" />
          </svg>
        </div>
      )}
      <span className="font-extrabold text-base sm:text-lg tracking-tight text-foreground flex items-center gap-1.5">
        {brandName === "Algorize UI" ? "Docs" : brandName}{" "}
        <span className="text-primary font-normal">UI</span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
          v1.0
        </span>
      </span>
    </div>
  );

  const SocialLinks = () => (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
      <a href="#" className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground hover:scale-105">
        <Twitter className="size-4" />
      </a>
      <a href="#" className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground hover:scale-105">
        <Github className="size-4" />
      </a>
      <a href="#" className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground hover:scale-105">
        <Linkedin className="size-4" />
      </a>
      <a href="#" className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground hover:scale-105">
        <Youtube className="size-4" />
      </a>
      <a href="#" className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground hover:scale-105">
        <Instagram className="size-4" />
      </a>
    </div>
  );

  return (
    <footer className={cn("w-full bg-background border-t border-border/80 text-foreground transition-all overflow-hidden", className)}>
      {/* 1. SIMPLE CENTERED */}
      {variant === "simple-centered" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center gap-8 sm:gap-10">
          <BrandLogo />
          
          <div className="max-w-xl space-y-3 px-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">Build faster with modern component building blocks</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{tagline}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-muted/40 border border-border max-w-2xl w-full">
            {["Components", "Documentation", "Templates", "Showcase", "Pricing", "Changelog", "Security", "Privacy"].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-background transition-all flex items-center gap-1.5 group"
              >
                <ChevronRight className="size-3 text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                <span>{item}</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <SocialLinks />
          </div>

          <div className="w-full border-t border-border/60 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <div className="flex items-center gap-2">
              <GlobeIcon className="size-3.5 text-primary" />
              <span>English (US)</span>
              <span className="text-border">•</span>
              <span>USD ($)</span>
            </div>
            <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="size-3.5 text-rose-500 fill-rose-500" />
              <span>for developers.</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. GLASS DOCK */}
      {variant === "glass-dock" && (
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-card/80 backdrop-blur-2xl border border-border shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <BrandLogo />
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">{tagline}</p>
              </div>
              <SocialLinks />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border/80 text-xs sm:text-sm">
              {[
                { title: "UI Library", links: ["Globe 3D", "Hero Showcase", "Marquee", "Scroll Stack"] },
                { title: "Documentation", links: ["Quickstart", "Installation", "Tailwind Setup", "Changelog"] },
                { title: "Community", links: ["GitHub Repo", "Discord Chat", "Twitter News", "YouTube"] },
                { title: "Company", links: ["About Team", "Careers", "Privacy Policy", "Security"] },
              ].map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Layers className="size-3 text-primary/70 group-hover:scale-110 transition-transform shrink-0" />
                          <span>{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <span>© {new Date().getFullYear()} {brandName}. Glass Dock Edition.</span>
            <span>Crafted for high-end modern interfaces.</span>
          </div>
        </div>
      )}

      {/* 3. NEON GLOW PULSE (Supports both Day Mode & Night Mode Theme Adaptively) */}
      {variant === "neon-glow-pulse" && (
        <div className="w-full bg-purple-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 sm:py-24 px-4 border-t border-purple-300/60 dark:border-purple-500/30 transition-colors">
          <div className="max-w-7xl mx-auto p-8 sm:p-12 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-purple-300 dark:border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] dark:shadow-[0_0_50px_rgba(168,85,247,0.2)] space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-purple-200/80 dark:border-slate-800">
              <BrandLogo />
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-mono animate-pulse">
                <Cpu className="size-4" /> NEON MATRIX ONLINE (60 FPS)
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-xs sm:text-sm">
              {[
                { title: "Cyber Blocks", links: ["3D Animated Globe", "Hero Showcase", "Infinite Marquee", "Scroll Stack"] },
                { title: "Documentation", links: ["Quickstart Guide", "Framework Setup", "Tailwind v4", "CLI Reference"] },
                { title: "Community", links: ["GitHub Repository", "Discord Server", "Twitter Feed", "YouTube Channel"] },
                { title: "Trust & Legal", links: ["About Our Team", "Careers (Hiring)", "Privacy Policy", "Security Overview"] },
              ].map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-xs">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href="#" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-1.5 group">
                          <Zap className="size-3 text-purple-500 dark:text-purple-400 group-hover:scale-125 transition-transform shrink-0" />
                          <span>{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-purple-200/80 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
              <span>© {new Date().getFullYear()} {brandName}. Cyberpunk Neon Edition.</span>
              <SocialLinks />
            </div>
          </div>
        </div>
      )}

      {/* 4. QUANTUM PARTICLE BEAM */}
      {variant === "quantum-particle-beam" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/30 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <BrandLogo />
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">{tagline}</p>
              </div>
              <SocialLinks />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-6 border-t border-primary/20 text-xs sm:text-sm">
              {[
                { title: "UI Components", links: ["Globe 3D", "Hero Showcase", "Marquee", "Scroll Stack"] },
                { title: "Documentation", links: ["Quickstart", "Installation", "Tailwind Setup", "Changelog"] },
                { title: "Community", links: ["GitHub Repo", "Discord Chat", "Twitter News", "YouTube"] },
                { title: "Company", links: ["About Team", "Careers", "Privacy Policy", "Security"] },
              ].map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Sparkles className="size-3 text-primary/70 group-hover:scale-110 transition-transform shrink-0" />
                          <span>{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <span>© {new Date().getFullYear()} {brandName}. Quantum Edition. All rights reserved.</span>
            <span>Built for modern web applications.</span>
          </div>
        </div>
      )}
    </footer>
  );
}
