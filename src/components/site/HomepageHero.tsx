"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarStack, type StackAvatar } from "@/components/custom/blocks/AvatarStackBlock";
import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";
import type { WallItem } from "@/components/custom/blocks/ImageWallBlock";

// ------------------------------------------
// Geometry matching original ImageWall
// ------------------------------------------
const CARD_W = 384;
const GAP = 12;
const COL_W = CARD_W + GAP;
const STAGGER = 0;
const CARD_BORDER = 1;
const CARD_PAD = 6;
const CAPTION_H = 16;
const FRAME_W = CARD_W - (CARD_BORDER + CARD_PAD) * 2;
export const FRAME_RATIO = 493 / 332;
const FRAME_H = Math.round(FRAME_W / FRAME_RATIO);
const CARD_H = CARD_BORDER + CARD_PAD + CAPTION_H + CARD_PAD + FRAME_H + CARD_PAD + CARD_BORDER;

const REST_DIM = 0.55;
const CENTER_TILE = "0,0";
const BAND_ZOOM = 0.72;
const PHONE_ZOOM = 0.5;

interface Placed extends WallItem {
  left: number;
  top: number;
}

function layout(items: WallItem[], columns: number) {
  const bottoms = Array.from({ length: columns }, () => 0);
  const placed: Placed[] = items.map((item, i) => {
    const c = i % columns;
    const card = { ...item, left: c * COL_W, top: bottoms[c] };
    bottoms[c] += CARD_H + GAP;
    return card;
  });
  return { placed, width: columns * COL_W, height: Math.max(...bottoms) };
}

// ------------------------------------------
// Static Wall Card (Zero movement, exact original style)
// ------------------------------------------
const WallCard = React.memo(function WallCard({
  card,
  left,
  top,
  copy,
  isFocus,
}: {
  card: Placed;
  left: number;
  top: number;
  copy: boolean;
  isFocus: boolean;
}) {
  return (
    <figure
      aria-hidden={copy || undefined}
      className="absolute flex flex-col gap-1.5 overflow-hidden rounded-xl border border-foreground/10 bg-muted p-1.5 shadow-sm"
      style={{
        left,
        top,
        width: CARD_W,
        height: CARD_H,
        opacity: isFocus ? 1 : REST_DIM,
      }}
    >
      <figcaption className="flex h-4 shrink-0 items-center px-1 font-mono text-[9px] leading-none text-muted-foreground">
        {card.title}
      </figcaption>
      <div
        className="relative min-h-0 overflow-hidden rounded-lg border border-foreground/10 bg-card"
        style={{ height: FRAME_H }}
      >
        <img
          src={card.image}
          alt=""
          width={FRAME_W}
          height={FRAME_H}
          loading="eager"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
        />
      </div>
    </figure>
  );
});

