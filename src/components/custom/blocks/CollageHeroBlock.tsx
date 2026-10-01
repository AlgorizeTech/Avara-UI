"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedTypographyBlock } from "./AnimatedTypographyBlock";
import Button from "./Button";
import { CircularText } from "./CircularTextBlock";
import { Dialog, DialogContent, DialogTrigger } from "./DialogBlock";

// ==========================================
// COLLAGE HERO
// A hero for any place that is warm and busy — a school, a studio, a café: a badge that
// turns slowly, a serif headline with two words in colour, hashtag pills, a
// collage of seven photographs in five columns, and a footer with a quote,
// a scroll-down pill and a watch-video trigger. One reveal when it first
// appears; after that the badge keeps turning and the pointer does the rest.
// ==========================================

export interface CollagePhoto {
  src: string;
  alt: string;
  /** CSS object-position for the crop. */
  position?: string;
}

export interface CollageTag {
  label: string;
  /** Pill colour: the accent, the highlight, or a soft tint of the accent. */
  tone?: "accent" | "highlight" | "soft";
}

export interface CollageHeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Words that run around the badge, e.g. the school's name. */
  brand: string;
  /** What sits in the middle of the badge. Three dots by default. */
  logo?: React.ReactNode;
  /** The headline. Wrap the words to colour in <em>: the first takes the accent, the second the highlight. */
  heading: React.ReactNode;
  tags?: CollageTag[];
  /** Small tracked line over the first photo. */
  caption?: string;
  /** Seven photographs, laid out left to right: one, two stacked, one tall, two stacked, one. Fewer are fine — the columns just empty. */
  photos: CollagePhoto[];
  quote?: string;
  /** Label of the scroll pill; `scrollTo` is a selector to scroll to, else the next section. */
  scrollLabel?: string;
  scrollTo?: string;
  /** The watch-video trigger and the embed it opens. */
  video?: { eyebrow?: string; text: string; url: string; title?: string };
  /** Accent colour — sets `--primary` for the section; the theme's primary by default. */
  accent?: string;
  /** The second colour, for the second <em> and the highlight pills. */
  highlight?: string;
  reveal?: "in-view" | "immediate";
}

// ------------------------------------------
// Badge — words on a circle, turning (CircularText with the three-dot mark)
// ------------------------------------------
function Badge({ text, logo }: { text: string; logo?: React.ReactNode }) {
  return (
    <CircularText text={text} size={144} speed={22} innerRing className="[&>svg]:size-full">
      {logo ?? (
        <span className="relative block size-12" aria-hidden>
          <span className="absolute left-1 top-0 size-6 rounded-full bg-primary" />
          <span className="absolute left-6 top-4 size-6 rounded-full bg-[var(--kg-highlight)]" />
          <span className="absolute left-1 top-6 size-6 rounded-full bg-primary" />
        </span>
      )}
    </CircularText>
  );
}

// ------------------------------------------
// Root
// ------------------------------------------
const TAG_TONES: Record<NonNullable<CollageTag["tone"]>, string> = {
  accent: "bg-primary text-primary-foreground",
  highlight: "bg-[var(--kg-highlight)] text-[#2b2306]",
  soft: "bg-primary/15 text-primary",
};

// GSAP's power3.out and back.out(2), as CSS easings.
const EASE_OUT =
  "linear(0, .1945, .3591, .4971, .6115, .7052, .7808, .8409, .8877, .9233, .9497, .9686, .9816, .9901, .9952, .998, .9994, .9999, 1, 1)";
const EASE_POP =
  "linear(0, .2225, .4153, .5802, .7191, .8341, .9271, 1, 1.0547, 1.0933, 1.1176, 1.1296, 1.1312, 1.1244, 1.1111, 1.0933, 1.0729, 1.0518, 1.0321, 1.0155, 1.0042, 1)";

// The reveal. Each keyframe is only the start pose; the element's own style
// is where it lands.
const REVEAL_CSS = `
@keyframes kg-lead-in { from { opacity: 0; transform: translateY(18px); filter: blur(8px); } }
@keyframes kg-tag-in { from { opacity: 0; transform: rotate(-12deg) scale(0.6); } }
@keyframes kg-photo-in { from { opacity: 0; transform: translateY(32px) scale(0.96); } }
@keyframes kg-foot-in { from { opacity: 0; transform: translateY(12px); } }
[data-kg-reveal] [data-kg-lead] { animation: kg-lead-in 0.8s ${EASE_OUT} var(--kg-at, 0s) backwards; }
[data-kg-reveal] [data-kg-tag] { animation: kg-tag-in 0.5s ${EASE_POP} var(--kg-at, 0s) backwards; }
[data-kg-reveal] [data-kg-photo] { animation: kg-photo-in 0.8s ${EASE_OUT} var(--kg-at, 0s) backwards; }
[data-kg-reveal] [data-kg-foot] { animation: kg-foot-in 0.6s ${EASE_OUT} var(--kg-at, 0s) backwards; }
`;

