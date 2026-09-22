"use client";

import React from "react";
import {
  Globe as GlobeIcon,
  Sparkles,
  ChevronRight,
  Heart,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SocialLinks, type SocialLink } from "./SocialLinksBlock";

export type FooterVariant =
  | "simple-centered"
  | "glass-dock"
  | "neon-glow-pulse"
  | "quantum-particle-beam";

export interface FooterLinkSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  variant?: FooterVariant;
  brandName?: string;
  logo?: React.ReactNode;
  tagline?: string;
  copyrightText?: string;
  sections?: FooterLinkSection[];
  /** The social row. Defaults to X, GitHub, LinkedIn, YouTube and Instagram pointing at `#`. */
  socialLinks?: SocialLink[];
  className?: string;
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { network: "x", href: "#" },
  { network: "github", href: "#" },
  { network: "linkedin", href: "#" },
  { network: "youtube", href: "#" },
  { network: "instagram", href: "#" },
];

const DEFAULT_FOOTER_SECTIONS: FooterLinkSection[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Community", href: "#" },
      { label: "Showcase", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

/**
 * Per-variant default link columns.
 *
 * `sections` overrides these. Each variant keeps its own wording, so the
 * out-of-the-box look is unchanged when the prop is omitted.
 */
const DEFAULT_SECTIONS_BY_VARIANT: Record<FooterVariant, FooterLinkSection[]> = {
  "simple-centered": DEFAULT_FOOTER_SECTIONS,
  "glass-dock": [
  { title: "UI Library", links: [{ label: "Globe 3D", href: "#" }, { label: "Hero Showcase", href: "#" }, { label: "Marquee", href: "#" }, { label: "Scroll Stack", href: "#" }] },
  { title: "Documentation", links: [{ label: "Quickstart", href: "#" }, { label: "Installation", href: "#" }, { label: "Tailwind Setup", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Community", links: [{ label: "GitHub Repo", href: "#" }, { label: "Discord Chat", href: "#" }, { label: "Twitter News", href: "#" }, { label: "YouTube", href: "#" }] },
  { title: "Company", links: [{ label: "About Team", href: "#" }, { label: "Careers", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Security", href: "#" }] },
  ],
  "neon-glow-pulse": [
  { title: "Cyber Blocks", links: [{ label: "3D Animated Globe", href: "#" }, { label: "Hero Showcase", href: "#" }, { label: "Infinite Marquee", href: "#" }, { label: "Scroll Stack", href: "#" }] },
  { title: "Documentation", links: [{ label: "Quickstart Guide", href: "#" }, { label: "Framework Setup", href: "#" }, { label: "Tailwind v4", href: "#" }, { label: "CLI Reference", href: "#" }] },
  { title: "Community", links: [{ label: "GitHub Repository", href: "#" }, { label: "Discord Server", href: "#" }, { label: "Twitter Feed", href: "#" }, { label: "YouTube Channel", href: "#" }] },
  { title: "Trust & Legal", links: [{ label: "About Our Team", href: "#" }, { label: "Careers (Hiring)", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Security Overview", href: "#" }] },
  ],
  "quantum-particle-beam": [
  { title: "UI Components", links: [{ label: "Globe 3D", href: "#" }, { label: "Hero Showcase", href: "#" }, { label: "Marquee", href: "#" }, { label: "Scroll Stack", href: "#" }] },
  { title: "Documentation", links: [{ label: "Quickstart", href: "#" }, { label: "Installation", href: "#" }, { label: "Tailwind Setup", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Community", links: [{ label: "GitHub Repo", href: "#" }, { label: "Discord Chat", href: "#" }, { label: "Twitter News", href: "#" }, { label: "YouTube", href: "#" }] },
  { title: "Company", links: [{ label: "About Team", href: "#" }, { label: "Careers", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Security", href: "#" }] },
  ],
};

/** The wordmark, or whatever `logo` was passed instead of it. */
function BrandLogo({ logo, brandName }: Pick<FooterProps, "logo" | "brandName">) {
  return (
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
}

export function Footer({
  variant = "simple-centered",
  brandName = "Algorize UI",
  logo,
  tagline = "Elevate your web applications with fluid, production-ready animated components.",
  copyrightText,
  sections,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  className,
}: FooterProps) {
  const linkSections = sections ?? DEFAULT_SECTIONS_BY_VARIANT[variant];
  const copyright =
    copyrightText ??
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  return (
    <footer className={cn("w-full bg-background border-t border-border/80 text-foreground transition-all overflow-hidden", className)}>
      {/* 1. SIMPLE CENTERED */}
      {variant === "simple-centered" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center gap-8 sm:gap-10">
          <BrandLogo logo={logo} brandName={brandName} />
          
          <div className="max-w-xl space-y-3 px-2">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">Build faster with modern component building blocks</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{tagline}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-muted/40 border border-border max-w-2xl w-full">
            {linkSections
              .flatMap((section) => section.links)
              .map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-background transition-all flex items-center gap-1.5 group"
                >
                  <ChevronRight className="size-3 text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                  <span>{link.label}</span>
                </a>
              ))}
          </div>

          <div className="pt-2">
            <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
          </div>

          <div className="w-full border-t border-border/60 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <div className="flex items-center gap-2">
              <GlobeIcon className="size-3.5 text-primary" />
              <span>English (US)</span>
              <span className="text-border">•</span>
              <span>USD ($)</span>
            </div>
            <span>{copyright}</span>
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
                <BrandLogo logo={logo} brandName={brandName} />
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">{tagline}</p>
              </div>
              <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border/80 text-xs sm:text-sm">
              {linkSections.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Layers className="size-3 text-primary/70 group-hover:scale-110 transition-transform shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <span>{copyright}</span>
            <span>Crafted for high-end modern interfaces.</span>
          </div>
        </div>
      )}

      {/* 3. NEON GLOW PULSE (Supports both Day Mode & Night Mode Theme Adaptively) */}
      {variant === "neon-glow-pulse" && (
        <div className="w-full bg-purple-50/50 dark:bg-slate-950 text-foreground py-16 sm:py-24 px-4 border-t border-purple-300/60 dark:border-purple-500/30 transition-colors">
          <div className="max-w-7xl mx-auto p-8 sm:p-12 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-purple-300 dark:border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] dark:shadow-[0_0_50px_rgba(168,85,247,0.2)] space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-purple-200/80 dark:border-slate-800">
              <BrandLogo logo={logo} brandName={brandName} />
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-mono animate-pulse">
                <Cpu className="size-4" /> NEON MATRIX ONLINE (60 FPS)
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-xs sm:text-sm">
              {linkSections.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-xs">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-1.5 group">
                          <Zap className="size-3 text-purple-500 dark:text-purple-400 group-hover:scale-125 transition-transform shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-purple-200/80 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
              <span>{copyright}</span>
              <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
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
                <BrandLogo logo={logo} brandName={brandName} />
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">{tagline}</p>
              </div>
              <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-6 border-t border-primary/20 text-xs sm:text-sm">
              {linkSections.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Sparkles className="size-3 text-primary/70 group-hover:scale-110 transition-transform shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <span>{copyright}</span>
            <span>Built for modern web applications.</span>
          </div>
        </div>
      )}
    </footer>
  );
}
