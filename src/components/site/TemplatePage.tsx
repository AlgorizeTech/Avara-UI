"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  Maximize2,
  Monitor,
  Moon,
  RotateCcw,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  X,
} from "lucide-react";
import { Cli } from "@/components/site/cli";
import { AnimatedSectionTitle } from "@/components/site/AnimatedSectionTitle";
import { revealThemeAt } from "@/components/site/theme";
import { cn } from "@/lib/utils";

export type TechIconKey =
  | "nextjs"
  | "react"
  | "tailwind"
  | "typescript"
  | "motion"
  | "mdx";

export interface TemplatePreviewTab {
  id: string;
  label: string;
  path: string;
  render: (
    theme: "light" | "dark",
    onToggleTheme?: (e: React.MouseEvent<HTMLElement>) => void,
  ) => React.ReactNode;
}

export interface TemplateTechItem {
  name: string;
  version?: string;
  iconKey: TechIconKey;
}

export interface TemplatePageSummary {
  id: string;
  number: string;
  path: string;
  title: string;
  description: string;
}

export interface TemplatePricingOption {
  label: string;
  badge?: string;
  price: string;
  billingNote?: string;
  description: string;
  features?: string[];
  ctaLabel: string;
  ctaHref?: string;
  featured?: boolean;
}

export interface TemplatePageProps {
  category?: string;
  tier?: "Free" | "Pro";
  isNew?: boolean;
  title: string;
  description: string;
  demoDomain: string;
  pages: TemplatePreviewTab[];
  whatYouGet: {
    description: string;
    techStack: TemplateTechItem[];
    features: string[];
  };
  pagesOverview?: {
    subtitle: string;
    items: TemplatePageSummary[];
  };
  pricingSection?: {
    subtitle: string;
    options: TemplatePricingOption[];
  };
  afterYouBuy?: {
    subtitle: string;
    steps: React.ReactNode[];
    terminalCommand: string;
  };
}

const DEVICE_PILL =
  "rounded-md bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-foreground/[0.06]";

function AnimatedCheckbox({ index }: { index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      aria-hidden
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm bg-primary/15 border border-primary/25 text-primary"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="size-3.5"
      >
        <motion.path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  pathLength: { duration: 0.35, delay: index * 0.06, ease: "easeOut" },
                  opacity: { duration: 0.15, delay: index * 0.06 },
                }
          }
        />
      </svg>
    </span>
  );
}

function AnimatedUrlPill({
  domain,
  path,
  className,
  isDark = false,
}: {
  domain: string;
  path: string;
  className?: string;
  isDark?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const suffix = path === "/" ? "" : path;
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      setWidth(el.offsetWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [domain, suffix]);

  return (
    <motion.div
      animate={width !== undefined ? { width } : undefined}
      initial={false}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
      }
      className={cn(
        "rounded-full text-[11px] font-mono overflow-hidden shrink-0",
        isDark
          ? "bg-white/[0.06] text-zinc-300"
          : "bg-foreground/[0.04] text-foreground/55",
        className,
      )}
    >
      <div
        ref={contentRef}
        className="w-max flex items-center gap-1.5 px-3 py-1 whitespace-nowrap"
      >
        <Lock
          className={cn(
            "size-3 shrink-0",
            isDark ? "text-zinc-400" : "text-foreground/45",
          )}
          aria-hidden
        />
        <span className="flex items-center">
          <span>{domain}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            {suffix && (
              <motion.span
                key={suffix}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -4 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                }
                className="inline-block"
              >
                {suffix}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
    </motion.div>
  );
}

function TechIcon({ iconKey }: { iconKey: TechIconKey }) {
  switch (iconKey) {
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.164 0 4.194-.573 5.946-1.576L9.148 9.216v7.034H7.648V7.2h1.684l9.687 14.535A11.964 11.964 0 0 0 24 12c0-6.627-5.373-12-12-12Zm3.95 14.234-1.5-2.25V7.2h1.5v7.034Z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
          <circle cx="12" cy="12" r="2.05" />
          <g fill="none" stroke="currentColor" strokeWidth="1.3">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
          <path d="M12 6c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.76.19 1.305.74 1.908 1.35C13.39 10.847 14.527 12 17 12c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.76-.19-1.305-.74-1.908-1.35C15.61 7.153 14.473 6 12 6ZM7 12c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.76.19 1.305.74 1.908 1.35C8.39 16.847 9.527 18 12 18c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.76-.19-1.305-.74-1.908-1.35C10.61 13.153 9.473 12 7 12Z" />
        </svg>
      );
    case "typescript":
      return (
        <span className="flex size-3.5 items-center justify-center rounded-[3px] bg-foreground/75 text-[8px] font-bold leading-none text-background">
          TS
        </span>
      );
    case "motion":
      return (
        <span className="flex size-3.5 items-center justify-center rounded-[3px] bg-foreground/75 text-[8px] font-bold leading-none text-background">
          M
        </span>
      );
    case "mdx":
      return (
        <span className="flex h-3.5 items-center justify-center rounded-[3px] border border-foreground/25 px-0.5 text-[7px] font-bold leading-none text-foreground/75">
          MDX
        </span>
      );
  }
}

