"use client";

import * as React from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  animate,
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import Button from "@/components/custom/blocks/Button";
import { cn } from "@/lib/utils";

// Animated icon: bookmark
const BookmarkIcon = (() => {
  interface BookmarkIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface BookmarkIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const BOOKMARK_VARIANTS: Variants = {
    normal: { scaleY: 1, scaleX: 1 },
    animate: {
      scaleY: [1, 1.3, 0.9, 1.05, 1],
      scaleX: [1, 0.9, 1.1, 0.95, 1],
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const BookmarkIcon = forwardRef<BookmarkIconHandle, BookmarkIconProps>(
    (
      {
        className,
        onMouseEnter,
        onMouseLeave,
        size,
        active,
        style,
        strokeWidth,
        ...props
      },
      ref,
    ) => {
      const controls = useAnimation();
      const isControlledRef = useRef(false);

      useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
          startAnimation: () => controls.start("animate"),
          stopAnimation: () => controls.start("normal"),
        };
      });

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseEnter?.(e);
          } else {
            controls.start("animate");
          }
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseLeave?.(e);
          } else {
            controls.start("normal");
          }
        },
        [controls, onMouseLeave],
      );

      const wrap = useRef<HTMLSpanElement>(null);
      const reduced = useReducedMotion();
      const [hosted, setHosted] = useState(false);
      useEffect(() => {
        const fake = {} as React.MouseEvent<HTMLSpanElement>;
        if (reduced) {
          setHosted(true);
          return;
        }
        if (active !== undefined) {
          setHosted(true);
          (active ? handleMouseEnter : handleMouseLeave)(fake);
          return;
        }
        const host = wrap.current?.parentElement?.closest<HTMLElement>(
          "button, a, [role=button], [role=menuitem], [role=tab], [role=switch], [role=radio], label",
        );
        setHosted(!!host);
        if (!host) return;
        const on = () => handleMouseEnter(fake);
        const off = () => handleMouseLeave(fake);
        host.addEventListener("pointerenter", on);
        host.addEventListener("pointerleave", off);
        return () => {
          host.removeEventListener("pointerenter", on);
          host.removeEventListener("pointerleave", off);
        };
      }, [active, reduced, handleMouseEnter, handleMouseLeave]);

      return (
        <span
          ref={wrap}
          className={cn(
            "inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
            className,
          )}
          style={size ? { width: size, height: size, ...style } : style}
          onMouseEnter={hosted ? undefined : handleMouseEnter}
          onMouseLeave={hosted ? undefined : handleMouseLeave}
          {...props}
        >
          <svg
            fill="none"
            height={size}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth ?? 2}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              animate={controls}
              d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
              style={{ originY: 0.5, originX: 0.5 }}
              variants={BOOKMARK_VARIANTS}
            />
          </svg>
        </span>
      );
    },
  );

  BookmarkIcon.displayName = "BookmarkIcon";
  return BookmarkIcon;
})();

