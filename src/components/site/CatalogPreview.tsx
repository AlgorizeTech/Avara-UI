"use client";

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { CatalogPreviewSpec } from "@/components/site/catalog-previews";

/**
 * Pixels beyond the viewport at which a card starts loading its component.
 * Far enough that it is ready as it scrolls in, near enough that a long page
 * never has more than a screen or two of live previews at once.
 */
const LOAD_MARGIN = "200px 0px";

/**
 * Pause after a card becomes near before its component mounts. It lets the
 * page's first paint, LCP and hydration finish first, and a fast scroll past a
 * card never loads it.
 */
const MOUNT_DELAY_MS = 350;

/**
 * Re-measure after mount at these delays: entrance animations and late-loading
 * content move things for a moment, and the fit should settle on the final layout.
 */
const REMEASURE_MS = [500, 1400, 3000];

/** Breathing room kept between the component and the panel edge, in card px. */
const PANEL_PADDING = 9;

/**
 * Most previews that may be live at once, page-wide. A screenful of cards is
 * about a dozen; beyond that a card waits (an empty panel, exactly what the
 * server rendered) until another scrolls away. It bounds the work a long page
 * or a crawler with a very tall viewport can start at the same moment.
 */
const MAX_LIVE = 14;
const liveSlots = {
  active: new Set<symbol>(),
  queue: [] as { id: symbol; grant: () => void }[],
};

function requestSlot(id: symbol, grant: () => void) {
  if (liveSlots.active.size < MAX_LIVE) {
    liveSlots.active.add(id);
    grant();
  } else {
    liveSlots.queue.push({ id, grant });
  }
}

function releaseSlot(id: symbol) {
  liveSlots.active.delete(id);
  liveSlots.queue = liveSlots.queue.filter((entry) => entry.id !== id);
  while (liveSlots.active.size < MAX_LIVE && liveSlots.queue.length) {
    const next = liveSlots.queue.shift()!;
    liveSlots.active.add(next.id);
    next.grant();
  }
}

/**
 * Best-effort guard against video and audio loading inside a card: demos can
 * autoplay full-size clips, which would stream tens of megabytes for a thumbnail.
 * Stripped of their source they show their poster instead. It is not airtight:
 * React can set `src` while rendering, before the element is inserted, and the
 * browser may start fetching then. A demo that plays media therefore needs a
 * card scene without a source (see catalog-scenes/VideoAccordionScene).
 */
function silenceMedia(root: HTMLElement): () => void {
  const strip = (media: HTMLMediaElement) => {
    media.autoplay = false;
    media.removeAttribute("autoplay");
    media.preload = "none";
    media.muted = true;
    let changed = false;
    for (const el of [media, ...media.querySelectorAll("source")]) {
      const src = el.getAttribute("src");
      if (src) {
        el.setAttribute("data-card-src", src);
        el.removeAttribute("src");
        changed = true;
      }
    }
    if (changed) media.load();
  };
  const scan = (node: Node) => {
    if (!(node instanceof Element)) return;
    if (node instanceof HTMLMediaElement) strip(node);
    node.querySelectorAll<HTMLMediaElement>("video, audio").forEach(strip);
  };
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") scan(record.target);
      record.addedNodes.forEach(scan);
    }
  });
  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "autoplay"],
  });
  scan(root);
  return () => observer.disconnect();
}

type Box = { left: number; top: number; right: number; bottom: number };

/**
 * Live previews download a component's code each, so they are skipped for
 * readers who asked to save data or are on a slow connection: those cards keep
 * their static miniature and fetch nothing.
 */
function liveAllowed(): boolean {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /^(slow-2g|2g|3g)$/.test(connection.effectiveType)) {
    return false;
  }
  return !window.matchMedia("(prefers-reduced-data: reduce)").matches;
}

/** Catches a demo that throws, so one broken card never blanks the grid. */
class PreviewBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The part of the stage a reader would actually see, in the stage's own
 * (unscaled) pixels: the union of every rendered element, each clipped by the
 * overflow of its ancestors. Measuring what is drawn rather than the container's
 * box is what keeps overflowing text, absolutely positioned pieces and shadows
 * from being cut off, while content hidden inside an inner scroller is ignored.
 */
function measureVisible(stage: HTMLElement): Box | null {
  const stageRect = stage.getBoundingClientRect();
  const k = stageRect.width / stage.offsetWidth || 1;
  const clipCache = new Map<Element, DOMRect | null>();

  /** The rect an element's descendants are clipped to, or null if they are not. */
  const clipOf = (el: Element): DOMRect | null => {
    if (clipCache.has(el)) return clipCache.get(el)!;
    const style = getComputedStyle(el);
    const clips =
      style.overflowX !== "visible" ||
      style.overflowY !== "visible" ||
      style.contain.includes("paint");
    const rect = clips ? el.getBoundingClientRect() : null;
    clipCache.set(el, rect);
    return rect;
  };

  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const node of stage.querySelectorAll("*")) {
    const style = getComputedStyle(node);
    // The stage is visibility:hidden until settled, so only display:none counts as absent.
    if (style.display === "none") continue;
    const r = node.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    let l = r.left;
    let t = r.top;
    let rt = r.right;
    let b = r.bottom;
    for (let p = node.parentElement; p && p !== stage; p = p.parentElement) {
      const clip = clipOf(p);
      if (!clip) continue;
      l = Math.max(l, clip.left);
      t = Math.max(t, clip.top);
      rt = Math.min(rt, clip.right);
      b = Math.min(b, clip.bottom);
    }
    if (rt <= l || b <= t) continue;
    left = Math.min(left, l);
    top = Math.min(top, t);
    right = Math.max(right, rt);
    bottom = Math.max(bottom, b);
  }

  if (!Number.isFinite(left)) return null;
  return {
    left: (left - stageRect.left) / k,
    top: (top - stageRect.top) / k,
    right: (right - stageRect.left) / k,
    bottom: (bottom - stageRect.top) / k,
  };
}