export function TemplatePage({
  title,
  description,
  demoDomain,
  pages,
  whatYouGet,
  pagesOverview,
  pricingSection,
  afterYouBuy,
}: TemplatePageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleTogglePreviewTheme = (e: React.MouseEvent<HTMLElement>) => {
    const nextTheme = previewTheme === "dark" ? "light" : "dark";
    const rect = e.currentTarget.getBoundingClientRect();
    revealThemeAt(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      () => {
        flushSync(() => {
          setPreviewTheme(nextTheme);
        });
      },
    );
  };

  useEffect(() => {
    if (!isFullscreen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlGutter = document.documentElement.style.scrollbarGutter;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "auto";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.scrollbarGutter = prevHtmlGutter;
      window.removeEventListener("keydown", onKey);
    };
  }, [isFullscreen]);

  const activePage = pages[activeIndex] ?? pages[0];
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < pages.length - 1;

  const buyButtonLabel = pricingSection?.options?.[0]?.ctaLabel ?? "Buy for $40";

  return (
    <div className="w-full">
      {/* Template Name, Description & Buy For Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl leading-8 font-normal text-foreground mt-0 mb-2">
            {title}
          </h1>
          <p className="text-[15px] leading-[1.8] text-foreground/60 m-0 max-w-2xl">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-end">
          <a
            href="#choose-your-access"
            className="not-prose inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-[13px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {buyButtonLabel}
          </a>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="not-prose inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-white px-4 text-[13px] font-medium text-neutral-900 shadow-[0_0_8px_rgba(0,0,0,0.06)] transition-colors hover:bg-white/80 dark:bg-neutral-800 dark:text-white dark:shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span>Live Preview</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Preview Box (Avara UI Sandbox Shell Style) */}
      <div ref={previewRef} className="not-prose scroll-mt-24 rounded-lg bg-foreground/[0.03] p-1.5 mb-12">
        {/* Top Bar: macOS Dots + URL + Prev/Next on Left, Device + Theme on Right */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1.5 pt-0.5">
          {/* Left: Apple Traffic Lights + URL + Prev/Next */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 px-1" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
              <span className="size-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
              <span className="size-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10" />
            </div>

            <AnimatedUrlPill
              domain={demoDomain}
              path={activePage.path}
              className="max-w-[220px] sm:max-w-xs"
            />

            <div className="flex items-center gap-0.5 rounded-lg bg-foreground/[0.04] p-0.5">
              <button
                type="button"
                aria-label="Previous page"
                disabled={!canPrev}
                onClick={() => canPrev && setActiveIndex((i) => i - 1)}
                className="p-1 rounded-md text-foreground/55 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next page"
                disabled={!canNext}
                onClick={() => canNext && setActiveIndex((i) => i + 1)}
                className="p-1 rounded-md text-foreground/55 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Device Selector + Light/Dark Icon */}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-0.5 rounded-lg bg-foreground/[0.04] p-0.5">
              {(
                [
                  { id: "desktop", icon: Monitor, label: "Desktop preview" },
                  { id: "tablet", icon: Tablet, label: "Tablet preview" },
                  { id: "mobile", icon: Smartphone, label: "Mobile preview" },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-label={d.label}
                  onClick={() => setDevice(d.id)}
                  className={cn(
                    "p-1 transition-all cursor-pointer",
                    device === d.id
                      ? cn(DEVICE_PILL, "text-foreground")
                      : "text-foreground/45 hover:text-foreground/80 rounded-md",
                  )}
                >
                  <d.icon className="size-3.5" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              aria-label="Open full page preview"
              title="Full page preview"
              className="flex items-center justify-center rounded-lg bg-foreground/[0.04] p-1.5 text-foreground/65 hover:text-foreground transition-colors cursor-pointer"
            >
              <Maximize2 className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              aria-label="Reload preview"
              title="Reload preview"
              className="flex items-center justify-center rounded-lg bg-foreground/[0.04] p-1.5 text-foreground/65 hover:text-foreground transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={handleTogglePreviewTheme}
              aria-label={`Switch preview to ${previewTheme === "dark" ? "light" : "dark"} mode`}
              className="flex items-center justify-center rounded-lg bg-foreground/[0.04] p-1.5 text-foreground/65 hover:text-foreground transition-colors cursor-pointer"
            >
              {previewTheme === "dark" ? (
                <Moon className="size-3.5" />
              ) : (
                <Sun className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Inner Viewport */}
        <div
          role="tabpanel"
          className="rounded-md bg-background max-h-[880px] overflow-y-auto overflow-x-hidden flex justify-center border border-foreground/[0.06] [scrollbar-width:thin] [scrollbar-color:rgba(128,128,128,0.28)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/15 hover:[&::-webkit-scrollbar-thumb]:bg-foreground/30"
        >
          <motion.div
            key={reloadKey}
            initial={false}
            animate={{
              maxWidth:
                device === "mobile" ? 375 : device === "tablet" ? 768 : 1600,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.72, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "w-full",
              device !== "desktop" && "border-x border-foreground/[0.06]",
            )}
          >
            {activePage.render(previewTheme, handleTogglePreviewTheme)}
          </motion.div>
        </div>
      </div>

      {/* Everything Inside Section */}
      <AnimatedSectionTitle icon="package" id="everything-inside">
        Everything Inside
      </AnimatedSectionTitle>
      <p className="text-[15px] leading-[1.8] text-foreground/60 mt-0 mb-5">
        {whatYouGet.description}
      </p>

      <div className="not-prose rounded-lg bg-foreground/[0.03] p-1.5 mb-12">
        <div className="rounded-md bg-background p-5 sm:p-6 border border-foreground/[0.06]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50 mb-3">
            Built with
          </p>

          <ul className="flex flex-wrap gap-2 pb-6 border-b border-foreground/[0.06]">
            {whatYouGet.techStack.map((tech) => (
              <li
                key={tech.name}
                className="flex h-7 items-center gap-1.5 rounded-md border border-foreground/[0.08] bg-foreground/[0.03] px-2.5 text-[12px] font-medium whitespace-nowrap text-foreground/80"
              >
                <TechIcon iconKey={tech.iconKey} />
                <span>{tech.name}</span>
                {tech.version && (
                  <span className="text-[11px] font-normal text-foreground/45">
                    {tech.version}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {whatYouGet.features.map((feature, index) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-[14px] leading-relaxed text-foreground/75"
              >
                <AnimatedCheckbox index={index} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Included Screens Section */}
      {pagesOverview && (
        <>
          <AnimatedSectionTitle icon="layers" id="included-screens">
            Included Screens
          </AnimatedSectionTitle>
          <p className="text-[15px] leading-[1.8] text-foreground/60 mt-0 mb-5">
            {pagesOverview.subtitle}
          </p>

          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
            {pagesOverview.items.map((item) => {
              const targetIdx = pages.findIndex((p) => p.id === item.id);
              const isCurrent = targetIdx === activeIndex;
              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => {
                    if (targetIdx !== -1) {
                      setActiveIndex(targetIdx);
                      previewRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className={cn(
                    "group text-left rounded-lg border p-4 transition-all cursor-pointer",
                    isCurrent
                      ? "border-primary/35 bg-primary/[0.04]"
                      : "border-foreground/[0.08] bg-background hover:border-foreground/20 hover:bg-foreground/[0.02]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-sm bg-foreground/[0.05] px-2 py-0.5 font-mono text-[11px] text-foreground/60">
                      {item.path}
                    </span>
                    <span className="font-mono text-[11px] font-medium text-primary/75">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/60">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Choose Your Access Section */}
      {pricingSection && (
        <>
          <AnimatedSectionTitle icon="card" id="choose-your-access">
            Choose Your Access
          </AnimatedSectionTitle>
          <p className="text-[15px] leading-[1.8] text-foreground/60 mt-0 mb-5">
            {pricingSection.subtitle}
          </p>

          <div className="not-prose rounded-lg bg-foreground/[0.03] p-1.5 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {pricingSection.options.map((option) => (
                <div
                  key={option.label}
                  className={cn(
                    "relative flex flex-col justify-between rounded-lg p-6 sm:p-7 transition-colors",
                    option.featured
                      ? "bg-gradient-to-b from-primary/[0.05] via-background to-background border border-primary/25 shadow-[0_1px_3px_rgb(0_0_0/0.04)]"
                      : "bg-background border border-foreground/[0.06]",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground/60">
                        {option.label}
                      </span>
                      {option.badge && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border",
                            option.featured
                              ? "bg-primary/15 text-primary border-primary/25"
                              : "bg-foreground/[0.05] text-foreground/65 border-foreground/[0.08]",
                          )}
                        >
                          {option.featured && <Sparkles className="size-2.5" />}
                          {option.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-normal tracking-tight text-foreground">
                        {option.price}
                      </span>
                      {option.billingNote && (
                        <span className="text-[12px] text-foreground/45">
                          {option.billingNote}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-foreground/60">
                      {option.description}
                    </p>

                    {option.features && option.features.length > 0 && (
                      <ul className="mt-5 space-y-2.5 border-t border-foreground/[0.06] pt-5">
                        {option.features.map((feat, featIdx) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-[13px] leading-snug text-foreground/75"
                          >
                            <AnimatedCheckbox index={featIdx} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <a
                    href={option.ctaHref ?? "#"}
                    className={cn(
                      "mt-7 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md px-4 text-[13px] font-medium transition-all",
                      option.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                        : "border border-foreground/[0.1] bg-foreground/[0.03] text-foreground hover:bg-foreground/[0.06]",
                    )}
                  >
                    <span>{option.ctaLabel}</span>
                    {option.featured && <ArrowRight className="size-3.5" />}
                  </a>
                </div>
              ))}
            </div>
            <p className="px-3 py-2 text-center text-[11.5px] text-foreground/45">
              Instant download · No recurring subscription · Commercial license included
            </p>
          </div>
        </>
      )}

      {/* Quick Setup Section */}
      {afterYouBuy && (
        <>
          <AnimatedSectionTitle icon="terminal" id="quick-setup">
            Quick Setup
          </AnimatedSectionTitle>
          <p className="text-[15px] leading-[1.8] text-foreground/60 mt-0 mb-5">
            {afterYouBuy.subtitle}
          </p>

          <div className="not-prose rounded-lg bg-foreground/[0.03] p-1.5 mb-12">
            <div className="rounded-md bg-background border border-foreground/[0.06] p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#downloads"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-foreground/[0.1] bg-foreground/[0.03] px-3.5 text-[12px] font-medium text-foreground transition-colors hover:bg-foreground/[0.06]"
                >
                  Open my downloads
                </a>
                <a
                  href="#license"
                  className="text-[12px] font-medium text-foreground/55 hover:text-foreground transition-colors"
                >
                  License
                </a>
              </div>

              <ol className="space-y-2.5 text-[13px] leading-relaxed text-foreground/75">
                {afterYouBuy.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-[11px] font-semibold text-primary/75 pt-0.5 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="space-y-3">
                <Cli command="project-install" />
                <Cli command="project-dev" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Full Page Preview Overlay */}
      {isFullscreen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} full page preview`}
            className={cn(
              "not-prose fixed inset-0 z-50 flex flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(128,128,128,0.28)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/15 hover:[&::-webkit-scrollbar-thumb]:bg-foreground/30",
              previewTheme === "dark"
                ? "bg-[#0D0E12] text-zinc-100"
                : "bg-background",
            )}
          >
            <div
              className={cn(
                "sticky top-0 z-50 flex items-center justify-between gap-2 border-b backdrop-blur-[2px] px-4 py-2.5",
                previewTheme === "dark"
                  ? "border-white/[0.08] bg-[#0D0E12]/20"
                  : "border-foreground/[0.08] bg-background/5",
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 px-1" aria-hidden>
                  <span className="size-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
                  <span className="size-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
                  <span className="size-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10" />
                </div>
                <AnimatedUrlPill
                  domain={demoDomain}
                  path={activePage.path}
                  isDark={previewTheme === "dark"}
                />
                <div
                  className={cn(
                    "flex items-center gap-0.5 rounded-lg p-0.5",
                    previewTheme === "dark"
                      ? "bg-white/[0.06]"
                      : "bg-foreground/[0.04]",
                  )}
                >
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={!canPrev}
                    onClick={() => canPrev && setActiveIndex((i) => i - 1)}
                    className={cn(
                      "p-1 rounded-md disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
                      previewTheme === "dark"
                        ? "text-zinc-400 hover:text-white"
                        : "text-foreground/55 hover:text-foreground",
                    )}
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={!canNext}
                    onClick={() => canNext && setActiveIndex((i) => i + 1)}
                    className={cn(
                      "p-1 rounded-md disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
                      previewTheme === "dark"
                        ? "text-zinc-400 hover:text-white"
                        : "text-foreground/55 hover:text-foreground",
                    )}
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleTogglePreviewTheme}
                  aria-label={`Switch preview to ${previewTheme === "dark" ? "light" : "dark"} mode`}
                  className={cn(
                    "flex items-center justify-center rounded-lg p-1.5 transition-colors cursor-pointer",
                    previewTheme === "dark"
                      ? "bg-white/[0.06] text-zinc-300 hover:text-white"
                      : "bg-foreground/[0.04] text-foreground/65 hover:text-foreground",
                  )}
                >
                  {previewTheme === "dark" ? (
                    <Moon className="size-3.5" />
                  ) : (
                    <Sun className="size-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  aria-label="Close full page preview"
                  className={cn(
                    "flex items-center justify-center rounded-lg p-1.5 transition-colors cursor-pointer",
                    previewTheme === "dark"
                      ? "bg-white/[0.06] text-zinc-300 hover:text-white"
                      : "bg-foreground/[0.04] text-foreground/65 hover:text-foreground",
                  )}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div
              key={reloadKey}
              className="flex-1 w-full min-w-0"
            >
              {activePage.render(previewTheme, handleTogglePreviewTheme)}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
