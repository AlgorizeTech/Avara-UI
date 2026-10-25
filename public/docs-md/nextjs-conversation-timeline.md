export const metadata = docsPageMetadata("conversation-timeline", {
  title: "Conversation Timeline",
  description: "A dense rail of thin marks, one per message, that expands into a labelled list on hover — a minimap for long chats."
});

# Conversation Timeline

A dense rail of thin marks, one per message, that expands into a labelled list on hover.

At rest it is a compact stack of hairlines — a minimap of the whole conversation that takes almost no room beside a chat. Hover the rail (or Tab into it) and every row grows at once while the labels fade in; hover a specific row and it gets extra emphasis — a brighter mark, a darker label, a small nudge. Click any mark to select it. Only `height` animates, so the rail never resizes sideways, and it re-anchors its own scroll position while the rows grow so the list never jumps. On touch devices, where there is no hover, it stays expanded so the labels remain reachable.

Explore the different variations of the Conversation Timeline — each example shows a live preview with the exact code to copy. Hover a rail to expand it.

export const usageDefault = `"use client";

const checkpoints = [
  { id: "1", role: "system",    label: "System prompt" },
  { id: "2", role: "user",      label: "Can you help me set up auth?" },
  { id: "3", role: "assistant", label: "Of course - let me walk you through it" },
] as const;

export default function ChatMinimap() {
  const [activeId, setActiveId] = useState("2");

  return (
    
  );
}`;

{/* A longer conversation, so the rail has enough rows to show its density and scrolling. Shared by the two snippets below; each one is still a whole file. */}

export const timelineData = `const checkpoints: TimelineCheckpoint[] = [
  { id: "1", role: "system", label: "System prompt" },
  { id: "2", role: "user", label: "Can you help me set up auth?" },
  { id: "3", role: "assistant", label: "Of course - let me walk you through it" },
  { id: "4", role: "user", label: "Let's go with GitHub OAuth" },
  { id: "5", role: "assistant", label: "Create the OAuth app callback" },
  { id: "6", role: "user", label: "Where do the secrets go?" },
  { id: "7", role: "assistant", label: "Use .env.local for dev, secrets store in prod" },
  { id: "8", role: "user", label: "How do I protect a route?" },
  { id: "9", role: "assistant", label: "Add middleware.ts with a matcher" },
  { id: "10", role: "user", label: "Can I read the session in a server component?" },
  { id: "11", role: "assistant", label: "Yes - call auth() on the server" },
  { id: "12", role: "user", label: "What about sign-out?" },
  { id: "13", role: "assistant", label: "signOut() in a server action" },
  { id: "14", role: "user", label: "Perfect, thanks!" },
];`;

export const usageLeft = `"use client";

${timelineData}

// Flip the labels to the left of the marks and recolour the active line
// with accent.
export default function LeftRail() {
  const [activeId, setActiveId] = useState("2");

  return (
    
  );
}`;

export const usageDensity = `"use client";

${timelineData}

// rowHeight / collapsedRowHeight set the expanded and resting row sizes;
// visibleCount caps how many rows show before the rail scrolls, and
// labelWidth is the fixed column labels truncate against.
export default function DenseRail() {
  const [activeId, setActiveId] = useState("2");

  return (
    
  );
}`;

export const usageChat = `"use client";

const WIDE = "(min-width: 640px)";
const subscribeWide = (onChange: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const useIsWide = () =>
  useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => true);

const messages = [
  { id: "1", role: "system",    label: "System prompt",            body: "You are a helpful engineering assistant." },
  { id: "2", role: "user",      label: "Can you help me set up auth?", body: "Can you help me set up auth? I'm on Next.js 15." },
  { id: "3", role: "assistant", label: "Of course - let me walk you through it", body: "Of course - first we'll pick a provider…" },
  // …
] as const;

const roleStyle: Record = {
  user: "self-end bg-primary text-primary-foreground",
  assistant: "self-start bg-muted text-foreground",
  system: "self-center bg-transparent text-[11px] font-mono uppercase tracking-wider text-muted-foreground",
};

// The rail as a minimap: selecting a mark scrolls its message into view.
export default function ChatWithMinimap() {
  const [activeId, setActiveId] = useState("2");
  const refs = useRef>({});
  // On a phone the label column would crowd out the chat, so the rail drops
  // to marks only — the bubbles already carry the text.
  const isWide = useIsWide();

  useEffect(() => {
    refs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeId]);

  return (

      {/* p-1.5 leaves room for the active bubble's ring inside the scroller */}
      
        {messages.map((m) => (
           { refs.current[m.id] = el; }}
            onClick={() => setActiveId(m.id)}
            className={\`max-w-[85%] cursor-pointer rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed [overflow-wrap:anywhere] transition-all \${roleStyle[m.role ?? "assistant"]}\`}
            style={m.id === activeId && m.role !== "system" ? { boxShadow: "0 0 0 2px var(--card), 0 0 0 4px var(--primary)" } : undefined}
          >
            {m.body}
          
        ))}

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/conversation-timeline.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/conversation-timeline
```

## Examples

## Features
Discover the Conversation Timeline's capabilities as a minimap for long conversations.

    One property animates
    Only row height transitions; the mark length, gap and label width are fixed, so the rail never shifts sideways and hover can never nudge the marks.

    Scroll stays put
    While rows grow from 10px to 24px the rail re-anchors to the row at the top every frame, so a scrolled list expands in place instead of jumping.

    Touch and keyboard
    Without hover the rail stays expanded so labels remain reachable; focus expands it too, and every mark is a real button with an accessible name.

    Respects reduced motion
    Every transition is dropped under prefers-reduced-motion; the rail simply snaps between its two states.

## Best Practices & Guidelines

    Keep labels short
    Labels truncate at labelWidth. Use the first line of a message or a summary rather than the full text.

    Leave room to expand
    The rail's height grows from visibleCount × collapsedRowHeight to visibleCount × rowHeight on hover. Place it where that growth won't push other content around.

## Props Reference

### `` Props

        Prop
        Type
        Default
        Description

        checkpoints
        TimelineCheckpoint[]
        Required
        One mark per entry, in order.

        activeId
        string
        —
        Currently selected checkpoint id — its mark takes the accent colour.

        onSelect
        {"(id: string) => void"}
        —
        Fires with the id of a clicked mark.

        side
        "left" | "right"
        "right"
        Which side of the marks the labels sit on.

        rowHeight
        number
        24
        Per-row height once expanded (hovering / focusing the rail), in px.

        collapsedRowHeight
        number
        10
        Per-row height at rest — just the marks, tightly packed.

        visibleCount
        number
        10
        Rows visible before scrolling; the rail's height is visibleCount × rowHeight.

        labelWidth
        number
        240
        Fixed label column width in px — labels truncate past it.

        showLabels
        boolean
        true
        Render the label column. Set false where width is tight and the rail becomes a marks-only minimap — each mark keeps its label as its accessible name.

        accent
        string
        "var(--primary)"
        Colour of the active row's line. Any CSS colour.

        className
        string
        —
        Merged onto the rail.

### `TimelineCheckpoint`

        Field
        Type
        Description

        id
        string
        Unique identifier — also the React key.

        label
        string
        Text revealed when the rail expands; also the mark's accessible name.

        sublabel
        string
        Optional — reserved for richer labels.

        role
        "user" | "assistant" | "system"
        Optional role tag, handy for styling the conversation the rail points at.

---

**Component Path:** `[framework]\conversation-timeline\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