// Animated icon: check
const CheckIcon = (() => {
  interface CheckIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface CheckIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const PATH_VARIANTS: Variants = {
    normal: {
      opacity: 1,
      pathLength: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        opacity: { duration: 0.1 },
      },
    },
    animate: {
      opacity: [0, 1],
      pathLength: [0, 1],
      scale: [0.5, 1],
      transition: {
        duration: 0.4,
        opacity: { duration: 0.1 },
      },
    },
  };

  const CheckIcon = forwardRef<CheckIconHandle, CheckIconProps>(
    (
      {
        onMouseEnter,
        onMouseLeave,
        className,
        size,
        active,
        style,
        strokeWidth,
        ...props
      },
      ref,
    ) => {
      const controls = useAnimation();
      const isControlledRef = useRef(false);

      useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
          startAnimation: () => controls.start("animate"),
          stopAnimation: () => controls.start("normal"),
        };
      });

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseEnter?.(e);
          } else {
            controls.start("animate");
          }
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseLeave?.(e);
          } else {
            controls.start("normal");
          }
        },
        [controls, onMouseLeave],
      );

      const wrap = useRef<HTMLSpanElement>(null);
      const reduced = useReducedMotion();
      const [hosted, setHosted] = useState(false);
      useEffect(() => {
        const fake = {} as React.MouseEvent<HTMLSpanElement>;
        if (reduced) {
          setHosted(true);
          return;
        }
        if (active !== undefined) {
          setHosted(true);
          (active ? handleMouseEnter : handleMouseLeave)(fake);
          return;
        }
        const host = wrap.current?.parentElement?.closest<HTMLElement>(
          "button, a, [role=button], [role=menuitem], [role=tab], [role=switch], [role=radio], label",
        );
        setHosted(!!host);
        if (!host) return;
        const on = () => handleMouseEnter(fake);
        const off = () => handleMouseLeave(fake);
        host.addEventListener("pointerenter", on);
        host.addEventListener("pointerleave", off);
        return () => {
          host.removeEventListener("pointerenter", on);
          host.removeEventListener("pointerleave", off);
        };
      }, [active, reduced, handleMouseEnter, handleMouseLeave]);

      return (
        <span
          ref={wrap}
          className={cn(
            "inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
            className,
          )}
          style={size ? { width: size, height: size, ...style } : style}
          onMouseEnter={hosted ? undefined : handleMouseEnter}
          onMouseLeave={hosted ? undefined : handleMouseLeave}
          {...props}
        >
          <svg
            fill="none"
            height={size}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth ?? 2}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              animate={controls}
              d="M4 12 9 17L20 6"
              initial="normal"
              variants={PATH_VARIANTS}
            />
          </svg>
        </span>
      );
    },
  );

  CheckIcon.displayName = "CheckIcon";
  return CheckIcon;
})();

// Animated icon: map-pin
const MapPinIcon = (() => {
  interface MapPinIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface MapPinIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const SVG_VARIANTS: Variants = {
    normal: { y: 0 },
    animate: {
      y: [0, -5, -3],
      transition: {
        duration: 0.5,
        times: [0, 0.6, 1],
      },
    },
  };

  const CIRCLE_VARIANTS: Variants = {
    normal: { opacity: 1 },
    animate: {
      opacity: [0, 1],
      pathLength: [0, 1],
      pathOffset: [0.5, 0],
      transition: {
        delay: 0.3,
        duration: 0.5,
        opacity: { duration: 0.1, delay: 0.3 },
      },
    },
  };

  const MapPinIcon = forwardRef<MapPinIconHandle, MapPinIconProps>(
    (
      {
        onMouseEnter,
        onMouseLeave,
        className,
        size,
        active,
        style,
        strokeWidth,
        ...props
      },
      ref,
    ) => {
      const controls = useAnimation();
      const isControlledRef = useRef(false);

      useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
          startAnimation: () => controls.start("animate"),
          stopAnimation: () => controls.start("normal"),
        };
      });

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseEnter?.(e);
          } else {
            controls.start("animate");
          }
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseLeave?.(e);
          } else {
            controls.start("normal");
          }
        },
        [controls, onMouseLeave],
      );

      const wrap = useRef<HTMLSpanElement>(null);
      const reduced = useReducedMotion();
      const [hosted, setHosted] = useState(false);
      useEffect(() => {
        const fake = {} as React.MouseEvent<HTMLSpanElement>;
        if (reduced) {
          setHosted(true);
          return;
        }
        if (active !== undefined) {
          setHosted(true);
          (active ? handleMouseEnter : handleMouseLeave)(fake);
          return;
        }
        const host = wrap.current?.parentElement?.closest<HTMLElement>(
          "button, a, [role=button], [role=menuitem], [role=tab], [role=switch], [role=radio], label",
        );
        setHosted(!!host);
        if (!host) return;
        const on = () => handleMouseEnter(fake);
        const off = () => handleMouseLeave(fake);
        host.addEventListener("pointerenter", on);
        host.addEventListener("pointerleave", off);
        return () => {
          host.removeEventListener("pointerenter", on);
          host.removeEventListener("pointerleave", off);
        };
      }, [active, reduced, handleMouseEnter, handleMouseLeave]);

      return (
        <span
          ref={wrap}
          className={cn(
            "inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
            className,
          )}
          style={size ? { width: size, height: size, ...style } : style}
          onMouseEnter={hosted ? undefined : handleMouseEnter}
          onMouseLeave={hosted ? undefined : handleMouseLeave}
          {...props}
        >
          <motion.svg
            animate={controls}
            fill="none"
            height={size}
            initial="normal"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth ?? 2}
            variants={SVG_VARIANTS}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <motion.circle
              animate={controls}
              cx="12"
              cy="10"
              initial="normal"
              r="3"
              variants={CIRCLE_VARIANTS}
            />
          </motion.svg>
        </span>
      );
    },
  );

  MapPinIcon.displayName = "MapPinIcon";
  return MapPinIcon;
})();

