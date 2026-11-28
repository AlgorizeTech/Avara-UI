"use client";

import { usePrefersReducedMotion } from "@/lib/animate";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ChevronRight, MailPlus, Send, X } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// ==========================================
// GUEST MORPH
// A pill with the faces of everyone who said yes. Press it and the pill grows
// into a guest list: each face flies to its row, grouped by reply, with a way
// to invite more people and a Pending group for invites not yet answered.
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

const EASE = "expo.inOut";
const DURATION = 0.7;
const CARD_WIDTH = 320;
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

function Face({ guest, className, side }: { guest: Guest; className?: string; side: "pill" | "card" }) {
  const pending = guest.status === "pending";
  return (
    <span
      data-face={guest.id}
      data-side={side}
      data-rest={guest.status === "maybe" ? 0.55 : 1}
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
    </span>
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
  const reduced = usePrefersReducedMotion();
  const [guests, setGuests] = useState(initialGuests);
  const [open, setOpen] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpen = useRef(false);
  const introduced = useRef(false);
  const newest = useRef<string | null>(null);

  const present = guests.filter((g) => g.status !== "pending");
  const going = guests.filter((g) => g.status === "going").length;
  const pendingCount = guests.length - present.length;
  const stack = present.slice(0, 3);

  // On first load the faces and the +n chip arrive one by one, then the copy blurs in beside them.
  useLayoutEffect(() => {
    const pill = pillRef.current;
    if (!pill || introduced.current || reduced) return;
    introduced.current = true;
    const faces = Array.from(pill.querySelectorAll<HTMLElement>("[data-side=pill], [data-pill-chip]"));
    const rest = Array.from(pill.querySelectorAll<HTMLElement>("[data-pill-rest]"));
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(faces, { opacity: 0, scale: 0.5, filter: "blur(6px)", duration: 0.9, stagger: 0.09, clearProps: "filter,scale,opacity,transform" }, 0)
      .from(rest, { opacity: 0, filter: "blur(10px)", duration: 0.9, stagger: 0.08, clearProps: "filter,opacity,transform" }, 0.4);
  }, [reduced]);

  // Both states stay mounted: the surface grows, the faces fly, the copy crossfades.
  useLayoutEffect(() => {
    const surface = surfaceRef.current;
    const pill = pillRef.current;
    const card = cardRef.current;
    const root = rootRef.current;
    if (!surface || !pill || !card || !root) return;
    if (wasOpen.current === open) return; // mount, or a re-run with nothing to morph
    wasOpen.current = open;

    const q = (side: "pill" | "card") =>
      Array.from(root.querySelectorAll<HTMLElement>(`[data-side="${side}"]`));
    const pillFaces = q("pill");
    const cardFaces = q("card");
    const pillOf = new Map(pillFaces.map((f) => [f.dataset.face, f]));
    const copy = Array.from(pill.querySelectorAll<HTMLElement>("[data-pill-copy]"));
    const reveal = Array.from(card.querySelectorAll<HTMLElement>("[data-reveal]"));
    gsap.killTweensOf([surface, pill, card, ...pillFaces, ...cardFaces, ...copy, ...reveal]);

    const closedW = root.offsetWidth;
    const closedH = root.offsetHeight;
    const cardH = card.offsetHeight;
    const dur = reduced ? 0 : DURATION;
    const tl = gsap.timeline({ defaults: { duration: dur, ease: EASE } });

    // Where each card face has to start from (or return to) to sit on its pill face.
    const offsets = new Map<HTMLElement, { x: number; y: number }>();
    for (const face of cardFaces) {
      const twin = pillOf.get(face.dataset.face);
      if (!twin) continue;
      const a = twin.getBoundingClientRect();
      const b = face.getBoundingClientRect();
      const x = gsap.getProperty(face, "x") as number;
      const y = gsap.getProperty(face, "y") as number;
      offsets.set(face, { x: a.left - (b.left - x), y: a.top - (b.top - y) });
    }

    // The wrapper grows with the card, so the page around it makes room instead of scrolling.
    root.style.minHeight = `${closedH}px`;
    if (open) {
      void root.offsetHeight;
      root.style.minHeight = `${cardH}px`;
      gsap.set(surface, {
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginLeft: -closedW / 2,
        width: closedW,
        height: closedH,
        zIndex: 30,
        overflow: "hidden",
      });
      gsap.set(card, { autoAlpha: 1 });
      // Labels rise; each row's cells slide in from the left, so a row reads left to right.
      for (const el of reveal) gsap.set(el, el.closest("li") ? { opacity: 0, x: -14, filter: "blur(10px)" } : { opacity: 0, y: 14, filter: "blur(10px)" });
      for (const f of cardFaces) {
        const o = offsets.get(f);
        gsap.set(f, o ? { x: o.x, y: o.y, filter: "blur(3px)" } : { opacity: 0, scale: 0.6, filter: "blur(3px)" });
      }
      gsap.set(pillFaces, { autoAlpha: 0 });
      gsap.set(pill, { pointerEvents: "none" });
      tl.to(copy, { opacity: 0, filter: "blur(6px)", duration: dur * 0.3, ease: "power2.out" }, 0)
        .to(surface, { width: CARD_WIDTH, marginLeft: -CARD_WIDTH / 2, height: cardH }, 0)
        .to(cardFaces, { x: 0, y: 0, filter: "blur(0px)", ease: "expo.out", opacity: (_, f: HTMLElement) => Number(f.dataset.rest), scale: 1, stagger: reduced ? 0 : 0.05 }, 0)
        .to(
          reveal,
          { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: reduced ? 0 : 0.8, ease: "power3.out", stagger: reduced ? 0 : 0.07 },
          dur * 0.4,
        )
        .set(surface, { overflow: "visible" })
        .call(() => closeRef.current?.focus({ preventScroll: true }), undefined, dur * 0.2);
    } else {
      root.style.minHeight = `${closedH}px`;
      gsap.set(surface, { overflow: "hidden" });
      gsap.set(pillFaces, { autoAlpha: 0 });
      tl.to(reveal, { opacity: 0, y: -4, filter: "blur(6px)", duration: dur * 0.3, ease: "power2.out" }, 0)
        .to(
          cardFaces,
          {
            x: (_, f: HTMLElement) => offsets.get(f)?.x ?? 0,
            y: (_, f: HTMLElement) => offsets.get(f)?.y ?? 0,
            opacity: (_, f: HTMLElement) => (offsets.has(f) ? Number(f.dataset.rest) : 0),
            scale: (_, f: HTMLElement) => (offsets.has(f) ? 1 : 0.6),
          },
          0,
        )
        .to(surface, { width: closedW, marginLeft: -closedW / 2, height: closedH }, 0)
        .to(copy, { opacity: 1, filter: "blur(0px)", duration: dur * 0.45, ease: "power2.out" }, dur * 0.55)
        .call(
          () => {
            gsap.set(pillFaces, { autoAlpha: 1 });
            gsap.set(card, { autoAlpha: 0 });
            gsap.set([...cardFaces, ...reveal], { clearProps: "transform,translate,rotate,scale,opacity,visibility,filter" });
            root.style.minHeight = "";
            gsap.set(copy, { clearProps: "filter" });
            gsap.set(surface, { clearProps: "all" });
            gsap.set(pill, { clearProps: "pointerEvents" });
            pill.focus({ preventScroll: true });
          },
          undefined,
          dur,
        );
    }
  }, [open, reduced]);

  const close = () => {
    setOpen(false);
    setInviting(false);
    setEmail("");
    setError("");
  };

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

  // The card eases to its new height as guests are added, cancelled or the form opens.
  useLayoutEffect(() => {
    const surface = surfaceRef.current;
    const card = cardRef.current;
    if (!open || !surface || !card) return;
    const to = card.offsetHeight;
    if (rootRef.current) rootRef.current.style.minHeight = `${to}px`;
    const added = newest.current;
    newest.current = null;
    if (reduced) gsap.set(surface, { height: to });
    else if (!gsap.isTweening(surface)) {
      gsap.to(surface, { height: to, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    }
    if (added && !reduced) {
      // A new invite arrives top to bottom, and left to right along its row.
      const row = card.querySelector<HTMLElement>(`[data-row="${CSS.escape(added)}"]`);
      if (row) {
        const label = row.closest("section")?.querySelectorAll("li").length === 1
          ? row.closest("section")?.querySelector<HTMLElement>("[data-reveal]")
          : null;
        const cells = Array.from(row.querySelectorAll<HTMLElement>("[data-face], [data-reveal]"));
        gsap.killTweensOf(cells);
        if (label) gsap.from(label, { opacity: 0, y: 8, filter: "blur(8px)", duration: 0.6, delay: 0.15, ease: "power3.out", clearProps: "opacity,transform,filter" });
        gsap.from(cells, {
          opacity: 0,
          x: -14,
          filter: "blur(8px)",
          duration: 0.7,
          delay: label ? 0.3 : 0.2,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "opacity,transform,filter",
        });
      }
    }
  }, [guests, inviting, error, open, reduced]);

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
      const id = `invite-${value}`;
      newest.current = id;
      commit([...guests, { id, name: value, status: "pending", note: "Invite sent just now" }]);
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

  return (
    <div ref={rootRef} className={cn(
        "relative inline-block transition-[min-height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      {...props}
    >
      {/* The surface is the pill's background at rest and the card's while open. */}
      <div
        ref={surfaceRef}
        aria-hidden
        className="absolute inset-0 rounded-[28px] bg-card ring-1 ring-[#F7F7F6] dark:ring-border/60 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_40px_-24px_rgb(0_0_0/0.22)]"
      />

      <button
        ref={pillRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${title}: ${going} going. Open guest list`}
        className="group relative z-10 flex items-center gap-3 rounded-[28px] p-2 pr-2.5 text-left transition-transform duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="flex items-center">
          {stack.map((g) => (
            <Face key={g.id} guest={g} side="pill" className="ring-2 ring-card -ml-3 first:ml-0 transition-[margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1.5 group-hover:first:ml-0" />
          ))}
          {present.length > stack.length && (
            <span
              data-pill-copy
              data-pill-chip
              className="flex size-9 items-center justify-center -ml-3 first:ml-0 transition-[margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-1.5 group-hover:first:ml-0 rounded-full bg-[#F7F7F6] dark:bg-background/50 text-xs font-semibold text-muted-foreground ring-2 ring-card"
            >
              +{present.length - stack.length}
            </span>
          )}
        </span>
        <span data-pill-copy data-pill-rest className="pr-1">
          <span className="block text-sm font-semibold leading-tight">{title}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70 motion-reduce:animate-none" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            {going} going{pendingCount > 0 && ` · ${pendingCount} pending`}
          </span>
        </span>
        <span
          data-pill-copy
          data-pill-rest
          className="flex size-9 items-center justify-center rounded-full bg-[#F7F7F6] dark:bg-background/50 text-muted-foreground"
        >
          <ChevronRight className="size-4" />
        </span>
      </button>

      {/* Laid out all the time, so its faces can be measured, but only shown while open. */}
      <div
        ref={cardRef}
        role="dialog"
        aria-label={`${title} guest list`}
        aria-hidden={!open}
        className="invisible absolute left-1/2 top-0 z-40 -ml-40 w-80 max-w-[100vw] p-3"
      >
        <div className="flex items-center justify-between px-2 pb-1 pt-1.5">
          <h3 data-reveal className="text-sm font-semibold">
            {title}
            <span className="ml-2 font-normal text-muted-foreground">{guests.length}</span>
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            tabIndex={open ? 0 : -1}
            aria-label="Close guest list"
            className={cn(iconButton, "size-8")}
          >
            <X className="size-4" />
          </button>
        </div>

        {GROUPS.map(({ status, label }) => {
          const rows = guests.filter((g) => g.status === status);
          if (!rows.length) return null;
          return (
            <section key={status} aria-label={label} className="mt-2">
              <p data-reveal className="px-2 pb-1 text-xs text-muted-foreground">
                {label} · {rows.length}
              </p>
              <ul>
                {rows.map((g) => (
                  <li key={g.id} data-row={g.id} className="flex items-center gap-3 rounded-2xl px-2 py-1.5">
                    <Face guest={g} side="card" />
                    <div data-reveal className={cn("min-w-0 flex-1", g.status === "maybe" && "opacity-60")}>
                      <p className="truncate text-sm font-medium leading-tight">{g.name}</p>
                      {g.note && <p className="truncate text-xs text-muted-foreground">{g.note}</p>}
                    </div>
                    {g.since && (
                      <span data-reveal className="text-xs text-muted-foreground tabular-nums">
                        {g.since}
                      </span>
                    )}
                    {g.status === "pending" && (
                      <>
                        <span
                          data-reveal
                          className="rounded-full bg-[#F7F7F6] dark:bg-background/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          Invite pending
                        </span>
                        <button
                          data-reveal
                          type="button"
                          onClick={() => revoke(g.id)}
                          tabIndex={open ? 0 : -1}
                          aria-label={`Cancel invite for ${g.name}`}
                          className={cn(iconButton, "size-6")}
                        >
                          <X className="size-3.5" />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {inviting ? (
          <form onSubmit={submit} noValidate className="mt-3 px-1">
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
          <button
            type="button"
            data-reveal
            onClick={() => setInviting(true)}
            tabIndex={open ? 0 : -1}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#F7F7F6] text-sm font-medium transition-colors hover:bg-[#EFEFED] dark:bg-background/50 dark:hover:bg-background/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <MailPlus className="size-4" />
            Invite
          </button>
        )}
      </div>
    </div>
  );
}
