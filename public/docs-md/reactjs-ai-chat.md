---
title: "Shadcn AI Chat"
description: "Shadcn AI Chat. An AI chat interface with conversation history, typing indicators, editable titles, a model picker, file and @mention tools and voice dictation."
url: https://avaraui.com/docs/nextjs/ai-chat
---

# Shadcn AI Chat

An LLM chat interface with history, editable titles, a prompt composer with @Mention tools, and a model picker.

Every preview is live: send a prompt to see the simulated stream, rename a thread, or hit **New Chat**. `variant` changes the shell only, and everything else behaves identically in every variant.

## Workspace chat

A separate install, not a `variant`: a full AI workspace that opens on an empty screen and answers with live steps, streamed text, sources and a stop button.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/ai-chat-workspace.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/ai-chat-workspace
```

### Workspace

Send a prompt to watch the steps run. Try Research, the effort slider, a file and the model menu beside the prompt bar.

- `color="primary"` is the default, so the accent, borders and surfaces all follow your theme tokens. A named colour or hex works too.
- `chatHistory` fills the sidebar. Threads are grouped by their `date` string, in the order they appear.

```tsx
import AIChatWorkspace, {
  type WorkspaceThread,
} from "@/components/custom/blocks/AiChatWorkspace";

const chatHistory: WorkspaceThread[] = [
  { id: 1, title: "Rewrite onboarding emails in a warmer tone", date: "Today" },
  { id: 2, title: "Plan a two-week launch checklist", date: "Today" },
  { id: 3, title: "Compare three pricing page layouts", date: "Today" },
  { id: 4, title: "Explain OAuth to a new teammate", date: "Yesterday" },
  { id: 5, title: "Draft release notes for v2.4", date: "Yesterday" },
  { id: 6, title: "Summarize last quarter's support tickets", date: "Yesterday" },
  { id: 7, title: "Outline a talk on design systems", date: "Yesterday" },
  { id: 8, title: "Name ideas for a budgeting app", date: "Last week" },
  { id: 9, title: "Review a SQL migration for risks", date: "Last week" },
  { id: 10, title: "Cover letter for a product design role", date: "Last week" },
];

export default function Workspace() {
  return (
    <div className="w-full">
      <AIChatWorkspace
        defaultModelId="core"
        chatHistory={chatHistory}
        user={{
          name: "Maya Chen",
          email: "maya.chen@example.com",
          avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
        }}
      />
    </div>
  );
}
```

What the screen does without any props:

- **Model menu** sits in the prompt bar. Pro and Premium models wear a badge and play the same one-off flourish as the other chat.
- **Prompt bar** also has Research, image and reasoning toggles, an effort slider, web search, file attachments (drag them in too) and voice dictation. The send button turns into a stop button while a reply is being written.
- **Apps strip** under the bar lists Google Drive, Slack and more, with their real logos. They unlock on Pro; a linked app is named in a prompt as `@Slack` and arrives in `onSend` as `connectors`.
- **Sidebar** holds history with rename and delete, Discover, Library and Templates. Library files you switch on travel with each prompt as `knowledge`.
- **Header actions** copy a link, share, rename, export a chat as Markdown or clear it. **New chat** is also bound to ⌘/Ctrl + N while focus is inside the component.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/ai-chat.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/ai-chat
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/ai-chat-motion.json
```

## AI assistant

- Pass `chatHistory` as `{ id, title, date }[]` — the `date` string is what the sidebar groups threads by.
- `initialMessages` seeds the conversation with `{ id, role, content, time }[]`, where `role` is `"ai"` or `"user"`.
- `variant="default"` is the default shell — a thread sidebar beside the conversation, collapsing on narrow screens.

```tsx
import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

const chatHistory: ChatThread[] = [
  { id: 1, title: "Help with React Components", date: "Today" },
  { id: 2, title: "Write a python script for SEO", date: "Today" },
  { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
  { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
  { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I am your AI assistant. How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    content: "Can you help me build a modern dashboard UI using Tailwind CSS?",
    time: "10:02 AM",
  },
  {
    id: 3,
    role: "ai",
    content:
      "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
    time: "10:02 AM",
  },
];

export default function Assistant() {
  return (
    <div className="w-full h-[600px]">
      <AIChat chatHistory={chatHistory} initialMessages={initialMessages} />
    </div>
  );
}
```