// ------------------------------------------
// Static Image Wall: Infinite tiled wall covering all zoom levels, with ZERO flight/motion animations
// ------------------------------------------
function StaticImageWall({
  items,
  columns = 4,
  zoom = 1.35,
  mobileZoom,
  anchor,
  className,
  ...props
}: {
  items: WallItem[];
  columns?: number;
  zoom?: number;
  mobileZoom?: number;
  anchor?: { x?: number; y?: number };
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ax = anchor?.x ?? 0.5;
  const ay = anchor?.y ?? 0.5;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef({ x: 0, y: 0, s: zoom });

  const { placed, width, height } = useMemo(() => layout(items, columns), [items, columns]);
  const tileRef = useRef({ width, height });
  tileRef.current = { width, height };

  const [tiles, setTiles] = useState(CENTER_TILE);
  const tilesRef = useRef(CENTER_TILE);
  const sizeRef = useRef({ w: 0, h: 0 });

  const cull = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const { x, y, s } = cameraRef.current;
    const { width: tw, height: th } = tileRef.current;
    let { w, h } = sizeRef.current;
    if (!w || !h) {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
    }
    const near = (dx: number, dy: number, m: number) =>
      dx * tw < (w - x) / s + m &&
      (dx + 1) * tw > -x / s - m &&
      dy * th < (h - y) / s + m &&
      (dy + 1) * th > -y / s - m;
    const current = new Set(tilesRef.current.split("|"));
    const keep: string[] = [];
    // Covers wide zoom-outs smoothly
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const id = `${dx},${dy}`;
        if (near(dx, dy, CARD_W) || (current.has(id) && near(dx, dy, CARD_W * 2))) keep.push(id);
      }
    }
    const key = keep.join("|") || CENTER_TILE;
    if (key !== tilesRef.current) {
      tilesRef.current = key;
      setTiles(key);
    }
  }, []);

  const paint = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    const { x, y, s } = cameraRef.current;
    el.style.translate = `${x}px ${y}px`;
    el.style.scale = String(s);
    el.style.opacity = "1";
    cull();
  }, [cull]);

  const restFor = useCallback(
    (i: number) => {
      const wrap = wrapRef.current;
      const card = placed[i];
      if (!wrap || !card) return { x: 0, y: 0, s: zoom };
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      const s =
        mobileZoom !== undefined
          ? mobileZoom
          : W <= 640
            ? Math.min(zoom, PHONE_ZOOM)
            : H < 420
              ? Math.min(zoom, BAND_ZOOM)
              : zoom;
      const cx = card.left + CARD_W / 2;
      const cy = card.top + CARD_H / 2;
      return { x: W * ax - s * cx, y: H * ay - s * cy, s };
    },
    [placed, zoom, mobileZoom, ax, ay],
  );

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    sizeRef.current = { w: wrap.clientWidth, h: wrap.clientHeight };
    const snap = () => {
      sizeRef.current = { w: wrap.clientWidth, h: wrap.clientHeight };
      cameraRef.current = restFor(0);
      paint();
    };
    snap();
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(snap);
    ro?.observe(wrap);
    return () => ro?.disconnect();
  }, [restFor, paint]);

  const offsets = useMemo(
    () =>
      tiles.split("|").map((t) => {
        const [dx, dy] = t.split(",").map(Number);
        return { dx, dy };
      }),
    [tiles],
  );

  const cards = useMemo(
    () =>
      offsets.map(({ dx, dy }) => {
        const copy = dx !== 0 || dy !== 0;
        return placed.map((card, i) => (
          <WallCard
            key={`${dx},${dy},${i}`}
            card={card}
            left={card.left + dx * width}
            top={card.top + dy * height}
            copy={copy}
            isFocus={!copy && i === 0}
          />
        ));
      }),
    [offsets, placed, width, height],
  );

  return (
    <div
      role="img"
      aria-label="Static component wall"
      {...props}
      ref={wrapRef}
      className={cn("relative h-96 w-full overflow-hidden", className)}
    >
      <div
        ref={canvasRef}
        className="absolute left-0 top-0 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ width, height, transformOrigin: "0 0" }}
      >
        <div className="absolute inset-0">
          {cards}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// Homepage Hero
// ------------------------------------------
export interface HomepageHeroItem extends WallItem {
  slug?: string;
}

export interface HomepageHeroProps extends React.HTMLAttributes<HTMLElement> {
  badge?: { label: string; href?: string };
  heading: string;
  headingWords?: string[];
  wordInterval?: number;
  accent?: string;
  description?: React.ReactNode;
  install?: { command: string };
  primaryAction?: { label: string; href: string; icon?: React.ReactNode };
  secondaryAction?: { label: string; href: string; icon?: React.ReactNode };
  trust?: { text: string; avatars?: StackAvatar[]; rating?: number };
  items: HomepageHeroItem[];
  interval?: number;
  stack?: React.ReactNode;
  linkComponent?: React.ElementType;
}

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ITEM_TOKEN = "{item}";
const WORD_TOKEN = "{word}";
const bare = (w: string) => w.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

const STYLES = `
@keyframes cw-rise { from { opacity: 0; transform: translateY(14px); } }
@keyframes cw-word-in { from { opacity: 0; transform: translateY(20px); filter: blur(8px); } }
@keyframes cw-word-out { to { opacity: 0; transform: translateY(-20px); filter: blur(8px); } }
@keyframes cw-name-in { from { opacity: 0; transform: translateY(110%); } }
@keyframes cw-name-out { to { opacity: 0; transform: translateY(-110%); } }
@media (prefers-reduced-motion: no-preference) {
  .cw-rise-group:not([data-in-view]) .cw-rise { opacity: 0; transform: translateY(14px); }
  .cw-rise-group[data-in-view] .cw-rise { animation: cw-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--cw-i) * 0.1s) backwards; }
  .cw-tools-in { animation: cw-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s backwards; }
}
.cw-word-in { animation: cw-word-in 0.6s cubic-bezier(0, 0, 0.58, 1) backwards; }
.cw-word-out { animation: cw-word-out 0.6s cubic-bezier(0, 0, 0.58, 1) forwards; }
.cw-name-in { animation: cw-name-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.cw-name-out { animation: cw-name-out 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
`;

const START_ANCHOR = { x: 0.27, y: 0.28 };
const END_ANCHOR = { x: 0.73, y: 0.72 };
const CENTER_ZOOM = 0.9;
const MIDDLE = { x: 0.5, y: 0.5 };

function useMinWidth(px: number) {
  const [matches, setMatches] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [px]);
  return matches;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);
  return [ref, inView] as const;
}