// Animated icon: message-circle
const MessageCircleIcon = (() => {
  interface MessageCircleIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface MessageCircleIconProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const ICON_VARIANTS: Variants = {
    normal: { scale: 1, rotate: 0 },
    animate: {
      scale: 1.05,
      rotate: [0, -7, 7, 0],
      transition: {
        rotate: { duration: 0.5, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 400, damping: 10 },
      },
    },
  };

  const MessageCircleIcon = forwardRef<
    MessageCircleIconHandle,
    MessageCircleIconProps
  >(
    (
      {
        onMouseEnter,
        onMouseLeave,
        className,
        size,
        active,
        style,
        strokeWidth,
        ...props
      },
      ref,
    ) => {
      const controls = useAnimation();
      const isControlledRef = useRef(false);

      useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
          startAnimation: () => controls.start("animate"),
          stopAnimation: () => controls.start("normal"),
        };
      });

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseEnter?.(e);
          } else {
            controls.start("animate");
          }
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseLeave?.(e);
          } else {
            controls.start("normal");
          }
        },
        [controls, onMouseLeave],
      );

      const wrap = useRef<HTMLSpanElement>(null);
      const reduced = useReducedMotion();
      const [hosted, setHosted] = useState(false);
      useEffect(() => {
        const fake = {} as React.MouseEvent<HTMLSpanElement>;
        if (reduced) {
          setHosted(true);
          return;
        }
        if (active !== undefined) {
          setHosted(true);
          (active ? handleMouseEnter : handleMouseLeave)(fake);
          return;
        }
        const host = wrap.current?.parentElement?.closest<HTMLElement>(
          "button, a, [role=button], [role=menuitem], [role=tab], [role=switch], [role=radio], label",
        );
        setHosted(!!host);
        if (!host) return;
        const on = () => handleMouseEnter(fake);
        const off = () => handleMouseLeave(fake);
        host.addEventListener("pointerenter", on);
        host.addEventListener("pointerleave", off);
        return () => {
          host.removeEventListener("pointerenter", on);
          host.removeEventListener("pointerleave", off);
        };
      }, [active, reduced, handleMouseEnter, handleMouseLeave]);

      return (
        <span
          ref={wrap}
          className={cn(
            "inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
            className,
          )}
          style={size ? { width: size, height: size, ...style } : style}
          onMouseEnter={hosted ? undefined : handleMouseEnter}
          onMouseLeave={hosted ? undefined : handleMouseLeave}
          {...props}
        >
          <motion.svg
            animate={controls}
            fill="none"
            height={size}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth ?? 2}
            variants={ICON_VARIANTS}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </motion.svg>
        </span>
      );
    },
  );

  MessageCircleIcon.displayName = "MessageCircleIcon";
  return MessageCircleIcon;
})();

