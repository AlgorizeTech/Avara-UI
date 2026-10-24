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
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";
import { CopyButton } from "./CopyButtonBlock";
import { HalfStars } from "./HalfStarsBlock";
import { ImageWall, type ImageWallProps, type WallItem } from "./ImageWallBlock";
import { TextAnimation } from "./TextAnimationBlock";

// ==========================================
// COMPONENT WALL
// A landing hero for a component library. On the right, an ImageWall of
// screenshots that never ends, its camera gliding from card to card. On the
// left, the copy: a small badge, a headline that blurs in word by word (one
// word in the primary colour, one that takes turns), a lead, an install
// command whose component name follows the card the camera is resting on,
// two actions and a line of trust. The tools it is built with — a
// TechStack, passed in as `stack` — sit over the lower wall on desktop,
// where the wall fills the right side and fades under the copy; on the
// stacked layouts the wall is a band under the copy and the tools follow it.
// `layout="center"` puts the copy in the middle between two walls — one
// camera resting high, the other low — with the tools under the copy.
// ==========================================

export interface ComponentWallItem extends WallItem {
  /**
   * What the install command calls this card — `{item}` in `install.command`
   * becomes this. Defaults to the title in kebab-case.
   */
  slug?: string;
}

export interface ComponentWallProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onFocus">,
    Pick<ImageWallProps, "columns" | "interval" | "order" | "zoom" | "mobileZoom" | "intro" | "onFocus"> {
  /** The small link above the headline. */
  badge?: { label: string; href?: string };
  /**
   * The headline, revealed word by word. Write `{word}` where `headingWords`
   * take turns: `"Build interactive {word}."`.
   */
  heading: string;
  /** Words that take turns at `{word}`, each blurring in the way the headline did. */
  headingWords?: string[];
  /** Milliseconds each of `headingWords` stays. */
  wordInterval?: number;
  /** A word of the headline set in the primary colour. */
  accent?: string;
  /** The lead under the headline. Rendered inside a `<p>`, so pass phrasing content. */
  description?: React.ReactNode;
  /**
   * The install line. Put `{item}` where the focused card's `slug` goes:
   * `"npx shadcn@latest add @algorize-ui/{item}"`. The whole resolved
   * command is what the copy button copies.
   */
  install?: { command: string };
  primaryAction?: { label: string; href: string; icon?: React.ReactNode };
  secondaryAction?: { label: string; href: string; icon?: React.ReactNode };
  /** The trust line under the actions: the sentence, the faces and the stars. */
  trust?: { text: string; avatars?: StackAvatar[]; rating?: number };
  /** The cards on the wall, in reading order down the columns. */
  items: ComponentWallItem[];
  /**
   * The tools the library is built with — a `TechStack`. Over the lower wall
   * on desktop, under the band on smaller screens; in the centred layout it
   * closes the copy column, where `variant="compact"` (marks only) fits.
   */
  stack?: React.ReactNode;
  /**
   * `split`: the copy on the left, the wall on the right. `center`: the copy
   * in the middle between two walls, the left camera resting high and the
   * right one low, taking turns; the tools sit under the copy. The walls
   * split `items`, the first half on the left and the rest on the right.
   * Below `lg` there is a single wall instead: a band of every card
   * between the copy and the tools. `center-background`: keeps the walls
   * anchored in the background layer behind the copy across all screens.
   */
  layout?: "split" | "center" | "center-background";
  /**
   * When true (or with layout="center-background"), the animated screenshot
   * walls stay in the background layer behind the copy on small screens instead
   * of dropping below the action buttons as a separate band.
   */
  persistentBackground?: boolean;
  /**
   * Whether to show the background/wall image animation on mobile and small screens (<lg).
   * When `false`, the image animation is completely hidden on small screens across all layouts
   * (split, center, center-background), leaving only the clean content copy and tools on phones.
   * Defaults to `true`.
   */
  showMobileWall?: boolean;
  /**
   * Alias for `showMobileWall`. Set to `false` to hide wall animations on small screens across all layouts.
   */
  mobileBackground?: boolean;
  /**
   * Centred layout only: whether the single wall band shows below `lg`.
   * Deprecated in favor of `showMobileWall` which works across all layouts.
   */
  compactWall?: boolean;
  /** Pass `next/link` to keep client-side navigation. */
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

// The same entrance as the headline's blur-in-up, replayed each time the word
// changes (`cw-word-in` / `cw-word-out`). The lead, the install line, the
// actions and the trust line rise once, in order, 0.1s apart, starting the
// moment the headline does (`cw-rise`, `--cw-i` is each one's place in line).
// With reduced motion nothing moves and the swaps are instant.
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

// Where each camera rests in the centred layout, from `lg` up: the left one
// high and towards the outside, the right one low, so the two cards never
// mirror each other across the copy.
const START_ANCHOR = { x: 0.27, y: 0.28 };
const END_ANCHOR = { x: 0.73, y: 0.72 };
/** Each wall is half the width, so the centred layout rests further out. */
const CENTER_ZOOM = 0.9;
const MIDDLE = { x: 0.5, y: 0.5 };

/** Null until measured on the client, so nothing breakpoint-specific mounts early. */
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
/** The visitor's reduced-motion setting; false while server-rendering. */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** True from the first time 30% of the element is in view, and for good. */
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
      { threshold: 0.3 },
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
  /** Plays the way in — every layer but the first. */
  enter: boolean;
  leaving: boolean;
  /** Where a leaving layer was, pinned there out of the flow. */
  pop?: React.CSSProperties;
}

