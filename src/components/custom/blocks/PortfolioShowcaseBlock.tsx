"use client";

import React, { forwardRef, useCallback, useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { ImageWall, type ImageWallProps, type WallItem } from "./ImageWallBlock";
import { Modal } from "./ModalBlock";

export interface PortfolioItem extends WallItem {
  /** Project slug or unique identifier */
  slug?: string;
  /** Category or discipline (e.g. 'Brand Identity', 'Web Design', 'Mobile App') */
  category?: string;
  /** Comprehensive project description */
  description?: string;
  /** Client or organization name */
  client?: string;
  /** Year of creation or delivery */
  year?: string;
  /** Optional live URL or case study link */
  href?: string;
  /** Tags or keywords */
  tags?: string[];
  /** Detailed specifications or deliverables */
  specs?: Record<string, string>;
}

export interface PortfolioShowcaseProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onFocus" | "draggable">,
    Pick<
      ImageWallProps,
      | "columns"
      | "interval"
      | "intervalTime"
      | "order"
      | "zoom"
      | "mobileZoom"
      | "intro"
      | "onFocus"
      | "gap"
      | "stagger"
      | "draggable"
      | "drift"
      | "cardDim"
      | "highlightFocus"
      | "cardShadow"
    > {
  /** Visual presentation mode. Defaults to 'masonry-portfolio'. */
  variant?: "masonry-portfolio" | "fullscreen";
  /** The portfolio project cards shown on the canvas. */
  items?: PortfolioItem[];
  /** Whether clicking a portfolio item opens the interactive details modal. Defaults to true. */
  itemModal?: boolean;
  /** Callback fired when an item is clicked. */
  onItemClick?: (item: PortfolioItem, index: number) => void;
  /** Optional custom CTA button text in the details modal */
  ctaLabel?: string;
  /** Optional custom CTA button link in the details modal */
  ctaHref?: string;
}

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const MIDDLE = { x: 0.5, y: 0.5 };

export const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "fintech-aura",
    title: "Aura Fintech Banking",
    category: "Mobile App & Design System",
    client: "Aura Global Financial",
    year: "2026",
    description: "An ultra-modern mobile banking experience and comprehensive design system with real-time liquidity visualization, biometric security flows, and seamless multi-currency settlements.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg",
    tags: ["Mobile", "Fintech", "Design System"],
  },
  {
    slug: "minimal-studio",
    title: "Studio Arch Minimal",
    category: "Architecture & Editorial",
    client: "Atelier Architekten",
    year: "2026",
    description: "Monolithic editorial portfolio website for an international architectural studio, combining high-resolution spatial photography with smooth inertial gallery physics.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg",
    tags: ["Architecture", "Editorial", "Web Design"],
  },
  {
    slug: "lumina-health",
    title: "Lumina Telehealth AI",
    category: "Healthcare & AI Assistant",
    client: "Lumina Care Systems",
    year: "2025",
    description: "Intelligent diagnostic consultation and care booking workflow connecting patients to certified specialists with encrypted medical records and interactive appointment timeline.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg",
    tags: ["AI", "Healthcare", "Web App"],
  },
  {
    slug: "atelier-fashion",
    title: "Maison Haute Couture",
    category: "Luxury Fashion & Ecommerce",
    client: "Maison Parisienne",
    year: "2026",
    description: "Sensory runway collection showcase and high-converting ecommerce storefront with fluid magnetic carousels, lookbook moodboards, and bespoke checkout ergonomics.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg",
    tags: ["Fashion", "Ecommerce", "Creative"],
  },
  {
    slug: "cloud-metrics",
    title: "Pulse Cloud Observability",
    category: "Developer Tools & SaaS",
    client: "Pulse Metrics Inc",
    year: "2025",
    description: "Zero-latency Kubernetes cluster monitoring dashboard with live metrics telemetry, interactive topological dependency graphs, and predictive incident management.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg",
    tags: ["SaaS", "Dashboard", "DevTools"],
  },
  {
    slug: "sound-craft",
    title: "Sonic Spatial Experience",
    category: "Interactive Audio & WebGL",
    client: "Sonic Labs Zurich",
    year: "2026",
    description: "Immersive three-dimensional audio-reactive web landscape transforming organic sound frequencies into dynamic procedural light wave sculptures in real-time.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg",
    tags: ["WebGL", "Audio", "Interactive"],
  },
  {
    slug: "strata-billing",
    title: "Strata Revenue Infrastructure",
    category: "Fintech & Invoicing",
    client: "Strata Global Pay",
    year: "2026",
    description: "Enterprise billing automation engine featuring dynamic pricing matrices, localized VAT compliance, automated reconciliation, and beautiful customer invoices.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg",
    tags: ["Enterprise", "Billing", "Product"],
  },
  {
    slug: "honeycomb-grid",
    title: "Hive Neural Collaboration",
    category: "Productivity & Workspace",
    client: "Hive Technologies",
    year: "2025",
    description: "Hexagonal interconnected canvas for modern product teams, mapping user research insights, interface wireframes, and design components onto a shared spatial board.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg",
    tags: ["Collaboration", "Workspace", "Canvas"],
  },
  {
    slug: "chrono-schedule",
    title: "Chrono Calendar Intelligence",
    category: "Time Management & UI",
    client: "Chrono Labs",
    year: "2026",
    description: "Time-zone agnostic smart scheduling assistant with fluid calendar heatmaps, recurring event sync, and focus-time protection algorithms.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg",
    tags: ["Productivity", "Calendar", "UI Design"],
  },
  {
    slug: "orbit-gallery",
    title: "Orbital Digital Museum",
    category: "Cultural Arts & Exhibition",
    client: "Modern Art Foundation",
    year: "2026",
    description: "Circular spatial gallery presenting curated contemporary digital artwork, sculpture archives, and generative generative art with gyroscopic navigation.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg",
    tags: ["Museum", "Arts", "3D Gallery"],
  },
  {
    slug: "verve-commerce",
    title: "Verve Artisan Goods",
    category: "Brand & Direct-to-Consumer",
    client: "Verve Roasters",
    year: "2025",
    description: "Direct-to-consumer artisanal coffee subscription portal with roast date tracking, origin stories, and interactive tasting notes flavor profile matching.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg",
    tags: ["Ecommerce", "Branding", "D2C"],
  },
  {
    slug: "nexus-analytics",
    title: "Nexus Global Ledger",
    category: "Big Data & Visualization",
    client: "Nexus Capital",
    year: "2026",
    description: "High-density data grid platform capable of streaming hundreds of thousands of ledger records per second with GPU-accelerated filtering and pivot charting.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg",
    tags: ["Big Data", "Fintech", "Analytics"],
  },
];