/**
 * The live preview inside a catalog card: the real component, laid out at
 * `spec.width`, measured, then scaled down and centred so the WHOLE thing is
 * visible inside the panel. Nothing is cropped.
 *
 * Built so the page stays cheap:
 *  - the server HTML is an empty, fixed-ratio panel, so the card costs no DOM
 *    and no layout shift before it loads;
 *  - the component's chunk is requested only once the card is near the viewport,
 *    and mounted after a short delay, so first paint is never competing with it;
 *  - it is unmounted again when the card scrolls far away, so animation loops
 *    and timers are bounded by what is on screen, not by the length of the page;
 *  - it is `inert`, so it adds nothing to the tab order or the accessibility
 *    tree: the card's own link is the one control and the one label.
 */
export function CatalogPreview({
  spec,
  fallback,
}: {
  spec: CatalogPreviewSpec;
  /** Shown only if the demo crashes; until then the panel is simply empty. */
  fallback?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState({ width: 0, height: 0 });
  const [box, setBox] = useState<Box | null>(null);
  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  // Decided on the client after hydration; the server renders the empty panel either way.
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (!liveAllowed()) setAllowed(false);
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || !allowed) return;
    const resize = new ResizeObserver(([entry]) =>
      setPanel({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    const visibility = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: LOAD_MARGIN },
    );
    resize.observe(el);
    visibility.observe(el);
    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, [allowed]);

  useEffect(() => {
    if (!near) {
      setMounted(false);
      setBox(null);
      return;
    }
    const id = Symbol("catalog-preview");
    const timer = window.setTimeout(
      () => requestSlot(id, () => setMounted(true)),
      MOUNT_DELAY_MS,
    );
    return () => {
      window.clearTimeout(timer);
      releaseSlot(id);
    };
  }, [near]);

  const live = mounted && !failed && allowed;

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const next = measureVisible(stage);
    if (!next) return;
    setBox((prev) =>
      prev &&
      Math.abs(prev.left - next.left) < 1 &&
      Math.abs(prev.top - next.top) < 1 &&
      Math.abs(prev.right - next.right) < 1 &&
      Math.abs(prev.bottom - next.bottom) < 1
        ? prev
        : next,
    );
  }, []);

  // Measure when the stage resizes and again a few times as it settles.
  useEffect(() => {
    const stage = stageRef.current;
    if (!live || !stage) return;
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    const timers = REMEASURE_MS.map((ms) => window.setTimeout(measure, ms));
    return () => {
      resize.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, [live, measure]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!live || !stage) return;
    return silenceMedia(stage);
  }, [live]);

  const { component: Demo, width, props } = spec;
  const ready = live && panel.width > 0 && box !== null;

  // Unscaled until measured: measuring needs real (non-zero) rects.
  let transform = "translate(0px, 0px) scale(1)";
  if (ready && box) {
    const boxWidth = Math.max(box.right - box.left, 1);
    const boxHeight = Math.max(box.bottom - box.top, 1);
    // Fit inside the padded panel, and never scale a component up past 1:1.
    const scale = Math.min(
      1,
      (panel.width - PANEL_PADDING * 2) / boxWidth,
      (panel.height - PANEL_PADDING * 2) / boxHeight,
    );
    const centreX = (box.left + box.right) / 2;
    const centreY = (box.top + box.bottom) / 2;
    transform = `translate(${panel.width / 2 - centreX * scale}px, ${
      panel.height / 2 - centreY * scale
    }px) scale(${scale})`;
  }

  return (
    <div ref={panelRef} className="absolute inset-0 overflow-hidden contain-[paint]">
      {(failed || !allowed) && fallback && (
        <div className="absolute inset-0 p-2">{fallback}</div>
      )}
      {live && (
        <div
          ref={stageRef}
          aria-hidden
          // React 19 types `inert` as a boolean; older typings reject it.
          {...({ inert: true } as object)}
          className="pointer-events-none absolute left-0 top-0 origin-top-left select-none **:cursor-default!"
          style={{
            width,
            transform,
            // Hidden (not just transparent) until settled: the browser ignores a
            // hidden element when scoring layout shift, so the component loading in
            // and being scaled to fit cannot count against the page.
            visibility: ready ? "visible" : "hidden",
            opacity: ready ? 1 : 0,
            transition: "opacity 300ms ease-out",
          }}>
          <div className="flex w-full justify-center">
            <PreviewBoundary onError={() => setFailed(true)}>
              <Suspense fallback={null}>
                <Demo {...props} />
              </Suspense>
            </PreviewBoundary>
          </div>
        </div>
      )}
    </div>
  );
}
