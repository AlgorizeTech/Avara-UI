"use client";

import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
  ChatTypingIndicator,
} from "@/components/custom/blocks/ChatBubbleBlock";
import { Image as ImageIcon, Send, SmilePlus } from "lucide-react";

/** Plain surface used by the focused examples (grouping, receipts, typing). */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#fbfbfb] dark:bg-[#050505] p-6 sm:p-10">
      <div className="w-full max-w-md flex flex-col space-y-1">{children}</div>
    </div>
  );
}

export default function ChatBubbleDemo({
  color = "primary",
  isTyping = true,
  messages = [1, 2, 3],
  example = "conversation",
}: {
  color?: string;
  isTyping?: boolean;
  messages?: number[];
  example?: "conversation" | "grouping" | "receipts" | "typing";
}) {
  if (example === "grouping") {
    return (
      <Panel>
        <ChatBubble variant="received" layout="group-top">
          <ChatAvatar fallback="SJ" />
          <ChatMessage>Three messages, one sender.</ChatMessage>
        </ChatBubble>
        <ChatBubble variant="received" layout="group-middle">
          <ChatAvatar fallback="SJ" />
          <ChatMessage>The inner corners tighten to 4px…</ChatMessage>
        </ChatBubble>
        <ChatBubble variant="received" layout="group-bottom">
          <ChatAvatar fallback="SJ" />
          <ChatMessage>…and only the last one keeps the avatar.</ChatMessage>
        </ChatBubble>

        <div className="h-5" />

        <ChatBubble variant="sent" layout="group-top">
          <ChatAvatar fallback="ME" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatMessage color={color as any}>
            The same logic mirrors for sent messages.
          </ChatMessage>
        </ChatBubble>
        <ChatBubble variant="sent" layout="group-bottom">
          <ChatAvatar fallback="ME" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatMessage color={color as any}>
            No manual border-radius maths required.
          </ChatMessage>
        </ChatBubble>
      </Panel>
    );
  }

  if (example === "receipts") {
    return (
      <Panel>
        <ChatBubble variant="received">
          <ChatAvatar fallback="SJ" />
          <ChatMessage>
            Received bubbles show the time only.
            <ChatTimestamp time="10:24 AM" />
          </ChatMessage>
        </ChatBubble>

        <div className="h-4" />

        <ChatBubble variant="sent">
          <ChatAvatar fallback="ME" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatMessage color={color as any}>
            Sent — a single tick.
            <ChatTimestamp time="10:25 AM" status="sent" />
          </ChatMessage>
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatAvatar fallback="ME" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatMessage color={color as any}>
            Delivered — double tick.
            <ChatTimestamp time="10:25 AM" status="delivered" />
          </ChatMessage>
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatAvatar fallback="ME" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ChatMessage color={color as any}>
            Read — double tick, accented.
            <ChatTimestamp time="10:26 AM" status="read" />
          </ChatMessage>
        </ChatBubble>
      </Panel>
    );
  }

  if (example === "typing") {
    return (
      <Panel>
        <ChatBubble variant="received">
          <ChatAvatar fallback="SJ" />
          <ChatMessage className="px-0 py-0 bg-transparent border-0 shadow-none dark:bg-transparent">
            <ChatTypingIndicator />
          </ChatMessage>
        </ChatBubble>
      </Panel>
    );
  }

  return (
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
            <ChatMessage color={color as any}>
              Yeah, I'm playing with it right now.
            </ChatMessage>
          </ChatBubble>

          <ChatBubble variant="sent" layout="group-bottom">
            <ChatAvatar fallback="ME" />
            <ChatMessage color={color as any}>
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
  );
}
