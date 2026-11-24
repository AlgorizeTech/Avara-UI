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
  AnimatePresence,
  LayoutGroup,
  motion,
  type Transition,
  useAnimation,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

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
      transition: { duration: 0.3, opacity: { duration: 0.1 } },
    },
    animate: {
      opacity: [0, 1],
      pathLength: [0, 1],
      scale: [0.5, 1],
      transition: { duration: 0.4, opacity: { duration: 0.1 } },
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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

// Animated icon: chevron-down
const ChevronDownIcon = (() => {
  interface ChevronDownIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface ChevronDownIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const DEFAULT_TRANSITION: Transition = {
    times: [0, 0.4, 1],
    duration: 0.5,
  };

  const ChevronDownIcon = forwardRef<
    ChevronDownIconHandle,
    ChevronDownIconProps
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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
              d="m6 9 6 6 6-6"
              transition={DEFAULT_TRANSITION}
              variants={{
                normal: { y: 0 },
                animate: { y: [0, 2, 0] },
              }}
            />
          </svg>
        </span>
      );
    },
  );

  ChevronDownIcon.displayName = "ChevronDownIcon";
  return ChevronDownIcon;
})();

// Animated icon: logout
const LogoutIcon = (() => {
  interface LogoutIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface LogoutIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const PATH_VARIANTS: Variants = {
    animate: {
      x: 2,
      translateX: [0, -3, 0],
      transition: { duration: 0.4 },
    },
  };

  const LogoutIcon = forwardRef<LogoutIconHandle, LogoutIconProps>(
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <motion.polyline
              animate={controls}
              points="16 17 21 12 16 7"
              variants={PATH_VARIANTS}
            />
            <motion.line
              animate={controls}
              variants={PATH_VARIANTS}
              x1="21"
              x2="9"
              y1="12"
              y2="12"
            />
          </svg>
        </span>
      );
    },
  );

  LogoutIcon.displayName = "LogoutIcon";
  return LogoutIcon;
})();

// Animated icon: plus
const PlusIcon = (() => {
  interface PlusIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface PlusIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const PlusIcon = forwardRef<PlusIconHandle, PlusIconProps>(
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            variants={{
              normal: { rotate: 0 },
              animate: { rotate: 180 },
            }}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </motion.svg>
        </span>
      );
    },
  );

  PlusIcon.displayName = "PlusIcon";
  return PlusIcon;
})();

// Animated icon: settings
const SettingsIcon = (() => {
  interface SettingsIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface SettingsIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const SettingsIcon = forwardRef<SettingsIconHandle, SettingsIconProps>(
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            variants={{
              normal: { rotate: 0 },
              animate: { rotate: 180 },
            }}
            viewBox="0 0 24 24"
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </motion.svg>
        </span>
      );
    },
  );

  SettingsIcon.displayName = "SettingsIcon";
  return SettingsIcon;
})();

// Animated icon: sparkles
const SparklesIcon = (() => {
  interface SparklesIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface SparklesIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const SPARKLE_VARIANTS: Variants = {
    initial: { y: 0, fill: "none" },
    hover: {
      y: [0, -1, 0, 0],
      fill: "currentColor",
      transition: { duration: 1, bounce: 0.3 },
    },
  };

  const STAR_VARIANTS: Variants = {
    initial: { opacity: 1, x: 0, y: 0 },
    blink: () => ({
      opacity: [0, 1, 0, 0, 0, 0, 1],
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 70,
        damping: 10,
        mass: 0.4,
      },
    }),
  };

  const SparklesIcon = forwardRef<SparklesIconHandle, SparklesIconProps>(
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
      const starControls = useAnimation();
      const sparkleControls = useAnimation();
      const isControlledRef = useRef(false);

      useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
          startAnimation: () => {
            sparkleControls.start("hover");
            starControls.start("blink", { delay: 1 });
          },
          stopAnimation: () => {
            sparkleControls.start("initial");
            starControls.start("initial");
          },
        };
      });

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseEnter?.(e);
          else {
            sparkleControls.start("hover");
            starControls.start("blink", { delay: 1 });
          }
        },
        [onMouseEnter, sparkleControls, starControls],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else {
            sparkleControls.start("initial");
            starControls.start("initial");
          }
        },
        [sparkleControls, starControls, onMouseLeave],
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
              animate={sparkleControls}
              d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
              variants={SPARKLE_VARIANTS}
            />
            <motion.path
              animate={starControls}
              d="M20 3v4"
              variants={STAR_VARIANTS}
            />
            <motion.path
              animate={starControls}
              d="M22 5h-4"
              variants={STAR_VARIANTS}
            />
            <motion.path
              animate={starControls}
              d="M4 17v2"
              variants={STAR_VARIANTS}
            />
            <motion.path
              animate={starControls}
              d="M5 18H3"
              variants={STAR_VARIANTS}
            />
          </svg>
        </span>
      );
    },
  );

  SparklesIcon.displayName = "SparklesIcon";
  return SparklesIcon;
})();