## Examples

### Compact

- Set `variant="compact"` for no history sidebar. While nothing has been said it is a hero — `heroTitle` over the prompt bar, no header, no messages. The first message you send swaps it for the conversation view, and **New chat** in that view brings the hero back.
- `heroTitle` and `heroSubtitle` set the copy above the bar. Seed `initialMessages` instead and it opens on the conversation directly.
- `showSidebar=false` does the same to any other variant, so a `glass` panel can open on its hero too.

```tsx
import AIChat from "@/components/custom/blocks/Ai-chat";

export default function CompactAssistant() {
  return (
    <div className="w-full h-[600px]">
      {/* No sidebar and nothing said yet: just the title and the prompt bar, like a hero.
          The first message swaps it for the conversation view. */}
      <AIChat
        variant="compact"
        heroTitle="What can I help you with?"
        heroSubtitle="Ask a question, attach a file, or pick a source with +"
      />
    </div>
  );
}
```

### Wired to your backend

- Pass `uploadFile` as `(file, onProgress, signal) => Promise<void>` to replace the simulated upload — the rocket follows whatever percentage you report, and the chip turns green when the promise resolves or red when it rejects.
- `onSend` receives `{ content, attachments, model, effort }` every time a prompt goes out, so the endpoint gets the model id, the effort id and the finished uploads in one call.
- `models` fills the picker with your own `{ id, name, description?, badge?, pro?, premium? }[]`; `defaultModelId` chooses the initial one.

```tsx
import AIChat, {
  type ChatModel,
  type ComposerTool,
  type SendPayload,
  type UploadHandler,
} from "@/components/custom/blocks/Ai-chat";
import { Database, Paperclip, Ticket } from "lucide-react";

// One upload row, then whatever sources your assistant can reach. Picking a
// mention row writes "@Label" into the prompt; `onSend` lists which were named.
const tools: ComposerTool[] = [
  { id: "files", label: "Photos & files", description: "Upload from this device", icon: <Paperclip className="w-4 h-4" />, action: "upload" },
  { id: "crm", label: "CRM", description: "Accounts and deals", icon: <Database className="w-4 h-4" /> },
  { id: "tickets", label: "Tickets", description: "Open support issues", icon: <Ticket className="w-4 h-4" /> },
];

const models: ChatModel[] = [
  { id: "gpt-5", name: "GPT-5", description: "Flagship reasoning", badge: "New" },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", description: "Fast and capable" },
];

// Stream a real upload and report progress as it goes. Reject to mark the chip failed;
// `signal` aborts if the user removes the chip mid-flight.
const uploadFile: UploadHandler = (file, onProgress, signal) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) =>
      e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(xhr.statusText)));
    xhr.onerror = () => reject(new Error("Network error"));
    signal.addEventListener("abort", () => xhr.abort());
    const body = new FormData();
    body.append("file", file);
    xhr.send(body);
  });

export default function WiredAssistant() {
  const handleSend = ({ content, attachments, model, effort, tools }: SendPayload) => {
    // attachments are the finished uploads; tools are the "@" sources the prompt named
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        content,
        files: attachments.map((a) => a.id),
        model: model.id,
        effort: effort.id,
        sources: tools.map((t) => t.id),
      }),
    });
  };

  return (
    <div className="w-full h-[600px]">
      <AIChat
        tools={tools}
        models={models}
        defaultModelId="claude-sonnet-5"
        defaultEffort="high"
        accept="image/*,.pdf,.md"
        maxFiles={4}
        uploadFile={uploadFile}
        onSend={handleSend}
      />
    </div>
  );
}
```

### Minimal

- Set `variant="minimal"` to strip the borders, shadows and dividers so the assistant blends into a surrounding surface.

```tsx
import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

const chatHistory: ChatThread[] = [
  { id: 1, title: "Help with React Components", date: "Today" },
  { id: 2, title: "Write a python script for SEO", date: "Today" },
  { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
  { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
  { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I am your AI assistant. How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    content: "Can you help me build a modern dashboard UI using Tailwind CSS?",
    time: "10:02 AM",
  },
  {
    id: 3,
    role: "ai",
    content:
      "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
    time: "10:02 AM",
  },
];

export default function MinimalAssistant() {
  return (
    <div className="w-full h-[600px]">
      {/* Card chrome and dividers removed — drops cleanly into an existing panel. */}
      <AIChat
        variant="minimal"
        chatHistory={chatHistory}
        initialMessages={initialMessages}
      />
    </div>
  );
}
```

