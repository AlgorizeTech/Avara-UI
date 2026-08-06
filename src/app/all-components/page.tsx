"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Boxes,
  Sparkles,
  LayoutTemplate,
  Search,
  Check,
  Bot,
  Compass,
  BarChart3,
  Lock,
  Terminal,
  Code2,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   PREVIEW CARD DATA MODEL & ITEMS
   ═══════════════════════════════════════════════ */

type PreviewCardItem = {
  title: string;
  countText: string;
  href: string;
  badge?: string;
  illustrationType: string;
};

type PreviewCategoryGroup = {
  categoryTitle: string;
  categorySubtitle: string;
  icon: any;
  items: PreviewCardItem[];
};

const componentPreviewData: PreviewCategoryGroup[] = [
  {
    categoryTitle: "Ui Components",
    categorySubtitle: "Essential primitive building blocks for clean, high-performance web applications.",
    icon: Boxes,
    items: [
      { title: "Avatar", countText: "User Profile Badge", href: "/docs/nextjs/avatar", illustrationType: "avatar" },
      { title: "Accordion", countText: "Expandable Panels", href: "/docs/nextjs/accordion", illustrationType: "accordion" },
      { title: "Alert", countText: "Notification Banners", href: "/docs/nextjs/alert", illustrationType: "modal" },
      { title: "Ai-Chat", countText: "Streaming Interface", href: "/docs/nextjs/ai-chat", illustrationType: "chat" },
      { title: "Api Playground", countText: "API Tester", href: "/docs/nextjs/api-playground", badge: "New", illustrationType: "api-playground" },
      { title: "Breadcrumb", countText: "Path Navigation", href: "/docs/nextjs/breadcrumb", illustrationType: "breadcrumb" },
      { title: "Modern Buttons", countText: "5+ Action Styles", href: "/docs/nextjs/button", illustrationType: "button" },
      { title: "Card", countText: "Content Containers", href: "/docs/nextjs/card", illustrationType: "card" },
      { title: "Chart", countText: "SVG Data Viz", href: "/docs/nextjs/chart", illustrationType: "chart" },
      { title: "Carousel", countText: "Slide Showcase", href: "/docs/nextjs/carousel", illustrationType: "carousel" },
      { title: "Counter", countText: "Animated Numbers", href: "/docs/nextjs/counter", illustrationType: "counter" },
      { title: "Command", countText: "Cmd+K Palette", href: "/docs/nextjs/command", illustrationType: "command" },
      { title: "Calendar", countText: "Date Picker Grid", href: "/docs/nextjs/calendar", illustrationType: "calendar" },
      { title: "Chat", countText: "Messaging Feed", href: "/docs/nextjs/chat", illustrationType: "chat" },
      { title: "Cart", countText: "E-commerce Drawer", href: "/docs/nextjs/cart", illustrationType: "cart" },
      { title: "Collapsible", countText: "Toggle Content", href: "/docs/nextjs/collapsible", illustrationType: "collapsible" },
      { title: "ContextMenu", countText: "Right Click Menu", href: "/docs/nextjs/context-menu", illustrationType: "context-menu" },
      { title: "Drawer", countText: "Slideover Sheet", href: "/docs/nextjs/drawer", illustrationType: "drawer" },
      { title: "Dialog", countText: "Modal Dialog", href: "/docs/nextjs/dialog", illustrationType: "dialog" },
      { title: "Data Grid", countText: "Advanced Grid", href: "/docs/nextjs/data-grid", badge: "New", illustrationType: "data-grid" },
      { title: "Data Table", countText: "Sortable Table", href: "/docs/nextjs/data-table", badge: "New", illustrationType: "data-table" },
      { title: "Date Picker", countText: "Calendar Input", href: "/docs/nextjs/date-picker", illustrationType: "date-picker" },
      { title: "Form", countText: "Validated Forms", href: "/docs/nextjs/form", illustrationType: "form" },
      { title: "Input", countText: "Text & Fields", href: "/docs/nextjs/input", illustrationType: "input" },
      { title: "Item", countText: "List Items", href: "/docs/nextjs/item", illustrationType: "item" },
      { title: "Invoice", countText: "Billing Paper", href: "/docs/nextjs/invoice", illustrationType: "invoice" },
      { title: "Kbd", countText: "Key Badges", href: "/docs/nextjs/kbd", illustrationType: "kbd" },
      { title: "Mails", countText: "Inbox Feed", href: "/docs/nextjs/email", illustrationType: "mails" },
      { title: "Map", countText: "Fleet Tracker Map", href: "/docs/nextjs/fleet-tracker", illustrationType: "map" },
      { title: "Menubar", countText: "Top App Navigation", href: "/docs/nextjs/menubar", illustrationType: "menubar" },
      { title: "Modal", countText: "Overlays & Popups", href: "/docs/nextjs/modal", illustrationType: "modal" },
      { title: "Navigation", countText: "Responsive Header", href: "/docs/nextjs/navigation", illustrationType: "navbar" },
      { title: "OTP Input", countText: "Verification Code", href: "/docs/nextjs/otp-input", illustrationType: "otp-input" },
      { title: "Popover", countText: "Context Popup", href: "/docs/nextjs/popover", illustrationType: "popover" },
      { title: "Progress", countText: "Loading Bars", href: "/docs/nextjs/progress", illustrationType: "progress" },
      { title: "Resizable", countText: "Split Panels", href: "/docs/nextjs/resizable", illustrationType: "resizable" },
      { title: "Loader", countText: "Spinners & Pulse", href: "/docs/nextjs/loader", illustrationType: "loader" },
      { title: "Sonner", countText: "Toast Stream", href: "/docs/nextjs/sonner", illustrationType: "sonner" },
      { title: "Stepper", countText: "Wizard Flow", href: "/docs/nextjs/stepper", illustrationType: "stepper" },
      { title: "Select", countText: "Dropdown Menu", href: "/docs/nextjs/select", illustrationType: "select" },
      { title: "Scroll Area", countText: "Custom Scrollbar", href: "/docs/nextjs/scroll-area", illustrationType: "scroll-area" },
      { title: "Skeleton", countText: "Shimmer States", href: "/docs/nextjs/skeleton", illustrationType: "skeleton" },
      { title: "Toast", countText: "Popup Alert", href: "/docs/nextjs/toast", illustrationType: "toast" },
      { title: "Toggle", countText: "Switch Button", href: "/docs/nextjs/toggle", illustrationType: "toggle" },
      { title: "Table", countText: "Data Layout", href: "/docs/nextjs/table", illustrationType: "table" },
      { title: "Tooltip", countText: "Hover Labels", href: "/docs/nextjs/tooltip", illustrationType: "tooltip" },
      { title: "Toggle Group", countText: "Segmented Control", href: "/docs/nextjs/toggle-group", illustrationType: "toggle-group" },
      { title: "Timeline", countText: "History Feed", href: "/docs/nextjs/timeline", illustrationType: "timeline" },
      { title: "Terminal", countText: "Dev Console", href: "/docs/nextjs/terminal", illustrationType: "terminal" },
      { title: "Typography", countText: "Headings & Text", href: "/docs/nextjs/typography", illustrationType: "typography" },
      { title: "Pagination", countText: "Page Controls", href: "/docs/nextjs/pagination", illustrationType: "pagination" },
      { title: "Tabs", countText: "Vertical & Horizontal", href: "/docs/nextjs/vertical-tabs", illustrationType: "tabs" },
      { title: "Theme Switcher", countText: "Light/Dark Toggle", href: "/docs/nextjs/theme-switcher", badge: "New", illustrationType: "theme-switcher" },
      { title: "Wizard", countText: "Multi-Step Form", href: "/docs/nextjs/wizard", badge: "New", illustrationType: "wizard" },
      { title: "Masonry Grid", countText: "Staggered Layout", href: "/docs/nextjs/masonry-grid", badge: "New", illustrationType: "masonry" },
      { title: "QR Code", countText: "QR Generator", href: "/docs/nextjs/qr-code-generator", badge: "New", illustrationType: "qr" },
      { title: "Data Maps", countText: "Vector Map Analytics", href: "/docs/nextjs/data-maps", badge: "New", illustrationType: "data-maps" },
      { title: "Hero VideoPlayer", countText: "Action Video Hero", href: "/docs/nextjs/hero-video-player", badge: "New", illustrationType: "hero-videoplayer" },
      { title: "Verify Badge", countText: "Trust Badge", href: "/docs/nextjs/verify-badge", badge: "New", illustrationType: "verify-badge" },
      { title: "Mobile Mockups", countText: "Device Frame", href: "/docs/nextjs/mobile-mockup", badge: "New", illustrationType: "mobile-mockup" },
      { title: "Half Stars", countText: "Rating Stars", href: "/docs/nextjs/half-stars", badge: "New", illustrationType: "half-stars" },
      { title: "Custom Code Block", countText: "Code Highlighter", href: "/docs/nextjs/custom-code-block", badge: "New", illustrationType: "code-block" },
    ],
  },
  {
    categoryTitle: "Animated Ui Components",
    categorySubtitle: "Fluid, interactive components powered by Framer Motion & spring physics.",
    icon: Sparkles,
    items: [
      { title: "Chat Bubble", countText: "Spring Motion Feed", href: "/docs/nextjs/chat-bubble", illustrationType: "chat" },
      { title: "Dock", countText: "macOS Magnification", href: "/docs/nextjs/dock", badge: "New", illustrationType: "dock" },
      { title: "Typography", countText: "Animated Text", href: "/docs/nextjs/animated-typography", illustrationType: "typography" },
      { title: "File Upload", countText: "Drag & Drop Motion", href: "/docs/nextjs/file-upload", illustrationType: "file-upload" },
      { title: "3D Carousel", countText: "3D Physics Spring", href: "/docs/nextjs/3d-carousel", illustrationType: "carousel" },
      { title: "Memories Card", countText: "Stackable Cards", href: "/docs/nextjs/memories-card", illustrationType: "memories-card" },
      { title: "Timeline", countText: "Animated History", href: "/docs/nextjs/animated-timeline", illustrationType: "timeline" },
      { title: "Tilted Card", countText: "3D Parallax Tilt", href: "/docs/nextjs/tilted-card", illustrationType: "tilted-card" },
      { title: "Animated List", countText: "Staggered Entrance", href: "/docs/nextjs/animated-list", illustrationType: "animated-list" },
      { title: "Scroll Stack", countText: "Stacking Cards", href: "/docs/nextjs/scroll-stack", illustrationType: "scroll-stack" },
      { title: "Magic Bento", countText: "Glow & Tilt Grid", href: "/docs/nextjs/magic-bento", illustrationType: "magic-bento" },
      { title: "Video Accordion", countText: "Interactive Media", href: "/docs/nextjs/video-accordion", illustrationType: "video-accordion" },
      { title: "Network Graph", countText: "Node Graph Canvas", href: "/docs/nextjs/network-graph", badge: "New", illustrationType: "network-graph" },
      { title: "Floating ContactButton", countText: "Animated Action", href: "/docs/nextjs/floating-contact-button", badge: "New", illustrationType: "floating-contact" },
    ],
  },
  {
    categoryTitle: "Website Sections",
    categorySubtitle: "Production-ready full section blocks for landing pages and SaaS platforms.",
    icon: LayoutTemplate,
    items: [
      { title: "Navbar", countText: "Responsive Header", href: "/docs/nextjs/navbar", badge: "Core", illustrationType: "navbar" },
      { title: "Sign-Up", countText: "Glassmorphic Form", href: "/docs/nextjs/signup-form", badge: "Core", illustrationType: "auth" },
      { title: "Hero", countText: "Landing Page Showcase", href: "/docs/nextjs/hero", badge: "New", illustrationType: "hero" },
      { title: "Marquee", countText: "Infinite Logo Ticker", href: "/docs/nextjs/marquee", badge: "New", illustrationType: "marquee" },
      { title: "Pricing Section", countText: "Tier & Feature Matrix", href: "/docs/nextjs/pricing", badge: "Core", illustrationType: "pricing" },
      { title: "Sidebar Section", countText: "App Shell Layout", href: "/docs/nextjs/sidebar", badge: "New", illustrationType: "sidebar" },
      { title: "Support Dashboard", countText: "Full SaaS Dashboard", href: "/docs/nextjs/support-dashboard", badge: "Core", illustrationType: "dashboard" },
    ],
  },
];

