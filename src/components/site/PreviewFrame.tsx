"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const CLONE_MARK = "data-preview-frame-clone";

/**
 * Renders children inside a same-origin iframe so viewport-based CSS
 * (Tailwind sm:/md:/lg: media queries) responds to the preview width
 * instead of the browser window — the preview behaves like a real screen.
 * Stylesheets, fonts and the next-themes dark class are mirrored from the
 * parent document and kept in sync.
 */
export function PreviewFrame({
  children,
  minHeight = 550,
  maxHeight = 1400,
  className,
  title = "Component preview",
  frameWidth,
  scale = 1,
}: {
  children: React.ReactNode;
  minHeight?: number;
  /**
   * Hard cap on the frame height; taller content scrolls inside the frame.
   * Required: vh-sized content (h-screen, h-[300vh]) resolves against the
   * frame height, so an uncapped auto-height frame would grow without bound.
   */
  maxHeight?: number;
  className?: string;
  title?: string;
  /** Fixed viewport width in px; required when scale < 1. Omit to fill the container. */
  frameWidth?: number;
  /** Visually shrinks the frame (real viewport stays frameWidth) so wide devices fit small screens. */
  scale?: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState<number>(minHeight);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let disposed = false;
    let initializedDoc: Document | null = null;
    let docCleanups: Array<() => void> = [];

    const init = () => {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      if (!doc || !win || disposed || doc === initializedDoc) return;
      docCleanups.forEach((fn) => fn());
      docCleanups = [];
      initializedDoc = doc;
      setReady(false);

      // Root-relative asset URLs (fonts, images) must resolve against the site.
      if (!doc.querySelector("base")) {
        const base = doc.createElement("base");
        base.href = document.baseURI;
        doc.head.appendChild(base);
      }

      // Mirror <html>/<body> attributes: dark mode class, color-scheme, font vars.
      const syncRootAttrs = () => {
        const from = document.documentElement;
        const to = doc.documentElement;
        for (const attr of ["class", "style", "lang", "dir", "data-theme"]) {
          const value = from.getAttribute(attr);
          if (value === null) to.removeAttribute(attr);
          else to.setAttribute(attr, value);
        }
      };
      const syncBody = () => {
        doc.body.className = document.body.className;
        doc.body.style.margin = "0";
        doc.body.style.padding = "0";
        // Transparent so the preview surface behind the iframe shows through.
        doc.body.style.background = "transparent";
      };
      syncRootAttrs();
      syncBody();

      const themeObserver = new MutationObserver(() => {
        syncRootAttrs();
        syncBody();
      });
      themeObserver.observe(document.documentElement, { attributes: true });
      themeObserver.observe(document.body, { attributes: true });
      docCleanups.push(() => themeObserver.disconnect());

      // Mirror stylesheets from the parent document into the frame. Clones are
      // keyed to their source node so an unrelated head mutation (e.g. the
      // scroll-lock <style> injected while the theme sheet is open) doesn't
      // tear down and re-apply every stylesheet in the frame, which makes the
      // preview flash, jump and reflow.
      let firstSync = true;
      const syncStyles = () => {
        if (disposed) return;
        const currentLinks = Array.from(
          document.querySelectorAll<HTMLLinkElement>(
            'link[rel*="stylesheet"], style',
          ),
        );
        const existingClones = new Map<
          Element,
          HTMLLinkElement | HTMLStyleElement
        >();
        doc.querySelectorAll<HTMLElement>(`[${CLONE_MARK}]`).forEach((node) => {
          const key = (node as any).__sourceNode;
          if (key) existingClones.set(key, node as any);
        });

        currentLinks.forEach((sourceNode) => {
          if (existingClones.has(sourceNode)) {
            existingClones.delete(sourceNode);
            return;
          }
          const clone = sourceNode.cloneNode(true) as
            | HTMLLinkElement
            | HTMLStyleElement;
          clone.setAttribute(CLONE_MARK, "true");
          (clone as any).__sourceNode = sourceNode;
          doc.head.appendChild(clone);
        });

        existingClones.forEach((clone) => clone.remove());

        if (firstSync) {
          firstSync = false;
          let revealed = false;
          const reveal = () => {
            if (!disposed && !revealed) {
              revealed = true;
              setReady(true);
            }
          };
          // A parsed stylesheet exposes .sheet — poll the LIVE clones in the
          // frame and don't trust load events, which are unreliable on cloned
          // links.
          const poll = window.setInterval(() => {
            const liveLinks = Array.from(
              doc.querySelectorAll<HTMLLinkElement>(`link[${CLONE_MARK}]`),
            );
            if (liveLinks.every((l) => l.sheet !== null)) {
              window.clearInterval(poll);
              reveal();
            }
          }, 60);
          // Safety net if a stylesheet never parses (slow dev compiles)
          window.setTimeout(() => {
            window.clearInterval(poll);
            reveal();
          }, 4000);
          docCleanups.push(() => window.clearInterval(poll));
        }
      };
      syncStyles();

      let styleSyncQueued = false;
      const headObserver = new MutationObserver(() => {
        if (styleSyncQueued) return;
        styleSyncQueued = true;
        requestAnimationFrame(() => {
          styleSyncQueued = false;
          if (!disposed) syncStyles();
        });
      });
      headObserver.observe(document.head, { childList: true, subtree: true });
      docCleanups.push(() => headObserver.disconnect());

      // Mount node the React portal renders into.
      const mount = doc.createElement("div");
      mount.style.display = "flex";
      mount.style.alignItems = "center";
      mount.style.justifyContent = "center";
      mount.style.width = "100%";
      mount.style.boxSizing = "border-box";
      mount.style.padding = "12px 0px 12px 0px";
      mount.style.margin = "0px";
      mount.style.minHeight = `${minHeight}px`;
      doc.body.appendChild(mount);
      setMountNode(mount);
      docCleanups.push(() => {
        setMountNode(null);
        mount.remove();
      });

      // Auto-size the iframe to whatever the frame document contains —
      // including popups portaled to the frame body below the content —
      // so nothing gets clipped by the frame edge.
      const updateHeight = () => {
        if (disposed) return;
        const scroller = doc.scrollingElement || doc.documentElement;
        let needed = minHeight;
        for (const child of Array.from(doc.body.children)) {
          const bottom = child.getBoundingClientRect().bottom + scroller.scrollTop;
          if (bottom > needed) needed = bottom;
        }
        setHeight(Math.min(maxHeight, Math.ceil(needed)));
      };

      const FrameResizeObserver =
        (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
      const sizeObserver = new FrameResizeObserver(updateHeight);
      sizeObserver.observe(mount);
      docCleanups.push(() => sizeObserver.disconnect());

      let heightQueued = false;
      const bodyObserver = new MutationObserver(() => {
        if (heightQueued) return;
        heightQueued = true;
        requestAnimationFrame(() => {
          heightQueued = false;
          updateHeight();
        });
      });
      bodyObserver.observe(doc.body, { childList: true, subtree: true });
      docCleanups.push(() => bodyObserver.disconnect());

      // Animation libraries running in the parent realm (motion)
      // schedule WAAPI startTimes on the parent page's clock, but the
      // animations run on this document's timeline, which starts at zero when
      // the frame is created. That schedules every entrance animation seconds
      // into the future — frozen at its first keyframe. Rebase such
      // animations by the constant timeline offset (staggers/delays survive).
      const rebased = new WeakSet<Animation>();
      const rebaseAnimations = () => {
        if (disposed || !doc.getAnimations) return;
        const frameNow = Number(doc.timeline?.currentTime);
        const parentNow = Number(document.timeline?.currentTime);
        if (!Number.isFinite(frameNow) || !Number.isFinite(parentNow)) return;
        const skew = parentNow - frameNow;
        if (skew < 1000) return;
        for (const anim of doc.getAnimations()) {
          if (rebased.has(anim)) continue;
          const start = Number(anim.startTime);
          if (Number.isFinite(start) && start - frameNow > Math.min(1000, skew / 2)) {
            anim.startTime = start - skew;
            rebased.add(anim);
          }
        }
      };
      const rebaseTimer = window.setInterval(rebaseAnimations, 250);
      docCleanups.push(() => window.clearInterval(rebaseTimer));

      // Hand wheel scrolling back to the page when nothing inside can scroll,
      // otherwise the frame swallows the event and the page freezes under it.
      const onWheel = (event: WheelEvent) => {
        // event.target lives in the iframe's realm, so a parent-window
        // `instanceof Element` check is always false — test nodeType instead.
        const target = event.target as Node | null;
        let el: Element | null =
          target && target.nodeType === Node.ELEMENT_NODE ? (target as Element) : null;
        while (el && el !== doc.documentElement) {
          const style = win.getComputedStyle(el);
          const canY =
            /(auto|scroll|overlay)/.test(style.overflowY) && el.scrollHeight > el.clientHeight;
          const canX =
            /(auto|scroll|overlay)/.test(style.overflowX) && el.scrollWidth > el.clientWidth;
          if (
            canY &&
            (event.deltaY < 0
              ? el.scrollTop > 0
              : el.scrollTop + el.clientHeight < el.scrollHeight - 1)
          )
            return;
          if (
            canX &&
            (event.deltaX < 0
              ? el.scrollLeft > 0
              : el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
          )
            return;
          el = el.parentElement;
        }
        // Capped frames scroll at the document level — let that happen natively.
        const scroller = doc.scrollingElement || doc.documentElement;
        if (
          scroller.scrollHeight > scroller.clientHeight &&
          (event.deltaY < 0
            ? scroller.scrollTop > 0
            : scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1)
        )
          return;
        event.preventDefault();
        window.scrollBy({ top: event.deltaY, left: event.deltaX });
      };
      doc.addEventListener("wheel", onWheel, { passive: false });
      docCleanups.push(() => doc.removeEventListener("wheel", onWheel));
    };

    // contentDocument is usually available synchronously for src-less iframes,
    // but some browsers swap in the final about:blank document asynchronously.
    iframe.addEventListener("load", init);
    if (iframe.contentDocument?.readyState === "complete") init();

    return () => {
      disposed = true;
      iframe.removeEventListener("load", init);
      docCleanups.forEach((fn) => fn());
      docCleanups = [];
    };
  }, [minHeight, maxHeight]);

  const scaled = scale !== 1 && frameWidth !== undefined;

  return (
    <>
      <div
        className={cn("relative w-full overflow-hidden", className)}
        style={{ height: Math.round(height * (scaled ? scale : 1)) }}
      >
        <iframe
          ref={iframeRef}
          title={title}
          className={cn(
            "absolute top-0 left-0 block border-0 transition-opacity duration-300",
            ready && mountNode ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: scaled ? `${frameWidth}px` : "100%",
            height,
            transform: scaled ? `scale(${scale})` : undefined,
            transformOrigin: "top left",
          }}
        />
      </div>
      {/* Mount children only once the frame is revealed: a hidden (opacity-0)
          iframe is render-throttled by the browser, which freezes WAAPI/motion
          entrance animations at their initial state. */}
      {mountNode && ready ? createPortal(children, mountNode) : null}
    </>
  );
}
