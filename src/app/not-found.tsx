import React from "react";
import Link from "next/link";
import { BookOpen, Home, LayoutGrid, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-5 py-12 text-center">
      {/* Ambient Radial Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />

      {/* Grid Pattern Background overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="flex w-full max-w-2xl flex-col items-center justify-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3 py-1 text-[12px] text-foreground/90 backdrop-blur">
          <Compass className="h-3.5 w-3.5 animate-spin text-primary" style={{ animationDuration: "10s" }} />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Big 404 Heading */}
        <h1 className="mt-6 select-none font-serif font-normal text-[clamp(88px,20vw,168px)] leading-none tracking-[-0.04em] text-primary">
          404
        </h1>

        {/* Title & Description */}
        <div className="mt-6 max-w-lg">
          <h2 className="font-serif font-normal text-[clamp(26px,3.6vw,46px)] leading-[1.15] tracking-[-0.02em] text-foreground mb-3">
            Lost in Hyperspace?
          </h2>
          <p className="mx-auto max-w-[490px] text-[15px] leading-[1.65] text-foreground/60">
            The page you are looking for doesn't exist, was relocated, or is temporarily unavailable in this documentation.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-7 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row">
          <Link
            href="/docs/nextjs/index"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-[14px] font-semibold tracking-[0.3px] text-background transition-all hover:bg-foreground/90 active:scale-[0.98] sm:w-auto"
          >
            <BookOpen className="h-4 w-4" />
            Explore Documentation
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground/[0.04] px-7 py-3 text-[14px] font-medium text-foreground transition-all hover:bg-foreground/10 active:scale-[0.98] sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Quick Links Footer Card */}
        <div className="mt-12 w-full max-w-md border-t border-foreground/[0.06] pt-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/30">
            Popular Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/docs/nextjs/all-components"
              className="flex items-center gap-2 rounded-lg bg-foreground/[0.04] p-2.5 text-left text-[13px] text-foreground/70 transition-all hover:bg-foreground/[0.07] hover:text-foreground"
            >
              <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate font-medium">All Components</span>
            </Link>
            <Link
              href="/docs/nextjs/installation"
              className="flex items-center gap-2 rounded-lg bg-foreground/[0.04] p-2.5 text-left text-[13px] text-foreground/70 transition-all hover:bg-foreground/[0.07] hover:text-foreground"
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate font-medium">Installation</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
