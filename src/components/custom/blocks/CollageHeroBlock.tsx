"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
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
// Badge — words on a circle, turning
// ------------------------------------------
function Badge({ text, logo }: { text: string; logo?: React.ReactNode }) {
  const id = useId();
  const ring = `${text} · `.repeat(3);
  return (
    <div className="relative grid size-32 place-items-center sm:size-36">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none"
        aria-hidden
      >
        <defs>
          <path id={id} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-primary font-sans text-[9.5px] font-semibold tracking-[0.18em]">
          <textPath href={`#${id}`} startOffset="0">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[11%] rounded-full border border-black/10" aria-hidden />
      <span className="relative grid size-14 place-items-center sm:size-16">
        {logo ?? (
          <span className="relative block size-12" aria-hidden>
            <span className="absolute left-1 top-0 size-6 rounded-full bg-primary" />
            <span className="absolute left-6 top-4 size-6 rounded-full bg-[var(--kg-highlight)]" />
            <span className="absolute left-1 top-6 size-6 rounded-full bg-primary" />
          </span>
        )}
      </span>
      <span className="sr-only">{text}</span>
    </div>
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

// A photo card: rounded, lifts and zooms a touch on hover.
function Photo({ photo, className }: { photo: CollagePhoto; className?: string }) {
  return (
    <figure
      data-kg-photo=""
      className={cn(
        "group relative overflow-hidden rounded-[22px] bg-black/[0.04] transition-transform duration-500 ease-out hover:-translate-y-1",
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

function CollageHeroRoot({
  brand,
  logo,
  heading,
  tags = [],
  caption,
  photos,
  quote,
  scrollLabel = "Scroll down",
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
  // opaque on the server; this only plays once the page is live.
  useEffect(() => {
    if (!inView) return;
    const root = rootRef.current;
    if (!root) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lead = root.querySelectorAll("[data-kg-lead]");
    const tagEls = root.querySelectorAll("[data-kg-tag]");
    const shots = root.querySelectorAll("[data-kg-photo]");
    const foot = root.querySelectorAll("[data-kg-foot]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(lead, { opacity: 0, y: 18, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.12 }, 0)
      .fromTo(
        tagEls,
        { opacity: 0, scale: 0.6, rotate: -12 },
        { opacity: 1, scale: 1, rotate: (i) => [-8, 6, -4][i % 3] ?? 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" },
        0.35,
      )
      .fromTo(shots, { opacity: 0, y: 32, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.07, clearProps: "transform" }, 0.5)
      .fromTo(foot, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.1);
    return () => {
      tl.kill();
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
      className={cn("relative w-full overflow-hidden bg-white text-[#1a1a1a] dark:bg-[#0f0e14] dark:text-white", className)}
      style={{ ...vars, ...style }}
      {...props}
    >
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
            <h1
              data-kg-lead=""
              className="mx-auto max-w-[19ch] font-serif text-[2.4rem] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[3.3rem] lg:text-[3.7rem] [&_em]:italic [&_em]:text-primary [&_em+em]:text-[var(--kg-highlight)] [&_em:nth-of-type(2)]:text-[var(--kg-highlight)]"
            >
              {heading}
            </h1>
          </div>

          <div className="relative hidden min-h-[9rem] lg:block">
            {tags.slice(0, 3).map((t, i) => (
              <span
                key={t.label}
                data-kg-tag=""
                style={{ rotate: `${[-8, 6, -4][i]}deg` }}
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
              <p data-kg-lead="" className="text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.12em] text-black/80 dark:text-white/80">
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
                <p className="-mt-1 text-[12.5px] leading-relaxed text-black/75 dark:text-white/75">{quote}</p>
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
                    {video.eyebrow && <span className="block text-[11px] text-black/50 dark:text-white/50">{video.eyebrow}</span>}
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

export const CollageHero = Object.assign(CollageHeroRoot, { Badge, Photo });

export default CollageHero;