// Animated icon: user-plus
const UserPlusIcon = (() => {
  interface UserPlusIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface UserPlusIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const PLUS_VARIANTS: Variants = {
    normal: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    animate: {
      scale: [0, 1.15, 1],
      rotate: [-90, 0, 0],
      opacity: [0, 1, 1],
      transition: {
        delay: 0.25,
        duration: 0.45,
        ease: "easeOut",
        times: [0, 0.7, 1],
      },
    },
  };

  const UserPlusIcon = forwardRef<UserPlusIconHandle, UserPlusIconProps>(
    (
      {
        onMouseEnter,
        onMouseLeave,
        className,
        size,
        active,
        style,
        strokeWidth,
        ...props
      },
      ref,
    ) => {
      const controls = useAnimation();
      const isControlledRef = useRef(false);

      useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
          startAnimation: () => controls.start("animate"),
          stopAnimation: () => controls.start("normal"),
        };
      });

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseEnter?.(e);
          } else {
            controls.start("animate");
          }
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) {
            onMouseLeave?.(e);
          } else {
            controls.start("normal");
          }
        },
        [controls, onMouseLeave],
      );

      const wrap = useRef<HTMLSpanElement>(null);
      const reduced = useReducedMotion();
      const [hosted, setHosted] = useState(false);
      useEffect(() => {
        const fake = {} as React.MouseEvent<HTMLSpanElement>;
        if (reduced) {
          setHosted(true);
          return;
        }
        if (active !== undefined) {
          setHosted(true);
          (active ? handleMouseEnter : handleMouseLeave)(fake);
          return;
        }
        const host = wrap.current?.parentElement?.closest<HTMLElement>(
          "button, a, [role=button], [role=menuitem], [role=tab], [role=switch], [role=radio], label",
        );
        setHosted(!!host);
        if (!host) return;
        const on = () => handleMouseEnter(fake);
        const off = () => handleMouseLeave(fake);
        host.addEventListener("pointerenter", on);
        host.addEventListener("pointerleave", off);
        return () => {
          host.removeEventListener("pointerenter", on);
          host.removeEventListener("pointerleave", off);
        };
      }, [active, reduced, handleMouseEnter, handleMouseLeave]);

      return (
        <span
          ref={wrap}
          className={cn(
            "inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
            className,
          )}
          style={size ? { width: size, height: size, ...style } : style}
          onMouseEnter={hosted ? undefined : handleMouseEnter}
          onMouseLeave={hosted ? undefined : handleMouseLeave}
          {...props}
        >
          <svg
            fill="none"
            height={size}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth ?? 2}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <motion.g
              animate={controls}
              initial="normal"
              style={{ transformOrigin: "19px 11px" }}
              variants={PLUS_VARIANTS}
            >
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </motion.g>
          </svg>
        </span>
      );
    },
  );

  UserPlusIcon.displayName = "UserPlusIcon";
  return UserPlusIcon;
})();

export interface ProfileStat {
  label: string;
  value: number;
  /** Decimal places. Default `0`. */
  decimals?: number;
  /** Shorten thousands to "12.4k". Default `false`. */
  compact?: boolean;
}

export {
  AccountMenu,
  type AccountMenuProps,
  type AccountStatus,
  type AccountWorkspace,
} from "@/components/custom/blocks/AccountMenuBlock";

export type ProfileCardVariant = "aurora" | "account-menu";

export interface ProfileCardProps {
  /** Visual style variant. Default `"aurora"`. */
  variant?: ProfileCardVariant;
  name?: string;
  role?: string;
  /** City or place, shown with a pin. Pass `null` to hide it. */
  location?: string | null;
  bio?: string;
  /** Portrait URL. */
  avatar?: string;
  /** Shows a verified badge by the name. Default `true`. */
  verified?: boolean;
  /** Shows the pulsing green online dot on the avatar. Default `true`. */
  active?: boolean;
  /** The status on the cover, as in `"Available"`. Pass `null` to hide it. */
  status?: string | null;
  /** Skill chips; the first three show, the rest open from a "+n" chip. */
  skills?: string[];
  /** Three numbers. The first one counts followers and ticks up on Follow. */
  stats?: ProfileStat[];
  /** Pastel colours for the cover's aurora, three of them. */
  cover?: [string, string, string];
  /** Following at first. Default `false`. */
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  onMessage?: () => void;
  onSaveChange?: (saved: boolean) => void;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const POP = { type: "spring", stiffness: 460, damping: 26 } as const;
const SHOWN_SKILLS = 3;

const DEFAULT_STATS: ProfileStat[] = [
  { label: "Followers", value: 18420 },
  { label: "Projects", value: 64 },
  { label: "Rating", value: 4.9, decimals: 1 },
];

function formatStat(v: number, s: ProfileStat) {
  if (s.compact && Math.abs(v) >= 1000) {
    const k = v / 1000;
    return `${k.toFixed(k >= 100 ? 0 : 1)}k`;
  }
  return v.toLocaleString("en-US", {
    minimumFractionDigits: s.decimals ?? 0,
    maximumFractionDigits: s.decimals ?? 0,
  });
}

function Stat({
  stat,
  value,
  run,
  still,
  delay,
}: {
  stat: ProfileStat;
  value: number;
  run: boolean;
  still: boolean;
  delay: number;
}) {
  const mv = useMotionValue(still ? value : 0);
  const [text, setText] = React.useState(() =>
    formatStat(still ? value : 0, stat),
  );
  useMotionValueEvent(mv, "change", (v) => setText(formatStat(v, stat)));
  const first = React.useRef(true);
  React.useEffect(() => {
    if (!run) return;
    if (still) return mv.set(value);
    const c = animate(mv, value, {
      duration: first.current ? 1.2 : 0.5,
      delay: first.current ? delay : 0,
      ease: EASE,
    });
    first.current = false;
    return () => c.stop();
  }, [value, run, still, delay, mv]);
  return (
    <div className="min-w-0 flex-1 rounded-xl bg-[#242423]/[0.04] px-1.5 py-2.5 text-center dark:bg-white/[0.05]">
      <p className="truncate text-lg font-semibold tabular-nums tracking-tight @max-[18rem]:text-base">
        {text}
      </p>
      <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
        {stat.label}
      </p>
    </div>
  );
}

const SEAL = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 144; i++) {
    const t = (i / 144) * Math.PI * 2;
    const r = 8.7 + 0.8 * Math.cos(12 * t);
    pts.push(
      `${(10 + r * Math.cos(t)).toFixed(2)} ${(10 + r * Math.sin(t)).toFixed(2)}`,
    );
  }
  return `M${pts.join("L")}Z`;
})();

