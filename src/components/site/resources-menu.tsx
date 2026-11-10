"use client";

import { cn } from "@/lib/utils";
import { docsHref, frameworkFromPathname } from "@/lib/framework";
import { ChevronDown, Library, Server, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const RESOURCES = [
  {
    slug: "mcp",
    title: "MCP server",
    badge: "Free",
    description: "Your agent installs real Avara UI components, not hallucinated UI.",
    icon: Server,
  },
  {
    slug: "agent-skills",
    title: "Agent skills",
    badge: "Free",
    description: "Skills that turn your agent into an Avara UI expert.",
    icon: Sparkles,
  },
] as const;

/** Docs slugs that belong to the menu, so the trigger can show it is current. */
export const RESOURCE_SLUGS: ReadonlySet<string> = new Set(
  RESOURCES.map((r) => r.slug)
);

/** Pause before closing on pointer-leave, so crossing the gap doesn't dismiss. */
const CLOSE_DELAY_MS = 120;

/**
 * "Resources" nav item with a dropdown. Opens on hover (mouse) and on click or
 * keyboard (touch, Enter/Space, ArrowDown); closes on Escape, outside click,
 * focus leaving, or navigation. Desktop only — the mobile drawer already lists
 * the same pages in the sidebar.
 */
export function ResourcesMenu({ active }: { active: boolean }) {
  const pathname = usePathname() || "";
  const framework = frameworkFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pointerType = useRef("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const show = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Close after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape and outside-click dismissal, only while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      // Hover only for real mice: on touch, the synthesized enter would open
      // the menu and the tap's click would immediately toggle it shut again.
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="resources-menu"
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onClick={(e) => {
          cancelClose();
          // Hovering already opened it, so a mouse click must not toggle it
          // shut. Touch and keyboard (detail 0) have no hover step: toggle.
          if (pointerType.current === "mouse" && e.detail > 0) setOpen(true);
          else setOpen((o) => !o);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            show();
            requestAnimationFrame(() =>
              rootRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()
            );
          }
        }}
        className={cn(
          "flex items-center gap-1.5 pl-3.5 pr-3 py-1.5 rounded-full transition-all text-[12.5px] cursor-pointer hover:bg-foreground/5",
          open && "bg-foreground/5",
          active || open
            ? "font-semibold text-foreground"
            : "font-medium text-foreground/80 hover:text-foreground"
        )}
      >
        <Library className="h-3.5 w-3.5" />
        Resources
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3 text-foreground/50 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* The wrapper's top padding bridges the gap to the trigger, so the
          pointer never leaves the hover area on its way to the panel.
          `invisible` (delayed on close) keeps the links out of the tab order
          while hidden but lets the fade-out play. */}
      <div
        id="resources-menu"
        className={cn(
          "absolute left-1/2 top-full z-50 w-[348px] -translate-x-1/2 pt-3",
          open
            ? "visible"
            : "invisible [transition:visibility_0s_linear_150ms]"
        )}
      >
        <div
          className={cn(
            "origin-top rounded-2xl border border-border/70 bg-popover p-2 text-popover-foreground shadow-xl shadow-black/10 dark:shadow-black/40 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-1 scale-[0.98] opacity-0"
          )}
        >
          <ul className="flex flex-col gap-0.5">
            {RESOURCES.map(({ slug, title, badge, description, icon: Icon }) => (
              <li key={slug}>
                <Link
                  href={docsHref(framework, slug)}
                  prefetch={false}
                  className="group flex items-start gap-3.5 rounded-xl p-3 outline-none transition-colors hover:bg-foreground/[0.05] focus-visible:bg-foreground/[0.05] focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-border/70 bg-muted text-foreground/70 transition-colors group-hover:border-brand/40 group-hover:text-brand group-focus-visible:text-brand">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold leading-5 text-foreground">
                        {title}
                      </span>
                      <span className="rounded-md bg-brand/15 px-1.5 py-px text-[11px] font-semibold leading-4 text-brand">
                        {badge}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-[1.5] text-muted-foreground">
                      {description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
