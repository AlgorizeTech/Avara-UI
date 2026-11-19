"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Anything with a `current` element, so both `useRef` flavours fit. */
type ElementRef = { current: HTMLElement | null };

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/** True while the user asks the OS for less motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * The index a timeline is showing, clamped to the item count. `onChange` fires
 * when it moves, not on mount.
 */
export function useActiveIndex(
  count: number,
  initial = 0,
  onChange?: (index: number) => void,
) {
  const [raw, setRaw] = useState(initial);
  const active = clamp(raw, 0, Math.max(0, count - 1));
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    onChangeRef.current?.(active);
  }, [active]);
  const set = useCallback(
    (next: number) => setRaw(clamp(next, 0, Math.max(0, count - 1))),
    [count],
  );
  return [active, set] as const;
}

/** The nearest ancestor that scrolls on its own, or null for the page. */
function scrollParentOf(el: HTMLElement | null): HTMLElement | null {
  const doc = el?.ownerDocument;
  let node = el?.parentElement ?? null;
  while (node && doc && node !== doc.body && node !== doc.documentElement) {
    const { overflowY } = getComputedStyle(node);
    if (/(auto|scroll|overlay)/.test(overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

/** What scrolls under an element, in that element's own coordinates. */
interface Viewport {
  /** Top edge of the visible area, in the element's `getBoundingClientRect` space. */
  top: number;
  height: number;
  scrolled: number;
  max: number;
  /** True when the element sits in a frame that does not scroll itself. */
  framed: boolean;
  scrollBy: (dy: number, behavior: ScrollBehavior) => void;
  /** Documents whose `scroll` events can move this viewport. */
  docs: Document[];
}

/**
 * Finds the scroll the element really follows: a scrolling ancestor, else the
 * page. Inside a same-origin frame (the docs preview) that does not scroll
 * itself, it is the scroll of the page holding the frame, mapped into the
 * frame's own coordinates.
 */
function viewportOf(host: HTMLElement): Viewport {
  const doc = host.ownerDocument;
  const win = doc.defaultView ?? window;
  const root = scrollParentOf(host);
  if (root) {
    return {
      top: root.getBoundingClientRect().top,
      height: root.clientHeight,
      scrolled: root.scrollTop,
      max: root.scrollHeight - root.clientHeight,
      framed: false,
      scrollBy: (dy, behavior) => root.scrollTo({ top: root.scrollTop + dy, behavior }),
      docs: [doc],
    };
  }
  let frame: HTMLElement | null = null;
  try {
    frame = win.frameElement as HTMLElement | null;
  } catch {
    frame = null;
  }
  if (frame) {
    const outer = viewportOf(frame);
    return {
      ...outer,
      top: outer.top - frame.getBoundingClientRect().top,
      framed: true,
      docs: [doc, ...outer.docs],
    };
  }
  return {
    top: 0,
    height: win.innerHeight,
    scrolled: win.scrollY,
    max: doc.documentElement.scrollHeight - win.innerHeight,
    framed: false,
    scrollBy: (dy, behavior) => win.scrollTo({ top: win.scrollY + dy, behavior }),
    docs: [doc],
  };
}

/**
 * Scroll-linked progress for a vertical timeline.
 *
 * Marks the point on every node (`data-tl-anchor`) and returns how far a focus
 * line has travelled down them as a fractional index: `1.4` is 40% of the way
 * from node 1 to node 2. The line sits `focus` of the way down whatever scrolls
 * (the nearest scrolling ancestor, else the page), so the same component works
 * in a page, in a fixed-height panel and in the docs preview.
 *
 * `goTo(i)` scrolls node `i` onto the focus line. When nothing can scroll it
 * just sets the progress, so a click still works.
 */
export function useScrollProgress(
  ref: ElementRef,
  count: number,
  {
    focus = 0.4,
    initial = 0,
    onChange,
  }: { focus?: number; initial?: number; onChange?: (index: number) => void } = {},
) {
  const [progress, setProgress] = useState(initial);
  const reduced = usePrefersReducedMotion();
  const last = Math.max(0, count - 1);
  const active = clamp(Math.floor(progress + 0.001), 0, last);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    onChangeRef.current?.(active);
  }, [active]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let frame = 0;
    let visible = true;

    const measure = () => {
      frame = 0;
      if (!visible) return;
      const anchors = host.querySelectorAll<HTMLElement>("[data-tl-anchor]");
      if (anchors.length === 0) return;
      const view = viewportOf(host);
      // Nothing scrolls: leave the progress to goTo().
      if (view.max <= 4) return;
      const focusY = view.top + view.height * focus;
      const ys = Array.from(anchors, (a) => {
        const r = a.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      let p = 0;
      if (focusY >= ys[ys.length - 1]) p = ys.length - 1;
      else if (focusY > ys[0]) {
        for (let i = 0; i < ys.length - 1; i++) {
          if (focusY <= ys[i + 1]) {
            p = i + (focusY - ys[i]) / (ys[i + 1] - ys[i] || 1);
            break;
          }
        }
      }
      // The last node can sit below the focus line even at the end of the
      // scroll, so the end of the scroll counts as having reached it. A framed
      // timeline sits mid-page, so the end of the page says nothing about it.
      if (!view.framed && view.scrolled >= view.max - 2) p = ys.length - 1;
      const next = Math.round(p * 100) / 100;
      setProgress((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) schedule();
          })
        : null;
    observer?.observe(host);

    // `scroll` does not bubble, but capturing on a document hears its page and
    // every scrolling panel with one listener. A framed timeline also listens
    // to the page that holds the frame.
    const docs = viewportOf(host).docs;
    const wins: Window[] = [];
    for (const d of docs) if (d.defaultView) wins.push(d.defaultView);
    docs.forEach((d) =>
      d.addEventListener("scroll", schedule, { passive: true, capture: true }),
    );
    wins.forEach((w) => w.addEventListener("resize", schedule));
    const resize =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resize?.observe(host);
    schedule();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      resize?.disconnect();
      docs.forEach((d) => d.removeEventListener("scroll", schedule, { capture: true }));
      wins.forEach((w) => w.removeEventListener("resize", schedule));
    };
  }, [ref, focus, count]);

  const goTo = useCallback(
    (index: number) => {
      const host = ref.current;
      if (!host) return;
      const i = clamp(index, 0, last);
      const anchors = host.querySelectorAll<HTMLElement>("[data-tl-anchor]");
      const target = anchors[i];
      if (!target) return;
      const view = viewportOf(host);
      if (view.max <= 4) {
        setProgress(i);
        return;
      }
      const r = target.getBoundingClientRect();
      const delta = r.top + r.height / 2 - (view.top + view.height * focus);
      view.scrollBy(delta + 1, reduced ? "auto" : "smooth");
    },
    [ref, focus, last, reduced],
  );

  return { progress, active, goTo };
}

/**
 * Wheel, arrow keys and vertical drag for a timeline that steps through its
 * items rather than scrolling. The wheel only steps while there is somewhere to
 * go, so the page keeps scrolling at either end.
 */
export function useStepControls(
  ref: ElementRef,
  { count, active, onStep }: { count: number; active: number; onStep: (delta: number) => void },
) {
  const state = useRef({ count, active, onStep });
  useEffect(() => {
    state.current = { count, active, onStep };
  }, [count, active, onStep]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastWheel = 0;
    let down = false;
    let moved = false;
    let startY = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = state.current.active + dir;
      if (next < 0 || next >= state.current.count) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel < 380) return;
      lastWheel = now;
      state.current.onStep(dir);
    };
    const onKey = (e: KeyboardEvent) => {
      const step =
        e.key === "ArrowDown" || e.key === "ArrowRight"
          ? 1
          : e.key === "ArrowUp" || e.key === "ArrowLeft"
            ? -1
            : e.key === "Home"
              ? -state.current.count
              : e.key === "End"
                ? state.current.count
                : 0;
      if (!step) return;
      e.preventDefault();
      state.current.onStep(step);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true;
      moved = false;
      startY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dy = e.clientY - startY;
      if (Math.abs(dy) >= 44) {
        state.current.onStep(dy < 0 ? 1 : -1);
        startY = e.clientY;
        moved = true;
      }
    };
    const onUp = () => {
      down = false;
    };
    // A drag that stepped should not also click the item it ended on.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        moved = false;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("keydown", onKey);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("click", onClick, true);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("click", onClick, true);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [ref]);
}