function VerifiedBadge({ shown, still }: { shown: boolean; still: boolean }) {
  return (
    <span
      role="img"
      aria-label="Verified"
      className="inline-grid size-[18px] shrink-0 place-items-center"
    >
      <svg viewBox="0 0 20 20" className="size-full">
        <path d={SEAL} fill="#2563eb" />
        <motion.path
          d="M6.3 10.4 8.8 12.8 13.8 7.8"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={still ? false : { pathLength: 0 }}
          animate={shown ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.35, delay: 0.6, ease: EASE }}
        />
      </svg>
    </span>
  );
}

export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  function ProfileCard(
    {
      variant = "aurora",
      name = "Nadia Karim",
      role = "Product & motion engineer",
      location = "United States",
      bio = "Building expressive interfaces, tactile micro-interactions, and resilient design systems for modern web apps.",
      avatar = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
      verified = true,
      active = true,
      status = "Available",
      skills = [
        "Design Systems",
        "Motion",
        "TypeScript",
        "React",
        "UI Craft",
        "Prototyping",
      ],
      stats = DEFAULT_STATS,
      cover = ["#a5f3fc", "#c4b5fd", "#fbcfe8"],
      defaultFollowing = false,
      onFollowChange,
      onMessage,
      onSaveChange,
      className,
    },
    forwardedRef,
  ) {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as HTMLDivElement,
    );
    const inView = useInView(ref, { once: true, amount: 0.3 });
    const still = !!useReducedMotion();
    const shown = still || inView;
    const uid = React.useId();

    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const sx = useSpring(px, { stiffness: 120, damping: 18 });
    const sy = useSpring(py, { stiffness: 120, damping: 18 });
    const blobX = useTransform(sx, [0, 1], ["10%", "90%"]);
    const blobY = useTransform(sy, [0, 1], ["20%", "80%"]);
    const [hover, setHover] = React.useState(false);
    const onMove = (e: React.PointerEvent) => {
      if (still) return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
      setHover(false);
      px.set(0.5);
      py.set(0.5);
    };

    const [following, setFollowing] = React.useState(defaultFollowing);
    const [saved, setSaved] = React.useState(false);
    const [more, setMore] = React.useState(false);
    const [hoverBtn, setHoverBtn] = React.useState<string | null>(null);

    const follow = () => {
      setFollowing((f) => {
        onFollowChange?.(!f);
        return !f;
      });
    };
    const save = () => {
      setSaved((s) => {
        onSaveChange?.(!s);
        return !s;
      });
    };

    const extra = skills.length - SHOWN_SKILLS;
    const showSkills = more ? skills : skills.slice(0, SHOWN_SKILLS);
    const reveal = (i: number) => ({
      initial: still
        ? false
        : ({ opacity: 0, y: 10, filter: "blur(4px)" } as const),
      animate: shown
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : undefined,
      transition: {
        duration: 0.45,
        delay: still ? 0 : 0.25 + i * 0.07,
        ease: EASE,
      },
    });

    return (
      <motion.div
        ref={ref}
        data-variant={variant}
        initial={still ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={shown ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.6, ease: EASE }}
        onPointerEnter={() => setHover(true)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          "@container relative w-[380px] max-w-full rounded-2xl bg-white p-2 text-[#242423] border border-black/[0.08] shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:bg-zinc-900 dark:text-zinc-100 dark:border-white/[0.1] dark:shadow-[0_0_12px_rgba(0,0,0,0.28)]",
          className,
        )}
      >
        {/* Cover: a pastel aurora that drifts, and flows toward the pointer on hover. */}
        <div className="relative h-32 overflow-hidden rounded-xl bg-[#f3f5f8] dark:bg-zinc-800">
          <motion.span
            aria-hidden
            className="absolute size-56 rounded-full blur-2xl"
            style={{ background: cover[0], left: "-10%", top: "-40%" }}
            animate={
              still ? undefined : { x: [0, 30, -10, 0], y: [0, 20, 10, 0] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute size-52 rounded-full blur-2xl"
            style={{ background: cover[2], right: "-15%", top: "-30%" }}
            animate={
              still ? undefined : { x: [0, -24, 12, 0], y: [0, 16, -8, 0] }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute size-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background: cover[1],
              left: still ? "55%" : blobX,
              top: still ? "60%" : blobY,
            }}
            animate={{
              scale: hover && !still ? 1.15 : 1,
              opacity: hover ? 1 : 0.85,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          />
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }}
          />
          {status && (
            <motion.span
              initial={still ? false : { opacity: 0, y: -6, scale: 0.9 }}
              animate={shown ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ ...POP, delay: still ? 0 : 0.5 }}
              className="absolute right-3 top-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-white/70 px-2.5 text-xs font-medium text-[#242423] backdrop-blur-md dark:bg-zinc-900/60 dark:text-zinc-100"
            >
              <span className="relative grid size-1.5 place-items-center">
                {!still && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#16a36a]"
                    animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                <span className="relative size-1.5 rounded-full bg-[#16a36a]" />
              </span>
              {status}
            </motion.span>
          )}
        </div>

        <div className="px-4 pb-4">
          {/* Avatar, overlapping the cover. */}
          <motion.div
            initial={still ? false : { opacity: 0, scale: 0.6, y: 10 }}
            animate={shown ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ ...POP, delay: still ? 0 : 0.18 }}
            whileHover={still ? undefined : { scale: 1.05, rotate: -3 }}
            className="relative -mt-10 size-20 rounded-full bg-white p-1 dark:bg-zinc-900"
          >
            <img
              src={avatar}
              alt=""
              className="size-full rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
              draggable={false}
            />
            {active && (
              <span className="absolute bottom-1 right-1 grid size-4 place-items-center rounded-full bg-white dark:bg-zinc-900">
                <span className="relative grid size-2.5 place-items-center">
                  {!still && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#16a36a]"
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <span className="relative size-2.5 rounded-full bg-[#16a36a]" />
                </span>
              </span>
            )}
          </motion.div>

          {/* Name, role and bio. */}
          <motion.div {...reveal(0)} className="mt-3 flex items-center gap-1.5">
            <h3 className="truncate text-xl font-semibold tracking-tight">
              {name}
            </h3>
            {verified && <VerifiedBadge shown={shown} still={still} />}
          </motion.div>
          <motion.p
            {...reveal(1)}
            className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <span>{role}</span>
            {location && (
              <span className="inline-flex items-center gap-1 @max-[18rem]:basis-full">
                <span aria-hidden className="@max-[18rem]:hidden">
                  ·
                </span>
                <MapPinIcon
                  className="size-3.5"
                  active={hover}
                  strokeWidth={2.25}
                />
                {location}
              </span>
            )}
          </motion.p>
          <motion.p
            {...reveal(2)}
            className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
          >
            {bio}
          </motion.p>

          {/* Skills: three show, the rest spring open. */}
          <LayoutGroup id={uid}>
            <motion.ul
              {...reveal(3)}
              layout={!still}
              className="mt-3 flex flex-wrap gap-1.5"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {showSkills.map((s) => (
                  <motion.li
                    key={s}
                    layout={!still}
                    initial={still ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      still
                        ? undefined
                        : {
                            opacity: 0,
                            scale: 0.8,
                            transition: { duration: 0.14 },
                          }
                    }
                    transition={POP}
                    className="inline-flex h-7 items-center rounded-full bg-[#242423]/[0.06] px-3 text-xs font-medium dark:bg-white/[0.08]"
                  >
                    {s}
                  </motion.li>
                ))}
                {extra > 0 && (
                  <motion.li key="more" layout={!still} transition={POP}>
                    <button
                      type="button"
                      aria-expanded={more}
                      onClick={() => setMore((m) => !m)}
                      className="inline-flex h-7 items-center rounded-full bg-[#242423]/[0.03] px-3 text-xs font-medium text-zinc-500 outline-none transition-colors hover:bg-[#242423]/[0.07] hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
                    >
                      {more ? "Less" : `+${extra}`}
                    </button>
                  </motion.li>
                )}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>

          {/* Stats. The first one is followers and ticks up on Follow. */}
          <motion.div {...reveal(4)} className="mt-4 flex gap-2">
            {stats.slice(0, 3).map((s, i) => (
              <Stat
                key={s.label}
                stat={s}
                value={
                  i === 0 && following !== defaultFollowing
                    ? s.value + (following ? 1 : -1)
                    : s.value
                }
                run={shown}
                still={still}
                delay={0.45 + i * 0.08}
              />
            ))}
          </motion.div>

          {/* Actions: Follow reuses Avara UI Button; message and save. */}
          <motion.div {...reveal(5)} className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              variant={following ? "secondary" : "default"}
              aria-pressed={following}
              onClick={follow}
              onPointerEnter={() => setHoverBtn("follow")}
              onPointerLeave={() => setHoverBtn(null)}
              className={cn(
                "h-11 flex-1 rounded-full text-sm font-medium transition-all duration-300 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900",
                following
                  ? "bg-[#242423]/[0.06] text-[#242423] hover:bg-[#242423]/[0.1] dark:bg-white/[0.08] dark:text-zinc-100 dark:hover:bg-white/[0.12]"
                  : "bg-[#242423] text-white hover:bg-[#242423]/90 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-100/90",
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={following ? "on" : "off"}
                  initial={
                    still
                      ? false
                      : { opacity: 0, y: 10, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    still
                      ? undefined
                      : { opacity: 0, y: -10, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.2, ease: EASE }}
                  className="inline-flex items-center gap-2"
                >
                  {following ? (
                    <CheckIcon className="size-4" active strokeWidth={2.5} />
                  ) : (
                    <UserPlusIcon
                      className="size-4"
                      active={hoverBtn === "follow"}
                      strokeWidth={2.25}
                    />
                  )}
                  {following ? "Following" : "Follow"}
                </motion.span>
              </AnimatePresence>
            </Button>
            <motion.button
              type="button"
              aria-label={`Message ${name}`}
              onClick={onMessage}
              onPointerEnter={() => setHoverBtn("msg")}
              onPointerLeave={() => setHoverBtn(null)}
              whileTap={still ? undefined : { scale: 0.92 }}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[#242423]/[0.06] outline-none transition-colors hover:bg-[#242423]/[0.1] focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
            >
              <MessageCircleIcon
                className="size-[18px]"
                active={hoverBtn === "msg"}
                strokeWidth={2}
              />
            </motion.button>
            <motion.button
              type="button"
              aria-label={saved ? "Saved" : "Save profile"}
              aria-pressed={saved}
              onClick={save}
              onPointerEnter={() => setHoverBtn("save")}
              onPointerLeave={() => setHoverBtn(null)}
              whileTap={still ? undefined : { scale: 0.92 }}
              className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[#242423]/[0.06] outline-none transition-colors hover:bg-[#242423]/[0.1] focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
            >
              <motion.span
                animate={
                  saved && !still
                    ? { scale: [1, 1.35, 0.92, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.45, ease: EASE }}
                className={cn(saved && "[&_path]:fill-current")}
              >
                <BookmarkIcon
                  className="size-[18px]"
                  active={hoverBtn === "save"}
                  strokeWidth={2}
                />
              </motion.span>
              {saved && !still && (
                <motion.span
                  aria-hidden
                  initial={{ scale: 0.6, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#242423]/25 dark:ring-white/30"
                />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  },
);

export default ProfileCard;
