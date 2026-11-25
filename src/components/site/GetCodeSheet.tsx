"use client";

import {
  startTransition,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Code2, Terminal, X } from "lucide-react";

import { CODE_SURFACE, CodeBlockClient } from "@/components/site/code-block-client";
import CodeCopy from "@/components/site/code-copy";
import { useCodeLanguage } from "@/contexts/code-language-context";
import { prefetchHighlight, warmHighlighter } from "@/components/custom/ui/code-renderer-core";
import { cn } from "@/lib/utils";

/** The Sandbox card's active-tab pill, here as the usage panel's label. */
const LABEL_PILL =
  "rounded-lg bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-foreground/[0.06]";

/** Slide-in length (ms). The body mounts once it has finished, so it never janks it. */
const OPEN_MS = 300;

/**
 * "Get code": everything a reader needs to use ONE example, in a sheet that
 * slides in from the right: the install steps, then that example's usage.
 *
 * It is a native `<dialog>` opened with `showModal()`. The browser already does
 * what a dialog library re-implements in JavaScript: the top layer, the focus
 * trap, Escape, an inert page behind it and focus returning to the button. The
 * Radix sheet this replaced ran a presence check, a scroll lock, a focus scope
 * and an aria-hidden sweep on every open, and that put a half-second stall
 * between the click and the first frame on a page full of live previews.
 *
 * The sheet's body is heavy too (install steps, syntax highlighting), so it
 * mounts after the slide-in, and the code block a frame after that, behind a
 * skeleton, rather than in the same commit as the click.
 */
