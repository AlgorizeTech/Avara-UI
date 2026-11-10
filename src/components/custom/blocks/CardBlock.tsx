"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react";
import Button from "./Button";


// ==========================================
// 1. ROOT CARD WRAPPER
// ==========================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "flat";
  interactive?: boolean;
}

export function Card({
  className,
  variant = "bordered",
  interactive = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-card shadow-sm border border-primary/10",
    bordered:
      "bg-card border border-primary/25 shadow-sm",
    flat: "bg-muted border border-primary/20",
  };

  return (
    <div
      className={cn(
        "rounded-xl text-card-foreground flex flex-col transition-all duration-200",
        variants[variant],
        interactive &&
          "hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-primary/50 active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 2. HEADER
// ==========================================
export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-semibold leading-none tracking-tight text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ==========================================
// 3. CONTENT AREA
// ==========================================
export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0 flex-1", className)} {...props}>
      {children}
    </div>
  );
}

// ==========================================
// 4. FOOTER
// ==========================================
export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0 mt-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 5. PROJECT SHOWCASE CARD
// A responsive, full-width two-column showcase card matching the interactive block design:
// visual preview frame with package slug on the left, pairing with pill tags,
// headline, description, 2x2 specification grid, branded action buttons, and
// copyable install CLI command bar on the right.
// ==========================================
export interface ProjectCardSpec {
  label: string;
  value: string;
}

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  image?: string;
  slug?: string;
  scope?: string;
  badge1?: string;
  badge2?: string;
  description?: string;
  specs?: ProjectCardSpec[];
  ctaLabel?: string;
  ctaHref?: string;
  contactLabel?: string;
  installCommand?: string;
  onCtaClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onContactClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function ProjectCard({
  title = "Platform grid",
  image = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg",
  slug,
  scope = "avara-ui",
  badge1 = "Component Block",
  badge2 = "TypeScript & Tailwind",
  description = "A meticulously crafted, responsive interactive block built with modern animations, responsive layouts, and accessible standards. Ready to drop into your Next.js and React applications.",
  specs,
  ctaLabel = "Full View",
  ctaHref = "#",
  contactLabel = "Contact",
  installCommand,
  onCtaClick,
  onContactClick,
  className,
  ...props
}: ProjectCardProps) {
  const [copied, setCopied] = useState(false);
  const resolvedSlug =
    slug ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const resolvedCommand = installCommand ?? `npx shadcn@latest add @${scope}/${resolvedSlug}`;

  const defaultSpecs: ProjectCardSpec[] = [
    { label: "Framework", value: "Next.js / React 19" },
    { label: "Styling", value: "Tailwind CSS v4" },
    { label: "Animation", value: "Motion / GSAP" },
    { label: "Responsive", value: "Fluid Mobile & Desktop" },
  ];

  const specsList = specs ?? defaultSpecs;

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(resolvedCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden bg-card border border-foreground/15 dark:border-foreground/20 rounded-2xl sm:rounded-3xl shadow-none ring-1 ring-foreground/10 dark:ring-foreground/15",
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
        {/* Left Column: Visual Card Preview Frame */}
        <div className="relative flex flex-col justify-center p-5 sm:p-7 md:p-8 lg:p-10 bg-muted/35 dark:bg-muted/20 border-b lg:border-b-0 lg:border-r border-border/80 dark:border-border/60 w-full">
          <div className="relative z-10 w-full flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border/80 dark:border-border/60 bg-card shadow-none">
            <div className="font-mono text-base sm:text-lg font-bold text-foreground tracking-tight mb-3">
              {title}
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl sm:rounded-2xl border border-border/60 bg-muted/20 overflow-hidden p-2 sm:p-3 flex items-center justify-center my-auto">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain rounded-lg select-none pointer-events-none"
              />
            </div>

            <div className="font-mono text-xs sm:text-sm text-muted-foreground mt-3">
              @{scope}/{resolvedSlug}
            </div>
          </div>
        </div>

        {/* Right Column: Full Details & Project Metadata */}
        <div className="flex flex-col justify-between p-5 sm:p-7 md:p-8 lg:p-10 space-y-6 w-full">
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {badge1 && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {badge1}
                </span>
              )}
              {badge2 && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                  {badge2}
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-foreground leading-[1.15]">
                {title}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Project Specifications 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {specsList.map((spec, i) => (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/70"
                >
                  <div className="text-xs text-muted-foreground font-normal">
                    {spec.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-foreground mt-0.5 sm:mt-1 truncate">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions & Install Bar */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <div className="w-full sm:flex-1 flex [&>div]:w-full [&>div>button]:w-full [&>button]:w-full">
                <Button
                  variant="default"
                  size="default"
                  onClick={(e) => {
                    e.preventDefault();
                    if (ctaHref && ctaHref !== "#") {
                      window.open(ctaHref, "_blank", "noopener,noreferrer");
                    }
                    onCtaClick?.(e);
                  }}
                  iconRight={<ArrowUpRight size={15} />}
                  className="w-full font-medium"
                >
                  {ctaLabel}
                </Button>
              </div>

              <div className="w-full sm:flex-1 flex [&>div]:w-full [&>div>button]:w-full [&>button]:w-full">
                <Button
                  variant="outline"
                  size="default"
                  onClick={(e) => {
                    e.preventDefault();
                    onContactClick?.(e);
                  }}
                  iconLeft={<Mail size={15} />}
                  className="w-full font-medium"
                >
                  {contactLabel}
                </Button>
              </div>
            </div>

            {/* Install Command Bar */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm font-mono text-muted-foreground w-full">
              <span className="truncate">{resolvedCommand}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 ml-2 hover:text-foreground cursor-pointer flex items-center gap-1.5 transition-colors"
                title="Copy install command"
              >
                {copied ? (
                  <Check size={15} className="text-emerald-500" />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectCard as ShowcaseCard };

// Re-export ProductCard for convenient unified importing from CardBlock
export { ProductCard } from "@/components/custom/blocks/ProductCardBlock";
export type { ProductCardProps, ProductColorOption } from "@/components/custom/blocks/ProductCardBlock";