### Glass

- Set `variant="glass"` for translucent panels with backdrop blur — it needs a colourful backdrop behind it to read.
- `color="#8b5cf6"` tints the accents so they hold up against your own backdrop.

```tsx
import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

const chatHistory: ChatThread[] = [
  { id: 1, title: "Help with React Components", date: "Today" },
  { id: 2, title: "Write a python script for SEO", date: "Today" },
  { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
  { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
  { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I am your AI assistant. How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    content: "Can you help me build a modern dashboard UI using Tailwind CSS?",
    time: "10:02 AM",
  },
  {
    id: 3,
    role: "ai",
    content:
      "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
    time: "10:02 AM",
  },
];

export default function GlassAssistant() {
  return (
    // `glass` is translucent by design — placed over a high-resolution nature backdrop.
    <div
      className="p-8 bg-cover bg-center rounded-2xl relative overflow-hidden"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <AIChat
        variant="glass"
        color="#8b5cf6"
        chatHistory={chatHistory}
        initialMessages={initialMessages}
      />
    </div>
  );
};
```

### Liquid Glass

- Set `variant="liquid-glass"` for authentic liquid glass refraction using SVG displacement mapping, multi-layer specular highlights, and fluid reflections.
- `color="#8b5cf6"` tints the accents so they hold up against your own backdrop.

```tsx
import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

const chatHistory: ChatThread[] = [
  { id: 1, title: "Help with React Components", date: "Today" },
  { id: 2, title: "Write a python script for SEO", date: "Today" },
  { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
  { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
  { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I am your AI assistant. How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    content: "Can you help me build a modern dashboard UI using Tailwind CSS?",
    time: "10:02 AM",
  },
  {
    id: 3,
    role: "ai",
    content:
      "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
    time: "10:02 AM",
  },
];

export default function LiquidGlassAssistant() {
  return (
    // Real liquid SVG glass displacement with multi-layer reflections and specular highlights
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/25 rounded-2xl pointer-events-none" />
      <AIChat
        variant="liquid-glass"
        color="#8b5cf6"
        chatHistory={chatHistory}
        initialMessages={initialMessages}
      />
    </div>
  );
};
```

## The composer

Everything under the prompt is built in and works without any props:

- **The + menu** — six rows by default: *Photos & files* opens the file picker; *Web search*, *Sales data*, *Documents*, *Mail* and *Calendar* each write `@Label` into the prompt at the caret (once — picking it again just refocuses). Supply your own rows with `tools`; the ones a prompt names arrive in `onSend` as `tools`, in the order they appear.
- **Attachments** — from the + menu, and files can also be dropped anywhere on the composer. Each file becomes a chip with a rocket that launches from the left, rides the progress track with a flickering exhaust, then blasts off the end as a check bursts in at 100%. Images show a thumbnail; the send button waits until every upload has landed. Uploads are simulated until you pass `uploadFile`.
- **Model picker** — a popover listing `models` (four demo models by default). The chosen model is stamped on each reply's timestamp. A model with `pro: true` wears a blue *Pro* badge; switching to it turns the pill blue as a bolt strikes in, the pill flickers and throws off sparks, and the prompt bar's edge draws itself out from the centre, flickers like a live wire and glows from within while a scan line rises through it. A model with `premium: true` wears a gold *Premium* badge after its name; switching to it turns the pill gold with a crown, pings a ring and a glint across the pill, and sends two gold beams once around the prompt bar's edge while a sheen crosses it — a single play, unlike Max effort's standing glow.
- **Effort** — a Faster ↔ Smarter slider with one stop per level. At the highest level the pill switches to a sparkle and the prompt bar glows with a scatter of twinkling specks. The simulated reply also takes a little longer the higher you go.
- **Dictation** — the mic opens the microphone and drives a 22-bar waveform from the live audio level, while the Web Speech API writes what you say into the prompt. Without mic permission the wave runs an idle animation; without speech recognition the wave still shows so the button visibly responds. Tap again (or press Escape) to stop.

