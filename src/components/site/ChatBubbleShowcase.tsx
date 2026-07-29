"use client";

import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
  ChatTypingIndicator,
} from "@/components/custom/blocks/ChatBubbleBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { Image as ImageIcon, Loader2, PlayCircle, Send, SmilePlus } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const CHAT_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import React, { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import gsap from "gsap";

export type ChatVariant = "sent" | "received";
export type ChatLayout = "default" | "group-top" | "group-middle" | "group-bottom";

interface ChatContextValue { variant: ChatVariant; layout: ChatLayout; }
const ChatContext = createContext<ChatContextValue | null>(null);

function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("Chat components must be used within a ChatBubble root.");
  return ctx;
}

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> { variant?: ChatVariant; layout?: ChatLayout; }
export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(({ children, variant = "received", layout = "default", className, ...props }, ref) => {
  return (<ChatContext.Provider value={{ variant, layout }}><div ref={ref} className={cn("flex w-full gap-3 py-0.5", variant === "sent" ? "justify-end" : "justify-start", className)} {...props}>{children}</div></ChatContext.Provider>);
});
ChatBubble.displayName = "ChatBubble";

export interface ChatAvatarProps extends React.HTMLAttributes<HTMLDivElement> { src?: string; fallback: string; }
export const ChatAvatar = forwardRef<HTMLDivElement, ChatAvatarProps>(({ src, fallback, className, ...props }, ref) => {
  const { variant, layout } = useChat();
  const isHidden = layout === "group-top" || layout === "group-middle";
  return (
    <div ref={ref} className={cn("flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-semibold select-none mt-auto", variant === "sent" ? "order-2" : "order-1", isHidden ? "invisible" : "visible", "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300", className)} {...props}>
      {src ? <img src={src} alt="Avatar" className="w-full h-full object-cover" /> : fallback}
    </div>
  );
});
ChatAvatar.displayName = "ChatAvatar";

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> { color?: "default" | "blue" | "indigo" | "rose" | "emerald"; }
export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(({ children, color = "default", className, ...props }, ref) => {
  const { variant, layout } = useChat();
  const nodeRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement);

  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, []);

  const sentColors: Record<string, string> = { default: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", blue: "bg-blue-600 text-white", indigo: "bg-indigo-600 text-white", rose: "bg-rose-600 text-white", emerald: "bg-emerald-600 text-white" };
  const isSent = variant === "sent";

  const getBorderRadius = () => {
    if (layout === "default") return "rounded-2xl";
    if (isSent) {
      if (layout === "group-top") return "rounded-2xl rounded-br-sm";
      if (layout === "group-middle") return "rounded-2xl rounded-tr-sm rounded-br-sm";
      if (layout === "group-bottom") return "rounded-2xl rounded-tr-sm";
    } else {
      if (layout === "group-top") return "rounded-2xl rounded-bl-sm";
      if (layout === "group-middle") return "rounded-2xl rounded-tl-sm rounded-bl-sm";
      if (layout === "group-bottom") return "rounded-2xl rounded-tl-sm";
    }
    return "rounded-2xl";
  };

  return (
    <div className={cn("flex flex-col max-w-[75%]", isSent ? "order-1 items-end" : "order-2 items-start")}>
      <div ref={nodeRef} className={cn("px-4 py-2.5 text-[15px] leading-relaxed shadow-sm opacity-0", getBorderRadius(), isSent ? sentColors[color] || sentColors.default : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50", className)} {...props}>
        {children}
      </div>
    </div>
  );
});
ChatMessage.displayName = "ChatMessage";

export interface ChatTimestampProps extends React.HTMLAttributes<HTMLDivElement> { time: string; status?: "sent" | "delivered" | "read"; }
export const ChatTimestamp = forwardRef<HTMLDivElement, ChatTimestampProps>(({ time, status, className, ...props }, ref) => {
  const { variant } = useChat(); const isSent = variant === "sent";
  return (
    <div ref={ref} className={cn("flex items-center gap-1.5 mt-1 mx-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 select-none", isSent ? "justify-end" : "justify-start", className)} {...props}>
      <span>{time}</span>
      {isSent && status && (
        <span className="flex items-center">
          {status === "sent" && <Check className="w-3.5 h-3.5" />}
          {status === "delivered" && <CheckCheck className="w-3.5 h-3.5" />}
          {status === "read" && <CheckCheck className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />}
        </span>
      )}
    </div>
  );
});
ChatTimestamp.displayName = "ChatTimestamp";

export const ChatTypingIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { variant } = useChat();
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    if (containerRef.current) { gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }); }
    gsap.to(dotsRef.current, { y: -4, duration: 0.4, stagger: 0.15, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }, []);

  return (
    <div ref={containerRef} className={cn("flex items-center gap-1 px-4 py-3.5 rounded-2xl w-max shadow-sm opacity-0", variant === "sent" ? "bg-zinc-900 dark:bg-zinc-100 rounded-br-sm" : "bg-zinc-100 dark:bg-zinc-800/80 rounded-bl-sm border border-zinc-200/50 dark:border-zinc-700/50", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div key={i} ref={(el) => { dotsRef.current[i] = el; }} className={cn("w-1.5 h-1.5 rounded-full", variant === "sent" ? "bg-white/70 dark:bg-black/70" : "bg-zinc-400 dark:bg-zinc-500")} />
      ))}
    </div>
  );
});
ChatTypingIndicator.displayName = "ChatTypingIndicator";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const CHAT_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import React, { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import gsap from "gsap";

const ChatContext = createContext(null);

function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("Chat components must be used within a ChatBubble root.");
  return ctx;
}