function CardHeaderMockup({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
      <div className="flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
        <span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
        <span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
      </div>
      <span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">
        {title.toLowerCase().replace(/\s+/g, "-")}.tsx
      </span>
      <div className="size-2 rounded-full bg-primary/40" />
    </div>
  );
}

function MiniatureIllustration({ title, type }: { title: string; type: string }) {
  return (
    <div className="w-full h-full rounded-xl border border-border/60 bg-gradient-to-b from-card to-muted/30 p-2.5 flex flex-col justify-between overflow-hidden shadow-xs relative group-hover:border-primary/50 transition-colors">
      <CardHeaderMockup title={title} />

      <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden">
        {type === "hero" && (
          <div className="w-full text-center space-y-1.5 px-1 my-auto">
            <span className="inline-block px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-bold border border-primary/20">
              Next.js 15
            </span>
            <div className="text-[11px] font-black tracking-tight text-foreground leading-tight">
              Build Next-Gen UI
            </div>
            <div className="flex justify-center gap-1 pt-0.5">
              <span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[8px] font-bold shadow-xs">
                Get Started
              </span>
              <span className="px-2 py-0.5 rounded border border-border text-[8px] font-bold text-foreground">
                Docs
              </span>
            </div>
          </div>
        )}

        {type === "pricing" && (
          <div className="w-full flex flex-col justify-between my-auto space-y-1 px-0.5">
            <div className="mx-auto px-1.5 py-0.5 rounded-full bg-muted border border-border/60 flex items-center gap-0.5 text-[6px]">
              <span className="font-bold text-primary px-1 rounded-full bg-background shadow-2xs">Monthly</span>
              <span className="text-muted-foreground font-semibold">Annual</span>
            </div>
            <div className="w-full flex items-center justify-between gap-1 pt-0.5">
              <div className="flex-1 p-1 rounded-md border border-border/80 bg-background text-center space-y-0.5 min-w-0">
                <div className="text-[6px] font-bold text-muted-foreground truncate">Free</div>
                <div className="text-[8px] font-black text-foreground">$0</div>
                <div className="h-1.5 w-full rounded bg-muted text-[5px] font-bold text-muted-foreground flex items-center justify-center">Free</div>
              </div>
              <div className="flex-1 p-1 rounded-md border border-primary bg-primary/10 text-center space-y-0.5 shadow-2xs relative min-w-0">
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[4px] font-black px-0.5 rounded bg-primary text-primary-foreground whitespace-nowrap">HOT</span>
                <div className="text-[6px] font-black text-primary truncate">Pro</div>
                <div className="text-[8px] font-black text-primary">$29</div>
                <div className="h-1.5 w-full rounded bg-primary text-[5px] font-bold text-primary-foreground flex items-center justify-center shadow-2xs">Pro</div>
              </div>
              <div className="flex-1 p-1 rounded-md border border-border/80 bg-background text-center space-y-0.5 min-w-0">
                <div className="text-[6px] font-bold text-muted-foreground truncate">Enterprise</div>
                <div className="text-[8px] font-black text-foreground">$99</div>
                <div className="h-1.5 w-full rounded bg-muted text-[5px] font-bold text-muted-foreground flex items-center justify-center">VIP</div>
              </div>
            </div>
          </div>
        )}

        {type === "chart" && (
          <div className="w-full h-full flex flex-col justify-between py-1 relative">
            <div className="flex justify-between items-center text-[7.5px] font-bold text-muted-foreground px-1 z-10">
              <span>Revenue Stream</span>
              <span className="text-emerald-500 font-extrabold">+34.2%</span>
            </div>
            <div className="w-full h-12 relative my-auto">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="allChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 35 Q 25 5, 50 20 T 100 5 L 100 40 L 0 40 Z"
                  fill="url(#allChartGrad)"
                />
                <path
                  d="M 0 35 Q 25 5, 50 20 T 100 5"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                />
                <circle cx="50" cy="20" r="2.5" className="fill-primary stroke-background stroke-2" />
                <circle cx="100" cy="5" r="2.5" className="fill-emerald-500 stroke-background stroke-2" />
              </svg>
            </div>
          </div>
        )}

        {type === "dock" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="px-2.5 py-1.5 rounded-2xl bg-background border border-border/80 shadow-md flex items-end gap-1.5">
              <div className="size-4 rounded-lg bg-rose-500/80 flex items-center justify-center text-[7px] text-white font-bold">A</div>
              <div className="size-4 rounded-lg bg-amber-500/80 flex items-center justify-center text-[7px] text-white font-bold">B</div>
              <div className="size-5 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-[9px] font-bold shadow-sm -translate-y-1">★</div>
              <div className="size-4 rounded-lg bg-emerald-500/80 flex items-center justify-center text-[7px] text-white font-bold">C</div>
            </div>
          </div>
        )}

        {type === "navbar" && (
          <div className="w-full my-auto px-0.5">
            <div className="w-full p-1.5 rounded-xl bg-background border border-border/80 flex items-center justify-between shadow-xs px-2.5">
              <div className="flex items-center gap-1.5 text-[8.5px] font-black text-foreground">
                <span className="size-2 rounded bg-primary" />
                <span>DocsUI</span>
              </div>
              <div className="flex items-center gap-2 text-[7px] font-bold text-muted-foreground">
                <span>Features</span>
                <span>Docs</span>
                <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold text-[6.5px]">Login</span>
              </div>
            </div>
          </div>
        )}

        {type === "modal" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="w-4/5 p-2 rounded-xl bg-background border border-border shadow-lg space-y-1.5">
              <div className="flex justify-between items-center border-b border-border/40 pb-0.5">
                <span className="text-[9px] font-bold text-foreground">Modal Dialog</span>
                <span className="text-[8px] text-muted-foreground">✕</span>
              </div>
              <div className="text-[7px] text-muted-foreground">Confirm action step?</div>
              <div className="flex justify-end gap-1 pt-0.5">
                <div className="px-1.5 py-0.5 rounded bg-muted text-[6px] text-muted-foreground font-bold">Cancel</div>
                <div className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[6px] font-bold shadow-xs">Confirm</div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback layout representation */}
        {type !== "hero" && type !== "pricing" && type !== "chart" && type !== "dock" && type !== "navbar" && type !== "modal" && (
          <div className="w-full h-full flex flex-col justify-between p-1 my-auto">
            <div className="flex justify-between items-center border-b border-border/40 pb-1">
              <span className="text-[9px] font-extrabold text-foreground">{title}</span>
              <span className="size-2 rounded-full bg-primary" />
            </div>
            <div className="space-y-1 my-auto">
              <div className="h-1.5 w-3/4 rounded bg-primary/20" />
              <div className="h-1.5 w-1/2 rounded bg-muted-foreground/30" />
            </div>
            <div className="h-3 w-full rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[7px] font-bold text-primary">
              Interactive Preview
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Ui Components", "Animated Ui Components", "Website Sections"];

  const filteredGroups = componentPreviewData
    .map((group) => {
      if (selectedCategory !== "All" && group.categoryTitle !== selectedCategory) {
        return null;
      }
      const matchingItems = group.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.countText.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingItems.length === 0) return null;

      return {
        ...group,
        items: matchingItems,
      };
    })
    .filter(Boolean) as PreviewCategoryGroup[];

  const totalCount = componentPreviewData.reduce((acc, curr) => acc + curr.items.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1380px] mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary shadow-xs">
            <LayoutGrid className="size-4 text-primary" />
            <span>Complete Component Catalog ({totalCount}+)</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            All Reusable Components & Sections
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Browse our entire collection of production-ready React components, animated motion primitives, and full website section blocks.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="sticky top-[60px] z-30 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-background/95 dark:bg-card/95 backdrop-blur-xl shadow-md transition-all">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Cards List */}
        <div className="space-y-12">
          {filteredGroups.length === 0 ? (
            <div className="py-20 text-center space-y-3 border border-dashed border-border rounded-2xl bg-card/30">
              <Search className="size-8 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-bold text-foreground">No components found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No components matched your search query &quot;{searchQuery}&quot;. Try adjusting your search term.
              </p>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.categoryTitle} className="space-y-6">
                {/* Group Header */}
                <div className="pb-3 border-b border-border/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs shrink-0">
                      <group.icon className="size-4.5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                        {group.categoryTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {group.categorySubtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shrink-0">
                    {group.items.length} Items
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {group.items.map((item) => (
                    <Link key={item.title} href={item.href} className="group block rounded-2xl">
                      <div className="rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 flex flex-col h-full justify-between overflow-hidden">
                        {/* Card Thumbnail / Illustration */}
                        <div className="w-full h-36 rounded-xl mb-4 overflow-hidden relative">
                          <MiniatureIllustration title={item.title} type={item.illustrationType} />
                          {item.badge && (
                            <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Card Title & Info */}
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                              {item.countText}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
