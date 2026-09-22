"use client";

import { cn } from "@/lib/utils";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * A hover preview that renders the REAL component, not a mockup: it embeds the
 * same /preview/<name> sandbox document the docs page uses, so what a reader
 * sees floating next to a catalog card is the live demo — animations, portals
 * and all — shrunk onto a small stage.
 *
 * Two things keep 140+ cards from turning into 140+ iframes: the tooltip only
 * exists while one card is hovered (state lives with the grid, so at most one
 * is mounted), and it waits out a hover-intent delay so sweeping the cursor
 * across the grid loads nothing.
 */

/**
 * Visible stage, in CSS pixels. Its height follows the demo between these two
 * bounds: a button is a strip, a pricing section is a page, and a fixed box
 * would either strand one in empty space or crop the other.
 */
const STAGE_WIDTH = 460;
const STAGE_MIN_HEIGHT = 160;
const STAGE_MAX_HEIGHT = 300;
const HEADER_HEIGHT = 34;

/**
 * Viewport the demo actually renders at, before the stage shrinks it. Demos
 * are laid out for a desktop column; rendering one at the stage's own 460px
 * would preview a phone layout instead of the component the card advertises.
 */
const PREVIEW_VIEWPORT_WIDTH = 1024;

const ANCHOR_GAP = 14;
const VIEWPORT_MARGIN = 12;
/** Reveal the frame even if a crashed demo never signals ready. */
const READY_TIMEOUT_MS = 6000;

const PANEL_WIDTH = STAGE_WIDTH;
/** Scale that maps the demo viewport onto the stage width. */
const BASE_SCALE = STAGE_WIDTH / PREVIEW_VIEWPORT_WIDTH;
/**
 * Ceiling on the demo height taken into account. Past this a full-page section
 * shrinks into an unreadable smudge, so it is cropped instead.
 */
const MAX_CONTENT_HEIGHT = 1200;
/** Assume a stage-filling demo until it reports its real height. */
const INITIAL_CONTENT_HEIGHT = Math.round(STAGE_MAX_HEIGHT / BASE_SCALE);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

export type ComponentPreview = {
  /** Registry name of the demo (src/preview/registry.tsx). */
  name: string;
  /** Card title, shown in the panel header strip. */
  title: string;
  /** Card element the panel positions itself against. */
  anchor: HTMLElement;
};

/**
 * Owns which card (if any) is currently previewing. Kept by the grid rather
 * than by each card so only one sandbox document is ever alive.
 */
export function useComponentPreviewHover({
  delay = 280,
}: { delay?: number } = {}) {
  const [preview, setPreview] = useState<ComponentPreview | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    cancel();
    setPreview(null);
  }, [cancel]);

  const open = useCallback(
    (next: ComponentPreview) => {
      cancel();
      // Touch and pen emulate hover on tap, which would pop a preview over the
      // card the reader is trying to open. Fine pointers only.
      if (!window.matchMedia("(pointer: fine)").matches) return;
      timerRef.current = setTimeout(() => setPreview(next), delay);
    },
    [cancel, delay],
  );

  useEffect(() => cancel, [cancel]);

  /** Spread onto the card that should trigger the preview. */
  const getTriggerProps = useCallback(
    (name: string | null | undefined, title: string) => {
      if (!name) return {};
      return {
        onMouseEnter: (event: React.MouseEvent<HTMLElement>) =>
          open({ name, title, anchor: event.currentTarget }),
        onMouseLeave: close,
        onFocus: (event: React.FocusEvent<HTMLElement>) =>
          open({ name, title, anchor: event.currentTarget }),
        onBlur: close,
      };
    },
    [open, close],
  );

  return { preview, getTriggerProps, close };
}