export const PortfolioShowcase = forwardRef<HTMLElement, PortfolioShowcaseProps>(
  (
    {
      variant = "masonry-portfolio",
      items = DEFAULT_PORTFOLIO_ITEMS,
      columns,
      gap = 16,
      stagger = 72,
      interval = true,
      intervalTime = 5500,
      order = "shuffle",
      zoom = 1,
      mobileZoom = 0.5,
      intro,
      draggable = true,
      drift = false,
      cardDim = 1,
      highlightFocus = false,
      cardShadow = true,
      itemModal = true,
      onItemClick,
      onFocus,
      ctaLabel = "View Case Study",
      ctaHref = "#",
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [copiedLink, setCopiedLink] = useState(false);

    const handleItemClick = useCallback(
      (item: WallItem, index: number) => {
        const portfolioItem = item as PortfolioItem;
        if (onItemClick) {
          onItemClick(portfolioItem, index);
        }
        if (itemModal) {
          setSelectedItem(portfolioItem);
        }
      },
      [itemModal, onItemClick],
    );

    const activeProject = selectedItem ?? items[0];

    return (
      <>
        <section
          ref={ref}
          className={cn(
            "relative w-full h-[520px] sm:h-[640px] lg:h-[760px] overflow-hidden bg-background text-foreground select-none",
            className,
          )}
          {...props}
        >
          {/* Multi-tiered 3D convex dome cushion underneath the cards in center */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0"
            aria-hidden
          >
            {/* Ambient diffuse primary aura around the base */}
            <div
              className="absolute w-[980px] max-w-[96vw] h-[640px] rounded-full blur-3xl opacity-75 dark:opacity-45"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, color-mix(in oklab, var(--primary) 8%, transparent) 55%, transparent 75%)",
              }}
            />

            {/* Base Tier 1: Outer mound rim with 3D elevation shadow */}
            <div
              className="absolute w-[880px] max-w-[94vw] h-[550px] rounded-full border border-foreground/[0.08] dark:border-white/[0.09] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.14),inset_0_1px_2px_rgba(255,255,255,0.7)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(255,255,255,0.15)]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--card) 92%, white) 0%, color-mix(in oklab, var(--card) 65%, var(--background)) 55%, color-mix(in oklab, var(--background) 90%, transparent) 85%, transparent 100%)",
              }}
            />

            {/* Mid Tier 2: Rising dome slope ring */}
            <div
              className="absolute w-[640px] max-w-[80vw] h-[400px] rounded-full border border-foreground/[0.10] dark:border-white/[0.12] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.16),inset_0_2px_4px_rgba(255,255,255,0.85)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.2)]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 36%, color-mix(in oklab, var(--card) 98%, white) 0%, color-mix(in oklab, var(--card) 80%, white) 45%, color-mix(in oklab, var(--primary) 12%, transparent) 80%, transparent 100%)",
              }}
            />

            {/* Apex Tier 3: Center crest / peak */}
            <div
              className="absolute w-[400px] max-w-[58vw] h-[250px] rounded-full border border-foreground/[0.12] dark:border-white/[0.16] shadow-[0_14px_35px_-6px_rgba(0,0,0,0.18),inset_0_2px_6px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_35px_-6px_rgba(0,0,0,0.75),inset_0_2px_6px_rgba(255,255,255,0.25)]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, color-mix(in oklab, var(--card) 99%, white) 0%, color-mix(in oklab, var(--card) 88%, white) 50%, color-mix(in oklab, var(--primary) 18%, transparent) 85%, transparent 100%)",
              }}
            />

            {/* Specular light glint at top-center of the dome peak */}
            <div
              className="absolute -translate-y-8 w-[220px] h-[95px] rounded-full blur-md opacity-80 dark:opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, color-mix(in oklab, var(--primary) 30%, white) 45%, transparent 75%)",
              }}
            />
          </div>

          {/* Continuous Infinite Drag Canvas */}
          <ImageWall
            columns={columns}
            gap={gap}
            stagger={stagger}
            interval={interval}
            intervalTime={intervalTime}
            order={order}
            zoom={zoom}
            mobileZoom={mobileZoom}
            items={items}
            intro={intro}
            anchor={MIDDLE}
            onFocus={onFocus}
            onItemClick={handleItemClick}
            draggable={draggable}
            drift={drift}
            cardDim={cardDim}
            highlightFocus={highlightFocus}
            cardShadow={cardShadow}
            className="relative z-10 size-full [mask-image:radial-gradient(ellipse_78%_68%_at_50%_50%,black_45%,rgba(0,0,0,0.85)_75%,transparent_100%)]"
          />

          {/* 4-sided smooth perimeter vignette */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-40 bg-gradient-to-b from-background via-background/85 to-transparent z-20" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-background via-background/85 to-transparent z-20" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background via-background/85 to-transparent z-20" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background via-background/85 to-transparent z-20" aria-hidden />
        </section>

        {/* Interactive Portfolio Details Modal */}
        {itemModal && (
          <Modal
            isOpen={Boolean(selectedItem)}
            onClose={() => setSelectedItem(null)}
            variant="custom"
            contentClassName="max-w-4xl w-full p-0 overflow-hidden bg-background border border-border rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col"
            ariaLabel={activeProject ? `${activeProject.title} Showcase` : "Portfolio Project"}
          >
            {activeProject && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-y-auto w-full flex-1">
                {/* Left Column: Visual Card Preview */}
                <div className="relative flex flex-col justify-center p-4 sm:p-6 md:p-8 bg-muted/30 border-b md:border-b-0 md:border-r border-border/80 w-full">
                  <div className="relative z-10 w-full flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between px-1 mb-2.5">
                      <span className="font-mono text-sm sm:text-base font-semibold text-foreground truncate">
                        {activeProject.title}
                      </span>
                      {activeProject.year && (
                        <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-muted border border-border/60">
                          {activeProject.year}
                        </span>
                      )}
                    </div>

                    <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/20 p-1 sm:p-2">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[400px] object-contain rounded-lg select-none pointer-events-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 px-1 text-xs text-muted-foreground font-mono">
                      <span className="truncate">portfolio/{activeProject.slug ?? kebab(activeProject.title)}</span>
                      <span className="text-[11px] font-sans font-medium text-primary">Featured Work</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Full Details & Project Metadata */}
                <div className="flex flex-col justify-between p-5 sm:p-7 md:p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {activeProject.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          {activeProject.category}
                        </span>
                      )}
                      {activeProject.client && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                          {activeProject.client}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        {activeProject.title}
                      </h2>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                        {activeProject.description ??
                          "A premier digital creation showcasing meticulous craftsmanship, modern responsive UI design, and fluid interactive animations engineered for maximum impact."}
                      </p>
                    </div>

                    {/* Project Specifications Grid */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[11px] text-muted-foreground font-medium">Client</div>
                        <div className="text-xs font-semibold text-foreground mt-0.5 truncate">
                          {activeProject.client ?? "Confidential Client"}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[11px] text-muted-foreground font-medium">Timeline</div>
                        <div className="text-xs font-semibold text-foreground mt-0.5">
                          {activeProject.year ? `Released ${activeProject.year}` : "Current Release"}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[11px] text-muted-foreground font-medium">Discipline</div>
                        <div className="text-xs font-semibold text-foreground mt-0.5 truncate">
                          {activeProject.category ?? "Design & Engineering"}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                        <div className="text-[11px] text-muted-foreground font-medium">Deliverables</div>
                        <div className="text-xs font-semibold text-foreground mt-0.5 truncate">
                          Full UI / UX & Production Code
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {activeProject.tags && activeProject.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-foreground/[0.04] text-foreground/75 border border-foreground/[0.06]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                      <div className="w-full sm:flex-1 flex [&>div]:w-full [&>div>button]:w-full [&>button]:w-full">
                        <Button
                          variant="default"
                          size="default"
                          onClick={(e) => {
                            e.preventDefault();
                            if (activeProject.href && activeProject.href !== "#") {
                              window.open(activeProject.href, "_blank", "noopener,noreferrer");
                            }
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
                          }}
                          iconLeft={<Mail size={15} />}
                          className="w-full font-medium"
                        >
                          Inquire / Contact
                        </Button>
                      </div>
                    </div>

                    {/* Share / Identifier Bar */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-[11px] sm:text-xs font-mono text-muted-foreground w-full">
                      <span className="truncate">project/{activeProject.slug ?? kebab(activeProject.title)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const url = typeof window !== "undefined" ? window.location.href : "";
                          if (url) {
                            navigator.clipboard.writeText(`${url}#${activeProject.slug ?? kebab(activeProject.title)}`);
                            setCopiedLink(true);
                            setTimeout(() => setCopiedLink(false), 2000);
                          }
                        }}
                        className="shrink-0 ml-2 hover:text-foreground cursor-pointer flex items-center gap-1"
                        title="Copy project reference"
                      >
                        {copiedLink ? (
                          <Check size={13} className="text-emerald-500" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        )}
      </>
    );
  },
);

PortfolioShowcase.displayName = "PortfolioShowcase";