interface SwapLayer<T> {
  id: number;
  key: React.Key;
  value: T;
  enter: boolean;
  leaving: boolean;
  pop?: React.CSSProperties;
}

function useSwap<T>(key: React.Key, value: T, reduceMotion: boolean, exitMs: number) {
  const [layers, setLayers] = useState<SwapLayer<T>[]>(() => [{ id: 0, key, value, enter: false, leaving: false }]);
  const nodes = useRef(new Map<number, HTMLElement>());
  const timers = useRef(new Map<number, number>());
  const nextId = useRef(1);

  const drop = useCallback((id: number) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setLayers((current) => current.filter((layer) => layer.id !== id));
  }, []);

  useLayoutEffect(() => {
    if (layers[layers.length - 1]?.key === key) return;
    const next = { id: nextId.current++, key, value, enter: !reduceMotion, leaving: false };
    if (reduceMotion) {
      setLayers([next]);
      return;
    }
    setLayers([
      ...layers.map((layer) => {
        if (layer.leaving) return layer;
        const node = nodes.current.get(layer.id);
        const pop: React.CSSProperties | undefined = node && {
          position: "absolute",
          top: node.offsetTop,
          left: node.offsetLeft,
          width: node.offsetWidth,
          height: node.offsetHeight,
          pointerEvents: "none",
        };
        const id = layer.id;
        timers.current.set(
          id,
          window.setTimeout(() => drop(id), exitMs + 50),
        );
        return { ...layer, leaving: true, pop };
      }),
      next,
    ]);
  }, [key, value, reduceMotion, exitMs, drop, layers]);

  useEffect(() => {
    const currentTimers = timers.current;
    return () => {
      currentTimers.forEach((t) => window.clearTimeout(t));
      currentTimers.clear();
    };
  }, []);

  const register = useCallback(
    (id: number) => (node: HTMLElement | null) => {
      if (node) nodes.current.set(id, node);
      else nodes.current.delete(id);
    },
    [],
  );

  const valueOf = (layer: SwapLayer<T>) => (!layer.leaving && layer.key === key ? value : layer.value);

  return { layers, drop, register, valueOf };
}

function SwapText({
  text,
  motion,
  exitMs,
  reduceMotion,
  className,
}: {
  text: string;
  motion: "word" | "name";
  exitMs: number;
  reduceMotion: boolean;
  className?: string;
}) {
  const { layers, drop, register, valueOf } = useSwap(text, text, reduceMotion, exitMs);
  return (
    <>
      {layers.map((layer) => (
        <span
          key={layer.id}
          ref={register(layer.id)}
          style={layer.pop}
          onAnimationEnd={(e) => {
            if (layer.leaving && e.target === e.currentTarget) drop(layer.id);
          }}
          className={cn(
            className,
            layer.leaving ? `cw-${motion}-out` : layer.enter && `cw-${motion}-in`,
          )}
        >
          {valueOf(layer)}
        </span>
      ))}
    </>
  );
}