export function ComponentPreviewTooltip({
  name,
  title,
  anchor,
}: ComponentPreview) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [contentHeight, setContentHeight] = useState(INITIAL_CONTENT_HEIGHT);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // The stage takes the demo's own height where it fits, and scales the demo
  // down past that rather than cropping it — a hero cut off at the fold
  // previews nothing useful.
  const frameHeight = clamp(contentHeight, 1, MAX_CONTENT_HEIGHT);
  const stageHeight = Math.round(
    clamp(frameHeight * BASE_SCALE, STAGE_MIN_HEIGHT, STAGE_MAX_HEIGHT),
  );
  const stageScale = Math.min(BASE_SCALE, stageHeight / frameHeight);
  const scaledWidth = PREVIEW_VIEWPORT_WIDTH * stageScale;
  const scaledHeight = frameHeight * stageScale;
  const panelHeight = stageHeight + HEADER_HEIGHT;

  // Sit beside the card where there is room, and fall back to below/above when
  // neither flank fits — a 460px panel next to a card in the last column would
  // otherwise hang off the screen.
  useIsomorphicLayoutEffect(() => {
    const update = () => {
      const rect = anchor.getBoundingClientRect();
      const { innerWidth: vw, innerHeight: vh } = window;

      const fitsRight =
        rect.right + ANCHOR_GAP + PANEL_WIDTH <= vw - VIEWPORT_MARGIN;
      const fitsLeft = rect.left - ANCHOR_GAP - PANEL_WIDTH >= VIEWPORT_MARGIN;

      let left: number;
      let top: number;

      if (fitsRight || fitsLeft) {
        left = fitsRight
          ? rect.right + ANCHOR_GAP
          : rect.left - ANCHOR_GAP - PANEL_WIDTH;
        top = rect.top + rect.height / 2 - panelHeight / 2;
      } else {
        left = rect.left + rect.width / 2 - PANEL_WIDTH / 2;
        const below = rect.bottom + ANCHOR_GAP;
        top =
          below + panelHeight <= vh - VIEWPORT_MARGIN
            ? below
            : rect.top - ANCHOR_GAP - panelHeight;
      }

      setPosition({
        left: clamp(left, VIEWPORT_MARGIN, vw - PANEL_WIDTH - VIEWPORT_MARGIN),
        top: clamp(top, VIEWPORT_MARGIN, vh - panelHeight - VIEWPORT_MARGIN),
      });
    };

    update();
    // Capture phase: the docs column is its own scroll container.
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchor, panelHeight]);

  useEffect(() => {
    setReady(false);
    setContentHeight(INITIAL_CONTENT_HEIGHT);
    const timeout = window.setTimeout(() => setReady(true), READY_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [name]);

  // The sandbox document reports when the demo has really mounted, and how tall
  // it is — so the panel never shows half-loaded markup, and never crops a demo
  // it could have fitted.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "sandbox:ready") setReady(true);
      if (data?.type === "sandbox:height" && typeof data.height === "number") {
        setContentHeight(Math.ceil(data.height));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Props travel by postMessage, exactly as SandboxFrame does. The sandbox
  // document centres the demo in its viewport on its own, which is what a
  // fixed-size preview box wants.
  const onLoad = () => {
    const target = iframeRef.current?.contentWindow;
    if (!target) return;
    target.postMessage(
      { type: "sandbox:props", props: {} },
      window.location.origin,
    );
  };

  return createPortal(
    <div
      // Decorative duplicate of the card destination, and it never takes the
      // pointer — so it cannot steal the hover that is keeping it open.
      aria-hidden
      className={cn(
        "fixed z-[60] pointer-events-none overflow-hidden rounded-xl",
        "border border-border bg-card shadow-2xl shadow-black/20",
        "animate-in fade-in zoom-in-95 duration-200",
        // The panel opens at its full height and settles onto the demo's own
        // once it reports; animating that reads as the preview arriving rather
        // than as the panel glitching.
        "transition-[height,top] duration-200 ease-out",
      )}
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        width: PANEL_WIDTH,
        height: panelHeight,
        visibility: position ? "visible" : "hidden",
      }}
    >
      <div
        className="flex items-center justify-between gap-2 border-b border-border/70 bg-muted/40 px-3"
        style={{ height: HEADER_HEIGHT }}
      >
        <span className="truncate text-[11px] font-bold tracking-tight text-foreground">
          {title}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live preview
        </span>
      </div>

      <div
        className="relative overflow-hidden bg-background"
        style={{ height: stageHeight }}
      >
        <iframe
          ref={iframeRef}
          src={`/preview/${name}`}
          title={`${title} live preview`}
          tabIndex={-1}
          onLoad={onLoad}
          className={cn(
            "absolute block border-0 transition-opacity duration-300",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={{
            // Offsets are in unscaled space; transform-origin is the top-left
            // corner, so the scaled box lands centred in the stage.
            left: (STAGE_WIDTH - scaledWidth) / 2,
            top: (stageHeight - scaledHeight) / 2,
            width: PREVIEW_VIEWPORT_WIDTH,
            height: frameHeight,
            transform: `scale(${stageScale})`,
            transformOrigin: "top left",
          }}
        />
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
            <div className="size-5 animate-spin rounded-full border-2 border-border border-t-muted-foreground" />
            <span className="text-[11px] font-medium text-muted-foreground">
              Loading preview…
            </span>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