export const ChatBubble = forwardRef(({ children, variant = "received", layout = "default", className, ...props }, ref) => {
  return (<ChatContext.Provider value={{ variant, layout }}><div ref={ref} className={cn("flex w-full gap-3 py-0.5", variant === "sent" ? "justify-end" : "justify-start", className)} {...props}>{children}</div></ChatContext.Provider>);
});
ChatBubble.displayName = "ChatBubble";

export const ChatAvatar = forwardRef(({ src, fallback, className, ...props }, ref) => {
  const { variant, layout } = useChat();
  const isHidden = layout === "group-top" || layout === "group-middle";
  return (
    <div ref={ref} className={cn("flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-semibold select-none mt-auto", variant === "sent" ? "order-2" : "order-1", isHidden ? "invisible" : "visible", "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300", className)} {...props}>
      {src ? <img src={src} alt="Avatar" className="w-full h-full object-cover" /> : fallback}
    </div>
  );
});
ChatAvatar.displayName = "ChatAvatar";

export const ChatMessage = forwardRef(({ children, color = "default", className, ...props }, ref) => {
  const { variant, layout } = useChat();
  const nodeRef = useRef(null);
  React.useImperativeHandle(ref, () => nodeRef.current);

  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, []);

  const sentColors = { default: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", blue: "bg-blue-600 text-white", indigo: "bg-indigo-600 text-white", rose: "bg-rose-600 text-white", emerald: "bg-emerald-600 text-white" };
  const isSent = variant === "sent";

  const getBorderRadius = () => {
    if (layout === "default") return "rounded-2xl";
    if (isSent) {
      if (layout === "group-top") return "rounded-2xl rounded-br-sm";
      if (layout === "group-middle") return "rounded-2xl rounded-tr-sm rounded-br-sm";
      if (layout === "group-bottom") return "rounded-2xl rounded-tr-sm";
    } else {
      if (layout === "group-top") return "rounded-2xl rounded-bl-sm";
      if (layout === "group-middle") return "rounded-2xl rounded-tl-sm rounded-bl-sm";
      if (layout === "group-bottom") return "rounded-2xl rounded-tl-sm";
    }
    return "rounded-2xl";
  };

  return (
    <div className={cn("flex flex-col max-w-[75%]", isSent ? "order-1 items-end" : "order-2 items-start")}>
      <div ref={nodeRef} className={cn("px-4 py-2.5 text-[15px] leading-relaxed shadow-sm opacity-0", getBorderRadius(), isSent ? sentColors[color] || sentColors.default : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50", className)} {...props}>
        {children}
      </div>
    </div>
  );
});
ChatMessage.displayName = "ChatMessage";

export const ChatTimestamp = forwardRef(({ time, status, className, ...props }, ref) => {
  const { variant } = useChat(); const isSent = variant === "sent";
  return (
    <div ref={ref} className={cn("flex items-center gap-1.5 mt-1 mx-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 select-none", isSent ? "justify-end" : "justify-start", className)} {...props}>
      <span>{time}</span>
      {isSent && status && (
        <span className="flex items-center">
          {status === "sent" && <Check className="w-3.5 h-3.5" />}
          {status === "delivered" && <CheckCheck className="w-3.5 h-3.5" />}
          {status === "read" && <CheckCheck className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />}
        </span>
      )}
    </div>
  );
});
ChatTimestamp.displayName = "ChatTimestamp";

export const ChatTypingIndicator = forwardRef(({ className, ...props }, ref) => {
  const { variant } = useChat();
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  React.useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    if (containerRef.current) { gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }); }
    gsap.to(dotsRef.current, { y: -4, duration: 0.4, stagger: 0.15, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }, []);

  return (
    <div ref={containerRef} className={cn("flex items-center gap-1 px-4 py-3.5 rounded-2xl w-max shadow-sm opacity-0", variant === "sent" ? "bg-zinc-900 dark:bg-zinc-100 rounded-br-sm" : "bg-zinc-100 dark:bg-zinc-800/80 rounded-bl-sm border border-zinc-200/50 dark:border-zinc-700/50", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div key={i} ref={(el) => { dotsRef.current[i] = el; }} className={cn("w-1.5 h-1.5 rounded-full", variant === "sent" ? "bg-white/70 dark:bg-black/70" : "bg-zinc-400 dark:bg-zinc-500")} />
      ))}
    </div>
  );
});
ChatTypingIndicator.displayName = "ChatTypingIndicator";`;

export function ChatBubbleShowcase() {
  const [color, setColor] = useState<string>("primary");
  const [isTyping, setIsTyping] = useState(true);
  const [messages, setMessages] = useState<number[]>([1, 2, 3]);

  // Simulate receiving a message
  const triggerSimulation = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, Date.now()]);

      // Auto reset after a bit for demo purposes
      setTimeout(() => {
        setMessages([1, 2, 3]);
        setIsTyping(true);
      }, 5000);
    }, 2000);
  };

  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? ` color="${color}"` : "";
    return `import { 
  ChatBubble, 
  ChatAvatar, 
  ChatMessage, 
  ChatTimestamp, 
  ChatTypingIndicator 
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function ChatDemo() {
  return (
    <div className="flex flex-col gap-2 p-6 max-w-md mx-auto">
      
      {/* Received Message Group */}
      <ChatBubble variant="received" layout="group-top">
        <ChatAvatar fallback="SJ" />
        <ChatMessage>Hey! Did you check out the new UI kit?</ChatMessage>
      </ChatBubble>
      
      <ChatBubble variant="received" layout="group-bottom">
        <ChatAvatar fallback="SJ" />
        <ChatMessage>
          It has this really clean chat component.
          <ChatTimestamp time="10:24 AM" />
        </ChatMessage>
      </ChatBubble>

      {/* Sent Message */}
      <ChatBubble variant="sent">
        <ChatAvatar fallback="ME" />
        <ChatMessage${colorPropStr}>
          Yeah, it looks super premium! I'm going to use it for our support dashboard.
          <ChatTimestamp time="10:25 AM" status="read" />
        </ChatMessage>
      </ChatBubble>

      {/* Typing Indicator */}
      <ChatBubble variant="received">
        <ChatAvatar fallback="SJ" />
        <ChatTypingIndicator />
      </ChatBubble>

    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-2 p-5 rounded-xl z-0 relative">
        <ThemeColorPicker color={color} onChange={(c) => setColor(c as typeof color)} label="Sender Brand Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ChatBubbleBlock"
        tsCode={CHAT_ENGINE_CODE_TS}
        jsCode={CHAT_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#fbfbfb] dark:bg-[#050505] p-0 overflow-hidden relative">
          {/* Mock Phone Container */}
          <div className="w-full max-w-[400px] h-[550px] bg-white dark:bg-[#09090b] border-x border-zinc-200 dark:border-zinc-800/50 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-orange-300 shadow-inner" />
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-none">
                  Sarah Jenkins
                </h3>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Online
                </span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end space-y-1 custom-scrollbar">
              <ChatBubble variant="received" layout="group-top">
                <ChatAvatar fallback="SJ" />
                <ChatMessage>
                  Hey! Did you check out the new Docs UI kit?
                </ChatMessage>
              </ChatBubble>

              <ChatBubble variant="received" layout="group-bottom">
                <ChatAvatar fallback="SJ" />
                <ChatMessage>
                  I heard it has a really clean compound component pattern for
                  chat interfaces.
                  <ChatTimestamp time="10:24 AM" />
                </ChatMessage>
              </ChatBubble>

              <div className="h-4" />

              <ChatBubble variant="sent" layout="group-top">
                <ChatAvatar fallback="ME" />
                <ChatMessage color={color}>
                  Yeah, I'm playing with it right now.
                </ChatMessage>
              </ChatBubble>

              <ChatBubble variant="sent" layout="group-bottom">
                <ChatAvatar fallback="ME" />
                <ChatMessage color={color}>
                  The grouping logic is built right into the context, so the
                  border radius adjusts automatically when messages stack.
                  <ChatTimestamp time="10:25 AM" status="read" />
                </ChatMessage>
              </ChatBubble>

              <div className="h-4" />

              {isTyping && (
                <ChatBubble variant="received" layout="default">
                  <ChatAvatar fallback="SJ" />
                  <ChatMessage className="px-0 py-0 bg-transparent border-0 shadow-none dark:bg-transparent">
                    <ChatTypingIndicator />
                  </ChatMessage>
                </ChatBubble>
              )}

              {messages.length > 3 && !isTyping && (
                <ChatBubble variant="received" layout="default">
                  <ChatAvatar fallback="SJ" />
                  <ChatMessage>
                    That's awesome! Does it have typing indicators too?
                    <ChatTimestamp time="Just now" />
                  </ChatMessage>
                </ChatBubble>
              )}
            </div>

            {/* Input Mock */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm">
                <ImageIcon className="w-5 h-5 text-zinc-400" />
                <span className="flex-1 text-sm text-zinc-400">
                  Type a message...
                </span>
                <SmilePlus className="w-5 h-5 text-zinc-400" />
                <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center ml-1">
                  <Send className="w-3.5 h-3.5 text-white dark:text-zinc-900 -ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