// Animated icon: user
const UserIcon = (() => {
  interface UserIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface UserIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const PATH_VARIANT: Variants = {
    normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
    animate: {
      pathLength: [0, 1],
      opacity: [0, 1],
      pathOffset: [1, 0],
    },
  };

  const CIRCLE_VARIANT: Variants = {
    normal: { pathLength: 1, pathOffset: 0, scale: 1 },
    animate: {
      pathLength: [0, 1],
      pathOffset: [1, 0],
      scale: [0.5, 1],
    },
  };

  const UserIcon = forwardRef<UserIconHandle, UserIconProps>(
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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
            <motion.circle
              animate={controls}
              cx="12"
              cy="8"
              r="5"
              variants={CIRCLE_VARIANT}
            />
            <motion.path
              animate={controls}
              d="M20 21a8 8 0 0 0-16 0"
              transition={{ delay: 0.2, duration: 0.4 }}
              variants={PATH_VARIANT}
            />
          </svg>
        </span>
      );
    },
  );

  UserIcon.displayName = "UserIcon";
  return UserIcon;
})();

// Animated icon: zap
const ZapIcon = (() => {
  interface ZapHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
  }

  interface ZapProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
    active?: boolean;
    strokeWidth?: number | string;
  }

  const PATH_VARIANTS: Variants = {
    normal: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 0.6, opacity: { duration: 0.1 } },
    },
    animate: {
      opacity: [0, 1],
      pathLength: [0, 1],
      transition: { duration: 0.6, opacity: { duration: 0.1 } },
    },
  };

  const ZapIcon = forwardRef<ZapHandle, ZapProps>(
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
          if (isControlledRef.current) onMouseEnter?.(e);
          else controls.start("animate");
        },
        [controls, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>) => {
          if (isControlledRef.current) onMouseLeave?.(e);
          else controls.start("normal");
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
              d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
              variants={PATH_VARIANTS}
            />
          </svg>
        </span>
      );
    },
  );

  ZapIcon.displayName = "ZapIcon";
  return ZapIcon;
})();

export type AccountStatus = "online" | "focus" | "away" | "hidden";

export interface AccountWorkspace {
  id: string;
  name: string;
  /** A short line under the name, like the plan. */
  plan: string;
  /** Background of the workspace's letter tile. */
  color?: string;
}

export interface AccountMenuProps {
  name?: string;
  /** A short line under the name, like a handle. */
  handle?: string;
  avatar?: string;
  /** Controls whether the expanded account modal starts open. Default `true`. */
  showModal?: boolean;
  /** Controls whether the storage meter is shown. Default `false`. */
  showStorage?: boolean;
  defaultStatus?: AccountStatus;
  onStatusChange?: (status: AccountStatus) => void;
  workspaces?: AccountWorkspace[];
  defaultWorkspace?: string;
  onWorkspaceChange?: (id: string) => void;
  /** Used and total storage in GB. Default `[6.4, 10]`. */
  storage?: [number, number] | null;
  onUpgrade?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onShortcuts?: () => void;
  onNewWorkspace?: () => void;
  onSignOut?: () => void;
  className?: string;
}

