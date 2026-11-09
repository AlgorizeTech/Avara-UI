"use client";

/**
 * Client pieces of the variant viewer (/view). Site-only, never shipped.
 *
 * Both reuse SandboxFrame, the same iframe the docs previews use, so a variant
 * here is exactly what the docs show: same demo, same props, same height
 * reporting.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SandboxFrame } from "./SandboxFrame";

type FrameSource = {
  /** Preview demo name (`/preview/<demo>`). */
  demo: string;
  /** Sent as `?props=`; omit when the demo hard-codes the look. */
  props?: Record<string, unknown>;
};

/** Width of the real viewport a "desktop" preview is rendered at. */
const DESKTOP_WIDTH = 1280;

/**
 * Renders the demo at `viewport` px wide and shrinks it visually to fit the
 * space it has, so breakpoints match the chosen device even in a narrow column.
 * Waits for a width measurement first, so it never paints at the wrong scale.
 */
function FitFrame({
  demo,
  props,
  viewport,
  minHeight,
}: FrameSource & { viewport: number; minHeight?: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => setWidth(host.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const scale = width > 0 ? Math.min(1, width / viewport) : 1;
  const frameWidth = Math.round(viewport * scale);

  return (
    <div ref={hostRef} className="w-full">
      {width > 0 && (
        <div className="mx-auto" style={{ width: frameWidth }}>
          <SandboxFrame
            name={demo}
            sandboxProps={props}
            viewportWidth={viewport}
            scale={scale}
            minHeight={minHeight}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gallery thumbnail
// ---------------------------------------------------------------------------

/** Previews boot one after another, a beat apart, never all at once. */
let queue: Promise<void> = Promise.resolve();
function nextSlot(): Promise<void> {
  const turn = queue.then(() => new Promise<void>((resolve) => setTimeout(resolve, 350)));
  queue = turn;
  return turn;
}

/**
 * A live, desktop-width, cropped view of one variant. Boots only once it nears
 * the viewport, and in its turn. The whole thing is a link to the single view.
 */
export function GalleryPreview({
  demo,
  props,
  href,
  label,
}: FrameSource & { href: string; label: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || mounted) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        nextSlot().then(() => {
          if (!cancelled) setMounted(true);
        });
      },
      { rootMargin: "300px" },
    );
    observer.observe(root);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [mounted]);

  return (
    <div
      ref={rootRef}
      className="relative h-[300px] overflow-hidden rounded-xl border border-border bg-muted/30 sm:h-[340px]"
    >
      {mounted ? (
        <div className="pointer-events-none">
          <FitFrame demo={demo} props={props} viewport={DESKTOP_WIDTH} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-xs font-medium text-foreground/40">
          Live preview loads as you scroll
        </div>
      )}
      <Link href={href} aria-label={`Open ${label} full size`} className="absolute inset-0 z-10" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single variant stage
// ---------------------------------------------------------------------------

const DEVICES = [
  { id: "phone", label: "Phone", width: 390 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "desktop", label: "Desktop", width: DESKTOP_WIDTH },
] as const;

/** The variant at full size with a Phone / Tablet / Desktop switch. */
export function VariantStage({ demo, props, label }: FrameSource & { label: string }) {
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");
  const current = DEVICES.find((d) => d.id === device) ?? DEVICES[2];

  // A phone-sized screen opens on the Phone width: a 1280px desktop frame
  // scaled into 350px is unreadable. The server renders Desktop, so this runs
  // after mount; the visitor's own choice is never overridden afterwards.
  useEffect(() => {
    if (window.innerWidth < 640) setDevice("phone");
  }, []);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-foreground/60">
          {label} <span className="text-foreground/40">· {current.width}px wide</span>
        </span>
        <div role="group" aria-label="Preview width" className="inline-flex rounded-full border border-border bg-muted/40 p-0.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDevice(d.id)}
              aria-pressed={device === d.id}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors",
                device === d.id
                  ? "bg-foreground text-background"
                  : "text-foreground/60 hover:text-foreground",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <FitFrame key={device} demo={demo} props={props} viewport={current.width} minHeight={420} />
      </div>
    </div>
  );
}
