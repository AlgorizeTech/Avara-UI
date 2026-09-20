"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { PACKAGE_MANAGER_ICONS } from "./package-manager-icons";
import {
  usePackageManager,
  type PackageManager,
  PM_COMMANDS,
  PM_INSTALL_COMMANDS,
} from "@/contexts/package-manager-context";
import {
  REGISTRY_FORMS,
  REGISTRY_NAMESPACE,
  isOwnItemArg,
  resolveAddArg,
  type RegistryForm,
} from "@/lib/registry";

type CliProps = {
  command: string;
};

/** One coloured run of the rendered command line. */
type Segment = { text: string; tone: "runner" | "package" | "args" };

/** The `foo.json` arguments of an `add`, if the command is one. */
function ownItemArgs(command: string): string[] {
  const add = command.match(/^add\s+(.+)$/);
  if (!add) return [];
  return add[1].trim().split(/\s+/).filter(isOwnItemArg);
}

/**
 * Expands the shorthand a page writes into the real command for `pm`.
 *
 *   `add button.json`            → `npx shadcn@latest add @algorize-ui/button`
 *                                  or, with the URL form selected,
 *                                  `npx shadcn@latest add https://…/r/button.json`
 *   `add select.json utils`      → both, space-separated: shadcn takes several
 *                                  items at once and mixes our items with its
 *                                  own bare names freely
 *   `install gsap lucide-react`  → `npm install gsap lucide-react`
 *                                  (`pnpm add …`, `yarn add …`, `bun add …`)
 *   anything else                → printed after `npx shadcn@latest` verbatim
 *                                  (`init`, `registry add …`)
 *
 * The two forms are not interchangeable: a registry component is installed by
 * the shadcn CLI, never by `npm install`, because it is a source file rather
 * than a package. Keeping both here is what lets a page state each dependency
 * with the command that actually installs it.
 */
function resolveSegments(
  command: string,
  pm: PackageManager,
  form: RegistryForm,
): Segment[] {
  const deps = command.match(/^install\s+(.+)$/);
  if (deps) {
    // "npm install" / "pnpm add" — the runner and its subcommand are coloured
    // separately, so split on the space rather than printing one blob.
    const [runner, ...sub] = PM_INSTALL_COMMANDS[pm].split(" ");
    return [
      { text: runner, tone: "runner" },
      { text: sub.join(" "), tone: "package" },
      { text: deps[1], tone: "args" },
    ];
  }

  const add = command.match(/^add\s+(.+)$/);
  const args = add
    ? `add ${add[1]
        .trim()
        .split(/\s+/)
        .map((arg) => resolveAddArg(arg, form))
        .join(" ")}`
    : command;

  return [
    { text: PM_COMMANDS[pm], tone: "runner" },
    { text: "shadcn@latest", tone: "package" },
    { text: args, tone: "args" },
  ];
}

const TONE_CLASS: Record<Segment["tone"], string> = {
  runner: "text-amber-400",
  package: "text-teal-500",
  args: "text-zinc-700 dark:text-zinc-300",
};

/**
 * What each registry form is called in the switch. The namespace is shown as
 * itself rather than paraphrased ("short", "name"): it is the exact string the
 * reader will see in the command and has to type into components.json.
 */
const FORM_LABEL: Record<RegistryForm, string> = {
  namespace: REGISTRY_NAMESPACE,
  url: "URL",
};

const FORM_TITLE: Record<RegistryForm, string> = {
  namespace: `Install by name — needs ${REGISTRY_NAMESPACE} registered once per project`,
  url: "Install by URL — works in any project, nothing to set up",
};