const STATUS: Record<
  AccountStatus,
  { label: string; line: string; color: string }
> = {
  online: { label: "Online", line: "Available", color: "#269a5a" },
  focus: { label: "Focus", line: "Notifications paused", color: "#5b5bff" },
  away: { label: "Away", line: "Back soon", color: "#e8a317" },
  hidden: { label: "Hidden", line: "Appears offline", color: "#a1a19b" },
};
const ORDER: AccountStatus[] = ["online", "focus", "away", "hidden"];

const DEFAULT_WORKSPACES: AccountWorkspace[] = [
  {
    id: "avara",
    name: "Avara Studio",
    plan: "Pro plan, 12 members",
    color: "#242423",
  },
  {
    id: "acme",
    name: "Acme Labs",
    plan: "Free plan, 3 members",
    color: "#8a8a85",
  },
];

const GLIDE = [0.22, 1, 0.36, 1] as const;
const POP: Transition = { type: "spring", stiffness: 520, damping: 30 };
const MORPH: Transition = { type: "spring", stiffness: 340, damping: 32 };
const PILL: Transition = { type: "spring", stiffness: 500, damping: 38 };

const CARD: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
};
const ITEM: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: GLIDE },
  },
};

function Roll({
  value,
  still,
  className,
}: {
  value: string;
  still: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-grid overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="truncate"
          initial={
            still
              ? { opacity: 0 }
              : { opacity: 0, y: "90%", filter: "blur(3px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={
            still
              ? { opacity: 0 }
              : { opacity: 0, y: "-90%", filter: "blur(3px)" }
          }
          transition={{ duration: 0.3, ease: GLIDE }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Avatar({
  src,
  status,
  size,
  layoutId,
  still,
}: {
  src: string;
  status: AccountStatus;
  size: number;
  layoutId: string;
  still: boolean;
}) {
  const color = STATUS[status].color;
  const dot = Math.round(size * 0.3);
  return (
    <motion.span
      layoutId={layoutId}
      transition={still ? { duration: 0 } : MORPH}
      className="relative block shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="size-full rounded-full object-cover"
      />
      <span
        className="absolute -bottom-px -right-px grid place-items-center"
        style={{ width: dot, height: dot }}
      >
        <AnimatePresence initial={false}>
          {!still && (
            <motion.span
              key={status}
              aria-hidden
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 0.7, ease: GLIDE }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </AnimatePresence>
        <motion.span
          key={`dot-${status}`}
          initial={still ? false : { scale: 0.4 }}
          animate={{ scale: 1, backgroundColor: color }}
          transition={POP}
          className="relative size-full rounded-full ring-2 ring-white dark:ring-zinc-900"
        />
      </span>
    </motion.span>
  );
}

export const AccountMenu = React.forwardRef<HTMLDivElement, AccountMenuProps>(
  function AccountMenu(
    {
      name = "John Doe",
      handle = "@johndoe",
      avatar = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,h_200,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
      showModal = true,
      showStorage = false,
      defaultStatus = "online",
      onStatusChange,
      workspaces = DEFAULT_WORKSPACES,
      defaultWorkspace,
      onWorkspaceChange,
      storage = [6.4, 10],
      onUpgrade,
      onProfile,
      onSettings,
      onShortcuts,
      onNewWorkspace,
      onSignOut,
      className,
    },
    ref,
  ) {
    const still = !!useReducedMotion();
    const id = React.useId();
    const root = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => root.current!);
    const pill = React.useRef<HTMLButtonElement>(null);
    const card = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(showModal);
    const [status, setStatus] = React.useState<AccountStatus>(defaultStatus);
    const [space, setSpace] = React.useState(
      defaultWorkspace ?? workspaces[0]?.id ?? "",
    );
    const [hover, setHover] = React.useState<string | null>(null);
    const [leaving, setLeaving] = React.useState<"ask" | "done" | null>(null);
    const byKeyboard = React.useRef(false);

    React.useEffect(() => {
      setOpen(showModal);
    }, [showModal]);

    const close = React.useCallback(() => {
      setOpen(false);
      setHover(null);
      setLeaving(null);
      requestAnimationFrame(() => pill.current?.focus({ preventScroll: true }));
    }, []);

    React.useEffect(() => {
      if (!open || !byKeyboard.current) return;
      byKeyboard.current = false;
      const t = window.setTimeout(
        () =>
          card.current
            ?.querySelector<HTMLElement>("[role=radio][aria-checked=true]")
            ?.focus(),
        still ? 0 : 260,
      );
      return () => window.clearTimeout(t);
    }, [open, still]);

    React.useEffect(() => {
      if (leaving !== "ask") return;
      const t = window.setTimeout(() => setLeaving(null), 2600);
      return () => window.clearTimeout(t);
    }, [leaving]);

    const signOut = () => {
      if (leaving === null) return setLeaving("ask");
      if (leaving === "done") return;
      setLeaving("done");
      onSignOut?.();
      window.setTimeout(close, still ? 400 : 1100);
    };

    const onKey = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const items = Array.from(
        card.current?.querySelectorAll<HTMLElement>("[data-item]") ?? [],
      );
      if (!items.length) return;
      e.preventDefault();
      const at = items.indexOf(document.activeElement as HTMLElement);
      const next =
        e.key === "ArrowDown"
          ? (at + 1) % items.length
          : (at - 1 + items.length) % items.length;
      items[at < 0 ? 0 : next]?.focus();
    };

    const glide = (key: string) =>
      hover === key && (
        <motion.span
          layoutId={`${id}-glide`}
          transition={still ? { duration: 0 } : PILL}
          className="absolute inset-0 rounded-xl bg-[#242423]/[0.05] dark:bg-white/[0.08]"
        />
      );

    const tiles = [
      { key: "profile", label: "Profile", Icon: UserIcon, on: onProfile },
      {
        key: "settings",
        label: "Settings",
        Icon: SettingsIcon,
        on: onSettings,
      },
      {
        key: "shortcuts",
        label: "Shortcuts",
        Icon: ZapIcon,
        on: onShortcuts,
        kbd: "?",
      },
    ];

    const used = storage ? Math.min(1, storage[0] / storage[1]) : 0;

    return (
      <div
        ref={root}
        onKeyDown={onKey}
        className={cn("relative w-[380px] max-w-full", className)}
      >
        <div className="flex justify-center">
          <LayoutGroup id={id}>
            <motion.div
              layout
              transition={still ? { duration: 0 } : MORPH}
              className={cn(
                "overflow-hidden bg-white text-[#242423] border border-black/[0.08] shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:bg-zinc-900 dark:text-zinc-100 dark:border-white/[0.1] dark:shadow-[0_0_12px_rgba(0,0,0,0.28)]",
                open ? "w-full rounded-2xl" : "w-auto rounded-full",
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {!open ? (
                  <motion.button
                    key="pill"
                    ref={pill}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={false}
                    onClick={(e) => {
                      byKeyboard.current = e.detail === 0;
                      setOpen(true);
                    }}
                    initial={
                      still
                        ? { opacity: 0 }
                        : { opacity: 0, filter: "blur(4px)" }
                    }
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    whileHover={still ? undefined : { scale: 1.02 }}
                    whileTap={still ? undefined : { scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="group flex h-12 cursor-pointer items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 outline-none focus-visible:ring-2 focus-visible:ring-[#242423]/30 dark:focus-visible:ring-white/30"
                  >
                    <Avatar
                      src={avatar}
                      status={status}
                      size={36}
                      layoutId={`${id}-avatar`}
                      still={still}
                    />
                    <motion.span
                      layoutId={`${id}-name`}
                      transition={still ? { duration: 0 } : MORPH}
                      className="text-[14px] font-semibold"
                    >
                      {name}
                    </motion.span>
                    <span className="grid text-[#242423]/45 transition-transform duration-300 group-hover:translate-y-px dark:text-zinc-400">
                      <ChevronDownIcon className="size-4" strokeWidth={2.25} />
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="card"
                    ref={card}
                    role="menu"
                    aria-label={`${name} account`}
                    variants={still ? undefined : CARD}
                    initial="hidden"
                    animate="shown"
                    exit={{
                      opacity: 0,
                      filter: "blur(4px)",
                      transition: { duration: 0.15 },
                    }}
                    onPointerLeave={() => setHover(null)}
                    className="w-full p-2"
                  >
                    {/* Header band */}
                    <div className="rounded-xl bg-[#f1f1ef] p-3 dark:bg-zinc-800/80">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={avatar}
                          status={status}
                          size={48}
                          layoutId={`${id}-avatar`}
                          still={still}
                        />
                        <div className="min-w-0 flex-1">
                          <motion.p
                            layoutId={`${id}-name`}
                            transition={still ? { duration: 0 } : MORPH}
                            className="w-fit truncate text-[16px] font-semibold leading-6"
                          >
                            {name}
                          </motion.p>
                          <motion.p
                            variants={ITEM}
                            className="flex items-center gap-1.5 text-[12px] leading-4 text-[#242423]/55 dark:text-zinc-400"
                          >
                            <span className="truncate">{handle}</span>
                            <span aria-hidden>·</span>
                            <Roll value={STATUS[status].line} still={still} />
                          </motion.p>
                        </div>
                        <motion.button
                          variants={ITEM}
                          type="button"
                          aria-label="Collapse menu"
                          onClick={close}
                          whileTap={still ? undefined : { scale: 0.88 }}
                          className="group grid size-8 shrink-0 cursor-pointer place-items-center self-start rounded-full text-[#242423]/50 outline-none transition-colors hover:bg-white hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-[#242423]/30 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                        >
                          <span className="grid rotate-180">
                            <ChevronDownIcon
                              className="size-4"
                              strokeWidth={2.25}
                            />
                          </span>
                        </motion.button>
                      </div>

                      {/* Status picker */}
                      <motion.div
                        variants={ITEM}
                        role="radiogroup"
                        aria-label="Status"
                        className="mt-3 grid grid-cols-4 rounded-full bg-[#242423]/[0.05] p-0.5 dark:bg-black/25"
                      >
                        {ORDER.map((s) => {
                          const on = status === s;
                          return (
                            <motion.button
                              key={s}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              data-item=""
                              onClick={() => {
                                setStatus(s);
                                onStatusChange?.(s);
                              }}
                              whileTap={still ? undefined : { scale: 0.92 }}
                              className={cn(
                                "relative flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full text-[12px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#242423]/30",
                                on
                                  ? "text-[#242423] dark:text-zinc-100"
                                  : "text-[#242423]/55 hover:text-[#242423] dark:text-zinc-400 dark:hover:text-zinc-200",
                              )}
                            >
                              {on && (
                                <motion.span
                                  layoutId={`${id}-status`}
                                  transition={still ? { duration: 0 } : PILL}
                                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:bg-zinc-700"
                                />
                              )}
                              <motion.span
                                animate={{ scale: on ? 1.25 : 1 }}
                                transition={POP}
                                className="relative size-1.5 rounded-full"
                                style={{ backgroundColor: STATUS[s].color }}
                              />
                              <span className="relative">
                                {STATUS[s].label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    </div>

                    {/* Quick tiles */}
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {tiles.map(({ key, label, Icon, on, kbd }) => (
                        <motion.button
                          key={key}
                          variants={ITEM}
                          type="button"
                          role="menuitem"
                          data-item=""
                          onClick={on}
                          whileHover={still ? undefined : { y: -3 }}
                          whileTap={still ? undefined : { scale: 0.94 }}
                          transition={POP}
                          className="group relative flex h-[76px] cursor-pointer flex-col justify-between rounded-xl bg-[#242423]/[0.04] p-3 text-left outline-none transition-colors duration-200 hover:bg-[#242423]/[0.07] focus-visible:ring-2 focus-visible:ring-[#242423]/30 dark:bg-white/[0.05] dark:hover:bg-white/[0.09]"
                        >
                          <span className="flex items-start justify-between">
                            <Icon className="size-[18px] text-[#242423]/70 transition-colors group-hover:text-[#242423] dark:text-zinc-300 dark:group-hover:text-white" />
                            {kbd && (
                              <span className="grid h-5 min-w-5 place-items-center rounded-md bg-white px-1 text-[12px] font-medium text-[#242423]/50 shadow-[0_1px_0_rgba(36,36,35,0.08)] dark:bg-zinc-800 dark:text-zinc-400">
                                {kbd}
                              </span>
                            )}
                          </span>
                          <span className="text-[12px] font-medium">
                            {label}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Workspaces */}
                    <motion.p
                      variants={ITEM}
                      className="px-3 pb-1 pt-3 text-[12px] font-medium text-[#242423]/45 dark:text-zinc-400"
                    >
                      Workspaces
                    </motion.p>
                    {workspaces.map((w) => {
                      const on = w.id === space;
                      const key = `ws-${w.id}`;
                      return (
                        <motion.button
                          key={w.id}
                          variants={ITEM}
                          type="button"
                          role="menuitemradio"
                          aria-checked={on}
                          data-item=""
                          onPointerEnter={() => setHover(key)}
                          onFocus={() => setHover(key)}
                          onClick={() => {
                            setSpace(w.id);
                            onWorkspaceChange?.(w.id);
                          }}
                          whileTap={still ? undefined : { scale: 0.98 }}
                          className="group relative flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#242423]/30"
                        >
                          {glide(key)}
                          <motion.span
                            animate={{
                              rotate: hover === key && !still ? -6 : 0,
                              scale: hover === key && !still ? 1.06 : 1,
                            }}
                            transition={POP}
                            className="relative grid size-8 shrink-0 place-items-center rounded-lg text-[14px] font-semibold text-white"
                            style={{ backgroundColor: w.color ?? "#242423" }}
                          >
                            {w.name[0]}
                          </motion.span>
                          <span className="relative min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-medium leading-5">
                              {w.name}
                            </span>
                            <span className="block truncate text-[12px] leading-4 text-[#242423]/50 dark:text-zinc-400">
                              {w.plan}
                            </span>
                          </span>
                          <span className="relative grid size-5 place-items-center">
                            {on && (
                              <motion.span
                                layoutId={`${id}-ws-check`}
                                transition={still ? { duration: 0 } : POP}
                                className="grid size-5 place-items-center rounded-full bg-[#242423] text-white dark:bg-zinc-100 dark:text-zinc-900"
                              >
                                <CheckIcon
                                  className="size-3"
                                  strokeWidth={2.75}
                                  active
                                />
                              </motion.span>
                            )}
                          </span>
                        </motion.button>
                      );
                    })}
                    <motion.button
                      variants={ITEM}
                      type="button"
                      role="menuitem"
                      data-item=""
                      onPointerEnter={() => setHover("new")}
                      onFocus={() => setHover("new")}
                      onClick={onNewWorkspace}
                      whileTap={still ? undefined : { scale: 0.98 }}
                      className="group relative flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left text-[14px] font-medium text-[#242423]/70 outline-none hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-[#242423]/30 dark:text-zinc-300 dark:hover:text-white"
                    >
                      {glide("new")}
                      <span className="relative grid size-8 place-items-center rounded-lg border border-dashed border-[#242423]/25 transition-colors group-hover:border-[#242423]/50 dark:border-white/20 dark:group-hover:border-white/40">
                        <PlusIcon className="size-4" strokeWidth={2.25} />
                      </span>
                      <span className="relative">New workspace</span>
                    </motion.button>

                    {/* Storage */}
                    {showStorage && storage && (
                      <motion.div
                        variants={ITEM}
                        className="mx-1 mt-2 rounded-xl bg-[#242423]/[0.04] p-3 dark:bg-white/[0.05]"
                      >
                        <div className="flex items-baseline justify-between text-[12px]">
                          <span className="font-medium">Storage</span>
                          <span className="tabular-nums text-[#242423]/55 dark:text-zinc-400">
                            {storage[0]} of {storage[1]} GB
                          </span>
                        </div>
                        <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-[#242423]/[0.08] dark:bg-white/[0.1]">
                          <motion.div
                            initial={still ? false : { width: 0 }}
                            animate={{ width: `${used * 100}%` }}
                            transition={
                              still
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20,
                                    delay: 0.35,
                                  }
                            }
                            className="relative h-full overflow-hidden rounded-full bg-[#242423] dark:bg-zinc-100"
                          >
                            {!still && (
                              <motion.span
                                aria-hidden
                                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                initial={{ x: "-150%" }}
                                animate={{ x: "600%" }}
                                transition={{
                                  duration: 1.4,
                                  delay: 0.9,
                                  ease: "easeInOut",
                                  repeat: Infinity,
                                  repeatDelay: 2.6,
                                }}
                              />
                            )}
                          </motion.div>
                        </div>
                        <button
                          type="button"
                          data-item=""
                          onClick={onUpgrade}
                          className="group mt-2.5 flex cursor-pointer items-center gap-1.5 rounded-full text-[12px] font-medium text-[#242423]/70 outline-none transition-colors hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-[#242423]/30 dark:text-zinc-300 dark:hover:text-white"
                        >
                          <SparklesIcon className="size-3.5" />
                          Upgrade for 100 GB
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                          </span>
                        </button>
                      </motion.div>
                    )}

                    {/* Log out, asked twice */}
                    <motion.div
                      variants={ITEM}
                      aria-hidden
                      className="mx-1 my-2 h-px bg-[#242423]/[0.07] dark:bg-white/[0.08]"
                    />
                    <motion.button
                      variants={ITEM}
                      type="button"
                      role="menuitem"
                      data-item=""
                      onPointerEnter={() => setHover("out")}
                      onFocus={() => setHover("out")}
                      onClick={signOut}
                      whileTap={still ? undefined : { scale: 0.98 }}
                      className={cn(
                        "group relative flex h-11 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 text-left text-[14px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#242423]/30",
                        leaving
                          ? "text-[#d64545]"
                          : "text-[#242423] dark:text-zinc-100",
                      )}
                    >
                      {!leaving && glide("out")}
                      <AnimatePresence>
                        {leaving && (
                          <motion.span
                            key="wash"
                            aria-hidden
                            initial={{
                              scaleX: leaving === "done" ? 1 : 0,
                              opacity: 1,
                            }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={
                              leaving === "ask" && !still
                                ? { duration: 2.6, ease: "linear" }
                                : { duration: 0.2 }
                            }
                            style={{ transformOrigin: "0% 50%" }}
                            className="absolute inset-0 rounded-xl bg-[#d64545]/[0.09]"
                          />
                        )}
                      </AnimatePresence>
                      <span className="relative grid">
                        {leaving === "done" ? (
                          <CheckIcon
                            className="size-[18px]"
                            strokeWidth={2.5}
                            active
                          />
                        ) : (
                          <LogoutIcon
                            className="size-[18px]"
                            active={hover === "out" || leaving === "ask"}
                          />
                        )}
                      </span>
                      <Roll
                        value={
                          leaving === "done"
                            ? "Signed out"
                            : leaving === "ask"
                              ? "Click again to log out"
                              : "Log out"
                        }
                        still={still}
                        className="relative"
                      />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
        <span role="status" aria-live="polite" className="sr-only">
          {leaving === "done"
            ? "Signed out."
            : `Status: ${STATUS[status].label}.`}
        </span>
      </div>
    );
  },
);

export default AccountMenu;
