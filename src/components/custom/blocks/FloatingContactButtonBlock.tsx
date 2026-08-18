"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  CheckCheck,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: string;
}

export interface FloatingContactButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "bottom-right" | "bottom-left";
  containerMode?: "fixed" | "absolute";
  title?: string;
  subtitle?: string;
  avatarUrl?: string;
  defaultOpen?: boolean;
  localStorageKey?: string;
  defaultAccentColor?: string;
  initialMessages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
}

function resolveColor(c: string): string {
  if (!c || c === "primary" || c === "default") return "var(--primary)";
  if (
    c.startsWith("#") ||
    c.startsWith("rgb") ||
    c.startsWith("hsl") ||
    c.startsWith("var(")
  )
    return c;
  const colorMap: Record<string, string> = {
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    zinc: "#18181b",
    amber: "#f59e0b",
    violet: "#8b5cf6",
    cyan: "#06b6d4",
    blue: "#3b82f6",
  };
  return colorMap[c] || "var(--primary)";
}

function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(99, 102, 241, ${alpha})`;
  const resolved = resolveColor(hex);
  if (resolved.startsWith("var("))
    return `color-mix(in srgb, ${resolved} ${alpha * 100}%, transparent)`;
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(resolved)) {
    c = resolved.substring(1).split("");
    if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    c = "0x" + c.join("");
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${alpha})`;
  }
  return resolved;
}

export const FloatingContactButtonBlock = React.forwardRef<
  HTMLDivElement,
  FloatingContactButtonProps
