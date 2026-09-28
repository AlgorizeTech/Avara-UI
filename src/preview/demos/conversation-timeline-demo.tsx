"use client";

import {
  ConversationTimeline,
  type TimelineCheckpoint,
} from "@/components/custom/blocks/ConversationTimelineBlock";
import { useEffect, useRef, useState } from "react";

// "Default" on the page's colour picker means the theme's primary.
const getAccent = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = {
    primary: "var(--primary)",
    default: "var(--primary)",
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    lavender: "#9b8afb",
  };
  return map[c] || "var(--primary)";
};

const CONVERSATION: Array<TimelineCheckpoint & { body: string }> = [
  { id: "1", role: "system", label: "System prompt", body: "You are a helpful engineering assistant." },
  { id: "2", role: "user", label: "Can you help me set up auth?", body: "Can you help me set up auth? I'm on Next.js 15 with the app router." },
  { id: "3", role: "assistant", label: "Of course - let me walk you through it", body: "Of course - let me walk you through it. First we'll pick a provider, then wire the session middleware." },
  { id: "4", role: "user", label: "Let's go with GitHub OAuth", body: "Let's go with GitHub OAuth. We already have an org app registered." },
  { id: "5", role: "assistant", label: "Create the OAuth app callback", body: "Great. Set the callback URL to /api/auth/callback/github and grab the client id and secret." },
  { id: "6", role: "user", label: "Where do the secrets go?", body: "Where do the secrets go? .env.local or the platform's secret store?" },
  { id: "7", role: "assistant", label: "Use .env.local for dev, secrets store in prod", body: "Use .env.local for dev and your platform's secret store in prod. Never commit either." },
  { id: "8", role: "user", label: "How do I protect a route?", body: "How do I protect a route so only signed-in users can see the dashboard?" },
  { id: "9", role: "assistant", label: "Add middleware.ts with a matcher", body: "Add middleware.ts with a matcher for /dashboard/:path* and redirect when there's no session." },
  { id: "10", role: "user", label: "Can I read the session in a server component?", body: "Can I read the session in a server component, or only on the client?" },
  { id: "11", role: "assistant", label: "Yes - call auth() on the server", body: "Yes - call auth() at the top of the server component; it reads the cookie for you." },
  { id: "12", role: "user", label: "What about sign-out?", body: "What about sign-out? I'd like a button in the header." },
  { id: "13", role: "assistant", label: "signOut() in a server action", body: "Wrap signOut() in a server action and bind it to a form button - no client JS needed." },
  { id: "14", role: "user", label: "Perfect, thanks!", body: "Perfect, thanks! That's exactly what I needed." },
];

const ROLE_STYLE: Record<string, string> = {
  user: "self-end bg-foreground text-background",
  assistant: "self-start bg-muted text-foreground",
  system: "self-center bg-transparent text-[11px] font-mono uppercase tracking-wider text-muted-foreground",
};

function PairedWithChat({ accent }: { accent: string }) {
  const [activeId, setActiveId] = useState("2");
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  // Selecting a mark scrolls its message into view and highlights it.
  useEffect(() => {
    refs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeId]);

  return (
    <div className="flex w-full max-w-2xl items-start gap-6 rounded-2xl border border-border bg-card p-5">
      <ConversationTimeline
        checkpoints={CONVERSATION}
        activeId={activeId}
        onSelect={setActiveId}
        accent={accent}
        labelWidth={200}
        className="shrink-0"
      />
      <div className="flex h-72 min-w-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {CONVERSATION.map((m) => (
          <div
            key={m.id}
            ref={(el) => {
              refs.current[m.id] = el;
            }}
            onClick={() => setActiveId(m.id)}
            className={`max-w-[85%] cursor-pointer rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed transition-shadow ${ROLE_STYLE[m.role ?? "assistant"]}`}
            style={m.id === activeId && m.role !== "system" ? { boxShadow: `0 0 0 2px ${accent}` } : undefined}
          >
            {m.body}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConversationTimelineDemo({
  color = "primary",
  side = "right",
  rowHeight = 24,
  collapsedRowHeight = 10,
  visibleCount = 10,
  labelWidth = 240,
  example = "default",
}: {
  color?: string;
  side?: "left" | "right";
  rowHeight?: number;
  collapsedRowHeight?: number;
  visibleCount?: number;
  labelWidth?: number;
  /** Which preview to render. */
  example?: "default" | "left" | "density" | "chat";
}) {
  const accent = getAccent(color);
  const [activeId, setActiveId] = useState("2");
  const frame = "w-full flex items-center justify-center min-h-[320px] px-6 py-12 relative z-10";

  if (example === "left") {
    return (
      <div className={frame}>
        <ConversationTimeline
          checkpoints={CONVERSATION}
          activeId={activeId}
          onSelect={setActiveId}
          side="left"
          accent={color === "primary" ? "#8b5cf6" : accent}
        />
      </div>
    );
  }

  if (example === "density") {
    return (
      <div className={frame}>
        <ConversationTimeline
          checkpoints={CONVERSATION}
          activeId={activeId}
          onSelect={setActiveId}
          side={side}
          accent={accent}
          rowHeight={rowHeight}
          collapsedRowHeight={collapsedRowHeight}
          visibleCount={visibleCount}
          labelWidth={labelWidth}
        />
      </div>
    );
  }

  if (example === "chat") {
    return (
      <div className={frame}>
        <PairedWithChat accent={accent} />
      </div>
    );
  }

  return (
    <div className={frame}>
      <ConversationTimeline
        checkpoints={CONVERSATION}
        activeId={activeId}
        onSelect={setActiveId}
        side={side}
        accent={accent}
      />
    </div>
  );
}
