"use client";

import React, { forwardRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";
import { HalfStars } from "./HalfStarsBlock";
import { ImageWall, type ImageWallProps, type WallItem } from "./ImageWallBlock";

// ==========================================
// COMPONENT WALL
// A landing hero for a component library: the copy on the left — a changelog
// pill, a headline, a paragraph, two actions and a line of trust — and on the
// right an ImageWall of screenshots that never ends, its camera gliding from
// card to card. On desktop the wall fills the right side and fades under the
// copy; below that it becomes a band under the copy.
// ==========================================

export type { WallItem };

export interface ComponentWallProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onFocus">,
    Pick<ImageWallProps, "items" | "columns" | "interval" | "order" | "zoom" | "onFocus"> {
  /** The pill above the headline: a label, a short note after the divider, and where it goes. */
  badge?: { label: string; text?: string; href?: string; icon?: React.ReactNode };
  heading: React.ReactNode;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  /** The trust line under the actions: the sentence, the faces and the stars. */
  trust?: { text: string; avatars?: StackAvatar[]; rating?: number };
  /** Pass `next/link` to keep client-side navigation. */
  linkComponent?: React.ElementType;
}

// ------------------------------------------
// Root
// ------------------------------------------
export const ComponentWall = forwardRef<HTMLElement, ComponentWallProps>(
  (
    {
      badge,
      heading,
      description,
      primaryAction,
      secondaryAction,
      trust,
      items,
      columns,
      interval,
      order,
      zoom,
      onFocus,
      linkComponent: Link = "a",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn("relative w-full overflow-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50", className)}
        {...props}
      >
        <div className="relative flex w-full flex-col items-center lg:min-h-[44rem] lg:flex-row">
          {/* ---- Copy ---- */}
          <div className="relative z-30 mx-auto flex w-full max-w-[84rem] items-center px-4">
            <div className="flex w-full flex-col items-start px-2 py-10 md:px-8 lg:w-[44%] lg:py-16 xl:w-[42%] xl:px-0">
              {badge && (
                <Link
                  href={badge.href ?? "#"}
                  className="group relative mb-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 py-1 pl-2 pr-4 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-800/60"
                >
                  <span className="grid size-5 place-items-center text-amber-500" aria-hidden>
                    {badge.icon ?? <Sparkles size={14} />}
                  </span>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">{badge.label}</span>
                  {badge.text && (
                    <>
                      <span className="inline-block h-4 w-px bg-neutral-200 dark:bg-neutral-700" aria-hidden />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">{badge.text}</span>
                    </>
                  )}
                  <ArrowRight size={12} className="text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}

              <h1 className="relative mt-4 max-w-3xl text-balance text-left font-sans text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl xl:text-5xl xl:leading-[1.02] dark:text-neutral-50">
                {heading}
              </h1>

              {description && (
                <p className="relative mt-5 max-w-xl text-pretty text-left text-sm tracking-wide text-neutral-600 antialiased sm:text-base dark:text-neutral-400">
                  {description}
                </p>
              )}

              {(primaryAction || secondaryAction) && (
                <div className="relative mt-8 flex w-full flex-col justify-center gap-y-2 sm:flex-row sm:justify-start sm:gap-x-4">
                  {primaryAction && (
                    <Link
                      href={primaryAction.href}
                      className="flex h-14 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-neutral-900 px-6 text-base font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring-1 ring-inset ring-white/20 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 active:scale-[0.98] sm:w-auto dark:bg-white dark:text-neutral-900 dark:ring-black/10"
                    >
                      {primaryAction.label}
                    </Link>
                  )}
                  {secondaryAction && (
                    <Link
                      href={secondaryAction.href}
                      className="flex h-14 w-full items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-white px-6 text-base font-medium text-black shadow-sm shadow-black/10 ring-1 ring-black/10 transition duration-150 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-[0.98] sm:w-auto dark:bg-neutral-900 dark:text-white dark:ring-white/15 dark:hover:bg-neutral-800"
                    >
                      {secondaryAction.label}
                    </Link>
                  )}
                </div>
              )}

              {trust && (
                <div className="mt-8 flex flex-col items-start">
                  <p className="mb-4 text-left text-sm text-neutral-500 md:text-xs lg:text-base dark:text-neutral-400">{trust.text}</p>
                  <div className="flex flex-row flex-wrap items-center gap-3">
                    {trust.avatars && trust.avatars.length > 0 && (
                      <AvatarStack avatars={trust.avatars} size="lg" max={7} ringClassName="ring-white dark:ring-neutral-950" />
                    )}
                    {typeof trust.rating === "number" && <HalfStars rating={trust.rating} size={16} activeColor="#f59e0b" showText={false} />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ---- The wall: a band under the copy, or the whole right side fading under it ---- */}
          <ImageWall
            items={items}
            columns={columns}
            interval={interval}
            order={order}
            zoom={zoom}
            onFocus={onFocus}
            className="h-80 [mask-image:linear-gradient(to_left,black_85%,transparent_100%)] sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%] lg:[mask-image:linear-gradient(to_left,black_75%,transparent_100%)] xl:w-[60%]"
          />
        </div>
      </section>
    );
  },
);
ComponentWall.displayName = "ComponentWall";

export default ComponentWall;