export const Cli = ({ command }: CliProps) => {
  const {
    packageManager: pm,
    setPackageManager: setPm,
    registryForm: form,
    setRegistryForm: setForm,
  } = usePackageManager();
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  // A page can carry several <Cli> blocks; each needs its own layoutId or the
  // active-form highlight would fly between blocks instead of within one.
  const id = useId();

  // The form toggle only makes sense on a command that installs one of our
  // items; `init`, `install gsap` and `registry add` read the same either way.
  const hasOwnItems = ownItemArgs(command).length > 0;

  // One shared feel for the highlight sliding and the text swapping, so the
  // two read as a single change. Reduced motion collapses both to a cut.
  const swap = reduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const };
  const slide = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 42, mass: 0.8 };

  const segments = resolveSegments(command, pm, form);
  const fullCommand = segments.map((s) => s.text).join(" ");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    // The command row is a shade darker than the page (zinc-100 on the off-white
    // page, zinc-900 on the near-black one). It used to be pure white / zinc-950,
    // which is the page colour on both themes, so the command read as a line of
    // body text with a border around it rather than as something to run.
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* PM Selector. The active tab shares the command row's background so it
          reads as the open panel; the bar behind it sits one step lighter. */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 border-b border-zinc-200 bg-zinc-50 pt-1.5 dark:border-zinc-800 dark:bg-zinc-950">
        <div
          role="tablist"
          aria-label="Package manager"
          className="-mb-px flex items-center gap-0.5 px-1.5 sm:gap-1 sm:px-2"
        >
          {(Object.keys(PM_COMMANDS) as PackageManager[]).map((name) => {
            const isActive = name === pm;
            const PmIcon = PACKAGE_MANAGER_ICONS[name].Icon;
            return (
              <button
                key={name}
                onClick={() => setPm(name)}
                className={cn(
                  "flex min-w-0 cursor-pointer items-center gap-1 rounded-t-lg border-b-2 px-1.5 py-1.5 text-xs font-medium transition-all duration-200 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "border-amber-400 bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    : "border-transparent text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200",
                )}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
              >
                <PmIcon
                  className="size-3.5 shrink-0 sm:size-[18px]"
                  color={isActive ? PACKAGE_MANAGER_ICONS[name].color : "#666"}
                />
                {name}
              </button>
            );
          })}
        </div>

        {/* How the item is named. A second axis beside the package manager,
            and deliberately in the same vocabulary — amber marks the active
            choice on both — so it reads as part of the command block rather
            than a widget dropped onto it. */}
        {hasOwnItems && (
          <div
            role="radiogroup"
            aria-label="Install by name or by URL"
            onKeyDown={(event) => {
              // Radiogroup convention: arrows move the selection, not focus.
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                const index = REGISTRY_FORMS.indexOf(form);
                const step = event.key === "ArrowRight" ? 1 : -1;
                const next =
                  REGISTRY_FORMS[(index + step + REGISTRY_FORMS.length) % REGISTRY_FORMS.length];
                setForm(next);
                (event.currentTarget.querySelector(
                  `[data-form="${next}"]`,
                ) as HTMLButtonElement | null)?.focus();
              }
            }}
            className="ml-auto flex shrink-0 items-center gap-1 px-1.5 sm:px-2"
          >
            {REGISTRY_FORMS.map((candidate) => {
              const isActive = candidate === form;
              return (
                <button
                  key={candidate}
                  type="button"
                  role="radio"
                  data-form={candidate}
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  title={FORM_TITLE[candidate]}
                  onClick={() => setForm(candidate)}
                  className={cn(
                    "relative cursor-pointer rounded-md px-2 py-1 font-mono text-xs font-medium transition-colors duration-150 motion-reduce:transition-none sm:px-2.5 sm:text-sm",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`${id}-form-highlight`}
                      transition={slide}
                      aria-hidden
                      className="absolute inset-0 rounded-md bg-amber-400/15 ring-1 ring-inset ring-amber-400/70 dark:bg-amber-400/10"
                    />
                  )}
                  <span className="relative">{FORM_LABEL[candidate]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Command row. The button and its fade live here, as siblings of the
          scroll region rather than inside it — an absolute child of a scroll
          container scrolls away with the content, and any vertical offset on it
          turns the container's implied `overflow-y: auto` into a real scrollbar. */}
      <div className="relative bg-zinc-100 dark:bg-zinc-900">
        {/* Deliberately not Tailwind's `overflow-x-auto` class: globals.css
            targets that bare class name with !important table-wrapper styles
            (1.5rem block margins, an 8px gray-track scrollbar). */}
        <div className="min-w-0 max-w-full py-4 pl-4 pr-14 text-left font-mono text-sm font-medium whitespace-nowrap [overflow-x:auto] [overflow-y:hidden] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Shell prompt: the conventional "this is a command" cue. Excluded
              from text selection so a drag-copy does not pick it up; the copy
              button copies `fullCommand`, which never contained it. */}
          <span
            aria-hidden
            className="mr-2 select-none text-zinc-400 dark:text-zinc-500"
          >
            $
          </span>
          {segments.map((segment, i) => (
            <React.Fragment key={segment.tone}>
              {i > 0 && " "}
              {/* Keyed on the text, so only the segment that actually changed
                  — the runner on a package-manager switch, the arguments on a
                  form switch — moves; the rest of the line holds still. */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={segment.text}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                  transition={swap}
                  className={cn("inline-block", TONE_CLASS[segment.tone])}
                >
                  {segment.text}
                </motion.span>
              </AnimatePresence>
            </React.Fragment>
          ))}
        </div>

        {/* Fades the command out beneath the button so a long, scrolled command
            never collides with the icon. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-100 via-zinc-100/90 to-transparent dark:from-zinc-900 dark:via-zinc-900/90"
        />

        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md border border-zinc-300/80 bg-white text-zinc-500 shadow-sm transition-colors duration-200 hover:border-zinc-400 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:right-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
          title={copied ? "Copied!" : "Copy command"}
          aria-label={copied ? "Copied!" : "Copy command"}
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
    </div>
  );
};
