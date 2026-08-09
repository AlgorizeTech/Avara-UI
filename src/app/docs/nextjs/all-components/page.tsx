"use client";

import React from "react";
import Link from "next/link";
import {
  Boxes,
  Sparkles,
  LayoutTemplate,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   PREVIEW CARD DATA MODEL & ITEMS (EXACT HOMEPAGE DATA)
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
      { title: "User Graph", countText: "User Hierarchy Tree", href: "/docs/nextjs/user-graph", badge: "New", illustrationType: "user-graph" },
      { title: "Network Graph", countText: "Concentric User Rings", href: "/docs/nextjs/network-graph", illustrationType: "network-graph" },
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
    <div className="w-full h-full rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-primary/50 transition-colors">
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
                  <linearGradient id="docsAllChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 35 Q 25 5, 50 20 T 100 5 L 100 40 L 0 40 Z"
                  fill="url(#docsAllChartGrad)"
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

        {type === "table" && (
          <div className="w-full space-y-1 my-auto text-[8px] font-mono">
            <div className="flex items-center justify-between border-b border-border/60 pb-0.5 font-bold text-primary">
              <span>Name</span>
              <span>Status</span>
            </div>
            <div className="flex items-center justify-between text-foreground">
              <span>Button.tsx</span>
              <span className="text-emerald-500 font-bold">Ready</span>
            </div>
            <div className="flex items-center justify-between text-foreground">
              <span>Card.tsx</span>
              <span className="text-emerald-500 font-bold">Ready</span>
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
                <span className="px-1.5 py-0.5 rounded bg-muted text-[7px] font-bold">Cancel</span>
                <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[7px] font-bold">Confirm</span>
              </div>
            </div>
          </div>
        )}

        {type === "stepper" && (
          <div className="w-full space-y-2 my-auto px-1">
            <div className="flex items-center justify-between">
              <span className="size-3.5 rounded-full bg-primary text-[7px] text-primary-foreground font-black flex items-center justify-center">1</span>
              <div className="h-0.5 flex-1 bg-primary mx-1" />
              <span className="size-3.5 rounded-full bg-primary text-[7px] text-primary-foreground font-black flex items-center justify-center">2</span>
              <div className="h-0.5 flex-1 bg-muted-foreground/30 mx-1" />
              <span className="size-3.5 rounded-full bg-muted border border-border text-[7px] text-muted-foreground font-bold flex items-center justify-center">3</span>
            </div>
            <div className="text-center text-[8px] font-bold text-foreground">Step 2: Configuration</div>
          </div>
        )}

        {type === "chat" && (
          <div className="w-full space-y-1.5 my-auto text-[7px]">
            <div className="p-1 rounded-lg bg-muted text-foreground max-w-[80%]">
              Hello! How can I help?
            </div>
            <div className="p-1 rounded-lg bg-primary text-primary-foreground max-w-[80%] ml-auto font-medium">
              Show component docs!
            </div>
          </div>
        )}

        {type === "auth" && (
          <div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border shadow-xs space-y-1.5 text-center my-auto">
            <div className="text-[8px] font-bold text-foreground">Sign In</div>
            <div className="h-3 w-full bg-muted border border-border rounded flex items-center px-1 text-[7px] text-muted-foreground">email@app.com</div>
            <div className="h-3 w-full bg-primary text-primary-foreground font-bold rounded flex items-center justify-center text-[7px]">Submit</div>
          </div>
        )}

        {type === "carousel" && (
          <div className="w-full flex items-center justify-between gap-1 my-auto px-0.5">
            <div className="size-4 rounded-full bg-muted border border-border text-[7px] font-black text-muted-foreground flex items-center justify-center shrink-0">‹</div>
            <div className="flex-1 h-14 rounded-xl bg-background border border-primary/50 p-1.5 shadow-sm flex flex-col justify-between items-center text-center">
              <span className="text-[7.5px] font-extrabold text-primary">Slide 02</span>
              <div className="flex gap-1">
                <span className="size-1 rounded-full bg-primary/40" />
                <span className="size-1 rounded-full bg-primary" />
                <span className="size-1 rounded-full bg-primary/40" />
              </div>
            </div>
            <div className="size-4 rounded-full bg-muted border border-border text-[7px] font-black text-muted-foreground flex items-center justify-center shrink-0">›</div>
          </div>
        )}

        {type === "card" && (
          <div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border/80 shadow-xs space-y-1.5 my-auto">
            <div className="h-7 w-full bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">Card View</div>
            <div className="h-1.5 w-3/4 bg-foreground/80 rounded" />
            <div className="h-1 w-1/2 bg-muted-foreground/40 rounded" />
          </div>
        )}

        {type === "counter" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="px-3 py-2 rounded-xl bg-background border border-border shadow-xs flex items-center gap-2">
              <span className="size-4 rounded bg-muted border border-border font-black text-[9px] flex items-center justify-center text-foreground">-</span>
              <span className="text-sm font-black text-primary px-1">99+</span>
              <span className="size-4 rounded bg-primary text-primary-foreground font-black text-[9px] flex items-center justify-center">+</span>
            </div>
          </div>
        )}

        {type === "cart" && (
          <div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border shadow-xs space-y-1.5 my-auto text-[7px]">
            <div className="flex justify-between items-center font-bold text-foreground border-b border-border pb-0.5">
              <span>Shopping Cart</span>
              <span className="text-primary">2 Items</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Next UI Kit</span>
              <span className="font-bold text-foreground">$49</span>
            </div>
            <div className="h-3 w-full bg-primary text-primary-foreground font-bold rounded flex items-center justify-center text-[7px]">Checkout</div>
          </div>
        )}

        {type === "item" && (
          <div className="w-full space-y-1.5 my-auto px-1">
            <div className="p-1.5 rounded-lg bg-background border border-border flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-[8px] font-bold text-foreground">Item Component</span>
              </div>
              <span className="text-[7px] text-muted-foreground">→</span>
            </div>
          </div>
        )}

        {type === "resizable" && (
          <div className="w-full h-full flex gap-1.5 p-1 my-auto">
            <div className="w-1/2 h-full rounded-lg bg-background border border-border p-1 flex flex-col justify-center items-center">
              <span className="text-[7px] font-bold text-muted-foreground">Left</span>
            </div>
            <div className="w-1 h-full rounded bg-primary/40 my-auto cursor-col-resize" />
            <div className="w-1/2 h-full rounded-lg bg-background border border-border p-1 flex flex-col justify-center items-center">
              <span className="text-[7px] font-bold text-muted-foreground">Right</span>
            </div>
          </div>
        )}

        {type === "scroll-area" && (
          <div className="w-full h-full p-1.5 rounded-lg bg-background border border-border flex justify-between my-auto relative">
            <div className="space-y-1 text-[7px] text-foreground">
              <div className="font-bold text-primary">Scroll Area</div>
              <div className="text-muted-foreground">Row item 1</div>
              <div className="text-muted-foreground">Row item 2</div>
            </div>
            <div className="w-1 h-4/5 bg-primary/60 rounded-full my-auto" />
          </div>
        )}

        {type === "masonry" && (
          <div className="w-full grid grid-cols-3 gap-1 my-auto px-0.5">
            <div className="space-y-1">
              <div className="h-10 rounded-lg bg-primary/20 border border-primary/40 p-1 flex items-end">
                <span className="text-[5px] font-black text-primary">#01</span>
              </div>
              <div className="h-6 rounded-lg bg-muted border border-border" />
            </div>
            <div className="space-y-1">
              <div className="h-6 rounded-lg bg-muted border border-border" />
              <div className="h-11 rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-1 flex items-end">
                <span className="text-[5px] font-black text-emerald-500">#02</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-12 rounded-lg bg-primary/10 border border-primary/20 p-1 flex items-end">
                <span className="text-[5px] font-black text-primary">#03</span>
              </div>
            </div>
          </div>
        )}

        {type === "qr" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="size-14 rounded-xl bg-background border border-border p-1.5 shadow-md flex flex-col justify-between items-center relative">
              <div className="w-full h-full grid grid-cols-4 gap-0.5">
                <div className="bg-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-primary rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-background border border-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-primary rounded-xs" />
                <div className="bg-primary rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-primary rounded-xs" />
                <div className="bg-foreground rounded-xs" />
                <div className="bg-foreground rounded-xs" />
              </div>
            </div>
          </div>
        )}

        {type === "file-upload" && (
          <div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-dashed border-primary/60 text-center space-y-1 my-auto">
            <span className="text-xs text-primary font-bold">☁</span>
            <div className="text-[8px] font-bold text-foreground">Drag & Drop File</div>
          </div>
        )}

        {type === "tilted-card" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="w-20 h-12 rounded-xl bg-background border border-primary shadow-lg rotate-6 hover:rotate-0 transition-transform p-1.5 text-center flex flex-col justify-center">
              <span className="text-[8px] font-extrabold text-primary">3D Tilted Card</span>
            </div>
          </div>
        )}

        {type === "memories-card" && (
          <div className="w-full flex items-center justify-center my-auto relative h-12">
            <div className="w-16 h-10 rounded-lg bg-muted/60 border border-border absolute -top-1 rotate-3" />
            <div className="w-16 h-10 rounded-lg bg-background border border-primary shadow-md z-10 p-1 text-center flex flex-col justify-center">
              <span className="text-[7px] font-bold text-primary">Memories</span>
            </div>
          </div>
        )}

        {type === "scroll-stack" && (
          <div className="w-full flex flex-col items-center gap-1 my-auto">
            <div className="w-20 h-3 rounded-t-lg bg-muted border border-border" />
            <div className="w-22 h-6 rounded-lg bg-background border border-primary shadow-xs p-1 text-center text-[7px] font-bold text-primary">
              Scroll Stack Card
            </div>
          </div>
        )}

        {type === "magic-bento" && (
          <div className="w-full grid grid-cols-2 gap-1 my-auto px-1">
            <div className="h-10 rounded-lg bg-primary/20 border border-primary/40 p-1 flex flex-col justify-between">
              <span className="text-[7px] font-bold text-primary">Glow</span>
            </div>
            <div className="h-10 rounded-lg bg-card border border-border p-1 flex flex-col justify-between">
              <span className="text-[7px] font-bold text-foreground">Tilt</span>
            </div>
          </div>
        )}

        {type === "network-graph" && (
          <div className="w-full h-full relative flex items-center justify-center p-1 my-auto overflow-hidden">
            <div className="size-24 rounded-full border border-dashed border-primary/25 absolute flex items-center justify-center pointer-events-none">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-emerald-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">
                A
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-amber-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">
                B
              </div>
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 size-3 rounded-full bg-indigo-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">
                C
              </div>
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 size-3 rounded-full bg-sky-500 text-[5px] font-black text-white flex items-center justify-center shadow-xs">
                D
              </div>
            </div>

            <div className="size-14 rounded-full border border-primary/40 bg-primary/5 absolute flex items-center justify-center pointer-events-none">
              <div className="absolute top-0 right-1 size-2.5 rounded-full bg-primary/70" />
              <div className="absolute bottom-0 left-1 size-2.5 rounded-full bg-primary/70" />
            </div>

            <div className="size-6 rounded-full bg-primary text-primary-foreground font-black text-[7.5px] flex items-center justify-center shadow-md z-10 border-2 border-background ring-2 ring-primary/20">
              Core
            </div>
          </div>
        )}

        {type === "sidebar" && (
          <div className="w-full h-full p-1 flex gap-1.5 my-auto overflow-hidden">
            <div className="w-2/5 h-full rounded-lg bg-background border border-border/80 p-1 flex flex-col justify-between shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1 border-b border-border/40 pb-1">
                  <span className="size-2 rounded bg-primary" />
                  <span className="text-[7px] font-extrabold text-foreground">Dashboard</span>
                </div>
                <div className="space-y-0.5 pt-0.5">
                  <div className="px-1 py-0.5 rounded bg-primary/10 text-primary text-[6px] font-bold flex items-center justify-between">
                    <span>Overview</span>
                    <span className="size-1 rounded-full bg-primary" />
                  </div>
                  <div className="px-1 py-0.5 text-muted-foreground text-[6px] font-medium flex items-center justify-between">
                    <span>Analytics</span>
                  </div>
                  <div className="px-1 py-0.5 text-muted-foreground text-[6px] font-medium flex items-center justify-between">
                    <span>Settings</span>
                  </div>
                </div>
              </div>
              <div className="px-1 py-0.5 rounded bg-muted text-[5.5px] font-mono text-muted-foreground">Admin Pro</div>
            </div>
            <div className="flex-1 h-full rounded-lg border border-border/60 bg-card p-1.5 flex flex-col justify-between space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-1/2 rounded bg-foreground/80 font-bold" />
                <div className="size-2 rounded-full bg-primary/40" />
              </div>
              <div className="grid grid-cols-2 gap-1 my-auto">
                <div className="h-5 rounded bg-muted/60 p-1 flex flex-col justify-between">
                  <div className="h-1 w-2/3 bg-muted-foreground/40 rounded" />
                  <div className="h-1.5 w-1/2 bg-primary rounded" />
                </div>
                <div className="h-5 rounded bg-muted/60 p-1 flex flex-col justify-between">
                  <div className="h-1 w-2/3 bg-muted-foreground/40 rounded" />
                  <div className="h-1.5 w-1/2 bg-emerald-500 rounded" />
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "dashboard" && (
          <div className="w-full h-full p-1 flex flex-col justify-between my-auto space-y-1 overflow-hidden">
            <div className="grid grid-cols-3 gap-1">
              <div className="p-1 rounded-md bg-background border border-border/80 text-center space-y-0.5">
                <div className="text-[5.5px] font-bold text-muted-foreground">Tickets</div>
                <div className="text-[8px] font-black text-foreground">1,240</div>
              </div>
              <div className="p-1 rounded-md bg-primary/10 border border-primary/20 text-center space-y-0.5">
                <div className="text-[5.5px] font-bold text-primary">Resolved</div>
                <div className="text-[8px] font-black text-primary">98%</div>
              </div>
              <div className="p-1 rounded-md bg-background border border-border/80 text-center space-y-0.5">
                <div className="text-[5.5px] font-bold text-muted-foreground">Avg Time</div>
                <div className="text-[8px] font-black text-emerald-500">12m</div>
              </div>
            </div>
            <div className="w-full p-1 rounded-lg bg-background border border-border flex items-center justify-between text-[6px]">
              <div className="space-y-0.5">
                <div className="font-bold text-foreground">Active Customer Queue</div>
                <div className="text-[5.5px] text-muted-foreground">14 Agent Agents Online</div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold text-[5.5px]">Live</span>
            </div>
          </div>
        )}

        {type === "marquee" && (
          <div className="w-full flex flex-col justify-between my-auto space-y-2 px-1 relative overflow-hidden">
            <div className="text-center text-[7px] font-bold text-muted-foreground uppercase tracking-widest">
              Trusted by 500+ Companies
            </div>
            <div className="w-full flex items-center justify-between gap-1.5 py-1 px-1 rounded-xl bg-background border border-border/80 relative shadow-2xs">
              <div className="px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[7px] font-extrabold text-primary flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-primary" /> React
              </div>
              <div className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[7px] font-bold text-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-sky-500" /> Next.js
              </div>
              <div className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[7px] font-bold text-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-indigo-500" /> Tailwind
              </div>
            </div>
          </div>
        )}

        {type === "floating-contact" && (
          <div className="w-full h-full relative flex flex-col justify-end items-end p-1.5 my-auto overflow-hidden">
            <div className="w-22 p-1 mb-1 rounded-lg bg-background border border-border shadow-xs space-y-0.5 text-[5.5px]">
              <div className="flex items-center gap-1 font-bold text-foreground border-b border-border/40 pb-0.5">
                <span className="size-1 rounded-full bg-emerald-500" />
                <span>Support</span>
              </div>
              <div className="p-0.5 rounded bg-muted text-muted-foreground truncate">
                Help Chat
              </div>
            </div>
            <div className="size-5 rounded-full bg-primary text-primary-foreground font-bold text-[9px] flex items-center justify-center shadow-xs border border-background ring-1 ring-primary/20 shrink-0">
              💬
            </div>
          </div>
        )}

        {type === "video-accordion" && (
          <div className="w-full h-full flex gap-1 p-1 my-auto overflow-hidden">
            <div className="flex-[2] h-full rounded-lg bg-primary/10 border border-primary/40 p-1 flex flex-col justify-between relative shadow-xs">
              <span className="text-[5.5px] font-extrabold text-primary px-1 py-0.2 rounded bg-background border border-primary/20 self-start">Active Stream</span>
              <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-[7px] mx-auto shadow-md">
                ▶
              </div>
              <div className="h-1 w-3/4 bg-primary/60 rounded" />
            </div>
            <div className="w-4 h-full rounded-lg bg-muted/60 border border-border flex flex-col items-center justify-center">
              <span className="text-[6px] text-muted-foreground font-bold">▶</span>
            </div>
            <div className="w-4 h-full rounded-lg bg-muted/60 border border-border flex flex-col items-center justify-center">
              <span className="text-[6px] text-muted-foreground font-bold">▶</span>
            </div>
          </div>
        )}

        {type === "timeline" && (
          <div className="w-full h-full p-1.5 flex flex-col justify-between my-auto relative overflow-hidden">
            <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-border/80" />
            
            <div className="flex items-center gap-2 relative z-10">
              <div className="size-2.5 rounded-full bg-primary ring-2 ring-primary/20 flex items-center justify-center shrink-0">
                <span className="size-1 rounded-full bg-primary-foreground" />
              </div>
              <div className="flex-1 p-1 rounded-lg bg-background border border-primary/40 shadow-2xs text-[6px]">
                <div className="font-extrabold text-primary flex justify-between">
                  <span>v2.0 Released</span>
                  <span className="text-[5px] text-muted-foreground">Today</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <div className="size-2.5 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                <span className="size-1 rounded-full bg-muted-foreground/60" />
              </div>
              <div className="flex-1 p-1 rounded-lg bg-background border border-border/70 text-[6px]">
                <div className="font-bold text-foreground flex justify-between">
                  <span>Beta Testing</span>
                  <span className="text-[5px] text-muted-foreground">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "typography" && (
          <div className="w-full flex flex-col justify-between my-auto space-y-1 px-1">
            <div className="text-xs font-black tracking-tight text-foreground border-b border-border/40 pb-0.5">
              H1. Heading Text
            </div>
            <div className="text-[8px] font-bold text-primary">
              H2. Subtitle Paragraph
            </div>
            <div className="text-[6.5px] text-muted-foreground leading-tight">
              Flexible & accessible type system tokens.
            </div>
          </div>
        )}

        {type === "animated-list" && (
          <div className="w-full space-y-1 my-auto px-1">
            <div className="p-1 rounded-md bg-background border border-primary/50 shadow-2xs flex items-center justify-between text-[6.5px] translate-x-1 transition-transform">
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="font-extrabold text-foreground">New Order #108</span>
              </div>
              <span className="text-[5.5px] font-bold text-primary">Just now</span>
            </div>
            <div className="p-1 rounded-md bg-background border border-border text-[6.5px] flex items-center justify-between opacity-80">
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-sky-500" />
                <span className="font-bold text-foreground">User Signed Up</span>
              </div>
              <span className="text-[5.5px] text-muted-foreground">2m ago</span>
            </div>
          </div>
        )}

        {type === "accordion" && (
          <div className="w-full space-y-1 my-auto px-0.5 text-[7px]">
            <div className="p-1.5 rounded-lg bg-background border border-primary/50 shadow-2xs space-y-1">
              <div className="flex justify-between items-center font-extrabold text-primary">
                <span>Is it accessible?</span>
                <span className="text-[8px]">▲</span>
              </div>
              <div className="text-[6px] text-muted-foreground border-t border-border/40 pt-1">
                Yes. Adheres to WAI-ARIA standards.
              </div>
            </div>
            <div className="p-1 rounded-lg bg-muted/40 border border-border flex justify-between items-center font-bold text-foreground">
              <span>Is it styled?</span>
              <span className="text-[8px] text-muted-foreground">▼</span>
            </div>
          </div>
        )}

        {type === "api-playground" && (
          <div className="w-full p-1.5 rounded-lg bg-background border border-border shadow-2xs space-y-1 my-auto text-[6.5px] font-mono">
            <div className="flex items-center justify-between border-b border-border/40 pb-0.5">
              <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-500 font-extrabold text-[5.5px]">GET</span>
              <span className="text-muted-foreground font-bold">/api/v1/users</span>
            </div>
            <div className="flex items-center justify-between text-foreground">
              <span className="text-primary font-bold">Status: 200 OK</span>
              <span className="px-1 rounded bg-primary text-primary-foreground font-bold text-[5.5px]">Send</span>
            </div>
          </div>
        )}

        {type === "breadcrumb" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="px-2 py-1 rounded-lg bg-background border border-border shadow-2xs flex items-center gap-1 text-[7px] font-bold">
              <span className="text-muted-foreground">Docs</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-muted-foreground">Components</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-primary font-extrabold">Breadcrumb</span>
            </div>
          </div>
        )}

        {type === "button" && (
          <div className="w-full p-2 rounded-xl bg-card border border-border/80 my-auto text-[6.5px] space-y-1.5">
            {/* Top Row: Primary + Secondary + Outline */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <div className="px-2 py-1 rounded-lg bg-primary text-primary-foreground text-[6.5px] font-extrabold shadow-2xs flex items-center gap-1 hover:bg-primary/90 cursor-pointer">
                <span>Deploy</span>
                <span className="text-[5.5px]">🚀</span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-[6.5px] font-bold shadow-2xs flex items-center gap-1 border border-border/60 cursor-pointer">
                <span>Secondary</span>
              </div>
              <div className="px-2 py-0.5 rounded-lg border border-border bg-background text-[6.5px] font-bold text-foreground hover:bg-muted cursor-pointer">
                Outline
              </div>
            </div>

            {/* Bottom Row: Destructive + Loading + Icon Only */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <div className="px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[6px] font-bold flex items-center gap-1 cursor-pointer">
                <span>Delete</span>
                <span className="text-[5.5px]">🗑</span>
              </div>
              <div className="px-2 py-0.5 rounded-lg bg-primary/20 text-primary text-[6px] font-extrabold flex items-center gap-1 cursor-pointer">
                <span className="size-2 rounded-full border border-primary border-t-transparent animate-spin" />
                <span>Loading...</span>
              </div>
              <div className="size-5 rounded-lg bg-muted border border-border flex items-center justify-center text-[7px] text-foreground font-extrabold shadow-2xs cursor-pointer">
                ★
              </div>
            </div>
          </div>
        )}

        {type === "command" && (
          <div className="w-full p-1.5 rounded-xl bg-background border border-border shadow-md space-y-1 my-auto text-[6.5px]">
            <div className="flex items-center gap-1 border-b border-border/40 pb-1 px-1">
              <span className="text-[7.5px] text-primary">🔍</span>
              <span className="font-bold text-foreground">Search docs...</span>
              <span className="ml-auto text-[5.5px] px-1 bg-muted rounded border border-border text-muted-foreground">⌘K</span>
            </div>
            <div className="space-y-0.5">
              <div className="px-1 py-0.5 rounded bg-primary/10 text-primary font-bold flex justify-between">
                <span>&gt; Components</span>
                <span>Enter</span>
              </div>
            </div>
          </div>
        )}

        {type === "calendar" && (
          <div className="w-full p-2 rounded-xl bg-background border-y border-border/80 space-y-1.5 my-auto text-[6.5px]">
            {/* Top Toolbar: Selected Date Badge + Year Quick Select */}
            <div className="flex items-center justify-between border-b border-border/40 pb-1 px-0.5">
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-extrabold text-[7.5px] text-foreground">August 2026</span>
              </div>
              <div className="flex items-center gap-0.5 text-muted-foreground text-[6px]">
                <span className="size-3.5 rounded-md bg-muted/60 border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground font-bold">‹</span>
                <span className="size-3.5 rounded-md bg-muted/60 border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground font-bold">›</span>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-0.5 font-extrabold text-muted-foreground/70 text-center text-[5.5px] uppercase">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            {/* Full Month Calendar Matrix */}
            <div className="grid grid-cols-7 gap-0.5 text-center font-bold text-[6px] items-center">
              <span className="text-muted-foreground/30 py-0.5">26</span>
              <span className="text-muted-foreground/30 py-0.5">27</span>
              <span className="text-muted-foreground/30 py-0.5">28</span>
              <span className="text-muted-foreground/30 py-0.5">29</span>
              <span className="text-muted-foreground/30 py-0.5">30</span>
              <span className="text-muted-foreground/30 py-0.5">31</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">1</span>

              <span className="py-0.5 rounded hover:bg-muted text-foreground">2</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">3</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">4</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">5</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">6</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">7</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">8</span>

              <span className="py-0.5 rounded hover:bg-muted text-foreground">9</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">10</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">11</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">12</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">13</span>

              {/* Start Date Selection Range */}
              <span className="py-0.5 rounded-l-md bg-primary text-primary-foreground font-black shadow-2xs">14</span>
              <span className="py-0.5 bg-primary/20 text-primary font-extrabold">15</span>
              <span className="py-0.5 bg-primary/20 text-primary font-extrabold">16</span>
              {/* End Date Selection Range */}
              <span className="py-0.5 rounded-r-md bg-primary text-primary-foreground font-black shadow-2xs">17</span>

              <span className="py-0.5 rounded hover:bg-muted text-foreground">18</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">19</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">20</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">21</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">22</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">23</span>

              <span className="py-0.5 rounded hover:bg-muted text-foreground">24</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">25</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">26</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">27</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">28</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">29</span>
              <span className="py-0.5 rounded hover:bg-muted text-foreground">30</span>
            </div>

            {/* Bottom Footer Action Bar */}
            <div className="flex items-center justify-between border-t border-border/40 pt-1 px-0.5 text-[5.5px]">
              <span className="text-muted-foreground font-semibold">Today: Aug 14</span>
              <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-extrabold border border-primary/20">Apply</span>
            </div>
          </div>
        )}

        {type === "collapsible" && (
          <div className="w-full space-y-1 my-auto px-1 text-[7px]">
            <div className="p-1.5 rounded-lg bg-background border border-border flex justify-between items-center font-extrabold text-foreground shadow-2xs">
              <span>Toggle Details</span>
              <span className="text-[7px] text-primary">▲</span>
            </div>
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[6.5px] font-bold text-primary">
              Expanded Panel Content
            </div>
          </div>
        )}

        {type === "context-menu" && (
          <div className="w-full h-full relative flex items-center justify-center my-auto">
            <div className="w-24 p-1 rounded-lg bg-background border border-border shadow-lg space-y-0.5 text-[6px]">
              <div className="px-1.5 py-0.5 rounded hover:bg-primary/10 text-foreground font-medium flex justify-between">
                <span>Copy Link</span>
                <span className="text-muted-foreground">⌘C</span>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold flex justify-between">
                <span>Inspect Element</span>
                <span>⌘I</span>
              </div>
            </div>
          </div>
        )}

        {type === "drawer" && (
          <div className="w-full h-full relative flex flex-col justify-end items-center my-auto overflow-hidden bg-black/10 dark:bg-black/40 rounded-lg">
            <div className="w-full h-3/4 rounded-t-2xl bg-background border-t border-border shadow-2xl p-1.5 flex flex-col justify-between text-[6.5px]">
              <div className="w-6 h-1 rounded-full bg-muted-foreground/40 mx-auto" />
              <div className="space-y-1 my-auto">
                <div className="font-extrabold text-foreground border-b border-border/40 pb-0.5 text-center">
                  Drawer Sheet
                </div>
                <div className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold text-[5.5px]">
                  Option 1: Edit Profile
                </div>
                <div className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium text-[5.5px]">
                  Option 2: Settings
                </div>
              </div>
              <div className="h-3 w-full bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-[6px] shadow-2xs">
                Submit
              </div>
            </div>
          </div>
        )}

        {type === "dialog" && (
          <div className="w-full h-full flex items-center justify-center my-auto">
            <div className="w-4/5 p-1.5 rounded-xl bg-background border border-border shadow-xl space-y-1 text-[6.5px]">
              <div className="font-extrabold text-foreground border-b border-border/40 pb-0.5">Dialog Title</div>
              <div className="text-[5.5px] text-muted-foreground">Are you sure you want to continue?</div>
              <div className="flex justify-end gap-1 pt-0.5">
                <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold text-[5.5px]">Confirm</span>
              </div>
            </div>
          </div>
        )}

        {type === "data-grid" && (
          <div className="w-full p-1 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px] font-mono">
            <div className="grid grid-cols-3 gap-1 font-bold text-primary border-b border-border/40 pb-0.5">
              <span>ID</span><span>Name</span><span>Role</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-foreground">
              <span>#01</span><span>Alex</span><span className="text-emerald-500 font-bold">Admin</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-foreground">
              <span>#02</span><span>Sarah</span><span className="text-sky-500 font-bold">User</span>
            </div>
          </div>
        )}

        {type === "data-table" && (
          <div className="w-full p-1.5 rounded-xl bg-card border border-border/80 space-y-1 my-auto text-[6px]">
            {/* Table Toolbar Header */}
            <div className="flex justify-between items-center border-b border-border/40 pb-1 px-0.5">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-foreground text-[6.5px]">Invoices</span>
                <span className="px-1 py-0.2 rounded bg-primary/10 text-primary font-mono text-[5px]">128 total</span>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[5px] flex items-center gap-0.5">
                <span>Filter</span>
                <span className="text-[4.5px]">▼</span>
              </div>
            </div>

            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-1 font-extrabold text-muted-foreground border-b border-border/40 pb-0.5 px-0.5 text-[5.5px]">
              <span className="col-span-1 text-center">☐</span>
              <span className="col-span-4">Customer</span>
              <span className="col-span-3">Status</span>
              <span className="col-span-4 text-right">Amount</span>
            </div>

            {/* Table Rows */}
            <div className="space-y-0.5 text-[5.5px]">
              <div className="grid grid-cols-12 gap-1 items-center bg-primary/5 p-0.5 rounded border border-primary/20">
                <span className="col-span-1 text-center text-primary font-bold">☑</span>
                <span className="col-span-4 font-bold text-foreground truncate">Alex Rivers</span>
                <span className="col-span-3">
                  <span className="px-1 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[5px]">Paid</span>
                </span>
                <span className="col-span-4 text-right font-extrabold text-foreground">$1,250.00</span>
              </div>

              <div className="grid grid-cols-12 gap-1 items-center p-0.5 border-b border-border/20">
                <span className="col-span-1 text-center text-muted-foreground/60">☐</span>
                <span className="col-span-4 font-medium text-foreground truncate">Sarah Chen</span>
                <span className="col-span-3">
                  <span className="px-1 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[5px]">Pending</span>
                </span>
                <span className="col-span-4 text-right font-bold text-foreground">$420.00</span>
              </div>

              <div className="grid grid-cols-12 gap-1 items-center p-0.5">
                <span className="col-span-1 text-center text-muted-foreground/60">☐</span>
                <span className="col-span-4 font-medium text-foreground truncate">TechCorp Inc</span>
                <span className="col-span-3">
                  <span className="px-1 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[5px]">Paid</span>
                </span>
                <span className="col-span-4 text-right font-bold text-foreground">$3,890.00</span>
              </div>
            </div>

            {/* Table Footer Pagination */}
            <div className="flex justify-between items-center border-t border-border/40 pt-1 px-0.5 text-[5px] text-muted-foreground font-medium">
              <span>Page 1 of 12</span>
              <div className="flex gap-0.5 font-bold">
                <span className="px-1 py-0.2 rounded bg-muted">‹ Prev</span>
                <span className="px-1 py-0.2 rounded bg-muted text-foreground">Next ›</span>
              </div>
            </div>
          </div>
        )}

        {type === "date-picker" && (
          <div className="w-full h-full p-1 rounded-xl bg-background border border-border/80 flex flex-col justify-center items-center overflow-hidden">
            <div className="w-[96%] space-y-1 my-auto">
              {/* Realistic Input Field with Active Selection Trigger */}
              <div className="w-full flex items-center justify-between px-2 py-1 rounded-lg bg-card border border-primary shadow-xs ring-2 ring-primary/30">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="p-0.5 rounded bg-primary text-primary-foreground shrink-0 animate-pulse">
                    <svg className="size-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left leading-none truncate">
                    <span className="text-[5px] text-primary font-bold uppercase tracking-wider">Picking Date...</span>
                    <span className="text-[6.5px] font-extrabold text-foreground truncate">Aug 18, 2026</span>
                  </div>
                </div>
                <span className="text-[5.5px] text-primary font-bold">▲</span>
              </div>

              {/* Realistic Floating Popover Dropdown Card with Live Selection */}
              <div className="w-full p-1.5 rounded-lg bg-card/95 backdrop-blur-xs border border-border shadow-xl space-y-1 relative">
                {/* Preset Quick Chips */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[4.5px]">
                  <span className="px-1 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">Today</span>
                  <span className="px-1 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">Tomorrow</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-bold whitespace-nowrap shadow-2xs">Pick Date Range</span>
                </div>

                {/* Month Header Navigation */}
                <div className="flex items-center justify-between px-1 py-0.5 rounded bg-muted/40 text-[6px]">
                  <span className="size-3 rounded hover:bg-background flex items-center justify-center font-bold text-muted-foreground cursor-pointer">‹</span>
                  <span className="font-bold text-foreground">August 2026</span>
                  <span className="size-3 rounded hover:bg-background flex items-center justify-center font-bold text-muted-foreground cursor-pointer">›</span>
                </div>

                {/* Weekday Grid Labels */}
                <div className="grid grid-cols-7 gap-0.5 font-bold text-muted-foreground/70 text-center text-[4.5px] uppercase">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                {/* Days Matrix with Cursor Picking Date 18 */}
                <div className="grid grid-cols-7 gap-0.5 text-center font-medium text-[5px] relative">
                  <span className="text-muted-foreground/30 py-0.5">26</span>
                  <span className="text-muted-foreground/30 py-0.5">27</span>
                  <span className="text-muted-foreground/30 py-0.5">28</span>
                  <span className="text-muted-foreground/30 py-0.5">29</span>
                  <span className="text-muted-foreground/30 py-0.5">30</span>
                  <span className="text-muted-foreground/30 py-0.5">31</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">1</span>

                  <span className="py-0.5 rounded hover:bg-muted text-foreground">2</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">3</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">4</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">5</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">6</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">7</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">8</span>

                  <span className="py-0.5 rounded hover:bg-muted text-foreground">9</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">10</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">11</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">12</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">13</span>

                  {/* Start Date Selected */}
                  <span className="py-0.5 rounded-md bg-primary text-primary-foreground font-bold shadow-xs">14</span>
                  <span className="py-0.5 bg-primary/20 text-primary font-semibold">15</span>

                  <span className="py-0.5 bg-primary/20 text-primary font-semibold">16</span>
                  <span className="py-0.5 bg-primary/20 text-primary font-semibold">17</span>

                  {/* ACTIVE PICKING DATE (18) WITH CURSOR POINTER & TOOLTIP */}
                  <div className="relative flex items-center justify-center">
                    <span className="w-full py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold shadow-md ring-2 ring-primary ring-offset-1 scale-105 z-10">
                      18
                    </span>
                    {/* Cursor Pointer Graphic */}
                    <svg className="size-3 text-foreground drop-shadow-md absolute -bottom-1 -right-1 z-20 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L4.5 3.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <span className="py-0.5 rounded hover:bg-muted text-foreground">19</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">20</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">21</span>
                  <span className="py-0.5 rounded hover:bg-muted text-foreground">22</span>
                </div>

                {/* Active Picking Status Bar */}
                <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[5px]">
                  <div className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span className="font-semibold text-foreground truncate">Selected: Aug 14 - Aug 18</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-extrabold shadow-2xs shrink-0">Confirm</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "user-graph" && (
          <div className="w-full h-full p-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-border/80 flex flex-col justify-center items-center overflow-hidden relative">
            <div className="flex flex-col items-center gap-1 my-auto scale-90">
              {/* You Node */}
              <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                You
              </div>
              <div className="w-0.5 h-3 bg-primary/40" />
              {/* Alice Node */}
              <div className="size-8 rounded-full ring-2 ring-primary/40 bg-card p-0.5 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Alice"
                  className="size-full rounded-full object-cover"
                />
              </div>
              <span className="text-[7px] font-bold text-foreground">Alice</span>
              {/* 3 Sub-Agent Dots */}
              <div className="flex gap-2.5 mt-1 pt-1 border-t border-border/60">
                <div className="size-3 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-[5px] font-extrabold text-amber-600">S</div>
                <div className="size-3 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-[5px] font-extrabold text-blue-600">M</div>
                <div className="size-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-[5px] font-extrabold text-emerald-600">A</div>
              </div>
            </div>
          </div>
        )}

        {type === "network-graph" && (
          <div className="w-full h-full p-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-border/80 flex flex-col justify-center items-center overflow-hidden relative">
            <div className="flex flex-col items-center gap-1 my-auto scale-90">
              {/* You Node */}
              <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                You
              </div>
              <div className="w-0.5 h-3 bg-primary/40" />
              {/* Alice Node */}
              <div className="size-8 rounded-full ring-2 ring-primary/40 bg-card p-0.5 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Alice"
                  className="size-full rounded-full object-cover"
                />
              </div>
              <span className="text-[7px] font-bold text-foreground">Alice</span>
              {/* 3 Sub-Agent Dots */}
              <div className="flex gap-2.5 mt-1 pt-1 border-t border-border/60">
                <div className="size-3 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-[5px] font-extrabold text-amber-600">S</div>
                <div className="size-3 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-[5px] font-extrabold text-blue-600">M</div>
                <div className="size-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-[5px] font-extrabold text-emerald-600">A</div>
              </div>
            </div>
          </div>
        )}

        {type === "form" && (
          <div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px]">
            <div className="space-y-0.5">
              <div className="font-bold text-foreground">Username</div>
              <div className="h-2.5 w-full rounded bg-muted border border-primary/40 px-1 flex items-center text-[5.5px] text-primary font-bold">alex_dev</div>
            </div>
            <div className="h-3 w-full rounded bg-primary text-primary-foreground font-bold flex items-center justify-center text-[6px]">Submit Form</div>
          </div>
        )}

        {type === "input" && (
          <div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6.5px]">
            <div className="h-4 w-full rounded-md border border-primary bg-primary/5 px-1.5 flex items-center justify-between text-primary font-bold">
              <span>Input value...</span>
              <span className="size-1 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        )}

        {type === "invoice" && (
          <div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[5.5px] overflow-hidden">
            <div className="flex justify-between items-center border-b border-border/40 pb-0.5">
              <span className="font-black text-foreground">INV-#402</span>
              <span className="text-[5px] font-extrabold text-emerald-500 bg-emerald-500/10 px-1 rounded">PAID</span>
            </div>
            <div className="space-y-0.5 border-b border-border/20 pb-0.5">
              <div className="flex justify-between text-muted-foreground">
                <span>UI Kit License</span>
                <span className="font-bold text-foreground">$149.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Support Addon</span>
                <span className="font-bold text-foreground">$49.00</span>
              </div>
            </div>
            <div className="flex justify-between font-extrabold text-foreground pt-0.5">
              <span>Total:</span>
              <span className="text-primary">$198.00</span>
            </div>
          </div>
        )}

        {type === "kbd" && (
          <div className="w-full flex items-center justify-center gap-1 my-auto">
            <span className="px-1.5 py-0.5 rounded-md bg-muted border-b-2 border-border text-[7px] font-mono font-bold text-foreground shadow-2xs">Ctrl</span>
            <span className="text-[7px] text-muted-foreground">+</span>
            <span className="px-1.5 py-0.5 rounded-md bg-primary border-b-2 border-primary/70 text-[7px] font-mono font-bold text-primary-foreground shadow-2xs">K</span>
          </div>
        )}

        {type === "mails" && (
          <div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px]">
            <div className="p-1 rounded bg-primary/10 border border-primary/20 space-y-0.5">
              <div className="font-extrabold text-primary flex justify-between">
                <span>Sarah Connor</span>
                <span className="text-[5px] text-muted-foreground">10:42 AM</span>
              </div>
              <div className="text-[5.5px] text-foreground font-bold truncate">Project Assets Ready</div>
            </div>
          </div>
        )}

        {type === "map" && (
          <div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
            {/* Bangladesh Map Silhouette SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none fill-primary/20 stroke-primary/50 stroke-1" viewBox="0 0 100 100">
              <path d="M 45 10 Q 55 12, 60 20 Q 65 25, 75 30 Q 80 40, 70 50 Q 75 60, 68 75 Q 60 85, 55 90 Q 50 82, 45 78 Q 40 70, 32 65 Q 25 60, 28 50 Q 30 40, 35 30 Q 32 20, 45 10 Z" />
            </svg>

            {/* Dhaka (Center Pulse Pin) */}
            <div className="absolute top-[48%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
              <span className="size-3 rounded-full bg-rose-500/30 block animate-ping absolute inset-0" />
              <span className="size-2 rounded-full bg-rose-500 block ring-2 ring-rose-500/40 border border-white shadow-xs" />
            </div>

            {/* Chattogram Pin */}
            <div className="absolute top-[68%] left-[66%] z-10 -translate-x-1/2 -translate-y-1/2">
              <span className="size-1.5 rounded-full bg-emerald-500 block ring-1 ring-emerald-500/40 border border-white shadow-xs" />
            </div>

            {/* Sylhet Pin */}
            <div className="absolute top-[30%] left-[65%] z-10 -translate-x-1/2 -translate-y-1/2">
              <span className="size-1.5 rounded-full bg-amber-500 block ring-1 ring-amber-500/40 border border-white shadow-xs" />
            </div>

            {/* Rajshahi Pin */}
            <div className="absolute top-[35%] left-[32%] z-10 -translate-x-1/2 -translate-y-1/2">
              <span className="size-1.5 rounded-full bg-sky-500 block ring-1 ring-sky-500/40 border border-white shadow-xs" />
            </div>

            {/* Bangladesh Tag */}
            <div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-background/90 border border-border text-[5px] font-black text-primary shadow-2xs">
              Bangladesh
            </div>
          </div>
        )}

        {type === "menubar" && (
          <div className="w-full p-1 rounded-lg bg-background border border-border shadow-xs my-auto text-[6px]">
            <div className="flex items-center gap-2 border-b border-border/40 pb-0.5 px-0.5 font-bold text-foreground">
              <span className="text-primary font-black">File</span>
              <span className="text-muted-foreground">Edit</span>
              <span className="text-muted-foreground">View</span>
            </div>
            <div className="p-1 rounded bg-card border border-border mt-0.5 space-y-0.5 text-[5.5px]">
              <div className="font-extrabold text-primary">New Tab ⌘N</div>
              <div className="text-muted-foreground">Open File...</div>
            </div>
          </div>
        )}

        {type === "otp-input" && (
          <div className="w-full flex items-center justify-center gap-1 my-auto">
            <div className="size-5 rounded-md border border-primary bg-primary/10 text-primary font-black text-[9px] flex items-center justify-center shadow-2xs">4</div>
            <div className="size-5 rounded-md border border-primary bg-primary/10 text-primary font-black text-[9px] flex items-center justify-center shadow-2xs">8</div>
            <div className="size-5 rounded-md border-2 border-primary bg-background text-foreground font-black text-[9px] flex items-center justify-center shadow-2xs ring-2 ring-primary/20">2</div>
            <div className="size-5 rounded-md border border-border bg-muted/40 text-muted-foreground font-bold text-[9px] flex items-center justify-center">•</div>
          </div>
        )}

        {type === "popover" && (
          <div className="w-full h-full relative flex items-center justify-center my-auto">
            <div className="w-28 p-1.5 rounded-xl bg-background border border-border shadow-lg space-y-1 text-[6px]">
              <div className="font-extrabold text-foreground border-b border-border/40 pb-0.5">Dimensions</div>
              <div className="flex justify-between text-muted-foreground">
                <span>Width: <strong className="text-foreground">100%</strong></span>
                <span>Height: <strong className="text-foreground">Auto</strong></span>
              </div>
            </div>
          </div>
        )}

        {type === "progress" && (
          <div className="w-full space-y-1.5 my-auto px-1">
            <div className="flex justify-between text-[6.5px] font-extrabold">
              <span className="text-foreground">Uploading Assets</span>
              <span className="text-primary">78%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden p-0.5 border border-border/40">
              <div className="h-full w-[78%] rounded-full bg-primary transition-all duration-500 shadow-xs" />
            </div>
          </div>
        )}

        {type === "loader" && (
          <div className="w-full flex items-center justify-center my-auto relative">
            <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <div className="size-5 rounded-full border-2 border-emerald-500/40 border-b-emerald-500 animate-[spin_0.8s_linear_infinite] absolute" />
            <span className="size-1.5 rounded-full bg-primary animate-pulse absolute shadow-sm" />
          </div>
        )}

        {type === "sonner" && (
          <div className="w-full h-full relative flex flex-col justify-end p-1 my-auto">
            <div className="p-1.5 rounded-xl bg-background border border-primary/50 shadow-lg flex items-center justify-between text-[6px]">
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="font-extrabold text-foreground">Event Triggered</span>
              </div>
              <span className="text-[5.5px] text-primary font-bold">Undo</span>
            </div>
          </div>
        )}

        {type === "select" && (
          <div className="w-full p-1 rounded-lg bg-background border border-border shadow-2xs space-y-1 my-auto text-[6.5px]">
            <div className="flex justify-between items-center px-1.5 py-0.5 rounded bg-muted border border-border font-bold text-foreground">
              <span>Select Option</span>
              <span className="text-[6px] text-primary">▼</span>
            </div>
          </div>
        )}

        {type === "skeleton" && (
          <div className="w-full space-y-1.5 my-auto px-1">
            <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-2 w-full rounded bg-muted/60 animate-pulse" />
            <div className="h-2 w-1/2 rounded bg-muted/60 animate-pulse" />
          </div>
        )}

        {type === "toast" && (
          <div className="w-full p-2 rounded-xl bg-card border border-border/80 my-auto text-[6px] space-y-1.5 shadow-2xs">
            {/* Multi-layered Toast Banner */}
            <div className="p-1.5 rounded-lg bg-background border border-emerald-500/40 flex items-start gap-1.5 shadow-xs">
              <div className="size-3.5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-[7px] font-black shrink-0">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-foreground text-[6.5px] leading-none">Changes Saved</div>
                <div className="text-[5.5px] text-muted-foreground mt-0.5 truncate">Your profile settings have updated.</div>
              </div>
              <span className="text-[6px] text-muted-foreground/60 hover:text-foreground cursor-pointer shrink-0">✕</span>
            </div>
          </div>
        )}

        {type === "toggle" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="w-8 h-4 rounded-full bg-primary p-0.5 flex items-center justify-end shadow-2xs">
              <div className="size-3 rounded-full bg-primary-foreground shadow-xs" />
            </div>
          </div>
        )}

        {type === "tooltip" && (
          <div className="w-full flex flex-col items-center justify-center my-auto space-y-2 py-1">
            {/* Realistic Floating Tooltip Bubble with Down Arrow */}
            <div className="px-2.5 py-1 rounded-md bg-foreground text-background text-[6.5px] font-extrabold shadow-md relative animate-bounce">
              <span>Add to Favorites</span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
            {/* Target Interactive Trigger Element */}
            <div className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-[6.5px] font-bold flex items-center gap-1">
              <span>★</span>
              <span>Bookmark</span>
            </div>
          </div>
        )}

        {type === "toggle-group" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="p-0.5 rounded-lg bg-muted border border-border flex items-center gap-0.5 text-[6.5px] font-bold">
              <span className="px-1.5 py-0.5 rounded bg-background text-foreground shadow-2xs">Left</span>
              <span className="px-1.5 py-0.5 text-muted-foreground">Center</span>
              <span className="px-1.5 py-0.5 text-muted-foreground">Right</span>
            </div>
          </div>
        )}

        {type === "terminal" && (
          <div className="w-full p-1.5 rounded-xl bg-card border border-border text-primary font-mono text-[6px] space-y-1 shadow-xs my-auto">
            <div className="flex gap-1 border-b border-border/40 pb-0.5">
              <span className="size-1.5 rounded-full bg-rose-500/80" />
              <span className="size-1.5 rounded-full bg-amber-500/80" />
              <span className="size-1.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="font-bold">$ npm run dev</div>
            <div className="text-muted-foreground">Ready in 2.4s</div>
          </div>
        )}

        {type === "pagination" && (
          <div className="w-full flex items-center justify-center gap-1 my-auto text-[6.5px] font-bold">
            <span className="px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">Prev</span>
            <span className="size-4 rounded bg-primary text-primary-foreground flex items-center justify-center font-black shadow-2xs">1</span>
            <span className="size-4 rounded bg-background border border-border text-foreground flex items-center justify-center">2</span>
            <span className="px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">Next</span>
          </div>
        )}

        {type === "tabs" && (
          <div className="w-full space-y-1 my-auto px-0.5 text-[6.5px]">
            <div className="p-0.5 rounded-lg bg-muted border border-border flex gap-0.5 font-bold">
              <span className="flex-1 py-0.5 rounded bg-background text-primary text-center font-extrabold shadow-2xs">Account</span>
              <span className="flex-1 py-0.5 text-muted-foreground text-center">Password</span>
            </div>
            <div className="p-1 rounded bg-background border border-border text-[6px] text-muted-foreground">
              Tab content panel...
            </div>
          </div>
        )}

        {type === "theme-switcher" && (
          <div className="w-full flex items-center justify-center my-auto">
            <div className="p-1 rounded-full bg-muted border border-border flex items-center gap-1 text-[8px] font-bold shadow-2xs">
              <span className="p-1 rounded-full bg-background text-amber-500 shadow-xs">☀️</span>
              <span className="p-1 text-muted-foreground">🌙</span>
            </div>
          </div>
        )}

        {type === "wizard" && (
          <div className="w-full space-y-1.5 my-auto px-0.5 text-[6px]">
            <div className="flex justify-between items-center font-extrabold text-foreground border-b border-border/40 pb-0.5">
              <span className="text-primary font-black">Step 2: Profile</span>
              <span className="text-[5.5px] text-muted-foreground">2 of 4</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary rounded-full" />
            </div>
          </div>
        )}

        {type === "data-maps" && (
          <div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none fill-muted-foreground/30" viewBox="0 0 200 100">
              <path d="M 15 20 Q 30 15 45 25 Q 50 35 35 50 Q 25 55 15 45 Z" />
              <path d="M 40 55 Q 55 52 50 85 Q 40 90 35 68 Z" />
              <path d="M 75 15 Q 120 10 160 25 Q 170 45 140 55 Q 100 50 80 35 Z" />
              <path d="M 80 40 Q 115 38 110 75 Q 90 85 78 60 Z" />
              <path d="M 145 65 Q 175 60 170 85 Q 150 90 142 75 Z" />
            </svg>
            <div className="absolute top-[28%] left-[22%] z-10">
              <span className="size-4 rounded-full bg-primary/20 block animate-ping absolute inset-0" />
              <span className="size-2.5 rounded-full bg-primary block border border-white shadow-xs" />
            </div>
            <div className="absolute top-[28%] left-[58%] z-10">
              <span className="size-5 rounded-full bg-emerald-500/20 block animate-ping absolute inset-0" />
              <span className="size-2.5 rounded-full bg-emerald-500 block border border-white shadow-xs" />
            </div>
            <div className="absolute top-1 right-1 px-1 py-0.2 rounded bg-background/90 border border-border text-[5px] font-black text-primary shadow-xs">
              +42% Data Flow
            </div>
          </div>
        )}

        {type === "hero-videoplayer" && (
          <div className="w-full h-full rounded-xl bg-card border border-border relative flex items-center justify-center my-auto overflow-hidden shadow-sm">
            <div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-lg ring-4 ring-primary/20">
              ▶
            </div>
            <div className="absolute bottom-1.5 left-2 right-2 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-2/3 bg-primary" />
            </div>
          </div>
        )}

        {type === "verify-badge" && (
          <div className="w-full flex items-center justify-center gap-1.5 my-auto">
            <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[7px] font-extrabold flex items-center gap-1 shadow-2xs">
              <span className="size-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[6px]">✓</span>
              <span>Verified Account</span>
            </div>
          </div>
        )}

        {type === "mobile-mockup" && (
          <div className="w-full h-full flex items-center justify-center my-auto">
            <div className="w-16 h-full rounded-[14px] border-2 border-border bg-background p-1 flex flex-col justify-between items-center shadow-md relative overflow-hidden">
              <div className="w-6 h-1 bg-border rounded-full mb-1" />
              <div className="flex-1 w-full rounded-md bg-primary/10 border border-primary/20 p-1 flex flex-col justify-between">
                <div className="size-2 rounded-full bg-primary" />
                <div className="h-1 w-3/4 rounded bg-primary/60" />
              </div>
              <div className="w-4 h-1 bg-border rounded-full mt-1" />
            </div>
          </div>
        )}

        {type === "half-stars" && (
          <div className="w-full flex items-center justify-center gap-1 my-auto text-amber-400 text-xs">
            <span>★</span><span>★</span><span>★</span><span>★</span><span className="opacity-40">★</span>
            <span className="text-[7.5px] font-black text-foreground ml-1">4.8</span>
          </div>
        )}

        {type === "code-block" && (
          <div className="w-full p-1.5 rounded-xl bg-muted/60 border border-border font-mono text-[6px] space-y-1 my-auto">
            <div className="flex justify-between text-[5.5px] text-muted-foreground border-b border-border/40 pb-0.5">
              <span>component.tsx</span>
              <span className="text-primary font-bold">Copy</span>
            </div>
            <div className="text-primary font-bold"><span className="text-rose-500">const</span> App = () =&gt;</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllComponentsDocsPage() {
  return (
    <div className="not-prose w-full py-4 text-foreground">
      <div className="w-full space-y-12">
        
        {/* Section Header - Left Aligned Exactly like Docs Layout */}
        <div className="text-left space-y-3 pb-4 border-b border-border/60">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <LayoutGrid className="size-3.5" />
            Component Preview Catalog
          </span>
          <h1 id="explore-built-in-component-previews" className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Explore Built-in Component Previews
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed w-full">
            Click any component card below to inspect interactive live previews, installation guides, and full source code.
          </p>
        </div>

        {/* Categorized Component Preview Cards */}
        <div className="space-y-14">
          {componentPreviewData.map((group) => (
            <div key={group.categoryTitle} className="space-y-6">
              {/* Category Header */}
              <div className="pb-3 border-b border-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs shrink-0">
                      <group.icon className="size-4.5" />
                    </div>
                    <h2 id={group.categoryTitle.toLowerCase().replace(/\s+/g, '-')} className="text-xl md:text-2xl font-black tracking-tight text-foreground leading-tight">
                      {group.categoryTitle}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                    {group.categorySubtitle}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 self-start sm:self-auto shrink-0">
                  {group.items.length} Components
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item) => (
                  <Link key={item.title} href={item.href} className="group block rounded-2xl">
                    <div className="rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full justify-between overflow-hidden">
                      {/* Card Thumbnail / Illustration */}
                      <div className="w-full h-32 rounded-xl mb-4 overflow-hidden relative">
                        <MiniatureIllustration title={item.title} type={item.illustrationType} />
                        {item.badge && (
                          <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Card Info */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                            {item.countText}
                          </p>
                        </div>
                        <div className="size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ArrowRight className="size-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
