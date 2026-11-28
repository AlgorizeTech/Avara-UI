"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronRight, MailPlus, Send, X } from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";

// ==========================================
// GUEST MORPH (Motion build)
// A pill with the faces of everyone who said yes. Press it and the pill grows
// into a guest list: the shell and every face share a layoutId, so each face
// flies to its row, and names cascade in. Invite people from the card; they
// show as Pending until you take the invite back.
// ==========================================

export type GuestStatus = "going" | "maybe" | "pending";

export interface Guest {
  id: string;
  /** A name, or the email address for a pending invite. */
  name: string;
  /** A photo for the face. Without one, the face shows the name's initials. */
  avatar?: string;
  /** A line under the name, such as a plus-one or a dietary note. */
  note?: string;
  status: GuestStatus;
  /** Right-aligned for guests who may come, such as "12m". */
  since?: string;
}

export interface GuestMorphProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The event's name, shown on the pill and as the card's heading. */
  title: string;
  /** The starting list. Invites sent from the card are added after these as Pending. */
  guests: Guest[];
  /**
   * Called with the email when someone is invited. The invite shows as Pending once
   * a returned promise resolves; throw an Error to show its message instead.
   */
  onInvite?: (email: string) => void | Promise<void>;
  /** Called whenever the list changes: an invite was sent or taken back. */
  onChange?: (guests: Guest[]) => void;
}

const SPRING = { type: "spring", stiffness: 380, damping: 36, mass: 0.9 } as const;
const RADIUS = 28;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GROUPS: { status: GuestStatus; label: string }[] = [
  { status: "going", label: "Going" },
  { status: "maybe", label: "Maybe" },
  { status: "pending", label: "Pending" },
];

const initials = (name: string) => {
  const parts = name.split("@")[0].split(/[\s._-]+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
};

/** A steady hue per name, so a face keeps its colour in the pill and in the list. */
const hueOf = (name: string) => {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
};

function Face({ guest, className, enter }: { guest: Guest; className?: string; enter?: number }) {
  const pending = guest.status === "pending";
  return (
    <motion.span
      layoutId={`face-${guest.id}`}
      transition={SPRING}
      initial={enter === undefined ? undefined : { opacity: 0, scale: 0.5, filter: "blur(6px)" }}
      animate={
        enter === undefined
          ? undefined
          : { opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: enter, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
      }
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-[11px] font-bold text-white",
        pending && "border border-dashed border-muted-foreground/50 !bg-transparent text-muted-foreground",
        guest.status === "maybe" && "opacity-55",
        className,
      )}
      style={{ background: `oklch(0.62 0.15 ${hueOf(guest.name)})` }}
    >
      {guest.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={guest.avatar} alt="" draggable={false} className="size-full object-cover" />
      ) : (
        initials(guest.name)
      )}
    </motion.span>
  );
}

