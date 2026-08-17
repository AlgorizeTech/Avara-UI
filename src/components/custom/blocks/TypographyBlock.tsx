"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function H1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words text-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

export function H2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 break-words text-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

export function H3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight break-words text-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

export function H4({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight break-words text-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

export function P({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "leading-6 sm:leading-7 break-words text-zinc-700 dark:text-zinc-300 [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  );
}

export function Blockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "mt-4 sm:mt-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 sm:pl-6 italic break-words text-zinc-600 dark:text-zinc-400",
        className,
      )}
      {...props}
    />
  );
}

export function List({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "my-4 sm:my-6 ml-4 sm:ml-6 list-disc [&>li]:mt-1.5 sm:[&>li]:mt-2 break-words text-zinc-700 dark:text-zinc-300",
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm font-semibold break-all sm:break-words text-zinc-900 dark:text-zinc-100",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-lg sm:text-xl break-words text-zinc-500 dark:text-zinc-400", className)}
      {...props}
    />
  );
}

export function Large({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-base sm:text-lg font-semibold break-words text-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

export function Small({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn(
        "text-xs sm:text-sm font-medium leading-none text-zinc-600 dark:text-zinc-400",
        className,
      )}
      {...props}
    />
  );
}

export function Muted({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-xs sm:text-sm text-zinc-500 dark:text-zinc-400", className)}
      {...props}
    />
  );
}