export function GetCodeSheet({
  title,
  usage,
  installation,
  dual = false,
  className,
}: {
  /** The example's title: the sheet's heading and the button's accessible name. */
  title: string;
  /** This example's usage snippet (TSX). */
  usage?: string;
  /** The install steps, server-rendered by the page (`<Installation>`). */
  installation?: ReactNode;
  /** The component ships a GSAP and a Motion build, so the install steps open with their switch. */
  dual?: boolean;
  className?: string;
}) {
  const { language, setLanguage } = useCodeLanguage();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [bodyReady, setBodyReady] = useState(false);
  const [codeReady, setCodeReady] = useState(false);

  // Booting the highlighter and tokenizing the snippet is the slow part of
  // opening a code panel (the first run compiles the grammar), so it starts as
  // soon as the reader's pointer, finger or focus reaches the card, well before
  // the button, and never on page load.
  useEffect(() => {
    const card = triggerRef.current?.closest("section");
    if (!card) return;
    const events = ["pointerenter", "touchstart", "focusin"] as const;
    const warm = () => {
      warmHighlighter();
      if (usage) prefetchHighlight(usage, "tsx");
      events.forEach((name) => card.removeEventListener(name, warm));
    };
    events.forEach((name) => card.addEventListener(name, warm, { passive: true }));
    return () => events.forEach((name) => card.removeEventListener(name, warm));
  }, [usage]);

  // The page behind must not scroll. The gutter is kept, so hiding the scrollbar
  // does not change the page's width and re-lay-out every preview.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const { overflow, scrollbarGutter } = root.style;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
      root.style.scrollbarGutter = scrollbarGutter;
    };
  }, [open]);

  // Body after the slide-in, code block a frame after the body.
  useEffect(() => {
    if (!open) {
      setBodyReady(false);
      setCodeReady(false);
      return;
    }
    let frame = 0;
    const timer = window.setTimeout(() => {
      startTransition(() => setBodyReady(true));
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => startTransition(() => setCodeReady(true)));
      });
    }, OPEN_MS);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-label={`Get code: ${title}`}
        className={cn(
          // A floating pill on the preview: ink fill, a soft lift, and a
          // hairline of the page colour so it reads on light and dark stages.
          "inline-flex h-9 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-foreground pl-3.5 pr-4 text-[13px] font-medium text-background",
          "shadow-[0_4px_16px_rgb(0_0_0/0.18),0_0_0_1px_rgb(255_255_255/0.08)_inset]",
          "transition-[background-color,box-shadow,transform] hover:bg-foreground/90 hover:shadow-[0_6px_20px_rgb(0_0_0/0.22),0_0_0_1px_rgb(255_255_255/0.08)_inset] active:scale-[0.97]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          className,
        )}
      >
        <Code2 aria-hidden="true" className="size-4" />
        Get code
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        // The dialog box is the sheet itself, so a click that lands on the
        // dialog element (not on its content) is a click on the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className={cn(
          "m-0 ml-auto h-dvh max-h-none w-full max-w-[640px] border-0 bg-background p-0 text-left text-base font-normal text-foreground shadow-2xl",
          // Slide in from the right; `starting:` is the state it animates from,
          // and `allow-discrete` lets the closing slide finish before it hides.
          "translate-x-full transition-[translate,display,overlay] duration-300 ease-out [transition-behavior:allow-discrete]",
          "open:translate-x-0 starting:open:translate-x-full",
          "backdrop:bg-black/50 backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:duration-300 backdrop:[transition-behavior:allow-discrete]",
          "open:backdrop:opacity-100 starting:open:backdrop:opacity-0",
          "motion-reduce:transition-none motion-reduce:backdrop:transition-none",
        )}
      >
        <div className="flex h-full flex-col">
          <header className="relative shrink-0 border-b border-foreground/[0.06] px-6 py-5 pr-14">
            <h2 id={titleId} className="text-2xl font-normal leading-8 text-foreground">
              {title}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-8 cursor-pointer place-items-center rounded-lg text-foreground/50 transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </header>

          <div className="flex-1 space-y-10 overflow-y-auto overscroll-contain px-6 pb-10 pt-5">
            {bodyReady ? (
              <>
                {/* The steps carry their own headings ("Install …"). The wrapper
                    drops the block's own page margin; the sheet's padding is enough. */}
                <div className="[&>div]:my-0">{installation}</div>

                {usage && (
                  // The Sandbox card's anatomy: an ink-tint shell, a bar with the
                  // label on the left and the TS/JS switch on the right, the
                  // code on an inset panel.
                  <section
                    aria-labelledby={`${titleId}-usage`}
                    className="flex w-full flex-col rounded-2xl bg-foreground/[0.03] ring-1 ring-inset ring-foreground/[0.05]"
                  >
                    <div className="flex min-h-12 items-center justify-between gap-3 py-2 pl-2 pr-2.5">
                      <h3
                        id={`${titleId}-usage`}
                        className={cn(
                          "flex h-8 items-center gap-2 px-3 font-sans text-sm font-medium text-foreground",
                          LABEL_PILL,
                        )}
                      >
                        <Terminal aria-hidden="true" className="size-4 text-primary" />
                        Usage
                      </h3>
                      <CodeCopy selectedLanguage={language} onLanguageChange={setLanguage} />
                    </div>
                    <div className="px-1.5 pb-1.5">
                      <div
                        className={cn(
                          "relative w-full overflow-hidden rounded-xl bg-background ring-1 ring-foreground/[0.05]",
                          CODE_SURFACE,
                        )}
                      >
                        {codeReady ? (
                          <CodeBlockClient
                            code={usage}
                            lang="tsx"
                            selectedLanguage={language}
                            onLanguageChange={setLanguage}
                          />
                        ) : (
                          <CodeSkeleton />
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </>
            ) : (
              <SheetSkeleton dual={dual} hasUsage={!!usage} />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

/** One grey bar of a skeleton. */
function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded bg-foreground/[0.07]", className)} />;
}

/** Widths of the lines of a typical snippet: imports, a blank, then nested JSX. */
const CODE_LINES = ["w-4/5", "", "w-3/5", "w-1/4 ml-2", "w-2/5 ml-4", "w-1/2 ml-4", "w-2/5 ml-6", "w-1/3 ml-4", "w-1/5 ml-2", "w-1/6"];

/** The code panel's lines, in the panel's own padding and line height. */
function CodeSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-[0.65rem] px-5 py-4 motion-reduce:animate-none">
      {CODE_LINES.map((width, i) => (
        <Bar key={i} className={cn("h-3", width || "h-3 bg-transparent")} />
      ))}
    </div>
  );
}

/**
 * The sheet's body before it mounts, in the same order and sizes as the real
 * thing so nothing moves when it arrives: the setup card, the build switch (dual
 * components only), the two install steps on their rail, then the usage panel.
 */
function SheetSkeleton({ dual, hasUsage }: { dual: boolean; hasUsage: boolean }) {
  const command = <div className="h-[6.5rem] rounded-xl bg-foreground/[0.04]" />;
  return (
    <div aria-hidden="true" className="animate-pulse space-y-10 motion-reduce:animate-none">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-foreground/[0.06] bg-foreground/[0.03] p-3.5">
          <div className="min-w-0 flex-1 space-y-2">
            <Bar className="h-4 w-24" />
            <Bar className="h-3 w-full max-w-sm" />
            <Bar className="h-3 w-2/3 max-w-xs" />
          </div>
          <Bar className="hidden h-8 w-28 shrink-0 rounded-lg sm:block" />
        </div>

        {dual && (
          <div className="flex items-center gap-4">
            <Bar className="h-9 w-40 rounded-lg" />
            <Bar className="hidden h-3.5 w-52 sm:block" />
          </div>
        )}

        <div className="ml-3.5 space-y-10 border-l border-foreground/[0.08] pl-8">
          <div className="relative space-y-3">
            <Bar className="absolute -left-[3.1rem] top-0 size-8 rounded-full" />
            <Bar className="h-6 w-48" />
            {command}
            <Bar className="h-3.5 w-3/4" />
          </div>
          <div className="relative space-y-3">
            <Bar className="absolute -left-[3.1rem] top-0 size-8 rounded-full" />
            <Bar className="h-6 w-44" />
            <Bar className="h-3.5 w-2/3" />
            {command}
          </div>
        </div>
      </div>

      {hasUsage && (
        <div className="flex w-full flex-col rounded-2xl bg-foreground/[0.03] ring-1 ring-inset ring-foreground/[0.05]">
          <div className="flex min-h-12 items-center justify-between gap-3 py-2 pl-2 pr-2.5">
            <Bar className="h-8 w-24 rounded-lg" />
            <Bar className="h-8 w-44 rounded-lg" />
          </div>
          <div className="px-1.5 pb-1.5">
            <div className="overflow-hidden rounded-xl bg-background ring-1 ring-foreground/[0.05]">
              <CodeSkeleton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