## About Shadcn AI Chat

**What it is.** The `ai-chat` install is `AIChat`: a thread sidebar with rename and delete, a conversation view, and a prompt bar with a `+` tool menu, attachments, a model picker, an effort slider and voice dictation. The separate `ai-chat-workspace` install is `AIChatWorkspace`, a fuller screen with live steps, streamed replies, sources and a stop button.

**How it is built.** Threads are grouped by each `chatHistory` item's `date` string, and `variant` swaps only the outer shell. `AIChat` calls `onSend` and `uploadFile` as hooks, and it always appends its own simulated reply. `AIChatWorkspace` takes a `generateReply` function that returns the reply text. GSAP drives the motion, with a Motion twin installed as `ai-chat-motion`.

**When to use it.** Use it for assistant and copilot front ends, research workspaces and prompt-driven product screens.

## For AI agents

**When to use**

- LLM assistants, copilot sidebars
- Research workspaces, prompt-driven SaaS interfaces

**When not to use**

- Message bubbles inside a thread you build yourself: use [Chat Bubble](https://avaraui.com/docs/reactjs/chat-bubble)
- A person-to-person messenger with contacts and unread badges: use [Chat](https://avaraui.com/docs/reactjs/chat)

**Agent notes**

- Install `ai-chat` for `AIChat` (default export of `Ai-chat`) or `ai-chat-workspace` for `AIChatWorkspace` (default export of `AiChatWorkspace`). Use `ai-chat-motion` for the Motion build of `AIChat`, never both.
- `AIChat` composer features (`tools` for the `+` menu, `models`, `efforts`, drag-and-drop attachments, dictation) work with simulated defaults and no props.
- `AIChat` only notifies you: `onSend` receives `{ content, attachments, model, effort, tools }` and the thread still shows a canned reply. To show your own model's answer, use `AIChatWorkspace` and pass `generateReply`.
- Pass `uploadFile(file, onProgress, signal)` to replace the simulated upload on either component.
- Seed data: `AIChat` takes `chatHistory` and `initialMessages`; `AIChatWorkspace` takes `chatHistory` and `messagesByThread`.

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/ai-chat

**When to use it.** An LLM chat interface with conversation history, typing indicators, editable titles and a full prompt composer (a + menu for files and mentions, an upload indicator, a model picker), in five looks of one item plus a separate full workspace.

**When to use something else:**

- [Chat](https://avaraui.com/docs/reactjs/chat): for person-to-person messaging with a contact list rather than an AI assistant.

**Gotchas:**

- Five are looks of the one `ai-chat` item: install it once and set `variant` from the index. The workspace is a separate item, `ai-chat-workspace`, with no `variant` prop.
- To connect a real backend, pass your own upload and send handlers; the simulated stream and upload are the defaults.
- `glass` and `liquid-glass` need a colourful backdrop behind them to read.

### The 6 variants

1. **Workspace** (`workspace`): Full AI workspace: empty-screen start, model menu in the prompt bar, research and image modes, linked apps, Library.
   - Live: https://avaraui.com/view/ai-chat/workspace
   - Best for: an assistant product where the chat is the whole screen
   - Avoid if: you want a small embedded chat box; you only need a prompt bar
   - Traits: empty screen first, model menu in the prompt bar, research and web search, linked apps and Library, separate install
   - Install: `npx shadcn@latest add @avara-ui/ai-chat-workspace`
   - Docs: https://avaraui.com/docs/nextjs/ai-chat#workspace
2. **Default** (`default`): The full assistant with a history sidebar of threads, grouped by date, beside the conversation.
   - Live: https://avaraui.com/view/ai-chat/default
   - Best for: an assistant where users return to earlier threads
   - Avoid if: you want a single prompt box with no history
   - Traits: history sidebar, default look, editable thread titles
   - Install: `npx shadcn@latest add @avara-ui/ai-chat`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/ai-chat#ai-assistant
3. **Compact** (`compact`): No history sidebar: a hero title over the prompt bar until the first message, then the conversation.
   - Live: https://avaraui.com/view/ai-chat/compact
   - Best for: an assistant embedded in a page or a landing section
   - Avoid if: users need to browse past conversations
   - Traits: no sidebar, hero prompt before the first message, `heroTitle` and `heroSubtitle` copy
   - Install: `npx shadcn@latest add @avara-ui/ai-chat`
   - Set these props: `{"variant":"compact"}`
   - Docs: https://avaraui.com/docs/nextjs/ai-chat#compact
4. **Minimal** (`minimal`): Borders, shadows and dividers are stripped so the assistant blends into the surface around it.
   - Live: https://avaraui.com/view/ai-chat/minimal
   - Best for: an assistant inside a page or panel that already has its own frame
   - Avoid if: you want it to read as a standalone card
   - Traits: no borders or shadows
   - Install: `npx shadcn@latest add @avara-ui/ai-chat`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/ai-chat#minimal
5. **Glass** (`glass`): Translucent panels with backdrop blur; the accent can be tinted to hold up against your backdrop.
   - Live: https://avaraui.com/view/ai-chat/glass
   - Best for: an assistant over a colourful or photographic background
   - Avoid if: the background is plain
   - Traits: translucent panels, backdrop blur, tintable accents
   - Install: `npx shadcn@latest add @avara-ui/ai-chat`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/ai-chat#glass
6. **Liquid glass** (`liquid-glass`): Liquid-glass refraction using SVG displacement mapping, layered specular highlights and fluid reflections.
   - Live: https://avaraui.com/view/ai-chat/liquid-glass
   - Best for: a showpiece assistant over rich imagery
   - Avoid if: you want a restrained look or a plain background
   - Traits: refraction effect, specular highlights, tintable accents
   - Install: `npx shadcn@latest add @avara-ui/ai-chat`
   - Set these props: `{"variant":"liquid-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/ai-chat#liquid-glass

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `chatHistory` | `ChatThread[]` | `[]` | Array of objects containing `id`, `title`, and string `date` group ("Today", etc) for the sidebar. |
| `initialMessages` | `Message[]` | `[]` | Array of initial message objects (`id`, `role`, `content`, `time`) to populate the active chat window. Optional `attachments`, `model` and `effort` render file chips in the bubble and a model tag on the timestamp. |
| `variant` | `"default" \| "minimal" \| "glass" \| "compact" \| "liquid-glass"` | `"default"` | Applies overarching structural and aesthetic layout styling. `"compact"` is the default shell without the history sidebar, and `"liquid-glass"` delivers high-refraction specular liquid glass physics. |
| `showSidebar` | `boolean` | `variant !== "compact"` | Renders the thread history beside the conversation. Pass `false` to remove it from any variant; an empty thread then shows the hero, and a `New chat` button appears in the conversation header. |
| `heroTitle` | `string` | `"What can I help you with?"` | Title above the prompt bar in the hero state (sidebar-less, nothing said yet). |
| `heroSubtitle` | `string` | — | Optional line under the hero title. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies global color themes to the active states, buttons, gradients, and send icons. `"primary"` follows your theme tokens; a hex string (e.g. `"#8b5cf6"`) is injected as CSS variables. Unrecognised names fall back to `"primary"`. |
| `models` | `ChatModel[]` | four sample models | Models offered in the composer's picker: `{ id, name, description?, badge?, pro?, premium? }`. `pro` adds a blue Pro badge and `premium` a gold Premium one; each plays its own one-off flourish when the model is chosen (`premium` wins if both are set). |
| `defaultModelId` | `string` | first model | Which model is selected on mount. |
| `onModelChange` | `(model: ChatModel) => void` | — | Fires when a model is picked. |
| `efforts` | `EffortOption[]` | Low, Medium, High, Max | Stops on the effort slider: `{ id, label, description?, level }` with `level` from 1 upward. The highest level lights the prompt bar. |
| `defaultEffort` | `"low" \| "medium" \| "high" \| "max" \| string` | `"medium"` | Which effort is selected on mount. |
| `onEffortChange` | `(effort: EffortOption) => void` | — | Fires as the slider moves. |
| `onSend` | `(payload: SendPayload) => void` | — | Called with `{ content, attachments, model, effort, tools }` whenever a prompt is sent — the hook for your own endpoint. |
| `uploadFile` | `UploadHandler` | simulated | `(file, onProgress, signal) => Promise<void>`. Report 0–100 through `onProgress`; resolve when stored, reject to mark the chip failed. `signal` aborts when the chip is removed mid-upload. |
| `tools` | `ComposerTool[]` | a sample upload row and mentions | Rows of the + menu: `{ id, label, description?, icon?, action? }`. `action: "upload"` opens the picker; the default, `"mention"`, inserts `@Label` into the prompt. |
| `accept` | `string` | any file | Forwarded to the file input, e.g. `"image/*,.pdf"`. |
| `maxFiles` | `number` | `6` | Maximum attachments on one message; the paperclip disables at the cap. |

### AIChatWorkspace

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `generateReply` | `(payload: WorkspaceSendPayload) => string \| Promise<string>` | Built-in stand-in | Your model. Return the reply text and it is streamed in. |
| `onSend` | `(payload: WorkspaceSendPayload) => void` | `undefined` | Fires each time a prompt goes out, with the thread id, attachments, model, effort, modes, connectors, knowledge and language. |
| `chatHistory` | `WorkspaceThread[]` | `[]` | Sidebar threads, grouped by their `date` string. |
| `messagesByThread` | `Record<string \| number, WorkspaceMessage[]>` | `[]` | Seeds a thread's messages by id. A thread without an entry opens on a short greeting. |
| `uploadFile` | `WorkspaceUploadHandler` | Simulated | Real upload for attachments and Library files, same signature as `AIChat`. |
| `brandName` | `string` | `"Vela"` | Name beside the mark in the sidebar, footer note and upgrade copy. |
| `defaultPlan` | `"free" \| "pro"` | `"free"` | On `"free"` the Upgrade pill shows and the connectors are locked. |

## Works with other components

- [Chat Bubble](https://avaraui.com/docs/reactjs/chat-bubble) for message bubbles in a thread you render yourself, outside `AIChat`.
- [Voice Note](https://avaraui.com/docs/reactjs/voice-note) when you want recorded audio messages rather than the composer's speech-to-text dictation.
- [Agent Graph](https://avaraui.com/docs/reactjs/agent-graph) to show which agents are working behind the assistant's replies.

## How do I show my own model's reply in AI Chat?

Use `AIChatWorkspace` and pass `generateReply`, a function that receives the send payload and returns the reply text, which the workspace streams in. `AIChat` has no such prop: its `onSend` only reports the prompt, attachments, `model`, `effort` and `tools`, and the thread still gets a simulated answer.

## What is the difference between `ai-chat` and `ai-chat-workspace`?

`ai-chat` installs `AIChat`, a thread-plus-conversation shell with five `variant` looks and a simulated reply. `ai-chat-workspace` installs `AIChatWorkspace`, which opens on an empty screen and adds Research, web, image and reasoning modes, a Library, connectors, sources, a stop button and `generateReply`.

## How do I replace the simulated file upload in AI Chat?

Pass `uploadFile` as `(file, onProgress, signal) => Promise<void>`. Call `onProgress` with 0 to 100, resolve when the file is stored, and reject to mark the chip failed. `signal` aborts if the person removes the chip mid-upload. Without it, uploads are simulated. `accept` and `maxFiles` limit the picker.

## How do I add my own tools to the AI Chat `+` menu?

Pass `tools` as `{ id, label, description?, icon?, action? }[]`. A row with `action: "upload"` opens the file picker, and any other row writes `@Label` into the prompt. The tools a prompt names arrive in `onSend` as `tools`, in the order they appear in the text.

## How do I change the AI Chat accent colour or model list?

Set `color` to `"primary"` (the default, which follows your theme tokens), `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex string. Set `models` and `efforts` to your own lists; a model with `pro: true` or `premium: true` gets a Pro or Premium badge, and `onModelChange` reports the choice.

## Does AI Chat work in Vite and does it respect reduced motion?

It runs in Vite as well as Next.js, since it has no `next/*` imports. It needs `gsap` and `lucide-react` from npm, or `motion` in the Motion build, and the `ui-liquid-glass` registry item. The Pro and Premium model flourishes are skipped when `prefers-reduced-motion: reduce` is set.

---

Live previews and every example: https://avaraui.com/docs/nextjs/ai-chat