export const HomepageHero = forwardRef<HTMLElement, HomepageHeroProps>(
  (
    {
      badge,
      heading,
      headingWords,
      wordInterval = 2400,
      accent,
      description,
      install,
      primaryAction,
      secondaryAction,
      trust,
      items = [],
      stack,
      interval = 4500,
      linkComponent: LinkComp = "a",
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const desktop = useMinWidth(1024);

    // Rotating heading words
    const wordCount = headingWords?.length ?? 0;
    const [wordIndex, setWordIndex] = useState(0);
    useEffect(() => {
      if (wordCount <= 1) return;
      const timer = setInterval(() => {
        setWordIndex((i) => (i + 1) % wordCount);
      }, wordInterval);
      return () => clearInterval(timer);
    }, [wordCount, wordInterval]);
    const currentWord = headingWords?.[wordIndex] ?? "";

    const renderWord = useCallback(
      (word: string) => {
        const at = word.indexOf(WORD_TOKEN);
        if (at !== -1 && wordCount > 0) {
          return (
            <>
              {word.slice(0, at)}
              <span className="relative inline-grid align-baseline">
                <SwapText
                  text={currentWord}
                  motion="word"
                  exitMs={600}
                  reduceMotion={reduceMotion}
                  className="col-start-1 row-start-1 inline-block"
                />
              </span>
              {word.slice(at + WORD_TOKEN.length)}
            </>
          );
        }
        if (accent && bare(word) === bare(accent)) return <span className="text-primary">{word}</span>;
        return word;
      },
      [wordCount, currentWord, accent, reduceMotion],
    );

    // Rotating component slug for the install line
    const itemCount = items.length;
    const [focusIndex, setFocusIndex] = useState(0);
    useEffect(() => {
      if (itemCount <= 1) return;
      const timer = setInterval(() => {
        setFocusIndex((i) => (i + 1) % itemCount);
      }, interval);
      return () => clearInterval(timer);
    }, [itemCount, interval]);

    const slug = useMemo(() => {
      if (items.length === 0) return "";
      const item = items[focusIndex];
      return item ? (item.slug ?? kebab(item.title)) : "";
    }, [items, focusIndex]);

    const command = useMemo(() => {
      if (!install) return null;
      const at = install.command.indexOf(ITEM_TOKEN);
      const before = at === -1 ? install.command : install.command.slice(0, at);
      const after = at === -1 ? "" : install.command.slice(at + ITEM_TOKEN.length);
      const cut = before.lastIndexOf(" ");
      return {
        head: cut === -1 ? "" : before.slice(0, cut + 1),
        tail: cut === -1 ? before : before.slice(cut + 1),
        name: at === -1 ? "" : slug,
        after,
        full: at === -1 ? install.command : before + slug + after,
      };
    }, [install, slug]);

    // Split items for left and right walls exactly like ComponentWall
    const split = items.length >= 4;
    const shift = split ? Math.ceil(items.length / 2) : Math.floor(items.length / 2);
    const startItems = useMemo(() => (split ? items.slice(0, shift) : items), [items, split, shift]);
    const endItems = useMemo(
      () => (split ? items.slice(shift) : [...items.slice(shift), ...items.slice(0, shift)]),
      [items, split, shift],
    );

    let risen = 0;
    const riseAt = () => ({ "--cw-i": risen++ }) as React.CSSProperties;
    const [copyRef, copyInView] = useInViewOnce<HTMLDivElement>();

    const copy = (
      <div
        ref={copyRef}
        data-in-view={copyInView || undefined}
        className="cw-rise-group pointer-events-auto relative flex w-full max-w-[34rem] flex-col items-center py-10 text-center lg:max-w-[30rem] lg:py-20 xl:max-w-[36rem]"
      >
        {badge && (
          <div style={riseAt()} className="cw-rise mb-6">
            <LinkComp
              href={badge.href ?? "#"}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 py-1 pl-2.5 pr-3 text-[13px] font-medium text-muted-foreground outline-none backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {badge.label}
            </LinkComp>
          </div>
        )}

        <TextAnimation
          as="h1"
          variant="blur-in-up"
          text={heading}
          renderWord={renderWord}
          delay={0}
          className="max-w-[14ch] justify-center gap-y-0 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[3.4rem] xl:text-[4rem]"
        />

        {description && (
          <p
            style={riseAt()}
            className="cw-rise mt-6 max-w-[52ch] text-pretty text-[15px] leading-[1.65] text-muted-foreground sm:text-base"
          >
            {description}
          </p>
        )}

        {command && (
          <div style={riseAt()} className="cw-rise mt-8 w-full max-w-xl text-left">
            <div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-muted/40 pl-3.5 pr-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <Terminal size={15} className="shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap font-mono text-[13px] leading-none text-foreground sm:text-sm">
                <span className="hidden text-muted-foreground sm:inline">{command.head}</span>
                <span className="text-muted-foreground">{command.tail}</span>
                {command.name && (
                  <span className="relative inline-grid overflow-hidden align-bottom font-semibold" aria-live="polite">
                    <SwapText
                      text={command.name}
                      motion="name"
                      exitMs={450}
                      reduceMotion={reduceMotion}
                      className="col-start-1 row-start-1 inline-block"
                    />
                  </span>
                )}
                {command.after && <span className="text-muted-foreground">{command.after}</span>}
              </span>
              <CopyButton value={command.full} iconOnly variant="ghost" size="sm" className="rounded-lg" />
            </div>
          </div>
        )}

        {(primaryAction || secondaryAction) && (
          <div
            style={riseAt()}
            className="cw-rise mt-5 flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center"
          >
            {primaryAction && (
              <LinkComp
                href={primaryAction.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground outline-none transition-[transform,background-color] duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                {primaryAction.icon}
                {primaryAction.label}
              </LinkComp>
            )}
            {secondaryAction && (
              <LinkComp
                href={secondaryAction.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-[15px] font-semibold text-foreground outline-none transition-[transform,background-color] duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                {secondaryAction.icon}
                {secondaryAction.label}
              </LinkComp>
            )}
          </div>
        )}

        {trust && (
          <div
            style={riseAt()}
            className="cw-rise mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
          >
            {trust.avatars && trust.avatars.length > 0 && (
              <AvatarStack avatars={trust.avatars} size="lg" max={5} ringClassName="ring-background" className="shrink-0" />
            )}
            <div className="flex flex-col items-center gap-1 sm:items-start sm:border-l sm:border-border sm:pl-5 sm:text-left">
              {typeof trust.rating === "number" && (
                <div className="flex items-center gap-2">
                  <HalfStars rating={trust.rating} size={15} showText={false} />
                  <span className="text-sm font-semibold tabular-nums leading-none text-foreground">{trust.rating.toFixed(1)}</span>
                </div>
              )}
              <p className="max-w-[36ch] text-balance text-[13px] leading-snug text-muted-foreground">{trust.text}</p>
            </div>
          </div>
        )}

        {/* Below lg: single static wall band */}
        {desktop === false && items.length > 0 && (
          <div
            className="mt-10 h-64 w-screen max-w-none shrink-0 self-center sm:h-80 lg:hidden pointer-events-none select-none"
            aria-hidden
          >
            <StaticImageWall
              items={items}
              columns={4}
              anchor={MIDDLE}
              className="h-full [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
            />
          </div>
        )}

        {stack && (
          <div style={riseAt()} className="cw-rise mt-8 w-full max-w-md lg:mt-12">
            {stack}
          </div>
        )}
      </div>
    );

    return (
      <section
        ref={ref}
        className={cn("relative w-full overflow-hidden bg-background text-foreground", className)}
        {...props}
      >
        <style>{STYLES}</style>
        <div className="relative flex w-full flex-col items-center lg:min-h-[46rem] lg:justify-center">
          {/* Static Left Wall (Desktop) — Zero motion animation */}
          {desktop !== false && items.length > 0 && (
            <StaticImageWall
              items={startItems}
              columns={4}
              zoom={CENTER_ZOOM}
              anchor={START_ANCHOR}
              className="absolute inset-y-0 left-0 h-auto w-1/2 [mask-image:linear-gradient(to_right,black_35%,transparent_68%)] pointer-events-none select-none hidden lg:block"
            />
          )}

          {/* Center Copy with radial wash */}
          <div className="pointer-events-none relative z-30 flex w-full justify-center px-6 md:px-10">
            <div
              className="absolute inset-y-0 left-1/2 w-full max-w-[52rem] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--background)_60%,transparent)] hidden lg:block"
              aria-hidden
            />
            {copy}
          </div>

          {/* Static Right Wall (Desktop) — Zero motion animation */}
          {desktop !== false && items.length > 0 && (
            <StaticImageWall
              items={endItems}
              columns={4}
              zoom={CENTER_ZOOM}
              anchor={END_ANCHOR}
              className="absolute inset-y-0 right-0 h-auto w-1/2 [mask-image:linear-gradient(to_left,black_35%,transparent_68%)] pointer-events-none select-none hidden lg:block"
            />
          )}
        </div>
      </section>
    );
  },
);

HomepageHero.displayName = "HomepageHero";