export function GuestMorph({
  title,
  guests: initialGuests,
  onInvite,
  onChange,
  className,
  ...props
}: GuestMorphProps) {
  const reduced = useReducedMotion();
  const group = useId();
  const [guests, setGuests] = useState(initialGuests);
  const [open, setOpen] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggled = useRef(false);
  /** True until the card is first opened, so only the first arrival plays the intro. */
  const intro = useRef(true);
  /** False while the card is first opening, so rows arrive in sequence; true once it has settled. */
  const [settled, setSettled] = useState(false);

  const present = guests.filter((g) => g.status !== "pending");
  const going = guests.filter((g) => g.status === "going").length;
  const pendingCount = guests.length - present.length;
  const stack = present.slice(0, 3);
  const transition = reduced ? { duration: 0 } : SPRING;

  const show = () => {
    toggled.current = true;
    intro.current = false;
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setInviting(false);
    setEmail("");
    setError("");
  };

  useEffect(() => {
    if (!open) return setSettled(false);
    const timer = setTimeout(() => setSettled(true), 2000);
    return () => clearTimeout(timer);
  }, [open]);

  // Hand focus across the morph.
  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
    else if (toggled.current) pillRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Escape and a press outside both fold the card back.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPress = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  });

  useEffect(() => {
    if (inviting) inputRef.current?.focus({ preventScroll: true });
  }, [inviting]);

  const commit = (next: Guest[]) => {
    setGuests(next);
    onChange?.(next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL.test(value)) return setError("Enter a valid email address.");
    if (guests.some((g) => g.name.toLowerCase() === value)) {
      return setError("That person is already on the list.");
    }
    setError("");
    setSending(true);
    try {
      await onInvite?.(value);
      commit([...guests, { id: `invite-${value}`, name: value, status: "pending", note: "Invite sent just now" }]);
      setEmail("");
      setInviting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The invite could not be sent.");
    } finally {
      setSending(false);
    }
  };

  const revoke = (id: string) => commit(guests.filter((g) => g.id !== id));

  const iconButton =
    "flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
  // borderRadius lives in style, so layout animations can correct it as the shell stretches.
  const shell = "bg-card text-card-foreground ring-1 ring-[#F7F7F6] dark:ring-border/60 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_40px_-24px_rgb(0_0_0/0.22)]";

  // Names and roles cascade in after the shell has started to grow.
  let step = 0;
  // `layout="position"` moves a child with the shell without stretching it as the shell scales.
  const cascade = () => ({
    layout: "position" as const,
    initial: { opacity: 0, y: 14, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(6px)", transition: { duration: 0.15 } },
    transition: reduced
      ? { duration: 0 }
      : { delay: 0.2 + 0.07 * step++, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  });

  // A row's cells slide in from the left one after another; rows go top to bottom.
  let rowIndex = 0;
  const rowStart = () => (settled ? 0.2 : 0.3 + 0.1 * rowIndex++);
  const cell = (start: number, column: number) => ({
    initial: { opacity: 0, x: -14, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(6px)", transition: { duration: 0.15 } },
    transition: reduced
      ? { duration: 0 }
      : { delay: start + 0.09 * column, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  });

  // The pill's copy waits for the shell to finish shrinking, then fades in unstretched.
  // On first load it follows the faces instead, with a longer blur.
  const settle = (i: number, first: number) => ({
    layout: "position" as const,
    initial: { opacity: 0, filter: intro.current ? "blur(10px)" : "blur(6px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: reduced
      ? { duration: 0 }
      : intro.current
        ? { delay: first, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }
        : { delay: 0.2 + 0.03 * i, duration: 0.45 },
  });

  return (
    <LayoutGroup id={group}>
      <div
        ref={rootRef}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {!open ? (
          <motion.div
            layoutId="shell"
            transition={transition}
            className={cn(shell, "w-max")}
            style={{ borderRadius: RADIUS }}
          >
            <button
              ref={pillRef}
              type="button"
              onClick={show}
              aria-haspopup="dialog"
              aria-expanded={false}
              aria-label={`${title}: ${going} going. Open guest list`}
              className="group flex items-center gap-3 p-2 pr-2.5 text-left transition-transform duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={{ borderRadius: RADIUS }}
            >
              <span className="flex items-center">
                {stack.map((g, i) => (
                  <Face key={g.id} guest={g} enter={intro.current ? i * 0.09 : undefined} className="ring-2 ring-card -ml-3 first:ml-0 transition-[margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1.5 group-hover:first:ml-0" />
                ))}
                {present.length > stack.length && (
                  <motion.span
                    {...settle(0, 0.27)}
                    className="flex size-9 items-center justify-center -ml-3 first:ml-0 transition-[margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1.5 group-hover:first:ml-0 rounded-full bg-[#F7F7F6] dark:bg-background/50 text-xs font-semibold text-muted-foreground ring-2 ring-card"
                  >
                    +{present.length - stack.length}
                  </motion.span>
                )}
              </span>
              <motion.span {...settle(1, 0.4)} className="pr-1">
                <span className="block text-sm font-semibold leading-tight">{title}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="relative flex size-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70 motion-reduce:animate-none" />
                    <span className="relative size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {going} going{pendingCount > 0 && ` · ${pendingCount} pending`}
                </span>
              </motion.span>
              <motion.span
                {...settle(2, 0.48)}
                className="flex size-9 items-center justify-center rounded-full bg-[#F7F7F6] dark:bg-background/50 text-muted-foreground"
              >
                <ChevronRight className="size-4" />
              </motion.span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            layoutId="shell"
            transition={transition}
            role="dialog"
            aria-label={`${title} guest list`}
            className={cn(shell, "w-80 max-w-full p-3")}
            style={{ borderRadius: RADIUS }}
          >
            <div className="flex items-center justify-between px-2 pb-1 pt-1.5">
              <motion.h3 {...cascade()} className="text-sm font-semibold">
                {title}
                <span className="ml-2 font-normal text-muted-foreground">{guests.length}</span>
              </motion.h3>
              <motion.button
                {...cascade()}
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close guest list"
                className={cn(iconButton, "size-8")}
              >
                <X className="size-4" />
              </motion.button>
            </div>

            {GROUPS.map(({ status, label }) => {
              const rows = guests.filter((g) => g.status === status);
              if (!rows.length) return null;
              return (
                <section key={status} aria-label={label} className="mt-2">
                  <motion.p {...cascade()} className="px-2 pb-1 text-xs text-muted-foreground">
                    {label} · {rows.length}
                  </motion.p>
                  <ul>
                    <AnimatePresence>
                      {rows.map((g) => {
                        const start = rowStart();
                        return (
                          <motion.li
                            key={g.id}
                            layout="position"
                            exit={{ opacity: 0, height: 0, filter: "blur(6px)" }}
                            transition={transition}
                            className="flex items-center gap-3 rounded-2xl px-2 py-1.5"
                          >
                            <Face guest={g} enter={settled ? start : undefined} />
                            <motion.div
                              {...cell(start, 1)}
                              className={cn("min-w-0 flex-1", g.status === "maybe" && "opacity-60")}
                            >
                              <p className="truncate text-sm font-medium leading-tight">{g.name}</p>
                              {g.note && <p className="truncate text-xs text-muted-foreground">{g.note}</p>}
                            </motion.div>
                            {g.since && (
                              <motion.span {...cell(start, 2)} className="text-xs text-muted-foreground tabular-nums">
                                {g.since}
                              </motion.span>
                            )}
                            {g.status === "pending" && (
                              <>
                                <motion.span
                                  {...cell(start, 2)}
                                  className="rounded-full bg-[#F7F7F6] dark:bg-background/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                                >
                                  Invite pending
                                </motion.span>
                                <motion.button
                                  {...cell(start, 3)}
                                  type="button"
                                  onClick={() => revoke(g.id)}
                                  aria-label={`Cancel invite for ${g.name}`}
                                  className={cn(iconButton, "size-6")}
                                >
                                  <X className="size-3.5" />
                                </motion.button>
                              </>
                            )}
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </section>
              );
            })}

            <motion.div layout="position" transition={transition} className="mt-3 px-1">
              {inviting ? (
                <form onSubmit={submit} noValidate>
                  <div className="flex items-center gap-2 rounded-full bg-[#F7F7F6] dark:bg-background/50 py-1 pl-4 pr-1 focus-within:ring-2 focus-within:ring-ring">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          e.stopPropagation();
                          setInviting(false);
                          setError("");
                        }
                      }}
                      placeholder="name@email.com"
                      aria-label="Email address to invite"
                      aria-invalid={!!error}
                      aria-describedby={error ? "guest-morph-error" : undefined}
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      aria-label="Send invite"
                      className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <Send className="size-3.5" />
                    </button>
                  </div>
                  {error && (
                    <p id="guest-morph-error" role="alert" className="px-4 pt-1.5 text-xs text-destructive">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <motion.button
                  {...cascade()}
                  type="button"
                  onClick={() => setInviting(true)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#F7F7F6] text-sm font-medium transition-colors hover:bg-[#EFEFED] dark:bg-background/50 dark:hover:bg-background/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <MailPlus className="size-4" />
                  Invite
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </LayoutGroup>
  );
}
