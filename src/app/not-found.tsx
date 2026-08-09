import React from "react";
import Link from "next/link";
import { BookOpen, Home, LayoutGrid, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      {/* Ambient Radial Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />

      {/* Grid Pattern Background overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="flex w-full max-w-2xl flex-col items-center justify-center space-y-6">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md shadow-xs">
          <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "10s" }} />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Big 404 Heading */}
        <h1 className="select-none text-7xl sm:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
          404
        </h1>

        {/* Title & Description */}
        <div className="space-y-2 max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Lost in Hyperspace?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The page you are looking for doesn't exist, was relocated, or is temporarily unavailable in this documentation.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full justify-center">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <BookOpen className="h-4 w-4" />
            Explore Documentation
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-muted hover:border-border/80 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Quick Links Footer Card */}
        <div className="mt-8 pt-6 border-t border-border/50 w-full max-w-md">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Popular Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/docs/nextjs/all-components"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-card/40 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all text-left"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-medium truncate">All Components</span>
            </Link>
            <Link
              href="/docs/nextjs/installation"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-card/40 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all text-left"
            >
              <BookOpen className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-medium truncate">Installation</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
