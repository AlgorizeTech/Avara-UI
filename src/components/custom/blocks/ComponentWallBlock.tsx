"use client";

import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
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
// two actions and a line of trust. The tools it is built with — a few
// related ones at a time, taking turns — sit over the lower wall on desktop,
// where the wall fills the right side and fades under the copy; on the
// stacked layouts the wall is a band under the copy and the tools follow it.
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
    Pick<ImageWallProps, "columns" | "interval" | "order" | "zoom" | "intro" | "onFocus"> {
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
  description?: string;
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
   * The tools the library is built with: the label, then two rows — an odd
   * batch staggers as three over four. Over the lower wall on desktop, under
   * the band on smaller screens. `groups` are shown one at a time — put
   * related tools together, four to eight per batch — each fading in the way
   * the headline word does. Names show from `xl` up; below that only the marks.
   */
  stack?: { label?: string; groups: StackTool[][]; interval?: number };
  /** Pass `next/link` to keep client-side navigation. */
  linkComponent?: React.ElementType;
}

export interface StackTool {
  icon: React.ReactNode;
  name: string;
}

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ITEM_TOKEN = "{item}";
const WORD_TOKEN = "{word}";
const bare = (w: string) => w.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

// The same entrance as the headline's blur-in-up, replayed each time the word changes.
const wordIn = { opacity: 0, y: 20, filter: "blur(8px)" };
const wordAt = { opacity: 1, y: 0, filter: "blur(0px)" };
const wordOut = { opacity: 0, y: -20, filter: "blur(8px)" };

