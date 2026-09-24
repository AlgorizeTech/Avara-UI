"use client";

import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useContext,
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
// MOTION
// ==========================================
// Plain CSS, shipped inline by every ChatBubble row so the block stays
// self-contained. The pop-ins are GSAP's back.out(1.7) / back.out(1.5) — cubics,
// so the cubic-beziers are exact. The typing dots are one 0.7s staggered
// rise (0.4s each, 0.15s apart) played forward then back, forever, every move
// on sine.inOut. All of it is skipped under prefers-reduced-motion; the
// resting state is fully visible, so a skipped animation leaves nothing hidden.
const SINE_IN_OUT =
  "linear(0, 0.0024, 0.0096, 0.0215, 0.0381, 0.059, 0.0843, 0.1135, 0.1464, 0.1828, 0.2222, 0.2643, 0.3087, 0.3549, 0.4025, 0.451, 0.5, 0.549, 0.5975, 0.6451, 0.6913, 0.7357, 0.7778, 0.8172, 0.8536, 0.8865, 0.9157, 0.941, 0.9619, 0.9785, 0.9904, 0.9976, 1)";

const KEYFRAMES = `
@keyframes chat-bubble-message-in {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0px) scale(1); }
}
@keyframes chat-bubble-typing-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes chat-bubble-dot-0 {
  0% { transform: translateY(0px); }
  28.5714% { transform: translateY(-4px); }
  71.4286% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
}
@keyframes chat-bubble-dot-1 {
  0%, 10.7143% { transform: translateY(0px); }
  39.2857% { transform: translateY(-4px); }
  60.7143% { transform: translateY(-4px); }
  89.2857%, 100% { transform: translateY(0px); }
}
@keyframes chat-bubble-dot-2 {
  0%, 21.4286% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  78.5714%, 100% { transform: translateY(0px); }
}
@media (prefers-reduced-motion: no-preference) {
  .chat-bubble-message { animation: chat-bubble-message-in 0.4s cubic-bezier(0.3333, 1.5667, 0.6667, 1) backwards; }
  .chat-bubble-typing { animation: chat-bubble-typing-in 0.3s cubic-bezier(0.3333, 1.5, 0.6667, 1) backwards; }
  .chat-bubble-dot { animation: 1.4s ${SINE_IN_OUT} infinite; }
  .chat-bubble-dot:nth-child(1) { animation-name: chat-bubble-dot-0; }
  .chat-bubble-dot:nth-child(2) { animation-name: chat-bubble-dot-1; }
  .chat-bubble-dot:nth-child(3) { animation-name: chat-bubble-dot-2; }
}`;

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
          <style>{KEYFRAMES}</style>
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
      // A broken <img> that finished loading before hydration fires no error event, so the element has to be inspected on mount.
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
          "bg-muted text-muted-foreground",
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

    // Forward ref manually while keeping a local ref
    React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement);

    // The pop-in (`chat-bubble-message`) is an enhancement, never a prerequisite
    // for being visible. The bubble renders opaque by default and the keyframes
    // animate *from* transparent, so a blocked or skipped animation leaves a
    // readable message rather than a blank row.

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
            "chat-bubble-message px-4 py-2.5 text-[15px] leading-relaxed shadow-sm",
            getBorderRadius(),
            isSent
              ? sentColors[color] || sentColors["default"]
              : "bg-muted text-foreground border border-border/50",
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
          "flex items-center gap-1.5 mt-1 mx-1 text-[11px] font-medium text-muted-foreground select-none",
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

  // Pop-in (`chat-bubble-typing`) and the staggered dot bounce
  // (`chat-bubble-dot`) are CSS. The bubble animates *from* transparent; the
  // resting state is opaque, so a skipped animation still leaves the dots visible.
  return (
    <div
      ref={ref}
      className={cn(
        "chat-bubble-typing flex items-center gap-1 px-4 py-3.5 rounded-2xl w-max shadow-sm",
        // Matches ChatMessage. Without an explicit order the indicator defaults to
        // order-0 and sorts *before* the avatar's order-1, flipping a received row.
        variant === "sent" ? "order-1" : "order-2",
        variant === "sent"
          ? "bg-primary rounded-br-sm"
          : "bg-muted rounded-bl-sm border border-border/50",
        className,
      )}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "chat-bubble-dot w-1.5 h-1.5 rounded-full",
            variant === "sent"
              ? "bg-primary-foreground/70"
              : "bg-muted-foreground",
          )}
        />
      ))}
    </div>
  );
});
ChatTypingIndicator.displayName = "ChatTypingIndicator";
