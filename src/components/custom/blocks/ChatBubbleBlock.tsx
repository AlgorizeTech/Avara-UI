"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Check, CheckCheck } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from "react";

// ==========================================
// CONTEXT & TYPES
// ==========================================
export type ChatVariant = "sent" | "received";
export type ChatLayout =
  | "default"
  | "group-top"
  | "group-middle"
  | "group-bottom";

interface ChatContextValue {
  variant: ChatVariant;
  layout: ChatLayout;
}

const ChatContext = createContext<ChatContextValue | null>(null);

function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("Chat components must be used within a ChatBubble root.");
  }
  return context;
}

// ==========================================
// COMPONENTS
// ==========================================

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ChatVariant;
  layout?: ChatLayout;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    { children, variant = "received", layout = "default", className, ...props },
    ref,
  ) => {
    return (
      <ChatContext.Provider value={{ variant, layout }}>
        <div
          ref={ref}
          className={cn(
            "flex w-full gap-3 py-0.5",
            variant === "sent" ? "justify-end" : "justify-start",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ChatContext.Provider>
    );
  },
);
ChatBubble.displayName = "ChatBubble";

export interface ChatAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
}

export const ChatAvatar = forwardRef<HTMLDivElement, ChatAvatarProps>(
  ({ src, fallback, className, ...props }, ref) => {
    const { variant, layout } = useChat();
    const [imgFailed, setImgFailed] = React.useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // `onError` alone is not enough under SSR: the browser starts loading the
    // server-rendered <img> before React hydrates, so a 404 fires its error event
    // with no handler attached and the initials never appear. Re-check the element
    // on mount — a finished load with zero intrinsic width is a failed load.
    React.useEffect(() => {
      setImgFailed(false);
      const node = imgRef.current;
      if (node?.complete && node.naturalWidth === 0) setImgFailed(true);
    }, [src]);

    // Hide avatar visually if it's in the middle or top of a group to keep alignment clean
    const isHidden = layout === "group-top" || layout === "group-middle";

    return (
      <div
        ref={ref}
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-semibold select-none mt-auto",
          variant === "sent" ? "order-2" : "order-1",
          isHidden ? "invisible" : "visible",
          "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
          className,
        )}
        {...props}
      >
        {src && !imgFailed ? (
          <img
            ref={imgRef}
            src={src}
            alt="Avatar"
            className="w-full h-full object-cover"
            // Without this the initials never appear: a 404 or offline image leaves a
            // broken <img> in place, and `fallback` only rendered when `src` was absent.
            onError={() => setImgFailed(true)}
          />
        ) : (
          fallback
        )}
      </div>
    );
  },
);
ChatAvatar.displayName = "ChatAvatar";

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "default" | "blue" | "indigo" | "rose" | "emerald";
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ children, color = "primary", className, ...props }, ref) => {
    const { variant, layout } = useChat();
    const nodeRef = useRef<HTMLDivElement>(null);

    // Forward ref manually while keeping local ref for GSAP
    React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement);

    // The pop-in is an enhancement, never a prerequisite for being visible. The bubble
    // renders opaque by default and GSAP animates *from* transparent, so a blocked or
    // failed animation leaves a readable message rather than a blank row.
    useEffect(() => {
      if (!nodeRef.current) return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      gsap.fromTo(
        nodeRef.current,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
      );
    }, []);

    // Theming logic for sent messages
    const sentColors: Record<string, string> = {
      primary: "bg-primary text-primary-foreground",
      default: "bg-primary text-primary-foreground",
      blue: "bg-blue-600 text-white",
      indigo: "bg-indigo-600 text-white",
      rose: "bg-rose-600 text-white",
      emerald: "bg-emerald-600 text-white",
    };

    const isSent = variant === "sent";

    // Dynamic border-radius logic based on message grouping
    const getBorderRadius = () => {
      if (layout === "default") return "rounded-2xl";

      if (isSent) {
        if (layout === "group-top") return "rounded-2xl rounded-br-sm";
        if (layout === "group-middle")
          return "rounded-2xl rounded-tr-sm rounded-br-sm";
        if (layout === "group-bottom") return "rounded-2xl rounded-tr-sm";
      } else {
        if (layout === "group-top") return "rounded-2xl rounded-bl-sm";
        if (layout === "group-middle")
          return "rounded-2xl rounded-tl-sm rounded-bl-sm";
        if (layout === "group-bottom") return "rounded-2xl rounded-tl-sm";
      }
      return "rounded-2xl";
    };

    return (
      <div
        className={cn(
          "flex flex-col max-w-[75%]",
          isSent ? "order-1 items-end" : "order-2 items-start",
        )}
      >
        <div
          ref={nodeRef}
          className={cn(
            "px-4 py-2.5 text-[15px] leading-relaxed shadow-sm",
            getBorderRadius(),
            isSent
              ? sentColors[color] || sentColors.default
              : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  },
);
ChatMessage.displayName = "ChatMessage";

export interface ChatTimestampProps
  extends React.HTMLAttributes<HTMLDivElement> {
  time: string;
  status?: "sent" | "delivered" | "read";
}

export const ChatTimestamp = forwardRef<HTMLDivElement, ChatTimestampProps>(
  ({ time, status, className, ...props }, ref) => {
    const { variant } = useChat();
    const isSent = variant === "sent";

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1.5 mt-1 mx-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 select-none",
          isSent ? "justify-end" : "justify-start",
          className,
        )}
        {...props}
      >
        <span>{time}</span>
        {isSent && status && (
          <span className="flex items-center">
            {status === "sent" && <Check className="w-3.5 h-3.5" />}
            {status === "delivered" && <CheckCheck className="w-3.5 h-3.5" />}
            {status === "read" && (
              <CheckCheck className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            )}
          </span>
        )}
      </div>
    );
  },
);
ChatTimestamp.displayName = "ChatTimestamp";

export const ChatTypingIndicator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { variant } = useChat();
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Pop-in animation for the bubble. It animates *from* transparent; the resting state
    // is opaque, so a failed animation still leaves the dots visible.
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
      );
    }

    // Staggered bounce for the dots
    const dots = dotsRef.current.filter(Boolean);
    if (!dots.length) return;
    const bounce = gsap.to(dots, {
      y: -4,
      duration: 0.4,
      stagger: 0.15,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => {
      bounce.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-1 px-4 py-3.5 rounded-2xl w-max shadow-sm",
        // Matches ChatMessage. Without an explicit order the indicator defaults to
        // order-0 and sorts *before* the avatar's order-1, flipping a received row.
        variant === "sent" ? "order-1" : "order-2",
        variant === "sent"
          ? "bg-zinc-900 dark:bg-zinc-100 rounded-br-sm"
          : "bg-zinc-100 dark:bg-zinc-800/80 rounded-bl-sm border border-zinc-200/50 dark:border-zinc-700/50",
        className,
      )}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "sent"
              ? "bg-white/70 dark:bg-black/70"
              : "bg-zinc-400 dark:bg-zinc-500",
          )}
        />
      ))}
    </div>
  );
});
ChatTypingIndicator.displayName = "ChatTypingIndicator";