// The lead, the install line, the actions and the trust line rise once, in
// order, starting the moment the headline does.
const riseGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

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
      // Long enough for the headline and the lines under it to have risen.
      intro = 1800,
      onFocus,
      linkComponent: Link = "a",
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();

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
              <span className="inline-grid align-baseline">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={currentWord}
                    initial={reduceMotion ? false : wordIn}
                    animate={wordAt}
                    exit={reduceMotion ? undefined : wordOut}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="col-start-1 row-start-1 inline-block"
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
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

    // ---- The batch of tools showing under the wall.
    const groupCount = stack?.groups.length ?? 0;
    const groupInterval = stack?.interval ?? 3600;
    const [groupIndex, setGroupIndex] = useState(0);
    useEffect(() => {
      if (groupCount < 2 || groupInterval <= 0) return;
      const t = window.setInterval(() => setGroupIndex((i) => (i + 1) % groupCount), groupInterval);
      return () => window.clearInterval(t);
    }, [groupCount, groupInterval]);
    const group = stack?.groups[groupIndex];

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

    return (
      <section
        ref={ref}
        className={cn("relative w-full overflow-hidden bg-background text-foreground", className)}
        {...props}
      >
        <div className="relative flex w-full flex-col lg:min-h-[44rem] lg:flex-row lg:items-center">
          {/* ---- Copy ---- */}
          <div className="relative z-30 mx-auto flex w-full max-w-[98rem] items-center px-6 md:px-10 xl:pl-20">
            <motion.div
              variants={riseGroup}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex w-full flex-col items-start py-12 lg:w-[46%] lg:py-20 xl:w-[44%]"
            >
              {badge && (
                <motion.div variants={rise} className="mb-6">
                  <Link
                    href={badge.href ?? "#"}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 py-1 pl-2.5 pr-3 text-[13px] font-medium text-muted-foreground outline-none backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                    {badge.label}
                  </Link>
                </motion.div>
              )}

              <TextAnimation
                as="h1"
                variant="blur-in-up"
                text={heading}
                renderWord={renderWord}
                delay={0}
                className="max-w-[14ch] gap-y-0 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[3.4rem] xl:text-[4rem]"
              />

              {description && (
                <motion.p variants={rise} className="mt-6 max-w-[52ch] text-pretty text-[15px] leading-[1.65] text-muted-foreground sm:text-base">
                  {description}
                </motion.p>
              )}

              {command && (
                <motion.div variants={rise} className="mt-8 w-full max-w-xl">
                  <div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-muted/40 pl-3.5 pr-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    <Terminal size={15} className="shrink-0 text-muted-foreground" aria-hidden />
                    <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap font-mono text-[13px] leading-none text-foreground sm:text-sm">
                      <span className="hidden text-muted-foreground sm:inline">{command.head}</span>
                      <span className="text-muted-foreground">{command.tail}</span>
                      {command.name && (
                        <span className="relative inline-grid overflow-hidden align-bottom font-semibold" aria-live="polite">
                          <AnimatePresence initial={false} mode="popLayout">
                            <motion.span
                              key={command.name}
                              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={reduceMotion ? undefined : { y: "-110%", opacity: 0 }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              className="col-start-1 row-start-1 inline-block"
                            >
                              {command.name}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      )}
                      {command.after && <span className="text-muted-foreground">{command.after}</span>}
                    </span>
                    <CopyButton value={command.full} iconOnly variant="ghost" size="sm" className="rounded-lg" />
                  </div>
                </motion.div>
              )}

              {(primaryAction || secondaryAction) && (
                <motion.div variants={rise} className="mt-5 flex w-full flex-col gap-2.5 sm:flex-row sm:items-center">
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
                </motion.div>
              )}

              {trust && (
                <motion.div
                  variants={rise}
                  className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5"
                >
                  {trust.avatars && trust.avatars.length > 0 && (
                    <AvatarStack avatars={trust.avatars} size="lg" max={5} ringClassName="ring-background" className="shrink-0" />
                  )}
                  <div className="flex flex-col gap-1 sm:border-l sm:border-border sm:pl-5">
                    {typeof trust.rating === "number" && (
                      <div className="flex items-center gap-2">
                        <HalfStars rating={trust.rating} size={15} showText={false} />
                        <span className="text-sm font-semibold tabular-nums leading-none text-foreground">{trust.rating.toFixed(1)}</span>
                      </div>
                    )}
                    <p className="max-w-[36ch] text-[13px] leading-snug text-muted-foreground">{trust.text}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* ---- The wall: a band under the copy, or the whole right side fading under it ---- */}
          <ImageWall
            items={items}
            columns={columns}
            interval={interval}
            order={order}
            zoom={zoom}
            intro={intro}
            onFocus={handleFocus}
            className="h-80 [mask-image:linear-gradient(to_left,black_85%,transparent_100%)] sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56%] lg:[mask-image:linear-gradient(to_left,black_72%,transparent_100%)] xl:w-[58%]"
          />

          {/* ---- The tools, over the lower part of the wall ---- */}
          {stack && group && (
            <div className="pointer-events-none relative z-20 lg:absolute lg:bottom-0 lg:right-0 lg:w-[56%] xl:w-[58%]">
              {/* On desktop the wall blurs and fades out under the tools: a blur that
                  strengthens towards the bottom, under a wash of the background. On
                  the stacked layouts the tools simply follow the band. */}
              <div className="absolute inset-x-0 bottom-0 hidden h-[12rem] backdrop-blur-md [mask-image:linear-gradient(to_top,black_45%,transparent_100%)] lg:block" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 hidden h-[12rem] bg-gradient-to-t from-background/90 from-30% via-background/70 to-transparent lg:block" aria-hidden />
              {/* On desktop it sits a little way up the wall, in view under the copy —
                  the padding is a share of the strip's width, which is proportional
                  to the wall's height. */}
              <motion.div
                // Arrives with the last of the copy, so nothing shows ahead of the headline.
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto relative flex w-full flex-col items-start justify-center gap-3 py-7 px-6 md:pr-0 md:pl-10 lg:pb-[7%] lg:pl-12 lg:pt-0 xl:pl-24"
              >
                {stack.label && <span className="text-[13px] leading-tight text-muted-foreground font-semibold">{stack.label}</span>}
                <div className="grid w-full min-w-0" aria-live="polite">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.ul
                      key={groupIndex}
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                      exit={reduceMotion ? undefined : "gone"}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } },
                        gone: { transition: { staggerChildren: 0.03 } },
                      }}
                      // Two rows, two columns per tool. An odd batch puts the smaller
                      // row on top, starting one column in, so it sits between the
                      // tools below (three over four); an even batch lines up.
                      className="col-start-1 row-start-1 grid gap-x-2 gap-y-[22px] sm:gap-x-3"
                      style={{ gridTemplateColumns: `repeat(${2 * Math.ceil(group.length / 2)}, minmax(0, 1fr))` }}
                    >
                      {group.map((tool, i) => (
                        <motion.li
                          key={tool.name}
                          variants={{ hidden: wordIn, visible: { ...wordAt, transition: { duration: 0.6, ease: "easeOut" } }, gone: { ...wordOut, transition: { duration: 0.4, ease: "easeIn" } } }}
                          className={cn(
                            "col-span-2 flex min-w-0 items-center justify-center gap-2.5 text-foreground [&>img]:size-8 [&>img]:shrink-0 [&>img]:object-contain xl:[&>img]:size-6 [&>svg]:size-7 [&>svg]:shrink-0 xl:[&>svg]:size-5",
                            i === 0 && group.length % 2 === 1 && "col-start-2",
                          )}
                        >
                          {tool.icon}
                          <span className="hidden truncate text-[13px] font-medium xl:inline">{tool.name}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    );
  },
);
ComponentWall.displayName = "ComponentWall";

export default ComponentWall;
