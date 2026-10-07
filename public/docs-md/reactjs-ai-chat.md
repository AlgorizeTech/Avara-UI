export const metadata = docsPageMetadata("ai-chat");

# AI Assistant Chat

A premium, interactive LLM chat interface featuring conversation history management, real-time typing indicators, editable chat titles, and a full prompt composer — a **+** menu for files and `@Mention` tools, a rocket upload indicator, a model picker, a Faster ↔ Smarter effort slider, and voice dictation with a live waveform.

Every preview is live — send a prompt to see the simulated stream, rename a thread, or hit **New Chat**. Try the composer too: press **+** and pick *Photos & files* (or drop a file on the bar) and watch the rocket carry it to 100%, pick *Documents* or *Mail* to drop an `@Documents` mention into the prompt, switch the model, slide effort up to **Max** for the glowing prompt bar, or tap the mic and talk. `variant` changes the shell only — `compact` also drops the history sidebar — and everything else behaves identically in all four.

export const chatData = `const chatHistory: ChatThread[] = [
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
      "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\\n\\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
    time: "10:02 AM",
  },
];`;

export const usageDefault = `import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

${chatData}

export default function Assistant() {
  return (

  );
}`;

export const usageComposer = `import AIChat, {
  type ChatModel,
  type ComposerTool,
  type SendPayload,
  type UploadHandler,
} from "@/components/custom/blocks/Ai-chat";

// One upload row, then whatever sources your assistant can reach. Picking a
// mention row writes "@Label" into the prompt; \`onSend\` lists which were named.
const tools: ComposerTool[] = [
  { id: "files", label: "Photos & files", description: "Upload from this device", icon: , action: "upload" },
  { id: "crm", label: "CRM", description: "Accounts and deals", icon:  },
  { id: "tickets", label: "Tickets", description: "Open support issues", icon:  },
];

const models: ChatModel[] = [
  { id: "gpt-5", name: "GPT-5", description: "Flagship reasoning", badge: "New" },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", description: "Fast and capable" },
];

// Stream a real upload and report progress as it goes. Reject to mark the chip failed;
// \`signal\` aborts if the user removes the chip mid-flight.
const uploadFile: UploadHandler = (file, onProgress, signal) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) =>
      e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status  reject(new Error("Network error"));
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

  );
}`;

export const usageCompact = `import AIChat from "@/components/custom/blocks/Ai-chat";

export default function CompactAssistant() {
  return (
    
      {/* No sidebar and nothing said yet: just the title and the prompt bar, like a hero.
          The first message swaps it for the conversation view. */}

  );
}`;

export const usageMinimal = `import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

${chatData}

export default function MinimalAssistant() {
  return (
    
      {/* Card chrome and dividers removed — drops cleanly into an existing panel. */}

  );
}`;

export const usageGlass = `import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

${chatData}

export default function GlassAssistant() {
  return (
    // \`glass\` is translucent by design — placed over a high-resolution nature backdrop.

  );
};`;

export const usageLiquidGlass = `import AIChat, { type ChatThread, type Message } from "@/components/custom/blocks/Ai-chat";

${chatData}

export default function LiquidGlassAssistant() {
  return (
    // Real liquid SVG glass displacement with multi-layer reflections and specular highlights

  );
};`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/ai-chat
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add @algorize-ui/ai-chat-motion
```

## Examples

 Promise` to replace the simulated upload — the rocket follows whatever percentage you report, and the chip turns green when the promise resolves or red when it rejects.",
        },
        {
          prop: "onSend",
          effect:
            "receives `{ content, attachments, model, effort }` every time a prompt goes out, so the endpoint gets the model id, the effort id and the finished uploads in one call.",
        },
        {
          prop: "models",
          effect:
            "fills the picker with your own `{ id, name, description?, badge?, pro?, premium? }[]`; `defaultModelId` chooses the initial one.",
        },
      ],
      props: { variant: "default" },
      usage: usageComposer,
    },
    {
      title: "Minimal",
      propNotes: [
        {
          lead: "Set",
          prop: "variant",
          value: '"minimal"',
          effect:
            "to strip the borders, shadows and dividers so the assistant blends into a surrounding surface.",
        },
      ],
      props: { variant: "minimal" },
      usage: usageMinimal,
    },
    {
      title: "Glass",
      propNotes: [
        {
          lead: "Set",
          prop: "variant",
          value: '"glass"',
          effect:
            "for translucent panels with backdrop blur — it needs a colourful backdrop behind it to read.",
        },
        {
          prop: "color",
          value: '"#8b5cf6"',
          effect: "tints the accents so they hold up against your own backdrop.",
        },
      ],
      props: { variant: "glass" },
      usage: usageGlass,
    },
    {
      title: "Liquid Glass",
      propNotes: [
        {
          lead: "Set",
          prop: "variant",
          value: '"liquid-glass"',
          effect:
            "for authentic liquid glass refraction using SVG displacement mapping, multi-layer specular highlights, and fluid reflections.",
        },
        {
          prop: "color",
          value: '"#8b5cf6"',
          effect: "tints the accents so they hold up against your own backdrop.",
        },
      ],
      props: { variant: "liquid-glass" },
      usage: usageLiquidGlass,
    },
  ]}