// A photo card: rounded, lifts and zooms a touch on hover.
function Photo({ photo, className }: { photo: CollagePhoto; className?: string }) {
  return (
    <figure
      data-kg-photo=""
      className={cn(
        "group relative overflow-hidden rounded-[22px] bg-foreground/[0.04] transition-transform duration-500 ease-out hover:-translate-y-1",
        className,
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        style={photo.position ? { objectPosition: photo.position } : undefined}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
    </figure>
  );
}

export function CollageHero({
  brand,
  logo,
  heading,
  tags = [],
  caption,
  photos,
  quote,
  scrollLabel = "Keep scrolling",
  scrollTo,
  video,
  accent,
  highlight = "#f5c542",
  reveal = "in-view",
  className,
  style,
  ...props
}: CollageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(reveal === "immediate");
  const [phase, setPhase] = useState<"idle" | "play" | "done">("idle");
  const [p0, p1, p2, p3, p4, p5, p6] = photos;

  useEffect(() => {
    if (inView) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // The reveal: headline up out of a blur, the pills pop in with a twist, the
  // photographs rise one after another, the footer last. Everything renders
  // opaque on the server; this only plays once the page is live. Each element
  // gets its start time as `--kg-at` (lead from 0 every 0.12s, pills from
  // 0.35 every 0.08s, photos from 0.5 every 0.07s, footer from 1.1 every 0.1s)
  // and the keyframes in REVEAL_CSS hold its start pose until then.
  useEffect(() => {
    if (!inView) return;
    const root = rootRef.current;
    if (!root) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const stagger = (selector: string, start: number, each: number) =>
      root
        .querySelectorAll<HTMLElement>(selector)
        .forEach((el, i) => el.style.setProperty("--kg-at", `${start + i * each}s`));
    stagger("[data-kg-lead], [data-kg-heading]", 0, 0.12);
    stagger("[data-kg-tag]", 0.35, 0.08);
    stagger("[data-kg-photo]", 0.5, 0.07);
    stagger("[data-kg-foot]", 1.1, 0.1);
    // Start on the next frame, once the start times above are in place.
    // Once the footer has landed the keyframes come off, so pills that were
    // display:none below lg do not replay them when the window widens.
    let t = 0;
    const raf = window.requestAnimationFrame(() => {
      setPhase("play");
      t = window.setTimeout(() => setPhase("done"), 2000);
    });
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [inView]);

  const onScroll = () => {
    const root = rootRef.current;
    const target = scrollTo ? document.querySelector(scrollTo) : root?.nextElementSibling;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const vars = {
    ...(accent ? { "--primary": accent } : {}),
    "--kg-highlight": highlight,
  } as React.CSSProperties;

  return (
    <section
      ref={rootRef}
      data-kg-reveal={phase === "play" ? "" : undefined}
      className={cn("relative w-full overflow-hidden bg-background text-foreground", className)}
      style={{ ...vars, ...style }}
      {...props}
    >
      <style>{REVEAL_CSS}</style>
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-8 sm:px-8 sm:pt-10">
        {/* ---- Header: badge / headline / pills ---- */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[10rem_1fr_12rem]">
          <div data-kg-lead="" className="justify-self-center lg:justify-self-start">
            <Badge text={brand} logo={logo} />
          </div>

          <div className="relative text-center">
            {/* A hand-drawn curl with an arrowhead, pointing at the words. */}
            <svg
              aria-hidden
              viewBox="0 0 120 80"
              className="absolute -left-4 -top-8 hidden h-16 w-24 text-primary lg:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6c10 0 30 6 32 20s-16 24-24 14 8-26 30-24 38 22 62 38" />
              <path d="M98 44l10 10-14 3" />
            </svg>
            {/* Rises out of a blur with the other leads; data-kg-heading keeps
                its place in their stagger (0.12s) without the lead keyframes. */}
            <AnimatedTypographyBlock
              as="h1"
              bare
              variant="blur-rise"
              play={phase === "play"}
              delay={120}
              data-kg-heading=""
              className="mx-auto max-w-[19ch] font-serif text-[2.4rem] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[3.3rem] lg:text-[3.7rem] [&_em]:italic [&_em]:text-primary [&_em+em]:text-[var(--kg-highlight)] [&_em:nth-of-type(2)]:text-[var(--kg-highlight)]"
            >
              {heading}
            </AnimatedTypographyBlock>
          </div>

          <div className="relative hidden min-h-[9rem] lg:block">
            {tags.slice(0, 3).map((t, i) => (
              <span
                key={t.label}
                data-kg-tag=""
                // After the reveal the tilt sits in `transform`, where the pop-in
                // ends, with `rotate` and `scale` pinned to none.
                style={
                  phase === "idle"
                    ? { rotate: `${[-8, 6, -4][i]}deg` }
                    : { rotate: "none", scale: "none", transform: `rotate(${[-8, 6, -4][i]}deg) scale(1)` }
                }
                className={cn(
                  "absolute rounded-full px-4 py-1.5 text-[13px] font-semibold shadow-[0_8px_20px_-12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110 hover:!rotate-0",
                  i === 0 && "left-2 top-1",
                  i === 1 && "right-0 top-5",
                  i === 2 && "left-10 top-16",
                  TAG_TONES[t.tone ?? (["soft", "highlight", "accent"][i] as CollageTag["tone"]) ?? "soft"],
                )}
              >
                {t.label}
              </span>
            ))}
            {/* Concentric rings, the way a child would draw a sun. */}
            <svg aria-hidden viewBox="0 0 100 100" className="absolute -bottom-16 right-2 size-24 text-primary/70">
              {[46, 38, 30, 22, 14, 6].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" />
              ))}
            </svg>
          </div>
        </div>

        {/* Pills on small screens: a plain row under the headline. */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
            {tags.slice(0, 3).map((t, i) => (
              <span
                key={t.label}
                className={cn(
                  "rounded-full px-3.5 py-1 text-[12px] font-semibold",
                  TAG_TONES[t.tone ?? (["soft", "highlight", "accent"][i] as CollageTag["tone"]) ?? "soft"],
                )}
              >
                {t.label}
              </span>
            ))}
          </div>
        )}

        {/* ---- Collage: five columns, staggered ----
            Phones: two columns, the tall photo full width between them.
            Tablets: three columns — the first photo grows to fill its column
            beside the stack and the tall one, then the last three sit in a
            row of equal landscapes, so no cell is left empty.
            Desktop: five staggered columns. */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-6 lg:grid-cols-[1fr_1fr_1.15fr_1fr_1fr]">
          <div className="flex flex-col justify-start gap-4 sm:col-span-1 lg:pt-4">
            {caption && (
              <p data-kg-lead="" className="text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.12em] text-foreground/80">
                {caption}
              </p>
            )}
            {p0 && <Photo photo={p0} className="aspect-square sm:aspect-auto sm:flex-1 lg:flex-none lg:aspect-square" />}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 lg:pt-6">
            {p1 && <Photo photo={p1} className="aspect-[4/3]" />}
            {p2 && <Photo photo={p2} className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5]" />}
          </div>
          {p3 && <Photo photo={p3} className="col-span-2 aspect-[4/3] sm:col-span-1 sm:aspect-auto" />}
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:gap-4 lg:col-span-1 lg:flex-col lg:pt-6">
            {p4 && <Photo photo={p4} className="aspect-[4/3] sm:min-w-0 sm:flex-1 lg:flex-none" />}
            {p5 && <Photo photo={p5} className="aspect-[4/3] sm:min-w-0 sm:flex-1 lg:flex-none" />}
          </div>
          <div className="flex flex-col justify-center lg:pt-16">
            {p6 && <Photo photo={p6} className="aspect-square sm:aspect-[4/3] lg:aspect-square" />}
          </div>
        </div>

        {/* ---- Footer: quote / scroll / video ---- */}
        <div className="mt-8 grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr] cursor-pointer">
          <div data-kg-foot="" className="max-w-xs">
            {quote && (
              <>
                <span className="block font-serif text-4xl leading-none text-primary" aria-hidden>
                  &ldquo;
                </span>
                <p className="-mt-1 text-[12.5px] leading-relaxed text-foreground/75">{quote}</p>
              </>
            )}
          </div>

          <div data-kg-foot="" className="justify-self-center">
            <Button
              variant="ghost"
              onClick={onScroll}
              iconRight={<ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />}
              className="group h-11 rounded-full border border-primary/70 bg-transparent px-6 text-[14px] font-semibold text-primary shadow-none hover:bg-primary/10 hover:text-primary"
            >
              {scrollLabel}
            </Button>
          </div>

          <div data-kg-foot="" className="sm:justify-self-end">
            {video && (
              <Dialog>
                <DialogTrigger className="group flex items-center gap-4 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary/70 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Play size={16} className="ml-0.5 fill-current" />
                  </span>
                  <span className="text-left">
                    {video.eyebrow && <span className="block text-[11px] text-foreground/50">{video.eyebrow}</span>}
                    <span className="block max-w-[15rem] text-[13px] font-medium leading-snug">{video.text}</span>
                  </span>
                </DialogTrigger>
                <DialogContent size="lg" className="p-0">
                  <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                    <iframe
                      src={video.url}
                      title={video.title ?? video.text}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

CollageHero.Badge = Badge;
CollageHero.Photo = Photo;

export default CollageHero;