>(
  (
    {
      position = "bottom-right",
      containerMode = "fixed",
      title = "Chat with us",
      subtitle = "We typically reply in a few minutes",
      avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
      defaultOpen = false,
      localStorageKey = "primaryColor",
      defaultAccentColor = "var(--primary)",
      initialMessages = [
        {
          id: "1",
          text: "Hi there! 👋 How can we help you build something amazing today?",
          sender: "agent",
          timestamp: "Just now",
        },
      ],
      onSendMessage,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [accentColor, setAccentColor] = useState<string>(defaultAccentColor);

    // Sandboxed scroll ref: Replaces scrollIntoView to prevent page jumps
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;

      const loadColor = () => {
        let foundColor: string | null = null;
        const knownKeys = [
          localStorageKey,
          "primaryColor",
          "docs-theme-color",
          "theme-color",
          "accentColor",
          "color",
        ];

        for (const k of knownKeys) {
          if (!k) continue;
          try {
            const val = localStorage.getItem(k);
            if (val) {
              const cleaned = val.replace(/['"]/g, "").trim();
              const hexMatch = cleaned.match(
                /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/,
              );
              if (hexMatch) {
                foundColor = hexMatch[0];
                break;
              }
            }
          } catch {}
        }

        const targetColor = foundColor || defaultAccentColor;
        setAccentColor((prev) => (prev !== targetColor ? targetColor : prev));
      };

      loadColor();

      const origProtoSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        origProtoSetItem.apply(this, [key, value]);
        loadColor();
      };
      const origInstanceSetItem = window.localStorage.setItem;
      window.localStorage.setItem = function (key: string, value: string) {
        origInstanceSetItem.apply(window.localStorage, [key, value]);
        loadColor();
      };

      window.addEventListener("storage", loadColor);
      const intervalId = setInterval(loadColor, 100);

      return () => {
        Storage.prototype.setItem = origProtoSetItem;
        window.localStorage.setItem = origInstanceSetItem;
        window.removeEventListener("storage", loadColor);
        clearInterval(intervalId);
      };
    }, [localStorageKey, defaultAccentColor]);

    // Sandboxed scrolling: Only scrolls inside the chat modal container
    useEffect(() => {
      if (isOpen && scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        el.scrollTo({
          top: el.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages, isOpen, isTyping]);

    const handleSend = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!inputValue.trim()) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      if (onSendMessage) onSendMessage(userMsg.text);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Thanks for reaching out! A member of our engineering team will review your message and reply shortly.",
            sender: "agent",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 1200);
    };

    const positionClasses =
      position === "bottom-right"
        ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
        : "bottom-4 left-4 sm:bottom-6 sm:left-6";

    const modalAlignmentClasses =
      position === "bottom-right"
        ? "right-0 origin-bottom-right"
        : "left-0 origin-bottom-left";

    const modalWidthClass =
      containerMode === "fixed"
        ? "w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px]"
        : "w-[380px]";

    const modalHeightClass =
      containerMode === "fixed"
        ? "h-[400px] sm:h-[480px] max-h-[calc(100vh-6rem)]"
        : "h-[480px]";

    const activeBgGlow = hexToRgba(accentColor, 0.25);

    // Auto-scale: shrink the entire widget when its parent container is narrow
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [autoScale, setAutoScale] = useState(1);

    useEffect(() => {
      if (containerMode !== "absolute") return;
      const el = wrapperRef.current;
      if (!el) return;
      const parent = el.offsetParent as HTMLElement | null;
      if (!parent) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          // Start scaling when container is narrower than 460px
          setAutoScale(Math.min(1, Math.max(0.5, w / 460)));
        }
      });
      observer.observe(parent);
      return () => observer.disconnect();
    }, [containerMode]);

    const mergedRef = (node: HTMLDivElement | null) => {
      (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={mergedRef}
        className={cn(
          "pointer-events-none select-none",
          containerMode === "fixed" ? "fixed z-50" : "absolute z-[5]",
          positionClasses,
          "w-14 h-14 sm:w-16 sm:h-16",
          className,
        )}
        style={
          containerMode === "absolute" && autoScale < 1
            ? {
                transform: `scale(${autoScale})`,
                transformOrigin:
                  position === "bottom-right" ? "bottom right" : "bottom left",
              }
            : undefined
        }
        {...props}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "pointer-events-auto absolute bottom-full mb-3 sm:mb-4 rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl flex flex-col transition-colors duration-300",
                modalAlignmentClasses,
                modalWidthClass,
                modalHeightClass,
              )}
            >
              <div
                style={{ backgroundColor: resolveColor(accentColor) }}
                className="p-4 sm:p-5 text-white flex items-center justify-between relative overflow-hidden shrink-0 transition-colors duration-300"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="flex items-center gap-3 z-10 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={avatarUrl}
                      alt="Support Avatar"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/20 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-xs sm:text-sm tracking-tight truncate">
                        {title}
                      </h3>
                      <Sparkles className="w-3.5 h-3.5 opacity-80 shrink-0 animate-pulse" />
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-white/80 truncate font-medium">
                      {subtitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 z-10"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Sandboxed scroll container ref attached directly here */}
              <div
                ref={scrollContainerRef}
                className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col gap-3 sm:gap-3.5 bg-zinc-50/50 dark:bg-zinc-900/30"
              >
                <div className="text-center my-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400">
                    Today
                  </span>
                </div>

                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        isUser
                          ? "self-end items-end"
                          : "self-start items-start",
                      )}
                    >
                      <div
                        style={{
                          backgroundColor: isUser
                            ? resolveColor(accentColor)
                            : undefined,
                          color: isUser ? "#ffffff" : undefined,
                        }}
                        className={cn(
                          "px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm transition-colors duration-300 break-words whitespace-pre-wrap max-w-full",
                          isUser
                            ? "rounded-br-xs font-medium"
                            : "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-xs",
                        )}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                          {msg.timestamp}
                        </span>
                        {isUser && (
                          <CheckCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="self-start flex items-center gap-2 px-4 py-3 rounded-2xl rounded-bl-xs bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm"
                  >
                    <Bot className="w-4 h-4 text-zinc-400 animate-bounce shrink-0" />
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse delay-75" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse delay-150" />
                    </div>
                  </motion.div>
                )}
              </div>

              <form
                onSubmit={handleSend}
                className="p-2.5 sm:p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 h-9 sm:h-10 px-3 sm:px-3.5 text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 rounded-xl outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  style={{
                    backgroundColor: inputValue.trim()
                      ? resolveColor(accentColor)
                      : undefined,
                  }}
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0",
                    inputValue.trim()
                      ? "text-white shadow-md hover:opacity-90 scale-105"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed",
                  )}
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ backgroundColor: resolveColor(accentColor) }}
          className={cn(
            "pointer-events-auto absolute inset-0 flex items-center justify-center rounded-full text-white shadow-2xl transition-colors duration-300 cursor-pointer outline-none",
          )}
        >
          <div
            style={{ backgroundColor: activeBgGlow }}
            className="absolute inset-0 rounded-full blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  },
);

FloatingContactButtonBlock.displayName = "FloatingContactButtonBlock";