/>

## The composer

Everything under the prompt is built in and works without any props:

- **The + menu** — six rows by default: *Photos & files* opens the file picker; *Web search*, *Sales data*, *Documents*, *Mail* and *Calendar* each write `@Label` into the prompt at the caret (once — picking it again just refocuses). Supply your own rows with `tools`; the ones a prompt names arrive in `onSend` as `tools`, in the order they appear.
- **Attachments** — from the + menu, and files can also be dropped anywhere on the composer. Each file becomes a chip with a rocket that launches from the left, rides the progress track with a flickering exhaust, then blasts off the end as a check bursts in at 100%. Images show a thumbnail; the send button waits until every upload has landed. Uploads are simulated until you pass `uploadFile`.
- **Model picker** — a popover listing `models` (four demo models by default). The chosen model is stamped on each reply's timestamp. A model with `pro: true` wears a blue *Pro* badge; switching to it turns the pill blue as a bolt strikes in, the pill flickers and throws off sparks, and the prompt bar's edge draws itself out from the centre, flickers like a live wire and glows from within while a scan line rises through it. A model with `premium: true` wears a gold *Premium* badge after its name; switching to it turns the pill gold with a crown, pings a ring and a glint across the pill, and sends two gold beams once around the prompt bar's edge while a sheen crosses it — a single play, unlike Max effort's standing glow.
- **Effort** — a Faster ↔ Smarter slider with one stop per level. At the highest level the pill switches to a sparkle and the prompt bar glows with a scatter of twinkling specks. The simulated reply also takes a little longer the higher you go.
- **Dictation** — the mic opens the microphone and drives a 22-bar waveform from the live audio level, while the Web Speech API writes what you say into the prompt. Without mic permission the wave runs an idle animation; without speech recognition the wave still shows so the button visibly responds. Tap again (or press Escape) to stop.

## Features
Explore the Ai-Chat interface features, including message streaming, typing indicators, and seamless integration with AI models.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          chatHistory

          ChatThread[]

          []

          Array of objects containing id, title, and
          string date group ("Today", etc) for the sidebar.

          initialMessages

          Message[]

          []

          Array of initial message objects (id, role,{" "}
          content, time) to populate the active chat
          window. Optional attachments, model and{" "}
          effort render file chips in the bubble and a model tag on
          the timestamp.

          variant

          "default" | "minimal" | "glass" | "compact" | "liquid-glass"

          "default"

          Applies overarching structural and aesthetic layout styling.{" "}
          "compact" is the default shell without the history
          sidebar, and "liquid-glass" delivers high-refraction specular liquid glass physics.

          showSidebar

          boolean

          variant !== "compact"

          Renders the thread history beside the conversation. Pass{" "}
          false to remove it from any variant; an empty thread
          then shows the hero, and a New chat button appears in
          the conversation header.

          heroTitle

          string

          "What can I help you with?"

          Title above the prompt bar in the hero state (sidebar-less, nothing
          said yet).

          heroSubtitle

          string
        
        —
        Optional line under the hero title.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the active states, buttons, gradients,
          and send icons. "primary" follows your theme tokens; a
          hex string (e.g. "#8b5cf6") is injected as CSS variables.
          Unrecognised names fall back to "primary".

          models

          ChatModel[]

          four sample models

          Models offered in the composer's picker: {"{ id, name, description?, badge?, pro?, premium? }"}. pro adds a blue Pro badge and premium a gold Premium one; each plays its own one-off flourish when the model is chosen (premium wins if both are set).

          defaultModelId

          string
        
        first model
        Which model is selected on mount.

          onModelChange

          (model: ChatModel) =&gt; void
        
        —
        Fires when a model is picked.

          efforts

          EffortOption[]

          Low, Medium, High, Max

          Stops on the effort slider: {"{ id, label, description?, level }"}{" "}
          with level from 1 upward. The highest level lights the
          prompt bar.

          defaultEffort

          "low" | "medium" | "high" | "max" | string

          "medium"
        
        Which effort is selected on mount.

          onEffortChange

          (effort: EffortOption) =&gt; void
        
        —
        Fires as the slider moves.

          onSend

          (payload: SendPayload) =&gt; void
        
        —
        
          Called with {"{ content, attachments, model, effort, tools }"}{" "}
          whenever a prompt is sent — the hook for your own endpoint.

          uploadFile

          UploadHandler
        
        simulated
        
          (file, onProgress, signal) =&gt; Promise&lt;void&gt;. Report
          0–100 through onProgress; resolve when stored, reject to
          mark the chip failed. signal aborts when the chip is
          removed mid-upload.

          tools

          ComposerTool[]

          a sample upload row and mentions

          Rows of the + menu: {"{ id, label, description?, icon?, action? }"}.
          action: "upload" opens the picker; the default,{" "}
          "mention", inserts @Label into the prompt.

          accept

          string
        
        any file
        
          Forwarded to the file input, e.g. "image/*,.pdf".

          maxFiles

          number

          6
        
        Maximum attachments on one message; the paperclip disables at the cap.

---

**Component Path:** `[framework]\ai-chat\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