/**
 * One value that gives way to the next: the new one comes in while the old one
 * plays its way out on top of where it was, lifted out of the flow so the
 * space closes up to the new one at once. `drop` removes a layer once it has
 * gone; a timer does it too, in case its animation never ends. With reduced
 * motion the swap is instant.
 */
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
        };
        return { ...layer, leaving: true, pop };
      }),
      next,
    ]);
  }, [key, value, layers, reduceMotion]);

  useEffect(() => {
    for (const layer of layers) {
      if (layer.leaving && !timers.current.has(layer.id)) {
        timers.current.set(layer.id, window.setTimeout(() => drop(layer.id), exitMs + 100));
      }
    }
  }, [layers, exitMs, drop]);
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const register = useCallback(
    (id: number) => (node: HTMLElement | null) => {
      if (node) nodes.current.set(id, node);
      else nodes.current.delete(id);
    },
    [],
  );

  /** What a layer shows: the current value, or what it showed when it started leaving. */
  const valueOf = (layer: SwapLayer<T>) => (!layer.leaving && layer.key === key ? value : layer.value);

  return { layers, drop, register, valueOf };
}

/** A word or a name that swaps in place — `cw-word-*` or `cw-name-*`. */
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

// ------------------------------------------
// Root
// ------------------------------------------
export const ComponentWall = forwardRef<HTMLElement, ComponentWallProps>(
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
      items,
      stack,
      columns,
      interval,
      order,
      zoom,
      mobileZoom,
      // Long enough for the headline and the lines under it to have risen.
      intro = 1800,
      onFocus,
      layout = "split",
      persistentBackground = false,
      compactWall = true,
      showMobileWall,
      mobileBackground,
      linkComponent: Link = "a",
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const isPersistent = persistentBackground || layout === "center-background";
    const centered = layout === "center" || isPersistent;
    const desktop = useMinWidth(1024);
    const isMobileWallVisible =
      showMobileWall !== undefined
        ? showMobileWall
        : mobileBackground !== undefined
          ? mobileBackground
          : compactWall !== undefined
            ? compactWall
            : true;

    // ---- The word that takes turns in the headline.
    const [wordIndex, setWordIndex] = useState(0);
    const wordCount = headingWords?.length ?? 0;
    useEffect(() => {
      if (wordCount < 2 || wordInterval <= 0) return;
      const t = window.setInterval(() => setWordIndex((i) => (i + 1) % wordCount), wordInterval);
      return () => window.clearInterval(t);
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

    // The card the camera is resting on, so the install line can name it.
    const [focus, setFocus] = useState(0);
    const handleFocus = useCallback(
      (i: number) => {
        setFocus(i);
        onFocus?.(i);
      },
      [onFocus],
    );
    const slug = useMemo(() => {
      const item = items[focus];
      return item ? (item.slug ?? kebab(item.title)) : "";
    }, [items, focus]);

    // ---- The two walls of the centred layout split the cards: the first half
    // on the left, the second half on the right, so each wall draws half as
    // many and the two never show the same thing. (Under four cards a half
    // would be a single card, so both walls then deal the whole set, the
    // second from halfway through.) The right camera lands half an interval
    // after the left one's, and the install line names whichever card was
    // landed on last. Until its camera first moves it only ever reports its
    // opening card, which is skipped, so the line opens on the left wall's card.
    const split = items.length >= 4;
    const shift = split ? Math.ceil(items.length / 2) : Math.floor(items.length / 2);
    const startItems = useMemo(() => (split ? items.slice(0, shift) : items), [items, split, shift]);
    const endItems = useMemo(
      () => (split ? items.slice(shift) : [...items.slice(shift), ...items.slice(0, shift)]),
      [items, split, shift],
    );
    const endMoved = useRef(false);
    const handleEndFocus = useCallback(
      (i: number) => {
        if (i === 0 && !endMoved.current) return;
        endMoved.current = true;
        handleFocus((i + shift) % items.length);
      },
      [handleFocus, shift, items.length],
    );
    const restInterval = interval ?? 4500;

    // `npx shadcn@latest add @algorize-ui/{item}` splits into what comes before
    // the name and after it; the last word before it (`@algorize-ui/`) stays on
    // phones, the rest of the prefix only shows from `sm` up.
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

    const isSmallScreen = desktop === false;
    const wallProps = {
      columns,
      interval,
      order,
      zoom: zoom ?? (centered ? CENTER_ZOOM : undefined),
      mobileZoom: isSmallScreen ? (mobileZoom ?? (isPersistent ? 0.30 : 0.32)) : undefined,
    };

    // Each line that rises takes the next place in line, skipping the absent ones.
    let risen = 0;
    const riseAt = () => ({ "--cw-i": risen++ }) as React.CSSProperties;
    const [copyRef, copyInView] = useInViewOnce<HTMLDivElement>();

    const copy = (
      <div
        ref={copyRef}
        data-in-view={copyInView || undefined}
        className={cn(
          "cw-rise-group pointer-events-auto relative flex w-full flex-col",
          centered
            ? "max-w-[34rem] items-center py-10 text-center lg:max-w-[30rem] lg:py-20 xl:max-w-[36rem]"
            : "items-start py-12 lg:w-[46%] lg:py-20 xl:w-[44%]",
        )}
      >
        {badge && (
          <div style={riseAt()} className="cw-rise mb-6">
            <Link
              href={badge.href ?? "#"}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 py-1 pl-2.5 pr-3 text-[13px] font-medium text-muted-foreground outline-none backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {badge.label}
            </Link>
          </div>
        )}

        <TextAnimation
          as="h1"
          variant="blur-in-up"
          text={heading}
          renderWord={renderWord}
          delay={0}
          className={cn(
            "max-w-[14ch] gap-y-0 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[3.4rem] xl:text-[4rem]",
            centered && "justify-center",
          )}
        />

        {description && (
          <p style={riseAt()} className="cw-rise mt-6 max-w-[52ch] text-pretty text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
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
            className={cn("cw-rise mt-5 flex w-full flex-col gap-2.5 sm:flex-row sm:items-center", centered && "sm:justify-center")}
          >
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground outline-none transition-[transform,background-color] duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                {primaryAction.icon}
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-[15px] font-semibold text-foreground outline-none transition-[transform,background-color] duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                {secondaryAction.icon}
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}

        {trust && (
          <div
            style={riseAt()}
            className={cn(
              "cw-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5",
              centered ? "items-center" : "items-start",
            )}
          >
            {trust.avatars && trust.avatars.length > 0 && (
              <AvatarStack avatars={trust.avatars} size="lg" max={5} ringClassName="ring-background" className="shrink-0" />
            )}
            <div className={cn("flex flex-col gap-1 sm:border-l sm:border-border sm:pl-5", centered && "items-center sm:items-start sm:text-left")}>
              {typeof trust.rating === "number" && (
                <div className="flex items-center gap-2">
                  <HalfStars rating={trust.rating} size={15} showText={false} />
                  <span className="text-sm font-semibold tabular-nums leading-none text-foreground">{trust.rating.toFixed(1)}</span>
                </div>
              )}
              <p className={cn("max-w-[36ch] text-[13px] leading-snug text-muted-foreground", centered && "text-balance")}>{trust.text}</p>
            </div>
          </div>
        )}

        {/* ---- Centred, below `lg`: the one wall, a full-width band between the
            copy and the tools. It deals every card, being the only wall. The
            box holds its height from the first paint; the wall mounts once the
            breakpoint is known, so a desktop never loads it. ---- */}
        {centered && isMobileWallVisible && !isPersistent && (
          <div
            className="mt-10 h-64 w-screen max-w-none shrink-0 self-center sm:h-80 lg:hidden"
            aria-hidden={desktop !== false || undefined}
          >
            {desktop === false && (
              <ImageWall
                {...wallProps}
                items={items}
                intro={intro}
                anchor={MIDDLE}
                onFocus={handleFocus}
                className="h-full [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
              />
            )}
          </div>
        )}

        {/* ---- Centred: the tools close the column, rising after the trust line ---- */}
        {centered && stack && (
          <div style={riseAt()} className="cw-rise mt-8 w-full max-w-md lg:mt-12">
            {stack}
          </div>
        )}
      </div>
    );

    if (centered) {
      return (
        <section
          ref={ref}
          className={cn("relative w-full overflow-hidden bg-background text-foreground", className)}
          {...props}
        >
          <style>{STYLES}</style>
          <div
            className={cn(
              "relative flex w-full flex-col items-center lg:min-h-[46rem] lg:justify-center",
              isPersistent && isMobileWallVisible && "min-h-[44rem]",
            )}
          >
            {/* ---- From `lg` (or all screens when persistentBackground is active and mobile wall is enabled): the left wall ---- */}
            {(desktop || (isPersistent && isMobileWallVisible)) && (
              <ImageWall
                {...wallProps}
                items={startItems}
                intro={intro}
                anchor={START_ANCHOR}
                onFocus={handleFocus}
                className={cn(
                  "absolute inset-y-0 left-0 h-auto w-1/2 [mask-image:linear-gradient(to_right,black_35%,transparent_68%)]",
                  isPersistent && "opacity-60 sm:opacity-90 lg:opacity-100",
                  !isMobileWallVisible && "hidden lg:block",
                )}
              />
            )}

            {/* ---- The copy, over a soft wash of the background where the walls meet ---- */}
            <div className="pointer-events-none relative z-30 flex w-full justify-center px-6 md:px-10">
              <div
                className={cn(
                  "absolute inset-y-0 left-1/2 w-full max-w-[52rem] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--background)_60%,transparent)]",
                  (!isPersistent || !isMobileWallVisible) && "hidden lg:block",
                )}
                aria-hidden
              />
              {copy}
            </div>

            {/* ---- From `lg` (or all screens when persistentBackground is active and mobile wall is enabled): the right wall ---- */}
            {(desktop || (isPersistent && isMobileWallVisible)) && (
              <ImageWall
                {...wallProps}
                items={endItems}
                intro={intro + restInterval / 2}
                anchor={END_ANCHOR}
                onFocus={handleEndFocus}
                className={cn(
                  "absolute inset-y-0 right-0 h-auto w-1/2 [mask-image:linear-gradient(to_left,black_35%,transparent_68%)]",
                  isPersistent && "opacity-60 sm:opacity-90 lg:opacity-100",
                  !isMobileWallVisible && "hidden lg:block",
                )}
              />
            )}
          </div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        className={cn("relative w-full overflow-hidden bg-background text-foreground", className)}
        {...props}
      >
        <style>{STYLES}</style>
        <div className="relative flex w-full flex-col lg:min-h-[44rem] lg:flex-row lg:items-center">
          {/* ---- Copy ---- */}
          <div className="relative z-30 mx-auto flex w-full max-w-[98rem] items-center px-6 md:px-10 xl:pl-20">{copy}</div>

          {/* ---- The wall: a band under the copy, or the whole right side fading under it ---- */}
          {(desktop || isMobileWallVisible) && (
            <ImageWall
              {...wallProps}
              items={items}
              intro={intro}
              onFocus={handleFocus}
              className={cn(
                "h-80 [mask-image:linear-gradient(to_left,black_85%,transparent_100%)] sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56%] lg:[mask-image:linear-gradient(to_left,black_72%,transparent_100%)] xl:w-[58%]",
                !isMobileWallVisible && "hidden lg:block",
              )}
            />
          )}

          {/* ---- The tools, over the lower part of the wall ---- */}
          {stack && (
            <div className="pointer-events-none relative z-20 lg:absolute lg:bottom-0 lg:right-0 lg:w-[56%] xl:w-[58%]">
              {/* On desktop the wall blurs and fades out under the tools: a blur that
                  strengthens towards the bottom, under a wash of the background. On
                  the stacked layouts the tools simply follow the band. */}
              <div className="absolute inset-x-0 bottom-0 hidden h-[12rem] backdrop-blur-md [mask-image:linear-gradient(to_top,black_45%,transparent_100%)] lg:block" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 hidden h-[12rem] bg-gradient-to-t from-background/90 from-30% via-background/70 to-transparent lg:block" aria-hidden />
              {/* On desktop it sits a little way up the wall, in view under the copy —
                  the padding is a share of the strip's width, which is proportional
                  to the wall's height. */}
              <div
                // Arrives with the last of the copy, so nothing shows ahead of the headline.
                className="cw-tools-in pointer-events-auto relative w-full py-7 px-6 md:pr-0 md:pl-10 lg:pb-[7%] lg:pl-12 lg:pt-0 xl:pl-24"
              >
                {stack}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  },
);
ComponentWall.displayName = "ComponentWall";

export default ComponentWall;
